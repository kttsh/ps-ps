import { createFileRoute } from '@tanstack/react-router';
import type { Table } from '@tanstack/react-table';
import { useContext, useEffect, useState } from 'react';
import { AlertMessages } from '@/components/ui/alertMessages';
import { PipDetail } from '@/features/pip-management/components/PipDetail';
import { PipTable } from '@/features/pip-management/components/PipTable';
import { useAlertStore } from '@/stores/useAlartStore';
import { useIsSearchTriggeredStore } from '@/stores/useIsSearchTriggeredStore';
import { useSelectedFGStore } from '@/stores/useSelectedFgStore';
import { useSelectedJobNoStore } from '@/stores/useSelectedJobNoStore';
import type { Pip, PipData } from '@/types';
import { ItemAssignmentView } from '../../features/item-assignment/components/ItemAssignmentView';
import { PipTableControls } from '../../features/pip-management/components/PipTableControls';
// PIP削除
import { usePipListDelete } from '../../features/pip-management/hooks/usePipListDelete';
import { usePipListGet } from '../../features/pip-management/hooks/usePipListGet';
// PIPデータ取得
import { getPipData } from '../../features/pip-management/utils/getPipData.ts';
import { PSysContext } from '../ps-ps/route';

/**
 * PIP管理画面のルーティング
 * PIPテーブル、PIP詳細エリアのレイアウトを定義する
 */
