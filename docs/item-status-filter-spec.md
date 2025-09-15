# Item Assignment Status Filter 仕様書

## 概要
/item-assignment画面のItemテーブルにおいて、Statusカラムのフィルターを現在のテキスト入力方式から選択式（ドロップダウン）に変更する仕様書です。本仕様はAPI拡張を前提とし、TanStack Query/Tableの高度な機能を活用してシームレスなフィルタリング体験を実現します。

## 作成日
2025-09-15

## 更新履歴
- 2025-09-15: 初版作成
- 2025-09-15: API連携前提の実装方針に更新、TanStack Query/Tableの高度な機能を活用

## 現状分析

### 現在の実装状況
- **フレームワーク**: TanStack Table v8.21.3を使用
- **コンポーネント構成**:
  - `/src/routes/p-sys/item-assignment.tsx`: メイン画面
  - `/src/components/generic-table/GenericEditableTable.tsx`: 汎用テーブルコンポーネント
  - `/src/features/item-management/columns/getItemColumns.tsx`: カラム定義
  - `/src/components/generic-table/GenericTableFilter.tsx`: フィルターUI

### 現在のStatus列の仕様
- **データ型**: string (itemIsAssign フィールド)
- **可能な値**:
  - `未割当`: 未割当アイテム（橙色バッジ）
  - `一部割当済`: 部分的に割当済み（青色バッジ）
  - `割当済`: 完全に割当済み（緑色バッジ）
  - `割当超過`: 割当数が超過（赤色バッジ）
- **現在のフィルター**: 
  - テキスト入力フィルター
  - カスタムfilterFn（`unassignedFilter`）が定義済み（未割当・一部割当済のみを表示）

## 新仕様

### フィルターUI要件
1. **UIタイプ**: セレクトボックス（ドロップダウン）
2. **選択肢**:
   - `未割当`: 「未割当」のアイテムのみ表示
   - `一部割当済`: 「一部割当済」のアイテムのみ表示
   - `割当済`: 「割当済」のアイテムのみ表示
   - `全て`: すべてのステータスを表示（フィルターなし）
3. **デフォルト値**: `全て`
4. **レスポンシブ動作**: 
   - 即座にUIフィードバック（楽観的更新）
   - ローディング状態の適切な表示
   - エラー時の自動リトライとフォールバック

### アーキテクチャ設計

#### データフロー概要
```
User Action → Filter Change → API Request → Cache Update → UI Re-render
     ↓                            ↓
Optimistic UI Update     Debounce/Deferred Update
```

### 実装方針

#### 1. サーバーサイドフィルタリング対応のTable設定

```typescript
// src/components/generic-table/useGenericTable.ts
interface ServerSideTableOptions {
  manualFiltering: true;  // サーバーサイドフィルタリング有効化
  manualPagination: true; // サーバーサイドページネーション
  manualSorting: true;    // サーバーサイドソート
  pageCount: number;      // 総ページ数（APIから取得）
  autoResetPageIndex: false; // フィルター変更時の自動リセット無効化
}

const table = useReactTable({
  ...existingConfig,
  manualFiltering: true,
  onColumnFiltersChange: setColumnFilters,
  state: {
    columnFilters,
    pagination,
    sorting,
  },
});
```

#### 2. TanStack Queryとの統合

```typescript
// src/hooks/useItemsWithFilter.ts
interface UseItemsParams {
  jobNo: string;
  fgCode: string;
  statusFilter?: string;
  pagination: { pageIndex: number; pageSize: number };
}

export const useItemsWithFilter = (params: UseItemsParams) => {
  const debouncedStatus = useDebounce(params.statusFilter, 300);
  
  return useQuery({
    queryKey: ['items', params.jobNo, params.fgCode, debouncedStatus, params.pagination],
    queryFn: async () => {
      const response = await fetchItemsApi({
        jobNo: params.jobNo,
        fgCode: params.fgCode,
        status: debouncedStatus === '全て' ? undefined : debouncedStatus,
        page: params.pagination.pageIndex + 1,
        limit: params.pagination.pageSize,
      });
      return response;
    },
    placeholderData: keepPreviousData, // 前のデータを保持してチラつき防止
    staleTime: 5000, // 5秒間はキャッシュを新鮮とみなす
  });
};
```

#### 3. パフォーマンス最適化戦略

