// useGroupRowFormatter.ts

import type { FlexGrid, FormatItemEventArgs } from '@mescius/wijmo.grid';
import { GroupRow } from '@mescius/wijmo.grid';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { useItems } from '@/features/item-management/hooks/useItems';
import { usePipDetail } from '@/features/pip-management/hooks/usePipDetail';
import { usePipDetailStore } from '@/stores/usePipDetailStore';
import { useSelectedFGStore } from '@/stores/useSelectedFgStore';
import { useSelectedJobNoStore } from '@/stores/useSelectedJobNoStore';
import { renderGroupRowCell } from '../utils/renderGroupRowCell';
import { useNavigateToAssignment } from './useNavigateToAssignment';

/**
 * グループ行の formatItem 処理を返すカスタムフック。
 * FlexGrid のグループ行に対して、トグルボタンと「Item追加」ボタンを描画し、
 * 適切なイベント処理を設定する。
 */
export const useGroupRowFormatter = () => {
	const { selectedFG, setSelectedFG } = useSelectedFGStore();
	const { selectedJobNo, setSelectedJobNo } = useSelectedJobNoStore();
	const { selectedPipCode, setSelectedPipCode } = usePipDetailStore();

	const fgCode = selectedFG?.fgCode ?? null;
	const { refetch: itemsRefetch } = useItems(selectedJobNo, fgCode);
	const { refetch: pipDetailRefetch } = usePipDetail(
		selectedJobNo,
		fgCode,
		selectedPipCode,
	);
	// ナビゲーション
	const navigate = useNavigate();

	// 現在の検索パラメータ（画面遷移時に保持）
	const currentSearch = useSearch({ strict: false });

	// アイテム割り当て画面への遷移処理
	const navigateToAssignment = useNavigateToAssignment({
		navigate,
		currentSearch,
	});

	/**
	 * FlexGrid の formatItem イベントハンドラを返す
	 */
	return (sender: FlexGrid, targetCell: FormatItemEventArgs) => {
		// セルパネルが通常のセルでない場合は無視
		if (targetCell.panel !== sender.cells) return;

		// 対象行が GroupRow でない場合は無視
		const row = sender.rows[targetCell.row];
		if (!(row instanceof GroupRow)) return;

		// グループの値が存在しない場合は無視
		const group = row.dataItem;
		const groupValue = group?.name;
		if (targetCell.col !== 0 || !groupValue) return;

		// セルにトグルボタンと追加ボタンを描画
		renderGroupRowCell(
			targetCell.cell,
			targetCell.cell.innerHTML,
			row,
			sender,
			() => navigateToAssignment(pipDetailRefetch, itemsRefetch),
			setSelectedFG,
			setSelectedPipCode,
			setSelectedJobNo,
		);
	};
};