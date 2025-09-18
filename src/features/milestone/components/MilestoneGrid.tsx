import * as wjcCore from '@mescius/wijmo';
import { EmptyState } from '@/components/EmptyState';
import { useFgsStore } from '@/stores/useFgsStore';
import { usePipDetailStore } from '@/stores/usePipDetailStore';
import { usePipGenerationModeStore } from '@/stores/usePipGenerationModeStore';
import { usePipsStore } from '@/stores/usePipsStore';
import { useSelectedFGStore } from '@/stores/useSelectedFgStore';
import { useSelectedJobNoStore } from '@/stores/useSelectedJobNoStore';
import type { AIPVendor, AIPVendorResponse } from '../types';
import '@mescius/wijmo.cultures/wijmo.culture.ja';
import type { FlexGrid } from '@mescius/wijmo.grid';
import * as wjGrid from '@mescius/wijmo.react.grid';
import '@mescius/wijmo.styles/wijmo.css';
import { useNavigate, useParams } from '@tanstack/react-router';
import { AlertCircle } from 'lucide-react';
import type React from 'react';
import { useCallback, useEffect } from 'react';
import { useFunctionGroups } from '../../psys-randing/hooks/useFunctionGroups';
import { useFetchAndTransformPips } from '../hooks/useFetchAndTransformPips';
import { useInitializeMilestoneGrid } from '../hooks/useInitializeMilestoneGrid';
import { useMilestoneCollectionView } from '../hooks/useMilestoneCollectionView';
import { useMilestoneGridState } from '../hooks/useMilestoneGridState';
import { useMSRData } from '../hooks/useMSRData';
import { useMSRHeader } from '../hooks/useMSRHeader';
import '../styles/index.css';
import type { MSRAIPDataType } from '../types';
import { createColumnGroups } from '../utils/createColumnGroups';
import { AipGenerateDialog } from './AipGenerateDialog';

// Wijmoライセンスキーの設定
wjcCore.setLicenseKey('ここにライセンスキーの文字列を設定します');

const LOAD_MORE_THRESHOLD = 10; // スクロール時の追加データ読込閾値

// コンポーネントのProps定義
interface MilestoneGridProps {
	collectionView: wjcCore.CollectionView | null;
	setCollectionView: (cv: wjcCore.CollectionView | null) => void;
	setShowSave: React.Dispatch<React.SetStateAction<boolean>>;
	gridRef: React.RefObject<FlexGrid | null>;
}

