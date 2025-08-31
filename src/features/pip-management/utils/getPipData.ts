import type { Item, PipData, Vendor } from '../../../types/common';
import type { Aip, PipItem } from '../types/pip-response';

// API Response structure for getPipData
interface PipApiResponse {
	pip: string | PipEntry[];
}

interface PipEntry {
	jobNo: string;
	fgCode: string;
	pipCode: string;
	pipNickName: string;
	item: string | PipItem[];
	aip: string | Aip[];
}

/**
 * APIレスポンスを、PIPItem型に変換
 */
export const getPipData = (apiResponse: PipApiResponse): PipData => {
	let pipArray: PipEntry[] = [];

	try {
		// pip が JSON文字列の場合はパースする
		pipArray =
			typeof apiResponse.pip === 'string'
				? JSON.parse(apiResponse.pip)
				: apiResponse.pip;
	} catch (e) {
		console.error('PIPデータのパースに失敗しました:', e);
		return { pips: [] };
	}

	const pips = pipArray.map((pipEntry: PipEntry) => {
		let items: Item[] = [];
		let vendors: Vendor[] = [];

		try {
			const itemArray =
				typeof pipEntry.item === 'string'
					? JSON.parse(pipEntry.item)
					: pipEntry.item;

			items = (itemArray || []).map((item: PipItem, index: number) => ({
				itemNo: item.pipItemNo || '',
				coreItemNo: item.pipCoreItemNo || '',
				itemName: item.pipItemName || '',
				qty: Number(item.pipItemQty) || 0,
				costElement: item.pipElement || '',
				ibsCode: item.pipIBSCode || '',
				pipCode: pipEntry.pipCode || '',
				jobNo: pipEntry.jobNo || '',
				fg: pipEntry.fgCode || '',
				belongsToPip: pipEntry.pipCode || '',
				pipItemIndex: index,
			}));
		} catch (e) {
			console.warn('item のパースに失敗:', e);
		}

		try {
			const aipArray =
				typeof pipEntry.aip === 'string'
					? JSON.parse(pipEntry.aip)
					: pipEntry.aip;

			vendors = (aipArray || []).map((vendor: Aip) => ({
				aipCode: vendor.aipCode || '',
				id: vendor.aipPsysVendorId || '',
				name: vendor.vendorName || '',
				code: vendor.vendorCode || '',
			}));
		} catch (e) {
			console.warn('aip のパースに失敗:', e);
		}

		return {
			code: pipEntry.pipCode || '',
			nickname: pipEntry.pipNickName || '',
			items,
			vendors,
		};
	});

	return { pips };
};

