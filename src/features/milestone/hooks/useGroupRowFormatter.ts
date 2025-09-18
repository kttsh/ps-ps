// useGroupRowFormatter.ts
import { transformPipDetailResponseToPipDetail } from '@/features/item-assignment/utils/transformPipDetailResponseToPipDetail';
import { useItems } from '@/features/item-management/hooks/useItems';
import { usePipDetail } from '@/features/pip-management/hooks/usePipDetail';
import { usePipDetailStore } from '@/stores/usePipDetailStore';
import { usePipGenerationModeStore } from '@/stores/usePipGenerationModeStore';
import { usePipsStore } from '@/stores/usePipsStore';
import { useSelectedFGStore } from '@/stores/useSelectedFgStore';
import { useSelectedJobNoStore } from '@/stores/useSelectedJobNoStore';
import type { FlexGrid, FormatItemEventArgs } from '@mescius/wijmo.grid';
import { GroupRow } from '@mescius/wijmo.grid';
import { useSearch } from '@tanstack/react-router';
import type { InitializeMilestoneGridProps } from './InitializeMilestoneGridProps';
import { useUpdateSelectionFromNextRow } from './useUpdateSelectionFromNextRow';


interface GroupRowFormatterProps {
  collectionView: InitializeMilestoneGridProps['collectionView'];
  fgData: InitializeMilestoneGridProps['fgData'];
  setAssignedVendorCode: InitializeMilestoneGridProps['setAssignedVendorCode'];
  navigate: InitializeMilestoneGridProps['navigate'];
}


/**
 * グループ行の formatItem 処理を返すカスタムフック
 */
export const useGroupRowFormatter = ({
  collectionView,
  fgData,
  setAssignedVendorCode,
  navigate,
}: GroupRowFormatterProps) => {
  const currentSearch = useSearch({ strict: false });
  // Zustandストアから必要な状態と更新関数を取得
  const { selectedJobNo } = useSelectedJobNoStore();
  const { selectedFG } = useSelectedFGStore();
  const { selectedPipCode, setPipDetailData } = usePipDetailStore();
  const { setPipSelection } = usePipsStore();
  const { setPipGenerationMode } = usePipGenerationModeStore();

  // PIP詳細とアイテム情報の取得用クエリ
  const fgCode = selectedFG?.fgCode ?? null;
  const { refetch: pipDetailRefetch } = usePipDetail(selectedJobNo, fgCode, selectedPipCode);
  const { refetch: itemsRefetch } = useItems(selectedJobNo, fgCode);

  // 行選択更新用のカスタムフック
  const updateSelectionFromNextRow = useUpdateSelectionFromNextRow();

  return (sender: FlexGrid, targetCell: FormatItemEventArgs) => {
    if (targetCell.panel !== sender.cells) return;

    const row = sender.rows[targetCell.row];
    if (!(row instanceof GroupRow)) return;

    const group = row.dataItem;
    const groupValue = group?.name;
    if (targetCell.col !== 0 || !groupValue) return;

    const buttonId = `group-btn-${groupValue.replace(/\s+/g, '-')}`;
    const pipNoHtml = targetCell.cell.innerHTML;

    // セル初期化
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
        sender.invalidate();
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

    // Item追加ボタンのクリック処理
    addBtn.addEventListener('click', async (event) => {
      event.stopPropagation();
      const target = event.target as HTMLElement;
      const id = target.id ?? '';
      const match = id.match(/^group-btn-(.+?)-PIPName:/);
      if (match?.[1]) {
        const pipCode = match[1];
        setPipSelection({ [pipCode]: true });
      }

      updateSelectionFromNextRow({ flex: sender, row, fgData, collectionView, setAssignedVendorCode });

      const pipDetailResponse = await pipDetailRefetch();
      if (pipDetailResponse.data) {
        const transformed = transformPipDetailResponseToPipDetail(pipDetailResponse.data.pipDetail);
        setPipDetailData(transformed);

        navigate({
          to: '/p-sys/item-assignment',
          search: currentSearch,
        });
        setPipGenerationMode('edit');
        itemsRefetch();
      }
    });

    // PIPコード部分を再追加
    Array.from(tempDiv.childNodes).forEach((node) => {
      if (node !== toggleBtn) {
        targetCell.cell.appendChild(node);
      }
    });

    // セル全体のクリックイベント（addBtn除外）
    targetCell.cell.addEventListener('click', (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (target === addBtn || target === toggleBtn) return;

      const id = target.id ?? '';
      const match = id.match(/^group-btn-(.+?)-PIPName:/);
      if (match?.[1]) {
        const pipCode = match[1];
        setPipSelection({ [pipCode]: true });
      }

      updateSelectionFromNextRow({ flex: sender, row, fgData, collectionView, setAssignedVendorCode });
    });
  };
};
