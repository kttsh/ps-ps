import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { FilterBar } from '@/features/msr-unit-selector/components/FilterBar';
import { UnitCardList } from '@/features/msr-unit-selector/components/UnitCardList';
import type { ScheduleUnit } from '@/features/msr-unit-selector/types/schedule-unit';

// サンプルMSR管理単位
const sampleScheduleUnits: ScheduleUnit[] = [
	{
		id: 'CTRL-000001',
		name: 'Changi T5-EPC',
		startDate: new Date('2023-10-01'),
		endDate: new Date('2024-03-31'),
		status: '進行中',
		assignees: ['田中太郎', '佐藤健太'],
		tags: ['高優先度', '電子部品'],
		order: ['433500', '573160'],
		function: ['B:Process'],
	},
	{
		id: 'CTRL-000002',
		name: 'T221(機械)',
		startDate: new Date('2023-11-15'),
		endDate: new Date('2024-05-20'),
		status: '進行中',
		assignees: ['佐藤花子', '鈴木雄太'],
		tags: ['中優先度', '機械部品'],
		order: ['43340A'],
		function: ['M:Machinery'],
	},
	{
		id: 'CTRL-000003',
		name: 'AOFP',
		startDate: new Date('2023-09-01'),
		endDate: new Date('2024-02-28'),
		status: '遅延',
		assignees: ['鈴木一郎', '高橋直子', '伊藤誠'],
		tags: ['高優先度', '原材料'],
		order: ['563390'],
		function: ['B:Process'],
	},
	{
		id: 'CTRL-000004',
		name: 'SAMUR',
		startDate: new Date('2023-12-01'),
		endDate: new Date('2024-04-30'),
		status: '未開始',
		assignees: ['山田次郎'],
		tags: ['低優先度', '包装'],
		order: ['563420'],
		function: ['B:Process'],
	},
	{
		id: 'CTRL-999999',
		name: 'テンプレ',
		startDate: new Date('2024-01-15'),
		endDate: new Date('2024-07-15'),
		status: '完了',
		assignees: ['高橋真理', '中村健太'],
		tags: ['中優先度', 'IT機器'],
		order: ['335315'],
		function: ['B:Process'],
	},
];

// 利用可能なオーダーとファンクションのリスト(重複削除)
const availableOrders = Array.from(
	new Set(sampleScheduleUnits.flatMap((unit) => unit.order)),
);
const availableFunctions = Array.from(
	new Set(sampleScheduleUnits.flatMap((unit) => unit.function)),
);

export const Route = createFileRoute('/msr/msr-unit-selector')({
	component: () => {
		// フィルタリング用の状態
		const [selectedOrderFilter, setSelectedOrderFilter] = useState<
			string | null
		>(null);
		const [selectedFunctionFilter, setSelectedFunctionFilter] = useState<
			string | null
		>(null);

		// 選択されたオーダーとファンクションに基づいてMSR管理単位をフィルタリング
		const filteredUnits = sampleScheduleUnits.filter((unit) => {
			const orderMatch =
				!selectedOrderFilter || unit.order.includes(selectedOrderFilter);
			const functionMatch =
				!selectedFunctionFilter ||
				unit.function.includes(selectedFunctionFilter);
			return orderMatch && functionMatch;
		});

		return (
			<div className="container mx-auto py-6">
				{/* フィルターバーコンポーネント */}
				<FilterBar
					orders={availableOrders}
					functions={availableFunctions}
					selectedOrder={selectedOrderFilter}
					selectedFunction={selectedFunctionFilter}
					onOrderChange={setSelectedOrderFilter}
					onFunctionChange={setSelectedFunctionFilter}
				/>
				{/* 日程管理単位一覧コンポーネント */}
				<UnitCardList units={filteredUnits} />
			</div>
		);
	},
});