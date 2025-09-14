# 致命的バグ改修計画書 2025

> 作成日: 2025年1月14日  
> 対象システム: PS-PS (Production System - Purchase System)  
> 作成者: システム開発チーム

## 📋 エグゼクティブサマリー

本ドキュメントは、requirement.mdに記載された致命的バグ6件の包括的な改修計画です。最新のReact 19、TypeScript 5.6、TanStack Query v5の機能を活用し、根本的な問題解決とシステムの近代化を同時に実現します。

### 改修対象の致命的バグ
1. **No.19**: メッセージ表示タイミングの不整合
2. **No.20**: PIP編集からitems画面遷移時の未割当0件非表示問題
3. **No.21**: Edit PIPで未割当数量がある時のQty増加対応
4. **No.23**: 購入品管理のStatusフィルタ実装
5. **No.24**: MSRGridでリロード後のベンダーリスト問題
6. **No.25**: PIP編集時のPIPCode表示問題

---

## 🎯 改修方針

### 技術スタック更新
- **React**: 18.x → 19.0
- **TypeScript**: 5.x → 5.6
- **TanStack Query**: v4 → v5
- **状態管理**: Zustand + TanStack Query統合

### アーキテクチャ改善
- **Server Components**の段階的導入
- **Suspense**ベースのデータフェッチング
- **Optimistic UI**の全面採用
- **型安全性**の強化

---

## 🐛 バグ別改修計画

### 1. No.19: メッセージ表示タイミングの不整合

#### 問題分析
- 成功/失敗メッセージは概ね動作するが、FG未選択などの誘導系メッセージが未整備
- エラーハンドリングが分散し、一貫性がない

#### フロントエンド改修

```typescript
// 1. 統一メッセージシステムの実装
interface MessageSystem {
  // TanStack Query v5のmutation stateと連携
  useMutationMessages: () => {
    showSuccess: (key: string) => void;
    showError: (error: Error) => void;
    showValidation: (rule: ValidationRule) => void;
  };
}

// 2. React 19 useActionStateを活用した状態管理
function useFormValidation() {
  const [state, submitAction, isPending] = useActionState(
    async (previousState, formData) => {
      // バリデーション + サーバー送信
      if (!selectedFG) {
        return { error: 'FG_UNSELECTED' };
      }
      // ...
    }
  );
}

// 3. カスタムフックでメッセージ制御を統一
const useMessageControl = () => {
  const { mutationState } = useMutationState();
  
  // 全mutationの状態を監視し、適切なメッセージを表示
  useEffect(() => {
    mutationState.forEach(mutation => {
      if (mutation.status === 'success') {
        showMessage(mutation.meta.successMessage);
      }
    });
  }, [mutationState]);
};
```

#### バックエンド改修

```typescript
// レスポンス形式の統一
interface ApiResponse<T> {
  data?: T;
  message: {
    type: 'success' | 'error' | 'warning' | 'info';
    code: string;
    text: string;
    context?: Record<string, any>;
  };
  timestamp: string;
}

// メッセージコードの一元管理
enum MessageCode {
  // 成功系
  CREATE_SUCCESS = 'CREATE_SUCCESS',
  UPDATE_SUCCESS = 'UPDATE_SUCCESS',
  
  // エラー系
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  FG_NOT_SELECTED = 'FG_NOT_SELECTED',
  
  // 誘導系
  SELECT_FG_FIRST = 'SELECT_FG_FIRST',
  NO_ITEMS_AVAILABLE = 'NO_ITEMS_AVAILABLE',
}
```

---

### 2. No.20: PIP編集からitems画面遷移時の未割当0件非表示問題

#### 問題分析
- グローバル化した`useItemTableInstance`が画面遷移で意図通り動作しない
- フィルタリング状態が画面間で不適切に共有される

#### フロントエンド改修

```typescript
// 1. TanStack Query v5のselectオプションで画面別フィルタリング
interface ItemFilterOptions {
  mode: 'display' | 'edit' | 'generation';
  hideUnassigned?: boolean;
  hideZeroQty?: boolean;
}

const useFilteredItems = (options: ItemFilterOptions) => {
  return useSuspenseQuery({
    queryKey: ['items', options],
    queryFn: fetchItems,
    select: (data) => {
      let items = data.items;
      
      // モード別フィルタリング
      if (options.mode === 'edit' && options.hideUnassigned) {
        items = items.filter(item => item.unassignedQty > 0);
      }
      
      if (options.hideZeroQty) {
        items = items.filter(item => item.qty > 0);
      }
      
      return items;
    },
  });
};

// 2. 画面遷移時のフィルタリセット
const useScreenTransition = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  
  const transitionToItemAssignment = () => {
    // フィルタ状態をリセット
    queryClient.setQueryData(['itemFilters'], getDefaultFilters());
    navigate('/item-assignment');
  };
};
```

