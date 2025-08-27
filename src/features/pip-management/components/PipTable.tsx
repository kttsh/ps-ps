import {
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getSortedRowModel,
	type SortingState,
	useReactTable,
} from '@tanstack/react-table';
import { ChevronDown, ChevronUp } from 'lucide-react';
import type React from 'react';
import { useEffect, useState } from 'react';
import { GenericTableFilter } from '@/components/generic-table/GenericTableFilter';
import { IndeterminateCheckbox } from '@/components/ui/IndeterminateCheckbox';
import { cn } from '@/lib/utils';
import type { Pip, PipData } from '@/types';
import { PIP_FILTER_PLACEHOLDERS } from '../constants/pip-filter-placeholders';
import { getPipColumns } from '../utils/getPipColumns';

interface PipTableProps {
	data: PipData; // 表示するPIPデータ
	showFilters: boolean; // フィルターUIを表示するかどうかのフラグ
	clickedPipCode: string | null; // 現在クリックされているPIPのコード（選択状態）
	setClickedPipCode: React.Dispatch<React.SetStateAction<string | null>>; // PIPコードの選択状態を更新する関数
	setPipDetail: React.Dispatch<React.SetStateAction<Pip>>; // 選択されたPIPの詳細情報を設定する関数
	onFilteredCountChange?: (count: number) => void; // フィルター適用後の件数を親コンポーネントに通知するコールバック
	onTableReady?: (tableInstance: ReturnType<typeof useReactTable<Pip>>) => void; // React Tableインスタンスを親コンポーネントに渡すためのコールバック
	rowSelection?: Record<string, boolean>; // 各行の選択状態（itemNoをキーにtrue/false）
	setRowSelection?: React.Dispatch<
		React.SetStateAction<Record<string, boolean>>
	>; // 選択状態を更新する関数
	onSelectedRowCountChange?: (count: number) => void; // 選択された行数を親コンポーネントに通知するコールバック
}

/**
 * PIPテーブルを定義するコンポーネント
 */
export const PipTable: React.FC<PipTableProps> = ({
	data,
	showFilters,
	clickedPipCode,
	setClickedPipCode,
	setPipDetail,
	onFilteredCountChange,
	onTableReady,
	rowSelection,
	setRowSelection,
	onSelectedRowCountChange,
}) => {
	// ソート状態の管理
	const [sorting, setSorting] = useState<SortingState>([]);

	// React Tableインスタンスの作成
	// コア機能、展開機能、フィルタ機能を有効化
	const table = useReactTable({
		data: data.pips,
		columns: getPipColumns(),
		state: {
			rowSelection,
			sorting,
		},
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onRowSelectionChange: setRowSelection,
		onSortingChange: setSorting,
		enableSorting: true,
		getSortedRowModel: getSortedRowModel(),
	});

	// チェックボックスがtrueのレコード数
	const selectedRowCount = table.getSelectedRowModel().rows.length;
	// フィルタ後のレコード数
	const filteredRowCount = table.getFilteredRowModel().rows.length;

	// 選択件数・フィルター件数を親に通知
	useEffect(() => {
		onSelectedRowCountChange?.(selectedRowCount);
		onFilteredCountChange?.(filteredRowCount);
	}, [
		selectedRowCount,
		filteredRowCount,
		onSelectedRowCountChange,
		onFilteredCountChange,
	]);

	// table インスタンスを親へ expose
	useEffect(() => {
		onTableReady?.(table);
	}, [table, onTableReady]);

	return (
		<div className="bg-white rounded-lg border border-gray-300 h-full flex flex-col shadow-sm">
			<div className="overflow-auto rounded-lg">
				<table className="rounded-lg w-full">
					{/* テーブルヘッダー + 列フィルター */}
					<thead className="sticky top-0 bg-gray-50 border-b">
						{table.getHeaderGroups().map((hg) => (
							<tr key={hg.id}>
								{/* 左端：選択列（全選択チェックボックス） */}
								<th className="pl-4 py-2 text-left text-xs text-gray-800">
									<IndeterminateCheckbox
										checked={table.getIsAllRowsSelected()}
										indeterminate={table.getIsSomeRowsSelected()}
										onChange={table.getToggleAllRowsSelectedHandler()}
										className="bg-white"
									/>
								</th>

								{/* ヘッダー各列（ソート + フィルタ）*/}
								{hg.headers.map((header) => (
									<th
										key={header.id}
										className="px-4 py-3 text-left text-xs font-medium text-gray-700 tracking-wide cursor-pointer"
										onClick={header.column.getToggleSortingHandler()}
										style={{ width: header.getSize() ?? 150 }}
										title={
											header.column.getCanSort()
												? header.column.getNextSortingOrder() === 'asc'
													? '昇順ソート'
													: header.column.getNextSortingOrder() === 'desc'
														? '降順ソート'
														: 'ソート解除'
												: undefined
										}
									>
										{flexRender(
											header.column.columnDef.header,
											header.getContext(),
										)}
										{header.column.getIsSorted() === 'asc' && (
											<ChevronUp className="w-4 h-4 inline ml-1" />
										)}
										{header.column.getIsSorted() === 'desc' && (
											<ChevronDown className="w-4 h-4 inline ml-1" />
										)}
										{/* フィルター入力欄 */}
										{header.column.getCanFilter() && showFilters && (
											<button
												type="button"
												className="mt-1"
												onClick={(e) => e.stopPropagation()}
											>
												<GenericTableFilter
													column={header.column}
													customPlaceholders={PIP_FILTER_PLACEHOLDERS}
													numericColumns={[]}
												/>
											</button>
										)}
									</th>
								))}
							</tr>
						))}
					</thead>

					{/* テーブルボディ */}
					<tbody>
						{table.getRowModel().rows.map((row) => (
							<tr
								key={row.id}
								onClick={() => {
									setClickedPipCode(row.id);
									setPipDetail(row.original);
								}}
								className={cn(
									'border-b border-gray-100 transition-colors cursor-pointer',
									clickedPipCode === row.id
										? 'bg-yellow-100'
										: 'hover:bg-gray-50 bg-white',
								)}
							>
								{/* 選択列 */}
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

								{/* データセル */}
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
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};
