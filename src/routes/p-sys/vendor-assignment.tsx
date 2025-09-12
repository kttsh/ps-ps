import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { transformPipDetailResponseToPipDetail } from '@/features/item-assignment/utils/transformPipDetailResponseToPipDetail';
import { usePipDetail } from '@/features/pip-management/hooks/usePipDetail';
import { VendorAssignment } from '@/features/vendor-assignment';
import { useVendors } from '@/features/vendor-assignment/hooks/useVendors';
import { transformVendorResponseToVendorData } from '@/features/vendor-assignment/utils/transformVendorResponseToVendorData';
import { useFgCodeUrlSync } from '@/hooks/useFgCodeUrlSync';
import { useFgsStore } from '@/stores/useFgsStore';
import { usePipDetailStore } from '@/stores/usePipDetailStore';
import { useSelectedFGStore } from '@/stores/useSelectedFgStore';
import { useSelectedJobNoStore } from '@/stores/useSelectedJobNoStore';
import type { PipDetail, Vendor } from '@/types';

// Search Paramsの型定義
interface VendorAssignmentSearch {
	selectedPips: string;
	mode?: 'pip' | 'aip';
	fgcode?: string; // fgcodeパラメータを追加
}

export const Route = createFileRoute('/p-sys/vendor-assignment')({
	// Search Paramsのバリデーション
	validateSearch: (search: Record<string, unknown>): VendorAssignmentSearch => {
		return {
			selectedPips: search.selectedPips as string,
			mode: (search.mode as 'pip' | 'aip') || 'pip',
			fgcode: search.fgcode as string | undefined, // fgcodeパラメータを保持
		};
	},

	// Loaderの依存関係を明示
	loaderDeps: ({ search }) => ({ search }),

	// データの事前取得
	loader: async ({ deps }) => {
		const { search } = deps;

		return {
			isAipMode: search.mode === 'aip',
			// searchも返す（後で使用するため）
			search,
		};
	},

	component: VendorAssignmentRoute,
});

function VendorAssignmentRoute() {
	const [vendors, setVendorsData] = useState<Vendor[]>([]);
	const { isAipMode, search } = Route.useLoaderData();
	const navigate = Route.useNavigate();

	const { selectedJobNo } = useSelectedJobNoStore();
	const { selectedFG, setSelectedFG } = useSelectedFGStore();
	const { fgs } = useFgsStore();

	const { selectedPipCode } = usePipDetailStore();

	const [selectedPips, setSelectedPips] = useState<PipDetail[]>([]);

	// URL同期の初期化
	useFgCodeUrlSync({
		fgs,
		onFgChange: (fg) => {
			// 現在の値と異なる場合のみ更新
			const newFgCode = fg?.fgCode;
			const currentFgCode = selectedFG?.fgCode;

			if (newFgCode !== currentFgCode) {
				setSelectedFG(fg || null);
			}
		},
	});

	// ベンダーリスト取得
	const fgCode = selectedFG?.fgCode ?? null;
	const { data: vendorsResponse = [] } = useVendors(fgCode);
	const { data: pipDetailResponse } = usePipDetail(
		selectedJobNo,
		fgCode,
		selectedPipCode,
	);

	useEffect(() => {
		if (pipDetailResponse) {
			// 数値にすべきカラムの型を変換
			const transformedpipDetail = transformPipDetailResponseToPipDetail(
				pipDetailResponse.pipDetail,
			);
			setSelectedPips([transformedpipDetail]);

			// pipDetailResponse.Messages?.some(
			// 	(msg: ResponseInfo) => msg.Id === 'NO_PIP',
			// ) && showAlert(['NO_PIP'], 'warning');
		}
	}, [pipDetailResponse]);

	useEffect(() => {
		if (vendorsResponse) {
			const transformedVendors: Vendor[] =
				transformVendorResponseToVendorData(vendorsResponse);
			setVendorsData(transformedVendors);
		} else {
			setVendorsData([]);
		}
	}, [vendorsResponse]);

	const assignedVendorIds = new Set(
		selectedPips.flatMap((pip) => pip.vendors.map((v) => v.vendorId)),
	);

	const availableVendors = vendors.filter(
		(vendor) => !assignedVendorIds.has(vendor.vendorId),
	);

	const handlePipsUpdate = (updatedPips: PipDetail[]) => {
		setSelectedPips(updatedPips);
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
		// fgcodeパラメータを保持したまま/pipsに戻る
		const { fgcode } = search;
		navigate({
			to: '/p-sys/pips',
			search: fgcode ? { fgcode } : {},
		});
	};

	return (
		<VendorAssignment
			selectedPips={selectedPips}
			availableVendors={availableVendors}
			isAipMode={isAipMode}
			onPipsUpdate={handlePipsUpdate}
			onBack={handleBack}
		/>
	);
}
