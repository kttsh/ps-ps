# API仕様書

## 概要
本書は、PS-PS（調達管理システム）のバックエンドAPIの仕様を定義します。
APIはGo言語で実装し、データベースはMSSQLを使用します。

## 基本設計

### ベースURL
- 開発環境: `http://localhost:8080/api/v1`
- 本番環境: `https://api.ps-ps.example.com/api/v1`

### 認証
シンプルな実装のため、認証は実装しません。（必要に応じて後から追加可能）

### レスポンス形式
すべてのAPIレスポンスは以下の形式に従います：

```json
{
  "data": {}, // 実際のデータ
  "info": {
    "status": "success", // success | error
    "message": "",
    "code": 200
  }
}
```

## APIエンドポイント一覧

### 1. マスタデータAPI

#### 1.1 FG（Function Group）取得
```
GET /fgs
```

**レスポンス:**
```json
{
  "data": {
    "fgs": [
      {
        "fg_code": "A",
        "fg_name": "機器・電気",
        "display_order": 1
      }
    ]
  },
  "info": {
    "status": "success",
    "message": "",
    "code": 200
  }
}
```

### 2. 購入品（Item）関連API

#### 2.1 購入品リスト取得
```
GET /jobs/{jobNo}/fgs/{fgCode}/items
```

**パラメータ:**
- `jobNo`: プロジェクト番号
- `fgCode`: FGコード

**レスポンス:**
```json
{
  "data": {
    "items": [
      {
        "item_id": 1,
        "job_no": "J001",
        "fg_code": "A",
        "item_code": "ITM001",
        "item_name": "配管材料",
        "unit": "個",
        "quantity": 100,
        "unit_price": 1000,
        "total_price": 100000,
        "pip_code": "PIP001",
        "status": "active",
        "created_at": "2025-01-01T00:00:00Z",
        "updated_at": "2025-01-01T00:00:00Z"
      }
    ]
  },
  "info": {
    "status": "success",
    "message": "",
    "code": 200
  }
}
```

#### 2.2 購入品保存
```
POST /jobs/{jobNo}/fgs/{fgCode}/items
```

**リクエストボディ:**
```json
{
  "items": [
    {
      "item_code": "ITM001",
      "item_name": "配管材料",
      "unit": "個",
      "quantity": 100,
      "unit_price": 1000
    }
  ]
}
```

#### 2.3 購入品削除
```
DELETE /jobs/{jobNo}/fgs/{fgCode}/items/{itemId}
```

### 3. PIP（購入品パッケージ）関連API

#### 3.1 PIPリスト取得
```
GET /jobs/{jobNo}/fgs/{fgCode}/pips
```

**レスポンス:**
```json
{
  "data": {
    "pips": [
      {
        "pip_id": 1,
        "pip_code": "PIP001",
        "pip_name": "配管材料パッケージ",
        "job_no": "J001",
        "fg_code": "A",
        "total_amount": 1000000,
        "vendor_id": null,
        "status": "draft",
        "created_at": "2025-01-01T00:00:00Z",
        "updated_at": "2025-01-01T00:00:00Z"
      }
    ]
  },
  "info": {
    "status": "success",
    "message": "",
    "code": 200
  }
}
```

#### 3.2 PIP作成
```
POST /jobs/{jobNo}/fgs/{fgCode}/pips
```

**リクエストボディ:**
```json
{
  "pip_name": "新規PIP",
  "item_ids": [1, 2, 3]
}
```

#### 3.3 PIP詳細取得
```
GET /jobs/{jobNo}/fgs/{fgCode}/pips/{pipCode}
```

**レスポンス:**
```json
{
  "data": {
    "pip": {
      "pip_id": 1,
      "pip_code": "PIP001",
      "pip_name": "配管材料パッケージ",
      "job_no": "J001",
      "fg_code": "A",
      "total_amount": 1000000,
      "vendor_id": null,
      "status": "draft",
      "items": [
        {
          "item_id": 1,
          "item_code": "ITM001",
          "item_name": "配管材料",
          "quantity": 100,
          "unit_price": 1000,
          "total_price": 100000
        }
      ]
    }
  },
  "info": {
    "status": "success",
    "message": "",
    "code": 200
  }
}
```

#### 3.4 PIP編集
```
PUT /jobs/{jobNo}/fgs/{fgCode}/pips/{pipCode}
```

**リクエストボディ:**
```json
{
  "pip_name": "更新されたPIP名",
  "item_ids": [1, 2, 3, 4]
}
```

#### 3.5 PIPコピー
```
POST /jobs/{jobNo}/fgs/{fgCode}/pips/{pipCode}/copy
```

**リクエストボディ:**
```json
{
  "new_pip_name": "コピーされたPIP"
}
```

#### 3.6 PIPマージ
```
POST /jobs/{jobNo}/fgs/{fgCode}/pips/merge
```

**リクエストボディ:**
```json
{
  "pip_codes": ["PIP001", "PIP002"],
  "new_pip_name": "マージされたPIP"
}
```

#### 3.7 PIP削除
```
DELETE /jobs/{jobNo}/fgs/{fgCode}/pips/{pipCode}
```

### 4. ベンダー関連API

#### 4.1 ベンダーリスト取得
```
GET /vendors
```

**レスポンス:**
```json
{
  "data": {
    "vendors": [
      {
        "vendor_id": "V001",
        "vendor_code": "VND001",
        "vendor_name": "株式会社サプライヤーA",
        "contact_person": "山田太郎",
        "phone": "03-1234-5678",
        "email": "vendor@example.com",
        "status": "active"
      }
    ]
  },
  "info": {
    "status": "success",
    "message": "",
    "code": 200
  }
}
```

### 5. AIP（ベンダー割当）関連API

#### 5.1 AIP生成（ベンダー割当）
```
POST /jobs/{jobNo}/fgs/{fgCode}/pips/{pipCode}/assign-vendor
```

**リクエストボディ:**
```json
{
  "vendor_ids": ["V001", "V002"]
}
```

**レスポンス:**
```json
{
  "data": {
    "aips": [
      {
        "aip_id": 1,
        "aip_code": "AIP001",
        "pip_code": "PIP001",
        "vendor_id": "V001",
        "status": "assigned",
        "created_at": "2025-01-01T00:00:00Z"
      }
    ]
  },
  "info": {
    "status": "success",
    "message": "ベンダー割当が完了しました",
    "code": 200
  }
}
```

## エラーレスポンス

### 共通エラー形式
```json
{
  "data": null,
  "info": {
    "status": "error",
    "message": "エラーメッセージ",
    "code": 400
  }
}
```

### HTTPステータスコード
- `200 OK`: 正常処理
- `201 Created`: リソース作成成功
- `400 Bad Request`: リクエスト不正
- `404 Not Found`: リソースが存在しない
- `500 Internal Server Error`: サーバーエラー

## 実装上の注意点

1. **トランザクション管理**: PIP作成/編集時は、関連するItemの更新も含めてトランザクション処理を行う
2. **バリデーション**: 入力値の検証を適切に行う
3. **エラーハンドリング**: 適切なエラーメッセージを返す
4. **パフォーマンス**: N+1問題を避けるため、適切にJOINを使用する
5. **並行処理**: goroutineを活用した効率的な処理を実装する