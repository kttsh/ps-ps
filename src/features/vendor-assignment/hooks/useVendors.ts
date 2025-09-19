import { useQuery } from '@tanstack/react-query';
import { PSYS_API_URL } from '@/config/apiConfig';
import type { VendorResponse, VendorsApiResponse } from '@/types/common-api';

export const useVendors = (fgCode: string | null) => {
	return useQuery<VendorResponse[]>({
		queryKey: ['vendors', fgCode],
		queryFn: async (): Promise<VendorResponse[]> => {
			if (!fgCode) throw new Error('fgCode is required');

			const response = await fetch(PSYS_API_URL.GetVendors(fgCode), {
				method: 'GET',
				headers: {
					'Cache-Control': 'no-cache',
				},
				cache: 'no-store',
			});

			if (!response.ok) {
				throw new Error(`HTTP status: ${response.status}`);
			}

			const data: VendorsApiResponse = await response.json();
			return data.vendors;
		},
		enabled: !!fgCode,
	});
};