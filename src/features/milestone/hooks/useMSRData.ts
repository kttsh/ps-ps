import { useQuery } from '@tanstack/react-query';
import { MSR_API_URL } from '../../../config/apiConfig';
import type { MSRAIPDataType } from '../types/milestone';

interface Argument {
	MSRMngCode: string;
	skipNum: number;
}

export const useMSRData = ({ MSRMngCode, skipNum }: Argument) => {
	return useQuery<MSRAIPDataType[]>({
		queryKey: ['MSRData', MSRMngCode, skipNum],
		queryFn: async (): Promise<MSRAIPDataType[]> => {
			try {
				const APIUrl = MSR_API_URL.MSRGetAIPData.replace(
					'%1',
					MSRMngCode,
				).replace('%2', skipNum.toString());
				const response = await fetch(APIUrl);
				if (!response.ok) {
					throw new Error(`HTTP status: ${response.status}`);
				}
				const data = await response.json();
				return data.AIPData ?? [];
			} catch (error) {
				console.error('Fetch error:', error);
				throw error;
			}
		},
		enabled: Boolean(MSRMngCode),
		staleTime: 5 * 60 * 1000,
		gcTime: 10 * 60 * 1000,
		refetchOnWindowFocus: false,
	});
};