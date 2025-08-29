"use client";

import { Button } from "@/components/ui/button";
import { Filter } from "./Filter";

interface FilterBarProps {
	orders: string[];
	functions: string[];
	selectedOrder: string | null;
	selectedFunction: string | null;
	onOrderChange: (order: string | null) => void;
	onFunctionChange: (func: string | null) => void;
}

export const FilterBar = ({
	orders,
	functions,
	selectedOrder,
	selectedFunction,
	onOrderChange,
	onFunctionChange,
}: FilterBarProps) => {
	// フィルタをクリア
	const handleClearFilters = () => {
		onOrderChange(null);
		onFunctionChange(null);
	};

	return (
		<div className="bg-card rounded-lg p-4 mb-6 shadow-sm">
			<div className="flex flex-col md:flex-row gap-4">
				<div className="px-3">
					{/* Orderセレクトボックス */}
					<Filter
						items={orders}
						selectedItem={selectedOrder}
						onItemChange={onOrderChange}
						category="Order"
					/>
				</div>

				<div className="px-3">
					{/* Functionセレクトボックス */}
					<Filter
						items={functions}
						selectedItem={selectedFunction}
						onItemChange={onFunctionChange}
						category="Function"
					/>
				</div>
				<Button onClick={handleClearFilters}>clear</Button>
			</div>
		</div>
	);
};