export const MilestoneGrid: React.FC<MilestoneGridProps> = ({
	collectionView: _externalCollectionView,
	setCollectionView: externalSetCollectionView,
	setShowSave,
	gridRef,
}) => {
	// 選択したFG
	const { selectedJobNo, setSelectedJobNo } = useSelectedJobNoStore();
	const { selectedFG, setSelectedFG } = useSelectedFGStore();
	// 選択したPIP
	const { selectedPipCode, setSelectedPipCode } = usePipDetailStore();
	const { setPipSelection } = usePipsStore();
	// APIからFG取得
	const { data: fgData } = useFunctionGroups();
	// FGリストの状態
	const { setFgs } = useFgsStore();
	// アラートの状態
	// const { isAlertVisible, messages } = useAlertStore();
	const { setPipGenerationMode } = usePipGenerationModeStore();
	// ナビゲーション
	const navigate = useNavigate();

	// 状態管理フックから必要な状態と関数を取得
	const {
		MSRHeader,
		MSRData,
		columnGroups,
		skipNum,
		isLoading,
		rowCount: _rowCount,
		cellCount: _cellCount,
		assignedVendorCode,
		wijmoUpdateMode,
		showVendorDialog,
		setMSRHeader,
		setColumnGroups,
		setSkipNum,
		setIsLoading,
		setRowCount,
		setCellCount,
		setAssignedVendorCode,
		setWijmoUpdateMode,
		setShowVendorDialog,
		updateMSRDataWithNewAIPs,
		updatePIPGroupData,
		appendMSRData,
	} = useMilestoneGridState();

	// CollectionView管理フックを使用
	const { collectionView, findInCollectionView, preserveScrollPosition } =
		useMilestoneCollectionView(MSRData, isLoading, setIsLoading);

	// 外部から渡されたCollectionViewのsetter関数を同期
	useEffect(() => {
		externalSetCollectionView(collectionView);
	}, [collectionView, externalSetCollectionView]);

	// パスからMSR管理単位取得
	const { MSRMngCode } = useParams({ from: '/msr/milestone/$MSRMngCode' });

	// ヘッダー取得フック
	const {
		data: MSRHeaderData,
		isLoading: headerLoadig,
		error: headerError,
	} = useMSRHeader({ MSRMngCode });

	// データ取得フック（ページング対応）
	const {
		data: AIPData,
		isLoading: dataLoading,
		error: dataError,
		refetch,
	} = useMSRData({ MSRMngCode, skipNum });

	// ヘッダー取得後に状態更新
	useEffect(() => {
		if (MSRHeaderData) {
			setMSRHeader(MSRHeaderData);
		}
	}, [MSRHeaderData, setMSRHeader]);

	// ヘッダーからカラムグループを生成
	useEffect(() => {
		if (MSRHeader.length > 0) {
			setColumnGroups(createColumnGroups(MSRHeader));
		}
	}, [MSRHeader, setColumnGroups]);

	// 新しいデータが取得されたら蓄積
	useEffect(() => {
		if (AIPData && AIPData.length > 0) {
			appendMSRData(AIPData);
		}
	}, [AIPData, appendMSRData]);

	// FGリストをグローバルstateに設定、FGセレクトボックスのOption設定
	useEffect(() => {
		if (!fgData) return;
		setFgs(fgData);
	}, [fgData, setFgs]);

	// PIP取得と整形: PIP編集画面遷移の為事前準備
	useFetchAndTransformPips(selectedJobNo, selectedFG);

	// 該当PIPNoのデータだけ抽出して更新
	const refreshGroupData = useCallback(
		async (PIPCode: string) => {
			const result = await refetch();
			const allData = result.data;

			if (!allData) return;
			const filteredGroup = allData.filter(
				(msrAipDataType: MSRAIPDataType) => msrAipDataType.PIPNo === PIPCode,
			);

			if (filteredGroup.length > 0) {
				updatePIPGroupData(PIPCode, filteredGroup);
			}
		},
		[refetch, updatePIPGroupData],
	);

	// AIP生成後の処置
	useEffect(() => {
		if (wijmoUpdateMode === false) return;

		setWijmoUpdateMode(false);

		// 再検索を行う
		selectedPipCode && refreshGroupData(selectedPipCode);
	}, [wijmoUpdateMode, selectedPipCode, refreshGroupData, setWijmoUpdateMode]);

	// AIP行追加
	const handleAssignVendors = (aipResult: AIPVendorResponse) => {
		if (!Array.isArray(aipResult.aips) || aipResult.aips.length === 0) {
			return;
		}

		// PIPNameを取得（新しいヘルパー関数を使用）
		const baseRow = findInCollectionView(
			(row: MSRAIPDataType) => row.PIPNo === selectedPipCode,
		);

		if (!baseRow) return;

		// API結果から新しいAIP行を生成
		const newRows = aipResult.aips.map((vendor: AIPVendor) => ({
			PIPNo: aipResult.pipCode,
			PIPName: baseRow.PIPName,
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

		// スクロール位置を保持しながらMSRDataステートを更新
		preserveScrollPosition(gridRef, () => {
			updateMSRDataWithNewAIPs(newRows);
		});
	};

	// グリッドの行数・セル数を更新
	const updateGridMetrics = (grid: FlexGrid) => {
		setRowCount(grid.rows.length);
		setCellCount(grid.hostElement.querySelectorAll('.wj-cell').length);
	};

	// グリッド初期化時の処理
	const initializeGrid = useInitializeMilestoneGrid({
		gridRef,
		collectionView,
		setShowVendorDialog,
		setShowSave,
		setSkipNum,
		isLoading,
		setIsLoading,
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

	if (headerLoadig || (dataLoading && skipNum === 0)) {
		return (
			<output className="flex justify-center mt-30" aria-label="読み込み中">
				<div className="animate-spin h-10 w-10 border-4 border-blue-500 rounded-full border-t-transparent" />
			</output>
		);
	}

	if (MSRMngCode === null || !MSRMngCode) {
		// saveボタン非表示
		setShowSave(false);
		return (
			<div className="mt-30">
				<EmptyState icon={AlertCircle} label="MSRを表示できません" />
			</div>
		);
	}

	if (!collectionView || !columnGroups.length) {
		// saveボタン非表示
		setShowSave(false);
		return (
			<div className="mt-30">
				<EmptyState icon={AlertCircle} label="表示するデータがありません" />
			</div>
		);
	}

	if (headerError || dataError) {
		// saveボタン非表示
		setShowSave(false);
		return (
			<div className="mt-30">
				<EmptyState icon={AlertCircle} label="エラーが発生しました" />
			</div>
		);
	}

	return (
		<>
			{collectionView && (
				// データがある場合のみグリッドを表示
				<wjGrid.FlexGrid
					ref={gridRef}
					//itemFormatter={collectionView ? createCellTemplate(collectionView) : undefined}
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
