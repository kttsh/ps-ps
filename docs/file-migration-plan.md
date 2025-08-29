# ファイル移行計画書

## 概要
`docs/all-source-v1.md`ファイルに記載されている統合ソースコードを、個別のファイルに分割し、適切なディレクトリ構造に配置する計画書です。

## 移行方針
- 単純にファイルを分割し、記載通りのフォルダ構造に配置
- コードの改善や修正は行わない
- Windows形式のパス（`\ps-ps\src\...`）をUnix形式（`/src/...`）に変換

## ディレクトリ構造

### 1. コンポーネント (`/src/components/`)

#### 基本コンポーネント
- `EmptyState.tsx` - 空状態表示コンポーネント
- `FilterButton.tsx` - フィルターボタンコンポーネント
- `Message.tsx` - メッセージ表示コンポーネント
- `Toast.tsx` - トースト通知コンポーネント (新規追加)
- `Topbar.tsx` - トップバーコンポーネント
- `index.ts` - エクスポート定義

#### 汎用テーブルコンポーネント (`/src/components/generic-table/`)
- `GenericEditableCell.tsx` - 編集可能セルコンポーネント
- `GenericEditableTable.tsx` - 編集可能テーブルコンポーネント
- `GenericReadonlyControl.tsx` - 読み取り専用コントロール
- `GenericTableFilter.tsx` - テーブルフィルター
- `types.ts` - 型定義
- `useGenericTable.ts` - カスタムフック

#### PIPデータカードコンポーネント (`/src/components/Pip-data-card/`)
- `CardActionGroup.tsx` - アクショングループ
- `constants.tsx` - 定数定義
- `index.ts` - エクスポート定義
- `PipDataCard.tsx` - メインカードコンポーネント
- `PipDataCardContent.tsx` - コンテンツコンポーネント
- `PipDataCardContext.tsx` - コンテキスト
- `PipDataCardHeader.tsx` - ヘッダーコンポーネント
- `PipDataCardItem.tsx` - アイテムコンポーネント

#### UIコンポーネント (`/src/components/ui/`)
- `alert.tsx` - アラートコンポーネント
- `alertMessages.tsx` - アラートメッセージ
- `badge.tsx` - バッジコンポーネント
- `button.tsx` - ボタンコンポーネント
- `card.tsx` - カードコンポーネント
- `checkbox.tsx` - チェックボックス
- `IndeterminateCheckbox.tsx` - 不確定チェックボックス
- `input.tsx` - 入力フィールド
- `label.tsx` - ラベル
- `select.tsx` - セレクトボックス
- `sheet.tsx` - シートコンポーネント
- `sonner.tsx` - Sonnerトースト (新規追加)
- `tooltip.tsx` - ツールチップ (新規追加)

### 2. 機能モジュール (`/src/features/`)

