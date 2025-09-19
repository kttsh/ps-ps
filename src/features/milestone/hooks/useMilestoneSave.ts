import type { AlertMessageId } from '@/constants/alart-messages';
import type { AlertType, InputErrorCell } from '@/stores/useAlartStore';
import { saveMilestoneRow } from '../utils/saveMilestoneRow';

/**
 * マイルストーン保存処理を提供するカスタムフック。
 * 保存成功時にはアラートを表示し、保存メッセージを返す。
 *
 * @param showAlert - アラート表示関数（Zustandストアから取得）
 * @returns save関数 - 編集されたテーブルデータを保存する非同期関数
 */
export const useMilestoneSave = ({
	showAlert,
	setIsSaved,
}: {
	showAlert: (
		ids: AlertMessageId[],
		type: AlertType,
		options?: { inputErrorCell?: InputErrorCell },
	) => void;
	setIsSaved: (value: boolean) => void;
}) => {
	/**
	 * 編集されたテーブルデータを保存する非同期関数。
	 * 保存成功時には成功メッセージを表示し、失敗時にはエラーをログに出力。
	 *
	 * @param tableData - 編集された行データ（JSON形式で送信）
	 * @returns 保存成功時のメッセージ（returnMessage）
	 */
	const save = async (tableData: any) => {
		try {
			// APIへ保存リクエストを送信
			const response = await saveMilestoneRow(JSON.stringify(tableData));

			// 保存成功時のアラート表示
			showAlert(['MILESTONE_SAVED_SUCCESS'], 'success');
			setIsSaved(true);

			// APIから返されたメッセージを返す
			return response.returnMessage;
		} catch (error) {
			// 保存失敗時のエラーログ
			console.error('保存エラー:', error);
			throw error;
		}
	};

	return { save };
};