# Function Group API - JobNo フィルタリング拡張仕様

## 概要
Function Group (FG) APIを拡張し、特定のjobNoに関連するFGのみを取得できる機能を追加します。

## 作成日時
- 計画作成日: 2025-01-15
- ブランチ: `feature/improve-fg-api`

## 現状の仕様
### 現在のエンドポイント
```
GET /fgs
```

### 現在のレスポンス
```json
{
  "fgs": [
    {
      "fgCode": "A",
      "fgName": "A:ABCD"
    },
    {
      "fgCode": "B",
      "fgName": "B:BCDE"
    }
  ]
}
```
すべてのFGを取得する仕様となっている。

## 拡張仕様

### 新規エンドポイント追加
```
GET /fgs/{jobNo}
```

### パスパラメータ
| パラメータ | 型 | 必須 | 説明 |
|---------|-----|-----|-----|
| jobNo | string | Yes | プロジェクトのジョブ番号 |

### レスポンス形式
```json
{
  "jobNo": "JOB123",
  "fgs": [
    {
      "fgCode": "A",
      "fgName": "A:ABCD"
    },
    {
      "fgCode": "C",
      "fgName": "C:CDEF"
    }
  ]
}
```

### エラーレスポンス

#### 404 Not Found
jobNoが存在しない場合：
```json
{
  "error": "Job not found",
  "jobNo": "JOB999"
}
```

#### 200 OK (空配列)
jobNoは存在するがFGが割り当てられていない場合：
```json
{
  "jobNo": "JOB456",
  "fgs": []
}
```

## API仕様の比較

| 項目 | 既存API | 拡張API |
|------|---------|---------|
| エンドポイント | `/fgs` | `/fgs/{jobNo}` |
| 用途 | 全FGマスタ取得 | 特定jobNoに関連するFGのみ取得 |
| レスポンス | すべてのFG | フィルタリングされたFG |
| jobNo情報 | なし | レスポンスに含む |

## 実装タスク

### バックエンド
- [ ] 新エンドポイント `/fgs/{jobNo}` の追加
- [ ] jobNoに基づくFGフィルタリングロジックの実装
- [ ] jobNo存在チェック処理
- [ ] エラーハンドリング実装
- [ ] APIドキュメント更新

### フロントエンド
- [ ] API設定に新エンドポイントを追加
  ```typescript
  // src/config/apiConfig.ts
  GetFgsByJobNo: (jobNo: string) => `${PSYS_LEGACY_BASE_URL}/fgs/${jobNo}`,
  ```

- [ ] 新しいフック作成 or 既存フックの拡張
  ```typescript
  // Option 1: 新規フック
  export const useFunctionGroupsByJobNo = (jobNo: string) => {
    return useQuery({
      queryKey: ['fgs', jobNo],
      queryFn: async () => {
        const response = await fetch(PSYS_API_URL.GetFgsByJobNo(jobNo));
        // ...
      },
      enabled: !!jobNo,
    });
  };

  // Option 2: 既存フックの拡張
  export const useFunctionGroups = (jobNo?: string) => {
    return useQuery({
      queryKey: jobNo ? ['fgs', jobNo] : ['fgs'],
      queryFn: async () => {
        const url = jobNo 
          ? PSYS_API_URL.GetFgsByJobNo(jobNo)
          : PSYS_API_URL.GetFgs;
        // ...
      },
    });
  };
  ```

- [ ] 型定義の追加
  ```typescript
  export type FGResponse = {
    fgs: FG[];
  };

  export type FGByJobNoResponse = {
    jobNo: string;
    fgs: FG[];
  };
  ```

- [ ] コンポーネントでの使用方法更新

### テスト
- [ ] 正常系テスト（FGが存在する場合）
- [ ] 正常系テスト（FGが空の場合）
- [ ] 異常系テスト（jobNoが存在しない場合）
- [ ] パフォーマンステスト

## 使用シナリオ

### シナリオ1: プロジェクト選択時のFG絞り込み
1. ユーザーがプロジェクト（jobNo）を選択
2. 選択されたjobNoに関連するFGのみを取得
3. FGセレクトボックスの選択肢を動的に更新

### シナリオ2: 初期表示の最適化
1. プロジェクトが決まっている画面では最初から絞り込まれたFGを表示
2. 不要なFGを表示しないことでUIの簡潔性を向上

## メリット

1. **パフォーマンス向上**
   - 必要なデータのみ取得
   - ネットワーク通信量の削減
   - レスポンスサイズの縮小

2. **UX向上**
   - 関連するFGのみ表示されるため選択が容易
   - プロジェクトコンテキストに応じた動的な選択肢

3. **データ整合性**
   - jobNoとFGの関連性が明確
   - 不適切なFG選択を防止

## 実装上の考慮事項

### キャッシュ戦略
- jobNoごとにReact Queryでキャッシュ
- キャッシュキー: `['fgs', jobNo]`
- 全FG取得用の既存キャッシュ `['fgs']` とは別管理

### 後方互換性
- 既存の `/fgs` エンドポイントは維持
- 段階的な移行が可能

### エラーハンドリング
- jobNoが存在しない場合の適切なフィードバック
- フォールバック処理の実装

## 実装優先順位

1. **Phase 1**: バックエンドAPI実装
   - エンドポイント追加
   - フィルタリングロジック

2. **Phase 2**: フロントエンド基本実装
   - API呼び出し機能
   - 型定義

3. **Phase 3**: UI統合
   - コンポーネントへの組み込み
   - 既存機能との連携

4. **Phase 4**: 最適化
   - キャッシュ戦略の実装
   - パフォーマンスチューニング

## 関連ファイル

### バックエンド
- APIルーティング設定ファイル
- FGデータアクセス層
- jobNoバリデーション処理

### フロントエンド
- `/src/config/apiConfig.ts` - API設定
- `/src/features/psys-randing/hooks/useFunctionGroups.ts` - FG取得フック
- `/src/stores/useFgsStore.ts` - FGグローバルステート
- `/src/features/psys-randing/components/Sidebar.tsx` - 主要使用コンポーネント

## 今後の拡張可能性

1. **複数jobNo対応**
   ```
   GET /fgs?jobNos=JOB1,JOB2,JOB3
   ```

2. **その他のフィルタリング条件**
   ```
   GET /fgs?status=active&category=equipment
   ```

3. **ページネーション対応**
   ```
   GET /fgs?page=1&limit=10
   ```

---

**注意**: この文書は設計段階のものであり、実装前にレビューと承認が必要です。