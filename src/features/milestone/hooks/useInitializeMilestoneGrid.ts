import {
	type FlexGrid,
	type FormatItemEventArgs,
	GroupRow,
} from '@mescius/wijmo.grid';
import { type NavigateFn, useSearch } from '@tanstack/react-router';
import { useRef } from 'react';
import { useEvent } from 'react-use-event-hook';
import type { pipGenerationModeType } from '@/stores/usePipGenerationModeStore';
import type { FG } from '../../../stores/useFgsStore';
import { FlexGridContextMenu } from '../components/flex-grid-context-menu';
import type { PJStatusType } from '../types/milestone';
import { createCellTemplate } from '../utils/createCellTemplate';
import { getStatus } from '../utils/getStatus';

interface InitializeMilestoneGridProps {
	gridRef: React.RefObject<FlexGrid | null>;
	collectionView: any;
	setShowVendorDialog: React.Dispatch<React.SetStateAction<boolean>>;
	setShowSave: React.Dispatch<React.SetStateAction<boolean>>;
	setSkipNum: React.Dispatch<React.SetStateAction<number>>;
	isLoading: React.SetStateAction<boolean>;
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
	MSRMngCode: string;
	updateGridMetrics: (grid: FlexGrid) => void;
	navigate: NavigateFn;
	setSelectedJobNo: (jobNo: string) => void;
	setSelectedFG: (fg: any) => void;
	setSelectedPipCode: (pipCode: string) => void;
	selectedJobNo: React.SetStateAction<string>;
	selectedFG: FG | null;
	fgData: any[] | undefined;
	setAssignedVendorCode: (codes: string[]) => void;
	setPipGenerationMode: (
		next:
			| pipGenerationModeType
			| ((current: pipGenerationModeType) => pipGenerationModeType),
	) => void;
	setPipSelection: (selection: Record<string, boolean>) => void;
	LOAD_MORE_THRESHOLD: number;
}

