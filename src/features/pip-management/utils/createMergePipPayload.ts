import type { MergePipsPayload } from '@/features/item-assignment/types/pip-api';

export interface PipInfo {
	code: string;
	nickname: string;
}

export function createMergePipPayload(
	jobNo: string,
	fgCode: string,
	pipNickName: string,
	pips: PipInfo[],
): MergePipsPayload {
	return {
		mergePips: {
			jobNo,
			fgCode,
			pipNickName,
			pips: pips.map((pip) => ({
				pipCode: pip.code,
			})),
		},
	};
}
