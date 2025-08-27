import { useMutation } from '@tanstack/react-query';
import type { Item } from '../../../types/common';

type ItemTableDefinition = {
	ItemSurKey?: number | string;
};

// 抽出する
function extractItems(
	deleteData: Record<string, Partial<Item>>,
): ItemTableDefinition[] {
	return Object.values(deleteData).map((item) => {
		return {
			ItemSurKey: item.itemSurKey ?? undefined,
		};
	});
}

export const useItemListDelete = () => {
	return useMutation({
		mutationFn: async ({
			userId,
			jobNo,
			fgCode,
			deleteData,
		}: {
			userId: string;
			jobNo: string;
			fgCode: string;
			deleteData: Record<string, Partial<Item>>;
		}) => {
			// 必要な要素のみを抽出する
			const item = extractItems(deleteData);

			try {
				const response = await fetch(
					'http://testservb.xx.co.jp/GX_PSYS_TEST2/transactions/DeleteItem',
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

				// レスポンスの中身をチェックしてアラート表示
				const resultPreview = await response.json();
				if (
					resultPreview?.statusCode === '404' &&
					resultPreview?.statusMessage ===
						'PIPに割当済みの購入品は削除できません。'
				) {
					console.log('PIPに割当済みの購入品は削除できません。');
					throw new Error(resultPreview.statusMessage);
				}

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
