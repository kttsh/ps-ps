# PIPs API

## GET /pips/{jobNo}/{fgCode}

PIPリストを取得するAPI

### エンドポイント
```
GET ${PSYS_BASE_URL}/pips/{jobNo}/{fgCode}
```

### パラメータ
- `jobNo` (string, required): Job番号
- `fgCode` (string, nullable): Function Groupコード

### リクエスト
```http
GET /pips/1169/B
Method: GET
Cache: no-store
```

### レスポンス

#### 成功時 (200 OK)
```json
{
  "pipsList": [
    {
      "jobNo": "1169",
      "fgCode": "B",
      "pipCode": "PIP-001",
      "pipNickName": "配管資材PIP",
      "pipSortKey": "1",
      "itemCount": "5",
      "vendorCount": "3"
    },
    {
      "jobNo": "1169",
      "fgCode": "B",
      "pipCode": "PIP-002",
      "pipNickName": "建築資材PIP",
      "pipSortKey": "2",
      "itemCount": "10",
      "vendorCount": "2"
    }
  ]
}
```

---

## POST /pips

新規PIPを作成するAPI

### エンドポイント
```
POST ${PSYS_BASE_URL}/pips
```

### リクエスト
```json
{
  "PipDraft": {
    "jobNo": "1169",
    "fgCode": "B",
    "pipNickName": "新規PIP",
    "items": [
      {
        "itemSurKey": 5013,
        "itemAssignQty": 100
      },
      {
        "itemSurKey": 5043,
        "itemAssignQty": 200
      }
    ]
  }
}
```

### レスポンス

#### 成功時 (201 Created)
```json
{
  "pip": {
    "jobNo": "1169",
    "fgCode": "B",
    "pipCode": "PIP-003",
    "pipNickName": "新規PIP",
    "items": [
      {
        "itemSurKey": "5013",
        "itemName": "バルブ ゲート式 50A - 12",
        "itemAssignQty": "100",
        "itemSortkey": "1",
        "itemCostElement": "MATERIAL",
        "itemIBSCode": "IBS-001"
      }
    ]
  },
  "Messages": [
    {
      "Id": "SUCCESS_001",
      "Type": 1,
      "Description": "PIPが正常に作成されました"
    }
  ]
}
```

---

## POST /pips:merge/{jobNo}/{fgCode}

複数のPIPを統合するAPI

### エンドポイント
```
POST ${PSYS_BASE_URL}/pips:merge/{jobNo}/{fgCode}
```

### パラメータ
- `jobNo` (string, required): Job番号
- `fgCode` (string, nullable): Function Groupコード

### リクエスト
```json
{
  "mergePips": {
    "jobNo": "1169",
    "fgCode": "B",
    "pipNickName": "統合PIP",
    "pips": [
      { "pipCode": "PIP-001" },
      { "pipCode": "PIP-002" }
    ]
  }
}
```

### レスポンス

#### 成功時 (200 OK)
```json
{
  "pip": {
    "pipCode": "PIP-004",
    "pipNickName": "統合PIP"
  },
  "Messages": [
    {
      "Id": "SUCCESS_002",
      "Type": 1,
      "Description": "PIPが正常に統合されました"
    }
  ]
}
```

---

## POST /pips:delete/{jobNo}/{fgCode}

PIPを削除するAPI

### エンドポイント
```
POST ${PSYS_BASE_URL}/pips:delete/{jobNo}/{fgCode}
```

### パラメータ
- `jobNo` (string, required): Job番号
- `fgCode` (string, nullable): Function Groupコード

### リクエスト
```json
{
  "deletePips": {
    "jobNo": "1169",
    "fgCode": "B",
    "pips": [
      { "pipCode": "PIP-001" },
      { "pipCode": "PIP-002" }
    ]
  }
}
```

### レスポンス

#### 成功時 (200 OK)
```json
{
  "Messages": [
    {
      "Id": "SUCCESS_003",
      "Type": 1,
      "Description": "PIPが正常に削除されました"
    }
  ]
}
```

---

## GET /pips:detail/{jobNo}/{fgCode}/{pipCode}

PIPの詳細情報を取得するAPI

### エンドポイント
```
GET ${PSYS_BASE_URL}/pips:detail/{jobNo}/{fgCode}/{pipCode}
```

### パラメータ
- `jobNo` (string, required): Job番号
- `fgCode` (string, required): Function Groupコード
- `pipCode` (string, required): PIPコード

### レスポンス

#### 成功時 (200 OK)
```json
{
  "jobNo": "1169",
  "fgCode": "B",
  "pipCode": "PIP-001",
  "pipNickName": "配管資材PIP",
  "pipSortKey": "1",
  "itemCount": "5",
  "vendorCount": "3",
  "items": [
    {
      "itemSurKey": "5013",
      "jobNo": "1169",
      "fgCode": "B",
      "itemNo": "ITM1169-00012",
      "itemCoreNo": "ITM1169-00012",
      "itemName": "バルブ ゲート式 50A - 12",
      "itemQty": "205",
      "itemAssignedQty": "100",
      "itemSortKey": "1",
      "itemCostElement": "MATERIAL",
      "itemIBSCode": "IBS-001",
      "itemIsAssign": "Y"
    }
  ],
  "aips": [
    {
      "aipCode": "AIP-001",
      "vendorId": "V001",
      "vendorName": "株式会社サプライヤーA"
    }
  ]
}
```

---

## POST /pips:copy/{jobNo}/{fgCode}/{pipCode}

PIPをコピーするAPI

### エンドポイント
```
POST ${PSYS_BASE_URL}/pips:copy/{jobNo}/{fgCode}/{pipCode}
```

### パラメータ
- `jobNo` (string, required): Job番号
- `fgCode` (string, required): Function Groupコード
- `pipCode` (string, required): コピー元のPIPコード

### リクエスト
```json
{
  "pipNickName": "コピーされたPIP"
}
```

### レスポンス

#### 成功時 (201 Created)
```json
{
  "pip": {
    "pipCode": "PIP-005",
    "pipNickName": "コピーされたPIP"
  },
  "Messages": [
    {
      "Id": "SUCCESS_004",
      "Type": 1,
      "Description": "PIPが正常にコピーされました"
    }
  ]
}
```

---

## POST /pips:edit/{jobNo}/{fgCode}/{pipCode}

PIPを編集するAPI

### エンドポイント
```
POST ${PSYS_BASE_URL}/pips:edit/{jobNo}/{fgCode}/{pipCode}
```

### パラメータ
- `jobNo` (string, required): Job番号
- `fgCode` (string, required): Function Groupコード
- `pipCode` (string, required): 編集対象のPIPコード

### リクエスト
```json
{
  "pipNickName": "更新されたPIP名",
  "items": [
    {
      "itemSurKey": 5013,
      "itemAssignQty": 150
    }
  ]
}
```

### レスポンス

#### 成功時 (200 OK)
```json
{
  "pip": {
    "pipCode": "PIP-001",
    "pipNickName": "更新されたPIP名"
  },
  "Messages": [
    {
      "Id": "SUCCESS_005",
      "Type": 1,
      "Description": "PIPが正常に更新されました"
    }
  ]
}
```