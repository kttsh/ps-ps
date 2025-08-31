import { useQuery } from '@tanstack/react-query';
import { PSYS_API_URL } from '@/config/apiConfig';

/**
 * APIでFGリストを取得
 */
export const useFunctionGroups = () => {
	return useQuery({
		queryKey: ['fgs'],
		queryFn: async () => {
			try {
				const response = await fetch(
					PSYS_API_URL.GetFg,
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
		staleTime: 5 * 60 * 1000,
		gcTime: 10 * 60 * 1000,
		refetchOnWindowFocus: false,
	});
};