##### a. React Concurrent Features活用
```typescript
// src/features/item-management/components/ItemStatusFilter.tsx
import { useDeferredValue, useTransition } from 'react';

export const ItemStatusFilter: React.FC<FilterProps> = ({ column, onFilterChange }) => {
  const [isPending, startTransition] = useTransition();
  const filterValue = column.getFilterValue() as string;
  const deferredFilterValue = useDeferredValue(filterValue);
  
  const handleChange = (value: string) => {
    startTransition(() => {
      onFilterChange(value);
    });
  };

  return (
    <div className="relative">
      <Select
        value={filterValue || '全て'}
        onValueChange={handleChange}
        disabled={isPending}
      >
        {/* Select options */}
      </Select>
      {isPending && (
        <div className="absolute inset-0 bg-white/50 flex items-center justify-center">
          <Spinner size="sm" />
        </div>
      )}
    </div>
  );
};
```

##### b. 楽観的更新（Optimistic Updates）
```typescript
// src/hooks/useOptimisticFilter.ts
export const useOptimisticFilter = () => {
  const queryClient = useQueryClient();
  
  const updateFilter = useMutation({
    mutationFn: async (filterValue: string) => {
      // API呼び出し
      return fetchFilteredItems(filterValue);
    },
    onMutate: async (filterValue) => {
      // 既存のクエリをキャンセル
      await queryClient.cancelQueries({ queryKey: ['items'] });
      
      // 現在のデータを取得してスナップショット
      const previousItems = queryClient.getQueryData(['items']);
      
      // 楽観的更新: フィルター済みデータを即座に表示
      queryClient.setQueryData(['items'], (old) => {
        return filterItemsLocally(old, filterValue);
      });
      
      return { previousItems };
    },
    onError: (err, filterValue, context) => {
      // エラー時はロールバック
      queryClient.setQueryData(['items'], context.previousItems);
    },
    onSettled: () => {
      // 最終的にサーバーデータと同期
      queryClient.invalidateQueries({ queryKey: ['items'] });
    },
  });
  
  return updateFilter;
};
```

## API拡張仕様（必須）

### 新APIエンドポイント設計

#### 1. RESTful API設計
```typescript
// エンドポイント: GET /api/items/filtered
interface ItemsFilterRequest {
  jobNo: string;
  fgCode: string;
  status?: string | string[];  // 単一または複数ステータス
  page?: number;               // ページ番号（1始まり）
  limit?: number;              // 1ページあたりの件数
  sortBy?: string;             // ソートフィールド
  sortOrder?: 'asc' | 'desc';  // ソート順
}

// レスポンス
interface ItemsFilterResponse {
  data: Item[];
  pagination: {
    currentPage: number;
    pageSize: number;
    totalPages: number;
    totalItems: number;
    hasNext: boolean;
    hasPrevious: boolean;
  };
  facets: {
    statusCounts: {
      [key: string]: number;  // 各ステータスの件数
    };
    availableStatuses: string[]; // 利用可能なステータス一覧
  };
  metadata: {
    requestId: string;
    timestamp: string;
    processingTime: number;
  };
}
```

#### 2. GraphQL API設計（オプション）
```graphql
type Query {
  filteredItems(input: ItemsFilterInput!): ItemsFilterPayload!
}

input ItemsFilterInput {
  jobNo: String!
  fgCode: String!
  statusFilter: [ItemStatus!]
  pagination: PaginationInput
  sorting: SortingInput
}

type ItemsFilterPayload {
  items: [Item!]!
  pageInfo: PageInfo!
  facets: ItemFacets!
  metadata: ResponseMetadata!
}

type ItemFacets {
  statusDistribution: [StatusCount!]!
  totalByStatus(status: ItemStatus!): Int!
}
```

### APIパフォーマンス最適化

#### 1. レスポンスキャッシング戦略
```typescript
// Cache-Control ヘッダー設定
headers: {
  'Cache-Control': 'private, max-age=60, stale-while-revalidate=300',
  'ETag': generateETag(queryParams),
  'X-Request-Id': requestId,
}
```

#### 2. 条件付きリクエスト
```typescript
// If-None-Match ヘッダーでキャッシュ検証
if (request.headers['if-none-match'] === currentETag) {
  return response.status(304); // Not Modified
}
```

