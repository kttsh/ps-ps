import { useMutation } from '@tanstack/react-query';
import { PSYS_API_URL } from '@/config/apiConfig';

interface AipPayload {
	vendorIds: string[];
}

export const useUpdateAip = (
	jobNo: string,
	fgCode: string | null,
	pipCode: string | undefined,
) => {
	return useMutation({
		mutationFn: async (vendorIds: string[]) => {
			const payload: AipPayload = { vendorIds };
			const response = await fetch(
				PSYS_API_URL.AttachAIP(jobNo, fgCode, pipCode),
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(payload),
				},
			);

			if (!response.ok) {
				throw new Error(`AIP更新に失敗しました: ${response.statusText}`);
			}

			return response.json();
		},
	});
};