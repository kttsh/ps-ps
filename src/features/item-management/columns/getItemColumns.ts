import type { ColumnDef } from '@tanstack/react-table';
import type { Item } from '@/types';

export type ColumnMode = 'display' | 'generation' | 'pipDetail' | 'edit';

// モードごとの非表示カラム定義
const hiddenColumnsByMode: Record<ColumnMode, string[]> = {
	display: ['itemRestQty'], // 通常モード
	generation: ['qty', 'pipCode', 'coreItemNo'], // PIP生成モード
	pipDetail: ['itemRestQty', 'pipCode', 'coreItemNo'], // PIP詳細表示モード
	edit: ['itemRestQty', 'pipCode', 'coreItemNo'], // 編集モード
};

// ベースカラム定義（全カラム）
const baseColumns: ColumnDef<Item>[] = [
	{
		id: 'itemNo',
		header: 'Item No.',
		accessorKey: 'itemNo',
		size: 150,
		minSize: 80,
		maxSize: 200,
	},
	{
		id: 'coreItemNo',
		header: 'Core Item No.',
		accessorKey: 'coreItemNo',
		size: 150,
		minSize: 80,
		maxSize: 200,
	},
	{
		id: 'itemName',
		header: 'Item Name',
		accessorKey: 'itemName',
		size: 200,
		minSize: 150,
		maxSize: 300,
	},
	{
		id: 'qty',
		header: 'Qty',
		accessorKey: 'qty',
		size: 80,
		minSize: 40,
		maxSize: 100,
	},
	{
		id: 'itemRestQty',
		header: '未割当Qty',
		accessorKey: 'itemRestQty',
		size: 80,
		minSize: 40,
		maxSize: 100,
	},
	{
		id: 'costElement',
		header: 'Cost Element',
		accessorKey: 'costElement',
		size: 120,
		minSize: 80,
		maxSize: 150,
	},
	{
		id: 'ibsCode',
		header: 'IBS Code',
		accessorKey: 'ibsCode',
		size: 100,
		minSize: 80,
		maxSize: 120,
	},
	{
		id: 'pipCode',
		header: 'PIP割り当てステータス',
		accessorKey: 'pipCode',
		size: 150,
		minSize: 80,
		maxSize: 200,
	},
];

// カラムフィルター関数
const filterColumns = (mode: ColumnMode): ColumnDef<Item>[] => {
	const hidden = hiddenColumnsByMode[mode] ?? [];
	return baseColumns.filter(
		(col) =>
			'accessorKey' in col &&
			typeof col.accessorKey === 'string' &&
			!hidden.includes(col.accessorKey),
	);
};

// 外部公開関数
export const getItemColumns = (columnMode: ColumnMode): ColumnDef<Item>[] => {
	return filterColumns(columnMode);
};
