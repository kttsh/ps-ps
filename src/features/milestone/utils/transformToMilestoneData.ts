import type { MSRAIPDataType } from '../types/milestone';

// MilestoneItem型の定義（現在のanyを改善）
export interface MilestoneItem {
	PIPNo: string;
	PIPName: string;
	JobNo: string;
	FG: string;
	AIPNo: string;
	VendorName: string;
	VendorCode: string;
	Country: string;
	BuyerName: string;
	Status: string;
	FGName: string;
	KPinFG: string;
	Shore: string;
	ReqNo: string;
	[key: string]: string | number | Date | undefined; // 動的に追加されるプロパティ用
}

/**
 * MSRAIPListをMilestoneDataに変換する関数
 */
export function transformToMilestoneData(
	aipData: MSRAIPDataType[],
): MilestoneItem[] {
	// データ変換処理
	return aipData.flatMap((aipItem) => {
		return (aipItem.AIP || []).map((aipListItem) => {
			const milestoneItem: MilestoneItem = {
				PIPNo: aipItem.PIPNo,
				PIPName: aipItem.PIPName,
				JobNo: aipItem.JobNo,
				FG: aipItem.FG,
				AIPNo: aipListItem.AIPNo,
				VendorName: aipListItem.VendorName,
				VendorCode: aipListItem.VendorCode,
				Country:
					aipListItem.CountryCode.toLowerCase() + aipListItem.CountryName,
				BuyerName: aipListItem.BuyerName,
				Status: aipListItem.Status,
				FGName: aipListItem.FGName,
				KPinFG: aipListItem.KPinFG,
				Shore: aipListItem.Shore,
				ReqNo: aipListItem.ReqNo,
			};

			// 成果物設定
			(aipListItem.Deliverable || []).forEach((deliverableItem) => {
				(deliverableItem.Property || []).forEach((propertyItem) => {
					// キー生成
					const deliverableKey = `${deliverableItem.ID}_${deliverableItem.TaskID}_${propertyItem.Type}_${propertyItem.ID}`;
					// タイプに応じた値の設定
					switch (propertyItem.Type) {
						case 'INT':
							milestoneItem[deliverableKey] = Number(propertyItem.Value);
							break;
						case 'FLOAT':
							milestoneItem[deliverableKey] = Number(propertyItem.Value);
							break;
						case 'TEXT':
						case 'UNIT':
						case 'DATE':
							// milestoneItem[deliverableKey] = propertyItem.Value.replace(/\//g, "-");
							break;
						case 'DATETIME':
							milestoneItem[deliverableKey] = propertyItem.Value;
							break;
					}
				});
			});

			// タスク追跡設定
			(aipListItem.TaskTracking || []).forEach((taskTrackingItem) => {
				const taskDateKey = `${taskTrackingItem.ID}_${taskTrackingItem.DateType}`;
				// milestoneItem[taskDateKey] = new Date(taskTrackingItem.Date);
				milestoneItem[taskDateKey] = taskTrackingItem.Date;
			});
			return milestoneItem;
		});
	}); // 2次元配列を1次元配列に変換
}
