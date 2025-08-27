import { useQuery } from '@tanstack/react-query';

/**
 * APIで購入品リストを取得
 */
export const useItems = (jobNo: string, fgCode: string) => {
	return useQuery({
		queryKey: ['items', jobNo, fgCode],
		queryFn: async () => {
			try {
				const response = await fetch(
					'http://testservb.xx.co.jp/GX_PSYS_TEST2/transactions/GetItemList',
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
								fgCode: fgCode.charAt(0),
							}),
						}),
					},
				);

				if (!response.ok) {
					throw new Error(`HTTP status: ${response.status}`);
				}
				if (response.status === 400) {
					throw new Error(`HTTP status: ${response.status}`);
				}
				if (response.status === 404) {
					throw new Error(`HTTP status: ${response.status}`);
				}
				if (response.status === 500) {
					throw new Error(`HTTP status: ${response.status}`);
				}

				return await response.json();
			} catch (error) {
				console.error('Fetch error:', error);
				throw error;
			}
		},
		//enabled: !!jobNo && !!fgCode, // jobNoとfgCodeが両方あるときだけ実行
		enabled: false, // enabledの条件はuseEffectの依存配列と同様: 初期フェッチを無効にする
		staleTime: 5 * 60 * 1000,
		gcTime: 10 * 60 * 1000,
		refetchOnWindowFocus: false,
	});
};
