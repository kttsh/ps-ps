import type {
	CollectionView,
	CollectionViewGroup,
	GroupDescription,
} from '@mescius/wijmo';
import type { FlexGrid, FormatItemEventArgs } from '@mescius/wijmo.grid';
import { useEffect, useRef, useState } from 'react';
import { useAlertStore } from '@/stores/useAlartStore';
// TODO: Install @mescius/wijmo package or replace with alternative grid library
// import type * as wjcCore from "@mescius/wijmo";
import { saveMilestoneRow } from '../utils/saveMilestoneRow';

const BUTTON_CLASS =
	'bg-blue-500 text-white font-bold w-28 h-28 rounded-full text-3xl shadow-2xl cursor-pointer hover:bg-blue-400';

interface SaveButtonProps {
	collectionView: CollectionView | null;
	requiredFields?: string[];
	gridRef: React.RefObject<FlexGrid | null>;
}

export const SaveButton = ({
	collectionView,
	requiredFields,
	gridRef,
}: SaveButtonProps) => {
	const [isSaved, setIsSaved] = useState(false);

	// アラートの状態
	const { showAlert } = useAlertStore();

	// エラーセルの記録（row:col の形式）
	const errorCellsRef = useRef<Set<string>>(new Set());

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

	// formatItem で再描画時に error-cell を復元
	useEffect(() => {
		const grid = gridRef.current;
		if (!grid) return;

		const formatHandler = (_: FlexGrid, e: FormatItemEventArgs) => {
			const key = `${e.row}:${e.col}`;
			if (errorCellsRef.current.has(key)) {
				e.cell.classList.add('error-cell');
			} else {
				e.cell.classList.remove('error-cell');
			}
		};

		grid.formatItem.addHandler(formatHandler);
		return () => {
			grid.formatItem.removeHandler(formatHandler);
		};
	}, [gridRef]);

	// エラーセルを記録
	const markErrorCell = (rowIndex: number, colKey: string) => {
		const grid = gridRef.current;
		if (!grid) return;

		const col = grid.columns.getColumn(colKey);
		if (!col) return;

		const colIndex = grid.columns.indexOf(col);
		errorCellsRef.current.add(`${rowIndex}:${colIndex}`);
	};

	// エラーセルを削除
	const unmarkErrorCell = (rowIndex: number, colKey: string) => {
		const grid = gridRef.current;
		if (!grid) return;

		const col = grid.columns.getColumn(colKey);
		if (!col) return;

		const colIndex = grid.columns.indexOf(col);
		const key = `${rowIndex}:${colIndex}`;
		errorCellsRef.current.delete(key);

		const cell = grid.cells.getCellElement(rowIndex, colIndex);
		if (cell) {
			cell.classList.remove('error-cell');
		}
	};

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
			const displayedRows: Array<
				| Record<string, unknown>
				| {
						__isGroupHeader: true;
						groupName: string;
						groupProperty: string;
				  }
			> = [];

			// グループヘッダー行を考慮する
			if (collectionView._groups) {
				collectionView._groups.forEach((group: CollectionViewGroup) => {
					// グループヘッダー行を追加
					displayedRows.push({
						__isGroupHeader: true,
						groupName: group.name,
						groupProperty: group.groupDescription as GroupDescription,
					});

					// グループ内のデータ行を追加
					group.items.forEach((row: Record<string, unknown>) => {
						displayedRows.push(row);
					});
				});
			} else {
				// グループ化されていない場合
				collectionView.items.forEach((row: Record<string, unknown>) => {
					displayedRows.push(row);
				});
			}

			// Rev.等 数値列に対してバリデーション
			let validateFlag = false;

			tableData.forEach((editedRow: Record<string, unknown>) => {
				// 実際の表示インデックスを特定（グループヘッダー含む）
				const actualRowIndex = displayedRows.findIndex((row) => {
					// グループヘッダーはスキップ
					if ('__isGroupHeader' in row) return false;

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
					if (key.includes('INT') || key.includes('FLOAT')) {
						const value = editedRow[key];
						const grid = gridRef.current;

						if (Number.isNaN(Number(value))) {
							validateFlag = true;
							showAlert(['INVALID_NUMBER_INPUT'], 'error', {
								inputErrorCell: { row: actualRowIndex, column: key },
							});

							// エラーセルにクラスを付与＆記録（複数セル対応）
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
									markErrorCell(actualRowIndex, key);
								}
							}
						} else {
 エラークラスを削除
							unmarkErrorCell(actualRowIndex, key);
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
				showAlert(['MILESTONE_SAVED_SUCCESS'], 'info');
				setIsSaved(true);

				// 保存成功時にエラーセル記録をクリア
				errorCellsRef.current.clear();
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
