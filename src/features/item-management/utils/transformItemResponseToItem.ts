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
		itemAssignedQty: Number(item.itemAssignedQty),
		// APIから提供される未割当数量を直接使用
		itemUnassignedQty: Number(item.itemUnassignedQty || 0),
		itemSortKey: Number(item.itemSortKey),
		itemIBSCode: item.itemIBSCode ? item.itemIBSCode.trim() : '',
	}));
}