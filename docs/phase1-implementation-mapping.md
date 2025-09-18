# Phase 1 実装マッピングドキュメント

## 概要
Phase 1の基盤準備における、既存コードから新規ファイルへの移行マッピングを記録。
どの既存ファイルのどの部分が、新しいファイル構造のどこに移行されたかを明確化。

---

## 1. 作成されたディレクトリ構造

```
src/features/milestone/
├── components/
│   ├── MilestoneGrid/        ✅ 作成済み
│   ├── VendorSelection/      ✅ 作成済み  
│   └── GridCells/            ✅ 作成済み
├── hooks/
│   ├── grid/                 ✅ 作成済み
│   └── vendors/              ✅ 作成済み
└── types/
    ├── gridTypes.ts          ✅ 作成済み
    └── vendorTypes.ts        ✅ 作成済み
```

---

## 2. gridTypes.ts への移行マッピング

### ファイル: `src/features/milestone/types/gridTypes.ts` (116行)

| 新しい型定義 | 元のファイル | 元の行番号 | 内容 |
|------------|------------|-----------|------|
| `MilestoneGridProps` | `MilestoneGrid.tsx` | 35-40 | コンポーネントのProps定義 |
| `ColumnDefinition` | `MilestoneGrid.tsx` | 43-53 | カラム定義の型 |
| `GridInitializationOptions` | 新規作成 | - | グリッド初期化オプション |
| `GridMetrics` | 新規作成 | - | グリッドメトリクス情報 |
| `MilestoneGridState` | 新規作成 | - | 複数のuseStateを統合した状態型 |
| `UseMilestoneGridStateReturn` | 新規作成 | - | 状態管理フックの戻り値 |
| `UseGridInitializerReturn` | 新規作成 | - | グリッド初期化フックの戻り値 |
| `InfiniteScrollOptions` | 新規作成 | - | 無限スクロールオプション |
| `UseInfiniteScrollReturn` | 新規作成 | - | 無限スクロールフックの戻り値 |

### 統合された状態（MilestoneGridState）

元のMilestoneGrid.tsxで分散していた以下のuseStateを統合：

| useState変数名 | 元の行番号 | 新しいプロパティ名 |
|---------------|-----------|------------------|
| `wijmoUpdateMode` | 75 | `wijmoUpdateMode` |
| `MSRHeader` | 77 | `MSRHeader` |
| `MSRData` | 79 | `MSRData` |
| `columnGroups` | 81 | `columnGroups` |
| `skipNum` | 83 | `skipNum` |
| `isLoading` | 85 | `isLoading` |
| `_rowCount` | 87 | `rowCount` |
| `_cellCount` | 88 | `cellCount` |
| `assignedVendorCode` | 90 | `assignedVendorCode` |
| `showVendorDialog` | 113 | `showVendorDialog` |

---

## 3. vendorTypes.ts への移行マッピング

### ファイル: `src/features/milestone/types/vendorTypes.ts` (128行)

| 新しい型定義 | 元のファイル | 元の行番号 | 内容 |
|------------|------------|-----------|------|
| `VendorResponse` | `common-api.ts` | 68-72 | ベンダー基本情報 |
| `VendorsApiResponse` | `common-api.ts` | 74-76 | ベンダーリストAPIレスポンス |
| `AIPVendor` | 推測により新規作成 | - | MilestoneGrid.tsx:8のimportから推測 |
| `AIPVendorResponse` | 推測により新規作成 | - | AIPVendor拡張版 |
| `VendorSelectionParams` | 新規作成 | - | handleAssignVendors用パラメータ |
| `VendorAssignmentResult` | 新規作成 | - | 割り当て処理結果 |
| `VendorSelectionManagerProps` | 新規作成 | - | ベンダー選択マネージャーProps |
| `VendorSelectionDialogProps` | 新規作成 | - | ダイアログProps |
| `UseVendorAssignmentParams` | 新規作成 | - | フック用パラメータ |
| `UseVendorAssignmentReturn` | 新規作成 | - | フックの戻り値 |
| `UseVendorRefreshParams` | 新規作成 | - | 更新フック用パラメータ |
| `UseVendorRefreshReturn` | 新規作成 | - | 更新フックの戻り値 |

### 注記
- `AIPVendor`と`AIPVendorResponse`は元ファイルで定義が見つからなかったため、import文と使用箇所から推測して作成
- MilestoneGrid.tsx:8の`import type { AIPVendor, AIPVendorResponse } from '@/types/common-api';`から、これらの型が必要であることを確認

---

## 4. 次のフェーズでの移行予定

### Phase 2: 状態管理の分離
- **useMilestoneGridState.ts**: MilestoneGrid.tsxの56-90, 113行目の状態管理ロジック
- **Context Provider実装**: 新規作成

### Phase 3: ビジネスロジックの分離
- **useVendorAssignment.ts**: MilestoneGrid.tsxの201-288行目（handleAssignVendors）
- **useVendorRefresh.ts**: MilestoneGrid.tsxの170-188行目（refreshGroupData）
- **useGridInitializer.ts**: MilestoneGrid.tsxの297-318行目（initializeGrid）
- **useInfiniteScroll.ts**: スクロール関連のロジック（新規実装）

### Phase 4: UIコンポーネントの分離
- **MilestoneGridView.tsx**: MilestoneGrid.tsxのreturn部分（UI表示）
- **VendorSelectionManager.tsx**: ベンダー選択UI部分
- **GridCellsコンポーネント群**: セル表示ロジック

---

## 5. 既存依存関係の整理

### MilestoneGrid.tsxのimport文の移行先

| import文 | 移行先ファイル |
|---------|--------------|
| `@/components/EmptyState` | MilestoneGridView.tsx |
| `@/stores/*` | useMilestoneGridState.ts |
| `@mescius/wijmo*` | MilestoneGridView.tsx, useGridInitializer.ts |
| `@tanstack/react-router` | MilestoneGrid/index.tsx |
| `lucide-react` | MilestoneGridView.tsx |
| hooks（useFunctionGroups等） | 各種フックファイル |
| utils（createColumnGroups等） | そのまま使用 |

---

## 6. 実装上の注意点

### 型定義の相互参照
- `MSRHeaderType`と`MSRAIPDataType`は既存の`milestone.ts`から参照
- 循環参照を避けるため、gridTypes.tsとvendorTypes.tsでは`any[]`として定義し、実装時に具体的な型を指定

### 後方互換性
- 外部から使用される`MilestoneGridProps`インターフェースは変更なし
- `src/routes/msr/milestone/$MSRMngCode.tsx`からの呼び出しが正常に動作すること

### 段階的移行
- 既存のMilestoneGrid.tsxは当面残し、新実装完了後に置き換え
- 各フェーズでテストを実施し、動作確認後に次フェーズへ

---

**作成日**: 2025年9月18日  
**Phase 1完了日**: 2025年9月18日  
**次回更新予定**: Phase 2実装時