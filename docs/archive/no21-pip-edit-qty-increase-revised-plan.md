# No.21 PIP編集時の数量増加対応 - 改訂実装計画書

> 作成日: 2025年1月15日  
> 対象バグ: No.21 - Edit PIPで未割当数量がある時のQty増加対応  
> ブランチ: `feature/no21-pip-edit-qty-increase`  
> ステータス: 実装準備完了

## 📋 エグゼクティブサマリー

本ドキュメントは、`ItemPipCardGrid.tsx`コンポーネント内で直接数量変更機能を改善する実装計画です。現在の実装では`item.itemUnassignedQty`の範囲内でしか選択できませんが、これを以下のように改善します：

1. **未割当数量がある場合**: 現在のPIP割当量 + 未割当数量まで増加可能
2. **割当超過の場合**: 現在の割当量から減少のみ可能

## 🎯 改修目標

### 主要目標
1. `ItemPipCardGrid.tsx`内で数量選択ロジックを直接改善
2. 編集モード時に正しい最大選択可能数量を計算
3. 新規作成モードと編集モードで適切に動作を分離

### 成功指標
- PIP編集時に未割当数量を考慮した適切な数量範囲が選択可能
- 割当超過時は減少のみ可能
- UIが直感的で分かりやすい

## 🔍 現状分析

### 現在の実装（ItemPipCardGrid.tsx）

```typescript
// 現在の数量選択部分（116-138行目）
<Select
  value={String(item.itemQty ?? '')}
  onValueChange={(val) => handleQtyChange(item.itemNo, Number(val))}
>
  <SelectTrigger className="border rounded px-2 py-1 w-[70px] bg-white">
    <SelectValue />
  </SelectTrigger>
  <SelectContent>
    {Array.from(
      { length: Number(item.itemUnassignedQty) },  // ← 問題: 未割当数量のみで範囲を決定
      (_, i) => {
        const qty = String(i + 1);
        return (
          <SelectItem key={qty} value={qty}>
            {qty}
          </SelectItem>
        );
      },
    )}
  </SelectContent>
</Select>
```

### 問題点
1. **新規作成時**: `itemUnassignedQty`の範囲内でしか選択できない（正しい動作）
2. **編集時**: 現在のPIP割当量を考慮していない（改善が必要）
3. **割当超過時**: 対応していない

## 💡 解決方針

### アプローチ
1. `pipGenerationMode`で新規作成と編集を区別
2. 編集モード時は現在のPIP割当量を保持
3. 最大選択可能数量を動的に計算

### 実装方針

#### 1. 数量計算ロジックの追加

```typescript
// ItemPipCardGrid.tsx内に追加
const calculateMaxQty = (item: Item): number => {
  // 新規作成モードの場合
  if (pipGenerationMode === 'create') {
    // 未割当数量の範囲内
    return Number(item.itemUnassignedQty || 0);
  }
  
  // 編集モードの場合
  if (pipGenerationMode === 'edit') {
    // 現在のPIPに割り当てられている数量を取得
    const currentPipQty = Number(item.itemQty || 0);
    
    // 元の総数量と全体の割当済み数量から未割当数量を計算
    // ※ pipDetailDataから元のアイテム情報を取得
    const originalItem = pipDetailData?.items?.find(
      (i) => i.itemNo === item.itemNo
    );
    
    if (originalItem) {
      const totalQty = Number(originalItem.itemQty || 0);
      const totalAssignedQty = Number(originalItem.itemAssignedQty || 0);
      const unassignedQty = totalQty - totalAssignedQty;
      
      // 割当超過チェック
      if (unassignedQty < 0) {
        // 割当超過の場合は現在の割当量が上限（減少のみ）
        return currentPipQty;
      }
      
      // 通常の場合: 現在のPIP割当量 + 未割当数量
      return currentPipQty + unassignedQty;
    }
    
    // フォールバック
    return currentPipQty;
  }
  
  return 0;
};

const generateQtyOptions = (item: Item): number[] => {
  const maxQty = calculateMaxQty(item);
  const currentQty = Number(item.itemQty || 0);
  
  // 編集モードで減少のみ可能な場合
  if (pipGenerationMode === 'edit' && maxQty === currentQty) {
    // 0から現在値までの選択肢を生成
    return Array.from({ length: currentQty + 1 }, (_, i) => i);
  }
  
  // 通常の場合: 1から最大値まで
  return Array.from({ length: maxQty }, (_, i) => i + 1);
};
```

#### 2. Select コンポーネントの改善

