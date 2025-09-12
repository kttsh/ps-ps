import type { Table } from '@tanstack/react-table';
import { AlertCircle, Building2, Package, ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import { EmptyState, GenericEditableTable } from '@/components';
import { GenericReadonlyControl } from '@/components/generic-table/GenericReadonlyControl';
import { Label } from '@/components/ui/label';
import { getItemColumns } from '@/features/item-management/columns/getItemColumns';
import { styleItemCell } from '@/features/item-management/utils/styleItemCell';
import { usePipDetailStore } from '@/stores/usePipDetailStore';
import type { Item, Vendor } from '@/types';
import { getVendorColumns } from '../columns/getVendorColumns';
import { styleVendorCell } from '../utils/styleVendorCell';

export const PipDetail = () => {
	const { pipDetailData } = usePipDetailStore();
	// PIPテーブルで選択したPIPに紐づく購入品リスト
	const items = pipDetailData.items;
	// PIPテーブルで選択したPIPに紐づくベンダーリスト
	const vendors = pipDetailData.vendors;
	// フィルター後の件数を管理（現在フィルタ未使用）
	const [filteredItemCount, setFilteredItemCount] = useState(items?.length); // 購入品
	const [filteredVendorCount, setFilteredVendorCount] = useState(
		vendors?.length,
	); // ベンダー
	// フィルター入力欄の表示ON/OFF（現在フィルタボタン非表示）
	const [showItemFilters, setShowItemFilters] = useState(false); // 購入品
	const [showVendorFilters, setShowVendorFilters] = useState(false); // ベンダー
	// フィルタークリア用にTableインスタンスを保持（現在フィルタ未使用）
	const [itemTableInstance, setItemTableInstance] =
		useState<Table<Item> | null>(null); // 購入品
	const [vendorTableInstance, setVendorTableInstance] =
		useState<Table<Vendor> | null>(null); // ベンダー

	return (
		<div className="flex flex-col bg-sky-50 rounded-lg border border-sky-200 shadow-sm p-6 pb-8 space-y-6 h-[80%]">
			{/* ヘッダー */}
			<div className="flex items-center gap-3 border-b border-gray-300 pb-4">
				<div className="bg-gradient-to-br from-sky-300 to-sky-600 text-white rounded-lg p-2">
					<Package size={24} />
				</div>
				<div className="flex items-center">
					<div>
						<Label className="text-sm text-gray-700">PIP Code</Label>
						<Label className="text-md text-gray-500">
							{pipDetailData.pipCode}
						</Label>
					</div>
					<Label className="text-2xl text-gray-800 ml-5">
						{pipDetailData.pipNickName}
					</Label>
				</div>
			</div>
			<div className="flex flex-col h-full gap-7">
				<div className="h-[50%]">
					{/* タイトル・フィルタボタン */}
					<GenericReadonlyControl<Item>
						title="購入品"
						data={items}
						isFilterActive={false}
						tableInstance={itemTableInstance}
						filteredCount={filteredItemCount}
						showFilters={showItemFilters}
						setShowFilters={setShowItemFilters}
						icon={<ShoppingCart size={20} />}
					/>
					<div className="mt-2 h-[90%]">
						{/* 購入品テーブル */}
						<GenericEditableTable<Item>
							keyField="itemNo"
							data={items}
							columns={getItemColumns(true)}
							disableEditing
							disableSelection
							showFilters={showItemFilters} // ✅ フィルター表示ON/OFF切り替え
							renderCell={styleItemCell}
							onFilteredCountChange={setFilteredItemCount} // ✅ フィルター後件数を受け取る
							onTableReady={setItemTableInstance} // ✅ table instance を取得してボタンから操作可能に
						/>
					</div>
				</div>

				<div className="h-[50%]">
					<GenericReadonlyControl<Vendor>
						title="ベンダー"
						data={vendors}
						isFilterActive={false}
						tableInstance={vendorTableInstance}
						filteredCount={filteredVendorCount}
						showFilters={showVendorFilters}
						setShowFilters={setShowVendorFilters}
						icon={<Building2 size={20} />}
					/>
					{vendors.length !== 0 ? (
						<div className="mt-2 h-[90%]">
							{/* ベンダーテーブル */}
							<GenericEditableTable<Vendor>
								keyField="vendorId"
								data={vendors}
								columns={getVendorColumns()}
								disableEditing
								disableSelection
								showFilters={showVendorFilters} // ✅ フィルター表示ON/OFF切り替え
								renderCell={styleVendorCell}
								onFilteredCountChange={setFilteredVendorCount} // ✅ フィルター後件数を受け取る
								onTableReady={setVendorTableInstance} // ✅ table instance を取得してボタンから操作可能に
							/>
						</div>
					) : (
						<div className="pt-20">
							<EmptyState
								icon={AlertCircle}
								label="No vendor has been assigned yet."
							/>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};