#### 3. バッチリクエスト対応
```typescript
// 複数フィルター条件の一括取得
POST /api/items/batch-filter
{
  "requests": [
    { "jobNo": "JOB001", "status": "未割当" },
    { "jobNo": "JOB001", "status": "一部割当済" }
  ]
}

## シームレスなフィルタリング実装

### 1. 統合コンポーネント設計

```typescript
// src/features/item-management/components/ItemTableWithServerFilter.tsx
export const ItemTableWithServerFilter: React.FC = () => {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 50 });
  const [searchParams, setSearchParams] = useSearchParams();
  
  // URLから初期状態を復元
  const statusFromUrl = searchParams.get('status') || '全て';
  
  // サーバーサイドデータ取得
  const { data, isLoading, isFetching, isPlaceholderData } = useItemsWithFilter({
    jobNo: selectedJobNo,
    fgCode: selectedFG?.fgCode,
    statusFilter: columnFilters.find(f => f.id === 'itemIsAssign')?.value,
    pagination,
  });
  
  // テーブルインスタンス（サーバーサイドモード）
  const table = useReactTable({
    data: data?.items ?? [],
    columns: getItemColumns(true),
    manualFiltering: true,
    manualPagination: true,
    manualSorting: true,
    pageCount: data?.pagination.totalPages ?? -1,
    state: {
      columnFilters,
      pagination,
    },
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
  });
  
  // フィルター変更のハンドリング
  const handleStatusFilterChange = useCallback((value: string) => {
    // URLパラメータ更新
    setSearchParams(prev => {
      if (value === '全て') {
        prev.delete('status');
      } else {
        prev.set('status', value);
      }
      return prev;
    });
    
    // ページ番号をリセット
    setPagination(prev => ({ ...prev, pageIndex: 0 }));
    
    // カラムフィルター更新
    setColumnFilters(prev => [
      ...prev.filter(f => f.id !== 'itemIsAssign'),
      ...(value !== '全て' ? [{ id: 'itemIsAssign', value }] : [])
    ]);
  }, [setSearchParams]);
  
  return (
    <div>
      {/* ステータスフィルターUI */}
      <StatusFilterSelect
        value={statusFromUrl}
        onChange={handleStatusFilterChange}
        options={data?.facets.availableStatuses}
        counts={data?.facets.statusCounts}
        isLoading={isFetching}
      />
      
      {/* テーブル本体 */}
      <GenericEditableTable
        table={table}
        isLoading={isLoading}
        showSkeleton={isPlaceholderData}
      />
      
      {/* ページネーション */}
      <TablePagination
        table={table}
        isLoading={isFetching}
      />
    </div>
  );
};
```

### 2. デバウンス＆スロットリング戦略

```typescript
// src/hooks/useDebounceFilter.ts
export const useDebounceFilter = (value: string, delay: number = 300) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const [isDebouncing, setIsDebouncing] = useState(false);
  
  useEffect(() => {
    setIsDebouncing(true);
    const handler = setTimeout(() => {
      setDebouncedValue(value);
      setIsDebouncing(false);
    }, delay);
    
    return () => clearTimeout(handler);
  }, [value, delay]);
  
  return { debouncedValue, isDebouncing };
};

// 使用例
const { debouncedValue, isDebouncing } = useDebounceFilter(filterValue, 300);
```

### 3. エラーハンドリングとリトライ

```typescript
// src/hooks/useItemsWithRetry.ts
export const useItemsWithRetry = (params: UseItemsParams) => {
  return useQuery({
    ...baseQueryOptions,
    retry: 3,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
    onError: (error) => {
      // エラー通知
      toast.error('データ取得に失敗しました。再試行中...');
    },
  });
};

## 実装ステップ

### Phase 1: API開発（必須・優先度高）
1. **APIエンドポイント実装**
   - フィルタリング対応エンドポイント作成
   - ページネーション実装
   - ファセット集計機能
   - キャッシュヘッダー設定

2. **データベース最適化**
   - インデックス作成（status, jobNo, fgCode）
   - クエリ最適化
   - 集計クエリのパフォーマンスチューニング

### Phase 2: フロントエンド実装（API完成後）
1. **TanStack Query統合**
   - useItemsWithFilterフック作成
   - キャッシュ戦略設定
   - 楽観的更新実装

2. **TanStack Table設定**
   - manualFilteringモード有効化
   - サーバーサイドページネーション
   - カラムフィルター連携

3. **UI/UXコンポーネント**
   - StatusFilterSelectコンポーネント
   - ローディング状態表示
   - エラー状態のハンドリング

### Phase 3: パフォーマンス最適化
1. **React最適化**
   - useDeferredValue/useTransition活用
   - メモ化戦略
   - 仮想スクロール調整

2. **ネットワーク最適化**
   - デバウンス実装
   - リクエストキャンセル
   - バッチリクエスト

## テスト項目

### 単体テスト
- [ ] SelectFilterコンポーネントの動作確認
- [ ] statusFilter関数のロジックテスト
- [ ] 各ステータス値でのフィルタリング確認