```typescript
<Select
  value={String(item.itemQty ?? '')}
  onValueChange={(val) => handleQtyChange(item.itemNo, Number(val))}
>
  <SelectTrigger className="border rounded px-2 py-1 w-[70px] bg-white">
    <SelectValue />
  </SelectTrigger>
  <SelectContent>
    {generateQtyOptions(item).map((qty) => {
      const isCurrentValue = qty === Number(item.itemQty);
      const isMaxValue = qty === calculateMaxQty(item);
      
      return (
        <SelectItem key={qty} value={String(qty)}>
          <span className="flex items-center gap-2">
            {qty}
            {isCurrentValue && <span className="text-xs text-gray-500">(現在)</span>}
            {isMaxValue && qty > 0 && <span className="text-xs text-blue-500">(最大)</span>}
            {qty === 0 && <span className="text-xs text-red-500">(解除)</span>}
          </span>
        </SelectItem>
      );
    })}
  </SelectContent>
</Select>
```

#### 3. 状態管理の改善

```typescript
// 編集モード用の元データを保持
const [originalItems, setOriginalItems] = useState<Map<string, Item>>(new Map());

useEffect(() => {
  if (pipGenerationMode === 'edit' && pipDetailData) {
    setNickname(pipDetailData.pipNickName ?? '');
    
    // 元のアイテムデータを保持
    const originals = new Map<string, Item>();
    pipDetailData.items?.forEach((item) => {
      originals.set(item.itemNo, item);
    });
    setOriginalItems(originals);
    
    // 現在のPIP割当量をitemQtyにセット
    setCommittedItems(
      (pipDetailData.items ?? []).map((item) => ({
        ...item,
        itemQty: Number(item.itemAssignedQty), // 現在のPIP割当量
      })),
    );
  }
}, [pipGenerationMode, setNickname, setCommittedItems, pipDetailData]);
```

## 📝 実装タスク

### Phase 1: 基本実装（4時間）

#### タスク1: 数量計算ロジックの実装
- [ ] `calculateMaxQty`関数の実装
- [ ] `generateQtyOptions`関数の実装
- [ ] 編集モード用の元データ保持機能の追加

#### タスク2: UIコンポーネントの改善
- [ ] Selectコンポーネントの選択肢生成ロジック変更

### Phase 2: エッジケース対応（2時間）

#### タスク3: バリデーション強化
- [ ] 負の値や無効な値のハンドリング
- [ ] エラーメッセージの表示

#### タスク4: パフォーマンス最適化
- [ ] 計算結果のメモ化
- [ ] 不要な再レンダリングの防止

### Phase 3: テストと仕上げ（2時間）

#### タスク5: 動作確認
- [ ] 新規作成モードでの動作確認
- [ ] 編集モードでの動作確認
- [ ] 割当超過ケースの動作確認

#### タスク6: ドキュメント更新
- [ ] コード内コメントの追加
- [ ] 実装内容の文書化

## 🔧 実装詳細

### 完全な実装コード

