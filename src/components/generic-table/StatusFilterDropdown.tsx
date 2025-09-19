import type { Column } from '@tanstack/react-table';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

interface StatusFilterDropdownProps<T> {
	column: Column<T, unknown>;
}

const STATUS_OPTIONS = [
	{ value: 'all', label: 'すべて' },
	{ value: '未割当', label: '未割当' },
	{ value: '一部割当済', label: '一部割当済' },
	{ value: '割当済', label: '割当済' },
	{ value: '割当超過', label: '割当超過' },
	{ value: 'unassigned', label: '未割当 + 一部割当済' }, // Show Unassigned用
];

export function StatusFilterDropdown<T>({
	column,
}: StatusFilterDropdownProps<T>) {
	const filterValue = column.getFilterValue();

	const handleChange = (value: string) => {
		if (value === 'all') {
			column.setFilterValue(undefined);
		} else if (value === 'unassigned') {
			column.setFilterValue(true); // 既存のunassignedFilterを利用
		} else {
			column.setFilterValue(value);
		}
	};

	// filterValueの値に応じて表示値を決定
	const currentValue = () => {
		if (filterValue === true) {
			return 'unassigned';
		}
		if (filterValue === undefined || filterValue === '') {
			return 'all';
		}
		return filterValue as string;
	};

	return (
		<Select value={currentValue()} onValueChange={handleChange}>
			<SelectTrigger
				className="h-6! text-xs rounded-sm bg-white w-full"
				onClick={(e) => e.stopPropagation()}
			>
				<SelectValue placeholder="Filter status..." />
			</SelectTrigger>
			<SelectContent>
				{STATUS_OPTIONS.map((option) => (
					<SelectItem key={option.value} value={option.value}>
						{option.label}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}