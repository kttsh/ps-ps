# 環境変数への移行ガイド

## 移行対象ファイル一覧

以下のファイルでハードコードされたAPI URLを環境変数経由に変更する必要があります：

### ✅ 完了
- [x] `src/config/apiConfig.ts` - 環境変数対応済み
- [x] `src/features/item-assignment/hooks/useItems.ts` - 環境変数対応済み
- [x] `src/features/item-management/hooks/useItems.ts` - 環境変数対応済み
- [x] `src/features/pip-randing/hooks/useFunctionGroups.ts` - 環境変数対応済み
- [x] `src/features/psys-randing/hooks/useFunctionGroups.ts` - 環境変数対応済み
- [x] `src/features/vendor-assignment/hooks/useAipGenerate.ts` - 環境変数対応済み
- [x] `src/features/vendor-assignment/hooks/useVendorList.ts` - 環境変数対応済み
- [x] `src/features/vendor-assignment/hooks/useVendors.ts` - 環境変数対応済み
- [x] `src/features/pip-management/hooks/usePips.ts` - 環境変数対応済み
- [x] `src/features/pip-management/hooks/usePipListGet.ts` - 環境変数対応済み
- [x] `src/features/pip-management/hooks/usePipListDelete.ts` - 環境変数対応済み
- [x] `src/features/pip-management/hooks/usePipSaveOverwrite.ts` - 環境変数対応済み
- [x] `src/features/item-assignment/hooks/usePipGenerate.ts` - 環境変数対応済み

すべてのファイルの移行が完了しました！ ✅

### コメントアウトされているファイル（後で対応）
- `src/features/item-assignment/hooks/useItemListDelete.ts` (コメントアウト中)
- `src/features/item-assignment/hooks/useItemListSave.ts` (コメントアウト中)
- `src/features/vendor-assignment/utils/fetchVendors.ts` (コメントアウト中)

## 移行手順

### 1. インポート文の追加

各ファイルの先頭に以下を追加：

```typescript
import { PSYS_API_URL } from '@/config/apiConfig';
```

### 2. URLの置き換え

ハードコードされたURLを環境変数経由のURLに置き換え：

```typescript
// Before
const response = await fetch(
  'http://testservb.xx.co.jp/GX_PSYS_TEST2/transactions/GetItemList',
  // ...
);

// After  
const response = await fetch(
  PSYS_API_URL.GetItemList,
  // ...
);
```

## 移行後のテスト

1. **開発サーバーの再起動**
   ```bash
   bun run dev
   ```

2. **コンソールログの確認**
   - 環境変数が正しく読み込まれているか確認
   - 警告メッセージが表示されていないか確認

3. **各機能の動作確認**
   - アイテム一覧の取得
   - PIP一覧の取得
   - ベンダー一覧の取得
   - Function Groupの取得

## トラブルシューティング

### URLが正しく設定されない場合

1. `.env`ファイルが存在することを確認
2. 環境変数名が正しいことを確認（`VITE_`プレフィックス必須）
3. 開発サーバーを再起動

### TypeScriptエラーが出る場合

`src/types/env.d.ts`ファイルが存在し、環境変数の型定義があることを確認。