---

### 3. No.21: Edit PIPで未割当数量がある時のQty増加対応

#### 問題分析
- 現在は割当済Qtyが選択最大で減らすのみ
- 未割当数量の動的計算が不適切

#### フロントエンド改修

```typescript
// 1. React 19 useOptimisticを使用した即座のUI更新
const useEditableQuantity = (item: Item) => {
  const [optimisticQty, setOptimisticQty] = useOptimistic(
    item.qty,
    (state, newQty: number) => newQty
  );
  
  const updateQuantity = useCallback((newQty: number) => {
    const maxQty = item.totalQty - item.assignedQty + item.currentAssigned;
    
    if (newQty <= maxQty) {
      setOptimisticQty(newQty);
      // サーバー更新
      updateItemQty.mutate({ itemId: item.id, qty: newQty });
    }
  }, [item]);
  
  return { qty: optimisticQty, updateQuantity, maxQty };
};

// 2. 数量入力コンポーネントの改善
const QuantityInput: React.FC<{ item: Item }> = ({ item }) => {
  const { qty, updateQuantity, maxQty } = useEditableQuantity(item);
  
  return (
    <div className="flex items-center gap-2">
      <Input
        type="number"
        value={qty}
        onChange={(e) => updateQuantity(Number(e.target.value))}
        min={0}
        max={maxQty}
      />
      <span className="text-sm text-gray-500">
        最大: {maxQty} (未割当: {item.totalQty - item.assignedQty})
      </span>
    </div>
  );
};
```

#### バックエンド改修

```typescript
// 数量計算ロジックの改善
class ItemQuantityService {
  calculateAvailableQty(item: Item, pipId: string): number {
    const totalQty = item.totalQty;
    const assignedToOthers = this.getAssignedQtyExcluding(item.id, pipId);
    const currentPipQty = this.getCurrentPipQty(item.id, pipId);
    
    return Math.max(0, totalQty - assignedToOthers + currentPipQty);
  }
  
  validateQtyUpdate(itemId: string, pipId: string, newQty: number): ValidationResult {
    const availableQty = this.calculateAvailableQty(itemId, pipId);
    
    if (newQty > availableQty) {
      return {
        valid: false,
        message: `数量は${availableQty}以下にしてください`,
      };
    }
    
    return { valid: true };
  }
}
```

---

### 4. No.23: 購入品管理のStatusフィルタ実装

#### 問題分析
- カスタムフィルタがデフォルトフィルタと競合
- ステータス計算ロジックが分散

#### フロントエンド改修

```typescript
// 1. 統一フィルタシステムの実装
type ItemStatus = 'unassigned' | 'partially_assigned' | 'fully_assigned' | 'over_assigned';

interface FilterState {
  status: ItemStatus[];
  searchText: string;
  customFilters: Record<string, any>;
}

const useItemFilters = () => {
  const [filters, setFilters] = useState<FilterState>({
    status: [],
    searchText: '',
    customFilters: {},
  });
  
  // TanStack Table v8との統合
  const table = useReactTable({
    data: items,
    columns,
    filterFns: {
      status: (row, columnId, filterValue) => {
        const item = row.original;
        const status = calculateItemStatus(item);
        return filterValue.includes(status);
      },
    },
    state: {
      columnFilters: [
        { id: 'status', value: filters.status },
        { id: 'global', value: filters.searchText },
      ],
    },
  });
  
  return { table, filters, setFilters };
};

// 2. ステータス計算の一元化
const calculateItemStatus = (item: Item): ItemStatus => {
  const assignedRatio = item.assignedQty / item.totalQty;
  
  if (assignedRatio === 0) return 'unassigned';
  if (assignedRatio < 1) return 'partially_assigned';
  if (assignedRatio === 1) return 'fully_assigned';
  return 'over_assigned';
};

// 3. フィルタUIコンポーネント
const StatusFilter: React.FC = () => {
  const { filters, setFilters } = useItemFilters();
  
  const statusOptions = [
    { value: 'unassigned', label: '未割当', color: 'red' },
    { value: 'partially_assigned', label: '一部割当', color: 'yellow' },
    { value: 'fully_assigned', label: '割当済', color: 'green' },
    { value: 'over_assigned', label: '割当超過', color: 'purple' },
  ];
  
  return (
    <div className="flex gap-2">
      {statusOptions.map(option => (
        <FilterChip
          key={option.value}
          label={option.label}
          color={option.color}
          selected={filters.status.includes(option.value)}
          onChange={(selected) => {
            setFilters(prev => ({
              ...prev,
              status: selected
                ? [...prev.status, option.value]
                : prev.status.filter(s => s !== option.value),
            }));
          }}
        />
      ))}
    </div>
  );
};
```

