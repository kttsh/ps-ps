import { useMutation } from '@tanstack/react-query';
import { PSYS_API_URL } from '@/config/apiConfig';
import type { DeletePipsPayload } from '@/features/item-assignment/types/pip-api';

/**
 * 処理内容：PIPを削除
 */
export const useDeletePips = (jobNo: string, fgCode: string | null) => {
	return useMutation({
		mutationFn: async (deletePips: DeletePipsPayload) => {
			const response = await fetch(
				`${PSYS_API_URL.DeletePIP}/${jobNo}/${fgCode}`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(deletePips),
				},
			);

			if (!response.ok) {
				throw new Error(`削除に失敗しました: ${response.statusText}`);
			}

			return response.json();
		},
	});
};
