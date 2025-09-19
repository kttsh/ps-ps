# MilestoneGrid 無限ループエラーの修正

## 更新履歴
- **第1回修正**: `useMilestoneGridState` フック内の関数メモ化
- **第2回修正**: `MilestoneGrid` コンポーネント内のuseEffect依存配列の修正

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

---

## 第2回修正: MilestoneGrid.tsx Line 149のエラー

### 問題
`MilestoneGrid.tsx` の131-152行目のuseEffectで別の無限ループが発生。

### エラーメッセージ
```
MilestoneGrid.tsx:149 Maximum update depth exceeded. 
This can happen when a component calls setState inside useEffect, 
but useEffect either doesn't have a dependency array, 
or one of the dependencies changes on every render.
```

### 原因
useEffect内で以下の問題が発生：
1. `collectionView?.currentPosition` を読み取っている
2. `setCollectionView(cv)` で新しいCollectionViewインスタンスを作成
3. `collectionView` を依存配列に含めると、無限ループが発生

### 解決方法

#### 修正前
```typescript
useEffect(() => {
  if (MSRData.length > 0) {
    const milestoneData = transformToMilestoneData(MSRData);
    const currentPosition = collectionView?.currentPosition || 0; // 問題の行
    
    const cv = new wjcCore.CollectionView(milestoneData, {
      trackChanges: true,
    });
    // ... グループ設定
    cv.currentPosition = currentPosition;
    
    setCollectionView(cv);
    setIsLoading(false);
  }
}, [MSRData, setCollectionView, collectionView, setIsLoading]); // collectionViewが問題
```

#### 修正後
```typescript
useEffect(() => {
  if (MSRData.length > 0) {
    const milestoneData = transformToMilestoneData(MSRData);
    
    const cv = new wjcCore.CollectionView(milestoneData, {
      trackChanges: true,
    });
    cv.groupDescriptions.push(
      new wjcCore.PropertyGroupDescription('PIPNo', (pip: MSRAIPDataType) => {
        if (pip.PIPName) {
          return `${pip.PIPNo}　PIPName: ${pip.PIPName}`;
        }
        return pip.PIPNo;
      }),
    );
    
    setCollectionView(cv);
    setIsLoading(false);
  }
}, [MSRData, setCollectionView, setIsLoading]); // collectionViewを削除
```

### 変更内容
1. `currentPosition` の保存処理を削除（スクロール位置の維持は別の方法で実装が必要）
2. 依存配列から `collectionView` を削除
3. CollectionViewの再作成は`MSRData`の変更時のみ実行されるように

### 効果
- 無限ループが解消
- CollectionViewの不要な再作成を防止
- パフォーマンスが改善