const Pips = () => {
	// 行の選択状態
	const [pipSelection, setPipSelection] = useState<Record<string, boolean>>({});
	// 現在チェックされている行数
	const [selectedCount, setSelectedCount] = useState(0);
	// 現在フィルターで表示されている件数
	const [filteredCount, setFilteredCount] = useState(0);
	// フィルタークリア用に保持
	const [tableInstance, setTableInstance] = useState<Table<Pip> | null>(null);
	// フィルタ表示状態
	const [showFilters, setShowFilters] = useState(true);
	// 詳細表示するPIP
	const [clickedPipCode, setClickedPipCode] = useState<string | null>(null);

	// コンテキストから値を取得: FunctionGroupの選択状態, サイドバーの表示状態, PIP管理画面で選択されたpipDataの対象, ItemAssignmentViewを呼び出す際のモード
	const { setIsSidebar, setSelectedPipData, setIsItemAssignmentView } =
		useContext(PSysContext);

	// 選択したJobNo、FG
	const { selectedJobNo } = useSelectedJobNoStore();
	const { selectedFG } = useSelectedFGStore();

	// アラートの状態
	const { isAlertVisible, alertMessages, showAlert } = useAlertStore();

	// Display by Selectionの押下状態
	const { triggerState, resetSearchTrigger } = useIsSearchTriggeredStore();

	// PipDataのデフォルト値
	const emptyPipData: PipData = {
		pips: [
			{
				code: '',
				nickname: '',
				items: [
					{
						itemNo: '',
						coreItemNo: '',
						itemName: '',
						qty: 0,
						costElement: '',
						ibsCode: '',
						pipCode: '',
					},
				],
				vendors: [],
			},
		],
	};
	// pipDataの状態管理
	const [pipData, setPipData] = useState<PipData>(emptyPipData);

	// PIP詳細情報の状態管理
	const [pipDetail, setPipDetail] = useState<Pip>(emptyPipData.pips[0]);

	// PIPデータを事前取得
	const { refetch } = usePipListGet(selectedJobNo, selectedFG?.fgCode);

	// PIPリストを表示
	useEffect(() => {
		// Display by Selection押下時以外は何もしない
		if (triggerState === 'none') return;

		// Display by Selection押下状態をリセット
		resetSearchTrigger();

		const fetchAndProcessPipData = async () => {
			try {
				const result = await refetch(); // 明示的に再フェッチ
				const fetched = result.data;

				// 検索結果がない場合は空集合を指定する
				if (!fetched || !fetched.responseJSON) {
					setPipData(emptyPipData);
					return;
				}

				const parsed = JSON.parse(fetched.responseJSON);
				const processed = getPipData(parsed);
				setPipData(processed);
			} catch (e) {
				// 通知: 検索失敗
				setPipData(emptyPipData);
				showAlert(['SEARCH_FAILURE']);
			}
		};

		fetchAndProcessPipData();
	}, [triggerState]);

	// PIP削除モード
	const [pipDeleteMode, setPipDeleteMode] = useState(false);
	const { mutate: deleteMutate } = usePipListDelete();
	useEffect(() => {
		if (pipDeleteMode) {
			// チェックされた行のインデックス取得
			const selectedIndexes = Object.keys(pipSelection)
				.filter((index) => pipSelection[index])
				.map((index) => Number(index));

			// 削除対象に絞り込み
			const deleteTarget = pipData.pips.filter((_, index) =>
				selectedIndexes.includes(index),
			);

			// 削除モードを解除
			setPipDeleteMode(false);

			// 削除API呼び出し
			deleteMutate(
				{
					userId: 'PSYSP014',
					jobNo: selectedJobNo,
					fgCode: selectedFG?.fgCode,
					deleteData: deleteTarget,
				},
				{
					onSuccess: (data: any) => {
						if (
							data.statusCode === '404' &&
							data.statusMessage === 'AIPに割当済みのPIPは削除できません。'
						) {
							// 通知: 削除失敗
							showAlert(['AIP_ASSIGNED']);
						} else {
							// 通知: 削除成功
							showAlert(['PIP_DELETE']);

							// 再検索せず、検索前の状態に戻す
							//triggerResearch();
							setPipData(emptyPipData);

							// チェック状態をリセット
							setPipSelection({});
						}
					},
				},
			);

			// 詳細画面のリセット
			setPipDetail({
				code: '',
				nickname: '',
				items: [],
				vendors: [],
			});
		}
	}, [pipDeleteMode]);

	// PIP編集モード
	const [pipEditMode, setPipEditMode] = useState(false);
	useEffect(() => {
		if (pipEditMode) {
			// チェックされた行のインデックス取得
			const selectedIndexes = Object.keys(pipSelection)
				.filter((index) => pipSelection[index])
				.map((index) => Number(index));

			// 編集対象を1件のオブジェクトとして取得
			const editTarget = pipData.pips[selectedIndexes[0]];
			setSelectedPipData(editTarget);
		}
	}, [pipEditMode]);

	// 特定の条件下でサイドバーを非表示にする
	useEffect(() => {
		if (pipEditMode) {
			setIsSidebar(false);
			setIsItemAssignmentView('pipManagement');
		} else {
			setIsSidebar(true);
		}
	}, [pipEditMode]);

	return (
		// 編集モードではない場合
		!pipEditMode ? (
			<div className="h-screen bg-gray-100 p-6 overflow-hidden">
				{/* タイトル・ボタン群 */}
				<PipTableControls
					showFilters={showFilters}
					setShowFilters={setShowFilters}
					tableInstance={tableInstance}
					selectedCount={selectedCount}
					//  編集モード・削除モードへの切り替え
					setPipDeleteMode={setPipDeleteMode}
					setPipEditMode={setPipEditMode}
					pipEditMode={pipEditMode}
				/>
				{/* 件数表示（フィルター後/全体） */}
				<span className="ml-auto text-sm text-gray-600">
					count: {filteredCount} / {pipData.pips.length}
				</span>
				<div className="max-w-10xl mx-auto h-full flex gap-4">
					<div className="w-1/2 h-[80%]">
						{/* PIPテーブル */}
						{/* Item Count、Vendor Countの値、スタイルが表示できなかったので専用テーブル使用してます */}
						{/* Tanstack Virtualが原因っぽい */}
						<PipTable
							data={pipData}
							showFilters={showFilters}
							clickedPipCode={clickedPipCode}
							setClickedPipCode={setClickedPipCode}
							setPipDetail={setPipDetail}
							onFilteredCountChange={setFilteredCount}
							onTableReady={setTableInstance}
							rowSelection={pipSelection}
							setRowSelection={setPipSelection}
							onSelectedRowCountChange={setSelectedCount}
						/>
					</div>
					{/* PIP詳細表示エリア */}
					<div className="w-1/2">
						<PipDetail pipDetail={pipDetail} />
					</div>
					{/* アラート表示エリア */}
					{isAlertVisible && alertMessages && (
						<div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
							<AlertMessages messages={alertMessages} />
						</div>
					)}
				</div>
			</div>
		) : (
			// 編集モードの場合: 購入品管理画面コンポーネントに選択されたpipDataを渡す
			<ItemAssignmentView />
		)
	);
};

export const Route = createFileRoute('/ps-ps/pips')({
	component: Pips,
});
