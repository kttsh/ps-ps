import { useRouter } from '@tanstack/react-router';
import {
	CircleCheckBig,
	Funnel,
	FunnelX,
	Package,
	Save,
	X,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useCreatePip } from '@/features/item-assignment/hooks/useCreatePip';
import { useUpdatePipItems } from '@/features/item-assignment/hooks/useUpdatePipItems';
import { createPipPayload } from '@/features/item-assignment/utils/createPipPayload';
import { usePips } from '@/features/pip-management/hooks/usePips';
import { useAlertStore } from '@/stores/useAlartStore';
import { useItemTableInstance } from '@/stores/useItemTableInstance';
import { usePipDetailStore } from '@/stores/usePipDetailStore';
import { usePipGenerationModeStore } from '@/stores/usePipGenerationModeStore';
import { useSelectedFGStore } from '@/stores/useSelectedFgStore';
import { useSelectedJobNoStore } from '@/stores/useSelectedJobNoStore';
import type { Item } from '@/types';
import { useItems } from '../hooks/useItems';
import type { ItemTableControlsProps } from './Item-table-controls';

/**
 * 購入品テーブルを操作する汎用ボタン群コンポーネント
 * 編集、削除、割当（PIP登録）、フィルタ表示などの操作を提供する
 */
export function ItemTableControls({
	data, // 購入品データの配列
	setData, // データ更新関数（保存・削除時に使用）
	isEditing, // 編集モードかどうかのフラグ
	setIsEditing, // 編集モードの切り替え関数
	dirtyCells, // 編集されたセルの差分（itemNoごとの変更内容）
	setDirtyCells, // 差分の更新関数
	setShowCheckbox, // チェックボックス列の表示切り替え関数
	setCommittedItems, // PIPに割り当てるアイテムの更新関数
	// tableInstance, // テーブルインスタンス（フィルタ操作に使用）
	committedItems, // 割り当て済み購入品
	setItemSelection,
	nickname,
	setNickname,
	setGlobalFilter,
}: ItemTableControlsProps) {
	// 編集開始時に元データを保持（キャンセル時に復元するため）
	const [originalData, setOriginalData] = useState<Item[] | null>(null);
	const [showAllItems, setShowAllItems] = useState<boolean>(true);

	// PIP生成モードの状態（display: 表示モード, generation: 生成モード）
	const { pipGenerationMode, setPipGenerationMode } =
		usePipGenerationModeStore();

	const { selectedFG } = useSelectedFGStore();
	const { selectedJobNo } = useSelectedJobNoStore();
	const { selectedPipCode } = usePipDetailStore();
	const { itemTableInstance: tableInstance } = useItemTableInstance();

	// メッセージ表示
	const { showAlert } = useAlertStore();

	const router = useRouter();

	const { mutate: createPip } = useCreatePip();
	const fgCode = selectedFG?.fgCode ?? null;
	const { mutate: updatePip } = useUpdatePipItems(
		selectedJobNo,
		fgCode,
		selectedPipCode,
	);

	const { refetch: itemsRefetch } = useItems(selectedJobNo, fgCode);
	const { refetch: pipsRefetch } = usePips(selectedJobNo, fgCode);

	// 編集キャンセル：元データに戻す
	const cancelEditing = () => {
		if (originalData !== null) {
			setData(originalData.map((row) => ({ ...row })));
			setDirtyCells({});
			setOriginalData(null);
			setIsEditing(false);
		}
	};

	useEffect(() => {
		if (pipGenerationMode === 'edit') {
			setShowCheckbox(false);
			// Edit PIPモードに入った時、Unassigned Qty が0のアイテムを非表示にする
			if (tableInstance) {
				tableInstance.setColumnFilters([
					{
						id: 'itemUnassignedQty',
						value: [1, undefined], // 1以上の値を持つ行のみ表示
					},
				]);
			}
		}
		// pipGenerationModeが'display'に変わった時、フィルタをリセット
		if (pipGenerationMode === 'display' && tableInstance) {
			tableInstance.setColumnFilters([]);
			setShowAllItems(true);
		}
	}, [setShowCheckbox, pipGenerationMode, tableInstance]);

	return (
		<div className="flex-shrink-0">
			{/* タイトルと編集モードバッジの表示エリア */}
			<div className="flex items-center gap-2">
				<h2 className="text-lg font-semibold text-gray-800">
					{pipGenerationMode === 'display'
						? 'Item Management'
						: pipGenerationMode === 'edit'
							? 'Edit PIP'
							: pipGenerationMode === 'generation'
								? 'Create PIP'
								: ''}
				</h2>
				{isEditing && (
					<div className="flex items-center gap-2">
						{/* 編集モードバッジ */}
						<span className="text-xs px-2 py-1 rounded-full bg-indigo-100 text-indigo-800 font-medium">
							Edit Mode
						</span>
						{/* 未保存の変更がある場合のバッジ */}
						{Object.keys(dirtyCells).length > 0 && (
							<span className="text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-800 font-medium">
								Unsaved Changes
							</span>
						)}
					</div>
				)}
			</div>

			{/* ボタンエリア（フィルタ・操作ボタン） */}
			<div className="flex items-end justify-between mt-2">
				{/* 左側：フィルタ表示切り替えボタン */}
				<div className="flex items-center gap-2">
					<Funnel size={16} />
					<span>:</span>
					{/* 未割当・一部未割当フィルタボタン */}
					{pipGenerationMode === 'display' &&
						(showAllItems ? (
							<Button
								size="sm"
								variant="outline"
								onClick={() => {
									tableInstance?.setColumnFilters([
										{
											id: 'itemIsAssign',
											value: true,
										},
									]);
									setShowAllItems(false);
								}}
								className="h-8 px-3 cursor-pointer"
							>
								<span>Show Unassigned PIP Items</span>
							</Button>
						) : (
							<Button
								size="sm"
								variant="outline"
								onClick={() => {
									tableInstance?.setColumnFilters([]);
									setShowAllItems(true);
								}}
								className="flex items-center gap-2 h-8 px-3 bg-muted-indigo hover:bg-muted-indigo/80 text-white hover:text-white cursor-pointer"
							>
								<span>Show All Items</span>
							</Button>
						))}
					{/* フィルタークリアボタン */}
					<Button
						size="sm"
						variant="outline"
						onClick={() => {
							tableInstance?.resetColumnFilters();
							if (pipGenerationMode !== 'display') {
								tableInstance?.setColumnFilters([
									{
										id: 'itemUnassignedQty',
										value: [1, undefined],
									},
								]);
								setGlobalFilter('');
							}
							setShowAllItems(true);
						}}
						className="text-gray-800 cursor-pointer"
					>
						<FunnelX />
						Clear
					</Button>
				</div>

				{/* 右側：操作ボタン群 */}
				<div className="flex items-center gap-2">
					{isEditing ? (
						<>
							{/* 編集キャンセルボタン */}
							<Button
								size="sm"
								variant="outline"
								onClick={cancelEditing}
								className="flex items-center gap-2 h-8 px-3 border border-gray-300 cursor-pointer"
							>
								<X className="w-4 h-4" />
								Cancel
							</Button>

							{/* 編集保存ボタン（変更がある場合のみ有効） */}
							<Button
								size="sm"
								variant="outline"
								onClick={() => {
									setData((prev) =>
										prev.map((row) =>
											dirtyCells[row.itemNo]
												? { ...row, ...dirtyCells[row.itemNo] }
												: row,
										),
									);
									setDirtyCells({});
									setOriginalData(null);
									setIsEditing(false);
								}}
								className="flex items-center gap-2 h-8 px-3 bg-muted-indigo hover:bg-muted-indigo/80 text-white hover:text-white cursor-pointer"
								disabled={Object.keys(dirtyCells).length === 0}
							>
								<Save className="w-4 h-4" />
								Save Changes
							</Button>
						</>
					) : (
						<>
							{/* PIP生成モード切り替えボタン */}
							{pipGenerationMode === 'display' && (
								<Button
									size="sm"
									variant="outline"
									onClick={() => {
										setShowCheckbox((prev) => !prev);
										setPipGenerationMode('generation');

										tableInstance?.setColumnFilters([
											{
												id: 'itemUnassignedQty',
												value: [1, undefined], // 1以上の値を持つ行のみ表示
											},
										]);

										setItemSelection({});
									}}
									className="flex items-center gap-2 h-8 px-3 bg-orange-500 hover:bg-orange-500/80 text-white hover:text-white cursor-pointer"
									disabled={data.length <= 0}
								>
									<Package className="w-4 h-4" />
									Create PIP
								</Button>
							)}

							{/* PIP生成ボタン（DB登録用、現在は無効） */}
							{pipGenerationMode === 'generation' && (
								<Button
									size="sm"
									variant="outline"
									className="flex items-center gap-2 h-8 px-3 bg-orange-500 hover:bg-orange-500/80 text-white hover:text-white cursor-pointer"
									disabled={committedItems.length <= 0}
									onClick={() => {
										if (selectedFG) {
											const value = createPipPayload(
												selectedJobNo,
												selectedFG.fgCode,
												nickname,
												committedItems,
											);
											createPip(value, {
												onSuccess: async () => {
													try {
														await itemsRefetch(); // ✅ 再取得
														await pipsRefetch();
														setCommittedItems([]);
														setNickname('');
														showAlert(['CREATE_PIP_SUCCESS'], 'success');
													} catch (error) {
														console.error('再取得失敗:', error);
														showAlert(['CREATE_PIP_ERROR'], 'error');
													}
												},
											});
										}
									}}
								>
									<Package className="w-4 h-4" />
									Create
								</Button>
							)}

							{pipGenerationMode === 'edit' && (
								<Button
									size="sm"
									variant="outline"
									className="flex items-center gap-2 h-8 px-3 bg-orange-500 hover:bg-orange-500/80 text-white hover:text-white cursor-pointer"
									disabled={committedItems.length <= 0}
									onClick={() => {
										if (selectedFG) {
											const value = createPipPayload(
												selectedJobNo,
												selectedFG.fgCode,
												nickname,
												committedItems,
											);
											updatePip(value, {
												onSuccess: () => {
													showAlert(['UPDATE_PIP_SUCCESS'], 'success');
													setNickname('');
													setCommittedItems([]);
													console.log('成功したよ');
													router.history.go(-1);
												},
												onError: (err) => {
													console.error('更新失敗:', err);
													showAlert(['UPDATE_PIP_ERROR'], 'error');
												},
											});
										}
									}}
								>
									<CircleCheckBig className="w-4 h-4" />
									Update
								</Button>
							)}

							{/* PIP生成モード終了ボタン */}
							{pipGenerationMode !== 'display' && (
								<Button
									size="sm"
									variant="outline"
									onClick={() => {
										if (pipGenerationMode === 'edit') {
											router.history.go(-1);
										} else {
											setPipGenerationMode('display');
										}
										// setShowCheckbox((prev) => !prev);
										// setCommittedItems([]);
										// setItemSelection({});
										// setSelectedCount(0);
										// setNickname('');
										setGlobalFilter('');
										tableInstance?.setColumnFilters([]);
										setShowAllItems(true);
									}}
									className="flex items-center gap-2 h-8 px-3 border border-gray-300 cursor-pointer"
								>
									<X className="w-4 h-4" />
									Close
								</Button>
							)}
						</>
					)}
				</div>
			</div>
		</div>
	);
}
