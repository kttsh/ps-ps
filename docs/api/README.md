# API Documentation

このディレクトリには、購入品管理システム（P-SYS）で使用されるAPIのドキュメントが含まれています。

## API一覧

### 基本API

1. **[Items API](./items-api.md)** - 購入品（アイテム）管理
   - `GET /items/{jobNo}/{fgCode}` - 購入品リスト取得

2. **[PIPs API](./pips-api.md)** - PIP（Purchase Item Package）管理
   - `GET /pips/{jobNo}/{fgCode}` - PIPリスト取得
   - `POST /pips` - PIP作成
   - `POST /pips:merge` - PIP統合
   - `POST /pips:delete` - PIP削除
   - `GET /pips:detail` - PIP詳細取得
   - `POST /pips:copy` - PIPコピー
   - `POST /pips:edit` - PIP編集

3. **[Vendors API](./vendors-api.md)** - ベンダー管理
   - `POST /GetVendorList` - ベンダーリスト取得（レガシー）
   - `POST /pips/{jobNo}/{fgCode}/{pipCode}/aips:attach` - AIP紐付け

4. **[Function Groups API](./function-groups-api.md)** - 機能グループ管理
   - `GET /api/legacy/GetFg` - Function Groupリスト取得

5. **[Milestone API](./milestone-api.md)** - マイルストーン管理
   - `GET /GetMilestoneHeader/MSRHeader` - ヘッダー情報取得
   - `GET /GetMilestoneData/AIPData` - AIPデータ取得
   - `POST /SaveMilestoneData/SaveAll` - データ一括保存
   - `GET /GetPJStatusData/PJStatusData` - プロジェクトステータス取得

## 環境変数

APIのベースURLは環境変数で管理されています：

```env
# MSR（マイルストーン）API
VITE_MSR_API_URL=https://msr-api.example.com

# P-SYS API
VITE_PSYS_API_URL=https://psys-api.example.com

# P-SYS レガシーAPI
VITE_LEGACY_PSYS_API_URL=https://legacy-psys-api.example.com
```

## 共通仕様

### レスポンス形式

#### 成功レスポンスの基本構造
```json
{
  "data": { /* 実データ */ },
  "Messages": [
    {
      "Id": "INFO_001",
      "Type": 1,
      "Description": "正常に処理されました"
    }
  ]
}
```

#### エラーレスポンスの基本構造
```json
{
  "error": {
    "code": "ERROR_001",
    "message": "エラーが発生しました",
    "details": []
  }
}
```

### 認証

現在のところ、認証は実装されていません。今後の実装が予定されています。

### キャッシュ制御

React Queryを使用してクライアント側でキャッシュを管理：
- デフォルトのstaleTime: 5分
- デフォルトのcacheTime: 10分
- 手動でのrefetch機能あり

## データフロー

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Frontend  │────▶│  React Query │────▶│   Backend   │
│  Components │     │    Hooks     │     │     API     │
└─────────────┘     └─────────────┘     └─────────────┘
       │                    │                    │
       │                    │                    │
       ▼                    ▼                    ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Zustand   │     │    Cache     │     │   Database  │
│   Stores    │     │  Management  │     │             │
└─────────────┘     └─────────────┘     └─────────────┘
```

## 命名規則の違い

**重要**: バックエンドとフロントエンドで命名規則が異なります：

- **バックエンド**: snake_case（例: `item_id`, `job_no`）
- **フロントエンド**: camelCase（例: `itemSurKey`, `jobNo`）

変換は`transformItemResponseToItem`などのユーティリティ関数で行われます。

## トラブルシューティング

### データが表示されない場合

1. **React Queryの`enabled`フラグを確認**
   - 一部のhookは`enabled: false`で手動実行が必要

2. **データ変換関数を確認**
   - snake_case → camelCaseの変換が正しく行われているか

3. **レスポンス構造を確認**
   - 新形式（`data.items`）と旧形式（`items`）の両方に対応しているか

### APIエラーの場合

1. **環境変数を確認**
   - `.env`ファイルに正しいAPIのURLが設定されているか

2. **ネットワークタブを確認**
   - ブラウザの開発者ツールでリクエスト/レスポンスを確認

3. **CORSエラーを確認**
   - バックエンドでCORSが適切に設定されているか

## 更新履歴

- 2025-01-13: 初版作成
- 2025-01-13: Items APIのレスポンス形式を新形式に対応