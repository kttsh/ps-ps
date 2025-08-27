import { useMutation } from '@tanstack/react-query';
import type { Item } from '../../../types/common';

type ItemTableDefinition = {
	ItemSurKey?: number | string;
	ItemNo?: string;
	ItemCoreItemNo?: string;
	ItemName?: string;
	ItemQty?: number | string;
	Element?: string;
	ItemIBSCode?: string;
};

// 抽出する
function extractItems(
	updateData: Record<string, Partial<Item>>,
): ItemTableDefinition[] {
	return Object.values(updateData).map((item) => {
		return {
			ItemSurKey: item.itemSurKey ?? undefined,
			ItemNo: item.itemNo ?? '',
			CoreItemNo: item.coreItemNo ?? '',
			ItemName: item.itemName ?? '',
			ItemQty: item.qty ?? 0,
			Element: item.costElement ?? '',
			IBSCode: item.ibsCode ?? '',
		};
	});
}

export const useItemListSave = () => {
	return useMutation({
		mutationFn: async ({
			userId,
			jobNo,
			fgCode,
			updateData,
		}: {
			userId: string;
			jobNo: string;
			fgCode: string;
			updateData: Record<string, Partial<Item>>;
		}) => {
			// 必要な要素のみを抽出する
			const item = extractItems(updateData);

			try {
				const response = await fetch(
					'http://testservb.xx.co.jp/GX_PSYS_TEST2/transactions/SaveItem',
					{
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							'Cache-Control': 'no-cache',
						},
						cache: 'no-store',
						body: JSON.stringify({
							requestJSON: JSON.stringify({
								userId: userId,
								jobNo: jobNo,
								fgCode: fgCode.charAt(0),
								Item: item,
							}),
						}),
					},
				);

				if (!response.ok) {
					console.log(response.status);
					throw new Error(`HTTP status: ${response.status}`);
				}
				return await response.json();
			} catch (error) {
				console.error('Fetch error:', error);
				throw error;
			}
		},
		staleTime: 5 * 60 * 1000,
		gcTime: 10 * 60 * 1000,
		refetchOnWindowFocus: false,
	});
};
