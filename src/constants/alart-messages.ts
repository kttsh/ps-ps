// alertMessages.ts
export const ALERT_MESSAGES = {
	FG_UNSELECTED: 'Function Groupを選択してください。',
	NO_ITEM: 'アイテムが存在しません。別のFGを選択してください。',
	NO_PIP: 'PIPが存在しません。別のFGを選択するかPIPを作成してください。',
	CREATE_PIP_SUCCESS: 'PIPを登録しました。',
	CREATE_PIP_ERROR:
		'PIPの登録に失敗しました。システム管理者に問い合わせてください。',
	UPDATE_PIP_SUCCESS: 'PIPを更新しました。',
	UPDATE_PIP_ERROR:
		'PIPの更新に失敗しました。システム管理者に問い合わせてください。',
	DELETE_PIP_SUCCESS: 'PIPを削除しました。',
	DELETE_PIP_ERROR:
		'PIPの削除に失敗しました。システム管理者に問い合わせてください。',
	COPY_SUCCESS: 'PIPを複製しました。',
	COPY_ERROR: 'PIPの複製に失敗しました。システム管理者に問い合わせてください。',
	MERGE_SUCCESS: 'PIPを統合しました。',
	MERGE_ERROR:
		'PIPの統合に失敗しました。システム管理者に問い合わせてください。',
	NO_PIP_DETAIL: 'PIP情報の取得に失敗しました。',
	ADD_VENDOR_SUCCESS: 'ベンダーを追加しました。',
	INVALID_NUMBER_INPUT: '文字列が入力されているため、数値を入力してください。',
	MILESTONE_SAVED_SUCCESS: '保存しました。',
} as const;

export type AlertMessageId = keyof typeof ALERT_MESSAGES;