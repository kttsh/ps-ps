import { useMutation } from '@tanstack/react-query';
import { PSYS_API_URL } from '@/config/apiConfig';
import type { MergePipsPayload } from '@/features/item-assignment/types/pip-api';

export const useMergePips = (jobNo: string, fgCode: string | null) => {
	return useMutation({
		mutationFn: async (pips: MergePipsPayload) => {
			const response = await fetch(
				`${PSYS_API_URL.MargePIP}/${jobNo}/${fgCode}`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(pips),
				},
			);

			if (!response.ok) {
				throw new Error(`PIPの統合に失敗しました: ${response.statusText}`);
			}

			return response.json();
		},
	});
};
