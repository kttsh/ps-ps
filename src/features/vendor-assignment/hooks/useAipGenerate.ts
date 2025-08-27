import { useMutation } from '@tanstack/react-query';
import type { Vendor } from '@/types';

export const useAipGenerate = () => {
	return useMutation({
		mutationFn: async ({
			userId,
			jobNo,
			fgCode,
			targetVendors,
			pipCode,
		}: {
			userId: string;
			jobNo: string;
			fgCode: string;
			targetVendors: Vendor[];
			pipCode: string;
		}) => {
			const targetAip = targetVendors.map((vendor) => ({
				pipCode,
				aipPsysVendorId: vendor.aipPsysVendorId,
			}));
			try {
				const response = await fetch(
					'http://testservb.xx.co.jp/GX_PSYS_TEST2/transactions/GenerateAIP',
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
								aip: targetAip,
							}),
						}),
					},
				);

				if (!response.ok) {
					console.log(response.status);
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
