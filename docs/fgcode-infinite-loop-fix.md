# FGCode URL同期 無限ループ修正仕様書

## 問題の概要

/pipsの画面でFunctionGroupを選択すると「Maximum update depth exceeded」エラーが発生する。原因は、2つのコンポーネント（`pips.tsx`と`FGSelector.tsx`）が同じ`fgcode` URLパラメータに対して同時に同期処理を行い、相互に状態更新を引き起こしているため。

## 原因分析

### 現在の問題のあるフロー

1. FGSelectorで選択 → `setFgCodeToUrl` → URL更新
2. URL変更を両コンポーネントが検知
3. 両方の`onFgChange`コールバックが実行
4. 状態更新が再レンダリングを引き起こす
5. 条件チェックが不十分なため再度URL更新が発生
6. 無限ループ

### 根本原因

1. **`useFgCodeUrlSync.ts`の重複チェックが不完全**
   - 値がある場合の同一値チェックが不足
   - `undefined`の場合のみチェックしている

2. **コンポーネント側の`onFgChange`実装に問題**
   - 同じ値でも状態更新を実行してしまう
   - 適切な条件チェックが不足

## 解決方針

### 方針：両方でURL同期を維持しつつ無限ループを防ぐ

1. **`useFgCodeUrlSync.ts`の改善**
   - より厳密な重複チェック実装
   - 値がある場合も含めて同一値をスキップ

2. **各コンポーネントの`onFgChange`改善**
   - 同じ値の場合は状態更新をスキップ
   - 適切な条件チェックを追加

## 実装内容

### 1. useFgCodeUrlSync.tsの修正

```typescript
// URL変更を監視してFGを更新
useEffect(() => {
  // 同じfgCodeの場合は処理をスキップして無限ループを防ぐ
  // undefined・値あり両方のケースで同一値チェック
  if (fgCodeFromUrl === lastValidFgCodeRef.current) {
    return;
  }

  if (fgCodeFromUrl) {
    const fg = fgs.find(f => f.fgCode === fgCodeFromUrl);
    if (fg) {
      lastValidFgCodeRef.current = fgCodeFromUrl;
      onFgChange(fg);
    } else {
      // 無効なfgcodeの場合はURLから削除
      lastValidFgCodeRef.current = undefined;
      setFgCodeToUrl(undefined);
      onFgChange(null);
    }
  } else {
    lastValidFgCodeRef.current = undefined;
    onFgChange(null);
  }
}, [fgCodeFromUrl, fgs, onFgChange, setFgCodeToUrl]);
```

### 2. FGSelector.tsxの修正

```typescript
const { setFgCodeToUrl } = useFgCodeUrlSync({
  fgs,
  onFgChange: (fg) => {
    // 現在の値と異なる場合のみ更新
    const newFgCode = fg?.fgCode;
    const currentFgCode = localFG?.fgCode;
    
    if (newFgCode !== currentFgCode) {
      setLocalFG(fg || ({} as FG));
    }
  },
});
```

### 3. pips.tsxの修正

```typescript
useFgCodeUrlSync({
  fgs,
  onFgChange: (fg) => {
    // 現在の値と異なる場合のみ更新
    const newFgCode = fg?.fgCode;
    const currentFgCode = selectedFG?.fgCode;
    
    if (newFgCode !== currentFgCode) {
      setSelectedFG(fg || null);
    }
  },
});
```

## 期待される効果

1. **無限ループの解消**
   - 同一値での状態更新がスキップされる
   - URL変更の連鎖反応が防がれる

2. **両コンポーネントでのURL同期維持**
   - pips.tsxとFGSelector.tsx両方でURL同期が機能
   - 適切な状態管理が維持される

3. **パフォーマンス改善**
   - 不要な再レンダリングが削減
   - 状態更新の最適化

## テスト項目

1. FGSelectorで選択 → URLが更新され、エラーが発生しない
2. URLを直接変更 → 両コンポーネントの状態が同期される
3. ブラウザの戻る/進む → 適切に状態が復元される
4. 無効なfgcodeをURLに入力 → 適切にクリアされる
5. 複数回連続で選択変更 → エラーが発生しない

## リスク評価

- **低リスク**: 既存機能への影響は最小限
- **修正範囲**: 3ファイルのみ
- **ロールバック**: 容易（各ファイルの変更は独立）