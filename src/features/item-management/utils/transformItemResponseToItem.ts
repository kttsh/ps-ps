import type { Item } from "@/types";
import type { ItemResponse } from "../types/item-response";

/**
 * APIから取得したItemResponseリストをItem型に整形
 * @param itemDataList : APIから取得したItemリスト
 * @returns Item型に整形したリスト
 */
export function transformItemResponseToItem(itemDataList: ItemResponse[]): Item[] {
  return itemDataList.map((item) => ({
    itemSurKey: Number(item.itemSurKey.trim()), // 数値変換
    jobNo: item.jobNo.trim(),
    fg: item.fgCode.trim(),
    itemNo: item.itemNo.trim(),
    coreItemNo: item.itemCoreNo.trim(),
    itemName: item.itemName.trim(),
    qty: Number(item.itemQty.trim()),
    itemRestQty: Number(item.itemRestQty.trim()),
    itemSortKey: Number(item.ItemSortKey.trim()),
    costElement: item.itemCostElement.trim(),
    ibsCode: item.itemIBSCode.trim(),
    pipCode: undefined,
    belongsToPip: undefined,
    pipItemIndex: undefined,
	itemAssignmentStatus: item.itemIsAssign.trim()
  }));
}
