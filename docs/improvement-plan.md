# PS-PS プロジェクト改善計画書

## 📋 概要

本文書は、PS-PS プロジェクトのリファクタリング・改善計画をまとめたものです。React 19、TailwindCSS v4、TanStack 製品、TypeScript 5.9、Bun、Zustand v5の最新機能を活用し、モダンなReactアプリケーションのベストプラクティスに従った改善を実施します。

## 🔍 現状分析と問題点

### 1. アーキテクチャ・状態管理の問題

#### 問題点
- **React Contextによる状態管理の過度な使用** (`src/routes/ps-ps/route.tsx`)
  - サイドバー表示状態、検索トリガー、PIPデータ選択などがContext経由
  - URL更新時に状態が失われる（リロード耐性なし）
  - ブラウザの戻る/進む機能が機能しない
  - 状態の共有リンクが作成できない

#### 現在のコード例
```typescript
// src/routes/ps-ps/route.tsx
const [isSearchTriggered, setIsSearchTriggered] = useState(false);
const [isSidebar, setIsSidebar] = useState(true);
const [selectedPipData, setSelectedPipData] = useState({} as PipData);
```

#### 改善案
- TanStack RouterのURL Search Paramsに移行
- Zustandストアの適切な分割と整理
- URL駆動型の状態管理パターン採用

### 2. コンポーネント設計の問題

#### 問題点
- **巨大な単一コンポーネント** (`src/routes/ps-ps/pips.tsx`: 250行以上)
  - 複数の責務が混在（データフェッチ、表示、編集、削除）
  - useEffect地獄（8個のuseEffect）
  - テストが困難

#### 現在のコード例
```typescript
// src/routes/ps-ps/pips.tsx
const Pips = () => {
  const [pipSelection, setPipSelection] = useState({});
  const [selectedCount, setSelectedCount] = useState(0);
  const [filteredCount, setFilteredCount] = useState(0);
  // ... 20個以上のstate宣言
  
  useEffect(() => { /* Display by Selection処理 */ }, [triggerState]);
  useEffect(() => { /* 削除モード処理 */ }, [pipDeleteMode]);
  useEffect(() => { /* 編集モード処理 */ }, [pipEditMode]);
  // ... さらに多数のuseEffect
};
```

#### 改善案
- カスタムフックへの分離
- React 19の新フック活用（useOptimistic、useFormStatus）
- コンポーネントの責務分離

### 3. データフェッチパターンの問題

#### 問題点
- **useEffectベースのデータフェッチ**
  - 手動でのrefetch実装
  - ローディング・エラー状態の不適切な管理
  - キャッシュ戦略の欠如

#### 現在のコード例
```typescript
// src/routes/ps-ps/pips.tsx
useEffect(() => {
  const fetchAndProcessPipData = async () => {
    try {
      const result = await refetch();
      const fetched = result.data;
      // ... 複雑な処理
    } catch (e) {
      setPipData(emptyPipData);
      showAlert(['SEARCH_FAILURE']);
    }
  };
  fetchAndProcessPipData();
}, [triggerState]);
```

#### 改善案
- TanStack Queryのqueryオプションパターン
- useSuspenseQuery活用
- ローダーベースのデータフェッチ

### 4. TypeScript活用の不足

#### 問題点
- **型安全性の欠如**
  - `any`型の使用（`onSuccess: (data: any) => {}`）
  - 型アサーションの多用（`{} as PipData`）
  - strictモードが未設定の可能性

#### 改善案
- TypeScript 5.9のstrictモード有効化
- 型推論の活用
- ユーティリティ型の活用

### 5. フォーム処理の非効率性

#### 問題点
- **手動のフォーム状態管理**
  - 各入力フィールドでuseState使用
  - バリデーションロジックの散在
  - エラーハンドリングの不統一

#### 改善案
- React 19のuseActionState、useFormStatus活用
- 統一されたフォーム処理パターン

## 🎯 改善実施計画

