# Item-Assignment画面 Statusカラムフィルター改修仕様書

## 概要
Item-Assignment画面のItemテーブルにおいて、Statusカラムのフィルターを現在のテキスト入力方式から選択式（ドロップダウン）に変更する。
この変更により、ユーザビリティを向上させ、TanStack Tableの高度なフィルタリング機能を活用したシームレスなフィルタリング体験を実現する。

## 現状分析

### 現在の実装構造

#### 1. カラム定義（`src/features/item-management/columns/getItemColumns.tsx`）
```typescript
// Status列の定義
{
  id: 'itemIsAssign',
  header: 'Status',
  accessorKey: 'itemIsAssign',
  size: 100,
  minSize: 80,
  maxSize: 200,
  filterFn: unassignedFilter,  // カスタムフィルター関数
  cell: ({ row, getValue }) => {
    // Statusの表示ロジック
  }
}

// カスタムフィルター関数（Show Unassigned PIP Items用）
const unassignedFilter: FilterFn<Item> = (row, columnId) => {
  const value = row.getValue<string>(columnId);
  return ['未割当', '一部割当済'].includes(value);
};
```

#### 2. フィルターUIコンポーネント（`src/components/generic-table/GenericTableFilter.tsx`）
- 現在は汎用的なテキスト/数値入力フィルター
- カラムごとにカスタムプレースホルダーを設定可能
- 数値フィルター対応

#### 3. Show Unassigned PIP Itemsボタン（`src/features/item-management/components/ItemTableControls.tsx`）
```typescript
// ボタンクリック時の処理
tableInstance?.setColumnFilters([
  {
    id: 'itemIsAssign',
    value: true,  // unassignedFilterを有効化
  },
]);
```

### 現在の問題点
1. Statusフィルターがテキスト入力のため、正確な値を入力する必要がある
2. 選択可能な値が不明確
3. 複数のステータスを選択してフィルタリングできない

## 改修方針

### 基本設計思想
1. **最小限の変更**: 既存の構造を活かし、必要最小限の変更で実装
2. **TanStack Table機能の活用**: ライブラリの標準機能を最大限活用
3. **互換性の維持**: Show Unassigned PIP Itemsボタンとの連携を維持

### 技術アプローチ

#### 1. カスタムフィルターコンポーネントの作成
新規コンポーネント: `StatusFilterDropdown.tsx`を作成し、Status列専用のドロップダウンフィルターを実装

```typescript
// src/components/generic-table/StatusFilterDropdown.tsx
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { Column } from '@tanstack/react-table';

interface StatusFilterDropdownProps<T> {
  column: Column<T, unknown>;
}

const STATUS_OPTIONS = [
  { value: 'all', label: 'すべて' },
  { value: '未割当', label: '未割当' },
  { value: '一部割当済', label: '一部割当済' },
  { value: '割当済', label: '割当済' },
  { value: '割当超過', label: '割当超過' },
  { value: 'unassigned', label: '未割当 + 一部割当済' }, // Show Unassigned用
];

export function StatusFilterDropdown<T>({ column }: StatusFilterDropdownProps<T>) {
  const filterValue = column.getFilterValue();
  
  const handleChange = (value: string) => {
    if (value === 'all') {
      column.setFilterValue(undefined);
    } else if (value === 'unassigned') {
      column.setFilterValue(true); // 既存のunassignedFilterを利用
    } else {
      column.setFilterValue(value);
    }
  };

  return (
    <Select
      value={filterValue === true ? 'unassigned' : filterValue || 'all'}
      onValueChange={handleChange}
    >
      <SelectTrigger className="h-6 text-xs">
        <SelectValue placeholder="Filter status..." />
      </SelectTrigger>
      <SelectContent>
        {STATUS_OPTIONS.map(option => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
```

#### 2. カスタムフィルター関数の拡張
```typescript
// src/features/item-management/columns/getItemColumns.tsx
const statusFilter: FilterFn<Item> = (row, columnId, filterValue) => {
  const status = row.getValue<string>(columnId);
  
  // Show Unassigned PIP Items用（既存の動作を維持）
  if (filterValue === true) {
    return ['未割当', '一部割当済'].includes(status);
  }
  
  // 個別ステータスフィルター
  if (typeof filterValue === 'string') {
    return status === filterValue;
  }
  
  // フィルターなし
  return true;
};
```

