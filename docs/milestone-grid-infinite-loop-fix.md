# MilestoneGrid 無限ループエラーの修正

## 問題の概要

`useMilestoneGridState.ts` で定義された `appendMSRData` 関数が、`MilestoneGrid.tsx` のuseEffect内で使用される際に無限ループを引き起こしていた。

### エラーメッセージ
```
Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, 
but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render.
appendMSRData @ useMilestoneGridState.ts:113
```

## 根本原因

`useMilestoneGridState` フック内で定義されている関数 (`appendMSRData`, `updateMSRDataWithNewAIPs`, `updatePIPGroupData`) が、
レンダリングのたびに新しい関数インスタンスとして再作成されていた。

これらの関数がuseEffectの依存配列に含まれていたため、以下のサイクルが発生：

1. コンポーネントがレンダリング
2. 新しい関数インスタンスが作成される
3. useEffectが依存配列の変更を検知
4. useEffectが実行され、stateが更新される
5. stateの更新により再レンダリング → 1に戻る

## 解決方法

`useCallback` フックを使用して関数をメモ化し、不要な再作成を防いだ。

### 修正前のコード
```typescript
const appendMSRData = (newData: MSRAIPDataType[]) => {
  setMSRData((prev) => [...prev, ...newData]);
};

const updateMSRDataWithNewAIPs = (newRows: any[]) => {
  setMSRData((prevData) => {
    // ... 処理内容
  });
};

const updatePIPGroupData = (PIPCode: string, filteredGroup: MSRAIPDataType[]) => {
  setMSRData((prev) => {
    // ... 処理内容
  });
};
```

### 修正後のコード
```typescript
import { useCallback, useState } from 'react';

// 各関数をuseCallbackでラップ
const appendMSRData = useCallback((newData: MSRAIPDataType[]) => {
  setMSRData((prev) => [...prev, ...newData]);
}, []);

const updateMSRDataWithNewAIPs = useCallback((newRows: any[]) => {
  setMSRData((prevData) => {
    // ... 処理内容
  });
}, []);

const updatePIPGroupData = useCallback((PIPCode: string, filteredGroup: MSRAIPDataType[]) => {
  setMSRData((prev) => {
    // ... 処理内容
  });
}, []);
```

## 修正ファイル

- `/src/features/milestone/hooks/useMilestoneGridState.ts`
  - `useCallback` をインポート
  - 3つのユーティリティ関数をuseCallbackでラップ

## 効果

- 無限ループが解消され、コンポーネントが正常に動作するようになった
- 不要な再レンダリングが防止され、パフォーマンスが改善
- useEffectが期待通りのタイミングでのみ実行されるようになった

## 学習ポイント

1. **カスタムフックから返される関数は必要に応じてメモ化する**
   - 特にその関数がuseEffectの依存配列に含まれる場合は重要

2. **Reactの依存配列は参照の同一性をチェック**
   - 関数やオブジェクトは、内容が同じでも新しいインスタンスは「変更」として扱われる

3. **useCallbackの適切な使用**
   - 依存関係がない場合は空配列 `[]` を指定
   - setState関数のコールバック形式を使用している場合、外部の値に依存しないため空配列で問題ない

## 今後の注意点

- カスタムフックから返す関数は、その使用方法を考慮してメモ化の必要性を判断する
- useEffectの依存配列に関数を含める場合は、その関数が安定した参照を持つことを確認する
- パフォーマンスプロファイラを使用して、不要な再レンダリングを定期的にチェックする