import type { Pip, Vendor } from '@/types';

/**
 * VendorAssignmentコンポーネントのProps
 */
export interface VendorAssignmentProps {
	/** 選択されたPIPリスト */
	selectedPips: Pip[];
	/** 割り当て可能なベンダーリスト */
	availableVendors: Vendor[];
	/** ベンダーリスト更新時のコールバック */
	setAvailableVendors: (vendors: Vendor[]) => void;
	/** AIPモードかどうか */
	isAipMode: boolean;
	/** PIPデータ更新時のコールバック */
	onPipsUpdate: (pips: Pip[]) => void;
	/** 戻るボタンクリック時のコールバック */
	onBack: () => void;
	/**Create PIPボタンクリック時のコールバック */
	onCreateAip: (selectedVendorIds: string[]) => void;
	/** 選択済みベンダーリスト */
	selectedVendors: Vendor[];
	setSelectedVendors: (vendors: Vendor[]) => void;
}

/**
 * useVendorAssignmentフックのProps
 */
export interface UseVendorAssignmentProps {
	selectedPips: Pip[];
	onPipsUpdate: (pips: Pip[]) => void;
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