export const useInitializeMilestoneGrid = ({
	gridRef,
	collectionView,
	setShowVendorDialog,
	setShowSave,
	setSkipNum,
	isLoading,
	setIsLoading,
	MSRMngCode,
	updateGridMetrics,
	navigate,
	setSelectedJobNo,
	setSelectedFG,
	setSelectedPipCode,
	fgData,
	setAssignedVendorCode,
	setPipGenerationMode,
	setPipSelection,
	LOAD_MORE_THRESHOLD,
}: InitializeMilestoneGridProps) => {
	// ステータス情報の参照
	const statusOptionsRef = useRef<PJStatusType[]>([]);
	const statusLoadedRef = useRef(false);
	const currentSearch = useSearch({ strict: false });

	// グループヘッダー行の次の行を取得: 情報を取得して状態更新
	const updateSelectionFromNextRow = (flex: FlexGrid, row: GroupRow) => {
		const groupRowIndex = flex.rows.indexOf(row);
		const nextRow = flex.rows[groupRowIndex + 1];

		if (nextRow && !(nextRow instanceof GroupRow)) {
			const aip = nextRow.dataItem;

			// JobNo, FG, PIPNoをLocalStoregeに保存
			const { JobNo, FG, PIPNo } = aip;
			setSelectedJobNo(JobNo);

			// FGに一致するデータをfgDataから検索
			setSelectedFG(fgData?.find((fgs: any) => fgs.fgCode === FG) ?? null);
			setSelectedPipCode(PIPNo);

			// 同じグループに属する行を抽出する(割当済みのベンダーリスト)
			const groupItems = collectionView?.items?.filter(
				(rowItem: any) => rowItem.PIPNo === PIPNo,
			);
			const vendorCodes = groupItems.map((vendor: any) => vendor.VendorCode);
			setAssignedVendorCode(vendorCodes);
		}
	};

	// グリッド初期化時の処理
	return useEvent((flex: FlexGrid) => {
		gridRef.current = flex;

		// ステータス取得処理（非同期）
		const fetchStatus = async () => {
			if (!statusLoadedRef.current) {
				try {
					const { returnStatus, error } = await getStatus(MSRMngCode);
					if (returnStatus) {
						statusOptionsRef.current = returnStatus;
						statusLoadedRef.current = true;
					} else {
						console.error('ステータス取得エラー:', error);
					}
				} catch (err) {
					console.error('ステータス取得中に例外:', err);
				}
			}
		};

		fetchStatus(); // 非同期処理を呼び出す

		// 初期の行数・セル数を取得
		updateGridMetrics(flex);

		// グリッド更新時に行数・セル数を再取得
		flex.updatedView.addHandler(() => updateGridMetrics(flex));

		// スクロール末尾に近づいたらデータ追加をトリガー
		flex.scrollPositionChanged.addHandler(() => {
			if (
				flex.viewRange.bottomRow >= flex.rows.length - LOAD_MORE_THRESHOLD &&
				!isLoading
			) {
				setIsLoading(true);
				setSkipNum((prev) => prev + 50);
			}
		});

		// 列固定
		flex.frozenColumns = 10;

		// コンテキストメニュー
		new FlexGridContextMenu(flex, setShowVendorDialog);

		// wijmoセル選択イベント
		const handleCellInteraction = (event: MouseEvent) => {
			const ht = flex.hitTest(event);
			// cellType 1:セル, 2:列, 3:行
			if (ht.cellType === 1 || ht.cellType === 3) {
				//const row = grid.rows[ht.row]; // 行情報を取得
				const aip = flex.rows[ht.row].dataItem;

				// JobNo, FG, PIPNoをLocalStoregeに保存
				const { JobNo, FG, PIPNo } = aip;
				if (!JobNo || !FG || !PIPNo) return; // グループヘッダー押下時はLocalStoregeを更新しない
				setSelectedJobNo(JobNo);

				// FGに一致するデータをfgDataから検索
				setSelectedFG(fgData?.find((fgs: any) => fgs.fgCode === FG) ?? null);
				setSelectedPipCode(PIPNo);

				// 同じグループに属する行を抽出する(割当済みのベンダーリスト)
				const groupItems = collectionView?.items?.filter(
					(rowItem: any) => rowItem.PIPNo === PIPNo,
				);
				const vendorCodes = groupItems.map((vendor: any) => vendor.VendorCode);
				setAssignedVendorCode(vendorCodes);
			}
		};

		// 左クリック対応
		flex.hostElement.addEventListener('click', handleCellInteraction);

		// 右クリック時: wijmoセル選択イベント
		flex.hostElement.addEventListener('contextmenu', (event: MouseEvent) => {
			handleCellInteraction(event);
		});

		// グループヘッダー行(行固定に伴い各2分割)にボタン追加
		flex.formatItem.addHandler(
			(sender: FlexGrid, targetCell: FormatItemEventArgs) => {
				if (targetCell.panel === sender.cells) {
					const row = sender.rows[targetCell.row];
					if (row instanceof GroupRow) {
						const group = row.dataItem;
						const groupValue = group?.name;

						if (targetCell.col === 0) {
							const buttonId = `group-btn-${groupValue?.replace(/\s+/g, '-')}`;

							// 元のHTMLを退避
							const pipNoHtml = targetCell.cell.innerHTML;

							// cell をクリア
							targetCell.cell.innerHTML = '';
							targetCell.cell.style.display = 'flex';
							targetCell.cell.style.alignItems = 'center';

							// 開閉ボタン
							const tempDiv = document.createElement('div');
							tempDiv.innerHTML = pipNoHtml;
							const toggleBtn = tempDiv.querySelector('span');
							if (toggleBtn) {
								toggleBtn.style.marginRight = '8px';
								toggleBtn.style.cursor = 'pointer';
								targetCell.cell.appendChild(toggleBtn);

								toggleBtn.addEventListener('click', (e) => {
									e.stopPropagation();
									row.isCollapsed = !row.isCollapsed;
									flex.invalidate(); // 再描画
								});
							}

							// Item追加ボタン
							const addBtn = document.createElement('span');
							addBtn.id = buttonId;
							addBtn.textContent = 'Item追加';
							addBtn.style.cssText = `
          display: inline-block;
          background-color: #28a745;
          color: white;
          border-radius: 4px;
          font-size: 12px;
          cursor: pointer;
          margin-right: 8px;
          user-select: none;
          padding: 2px 8px;
          white-space: nowrap;
        `;
							targetCell.cell.appendChild(addBtn);

							addBtn.addEventListener('click', (event) => {
								event.stopPropagation();
								const target = event.target as HTMLElement;
								const id = target.id ?? '';
								const match = id.match(/^group-btn-(.+?)-PIPName:/);
								if (match && match[1]) {
									const pipCode = match[1];
									const pipSelection = { [pipCode]: true };
									setPipSelection(pipSelection);
								}

								updateSelectionFromNextRow(flex, row);
								setPipGenerationMode('edit');
								navigate({
									to: '/p-sys/item-assignment',
									search: currentSearch, // 現在のパラメータを保持
								});
							});

							// PIPコード部分を追加
							Array.from(tempDiv.childNodes).forEach((node) => {
								if (node !== toggleBtn) {
									targetCell.cell.appendChild(node);
								}
							});

							// 親要素のクリックイベント（addBtn除外）
							targetCell.cell.addEventListener('click', (event: MouseEvent) => {
								const target = event.target as HTMLElement;
								if (target === addBtn || target === toggleBtn) return;

								const id = target.id ?? '';
								const match = id.match(/^group-btn-(.+?)-PIPName:/);
								if (match && match[1]) {
									const pipCode = match[1];
									const pipSelection = { [pipCode]: true };
									setPipSelection(pipSelection);
								}

								updateSelectionFromNextRow(flex, row);
							});
						}
					}
				}
			},
		);

		// セルのスタイル設定
		collectionView && createCellTemplate(flex, collectionView);

		// グリッドが表示されたら保存ボタンを表示
		setShowSave(true);
	});
};