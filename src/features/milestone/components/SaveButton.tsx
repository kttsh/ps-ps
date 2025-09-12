import { useEffect, useState } from 'react';
// TODO: Install @mescius/wijmo package or replace with alternative grid library
// import type * as wjcCore from "@mescius/wijmo";
import { saveMilestoneRow } from '../utils/saveMilestoneRow';

// Temporary type definition until Wijmo is installed
type CollectionView = {
	itemsEdited: Array<Record<string, unknown>>;
};

const BUTTON_CLASS =
	'bg-blue-500 text-white font-bold w-28 h-28 rounded-full text-3xl shadow-2xl cursor-pointer hover:bg-blue-400';

interface SaveButtonProps {
	collectionView: CollectionView | null;
	requiredFields?: string[];
}

export const SaveButton = ({
	collectionView,
	requiredFields,
}: SaveButtonProps) => {
	const [isSaved, setIsSaved] = useState(false);

	// 保存前に画面遷移しようとしたときの警告
	useEffect(() => {
		const handleBeforeUnload = (e: BeforeUnloadEvent) => {
			if (!isSaved) {
				e.preventDefault();
				e.returnValue = '';
			}
		};
		window.addEventListener('beforeunload', handleBeforeUnload);
		return () => {
			window.removeEventListener('beforeunload', handleBeforeUnload);
		};
	}, [isSaved]);

	const saveRow = async () => {
		if (collectionView) {
			const tableData = collectionView.itemsEdited;
			console.log(`保存編集行:${JSON.stringify(tableData)}`);

			// 必須チェック（空欄があるか確認）
			const invalidRows = tableData.filter((row: Record<string, unknown>) =>
				requiredFields?.some((field) => {
					const value = row[field];
					return !value || (typeof value === 'string' && value.trim() === '');
				}),
			);

			if (invalidRows.length > 0) {
				alert('必須項目が未入力の行があります。保存できません。');
				console.warn('バリデーションエラー:', invalidRows);
				return;
			}

			try {
				const response = await saveMilestoneRow(JSON.stringify(tableData));
				const saveMessage = response.returnMessage;
				console.log(`保存成功メッセージ:${saveMessage}`);
				setIsSaved(true);
			} catch (error) {
				console.error('保存中にエラーが発生しました:', error);
			}
		} else {
			console.log('データがありません');
		}
	};

	return (
		<button type="submit" onClick={saveRow} className={BUTTON_CLASS}>
			save
		</button>
	);
};