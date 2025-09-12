import { useRouter } from '@tanstack/react-router';
import { CircleCheckBig, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { usePips } from '@/features/pip-management/hooks/usePips';
import { useAlertStore } from '@/stores/useAlartStore';
import { usePipDetailStore } from '@/stores/usePipDetailStore';
import { useSelectedFGStore } from '@/stores/useSelectedFgStore';
import { useSelectedJobNoStore } from '@/stores/useSelectedJobNoStore';
import { useUpdateAip } from '../hooks/useUpdateAip';
import { useVendorAssignment } from '../hooks/useVendorAssignment';
import type { VendorAssignmentProps } from '../types';
import { PipCardGrid } from './PipCardGrid';
import { VendorSelectionPanel } from './VendorSelectionPanel';

export const VendorAssignment: React.FC<VendorAssignmentProps> = ({
	selectedPips,
	availableVendors,
	isAipMode,
	onPipsUpdate,
	onBack,
}) => {
	const [selectedVendorIds, setSelectedVendorIds] = useState<string[]>([]);

	const { assignVendors, removeVendor, removePip } = useVendorAssignment({
		selectedPips,
		onPipsUpdate,
	});
	const { selectedPipCode } = usePipDetailStore();
	// メッセージ表示
	const { showAlert } = useAlertStore();
	const { selectedJobNo } = useSelectedJobNoStore();
	const { selectedFG } = useSelectedFGStore();
	const router = useRouter();

	const fgCode = selectedFG?.fgCode ?? null;
	const { mutate: updateAip } = useUpdateAip(
		selectedJobNo,
		fgCode,
		selectedPipCode,
	);

	const { refetch: pipsRefetch } = usePips(selectedJobNo, fgCode);

	const handleAipUpdate = async () => {
		const vendorIds = selectedPips.flatMap((pip) =>
			pip.vendors.map((aip) => aip.vendorId),
		);
		if (vendorIds) {
			updateAip(vendorIds, {
				onSuccess: async () => {
					try {
						await pipsRefetch();
						showAlert(['UPDATE_PIP_SUCCESS'], 'success');
						onPipsUpdate([]);
						router.history.go(-1);
					} catch (error) {
						console.error('更新失敗:', error);
						showAlert(['UPDATE_PIP_ERROR'], 'error');
					}
				},
			});
		}
	};

	return (
		<div className="h-screen bg-gray-100 p-6 overflow-hidden">
			<div className="flex justify-between">
				{/* タイトル */}
				<h2 className="text-lg font-semibold text-gray-800">AIP Management</h2>

				<div className="flex gap-2">
					{/* Updateボタン */}
					<Button
						size="sm"
						variant="outline"
						onClick={handleAipUpdate}
						// disabled={selectedCount === 0}
						className="flex items-center gap-2 h-8 px-3 bg-orange-500 hover:bg-orange-500/80 text-white hover:text-white cursor-pointer"
					>
						<CircleCheckBig className="w-4 h-4" />
						Update
					</Button>
					<Button
						size="sm"
						variant="outline"
						onClick={onBack}
						className="text-gray-800 cursor-pointer"
					>
						<X className="w-4 h-4" />
						Close
					</Button>
				</div>
			</div>

			<div className="max-w-10xl mx-auto h-full flex gap-4 mt-6">
				<div className="h-[83%] w-1/2">
					<VendorSelectionPanel
						parentName="VendorAssignment"
						vendors={availableVendors}
						selectedVendorIds={selectedVendorIds}
						onSelectionChange={setSelectedVendorIds}
						onAssign={assignVendors}
					/>
				</div>

				<div className="w-1/2">
					<PipCardGrid
						pips={selectedPips}
						isAipMode={isAipMode}
						onRemoveVendor={removeVendor}
						onRemovePip={removePip}
					/>
				</div>
			</div>
		</div>
	);
};