---

### 5. No.24: MSRGridでリロード後のベンダーリスト問題

#### 問題分析
- リロード後にベンダーリストの初期化が失敗
- 非同期データ取得のタイミング問題

#### フロントエンド改修

```typescript
// 1. TanStack Query v5のprefetchingを活用
const useMSRGrid = () => {
  const queryClient = useQueryClient();
  
  // プリフェッチでベンダーリストを事前取得
  useEffect(() => {
    queryClient.prefetchQuery({
      queryKey: ['vendors'],
      queryFn: fetchVendors,
      staleTime: 5 * 60 * 1000, // 5分間キャッシュ
    });
  }, []);
  
  // Suspenseで確実にデータを取得
  const { data: vendors } = useSuspenseQuery({
    queryKey: ['vendors'],
    queryFn: fetchVendors,
  });
  
  return { vendors };
};

// 2. 明示的なベンダーリスト取得ボタン
const VendorSelectionPanel: React.FC = () => {
  const [showVendors, setShowVendors] = useState(false);
  const { data: vendors, refetch } = useQuery({
    queryKey: ['vendors'],
    queryFn: fetchVendors,
    enabled: false, // 手動取得
  });
  
  const handleLoadVendors = async () => {
    await refetch();
    setShowVendors(true);
  };
  
  return (
    <>
      {!showVendors ? (
        <Button onClick={handleLoadVendors}>
          ベンダーリストを読み込む
        </Button>
      ) : (
        <VendorList vendors={vendors} />
      )}
    </>
  );
};
```

#### バックエンド改修

```typescript
// ベンダーリストのキャッシュ戦略
class VendorService {
  private cache = new Map<string, { data: Vendor[], timestamp: number }>();
  private CACHE_TTL = 5 * 60 * 1000; // 5分
  
  async getVendors(projectId: string): Promise<Vendor[]> {
    // キャッシュチェック
    const cached = this.cache.get(projectId);
    if (cached && Date.now() - cached.timestamp < this.CACHE_TTL) {
      return cached.data;
    }
    
    // DB取得
    const vendors = await this.fetchFromDB(projectId);
    
    // キャッシュ更新
    this.cache.set(projectId, {
      data: vendors,
      timestamp: Date.now(),
    });
    
    return vendors;
  }
}
```

---

### 6. No.25: PIP編集時のPIPCode表示問題

#### 問題分析
- 編集時と生成時で同じ表示ロジックを使用
- モード判定が不適切

#### フロントエンド改修

```typescript
// 1. モード別表示コンポーネント
const PipCodeDisplay: React.FC<{ mode: 'edit' | 'create' }> = ({ mode }) => {
  const { pipCode, tempPipCode } = usePipStore();
  
  // React 19の条件付きレンダリング改善
  return (
    <div className="pip-code-display">
      {mode === 'edit' ? (
        <div className="flex items-center gap-2">
          <label className="font-semibold">PIP Code:</label>
          <span className="text-lg">{pipCode}</span>
          <Badge variant="secondary">編集中</Badge>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <label className="font-semibold">PIP Code (仮):</label>
          <span className="text-lg text-gray-500">{tempPipCode}</span>
          <Badge variant="outline">生成中</Badge>
        </div>
      )}
    </div>
  );
};

// 2. 状態管理の改善
interface PipState {
  mode: 'edit' | 'create' | 'view';
  pipCode: string | null;
  tempPipCode: string | null;
  isDirty: boolean;
}

const usePipMode = () => {
  const [state, setState] = useState<PipState>({
    mode: 'view',
    pipCode: null,
    tempPipCode: null,
    isDirty: false,
  });
  
  const initEditMode = (pipCode: string) => {
    setState({
      mode: 'edit',
      pipCode,
      tempPipCode: null,
      isDirty: false,
    });
  };
  
  const initCreateMode = () => {
    setState({
      mode: 'create',
      pipCode: null,
      tempPipCode: generateTempCode(),
      isDirty: false,
    });
  };
  
  return { state, initEditMode, initCreateMode };
};
```

