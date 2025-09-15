import type { PipDetail } from '@/types';
import type { PipDetailResponse } from '@/types/common-api';

/**
 * APIから取得したPipResponseリストをItem型に整形
 * @param PipDetailResponse : APIから取得したPIP詳細データ
 * @returns PipDetail型に整形したリスト
 */
export function transformPipDetailResponseToPipDetail(
	PipDetailData: PipDetailResponse,
): PipDetail {
	return {
		...PipDetailData, // Pip の基本プロパティを展開
		itemCount: Number(PipDetailData?.itemCount),
		vendorCount: Number(PipDetailData?.vendorCount),
		items:
			Array.isArray(PipDetailData?.items) &&
				PipDetailData.items.length > 0 &&
				PipDetailData.items[0].itemSurKey.trim() !== ''
				? PipDetailData.items.map((item) => {
					const itemQty = Number(item.itemQty ?? '0');
					const itemAssignedQty = Number(item.itemAssignQty ?? '0');
					// APIから提供される未割当数量を直接使用
					const itemUnassignedQty = Number(item.itemUnassignedQty ?? '0');

					return {
						...item,
						itemSurKey: Number(item.itemSurKey.trim()),
						itemQty,
						itemAssignedQty,
						itemUnassignedQty,
						itemSortKey: Number(item.itemSortKey),
						itemIBSCode: item.itemIbsCode ? item.itemIbsCode.trim() : '',
					};
				})
				: [],
		vendors:
			Array.isArray(PipDetailData?.aips) &&
				PipDetailData.aips.length > 0 &&
				PipDetailData.aips[0].aipCode.trim() !== ''
				? PipDetailData.aips.map((aip) => ({
					vendorId: aip.vendorId,
					vendorNumber: undefined,
					vendorName: aip.vendorName,
					aipCode: aip.vendorId,
					function: undefined,
				}))
				: [],
	};
}