```typescript
// src/features/item-assignment/components/ItemPipCardGrid.tsx

import { AlertCircle, Package, Trash2 } from 'lucide-react';
import { useEffect, useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { usePipDetailStore } from '@/stores/usePipDetailStore';
import { usePipGenerationModeStore } from '@/stores/usePipGenerationModeStore';
import type { Item } from '@/types';

interface Props {
  committedItems: Item[];
  setCommittedItems: React.Dispatch<React.SetStateAction<Item[]>>;
  setItems: React.Dispatch<React.SetStateAction<Item[]>>;
  nickname: string;
  setNickname: React.Dispatch<React.SetStateAction<string>>;
}

export const ItemPipCardGrid: React.FC<Props> = ({
  committedItems,
  setCommittedItems,
  nickname,
  setNickname,
}) => {
  const { pipGenerationMode } = usePipGenerationModeStore();
  const { pipDetailData } = usePipDetailStore();
  
  // 編集モード用: 元のアイテムデータを保持
  const [originalItemsMap, setOriginalItemsMap] = useState<Map<string, Item>>(new Map());

  const hasItems = committedItems.length > 0;

  const handleRemoveItem = (itemNo: string) => {
    const removedItem = committedItems.find((item) => item.itemNo === itemNo);
    if (removedItem) {
      setCommittedItems((prev) =>
        prev.filter((item) => item.itemNo !== itemNo),
      );
    }
  };

  const handleQtyChange = (itemNo: string, newQty: number) => {
    setCommittedItems((prev) =>
      prev.map((item) =>
        item.itemNo === itemNo ? { ...item, itemQty: newQty } : item,
      ),
    );
  };

  // 最大選択可能数量を計算
  const calculateMaxQty = useMemo(() => {
    return (item: Item): number => {
      // 新規作成モードの場合
      if (pipGenerationMode === 'create') {
        return Number(item.itemUnassignedQty || 0);
      }
      
      // 編集モードの場合
      if (pipGenerationMode === 'edit') {
        const currentPipQty = Number(item.itemQty || 0);
        const originalItem = originalItemsMap.get(item.itemNo);
        
        if (originalItem) {
          // 元データから未割当数量を計算
          const totalQty = Number(originalItem.itemQty || 0);
          const totalAssignedQty = Number(originalItem.itemAssignedQty || 0);
          const unassignedQty = totalQty - totalAssignedQty;
          
          // 割当超過チェック
          if (unassignedQty < 0) {
            // 割当超過の場合は現在の割当量が上限
            return currentPipQty;
          }
          
          // 通常: 現在のPIP割当量 + 未割当数量
          return currentPipQty + unassignedQty;
        }
        
        return currentPipQty;
      }
      
      return 0;
    };
  }, [pipGenerationMode, originalItemsMap]);

  // 数量選択肢を生成
  const generateQtyOptions = useMemo(() => {
    return (item: Item): number[] => {
      const maxQty = calculateMaxQty(item);
      const currentQty = Number(item.itemQty || 0);
      
      // 編集モードで割当超過の場合（減少のみ）
      if (pipGenerationMode === 'edit') {
        const originalItem = originalItemsMap.get(item.itemNo);
        if (originalItem) {
          const totalQty = Number(originalItem.itemQty || 0);
          const totalAssignedQty = Number(originalItem.itemAssignedQty || 0);
          const unassignedQty = totalQty - totalAssignedQty;
          
          if (unassignedQty < 0) {
            // 0から現在値までの選択肢
            return Array.from({ length: currentQty + 1 }, (_, i) => i);
          }
        }
      }
      
      // 通常: 1から最大値まで（新規作成）または0から最大値まで（編集）
      if (pipGenerationMode === 'edit') {
        return Array.from({ length: maxQty + 1 }, (_, i) => i);
      }
      return Array.from({ length: maxQty }, (_, i) => i + 1);
    };
  }, [pipGenerationMode, calculateMaxQty, originalItemsMap]);

  useEffect(() => {
    if (pipGenerationMode === 'edit' && pipDetailData) {
      setNickname(pipDetailData.pipNickName ?? '');
      
      // 元のアイテムデータを保持
      const originals = new Map<string, Item>();
      pipDetailData.items?.forEach((item) => {
        originals.set(item.itemNo, {
          ...item,
          // APIレスポンスの構造に応じて調整が必要
          itemQty: item.itemQty,
          itemAssignedQty: item.itemAssignedQty,
        });
      });
      setOriginalItemsMap(originals);
      
      setCommittedItems(
        (pipDetailData.items ?? []).map((item) => ({
          ...item,
          itemQty: Number(item.itemAssignedQty), // 現在のPIP割当量
        })),
      );
    }
  }, [pipGenerationMode, setNickname, setCommittedItems, pipDetailData]);

  return (
    <div className="flex flex-col max-h-full bg-rose-50 rounded-lg border border-rose-200 shadow-sm p-6 pb-8 space-y-6">
      {/* ヘッダー */}
      <div className="flex items-center gap-3 border-b border-gray-300 pb-4">
        <div className="bg-gradient-to-br from-rose-300 to-rose-600 text-white rounded-lg p-2">
          <Package size={24} />
        </div>
        <div>
          <Label className="text-sm text-gray-700">PIP Code</Label>
          <p className="text-sm text-gray-500 font-mono">
            {hasItems
              ? `${committedItems[0].itemCostElement.slice(1, 4)}_${committedItems[0].itemIBSCode}`
              : '---'}
          </p>
        </div>
      </div>

      {/* ニックネーム */}
      <div>
        <Label className="text-sm text-gray-700">Nickname</Label>
        <Input
          className="bg-white border-gray-300 mt-1 w-full"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
      </div>

      {/* テーブル表示 */}
      {hasItems ? (
        <div className="overflow-auto">
          <table className="w-full text-xs text-left text-gray-700">
            <thead className="border-b">
              <tr>
                <th className="px-3 py-2">Item No.</th>
                <th className="px-3 py-2">Item Name</th>
                <th className="px-3 py-2">Qty</th>
                <th className="px-3 py-2">Cost Element</th>
                <th className="px-3 py-2">IBS Code</th>
                <th className="px-3 py-2" />
              </tr>
            </thead>
            <tbody>
              {committedItems.map((item) => {
                const maxQty = calculateMaxQty(item);
                const currentQty = Number(item.itemQty || 0);
                const options = generateQtyOptions(item);
                
                // 割当超過チェック
                const originalItem = originalItemsMap.get(item.itemNo);
                const isOverAllocated = pipGenerationMode === 'edit' && 
                  originalItem && 
                  (Number(originalItem.itemQty || 0) - Number(originalItem.itemAssignedQty || 0)) < 0;
                
                return (
                  <tr
                    key={`${item.itemNo}-${item.itemSurKey}`}
                    className="border-b"
                  >
                    <td className="px-3 py-2">{item.itemNo}</td>
                    <td className="px-3 py-2">{item.itemName}</td>
                    <td className="px-3 py-2">
                      <Select
                        value={String(item.itemQty ?? '')}
                        onValueChange={(val) =>
                          handleQtyChange(item.itemNo, Number(val))
                        }
                      >
                        <SelectTrigger 
                          className={`border rounded px-2 py-1 w-[90px] bg-white ${
                            isOverAllocated ? 'border-orange-400' : ''
                          }`}
                        >
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {options.map((qty) => {
                            const isCurrentValue = qty === currentQty;
                            const isMaxValue = qty === maxQty && qty > 0;
                            
                            return (
                              <SelectItem key={qty} value={String(qty)}>
                                <span className="flex items-center gap-2">
                                  {qty}
                                  {isCurrentValue && (
                                    <span className="text-xs text-gray-500">(現在)</span>
                                  )}
                                  {isMaxValue && !isOverAllocated && (
                                    <span className="text-xs text-blue-500">(最大)</span>
                                  )}
                                  {qty === 0 && (
                                    <span className="text-xs text-red-500">(解除)</span>
                                  )}
                                </span>
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                      {isOverAllocated && (
                        <div className="text-xs text-orange-600 mt-1">
                          割当超過
                        </div>
                      )}
                    </td>
                    <td className="px-3 py-2">{item.itemCostElement}</td>
                    <td className="px-3 py-2">{item.itemIBSCode}</td>
                    <td
                      className="px-3 py-2 text-rose-500 cursor-pointer"
                      onClick={() => handleRemoveItem(item.itemNo)}
                    >
                      <Trash2 size={18} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-gray-500">
          <AlertCircle size={48} className="text-gray-300 mb-4" />
          <p className="text-sm font-medium">購入品がまだ登録されていません</p>
          <p className="text-xs mt-1">
            左のテーブルから購入品を選択してください
          </p>
        </div>
      )}
    </div>
  );
};
```

