import { FilterButton } from '@/components/FilterButton';
import { Button } from '@/components/ui/button';
import { createPipPayload } from '@/features/item-assignment/utils/createPipPayload';
import { transformPipDetailResponseToPipDetail } from '@/features/item-assignment/utils/transformPipDetailResponseToPipDetail';
import { useItems } from '@/features/item-management/hooks/useItems';
import { useAlertStore } from '@/stores/useAlartStore';
import { usePipDetailStore } from '@/stores/usePipDetailStore';
import { usePipGenerationModeStore } from '@/stores/usePipGenerationModeStore';
import { usePipsStore } from '@/stores/usePipsStore';
import { useSelectedFGStore } from '@/stores/useSelectedFgStore';
import { useSelectedJobNoStore } from '@/stores/useSelectedJobNoStore';
import type { Pip } from '@/types';
import { useNavigate, useSearch } from '@tanstack/react-router';
import type { Table } from '@tanstack/react-table';
import { Building2, Copy, Edit, Merge, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useCopyPipItems } from '../hooks/useCopyPipItems';
import { usePipDetail } from '../hooks/usePipDetail';
import { usePips } from '../hooks/usePips';
import { userMergePips } from '../hooks/userMergePips';
import { createMergePipPayload } from '../utils/createMergePipPayload';
import { DeleteDialog } from './DeleteDialog';
import { MergeDialog } from './MergeDialog';

interface Props {
	showFilters: boolean;
	setShowFilters: React.Dispatch<React.SetStateAction<boolean>>;
	tableInstance: Table<Pip> | null;
	selectedCount: number;
}

/**
 * PIP管理テーブルの操作ボタン群を表示するコンポーネント
 * showFilters: フィルタ表示状態
 * setShowFilters: フィルタ表示状態の更新関数
 * tableInstance: テーブルインスタンス（フィルタ操作に使用）
 * selectedCount: 選択された行数
 */
