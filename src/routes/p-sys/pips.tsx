import { PipDetailMng } from '@/features/pip-management/components/PipDetailMng';
import { PipTable } from '@/features/pip-management/components/PipTable';
import { usePips } from '@/features/pip-management/hooks/usePips';
import { transformPipsResponseToPips } from '@/features/pip-management/utils/transformPipsResponseToPips';
import { useFgCodeUrlSync } from '@/hooks/useFgCodeUrlSync';
import { useAlertStore } from '@/stores/useAlartStore';
import { useFgsStore } from '@/stores/useFgsStore';
import { usePipDetailStore } from '@/stores/usePipDetailStore';
import { usePipsStore } from '@/stores/usePipsStore';
import { useSelectedFGStore } from '@/stores/useSelectedFgStore';
import { useSelectedJobNoStore } from '@/stores/useSelectedJobNoStore';
import type { Pip } from '@/types';
import { createFileRoute } from '@tanstack/react-router';
import type { Table } from '@tanstack/react-table';
import { useEffect, useState } from 'react';
import * as v from 'valibot';
import { PipTableControls } from '../../features/pip-management/components/PipTableControls';

/**
 * PIP管理画面のルーティング
 * PIPテーブル、PIP詳細エリアのレイアウトを定義する
 */
const Pips = () => {
	// 現在チェックされている行数
	const [selectedCount, setSelectedCount] = useState(0);
	// 現在フィルターで表示されている件数
	const [filteredCount, setFilteredCount] = useState(0);
	// フィルタークリア用に保持
	const [tableInstance, setTableInstance] = useState<Table<Pip> | null>(null);
	// フィルタ表示状態
	const [showFilters, setShowFilters] = useState(true);

	// プロジェクトの選択状態
	const { selectedJobNo } = useSelectedJobNoStore();
	const { selectedFG, setSelectedFG } = useSelectedFGStore();
	const { fgs } = useFgsStore();
	const { pipsData, setPipsData, pipSelection, setPipSelection } =
		usePipsStore();
	const { setPipDetailData } = usePipDetailStore();
	// メッセージ表示
	const { showAlert } = useAlertStore();

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

	// PIPリスト取得
	const fgCode = selectedFG?.fgCode ?? null;
	const { data: pipsResponse, isLoading } = usePips(selectedJobNo, fgCode);

	useEffect(() => {
		setPipDetailData({
				jobNo: '',
				fgCode: '',
				pipCode: '',
				pipNickName: '',
				pipSortKey: '',
				itemCount: 0,
				vendorCount: 0,
				items: [],
				vendors: [],
			});
		setPipSelection({});
	}, [setPipSelection]);

	useEffect(() => {
		if (pipsResponse) {
			const transformedPips = transformPipsResponseToPips(
				pipsResponse.pipsList,
			);
			setPipsData(transformedPips);
		} else {
			showAlert(['NO_PIP'], 'warning');
			setPipsData([]);
		}
	}, [pipsResponse, setPipsData, showAlert]);

	return (
		<div className="h-screen bg-gray-100 p-6 overflow-hidden">
			{/* タイトル・ボタン群 */}
			<PipTableControls
				showFilters={showFilters}
				setShowFilters={setShowFilters}
				tableInstance={tableInstance}
				selectedCount={selectedCount}
			/>
			{/* 件数表示（フィルター後/全体） */}
			<span className="ml-auto text-sm text-gray-600">
				count: {filteredCount} / {pipsData.length}
			</span>
			<div className="max-w-10xl mx-auto h-full flex gap-4">
				<div className="w-1/2 h-[80%]">
					{/* PIPテーブル */}
					{pipsData && (
						<PipTable
							data={pipsData}
							showFilters={showFilters}
							onFilteredCountChange={setFilteredCount}
							onTableReady={setTableInstance}
							rowSelection={pipSelection}
							setRowSelection={setPipSelection}
							onSelectedRowCountChange={setSelectedCount}
							isLoading={isLoading}
						/>
					)}
				</div>
				{/* PIP詳細表示エリア */}
				<div className="w-1/2">
					<PipDetailMng />
				</div>
			</div>
		</div>
	);
};

const pipsSearchSchema = v.object({
	fgcode: v.optional(v.string()),
});

export const Route = createFileRoute('/p-sys/pips')({
	validateSearch: (search: Record<string, unknown>) => {
		return v.parse(pipsSearchSchema, search);
	},
	component: Pips,
});