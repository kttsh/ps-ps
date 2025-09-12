import type { ColumnDef, FilterFn } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import type { Item } from '@/types';

const unassignedFilter: FilterFn<Item> = (row, columnId) => {
	const value = row.getValue<string>(columnId);
	return ['未割当', '一部割当済'].includes(value);
};

/**
 * 購入品テーブルのカラムを定義する関数
 * columnHidden: 一部のカラムを非表示にするフラグ
 */
export const getItemColumns = (columnHidden: boolean): ColumnDef<Item>[] => {
	// ベースとなるカラム定義（すべての列を表示）
	const base: ColumnDef<Item>[] = [
		{
			id: 'itemNo',
			header: 'Item No.',
			accessorKey: 'itemNo',
			size: 150,
			minSize: 80,
			maxSize: 200,
		},
		// {
		// 	id: 'itemCoreNo',
		// 	header: 'Core Item No.',
		// 	accessorKey: 'itemCoreNo',
		// 	size: 150,
		// 	minSize: 80,
		// 	maxSize: 200,
		// },
		{
			id: 'itemName',
			header: 'Item Name',
			accessorKey: 'itemName',
			size: 200,
			minSize: 150,
			maxSize: 300,
		},
		{
			id: 'itemCostElement',
			header: 'Cost Element',
			accessorKey: 'itemCostElement',
			size: 120,
			minSize: 80,
			maxSize: 150,
		},
		{
			id: 'itemIBSCode',
			header: 'IBS Code',
			accessorKey: 'itemIBSCode',
			size: 100,
			minSize: 80,
			maxSize: 120,
		},
		{
			id: 'itemQty',
			header: 'Qty',
			accessorKey: 'itemQty',
			size: 80,
			minSize: 40,
			maxSize: 100,
			cell: ({ getValue }) => {
				const count = getValue<number>();

				return (
					<div className="flex justify-end items-center h-full">
						<span>{count}</span>
					</div>
				);
			},
		},
		{
			id: 'itemUnassignedQty',
			header: 'Unassigned Qty',
			accessorKey: 'itemUnassignedQty',
			size: 80,
			minSize: 40,
			maxSize: 100,
			cell: ({ getValue }) => {
				const count = getValue<number>();

				return (
					<div className="flex justify-end items-center h-full">
						<span>{count}</span>
					</div>
				);
			},
		},
		{
			id: 'itemIsAssign',
			header: 'Status',
			accessorKey: 'itemIsAssign',
			size: 100,
			minSize: 80,
			maxSize: 200,
			filterFn: unassignedFilter,
			cell: ({ row, getValue }) => {
				const status = getValue<string>();
				const { itemQty, itemAssignedQty } = row.original;
				const checkedItemQty = itemQty ? itemQty : 0;
				let badgeStyle = '';
				let textStyle = '';
				let extraInfo = null;

				switch (status) {
					case '未割当':
						badgeStyle = 'bg-amber-500';
						break;
					case '一部割当済':
						badgeStyle = 'bg-blue-600';
						textStyle = 'text-blue-600';
						extraInfo = `未割当: ${checkedItemQty - itemAssignedQty}`;
						break;
					case '割当済':
						badgeStyle = 'bg-teal-500';
						break;
					case '割当超過':
						badgeStyle = 'bg-red-600';
						textStyle = 'text-red-600';
						extraInfo = `超過: ${itemAssignedQty - checkedItemQty}`;
						break;
				}

				return (
					<div className="flex items-center justify-center gap-1 h-full text-white">
						<Badge className={`${badgeStyle} px-3`}>{status}</Badge>
						{extraInfo && (
							<span className={`text-xs font-bold ${textStyle}`}>
								{extraInfo}
							</span>
						)}
					</div>
				);
			},
		},
	];

	// パッケージ生成モード時に非表示にする列のキー一覧
	const hiddenInPackageMode = ['itemCoreNo', 'itemIsAssign', 'itemQty'];

	// 通常モード時に非表示にする列のキー一覧
	const hiddenInNormalMode = ['itemUnassignedQty'];

	// 表示対象列だけをフィルタリングして返す
	return base.filter(
		(col) =>
			'accessorKey' in col &&
			typeof col.accessorKey === 'string' &&
			!(columnHidden
				? hiddenInPackageMode.includes(col.accessorKey)
				: hiddenInNormalMode.includes(col.accessorKey)),
	);
};