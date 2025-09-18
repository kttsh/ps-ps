/**
 * ベンダー選択・管理に関する型定義
 */

/**
 * ベンダー基本情報
 * 元ファイル: src/types/common-api.ts (68-72行目)
 */
export interface VendorResponse {
	vendorId: string;
	vendorName: string;
	vendorCode: string;
}

/**
 * ベンダーリストAPIレスポンス
 * 元ファイル: src/types/common-api.ts (74-76行目)
 */
export interface VendorsApiResponse {
	vendors: VendorResponse[];
}

/**
 * AIPベンダー情報（拡張版）
 * MilestoneGrid内で使用される想定の型
 * 注: 元ファイルでは型定義が見つからなかったため、
 * import文から推測して定義
 */
export interface AIPVendor {
	vendorId: string;
	vendorName: string;
	vendorCode: string;
	countryName?: string;
	countryCode?: string;
	shore?: string;
	status?: string;
}

/**
 * AIPベンダー詳細レスポンス
 */
export interface AIPVendorResponse extends AIPVendor {
	buyerName?: string;
	functionGroup?: string;
	kpInFG?: string;
	orderNumber?: string;
	requisitionNumber?: string;
}

/**
 * ベンダー選択パラメータ
 * handleAssignVendors関数で使用される
 */
export interface VendorSelectionParams {
	pipCodes: string[];
	jobNo: string;
	msrMngCode: string;
}

/**
 * ベンダー割り当て結果
 */
export interface VendorAssignmentResult {
	success: boolean;
	assignedVendorCode?: string;
	assignedPipCodes?: string[];
	error?: string;
}

/**
 * ベンダー選択マネージャーのProps
 */
export interface VendorSelectionManagerProps {
	/** 選択されたデータ行 */
	selectedRows: any[]; // MSRAIPDataTypeは別ファイルから参照
	/** 割り当て完了時のコールバック */
	onAssignComplete: (vendorCode: string) => void;
	/** キャンセル時のコールバック */
	onCancel: () => void;
}

/**
 * ベンダー選択ダイアログのProps
 */
export interface VendorSelectionDialogProps {
	/** ダイアログの表示状態 */
	open: boolean;
	/** ダイアログを閉じる関数 */
	onClose: () => void;
	/** ベンダーリスト */
	vendors: VendorResponse[];
	/** ベンダー選択時のコールバック */
	onSelectVendor: (vendorCode: string) => void;
	/** ローディング状態 */
	isLoading?: boolean;
	/** エラーメッセージ */
	error?: string;
}

/**
 * ベンダー割り当てフックのパラメータ
 */
export interface UseVendorAssignmentParams {
	msrMngCode: string;
}

/**
 * ベンダー割り当てフックの戻り値
 */
export interface UseVendorAssignmentReturn {
	/** ベンダー割り当て処理を実行 */
	assignVendors: (params: VendorSelectionParams) => Promise<VendorAssignmentResult>;
	/** 処理中フラグ */
	isAssigning: boolean;
	/** エラー情報 */
	error: Error | null;
}

/**
 * ベンダーデータ更新フックのパラメータ
 */
export interface UseVendorRefreshParams {
	pipCode: string;
	msrMngCode: string;
}

/**
 * ベンダーデータ更新フックの戻り値
 */
export interface UseVendorRefreshReturn {
	/** データ更新処理を実行 */
	refreshVendorData: () => Promise<void>;
	/** 更新中フラグ */
	isRefreshing: boolean;
	/** エラー情報 */
	error: Error | null;
}