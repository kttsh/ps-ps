import { EmptyState, GenericEditableTable } from '@/components';
import { GenericReadonlyControl } from '@/components/generic-table/GenericReadonlyControl';
import { getItemColumns } from '@/features/item-management/columns/getItemColumns';
import { styleItemCell } from '@/features/item-management/utils/styleItemCell';
import type { Item, Pip, Vendor } from '@/types';
import type { Table } from '@tanstack/react-table';
import { AlertCircle, Ship } from 'lucide-react';
import { useState } from 'react';
import { getVendorColumns } from '../utils/getVendorColumns';
import { styleVendorCell } from '../utils/styleVendorCell';

/**
 * PIP管理画面右側のPIP詳細エリアの表示切替とレイアウトを定義
 * pipDetail: PIPと紐づく購入品とベンダーのリスト
 */
export const PipDetail = ({ pipDetail }: { pipDetail: Pip }) => {
	// PIPテーブルで選択したPIPに紐づく購入品リスト
	const items = pipDetail.items;
	// PIPテーブルで選択したPIPに紐づくベンダーリスト
	const vendors = pipDetail.vendors;

	// フィルター後の件数を管理（現在フィルタ未使用）
	const [filteredItemCount, setFilteredItemCount] = useState(items.length); // 購入品
	const [filteredVendorCount, setFilteredVendorCount] = useState(
		vendors.length,
	); // ベンダー
	// フィルター入力欄の表示ON/OFF（現在フィルタボタン非表示）
	const [showItemFilters, setShowItemFilters] = useState(false); // 購入品
	const [showVendorFilters, setShowVendorFilters] = useState(false); // ベンダー
	// フィルタークリア用にTableインスタンスを保持（現在フィルタ未使用）
	const [itemTableInstance, setItemTableInstance] =
		useState<Table<Item> | null>(null); // 購入品
	const [vendorTableInstance, setVendorTableInstance] =
		useState<Table<Vendor> | null>(null); // ベンダー

	// PIP管理画面でPIPレコードが押下されたかで表示画面を切り替え
	return !pipDetail.code ? (
		<div className="pt-30">
			{/* PIP管理画面でPIPレコードが押下されていないときはアラート画面を表示 */}
			<EmptyState icon={Ship} label="クリックしたPIPの詳細情報を表示します" />
		</div>
	) : (
		// PIP管理画面でPIPレコードが押下されたときは紐づく購入品、ベンダーテーブルを表示
		<div className="bg-white rounded-lg shadow-sm border border-gray-300 flex flex-col py-4 px-8 h-[80%]">
			<div className="min-h-12">
				{/* PIP nickname */}
				<h2 className="text-2xl text-gray-800">{pipDetail.nickname}</h2>
				{/* PIP Code */}
				<h4 className="text-md text-gray-500">{pipDetail.code}</h4>
			</div>
			<div className="flex flex-col h-full mt-5 gap-10">
				<div className="h-[43%]">
					{/* タイトル・フィルタボタン */}
					<GenericReadonlyControl<Item>
						title="購入品"
						data={items}
						isFilterActive={false}
						tableInstance={itemTableInstance}
						filteredCount={filteredItemCount}
						showFilters={showItemFilters}
						setShowFilters={setShowItemFilters}
					/>
					<div className="mt-2 h-[95%]">
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

				<div className="h-[38%]">
					<GenericReadonlyControl<Vendor>
						title="ベンダー"
						data={vendors}
						isFilterActive={false}
						tableInstance={vendorTableInstance}
						filteredCount={filteredVendorCount}
						showFilters={showVendorFilters}
						setShowFilters={setShowVendorFilters}
					/>
					{vendors.length === 0 ? (
						<div className="pt-20">
							<EmptyState
								icon={AlertCircle}
								label="まだベンダーが割り当てられていません"
							/>
						</div>
					) : (
						<div className="mt-2 h-[95%]">
							{/* 購入品テーブル */}
							<GenericEditableTable<Vendor>
								keyField="id"
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
					)}
				</div>
			</div>
		</div>
	);
};