### フェーズ1: 基盤改善（優先度: 高）

#### 1.1 URL駆動型状態管理への移行
**対象ファイル:**
- `src/routes/ps-ps/route.tsx`
- `src/routes/ps-ps/pips.tsx`
- `src/routes/ps-ps/vendor-assignment.tsx`
- `src/routes/ps-ps/item-assignment.tsx`

**実装内容:**
```typescript
// Before
const [isSidebar, setIsSidebar] = useState(true);

// After
const searchParams = Route.useSearch();
const navigate = Route.useNavigate();

const updateSidebar = (show: boolean) => {
  navigate({
    search: (prev) => ({ ...prev, sidebar: show })
  });
};
```

**期待効果:**
- リロード耐性の実現
- ブラウザナビゲーション対応
- 状態共有URL生成可能

#### 1.2 Zustandストアの最適化
**対象ファイル:**
- `src/stores/*.ts`

**実装内容:**
```typescript
// 機能別にストア分割
// src/stores/pipStore.ts
export const usePipStore = create<PipState>()(
  devtools(
    immer((set) => ({
      pips: [],
      selectedPipCode: null,
      actions: {
        selectPip: (code: string) =>
          set((state) => {
            state.selectedPipCode = code;
          }),
      },
    }))
  )
);

// カスタムフックで簡潔なインターフェース提供
export const useSelectedPip = () => {
  const pips = usePipStore((state) => state.pips);
  const selectedCode = usePipStore((state) => state.selectedPipCode);
  return pips.find(pip => pip.code === selectedCode);
};
```

#### 1.3 TypeScript strictモード有効化
**対象ファイル:**
- `tsconfig.json`

**実装内容:**
```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "alwaysStrict": true
  }
}
```

### フェーズ2: コンポーネント改善（優先度: 高）

#### 2.1 巨大コンポーネントの分割
**対象ファイル:**
- `src/routes/ps-ps/pips.tsx`

**実装内容:**
```typescript
// カスタムフックへの分離
// src/features/pip-management/hooks/usePipManagement.ts
export const usePipManagement = () => {
  const [pipData, setPipData] = useState<PipData>(emptyPipData);
  const [pipSelection, setPipSelection] = useState<Record<string, boolean>>({});
  
  const handleDelete = useCallback(async (selectedPips: Pip[]) => {
    // 削除ロジック
  }, []);
  
  const handleEdit = useCallback((pip: Pip) => {
    // 編集ロジック
  }, []);
  
  return { pipData, pipSelection, handleDelete, handleEdit };
};

// コンポーネントの簡潔化
const Pips = () => {
  const { pipData, pipSelection, handleDelete, handleEdit } = usePipManagement();
  
  return (
    <PipLayout>
      <PipTable data={pipData} selection={pipSelection} />
      <PipDetail pip={selectedPip} />
    </PipLayout>
  );
};
```

#### 2.2 React 19新機能の活用
**対象ファイル:**
- `src/features/*/components/*.tsx`

**実装内容:**
```typescript
// useOptimisticでの楽観的更新
const [optimisticPips, setOptimisticPips] = useOptimistic(pips);

const handleDelete = async (pip: Pip) => {
  setOptimisticPips(prev => prev.filter(p => p.code !== pip.code));
  await deletePipMutation(pip);
};

// useFormStatusでのフォーム状態管理
function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button disabled={pending}>
      {pending ? '処理中...' : '送信'}
    </button>
  );
}
```

### フェーズ3: データフェッチ最適化（優先度: 中）

#### 3.1 TanStack Query最適化
**対象ファイル:**
- `src/features/*/hooks/*.ts`

**実装内容:**
```typescript
// Query Optionsパターン
export const pipQueryOptions = (jobNo: string, fgCode?: string) => 
  queryOptions({
    queryKey: ['pips', jobNo, fgCode],
    queryFn: () => fetchPips(jobNo, fgCode),
    staleTime: 5 * 60 * 1000, // 5分間は再フェッチしない
  });

// Suspense対応
export const usePipSuspense = (jobNo: string, fgCode?: string) => {
  return useSuspenseQuery(pipQueryOptions(jobNo, fgCode));
};
```

