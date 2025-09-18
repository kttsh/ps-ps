import type { pipGenerationModeType } from '@/stores/usePipGenerationModeStore';
import type * as wjcCore from '@mescius/wijmo';
import {
    type FlexGrid
} from '@mescius/wijmo.grid';
import { type NavigateFn } from '@tanstack/react-router';
import type { FG } from '../../../stores/useFgsStore';

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
    navigate: NavigateFn;
    setSelectedJobNo: (jobNo: string) => void;
    setSelectedFG: (fg: FG | null) => void;
    setSelectedPipCode: (pipCode: string) => void;
    selectedJobNo: React.SetStateAction<string>;
    selectedFG: FG | null;
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