### 統合テスト
- [ ] テーブル全体のフィルタリング動作
- [ ] URL同期の確認
- [ ] パフォーマンステスト（大量データ）

### E2Eテスト
- [ ] ユーザー操作フローの確認
- [ ] フィルター切り替え時の表示更新
- [ ] ページリロード時の状態保持

## パフォーマンス考慮事項

### 測定指標（KPI）
- **初期表示時間**: < 500ms
- **フィルター切り替え時間**: < 200ms（UIフィードバック）
- **API応答時間**: < 300ms（95パーセンタイル）
- **Time to Interactive (TTI)**: < 1秒

### 最適化技術

#### 1. フロントエンド最適化
```typescript
// a. Reactレンダリング最適化
const MemoizedTable = React.memo(GenericEditableTable, (prev, next) => {
  return prev.data === next.data && prev.isLoading === next.isLoading;
});

// b. 仮想スクロール設定の調整
const virtualizer = useVirtualizer({
  count: rows.length,
  estimateSize: () => 35,
  overscan: 10, // 画面外に10行分先読み
  scrollMargin: scrollContainerRef.current?.offsetTop ?? 0,
});

// c. useDeferredValueによる優先度制御
const deferredData = useDeferredValue(data);
const isStale = data !== deferredData;
```

#### 2. API/バックエンド最適化
- **データベースインデックス**: 複合インデックス(jobNo, fgCode, status)
- **クエリ最適化**: EXPLAIN ANALYZEによるクエリプラン確認
- **接続プーリング**: コネクションプール最適化
- **レスポンス圧縮**: Gzip/Brotli圧縮

#### 3. ネットワーク最適化
- **HTTP/2**: 多重化による並列リクエスト
- **CDN活用**: 静的アセットのキャッシング
- **Prefetch**: 予測可能なデータの先読み
```typescript
// 次ページの先読み
queryClient.prefetchQuery({
  queryKey: ['items', jobNo, fgCode, status, { pageIndex: currentPage + 1 }],
  queryFn: fetchNextPage,
});
```

## セキュリティ考慮事項
- XSS対策: Reactの自動エスケープに依存
- SQLインジェクション対策: APIでのパラメータバリデーション必須
- 権限チェック: 各ステータスへのアクセス権限確認

## 今後の拡張可能性
1. **複数選択フィルター**: チェックボックス形式での複数ステータス選択
2. **保存フィルター**: よく使うフィルター条件の保存機能
3. **高度なフィルター**: AND/OR条件の組み合わせ
4. **エクスポート機能**: フィルター結果のCSV/Excel出力

