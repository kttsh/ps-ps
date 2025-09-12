/**
 * マイルストーンのヘッダー情報を表す型
 */
export interface MSRHeaderType {
	MilestoneName: string;
	Task: Array<MSRTaskType>;
}

/**
 * マイルストーンのタスク情報を表す型
 */
export interface MSRTaskType {
	TaskID: string;
	TaskName: string;
	TaskDateCategory?: Array<TaskDateCategoryType>;
	Deliverable?: Array<DeliverableType>;
}

/**
 * タスクの日程カテゴリ情報を表す型
 */
export interface TaskDateCategoryType {
	DateTypeCategory: string;
	DateType: string;
}

/**
 * 成果物情報を表す型
 */
export interface DeliverableType {
	DeliverableName: string;
	DeliverableId: string;
	DeliverablePJTaskId: string;
	DeliverableProperty?: Array<DeliverablePropertyType>;
}

/**
 * 成果物の属性情報を表す型
 */
export interface DeliverablePropertyType {
	DeliverablePropertyName: string;
	DeliverablePropertyId: string;
	DeliverablePropertyType: string;
	DeliverableChild?: Array<DeliverableChildType>;
}

/**
 * 成果物の子属性情報を表す型
 */
export interface DeliverableChildType {
	ChildDeliverablePropertyName: string;
	ChildDeliverablePropertyType: string;
	ChildDeliverablePropertyId: string;
}

/**
 * 成果物属性の入力タイプを定義する列挙型
 */
export const DeliverablePropertyInputType = {
	DATE: 'DATE',
	DATETIME: 'DATETIME',
	FLOAT: 'FLOAT',
	INT: 'INT',
	TEXT: 'TEXT',
} as const;

export type DeliverablePropertyInputType =
	(typeof DeliverablePropertyInputType)[keyof typeof DeliverablePropertyInputType];

/**
 * AIPのデータを表す型
 */
export interface MSRAIPDataType {
	PIPNo: string;
	PIPName: string;
	JobNo: string;
	FG: string;
	AIP: Array<MSRAIPType>;
}

/**
 * AIP情報を表す型
 */
export interface MSRAIPType {
	AIPNo: string;
	VendorName: string;
	VendorCode: string;
	CountryName: string;
	CountryCode: string;
	BuyerName: string;
	Status: string;
	FGName: string;
	KPinFG: string;
	Shore: string;
	Order: string;
	ReqNo: string;
	Deliverable: Array<MSRAIPDeliverableType>;
	TaskTracking: Array<MSRTaskTrackingType>;
}

/**
 * AIP成果物情報を表す型 (PMSRT005)
 */
export interface MSRAIPDeliverableType {
	ID: string;
	Rev: string;
	TaskID: string;
	Property: Array<AIPDeliverablePropertyType>;
}

/**
 * AIP成果物属性情報を表す型
 */
export interface AIPDeliverablePropertyType {
	ID: string;
	Type: string;
	Value: string;
}

/**
 * タスク追跡情報を表す型 (PMSRT006)
 */
export interface MSRTaskTrackingType {
	ID: string;
	DateType: string;
	Date: Date;
}

/**
 * プロジェクトステータス取得用
 */
export interface PJStatusType {
	PJStatusID: string;
	PJStatusCustomName: string;
}
