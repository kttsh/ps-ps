import { GenericEditableTable } from '@/components';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PipCardArea } from '@/features/item-assignment/components/PipCardArea';
import { getItemColumns } from '@/features/item-management/columns/getItemColumns';
import { ItemTableControls } from '@/features/item-management/components/ItemTableControls';
import { ITEM_FILTER_PLACEHOLDERS } from '@/features/item-management/constants/item-filter-placeholders';
import { useItems } from '@/features/item-management/hooks/useItems';
import { transformItemResponseToItem } from '@/features/item-management/utils';
import { styleItemCell } from '@/features/item-management/utils/styleItemCell';
import { SplashWrapper } from '@/features/psys-randing/components';
import { useFgCodeUrlSync } from '@/hooks/useFgCodeUrlSync';
import { cn } from '@/lib/utils';
import { useAlertStore } from '@/stores/useAlartStore';
import { useFgsStore } from '@/stores/useFgsStore';
import { usePipGenerationModeStore } from '@/stores/usePipGenerationModeStore';
import { useSelectedFGStore } from '@/stores/useSelectedFgStore';
import { useSelectedJobNoStore } from '@/stores/useSelectedJobNoStore';
import type { Item } from '@/types';
import type { ResponseInfo } from '@/types/common-api';
import { createFileRoute } from '@tanstack/react-router';
import type { Table } from '@tanstack/react-table';
import { ArrowRight, CircleChevronRight, Search } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

/**
 * 購入品管理画面のルーティング
 * 編集機能付きの購入品テーブル、PIPカードエリアのレイアウトを定義する
 */
const ItemAssignment: React.FC = () => {
	// 購入品リスト取得
	const [items, setItems] = useState<Item[]>([]);
	// チェック列の表示制御（編集モードでは非表示）
	const [_showItemCheckbox, setShowItemCheckbox] = useState(false);
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
	const [nickname, setNickname] = useState('');
	const [globalFilter, setGlobalFilter] = useState('');

	// PIP生成モードの状態
	const { pipGenerationMode } = usePipGenerationModeStore();

	// プロジェクトの選択状態
	const { selectedJobNo } = useSelectedJobNoStore();
	const { selectedFG, setSelectedFG } = useSelectedFGStore();
	const { fgs } = useFgsStore();

	// メッセージ表示
	const { showAlert } = useAlertStore();

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
	const { data: itemsResponse, isLoading } = useItems(selectedJobNo, fgCode);

	useEffect(() => {
		if (itemsResponse) {
			console.log('検知してるよ');
			// 数値にすべきカラムの型を変換
			const transformedItems = transformItemResponseToItem(itemsResponse.items);
			setItems(transformedItems);

			itemsResponse.Messages?.some(
				(msg: ResponseInfo) => msg.Id === 'NO_ITEMS',
			) && showAlert(['NO_DATA'], 'warning');
		}
	}, [itemsResponse, showAlert]);

	const filteredItems = useMemo(() => {
		return items.filter(
		(item) =>
			!committedItems.some((committed) => committed.itemNo === item.itemNo),
		);
	},[items, committedItems]);

	// 選択された購入品リスト（チェックされた行のみ抽出）
	const selectedItems = items.filter((d) => itemSelection[d.itemNo]);

	// PIPに割り当てる処理：選択されたアイテムを committedItems に追加
	const handleAssign = () => {
		setCommittedItems((prev) => [
			...prev,
			...selectedItems.map((item) => ({
				...item,
				itemQty: item.itemUnassignedQty,
			})),
		]);
		setItemSelection({});
	};

	return (
		<SplashWrapper>
			{/* 購入品管理画面 */}
			<div className="h-screen bg-gray-100 p-6 overflow-hidden">
				<div className={pipGenerationMode !== 'display' ? 'mb-2' : 'mb-0'}>
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
						setShowCheckbox={setShowItemCheckbox}
						selectedCount={selectedCount}
						setCommittedItems={setCommittedItems}
						tableInstance={tableInstance}
						showFilters={showFilters}
						setShowFilters={setShowFilters}
						committedItems={committedItems}
						setItemSelection={setItemSelection}
						setSelectedCount={setSelectedCount}
						nickname={nickname}
						setNickname={setNickname}
						setGlobalFilter={setGlobalFilter}
					/>
				</div>
				{/* 中央：PIP割当ボタン（生成モード時のみ表示） */}
				<div
					className={cn(
						'flex gap-4',
						pipGenerationMode === 'display' ? 'h-[80%]' : 'h-[74%]',
					)}
				>
					<div className={pipGenerationMode === 'display' ? 'w-full' : 'w-1/2'}>
						{pipGenerationMode !== 'display' && (
							<div className="flex items-center gap-4 mb-1">
								<div className="relative flex-1">
									<Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
									<Input
										placeholder="Keyword Search"
										value={globalFilter}
										onChange={(e) => setGlobalFilter(e.target.value)}
										className="pl-10 text-sm bg-white"
									/>
								</div>
								<Button
									onClick={handleAssign}
									disabled={selectedCount === 0}
									className="flex items-center gap-2 cursor-pointer h-8"
									size="sm"
								>
									<CircleChevronRight size={16} />
									Assign Items
									<span>({selectedCount})</span>
									<ArrowRight size={16} />
								</Button>
							</div>
						)}
						{/* 件数表示（フィルター後/全体） */}
						<span className="ml-auto text-sm text-gray-600">
							count: {filteredCount} / {items.length}
						</span>
						<div className="max-w-10xl mx-auto h-full flex gap-4">
							{/* 購入品テーブル(汎用テーブルを使用、編集機能付き) */}
							<div className="w-full">
								<GenericEditableTable
									keyField="itemNo"
									data={filteredItems}
									columns={getItemColumns(pipGenerationMode !== 'display')} // PIP生成モード時は一部列を非表示
									isEditing={isEditingItem}
									showCheckbox={pipGenerationMode !== 'display'}
									showFilters={showFilters}
									dirtyCells={itemDirty}
									setDirtyCells={setItemDirty}
									rowSelection={itemSelection}
									setRowSelection={setItemSelection}
									onSelectedRowCountChange={setSelectedCount}
									onFilteredCountChange={setFilteredCount} // ✅ フィルター件数を受け取る
									renderCell={styleItemCell}
									customFilterPlaceholders={ITEM_FILTER_PLACEHOLDERS}
									numericFilterColumns={['qty', 'unassignedQty']}
									onTableReady={setTableInstance} // table インスタンスを受け取りフィルター操作用に保存
									isLoading={isLoading}
									globalFilter={globalFilter}
									setGlobalFilter={setGlobalFilter}
								/>
							</div>
						</div>
					</div>
					{/* 一覧表示のみの場合以外は、右側にPIPカードエリアを表示 */}
					{pipGenerationMode !== 'display' && (
						<div className="w-1/2">
							<PipCardArea
								committedItems={committedItems}
								setCommittedItems={setCommittedItems}
								setItems={setItems}
								nickname={nickname}
								setNickname={setNickname}
							/>
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