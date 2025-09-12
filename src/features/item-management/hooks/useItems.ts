import { PSYS_API_URL } from '@/config/apiConfig';
import type { ItemResponse, ResponseInfo } from '@/types/common-api';
import { useQuery } from '@tanstack/react-query';

export interface GetItemsResponse {
	items: ItemResponse[];
	Messages?: ResponseInfo[];
}

/**
 * APIで購入品リストを取得するhook
 * jobNo: Job番号
 * fgCode: Function Groupコード
 */
export const useItems = (jobNo: string, fgCode: string | null) => {
	return useQuery<GetItemsResponse>({
		queryKey: ['items', jobNo, fgCode],
		queryFn: async (): Promise<GetItemsResponse> => {
			try {
				const response = await fetch(
					`${PSYS_API_URL.GetItems}/${jobNo}/${fgCode}`,
					{
						method: 'GET',
						cache: 'no-store',
					},
				);

				if (!response.ok) {
					throw new Error(`HTTP status: ${response.status}`);
				}
				console.log('購入品取得したよ');
				return await response.json();
			} catch (error) {
				console.error('Fetch error:', error);
				throw error;
			}
		},
		// イベント駆動で実行
		enabled: false
	});
};