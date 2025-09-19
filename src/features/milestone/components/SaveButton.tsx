import type {
	CollectionView,
	CollectionViewGroup,
	GroupDescription,
} from '@mescius/wijmo';
import type { FlexGrid, FormatItemEventArgs } from '@mescius/wijmo.grid';
import { useEffect, useState } from 'react';
import { useAlertStore } from '@/stores/useAlartStore';
import { useErrorCellTracker } from '../hooks/useErrorCellTracker';
import { useMilestoneSave } from '../hooks/useMilestoneSave';
import { validateMilestoneRows } from '../utils/validateMilestoneRows';

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
	const { errorCellsRef, markErrorCell, unmarkErrorCell } =
		useErrorCellTracker(gridRef);
	const { save } = useMilestoneSave({ showAlert, setIsSaved });

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
	}, [gridRef, errorCellsRef]);

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

			// バリデーションチェック
			const hasError = validateMilestoneRows({
				tableData,
				displayedRows,
				gridRef,
				requiredFields,
				showAlert,
				markErrorCell,
				unmarkErrorCell,
			});

			// エラーがある場合は保存しない
			if (hasError) {
				return;
			}

			// 保存処理
			save(tableData);
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