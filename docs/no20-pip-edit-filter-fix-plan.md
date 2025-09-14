# No.20 PIP編集→Items画面遷移時フィルタ問題 - コンパクト改修計画

## 問題の概要
PIP編集画面から購入品管理（item-assignment）画面に遷移した際、未割当数量が0の項目が非表示にならない問題。

## 根本原因
`useItemTableInstance`ストアがグローバル状態として永続化され、画面遷移時にフィルタ状態（`columnFilters`）がリセットされない。

### 詳細な原因分析
1. **Zustand persist ミドルウェアの問題**
   - `useItemTableInstance` ストアが `persist` ミドルウェアを使用してlocalStorageに保存
   - React Table インスタンスはメソッドを含む複雑なオブジェクト
   - JSON.stringify/parseによるシリアライズ時にメソッドが失われる
   - 結果として `setColumnFilters` などのメソッドが `undefined` になる

### 現状の動作フロー
1. ItemTableControls で「Show Unassigned PIP Items」ボタン押下
2. `tableInstance.setColumnFilters([{id: 'itemIsAssign', value: true}])` 実行
3. `showAllItems` stateが `false` に設定
4. フィルタ状態が `useItemTableInstance` ストアに永続化
5. **画面遷移してもフィルタ状態が残存** ← 問題箇所
6. **localStorageから復元時にメソッドが失われる** ← 追加問題

## 実装済みの修正内容

### 2025-09-14 実装完了

#### 1. useItemTableInstance.ts の修正
**修正前:**
```typescript
import { persist } from 'zustand/middleware';

export const useItemTableInstance = create<StoreState>()(
  persist(
    (set) => ({
      itemTableInstance: null,
      setItemTableInstance: (itemTableInstance) => set({ itemTableInstance }),
    }),
    {
      name: 'itemTableInstance-storage',
    },
  ),
);
```

**修正後:**
```typescript
// persist を削除し、通常のZustandストアに変更
export const useItemTableInstance = create<StoreState>()((set) => ({
  itemTableInstance: null,
  setItemTableInstance: (itemTableInstance) => set({ itemTableInstance }),
}));
```

**修正の意味:**
- React Table インスタンスをlocalStorageに保存しない
- メモリ内でのみインスタンスを保持
- シリアライズによるメソッド欠落を防止
- 画面リロード時は新しいインスタンスが作成される

### 2. item-assignment.tsx の既存実装確認
```typescript
// 画面マウント時にフィルタをリセット（既に実装済み）
useEffect(() => {
  // tableInstanceが存在する場合、フィルタをクリア
  if (itemTableInstance) {
    itemTableInstance.setColumnFilters([]);
  }
}, []); // マウント時のみ実行
```
※この実装は既に存在していたが、persistによるメソッド欠落で動作していなかった

## 修正による効果

### 解決された問題
1. ✅ `itemTableInstance.setColumnFilters is not a function` エラーの解消
2. ✅ 画面遷移時のフィルタリセットが正常動作
3. ✅ React Table のすべてのメソッドが利用可能に

### 副次的な改善
- メモリ使用量の削減（localStorage不使用）
- パフォーマンスの向上（シリアライズ/デシリアライズ処理削減）
- デバッグの容易化（インスタンスの状態が予測可能）

## テスト結果

### 1. 基本動作確認
- ✅ item-assignment画面で「Show Unassigned PIP Items」が正常動作
- ✅ フィルタ適用後、「Show All Items」で全件表示に戻る
- ✅ `setColumnFilters` メソッドが正常に呼び出せる

### 2. 画面遷移確認  
- ✅ PIP編集→Items画面：未割当0件が表示される（フィルタなし）
- ✅ Items画面でフィルタ適用→他画面→Items画面：フィルタがリセットされる
- ✅ エラーなしで画面遷移が可能

### 3. エッジケース
- ✅ ブラウザリロード時：新しいインスタンスが作成される
- ✅ 複数タブ：各タブで独立したインスタンスが動作

## 今後の検討事項

### 短期的な改善案
1. **フィルタ状態の別管理**
   - フィルタ設定のみを別のストアで永続化
   - Table インスタンスとは分離して管理

2. **セッションストレージの活用**
   - タブごとの独立性を保ちつつ一時的な保存

### 長期的な改善案
1. **React Query v5移行時の見直し**
   - サーバー状態管理の最適化
   - フィルタ状態のURL同期

2. **画面別の状態管理**
   - 各画面で独立したフィルタ管理
   - コンテキストによる状態分離

## 実装手順（完了）

1. **ブランチ作成** ✅
   - `fix/to-execute` ブランチで作業

2. **最小限の修正実装** ✅（実施済み）
   - useItemTableInstance.ts から persist を削除
   - 既存のリセット処理が正常動作することを確認

3. **動作確認** ✅（実施済み）
   - 開発環境でエラーが解消されたことを確認
   - フィルタリセットが正常動作することを確認

## リスクと対策

| リスク | 影響度 | 対策 | 結果 |
|--------|--------|------|------|
| ページリロード時の状態消失 | 低 | 意図的な仕様として受け入れ | ✅ 問題なし |
| メモリリーク | 極低 | React の通常のライフサイクルで管理 | ✅ 問題なし |
| 他画面への影響 | なし | 画面固有の処理として実装済み | ✅ 影響なし |

## 完了基準
- ✅ PIP編集からItems画面遷移時、全アイテムが表示される
- ✅ フィルタ機能自体は正常動作を維持
- ✅ 既存機能への影響なし
- ✅ エラーメッセージが表示されない

## 実装時間
- 調査：15分
- 実装：5分
- テスト：10分
- **合計：約30分**

## 備考
- 最小限の変更で問題を根本的に解決
- localStorage への永続化を削除することで、複雑なオブジェクトのシリアライズ問題を回避
- 将来的にフィルタ状態の永続化が必要な場合は、フィルタ設定のみを別途管理する設計を推奨