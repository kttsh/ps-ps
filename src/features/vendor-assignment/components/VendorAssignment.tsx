import { Button } from '@/components/ui/button';
import { CircleCheck } from 'lucide-react';
import { useState } from 'react';
import { useVendorAssignment } from '../hooks/useVendorAssignment';
import type { VendorAssignmentProps } from '../types/types';
import { PageHeader } from './PageHeader';
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

	return (
		<div className="h-screen bg-gray-100 p-6 overflow-hidden">
			<div className="flex justify-between items-center">
				{/* Backボタン */}
				<PageHeader
					title={isAipMode ? 'AIP生成' : 'PIPベンダー割り当て'}
					onBack={onBack}
				/>
				{/* Updateボタン */}
				<Button
					size="sm"
					variant="outline"
					// onClick={handleAipGeneration}
					// disabled={selectedCount === 0}
					className="flex items-center gap-2 h-8 px-3 bg-orange-500 hover:bg-orange-500/80 text-white hover:text-white cursor-pointer"
				>
					<CircleCheck className="w-4 h-4" />
					Update
				</Button>
			</div>

			<div className="max-w-10xl mx-auto h-full flex gap-4 mt-6">
				<div className="h-[83%] w-1/2">
					<VendorSelectionPanel
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

