import { useQuery } from '@tanstack/react-query';
import { PSYS_API_URL } from '@/config/apiConfig';
import type { VendorResponse } from '@/types/common-api';

export const useVendors = (fgCode: string | null) => {
	return useQuery<VendorResponse[]>({
		queryKey: ['vendors', fgCode],
		queryFn: async (): Promise<VendorResponse[]> => {
			try {
				const response = await fetch(PSYS_API_URL.GetVendors, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						'Cache-Control': 'no-cache',
					},
					cache: 'no-store',
					body: JSON.stringify({
						requestJSON: JSON.stringify({
							fgCode: fgCode?.charAt(0),
						}),
					}),
				});

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

				if (!parsedResponse?.vendor) {
					throw new Error('parsedResponse.vendor is undefined');
				}

				const vendorList = JSON.parse(parsedResponse.vendor);

				if (!Array.isArray(vendorList)) {
					throw new Error('parsed vendorList is not an array');
				}

				return vendorList;
			} catch (error) {
				console.error('Fetch error:', error);
				throw error;
			}
		},
		enabled: !!fgCode,
	});
};