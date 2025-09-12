import type { DeletePipPayload } from '../types/pip-payload';

export function convertPipSelectionToPayload(
	pipSelection: Record<string, boolean>,
	userId: string,
	jobNo: string,
	fgCode: string,
): DeletePipPayload {
	const selectedPips = Object.entries(pipSelection)
		.filter(([_, isSelected]) => isSelected)
		.map(([sourcePIPCode]) => ({ sourcePIPCode }));

	return {
		userId,
		jobNo,
		fgCode,
		pip: selectedPips,
	};
}
