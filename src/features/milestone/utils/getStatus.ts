import { MSR_API_URL } from '../../../config/apiConfig';
import type { PJStatusType } from '../types/milestone';

interface getStatusResult {
    returnStatus: PJStatusType[] | null;
    loading: boolean;
    error: Error | null;
}

/**
 * プロジェクトステータスを取得する非同期関数
 * @param MSRMngCode 
 * @returns 
 */
export async function getStatus(MSRMngCode: string): Promise<getStatusResult> {
    let returnStatus = null; // ステータスデータの初期値
    let loading = true;      // ローディング状態の初期値
    let error = null;        // エラー情報の初期値

    try {
        // APIのURLを管理コードで置換して生成
        const APIUrl = MSR_API_URL.GetPJStatusData.replace('%1', MSRMngCode);

        // APIへGETリクエストを送信
        const response = await fetch(APIUrl, {
            method: 'GET',
            headers: {
                'Cache-Control': 'no-cache', // キャッシュを使用しない
            },
        });

        // レスポンスが正常かどうかをチェック
        if (!response.ok) {
            // 異常な場合はエラーを投げる
            throw new Error(`リクエストエラー: ${response.status}`);
        }

        // レスポンスのJSONデータを取得
        const data = await response.json();

        // ステータスデータを取得
        returnStatus = data.PJStatusData;

    } catch (err) {
        // エラーが発生した場合はエラー情報を格納
        error = err instanceof Error ? err : new Error('不明なエラーが発生しました');
    } finally {
        // 処理が完了したのでローディング状態をfalseに
        loading = false;
    }

    return { returnStatus, loading, error };
}
