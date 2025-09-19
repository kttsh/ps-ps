import {
	ALERT_MESSAGES,
	type AlertMessageId,
} from '@/constants/alart-messages';
import { create } from 'zustand';

// アラートの種類
export type AlertType = 'success' | 'error' | 'info' | 'warning';

// 単一のアラートメッセージの型定義
type AlertMessage = {
	id: string; // メッセージID（識別用）
	text: string; // 表示するテキスト
};

// (MSR)グリッド上のエラー箇所 Wijmo座標
export type InputErrorCell = {
	row: number;
	column: string;
};

// アラートストアの型定義
type AlertStore = {
	isAlertVisible: boolean; // アラート表示状態
	alertType: AlertType; // 表示するアラートの種類
	messages: AlertMessage[]; // 表示するメッセージ一覧
	inputErrorCell?: InputErrorCell;
	showAlert: (
		ids: AlertMessageId[],
		type: AlertType,
		options?: { inputErrorCell?: InputErrorCell },
	) => void; // アラート表示関数
	setIsAlertVisible: (visible: boolean) => void; // 表示状態の手動切り替え
	clearAlerts: () => void; // アラートをクリアする関数
};

// Zustand によるアラートストアの作成
export const useAlertStore = create<AlertStore>((set) => ({
	// 初期状態：非表示、infoタイプ、メッセージなし
	isAlertVisible: false,
	alertType: 'info',
	messages: [],
	inputErrorCell: undefined,

	// アラート表示関数：ID配列とタイプを受け取り、対応するメッセージを表示
	showAlert: (ids, type, options) =>
		set({
			isAlertVisible: true, // 表示状態を true に
			alertType: type, // 指定されたタイプに設定
			messages: ids.map((id) => ({
				// ID に対応するメッセージを生成
				id,
				text: ALERT_MESSAGES[id], // 定義済みメッセージから取得
			})),
			inputErrorCell: options?.inputErrorCell ?? undefined,
		}),

	// 表示状態の手動切り替え関数
	setIsAlertVisible: (visible) => set({ isAlertVisible: visible }),

	// アラートを非表示にし、メッセージをクリアする関数
	clearAlerts: () =>
		set({ isAlertVisible: false, messages: [], inputErrorCell: undefined }),
}));