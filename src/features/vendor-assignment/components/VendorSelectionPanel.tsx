import {
	type ColumnDef,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	useReactTable,
} from '@tanstack/react-table';
import { ArrowRight, CircleChevronRight, Search, Users } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { IndeterminateCheckbox } from '@/components/ui/IndeterminateCheckbox';
import { Input } from '@/components/ui/input';
import type { Vendor } from '@/types';

interface VendorSelectionPanelProps {
	vendors: Vendor[];
	selectedVendorIds: string[];
	onSelectionChange: (ids: string[]) => void;
	onAssign: (vendors: Vendor[]) => void;
	setSelectedVendors: React.Dispatch<React.SetStateAction<Vendor[]>>;
	setAvailableVendors: React.Dispatch<React.SetStateAction<Vendor[]>>;
}

export const VendorSelectionPanel: React.FC<VendorSelectionPanelProps> = ({
	vendors,
	selectedVendorIds,
	onSelectionChange,
	onAssign,
	setSelectedVendors, // 画面上で選択されたベンダー
	setAvailableVendors, // 画面上で選択可能なベンダー
}) => {
	const [globalFilter, setGlobalFilter] = useState('');

	// How: ID配列をTanStack Tableのインデックスベース選択状態に変換
	// Why not: IDベースの管理ではなくインデックスベースを使う理由は、
	// TanStack Tableの内部実装に合わせることでパフォーマンスが向上するため
	const rowSelection = useMemo(() => {
		const selection: Record<string, boolean> = {};
		vendors.forEach((vendor, index) => {
			if (selectedVendorIds.includes(vendor.aipPsysVendorId)) {
				selection[index.toString()] = true;
			}
		});
		return selection;
	}, [vendors, selectedVendorIds]);

	const columns = useMemo<ColumnDef<Vendor>[]>(
		() => [
			{
				id: 'select',
				size: 40,
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
				header: 'ベンダー名',
				cell: ({ row }) => (
					<span className="text-gray-900 text-sm">
						{row.original.vendorName}
					</span>
				),
			},
			{
				accessorKey: 'vendorCode',
				header: 'ベンダーコード',
				cell: ({ row }) => (
					<span className="text-gray-700 text-xs">
						{row.original.vendorCode}
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
				.map((index) => vendors[Number.parseInt(index)]?.aipPsysVendorId)
				.filter(Boolean);
			onSelectionChange(selectedIds);
		},
		onGlobalFilterChange: setGlobalFilter,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		globalFilterFn: 'includesString',
	});

	const handleAssign = () => {
		// 選択されたベンダーの一覧
		const selectedVendors = vendors.filter((vendor) =>
			selectedVendorIds.includes(vendor.aipPsysVendorId),
		);

		// 画面右側を更新
		onAssign(selectedVendors);
		setSelectedVendors((prev) => [...prev, ...selectedVendors]);

		// 画面左側を更新
		setAvailableVendors((prev) =>
			prev.filter(
				(vendor) =>
					!selectedVendors.some(
						(selected) => selected.aipPsysVendorId === vendor.aipPsysVendorId,
					),
			),
		);

		// Why not: 割り当て後も選択状態を維持しない理由は、
		// 同じベンダーの重複割り当てを防ぐため
		onSelectionChange([]);
	};

	return (
		<div className="bg-white rounded-lg border border-gray-300 flex flex-col shadow-sm py-4 px-8 h-full">
			<div>
				<h2 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
					<Users size={20} />
					未割り当てベンダー
				</h2>
				<div className="flex gap-4 mb-4">
					<div className="relative flex-1">
						<Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
						<Input
							placeholder="ベンダー名で検索..."
							value={globalFilter}
							onChange={(e) => setGlobalFilter(e.target.value)}
							className="pl-10 text-sm"
						/>
					</div>
					<Button
						onClick={handleAssign}
						disabled={selectedVendorIds.length === 0}
						className="flex items-center gap-2"
					>
						<CircleChevronRight size={16} />
						PIPに割り当て ({selectedVendorIds.length}件)
						<ArrowRight size={16} />
					</Button>
				</div>
			</div>

			<div className="text-sm text-gray-600 mb-2">
				{selectedVendorIds.length > 0
					? `${selectedVendorIds.length}件選択中`
					: `${vendors.length}件のベンダー`}
			</div>

			<div className="bg-white rounded-lg border border-gray-300 flex-1 overflow-auto">
				<table className="w-full">
					<thead className="bg-gray-50 sticky top-0">
						{table.getHeaderGroups().map((headerGroup) => (
							<tr key={headerGroup.id}>
								{headerGroup.headers.map((header) => (
									<th
										key={header.id}
										className="px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
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
		</div>
	);
};
