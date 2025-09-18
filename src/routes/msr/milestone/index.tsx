import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { Link } from '@tanstack/react-router';

// サンプルのマイルストーンデータ
const sampleMilestones = [
	{
		MSRMngCode: 'MSR001',
		name: 'プロジェクトA - フェーズ1',
		description: '基本設計完了',
		status: 'In Progress',
		targetDate: '2024-03-31',
	},
	{
		MSRMngCode: 'MSR002',
		name: 'プロジェクトB - キックオフ',
		description: 'プロジェクト開始',
		status: 'Completed',
		targetDate: '2024-01-15',
	},
	{
		MSRMngCode: 'MSR003',
		name: 'プロジェクトC - リリース',
		description: '本番環境リリース',
		status: 'Pending',
		targetDate: '2024-06-30',
	},
];

export const Route = createFileRoute('/msr/milestone/')({
	component: () => {
		const [searchTerm, setSearchTerm] = useState('');

		// 検索フィルタリング
		const filteredMilestones = sampleMilestones.filter(
			(milestone) =>
				milestone.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
				milestone.MSRMngCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
				milestone.description.toLowerCase().includes(searchTerm.toLowerCase())
		);

		return (
			<div className="container mx-auto py-6">
				<div className="mb-6">
					<h1 className="text-2xl font-bold mb-4">マイルストーン一覧</h1>
					
					{/* 検索バー */}
					<div className="mb-4">
						<input
							type="text"
							placeholder="マイルストーンを検索..."
							className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
						/>
					</div>
				</div>

				{/* マイルストーンカードリスト */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{filteredMilestones.map((milestone) => (
						<Link
							key={milestone.MSRMngCode}
							to="/msr/milestone/$MSRMngCode"
							params={{ MSRMngCode: milestone.MSRMngCode }}
							className="block p-4 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow duration-200 hover:border-blue-400"
						>
							<div className="flex justify-between items-start mb-2">
								<h3 className="text-lg font-semibold">{milestone.name}</h3>
								<span
									className={`px-2 py-1 text-xs rounded-full ${
										milestone.status === 'Completed'
											? 'bg-green-100 text-green-800'
											: milestone.status === 'In Progress'
											? 'bg-blue-100 text-blue-800'
											: 'bg-gray-100 text-gray-800'
									}`}
								>
									{milestone.status}
								</span>
							</div>
							<p className="text-gray-600 text-sm mb-2">{milestone.description}</p>
							<div className="flex justify-between items-center">
								<span className="text-xs text-gray-500">
									Code: {milestone.MSRMngCode}
								</span>
								<span className="text-xs text-gray-500">
									目標: {milestone.targetDate}
								</span>
							</div>
						</Link>
					))}
				</div>

				{filteredMilestones.length === 0 && (
					<div className="text-center py-8 text-gray-500">
						マイルストーンが見つかりませんでした
					</div>
				)}
			</div>
		);
	},
});