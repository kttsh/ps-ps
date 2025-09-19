import type { DeletePipsPayload } from '@/features/item-assignment/types/pip-api';

export interface PipInfo {
	code: string;
	nickname: string;
}

export function createDeletePipPayload(
	jobNo: string,
	fgCode: string,
	pips: PipInfo[],
): DeletePipsPayload {
	return {
		deletePips: {
			jobNo,
			fgCode,
			pips: pips.map((pip) => ({
				pipCode: pip.code,
			})),
		},
	};
}