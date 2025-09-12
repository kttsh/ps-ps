'use client';

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

interface FilterProps {
	items: string[];
	selectedItem: string | null;
	onItemChange: (item: string | null) => void;
	category: 'Order' | 'Function';
}

export const Filter = ({
	items,
	selectedItem,
	onItemChange,
	category,
}: FilterProps) => {
	// "All XXX"を選択した場合、フィルタなし
	const handleItemChange = (value: string) => {
		onItemChange(value === 'all' ? null : value);
	};

	return (
		<Select value={selectedItem || 'all'} onValueChange={handleItemChange}>
			<SelectTrigger className="w-[180px]">
				<SelectValue />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value="all">All {category}</SelectItem>
				{items.map((item) => (
					<SelectItem key={item} value={item}>
						{item}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
};