import { FilterButton } from '@/components/FilterButton';
import { Button } from '@/components/ui/button';
import { usePipGenerationModeStore } from '@/stores/usePipGenerationModeStore';
import type { Pip } from '@/types';
import { useNavigate } from '@tanstack/react-router';
import type { Table } from '@tanstack/react-table';
import { Building2, Copy, Edit, Trash2 } from 'lucide-react';

interface Props {
	showFilters: boolean;
	setShowFilters: React.Dispatch<React.SetStateAction<boolean>>;
	tableInstance: Table<Pip> | null;
	selectedCount: number;
}

/**
 * PIP管理テーブルの操作ボタン群を表示するコンポーネント
 * showFilters: フィルタ表示状態
 * setShowFilters: フィルタ表示状態の更新関数
 * tableInstance: テーブルインスタンス（フィルタ操作に使用）
 * selectedCount: 選択された行数
 */
export const PipTableControls: React.FC<Props> = ({
	showFilters,
	setShowFilters,
	tableInstance,
	selectedCount,
}) => {
	const {setPipGenerationMode} = usePipGenerationModeStore();
	// ナビゲーション
	const navigate = useNavigate();

	//  AIP生成ページ（ベンダー割り当て）への遷移処理
	const handleAipGeneration = () => {
		if (!tableInstance) {
			alert('テーブルが初期化されていません');
			return;
		}

		const selectedRows = tableInstance.getSelectedRowModel().rows;
		if (selectedRows.length === 0) {
			alert('PIPを選択してください');
			return;
		}

		// 選択されたPIPデータを抽出
		const selectedPipData = selectedRows.map((row) => row.original);

		// ベンダー割り当てページに遷移（AIPモード）
		navigate({
			to: '/p-sys/vendor-assignment',
			search: {
				mode: 'aip',
				selectedPips: JSON.stringify(selectedPipData),
			},
		});
	};

	return (
		<div className="flex-shrink-0">
			{/* タイトル */}
			<h2 className="text-lg font-semibold text-gray-800">PIP管理</h2>

			{/* ボタンエリア */}
			<div className="flex items-end justify-between mt-2">
				{/* 左側：フィルタ */}
				<FilterButton
					setShowFilters={setShowFilters}
					showFilters={showFilters}
					tableInstance={tableInstance}
				/>

				{/* 右側：操作ボタンエリア */}
				<div className="flex items-center gap-2">
					{/* AIP生成 */}
					<Button
						size="sm"
						variant="outline"
						onClick={handleAipGeneration}
						disabled={selectedCount === 0}
						className="flex items-center gap-2 h-8 px-3 bg-orange-500 hover:bg-orange-500/80 text-white hover:text-white cursor-pointer"
					>
						<Building2 className="w-4 h-4" />
						Create AIP
					</Button>
					{/* 編集ボタン */}
					<Button
						size="sm"
						variant="outline"
						onClick={() => {
							navigate({ to: '/p-sys/item-assignment' })
							setPipGenerationMode('edit');
						}}
						disabled={selectedCount !== 1}
						className="flex items-center gap-2 h-8 px-3 bg-muted-indigo hover:bg-muted-indigo/80 text-white hover:text-white cursor-pointer"
					>
						<Edit className="w-4 h-4" />
						Edit
					</Button>
					{/* 複製ボタン */}
					<Button
						size="sm"
						variant="outline"
						disabled={selectedCount !== 1}
						className="flex items-center gap-2 h-8 px-3 bg-muted-indigo hover:bg-muted-indigo/80 text-white hover:text-white cursor-pointer"
					>
						<Copy className="w-4 h-4" />
						Copy
					</Button>
					{/* 削除ボタン */}
					<Button
						size="sm"
						variant="outline"
						disabled={selectedCount === 0}
						className="flex items-center gap-2 h-8 px-3 bg-muted-indigo hover:bg-muted-indigo/80 text-white hover:text-white cursor-pointer"
					>
						<Trash2 className="w-4 h-4" />
						Delete
					</Button>
				</div>
			</div>
		</div>
	);
};

