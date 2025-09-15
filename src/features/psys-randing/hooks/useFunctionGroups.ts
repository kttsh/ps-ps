import { useQuery } from '@tanstack/react-query';
import { PSYS_API_URL } from '@/config/apiConfig';
import type { FG } from '@/stores/useFgsStore';

/**
 * APIでFGリストを取得
 */
export const useFunctionGroups = () => {
	return useQuery({
		queryKey: ['fgs'],
		queryFn: async () => {
			try {
				const response = await fetch(PSYS_API_URL.GetFgs);

				if (!response.ok) {
					throw new Error(`HTTP status: ${response.status}`);
				}

				const data = await response.json();
				const fgList: FG[] = data.fgs;

				return fgList;
			} catch (error) {
				console.error('Fetch error:', error);
				throw error;
			}
		},
	});
};
