import type { Item } from '../../../types/common';

/**
 * ItemTableで使用するためのItem型に変換
 */
type JsonWithResponse = {
	responseJSON: string;
};
export const getItemsForItemTable = (json: JsonWithResponse): Item[] => {
	// responseJSONをパース
	const parsedResponse = JSON.parse(json.responseJSON);

	// itemフィールドをさらにパース
	const rawItems: Item[] = JSON.parse(parsedResponse.item);

	// Item型に変換
	return rawItems.map(
		(item: Item): Item => ({
			itemSurKey: Number(String(item.itemSurKey).trim()),
			jobNo: String(item.jobNo).trim(),
			fg: String(item.fgCode).trim(),
			itemNo: String(item.itemNo).trim(),
			coreItemNo: String(item.itemCoreNo).trim(),
			itemName: String(item.itemName).trim(),
			qty: Number(String(item.itemQty).trim()),
			itemRestQty: Number(String(item.itemRestQty).trim()), // PIP未割当数量
			itemSortKey: Number(String(item.itemSortKey).trim()),
			costElement: String(item.itemCostElement).trim(),
			ibsCode: String(item.itemIBSCode).trim(),
			pipCode: item.itemIsAssign,
			belongsToPip: '',
			pipItemIndex: '',
		}),
	);
};
