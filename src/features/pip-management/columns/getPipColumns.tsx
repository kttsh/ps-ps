import type { ColumnDef } from '@tanstack/react-table';
import { Package } from 'lucide-react';
import type { Pip } from '@/types';

/**
 * PIPテーブルのカラム定義
 */
export const getPipColumns = () => {
	// ベースとなるカラム定義
	const base: ColumnDef<Pip>[] = [
		{
			id: 'pipCode',
			header: 'PIP Code',
			accessorKey: 'pipCode',
			size: 250,
			minSize: 80,
			maxSize: 250,
			cell: ({ getValue }) => {
				const value = getValue();
				return (
					<div className="flex items-center gap-2">
						<Package className="h-4 w-4 text-blue-600" />
						<span className="font-mono text-sm">{String(value)}</span>
					</div>
				);
			},
		},
		{
			id: 'pipNickName',
			header: 'PIP Nickname',
			accessorKey: 'pipNickName',
			size: 350,
			minSize: 150,
			maxSize: 350,
			cell: ({ getValue }) => {
				const value = getValue();
				return <span className="font-mono text-sm">{String(value)}</span>;
			},
		},
		{
			id: 'itemCount',
			header: 'Item Count',
			size: 100,
			enableColumnFilter: false,
			cell: ({ row }) => (
				<span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
					{row.original.itemCount}
				</span>
			),
		},
		{
			id: 'vendorCount',
			header: 'Vendor Count',
			size: 100,
			enableColumnFilter: false,
			cell: ({ row }) => (
				<span className="bg-purple-100 text-purple-800 text-xs font-medium px-2 py-1 rounded-full">
					{row.original.vendorCount}
				</span>
			),
		},
	];

	return base;
};