import * as wjcCore from '@mescius/wijmo';
import { EmptyState } from '@/components/EmptyState';
import { useFgsStore } from '@/stores/useFgsStore';
import { usePipDetailStore } from '@/stores/usePipDetailStore';
import { usePipGenerationModeStore } from '@/stores/usePipGenerationModeStore';
import { usePipsStore } from '@/stores/usePipsStore';
import { useSelectedFGStore } from '@/stores/useSelectedFgStore';
import { useSelectedJobNoStore } from '@/stores/useSelectedJobNoStore';
import '@mescius/wijmo.cultures/wijmo.culture.ja';
import type { FlexGrid, GridPanel } from '@mescius/wijmo.grid';
import * as wjGrid from '@mescius/wijmo.react.grid';
import '@mescius/wijmo.styles/wijmo.css';
import { useNavigate, useParams } from '@tanstack/react-router';
import { AlertCircle } from 'lucide-react';
import type React from 'react';
import { useEffect, useRef, useState } from 'react';
import { useFunctionGroups } from '../../psys-randing/hooks/useFunctionGroups';
import { useFetchAndTransformPips } from '../hooks/useFetchAndTransformPips';
import { useInitializeMilestoneGrid } from '../hooks/useInitializeMilestoneGrid';
import { useMSRData } from '../hooks/useMSRData';
import { useMSRHeader } from '../hooks/useMSRHeader';
import '../styles/index.css';
import type { MSRAIPDataType, MSRHeaderType } from '../types/milestone';
import { createColumnGroups } from '../utils/createColumnGroups';
import { transformToMilestoneData } from '../utils/transformToMilestoneData';
import { AipGenerateDialog } from './aipGenerateDialog';

// Wijmoライセンスキーの設定
wjcCore.setLicenseKey('ここにライセンスキーの文字列を設定します');

const LOAD_MORE_THRESHOLD = 10; // スクロール時の追加データ読込閾値

// コンポーネントのProps定義
interface MilestoneGridProps {
	collectionView: wjcCore.CollectionView | null;
	setCollectionView: (cv: wjcCore.CollectionView | null) => void;
	setShowSave: React.Dispatch<React.SetStateAction<boolean>>;
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
	collectionView,
	setCollectionView,
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
	// wijmo再更新フラグ
	const [wijmoUpdateMode, setWijmoUpdateMode] = useState(false);
	// ヘッダー情報の状態管理
	const [MSRHeader, setMSRHeader] = useState<MSRHeaderType[]>([]);
	// データ本体の状態管理
	const [MSRData, setMSRData] = useState<MSRAIPDataType[]>([]);
	// カラムグループの状態管理
	const [columnGroups, setColumnGroups] = useState<ColumnDefinition[]>([]);
	// データ取得の開始位置（ページング用）
	const [skipNum, setSkipNum] = useState(0);
	// データ追加中かどうかのフラグ
	const [isLoading, setIsLoading] = useState(false);
	// グリッドの行数・セル数の表示用
	const [_rowCount, setRowCount] = useState(0);
	const [_cellCount, setCellCount] = useState(0);
	// wijmoセル選択時同じAIPグループ内のVendorCode
	const [assignedVendorCode, setAssignedVendorCode] = useState<string[]>([]);
	// ナビゲーション
	const navigate = useNavigate();

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

	// ダイヤログ表示状態: ベンダー選択コンポーネント(AIP生成画面内)をダイヤログ表示
	const [showVendorDialog, setShowVendorDialog] = useState(false);

	// ヘッダー取得後に状態更新
	useEffect(() => {
		if (MSRHeaderData) {
			setMSRHeader(MSRHeaderData);
		}
	}, [MSRHeaderData]);

	// ヘッダーからカラムグループを生成
	useEffect(() => {
		if (MSRHeader.length > 0) {
			setColumnGroups(createColumnGroups(MSRHeader));
		}
	}, [MSRHeader]);

	// 新しいデータが取得されたら蓄積
	useEffect(() => {
		if (AIPData && AIPData.length > 0) {
			setMSRData((prev) => [...prev, ...AIPData]);
		}
	}, [AIPData]);

	// MSRDataが更新されたらCollectionViewを再構築
	useEffect(() => {
		if (MSRData.length > 0) {
			const milestoneData = transformToMilestoneData(MSRData);
			const currentPosition = collectionView?.currentPosition || 0;

			const cv = new wjcCore.CollectionView(milestoneData, {
				trackChanges: true,
			});
			cv.groupDescriptions.push(
				new wjcCore.PropertyGroupDescription('PIPNo', (pip: any) => {
					if (pip.PIPName) {
						return `${pip.PIPNo}　PIPName: ${pip.PIPName}`;
					}
					return pip.PIPNo;
				}),
			);
			cv.currentPosition = currentPosition;

			setCollectionView(cv);
			setIsLoading(false);
		}
	}, [MSRData]);

	// FGリストをグローバルstateに設定、FGセレクトボックスのOption設定
	useEffect(() => {
		if (!fgData) return;
		setFgs(fgData);
	}, [fgData, setFgs]);

	// PIP取得と整形: PIP編集画面遷移の為事前準備
	useFetchAndTransformPips(selectedJobNo, selectedFG);

	// 該当PIPNoのデータだけ抽出して更新
	const refreshGroupData = async (PIPCode: string) => {
		const result = await refetch();
		const allData = result.data;

		if (!allData) return;
		const filteredGroup = allData.filter(
			(msrAipDataType: MSRAIPDataType) => msrAipDataType.PIPNo === PIPCode,
		);

		if (filteredGroup.length > 0) {
			setMSRData((prev) => {
				const withoutGroup = prev.filter((item) => item.PIPNo !== PIPCode);
				return [...withoutGroup, ...filteredGroup];
			});
		}
	};

	// AIP生成後の処置
	useEffect(() => {
		if (wijmoUpdateMode === false) return;

		setWijmoUpdateMode(false);

		// 再検索を行う
		selectedPipCode && refreshGroupData(selectedPipCode);
	}, [wijmoUpdateMode]);

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
			<div className="flex justify-center mt-30" aria-label="読み込み中">
				<div className="animate-spin h-10 w-10 border-4 border-blue-500 rounded-full border-t-transparent" />
			</div>
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
					//setWijmoUpdateMode={setWijmoUpdateMode}
					assignedVendorCode={assignedVendorCode}
				/>
			)}
			{/* アラートメッセージ */}
			{/* {isAlertVisible && messages && (
				<div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
					<AlertMessages messages={messages} />
				</div>
			)} */}
		</>
	);
};
