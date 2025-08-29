import { Button } from '@/components/ui/button';
import { usePipGenerationModeStore } from '@/stores/usePipGenerationModeStore';
import type { Item } from '@/types';
import type { Table } from '@tanstack/react-table';
import {
	ArrowRight,
	CircleChevronRight,
	Funnel,
	FunnelX,
	Package,
	Save,
	X,
} from 'lucide-react';
import { useState } from 'react';

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
	rowSelection, // 行の選択状態（itemNo: true/false）
	setRowSelection, // 選択状態の更新関数
	showCheckbox, // チェックボックス列の表示有無
	setShowCheckbox, // チェックボックス列の表示切り替え関数
	selectedCount, // 選択された行数
	setCommittedItems, // PIPに割り当てるアイテムの更新関数
	tableInstance, // テーブルインスタンス（フィルタ操作に使用）
	showFilters, // フィルタ表示状態
	setShowFilters, // フィルタ表示状態の更新関数
}: {
	data: Item[];
	setData: React.Dispatch<React.SetStateAction<Item[]>>;
	isEditing: boolean;
	setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
	dirtyCells: Record<string, Partial<Item>>;
	setDirtyCells: React.Dispatch<
		React.SetStateAction<Record<string, Partial<Item>>>
	>;
	rowSelection: Record<string, boolean>;
	setRowSelection: React.Dispatch<
		React.SetStateAction<Record<string, boolean>>
	>;
	showCheckbox: boolean;
	setShowCheckbox: React.Dispatch<React.SetStateAction<boolean>>;
	selectedCount: number;
	setCommittedItems: React.Dispatch<React.SetStateAction<Item[]>>;
	tableInstance: Table<Item> | null;
	showFilters: boolean;
	setShowFilters: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	// 編集開始時に元データを保持（キャンセル時に復元するため）
	const [originalData, setOriginalData] = useState<Item[] | null>(null);

	// PIP生成モードの状態（display: 表示モード, generation: 生成モード）
	const pipGenerationMode = usePipGenerationModeStore(
		(state) => state.pipGenerationMode,
	);
	const setPipGenerationMode = usePipGenerationModeStore(
		(state) => state.setPipGenerationMode,
	);

	// 選択された購入品リスト（チェックされた行のみ抽出）
	const selectedItems = data.filter((d) => rowSelection[d.itemNo]);

	// PIPに割り当てる処理：選択されたアイテムを committedItems に追加
	const handleAssign = () => {
		setCommittedItems((prev) => [...prev, ...selectedItems]);
		setRowSelection({});
	};

	// 削除処理：選択された行を data から除外
	// const handleDelete = () => {
	// 	const idsToDelete = new Set(
	// 		Object.keys(rowSelection).filter((id) => rowSelection[id]),
	// 	);
	// 	setData((prev) =>
	// 		prev.filter((row) => !idsToDelete.has(String(row.itemNo))),
	// 	);
	// 	setRowSelection({});
	// 	setDirtyCells({});
	// };

	// 編集モード開始：元データを保存
	// const startEditing = () => {
	// 	setOriginalData(data.map((row) => ({ ...row })));
	// 	setIsEditing(true);
	// };

	// 編集キャンセル：元データに戻す
	const cancelEditing = () => {
		if (originalData !== null) {
			setData(originalData.map((row) => ({ ...row })));
			setDirtyCells({});
			setOriginalData(null);
			setIsEditing(false);
		}
	};

	return (
		<div className="flex-shrink-0">
			{/* タイトルと編集モードバッジの表示エリア */}
			<div className="flex items-center gap-2">
				<h2 className="text-lg font-semibold text-gray-800">購入品管理</h2>
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
				{/* <FilterButton
					setShowFilters={setShowFilters}
					showFilters={showFilters}
					tableInstance={tableInstance}
				/> */}
				<div className="flex items-center gap-2">
					<Funnel size={16} />
					<span>:</span>
					{/* 未割当・一部未割当フィルタボタン */}
					<Button
						size="sm"
						variant="outline"
						onClick={() => setShowFilters((prev) => !prev)}
						className="h-8 px-3 bg-muted-indigo/80 hover:bg-muted-indigo/60 text-white hover:text-white cursor-pointer"
					>
						{showFilters ? (
							<span>Show Unassigned PIP Items</span>
						) : (
							<span>Clear PIP Assignment Filter</span>
						)}
					</Button>
					{/* フィルタークリアボタン */}
					<Button
						size="sm"
						variant="outline"
						onClick={() => tableInstance?.resetColumnFilters()}
						className="text-gray-800 cursor-pointer"
					>
						<FunnelX />
						Clear
					</Button>
				</div>

				{/* 中央：PIP割当ボタン（生成モード時のみ表示） */}
				{pipGenerationMode !== 'display' && (
					<>
					<Button
						onClick={handleAssign}
						disabled={selectedCount === 0}
						className="flex items-center gap-2 cursor-pointer h-8"
						size="sm"
					>
						<CircleChevronRight size={16} />
						PIPに割り当て
						<span>{selectedCount}件</span>
						<ArrowRight size={16} />
					</Button>
					{/* 割り当てボタンの位置調整のための要素 */}
					{/* 追ってレイアウト見直す */}
					<div className='w-[3vw]' />
					</>
				)}

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
							{pipGenerationMode === 'display' && (
								<>
									{/* エクスポートボタン（現在は無効） */}
									{/* <Button
										variant="outline"
										className="flex items-center gap-2 h-8 px-3 bg-muted-indigo hover:bg-muted-indigo/80 text-white hover:text-white cursor-pointer"
										disabled={true}
									>
										<Download className="w-4 h-4" />
										Export
									</Button> */}

									{/* インポートボタン（現在は無効） */}
									{/* <Button
										variant="outline"
										className="flex items-center gap-2 h-8 px-3 bg-muted-indigo hover:bg-muted-indigo/80 text-white hover:text-white cursor-pointer"
										disabled={true}
									>
										<FileUp className="w-4 h-4" />
										Import Item list
									</Button> */}

									{/* 編集開始ボタン */}
									{/* <Button
										size="sm"
										variant="outline"
										onClick={startEditing}
										className="flex items-center gap-2 h-8 px-3 bg-muted-indigo hover:bg-muted-indigo/80 text-white hover:text-white cursor-pointer"
									>
										<Edit className="w-4 h-4" />
										Edit
									</Button> */}

									{/* 削除ボタン（チェックボックスが非表示かつ編集モードでない場合） */}
									{/* {!showCheckbox && !isEditing && (
										<Button
											disabled={selectedCount === 0}
											onClick={handleDelete}
											size="sm"
											variant="outline"
											className="flex items-center gap-2 h-8 px-3 bg-muted-indigo hover:bg-muted-indigo/80 text-white hover:text-white cursor-pointer"
										>
											<Trash2 className="w-4 h-4" />
											Delete
										</Button>
									)} */}
								</>
							)}

							{/* PIP生成モード切り替えボタン */}
							{pipGenerationMode === 'display' && (
								<Button
									size="sm"
									variant="outline"
									onClick={() => {
										setShowCheckbox((prev) => !prev);
										setPipGenerationMode('generation');
									}}
									className="flex items-center gap-2 h-8 px-3 bg-orange-500 hover:bg-orange-500/80 text-white hover:text-white cursor-pointer"
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
									className="flex items-center gap-2 h-8 px-3 bg-blue-500 hover:bg-blue-500/80 text-white hover:text-white cursor-pointer"
									disabled={true}
								>
									<Package className="w-4 h-4" />
									Create
								</Button>
							)}

							{/* PIP生成モード終了ボタン */}
							{pipGenerationMode !== 'display' && (
								<Button
									size="sm"
									variant="outline"
									onClick={() => {
										setPipGenerationMode('display');
										setShowCheckbox((prev) => !prev);
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

