import { useEffect, useState } from 'react';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { VendorSelectionPanel } from '@/features/vendor-assignment/components/VendorSelectionPanel';
import { useSelectedFGStore } from '@/stores/useSelectedFgStore';
import type { Vendor } from '@/types/common';
import { useVendors } from '../../vendor-assignment/hooks/useVendors';
import { useVendorSelectionPanelProps } from '../hooks/useVendorSelectionPanelProps';
import type { AIPVendorResponse } from '../types';

interface AipGenerateDialogProps {
	onSubmit?: (data: { name: string; username: string }) => void;
	// ダイアログの開閉状態
	open: boolean;
	onOpenChange: (open: boolean) => void;
	assignedVendorCode: string[];
	onAssign?: (aipResult: AIPVendorResponse) => void;
}

export function AipGenerateDialog({
	open,
	onOpenChange,
	//setWijmoUpdateMode,
	assignedVendorCode,
	onAssign,
}: AipGenerateDialogProps) {
	// 選択したFG
	const { selectedFG } = useSelectedFGStore();
	// ベンダー選択画面準備
	const { data: initialVendorList = [] } = useVendors(selectedFG?.fgCode ?? '');
	const {
		vendors,
		selectedVendorIds,
		onSelectionChange,
		onAssign: internalAssign,
	} = useVendorSelectionPanelProps({
		initialVendorList,
		onOpenChange,
		//setWijmoUpdateMode,
		assignedVendorCode, // 除外対象
	});

	// 未割り当てベンダーを保持するステート
	const [filteredVendors, setFilteredVendors] = useState<typeof vendors>([]);

	useEffect(() => {
		if (vendors && vendors.length > 0 && assignedVendorCode) {
			const filtered = vendors.filter(
				(vendor) => !assignedVendorCode.includes(vendor.aipCode),
			);
			setFilteredVendors(filtered);
		}
	}, [vendors, assignedVendorCode]);

	// ベンダー割り当てAPIを呼び出し、結果を親コンポーネントに通知
	const handleAssign = async (selectedVendors: Vendor[]) => {
		const aipResult = await internalAssign(selectedVendors);
		onAssign?.(aipResult);
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="h-[70vh] flex">
				<DialogHeader>
					<DialogTitle />
					<DialogDescription />
				</DialogHeader>
				<div className="w-[90%]">
					<VendorSelectionPanel
						parentName="milestone" // 親コンポーネント情報を伝達
						vendors={filteredVendors} // 選択画面では割り当て済みを除く
						selectedVendorIds={selectedVendorIds}
						onSelectionChange={onSelectionChange}
						onAssign={handleAssign}
					/>
				</div>
			</DialogContent>
		</Dialog>
	);
}
