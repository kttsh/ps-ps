import { CollectionViewGroup } from '@mescius/wijmo';
import { type FlexGrid, GroupRow } from '@mescius/wijmo.grid';
import { Menu } from '@mescius/wijmo.input';

/**
 *  グリッドを右クリック時に表示するコンテキストメニュー
 *  挙動を定義
 */
export class FlexGridContextMenu {
	constructor(
		grid: FlexGrid,
		setShowVendorDialog: React.Dispatch<React.SetStateAction<boolean>>,
	) {
		const host = grid.hostElement;

		host.addEventListener(
			'contextmenu',
			(e: MouseEvent) => {
				// select the cell/column that was clicked
				const ht = grid.hitTest(e),
					row = ht.getRow();

				// メニュー項目を状況に応じて切り替える
				let itemsSource;
				if (
					row instanceof GroupRow &&
					row.dataItem instanceof CollectionViewGroup
				) {
					// グループヘッダー行の場合: 行追加以外を表示
					itemsSource = [
						{ header: 'Create RES', cmd: 'createRES' },
						// { header: 'Create SDS', cmd: 'createSDS' } // スコープ外の為非表示
					];
				} else {
					// 通常行の場合: 行追加のみ表示
					itemsSource = [{ header: '行追加', cmd: 'addAipRows' }];
				}

				// show the menu for the current column
				if (grid.selection.col > -1) {
					e.preventDefault(); // cancel the browser's default menu
					const menu = this._buildMenu(grid, setShowVendorDialog, itemsSource);
					menu.show(e); // and show ours
				}
			},
			true,
		);
	}

	_buildMenu(
		grid: FlexGrid,
		setShowVendorDialog: React.Dispatch<React.SetStateAction<boolean>>,
		itemsSource: any[],
	) {
		const menu = new Menu(document.createElement('div'), {
			owner: grid.hostElement,
			displayMemberPath: 'header',
			subItemsPath: 'items',
			commandParameterPath: 'cmd',
			dropDownCssClass: 'ctx-menu',
			openOnHover: true,
			closeOnLeave: true,
			itemsSource,
			command: {
				// execute menu commands
				executeCommand: (cmd: string) => {
					switch (cmd) {
						case 'addAipRows':
							setShowVendorDialog(true); // 状態管理関数を呼び出す(true);
							break;
						case 'createRES': {
							const url = this.buildResUrl();
							if (url) {
								window.open(url, '_blank'); // 新しいタブで開く
							}
							break;
						}
						//case 'createSDS':
						//    break;
					}
					// restore focus to active grid cell (TFS 439964)
					grid.refresh();
					const sel = grid.selection,
						cell = grid.cells.getCellElement(sel.row, sel.col);
					if (cell) {
						cell.focus();
					}
				},
			},
		});
		// done
		return menu;
	}

	// RES起票URL作成
	public buildResUrl(): string {
		// LocalStoregeから画面上選択した情報を取得する
		const selectedJobNoStorage = localStorage.getItem('selectedJobNo-storage');
		const selectedFGStorage = localStorage.getItem('selectedFG-storage');
		const selectedPipCodeStorage = localStorage.getItem(
			'selectedPipCode-storage',
		);
		if (
			selectedJobNoStorage == null ||
			!selectedFGStorage ||
			!selectedPipCodeStorage
		)
			return '';

		const parsedJobNo = JSON.parse(selectedJobNoStorage);
		const selectedJobNo: string = parsedJobNo.state?.selectedJobNo ?? '';
		const parsedFG = JSON.parse(selectedFGStorage);
		const fgCode: string = parsedFG.state?.selectedFG?.fgCode ?? '';
		const parsedPipCode = JSON.parse(selectedPipCodeStorage);
		const selectedPipCode: string = parsedPipCode.state?.selectedPipCode ?? '';

		// 環境変数からベースURLを取得
		const VITE_RES_URL = import.meta.env.VITE_RES_URL;
		return `${VITE_RES_URL}/PRESW001.aspx?0,1,%27%27,,,${selectedJobNo},${fgCode},${selectedPipCode}`;
	}
}