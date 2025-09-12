import { PSYS_API_URL } from '@/config/apiConfig';
import type { PipResponse } from '@/types/common-api';
import { useQuery } from '@tanstack/react-query';

export type PipsResponse = {
	pipsList: PipResponse[];
};

/**
 * APIでPIPリストを取得するhook
 * jobNo: Job番号
 * fgCode: Function Groupコード
 */
export const usePips = (jobNo: string, fgCode: string | null) => {
	return useQuery<PipsResponse>({
		queryKey: ['pip', jobNo, fgCode],
		queryFn: async (): Promise<PipsResponse> => {
			try {
				const response = await fetch(
					`${PSYS_API_URL.GetPIPs}/${jobNo}/${fgCode}`,
					{
						method: 'GET',
						cache: 'no-store',
					},
				);

				if (!response.ok) {
					throw new Error(`HTTP status: ${response.status}`);
				}
				console.log('PIPリスト取得したよ');
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