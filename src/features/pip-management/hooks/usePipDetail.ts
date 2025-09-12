import { PSYS_API_URL } from '@/config/apiConfig';
import type { PipDetailResponse, ResponseInfo } from '@/types/common-api';
import { useQuery } from '@tanstack/react-query';

export type GetPipDetailResponse = {
	pipDetail: PipDetailResponse;
	Messages: ResponseInfo[];
};

/**
 * 処理内容：PIP詳細取得
 */
export const usePipDetail = (
	jobNo: string,
	fgCode: string | null,
	pipCode: string | undefined,
) => {
	return useQuery<GetPipDetailResponse>({
		queryKey: ['pipDetail', jobNo, fgCode, pipCode],
		queryFn: async (): Promise<GetPipDetailResponse> => {
			try {
				const response = await fetch(
					`${PSYS_API_URL.GetPIPDetail}/${jobNo}/${fgCode}/${pipCode}`,
					{
						method: 'GET',
						cache: 'no-store',
					},
				);

				if (!response.ok) {
					throw new Error(`HTTP status: ${response.status}`);
				}
				console.log('PIP詳細取得したよ');
				return await response.json();
			} catch (error) {
				console.error('Fetch error:', error);
				throw error;
			}
		},
		// イベント駆動で実行
		enabled:false
	});
};