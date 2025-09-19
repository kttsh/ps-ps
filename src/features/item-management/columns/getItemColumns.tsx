import type { ColumnDef, FilterFn } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { usePipGenerationModeStore } from '@/stores/usePipGenerationModeStore';
import type { Item } from '@/types';

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

/**
 * 購入品テーブルのカラムを定義する関数
 * columnHidden: 一部のカラムを非表示にするフラグ
 */
export const getItemColumns = (columnHidden: boolean): ColumnDef<Item>[] => {
	const { pipGenerationMode } = usePipGenerationModeStore();

	// モードごとの非表示カラム定義
	const hiddenColumnsByMode: Record<string, string[]> = {
		display: ['itemUnassignedQty', 'itemAssignedQty'],
		generation: ['itemAssignedQty'],
		edit: ['itemAssignedQty'],
		pipDetail: ['itemUnassignedQty'], // ← pipDetailでは itemUnassignedQty を非表示
	};

	// columnHidden が true のときに追加で非表示にするカラム
	const extraHiddenInPackageMode = ['itemCoreNo', 'itemIsAssign', 'itemQty'];

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
			id: 'itemAssignedQty',
			header: 'Assigned Qty',
			accessorKey: 'itemAssignedQty',
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
			size: 150,
			minSize: 80,
			maxSize: 200,
			filterFn: statusFilter,
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

	// 非表示対象のカラムキー一覧を取得
	const hiddenKeys = [
		...(hiddenColumnsByMode[pipGenerationMode] ?? []),
		...(columnHidden ? extraHiddenInPackageMode : []),
	];

	// フィルタリングして返す
	return base.filter(
		(col) =>
			!(
				'accessorKey' in col &&
				typeof col.accessorKey === 'string' &&
				hiddenKeys.includes(col.accessorKey)
			),
	);
};