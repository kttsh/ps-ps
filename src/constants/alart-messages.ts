// alertMessages.ts
export const ALERT_MESSAGES = {
	FG_UNSELECTED: 'Function Groupを選択してください。',
	NO_ITEM: 'アイテムが存在しません。別のFGを選択してください。',
	NO_PIP: 'PIPが存在しません。別のFGを選択するかPIPを作成してください。',
	CREATE_PIP_SUCCESS: 'PIPを登録しました。',
	CREATE_PIP_ERROR:
		'PIPの登録に失敗しました。システム管理者に問い合わせてください。',
	UPDATE_PIP_SUCCESS: 'データを更新しました。',
	UPDATE_PIP_ERROR:
		'PIPの更新に失敗しました。システム管理者に問い合わせてください。',
	DELETE_PIP_SUCCESS: 'PIPを削除しました。',
	DELETE_PIP_ERROR:
		'PIPの削除に失敗しました。システム管理者に問い合わせてください。',
	DELETE_AIP_SUCCESS: 'AIPを削除しました。',
	DELETE_AIP_ERROR:
		'AIPの削除に失敗しました。システム管理者に問い合わせてください。',
	COPY_SUCCESS: 'PIPを複製しました。',
	COPY_ERROR: 'PIPの複製に失敗しました。システム管理者に問い合わせてください。',
	MERGE_SUCCESS: 'PIPを統合しました。',
	MERGE_ERROR:
		'PIPの統合に失敗しました。システム管理者に問い合わせてください。',
	AIP_ROW_ADD: '行追加しました',
	PIP_UPDATE_SUCCESS: 'PIPを更新しました',
	PIP_UPDATE_FAILURE: 'PIPの更新に失敗しました',
	INVALID_NUMBER_INPUT: '文字列が入力されているため、数値を入力してください。',
} as const;

export type AlertMessageId = keyof typeof ALERT_MESSAGES;
