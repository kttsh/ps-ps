import type { PipDetail, Vendor } from '@/types';

/**
 * VendorAssignmentコンポーネントのProps
 */
export interface VendorAssignmentProps {
	selectedPips: PipDetail[];
	/** 割り当て可能なベンダーリスト */
	availableVendors: Vendor[];
	/** AIPモードかどうか */
	isAipMode: boolean;
	/** PIPデータ更新時のコールバック */
	onPipsUpdate: (pips: PipDetail[]) => void;
	/** 戻るボタンクリック時のコールバック */
	onBack: () => void;
}

/**
 * useVendorAssignmentフックのProps
 */
export interface UseVendorAssignmentProps {
	selectedPips: PipDetail[];
	onPipsUpdate: (pips: PipDetail[]) => void;
}

/**
 * useVendorAssignmentフックの戻り値
 */
export interface UseVendorAssignmentReturn {
	/** ベンダーを割り当てる */
	assignVendors: (vendors: Vendor[]) => void;
	/** ベンダーを削除する */
	removeVendor: (pipCode: string, vendorId: string) => void;
	/** PIPを削除する */
	removePip: (pipCode: string) => void;
}