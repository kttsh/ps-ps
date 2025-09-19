import * as wjcCore from '@mescius/wijmo';
import { EmptyState } from '@/components/EmptyState';
import { useFgsStore } from '@/stores/useFgsStore';
import { usePipDetailStore } from '@/stores/usePipDetailStore';
import { usePipGenerationModeStore } from '@/stores/usePipGenerationModeStore';
import { usePipsStore } from '@/stores/usePipsStore';
import type { AIPVendor, AIPVendorResponse } from '@/types/common-api';
import '@mescius/wijmo.cultures/wijmo.culture.ja';
import type { FlexGrid, GridPanel } from '@mescius/wijmo.grid';
import * as wjGrid from '@mescius/wijmo.react.grid';
import '@mescius/wijmo.styles/wijmo.css';
import { useParams } from '@tanstack/react-router';
import { AlertCircle } from 'lucide-react';
import type React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { useFunctionGroups } from '../../psys-randing/hooks/useFunctionGroups';
import { useInitializeMilestoneGrid } from '../hooks/useInitializeMilestoneGrid';
import { useMilestoneDataService } from '../services/MilestoneDataService';
import '../styles/index.css';
import type { MSRAIPDataType } from '../types/milestone';
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

// カラム定義の型
interface ColumnDefinition {
	header: string;
	binding?: string;
	width?: number;
	columns?: ColumnDefinition[];
	cellTemplate?: (
		panel: GridPanel,
		row: number,
		col: number,
		cell: HTMLElement,
	) => void;
}

export const MilestoneGrid: React.FC<MilestoneGridProps> = ({
	collectionView: externalCollectionView,
	setCollectionView: setExternalCollectionView,
	setShowSave,
	gridRef,
}) => {
	// 選択したPIP
	const { selectedPipCode } = usePipDetailStore();
	const { setPipSelection } = usePipsStore();
	// APIからFG取得
	const { data: fgData } = useFunctionGroups();
	// FGリストの状態
	const { setFgs } = useFgsStore();
	const { setPipGenerationMode } = usePipGenerationModeStore();
	// カラムグループの状態管理
	const [columnGroups, setColumnGroups] = useState<ColumnDefinition[]>([]);
	// グリッドの行数・セル数の表示用
	const [_rowCount, setRowCount] = useState(0);
	const [_cellCount, setCellCount] = useState(0);
	// wijmoセル選択時同じAIPグループ内のVendorCode
	const [assignedVendorCode, setAssignedVendorCode] = useState<string[]>([]);

	// パスからMSR管理単位取得
	const { MSRMngCode } = useParams({ from: '/msr/milestone/$MSRMngCode' });

	// MilestoneDataServiceを使用
	const {
		headers,
		data: MSRData,
		collectionView,
		isLoadingHeaders,
		isLoadingData,
		isLoadingMore,
		headersError,
		dataError,
		loadMoreData,
		// refreshPIPGroup, // 現在未使用
		updateCollectionView,
		addAIPRows,
		hasMore,
	} = useMilestoneDataService({
		MSRMngCode: MSRMngCode || '',
		pageSize: LOAD_MORE_THRESHOLD,
	});

	// ダイヤログ表示状態: ベンダー選択コンポーネント(AIP生成画面内)をダイヤログ表示
	const [showVendorDialog, setShowVendorDialog] = useState(false);

	// ヘッダーからカラムグループを生成
	useEffect(() => {
		if (headers.length > 0) {
			setColumnGroups(createColumnGroups(headers));
		}
	}, [headers]);

	// CollectionViewが更新されたら外部に通知
	useEffect(() => {
		if (collectionView) {
			setExternalCollectionView(collectionView);
		}
	}, [collectionView, setExternalCollectionView]);

	// MSRDataが更新されたらCollectionViewを再構築
	useEffect(() => {
		if (MSRData.length > 0) {
			updateCollectionView(MSRData);
		}
	}, [MSRData, updateCollectionView]);

	// FGリストをグローバルstateに設定、FGセレクトボックスのOption設定
	useEffect(() => {
		if (!fgData) return;
		setFgs(fgData);
	}, [fgData, setFgs]);

	// AIP生成後の処置
	// const handleRefreshGroup = useCallback(async () => {
	// 	if (selectedPipCode) {
	// 		await refreshPIPGroup(selectedPipCode);
	// 	}
	// }, [selectedPipCode, refreshPIPGroup]);

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
		fgData,
		setAssignedVendorCode,
		setPipGenerationMode,
		setPipSelection,
		LOAD_MORE_THRESHOLD,
	});

	if (isLoadingHeaders || isLoadingData) {
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

	if (headersError || dataError) {
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