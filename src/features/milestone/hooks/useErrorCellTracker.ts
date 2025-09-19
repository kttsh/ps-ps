import type { FlexGrid } from '@mescius/wijmo.grid';
import { useRef } from 'react';

/**
 * FlexGrid のセルに対してエラー状態を記録・管理するカスタムフック。
 * セルの位置（row:col）をキーとしてエラーセルを追跡し、CSSクラスの付与・削除を行う。
 *
 * @param gridRef - FlexGrid の参照（React Ref）
 * @returns errorCellsRef（エラーセルのSet）、markErrorCell（エラー記録）、unmarkErrorCell（エラー解除）
 */
export const useErrorCellTracker = (
	gridRef: React.RefObject<FlexGrid | null>,
) => {
	// エラーセルの位置を記録する Set（例: "3:5" は 3行目の5列目）
	const errorCellsRef = useRef<Set<string>>(new Set());

	/**
	 * 指定したセルをエラーとして記録する関数。
	 * @param rowIndex - 行インデックス
	 * @param colKey - 列キー（カラム名）
	 */
	const markErrorCell = (rowIndex: number, colKey: string) => {
		const grid = gridRef.current;
		if (!grid) return;

		// 列キーから列インデックスを取得
		const col = grid.columns.getColumn(colKey);
		if (!col) return;
		const colIndex = grid.columns.indexOf(col);

		// "row:col" 形式で記録
		errorCellsRef.current.add(`${rowIndex}:${colIndex}`);
	};

	/**
	 * 指定したセルのエラー状態を解除する関数。
	 * @param rowIndex - 行インデックス
	 * @param colKey - 列キー（カラム名）
	 */
	const unmarkErrorCell = (rowIndex: number, colKey: string) => {
		const grid = gridRef.current;
		if (!grid) return;

		// 列キーから列インデックスを取得
		const col = grid.columns.getColumn(colKey);
		if (!col) return;
		const colIndex = grid.columns.indexOf(col);

		// エラーセルの記録を削除
		const key = `${rowIndex}:${colIndex}`;
		errorCellsRef.current.delete(key);

		// 実際のセル要素からエラークラスを削除
		const cell = grid.cells.getCellElement(rowIndex, colIndex);
		if (cell) {
			cell.classList.remove('error-cell');
		}
	};

	return { errorCellsRef, markErrorCell, unmarkErrorCell };
};