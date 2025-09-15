/**
 * API設定ファイル
 * 環境変数からAPIのベースURLを取得し、各エンドポイントを定義
 */

// 環境変数からベースURLを取得
const MSR_BASE_URL = import.meta.env.VITE_MSR_API_URL;
const PSYS_LEGACY_BASE_URL = import.meta.env.VITE_LEGACY_PSYS_API_URL;
const ITEMS_BASE_URL = import.meta.env.VITE_PSYS_API_URL;
const PSYS_BASE_URL = 'http://localhost:8080';

// MSR API エンドポイント
export const MSR_API_URL = {
	MSRGetHeader: `${MSR_BASE_URL}/GetMilestoneHeader/MSRHeader?MSRMngCode=%1`,
	MSRGetAIPData: `${MSR_BASE_URL}/GetMilestoneData/AIPData?MSRMngCode=%1&SkipNum=%2`,
	SaveDataAll: `${MSR_BASE_URL}/SaveMilestoneData/SaveAll?MilestoneDataJSON`,
	GetPJStatusData: `${MSR_BASE_URL}/GetPJStatusData/PJStatusData?MSRMngCode=%1`,
};

// PSYS API エンドポイント
export const PSYS_API_URL = {
	// base: PSYS_BASE_URL,
	GetItems: `${ITEMS_BASE_URL}/items`,
	GetFg: 'http://localhost:8080/GetFg',
	GetFgs: `${PSYS_LEGACY_BASE_URL}/fgs`,
	GetPIPs: `${PSYS_BASE_URL}/pips`,
	GetPIPDetail: `${PSYS_BASE_URL}/pips-detail`,
	GetVendors: `${PSYS_LEGACY_BASE_URL}/GetVendorList`,
	CreatePIP: `${PSYS_BASE_URL}/pips`,
	EditPIP: `${PSYS_BASE_URL}/pips-edit`,
	CopyPIP: `${PSYS_BASE_URL}/pips-copy`,
	MargePIP: `${PSYS_BASE_URL}/pips-merge`,
	DeletePIP: `${PSYS_BASE_URL}/pips-delete`,
	AttachAIP: (
		jobNo: string,
		fgCode: string | null,
		pipCode: string | undefined,
	) => `${PSYS_BASE_URL}/pips/${jobNo}/${fgCode}/${pipCode}/aips-attach`,
};

export default {
	MSR_API_URL,
	PSYS_API_URL,
};
