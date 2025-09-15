# Milestone API

## GET /GetMilestoneHeader/MSRHeader

マイルストーンヘッダー情報を取得するAPI

### エンドポイント
```
GET ${MSR_BASE_URL}/GetMilestoneHeader/MSRHeader?MSRMngCode={msrMngCode}
```

### パラメータ
- `MSRMngCode` (string, required): MSR管理コード

### リクエスト例
```http
GET /GetMilestoneHeader/MSRHeader?MSRMngCode=MSR-001
```

### レスポンス

#### 成功時 (200 OK)
```json
{
  "msrMngCode": "MSR-001",
  "projectName": "ABC",
  "jobNo": "1169",
  "jobOrderNo": "833860",
  "milestoneTitle": "プロジェクトABC マイルストーン",
  "createdDate": "2025-01-01",
  "updatedDate": "2025-01-15",
  "status": "進行中"
}
```

---

## GET /GetMilestoneData/AIPData

AIPデータを含むマイルストーンデータを取得するAPI

### エンドポイント
```
GET ${MSR_BASE_URL}/GetMilestoneData/AIPData?MSRMngCode={msrMngCode}&SkipNum={skipNum}
```

### パラメータ
- `MSRMngCode` (string, required): MSR管理コード
- `SkipNum` (number, required): スキップ数（ページネーション用）

### リクエスト例
```http
GET /GetMilestoneData/AIPData?MSRMngCode=MSR-001&SkipNum=0
```

### レスポンス

#### 成功時 (200 OK)
```json
{
  "aipDataList": [
    {
      "aipCode": "AIP-001",
      "pipCode": "PIP-001",
      "vendorId": "V001",
      "vendorName": "株式会社サプライヤーA",
      "plannedDate": "2025-02-01",
      "actualDate": null,
      "status": "未着手",
      "items": [
        {
          "itemNo": "ITM1169-00012",
          "itemName": "バルブ ゲート式 50A - 12",
          "quantity": 100,
          "unit": "個"
        }
      ]
    },
    {
      "aipCode": "AIP-002",
      "pipCode": "PIP-002",
      "vendorId": "V002",
      "vendorName": "株式会社サプライヤーB",
      "plannedDate": "2025-02-15",
      "actualDate": "2025-02-10",
      "status": "完了",
      "items": [
        {
          "itemNo": "ITM1169-00042",
          "itemName": "型枠合板 12mm - 42",
          "quantity": 200,
          "unit": "枚"
        }
      ]
    }
  ],
  "totalCount": 50,
  "pageSize": 20,
  "currentPage": 1
}
```

---

## POST /SaveMilestoneData/SaveAll

マイルストーンデータを一括保存するAPI

### エンドポイント
```
POST ${MSR_BASE_URL}/SaveMilestoneData/SaveAll?MilestoneDataJSON
```

### リクエスト
```json
{
  "MilestoneDataJSON": {
    "msrMngCode": "MSR-001",
    "updatedBy": "user123",
    "aipDataList": [
      {
        "aipCode": "AIP-001",
        "plannedDate": "2025-02-05",
        "actualDate": "2025-02-03",
        "status": "完了",
        "remarks": "予定より早く完了"
      },
      {
        "aipCode": "AIP-003",
        "plannedDate": "2025-03-01",
        "actualDate": null,
        "status": "進行中",
        "remarks": ""
      }
    ]
  }
}
```

### レスポンス

#### 成功時 (200 OK)
```json
{
  "success": true,
  "message": "マイルストーンデータが正常に保存されました",
  "updatedCount": 2,
  "timestamp": "2025-01-15T10:30:00Z"
}
```

#### エラー時 (400 Bad Request / 500 Internal Server Error)
```json
{
  "success": false,
  "message": "データの保存に失敗しました",
  "errors": [
    {
      "field": "aipCode",
      "message": "AIP-004が見つかりません"
    }
  ]
}
```

---

## GET /GetPJStatusData/PJStatusData

プロジェクトステータスデータを取得するAPI

### エンドポイント
```
GET ${MSR_BASE_URL}/GetPJStatusData/PJStatusData?MSRMngCode={msrMngCode}
```

### パラメータ
- `MSRMngCode` (string, required): MSR管理コード

### リクエスト例
```http
GET /GetPJStatusData/PJStatusData?MSRMngCode=MSR-001
```

### レスポンス

#### 成功時 (200 OK)
```json
{
  "projectStatus": {
    "msrMngCode": "MSR-001",
    "projectName": "ABC",
    "overallProgress": 65,
    "scheduledCompletion": "2025-06-30",
    "currentPhase": "実装フェーズ",
    "statistics": {
      "totalPips": 20,
      "completedPips": 13,
      "inProgressPips": 5,
      "notStartedPips": 2,
      "totalAips": 45,
      "completedAips": 30,
      "delayedAips": 2
    },
    "milestones": [
      {
        "name": "設計完了",
        "plannedDate": "2025-01-31",
        "actualDate": "2025-01-28",
        "status": "完了"
      },
      {
        "name": "実装50%完了",
        "plannedDate": "2025-03-31",
        "actualDate": null,
        "status": "進行中"
      },
      {
        "name": "テスト開始",
        "plannedDate": "2025-05-01",
        "actualDate": null,
        "status": "未着手"
      }
    ]
  }
}
```

### 使用例（useMSRHeader / useMSRData hooks）

```typescript
// ヘッダー情報取得
export const useMSRHeader = (msrMngCode: string) => {
  return useQuery({
    queryKey: ['msrHeader', msrMngCode],
    queryFn: async () => {
      const url = MSR_API_URL.MSRGetHeader.replace('%1', msrMngCode);
      const response = await fetch(url);
      return response.json();
    },
    enabled: !!msrMngCode,
  });
};

// AIPデータ取得
export const useMSRData = (msrMngCode: string, skipNum: number = 0) => {
  return useQuery({
    queryKey: ['msrData', msrMngCode, skipNum],
    queryFn: async () => {
      const url = MSR_API_URL.MSRGetAIPData
        .replace('%1', msrMngCode)
        .replace('%2', skipNum.toString());
      const response = await fetch(url);
      return response.json();
    },
    enabled: !!msrMngCode,
  });
};
```

### 注意事項
- MSR (Milestone Report) は購入品管理システムのマイルストーン管理機能
- AIP (Approved Item Package) はベンダーに紐付けられた承認済みアイテムパッケージ
- ページネーション対応（SkipNum パラメータ使用）
- URLパラメータは `%1`, `%2` のプレースホルダーを使用