import { VendorAssignment } from '@/features/vendor-assignment';
import { useVendors } from '@/features/vendor-assignment/hooks/useVendors';
import { transformVendorResponseToVendorData } from '@/features/vendor-assignment/utils/transformVendorResponseToVendorData';
import { useSelectedFGStore } from '@/stores/useSelectedFgStore';
import type { Pip, Vendor } from '@/types';
import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';

// Search Paramsの型定義
interface VendorAssignmentSearch {
	selectedPips: string;
	mode?: 'pip' | 'aip';
}

export const Route = createFileRoute('/p-sys/vendor-assignment')({
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

		// 利用可能なベンダーを計算
		// const assignedVendorIds = new Set(
		// 	selectedPips.flatMap((pip) => pip.vendors.map((v) => v.id)),
		// );

		// const availableVendors = vendors.filter(
		// 	(vendor) => !assignedVendorIds.has(vendor.id),
		// );

		return {
			selectedPips,
			// availableVendors,
			isAipMode: search.mode === 'aip',
			// searchも返す（後で使用するため）
			search,
		};
	},

	component: VendorAssignmentRoute,
});

function VendorAssignmentRoute() {
	const [vendors, setVendorsData] = useState<Vendor[]>([]);
	// const { selectedPips, availableVendors, isAipMode, search } =
	// 	Route.useLoaderData();
	const { selectedPips, isAipMode, search } = Route.useLoaderData();
	const navigate = Route.useNavigate();

	const { selectedFG } = useSelectedFGStore();
	const fgCode = selectedFG?.fgCode ?? null;
	const { data: vendorsResponse = [], isError } = useVendors(fgCode);
	console.log(`vendorsResponse:${JSON.stringify(vendorsResponse)}`);
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
		selectedPips.flatMap((pip) => pip.vendors.map((v) => v.id)),
	);

	const availableVendors = vendors.filter(
		(vendor) => !assignedVendorIds.has(vendor.id),
	);

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
		navigate({ to: '/p-sys/pips' });
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
