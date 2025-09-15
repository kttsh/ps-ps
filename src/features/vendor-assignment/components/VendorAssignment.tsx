import { useRouter } from '@tanstack/react-router';
import { CircleCheckBig, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { usePips } from '@/features/pip-management/hooks/usePips';
import { useAlertStore } from '@/stores/useAlartStore';
import { usePipDetailStore } from '@/stores/usePipDetailStore';
import { useSelectedFGStore } from '@/stores/useSelectedFgStore';
import { useSelectedJobNoStore } from '@/stores/useSelectedJobNoStore';
import type { PipDetail } from '@/types';
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
	// 初期状態を保存
	const [initialPips, setInitialPips] = useState<PipDetail[]>([]);

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

	// 初期状態を設定
	useEffect(() => {
		if (selectedPips.length > 0 && initialPips.length === 0) {
			setInitialPips(JSON.parse(JSON.stringify(selectedPips)));
		}
	}, [selectedPips, initialPips.length]);

	// 変更があるかチェック
	const hasChanges = useMemo(() => {
		if (initialPips.length === 0) return false;
		
		// PIPの数が異なる場合
		if (selectedPips.length !== initialPips.length) return true;
		
		// 各PIPのベンダーリストを比較
		for (let i = 0; i < selectedPips.length; i++) {
			const currentPip = selectedPips[i];
			const initialPip = initialPips.find(p => p.pipCode === currentPip.pipCode);
			
			if (!initialPip) return true;
			
			// ベンダー数が異なる場合
			if (currentPip.vendors.length !== initialPip.vendors.length) return true;
			
			// 各ベンダーのIDを比較
			const currentVendorIds = currentPip.vendors.map(v => v.vendorId).sort();
			const initialVendorIds = initialPip.vendors.map(v => v.vendorId).sort();
			
			for (let j = 0; j < currentVendorIds.length; j++) {
				if (currentVendorIds[j] !== initialVendorIds[j]) return true;
			}
		}
		
		return false;
	}, [selectedPips, initialPips]);

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
						disabled={!hasChanges}
						className={`flex items-center gap-2 h-8 px-3 ${
							hasChanges 
								? 'bg-orange-500 hover:bg-orange-500/80 text-white hover:text-white cursor-pointer' 
								: 'bg-gray-300 text-gray-500 cursor-not-allowed'
						}`}
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