## 参考資料
- [TanStack Table v8 Documentation - Column Filtering](https://tanstack.com/table/latest/docs/guide/column-filtering)
- [TanStack Table v8 Documentation - Column Faceting](https://tanstack.com/table/latest/docs/guide/column-faceting)
- [React Query Documentation](https://tanstack.com/query/latest)

## 実装例（詳細コードサンプル）

### 1. 高度なStatusFilterコンポーネント
```tsx
// src/features/item-management/components/StatusFilterSelect.tsx
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2 } from 'lucide-react';

interface StatusFilterSelectProps {
  value: string;
  onChange: (value: string) => void;
  options?: string[];
  counts?: Record<string, number>;
  isLoading?: boolean;
  disabled?: boolean;
}

export const StatusFilterSelect: React.FC<StatusFilterSelectProps> = ({
  value,
  onChange,
  options = ['全て', '未割当', '一部割当済', '割当済'],
  counts,
  isLoading,
  disabled,
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case '未割当': return 'bg-amber-500';
      case '一部割当済': return 'bg-blue-600';
      case '割当済': return 'bg-teal-500';
      case '割当超過': return 'bg-red-600';
      default: return 'bg-gray-400';
    }
  };

  return (
    <div className="relative">
      <Select value={value} onValueChange={onChange} disabled={disabled || isLoading}>
        <SelectTrigger className="w-[200px] h-9">
          <SelectValue>
            <div className="flex items-center gap-2">
              {isLoading && <Loader2 className="h-3 w-3 animate-spin" />}
              {value !== '全て' && (
                <Badge className={`${getStatusColor(value)} text-white px-2 py-0.5 text-xs`}>
                  {value}
                </Badge>
              )}
              {value === '全て' && <span className="text-sm">全てのステータス</span>}
              {counts && counts[value] !== undefined && (
                <span className="text-xs text-gray-500">({counts[value]}件)</span>
              )}
            </div>
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  {option !== '全て' && (
                    <Badge className={`${getStatusColor(option)} text-white px-2 py-0.5 text-xs`}>
                      {option}
                    </Badge>
                  )}
                  {option === '全て' && <span>全てのステータス</span>}
                </div>
                {counts && counts[option] !== undefined && (
                  <span className="text-xs text-gray-500 ml-4">
                    {counts[option].toLocaleString()}件
                  </span>
                )}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
```

### 2. 完全な統合実装例
```tsx
// src/routes/p-sys/item-assignment.tsx での実装
export const ItemAssignment: React.FC = () => {
  // ... 既存のstate定義
  
  // フィルター状態管理
  const [statusFilter, setStatusFilter] = useState<string>('全て');
  const deferredStatusFilter = useDeferredValue(statusFilter);
  
  // API呼び出し（サーバーサイドフィルタリング）
  const {
    data: itemsResponse,
    isLoading,
    isFetching,
    isPlaceholderData,
  } = useQuery({
    queryKey: ['items', selectedJobNo, fgCode, deferredStatusFilter, pagination],
    queryFn: () => fetchFilteredItems({
      jobNo: selectedJobNo,
      fgCode,
      status: deferredStatusFilter === '全て' ? undefined : deferredStatusFilter,
      page: pagination.pageIndex + 1,
      limit: pagination.pageSize,
    }),
    placeholderData: keepPreviousData,
    staleTime: 30000, // 30秒
    gcTime: 5 * 60 * 1000, // 5分
  });
  
  // テーブル設定（サーバーサイドモード）
  const table = useReactTable({
    data: itemsResponse?.data ?? [],
    columns: getItemColumns(pipGenerationMode !== 'display'),
    manualFiltering: true,
    manualPagination: true,
    manualSorting: true,
    pageCount: itemsResponse?.pagination.totalPages ?? -1,
    state: {
      pagination,
      columnFilters: [
        ...(statusFilter !== '全て' ? [{ id: 'itemIsAssign', value: statusFilter }] : [])
      ],
    },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
  });
  
  // フィルター変更ハンドラー
  const handleStatusFilterChange = useCallback((value: string) => {
    setStatusFilter(value);
    setPagination(prev => ({ ...prev, pageIndex: 0 })); // ページをリセット
    
    // URL同期
    const url = new URL(window.location.href);
    if (value === '全て') {
      url.searchParams.delete('status');
    } else {
      url.searchParams.set('status', value);
    }
    window.history.pushState({}, '', url);
  }, []);
  
  return (
    <div className="h-screen bg-gray-100 p-6 overflow-hidden">
      {/* フィルターセクション */}
      <div className="mb-4 flex items-center gap-4">
        <StatusFilterSelect
          value={statusFilter}
          onChange={handleStatusFilterChange}
          options={itemsResponse?.facets.availableStatuses}
          counts={itemsResponse?.facets.statusCounts}
          isLoading={isFetching}
        />
        
        {/* フィルター状態インジケーター */}
        {statusFilter !== '全て' && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleStatusFilterChange('全て')}
            className="text-xs"
          >
            フィルターをクリア
          </Button>
        )}
      </div>
      
      {/* テーブル本体 */}
      <GenericEditableTable
        table={table}
        isLoading={isLoading}
        showSkeleton={isPlaceholderData}
        // ... その他のprops
      />
    </div>
  );
};
```

## まとめ

### 主要な変更点
1. **API拡張必須化**: サーバーサイドフィルタリングを前提とした設計
2. **TanStack Query/Table最適化**: manualFiltering, placeholderData, 楽観的更新の活用
3. **シームレスなUX**: useDeferredValue, useTransitionによる優先度制御
4. **パフォーマンス指標明確化**: 具体的なKPIと測定方法の定義

### 期待される効果
- **パフォーマンス向上**: サーバーサイド処理により大量データ対応
- **UX改善**: 即座のフィードバックと滑らかな状態遷移
- **保守性向上**: 明確な責務分離とコンポーネント設計
- **拡張性確保**: 将来的な機能追加に対応可能な基盤

### 技術的ハイライト
- TanStack Query v5の新機能（placeholderData, 楽観的更新）活用
- React 18 Concurrent Features（useDeferredValue, useTransition）統合
- サーバーサイドページネーション・フィルタリング・ソート統合
- ファセット集計によるリアルタイムカウント表示

本仕様はAPI拡張を前提とし、最新のReact/TanStack技術を活用することで、エンタープライズグレードのデータテーブル実装を実現します。