#### 3.2 Loaderパターンの実装
**対象ファイル:**
- `src/routes/*.tsx`

**実装内容:**
```typescript
export const Route = createFileRoute('/ps-ps/pips')({
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(pipQueryOptions(jobNo, fgCode)),
  component: Pips,
});
```

### フェーズ4: UI/UX改善（優先度: 中）

#### 4.1 TailwindCSS v4新機能活用
**対象ファイル:**
- `src/**/*.tsx`
- `src/styles/*.css`

**実装内容:**
```css
/* 新しいグラディエント機能 */
.pip-card {
  @apply bg-linear-45 from-blue-500 to-purple-600;
}

/* テキストシャドウ */
.title {
  @apply text-shadow-lg text-shadow-gray-600;
}
```

#### 4.2 仮想スクロール最適化
**対象ファイル:**
- `src/components/generic-table/*.tsx`

**実装内容:**
```typescript
const virtualizer = useVirtualizer({
  count: rows.length,
  getScrollElement: () => scrollContainerRef.current,
  estimateSize: () => 48,
  overscan: 10, // パフォーマンス向上
  scrollMargin: scrollContainerRef.current?.offsetTop ?? 0,
});
```

### フェーズ5: パフォーマンス最適化（優先度: 低）

#### 5.1 コード分割とLazy Loading
**対象ファイル:**
- `src/routes/*.tsx`

**実装内容:**
```typescript
// TypeScript 5.9のDeferred imports
import defer * as HeavyChart from './HeavyChartComponent';

const LazyChart = React.lazy(() => HeavyChart.default);
```

#### 5.2 メモ化の適切な実装
**対象ファイル:**
- `src/features/*/components/*.tsx`

**実装内容:**
```typescript
// 高価な計算のメモ化
const processedData = useMemo(() => 
  expensiveProcessing(rawData), [rawData]
);

// コンポーネントのメモ化
const PipRow = memo(({ pip, onEdit, onDelete }) => {
  // レンダリング最適化
}, (prev, next) => prev.pip.code === next.pip.code);
```

## 📊 実装優先順位

| 優先順位 | タスク | 影響度 | 工数 | 対象ファイル数 |
|---------|--------|--------|------|----------------|
| 1 | URL駆動型状態管理 | 高 | 大 | 4 |
| 2 | Zustandストア最適化 | 高 | 中 | 7 |
| 3 | TypeScript strict化 | 高 | 小 | 1 |
| 4 | 巨大コンポーネント分割 | 高 | 大 | 3 |
| 5 | React 19新機能活用 | 中 | 中 | 10+ |
| 6 | TanStack Query最適化 | 中 | 中 | 8 |
| 7 | Loaderパターン実装 | 中 | 小 | 4 |
| 8 | TailwindCSS v4活用 | 低 | 小 | 多数 |
| 9 | 仮想スクロール最適化 | 低 | 小 | 2 |
| 10 | コード分割実装 | 低 | 中 | 4 |

## 🚀 期待される成果

### 短期的効果（1-2週間）
- URL共有によるコラボレーション向上
- ページリロード耐性の実現
- 型安全性の向上によるバグ削減
- コードの可読性・保守性向上

### 中期的効果（1-2ヶ月）
- パフォーマンス改善（初期ロード30%削減）
- 開発効率の向上（新機能追加時間50%削減）
- テストカバレッジの向上
- UX改善による操作性向上

### 長期的効果（3ヶ月以降）
- 技術的負債の解消
- チーム全体の生産性向上
- 新メンバーのオンボーディング時間短縮
- スケーラビリティの確保

## 📝 実装ガイドライン

### コーディング規約
1. **命名規則**
   - コンポーネント: PascalCase
   - カスタムフック: use接頭辞 + PascalCase
   - 定数: UPPER_SNAKE_CASE
   - その他: camelCase

