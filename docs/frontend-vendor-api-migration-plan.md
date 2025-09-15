# フロントエンド Vendor API 改修計画書

## 1. 概要

### 1.1 目的
バックエンドのVendor取得API改善に伴い、フロントエンドのAPI呼び出しと型定義を新仕様に対応させる。

### 1.2 改修範囲
- 新API: `GET /vendors/{fgCode}`
- 後方互換性: **不要**（一括置換方式）
- 実装ブランチ: 別ブランチで管理（実装は行わない）

### 1.3 新APIレスポンス仕様
```typescript
{
  "vendors": [
    {
      "vendorId": "1",
      "vendorName": "bokeke", 
      "vendorCode": "XYZ112345"
    },
    {
      "vendorId": "2",
      "vendorName": "nbukuu",
      "vendorCode": "abcZ1244"
    }
  ]
}
```

## 2. 現状分析

### 2.1 現在のAPI構成
- **エンドポイント**: `POST /GetVendorList`
- **リクエスト形式**: POST with JSON body
```typescript
{
  requestJSON: JSON.stringify({
    fgCode: fgCode?.charAt(0)
  })
}
```
- **レスポンス形式**: 多層ラップされたJSON
```typescript
{
  responseJSON: JSON.stringify({
    statusCode: number,
    statusMessage: string,
    vendor: JSON.stringify([...])
  })
}
```

### 2.2 影響を受けるファイル一覧

| ファイルパス | 役割 | 改修内容 |
|------------|------|---------|
| `src/config/apiConfig.ts` | APIエンドポイント定義 | 新エンドポイントへの変更 |
| `src/features/vendor-assignment/hooks/useVendors.ts` | Vendor取得Hook | GET方式への変更、レスポンス処理簡略化 |
| `src/types/common-api.ts` | 型定義 | VendorResponse型の更新 |
| `src/features/vendor-assignment/utils/transformVendorResponseToVendorData.ts` | データ変換 | 新レスポンス形式対応 |
| `src/features/milestone/hooks/useVendorSelectionPanelProps.ts` | Vendor選択パネル | レスポンス解析処理の簡略化 |

## 3. 改修設計

### 3.1 API定義の変更

#### 3.1.1 `src/config/apiConfig.ts`
```typescript
// 変更前
PSYS_API_URL = {
  GetVendors: `${PSYS_LEGACY_BASE_URL}/GetVendorList`,
  // ...
}

// 変更後
PSYS_API_URL = {
  GetVendors: (fgCode: string) => `${PSYS_BASE_URL}/vendors/${fgCode}`,
  // ...
}
```

### 3.2 型定義の更新

#### 3.2.1 `src/types/common-api.ts`
```typescript
// 変更前
export interface VendorResponse {
  aipPsysVendorId: string;
  vendorName: string;
  vendorCode: string;
}

// 変更後
export interface VendorResponse {
  vendorId: string;
  vendorName: string;
  vendorCode: string;
}

export interface VendorsApiResponse {
  vendors: VendorResponse[];
}
```

### 3.3 Hook実装の更新

#### 3.3.1 `src/features/vendor-assignment/hooks/useVendors.ts`
```typescript
// 変更前
export const useVendors = (fgCode: string | null) => {
  return useQuery<VendorResponse[]>({
    queryKey: ['vendors', fgCode],
    queryFn: async (): Promise<VendorResponse[]> => {
      const response = await fetch(PSYS_API_URL.GetVendors, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
        },
        cache: 'no-store',
        body: JSON.stringify({
          requestJSON: JSON.stringify({
            fgCode: fgCode?.charAt(0),
          }),
        }),
      });
      // 複雑なレスポンス解析処理
      const data = await response.json();
      const parsedResponse = JSON.parse(data.responseJSON);
      const vendorList = JSON.parse(parsedResponse.vendor);
      return vendorList;
    },
    enabled: !!fgCode,
  });
};

// 変更後
export const useVendors = (fgCode: string | null) => {
  return useQuery<VendorResponse[]>({
    queryKey: ['vendors', fgCode],
    queryFn: async (): Promise<VendorResponse[]> => {
      if (!fgCode) throw new Error('fgCode is required');
      
      const response = await fetch(PSYS_API_URL.GetVendors(fgCode), {
        method: 'GET',
        headers: {
          'Cache-Control': 'no-cache',
        },
        cache: 'no-store',
      });

      if (!response.ok) {
        throw new Error(`HTTP status: ${response.status}`);
      }

      const data: VendorsApiResponse = await response.json();
      return data.vendors;
    },
    enabled: !!fgCode,
  });
};
```

### 3.4 データ変換処理の更新

#### 3.4.1 `src/features/vendor-assignment/utils/transformVendorResponseToVendorData.ts`
```typescript
// 変更前
export const transformVendorResponseToVendorData = (
  response: VendorResponse[],
): Vendor[] => {
  return response.map((vendor) => ({
    vendorId: vendor.aipPsysVendorId,
    vendorName: vendor.vendorName,
    aipCode: vendor.vendorCode.trim(),
  }));
};

// 変更後
export const transformVendorResponseToVendorData = (
  response: VendorResponse[],
): Vendor[] => {
  return response.map((vendor) => ({
    vendorId: vendor.vendorId,
    vendorName: vendor.vendorName,
    aipCode: vendor.vendorCode.trim(),
  }));
};
```

### 3.5 UIコンポーネントの更新

