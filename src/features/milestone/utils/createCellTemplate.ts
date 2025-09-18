import * as wjcCore from '@mescius/wijmo';
import '@mescius/wijmo.cultures/wijmo.culture.ja';
import type { FlexGrid, GridPanel } from '@mescius/wijmo.grid';
import '@mescius/wijmo.styles/wijmo.css';
import { renderCalendarOnClickExpanded } from './renderCalendarOnClickExpanded';
import { renderFlag } from './renderFlag';
import { renderStatusSelectBox } from './renderStatusSelectBox';

/**
 * Gridのセルテンプレート生成関数
 * @param flex 
 * @param collectionView 
 * @returns 
 */
export function createCellTemplate(
	flex: FlexGrid,
	collectionView: wjcCore.CollectionView,
) {
	return (flex.itemFormatter = (
		panel: GridPanel,
		r: number,
		c: number,
		cell: HTMLElement,
	) => {
		const item = panel.rows[r].dataItem;
		const binding = panel.columns[c].binding || 'empty'; // bindingがnullの場合は仮の値を設定

		// ヘッダーセルは中央揃え
		if (cell.getAttribute('role') === 'columnheader') {
			cell.style.textAlign = 'center';
			return;
		}

		// データ行のみ処理
		if (r > 0) {
			// 国コードがある場合は国旗を表示
			if (binding === 'Country' && item.Country && cell.innerText) {
				renderFlag(cell, item.Country);
				cell.style.textAlign = 'center';
				return;
			}

			// PJT- や DATE を含むカラムはカレンダー入力にする
			if (
				(binding.startsWith('PJT-') || binding.includes('DATE')) &&
				cell.getAttribute('aria-readonly') !== 'true' &&
				!cell.classList.contains('wj-group')
			) {
				renderCalendarOnClickExpanded(cell, item, binding, collectionView);
				return;
			}

			// ステータスカラムはセレクトボックスを表示
			if (binding === 'Status') {
				renderStatusSelectBox(cell, item, collectionView);
				cell.style.textAlign = 'center';
				return;
			}
		}

		// 編集不可のカラム設定
		const readOnlyBindings = [
			'AIPNo',
			'VendorName',
			'Country',
			'FGName',
			'KPinFG',
			'Order',
		];
		if (readOnlyBindings.includes(binding)) {
			panel.columns[c].isReadOnly = true;
		}

		// 非表示にするカラム
		if (binding === 'JobNo') {
			panel.columns[c].visible = false;
		}

		// 表示を強制するカラム
		if (binding === 'FG') {
			panel.columns[c].visible = true;
		}
	});
}
