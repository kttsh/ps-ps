# Vendors API

## POST /GetVendorList

ベンダーリストを取得するAPI（レガシーAPI）

### エンドポイント
```
POST ${PSYS_LEGACY_BASE_URL}/GetVendorList
```

### リクエスト

```json
{
  "requestJSON": "{\"fgCode\":\"B\"}"
}
```

**注意**: 
- リクエストボディ内の`requestJSON`は**文字列化されたJSON**
- `fgCode`は1文字目のみ使用される（例: "B01" → "B"）

### レスポンス

#### 成功時 (200 OK)

**レスポンス構造（多重にネストされたJSON）**:
```json
{
  "responseJSON": "{\"statusCode\":200,\"statusMessage\":\"Success\",\"vendor\":\"[{\\\"aipPsysVendorId\\\":\\\"V001\\\",\\\"vendorName\\\":\\\"株式会社サプライヤーA\\\",\\\"vendorCode\\\":\\\"SUP-001\\\"},{\\\"aipPsysVendorId\\\":\\\"V002\\\",\\\"vendorName\\\":\\\"株式会社サプライヤーB\\\",\\\"vendorCode\\\":\\\"SUP-002\\\"}]\"}"
}
```

**パース後の実際のデータ構造**:

1. 第1層パース（responseJSON）:
```json
{
  "statusCode": 200,
  "statusMessage": "Success",
  "vendor": "[{\"aipPsysVendorId\":\"V001\",\"vendorName\":\"株式会社サプライヤーA\",\"vendorCode\":\"SUP-001\"}]"
}
```

2. 第2層パース（vendor）:
```json
[
  {
    "aipPsysVendorId": "V001",
    "vendorName": "株式会社サプライヤーA",
    "vendorCode": "SUP-001"
  },
  {
    "aipPsysVendorId": "V002",
    "vendorName": "株式会社サプライヤーB",
    "vendorCode": "SUP-002"
  },
  {
    "aipPsysVendorId": "V003",
    "vendorName": "株式会社サプライヤーC",
    "vendorCode": "SUP-003"
  }
]
```

### フィールド説明

| フィールド | 型 | 説明 |
|-----------|---|------|
| aipPsysVendorId | string | ベンダーの内部ID |
| vendorName | string | ベンダー名（会社名） |
| vendorCode | string | ベンダーコード |

### 実装例（useVendors hook）

```typescript
const response = await fetch(PSYS_API_URL.GetVendors, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
  },
  cache: 'no-store',
  body: JSON.stringify({
    requestJSON: JSON.stringify({
      fgCode: fgCode?.charAt(0), // 1文字目のみ
    }),
  }),
});

const data = await response.json();

// 多重パース処理
const parsedResponse = JSON.parse(data.responseJSON);
const vendorList = JSON.parse(parsedResponse.vendor);

return vendorList; // VendorResponse[]
```

### エラーハンドリング

以下のケースでエラーをスローする必要がある:
1. `responseJSON`が存在しない
2. `parsedResponse.vendor`が存在しない
3. パース後の`vendorList`が配列でない

---

## POST /pips/{jobNo}/{fgCode}/{pipCode}/aips:attach

PIPにAIP（ベンダー）を紐付けるAPI

### エンドポイント
```
POST ${PSYS_BASE_URL}/pips/{jobNo}/{fgCode}/{pipCode}/aips:attach
```

### パラメータ
- `jobNo` (string, required): Job番号
- `fgCode` (string, required): Function Groupコード
- `pipCode` (string, required): PIPコード

### リクエスト
```json
{
  "aips": [
    {
      "vendorId": "V001",
      "vendorName": "株式会社サプライヤーA"
    },
    {
      "vendorId": "V002",
      "vendorName": "株式会社サプライヤーB"
    }
  ]
}
```

### レスポンス

#### 成功時 (200 OK)
```json
{
  "pipCode": "PIP-001",
  "attachedAipCount": 2,
  "Messages": [
    {
      "Id": "SUCCESS_006",
      "Type": 1,
      "Description": "AIPが正常に紐付けられました"
    }
  ]
}
```

### 注意事項
- このAPIは`useUpdateAip` hookで使用される
- ベンダーの紐付けはPIP単位で行われる
- 複数のベンダーを一度に紐付け可能