import { Button } from '@/components/ui/button';
import { IndeterminateCheckbox } from '@/components/ui/IndeterminateCheckbox';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import type { Vendor } from '@/types';
import {
	type ColumnDef,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	useReactTable,
} from '@tanstack/react-table';
import {
	ArrowRight,
	CircleChevronRight,
	Save,
	Search,
	Users,
	X
} from 'lucide-react';
import { useMemo, useState } from 'react';

interface Props {
	parentName: string; // 親コンポーネント情報
	vendors: Vendor[];
	selectedVendorIds: string[];
	onSelectionChange: (ids: string[]) => void;
	onAssign: (vendors: Vendor[]) => void;
}

export const VendorSelectionPanel: React.FC<Props> = ({
	parentName,
	vendors,
	selectedVendorIds,
	onSelectionChange,
	onAssign,
}) => {
	const [globalFilter, setGlobalFilter] = useState('');

	// How: ID配列をTanStack Tableのインデックスベース選択状態に変換
	// Why not: IDベースの管理ではなくインデックスベースを使う理由は、
	// TanStack Tableの内部実装に合わせることでパフォーマンスが向上するため
	const rowSelection = useMemo(() => {
		const selection: Record<string, boolean> = {};
		vendors.forEach((vendor, index) => {
			if (selectedVendorIds.includes(vendor.vendorId)) {
				selection[index.toString()] = true;
			}
		});
		return selection;
	}, [vendors, selectedVendorIds]);

	const columns = useMemo<ColumnDef<Vendor>[]>(
		() => [
			{
				id: 'select',
				size: 20,
				header: ({ table }) => (
					<IndeterminateCheckbox
						checked={table.getIsAllPageRowsSelected()}
						indeterminate={table.getIsSomePageRowsSelected()}
						onChange={table.getToggleAllPageRowsSelectedHandler()}
					/>
				),
				cell: ({ row }) => (
					<IndeterminateCheckbox
						checked={row.getIsSelected()}
						onChange={row.getToggleSelectedHandler()}
					/>
				),
			},
			{
				accessorKey: 'vendorName',
				header: 'Vendor Name',
				cell: ({ row }) => (
					<span className="text-gray-800 text-xs">
						{row.original.vendorName}
					</span>
				),
			},
		],
		[],
	);

	const table = useReactTable({
		data: vendors,
		columns,
		state: { rowSelection, globalFilter },
		enableRowSelection: true,

		// How: TanStack Tableの選択状態更新をインターセプトし、
		// インデックスベースからIDベースに変換して親コンポーネントに通知
		onRowSelectionChange: (updater) => {
			const newSelection =
				typeof updater === 'function' ? updater(rowSelection) : updater;
			const selectedIds = Object.keys(newSelection)
				.filter((key) => newSelection[key])
				.map((index) => vendors[Number.parseInt(index, 10)]?.vendorId)
				.filter(Boolean);
			onSelectionChange(selectedIds);
		},
		onGlobalFilterChange: setGlobalFilter,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		globalFilterFn: 'includesString',
	});

	const handleAssign = () => {
		const selectedVendors = vendors.filter((vendor) =>
			selectedVendorIds.includes(vendor.vendorId),
		);
		onAssign(selectedVendors);

		// Why not: 割り当て後も選択状態を維持しない理由は、
		// 同じベンダーの重複割り当てを防ぐため
		onSelectionChange([]);
	};

	// MSR側から呼ばれた場合の処理
	const handleAipGenerate = () => {
		// ベンダー選択値を親コンポーネントに伝える
		const selectedVendors = vendors.filter((vendor) =>
			selectedVendorIds.includes(vendor.vendorId),
		);
		onAssign(selectedVendors);
	};
	const handleCancel = () => {
		onAssign([]);
	};

	return (
		<div
			className={cn(
				'overflow-hidden',
				parentName === 'milestone' ? 'h-[100%]' : 'h-screen',
			)}
		>
			<div>
				{parentName === 'milestone' && (
					<h2 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
						<Users size={20} />
						Vendor
					</h2>
				)}
				<div className="flex gap-4 mb-1">
					<div className="relative flex-1">
						<Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
						<Input
							placeholder="Search by Vendor Name..."
							value={globalFilter}
							onChange={(e) => {
								setGlobalFilter(e.target.value);
							}}
							className="pl-10 text-sm bg-white"
						/>
					</div>
					{/** 呼び出し元に応じてボタンを変更 */}
					{parentName === 'VendorAssignment' && (
						<Button
							onClick={handleAssign}
							disabled={selectedVendorIds.length === 0}
							className="flex items-center gap-2"
						>
							<CircleChevronRight size={16} />
							PIPに割り当て ({selectedVendorIds.length}件)
							<ArrowRight size={16} />
						</Button>
					)}
					{parentName === 'milestone' && (
						<Button
							onClick={handleAipGenerate}
							disabled={selectedVendorIds.length === 0}
							className="flex items-center gap-2"
						>
							<Save size={16} />
							Create
						</Button>
					)}
				</div>
			</div>

			{/* 件数表示（フィルター後/全体） */}
			<span className="ml-auto text-sm text-gray-600">
				count: {table.getFilteredRowModel().rows.length} / {vendors.length}
			</span>

			<div className="bg-white rounded-lg border border-gray-300 flex-1 h-[72%] overflow-auto shadow-sm">
				<table className="w-full h-[10%]">
					<thead className="bg-gray-50 sticky top-0 border-b">
						{table.getHeaderGroups().map((headerGroup) => (
							<tr key={headerGroup.id}>
								{headerGroup.headers.map((header) => (
									<th
										key={header.id}
										className="px-3 py-2 text-left text-xs text-gray-600"
										style={{ width: header.getSize() }}
									>
										{flexRender(
											header.column.columnDef.header,
											header.getContext(),
										)}
									</th>
								))}
							</tr>
						))}
					</thead>
					<tbody className="bg-white divide-y divide-gray-100">
						{table.getRowModel().rows.map((row) => (
							<tr
								key={row.id}
								className={`hover:bg-gray-50 transition-colors cursor-pointer ${
									row.getIsSelected() ? 'bg-blue-50' : ''
								}`}
								// Why not: チェックボックスだけでなく行全体をクリック可能にする理由は、
								// ユーザビリティ向上のため（特にタッチデバイスでの操作性）
								onClick={() => row.toggleSelected()}
							>
								{row.getVisibleCells().map((cell) => (
									<td key={cell.id} className="px-3 py-2 text-sm">
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			</div>
			{parentName === 'milestone' && (
				<div className="flex justify-end mt-4">
					<Button
						variant="outline"
						onClick={handleCancel}
						className="flex items-center gap-2"
					>
						<X className="w-4 h-4" />
						Cancel
					</Button>
				</div>
			)}
		</div>
	);
};