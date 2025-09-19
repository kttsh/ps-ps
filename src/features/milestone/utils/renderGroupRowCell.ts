import type { FlexGrid, GroupRow } from '@mescius/wijmo.grid';
import type { FG } from '@/types';

/**
 * グループ行のセルを描画する関数。
 * セル内にトグルボタン、追加ボタン、その他のHTML要素を配置する。
 *
 * @param cell - 対象のHTMLセル要素
 * @param pipNoHtml - HTML文字列（トグルボタンなどを含む）
 * @returns トグルボタン、追加ボタン、テンポラリDIVを含むオブジェクト
 */
export const renderGroupRowCell = (
	cell: HTMLElement,
	pipNoHtml: string,
	row: GroupRow,
	sender: FlexGrid,
	navigateToAssignment: () => void,
	setSelectedFG: (fg: FG | null) => void,
	setSelectedPipCode: (pipCode: string | undefined) => void,
	setSelectedJobNo: (jobNo: string) => void,
): {
	toggleBtn: HTMLElement | null;
	addBtn: HTMLElement;
	tempDiv: HTMLDivElement;
} => {
	// セルの初期化
	cell.innerHTML = '';
	cell.style.display = 'flex';
	cell.style.alignItems = 'center';

	// HTML文字列を一時的にDOMとして扱うためのDIVを作成
	const tempDiv = document.createElement('div');
	tempDiv.innerHTML = pipNoHtml;

	// トグルボタン（最初の <span> 要素）を取得
	const toggleBtn = tempDiv.querySelector('span');
	if (toggleBtn) {
		toggleBtn.style.marginRight = '8px';
		toggleBtn.style.cursor = 'pointer';
		cell.appendChild(toggleBtn); // セルに追加

		// トグルボタンのイベント設定
		toggleBtn.addEventListener('click', (e) => {
			e.stopPropagation();
			row.isCollapsed = !row.isCollapsed;
			sender.invalidate();
		});
	}

	const pipCode = row.dataItem.items[0].PIPNo;
	const jobNo = row.dataItem.items[0].JobNo;
	const fgCode = row.dataItem.items[0].FG;

	// 「Item追加」ボタンを作成
	const addBtn = document.createElement('button');
	addBtn.textContent = 'Add Item';
	addBtn.className = 'add-btn';

	addBtn.setAttribute('type', 'button');
	addBtn.setAttribute('data-pip-code', `${pipCode}/${jobNo}/${fgCode}`); // pipCode を埋め込む

	cell.appendChild(addBtn); // セルに追加

	// Item追加ボタンのイベント設定
	addBtn.addEventListener('click', async (event) => {
		event.stopPropagation();
		setSelectedFG({ fgCode: fgCode, fgName: '' });
		setSelectedPipCode(pipCode);
		setSelectedJobNo(jobNo);
		navigateToAssignment();
	});

	// tempDiv内の他のノード（toggleBtn以外）をセルに追加
	Array.from(tempDiv.childNodes).forEach((node) => {
		if (node !== toggleBtn) {
			cell.appendChild(node);
		}
	});

	// 作成した要素を返す
	return { toggleBtn, addBtn, tempDiv };
};