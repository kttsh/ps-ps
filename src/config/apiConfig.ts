const BASE_URL = 'http://ztesta/GX_PMSR_TEST1';

export const API_URL = {
  MSRGetHeader: `${BASE_URL}/GetMilestoneHeader/MSRHeader?MSRMngCode=%1`,
  MSRGetAIPData: `${BASE_URL}/GetMilestoneData/AIPData?MSRMngCode=%1&SkipNum=%2`,
  SaveDataAll: `${BASE_URL}/SaveMilestoneData/SaveAll?MilestoneDataJSON`,
  GetPJStatusData:`${BASE_URL}/GetPJStatusData/PJStatusData?MSRMngCode=%1`,
};

export default {
  API_URL,
};

