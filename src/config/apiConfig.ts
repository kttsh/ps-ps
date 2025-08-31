/**
 * API設定ファイル
 * 環境変数からAPIのベースURLを取得し、各エンドポイントを定義
 */

// 環境変数からベースURLを取得
const MSR_BASE_URL = import.meta.env.VITE_MSR_API_URL;
const PSYS_BASE_URL = import.meta.env.VITE_PSYS_API_URL;

// 環境変数の検証（開発環境でのみ警告）
if (import.meta.env.DEV) {
  if (!import.meta.env.VITE_MSR_API_URL) {
    console.warn('⚠️ 環境変数 VITE_MSR_API_URL が設定されていません。デフォルト値を使用します。');
  }
  if (!import.meta.env.VITE_PSYS_API_URL) {
    console.warn('⚠️ 環境変数 VITE_PSYS_API_URL が設定されていません。デフォルト値を使用します。');
  }
}

// デバッグモードの確認
export const isDebugMode = import.meta.env.VITE_ENABLE_DEBUG === 'true';
export const isMockMode = import.meta.env.VITE_ENABLE_MOCK_API === 'true';

// MSR API エンドポイント（既存の形式を維持）
export const API_URL = {
  MSRGetHeader: `${MSR_BASE_URL}/GetMilestoneHeader/MSRHeader?MSRMngCode=%1`,
  MSRGetAIPData: `${MSR_BASE_URL}/GetMilestoneData/AIPData?MSRMngCode=%1&SkipNum=%2`,
  SaveDataAll: `${MSR_BASE_URL}/SaveMilestoneData/SaveAll?MilestoneDataJSON`,
  GetPJStatusData: `${MSR_BASE_URL}/GetPJStatusData/PJStatusData?MSRMngCode=%1`,
};

// PSYS API エンドポイント（新規追加）
export const PSYS_API_URL = {
  base: PSYS_BASE_URL,
  GetItemList: `${PSYS_BASE_URL}/transactions/GetItemList`,
  GetFg: `${PSYS_BASE_URL}/transactions/GetFg`,
  GetPIPList: `${PSYS_BASE_URL}/transactions/GetPIPList`,
  GetVendorList: `${PSYS_BASE_URL}/transactions/GetVendorList`,
  GeneratePIP: `${PSYS_BASE_URL}/transactions/GeneratePIP`,
  GenerateAIP: `${PSYS_BASE_URL}/transactions/GenerateAIP`,
  DeletePIP: `${PSYS_BASE_URL}/transactions/DeletePIP`,
  DeleteItem: `${PSYS_BASE_URL}/transactions/DeleteItem`,
  SaveItem: `${PSYS_BASE_URL}/transactions/SaveItem`,
};

// 環境情報を取得（デバッグ用）
export const getEnvironmentInfo = () => {
  return {
    msrApiUrl: MSR_BASE_URL,
    psysApiUrl: PSYS_BASE_URL,
    isDebugMode,
    isMockMode,
    appTitle: import.meta.env.VITE_APP_TITLE || 'PS-PS System',
    locale: import.meta.env.VITE_DEFAULT_LOCALE || 'ja',
  };
};

// 開発環境でのみ環境情報をログ出力
if (import.meta.env.DEV && isDebugMode) {
  console.info('🔧 Environment Configuration:', getEnvironmentInfo());
}

export default {
  API_URL,
  PSYS_API_URL,
};

