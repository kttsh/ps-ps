# Function Groups API

## GET /api/legacy/GetFg

Function Group（機能グループ）のリストを取得するAPI

### エンドポイント
```
GET http://localhost:8080/api/legacy/GetFg
```

**注意**: このAPIは`localhost:8080`の固定URLを使用している（環境変数ではない）

### リクエスト
```http
GET /api/legacy/GetFg
Method: GET
Cache: no-store
```

### レスポンス

#### 成功時 (200 OK)
```json
[
  {
    "fgCode": "A",
    "fgDescription": "A:機械設備",
    "fgSortKey": "1"
  },
  {
    "fgCode": "B",
    "fgDescription": "B:配管設備",
    "fgSortKey": "2"
  },
  {
    "fgCode": "C",
    "fgDescription": "C:電気設備",
    "fgSortKey": "3"
  },
  {
    "fgCode": "D",
    "fgDescription": "D:土木工事",
    "fgSortKey": "4"
  },
  {
    "fgCode": "E",
    "fgDescription": "E:建築工事",
    "fgSortKey": "5"
  }
]
```

### フィールド説明

| フィールド | 型 | 説明 |
|-----------|---|------|
| fgCode | string | Function Groupコード（1文字） |
| fgDescription | string | Function Groupの説明（"コード:説明"形式） |
| fgSortKey | string | ソート順序 |

### 使用例（useFunctionGroups hook）

```typescript
export const useFunctionGroups = () => {
  return useQuery<FG[]>({
    queryKey: ['functionGroups'],
    queryFn: async (): Promise<FG[]> => {
      const response = await fetch(PSYS_API_URL.GetFg, {
        method: 'GET',
        cache: 'no-store',
      });

      if (!response.ok) {
        throw new Error(`HTTP status: ${response.status}`);
      }

      return await response.json();
    },
    enabled: true, // 自動実行
    staleTime: 1000 * 60 * 60, // 1時間キャッシュ
  });
};
```

### Sidebarコンポーネントでの使用

Function Groupはサイドバーのセレクトボックスで使用される:

1. APIからFGリストを取得
2. グローバルストア（`useFgsStore`）に保存
3. セレクトボックスのオプションを生成
   - value: `fgCode.trim()`
   - label: `fgDescription.replace(/\\s*:\\s*/, ':')`

```typescript
useEffect(() => {
  if (!fgData) return;
  setFgs(fgData);

  const options = fgData.map((fg) => ({
    value: fg.fgCode.trim(),
    label: fg.fgDescription.replace(/\\s*:\\s*/, ':'),
  }));
  setFgOptions(options);
}, [fgData, setFgs]);
```

### 注意事項
- このAPIはレガシーAPIとして分類されている
- URLが環境変数ではなくハードコードされている
- FGコードは通常1文字（A, B, C, D, E等）
- 選択したFGコードはURLパラメータとして同期される（`useFgCodeUrlSync` hook使用）