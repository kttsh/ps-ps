# PIP Code表示問題 - 影響調査・改修計画書

## 調査日時
2025年9月15日

## 対象ブランチ
`fix/pip-code-display-issue`

## 問題の概要
Edit PIPモードで`ItemPipCardGrid.tsx`コンポーネントのPIP Code表示値が誤っている。

## 現在の実装詳細

### 問題箇所
- **ファイル**: `src/features/item-assignment/components/ItemPipCardGrid.tsx`
- **行番号**: 136行目
- **現在のコード**:
```tsx
{hasItems
  ? `${committedItems[0].itemCostElement.slice(1, 4)}_${committedItems[0].itemIBSCode}`
  : '---'}
```

### 問題点
1. **誤った生成ロジック**: 
   - 現在: `itemCostElement`の2〜4文字目（`slice(1, 4)`）と`itemIBSCode`を結合
   - この方式は商品データから動的に生成しているが、実際のPIP Codeとは異なる値になる可能性がある

2. **データソースの不一致**:
   - Edit PIPモードでは`pipDetailData`からPIP情報を取得しているが、PIP Code表示は`committedItems`から生成している
   - `pipDetailData.pipCode`に正しいPIP Codeが存在するのに使用されていない

## データフロー分析

### 1. Edit PIPモードのデータ取得フロー
```
1. useInitializeMilestoneGrid (line 259-266)
   ↓ pipDetailRefetch()でPIP詳細取得
2. usePipDetailStore
   ↓ setPipDetailData()でストアに保存
3. ItemPipCardGrid (line 104-123)
   ↓ useEffect内でpipDetailDataからアイテム情報を設定
4. committedItemsに変換
```

### 2. 関連データ構造
- **pipDetailData**: 
  - `pipCode`: 正しいPIP Code（例: "XXX_YYY"）
  - `pipNickName`: PIPのニックネーム
  - `items`: アイテム配列

- **Item型**:
  - `itemCostElement`: コスト要素コード
  - `itemIBSCode`: IBSコード
  - `itemNo`: アイテム番号

## 影響範囲分析

### 直接影響を受けるコンポーネント
1. **ItemPipCardGrid.tsx** - PIP Code表示部分

### 間接的に関連するコンポーネント
1. **PipDetail.tsx** - 正しいPIP Code表示例（line 45）
2. **PipDetailMng.tsx** - PIP Code判定ロジック（line 13）
3. **usePipDetailStore.ts** - PIP詳細データ管理

### 影響レベル
- **表示のみ**: ロジックエラーではなく表示の問題
- **データ整合性**: 実際のデータ処理には影響なし
- **ユーザー体験**: 混乱を招く可能性あり

## 根本原因
1. **新規作成モード**と**編集モード**で異なるデータソースを使用
2. 編集モードでも新規作成モードと同じPIP Code生成ロジックを使用
3. `pipDetailData.pipCode`が利用可能にも関わらず使用されていない

## 改修計画

### Phase 1: 即時修正（優先度: 高）
**対象**: PIP Code表示ロジックの修正

#### 修正内容
```tsx
// 現在のコード (line 134-138)
<Label className="text-sm text-gray-700">PIP Code</Label>
<p className="text-sm text-gray-500 font-mono">
  {hasItems
    ? `${committedItems[0].itemCostElement.slice(1, 4)}_${committedItems[0].itemIBSCode}`
    : '---'}
</p>

// 修正後のコード
<Label className="text-sm text-gray-700">PIP Code</Label>
<p className="text-sm text-gray-500 font-mono">
  {pipGenerationMode === 'edit' && pipDetailData?.pipCode
    ? pipDetailData.pipCode
    : hasItems
      ? `${committedItems[0].itemCostElement.slice(1, 4)}_${committedItems[0].itemIBSCode}`
      : '---'}
</p>
```

#### 修正理由
- 編集モードでは`pipDetailData`から正しいPIP Codeを取得
- 新規作成モードでは既存のロジックを維持（互換性保持）

### Phase 2: 中期改善（優先度: 中）
1. **PIP Code生成ロジックの統一**
   - 共通関数化を検討
   - `utils/generatePipCode.ts`の作成

2. **データ構造の改善**
   - `committedItems`にPIP Code情報を含める
   - データ変換時にPIP Codeを保持

### Phase 3: 長期改善（優先度: 低）
1. **コンポーネント設計の見直し**
   - モード別コンポーネント分離の検討
   - データフローの簡素化

## テスト計画

### 単体テスト
1. 編集モードでのPIP Code表示確認
2. 新規作成モードでのPIP Code生成確認
3. アイテムなし状態での表示確認

### 統合テスト
1. マイルストーン画面からのEdit PIP遷移
2. PIP詳細データの取得と表示
3. データ更新後の表示確認

### 回帰テスト
1. 新規PIP作成フロー
2. PIP編集・更新フロー
3. PIP削除フロー

## リスク評価

### リスク項目
1. **低リスク**: 表示のみの変更でビジネスロジックに影響なし
2. **中リスク**: 新規作成モードの既存動作に影響する可能性
3. **対策**: 条件分岐により既存ロジックを保持

## 実装スケジュール

| フェーズ | 作業内容 | 工数 | 優先度 |
|---------|---------|------|--------|
| Phase 1 | PIP Code表示修正 | 0.5h | 高 |
| テスト | 動作確認・回帰テスト | 1h | 高 |
| Phase 2 | コード統一化 | 2h | 中 |
| Phase 3 | 設計改善 | 4h | 低 |

## 推奨事項

### 即時対応
1. Phase 1の修正を実施
2. 影響範囲が限定的なため、迅速な修正が可能

### 今後の検討事項
1. PIP Code生成ロジックの文書化
2. モード別のデータフロー図作成
3. コンポーネント間のデータ受け渡し方法の標準化

## 結論
この問題は表示ロジックの不整合によるもので、データの整合性には影響しません。Phase 1の修正により即座に解決可能です。中長期的には、コード構造の改善により同様の問題を防止することを推奨します。