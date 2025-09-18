import type { CollectionView } from '@mescius/wijmo';
import type { FlexGrid, GridPanel } from '@mescius/wijmo.grid';
import type React from 'react';

/**
 * MilestoneGridコンポーネントのProps定義
 * 元ファイル: src/features/milestone/components/MilestoneGrid.tsx (35-40行目)
 */
export interface MilestoneGridProps {
	collectionView: CollectionView | null;
	setCollectionView: (cv: CollectionView | null) => void;
	setShowSave: React.Dispatch<React.SetStateAction<boolean>>;
	gridRef: React.RefObject<FlexGrid | null>;
}

/**
 * カラム定義の型
 * 元ファイル: src/features/milestone/components/MilestoneGrid.tsx (43-53行目)
 */
export interface ColumnDefinition {
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

/**
 * グリッド初期化オプション
 */
export interface GridInitializationOptions {
	skipNum: number;
	loadMoreThreshold: number;
	wijmoLicenseKey?: string;
}

/**
 * グリッドメトリクス情報
 */
export interface GridMetrics {
	rowCount: number;
	cellCount: number;
}

/**
 * MilestoneGrid全体の状態管理用インターフェース
 * 現在のMilestoneGrid.tsxの複数のuseStateを統合
 */
export interface MilestoneGridState {
	/** Wijmo更新モード */
	wijmoUpdateMode: boolean;
	/** マイルストーンヘッダー情報 */
	MSRHeader: any[]; // MSRHeaderTypeは別ファイルから参照
	/** マイルストーンデータ */
	MSRData: any[]; // MSRAIPDataTypeは別ファイルから参照
	/** カラムグループ定義 */
	columnGroups: ColumnDefinition[];
	/** データスキップ数（ページング用） */
	skipNum: number;
	/** ローディング状態 */
	isLoading: boolean;
	/** 行数 */
	rowCount: number;
	/** セル数 */
	cellCount: number;
	/** 割り当てられたベンダーコード */
	assignedVendorCode: string;
	/** ベンダー選択ダイアログの表示状態 */
	showVendorDialog: boolean;
}

/**
 * グリッド状態管理フックの戻り値
 */
export interface UseMilestoneGridStateReturn {
	state: MilestoneGridState;
	actions: {
		updateWijmoMode: (mode: boolean) => void;
		setMSRData: (data: any[]) => void;
		setMSRHeader: (header: any[]) => void;
		setColumnGroups: (groups: ColumnDefinition[]) => void;
		setSkipNum: (num: number) => void;
		setIsLoading: (loading: boolean) => void;
		updateGridMetrics: (metrics: GridMetrics) => void;
		setAssignedVendorCode: (code: string) => void;
		setShowVendorDialog: (show: boolean) => void;
		updateState: (partial: Partial<MilestoneGridState>) => void;
		resetState: () => void;
	};
}

/**
 * グリッド初期化フックの戻り値
 */
export interface UseGridInitializerReturn {
	initializeGrid: (grid: FlexGrid) => void;
	isInitialized: boolean;
	error: Error | null;
}

/**
 * 無限スクロールフックのオプション
 */
export interface InfiniteScrollOptions {
	threshold: number;
	onLoadMore: () => void | Promise<void>;
}

/**
 * 無限スクロールフックの戻り値
 */
export interface UseInfiniteScrollReturn {
	scrollContainerRef: React.RefObject<HTMLElement>;
	isLoadingMore: boolean;
	hasMore: boolean;
}