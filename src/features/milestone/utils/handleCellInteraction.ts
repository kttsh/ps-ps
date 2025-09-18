// handleCellInteraction.ts

import { usePipDetailStore } from '@/stores/usePipDetailStore';
import { useSelectedFGStore } from '@/stores/useSelectedFgStore';
import { useSelectedJobNoStore } from '@/stores/useSelectedJobNoStore';
import * as wjcCore from '@mescius/wijmo';
import type { FlexGrid } from '@mescius/wijmo.grid';

/**
 * FlexGrid のセルクリック・右クリック時に呼び出されるイベントハンドラを生成する関数。
 * 対象セルのデータから JobNo, FG, PIPNo を取得し、状態ストアを更新する。
 * また、同じ PIPNo を持つ行からベンダーコード一覧を抽出して更新する。
 *
 * @param flex - Wijmo FlexGrid インスタンス
 * @param collectionView - グリッドのデータソース（CollectionView）
 * @param fgData - 全FGデータの配列
 * @param setAssignedVendorCode - ベンダーコード一覧を更新する関数
 * @returns MouseEvent に対応するイベントハンドラ関数
 */
export const handleCellInteraction = (
  flex: FlexGrid,
  collectionView: wjcCore.CollectionView | null,
  fgData: any[],
  setAssignedVendorCode: (codes: string[]) => void,
): ((event: MouseEvent) => void) => {
  // Zustand ストアから setter を取得（React コンポーネント外でも使用可能）
  const { setSelectedPipCode } = usePipDetailStore.getState();
  const { setSelectedJobNo } = useSelectedJobNoStore.getState();
  const { setSelectedFG } = useSelectedFGStore.getState();

  // 実際のイベントハンドラ関数を返す
  return (event: MouseEvent) => {
    const ht = flex.hitTest(event); // クリックされたセルの情報を取得

    // 通常セル（1）または行ヘッダーセル（3）のみ処理対象とする
    if (ht.cellType === 1 || ht.cellType === 3) {
      const aip = flex.rows[ht.row].dataItem; // 対象行のデータアイテムを取得
      const { JobNo, FG, PIPNo } = aip || {}; // 必要なプロパティを抽出

      // 必須情報が揃っていない場合は処理を中断（例：グループヘッダー行など）
      if (!JobNo || !FG || !PIPNo) return;

      // Zustand ストアに選択情報を反映
      setSelectedJobNo(JobNo);
      setSelectedFG(fgData?.find((fgs) => fgs.fgCode === FG) ?? null);
      setSelectedPipCode(PIPNo);

      // 同じ PIPNo を持つ行をフィルタし、ベンダーコード一覧を抽出
      const groupItems = collectionView?.items?.filter(
        (rowItem) => rowItem.PIPNo === PIPNo,
      );
      const vendorCodes = groupItems?.map((vendor) => vendor.VendorCode) ?? [];

      // ベンダーコード一覧を更新
      setAssignedVendorCode(vendorCodes);
    }
  };
};
