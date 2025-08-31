import { createFileRoute } from '@tanstack/react-router';
import type { Table } from '@tanstack/react-table';
import { useEffect, useState } from 'react';
import { GenericEditableTable } from '@/components';
import { PipCardArea } from '@/features/item-assignment/components/PipCardArea';
import { getItemColumns } from '@/features/item-management/columns/getItemColumns';
import { ItemTableControls } from '@/features/item-management/components/ItemTableControls';
import { ITEM_FILTER_PLACEHOLDERS } from '@/features/item-management/constants/item-filter-placeholders';
import { useItems } from '@/features/item-management/hooks/useItems';
import { styleItemCell } from '@/features/item-management/utils/styleItemCell';
import { transformItemResponseToItem } from '@/features/item-management/utils/transformItemResponseToItem';
import { SplashWrapper } from '@/features/psys-randing/components';
import { useFgCodeUrlSync } from '@/hooks/useFgCodeUrlSync';
import { cn } from '@/lib/utils';
import { useFgsStore } from '@/stores/useFgsStore';
import { usePipGenerationModeStore } from '@/stores/usePipGenerationModeStore';
import { useSelectedFGStore } from '@/stores/useSelectedFgStore';
import { useSelectedJobNoStore } from '@/stores/useSelectedJobNoStore';
import type { Item } from '@/types';

/**
 * 購入品管理画面のルーティング
 * 編集機能付きの購入品テーブル、PIPカードエリアのレイアウトを定義する
 */
const ItemAssignment: React.FC = () => {
	// 購入品リスト取得
	const [items, setItems] = useState<Item[]>([]);
	// チェック列の表示制御（編集モードでは非表示）
	const [showItemCheckbox, setShowItemCheckbox] = useState(false);
	// 編集モードの ON/OFF
	const [isEditingItem, setIsEditingItem] = useState(false);
	// 編集中の差分管理（id ごとの部分更新）
	const [itemDirty, setItemDirty] = useState<Record<string, Partial<Item>>>({});
	// 行の選択状態（割当対象）
	const [itemSelection, setItemSelection] = useState<Record<string, boolean>>(
		{},
	);
	// 現在チェックされている行数
	const [selectedCount, setSelectedCount] = useState(0);
	// 割当確定後のレコード一覧（チェック→割当ボタン押下で確定）
	const [committedItems, setCommittedItems] = useState<Item[]>([]);
	// 現在フィルターで表示されている件数
	const [filteredCount, setFilteredCount] = useState(0);
	// React Tableのインスタンス フィルタークリア用に保持
	const [tableInstance, setTableInstance] = useState<Table<Item> | null>(null);
	// フィルタ表示状態
	const [showFilters, setShowFilters] = useState(true);

	// PIP生成モードの状態
	const pipGenerationMode = usePipGenerationModeStore(
		(state) => state.pipGenerationMode,
	);

	// プロジェクトの選択状態
	const { selectedJobNo } = useSelectedJobNoStore();
	const { selectedFG, setSelectedFG } = useSelectedFGStore();
	const { fgs } = useFgsStore();

	// URL同期の初期化
	useFgCodeUrlSync({
		fgs,
		onFgChange: (fg) => {
			// 現在の値と異なる場合のみ更新
			const newFgCode = fg?.fgCode;
			const currentFgCode = selectedFG?.fgCode;

			if (newFgCode !== currentFgCode) {
				setSelectedFG(fg || null);
			}
		},
	});

	// 購入品リスト取得
	const fgCode = selectedFG?.fgCode ?? null;
	const {
		data: itemsResponse,
		isLoading,
	} = useItems(selectedJobNo, fgCode);
	// console.log(`itemsResponse:${JSON.stringify(itemsResponse)}`);

	useEffect(() => {
		if (itemsResponse) {
			const transformedItems = transformItemResponseToItem(itemsResponse);
			setItems(transformedItems);
		}
	}, [itemsResponse]);

	return (
		<SplashWrapper>
			{/* 購入品管理画面 */}
			<div className="h-screen bg-gray-100 p-6 overflow-hidden">
				{/* タイトル・ボタン群 */}
				<ItemTableControls
					data={items}
					setData={setItems}
					isEditing={isEditingItem}
					setIsEditing={setIsEditingItem}
					dirtyCells={itemDirty}
					setDirtyCells={setItemDirty}
					rowSelection={itemSelection}
					setRowSelection={setItemSelection}
					showCheckbox={showItemCheckbox}
					setShowCheckbox={setShowItemCheckbox}
					selectedCount={selectedCount}
					setCommittedItems={setCommittedItems}
					tableInstance={tableInstance}
					showFilters={showFilters}
					setShowFilters={setShowFilters}
				/>
				{/* 件数表示（フィルター後/全体） */}
				<span className="ml-auto text-sm text-gray-600">
					count: {filteredCount} / {items.length}
				</span>
				<div className="max-w-10xl mx-auto h-full flex gap-4">
					<div
						className={cn(
							'h-[80%]',
							pipGenerationMode !== 'display' ? 'w-1/2' : 'w-full',
						)}
					>
						{/* 購入品テーブル(汎用テーブルを使用、編集機能付き) */}
						<GenericEditableTable
							keyField="itemNo"
							data={items}
							columns={getItemColumns(pipGenerationMode !== 'display')} // PIP生成モード時は一部列を非表示
							isEditing={isEditingItem}
							showCheckbox={!isEditingItem}
							showFilters={showFilters}
							dirtyCells={itemDirty}
							setDirtyCells={setItemDirty}
							rowSelection={itemSelection}
							setRowSelection={setItemSelection}
							onSelectedRowCountChange={setSelectedCount}
							onFilteredCountChange={setFilteredCount} // ✅ フィルター件数を受け取る
							renderCell={styleItemCell}
							customFilterPlaceholders={ITEM_FILTER_PLACEHOLDERS}
							numericFilterColumns={['qty']}
							onTableReady={setTableInstance} // table インスタンスを受け取りフィルター操作用に保存
							isLoading={isLoading}
						/>
					</div>
					{/* 一覧表示のみの場合以外は、右側にPIPカードエリアを表示 */}
					{pipGenerationMode !== 'display' && (
						<div className="w-1/2">
							<PipCardArea committedItems={committedItems} />
						</div>
					)}
				</div>
			</div>
		</SplashWrapper>
	);
};

export const Route = createFileRoute('/p-sys/item-assignment')({
	component: ItemAssignment,
});
