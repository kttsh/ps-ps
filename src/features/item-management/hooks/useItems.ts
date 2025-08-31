import { useQuery } from '@tanstack/react-query';
import { PSYS_API_URL } from '@/config/apiConfig';
import type { ItemResponse } from '../types/item-response';

/**
 * APIで購入品リストを取得
 */
export const useItems = (jobNo: string, fgCode: string | null) => {
    return useQuery<ItemResponse[]>({
        queryKey: ['items', jobNo, fgCode],
        queryFn: async (): Promise<ItemResponse[]> => {
            try {
                const response = await fetch(
                    PSYS_API_URL.GetItemList,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Cache-Control': 'no-cache',
                        },
                        cache: 'no-store',
                        body: JSON.stringify({
                            requestJSON: JSON.stringify({
                                jobNo: jobNo,
                                fgCode: fgCode?.charAt(0),
                            }),
                        }),
                    },
                );

                if (!response.ok) {
                    throw new Error(`HTTP status: ${response.status}`);
                }

                const data = await response.json();

                if (!data?.responseJSON) {
                    throw new Error('responseJSON is undefined');
                }

                const parsedResponse = JSON.parse(data.responseJSON);

                if (!parsedResponse?.item) {
                    throw new Error('parsedResponse.item is undefined');
                }

                const itemList: ItemResponse[] = JSON.parse(parsedResponse.item);

                if (!Array.isArray(itemList)) {
                    throw new Error('parsed itemList is not an array');
                }

                return itemList;

            } catch (error) {
                console.error('Fetch error:', error);
                throw error;
            }
        },
        enabled: jobNo !== '' && !!fgCode, // jobNoとfgCodeが両方あるときだけ実行
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
        refetchOnWindowFocus: false,
    });
};