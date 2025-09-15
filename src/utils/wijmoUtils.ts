import { FlexGrid } from '@mescius/wijmo.grid';

/**
 * 指定されたセルを Wijmo FlexGrid 上で選択状態にする
 * @param rowIndex 行インデックス
 * @param columnKey 列の binding 名
 */
export function selectWijmoCell(rowIndex: number, columnKey: string) {
	const gridHost = document.querySelector('.wj-flexgrid');
	if (!gridHost) return;

	const grid = FlexGrid.getControl(gridHost) as FlexGrid; // 型アサーション
	if (!grid) return;

	const colIndex = grid.columns.findIndex((col) => col.binding === columnKey);
	if (colIndex === -1) return;

	grid.select(rowIndex, colIndex); // セルを選択
	grid.focus(); // フォーカスを当てる
}
