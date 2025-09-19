import { useQuery } from '@tanstack/react-query';
import { MSR_API_URL } from '../../../../../../work/splitter2/src/config/apiConfig';
import type { MSRAIPDataType } from '../types/milestone';

interface Argument {
	MSRMngCode: string; // MSR管理コード（APIのパラメータとして使用）
	skipNum: number; // スキップ件数（ページネーションや無限スクロール用）
}

/**
 * MSRのAIPデータを取得するカスタムフック。
 * 指定された MSRMngCode と skipNum に基づいて、AIPデータを API から取得する。
 *
 * @param MSRMngCode - 管理コード（APIのURLに埋め込まれる）
 * @param skipNum - スキップ件数（データのオフセット）
 * @returns React Query の useQuery 結果（data, isLoading, error など）
 */
export const useMSRData = ({ MSRMngCode, skipNum }: Argument) => {
	return useQuery<MSRAIPDataType[]>({
		// キャッシュキー（MSRMngCode と skipNum ごとにキャッシュを分離）
		queryKey: ['MSRData', MSRMngCode, skipNum],

		// データ取得関数（非同期）
		queryFn: async (): Promise<MSRAIPDataType[]> => {
			try {
				// API URL を MSRMngCode と skipNum に置き換えて生成
				const APIUrl = MSR_API_URL.MSRGetAIPData.replace(
					'%1',
					MSRMngCode,
				).replace('%2', skipNum.toString());

				// API 呼び出し
				const response = await fetch(APIUrl);

				// HTTP エラーハンドリング
				if (!response.ok) {
					throw new Error(`HTTP status: ${response.status}`);
				}

				// レスポンスを JSON としてパース
				const data = await response.json();

				// データが存在すれば返却、なければ空配列
				return data.AIPData ?? [];
			} catch (error) {
				// エラー発生時はログ出力し、React Query に伝播
				console.error('Fetch error:', error);
				throw error;
			}
		},

		// MSRMngCode が falsy（空文字など）の場合はクエリを無効化
		enabled: Boolean(MSRMngCode),
	});
};