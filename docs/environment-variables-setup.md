# 環境変数セットアップガイド

## 📋 概要

PS-PSプロジェクトでは、環境変数を使用してAPI URLや各種設定を管理します。これにより、開発環境と本番環境で異なる設定を安全に管理できます。

## 🚀 クイックスタート

### 1. .envファイルの作成

```bash
# プロジェクトルートで実行
cp .env.example .env
```

### 2. .envファイルの編集

作成された`.env`ファイルを開き、環境に応じた値を設定します：

```bash
# エディタで開く
code .env
# または
vim .env
```

### 3. 開発サーバーの再起動

環境変数を変更した後は、開発サーバーを再起動する必要があります：

```bash
# Ctrl+Cで停止後
bun run dev
```

## 📝 環境変数一覧

### 必須設定

| 変数名 | 説明 | 例 |
|--------|------|-----|
| `VITE_MSR_API_URL` | MSR APIのベースURL | `http://ztesta/GX_PMSR_TEST1` |
| `VITE_PSYS_API_URL` | PSYS APIのベースURL | `http://testservb.xx.co.jp/GX_PSYS_TEST2` |

### オプション設定

| 変数名 | 説明 | デフォルト値 |
|--------|------|-------------|
| `VITE_ENABLE_DEBUG` | デバッグモードの有効化 | `false` |
| `VITE_ENABLE_MOCK_API` | モックAPIの使用 | `false` |
| `VITE_APP_TITLE` | アプリケーションタイトル | `PS-PS System` |
| `VITE_DEFAULT_LOCALE` | デフォルトの言語設定 | `ja` |

## 🔧 コード内での使用方法

### 環境変数の読み込み

```typescript
// src/config/apiConfig.ts
const MSR_BASE_URL = import.meta.env.VITE_MSR_API_URL;
const PSYS_BASE_URL = import.meta.env.VITE_PSYS_API_URL;

// 環境変数が設定されているかチェック
if (!MSR_BASE_URL || !PSYS_BASE_URL) {
  throw new Error('必要な環境変数が設定されていません。.envファイルを確認してください。');
}
```

### TypeScriptでの型定義

環境変数の型安全性を確保するため、型定義ファイルを作成します：

```typescript
// src/types/env.d.ts
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_MSR_API_URL: string
  readonly VITE_PSYS_API_URL: string
  readonly VITE_ENABLE_DEBUG?: string
  readonly VITE_ENABLE_MOCK_API?: string
  readonly VITE_APP_TITLE?: string
  readonly VITE_DEFAULT_LOCALE?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
```

### 条件付き処理の例

```typescript
// デバッグモードでのみログを出力
if (import.meta.env.VITE_ENABLE_DEBUG === 'true') {
  console.log('Debug:', data);
}

// モックモードの切り替え
const apiClient = import.meta.env.VITE_ENABLE_MOCK_API === 'true' 
  ? mockApiClient 
  : realApiClient;
```

## 🔒 セキュリティ注意事項

### ⚠️ 重要な注意点

1. **`.env`ファイルは絶対にGitにコミットしない**
   - `.gitignore`に`.env`が含まれていることを確認
   - `.env.example`のみをバージョン管理

2. **機密情報の取り扱い**
   - APIキーやパスワードを環境変数に含める場合は特に注意
   - 本番環境では環境変数をサーバー側で安全に管理

3. **公開される変数名**
   - `VITE_`プレフィックスがついた変数のみがブラウザに公開される
   - 機密情報は`VITE_`プレフィックスを付けない

### .gitignoreの設定確認

```gitignore
# 環境変数ファイル
.env
.env.local
.env.*.local

# テンプレートファイルは管理対象
!.env.example
```

## 🚨 トラブルシューティング

### 環境変数が読み込まれない

1. **ファイル名を確認**
   - `.env`（正しい）
   - `env`や`.env.txt`ではない

2. **変数名のプレフィックスを確認**
   - Viteでは`VITE_`で始まる変数のみ公開される

3. **開発サーバーを再起動**
   ```bash
   # サーバーを停止して再起動
   bun run dev
   ```

### TypeScriptエラーが出る

型定義ファイルが存在することを確認：

```bash
# ファイルの存在確認
ls src/types/env.d.ts

# 存在しない場合は作成
mkdir -p src/types
touch src/types/env.d.ts
```

### 本番ビルドでの環境変数

ビルド時に環境変数を指定：

```bash
# 本番用の環境変数でビルド
VITE_MSR_API_URL=https://prod-api.example.com bun run build

# または.env.productionファイルを使用
cp .env.production .env
bun run build
```

## 📚 参考リンク

- [Vite - 環境変数とモード](https://ja.vitejs.dev/guide/env-and-mode.html)
- [TypeScript - 宣言ファイル](https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html)

## 🎯 次のステップ

環境変数の設定が完了したら、以下を実施してください：

1. **APIエンドポイントの更新**
   - `src/config/apiConfig.ts`で環境変数を使用するよう更新

2. **ハードコードされたURLの置き換え**
   - プロジェクト全体で直接記述されたAPI URLを環境変数に置き換え

3. **チーム内での共有**
   - `.env.example`を最新の状態に保ち、チームメンバーと共有

---

最終更新日: 2024年12月