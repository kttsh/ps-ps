import type { Item, Pip, PipData, Vendor } from "@/types";
import type { Aip, PipItem, PipResponse } from "../types/pip-response";

/**
 * PipResponseリストを PipData 型に整形
 * @param pipResponseList - APIから取得した PipResponse 配列
 * @returns PipData 型（pips: Pip[]）に整形されたオブジェクト
 */
export function transformPipResponseToPipData(pipResponseList: PipResponse[]): PipData {
  const pips: Pip[] = pipResponseList.map((pipResponse): Pip => {
    // item と aip が JSON文字列の場合はパースする
    const parsedItems = typeof pipResponse.item === "string"
      ? JSON.parse(pipResponse.item)
      : pipResponse.item;

    const parsedAips = typeof pipResponse.aip === "string"
      ? JSON.parse(pipResponse.aip)
      : pipResponse.aip;

    const items: Item[] = parsedItems.map((item: PipItem, index: number) => ({
      itemNo: item.pipItemNo,
      coreItemNo: item.pipCoreItemNo,
      itemName: item.pipItemName,
      qty: Number.parseFloat(item.pipItemQty.trim()),
      costElement: item.pipElement,
      ibsCode: item.pipIBSCode,
      jobNo: pipResponse.jobNo,
      pipCode: pipResponse.pipCode,
      belongsToPip: pipResponse.pipCode,
      pipItemIndex: index,
      itemRestQty: Number.parseFloat(item.pipItemQty.trim()),
    }));

    const vendors: Vendor[] = parsedAips.map((aip: Aip) => ({
      id: aip.aipCode,
      name: aip.vendorName,
      code: aip.vendorCode.trim(),
    }));

    return {
      code: pipResponse.pipCode,
      nickname: pipResponse.pipNickName,
      items,
      vendors,
    };
  });

  return { pips };
}