2. **ファイル構成**
   ```
   src/features/[feature-name]/
   ├── components/     # UIコンポーネント
   ├── hooks/         # カスタムフック
   ├── stores/        # Zustandストア
   ├── queries/       # TanStack Query定義
   ├── utils/         # ユーティリティ関数
   └── types.ts       # 型定義
   ```

3. **インポート順序**
   1. React関連
   2. 外部ライブラリ
   3. 内部モジュール（絶対パス）
   4. 相対パスインポート
   5. スタイルシート

### テスト戦略
- 単体テスト: Vitest使用
- 統合テスト: Testing Library使用
- E2Eテスト: Playwright使用（必要に応じて）

### Git運用
- ブランチ戦略: Git Flow
- コミットメッセージ: Conventional Commits準拠
- PRレビュー必須

## 🔄 段階的移行戦略

### Step 1: 準備フェーズ（1週目）
- [ ] TypeScript strictモード有効化
- [ ] ESLint/Biomeルール強化
- [ ] 開発環境整備

### Step 2: 基盤改善（2-3週目）
- [ ] URL状態管理の部分的導入
- [ ] Zustandストアリファクタリング
- [ ] 型定義の整理

### Step 3: コンポーネント改善（4-5週目）
- [ ] 巨大コンポーネントの分割
- [ ] カスタムフックの抽出
- [ ] React 19機能の段階的導入

### Step 4: 最適化（6週目以降）
- [ ] パフォーマンス計測と改善
- [ ] バンドルサイズ最適化
- [ ] ユーザビリティテスト実施

## 🎓 チーム教育計画

1. **技術勉強会の実施**
   - React 19新機能ハンズオン
   - TanStack Router/Query深掘り
   - TypeScript実践パターン

2. **ドキュメント整備**
   - アーキテクチャ設計書
   - コンポーネントカタログ
   - APIドキュメント

3. **ペアプログラミング推奨**
   - 知識共有の促進
   - コードレビューの質向上

## 📈 成果測定指標

### 技術指標
- TypeScriptカバレッジ: 100%目標
- バンドルサイズ: 30%削減
- 初期ロード時間: 2秒以内
- Lighthouse Score: 90以上

### ビジネス指標
- バグ報告数: 50%削減
- 新機能リリースサイクル: 30%短縮
- 開発者満足度: 向上

## 🚨 リスクと対策

### リスク1: 大規模変更による既存機能への影響
**対策:**
- 段階的移行アプローチ
- 十分なテストカバレッジ確保
- Feature Flagによる段階的リリース

### リスク2: 学習コストの増加
**対策:**
- チーム内勉強会の実施
- ペアプログラミング推進
- 詳細なドキュメント作成

### リスク3: スケジュール遅延
**対策:**
- バッファ時間の確保
- 優先順位の明確化
- 定期的な進捗レビュー

## 📚 参考資料

- [React 19 公式ドキュメント](https://react.dev/)
- [TanStack Router v5 ガイド](https://tanstack.com/router/latest)
- [TanStack Query v5 ガイド](https://tanstack.com/query/latest)
- [Zustand v5 ドキュメント](https://github.com/pmndrs/zustand)
- [TypeScript 5.9 リリースノート](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-9.html)
- [TailwindCSS v4 アップデート](https://tailwindcss.com/docs)

## ✅ まとめ

本改善計画は、PS-PSプロジェクトを最新のReactエコシステムのベストプラクティスに準拠させることを目的としています。段階的な実装により、リスクを最小限に抑えながら、確実な改善を実現します。

特に重要な改善点は以下の3つです：

1. **URL駆動型状態管理への移行** - ユーザビリティとDXの大幅改善
2. **コンポーネント設計の見直し** - 保守性と拡張性の向上
3. **最新機能の活用** - パフォーマンスと開発効率の向上

これらの改善により、より堅牢で保守しやすく、開発効率の高いアプリケーションへと進化させることができます。