#### 3.5.1 `src/features/milestone/hooks/useVendorSelectionPanelProps.ts`
```typescript
// 変更前（複雑なJSON解析）
useEffect(() => {
  if (!hasInitialized.current && fetchedVendorJson) {
    try {
      const parsed = JSON.parse(fetchedVendorJson);
      const vendorList: VendorResponse[] = JSON.parse(parsed.vendor);
      const transformedVendorList: Vendor[] = 
        transformVendorResponseToVendorData(vendorList);
      // ...
    } catch (error) {
      console.error('ベンダー情報のパースに失敗しました:', error);
    }
  }
}, [fetchedVendorJson]);

// 変更後（シンプルな処理）
useEffect(() => {
  if (!hasInitialized.current && fetchedVendorJson) {
    try {
      const vendorData: VendorsApiResponse = JSON.parse(fetchedVendorJson);
      const transformedVendorList: Vendor[] = 
        transformVendorResponseToVendorData(vendorData.vendors);
      // ...
    } catch (error) {
      console.error('ベンダー情報のパースに失敗しました:', error);
    }
  }
}, [fetchedVendorJson]);
```

## 4. 移行計画

### 4.1 実装フェーズ

#### Phase 1: 準備
1. 新ブランチ作成: `feature/vendor-api-migration`
2. 型定義の更新
3. APIコンフィグの更新

#### Phase 2: コア実装
1. `useVendors` Hookの更新
2. データ変換処理の更新
3. 影響を受けるコンポーネントの調整

#### Phase 3: テスト・検証
1. 単体テストの更新
2. 統合テストの実施
3. エラーハンドリングの確認

### 4.2 実装順序

1. **型定義の更新** (`src/types/common-api.ts`)
   - 新しいレスポンス型の定義
   - 既存型との互換性確認

2. **APIコンフィグの更新** (`src/config/apiConfig.ts`)
   - エンドポイントをGET方式に変更
   - パラメータ化対応

3. **Hookの更新** (`src/features/vendor-assignment/hooks/useVendors.ts`)
   - POST → GET変更
   - レスポンス処理の簡略化

4. **変換ユーティリティの更新**
   - フィールド名のマッピング変更

5. **UIコンポーネントの更新**
   - JSON解析処理の簡略化

## 5. テスト計画

### 5.1 単体テスト

| テスト対象 | テスト内容 |
|-----------|----------|
| useVendors Hook | - 正常系: Vendor一覧取得<br>- 異常系: エラーハンドリング<br>- fgCodeパラメータ検証 |
| transformVendorResponseToVendorData | - 新形式のレスポンス変換<br>- 空配列の処理 |
| APIコンフィグ | - URL生成の正確性 |

### 5.2 統合テスト

1. **Vendor選択フロー**
   - Vendor一覧表示
   - 選択・解除動作
   - AIP生成処理

2. **エラーケース**
   - ネットワークエラー
   - 無効なfgCode
   - 空のレスポンス

### 5.3 E2Eテスト

1. PIP管理画面でのVendor割り当て
2. マイルストーン画面でのVendor選択
3. 複数FG間でのVendor切り替え

## 6. リスクと対策

### 6.1 識別されたリスク

| リスク | 影響度 | 対策 |
|--------|-------|------|
| APIレスポンス形式の変更による既存機能への影響 | 高 | 徹底的な回帰テスト実施 |
| fgCodeパラメータ仕様の相違 | 中 | APIドキュメント確認、バックエンドとの連携 |
| キャッシュによる不整合 | 低 | キャッシュ無効化設定の確認 |

### 6.2 ロールバック計画

1. Gitブランチによる管理
2. Feature フラグによる切り替え（必要に応じて）
3. 旧APIエンドポイントの一時保持

## 7. 検証項目チェックリスト

### 7.1 機能検証

- [ ] Vendor一覧の取得と表示
- [ ] fgCodeによるフィルタリング
- [ ] 割り当て済みVendorの除外処理
- [ ] AIP生成処理の動作確認
- [ ] エラーメッセージの表示

### 7.2 非機能検証

- [ ] APIレスポンス時間の測定
- [ ] メモリ使用量の確認
- [ ] ネットワークトラフィックの削減確認

### 7.3 コード品質

- [ ] TypeScript型チェック
- [ ] ESLint警告の解消
- [ ] 不要なコードの削除
- [ ] コメントの更新

## 8. 実装時の注意事項

### 8.1 重要な変更点

1. **APIメソッドの変更**: POST → GET
2. **レスポンス構造の簡略化**: 多層ラップの解消
3. **フィールド名の変更**: 
   - `aipPsysVendorId` → `vendorId`
   - APIレスポンスがフラットな構造に

### 8.2 保持すべき機能

1. Vendor選択時の重複チェック
2. 割り当て済みVendorの管理
3. エラー時のフォールバック処理

### 8.3 削除可能な処理

1. 複雑なJSON文字列の多重パース処理
2. `requestJSON`のラップ処理
3. `statusCode`/`statusMessage`の解析処理

## 9. まとめ

本改修により、以下の効果が期待される：

1. **コードの簡潔性向上**
   - レスポンス処理の簡略化
   - 型安全性の向上

2. **パフォーマンス改善**
   - GET方式によるキャッシュ活用
   - レスポンスサイズの削減

3. **保守性の向上**
   - 直感的なAPI設計
   - エラーハンドリングの簡略化

実装は別ブランチで管理し、十分なテストを経て本番環境へ適用する。