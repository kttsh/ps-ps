import { useMutation } from '@tanstack/react-query';
import { PSYS_API_URL } from '@/config/apiConfig';
import type { Item } from '../../../types/common';

type ItemTableDefinition = {
	ItemSurKey?: number | string;
	ItemQty?: number | string;
	Element?: string;
	IBSCode?: string;
};

// 抽出する
function extractItems(
	targetData: Record<string, Partial<Item>>,
): ItemTableDefinition[] {
	return Object.values(targetData).map((item) => {
		return {
			ItemSurKey: item.itemSurKey ?? undefined,
			ItemQty: item.qty ?? '',
			Element: item.costElement ?? '',
			IBSCode: item.ibsCode ?? '',
		};
	});
}

// 購入品管理画面(PIP生成モード)で使用: PIPコードは仮の値を用いる
export const usePipGenerate = () => {
	return useMutation({
		mutationFn: async ({
			userId,
			jobNo,
			fgCode,
			targetData,
			pipNickName,
			selectedQtyMap, // PIPカードエリア 数量テキストボックス操作差分
		}: {
			userId: string;
			jobNo: string;
			fgCode: string;
			targetData: Record<string, Partial<Item>>;
			pipNickName: string;
			selectedQtyMap: Record<string, string>;
		}) => {
			// 必要な要素のみを抽出する
			const item = extractItems(targetData);

			// 1要素目の情報を取得
			let firstElement: string | undefined;
			let firstItemIBSCode: string | undefined;

			if (item.length > 0) {
				firstElement = item[0].Element;
				firstItemIBSCode = item[0].IBSCode;
			}

			// itemとして送る要素を抽出する
			const requestParamItem = item
				.filter(({ ItemSurKey }) => ItemSurKey !== undefined)
				.map(({ ItemSurKey }) => ({
					itemSurKey: Number(ItemSurKey),
					itemQty: Number(selectedQtyMap[String(ItemSurKey)] ?? '1'),
				}));

			try {
				const response = await fetch(
					PSYS_API_URL.GeneratePIP,
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
								pip: [
									{
										sourcePIPCode: '', // 購入品管理画面(PIP生成モード)から呼び出す場合は空文字を指定
										pipCode: '', // 購入品管理画面(PIP生成モード)から呼び出す場合は空文字を指定
										pipNickName: pipNickName,
										element: firstElement,
										ibsCode: firstItemIBSCode,
										item: requestParamItem,
									},
								],
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

