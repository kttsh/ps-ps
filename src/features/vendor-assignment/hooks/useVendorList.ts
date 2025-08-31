import { useQuery } from '@tanstack/react-query';
import { PSYS_API_URL } from '@/config/apiConfig';

export const useVendorList = (fgCode: string) => {
	return useQuery({
		queryKey: ['vendorList', fgCode],
		queryFn: async () => {
			try {
				const response = await fetch(
					PSYS_API_URL.GetVendorList,
					{
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							'Cache-Control': 'no-cache',
						},
						cache: 'no-store',
						body: JSON.stringify({
							requestJSON: JSON.stringify({
								fgCode: fgCode.charAt(0),
							}),
						}),
					},
				);

				if (!response.ok) {
					throw new Error(`HTTP status: ${response.status}`);
				}
				return await response.json();
			} catch (error) {
				console.error('Fetch error:', error);
				throw error;
			}
		},
		enabled: !!fgCode, // fgCodeがあるときだけ実行
		staleTime: 5 * 60 * 1000,
		gcTime: 10 * 60 * 1000,
		refetchOnWindowFocus: false,
	});
};
