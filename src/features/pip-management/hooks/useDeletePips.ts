import { PSYS_API_URL } from '@/config/apiConfig';
import { useMutation } from '@tanstack/react-query';
import type { DeletePipPayload } from '../types/pip-payload';

/**
 * 処理内容：PIPを削除
 */
export const useDeletePips = () => {
	return useMutation({
		mutationFn: async (deletePips: DeletePipPayload) => {
			const response = await fetch(PSYS_API_URL.DeletePIP, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(deletePips),
			});

			if (!response.ok) {
				throw new Error(`削除に失敗しました: ${response.statusText}`);
			}

			return response.json();
		},
	});
};