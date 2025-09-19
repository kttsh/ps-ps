import type { Item } from '@/types';
import type { PipPayload } from '../types/pip-api';

export function createPipPayload(
	jobNo: string,
	fgCode: string,
	pipNickName: string,
	committedItems: Item[],
): PipPayload {
	return {
		PipDraft: {
			jobNo,
			fgCode,
			pipNickName,
			items: committedItems.map((item) => ({
				itemSurKey: item.itemSurKey,
				itemAssignQty: item.itemQty ?? 0,
			})),
		},
	};
}