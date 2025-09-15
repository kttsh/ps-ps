# テーブル早期更新問題の分析レポート

## 問題の概要

`/item-assignment`と`/pips`ページにおいて、FGコード選択後に「Display by Selection」ボタンをクリックしてデータを取得した後、別のFGコードを選択してから元のFGコードに戻すと、ボタンをクリックする前にテーブルの内容が自動的に更新されてしまう問題が発生しています。

## 影響範囲

- `/item-assignment` ページ（購入品管理）
- `/pips` ページ（PIP管理）

## 根本原因

### 1. React Queryのキャッシュメカニズム

両ページで使用されている`useItems`と`usePips`フックは以下の特徴があります：

```typescript
// src/features/item-management/hooks/useItems.ts
useQuery<GetItemsResponse>({
    queryKey: ['items', jobNo, fgCode],  // fgCodeが変わるとキーが変わる
    // ...
    enabled: false,  // 自動フェッチは無効
})

// src/features/pip-management/hooks/usePips.ts
useQuery<PipsResponse>({
    queryKey: ['pip', jobNo, fgCode],  // fgCodeが変わるとキーが変わる
    // ...
    enabled: false,  // 自動フェッチは無効
})
```

### 2. 問題の発生メカニズム

1. **初回データ取得時**
   - ユーザーがFGコード（例：FG001）を選択
   - 「Display by Selection」ボタンをクリック
   - `refetch()`が呼ばれてAPIからデータを取得
   - React Queryがデータを`['items', jobNo, 'FG001']`キーでキャッシュ

2. **別のFGコードへの切り替え**
   - ユーザーが別のFGコード（例：FG002）を選択
   - 「Display by Selection」ボタンをクリック
   - 新しいデータが`['items', jobNo, 'FG002']`キーでキャッシュ

3. **元のFGコードに戻した時の問題**
   - ユーザーが元のFGコード（FG001）を再選択
   - `queryKey`が`['items', jobNo, 'FG001']`に変更される
   - React Queryがキャッシュされたデータを**即座に返す**
   - useEffectがトリガーされてテーブルが自動更新される

### 3. 問題のあるコード箇所

#### /item-assignment ページ
```typescript
// src/routes/p-sys/item-assignment.tsx
const fgCode = selectedFG?.fgCode ?? null;
const { data: itemsResponse, isLoading } = useItems(selectedJobNo, fgCode);

useEffect(() => {
    if (itemsResponse) {
        // FGコードが変わってキャッシュデータが返されると
        // このeffectが即座に実行される
        const transformedItems = transformItemResponseToItem(itemsResponse.items);
        setItems(transformedItems);
    }
}, [itemsResponse]);
```

#### /pips ページ
```typescript
// src/routes/p-sys/pips.tsx
const fgCode = selectedFG?.fgCode ?? null;
const { data: pipsResponse, isLoading } = usePips(selectedJobNo, fgCode);

useEffect(() => {
    if (pipsResponse) {
        // 同様の問題
        const transformedPips = transformPipsResponseToPips(pipsResponse.pipsList);
        setPipsData(transformedPips);
    } else {
        setPipsData([]);
    }
}, [pipsResponse, setPipsData]);
```

## 解決策

### 推奨アプローチ：明示的なデータ更新制御

1. **FGコード変更時にデータをクリアする**
   - FGコードが変更されたらテーブルデータを空にする
   - キャッシュデータの自動適用を防ぐ

2. **ボタンクリック時のみデータを反映**
   - `refetch()`の結果を明示的に処理
   - useEffectによる自動更新を削除または条件付きにする

3. **実装方法**
   ```typescript
   // FGコード変更時
   useEffect(() => {
       // データをクリア
       setItems([]);
       // または読み込み状態を表示
   }, [selectedFG?.fgCode]);

   // ボタンクリック時
   const handleDisplayBySelection = async () => {
       const result = await refetch();
       if (result.data) {
           setItems(transformItemResponseToItem(result.data.items));
       }
   };
   ```

### 代替アプローチ

1. **React Queryのキャッシュ無効化**
   - `staleTime: 0`を設定してキャッシュを常に古いものとして扱う
   - `cacheTime: 0`を設定してキャッシュを即座に削除

2. **queryKeyにタイムスタンプを追加**
   - ボタンクリック時のタイムスタンプをキーに含める
   - 各フェッチを一意にする

## 次のステップ

1. `/item-assignment`ページの修正実装
2. `/pips`ページの修正実装
3. 両ページでの動作テスト
4. 他の類似ページの確認と必要に応じた修正