# 環境変数外部化仕様書

## 概要
PS-PSシステムでは、環境に依存する設定値を`.env`ファイルで管理し、`src/config/apiConfig.ts`を通じて利用しています。

## 環境変数一覧

### 必須環境変数

| 変数名 | 説明 | デフォルト値 | 例 |
|--------|------|-------------|-----|
| `VITE_MSR_API_URL` | MSR APIのベースURL | なし | `http://ztesta/GX_PMSR_TEST1` |
| `VITE_PSYS_API_URL` | PSYS APIのベースURL | なし | `http://testservb.xx.co.jp/GX_PSYS_TEST2` |

### オプション環境変数

| 変数名 | 説明 | デフォルト値 | 例 |
|--------|------|-------------|-----|
| `VITE_ENABLE_DEBUG` | デバッグモード有効化 | `false` | `true` / `false` |
| `VITE_ENABLE_MOCK_API` | モックAPI使用 | `false` | `true` / `false` |
| `VITE_APP_TITLE` | アプリケーションタイトル | `PS-PS System` | 任意の文字列 |
| `VITE_DEFAULT_LOCALE` | デフォルトロケール | `ja` | `ja` / `en` |

## 実装詳細

### 1. 環境変数の読み込み (`src/config/apiConfig.ts`)

```typescript
// 環境変数からベースURLを取得
const MSR_BASE_URL = import.meta.env.VITE_MSR_API_URL;
const PSYS_BASE_URL = import.meta.env.VITE_PSYS_API_URL;
```

### 2. エンドポイント定義

#### MSR API エンドポイント
```typescript
export const API_URL = {
  MSRGetHeader: `${MSR_BASE_URL}/GetMilestoneHeader/MSRHeader?MSRMngCode=%1`,
  MSRGetAIPData: `${MSR_BASE_URL}/GetMilestoneData/AIPData?MSRMngCode=%1&SkipNum=%2`,
  SaveDataAll: `${MSR_BASE_URL}/SaveMilestoneData/SaveAll?MilestoneDataJSON`,
  GetPJStatusData: `${MSR_BASE_URL}/GetPJStatusData/PJStatusData?MSRMngCode=%1`,
};
```

#### PSYS API エンドポイント
```typescript
export const PSYS_API_URL = {
  base: PSYS_BASE_URL,
  GetItemList: `${PSYS_BASE_URL}/transactions/GetItemList`,
  GetFg: `${PSYS_BASE_URL}/transactions/GetFg`,
  GetPIPList: `${PSYS_BASE_URL}/transactions/GetPIPList`,
  GetVendorList: `${PSYS_BASE_URL}/transactions/GetVendorList`,
  GeneratePIP: `${PSYS_BASE_URL}/transactions/GeneratePIP`,
  GenerateAIP: `${PSYS_BASE_URL}/transactions/GenerateAIP`,
  DeletePIP: `${PSYS_BASE_URL}/transactions/DeletePIP`,
  DeleteItem: `${PSYS_BASE_URL}/transactions/DeleteItem`,
  SaveItem: `${PSYS_BASE_URL}/transactions/SaveItem`,
};
```

### 3. 環境変数の検証

開発環境では、環境変数が設定されていない場合に警告を表示：

```typescript
if (import.meta.env.DEV) {
  if (!import.meta.env.VITE_MSR_API_URL) {
    console.warn('⚠️ 環境変数 VITE_MSR_API_URL が設定されていません。');
  }
  if (!import.meta.env.VITE_PSYS_API_URL) {
    console.warn('⚠️ 環境変数 VITE_PSYS_API_URL が設定されていません。');
  }
}
```

## セットアップ手順

1. `.env.example`をコピーして`.env`ファイルを作成
   ```bash
   cp .env.example .env
   ```

2. `.env`ファイルを環境に応じて編集
   ```env
   VITE_MSR_API_URL=http://your-msr-api-url
   VITE_PSYS_API_URL=http://your-psys-api-url
   VITE_ENABLE_DEBUG=true
   ```

3. アプリケーションを再起動

## 環境別設定

### 開発環境 (`.env.development`)
- デバッグモードを有効化
- 開発用APIエンドポイントを使用

### 本番環境 (`.env.production`)
- デバッグモードを無効化
- 本番用APIエンドポイントを使用
- エラー詳細の非表示

## セキュリティ考慮事項

- `.env`ファイルはGitに**コミットしない**（`.gitignore`に含める）
- APIキーやパスワードなどの機密情報を含む場合は、環境変数名に`SECRET`や`KEY`を含める
- 本番環境では環境変数をサーバー側で安全に管理

## デバッグ機能

環境情報を取得する関数：
```typescript
export const getEnvironmentInfo = () => {
  return {
    msrApiUrl: MSR_BASE_URL,
    psysApiUrl: PSYS_BASE_URL,
    isDebugMode,
    isMockMode,
    appTitle: import.meta.env.VITE_APP_TITLE || 'PS-PS System',
    locale: import.meta.env.VITE_DEFAULT_LOCALE || 'ja',
  };
};
```

デバッグモード有効時は、環境設定情報をコンソールに出力。