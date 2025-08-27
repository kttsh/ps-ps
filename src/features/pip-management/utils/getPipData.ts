import type { Item, PipData, Vendor } from '../../../types/common';

/**
 * APIレスポンスを、PIPItem型に変換
 */
export const getPipData = (apiResponse: any): PipData => {
	let pipArray: any[] = [];

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

	const pips = pipArray.map((pipEntry: any) => {
		let items: Item[] = [];
		let vendors: Vendor[] = [];

		try {
			const itemArray =
				typeof pipEntry.item === 'string'
					? JSON.parse(pipEntry.item)
					: pipEntry.item;

			items = (itemArray || []).map((item: any, index: number) => ({
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

			vendors = (aipArray || []).map((vendor: any) => ({
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
