import { flexRender } from '@tanstack/react-table';
import { AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';
// import { useVirtualizer } from '@tanstack/react-virtual';
import { cn } from '@/lib/utils';
import { EmptyState } from '../EmptyState';
import { LoadingSpinner } from '../LoadingSpnner';
import { IndeterminateCheckbox } from '../ui/IndeterminateCheckbox';
import { GenericTableFilter } from './GenericTableFilter';
import type { GenericEditableTableProps } from './types';
import { useGenericTable } from './useGenericTable';

/**
 * 編集・選択・フィルター対応＋仮想スクロール内包の汎用テーブル
 * 各Propsのコメントは上記のProps型定義参照
 */
export function GenericEditableTable<TData>(
	props: GenericEditableTableProps<TData>,
) {
	// Props の分割代入
	const {
		showCheckbox = false,
		showFilters = true,
		disableSelection = false,
		customFilterPlaceholders = {},
		numericFilterColumns = [],
		onRowClick,
		clickedRowId,
		isLoading = false,
	} = props;

	// ========================================
	// カスタムフックでロジックを管理
	// ========================================

	/**
	 * useGenericTable フックを使用してテーブルのロジックを管理
	 *
	 * このフックは以下を提供：
	 * - テーブルインスタンス
	 * - 仮想スクロール設定
	 * - 行データとヘルパー関数
	 * - 状態管理
	 */
	const {
		table,
		scrollContainerRef,
		virtualItems,
		paddingTop,
		paddingBottom,
		rows,
		getRowId,
		allColumns,
	} = useGenericTable(props);

	// ========================================
	// レンダリング
	// ========================================

	return (
		<div className="bg-white rounded-lg border border-gray-300 h-full flex flex-col shadow-sm">
			<div ref={scrollContainerRef} className="overflow-auto rounded-lg">
				<table className="rounded-lg w-full">
					{/* 列ごとの幅指定 */}
					<colgroup>
						{!disableSelection && showCheckbox && <col style={{ width: 36 }} />}
						{allColumns.map((col) => (
							<col key={col.id} style={{ width: col.getSize() }} />
						))}
					</colgroup>

					{/* テーブルヘッダー + 列フィルター */}
					<thead className="sticky top-0 bg-gray-50 border-b">
						{table.getHeaderGroups().map((hg) => (
							<tr key={hg.id}>
								{/* 左端：選択列（全選択チェックボックス） */}
								{!disableSelection && showCheckbox && (
									<th className="pl-4 py-2 text-left text-xs text-gray-800">
										<IndeterminateCheckbox
											checked={table.getIsAllRowsSelected()}
											indeterminate={table.getIsSomeRowsSelected()}
											onChange={table.getToggleAllRowsSelectedHandler()}
											className="bg-white"
										/>
									</th>
								)}

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
											<div className="pt-1">
												<GenericTableFilter
													column={header.column}
													customPlaceholders={customFilterPlaceholders}
													numericColumns={numericFilterColumns}
												/>
											</div>
										)}
									</th>
								))}
							</tr>
						))}
					</thead>

					{/* ボディ（仮想スクロール + セル描画） */}
					<tbody>
						{/* 上部パディング */}
						{paddingTop > 0 && (
							<tr style={{ height: `${paddingTop}px` }}>
								<td
									colSpan={
										allColumns.length +
										(!disableSelection && showCheckbox ? 1 : 0)
									}
								/>
							</tr>
						)}

						{/* ローディング中 */}
						{isLoading ? (
							<tr>
								<td
									colSpan={
										allColumns.length +
										(!disableSelection && showCheckbox ? 1 : 0)
									}
									className="h-32 text-center"
								>
									<div className="flex justify-center mt-10">
										<LoadingSpinner />
									</div>
								</td>
							</tr>
						) : rows.length === 0 ? (
							// データなし
							<tr>
								<td
									colSpan={
										allColumns.length +
										(!disableSelection && showCheckbox ? 1 : 0)
									}
									className="h-32 text-center text-gray-500"
								>
									<div className="mt-20">
										<EmptyState icon={AlertCircle} label="No data available" />
									</div>
								</td>
							</tr>
						) : (
							// 通常の行描画
							virtualItems.map((vi) => {
								const row = rows[vi.index];
								const rowId = getRowId(row.original);
								return (
									<tr
										key={row.id}
										className={cn(
											'border-b border-gray-100 transition-colors cursor-pointer',
											clickedRowId === row.id
												? 'bg-yellow-100'
												: 'hover:bg-gray-50 bg-white',
										)}
										style={{ height: `${vi.size}px` }}
										onClick={(e) => {
											onRowClick?.(row.original, row.id);
											const handler = row.getToggleSelectedHandler();
											handler(e);
										}}
									>
										{!disableSelection && showCheckbox && (
											<td
												className="pl-4 py-2 text-left text-xs text-gray-800"
												onClick={(e) => e.stopPropagation()}
											>
												<IndeterminateCheckbox
													checked={row.getIsSelected()}
													indeterminate={row.getIsSomeSelected()}
													onChange={row.getToggleSelectedHandler()}
													aria-label={`行 ${rowId} を選択`}
												/>
											</td>
										)}

										{row.getVisibleCells().map((cell) => {
											return (
												<td
													key={cell.id}
													className="px-4 py-1 align-center text-xs"
												>
													{flexRender(
														cell.column.columnDef.cell,
														cell.getContext(),
													)}
												</td>
											);
										})}
									</tr>
								);
							})
						)}

						{/* 下部パディング */}
						{paddingBottom > 0 && (
							<tr style={{ height: `${paddingBottom}px` }}>
								<td
									colSpan={
										allColumns.length +
										(!disableSelection && showCheckbox ? 1 : 0)
									}
								/>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
}
