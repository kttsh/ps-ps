# MilestoneGrid.tsx 分割計画書

## 概要
MilestoneGrid.tsx（324行）を機能別に分割し、1ファイル100行以下を目安に再構成する詳細計画書。
既存機能を維持しながら、保守性・可読性・テスタビリティを向上させる。

---

## 現状分析

### 現在のファイル構成
- **総行数**: 324行
- **useState数**: 15個以上
- **useEffect数**: 6個
- **内部関数**: 5個（handleAssignVendors, refreshGroupData, updateGridMetrics, initializeGrid）
- **責務**: データ取得、状態管理、UI表示、グリッド初期化、ベンダー選択、無限スクロール処理

### 主要な問題点
1. 単一責任原則（SRP）違反 - 複数の責務が混在
2. 状態管理の複雑化 - 15個以上のuseState
3. ビジネスロジックとUI表示の混在
4. テストが困難な巨大コンポーネント
5. 依存関係の不明瞭さ

---

## 分割方針

### アーキテクチャ設計

```
src/features/milestone/
├── components/
│   ├── MilestoneGrid/
│   │   ├── index.tsx                    # メインコンテナ（30行）
│   │   ├── MilestoneGridView.tsx        # 表示コンポーネント（80行）
│   │   ├── MilestoneGridHeader.tsx      # ヘッダー部分（40行）
│   │   ├── MilestoneGridBody.tsx        # ボディ部分（60行）
│   │   └── MilestoneGridFooter.tsx      # フッター部分（30行）
│   ├── VendorSelection/
│   │   ├── VendorSelectionManager.tsx   # ベンダー選択ロジック（90行）
│   │   └── VendorSelectionDialog.tsx    # ダイアログUI（50行）
│   └── GridCells/
│       ├── StatusCell.tsx               # ステータスセル（30行）
│       ├── DateCell.tsx                 # 日付セル（25行）
│       └── ActionCell.tsx               # アクションセル（25行）
├── hooks/
│   ├── grid/
│   │   ├── useMilestoneGridState.ts     # グリッド状態管理（80行）
│   │   ├── useGridInitializer.ts        # グリッド初期化（60行）
│   │   ├── useInfiniteScroll.ts         # 無限スクロール（50行）
│   │   └── useGridMetrics.ts            # メトリクス管理（40行）
│   └── vendors/
│       ├── useVendorAssignment.ts       # ベンダー割当（70行）
│       └── useVendorRefresh.ts          # ベンダー更新（50行）
├── services/
│   ├── gridDataService.ts               # データ取得サービス（60行）
│   └── vendorService.ts                 # ベンダーAPIサービス（50行）
└── types/
    ├── gridTypes.ts                      # グリッド型定義（40行）
    └── vendorTypes.ts                    # ベンダー型定義（30行）
```

---

## 詳細分割計画

### 1. MilestoneGrid/index.tsx（メインコンテナ - 30行）
**責務**: コンポーネント統合、プロップス配布

```typescript
// 主要な機能
- 子コンポーネントの統合
- Context Providerの設定
- 最上位のエラーバウンダリ

// 依存関係
- MilestoneGridView
- useMilestoneGridState
- MilestoneGridProvider
```

### 2. MilestoneGridView.tsx（表示層 - 80行）
**責務**: Wijmoグリッドのレンダリング

```typescript
// 主要な機能
- FlexGridコンポーネントの設定
- カラム定義の適用
- グリッドイベントハンドリング

// 移行する関数
- グリッドレンダリング部分（現在の return 部分）
- グリッド設定ロジック
```

### 3. useMilestoneGridState.ts（状態管理フック - 80行）
**責務**: すべての状態を一元管理

```typescript
// 管理する状態（現在のuseStateを統合）
interface MilestoneGridState {
  wijmoUpdateMode: boolean;
  MSRHeader: MSRHeaderType[];
  MSRData: MSRAIPDataType[];
  columnGroups: ColumnDefinition[];
  skipNum: number;
  isLoading: boolean;
  rowCount: number;
  cellCount: number;
  assignedVendorCode: string;
  showVendorDialog: boolean;
  // アクション
  updateState: (partial: Partial<MilestoneGridState>) => void;
  resetState: () => void;
}

// 移行する内容
- 現在の15個のuseState
- 状態更新ロジック
```

### 4. useGridInitializer.ts（グリッド初期化 - 60行）
**責務**: グリッドの初期設定

```typescript
// 移行する関数
- initializeGrid（現在の297-318行）
- グリッド初期設定のuseEffect
- カラムグループ生成ロジック

// 主要な処理
- CollectionViewの初期化
- カラム設定
- イベントハンドラー登録
```

### 5. useVendorAssignment.ts（ベンダー割当 - 70行）
**責務**: ベンダー選択・割当処理

```typescript
// 移行する関数
- handleAssignVendors（現在の201-288行）
- ベンダー選択関連のロジック

// 主要な処理
- API呼び出し（fetchVendorList）
- 選択処理
- 状態更新
```

### 6. useVendorRefresh.ts（データ更新 - 50行）
**責務**: グループデータの更新

```typescript
// 移行する関数
- refreshGroupData（現在の170-188行）
- データ更新関連のuseEffect

// 主要な処理
- データ再取得
- CollectionView更新
```

### 7. useInfiniteScroll.ts（無限スクロール - 50行）
**責務**: スクロールによるデータ追加読込

