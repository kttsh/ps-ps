import type { ResponseInfo } from '@/types/common-api';

interface PipDraftItem {
	itemSurKey: number;
	itemAssignQty: number;
}

export interface PipPayload {
	PipDraft: {
		jobNo: string;
		fgCode: string;
		pipNickName: string;
		items: PipDraftItem[];
	};
}

export interface MergePipsPayload {
	mergePips: {
		jobNo: string;
		fgCode: string;
		pipNickName: string;
		pips: { pipCode: string }[];
	};
}

export interface DeletePipsPayload {
	deletePips: {
		jobNo: string;
		fgCode: string;
		pips: { pipCode: string }[];
	};
}

interface PipItem {
	itemSurKey: string;
	itemName: string;
	itemAssignQty: string;
	itemSortkey: string;
	itemCostElement: string;
	itemIBSCode: string;
}

export interface PipResponse {
	pip: {
		jobNo: string;
		fgCode: string;
		pipCode: string;
		pipNickName: string;
		items: PipItem[];
	};
	Messages: ResponseInfo[];
}
