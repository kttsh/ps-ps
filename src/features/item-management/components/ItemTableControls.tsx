import {
	ArrowLeft,
	ArrowRight,
	CircleChevronRight,
	Download,
	Edit,
	FileUp,
	Package,
	Save,
	Trash2,
	X,
} from 'lucide-react';
import { useContext, useEffect, useRef, useState } from 'react';
import { FilterButton } from '@/components/FilterButton';
import { AlertMessages } from '@/components/ui/alertMessages';
import { Button } from '@/components/ui/button';
import { useAlertStore } from '@/stores/useAlartStore';
import { usePipGenerationModeStore } from '@/stores/usePipGenerationModeStore';
import { useSelectedFGStore } from '@/stores/useSelectedFgStore';
import { useSelectedJobNoStore } from '@/stores/useSelectedJobNoStore';
import type { Item } from '@/types';
import { usePipSaveOverwrite } from '../../../features/pip-management/hooks/usePipSaveOverwrite';
import { PSysContext } from '../../../routes/ps-ps/route';
import { useItemListDelete } from '../../item-assignment/hooks/useItemListDelete';
import { useItemListSave } from '../../item-assignment/hooks/useItemListSave';
import { usePipGenerate } from '../../item-assignment/hooks/usePipGenerate';
import type { ItemTableControlsProps } from './ItemTableControls.types'; // prop定義は外部ファイル

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
	committedItems, // PIPに割り当てるアイテム
	tableInstance, // テーブルインスタンス（フィルタ操作に使用）
	showFilters, // フィルタ表示状態
	setShowFilters, // フィルタ表示状態の更新関数
	pipNickName, // PIPニックネームの入力値
	setPipNickName, // 入力されたPIPニックネームの更新関数
	selectedQtyMap, // PIPカードエリアでのセレクトボックス(数量)の入力状態
	setSelectedQtyMap, // PIPカードエリアでのセレクトボックス(数量)の入力状態更新
}: ItemTableControlsProps) {
	// 編集開始時に元データを保持（キャンセル時に復元するため）
	//const [originalData, setOriginalData] = useState<Item[] | null>(null);

	// 常に元の全体データを保持
	const [protectedItemData, setProtectedItemData] = useState<Item[] | null>(
		null,
	);

	// PIP生成モードの状態（display: 表示モード, generation: 生成モード）
	const pipGenerationMode = usePipGenerationModeStore(
		(state) => state.pipGenerationMode,
	);
	const setPipGenerationMode = usePipGenerationModeStore(
		(state) => state.setPipGenerationMode,
	);

	// すべてを表示/PIP未割当のみ 絞り込み状態を管理
	const [pipAssignedFilters, setPipAssignedFilters] = useState(false);

	// PIPに割り当てる処理：選択されたアイテムを committedItems に追加
	const handleAssign = () => {
		// チェックされた行のインデックス取得
		const selectedIndexes = Object.keys(rowSelection)
			.filter((index) => rowSelection[index])
			.map((index) => Number(index));

		// インデックスをitemSurKeyに変換
		const idsToAssign = new Set(
			selectedIndexes.map((i) => data[i]?.itemSurKey).filter(Boolean),
		);

		// PIPに割り当てる購入品の対象リストを作成
		const targetRows = data.filter((row) => idsToAssign.has(row.itemSurKey));
		setRowSelection({});

		// 購入品一覧エリア表示内容更新
		setData((prev) => prev.filter((row) => !idsToAssign.has(row.itemSurKey)));

		// PIPカードエリア表示内容更新（全体を itemNo でソート）
		setCommittedItems((prev) => {
			const updated = [...prev, ...targetRows];
			// itemNo が文字列の場合
			updated.sort((a, b) => a.itemNo.localeCompare(b.itemNo));
			return updated;
		});
	};

	// コンテキストから値を取得: サイドバー表示状態, PIP管理画面で選択されたpipDataの対象, ItemAssignmentViewを呼び出す際のモード
	const { isSidebar, selectedPipData } = useContext(PSysContext);
	// 選択したJobNo、FG
	const { selectedJobNo } = useSelectedJobNoStore();
	const { selectedFG } = useSelectedFGStore();
	// アラートの状態
	const { isAlertVisible, alertMessages, showAlert } = useAlertStore();

	// 削除対象データ
	const [deleteTarget, setDeleteTarget] = useState<Item[] | null>(null);
	const [isDeleteMode, setIsDeleteMode] = useState(false);
	const { mutate: deleteMutate } = useItemListDelete();
	// 削除処理
	const handleDelete = () => {
		// // チェックされた行のインデックス取得
		// const selectedIndexes = Object.keys(rowSelection)
		// 	.filter((index) => rowSelection[index])
		// 	.map((index) => Number(index));
		// // インデックスをitemSurKeyに変換
		// const idsToDelete = new Set(
		// 	selectedIndexes
		// 		.map((i) => data[i]?.itemSurKey)
		// 		.filter(Boolean),
		// );
		// // 購入品一覧エリア表示内容更新
		// setData((prev) => prev.filter((row) => !idsToDelete.has(row.itemSurKey)));
		// // 削除対象リストを作成
		// const targetRows = data.filter((row) => idsToDelete.has(row.itemSurKey));
		// setDeleteTarget(targetRows);
		// // DeleteモードをONにする
		// setIsDeleteMode(true);
	};

	// DeleteモードONを検知し削除APIを呼び出す
	useEffect(() => {
		// Deleteモードでない場合は何もしない
		if (!isDeleteMode) return;

		// 購入品リスト削除API呼び出し
		deleteMutate({
			userId: 'PSYSP014',
			jobNo: selectedJobNo,
			fgCode: selectedFG?.fgCode,
			deleteData: deleteTarget,
		});

		// 保存処理後のリセット
		setRowSelection({});
		setDirtyCells({});
		setIsDeleteMode(false);
		setDeleteTarget(null);
	}, [isDeleteMode, deleteTarget, deleteMutate, selectedJobNo]);

	// 編集モード開始：元データを保存
	const startEditing = () => {
		// setOriginalData(data.map((row) => ({ ...row })));
		// setIsEditing(true);
		// // アラートメッセージを表示のみOFFにする
		// setIsAlert(false);
	};

	// 編集キャンセル：元データに戻す
	const cancelEditing = () => {
		// if (originalData !== null) {
		// 	setData(originalData.map((row) => ({ ...row })));
		// 	setDirtyCells({});
		// 	setOriginalData(null);
		// 	setIsEditing(false);
		// 	// アラートメッセージを表示のみOFFにする
		// 	setIsAlert(false);
		// }
	};

	// PIP未割当のみボタン、すべて表示ボタン
	useEffect(() => {
		if (pipAssignedFilters) {
			// PIP未割当のみ表示
			setProtectedItemData(data.map((row) => ({ ...row })));
			//setOriginalData(data.map((row) => ({ ...row })));
			setData(data.filter((row) => row.pipCode === '未割当'));
		} else {
			// すべて表示
			if (protectedItemData !== null) {
				setData(protectedItemData.map((row) => ({ ...row })));
			}
		}
	}, [pipAssignedFilters]);

	// 保存ボタン
	const { mutate: saveMutate } = useItemListSave();
	const [isSaveMode, setIsSaveMode] = useState(false);
	const handleItemListSave = async () => {
		setData((prev) =>
			prev.map((row) =>
				dirtyCells[row.itemNo] ? { ...row, ...dirtyCells[row.itemNo] } : row,
			),
		);
		// セーブモードをONにする
		setIsSaveMode(true);
	};

	// セーブモードONを検知し保存APIを呼び出す
	useEffect(() => {
		// セーブモードでない場合は何もしない
		if (!isSaveMode) return;

		// data が空や不正な場合は何もしない
		//if (!data || !validate()) {
		if (!data) {
			return;
		}

		// API呼び出し
		saveMutate(
			{
				userId: 'PSYSP014',
				jobNo: selectedJobNo,
				fgCode: selectedFG?.fgCode,
				updateData: data,
			},
			{
				onSuccess: () => {
					// 通知: 保存成功
					showAlert(['ITEM_SUCCESS']);

					// 保存処理後のリセット
					setDirtyCells({});
					//setOriginalData(null);
					setIsEditing(false);
					setIsSaveMode(false);
				},
				onError: () => {
					// 通知: 保存失敗
					showAlert(['ITEM_FAILURE']);
				},
			},
		);
	}, [isSaveMode, data]);

	const { mutate: generatePipMutate } = usePipGenerate();
	// PIP生成ボタン
	const handlePipGenerate = () => {
		// API呼び出し
		generatePipMutate(
			{
				userId: 'PSYSP014',
				jobNo: selectedJobNo,
				fgCode: selectedFG?.fgCode,
				targetData: committedItems,
				pipNickName: pipNickName,
				selectedQtyMap: selectedQtyMap,
			},
			{
				onSuccess: () => {
					// 通知: 保存成功
					showAlert(['PIP_SUCCESS']);
				},
				onError: () => {
					// 通知: 保存失敗
					showAlert(['PIP_FAILURE']);
				},
			},
		);

		// 購入品一覧エリア表示内容リセット
		setData((prevData) => [...prevData, ...committedItems]);

		// PIPカードエリアを空にする
		setCommittedItems([]);

		// 再検索せず、検索前の状態に戻す
		//triggerResearch();
		setData([]);
	};

	// PIP生成モード終了ボタン
	const handleCancelPipAssign = () => {
		setPipGenerationMode('display');
		setShowCheckbox((prev) => !prev);

		// 購入品一覧エリア表示内容リセット
		setData((prevData) => [...prevData, ...committedItems]);

		// PIPカードエリア表示内容リセット
		setCommittedItems([]);
		setSelectedQtyMap({});
		setPipNickName('');

		// 再検索せず、検索前の状態に戻す
		//triggerResearch();
		setData([]);
	};

	// 購入品管理画面(PIP編集モード): 初期状態でPIP割当済みとする
	// ロジック: サイドバー非表示状態 = PIP編集モード及びPIP複製モード
	const hasProcessed = useRef(false);
	useEffect(() => {
		if (!isSidebar && data.length > 0 && !hasProcessed.current) {
			// 選択したpipDataと一致する情報を再検索する
			const targetRowsIndex = Array.from(
				new Set(selectedPipData.items.map((item) => item.itemNo)),
			);

			// 下記2画面の差分データ
			const targetRows = data.filter((row) =>
				targetRowsIndex.includes(row.itemNo),
			);

			// pipカードエリアを更新
			setCommittedItems(targetRows);

			// 購入品管理画面を更新
			setData(data.filter((row) => !targetRowsIndex.includes(row.itemNo)));

			// ニックネームの初期値をセット
			setPipNickName(selectedPipData.nickname);

			// 処理済みフラグを立てループを終了させる
			hasProcessed.current = true;

			// PIP割当済は非表示とする
			if (pipGenerationMode === 'generation') {
				setProtectedItemData(data.map((row) => ({ ...row })));
				setData(data.filter((row) => row.pipCode !== '割当済'));
			}
		}
	}, [isSidebar, selectedPipData, data]);

	// 更新ボタン
	const { mutate: saveOverwrightPipMutate } = usePipSaveOverwrite();
	const handleUpdatePip = () => {
		// API呼び出し
		saveOverwrightPipMutate(
			{
				userId: 'PSYSP014',
				jobNo: selectedJobNo,
				fgCode: selectedFG?.fgCode,
				targetData: committedItems,
				pipNickName: pipNickName,
				selectedQtyMap: selectedQtyMap,
				targetPipCode: selectedPipData.code,
			},
			{
				onSuccess: () => {
					// 通知: 保存成功
					showAlert(['PIP_EDIT_SUCCESS']);

					window.location.reload();
				},
				onError: () => {
					// 通知: 保存失敗
					showAlert(['PIP_EDIT_FAILURE']);
				},
			},
		);

		// 購入品一覧エリア表示内容リセット
		setData((prevData) => [...prevData, ...committedItems]);

		// PIPカードエリアを空にする
		setCommittedItems([]);
	};

	// 戻るボタン
	const handleBack = () => {
		window.location.reload();
	};

	// PIP生成モードの場合、PIP割当済みの購入品は非表示にする
	useEffect(() => {
		if (pipGenerationMode === 'generation') {
			// 割当済みを非表示
			setProtectedItemData(data.map((row) => ({ ...row })));
			setData(data.filter((row) => row.pipCode !== '割当済'));
		}
	}, [pipGenerationMode]);

	// 初回だけ実行(データ保護)
	useEffect(() => {
		setProtectedItemData(data.map((row) => ({ ...row })));
	}, []);

	return (
		<div className="flex-shrink-0">
			{/* タイトルと編集モードバッジの表示エリア */}
			<div className="flex items-center gap-2">
				<h2 className="text-lg font-semibold text-gray-800">
					{isSidebar ? '購入品管理' : 'PIP編集'}
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
				{/*  すべて表示ボタン、PIP未割当のみボタン */}
				<FilterButton
					setShowFilters={setShowFilters}
					showFilters={showFilters}
					setPipAssignedFilters={setPipAssignedFilters}
					pipAssignedFilters={pipAssignedFilters}
					tableInstance={tableInstance}
				/>

				{/* 中央：PIP割当ボタン（生成モード時のみ表示） */}
				{pipGenerationMode !== 'display' && (
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
				)}

				{/* 右側：操作ボタン群 */}
				<div className="flex items-center gap-2">
					{false && isEditing ? (
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
								onClick={handleItemListSave}
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
									{false && (
										<Button
											variant="outline"
											className="flex items-center gap-2 h-8 px-3 bg-muted-indigo hover:bg-muted-indigo/80 text-white hover:text-white cursor-pointer"
											disabled={true}
										>
											<Download className="w-4 h-4" />
											Export
										</Button>
									)}

									{/* インポートボタン（現在は無効） */}
									{false && (
										<Button
											variant="outline"
											className="flex items-center gap-2 h-8 px-3 bg-muted-indigo hover:bg-muted-indigo/80 text-white hover:text-white cursor-pointer"
											disabled={true}
										>
											<FileUp className="w-4 h-4" />
											Import Item list
										</Button>
									)}

									{/* 編集開始ボタン */}
									{false && (
										<Button
											size="sm"
											variant="outline"
											onClick={startEditing}
											className="flex items-center gap-2 h-8 px-3 bg-muted-indigo hover:bg-muted-indigo/80 text-white hover:text-white cursor-pointer"
										>
											<Edit className="w-4 h-4" />
											Edit
										</Button>
									)}

									{/* 削除ボタン（チェックボックスが非表示かつ編集モードでない場合） */}
									{false && !showCheckbox && !isEditing && (
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
									)}
								</>
							)}

							{/* PIP生成モード切り替えボタン */}
							{pipGenerationMode === 'display' && (
								<Button
									size="sm"
									variant="outline"
									disabled={selectedCount >= 1}
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

							{/* PIP生成ボタン（DB登録用） */}
							{pipGenerationMode === 'generation' && isSidebar && (
								<Button
									size="sm"
									variant="outline"
									onClick={handlePipGenerate}
									className="flex items-center gap-2 h-8 px-3 bg-blue-500 hover:bg-blue-500/80 text-white hover:text-white cursor-pointer"
									disabled={committedItems.length === 0}
								>
									<Package className="w-4 h-4" />
									Create
								</Button>
							)}

							{/* PIP生成モード終了ボタン */}
							{pipGenerationMode !== 'display' && isSidebar && (
								<Button
									size="sm"
									variant="outline"
									onClick={handleCancelPipAssign}
									className="flex items-center gap-2 h-8 px-3 border border-gray-300 cursor-pointer"
								>
									<X className="w-4 h-4" />
									Close
								</Button>
							)}

							{/* 戻るボタン・更新ボタン: 購入品管理画面(PIP編集モード */}
							{pipGenerationMode !== 'display' && !isSidebar && (
								<Button
									size="sm"
									variant="outline"
									onClick={handleUpdatePip}
									className="flex items-center gap-2 h-8 px-3 border bg-blue-500 hover:bg-blue-500/80 text-white hover:text-white border-gray-300 cursor-pointer"
								>
									<Save className="w-4 h-4" />
									Update
								</Button>
							)}
							{pipGenerationMode !== 'display' && !isSidebar && (
								<Button
									size="sm"
									variant="outline"
									onClick={handleBack}
									className="flex items-center gap-2 h-8 px-3 border border-gray-300 cursor-pointer"
								>
									<ArrowLeft className="w-4 h-4" />
									Back
								</Button>
							)}
						</>
					)}
				</div>
			</div>
			{/* アラート表示エリア */}
			{isAlertVisible && alertMessages && (
				<div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
					<AlertMessages messages={alertMessages} />
				</div>
			)}
		</div>
	);
}
