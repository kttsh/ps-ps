import { useQuery } from '@tanstack/react-query';
import { MSR_API_URL } from '../../../config/apiConfig';
import type { MSRHeaderType } from '../types/milestone';

interface Argument {
	MSRMngCode: string;
}

export function useMSRHeader({ MSRMngCode }: Argument) {
	return useQuery<MSRHeaderType[]>({
		queryKey: ['MSRHeader', MSRMngCode],
		queryFn: async (): Promise<MSRHeaderType[]> => {
			try {
				const APIUrl = MSR_API_URL.MSRGetHeader.replace('%1', MSRMngCode);
				const response = await fetch(APIUrl);
				if (!response.ok) {
					throw new Error(`HTTP status: ${response.status}`);
				}
				const data = await response.json();
				return data.outJson ?? [];
			} catch (error) {
				console.error('Fetch error:', error);
				throw error;
			}
		},
		enabled: Boolean(MSRMngCode),
	});
}