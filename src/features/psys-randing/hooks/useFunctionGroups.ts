import { useQuery } from '@tanstack/react-query';
import { PSYS_API_URL } from '@/config/apiConfig';
import type { FG } from '@/types';
import type { FGsApiResponse } from '@/types/common-api';

export const useFunctionGroups = () => {
	return useQuery<FG[]>({
		queryKey: ['fgs'],
		queryFn: async (): Promise<FG[]> => {
			const response = await fetch(PSYS_API_URL.GetFgs);

			if (!response.ok) {
				throw new Error(`HTTP status: ${response.status}`);
			}

			const data: FGsApiResponse = await response.json();
			return data.fgs;
		},
	});
};