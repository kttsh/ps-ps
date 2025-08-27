import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useRef, useState } from 'react';
import { AlertMessages } from '@/components/ui/alertMessages';
import { VendorAssignment } from '@/features/vendor-assignment';
import { useAlertStore } from '@/stores/useAlartStore';
import { useSelectedFGStore } from '@/stores/useSelectedFgStore';
import { useSelectedJobNoStore } from '@/stores/useSelectedJobNoStore';
import type { Pip, Vendor } from '@/types';
import { useAipGenerate } from '../../features/vendor-assignment/hooks/useAipGenerate';
import { useVendorList } from '../../features/vendor-assignment/hooks/useVendorList';

// Search Paramsの型定義
interface VendorAssignmentSearch {
	selectedPips: string;
	mode?: 'pip' | 'aip';
}

export const Route = createFileRoute('/ps-ps/vendor-assignment')({
	// Search Paramsのバリデーション
	validateSearch: (search: Record<string, unknown>): VendorAssignmentSearch => {
		return {
			selectedPips: search.selectedPips as string,
			mode: (search.mode as 'pip' | 'aip') || 'pip',
		};
	},

	// Loaderの依存関係を明示
	loaderDeps: ({ search }) => ({ search }),

	// データの事前取得
	loader: async ({ deps }) => {
		const { search } = deps;
		const selectedPips: Pip[] = JSON.parse(search.selectedPips);

		return {
			selectedPips,
			isAipMode: search.mode === 'aip',
			// searchも返す（後で使用するため）
			search,
		};
	},

	component: VendorAssignmentRoute,
});

function VendorAssignmentRoute() {
	const { selectedPips, isAipMode, search } = Route.useLoaderData();
	const navigate = Route.useNavigate();

	// 選択したJobNo、FG
	const { selectedJobNo } = useSelectedJobNoStore();
	const { selectedFG } = useSelectedFGStore();
	// ベンダーリストの取得
	const { data: fetchedItems } = useVendorList(selectedFG?.fgCode);
	// アラートの状態
	const { isAlertVisible, alertMessages, showAlert } = useAlertStore();

	// 画面右側: 選択されたベンダーの一覧を管理
	const [selectedVendors, setSelectedVendors] = useState<string[]>([]);

	// 画面左側: 選択可能なベンダーの一覧を管理
	const [availableVendors, setAvailableVendors] = useState<Vendor[]>([]);
	const hasInitialized = useRef(false);
	useEffect(() => {
		// 初回のみ実行
		if (!hasInitialized.current && fetchedItems) {
			hasInitialized.current = true;

			// responseJSON をパース
			const parsed = JSON.parse(fetchedItems.responseJSON);

			// vendor をさらにパース（配列）
			const vendorList: Vendor[] = JSON.parse(parsed.vendor);

			// selectedPips に割り当て済みの vendor ID を抽出
			const assignedVendorIds = new Set(
				selectedPips.flatMap((pip) => pip.vendors.map((v) => v.code)),
			);

			// 割り当て済みの vendor を除外
			const filtered = vendorList.filter(
				(vendor) => !assignedVendorIds.has(vendor.vendorCode),
			);

			setAvailableVendors(filtered);

			// 割り当て済みベンダーがある場合(AIP編集) 画面右側を更新
			const assigned = vendorList.filter((vendor) =>
				assignedVendorIds.has(vendor.vendorCode),
			);
			if (assigned.length !== 0) {
				setSelectedVendors(assigned);
			}
		}
	}, [fetchedItems, selectedPips]);

	// AIP生成ハンドル
	const { mutate: aipGenerateMutate } = useAipGenerate();
	const handleAipCreate = () => {
		// AIP生成API呼び出し
		aipGenerateMutate(
			{
				userId: 'PSYSP014',
				jobNo: selectedJobNo,
				fgCode: selectedFG?.fgCode,
				targetVendors: selectedVendors,
				pipCode: selectedPips[0].code,
			},
			{
				onSuccess: () => {
					// 通知: 保存成功
					showAlert(['AIP_SUCCESS']);
				},
				onError: () => {
					// 通知: 保存失敗
					showAlert(['AIP_FAILURE']);
				},
			},
		);

		// PIP管理画面に戻る
		handleBack();
	};

	const handlePipsUpdate = (updatedPips: Pip[]) => {
		navigate({
			to: '.',
			search: {
				...search,
				selectedPips: JSON.stringify(updatedPips),
			},
			replace: true,
		});
	};

	const handleBack = () => {
		navigate({ to: '/ps-ps/pips' });
	};

	return (
		<>
			<VendorAssignment
				selectedPips={selectedPips}
				availableVendors={availableVendors}
				setAvailableVendors={setAvailableVendors}
				isAipMode={isAipMode}
				onPipsUpdate={handlePipsUpdate}
				onBack={handleBack}
				onCreateAip={handleAipCreate}
				selectedVendors={selectedVendors}
				setSelectedVendors={setSelectedVendors}
			/>
			{/* アラートメッセージ */}
			{isAlertVisible && alertMessages && (
				<div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
					<AlertMessages messages={alertMessages} />
				</div>
			)}
		</>
	);
}
