import type * as wjcCore from '@mescius/wijmo';
import type { FlexGrid } from '@mescius/wijmo.grid';
import { createFileRoute } from '@tanstack/react-router';
import { useRef, useState } from 'react';
import { MilestoneGrid } from '@/features/milestone/components/MilestoneGrid';
import { SaveButton } from '@/features/milestone/components/SaveButton';

export const Route = createFileRoute('/msr/milestone/$MSRMngCode')({
	component: () => {
		const [collectionView, setCollectionView] =
			useState<wjcCore.CollectionView | null>(null);
		// saveボタンの表示状態
		const [showSave, setShowSave] = useState<boolean>(false);
		// グリッド操作
		const gridRef = useRef<FlexGrid | null>(null);

		return (
			<div className="relative h-screen flex flex-col">
				{showSave && (
					// saveボタン
					<div className="fixed bottom-20 right-30 z-50">
						<SaveButton
							collectionView={collectionView}
							requiredFields={['Status']}
							gridRef={gridRef}
						/>
					</div>
				)}
				{/* マイルストンgrid */}
				<div className="w-[100vw]">
					<MilestoneGrid
						collectionView={collectionView}
						setCollectionView={setCollectionView}
						setShowSave={setShowSave}
						gridRef={gridRef}
					/>
				</div>
			</div>
		);
	},
});