export const PipTableControls: React.FC<Props> = ({
	showFilters,
	setShowFilters,
	tableInstance,
	selectedCount,
}) => {
	const [showMergeDialog, setShowMergeDialog] = useState<boolean>(false);
	const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false);
	const [nickname, setNickname] = useState('');
	const { setPipGenerationMode } = usePipGenerationModeStore();
	const { selectedPipCode, setSelectedPipCode } = usePipDetailStore();
	const { selectedJobNo } = useSelectedJobNoStore();
	const { selectedFG } = useSelectedFGStore();
	const { pipsData, pipSelection } = usePipsStore();
	const fgCode = selectedFG?.fgCode ?? null;
	const { refetch: itemsRefetch } = useItems(selectedJobNo, fgCode);
	const { refetch: pipsRefetch } = usePips(selectedJobNo, fgCode);
	const { mutate: mergePips } = userMergePips(selectedJobNo, fgCode);
	const { refetch: pipDetailRefetch } = usePipDetail(
			selectedJobNo,
			fgCode,
			selectedPipCode,
		);
	const { mutate: copyPip } = useCopyPipItems(
		selectedJobNo,
		fgCode,
		selectedPipCode,
	);
	// メッセージ表示
	const { showAlert } = useAlertStore();
	// ナビゲーション
	const navigate = useNavigate();

	// 現在のsearchパラメータを取得
	const currentSearch = useSearch({ strict: false });

	const getSelectedPips = () => {
		if (!tableInstance) {
			alert('テーブルが初期化されていません');
			return;
		}

		const selectedRows = tableInstance.getSelectedRowModel().rows;
		if (selectedRows.length === 0) {
			alert('PIPを選択してください');
			return;
		}

		// 選択されたPIPデータを抽出
		const selectedPipData = selectedRows.map((row) => row.original);
		return selectedPipData;
	};

	//  AIP生成ページ（ベンダー割り当て）への遷移処理
	const handleAipGeneration = () => {
		const selectedPipData = getSelectedPips();

		// ベンダー割り当てページに遷移（AIPモード）
		// 現在のsearchパラメータ（fgcodeなど）を保持しつつ、新しいパラメータを追加
		navigate({
			to: '/p-sys/vendor-assignment',
			search: {
				...currentSearch, // 現在のパラメータ（fgcodeなど）を保持
				mode: 'aip',
				selectedPips: JSON.stringify(selectedPipData),
			},
		});
		setSelectedPipCode(
			selectedPipData ? selectedPipData[0].pipCode : undefined,
		);
	};

	const handlePipEdit = () => {
		const selectedPipData = getSelectedPips();

		// ベンダー割り当てページに遷移（AIPモード）
		// 現在のsearchパラメータ（fgcodeなど）を保持しつつ、新しいパラメータを追加
		navigate({
			to: '/p-sys/item-assignment',
			search: currentSearch, // 現在のパラメータを保持
		});
		setPipGenerationMode('edit');
		setSelectedPipCode(
			selectedPipData ? selectedPipData[0].pipCode : undefined,
		);
	};

	const selectedPips = Object.keys(pipSelection)
		.filter((code) => pipSelection[code])
		.map((code) => {
			const pip = pipsData.find((p) => p.pipCode === code);
			return pip ? { code: pip.pipCode, nickname: pip.pipNickName } : null;
		})
		.filter(Boolean) as { code: string; nickname: string }[];

	const handlePipCopy = async () => {
		// setClickedPipCode直後にrefetchするとclickedPipCodeが古いときがあるため0.1秒後refetch
		const selectedPipData = getSelectedPips();
		setSelectedPipCode(
			selectedPipData ? selectedPipData[0].pipCode : undefined,
		);
		await new Promise(resolve => setTimeout(resolve, 100));

		const response = await pipDetailRefetch();
		
		if(selectedFG && response.data){
			// 数値にすべきカラムの型を変換
			const transformedpipDetail = transformPipDetailResponseToPipDetail(
				response.data.pipDetail,
			);
			const nickname = transformedpipDetail.pipNickName;
			const committedItems = transformedpipDetail.items;
			const value = createPipPayload(
				selectedJobNo,
				selectedFG.fgCode,
				nickname,
				committedItems,
			);
			copyPip(value, {
				onSuccess: async () => {
					try {
						await itemsRefetch(); // ✅ 再取得
						await pipsRefetch();
						showAlert(['COPY_SUCCESS'], 'success');
					} catch (error) {
						console.error('再取得失敗:', error);
						showAlert(['COPY_ERROR'], 'error');
					}
				},
			});
		}
	};

	// 統合処理(dialog側に実装するとうまくいかなかったのでこちらで実装)
	const handleMergePips = async () => {
		if(selectedFG){
			const value = createMergePipPayload(
				selectedJobNo,
				selectedFG?.fgCode,
				nickname,
				selectedPips
			);
			console.log(`pipsRefetch:${pipsRefetch}`);
			mergePips(value, {
				onSuccess: async () => {
					try {
						await pipsRefetch();
						showAlert(['MERGE_SUCCESS'], 'success');
						setNickname('');
					} catch (error) {
						console.error('再取得失敗:', error);
						showAlert(['MERGE_ERROR'], 'error');
					}
				},
			});
		}
	}

	return (
		<>
			<div className="flex-shrink-0">
				{/* タイトル */}
				<h2 className="text-lg font-semibold text-gray-800">PIP Management</h2>

				{/* ボタンエリア */}
				<div className="flex items-end justify-between mt-2">
					{/* 左側：フィルタ */}
					<FilterButton
						setShowFilters={setShowFilters}
						showFilters={showFilters}
						tableInstance={tableInstance}
					/>

					{/* 右側：操作ボタンエリア */}
					<div className="flex items-center gap-2">
						{/* AIP生成 */}
						<Button
							size="sm"
							variant="outline"
							onClick={handleAipGeneration}
							disabled={selectedCount !== 1}
							className="flex items-center gap-2 h-8 px-3 bg-orange-500 hover:bg-orange-500/80 text-white hover:text-white cursor-pointer"
						>
							<Building2 className="w-4 h-4" />
							Manage AIP
						</Button>
						{/* 編集ボタン */}
						<Button
							size="sm"
							variant="outline"
							onClick={handlePipEdit}
							disabled={selectedCount !== 1}
							className="flex items-center gap-2 h-8 px-3 bg-muted-indigo hover:bg-muted-indigo/80 text-white hover:text-white cursor-pointer"
						>
							<Edit className="w-4 h-4" />
							Edit PIP
						</Button>
						{/* 複製ボタン */}
						<Button
							size="sm"
							variant="outline"
							disabled={selectedCount !== 1}
							className="flex items-center gap-2 h-8 px-3 bg-muted-indigo hover:bg-muted-indigo/80 text-white hover:text-white cursor-pointer"
							onClick={handlePipCopy}
						>
							<Copy className="w-4 h-4" />
							Duplicate
						</Button>
						{/* 統合ボタン */}
						<Button
							size="sm"
							variant="outline"
							disabled={selectedCount < 2}
							className="flex items-center gap-2 h-8 px-3 bg-muted-indigo hover:bg-muted-indigo/80 text-white hover:text-white cursor-pointer"
							onClick={() => setShowMergeDialog(true)}
						>
							<Merge className="w-4 h-4" />
							Merge
						</Button>
						{/* 削除ボタン */}
						<Button
							size="sm"
							variant="outline"
							disabled={selectedCount === 0}
							className="flex items-center gap-2 h-8 px-3 bg-muted-indigo hover:bg-muted-indigo/80 text-white hover:text-white cursor-pointer"
							onClick={() => {
								setShowDeleteDialog(true);
							}}
						>
							<Trash2 className="w-4 h-4" />
							Delete
						</Button>
					</div>
				</div>
			</div>
			{showMergeDialog && (
				<MergeDialog
					showMergeDialog={showMergeDialog}
					setShowMergeDialog={setShowMergeDialog}
					nickname={nickname}
					setNickname={setNickname}
					handleMergePips={handleMergePips}
					selectedPips={selectedPips}
				/>
			)}
			{showDeleteDialog && (
				<DeleteDialog
					showDeleteDialog={showDeleteDialog}
					setShowDeleteDialog={setShowDeleteDialog}
				/>
			)}
		</>
	);
};