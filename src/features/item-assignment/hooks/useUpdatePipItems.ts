import { useMutation } from '@tanstack/react-query';
import { PSYS_API_URL } from '@/config/apiConfig';
import type { PipPayload } from '../types/pip-api';

export const useUpdatePipItems = (
	jobNo: string,
	fgCode: string | null,
	pipCode: string | undefined,
) => {
	return useMutation({
		mutationFn: async (pipItems: PipPayload) => {
			const response = await fetch(
				`${PSYS_API_URL.EditPIP}/${jobNo}/${fgCode}/${pipCode}`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(pipItems),
				},
			);

			if (!response.ok) {
				throw new Error(`更新に失敗しました: ${response.statusText}`);
			}

			return response.json();
		},
	});
};