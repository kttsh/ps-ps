import { PipDetail } from '@/features/pip-management/components/PipDetail';
import { PipTable } from '@/features/pip-management/components/PipTable';
import { usePips } from '@/features/pip-management/hooks/usePips';
import { transformPipResponseToPipData } from '@/features/pip-management/utils/transformPipResponseToPipData';
import { useSelectedFGStore } from '@/stores/useSelectedFgStore';
import { useSelectedJobNoStore } from '@/stores/useSelectedJobNoStore';
import { useFgsStore } from '@/stores/useFgsStore';
import { useFgCodeUrlSync } from '@/hooks/useFgCodeUrlSync';
import type { Pip, PipData } from '@/types';
import { createFileRoute } from '@tanstack/react-router';
import type { Table } from '@tanstack/react-table';
import { useEffect, useState } from 'react';
import { PipTableControls } from '../../features/pip-management/components/PipTableControls';
import * as v from 'valibot';

/**
 * PIP管理画面のルーティング
 * PIPテーブル、PIP詳細エリアのレイアウトを定義する
 */
const Pips = () => {
	const [pipData, setPipData] = useState<PipData>({ pips: [] });
	// 行の選択状態
	const [pipSelection, setPipSelection] = useState<Record<string, boolean>>({});
	// 現在チェックされている行数
	const [selectedCount, setSelectedCount] = useState(0);
	// 現在フィルターで表示されている件数
	const [filteredCount, setFilteredCount] = useState(0);
	// フィルタークリア用に保持
	const [tableInstance, setTableInstance] = useState<Table<Pip> | null>(null);
	// フィルタ表示状態
	const [showFilters, setShowFilters] = useState(true);
	// 詳細表示するPIP
	const [clickedPipCode, setClickedPipCode] = useState<string | null>(null);
	// PIPの詳細情報
	const [pipDetail, setPipDetail] = useState<Pip>({
		code: '',
		nickname: '',
		items: [],
		vendors: [],
	});

	// プロジェクトの選択状態
	const { selectedJobNo } = useSelectedJobNoStore();
	const { selectedFG, setSelectedFG } = useSelectedFGStore();
	const { fgs } = useFgsStore();

	// URL同期の初期化
	useFgCodeUrlSync({
		fgs,
		onFgChange: (fg) => {
			if (fg) {
				setSelectedFG(fg);
			}
		},
	});

	// PIPリスト取得
	const fgCode = selectedFG?.fgCode ?? null;
	const { data: pipsResponse, isError, isLoading } = usePips(selectedJobNo, fgCode);
	console.log(`pipsResponse:${JSON.stringify(pipsResponse)}`);

	useEffect(() => {
		if (pipsResponse) {
			const transformedPips: PipData =
				transformPipResponseToPipData(pipsResponse);
			setPipData(transformedPips);
		} else {
			setPipData({ pips: [] });
		}
	}, [pipsResponse]);

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
				count: {filteredCount} / {pipData?.pips.length}
			</span>
			<div className="max-w-10xl mx-auto h-full flex gap-4">
				<div className="w-1/2 h-[80%]">
					{/* PIPテーブル */}
					{/* Item Count、Vendor Countの値、スタイルが表示できなかったので専用テーブル使用してます */}
					{/* Tanstack Virtualが原因っぽい */}
					{pipData && (
						<PipTable
							data={pipData}
							showFilters={showFilters}
							clickedPipCode={clickedPipCode}
							setClickedPipCode={setClickedPipCode}
							setPipDetail={setPipDetail}
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
					<PipDetail pipDetail={pipDetail} />
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

