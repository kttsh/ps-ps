import { useUpdateAip } from '@/features/vendor-assignment/hooks/useUpdateAip';
import { transformVendorResponseToVendorData } from '@/features/vendor-assignment/utils/transformVendorResponseToVendorData';
import { useAlertStore } from '@/stores/useAlartStore';
import { usePipDetailStore } from '@/stores/usePipDetailStore';
import { useSelectedFGStore } from '@/stores/useSelectedFgStore';
import { useSelectedJobNoStore } from '@/stores/useSelectedJobNoStore';
import type { Vendor } from '@/types/common';
import type { VendorResponse } from '@/types/common-api';
import { useEffect, useState } from 'react';

interface UseVendorSelectionPanelPropsOptions {
  initialVendorList: VendorResponse[]; // 初期ベンダーリスト（APIレスポンス）
  onOpenChange: (open: boolean) => void; // パネルの開閉状態を制御する関数
  assignedVendorCode: string[]; // すでに割り当て済みのベンダーID一覧
}

/**
 * ベンダー選択パネルの状態とAIP更新処理を管理するカスタムフック。
 * - ベンダーリストの整形
 * - 選択状態の管理
 * - AIP更新APIの呼び出し
 */
export function useVendorSelectionPanelProps({
  initialVendorList,
  onOpenChange,
  assignedVendorCode,
}: UseVendorSelectionPanelPropsOptions) {
  // 利用可能なベンダー一覧
  const [availableVendors, setAvailableVendors] = useState<Vendor[]>([]);

  // 選択されたベンダーID（チェックボックスなどで選ばれたもの）
  const [selectedVendorIds, setSelectedVendorIds] = useState<string[]>([]);

  // 選択されたベンダーオブジェクト（詳細表示などに使用）
  const [selectedVendors, setSelectedVendors] = useState<Vendor[]>([]);

  // 選択中のJobNo, FG, PIPNoを取得（AIP更新に必要）
  const { selectedJobNo } = useSelectedJobNoStore();
  const { selectedFG } = useSelectedFGStore();
  const { selectedPipCode } = usePipDetailStore();

  // アラート表示用の関数
  const { showAlert } = useAlertStore();

  // AIP更新用のmutation関数
  const fgCode = selectedFG?.fgCode ?? null;
  const { mutateAsync: updateAip } = useUpdateAip(selectedJobNo, fgCode, selectedPipCode);

  /**
   * 初期ベンダーリストが変更されたときに、利用可能なベンダー一覧を整形してセット
   */
  useEffect(() => {
    if (initialVendorList && initialVendorList.length > 0) {
      try {
        // APIレスポンスを内部用のVendor型に変換
        const transformedVendorList: Vendor[] =
          transformVendorResponseToVendorData(initialVendorList);

        // すでに割り当て済みのベンダーを除外
        setAvailableVendors(
          transformedVendorList.filter(
            (vendor) => !assignedVendorCode.includes(vendor.vendorId),
          ),
        );
      } catch (error) {
        console.error('ベンダー情報のパースに失敗しました:', error);
      }
    }
  }, [initialVendorList, assignedVendorCode]);

  /**
   * ベンダー選択パネルで選択されたベンダーを元にAIPを更新する処理
   */
  const aipGenerate = async (vendorsToAssign: Vendor[]) => {
    // パネルを閉じる
    onOpenChange(false);

    // キャンセルされた場合は何もしない
    if (vendorsToAssign.length === 0) return;

    // 割当済み + 新規選択ベンダーを統合し、重複を排除
    const vendorIds = Array.from(
      new Set([
        ...vendorsToAssign.map((aip) => aip.vendorId),
        ...assignedVendorCode,
      ]),
    );

    if (!vendorIds) return;

    try {
      // AIP更新APIを呼び出す
      const result = await updateAip(vendorIds);

      // 成功時にアラート表示
      showAlert(['AIP_ROW_ADD'], 'info');
      onOpenChange(false);
      return result;
    } catch {
      // 失敗時にエラーアラート表示
      showAlert(['UPDATE_PIP_ERROR'], 'error');
    }
  };

  // フックが返すプロパティ・関数群
  return {
    vendors: availableVendors, // 表示用ベンダー一覧
    selectedVendorIds,         // 選択中のベンダーID
    onSelectionChange: setSelectedVendorIds, // 選択変更時のハンドラ
    onAssign: aipGenerate,     // 割当処理
    setSelectedVendors,        // 選択ベンダーの更新
    setAvailableVendors,       // 利用可能ベンダーの更新
    selectedVendors,           // 選択中のベンダーオブジェクト
  };
}