## ⚠️ 実装時の注意事項

### 1. APIレスポンスの確認
- `pipDetailData.items`の構造を確認
- `itemQty`（総数量）と`itemAssignedQty`（全体の割当済み数量）が正しく取得できることを確認

### 2. 状態管理
- 編集モード時は元データを適切に保持
- 新規作成モードと編集モードで処理を明確に分離

### 3. エラーハンドリング
- データが不足している場合のフォールバック処理
- 無効な値に対する適切なバリデーション

## 📊 テストケース

### 新規作成モード
1. `itemUnassignedQty`の範囲内で選択可能
2. 1から最大値までの選択肢が表示される

### 編集モード - 通常ケース
- 総数量: 100
- 全体の割当済み: 60
- 現在のPIP割当: 20
- 期待: 0〜60まで選択可能（20 + 40）

### 編集モード - 割当超過ケース
- 総数量: 100
- 全体の割当済み: 120
- 現在のPIP割当: 30
- 期待: 0〜30まで選択可能（減少のみ）

## 🚀 実装手順

1. **バックアップ**: 現在の`ItemPipCardGrid.tsx`をバックアップ
2. **段階的実装**: 
   - まず計算ロジックを追加
   - 次にUI部分を更新
   - 最後にテスト
3. **動作確認**: 開発環境で全てのケースをテスト
4. **コードレビュー**: 実装内容の確認

## 📅 スケジュール

| タスク | 所要時間 | 優先度 |
|--------|----------|--------|
| 基本実装 | 4時間 | 高 |
| エッジケース対応 | 2時間 | 中 |
| テストと仕上げ | 2時間 | 高 |
| **合計** | **8時間** | - |

---

*このドキュメントは2025年1月15日に作成されました。*