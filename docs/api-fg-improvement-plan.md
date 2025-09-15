# Function Group API 改善計画

## 変更概要
Function Group (FG) 取得APIのレスポンス構造を改善し、より使いやすい形式にします。

## 変更日時
- 計画作成日: 2025-01-15
- バックエンド実装: 完了済み
- フロントエンド実装予定: 即時切り替え
- ブランチ: `feature/improve-fg-api`

## 現状の問題点

### 1. 複雑なレスポンス構造
現在のレスポンスは多重にJSON文字列化されており、クライアント側で複数回のパース処理が必要：
```json
{
  "responseJSON": "{
    \"fg\": \"[
      {
        \\\"fgCode\\\": \\\"A\\\",
        \\\"fgDescription\\\": \\\"機器・電気\\\"
      }
    ]\"
  }"
}
```

### 2. フィールド名の不一致
- 現在: `fgDescription`
- 改善後: `fgName` （より簡潔で分かりやすい）

### 3. データ形式の最適化
コロン区切りの名前形式を採用し、表示用データを統一

## 改善内容

### 新しいエンドポイント
```
GET /fgs
```

### 新しいレスポンス構造
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

### 主な改善点
1. **シンプルな構造**: 多重JSON文字列化を排除
2. **直感的なフィールド名**: `fgDescription` → `fgName`
3. **統一された表示形式**: `fgName`に`コード:名称`形式を採用
4. **RESTful設計**: 複数形の`/fgs`エンドポイント

## 実装タスク

### バックエンド（完了済み）
- [x] 新しいエンドポイント `/fgs` の作成
- [x] レスポンス形式の変更実装
- [x] データ変換ロジックの実装（`fgCode:fgName`形式）

### フロントエンド（実装完了）
- [x] 既存の`useFunctionGroups.ts`フックの更新
  - エンドポイントを`/GetFg`から`/fgs`へ変更
  - 複雑なパース処理の削除
- [x] 型定義の更新
  ```typescript
  export type FG = {
    fgCode: string;
    fgName: string;  // "A:ABCD" 形式
  };
  ```
- [x] データ変換ロジックの更新
  - `fgDescription`から`fgName`への参照変更
  - 不要なデータ整形処理の削除
- [x] UIコンポーネントの更新
  - Sidebar.tsx - 完了
  - MilestoneGrid.tsx - 変更不要（fgDataをstoreに渡すのみ）
  - その他FGデータを使用するコンポーネント - 確認済み（変更不要）

### テスト
- [x] TypeScript型チェック - エラーなし
- [x] 開発サーバー起動確認 - 正常起動
- [ ] E2Eテストの実施（実際のAPIとの統合テスト待ち）

## 影響範囲

### 影響を受けるコンポーネント
1. **useFunctionGroups.ts** - API呼び出しフック
2. **Sidebar.tsx** - FG選択セレクトボックス
3. **MilestoneGrid.tsx** - マイルストーン管理
4. **useFgsStore** - グローバルステート管理
5. その他FGデータを参照するコンポーネント

### 切り替え計画
**全面切り替え方式**を採用：
- 段階的移行は行わず、一括で新APIへ切り替え
- 旧API（`/GetFg`）の即時廃止
- Feature Flagは使用しない

## メリット

1. **パフォーマンス向上**
   - 複数回のJSON.parse()が不要
   - レスポンスサイズの削減

2. **開発効率の向上**
   - シンプルなデータ構造により実装が簡潔に
   - エラーハンドリングの簡略化

3. **保守性の向上**
   - 標準的なREST API設計
   - 明確なデータ構造

## リスクと対策

### リスク
- 全面切り替えによる一時的な不具合の可能性
- ロールバックが必要な場合の対応

### 対策
- 十分なテストの実施
- 切り替え前の動作確認
- 緊急時のロールバック手順の準備

## 次のステップ

1. ~~この計画のレビューと承認~~ ✓
2. ~~バックエンドAPIの実装~~ ✓ 完了済み
3. ~~フロントエンドの対応実装~~ ✓ 完了済み
   - ~~useFunctionGroups.tsの更新~~ ✓
   - ~~型定義の変更~~ ✓
   - ~~コンポーネントの更新~~ ✓
4. テストと検証（進行中）
   - ~~TypeScript型チェック~~ ✓
   - ~~開発サーバー起動確認~~ ✓
   - E2Eテスト（待機中）
5. 本番環境への全面切り替え

## 実装詳細

### フロントエンド変更箇所

#### 1. API呼び出しの変更
**変更前**:
```typescript
// /src/features/psys-randing/hooks/useFunctionGroups.ts
const response = await fetch(`${PSYS_LEGACY_BASE_URL}/GetFg`);
const data = await response.json();
const parsedResponse = JSON.parse(data.responseJSON);
const fgs = JSON.parse(parsedResponse.fg);
```

**変更後**:
```typescript
// /src/features/psys-randing/hooks/useFunctionGroups.ts
const response = await fetch(`${PSYS_LEGACY_BASE_URL}/fgs`);
const data = await response.json();
const fgs = data.fgs;
```

#### 2. 型定義の変更
**変更前**:
```typescript
export type FG = {
  fgCode: string;
  fgDescription: string;
};
```

**変更後**:
```typescript
export type FG = {
  fgCode: string;
  fgName: string;  // "A:ABCD" 形式
};
```

#### 3. UIコンポーネントでの使用
**変更前**:
```typescript
const options = fgData.map((fg) => ({
  value: fg.fgCode.trim(),
  label: fg.fgDescription.replace(/\s*:\s*/, ':')
}));
```

**変更後**:
```typescript
const options = fgData.map((fg) => ({
  value: fg.fgCode,
  label: fg.fgName  // すでに "A:ABCD" 形式
}));
```

---

**更新履歴**:
- 2025-01-15: 初版作成
- 2025-01-15: バックエンド実装完了、全面切り替え方式へ変更
- 2025-01-15: フロントエンド実装完了

## 実装済みファイル一覧

### 変更したファイル
1. `/src/config/apiConfig.ts` - 新エンドポイント`GetFgs`を追加
2. `/src/stores/useFgsStore.ts` - FG型定義を更新（fgDescription → fgName）
3. `/src/features/psys-randing/hooks/useFunctionGroups.ts` - API呼び出しとパース処理を簡略化
4. `/src/features/psys-randing/components/Sidebar.tsx` - fgNameを使用するよう更新

### 確認済み（変更不要）
- `/src/features/milestone/components/MilestoneGrid.tsx` - fgDataをstoreに渡すだけなので変更不要
- `/src/features/psys-randing/components/FGSelector.tsx` - fgCodeのみ使用するため変更不要