import type { Vendor } from '@/types';
import type { ColumnDef } from '@tanstack/react-table';

/**
 * ベンダーテーブルのカラム定義
 */
export const getVendorColumns = (): ColumnDef<Vendor>[] => {
	// ベースとなるカラム定義（すべての列を表示）
	const base: ColumnDef<Vendor>[] = [
		{
			id: 'vendorName',
			header: 'Vendor Name',
			accessorKey: 'vendorName',
			size: 150,
			minSize: 120,
			maxSize: 200,
		},
		{
			id: 'vendorId',
			header: 'Vendor Id',
			accessorKey: 'vendorId',
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