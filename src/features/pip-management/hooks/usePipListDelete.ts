import { useMutation } from '@tanstack/react-query';
import type { PipData } from '@/types';

type PipTableDefinition = {
	code?: number | string;
};

// 抽出する
function extractItems(
	deleteData: Record<string, Partial<PipData>>,
): PipTableDefinition[] {
	return Object.values(deleteData).map((pip) => {
		return {
			// sourcePIPCodeとして、codeを指定する(画面上のPIPコード)
			sourcePIPCode: pip.code ?? undefined,
		};
	});
}

export const usePipListDelete = () => {
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
			deleteData: Record<string, Partial<PipData>>;
		}) => {
			// 必要な要素のみを抽出する
			const pip = extractItems(deleteData);

			try {
				const response = await fetch(
					'http://testservb.xx.co.jp/GX_PSYS_TEST2/transactions/DeletePIP',
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
								pip: pip,
							}),
						}),
					},
				);

				if (!response.ok) {
					console.log(response.status);
					throw new Error(`HTTP status: ${response.status}`);
				}
				const json = await response.json();
				return JSON.parse(json.responseJSON);
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
