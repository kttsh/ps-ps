// alertMessages.ts
export const ALERT_MESSAGES = {
	FG_UNSELECTED: 'Function Groupを選択してください。',
	NO_DATA: 'データが存在しません。別のFGを選択してください。',
	NO_PIP: 'PIPが存在しません。別のFGを選択するかPIPを作成してください。',
	CREATE_SUCCESS: 'データを登録しました。',
	CREATE_ERROR:
		'データの登録に失敗しました。システム管理者に問い合わせてください。',
	UPDATE_SUCCESS: 'データを更新しました。',
	UPDATE_ERROR:
		'データの更新に失敗しました。システム管理者に問い合わせてください。',
	DELETE_SUCCESS: 'データを削除しました。',
	DELETE_ERROR:
		'データの削除に失敗しました。システム管理者に問い合わせてください。',
	COPY_SUCCESS: 'データを複製しました。',
	COPY_ERROR: 'データの複製に失敗しました。システム管理者に問い合わせてください。',
	MERGE_SUCCESS: 'データを統合しました。',
	MERGE_ERROR: 'データの統合に失敗しました。システム管理者に問い合わせてください。',
	AIP_ROW_ADD: '行追加しました',
	PIP_UPDATE_SUCCESS: 'PIPを更新しました',
	PIP_UPDATE_FAILURE: 'PIPの更新に失敗しました',
} as const;

export type AlertMessageId = keyof typeof ALERT_MESSAGES;