#### 3. GenericTableFilterの条件分岐追加
```typescript
// src/components/generic-table/GenericTableFilter.tsx
import { StatusFilterDropdown } from './StatusFilterDropdown';

export function GenericTableFilter<T>({
  column,
  customPlaceholders = {},
  numericColumns = [],
}: {
  column: Column<T, unknown>;
  customPlaceholders?: Partial<Record<string, string>>;
  numericColumns?: string[];
}) {
  const columnId = column.id;
  
  // Status列の場合は専用ドロップダウンを表示
  if (columnId === 'itemIsAssign') {
    return <StatusFilterDropdown column={column} />;
  }
  
  // 既存のテキスト/数値フィルター処理
  // ... 現在の実装を維持
}
```

#### 4. Show Unassigned PIP Itemsボタンとの連携
既存の実装を維持し、ボタンクリック時の動作は変更なし：
- ボタンクリック → `setColumnFilters([{ id: 'itemIsAssign', value: true }])`
- ドロップダウンが自動的に「未割当 + 一部割当済」を選択状態で表示

## 実装手順

### Phase 1: 基本実装
1. `StatusFilterDropdown.tsx`コンポーネントの作成
2. `getItemColumns.tsx`でフィルター関数を`statusFilter`に変更
3. `GenericTableFilter.tsx`に条件分岐を追加

### Phase 2: 動作確認とテスト
1. 各ステータスでのフィルタリング動作確認
2. Show Unassigned PIP Itemsボタンとの連携確認
3. フィルタークリア機能の動作確認

### Phase 3: UI調整
1. ドロップダウンのスタイリング調整（高さ、フォントサイズなど）
2. 選択状態の視覚的フィードバック改善

## 実装による効果

### メリット
1. **ユーザビリティ向上**: 選択可能な値が明確になり、誤入力を防止
2. **操作性向上**: クリック操作でフィルタリング可能
3. **視認性向上**: 現在のフィルター状態が一目で分かる
4. **保守性向上**: ステータス値の管理が一元化

### 既存機能への影響
- **影響なし**: Show Unassigned PIP Itemsボタンは現状通り動作
- **影響なし**: その他のカラムフィルターは変更なし
- **影響なし**: グローバルフィルター（Keyword Search）は独立して動作

## テストケース

### 機能テスト
1. ドロップダウンから各ステータスを選択し、正しくフィルタリングされることを確認
2. 「すべて」を選択し、フィルターが解除されることを確認
3. 「未割当 + 一部割当済」を選択し、該当の2つのステータスのみ表示されることを確認
4. Show Unassigned PIP Itemsボタンをクリックし、ドロップダウンが連動することを確認
5. フィルタークリアボタンでドロップダウンがリセットされることを確認

### 互換性テスト
1. 他のカラムフィルターと併用して動作することを確認
2. グローバルフィルター（Keyword Search）と併用して動作することを確認
3. ソート機能と併用して動作することを確認

## 参考情報

### 使用するUIコンポーネント
- `@/components/ui/select`: Radix UIベースのSelectコンポーネント（既存）

### TanStack Table関連API
- `column.getFilterValue()`: 現在のフィルター値を取得
- `column.setFilterValue()`: フィルター値を設定
- `FilterFn<T>`: カスタムフィルター関数の型定義

### 関連ファイル
- `/src/routes/p-sys/item-assignment.tsx`: メイン画面コンポーネント
- `/src/features/item-management/columns/getItemColumns.tsx`: カラム定義
- `/src/components/generic-table/GenericEditableTable.tsx`: 汎用テーブルコンポーネント
- `/src/components/generic-table/GenericTableFilter.tsx`: フィルターUIコンポーネント
- `/src/features/item-management/components/ItemTableControls.tsx`: テーブル制御コンポーネント

## 今後の拡張可能性

1. **複数選択フィルター**: チェックボックスで複数ステータスを同時選択
2. **フィルタープリセット**: よく使うフィルター条件を保存・呼び出し
3. **他カラムへの展開**: 同様のドロップダウンフィルターを他のカラムにも適用

## 実装上の注意点

1. **型安全性**: TypeScriptの型定義を適切に行い、型安全性を保つ
2. **パフォーマンス**: フィルター処理の最適化（useMemoの活用など）
3. **アクセシビリティ**: キーボード操作への対応、適切なARIA属性の設定
4. **レスポンシブ対応**: 画面サイズに応じたUI調整

## まとめ

本改修により、Item-Assignment画面のStatusフィルターがより直感的で使いやすくなります。
既存の機能を維持しながら、最小限の変更で実装可能な設計となっており、リスクを抑えつつ確実な改善が期待できます。
TanStack Tableの標準機能を活用することで、保守性と拡張性も確保されています。