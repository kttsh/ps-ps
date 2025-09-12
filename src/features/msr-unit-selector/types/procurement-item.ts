// 調達品のデータモデル
export interface ProcurementItem {
	id: string;
	name: string;
	category: string;
	quantity: number;
	unit: string;
	unitPrice: number;
	supplier: string;
	deliveryDate: Date;
	status: string;
}
