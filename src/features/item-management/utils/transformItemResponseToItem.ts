import type { Item } from '@/types';
import type { ItemResponse } from '@/types/common-api';

/**
 * APIから取得したItemResponseリストをItem型に整形
 * @param itemDataList : APIから取得したItemリスト
 * @returns Item型に整形したリスト
 */
export function transformItemResponseToItem(
	itemDataList: ItemResponse[],
): Item[] {
	return itemDataList.map((item) => ({
		...item,
		itemSurKey: Number(item.itemSurKey.trim()),
		itemQty: Number(item.itemQty),
		itemAssignedQty: Number(item.itemAssignedQty || item.itemAssignQty || 0),
		itemUnassignedQty: Math.max(
			0,
			Number(item.itemQty || 0) - Number(item.itemAssignedQty || item.itemAssignQty || 0),
		),
		itemSortKey: Number(item.itemSortKey || 0),
		itemIBSCode: item.itemIBSCode || item.itemIbsCode || '',
		itemCostElement: item.itemCostElement || '',
	}));
}