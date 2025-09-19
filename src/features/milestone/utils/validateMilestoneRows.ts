import type { FlexGrid } from '@mescius/wijmo.grid';
import type { AlertMessageId } from '@/constants/alart-messages';
import type { AlertType, InputErrorCell } from '@/stores/useAlartStore';

/**
 * マイルストーン行のバリデーションを行う関数。
 * 必須項目の空欄チェックや数値項目（INT/FLOAT）の形式チェックを行い、
 * エラーがあるセルにはCSSクラスを付与し、アラートを表示する。
 *
 * @returns hasError - バリデーションエラーが1つでもあれば true を返す
 */
export const validateMilestoneRows = ({
	tableData,
	displayedRows,
	gridRef,
	requiredFields,
	showAlert,
	markErrorCell,
	unmarkErrorCell,
}: {
	tableData: Record<string, unknown>[]; // 編集された行データ
	displayedRows: Array<Record<string, unknown> | { __isGroupHeader: true }>; // 表示順の行データ（グループヘッダー含む）
	gridRef: React.RefObject<FlexGrid | null>; // Wijmoグリッドの参照
	requiredFields?: string[]; // 必須項目のキー一覧
	showAlert: (
		ids: AlertMessageId[],
		type: AlertType,
		options?: { inputErrorCell?: InputErrorCell },
	) => void; // アラート表示関数
	markErrorCell: (rowIndex: number, colKey: string) => void; // エラーセル記録関数
	unmarkErrorCell: (rowIndex: number, colKey: string) => void; // エラーセル解除関数
}) => {
	let hasError = false; // エラーが1つでもあれば true にする

	tableData.forEach((editedRow) => {
		// 編集された行が表示行のどこにあるかを特定（グループヘッダーは除外）
		const actualRowIndex = displayedRows.findIndex((row) => {
			if ('__isGroupHeader' in row) return false;
			return Object.keys(editedRow).every((key) => row[key] === editedRow[key]);
		});

		if (actualRowIndex === -1) return; // 対応する表示行が見つからない場合はスキップ

		Object.keys(editedRow).forEach((key) => {
			const value = editedRow[key];
			const grid = gridRef.current;

			// 数値項目（INT/FLOAT）または必須項目に対してバリデーションを実施
			if (
				key.includes('INT') ||
				key.includes('FLOAT') ||
				(requiredFields?.includes(key) &&
					(!value || (typeof value === 'string' && value.trim() === '')))
			) {
				// 値が不正（NaN、空文字、null）の場合
				if (Number.isNaN(Number(value)) || value === '' || value == null) {
					hasError = true;

					// アラート表示（該当セルの位置を含む）
					showAlert(['INVALID_NUMBER_INPUT'], 'error', {
						inputErrorCell: { row: actualRowIndex, column: key },
					});

					// グリッド上の該当セルにエラークラスを付与
					if (grid) {
						const col = grid.columns.getColumn(key);
						if (col) {
							const colIndex = grid.columns.indexOf(col);
							const cell = grid.cells.getCellElement(actualRowIndex, colIndex);
							if (cell) cell.classList.add('error-cell');
							markErrorCell(actualRowIndex, key); // エラーセルとして記録
						}
					}
				} else {
					// 正常な値の場合はエラー状態を解除
					unmarkErrorCell(actualRowIndex, key);
				}
			}
		});
	});

	return hasError;
};