import type { Pip } from '@/types';
import type { PipResponse } from '@/types/common-api';

/**
 * PipResponseリストをPip型に整形
 * @param pipsResponse - APIから取得した PipResponse配列
 * @returns Pip型に整形されたオブジェクト
 */
export function transformPipsResponseToPips(
	pipsResponse: PipResponse[],
): Pip[] {
	const pips: Pip[] = pipsResponse.map((pipResponse): Pip => {
		return {
			...pipResponse,
			itemCount: Number(pipResponse.itemCount),
			vendorCount: Number(pipResponse.vendorCount),
		};
	});

	return pips;
}
