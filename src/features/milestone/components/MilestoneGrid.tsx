import type * as wjcCore from '@mescius/wijmo';
import type { FlexGrid } from '@mescius/wijmo.grid';
import * as wjGrid from '@mescius/wijmo.react.grid';
import type { FG } from '@/stores/useFgsStore';
import { usePipDetailStore } from '@/stores/usePipDetailStore';
import { usePipGenerationModeStore } from '@/stores/usePipGenerationModeStore';
import { usePipsStore } from '@/stores/usePipsStore';
import { useSelectedFGStore } from '@/stores/useSelectedFgStore';
import { useSelectedJobNoStore } from '@/stores/useSelectedJobNoStore';
import type { AIPVendor, AIPVendorResponse } from '@/types/common-api';
import '@mescius/wijmo.styles/wijmo.css';
import { useNavigate } from '@tanstack/react-router';
import type React from 'react';
import { useCallback, useState } from 'react';
import { useFetchAndTransformPips } from '../hooks/useFetchAndTransformPips';
import { useInitializeMilestoneGrid } from '../hooks/useInitializeMilestoneGrid';
import '../styles/index.css';
import type { NewAIPRow } from '../services/MilestoneDataService';
import type { MSRAIPDataType } from '../types/milestone';
import type { ColumnDefinition } from '../utils/createColumnGroups';
import { AipGenerateDialog } from './AipGenerateDialog';

// コンポーネントのProps定義
interface MilestoneGridProps {
	collectionView: wjcCore.CollectionView | null;
	externalCollectionView: wjcCore.CollectionView | null;
	columnGroups: ColumnDefinition[];
	gridRef: React.RefObject<FlexGrid | null>;
	setShowSave: React.Dispatch<React.SetStateAction<boolean>>;
	MSRMngCode: string;
	fgData: FG[] | undefined;
	addAIPRows: (pipCode: string, newRows: NewAIPRow[]) => void;
	loadMoreData: () => Promise<void>;
	hasMore: boolean;
	isLoadingMore: boolean;
	LOAD_MORE_THRESHOLD: number;
}

export const MilestoneGrid: React.FC<MilestoneGridProps> = ({
	collectionView,
	externalCollectionView,
	columnGroups,
	gridRef,
	setShowSave,
	MSRMngCode,
	fgData,
	addAIPRows,
	loadMoreData,
	hasMore,
	isLoadingMore,
	LOAD_MORE_THRESHOLD,
}) => {
	// 選択したFG
	const { selectedJobNo, setSelectedJobNo } = useSelectedJobNoStore();
	const { selectedFG, setSelectedFG } = useSelectedFGStore();

	// 選択したPIP
	const { selectedPipCode, setSelectedPipCode } = usePipDetailStore();
	const { setPipSelection } = usePipsStore();
	const { setPipGenerationMode } = usePipGenerationModeStore();

	// グリッドの行数・セル数の表示用
	const [_rowCount, setRowCount] = useState(0);
	const [_cellCount, setCellCount] = useState(0);

	// wijmoセル選択時同じAIPグループ内のVendorCode
	const [assignedVendorCode, setAssignedVendorCode] = useState<string[]>([]);

	// ダイヤログ表示状態
	const [showVendorDialog, setShowVendorDialog] = useState(false);

	// ナビゲーション
	const navigate = useNavigate();

	// PIP取得と整形: PIP編集画面遷移の為事前準備
	useFetchAndTransformPips(selectedJobNo, selectedFG);

	// AIP行追加
	const handleAssignVendors = useCallback(
		(aipResult: AIPVendorResponse) => {
			if (!Array.isArray(aipResult.aips) || aipResult.aips.length === 0) {
				return;
			}

			// PIPNameを取得
			const cv = gridRef.current?.collectionView;
			if (!cv) return;
			const source = cv.sourceCollection;
			const baseRow = source.find(
				(row: MSRAIPDataType) => row.PIPNo === selectedPipCode,
			);

			// スクロール位置を保存
			const scrollPosition = gridRef.current?.scrollPosition;

			// API結果から新しいAIP行を生成
			const newRows = aipResult.aips.map((vendor: AIPVendor) => ({
				PIPNo: aipResult.pipCode,
				PIPName: baseRow?.PIPName || '',
				JobNo: aipResult.jobNo,
				FG: aipResult.fgCode,
				AIPNo: vendor.aipCode,
				VendorName: vendor.aipVendorName,
				CountryCode: '',
				CountryName: '',
				BuyerName: '',
				Status: '',
				FGName: '',
				KPinFG: '',
				Shore: '',
				Order: '',
				ReqNo: '',
			}));

			// サービスを使用してAIP行を追加
			addAIPRows(aipResult.pipCode, newRows);

			// スクロール位置を復元
			if (gridRef.current && scrollPosition) {
				gridRef.current.scrollPosition = scrollPosition;
			}
		},
		[selectedPipCode, gridRef, addAIPRows],
	);

	// グリッドの行数・セル数を更新
	const updateGridMetrics = (grid: FlexGrid) => {
		setRowCount(grid.rows.length);
		setCellCount(grid.hostElement.querySelectorAll('.wj-cell').length);
	};

	// グリッド初期化時の処理
	const initializeGrid = useInitializeMilestoneGrid({
		gridRef,
		collectionView: externalCollectionView,
		setShowVendorDialog,
		setShowSave,
		setSkipNum: (_num) => {
			// loadMoreDataを呼び出す
			if (hasMore && !isLoadingMore) {
				loadMoreData();
			}
		},
		isLoading: isLoadingMore,
		setIsLoading: () => {},
		MSRMngCode,
		updateGridMetrics,
		navigate,
		setSelectedJobNo,
		setSelectedFG,
		setSelectedPipCode,
		selectedJobNo,
		selectedFG,
		fgData,
		setAssignedVendorCode,
		setPipGenerationMode,
		setPipSelection,
		LOAD_MORE_THRESHOLD,
	});

	return (
		<>
			{collectionView && (
				// データがある場合のみグリッドを表示
				<wjGrid.FlexGrid
					ref={gridRef}
					initialized={initializeGrid}
					itemsSource={collectionView}
					columnGroups={columnGroups}
					isReadOnly={false}
					allowDragging={false}
					allowSorting={false}
				/>
			)}
			{showVendorDialog && (
				<AipGenerateDialog
					open={showVendorDialog}
					onOpenChange={setShowVendorDialog}
					assignedVendorCode={assignedVendorCode}
					onAssign={handleAssignVendors}
				/>
			)}
		</>
	);
};
