import type { Row } from '@tanstack/react-table';
import { flexRender } from '@tanstack/react-table';
import { useEffect } from 'react';
import { IndeterminateCheckbox } from '@/components/ui/IndeterminateCheckbox';
import { transformPipDetailResponseToPipDetail } from '@/features/item-assignment/utils/transformPipDetailResponseToPipDetail';
import { cn } from '@/lib/utils';
import { usePipDetailStore } from '@/stores/usePipDetailStore';
import { useSelectedFGStore } from '@/stores/useSelectedFgStore';
import { useSelectedJobNoStore } from '@/stores/useSelectedJobNoStore';
import type { Pip } from '@/types';
import { usePipDetail } from '../hooks/usePipDetail';

interface Props {
	row: Row<Pip>;
	clickedPipCode: string | undefined;
	setClickedPipCode: (code: string | undefined) => void;
}

export const PipTableRow: React.FC<Props> = ({
	row,
	clickedPipCode,
	setClickedPipCode,
}) => {
	const { setPipDetailData, setSelectedPipCode } = usePipDetailStore();
	// プロジェクトの選択状態
	const { selectedJobNo } = useSelectedJobNoStore();
	const { selectedFG } = useSelectedFGStore();

	// PIP詳細取得
	const fgCode = selectedFG?.fgCode ?? null;
	const { refetch: pipDetailRefetch } = usePipDetail(
		selectedJobNo,
		fgCode,
		clickedPipCode,
	);

	useEffect(() => {
		if (clickedPipCode) {
			setSelectedPipCode(clickedPipCode);
		}
	}, [clickedPipCode, setSelectedPipCode]);

	const handleClick = async () => {
		// setClickedPipCode直後にrefetchするとclickedPipCodeが古いときがあるため0.1秒後refetch
		setClickedPipCode(row.id);
		await new Promise((resolve) => setTimeout(resolve, 100));
		const response = await pipDetailRefetch();
		if (response.data) {
			const transformedPipDetail = transformPipDetailResponseToPipDetail(
				response.data.pipDetail,
			);
			setPipDetailData(transformedPipDetail);
		}
	};

	return (
		<tr
			key={row.id}
			onClick={handleClick}
			className={cn(
				'border-b border-gray-100 transition-colors cursor-pointer',
				clickedPipCode === row.id ? 'bg-sky-50' : 'hover:bg-gray-50 bg-white',
			)}
		>
			<td
				className="pl-4 py-2 text-left text-xs text-gray-800"
				onClick={(e) => e.stopPropagation()}
			>
				<IndeterminateCheckbox
					checked={row.getIsSelected()}
					indeterminate={row.getIsSomeSelected()}
					onChange={row.getToggleSelectedHandler()}
				/>
			</td>
			{row.getVisibleCells().map((cell) => (
				<td
					key={cell.id}
					className="px-4 py-3"
					style={{ width: cell.column.getSize() }}
				>
					{flexRender(cell.column.columnDef.cell, cell.getContext())}
				</td>
			))}
		</tr>
	);
};
