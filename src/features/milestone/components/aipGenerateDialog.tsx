import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { VendorSelectionPanel } from '@/features/vendor-assignment/components/VendorSelectionPanel';
import { useSelectedFGStore } from '@/stores/useSelectedFgStore';
import { useVendors } from '../../vendor-assignment/hooks/useVendors';
import { useVendorSelectionPanelProps } from '../hooks/useVendorSelectionPanelProps';

interface AipGenerateDialogProps {
	onSubmit?: (data: { name: string; username: string }) => void;
	// ダイアログの開閉状態
	open: boolean;
	onOpenChange: (open: boolean) => void;
	//setWijmoUpdateMode: React.Dispatch<React.SetStateAction<boolean>>;
	assignedVendorCode: string[];
}

export function AipGenerateDialog({
	open,
	onOpenChange,
	//setWijmoUpdateMode,
	assignedVendorCode,
}: AipGenerateDialogProps) {
	// 選択したFG
	const { selectedFG } = useSelectedFGStore();
	// ベンダー選択画面準備
	const { data: initialVendorList } = useVendors(selectedFG?.fgCode ?? '');
	// JSON文字列に変換（useVendorSelectionPanelPropsの仕様に合わせて）
	const fetchedVendorJson = initialVendorList
		? JSON.stringify({ vendor: JSON.stringify(initialVendorList) })
		: '';
	const { vendors, selectedVendorIds, onSelectionChange, onAssign } =
		useVendorSelectionPanelProps({
			fetchedVendorJson,
			onOpenChange,
			//setWijmoUpdateMode,
			assignedVendorCode, // 除外対象
		});

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
						vendors={vendors}
						selectedVendorIds={selectedVendorIds}
						onSelectionChange={onSelectionChange}
						onAssign={onAssign}
					/>
				</div>
			</DialogContent>
		</Dialog>
	);
}