import type { ColumnDef } from '@tanstack/react-table';
import type { Vendor } from '@/types';

/**
 * ベンダーテーブルのカラム定義
 */
export const getVendorColumns = (): ColumnDef<Vendor>[] => {
	// ベースとなるカラム定義（すべての列を表示）
	const base: ColumnDef<Vendor>[] = [
		{
			id: 'name',
			header: 'Vendor Name',
			accessorKey: 'name',
			size: 150,
			minSize: 120,
			maxSize: 200,
		},
		{
			id: 'code',
			header: 'Vendor Code',
			accessorKey: 'code',
			size: 150,
			minSize: 120,
			maxSize: 200,
		},
		{
			id: 'aipCode',
			header: 'AIP',
			accessorKey: 'aipCode',
			size: 150,
			minSize: 120,
			maxSize: 200,
		},
	];

	return base;
};

