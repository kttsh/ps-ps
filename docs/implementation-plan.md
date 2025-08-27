# ファイル分割・配置実装計画

## 概要
`docs/all-source.md` に記載されている全ソースコードを個別ファイルに分割し、適切なフォルダ構造に配置する実装計画です。

## 実装方針
- 改善や修正は行わず、単純にファイルを分割・配置する
- ファイルパスはWindowsパス形式（`\`）からUnix形式（`/`）に変換
- 各ファイルの内容は元のソースコードをそのまま保持

## ファイル構造

### 1. プロジェクト設定ファイル（ルートレベル）
- `.vscode/settings.json` - VS Code設定
- `biome.json` - Biome（フォーマッター・リンター）設定
- `components.json` - shadcn/ui コンポーネント設定
- `package.json` - プロジェクト依存関係・スクリプト
- `package-lock.json` - 依存関係ロックファイル
- `server.ts` - サーバー設定
- `tsconfig.json` - TypeScript設定（メイン）
- `tsconfig.app.json` - TypeScript設定（アプリケーション）
- `tsconfig.node.json` - TypeScript設定（Node.js）
- `vite.config.ts` - Vite設定
- `vitest.workspace.ts` - Vitest設定

### 2. コンポーネント (`src/components/`)

#### 基本コンポーネント
- `EmptyState.tsx` - 空状態表示コンポーネント
- `FilterButton.tsx` - フィルターボタンコンポーネント
- `Message.tsx` - メッセージ表示コンポーネント
- `Topbar.tsx` - トップバーコンポーネント
- `index.ts` - コンポーネントエクスポート

#### Generic Tableコンポーネント (`src/components/generic-table/`)
- `GenericEditableCell.tsx` - 編集可能セルコンポーネント
- `GenericEditableTable.tsx` - 編集可能テーブルコンポーネント
- `GenericReadonlyControl.tsx` - 読み取り専用コントロール
- `GenericTableFilter.tsx` - テーブルフィルターコンポーネント
- `types.ts` - Generic Table型定義
- `useGenericTable.ts` - Generic Tableフック

#### Pip Data Cardコンポーネント (`src/components/Pip-data-card/`)
- `CardActionGroup.tsx` - カードアクショングループ
- `constants.tsx` - 定数定義
- `index.ts` - エクスポート
- `PipDataCard.tsx` - メインカードコンポーネント
- `PipDataCardContent.tsx` - カードコンテンツ
- `PipDataCardContext.tsx` - カードコンテキスト
- `PipDataCardHeader.tsx` - カードヘッダー
- `PipDataCardItem.tsx` - カードアイテム

#### UIコンポーネント (`src/components/ui/`)
- `alert.tsx` - アラートコンポーネント
- `alertMessages.tsx` - アラートメッセージ
- `badge.tsx` - バッジコンポーネント
- `button.tsx` - ボタンコンポーネント
- `card.tsx` - カードコンポーネント
- `checkbox.tsx` - チェックボックスコンポーネント
- `IndeterminateCheckbox.tsx` - 不確定チェックボックス
- `input.tsx` - 入力コンポーネント
- `label.tsx` - ラベルコンポーネント
- `select.tsx` - セレクトコンポーネント
- `sheet.tsx` - シートコンポーネント

### 3. 機能モジュール (`src/features/`)

#### Item Assignment機能 (`src/features/item-assignment/`)
##### コンポーネント
- `components/ItemAssignmentView.tsx`
- `components/PipCardArea.tsx`
##### フック
- `hooks/useItemListDelete.ts`
- `hooks/useItemListSave.ts`
- `hooks/useItems.ts`
- `hooks/usePipGenerate.ts`
##### ユーティリティ
- `utils/getItemsForItemTable.ts`

#### Item Management機能 (`src/features/item-management/`)
##### コンポーネント
- `components/ItemTableControls.tsx`
- `components/ItemTableControls.types.ts`
##### 定数
- `constants/item-filter-placeholders.ts`
##### ユーティリティ
- `utils/getItemColumns.ts`
- `utils/styleItemCell.ts`

#### Pip Management機能 (`src/features/pip-management/`)
##### コンポーネント
- `components/PipDetail.tsx`
- `components/PipTable.tsx`
- `components/PipTableControls.tsx`
##### 定数
- `constants/pip-filter-placeholders.ts`
##### フック
- `hooks/usePipListDelete.ts`
- `hooks/usePipListGet.ts`
- `hooks/usePipSaveOverwrite.ts`
##### ユーティリティ
- `utils/getPipColumns.tsx`
- `utils/getPipData.ts`
- `utils/getVendorColumns.ts`
- `utils/stylePipCell.ts`
- `utils/styleVendorCell.ts`

#### Pip Randing機能 (`src/features/pip-randing/`)
##### コンポーネント
- `components/AppLogo.tsx`
- `components/index.ts`
- `components/Sidebar.tsx`
- `components/SidebarNavigation.tsx`
- `components/SplashScreen.tsx`
- `components/SplashWrapper.tsx`
##### 定数
- `constants/navigation.tsx`
##### フック
- `hooks/useFunctionGroups.ts`

#### Randing機能 (`src/features/randing/`)
##### コンポーネント
- `components/Message.tsx`
- `components/MotionButton.tsx`
##### モック
- `mocks/projects.ts`
##### ユーティリティ
- `utils/transformProjects.ts`

#### Vendor Assignment機能 (`src/features/vendor-assignment/`)
##### コンポーネント
- `components/PageHeader.tsx`
- `components/PipCardGrid.tsx`
- `components/VendorSelectionPanel.tsx`
- `VendorAssignment.tsx`
##### フック
- `hooks/useAipGenerate.ts`
- `hooks/useVendorAssignment.ts`
- `hooks/useVendorList.ts`
##### その他
- `index.tsx`
- `types.ts`

### 4. 定数・設定 (`src/constants/`)
- `messagesList.ts` - メッセージリスト

### 5. ライブラリ (`src/lib/`)
- `utils.ts` - ユーティリティ関数

### 6. モックデータ (`src/mocks/`)
- `costElementData.ts` - コスト要素データ
- `ibsCodeData.ts` - IBSコードデータ
- `masterData.ts` - マスターデータ
- `selectOptions.ts` - 選択オプション

### 7. ルーティング (`src/routes/`)
- `__root.tsx` - ルートレイアウト
- `home.tsx` - ホームページ
- `routeTree.gen.ts` - 生成されたルートツリー
- `msr/route.tsx` - MSRルート
- `ps-ps/item-assignment.tsx` - Item Assignment画面
- `ps-ps/pips.tsx` - PIPs管理画面
- `ps-ps/route.tsx` - PS-PSルート
- `ps-ps/vendor-assignment.tsx` - Vendor Assignment画面

### 8. ストア (`src/stores/`)
- `useAlartStore.ts` - アラート状態管理
- `useFgsStore.ts` - FGS状態管理
- `useIsSearchTriggeredStore.ts` - 検索トリガー状態管理
- `usePipGenerationModeStore.ts` - PIP生成モード状態管理
- `useSelectedFgStore.ts` - 選択FG状態管理
- `useSelectedJobNoStore.ts` - 選択ジョブ番号状態管理
- `useSelectedProjectStore.ts` - 選択プロジェクト状態管理

### 9. スタイル (`src/styles/`)
- `index.css` - グローバルスタイル

### 10. 型定義 (`src/types/`)
- `common.ts` - 共通型定義
- `index.ts` - 型エクスポート
- `pipDataCard.ts` - PIP Data Card型定義
- `Topbar.ts` - Topbar型定義

### 11. ユーティリティ (`src/utils/`)
- `resetGrobalState.ts` - グローバル状態リセット
- `tableUtils.ts` - テーブルユーティリティ

### 12. その他 (`src/`)
- `main.tsx` - アプリケーションエントリーポイント
- `routeTree.gen.ts` - 自動生成ルートツリー

## 実装手順

### Phase 3: srcディレクトリ内のファイル配置
1. コンポーネントファイルを配置
2. 機能モジュールファイルを配置
3. ストア、型定義、ユーティリティファイルを配置
4. ルーティングファイルを配置
5. モックデータファイルを配置

### Phase 4: 検証
1. すべてのファイルが正しく配置されていることを確認
2. ファイル数の確認（合計: 約90ファイル）

## 注意事項
- ファイル内容は改変せず、そのまま配置
- Windowsパス区切り文字（`\`）はUnix形式（`/`）に変換
- 既存ファイルがある場合は上書き

## 実装スケジュール
- 所要時間: 約30-60分
- 自動化スクリプトによる実装を推奨

## 次のステップ
1. 本計画書のレビューと承認
2. 実装作業の開始
3. 配置完了後の動作確認