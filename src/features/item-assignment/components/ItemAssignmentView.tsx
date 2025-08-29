// import { GenericEditableTable } from '@/components';
// import { ItemTableControls } from '@/features/item-management/components/ItemTableControls';
// import { ITEM_FILTER_PLACEHOLDERS } from '@/features/item-management/constants/item-filter-placeholders';
// import { getItemColumns } from '@/features/item-management/utils/getItemColumns';
// import { cn } from '@/lib/utils';
// import { useAlertStore } from '@/stores/useAlartStore';
// import { useIsSearchTriggeredStore } from '@/stores/useIsSearchTriggeredStore';
// import { usePipGenerationModeStore } from '@/stores/usePipGenerationModeStore';
// import { useSelectedFGStore } from '@/stores/useSelectedFgStore';
// import { useSelectedJobNoStore } from '@/stores/useSelectedJobNoStore';
// import type { Item } from '@/types';
// import type { Table } from '@tanstack/react-table';
// import { useContext, useEffect, useState } from 'react';
// import { PSysContext } from '../../../routes/p-sys/route';
// import { useItems } from '../hooks/useItems';
// // 購入品取得
// import { styleItemCell } from '@/features/item-management/utils';
// import { SplashWrapper } from '@/features/psys-randing/components';
// import { getItemsForItemTable } from '../utils/getItemsForItemTable';
// import { PipCardArea } from './PipCardArea';

// export const ItemAssignmentView: React.FC = () => {
// 	// コンテキストから値を取得: ItemAssignmentViewを呼び出す際のモード
// 	const { isItemAssignmentView } = useContext(PSysContext);
// 	// 選択したJobNo、FG
// 	const { selectedJobNo } = useSelectedJobNoStore();
// 	const { selectedFG } = useSelectedFGStore();

// 	// アラートの状態
// 	const { showAlert } = useAlertStore();

// 	// Display by Selectionの押下状態
// 	const { triggerState, resetSearchTrigger, triggerResearch } =
// 		useIsSearchTriggeredStore();

// 	// 購入品情取得
// 	const { refetch } = useItems(selectedJobNo, selectedFG?.fgCode);
// 	const [items, setItems] = useState<Item[]>([]);

// 	// 購入品取得処理
// 	useEffect(() => {
// 		if (triggerState === 'none') return;

// 		// Display by Selection押下状態をリセット
// 		resetSearchTrigger();

// 		const fetchItems = async () => {
// 			try {
// 				const result = await refetch(); // 明示的に再フェッチ
// 				const fetched = result.data;

// 				if (fetched) {
// 					// 異常処理: 検索結果が見つからない
// 					if (typeof fetched.responseJSON === 'string') {
// 						const parsed = JSON.parse(fetched.responseJSON);
// 						if (parsed.statusCode === '404') {
// 							showAlert(['SEARCH_FAILURE']);
// 							setItems([]);
// 							return;
// 						}
// 					}

// 					// 正常処理: 購入品取得
// 					setItems(getItemsForItemTable(fetched));
// 				}
// 			} catch (err) {
// 				console.error('Refetch error:', err);
// 				showAlert(['SEARCH_FAILURE']);
// 				setItems([]);
// 			}
// 		};

// 		fetchItems(); // 非同期関数を呼び出す
// 	}, [triggerState]);

// 	// チェック列の表示制御（編集モードでは非表示）
// 	const [showItemCheckbox, setShowItemCheckbox] = useState(false);
// 	// 編集モードの ON/OFF
// 	const [isEditingItem, setIsEditingItem] = useState(false);
// 	// 編集中の差分管理（id ごとの部分更新）
// 	const [itemDirty, setItemDirty] = useState<Record<string, Partial<Item>>>({});
// 	// 行の選択状態（割当対象）
// 	const [itemSelection, setItemSelection] = useState<Record<string, boolean>>(
// 		{},
// 	);
// 	// 現在チェックされている行数
// 	const [selectedCount, setSelectedCount] = useState(0);
// 	// 割当確定後のレコード一覧（チェック→割当ボタン押下で確定）
// 	const [committedItems, setCommittedItems] = useState<Item[]>([]);
// 	// 現在フィルターで表示されている件数
// 	const [filteredCount, setFilteredCount] = useState(0);
// 	// React Tableのインスタンス フィルタークリア用に保持
// 	const [tableInstance, setTableInstance] = useState<Table<Item> | null>(null);
// 	// フィルタ表示状態
// 	const [showFilters, setShowFilters] = useState(true);

// 	// PIP生成モードの状態
// 	const pipGenerationMode = usePipGenerationModeStore(
// 		(state) => state.pipGenerationMode,
// 	);
// 	// PIP管理画面から遷移した場合は、初期状態でPIP生成モード表示とする
// 	const setPipGenerationMode = usePipGenerationModeStore(
// 		(state) => state.setPipGenerationMode,
// 	);
// 	// PIP編集モードの場合は購入品を再検索する
// 	useEffect(() => {
// 		if (isItemAssignmentView === 'pipManagement') {
// 			setPipGenerationMode('generation');

