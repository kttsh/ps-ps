// 必要なストアをインポート（状態管理用）
import { usePipDetailStore } from "@/stores/usePipDetailStore";
import { useSelectedFGStore } from "@/stores/useSelectedFgStore";
import { useSelectedJobNoStore } from "@/stores/useSelectedJobNoStore";

// Wijmoライブラリからデータコレクションとグリッド関連のコンポーネントをインポート
import { CollectionView } from '@mescius/wijmo';
import { FlexGrid, GroupRow } from '@mescius/wijmo.grid';

// 関数の引数の型定義（TypeScriptのインターフェース）
interface UpdateSelectionFromNextRowParams {
  flex: FlexGrid; // Wijmoのグリッドインスタンス
  row: GroupRow; // 現在のグループ行
  fgData: any[] | undefined; // FGデータ一覧（型が不明なためany[]）
  collectionView: CollectionView; // グリッドのデータソース
  setAssignedVendorCode: (codes: string[]) => void; // ベンダーコードを更新する関数
}

/**
 * カスタムフックの定義（選択行の次の行のデータを取得して状態を更新）
 * @returns 
 */
export const useUpdateSelectionFromNextRow = () => {
  // 各ストアから状態更新関数を取得
  const { setSelectedJobNo } = useSelectedJobNoStore();
  const { setSelectedFG } = useSelectedFGStore();
  const { setSelectedPipCode } = usePipDetailStore();

  // 実際の処理を行う非同期関数を返す
  return async ({
    flex,
    row,
    fgData,
    collectionView,
    setAssignedVendorCode,
  }: UpdateSelectionFromNextRowParams): Promise<void> => {
    // 現在のグループ行のインデックスを取得
    const groupRowIndex = flex.rows.indexOf(row);
    // 次の行を取得（グループ行でないことを確認）
    const nextRow = flex.rows[groupRowIndex + 1];

    // 次の行が存在し、かつグループ行でない場合に処理を実行
    if (nextRow && !(nextRow instanceof GroupRow)) {
      const aip = nextRow.dataItem; // 次の行のデータアイテムを取得
      const { JobNo, FG, PIPNo } = aip; // 必要なプロパティを分割代入

      // 各ストアの状態を更新
      setSelectedJobNo(JobNo);
      setSelectedFG(fgData?.find((fgs: any) => fgs.fgCode === FG) ?? null);
      setSelectedPipCode(PIPNo);

      // 同じPIPNoを持つアイテムをフィルタリング
      const groupItems = collectionView?.items?.filter(
        (rowItem: any) => rowItem.PIPNo === PIPNo,
      );

      // ベンダーコード一覧を抽出して更新
      const vendorCodes = groupItems
        ? groupItems.map((vendor: any) => vendor.VendorCode)
        : [];
      setAssignedVendorCode(vendorCodes);

      // 状態更新後に即座に処理を完了させるための非同期待機
      return new Promise((resolve) => setTimeout(resolve, 0));
    }
  };
};