```typescript
// 移行する内容
- スクロールイベントハンドラー
- LOAD_MORE_THRESHOLD定数
- skipNum管理ロジック

// 主要な処理
- スクロール位置検出
- 追加データ取得
- CollectionViewへのデータ追加
```

### 8. VendorSelectionManager.tsx（ベンダー選択管理 - 90行）
**責務**: ベンダー選択のビジネスロジック

```typescript
// 主要な機能
- ベンダーリスト取得
- 選択状態管理
- 割当処理の実行

// 分離される部分
- ダイアログ表示ロジック
- API通信処理
```

### 9. gridDataService.ts（データサービス - 60行）
**責務**: グリッドデータの取得・変換

```typescript
// 主要な機能
- MSRHeaderの取得
- MSRDataの取得
- データ変換処理

// 統合する既存フック
- useMSRHeader
- useMSRData
```

---

## インターフェース定義

### 1. コンポーネント間のProps

```typescript
// MilestoneGridViewProps
interface MilestoneGridViewProps {
  collectionView: wjcCore.CollectionView | null;
  columnGroups: ColumnDefinition[];
  isLoading: boolean;
  gridRef: React.RefObject<FlexGrid | null>;
  onCellEdit?: (e: any) => void;
  onScrollEnd?: () => void;
}

// VendorSelectionManagerProps  
interface VendorSelectionManagerProps {
  selectedRows: MSRAIPDataType[];
  onAssignComplete: (vendorCode: string) => void;
  onCancel: () => void;
}
```

### 2. カスタムフックの戻り値

```typescript
// useMilestoneGridState戻り値
interface UseMilestoneGridStateReturn {
  state: MilestoneGridState;
  actions: {
    updateWijmoMode: (mode: boolean) => void;
    setMSRData: (data: MSRAIPDataType[]) => void;
    setColumnGroups: (groups: ColumnDefinition[]) => void;
    // ... その他のアクション
  };
}

// useGridInitializer戻り値
interface UseGridInitializerReturn {
  initializeGrid: (grid: FlexGrid) => void;
  isInitialized: boolean;
  error: Error | null;
}
```

---

## 実装手順

### Phase 1: 基盤準備（1-2日）
1. [ ] 新しいディレクトリ構造を作成
2. [ ] 型定義ファイルの分離（gridTypes.ts, vendorTypes.ts）
3. [ ] テストファイルの準備

### Phase 2: 状態管理の分離（2-3日）
1. [ ] useMilestoneGridState.tsの実装
2. [ ] 状態管理の移行
3. [ ] Context Providerの実装

### Phase 3: ビジネスロジックの分離（3-4日）
1. [ ] useVendorAssignment.tsの実装
2. [ ] useVendorRefresh.tsの実装
3. [ ] useGridInitializer.tsの実装
4. [ ] useInfiniteScroll.tsの実装

### Phase 4: UIコンポーネントの分離（2-3日）
1. [ ] MilestoneGridView.tsxの実装
2. [ ] VendorSelectionManager.tsxの実装
3. [ ] GridCellsコンポーネントの実装

### Phase 5: 統合とテスト（2日）
1. [ ] 新しいMilestoneGrid/index.tsxでの統合
2. [ ] 既存の呼び出し元との互換性確認
3. [ ] パフォーマンステスト
4. [ ] 単体テストの実装

---

## 移行時の注意点

### 1. 後方互換性の維持
- 外部からのPropsインターフェースは変更しない
- `src/routes/msr/milestone/$MSRMngCode.tsx`からの呼び出しが動作すること

### 2. 段階的移行
- 一度にすべてを移行せず、機能単位で段階的に実施
- 各段階でテストを実施し、動作確認

### 3. パフォーマンス監視
- React DevToolsでレンダリング回数を監視
- 不要な再レンダリングが発生していないか確認

### 4. 型安全性の確保
- any型を使用せず、適切な型定義を行う
- TypeScript strictモードでのコンパイル確認

---

## 期待される効果

### 定量的効果
- **ファイルサイズ**: 324行 → 最大90行/ファイル
- **関数の複雑度**: 大幅に低減
- **テストカバレッジ**: 0% → 80%以上を目標
- **ビルド時間**: 約20%短縮見込み

### 定性的効果
- **可読性**: 各ファイルの責務が明確化
- **保守性**: 変更影響範囲の限定化
- **再利用性**: フックの他コンポーネントでの再利用可能
- **テスタビリティ**: 単体テストの記述が容易に
- **開発効率**: 並行開発が可能に

---

## リスクと対策

| リスク | 影響度 | 対策 |
|-------|--------|------|
| 既存機能の破壊 | 高 | 包括的なE2Eテスト実施 |
| パフォーマンス劣化 | 中 | React Profilerでの計測 |
| 複雑度の増加 | 低 | 明確なドキュメント作成 |
| チーム学習コスト | 中 | ペアプロ・レビューの実施 |

---

## 成功指標

1. **必須要件**
   - すべての既存機能が正常動作
   - パフォーマンスの劣化なし
   - TypeScriptエラーゼロ

2. **品質指標**
   - 各ファイル100行以下
   - 関数の循環的複雑度10以下
   - テストカバレッジ80%以上

3. **開発効率指標**
   - 新機能追加時間30%短縮
   - バグ修正時間40%短縮
   - コードレビュー時間25%短縮

---

**作成日**: 2025年9月18日  
**バージョン**: 1.0.0  
**次回レビュー**: Phase 1完了時