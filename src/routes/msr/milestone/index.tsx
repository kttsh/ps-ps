import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';

export const Route = createFileRoute('/msr/milestone/')({
	component: () => {
		const navigate = useNavigate();
		const [searchTerm, setSearchTerm] = useState('');

		// サンプルのMSR管理単位データ（実際のAPIから取得する場合はここを変更）
		// これらは実際にはAPIから取得すべきですが、現在はmsr-unit-selectorと同じサンプルデータを使用
		const msrUnits = [
			{
				id: 'CTRL-000001',
				name: 'Changi T5-EPC',
				description: '電子部品調達プロジェクト',
				status: '進行中',
				startDate: '2023-10-01',
				endDate: '2024-03-31',
			},
			{
				id: 'CTRL-000002',
				name: 'T221(機械)',
				description: '機械部品調達プロジェクト',
				status: '進行中',
				startDate: '2023-11-15',
				endDate: '2024-05-20',
			},
			{
				id: 'CTRL-000003',
				name: 'T221(電気)',
				description: '電気部品調達プロジェクト',
				status: '遅延',
				startDate: '2023-09-01',
				endDate: '2024-02-28',
			},
			{
				id: 'CTRL-000004',
				name: 'sample1',
				description: '包装材料調達プロジェクト',
				status: '未開始',
				startDate: '2023-12-01',
				endDate: '2024-04-30',
			},
			{
				id: 'CTRL-000005',
				name: 'sample2',
				description: 'IT機器調達プロジェクト',
				status: '完了',
				startDate: '2024-01-15',
				endDate: '2024-07-15',
			},
		];

		// 検索フィルタリング
		const filteredUnits = msrUnits.filter(
			(unit) =>
				unit.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
				unit.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
				unit.description.toLowerCase().includes(searchTerm.toLowerCase())
		);

		// MSR管理単位をクリックした時のハンドラー
		const handleUnitClick = (msrMngCode: string) => {
			navigate({
				to: '/msr/milestone/$MSRMngCode',
				params: { MSRMngCode: msrMngCode },
			});
		};

		return (
			<div className="container mx-auto py-6">
				<div className="mb-6">
					<h1 className="text-2xl font-bold mb-4">マイルストーン管理</h1>
					
					{/* 検索バー */}
					<div className="mb-4">
						<input
							type="text"
							placeholder="MSR管理単位を検索..."
							className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
						/>
					</div>
				</div>

				{/* MSR管理単位カードリスト */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{filteredUnits.map((unit) => (
						<button
							key={unit.id}
							onClick={() => handleUnitClick(unit.id)}
							className="block p-4 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow duration-200 hover:border-blue-400 text-left w-full"
							type="button"
						>
							<div className="flex justify-between items-start mb-2">
								<h3 className="text-lg font-semibold">{unit.name}</h3>
								<span
									className={`px-2 py-1 text-xs rounded-full ${
										unit.status === '完了'
											? 'bg-green-100 text-green-800'
											: unit.status === '進行中'
											? 'bg-blue-100 text-blue-800'
											: unit.status === '遅延'
											? 'bg-red-100 text-red-800'
											: 'bg-gray-100 text-gray-800'
									}`}
								>
									{unit.status}
								</span>
							</div>
							<p className="text-gray-600 text-sm mb-2">{unit.description}</p>
							<div className="flex justify-between items-center">
								<span className="text-xs text-gray-500">
									Code: {unit.id}
								</span>
								<span className="text-xs text-gray-500">
									期間: {unit.startDate} - {unit.endDate}
								</span>
							</div>
						</button>
					))}
				</div>

				{filteredUnits.length === 0 && (
					<div className="text-center py-8 text-gray-500">
						MSR管理単位が見つかりませんでした
					</div>
				)}
			</div>
		);
	},
});