import { PSYS_API_URL } from '@/config/apiConfig';
import type { PipPayload } from '@/features/item-assignment/types/pip-api';
import { useMutation } from '@tanstack/react-query';

export const useCopyPipItems = (
    jobNo: string,
	fgCode: string | null,
	pipCode: string | undefined,
) => {
    return useMutation({
        mutationFn: async (pipItems: PipPayload) => {
            const response = await fetch(`${PSYS_API_URL.CopyPIP}/${jobNo}/${fgCode}/${pipCode}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(pipItems),
            });

            if (!response.ok) {
                throw new Error(`複製に失敗しました: ${response.statusText}`);
            }

            return response.json();
        },
    });
};