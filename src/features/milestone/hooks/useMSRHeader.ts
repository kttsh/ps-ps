import { useQuery } from '@tanstack/react-query';
import { MSR_API_URL } from '../../../../../../work/splitter2/src/config/apiConfig';
import type { MSRHeaderType } from '../types/milestone';

interface Argument {
	MSRMngCode: string; // MSR管理コード（APIのパラメータとして使用）
}

/**
 * MSRヘッダー情報を取得するカスタムフック。
 * 指定された MSRMngCode に基づいて、MSRヘッダー一覧を API から取得する。
 *
 * @param MSRMngCode - 管理コード（APIのURLに埋め込まれる）
 * @returns React Query の useQuery 結果（data, isLoading, error など）
 */
export function useMSRHeader({ MSRMngCode }: Argument) {
	return useQuery<MSRHeaderType[]>({
		// キャッシュキー（MSRMngCode ごとにキャッシュを分離）
		queryKey: ['MSRHeader', MSRMngCode],

		// データ取得関数（非同期）
		queryFn: async (): Promise<MSRHeaderType[]> => {
			try {
				// API URL を MSRMngCode に置き換えて生成
				const APIUrl = MSR_API_URL.MSRGetHeader.replace('%1', MSRMngCode);

				// API 呼び出し
				const response = await fetch(APIUrl);

				// HTTP エラーハンドリング
				if (!response.ok) {
					throw new Error(`HTTP status: ${response.status}`);
				}

				// レスポンスを JSON としてパース
				const data = await response.json();

				// データが存在すれば返却、なければ空配列
				return data.outJson ?? [];
			} catch (error) {
				// エラー発生時はログ出力し、React Query に伝播
				console.error('Fetch error:', error);
				throw error;
			}
		},

		// MSRMngCode が falsy（空文字など）の場合はクエリを無効化
		enabled: Boolean(MSRMngCode),
	});
}