import { useState } from 'react';
import { PageHeader } from './components/PageHeader';
import { PipCardGrid } from './components/PipCardGrid';
import { VendorSelectionPanel } from './components/VendorSelectionPanel';
import { useVendorAssignment } from './hooks/useVendorAssignment';
import type { VendorAssignmentProps } from './types';

export const VendorAssignment: React.FC<VendorAssignmentProps> = ({
	selectedPips,
	availableVendors,
	setAvailableVendors,
	isAipMode,
	onPipsUpdate,
	onBack,
	onCreateAip,
	selectedVendors,
	setSelectedVendors,
}) => {
	// 選択されたベンダーのインデックス
	const [selectedVendorIds, setSelectedVendorIds] = useState<string[]>([]);

	const { assignVendors } = useVendorAssignment({
		selectedPips,
		onPipsUpdate,
	});

	return (
		<div className="h-screen bg-gray-100 p-6 overflow-hidden">
			<PageHeader
				title={isAipMode ? 'AIP生成' : 'PIPベンダー割り当て'}
				onBack={onBack}
				onCreateAip={onCreateAip}
				selectedVendors={selectedVendors}
			/>

			<div className="max-w-10xl mx-auto h-full flex gap-4 mt-6">
				<div className="h-[83%] w-1/2">
					<VendorSelectionPanel
						vendors={availableVendors}
						selectedVendorIds={selectedVendorIds}
						onSelectionChange={setSelectedVendorIds}
						onAssign={assignVendors}
						setSelectedVendors={setSelectedVendors} // 選択されたベンダー
						setAvailableVendors={setAvailableVendors} // 選択可能なベンダーの更新関数
					/>
				</div>

				<div className="w-1/2">
					<PipCardGrid
						pips={selectedPips}
						isAipMode={isAipMode}
						//onRemoveVendor={removeVendor}
						//onRemovePip={removePip}
						// 選択されたベンダー
						selectedVendors={selectedVendors}
						setSelectedVendors={setSelectedVendors}
						// 選択可能なベンダー
						availableVendors={availableVendors}
						setAvailableVendors={setAvailableVendors}
					/>
				</div>
			</div>
		</div>
	);
};
