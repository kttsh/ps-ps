import { useEffect, useRef, useState } from 'react';
import { useUpdateAip } from '@/features/vendor-assignment/hooks/useUpdateAip';
import { transformVendorResponseToVendorData } from '@/features/vendor-assignment/utils/transformVendorResponseToVendorData';
import { useAlertStore } from '@/stores/useAlartStore';
import { usePipDetailStore } from '@/stores/usePipDetailStore';
import { useSelectedFGStore } from '@/stores/useSelectedFgStore';
import { useSelectedJobNoStore } from '@/stores/useSelectedJobNoStore';
import type { Vendor } from '@/types/common';
import type { VendorResponse } from '@/types/common-api';

interface UseVendorSelectionPanelPropsOptions {
	fetchedVendorJson: string;
	onOpenChange: (open: boolean) => void;
	//setWijmoUpdateMode: React.Dispatch<React.SetStateAction<boolean>>;
	assignedVendorCode: string[];
}

export function useVendorSelectionPanelProps({
	fetchedVendorJson,
	onOpenChange,
	//setWijmoUpdateMode,
	assignedVendorCode,
}: UseVendorSelectionPanelPropsOptions) {
	// 状態管理
	const [availableVendors, setAvailableVendors] = useState<Vendor[]>([]);
	const [selectedVendorIds, setSelectedVendorIds] = useState<string[]>([]);
	const [selectedVendors, setSelectedVendors] = useState<Vendor[]>([]);
	const hasInitialized = useRef(false);

	// 選択したFG
	const { selectedJobNo } = useSelectedJobNoStore();
	const { selectedFG } = useSelectedFGStore();
	const { selectedPipCode } = usePipDetailStore();

	// アラートの状態
	const { showAlert } = useAlertStore();

	// AIP更新hook
	const fgCode = selectedFG?.fgCode ?? null;
	const { mutateAsync: updateAip } = useUpdateAip(
		selectedJobNo,
		fgCode,
		selectedPipCode,
	);

	useEffect(() => {
		if (!hasInitialized.current && fetchedVendorJson) {
			hasInitialized.current = true;

			try {
				const parsed = JSON.parse(fetchedVendorJson);

				// parsed.vendor はすでに JSON 文字列なので、ここでパース
				const vendorList: VendorResponse[] = JSON.parse(parsed.vendor);
				const transformedVendorList: Vendor[] =
					transformVendorResponseToVendorData(vendorList); // Vendor[]に変換

				setAvailableVendors(
					transformedVendorList.filter(
						(vendor) => !assignedVendorCode.includes(vendor.vendorId),
					),
				);
			} catch (error) {
				console.error('ベンダー情報のパースに失敗しました:', error);
			}
		}
	}, [fetchedVendorJson]);

	// ベンダー選択画面にて選択したベンダーを元にAIPを作成
	const aipGenerate = async (vendorsToAssign: Vendor[]) => {
		//VendorSelectionPanel コンポーネントを閉じる
		onOpenChange(false);

		// キャンセルボタン押下時の処理
		if (vendorsToAssign.length === 0) return;

		// vendorIDを配列に変換: 割当済み + ダイアログ内で選択したベンダー
		const vendorIds = Array.from(
			new Set([
				...vendorsToAssign.map((aip) => aip.vendorId),
				assignedVendorCode,
			]),
		);
		// AIP生成API呼び出し
		if (!vendorIds) return;
		try {
			await updateAip(vendorIds);
			showAlert(['AIP_ROW_ADD'], 'info');
			onOpenChange(false);
		} catch (err) {
			showAlert(['UPDATE_ERROR'], 'error');
		}
	};

	return {
		vendors: availableVendors,
		selectedVendorIds,
		onSelectionChange: setSelectedVendorIds,
		onAssign: aipGenerate,
		setSelectedVendors,
		setAvailableVendors,
		selectedVendors,
	};
}
