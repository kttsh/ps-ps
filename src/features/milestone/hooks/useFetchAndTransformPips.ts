import { useEffect } from 'react';
import { usePips } from '@/features/pip-management/hooks/usePips';
import { transformPipsResponseToPips } from '@/features/pip-management/utils/transformPipsResponseToPips';
import { usePipsStore } from '@/stores/usePipsStore';

export const useFetchAndTransformPips = (
	selectedJobNo: string,
	selectedFG: any | null,
) => {
	const { setPipsData } = usePipsStore();

	const shouldFetch = selectedJobNo !== '' && selectedFG?.fgCode !== null;
	const { data: pipsResponse } = usePips(
		shouldFetch ? selectedJobNo : '',
		shouldFetch ? (selectedFG?.fgCode ?? null) : null,
	);

	useEffect(() => {
		if (pipsResponse) {
			const transformedPips = transformPipsResponseToPips(
				pipsResponse.pipsList,
			);
			setPipsData(transformedPips);
		}
	}, [pipsResponse, setPipsData]);

	return { pipsResponse };
};