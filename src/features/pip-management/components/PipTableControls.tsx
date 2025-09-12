import { useNavigate, useSearch } from '@tanstack/react-router';
import type { Table } from '@tanstack/react-table';
import { Building2, Copy, Edit, Merge, Trash2 } from 'lucide-react';
import { useCallback, useState } from 'react';
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
import type { ResponseInfo } from '@/types/common-api';
import { useCopyPipItems } from '../hooks/useCopyPipItems';
import { useDeletePips } from '../hooks/useDeletePips';
import { useMergePips } from '../hooks/useMergePips';
import { usePipDetail } from '../hooks/usePipDetail';
import { usePips } from '../hooks/usePips';
import {
	createDeletePipPayload,
	type PipInfo,
} from '../utils/createDeletePipPayload';
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
	const [showMergeDialog, setShowMergeDialog] = useState(false);
	const [showDeleteDialog, setShowDeleteDialog] = useState(false);
	const [nickname, setNickname] = useState('');

	const { setPipGenerationMode } = usePipGenerationModeStore();
	const { setPipDetailData, selectedPipCode, setSelectedPipCode } =
		usePipDetailStore();
	const { selectedJobNo } = useSelectedJobNoStore();
	const { selectedFG } = useSelectedFGStore();
	const { pipsData, pipSelection, setPipSelection } = usePipsStore();
	const { showAlert } = useAlertStore();

	const fgCode = selectedFG?.fgCode ?? null;
	const navigate = useNavigate();
	const currentSearch = useSearch({ strict: false });

	const { refetch: itemsRefetch } = useItems(selectedJobNo, fgCode);
	const { refetch: pipsRefetch } = usePips(selectedJobNo, fgCode);
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
	const { mutate: deletePips } = useDeletePips(selectedJobNo, fgCode);
	const { mutate: mergePips } = useMergePips(selectedJobNo, fgCode);

	const initializePipDetail = useCallback(() => {
		setPipDetailData({
			jobNo: '',
			fgCode: '',
			pipCode: '',
			pipNickName: '',
			pipSortKey: '',
			itemCount: 0,
			vendorCount: 0,
			items: [],
			vendors: [],
		});
	}, [setPipDetailData]);

	const getSelectedPips = useCallback((): PipInfo[] => {
		return Object.keys(pipSelection)
			.filter((code) => pipSelection[code])
			.map((code) => {
				const pip = pipsData.find((p) => p.pipCode === code);
				return pip ? { code: pip.pipCode, nickname: pip.pipNickName } : null;
			})
			.filter(Boolean) as PipInfo[];
	}, [pipSelection, pipsData]);

	//  AIP生成ページ（ベンダー割り当て）への遷移処理

	const handleAipGeneration = async () => {
		const selected = getSelectedPips();
		if (!selected.length) return;

		setSelectedPipCode(selected[0].code);
		await new Promise((r) => setTimeout(r, 100));
		await pipDetailRefetch();

		navigate({
			to: '/p-sys/vendor-assignment',
			search: {
				...currentSearch,
				mode: 'aip',
				selectedPips: JSON.stringify(selected),
			},
		});
	};

	// const handlePipEdit = async () => {
	// 	// チェックしたPIPコードを取得
	// 	const selectedPipData = getSelectedPips();
	// 	// console.log(`selectedPipData:${JSON.stringify(selectedPipData)}`);
	// 	setSelectedPipCode(
	// 		selectedPipData ? selectedPipData[0].code : undefined,
	// 	);

	// 	new Promise((resolve) => setTimeout(resolve, 100));
	// 	// await console.log(`selectedPipCode:${selectedPipCode}`);

	// 	const pipDetailResponse = await pipDetailRefetch();

	// 	if (pipDetailResponse.data) {
	// 		// PIPDetailを整形
	// 		const transformedpipDetail = transformPipDetailResponseToPipDetail(
	// 			pipDetailResponse.data.pipDetail,
	// 		);
	// 		setPipDetailData(transformedpipDetail);

	// 		if (
	// 			pipDetailResponse.data.Messages?.some(
	// 				(msg: ResponseInfo) => msg.Id === 'NO_PIP',
	// 			)
	// 		) {
	// 			showAlert(['NO_PIP'], 'warning');
	// 			return;
	// 		}

	// 		// ベンダー割り当てページに遷移（AIPモード）
	// 		// 現在のsearchパラメータ（fgcodeなど）を保持しつつ、新しいパラメータを追加
	// 		navigate({
	// 			to: '/p-sys/item-assignment',
	// 			search: currentSearch, // 現在のパラメータを保持
	// 		});
	// 		setPipGenerationMode('edit');
	// 		itemsRefetch();
	// 	}
	// };

	const handlePipEdit = async () => {
		const selected = getSelectedPips();
		if (!selected.length) return;

		setSelectedPipCode(selected[0].code);
		await new Promise((r) => setTimeout(r, 100));

		const response = await pipDetailRefetch();
		if (response.data) {
			const detail = transformPipDetailResponseToPipDetail(
				response.data.pipDetail,
			);
			setPipDetailData(detail);

			if (
				response.data.Messages?.some((msg: ResponseInfo) => msg.Id === 'NO_PIP')
			) {
				showAlert(['NO_PIP'], 'warning');
				return;
			}

			navigate({ to: '/p-sys/item-assignment', search: currentSearch });
			setPipGenerationMode('edit');
			itemsRefetch();
		}
	};

	const handlePipCopy = async () => {
		const selected = getSelectedPips();
		if (!selected.length) return;

		setSelectedPipCode(selected[0].code);
		await new Promise((r) => setTimeout(r, 100));

		const response = await pipDetailRefetch();
		if (selectedFG && response.data) {
			const detail = transformPipDetailResponseToPipDetail(
				response.data.pipDetail,
			);
			const payload = createPipPayload(
				selectedJobNo,
				selectedFG.fgCode,
				detail.pipNickName,
				detail.items,
			);

			copyPip(payload, {
				onSuccess: async () => {
					await itemsRefetch();
					await pipsRefetch();
					setPipSelection({});
					showAlert(['COPY_SUCCESS'], 'success');
				},
				onError: () => showAlert(['COPY_ERROR'], 'error'),
			});
		}
		initializePipDetail();
	};

	// 統合処理(dialog側に実装するとうまくいかなかったのでこちらで実装)

	const handleMergePips = async () => {
		const selected = getSelectedPips();
		if (!selectedFG || !selected.length) return;

		const payload = createMergePipPayload(
			selectedJobNo,
			selectedFG.fgCode,
			nickname,
			selected,
		);
		mergePips(payload, {
			onSuccess: async () => {
				await pipsRefetch();
				showAlert(['MERGE_SUCCESS'], 'success');
				setNickname('');
			},
			onError: () => showAlert(['MERGE_ERROR'], 'error'),
		});

		setShowMergeDialog(false);
		initializePipDetail();
	};

	const handleDeletePips = async () => {
		const selected = getSelectedPips();
		if (!selectedFG || !selected.length) return;

		const payload = createDeletePipPayload(
			selectedJobNo,
			selectedFG.fgCode,
			selected,
		);
		deletePips(payload, {
			onSuccess: async () => {
				await pipsRefetch();
				showAlert(['DELETE_PIP_SUCCESS'], 'success');
			},
			onError: () => showAlert(['DELETE_PIP_ERROR'], 'error'),
		});

		setShowDeleteDialog(false);
		initializePipDetail();
	};

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
					selectedPips={getSelectedPips()}
				/>
			)}
			{showDeleteDialog && (
				<DeleteDialog
					showDeleteDialog={showDeleteDialog}
					setShowDeleteDialog={setShowDeleteDialog}
					handleDeletePips={handleDeletePips}
					selectedPips={getSelectedPips()}
				/>
			)}
		</>
	);
};