#### アイテム割当機能 (`/src/features/item-assignment/`)
- **components/**
  - `index.ts`
  - `ItemAssignmentView.tsx`
  - `PipCardArea.tsx`
- **hooks/**
  - `usePipGenerate.ts`
  - `useItems.ts` (移動元: item-management)
  - `useItemListDelete.ts` (移動元: item-management)
  - `useItemListSave.ts` (移動元: item-management)
- **utils/**
  - `getItemsForItemTable.ts`

#### アイテム管理機能 (`/src/features/item-management/`)
- **columns/** (新規ディレクトリ)
  - `getItemColumns.ts` (移動元: utils)
- **components/**
  - `ItemTableControls.tsx`
  - `ItemTableControls.types.ts`
- **constants/**
  - `item-filter-placeholders.ts`
- **hooks/** (移動先: item-assignment/hooks/)
  - `useItemListDelete.ts` → item-assignment/hooks/
  - `useItemListSave.ts` → item-assignment/hooks/
  - `useItems.ts` → item-assignment/hooks/
- **types/** (新規ディレクトリ)
  - `item-response.ts`
- **utils/**
  - `index.ts`
  - `styleItemCell.ts`
  - `transformItemResponseToItem.ts`

#### マイルストーン機能 (`/src/features/milestone/`)
- **components/**
  - `CloseRowGroups.tsx`
  - `MilestoneGrid.tsx`
  - `SaveButton.tsx`
- **hooks/**
  - `index.ts`
  - `useMSRData.ts`
  - `useMSRHeader.ts`
- **styles/**
  - `index.css`
- **types/**
  - `milestone.ts`
- **utils/**
  - `createCellTemplate.ts`
  - `createColumnGroups.ts`
  - `getStatus.ts`
  - `saveMilestoneRow.ts`
  - `transformToMilestoneData.ts`

#### MSRユニットセレクター (`/src/features/msr-unit-selector/`)
- **components/**
  - `Filter.tsx`
  - `FilterBar.tsx`
  - `UnitCard.tsx`
  - `UnitCardList.tsx`
- **lib/**
  - `api.ts`
  - `utils.ts`
- **types/**
  - `milestone.ts`
  - `procurement-item.ts`
  - `schedule-unit.ts`

#### PIP管理機能 (`/src/features/pip-management/`)
- **columns/** (新規ディレクトリ)
  - `getPipColumns.tsx` (移動元: utils)
- **components/**
  - `PipDetail.tsx`
  - `PipTable.tsx`
  - `PipTableControls.tsx`
- **constants/**
  - `pip-filter-placeholders.ts`
- **hooks/**
  - `usePipListDelete.ts`
  - `usePips.ts` (名前変更元: usePipListGet.ts)
  - `usePipSaveOverwrite.ts`
- **types/** (新規ディレクトリ)
  - `pip-response.ts`
- **utils/**
  - `getPipData.ts`
  - `getVendorColumns.ts`
  - `stylePipCell.ts`
  - `styleVendorCell.ts`
  - `transformPipResponseToPipData.ts`

#### P-Sys ランディング機能 (`/src/features/psys-randing/`)
- **components/**
  - `AppLogo.tsx`
  - `FGSelector.tsx`
  - `index.ts`
  - `Sidebar.tsx`
  - `SidebarNavigation.tsx`
  - `SplashScreen.tsx`
  - `SplashWrapper.tsx`
- **constants/**
  - `navigation.tsx`
- **hooks/**
  - `useFunctionGroups.ts`

#### ランディング機能 (`/src/features/randing/`)
- **components/**
  - `Message.tsx`
  - `MotionButton.tsx`
  - `ProjectSelector.tsx`
- **mocks/**
  - `projects.ts` (保持)
- **utils/**
  - `transformProjects.ts`

#### ベンダー割当機能 (`/src/features/vendor-assignment/`)
- **components/**
  - `PageHeader.tsx`
  - `PipCardGrid.tsx`
  - `VendorAssignment.tsx`
  - `VendorSelectionPanel.tsx`
- **hooks/**
  - `useVendorAssignment.ts`
  - `useVendors.ts` (名前変更元: useVendorList.ts)
  - `useAipGenerate.ts` (保持)
- **types/**
  - `types.ts` (名前変更元: types.ts)
- **utils/** (新規ディレクトリ)
  - `fetchVendors.ts`
  - `transformVendorResponseToVendorData.ts`
- `index.tsx`

### 3. ルート (`/src/routes/`)

#### MSRルート (`/src/routes/msr/`)
- `route.tsx`
- **milestone/**
  - `$MSRMngCode.tsx`
  - `route.tsx`
- `msr-unit-selector.tsx`

#### P-Sysルート (`/src/routes/p-sys/`)
- `route.tsx`
- `item-assignment.tsx`
- `pips.tsx`
- `vendor-assignment.tsx`

#### ルートファイル
- `__root.tsx`
- `home.tsx`

### 4. その他のディレクトリ

#### 設定 (`/src/config/`)
- `apiConfig.ts`

#### 定数 (`/src/constants/`)
- `messagesList.ts`

#### ライブラリ (`/src/lib/`)
- `utils.ts`

#### モック (`/src/mocks/`)
- `costElementData.ts`
- `ibsCodeData.ts`
- `masterData.ts`
- `selectOptions.ts`

#### ストア (`/src/stores/`)
- `useAlartStore.ts`
- `useFgsStore.ts`
- `useIsSearchTriggeredStore.ts`
- `usePipGenerationModeStore.ts`
- `usePipsStore.ts` (新規追加)
- `useSelectedFgStore.ts`
- `useSelectedJobNoStore.ts`
- `useSelectedProjectStore.ts`

#### スタイル (`/src/styles/`)
- `index.css`

#### 型定義 (`/src/types/`)
- `common.ts`
- `index.ts`
- `pipDataCard.ts`
- `Topbar.ts`

#### ユーティリティ (`/src/utils/`)
- `resetGrobalState.ts`
- `tableUtils.ts`

### 5. ルートレベルファイル

#### ソースルート (`/src/`)
- `main.tsx`
- `routeTree.gen.ts`
- その他の既存ファイル（App.tsx, App.css, index.css, vite-env.d.tsなど）

#### プロジェクトルート (`/`)
- `tsconfig.app.json`
- `tsconfig.json`
- `tsconfig.node.json`
- `vite.config.ts`
- `vitest.workspace.ts`

## 実施手順

### フェーズ1: ディレクトリ構造の作成
1. 新規ディレクトリの作成
   - `/src/config/`
   - `/src/features/item-management/columns/`
   - `/src/features/item-management/types/`
   - `/src/features/pip-management/columns/`
   - `/src/features/pip-management/types/`
   - `/src/features/vendor-assignment/utils/`
   - `/src/routes/msr/milestone/`
   - `/src/routes/p-sys/`

### フェーズ2: ファイル分割と配置
1. `docs/all-source-v1.md`から各ファイルのソースコードを抽出
2. 各ファイルを指定されたディレクトリに作成
3. Windowsパス表記をUnixパス表記に変換

### フェーズ3: ファイル移動
1. 既存ファイルの移動
   - `item-management/hooks/` → `item-assignment/hooks/`
   - `item-management/utils/getItemColumns.ts` → `item-management/columns/`
   - `pip-management/utils/getPipColumns.tsx` → `pip-management/columns/`

### フェーズ4: 名前変更
1. ファイル名の変更
   - `usePipListGet.ts` → `usePips.ts`
   - `useVendorList.ts` → `useVendors.ts`
   - `vendor-assignment/types.ts` → `vendor-assignment/types/types.ts`

### フェーズ5: 新規ファイルの作成
1. 新規追加ファイル
   - `/src/components/Toast.tsx`
   - `/src/components/ui/sonner.tsx`
   - `/src/components/ui/tooltip.tsx`
   - `/src/stores/usePipsStore.ts`

## 注意事項

1. **インポートパスの調整**
   - ファイル移動後、インポートパスの更新が必要
   - 相対パスとエイリアスパス（`@/`）の確認

2. **既存ファイルとの競合**
   - 既存ファイルがある場合は上書きせずに確認
   - 差分がある場合は別途対応を検討

3. **動作確認**
   - 移行後はビルドエラーがないか確認
   - 型チェックとリンターの実行

4. **バージョン管理**
   - 移行前にバックアップまたはgitブランチの作成
   - 段階的にコミットして履歴を残す

## 完了基準

- [ ] すべてのファイルが分割され、適切なディレクトリに配置されている
- [ ] インポートパスが正しく更新されている
- [ ] ビルドエラーがない
- [ ] 型チェックが通る
- [ ] リンターエラーがない

## 移行後の確認項目

1. `npm run build` または `bun run build` が成功する
2. `npm run type-check` または `bun run type-check` が成功する
3. `npm run lint` または `bun run lint` が成功する
4. 開発サーバーが正常に起動する
5. アプリケーションの基本機能が動作する