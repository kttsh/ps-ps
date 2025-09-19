import type * as wjcCore from '@mescius/wijmo';
import type { FlexGrid } from '@mescius/wijmo.grid';
import type { pipGenerationModeType } from '@/stores/usePipGenerationModeStore';
import type { FG } from '../../../../../../work/splitter2/src/stores/useFgsStore';

/**
 * useInitializeMilestoneGridのプロパティ型定義
 */
export interface InitializeMilestoneGridProps {
	gridRef: React.RefObject<FlexGrid | null>;
	collectionView: wjcCore.CollectionView | null;
	setShowVendorDialog: React.Dispatch<React.SetStateAction<boolean>>;
	setShowSave: React.Dispatch<React.SetStateAction<boolean>>;
	setSkipNum: React.Dispatch<React.SetStateAction<number>>;
	isLoading: React.SetStateAction<boolean>;
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
	MSRMngCode: string;
	updateGridMetrics: (grid: FlexGrid) => void;
	fgData: FG[] | undefined;
	setAssignedVendorCode: (codes: string[]) => void;
	setPipGenerationMode: (
		next:
			| pipGenerationModeType
			| ((current: pipGenerationModeType) => pipGenerationModeType),
	) => void;
	setPipSelection: (selection: Record<string, boolean>) => void;
	LOAD_MORE_THRESHOLD: number;
}