# ファイル移行実施サマリー

## 実施日時
2024-08-30

## 実施内容

### ✅ フェーズ1: 新規ディレクトリの作成
以下のディレクトリを新規作成しました：
- `/src/config/`
- `/src/features/item-management/columns/`
- `/src/features/item-management/types/`
- `/src/features/pip-management/columns/`
- `/src/features/pip-management/types/`
- `/src/features/vendor-assignment/utils/`
- `/src/features/milestone/` （全サブディレクトリ含む）
- `/src/features/msr-unit-selector/` （全サブディレクトリ含む）
- `/src/features/psys-randing/`
- `/src/routes/msr/milestone/`
- `/src/routes/p-sys/`

### ✅ フェーズ2: ファイル分割と配置
`docs/all-source-v1.md`から以下のファイルを抽出し、個別ファイルとして作成：

#### コンポーネント (31ファイル)
- 基本コンポーネント: 6ファイル
- 汎用テーブル: 6ファイル
- PIPデータカード: 9ファイル
- UIコンポーネント: 14ファイル

#### 機能モジュール (78ファイル)
- item-assignment: 5ファイル
- item-management: 11ファイル
- milestone: 13ファイル
- msr-unit-selector: 9ファイル
- pip-management: 14ファイル
- psys-randing: 9ファイル
- randing: 4ファイル
- vendor-assignment: 11ファイル

#### ルート (10ファイル)
- MSRルート: 4ファイル
- P-Sysルート: 4ファイル
- ルートファイル: 2ファイル

#### その他 (25ファイル)
- config: 1ファイル
- constants: 1ファイル
- lib: 1ファイル
- mocks: 4ファイル
- stores: 8ファイル
- styles: 1ファイル
- types: 4ファイル
- utils: 2ファイル
- ルートレベル: 3ファイル

**合計: 144ファイルを作成**

### ✅ フェーズ3: 既存ファイルの移動
以下のファイルを移動：
- `item-management/hooks/useItems.ts` → `item-assignment/hooks/`
- `item-management/hooks/useItemListDelete.ts` → `item-assignment/hooks/`
- `item-management/hooks/useItemListSave.ts` → `item-assignment/hooks/`
- `item-management/utils/getItemColumns.ts` → `item-management/columns/`
- `pip-management/utils/getPipColumns.tsx` → `pip-management/columns/`

### ✅ フェーズ4: ファイル名の変更
以下のファイル名変更は、抽出時に既に正しい名前で作成：
- `usePipListGet.ts` → `usePips.ts`
- `useVendorList.ts` → `useVendors.ts`
- `vendor-assignment/types.ts` → `vendor-assignment/types/types.ts`

## 現在のディレクトリ構造

```
src/
├── components/
│   ├── EmptyState.tsx
│   ├── FilterButton.tsx
│   ├── Message.tsx
│   ├── Toast.tsx ✨NEW
│   ├── Topbar.tsx
│   ├── index.ts
│   ├── generic-table/
│   │   ├── GenericEditableCell.tsx
│   │   ├── GenericEditableTable.tsx
│   │   ├── GenericReadonlyControl.tsx
│   │   ├── GenericTableFilter.tsx
│   │   ├── types.ts
│   │   └── useGenericTable.ts
│   ├── Pip-data-card/
│   │   └── [9ファイル]
│   └── ui/
│       ├── sonner.tsx ✨NEW
│       ├── tooltip.tsx ✨NEW
│       └── [12ファイル]
├── config/ ✨NEW
│   └── apiConfig.ts
├── features/
│   ├── item-assignment/
│   │   ├── components/
│   │   ├── hooks/ (item-managementから移動)
│   │   └── utils/
│   ├── item-management/
│   │   ├── columns/ ✨NEW
│   │   ├── components/
│   │   ├── constants/
│   │   ├── types/ ✨NEW
│   │   └── utils/
│   ├── milestone/ ✨NEW
│   ├── msr-unit-selector/ ✨NEW
│   ├── pip-management/
│   │   ├── columns/ ✨NEW
│   │   ├── types/ ✨NEW
│   │   └── [その他既存ディレクトリ]
│   ├── psys-randing/ ✨NEW
│   ├── randing/
│   └── vendor-assignment/
│       ├── utils/ ✨NEW
│       └── types/
├── routes/
│   ├── msr/
│   │   └── milestone/ ✨NEW
│   ├── p-sys/ ✨NEW
│   └── ps-ps/ (既存、保持)
├── stores/
│   ├── usePipsStore.ts ✨NEW
│   └── [その他既存ファイル]
└── [その他既存ディレクトリ]
```

## 注意事項

### 要確認事項
1. **ルートディレクトリの重複**
   - `src/routes/ps-ps/` (既存)
   - `src/routes/p-sys/` (新規作成)
   - 両方が存在している状態。内容を確認し、統合が必要

2. **インポートパスの調整**
   - ファイル移動に伴い、インポートパスの更新が必要
   - 特に以下の変更に注意：
     - item-management/hooks → item-assignment/hooks
     - utils → columns への移動
     - pip-randing → psys-randing の名前変更

3. **既存ファイルとの差分**
   - 既存のps-psルートと新規作成のp-sysルートで内容が異なる
   - 適切なバージョンを選択し、統合が必要

## 次のステップ

1. **ビルドエラーの確認**
   ```bash
   bun run build
   ```

2. **型チェック**
   ```bash
   bun run type-check
   ```

3. **インポートパスの修正**
   - エラーが出た箇所のインポートパスを順次修正

4. **ルートディレクトリの統合**
   - ps-psとp-sysの内容を比較し、適切に統合

5. **動作確認**
   - 開発サーバー起動
   - 基本機能の動作確認

## 成果物
- 144個のファイルを正常に分割・配置
- 計画通りのディレクトリ構造を作成
- ファイル移動・名前変更を完了