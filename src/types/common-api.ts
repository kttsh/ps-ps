/**
 * 購入品のレスポンス型
 * 数値型であるべきカラムがすべて文字列
 */
export interface ItemResponse {
	/** アイテム内部キー */
	itemSurKey: string;
	/** Job番号 */
	jobNo: string;
	/** Function Groupコード */
	fgCode: string;
	/** アイテム番号 */
	itemNo: string;
	/** コアアイテム番号 */
	itemCoreNo: string;
	/** アイテム名 */
	itemName: string;
	/** 数量 */
	itemQty?: string;
	/** 割り当て済み数量(ed有無統一すべし) */
	itemAssignedQty?: string;
	/** 割り当て済み数量(ed有無統一すべし) */
	itemAssignQty?: string;
	/** 未割り当て数量 */
	itemUnassignedQty?: string;
	// /** ソートキー */
	itemSortKey?: string;
	/** Cost Element */
	itemCostElement: string;
	/** IBS Code(大文字か小文字統一すべし) */
	itemIBSCode?: string;
	/** IBS Code(大文字か小文字統一すべし) */
	itemIbsCode?: string;
	/** PIP割り当てステータス */
	itemIsAssign?: string;
}

export interface PipResponse {
	jobNo: string;
	fgCode: string;
	pipCode: string;
	pipNickName: string;
	pipSortKey: string;
	itemCount?: string;
	vendorCount?: string;
}

export interface Aip {
	aipCode: string;
	vendorId: string;
	vendorName: string;
}

export interface PipDetailResponse extends PipResponse {
	items?: ItemResponse[];
	aips?: Aip[];
}

/**
 * APIレスポンス共通info
 */
/**
 * AIPベンダー情報
 */
export interface AIPVendor {
	aipCode: string;
	aipVendorName: string;
}

/**
 * AIPベンダーレスポンス
 */
export interface AIPVendorResponse {
	aips: AIPVendor[];
	pipCode: string;
	jobNo: string;
	fgCode: string;
}

export interface ResponseInfo {
	Id: string;
	Type: number;
	Description: string;
}

export interface VendorResponse {
	vendorId: string;
	vendorName: string;
	vendorCode: string;
}

export interface VendorsApiResponse {
	vendors: VendorResponse[];
}