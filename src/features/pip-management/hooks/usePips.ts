import { useQuery } from '@tanstack/react-query';
import type { PipResponse } from '../types/pip-response';

/**
 * PIPリスト取得APIを呼び出す
 */
export const usePips = (jobNo: string, fgCode: string | null) => {
	return useQuery<PipResponse[]>({
		queryKey: ['pip', jobNo, fgCode],
		queryFn: async (): Promise<PipResponse[]> => {
			try {
				const response = await fetch(
					'http://testservb.xx.co.jp/GX_PSYS_TEST2/transactions/GetPIPList',
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

				console.warn(
					`Status Code: ${parsedResponse?.statusCode} Message: ${parsedResponse?.statusMessage}`,
				);

				if (!parsedResponse?.pip) {
					throw new Error('parsedResponse.pip is undefined');
				}

				const pipList = JSON.parse(parsedResponse.pip);

				if (!Array.isArray(pipList)) {
					throw new Error('parsed pipList is not an array');
				}

				return pipList;
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