---

## 🚀 実装フェーズ

### Phase 1: 基盤整備 (2週間)
1. **開発環境のアップグレード**
   - React 19、TypeScript 5.6、TanStack Query v5へのアップグレード
   - 依存関係の更新と互換性確認
   - ESLint、Prettierの設定更新

2. **共通コンポーネントの実装**
   - メッセージシステム
   - フィルタシステム
   - 状態管理の統一

### Phase 2: バグ修正実装 (3週間)
1. **Week 1**: No.19, No.25の実装
2. **Week 2**: No.20, No.21の実装
3. **Week 3**: No.23, No.24の実装

### Phase 3: テストと最適化 (1週間)
1. **単体テスト**の実装
2. **統合テスト**の実施
3. **パフォーマンステスト**と最適化

### Phase 4: デプロイ (3日)
1. **ステージング環境**での検証
2. **本番環境**への段階的デプロイ
3. **モニタリング**と問題対応

---

## 📊 成功指標

### パフォーマンス指標
- **初期読み込み時間**: 30%削減
- **API レスポンス時間**: 平均200ms以下
- **メモリ使用量**: 20%削減

### 品質指標
- **バグ発生率**: 50%削減
- **テストカバレッジ**: 80%以上
- **TypeScript型カバレッジ**: 95%以上

### ユーザビリティ指標
- **ユーザー満足度**: 4.5/5.0以上
- **操作完了率**: 95%以上
- **エラー遭遇率**: 5%以下

---

## ⚠️ リスクと対策

### 技術的リスク

| リスク | 影響度 | 対策 |
|--------|--------|------|
| React 19移行の互換性問題 | 高 | 段階的移行、十分なテスト期間の確保 |
| パフォーマンス劣化 | 中 | プロファイリングツールによる継続的監視 |
| 既存機能への影響 | 高 | Feature Flagによる段階的リリース |

### 運用リスク

| リスク | 影響度 | 対策 |
|--------|--------|------|
| ユーザー教育不足 | 中 | 操作マニュアルの作成、トレーニングセッション |
| データ移行問題 | 低 | バックアップとロールバック計画 |
| 本番環境での不具合 | 高 | Blue-Greenデプロイメント戦略 |

---

## 🔧 必要なバックエンド改修

### API改善
1. **レスポンス形式の統一**
   - 全APIで統一されたレスポンス構造
   - エラーコードの体系化
   - メッセージの多言語対応

2. **パフォーマンス最適化**
   - データベースクエリの最適化
   - キャッシュ戦略の実装
   - バッチ処理の導入

3. **バリデーション強化**
   - 入力値の厳密な検証
   - ビジネスロジックの検証
   - 整合性チェック

### データベース改修
1. **インデックス最適化**
   - 頻繁に検索される列へのインデックス追加
   - 複合インデックスの見直し

2. **トランザクション管理**
   - 適切な分離レベルの設定
   - デッドロック対策

---

## 📚 参考資料

### 公式ドキュメント
- [React 19 Documentation](https://react.dev/blog/2024/12/05/react-19)
- [TypeScript 5.6 Release Notes](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-6.html)
- [TanStack Query v5 Migration Guide](https://tanstack.com/query/latest/docs/framework/react/guides/migrating-to-v5)

### 関連ドキュメント
- [state-management-optimization-strategy.md](./state-management-optimization-strategy.md)
- [unassigned-qty-zero-filtering-implementation.md](./unassigned-qty-zero-filtering-implementation.md)
- [refactoring-analysis-2025.md](./refactoring-analysis-2025.md)

---

## 🎯 次のアクション

1. **技術検証** (〜1月20日)
   - React 19の動作確認
   - TanStack Query v5の移行テスト

2. **詳細設計** (〜1月25日)
   - 各バグの詳細設計書作成
   - APIインターフェース定義

3. **実装開始** (1月26日〜)
   - Phase 1の基盤整備から着手

---

*このドキュメントは2025年1月14日時点の分析に基づいています。実装時は最新の技術動向を確認してください。*