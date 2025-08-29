import React, { useState, useEffect } from "react";
import * as wjcCore from "@mescius/wijmo";
import { saveMilestoneRow } from "../utils/saveMilestoneRow";

const BUTTON_CLASS =
	"bg-blue-500 text-white font-bold w-28 h-28 rounded-full text-3xl shadow-2xl cursor-pointer hover:bg-blue-400";

interface SaveButtonProps {
	collectionView: wjcCore.CollectionView | null;
	requiredFields?: string[];
}

export const SaveButton: React.FC<SaveButtonProps> = ({
	collectionView,requiredFields
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
			console.log("保存編集行:" + JSON.stringify(tableData));

			// 必須チェック（空欄があるか確認）
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const invalidRows = tableData.filter((row: any) => requiredFields?.some((field) => !row[field] || row[field].trim?.() === "")
			);

			if (invalidRows.length > 0) {
				alert("必須項目が未入力の行があります。保存できません。");
				console.warn("バリデーションエラー:", invalidRows);
				return;
			}

			try {
				const response = await saveMilestoneRow(JSON.stringify(tableData));
				const saveMessage = response.returnMessage;
				console.log("保存成功メッセージ:" + saveMessage);
				setIsSaved(true);
			} catch (error) {
				console.error("保存中にエラーが発生しました:", error);
			}
		} else {
			console.log("データがありません");
		}
	};

	return (
		<button type="submit" onClick={saveRow} className={BUTTON_CLASS}>
			save
		</button>
	);
};

