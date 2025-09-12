import type { CollectionView, CollectionViewGroup } from '@mescius/wijmo';
import type { FlexGrid } from '@mescius/wijmo.grid';
import { useEffect, useState } from 'react';
import { useAlertStore } from '@/stores/useAlartStore';
// TODO: Install @mescius/wijmo package or replace with alternative grid library
// import type * as wjcCore from "@mescius/wijmo";
import { saveMilestoneRow } from '../utils/saveMilestoneRow';

const BUTTON_CLASS =
	'bg-blue-500 text-white font-bold w-28 h-28 rounded-full text-3xl shadow-2xl cursor-pointer hover:bg-blue-400';

interface SaveButtonProps {
	collectionView: CollectionView | null;
	requiredFields?: string[];
	gridRef: React.RefObject<FlexGrid>;
}

export const SaveButton = ({
	collectionView,
	requiredFields,
	gridRef,
}: SaveButtonProps) => {
	const [isSaved, setIsSaved] = useState(false);

	// アラートの状態
	const { showAlert } = useAlertStore();

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
				console.warn('バリデーションエラー:', invalidRows);
				//return;
			}

			// 表全体のデータ（画面表示順にグループヘッダー＋データ行を構築）
			const displayedRows: Array<any> = [];

			// グループヘッダー行を考慮する
			if (collectionView._groups) {
				collectionView._groups.forEach((group: CollectionViewGroup) => {
					// グループヘッダー行を追加
					displayedRows.push({
						__isGroupHeader: true,
						groupName: group.name,
						groupProperty: (group.groupDescription as any).propertyName,
					});

					// グループ内のデータ行を追加
					group.items.forEach((row: any) => {
						displayedRows.push(row);
					});
				});
			} else {
				// グループ化されていない場合
				collectionView.items.forEach((row: any) => {
					displayedRows.push(row);
				});
			}

			// Rev.等 数値列に対してバリデーション
			let validateFlag = false;

			tableData.forEach((editedRow: any) => {
				// 実際の表示インデックスを特定（グループヘッダー含む）
				const actualRowIndex = displayedRows.findIndex((row) => {
					// グループヘッダーはスキップ
					if (row.__isGroupHeader) return false;

					// editedRow と一致するか（キーごとに比較）
					return Object.keys(editedRow).every(
						(key) => row[key] === editedRow[key],
					);
				});

				if (actualRowIndex === -1) {
					console.warn('行が見つかりませんでした:', editedRow);
					return;
				}

				Object.keys(editedRow).forEach((key) => {
					if (key.includes('INT')) {
						const value = editedRow[key];
						if (isNaN(Number(value))) {
							validateFlag = true;
							showAlert(['INVALID_NUMBER_INPUT'], 'error', {
								inputErrorCell: { row: actualRowIndex, column: key }, // 実際の表示インデックスを渡す
							});
						}

						// エラーセルにクラスを付与
						const grid = gridRef.current;
						if (grid) {
							const col = grid.columns.getColumn(key);
							if (col) {
								const colIndex = grid.columns.indexOf(col);
								const cell = grid.cells.getCellElement(
									actualRowIndex,
									colIndex,
								);
								if (cell) {
									cell.classList.add('error-cell');
								}
							}
						}
					}
				});
			});

			if (validateFlag) {
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
