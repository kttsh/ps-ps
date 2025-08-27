import { create } from 'zustand';
import alertMessagesMap from '@/constants/messagesList';

/**
 * アラート表示の状態管理ストア
 * - isAlertVisible: 表示中かどうか
 * - setIsAlertVisible: 表示状態を任意に設定（true/false）
 * - alertMessages: 表示するメッセージ（複数対応）
 * - showAlert: メッセージを表示し、一定時間後に自動で非表示（メッセージが変わるたびにリセット）
 * - hideAlert: 手動で非表示にする
 */

type AlertState = {
	isAlertVisible: boolean;
	setIsAlertVisible: (visible: boolean) => void;
	alertMessages: Record<string, string>;
	showAlert: (ids: string[]) => void;
	hideAlert: () => void;
};

let alertTimer: ReturnType<typeof setTimeout> | null = null;

export const useAlertStore = create<AlertState>((set) => ({
	isAlertVisible: false,
	setIsAlertVisible: (visible) => set({ isAlertVisible: visible }),
	alertMessages: {},
	showAlert: (ids) => {
		// 前のタイマーをクリア
		if (alertTimer) {
			clearTimeout(alertTimer);
		}

		// 新しいメッセージを表示
		const messages: Record<string, string> = {};
		ids.forEach((id) => {
			if (alertMessagesMap[id]) {
				messages[id] = alertMessagesMap[id];
			}
		});

		set({ isAlertVisible: true, alertMessages: messages });

		// 新しいタイマーを設定
		alertTimer = setTimeout(() => {
			set({ isAlertVisible: false, alertMessages: {} });
			alertTimer = null;
		}, 5000);
	},
	hideAlert: () => {
		if (alertTimer) {
			clearTimeout(alertTimer);
			alertTimer = null;
		}
		set({ isAlertVisible: false, alertMessages: {} });
	},
}));
