# GetFg API 仕様書

## 概要
Function Group（FG）のマスタデータを取得するAPIです。FGは機能グループを表し、購入品の分類に使用されます。

## エンドポイント

### URL
```
GET ${PSYS_LEGACY_BASE_URL}/GetFg
```

### メソッド
`GET`

### 認証
不要

## リクエスト

### パラメータ
なし

### ヘッダー
標準的なHTTPヘッダーのみ

## レスポンス

### ステータスコード
- `200 OK`: 正常に取得完了
- `400 Bad Request`: リクエストエラー
- `404 Not Found`: リソースが見つからない
- `500 Internal Server Error`: サーバー内部エラー

### レスポンス構造

#### 成功時のレスポンス（200 OK）

```json
{
  "responseJSON": "{
    \"fg\": \"[
      {
        \\\"fgCode\\\": \\\"A\\\",
        \\\"fgDescription\\\": \\\"機器・電気\\\"
      },
      {
        \\\"fgCode\\\": \\\"B\\\",
        \\\"fgDescription\\\": \\\"配管\\\"
      },
      {
        \\\"fgCode\\\": \\\"C\\\",
        \\\"fgDescription\\\": \\\"土建\\\"
      }
    ]\"
  }"
}
```

### データ構造の詳細

#### レスポンスの解析手順
1. 最初のJSONをパース: `response.json()`
2. `responseJSON`フィールドをパース: `JSON.parse(data.responseJSON)`
3. `fg`フィールドをパース: `JSON.parse(parsedResponse.fg)`

#### FGオブジェクト

| フィールド | 型 | 説明 | 例 |
|---------|-----|-----|-----|
| `fgCode` | string | FGコード（1文字の識別子） | "A", "B", "C" |
| `fgDescription` | string | FGの説明文 | "機器・電気", "配管", "土建" |

## 実装詳細

### フロントエンド実装

#### 使用方法
```typescript
import { useFunctionGroups } from '@/features/psys-randing/hooks/useFunctionGroups';

// コンポーネント内で使用
const { data: fgData, isLoading, error } = useFunctionGroups();
```

#### データ型定義
```typescript
export type FG = {
  fgCode: string;
  fgDescription: string;
};
```

#### React Query設定
- **Query Key**: `['fgs']`
- **キャッシュ**: React Queryのデフォルト設定に従う
- **エラーハンドリング**: HTTP ステータスコードに基づくエラー処理

### データ変換

#### セレクトボックス用オプション生成
取得したFGデータは、UIコンポーネントで使用するために以下のように変換されます：

```typescript
const options = fgData.map((fg) => ({
  value: fg.fgCode.trim(),                    // 末尾の空白を除去
  label: fg.fgDescription.replace(/\s*:\s*/, ':')  // コロン周りの空白を整形
}));
```

## 使用箇所

### 主な使用コンポーネント
1. **Sidebar.tsx** (`/src/features/psys-randing/components/`)
   - FG選択用セレクトボックスの選択肢として使用
   - 選択されたFGに基づいて購入品リストやPIPリストを取得

2. **MilestoneGrid.tsx** (`/src/features/milestone/components/`)
   - マイルストーン管理でFGデータを参照

### グローバルステート管理
取得したFGデータは`useFgsStore`（Zustand store）に保存され、アプリケーション全体で共有されます。

## エラー処理

### エラー時の動作
1. HTTPステータスが200以外の場合、エラーをスロー
2. React Queryがエラー状態を管理
3. コンソールにエラーログを出力（`console.error`）

### リトライ
React Queryのデフォルトリトライ設定に従う（通常3回まで自動リトライ）

## 注意事項

1. **ネストされたJSON構造**: レスポンスが多重にJSON文字列化されているため、複数回のパース処理が必要
2. **データ整形**: FGコードの末尾空白やFG説明文のコロン周りの空白を整形する必要がある
3. **レガシーAPI**: このAPIは`PSYS_LEGACY_BASE_URL`を使用するレガシーシステムのAPIです

## 関連ファイル

- `/src/features/psys-randing/hooks/useFunctionGroups.ts` - API呼び出しフック
- `/src/stores/useFgsStore.ts` - FGデータのグローバルステート
- `/src/config/apiConfig.ts` - APIエンドポイント設定
- `/src/features/psys-randing/components/Sidebar.tsx` - 主要な使用コンポーネント