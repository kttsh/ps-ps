import { useMutation } from '@tanstack/react-query';
import { PSYS_API_URL } from '@/config/apiConfig';
import type { PipPayload } from '../types/pip-api';

export const useCreatePip = () => {
	return useMutation({
		mutationFn: async (pipItems: PipPayload) => {
			const response = await fetch(PSYS_API_URL.CreatePIP, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(pipItems),
			});

			if (!response.ok) {
				throw new Error(`登録に失敗しました: ${response.statusText}`);
			}

			return response.json();
		},
	});
};
