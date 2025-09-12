import { MSR_API_URL } from '../../../config/apiConfig';
import type { PJStatusType } from '../types/milestone';

// 戻り値の型
interface getStatusResult {
	returnStatus: PJStatusType[] | null;
	loading: boolean;
	error: Error | null;
}

export async function getStatus(MSRMngCode: string): Promise<getStatusResult> {
	let returnStatus = null;
	let loading = true;
	let error = null;

	try {
		const APIUrl = MSR_API_URL.GetPJStatusData.replace('%1', MSRMngCode);
		// リクエスト実行
		const response = await fetch(APIUrl, {
			method: 'GET',
			headers: {
				'Cache-Control': 'no-cache',
			},
		});
		// レスポンス処理
		// まずはレスポンスが正常かチェック、異常時はエラースロー
		if (!response.ok) {
			throw new Error(`リクエストエラー: ${response.status}`);
		}
		const data = await response.json();
		returnStatus = data.PJStatusData;
		// }
	} catch (err) {
		error =
			err instanceof Error ? err : new Error('不明なエラーが発生しました');
	} finally {
		loading = false;
	}
	return { returnStatus, loading, error };
}