// 			// 再検索の実施
// 			triggerResearch();
// 		}
// 	}, [isItemAssignmentView]);

// 	// PIP Nicknameの入力状態を管理
// 	const [pipNickName, setPipNickName] = useState('');

// 	// PIPカードエリアの各数量変更状態を管理
// 	const [selectedQtyMap, setSelectedQtyMap] = useState<Record<string, string>>(
// 		{},
// 	);

// 	/*
// 	 * 編集中にブラウザ(タブ)を閉じようとすると
// 	 * 閉じて問題ないかダイヤログで確認
// 	 */
// 	useEffect(() => {
// 		const handleBeforeUnload = (e: BeforeUnloadEvent) => {
// 			e.preventDefault();
// 			e.returnValue = '';
// 		};

// 		if (isEditingItem) {
// 			window.addEventListener('beforeunload', handleBeforeUnload);
// 		} else {
// 			window.removeEventListener('beforeunload', handleBeforeUnload);
// 		}

// 		return () => {
// 			window.removeEventListener('beforeunload', handleBeforeUnload);
// 		};
// 		// 値が変更されたときに再実行
// 	}, [isEditingItem]);

// 	return (
// 		<SplashWrapper>
// 			{/* 購入品管理画面 */}
// 			<div className="h-screen bg-gray-100 p-6 overflow-hidden">
// 				{/* タイトル・ボタン群 */}
// 				<ItemTableControls
// 					data={items}
// 					setData={setItems}
// 					isEditing={isEditingItem}
// 					setIsEditing={setIsEditingItem}
// 					dirtyCells={itemDirty}
// 					setDirtyCells={setItemDirty}
// 					rowSelection={itemSelection}
// 					setRowSelection={setItemSelection}
// 					showCheckbox={showItemCheckbox}
// 					setShowCheckbox={setShowItemCheckbox}
// 					selectedCount={selectedCount}
// 					setCommittedItems={setCommittedItems}
// 					committedItems={committedItems}
// 					tableInstance={tableInstance}
// 					showFilters={showFilters}
// 					setShowFilters={setShowFilters}
// 					// PIPカードエリア固有の値や更新値
// 					pipNickName={pipNickName}
// 					setPipNickName={setPipNickName}
// 					selectedQtyMap={selectedQtyMap}
// 					setSelectedQtyMap={setSelectedQtyMap}
// 				/>
// 				{/* 件数表示（フィルター後/全体） */}
// 				<span className="ml-auto text-sm text-gray-600">
// 					count: {filteredCount} / {items.length}
// 				</span>
// 				<div className="max-w-10xl mx-auto h-full flex gap-4">
// 					<div
// 						className={cn(
// 							'h-[80%]',
// 							pipGenerationMode !== 'display' ? 'w-1/2' : 'w-full',
// 						)}
// 					>
// 						{/* 購入品テーブル(汎用テーブルを使用、編集機能付き) */}
// 						<GenericEditableTable
// 							keyField="itemNo"
// 							data={items}
// 							columns={getItemColumns(pipGenerationMode)} // PIP生成モード時は一部列を非表示
// 							isEditing={isEditingItem}
// 							showCheckbox={!isEditingItem}
// 							showFilters={showFilters}
// 							dirtyCells={itemDirty}
// 							setDirtyCells={setItemDirty}
// 							rowSelection={itemSelection}
// 							setRowSelection={setItemSelection}
// 							onSelectedRowCountChange={setSelectedCount}
// 							onFilteredCountChange={setFilteredCount} // ✅ フィルター件数を受け取る
// 							renderCell={styleItemCell}
// 							customFilterPlaceholders={ITEM_FILTER_PLACEHOLDERS}
// 							numericFilterColumns={['qty']}
// 							onTableReady={setTableInstance} // table インスタンスを受け取りフィルター操作用に保存
// 						/>
// 					</div>
// 					{/* 一覧表示のみの場合以外は、右側にPIPカードエリアを表示 */}
// 					{pipGenerationMode !== 'display' && (
// 						<div className="w-1/2">
// 							<PipCardArea
// 								// 購入品管理画面 左側で選択された購入品
// 								committedItems={committedItems}
// 								setCommittedItems={setCommittedItems}
// 								setData={setItems}
// 								// PIPカードエリア固有の値や更新値
// 								pipNickName={pipNickName}
// 								setPipNickName={setPipNickName}
// 								selectedQtyMap={selectedQtyMap}
// 								setSelectedQtyMap={setSelectedQtyMap}
// 							/>
// 						</div>
// 					)}
// 				</div>
// 			</div>
// 		</SplashWrapper>
// 	);
// };

