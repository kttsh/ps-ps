import { MSR_API_URL } from '../../../../../../work/splitter2/src/config/apiConfig'; // APIのURL設定をインポート
import { formatJSON } from './formatJSON';

// 関数の戻り値の型定義
interface saveMilestoneResult {
	returnMessage: string | null; // APIから返されたメッセージ
	loading: boolean; // ローディング状態
	error: Error | null; // エラー情報
}

/**
 * マイルストーンデータをAPIに保存する非同期関数
 * @param tableData - 保存対象のテーブルデータ（JSON文字列）
 * @returns saveMilestoneResult - 保存結果（メッセージ、ローディング状態、エラー）
 */
export async function saveMilestoneRow(
	tableData: string,
): Promise<saveMilestoneResult> {
	// 初期値の設定
	let returnMessage = null;
	let loading = true; // データ送信中を示す
	let error = null; // エラー情報を格納

	// 入力が空の場合はエラーを返す
	if (!tableData) {
		returnMessage = '入力値が空です。';
		error = new Error('入力値が空です。');
		loading = false;
	} else {
		try {
			// JSON整形関数でデータを整形
			const formattedData = formatJSON(tableData);

			// APIのURLを取得
			const APIUrl = MSR_API_URL.SaveDataAll;

			// fetchでPOSTリクエストを送信
			const response = await fetch(APIUrl, {
				method: 'POST',
				body: JSON.stringify({ MilestoneDataJSON: formattedData }),
			});

			// レスポンスが正常でない場合はエラーを投げる
			if (!response.ok) {
				throw new Error(`リクエストエラー: ${response.status}`);
			}

			// レスポンスのJSONを取得
			const data = await response.json();
			returnMessage = data.ReturnMessage; // APIからのメッセージを取得
		} catch (err) {
			// エラー処理（Error型でない場合も考慮）
			error =
				err instanceof Error ? err : new Error('不明なエラーが発生しました');
		} finally {
			// 最後にローディング状態を解除
			loading = false;
		}
	}

	// 結果を返す
	return { returnMessage, loading, error };
}