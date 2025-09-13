# Items API

## GET /items/{jobNo}/{fgCode}

購入品リストを取得するAPI

### エンドポイント
```
GET ${PSYS_BASE_URL}/items/{jobNo}/{fgCode}
```

### パラメータ
- `jobNo` (string, required): Job番号
- `fgCode` (string, nullable): Function Groupコード

### リクエスト
```http
GET /items/1169/B
Method: GET
Cache: no-store
```

### レスポンス

#### 成功時 (200 OK)

**新形式（現在のバックエンド）**:
```json
{
  "data": {
    "items": [
      {
        "item_id": 5013,
        "job_no": "1169",
        "fg_code": "B",
        "item_code": "ITM1169-00012",
        "item_name": "バルブ ゲート式 50A - 12",
        "description": "プロジェクト1169用資材。仕様書番号: SPEC-12に準拠。",
        "unit": "m²",
        "quantity": 205,
        "unit_price": 376,
        "total_price": 77080,
        "pip_id": 3013,
        "status": "active",
        "created_at": "2025-09-12T23:22:39.48Z",
        "updated_at": "2025-09-12T23:22:39.48Z"
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

**旧形式（フロントエンドが期待）**:
```json
{
  "items": [
    {
      "itemSurKey": "5013",
      "jobNo": "1169",
      "fgCode": "B",
      "itemNo": "ITM1169-00012",
      "itemCoreNo": "ITM1169-00012",
      "itemName": "バルブ ゲート式 50A - 12",
      "itemQty": "205",
      "itemAssignedQty": "0",
      "itemAssignQty": "0",
      "itemSortKey": "1",
      "itemCostElement": "MATERIAL",
      "itemIBSCode": "IBS-001",
      "itemIbsCode": "IBS-001",
      "itemIsAssign": "N"
    }
  ],
  "Messages": [
    {
      "Id": "INFO_001",
      "Type": 1,
      "Description": "正常に取得しました"
    }
  ]
}
```

### フィールドマッピング

| バックエンド (snake_case) | フロントエンド (camelCase) | 説明 |
|-------------------------|------------------------|------|
| item_id | itemSurKey | アイテム内部キー |
| job_no | jobNo | Job番号 |
| fg_code | fgCode | Function Groupコード |
| item_code | itemNo | アイテム番号 |
| item_code | itemCoreNo | コアアイテム番号（同じ値） |
| item_name | itemName | アイテム名 |
| quantity | itemQty | 数量 |
| assigned_qty | itemAssignedQty | 割り当て済み数量 |
| - | itemAssignQty | 割り当て済み数量（別名） |
| sort_key | itemSortKey | ソートキー |
| cost_element | itemCostElement | コスト要素 |
| ibs_code | itemIBSCode/itemIbsCode | IBSコード |
| is_assign | itemIsAssign | PIP割り当てステータス |

### 注意事項
- フロントエンドでは数値型として扱うフィールドも、APIレスポンスでは文字列として返される
- `transformItemResponseToItem`関数で型変換を行う必要がある
- `itemUnassignedQty`は計算値: `itemQty - itemAssignedQty`