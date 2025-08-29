/* ===== FILE: \ps-ps\src\components\EmptyState.tsx ===== */

import type { LucideIcon } from 'lucide-react';

/**
 * 空状態表示コンポーネント
 */
export const EmptyState = ({
	icon: Icon,
	label,
}: {
	icon: LucideIcon;
	label: string;
}) => {
	return (
		<div className="text-center text-gray-500">
			<Icon className="w-12 h-12 mx-auto mb-4 text-gray-400" />
			<p>{label}</p>
		</div>
	);
};



/* ===== FILE: \ps-ps\src\components\FilterButton.tsx ===== */

import type { Table } from '@tanstack/react-table';
import { Eye, EyeClosed, Funnel, FunnelX } from 'lucide-react';
import { Button } from './ui/button';

interface Props<T> {
	setShowFilters: React.Dispatch<React.SetStateAction<boolean>>;
	showFilters: boolean;
	tableInstance: Table<T> | null;
}

/**
 * テーブルの各カラムのフィルタのUIを定義する汎用コンポーネント
 * setShowFilters: フィルタ表示切替のset関数
 * showFilters: フィルタの表示有無
 * tableInstance: TanStack Table のインスタンス
 */
export function FilterButton<T>({
	setShowFilters,
	showFilters,
	tableInstance,
}: Props<T>) {
	return (
		<div className="flex items-center gap-2">
			<Funnel size={16} />
			<span>:</span>
			{/* 表示/非表示切り替えボタン */}
			<Button
				size="sm"
				variant="outline"
				onClick={() => setShowFilters((prev) => !prev)}
				className="text-gray-800 h-8 w-19 cursor-pointer"
			>
				{showFilters ? (
					<>
						<EyeClosed />
						<span>Hide</span>
					</>
				) : (
					<>
						<Eye />
						<span>Show</span>
					</>
				)}
			</Button>
			{/* フィルタークリアボタン */}
			<Button
				size="sm"
				variant="outline"
				onClick={() => tableInstance?.resetColumnFilters()}
				className="text-gray-800 cursor-pointer"
			>
				<FunnelX />
				Clear
			</Button>
		</div>
	);
}



/* ===== FILE: \ps-ps\src\components\generic-table\GenericEditableCell.tsx ===== */

import React, { useState } from 'react';

/**
 * セル描画ロジック（表示 or 編集 input を切り替え）
 * isEditing: 編集モードかどうか
 * value: セルに表示する値（任意の型）
 * isDirty: 変更済みのセルかどうか（ハイライト用）
 * onChange: 編集後の変更通知関数（オプション）
 */
export const GenericEditableCell = React.memo(
	({
		isEditing,
		value,
		isDirty,
		onChange,
		columType,
		// エラーメッセージ紐づけ
		//itemNo,
		//rowIndex,
	}: {
		isEditing: boolean;
		value: unknown;
		isDirty?: boolean;
		onChange?: (val: unknown) => void;
		columType?: string;
		itemNo?: string;
		rowIndex?: number;
	}) => {
		// 値が Date の場合は日付文字列に、それ以外はそのまま文字列化（null/undefined は空）
		const display =
			value instanceof Date ? value.toLocaleString() : String(value ?? '');

		const [isError] = useState(false);

		//useEffect(() => {
		// // 背景色: 赤のリセット
		// setIsError(false);
		// // 位置を特定するキー
		// const key = `${rowIndex}_${columType}`;
		// if (columType === 'coreItemNo' && value === '') {
		// 	setErrorMessage((prev: Record<string, string>) => ({
		// 		...prev,
		// 		[key as string]: `Item·No: ${itemNo}「CoreItemNo」の値が不正です: 値を入力してください。`,
		// 	}));
		// 	setIsError(true);
		// } else if (columType === 'costElement' && value === '') {
		// 	setErrorMessage((prev: Record<string, string>) => ({
		// 		...prev,
		// 		[key as string]: `Item·No: ${itemNo}「CostElement」の値が不正です: 値を入力してください。`,
		// 	}));
		// 	setIsError(true);
		// } else if (columType === 'ibsCode' && value === '') {
		// 	setErrorMessage((prev: Record<string, string>) => ({
		// 		...prev,
		// 		[key as string]: `Item·No: ${itemNo}「IbsCode」の値が不正です: 値を入力してください。`,
		// 	}));
		// 	setIsError(true);
		// } else if (columType === 'itemName' && value === '') {
		// 	setErrorMessage((prev: Record<string, string>) => ({
		// 		...prev,
		// 		[key as string]: `Item·No: ${itemNo}「ItemName」の値が不正です: 値を入力してください。`,
		// 	}));
		// 	setIsError(true);
		// } else if (columType === 'itemNo' && value === '') {
		// 	setErrorMessage((prev: Record<string, string>) => ({
		// 		...prev,
		// 		[key as string]: `Item·No: ${itemNo}「ItemNo」の値が不正です: 値を入力してください。`,
		// 	}));
		// 	setIsError(true);
		// } else if (columType === 'qty') {
		// 	if (value === '') {
		// 		setErrorMessage((prev: Record<string, string>) => ({
		// 			...prev,
		// 			[key as string]: `Item·No: ${itemNo}「Qty」の値が不正です: 値を入力してください。`,
		// 		}));
		// 		setIsError(true);
		// 	} else if (!/^[1-9]\d*$/.test(value as string)) {
		// 		setErrorMessage((prev: Record<string, string>) => ({
		// 			...prev,
		// 			[key as string]: `Item·No: ${itemNo}「Qty」の値が不正です: 整数を入力してください。`,
		// 		}));
		// 		setIsError(true);
		// 	} else {
		// 		// 該当キーのエラーメッセージリセット
		// 		if (typeof itemNo !== 'undefined') {
		// 			setErrorMessage((prev: Record<string, string>) => {
		// 				const newErrors = { ...prev };
		// 				delete newErrors[key];
		// 				return newErrors;
		// 			});
		// 		}
		// 	}
		// } else {
		// 	// 該当キーのエラーメッセージリセット
		// 	if (typeof itemNo !== 'undefined') {
		// 		setErrorMessage((prev: Record<string, string>) => {
		// 			const newErrors = { ...prev };
		// 			delete newErrors[key];
		// 			return newErrors;
		// 		});
		// 	}
		// }
		//}, [value]);

		// isDirty が true のとき背景色でハイライト
		const dirtyClass = isError ? 'bg-red-100' : isDirty ? 'bg-yellow-100' : '';

		// PIP割当ステータス列の背景色
		const getBackgroundClass = (display: string) => {
			switch (display) {
				case '割当済':
					return 'bg-gray-200 text-gray-800';
				case '一部割当済':
					return 'bg-yellow-200 text-yellow-800';
				case '未割当':
					return 'bg-green-200 text-green-800';
				default:
					return 'bg-white text-black';
			}
		};

		// 編集モード中は input を表示
		return isEditing && columType !== 'pipCode' ? (
			<input
				className={`h-6 px-1 py-0 text-xs border-gray-300 border rounded w-full ${dirtyClass}`}
				value={display}
				onChange={(e) => onChange?.(e.target.value)}
			/>
		) : columType === 'pipCode' ? (
			//pip割当ステータスはスパンで表示
			<span
				className={`text-xs px-2 ${dirtyClass} ${getBackgroundClass(display)}`}
			>
				{display}
			</span>
		) : (
			// それ以外は文字列スパンで表示
			<span className={`text-xs px-2 ${dirtyClass}`}>{display}</span>
		);
	},
);



/* ===== FILE: \ps-ps\src\components\generic-table\GenericEditableTable.tsx ===== */

import { flexRender } from '@tanstack/react-table';
import { AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';
// import { useVirtualizer } from '@tanstack/react-virtual';
import { cn } from '@/lib/utils';
import { EmptyState } from '../EmptyState';
import { IndeterminateCheckbox } from '../ui/IndeterminateCheckbox';
import { GenericEditableCell } from './GenericEditableCell';
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
		isEditing = false,
		showCheckbox = false,
		showFilters = true,
		renderCell,
		disableEditing = false,
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
		getCellValue,
		isCellDirty,
		handleCellChange,
		allColumns,
	} = useGenericTable(props);

	// ========================================
	// レンダリング
	// ========================================

	return (
		<div className="bg-white rounded-lg border border-gray-200 h-full flex flex-col shadow-sm">
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
										<div className="animate-spin h-10 w-10 border-4 border-blue-500 rounded-full border-t-transparent" />
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
										<EmptyState icon={AlertCircle} label="データがありません" />
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
											'border-b border-gray-100 transition-colors',
											clickedRowId === row.id
												? 'bg-yellow-100'
												: 'hover:bg-gray-50 bg-white',
										)}
										style={{ height: `${vi.size}px` }}
										onClick={() => {
											onRowClick?.(row.original, row.id);
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
											const colId = cell.column.id;
											const originalValue = row.getValue(colId);
											const value = getCellValue(rowId, colId, originalValue);
											const isDirty = isCellDirty(rowId, colId);

											const customClass = renderCell?.({
												row: row.original,
												columnId: colId,
												value,
											});

											return (
												<td
													key={cell.id}
													className={`px-2 py-1 align-top ${customClass ?? ''}`}
												>
													<GenericEditableCell
														isEditing={!disableEditing && isEditing}
														value={value}
														isDirty={isDirty}
														onChange={(newValue) =>
															handleCellChange(rowId, colId, newValue)
														}
													/>
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



/* ===== FILE: \ps-ps\src\components\generic-table\GenericReadonlyControl.tsx ===== */

import type { Table } from '@tanstack/react-table';
import { FilterButton } from '..';

/**
 * 読み取り専用テーブルの操作ボタン群を表示する汎用コンポーネント
 * title: テーブルの上部に表示するタイトル（任意）
 * data: テーブルに表示される元データの配列
 * isFilterActive: フィルター機能が有効かどうか（true の場合、フィルターボタンと件数表示を表示）
 * tableInstance: TanStack Table のインスタンス
 * filteredCount: フィルター適用後の表示件数（例：検索結果の件数）
 * showFilters: フィルター入力欄の表示状態（true で表示）
 * setShowFilters: フィルター表示状態を切り替えるための setter 関数
 */
export function GenericReadonlyControl<T>({
	title,
	data,
	isFilterActive,
	tableInstance,
	filteredCount,
	showFilters,
	setShowFilters,
}: {
	title?: string;
	data: T[];
	isFilterActive: boolean;
	tableInstance: Table<T> | null;
	filteredCount: number;
	showFilters: boolean;
	setShowFilters: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	return (
		<div className="flex-shrink-0">
			{/* タイトル */}
			{title && <h2 className="text-md text-gray-800">{title}</h2>}

			{/* ボタンエリア */}
			{isFilterActive && (
				<div className="flex items-end justify-between mt-2">
					{/* フィルタ */}
					<FilterButton
						setShowFilters={setShowFilters}
						showFilters={showFilters}
						tableInstance={tableInstance}
					/>

					{/* 件数表示（フィルター後 / 全体） */}
					<span className="text-sm text-gray-600">
						count: {filteredCount} / {data.length}
					</span>
				</div>
			)}
		</div>
	);
}



/* ===== FILE: \ps-ps\src\components\generic-table\GenericTableFilter.tsx ===== */

import type { Column } from '@tanstack/react-table';
import { Input } from '../ui/input';

/**
 * 数値・文字列による列フィルター UI を提供する汎用コンポーネント
 * column: フィルターを適用する対象の列。TanStack Table の Column オブジェクト
 * customPlaceholders: 列ごとにカスタムプレースホルダーを指定するためのマッピング
 * numericColumns: 数値フィルターを適用する列IDの配列
 */
export function GenericTableFilter<T>({
	column,
	customPlaceholders = {},
	numericColumns = [],
}: {
	column: Column<T, unknown>; // 対象の列
	customPlaceholders?: Partial<Record<string, string>>;
	numericColumns?: string[];
}) {
	// 現在のフィルター値（string または number）
	const columnFilterValue = column.getFilterValue();
	// 列id
	const columnId = column.id;

	const currentFilter =
		typeof columnFilterValue === 'string' ||
		typeof columnFilterValue === 'number'
			? String(columnFilterValue)
			: '';

	// customPlaceholders に列IDが含まれていればその値を使用し、なければデフォルト文言を使用
	const placeholder = customPlaceholders[columnId] ?? `Filter ${columnId}...`;

	// この列が数値フィルター対象かどうかを判定
	const isNumeric = numericColumns.includes(columnId);

	return (
		<>
			{/* 文字列列の場合：通常の文字列検索フィルターを表示 */}
			{/* 数値の場合：カウンターを表示 */}
			<Input
				type={isNumeric ? 'number' : 'text'}
				className="h-6 text-xs px-1 rounded-sm bg-white placeholder:font-light"
				placeholder={placeholder}
				value={currentFilter}
				onClick={(e) => e.stopPropagation()}
				onChange={(e) => column.setFilterValue(e.target.value || undefined)}
				min={isNumeric ? 0 : undefined}
			/>
		</>
	);
}



/* ===== FILE: \ps-ps\src\components\generic-table\types.ts ===== */

import type { ColumnDef, Table } from '@tanstack/react-table';
import type React from 'react';

/**
 * GenericEditableTable コンポーネントのProps型定義
 *
 * 汎用的な編集可能テーブルを実現するための設定を定義します。
 * 行の一意識別、データの表示、編集、選択、フィルタリングなど
 * 多様な機能を制御するためのプロパティを含みます。
 *
 * @template TData - テーブルに表示するデータの型
 */
export type GenericEditableTableProps<TData> = {
	/**
	 * 各行の一意識別子となるフィールド名
	 *
	 * 例: 'id', 'itemNo', 'userId' など
	 */
	keyField: keyof TData;

	/**
	 * テーブルに表示するデータ配列
	 *
	 * 各要素は TData 型に準拠し、keyField で指定されたフィールドを
	 * 必ず含む必要がある。
	 */
	data: TData[];

	/**
	 * テーブルの列定義（TanStack Table の ColumnDef 型）
	 *
	 * 各列のヘッダー、アクセサー、セルの表示方法などを定義します。
	 * @see https://tanstack.com/table/latest/docs/api/core/column-def
	 */
	columns: ColumnDef<TData>[];

	/**
	 * 編集モードかどうか
	 *
	 * true の場合：
	 * - セルがクリック可能になり、入力フィールドが表示される
	 * - 変更は dirtyCells に一時保存される
	 * - disableEditing が true の場合は無視される
	 *
	 * @default false
	 */
	isEditing?: boolean;

	/**
	 * 行選択用のチェックボックス列を表示するかどうか
	 *
	 * true の場合：
	 * - 最左列にチェックボックスが表示される
	 * - ヘッダーには全選択チェックボックスが表示される
	 * - disableSelection が true の場合は無視される
	 *
	 * @default false
	 */
	showCheckbox?: boolean;

	/**
	 * 列ごとのフィルター入力欄を表示するかどうか
	 *
	 * true の場合：
	 * - 各列のヘッダー下部にフィルター入力欄が表示される
	 *
	 * @default true
	 */
	showFilters?: boolean;

	/**
	 * 編集されたセルの差分を保持するマッピング
	 *
	 * 構造: { [行ID]: { [列ID]: 新しい値 } }
	 */
	dirtyCells?: Record<string, Partial<Record<keyof TData, unknown>>>;

	/**
	 * dirtyCells を更新するための setter
	 *
	 * セルの編集時に自動的に呼び出され、変更内容を記録。
	 */
	setDirtyCells?: React.Dispatch<
		React.SetStateAction<Record<string, Partial<TData>>>
	>;

	/**
	 * 行ごとの選択状態
	 *
	 * 構造: { [行ID]: 選択されているか }
	 */
	rowSelection?: Record<string, boolean>;

	/**
	 * rowSelection を更新するための setter
	 *
	 * チェックボックスのクリック時に自動的に呼び出される。
	 */
	setRowSelection?: React.Dispatch<
		React.SetStateAction<Record<string, boolean>>
	>;

	/**
	 * 選択された行数が変化したときに通知するコールバック
	 *
	 * 親コンポーネントで選択数を表示したり、
	 * 一括操作ボタンの有効/無効を制御するのに使用する。
	 *
	 * @param count - 現在選択されている行数
	 */
	onSelectedRowCountChange?: (count: number) => void;

	/**
	 * フィルター適用後の行数が変化したときに通知するコールバック
	 *
	 * 検索結果の件数表示や、「該当なし」メッセージの表示制御に使用する。
	 *
	 * @param count - フィルター適用後の表示行数
	 */
	onFilteredCountChange?: (count: number) => void;

	/**
	 * セルごとにカスタムクラス名を返す関数
	 *
	 * 特定の条件に基づいてセルのスタイルを動的に変更する際に使用する。
	 *
	 * @param params - セルの情報
	 * @param params.row - 行データ
	 * @param params.columnId - 列ID
	 * @param params.value - セルの値
	 * @returns 適用するクラス名（undefined の場合は追加クラスなし）
	 */
	renderCell?: (params: {
		row: TData;
		columnId: string;
		value: unknown;
	}) => string | undefined;

	/**
	 * 編集を無効化するか
	 *
	 * true の場合：
	 * - isEditing の値に関わらず、すべてのセルが読み取り専用になる
	 *
	 * @default false
	 */
	disableEditing?: boolean;

	/**
	 * 行選択機能を無効化するか
	 *
	 * true の場合：
	 * - showCheckbox の値に関わらず、チェックボックス列が非表示になる
	 *
	 * @default false
	 */
	disableSelection?: boolean;

	/**
	 * 列ごとのフィルター入力欄のプレースホルダーをカスタマイズ
	 *
	 * キー: 列ID
	 * 値: プレースホルダーテキスト
	 */
	customFilterPlaceholders?: Partial<Record<string, string>>;

	/**
	 * 数値フィルターを適用する列IDの配列
	 *
	 * 文字列フィルターと区別。
	 * ここで指定された列は数値入力フィールドになり、数値比較により、フィルタリング。
	 *
	 * 例: ['qty', 'price', 'stock']
	 */
	numericFilterColumns?: string[];

	/**
	 * テーブルインスタンスが準備完了したときに親へ通知するコールバック
	 *
	 * @param tableInstance - TanStack Table のインスタンス
	 */
	onTableReady?: (tableInstance: Table<TData>) => void;

	/**
	 * 行クリック時の処理
	 *
	 * 行全体をクリック可能にし、詳細画面への遷移や
	 * 選択状態の切り替えなどを実装する際に使用。
	 *
	 * @param row - クリックされた行のデータ
	 * @param rowId - クリックされた行のID（keyField の値）
	 */
	onRowClick?: (row: TData, rowId: string | null) => void;

	/**
	 * 現在クリック（選択）されている行のID
	 */
	clickedRowId?: string | null;

	/**
	 * ローディング中のフラグ
	 */
	isLoading?: boolean;
};

/**
 * 仮想スクロール設定の型
 *
 * パフォーマンス最適化のための仮想スクロール機能の設定を定義
 */
export interface VirtualizerConfig {
	/** 1行の推定高さ（ピクセル） */
	estimateSize: number;
	/** 表示領域外に先読みする行数 */
	overscan: number;
}

/**
 * テーブルの内部状態を管理する型
 *
 * コンポーネント内部で使用する状態の型定義
 */
export interface TableInternalState {
	/** 現在のソート状態 */
	sorting: import('@tanstack/react-table').SortingState;
}



/* ===== FILE: \ps-ps\src\components\generic-table\useGenericTable.ts ===== */

import {
	// type ColumnDef,
	getCoreRowModel,
	getFilteredRowModel,
	getSortedRowModel,
	type SortingState,
	// type Table,
	useReactTable,
} from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useEffect, useRef, useState } from 'react';
import type { GenericEditableTableProps, VirtualizerConfig } from './types';

/**
 * 仮想スクロールのデフォルト設定
 */
const DEFAULT_VIRTUALIZER_CONFIG: VirtualizerConfig = {
	estimateSize: 40, // 標準的な行の高さ
	overscan: 10, // 前後10行を先読み
};

/**
 * GenericEditableTable のロジックを管理するカスタムフック
 *
 * @template TData - テーブルに表示するデータの型
 * @param props - GenericEditableTable と同じProps
 * @returns テーブル操作に必要な値とハンドラー
 */
export function useGenericTable<TData>(
	props: GenericEditableTableProps<TData>,
) {
	// Props の分割代入
	const {
		data,
		columns,
		rowSelection = {},
		setRowSelection,
		disableSelection = false,
		onSelectedRowCountChange,
		onFilteredCountChange,
		onTableReady,
	} = props;

	// ========================================
	// 内部状態の管理
	// ========================================

	/**
	 * ソート状態の管理
	 *
	 * 各列のソート方向（昇順/降順/なし）を保持。
	 */
	const [sorting, setSorting] = useState<SortingState>([]);

	// ========================================
	// テーブルインスタンスの作成
	// ========================================

	/**
	 * TanStack Table のインスタンスを作成
	 */
	const table = useReactTable({
		// 基本設定
		data, // 表示するデータ配列（TData[]）
		columns, // 列定義（ColumnDef<TData>[]）

		// 状態管理
		state: {
			rowSelection, // 行選択の状態（選択された行のIDを保持）
			sorting, // ソート状態（列ごとの昇順・降順など）
		},

		// コア機能
		getCoreRowModel: getCoreRowModel(), // フィルターやソート前の基本的な行モデルを取得
		getFilteredRowModel: getFilteredRowModel(), // フィルター適用後の行モデルを取得
		getSortedRowModel: getSortedRowModel(), // ソート適用後の行モデルを取得

		// イベントハンドラー
		onRowSelectionChange: setRowSelection, // 行選択状態が変更されたときに呼ばれるコールバック
		onSortingChange: setSorting, // ソート状態が変更されたときに呼ばれるコールバック

		// 機能の有効/無効
		enableRowSelection: !disableSelection, // 行選択を有効にするかどうか（チェックボックス列の表示制御）
		enableSorting: true, // ソート機能を有効にする（列ヘッダークリックで昇順・降順切り替え）
	});

	// ========================================
	// 副作用: 選択数・フィルター数の通知
	// ========================================

	// チェックボックスがtrueのレコード数
	const selectedRowCount = table.getSelectedRowModel().rows.length;
	// フィルタ後のレコード数
	const filteredRowCount = table.getFilteredRowModel().rows.length;

	const rows = table.getRowModel().rows;

	// ========================================
	// 仮想スクロールの設定
	// ========================================

	/**
	 * スクロールコンテナの参照
	 */
	const scrollContainerRef = useRef<HTMLDivElement>(null);

	/**
	 * 仮想スクローラーの初期化
	 */
	const virtualizer = useVirtualizer({
		count: rows.length, // 全行数
		getScrollElement: () => scrollContainerRef.current, // スクロール要素
		estimateSize: () => DEFAULT_VIRTUALIZER_CONFIG.estimateSize, // 行の推定高さ
		overscan: DEFAULT_VIRTUALIZER_CONFIG.overscan, // 先読み行数
	});

	/**
	 * 現在表示すべき仮想アイテムとパディング
	 */

	// 現在表示すべき仮想アイテムを取得
	const virtualItems = virtualizer.getVirtualItems();

	// スクロール位置に応じたパディングを計算
	const paddingTop = virtualItems[0]?.start ?? 0;
	const paddingBottom =
		virtualizer.getTotalSize() -
		(virtualItems[virtualItems.length - 1]?.end ?? 0);

	// ========================================
	// 副作用: 外部への通知
	// ========================================

	/**
	 * 選択件数・フィルター件数を親コンポーネントに通知
	 */
	useEffect(() => {
		// 行選択が有効な場合のみ選択数を通知
		if (!disableSelection) {
			onSelectedRowCountChange?.(selectedRowCount);
		}
		// フィルター適用後の件数は常に通知
		onFilteredCountChange?.(filteredRowCount);
	}, [
		selectedRowCount,
		filteredRowCount,
		onSelectedRowCountChange,
		onFilteredCountChange,
		disableSelection,
	]);

	/**
	 * テーブルインスタンスを親コンポーネントに公開
	 */
	useEffect(() => {
		onTableReady?.(table);
	}, [table, onTableReady]);

	// ========================================
	// ユーティリティ関数
	// ========================================

	/**
	 * 行IDを取得するヘルパー関数
	 *
	 * keyField の値を文字列に変換して返却。
	 *
	 * @param rowData - 行データ
	 * @returns 行の一意識別子（文字列）
	 */
	const getRowId = (rowData: TData): string => {
		return String(rowData[props.keyField]);
	};

	/**
	 * セルの値を取得するヘルパー関数
	 *
	 * 編集された値（dirtyCells）があればそれを、なければ元の値を返却。
	 *
	 * @param rowId - 行ID
	 * @param columnId - 列ID
	 * @param originalValue - 元の値
	 * @returns 表示すべき値
	 */
	const getCellValue = (
		rowId: string,
		columnId: string,
		originalValue: unknown,
	): unknown => {
		const dirtyValue = props.dirtyCells?.[rowId]?.[columnId as keyof TData];
		return dirtyValue ?? originalValue;
	};

	/**
	 * セルの編集状態を判定するヘルパー関数
	 *
	 * @param rowId - 行ID
	 * @param columnId - 列ID
	 * @returns 編集済み（dirty）かどうか
	 */
	const isCellDirty = (rowId: string, columnId: string): boolean => {
		return props.dirtyCells?.[rowId]?.[columnId as keyof TData] !== undefined;
	};

	/**
	 * セル値変更ハンドラー
	 *
	 * セルの値が変更されたときに呼び出され、
	 * dirtyCells を更新。
	 *
	 * @param rowId - 行ID
	 * @param columnId - 列ID
	 * @param newValue - 新しい値
	 */
	const handleCellChange = (
		rowId: string,
		columnId: string,
		newValue: unknown,
	): void => {
		props.setDirtyCells?.((prev) => ({
			...prev,
			[rowId]: {
				...prev[rowId],
				[columnId]: newValue,
			},
		}));
	};

	// ========================================
	// 公開するAPI
	// ========================================

	return {
		// テーブルインスタンス
		table,

		// 仮想スクロール関連
		scrollContainerRef,
		virtualizer,
		virtualItems,
		paddingTop,
		paddingBottom,

		// 行データ
		rows,

		// 状態
		sorting,
		selectedRowCount,
		filteredRowCount,

		// ヘルパー関数
		getRowId,
		getCellValue,
		isCellDirty,
		handleCellChange,

		// 列情報
		allColumns: table.getAllLeafColumns(),
	};
}

/**
 * useGenericTable フックの戻り値の型
 *
 * 型推論を助けるための明示的な型定義
 */
export type UseGenericTableReturn<TData> = ReturnType<
	typeof useGenericTable<TData>
>;



/* ===== FILE: \ps-ps\src\components\index.ts ===== */

export { EmptyState } from './EmptyState';
export { FilterButton } from './FilterButton';
export { GenericEditableTable } from './generic-table/GenericEditableTable';
export { GenericReadonlyControl } from './generic-table/GenericReadonlyControl';
export { Message } from './Message';
export { Topbar } from './Topbar';



/* ===== FILE: \ps-ps\src\components\Message.tsx ===== */

/**
 * ヘッダーに表示するメッセージコンポーネント
 */
export const Message = () => {
	return (
		<div className="bg-white max-w-screen w-full z-40 shadow-sm h-8 mx-auto lg:px-8 flex items-center text-sm">
			<p className="text-gray-800">
				Cautions when using : Don't upload information on list-regulated
				products under export-related laws and US technical information
				　利用における注意事項 :
				輸法該当技術・米国技術に該当する情報は登録してはならない
			</p>
		</div>
	);
};



/* ===== FILE: \ps-ps\src\components\Pip-data-card\CardActionGroup.tsx ===== */

/**
 * CardActionGroup - 共通アクションボタングループコンポーネント
 *
 * PipDataCard 内で使用するアクションボタン群の共通実装。
 *
 * 主な機能:
 * - アクションボタンの統一レンダリング
 * - ローディング状態とスピナー表示
 * - 無効状態のスタイル管理
 * - バリエーション別スタイル適用（default/danger/ghost）
 */

import { clsx } from 'clsx';
import { memo, useId } from 'react';
import { twMerge } from 'tailwind-merge';
import type { CardAction } from '@/types/pipDataCard';
import { ACTION_STYLES, COMMON_CLASSES } from './constants';

interface CardActionGroupProps {
	/** アクション配列 */
	actions: CardAction[];
	/** 親クリックイベントの伝播を停止するかどうか */
	stopPropagation?: boolean;
	/** 追加クラス名 */
	className?: string;
}

/**
 * CardActionGroup コンポーネント
 *
 * @param actions - 表示するアクション配列
 * @param stopPropagation - クリック時の親要素への伝播を停止するか（デフォルト: false）
 * @param className - 追加の CSS クラス
 */
export const CardActionGroup = memo<CardActionGroupProps>(
	({ actions, stopPropagation = false, className }) => {
		// 安定したキー生成用の ID を取得
		const baseId = useId();

		// アクションが空の場合は何も表示しない
		if (actions.length === 0) return null;

		return (
			<div className={twMerge(clsx('flex items-center gap-1', className))}>
				{actions.map((action, index) => (
					<button
						key={`${baseId}-${action.id}-${index}`}
						type="button"
						onClick={(e) => {
							if (stopPropagation) {
								e.stopPropagation();
							}
							action.onClick();
						}}
						disabled={action.disabled || action.loading}
						title={action.tooltip}
						className={twMerge(
							clsx(
								COMMON_CLASSES.action,
								ACTION_STYLES[action.variant || 'default'],
								{
									'opacity-50 cursor-not-allowed': action.disabled,
								},
							),
						)}
					>
						{action.loading ? (
							<div className="w-3 h-3 border border-current border-t-transparent rounded-full animate-spin" />
						) : (
							action.icon
						)}
					</button>
				))}
			</div>
		);
	},
);

CardActionGroup.displayName = 'CardActionGroup';



/* ===== FILE: \ps-ps\src\components\Pip-data-card\constants.tsx ===== */

/**
 * PipDataCard 定数定義
 * カラーバリエーションとスタイル設定を管理する
 */

import { Building2, Package, PackagePlus } from 'lucide-react';
import type { PipCardVariant } from '@/types/pipDataCard';

/**
 * バリアントスタイル定義
 */
export const VARIANT_STYLES: Record<
	PipCardVariant,
	{
		iconGradient: string;
		borderColor: string;
		backgroundColor: string;
		selectedColor: string;
		hoverColor: string;
	}
> = {
	item: {
		iconGradient: 'bg-gradient-to-br from-blue-500 to-blue-600',
		borderColor: 'border-blue-200',
		backgroundColor: 'bg-blue-50',
		selectedColor: 'ring-blue-500',
		hoverColor: 'hover:bg-blue-100',
	},
	vendor: {
		iconGradient: 'bg-gradient-to-br from-purple-500 to-pink-600',
		borderColor: 'border-purple-200',
		backgroundColor: 'bg-purple-50',
		selectedColor: 'ring-purple-500',
		hoverColor: 'hover:bg-purple-100',
	},
	generatedItem: {
		iconGradient: 'bg-gradient-to-br from-green-500 to-green-600',
		borderColor: 'border-green-200',
		backgroundColor: 'bg-green-50',
		selectedColor: 'ring-green-500',
		hoverColor: 'hover:bg-green-100',
	},
};

/**
 * バリアント別アイコン取得関数
 */
export const getVariantIcon = (variant: PipCardVariant) => {
	switch (variant) {
		case 'item':
			return <Package className="w-5 h-5 text-white" />;
		case 'vendor':
			return <Building2 className="w-5 h-5 text-white" />;
		case 'generatedItem':
			return <PackagePlus className="w-5 h-5 text-white" />;
		default:
			return <Package className="w-5 h-5 text-white" />;
	}
};

/**
 * サイズスタイル定義
 */
export const SIZE_STYLES = {
	compact: {
		card: 'p-3',
		header: 'text-sm',
		content: 'text-xs',
		icon: 'w-8 h-8',
	},
	default: {
		card: 'p-4',
		header: 'text-base',
		content: 'text-sm',
		icon: 'w-10 h-10',
	},
	comfortable: {
		card: 'p-6',
		header: 'text-lg',
		content: 'text-base',
		icon: 'w-12 h-12',
	},
} as const;

/**
 * アクションバリアントスタイル
 */
export const ACTION_STYLES = {
	default: 'hover:bg-gray-100 text-gray-600',
	danger: 'hover:bg-red-100 text-red-600',
	ghost: 'hover:bg-transparent text-gray-400',
} as const;

/**
 * 共通クラス定義
 */
export const COMMON_CLASSES = {
	card: 'rounded-lg border shadow-sm transition-all duration-200',
	cardHover: 'hover:shadow-md',
	header: 'flex items-center gap-3',
	content: 'border-t pt-4',
	item: 'flex items-center gap-3 p-2 rounded-md transition-colors',
	itemHover: 'hover:bg-gray-50',
	action: 'p-1 rounded transition-colors',
	emptyState: 'flex flex-col items-center justify-center py-8 text-center',
} as const;

/**
 * デフォルト値
 */
export const DEFAULTS = {
	variant: 'item' as PipCardVariant,
	size: 'default' as const,
	maxHeight: '16rem',
} as const;

/**
 * デフォルト空状態アイコン取得関数
 */
export const getDefaultEmptyIcon = () => (
	<Package size={48} className="text-gray-300" />
);



/* ===== FILE: \ps-ps\src\components\Pip-data-card\index.ts ===== */

/**
 * PipDataCard コンポーネント群のエクスポート
 */

// 型定義のエクスポート
export type {
	ActionVariant,
	BaseDisplayItem,
	CardAction,
	EmptyStateConfig,
	InlineEditConfig,
	ItemData,
	PipCardSize,
	PipCardVariant,
	PipData,
	PipDataCardContentProps,
	PipDataCardHeaderProps,
	PipDataCardItemProps,
	PipDataCardProps,
	SelectionActions,
	SelectionState,
	VendorData,
} from '@/types/pipDataCard';

// 内部コンポーネントのインポート
import { PipDataCardRoot } from './PipDataCard';
import { PipDataCardContent } from './PipDataCardContent';
import { PipDataCardHeader } from './PipDataCardHeader';
import { PipDataCardItem } from './PipDataCardItem';

/**
 * PipDataCard 複合コンポーネント
 */
export const PipDataCard = Object.assign(PipDataCardRoot, {
	/** ヘッダーコンポーネント - PIP情報とアクションを表示 */
	Header: PipDataCardHeader,
	/** コンテンツコンポーネント - アイテムリストと空状態を管理 */
	Content: PipDataCardContent,
	/** アイテムコンポーネント - 個別アイテムの表示とインタラクション */
	Item: PipDataCardItem,
});

// 定数とユーティリティ関数（カスタマイズ用）
export {
	ACTION_STYLES,
	COMMON_CLASSES,
	DEFAULTS,
	getDefaultEmptyIcon,
	getVariantIcon,
	SIZE_STYLES,
	VARIANT_STYLES,
} from './constants';



/* ===== FILE: \ps-ps\src\components\Pip-data-card\PipDataCard.tsx ===== */

/**
 * PipDataCard ルートコンポーネント
 *
 * PIP関連データ表示用のカードコンテナ
 * PipDataCard.Header, PipDataCard.Content, PipDataCard.Item として使用可能。
 *
 * 主な機能:
 * - カードの外観スタイル制御（variant: item/vendor/generatedItem）
 * - サイズ管理（size: compact/default/comfortable）
 */

import { clsx } from 'clsx';
import { memo } from 'react';
import { twMerge } from 'tailwind-merge';
import type { PipDataCardProps } from '@/types/pipDataCard';
import { COMMON_CLASSES, SIZE_STYLES, VARIANT_STYLES } from './constants';
import { PipDataCardProvider } from './PipDataCardContext';

/**
 * PipDataCardRoot コンポーネント
 *
 * カード全体のコンテナとして機能
 *
 * @param variant - カードの表示バリエーション（デフォルト: "item"）
 * @param size - カードのサイズ（デフォルト: "default"）
 * @param className - 追加の CSS クラス
 * @param children - 子要素（通常は Header, Content, Item の組み合わせ）
 * @param rest - HTML div 要素の標準属性
 */
export const PipDataCardRoot = memo<PipDataCardProps>(
	({ variant = 'item', size = 'default', className, children, ...rest }) => {
		// variant に応じたスタイル設定を取得
		const variantStyles = VARIANT_STYLES[variant];
		const sizeStyles = SIZE_STYLES[size];

		return (
			<PipDataCardProvider variant={variant} size={size}>
				<div
					className={twMerge(
						clsx(
							// 基本的なカードスタイル
							COMMON_CLASSES.card,
							COMMON_CLASSES.cardHover,
							// variant 固有のスタイル
							variantStyles.borderColor,
							variantStyles.backgroundColor,
							variantStyles.hoverColor,
							// サイズ固有のスタイル
							sizeStyles.card,
							// カスタムクラス
							className,
						),
					)}
					{...rest}
				>
					{children}
				</div>
			</PipDataCardProvider>
		);
	},
);

PipDataCardRoot.displayName = 'PipDataCardRoot';



/* ===== FILE: \ps-ps\src\components\Pip-data-card\PipDataCardContent.tsx ===== */

/**
 * PipDataCardContent コンテンツ表示コンポーネント
 * アイテムリストの表示とスクロール制御を行うコンポーネントである
 */

import { clsx } from 'clsx';
import { memo, type ReactElement, useId, useMemo } from 'react';
import { twMerge } from 'tailwind-merge';
import type {
	BaseDisplayItem,
	PipDataCardContentProps,
} from '@/types/pipDataCard';
import { COMMON_CLASSES, DEFAULTS } from './constants';

/**
 * PipDataCardContent コンポーネント
 * アイテムリストの表示とスクロール制御を行う
 */
export const PipDataCardContent = memo(
	<T extends BaseDisplayItem = BaseDisplayItem>({
		items,
		renderItem,
		emptyState,
		maxHeight = DEFAULTS.maxHeight,
		scrollable = true,
		keyExtractor,
	}: PipDataCardContentProps<T>) => {
		const baseId = useId();
		const hasItems = items.length > 0;

		// スクロール可能なコンテナのスタイル
		const scrollStyles = useMemo(() => {
			if (!scrollable) return '';

			const heightStyle =
				typeof maxHeight === 'number'
					? { maxHeight: `${maxHeight}px` }
					: { maxHeight };

			return twMerge(
				clsx('overflow-y-auto', {
					[`max-h-[${heightStyle.maxHeight}]`]: heightStyle.maxHeight,
				}),
			);
		}, [scrollable, maxHeight]);

		// 空状態の表示
		const renderEmptyState = () => (
			<div className={COMMON_CLASSES.emptyState}>
				{emptyState.icon && <div className="mb-3">{emptyState.icon}</div>}
				<h4 className="text-sm font-medium text-gray-900 mb-1">
					{emptyState.title}
				</h4>
				{emptyState.description && (
					<p className="text-xs text-gray-500 mb-4">{emptyState.description}</p>
				)}
				{emptyState.action && <div>{emptyState.action}</div>}
			</div>
		);

		// アイテムリストの表示
		const renderItemList = () => (
			<div className={twMerge(clsx('space-y-1', scrollStyles))}>
				{items.map((item, index) => {
					const key = keyExtractor
						? keyExtractor(item, index)
						: `${baseId}-${item.id}-${index}`;

					return <div key={key}>{renderItem(item, index)}</div>;
				})}
			</div>
		);

		return (
			<div className={COMMON_CLASSES.content}>
				{hasItems ? renderItemList() : renderEmptyState()}
			</div>
		);
	},
) as <T extends BaseDisplayItem = BaseDisplayItem>(
	props: PipDataCardContentProps<T>,
) => ReactElement;

Object.defineProperty(PipDataCardContent, 'displayName', {
	value: 'PipDataCardContent',
	configurable: true,
});



/* ===== FILE: \ps-ps\src\components\Pip-data-card\PipDataCardContext.tsx ===== */

/**
 * PipDataCardContext - コンテキスト管理
 * variant と size を子コンポーネント間で共有するためのコンテキストである
 */

import { createContext, type ReactNode, useContext } from 'react';
import type { PipCardSize, PipCardVariant } from '@/types/pipDataCard';

interface PipDataCardContextValue {
	/** カラーバリエーション */
	variant: PipCardVariant;
	/** サイズ */
	size: PipCardSize;
}

const PipDataCardContext = createContext<PipDataCardContextValue | undefined>(
	undefined,
);

interface PipDataCardProviderProps {
	/** カラーバリエーション */
	variant: PipCardVariant;
	/** サイズ */
	size: PipCardSize;
	/** 子要素 */
	children: ReactNode;
}

/**
 * PipDataCardProvider コンポーネント
 * PipDataCard の variant と size を下位コンポーネントに提供する
 */
export const PipDataCardProvider = ({
	variant,
	size,
	children,
}: PipDataCardProviderProps) => {
	return (
		<PipDataCardContext.Provider value={{ variant, size }}>
			{children}
		</PipDataCardContext.Provider>
	);
};

/**
 * usePipDataCardContext フック
 * PipDataCard のコンテキストを取得する
 */
export const usePipDataCardContext = (): PipDataCardContextValue => {
	const context = useContext(PipDataCardContext);
	if (!context) {
		throw new Error(
			'usePipDataCardContext must be used within a PipDataCardProvider',
		);
	}
	return context;
};



/* ===== FILE: \ps-ps\src\components\Pip-data-card\PipDataCardHeader.tsx ===== */

/**
 * PipDataCardHeader - カードヘッダーコンポーネント
 *
 * PIP基本情報の表示とヘッダーレベルでのアクション管理を担当する。
 * Context から variant/size を自動取得する。
 *
 * 主な機能:
 * - PIP コードと表示名の表示
 * - バリエーション別アイコン表示（item/vendor/generatedItem）
 * - インライン編集機能（タイトルの直接編集）
 * - アクションボタン群の表示（CardActionGroup 使用）
 */

import { clsx } from 'clsx';
import { Edit3 } from 'lucide-react';
import { type KeyboardEvent, memo, useCallback, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import type { PipDataCardHeaderProps } from '@/types/pipDataCard';
import { CardActionGroup } from './CardActionGroup';
import {
	COMMON_CLASSES,
	getVariantIcon,
	SIZE_STYLES,
	VARIANT_STYLES,
} from './constants';
import { usePipDataCardContext } from './PipDataCardContext';

/**
 * PipDataCardHeader コンポーネント
 *
 * @param pipData - PIP基本データ（code, nickname, type）
 * @param actions - ヘッダーレベルのアクション配列
 * @param editable - インライン編集設定（編集可能性、バリデーション、コールバック）
 * @param metadata - 表示メタデータ（アイテム数、ベンダー数）
 */
export const PipDataCardHeader = memo<PipDataCardHeaderProps>(
	({ pipData, actions = [], editable, metadata }) => {
		// Context から variant と size を取得（親の PipDataCard から自動継承）
		const { variant, size } = usePipDataCardContext();
		const [isEditing, setIsEditing] = useState(false);
		const [editValue, setEditValue] = useState(pipData.nickname);

		const variantStyles = VARIANT_STYLES[variant];
		const sizeStyles = SIZE_STYLES[size];

		const handleEditStart = useCallback(() => {
			if (!editable?.enabled) return;
			setIsEditing(true);
			setEditValue(pipData.nickname);
		}, [editable?.enabled, pipData.nickname]);

		const handleEditSave = useCallback(() => {
			if (!editable?.enabled || !editValue.trim()) return;

			if (editable.validation && !editable.validation(editValue)) {
				setEditValue(pipData.nickname);
				setIsEditing(false);
				return;
			}

			editable.onTitleChange(editValue);
			setIsEditing(false);
		}, [editable, editValue, pipData.nickname]);

		const handleEditCancel = useCallback(() => {
			setEditValue(pipData.nickname);
			setIsEditing(false);
		}, [pipData.nickname]);

		const handleKeyDown = useCallback(
			(e: KeyboardEvent<HTMLInputElement>) => {
				if (e.key === 'Enter') {
					e.preventDefault();
					handleEditSave();
				} else if (e.key === 'Escape') {
					e.preventDefault();
					handleEditCancel();
				}
			},
			[handleEditSave, handleEditCancel],
		);

		const renderTitle = () => {
			if (isEditing) {
				return (
					<input
						type="text"
						value={editValue}
						onChange={(e) => setEditValue(e.target.value)}
						onBlur={handleEditSave}
						onKeyDown={handleKeyDown}
						placeholder={editable?.placeholder}
						className={twMerge(
							clsx(
								sizeStyles.header,
								'font-medium bg-transparent border-none outline-none focus:ring-2 focus:ring-blue-500 rounded px-1 -ml-1',
							),
						)}
					/>
				);
			}

			return (
				<div className="flex items-center gap-2">
					<h3 className={twMerge(clsx(sizeStyles.header, 'font-medium'))}>
						{pipData.nickname}
					</h3>
					{editable?.enabled && (
						<button
							type="button"
							onClick={handleEditStart}
							className="p-1 rounded hover:bg-gray-100 transition-colors cursor-pointer"
							title="編集"
						>
							<Edit3 size={12} className="text-gray-400" />
						</button>
					)}
				</div>
			);
		};

		const renderMetadata = () => {
			if (!metadata) return null;

			const items = [];
			if (metadata.itemCount !== undefined) {
				items.push(`${metadata.itemCount}件`);
			}
			if (metadata.vendorCount !== undefined) {
				items.push(`${metadata.vendorCount}社`);
			}

			if (items.length === 0) return null;

			return (
				<span className={twMerge(clsx(sizeStyles.content, 'text-gray-500'))}>
					{items.join(' / ')}
				</span>
			);
		};

		return (
			<div className={twMerge(clsx(COMMON_CLASSES.header, sizeStyles.card))}>
				{/* アイコン */}
				<div
					className={twMerge(
						clsx(
							sizeStyles.icon,
							variantStyles.iconGradient,
							'rounded-lg flex items-center justify-center',
						),
					)}
				>
					{getVariantIcon(variant)}
				</div>

				{/* タイトル部分 */}
				<div className="flex-1 min-w-0">
					{renderTitle()}
					<div className="flex items-center gap-2">
						<span
							className={twMerge(
								clsx(sizeStyles.content, 'text-gray-500 font-mono'),
							)}
						>
							{pipData.code}
						</span>
						{renderMetadata()}
					</div>
				</div>

				{/* アクション */}
				<CardActionGroup actions={actions} className="ml-auto" />
			</div>
		);
	},
);

PipDataCardHeader.displayName = 'PipDataCardHeader';



/* ===== FILE: \ps-ps\src\components\Pip-data-card\PipDataCardItem.tsx ===== */

/**
 * PipDataCardItem 個別アイテム表示コンポーネント
 * カード内の個別アイテムの表示とアクション管理を行うコンポーネントである
 */

import type { PipDataCardItemProps } from '@/types/pipDataCard';
import { clsx } from 'clsx';
import { memo, useCallback } from 'react';
import { twMerge } from 'tailwind-merge';
import { CardActionGroup } from './CardActionGroup';
import { COMMON_CLASSES } from './constants';

export const PipDataCardItem = memo<PipDataCardItemProps>(
	({
		children,
		prefix,
		actions = [],
		clickable = false,
		selected = false,
		onClick,
		className = '',
	}) => {
		/* ハンドラ */
		const handleClick = useCallback(() => {
			if (clickable && onClick) onClick();
		}, [clickable, onClick]);

		const handleKeyDown = useCallback(
			(e: React.KeyboardEvent) => {
				if (!clickable) return;
				if (e.key === 'Enter' || e.key === ' ') {
					e.preventDefault();
					onClick?.();
				}
			},
			[clickable, onClick],
		);

		/* スタイル */
		const baseClasses = twMerge(
			clsx(
				COMMON_CLASSES.item,
				clickable && `${COMMON_CLASSES.itemHover} cursor-pointer`,
				clickable && selected && 'bg-blue-50 ring-1 ring-blue-200',
				className,
			),
		);

		return (
			<div
				role="treeitem" /* ⬅️ インタラクティブなロール */
				aria-selected={selected} /* ⬅️ treeitem は対応アリ */
				tabIndex={clickable ? 0 : -1} /* キーボード操作可否を制御 */
				className={baseClasses}
				onClick={handleClick}
				onKeyDown={handleKeyDown}
			>
				{/* プレフィックス（チェックボックスなど） */}
				{prefix && <div className="flex-shrink-0">{prefix}</div>}

				{/* メインコンテンツ */}
				<div className="flex-1 min-w-0">{children}</div>

				{/* アクションボタン群（内部に <button> 可） */}
				<CardActionGroup
					actions={actions}
					stopPropagation
					className="ml-auto"
				/>
			</div>
		);
	},
);

PipDataCardItem.displayName = 'PipDataCardItem';



/* ===== FILE: \ps-ps\src\components\Toast.tsx ===== */

import { useEffect } from 'react';
import { toast } from 'sonner';
import { useAlertStore } from '@/stores/useAlartStore';
import { Button } from './ui/button';

export function Toast() {
	const { isAlertVisible, setIsAlertVisible, alertType, messages } =
		useAlertStore();
	const duration = 4000;

	useEffect(() => {
		if (isAlertVisible && messages.length > 0) {
			toast.custom(() => (
				<div
					className={`border rounded-md shadow-lg p-4 relative w-[300px] flex flex-col gap-2 ${
						{
							success: 'bg-green-100 border-green-300',
							error: 'bg-red-100 border-red-300',
							info: 'bg-blue-100 border-blue-300',
							warning: 'bg-yellow-100 border-yellow-300',
						}[alertType]
					}`}
					style={{ paddingBottom: '1.5rem' }}
				>
					{messages.map((msg) => (
						<p key={msg.id} className="text-sm text-muted-foreground">
							{msg.text}
						</p>
					))}

					<Button
						className="mt-2 text-xs h-8 w-12 hover:underline self-end"
						onClick={() => setIsAlertVisible(false)}
					>
						Close
					</Button>
					<div
						className={`absolute bottom-0 left-0 h-1 ${
							{
								success: 'bg-green-500',
								error: 'bg-red-500',
								info: 'bg-blue-500',
								warning: 'bg-yellow-500',
							}[alertType]
						}`}
						style={{
							animation: `progress ${duration}ms linear forwards`,
							width: '100%',
						}}
					/>
					<style>{`
            @keyframes progress {
              from { width: 100%; }
              to { width: 0%; }
            }
          `}</style>
				</div>
			));

			const timer = setTimeout(() => {
				setIsAlertVisible(false);
			}, duration);

			return () => clearTimeout(timer);
		}
	}, [isAlertVisible, alertType, messages, setIsAlertVisible]);

	return null;
}



/* ===== FILE: \ps-ps\src\components\Topbar.tsx ===== */

import { AppLogo } from '@/features/psys-randing/components';
import type { TopbarProps } from '@/types/Topbar';
import { Link } from '@tanstack/react-router';
import { BellIcon, BookOpenText, CircleUserRound } from 'lucide-react';

/**
 * P-Sys/MSRで共有するヘッダーのレイアウトを定義するコンポーネント
 */
export const Topbar: React.FC<TopbarProps> = ({path}) => {
	return (
		<div className="bg-indigo-900">
			<div className="max-w-screen mx-auto lg:px-8">
				<div className="flex justify-between items-center h-16">
					{/* 左側：ロゴ（P-Sys/MSRで切り替え） */}
					<div className="flex items-center">
						{path === 'msr' ? (
							<>
								<h1 className="text-3xl text-white">MSR</h1>
							</>
						):(
							<Link to="/p-sys/item-assignment">
								<AppLogo />
							</Link>
						)}
					</div>

					{/* 右側：メニューアイコンエリア */}
					<div className="flex items-center gap-6">
						{/* マニュアル */}
						<BookOpenText size={30} className="text-white" />
						{/* 通知 */}
						<button
							type="button"
							className="relative rounded p-1 hover:bg-indigo-400 cursor-pointer"
						>
							<BellIcon size={30} className="text-white" />
							<span className="absolute -right-0.5 -top-0.5 inline-flex h-2 w-2 rounded-full bg-red-500" />
						</button>
						{/* ユーザ情報 */}
						<CircleUserRound size={30} className="text-white" />
					</div>
				</div>
			</div>
		</div>
	);
};



/* ===== FILE: \ps-ps\src\components\ui\alert.tsx ===== */

import { cva, type VariantProps } from 'class-variance-authority';
import type * as React from 'react';

import { cn } from '@/lib/utils';

const alertVariants = cva(
	'relative w-full rounded-lg border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current',
	{
		variants: {
			variant: {
				default: 'bg-card text-card-foreground',
				destructive:
					'text-destructive bg-card [&>svg]:text-current *:data-[slot=alert-description]:text-destructive/90',
			},
		},
		defaultVariants: {
			variant: 'default',
		},
	},
);

function Alert({
	className,
	variant,
	...props
}: React.ComponentProps<'div'> & VariantProps<typeof alertVariants>) {
	return (
		<div
			data-slot="alert"
			role="alert"
			className={cn(alertVariants({ variant }), className)}
			{...props}
		/>
	);
}

function AlertTitle({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot="alert-title"
			className={cn(
				'col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight',
				className,
			)}
			{...props}
		/>
	);
}

function AlertDescription({
	className,
	...props
}: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot="alert-description"
			className={cn(
				'text-muted-foreground col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed',
				className,
			)}
			{...props}
		/>
	);
}

export { Alert, AlertTitle, AlertDescription };



/* ===== FILE: \ps-ps\src\components\ui\alertMessages.tsx ===== */

import { AlertCircleIcon } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

type AlertMessageProps = {
	messages: Record<string, string>;
};

export const AlertMessages: React.FC<AlertMessageProps> = ({ messages }) => {
	return (
		<Alert variant="destructive">
			<AlertCircleIcon />
			<AlertTitle />
			<AlertDescription>
				<ul className="list-disc pl-4 space-y-1">
					{Object.entries(messages).map(([_, value], index) => (
						<li key={index}>{value}</li>
					))}
				</ul>
			</AlertDescription>
		</Alert>
	);
};



/* ===== FILE: \ps-ps\src\components\ui\badge.tsx ===== */

import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import type * as React from 'react';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
	'inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden',
	{
		variants: {
			variant: {
				default:
					'border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90',
				secondary:
					'border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90',
				destructive:
					'border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
				outline:
					'text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground',
			},
		},
		defaultVariants: {
			variant: 'default',
		},
	},
);

function Badge({
	className,
	variant,
	asChild = false,
	...props
}: React.ComponentProps<'span'> &
	VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
	const Comp = asChild ? Slot : 'span';

	return (
		<Comp
			data-slot="badge"
			className={cn(badgeVariants({ variant }), className)}
			{...props}
		/>
	);
}

export { Badge, badgeVariants };



/* ===== FILE: \ps-ps\src\components\ui\button.tsx ===== */

import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import type * as React from 'react';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
	"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
	{
		variants: {
			variant: {
				default:
					'bg-primary text-primary-foreground shadow-xs hover:bg-primary/90',
				destructive:
					'bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
				outline:
					'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
				secondary:
					'bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80',
				ghost:
					'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
				link: 'text-primary underline-offset-4 hover:underline',
			},
			size: {
				default: 'h-9 px-4 py-2 has-[>svg]:px-3',
				sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
				lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
				icon: 'size-9',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	},
);

function Button({
	className,
	variant,
	size,
	asChild = false,
	...props
}: React.ComponentProps<'button'> &
	VariantProps<typeof buttonVariants> & {
		asChild?: boolean;
	}) {
	const Comp = asChild ? Slot : 'button';

	return (
		<Comp
			data-slot="button"
			className={cn(buttonVariants({ variant, size, className }))}
			{...props}
		/>
	);
}

export { Button, buttonVariants };



/* ===== FILE: \ps-ps\src\components\ui\card.tsx ===== */

import type * as React from 'react';

import { cn } from '@/lib/utils';

function Card({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot="card"
			className={cn(
				'bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm',
				className,
			)}
			{...props}
		/>
	);
}

function CardHeader({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot="card-header"
			className={cn(
				'@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6',
				className,
			)}
			{...props}
		/>
	);
}

function CardTitle({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot="card-title"
			className={cn('leading-none font-semibold', className)}
			{...props}
		/>
	);
}

function CardDescription({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot="card-description"
			className={cn('text-muted-foreground text-sm', className)}
			{...props}
		/>
	);
}

function CardAction({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot="card-action"
			className={cn(
				'col-start-2 row-span-2 row-start-1 self-start justify-self-end',
				className,
			)}
			{...props}
		/>
	);
}

function CardContent({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot="card-content"
			className={cn('px-6', className)}
			{...props}
		/>
	);
}

function CardFooter({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot="card-footer"
			className={cn('flex items-center px-6 [.border-t]:pt-6', className)}
			{...props}
		/>
	);
}

export {
	Card,
	CardHeader,
	CardFooter,
	CardTitle,
	CardAction,
	CardDescription,
	CardContent,
};



/* ===== FILE: \ps-ps\src\components\ui\checkbox.tsx ===== */

import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { CheckIcon } from 'lucide-react';
import type * as React from 'react';

import { cn } from '@/lib/utils';

function Checkbox({
	className,
	...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
	return (
		<CheckboxPrimitive.Root
			data-slot="checkbox"
			className={cn(
				'peer border-input dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50',
				className,
			)}
			{...props}
		>
			<CheckboxPrimitive.Indicator
				data-slot="checkbox-indicator"
				className="flex items-center justify-center text-current transition-none"
			>
				<CheckIcon className="size-3.5" />
			</CheckboxPrimitive.Indicator>
		</CheckboxPrimitive.Root>
	);
}

export { Checkbox };



/* ===== FILE: \ps-ps\src\components\ui\IndeterminateCheckbox.tsx ===== */

import type React from 'react';
import { Checkbox } from '@/components/ui/checkbox';

/**
 * 不確定状態をサポートするチェックボックスコンポーネント
 * checked: 通常のチェック状態（boolean）
 * indeterminate: 中間状態フラグ（true のとき indeterminate 表示にする）
 * onChange:チェック変更時に呼ばれるハンドラ
 * className: スタイルクラス（オプション）
 */
export function IndeterminateCheckbox({
	checked,
	indeterminate,
	onChange,
	className = '',
}: {
	checked: boolean;
	indeterminate?: boolean;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	className?: string;
}) {
	return (
		<Checkbox
			// `checked` プロパティには true / false / 'indeterminate(中間状態)' のいずれかを渡せる
			checked={indeterminate ? 'indeterminate' : checked}
			onCheckedChange={(val) => {
				const syntheticEvent = {
					target: { checked: Boolean(val) },
				} as React.ChangeEvent<HTMLInputElement>;
				onChange(syntheticEvent);
			}}
			className={className}
		/>
	);
}



/* ===== FILE: \ps-ps\src\components\ui\input.tsx ===== */

import type * as React from 'react';

import { cn } from '@/lib/utils';

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
	return (
		<input
			type={type}
			data-slot="input"
			className={cn(
				'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
				'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
				'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
				className,
			)}
			{...props}
		/>
	);
}

export { Input };



/* ===== FILE: \ps-ps\src\components\ui\label.tsx ===== */

import * as LabelPrimitive from '@radix-ui/react-label';
import type * as React from 'react';

import { cn } from '@/lib/utils';

function Label({
	className,
	...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
	return (
		<LabelPrimitive.Root
			data-slot="label"
			className={cn(
				'flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
				className,
			)}
			{...props}
		/>
	);
}

export { Label };



/* ===== FILE: \ps-ps\src\components\ui\select.tsx ===== */

import * as SelectPrimitive from '@radix-ui/react-select';
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import type * as React from 'react';

import { cn } from '@/lib/utils';

function Select({
	...props
}: React.ComponentProps<typeof SelectPrimitive.Root>) {
	return <SelectPrimitive.Root data-slot="select" {...props} />;
}

function SelectGroup({
	...props
}: React.ComponentProps<typeof SelectPrimitive.Group>) {
	return <SelectPrimitive.Group data-slot="select-group" {...props} />;
}

function SelectValue({
	...props
}: React.ComponentProps<typeof SelectPrimitive.Value>) {
	return <SelectPrimitive.Value data-slot="select-value" {...props} />;
}

function SelectTrigger({
	className,
	size = 'default',
	children,
	...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger> & {
	size?: 'sm' | 'default';
}) {
	return (
		<SelectPrimitive.Trigger
			data-slot="select-trigger"
			data-size={size}
			className={cn(
				"border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex w-fit items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
				className,
			)}
			{...props}
		>
			{children}
			<SelectPrimitive.Icon asChild>
				<ChevronDownIcon className="size-4 opacity-50" />
			</SelectPrimitive.Icon>
		</SelectPrimitive.Trigger>
	);
}

function SelectContent({
	className,
	children,
	position = 'popper',
	...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) {
	return (
		<SelectPrimitive.Portal>
			<SelectPrimitive.Content
				data-slot="select-content"
				className={cn(
					'bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border shadow-md',
					position === 'popper' &&
						'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
					className,
				)}
				position={position}
				{...props}
			>
				<SelectScrollUpButton />
				<SelectPrimitive.Viewport
					className={cn(
						'p-1',
						position === 'popper' &&
							'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1',
					)}
				>
					{children}
				</SelectPrimitive.Viewport>
				<SelectScrollDownButton />
			</SelectPrimitive.Content>
		</SelectPrimitive.Portal>
	);
}

function SelectLabel({
	className,
	...props
}: React.ComponentProps<typeof SelectPrimitive.Label>) {
	return (
		<SelectPrimitive.Label
			data-slot="select-label"
			className={cn('text-muted-foreground px-2 py-1.5 text-xs', className)}
			{...props}
		/>
	);
}

function SelectItem({
	className,
	children,
	...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
	return (
		<SelectPrimitive.Item
			data-slot="select-item"
			className={cn(
				"focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
				className,
			)}
			{...props}
		>
			<span className="absolute right-2 flex size-3.5 items-center justify-center">
				<SelectPrimitive.ItemIndicator>
					<CheckIcon className="size-4" />
				</SelectPrimitive.ItemIndicator>
			</span>
			<SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
		</SelectPrimitive.Item>
	);
}

function SelectSeparator({
	className,
	...props
}: React.ComponentProps<typeof SelectPrimitive.Separator>) {
	return (
		<SelectPrimitive.Separator
			data-slot="select-separator"
			className={cn('bg-border pointer-events-none -mx-1 my-1 h-px', className)}
			{...props}
		/>
	);
}

function SelectScrollUpButton({
	className,
	...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
	return (
		<SelectPrimitive.ScrollUpButton
			data-slot="select-scroll-up-button"
			className={cn(
				'flex cursor-default items-center justify-center py-1',
				className,
			)}
			{...props}
		>
			<ChevronUpIcon className="size-4" />
		</SelectPrimitive.ScrollUpButton>
	);
}

function SelectScrollDownButton({
	className,
	...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
	return (
		<SelectPrimitive.ScrollDownButton
			data-slot="select-scroll-down-button"
			className={cn(
				'flex cursor-default items-center justify-center py-1',
				className,
			)}
			{...props}
		>
			<ChevronDownIcon className="size-4" />
		</SelectPrimitive.ScrollDownButton>
	);
}

export {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectScrollDownButton,
	SelectScrollUpButton,
	SelectSeparator,
	SelectTrigger,
	SelectValue,
};



/* ===== FILE: \ps-ps\src\components\ui\sheet.tsx ===== */

import * as SheetPrimitive from '@radix-ui/react-dialog';
import { XIcon } from 'lucide-react';
import type * as React from 'react';

import { cn } from '@/lib/utils';

function Sheet({ ...props }: React.ComponentProps<typeof SheetPrimitive.Root>) {
	return <SheetPrimitive.Root data-slot="sheet" {...props} />;
}

function SheetTrigger({
	...props
}: React.ComponentProps<typeof SheetPrimitive.Trigger>) {
	return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />;
}

function SheetClose({
	...props
}: React.ComponentProps<typeof SheetPrimitive.Close>) {
	return <SheetPrimitive.Close data-slot="sheet-close" {...props} />;
}

function SheetPortal({
	...props
}: React.ComponentProps<typeof SheetPrimitive.Portal>) {
	return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />;
}

function SheetOverlay({
	className,
	...props
}: React.ComponentProps<typeof SheetPrimitive.Overlay>) {
	return (
		<SheetPrimitive.Overlay
			data-slot="sheet-overlay"
			className={cn(
				'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50',
				className,
			)}
			{...props}
		/>
	);
}

function SheetContent({
	className,
	children,
	side = 'right',
	...props
}: React.ComponentProps<typeof SheetPrimitive.Content> & {
	side?: 'top' | 'right' | 'bottom' | 'left';
}) {
	return (
		<SheetPortal>
			<SheetOverlay />
			<SheetPrimitive.Content
				data-slot="sheet-content"
				className={cn(
					'bg-background data-[state=open]:animate-in data-[state=closed]:animate-out fixed z-50 flex flex-col gap-4 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500',
					side === 'right' &&
						'data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm',
					side === 'left' &&
						'data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm',
					side === 'top' &&
						'data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 h-auto border-b',
					side === 'bottom' &&
						'data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 h-auto border-t',
					className,
				)}
				{...props}
			>
				{children}
				<SheetPrimitive.Close className="ring-offset-background focus:ring-ring data-[state=open]:bg-secondary absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none">
					<XIcon className="size-4" />
					<span className="sr-only">Close</span>
				</SheetPrimitive.Close>
			</SheetPrimitive.Content>
		</SheetPortal>
	);
}

function SheetHeader({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot="sheet-header"
			className={cn('flex flex-col gap-1.5 p-4', className)}
			{...props}
		/>
	);
}

function SheetFooter({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot="sheet-footer"
			className={cn('mt-auto flex flex-col gap-2 p-4', className)}
			{...props}
		/>
	);
}

function SheetTitle({
	className,
	...props
}: React.ComponentProps<typeof SheetPrimitive.Title>) {
	return (
		<SheetPrimitive.Title
			data-slot="sheet-title"
			className={cn('text-foreground font-semibold', className)}
			{...props}
		/>
	);
}

function SheetDescription({
	className,
	...props
}: React.ComponentProps<typeof SheetPrimitive.Description>) {
	return (
		<SheetPrimitive.Description
			data-slot="sheet-description"
			className={cn('text-muted-foreground text-sm', className)}
			{...props}
		/>
	);
}

export {
	Sheet,
	SheetTrigger,
	SheetClose,
	SheetContent,
	SheetHeader,
	SheetFooter,
	SheetTitle,
	SheetDescription,
};



/* ===== FILE: \ps-ps\src\components\ui\sonner.tsx ===== */

import { useTheme } from "next-themes"
import { Toaster as Sonner, ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }



/* ===== FILE: \ps-ps\src\components\ui\tooltip.tsx ===== */

import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"

import { cn } from "@/lib/utils"

function TooltipProvider({
  delayDuration = 0,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delayDuration={delayDuration}
      {...props}
    />
  )
}

function Tooltip({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  return (
    <TooltipProvider>
      <TooltipPrimitive.Root data-slot="tooltip" {...props} />
    </TooltipProvider>
  )
}

function TooltipTrigger({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />
}

function TooltipContent({
  className,
  sideOffset = 0,
  children,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Content>) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        className={cn(
          "bg-primary text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-md px-3 py-1.5 text-xs text-balance",
          className
        )}
        {...props}
      >
        {children}
        <TooltipPrimitive.Arrow className="bg-primary fill-primary z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]" />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  )
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }



/* ===== FILE: \ps-ps\src\config\apiConfig.ts ===== */

const BASE_URL = 'http://ztesta/GX_PMSR_TEST1';

export const API_URL = {
  MSRGetHeader: `${BASE_URL}/GetMilestoneHeader/MSRHeader?MSRMngCode=%1`,
  MSRGetAIPData: `${BASE_URL}/GetMilestoneData/AIPData?MSRMngCode=%1&SkipNum=%2`,
  SaveDataAll: `${BASE_URL}/SaveMilestoneData/SaveAll?MilestoneDataJSON`,
  GetPJStatusData:`${BASE_URL}/GetPJStatusData/PJStatusData?MSRMngCode=%1`,
};

export default {
  API_URL,
};



/* ===== FILE: \ps-ps\src\constants\messagesList.ts ===== */

const messagesList: Record<string, string> = {
	PIP_SUCCESS: 'PIP生成に成功しました',
	PIP_FAILURE: 'PIP生成に失敗しました',
	PIP_EDIT_SUCCESS: 'PIP編集保存に成功しました',
	PIP_EDIT_FAILURE: 'PIP編集保存に失敗しました',
	SEARCH_FAILURE: '検索に失敗しました',
	AIP_ASSIGNED: 'AIPに割当済みのPIPは削除できません。',
	PIP_DELETE: 'PIPを削除しました',
	SELECT_PROJECT: 'プロジェクトを選択してください',
	SELECT_FG: 'FunctionGroupを選択して下さい',
	ITEM_SUCCESS: '購入品の保存に成功しました',
	ITEM_FAILURE: '購入品の保存に失敗しました',
	AIP_SUCCESS: 'AIP生成に成功しました',
	AIP_FAILURE: 'AIP生成に失敗しました',
};

export default messagesList;



/* ===== FILE: \ps-ps\src\features\item-assignment\components\index.ts ===== */

export { ItemAssignmentView } from './ItemAssignmentView';
export { PipCardArea } from './PipCardArea';




/* ===== FILE: \ps-ps\src\features\item-assignment\components\ItemAssignmentView.tsx ===== */

// import { GenericEditableTable } from '@/components';
// import { ItemTableControls } from '@/features/item-management/components/ItemTableControls';
// import { ITEM_FILTER_PLACEHOLDERS } from '@/features/item-management/constants/item-filter-placeholders';
// import { getItemColumns } from '@/features/item-management/utils/getItemColumns';
// import { cn } from '@/lib/utils';
// import { useAlertStore } from '@/stores/useAlartStore';
// import { useIsSearchTriggeredStore } from '@/stores/useIsSearchTriggeredStore';
// import { usePipGenerationModeStore } from '@/stores/usePipGenerationModeStore';
// import { useSelectedFGStore } from '@/stores/useSelectedFgStore';
// import { useSelectedJobNoStore } from '@/stores/useSelectedJobNoStore';
// import type { Item } from '@/types';
// import type { Table } from '@tanstack/react-table';
// import { useContext, useEffect, useState } from 'react';
// import { PSysContext } from '../../../routes/p-sys/route';
// import { useItems } from '../hooks/useItems';
// // 購入品取得
// import { styleItemCell } from '@/features/item-management/utils';
// import { SplashWrapper } from '@/features/psys-randing/components';
// import { getItemsForItemTable } from '../utils/getItemsForItemTable';
// import { PipCardArea } from './PipCardArea';

// export const ItemAssignmentView: React.FC = () => {
// 	// コンテキストから値を取得: ItemAssignmentViewを呼び出す際のモード
// 	const { isItemAssignmentView } = useContext(PSysContext);
// 	// 選択したJobNo、FG
// 	const { selectedJobNo } = useSelectedJobNoStore();
// 	const { selectedFG } = useSelectedFGStore();

// 	// アラートの状態
// 	const { showAlert } = useAlertStore();

// 	// Display by Selectionの押下状態
// 	const { triggerState, resetSearchTrigger, triggerResearch } =
// 		useIsSearchTriggeredStore();

// 	// 購入品情取得
// 	const { refetch } = useItems(selectedJobNo, selectedFG?.fgCode);
// 	const [items, setItems] = useState<Item[]>([]);

// 	// 購入品取得処理
// 	useEffect(() => {
// 		if (triggerState === 'none') return;

// 		// Display by Selection押下状態をリセット
// 		resetSearchTrigger();

// 		const fetchItems = async () => {
// 			try {
// 				const result = await refetch(); // 明示的に再フェッチ
// 				const fetched = result.data;

// 				if (fetched) {
// 					// 異常処理: 検索結果が見つからない
// 					if (typeof fetched.responseJSON === 'string') {
// 						const parsed = JSON.parse(fetched.responseJSON);
// 						if (parsed.statusCode === '404') {
// 							showAlert(['SEARCH_FAILURE']);
// 							setItems([]);
// 							return;
// 						}
// 					}

// 					// 正常処理: 購入品取得
// 					setItems(getItemsForItemTable(fetched));
// 				}
// 			} catch (err) {
// 				console.error('Refetch error:', err);
// 				showAlert(['SEARCH_FAILURE']);
// 				setItems([]);
// 			}
// 		};

// 		fetchItems(); // 非同期関数を呼び出す
// 	}, [triggerState]);

// 	// チェック列の表示制御（編集モードでは非表示）
// 	const [showItemCheckbox, setShowItemCheckbox] = useState(false);
// 	// 編集モードの ON/OFF
// 	const [isEditingItem, setIsEditingItem] = useState(false);
// 	// 編集中の差分管理（id ごとの部分更新）
// 	const [itemDirty, setItemDirty] = useState<Record<string, Partial<Item>>>({});
// 	// 行の選択状態（割当対象）
// 	const [itemSelection, setItemSelection] = useState<Record<string, boolean>>(
// 		{},
// 	);
// 	// 現在チェックされている行数
// 	const [selectedCount, setSelectedCount] = useState(0);
// 	// 割当確定後のレコード一覧（チェック→割当ボタン押下で確定）
// 	const [committedItems, setCommittedItems] = useState<Item[]>([]);
// 	// 現在フィルターで表示されている件数
// 	const [filteredCount, setFilteredCount] = useState(0);
// 	// React Tableのインスタンス フィルタークリア用に保持
// 	const [tableInstance, setTableInstance] = useState<Table<Item> | null>(null);
// 	// フィルタ表示状態
// 	const [showFilters, setShowFilters] = useState(true);

// 	// PIP生成モードの状態
// 	const pipGenerationMode = usePipGenerationModeStore(
// 		(state) => state.pipGenerationMode,
// 	);
// 	// PIP管理画面から遷移した場合は、初期状態でPIP生成モード表示とする
// 	const setPipGenerationMode = usePipGenerationModeStore(
// 		(state) => state.setPipGenerationMode,
// 	);
// 	// PIP編集モードの場合は購入品を再検索する
// 	useEffect(() => {
// 		if (isItemAssignmentView === 'pipManagement') {
// 			setPipGenerationMode('generation');

// 			// 再検索の実施
// 			triggerResearch();
// 		}
// 	}, [isItemAssignmentView]);

// 	// PIP Nicknameの入力状態を管理
// 	const [pipNickName, setPipNickName] = useState('');

// 	// PIPカードエリアの各数量変更状態を管理
// 	const [selectedQtyMap, setSelectedQtyMap] = useState<Record<string, string>>(
// 		{},
// 	);

// 	/*
// 	 * 編集中にブラウザ(タブ)を閉じようとすると
// 	 * 閉じて問題ないかダイヤログで確認
// 	 */
// 	useEffect(() => {
// 		const handleBeforeUnload = (e: BeforeUnloadEvent) => {
// 			e.preventDefault();
// 			e.returnValue = '';
// 		};

// 		if (isEditingItem) {
// 			window.addEventListener('beforeunload', handleBeforeUnload);
// 		} else {
// 			window.removeEventListener('beforeunload', handleBeforeUnload);
// 		}

// 		return () => {
// 			window.removeEventListener('beforeunload', handleBeforeUnload);
// 		};
// 		// 値が変更されたときに再実行
// 	}, [isEditingItem]);

// 	return (
// 		<SplashWrapper>
// 			{/* 購入品管理画面 */}
// 			<div className="h-screen bg-gray-100 p-6 overflow-hidden">
// 				{/* タイトル・ボタン群 */}
// 				<ItemTableControls
// 					data={items}
// 					setData={setItems}
// 					isEditing={isEditingItem}
// 					setIsEditing={setIsEditingItem}
// 					dirtyCells={itemDirty}
// 					setDirtyCells={setItemDirty}
// 					rowSelection={itemSelection}
// 					setRowSelection={setItemSelection}
// 					showCheckbox={showItemCheckbox}
// 					setShowCheckbox={setShowItemCheckbox}
// 					selectedCount={selectedCount}
// 					setCommittedItems={setCommittedItems}
// 					committedItems={committedItems}
// 					tableInstance={tableInstance}
// 					showFilters={showFilters}
// 					setShowFilters={setShowFilters}
// 					// PIPカードエリア固有の値や更新値
// 					pipNickName={pipNickName}
// 					setPipNickName={setPipNickName}
// 					selectedQtyMap={selectedQtyMap}
// 					setSelectedQtyMap={setSelectedQtyMap}
// 				/>
// 				{/* 件数表示（フィルター後/全体） */}
// 				<span className="ml-auto text-sm text-gray-600">
// 					count: {filteredCount} / {items.length}
// 				</span>
// 				<div className="max-w-10xl mx-auto h-full flex gap-4">
// 					<div
// 						className={cn(
// 							'h-[80%]',
// 							pipGenerationMode !== 'display' ? 'w-1/2' : 'w-full',
// 						)}
// 					>
// 						{/* 購入品テーブル(汎用テーブルを使用、編集機能付き) */}
// 						<GenericEditableTable
// 							keyField="itemNo"
// 							data={items}
// 							columns={getItemColumns(pipGenerationMode)} // PIP生成モード時は一部列を非表示
// 							isEditing={isEditingItem}
// 							showCheckbox={!isEditingItem}
// 							showFilters={showFilters}
// 							dirtyCells={itemDirty}
// 							setDirtyCells={setItemDirty}
// 							rowSelection={itemSelection}
// 							setRowSelection={setItemSelection}
// 							onSelectedRowCountChange={setSelectedCount}
// 							onFilteredCountChange={setFilteredCount} // ✅ フィルター件数を受け取る
// 							renderCell={styleItemCell}
// 							customFilterPlaceholders={ITEM_FILTER_PLACEHOLDERS}
// 							numericFilterColumns={['qty']}
// 							onTableReady={setTableInstance} // table インスタンスを受け取りフィルター操作用に保存
// 						/>
// 					</div>
// 					{/* 一覧表示のみの場合以外は、右側にPIPカードエリアを表示 */}
// 					{pipGenerationMode !== 'display' && (
// 						<div className="w-1/2">
// 							<PipCardArea
// 								// 購入品管理画面 左側で選択された購入品
// 								committedItems={committedItems}
// 								setCommittedItems={setCommittedItems}
// 								setData={setItems}
// 								// PIPカードエリア固有の値や更新値
// 								pipNickName={pipNickName}
// 								setPipNickName={setPipNickName}
// 								selectedQtyMap={selectedQtyMap}
// 								setSelectedQtyMap={setSelectedQtyMap}
// 							/>
// 						</div>
// 					)}
// 				</div>
// 			</div>
// 		</SplashWrapper>
// 	);
// };



/* ===== FILE: \ps-ps\src\features\item-assignment\components\PipCardArea.tsx ===== */

import { EmptyState } from '@/components';
import type { Item } from '@/types';
import { Plus } from 'lucide-react';

/**
 * 購入品管理画面 PIPカードなしのアラート/PIPカード表示エリア
 * committedItems: 割当確定後のレコード一覧
 */
export const PipCardArea = ({ committedItems }: { committedItems: Item[] }) => {
	return committedItems.length === 0 ? (
		// PIPカードなしのアラート
		<div className="pt-30">
			<EmptyState icon={Plus} label="アイテムを選択してPIPを生成してください" />
		</div>
	) : (
		// PIPカード表示エリア
		<div className="bg-white rounded-lg shadow-sm border border-gray-300 flex flex-col h-[80%]">
			<ul className="text-sm space-y-1 list-disc list-inside text-gray-800">
				{committedItems.map((item) => (
					<li key={String(item)}>{JSON.stringify(item)}</li>
				))}
			</ul>
		</div>
	);
};



/* ===== FILE: \ps-ps\src\features\item-assignment\hooks\usePipGenerate.ts ===== */

import { useMutation } from '@tanstack/react-query';
import type { Item } from '../../../types/common';

type ItemTableDefinition = {
	ItemSurKey?: number | string;
	ItemQty?: number | string;
	Element?: string;
	IBSCode?: string;
};

// 抽出する
function extractItems(
	targetData: Record<string, Partial<Item>>,
): ItemTableDefinition[] {
	return Object.values(targetData).map((item) => {
		return {
			ItemSurKey: item.itemSurKey ?? undefined,
			ItemQty: item.qty ?? '',
			Element: item.costElement ?? '',
			IBSCode: item.ibsCode ?? '',
		};
	});
}

// 購入品管理画面(PIP生成モード)で使用: PIPコードは仮の値を用いる
export const usePipGenerate = () => {
	return useMutation({
		mutationFn: async ({
			userId,
			jobNo,
			fgCode,
			targetData,
			pipNickName,
			selectedQtyMap, // PIPカードエリア 数量テキストボックス操作差分
		}: {
			userId: string;
			jobNo: string;
			fgCode: string;
			targetData: Record<string, Partial<Item>>;
			pipNickName: string;
			selectedQtyMap: Record<string, string>;
		}) => {
			// 必要な要素のみを抽出する
			const item = extractItems(targetData);

			// 1要素目の情報を取得
			let firstElement: string | undefined;
			let firstItemIBSCode: string | undefined;

			if (item.length > 0) {
				firstElement = item[0].Element;
				firstItemIBSCode = item[0].IBSCode;
			}

			// itemとして送る要素を抽出する
			const requestParamItem = item
				.filter(({ ItemSurKey }) => ItemSurKey !== undefined)
				.map(({ ItemSurKey }) => ({
					itemSurKey: Number(ItemSurKey),
					itemQty: Number(selectedQtyMap[String(ItemSurKey)] ?? '1'),
				}));

			try {
				const response = await fetch(
					'http://testservb.xx.co.jp/GX_PSYS_TEST2/transactions/GeneratePIP',
					{
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							'Cache-Control': 'no-cache',
						},
						cache: 'no-store',
						body: JSON.stringify({
							requestJSON: JSON.stringify({
								userId: userId,
								jobNo: jobNo,
								fgCode: fgCode.charAt(0),
								pip: [
									{
										sourcePIPCode: '', // 購入品管理画面(PIP生成モード)から呼び出す場合は空文字を指定
										pipCode: '', // 購入品管理画面(PIP生成モード)から呼び出す場合は空文字を指定
										pipNickName: pipNickName,
										element: firstElement,
										ibsCode: firstItemIBSCode,
										item: requestParamItem,
									},
								],
							}),
						}),
					},
				);

				if (!response.ok) {
					console.log(response.status);
					throw new Error(`HTTP status: ${response.status}`);
				}
				return await response.json();
			} catch (error) {
				console.error('Fetch error:', error);
				throw error;
			}
		},
		staleTime: 5 * 60 * 1000,
		gcTime: 10 * 60 * 1000,
		refetchOnWindowFocus: false,
	});
};



/* ===== FILE: \ps-ps\src\features\item-assignment\utils\getItemsForItemTable.ts ===== */

// import type { Item } from '../../../types/common';

// /**
//  * ItemTableで使用するためのItem型に変換
//  */
// type JsonWithResponse = {
// 	responseJSON: string;
// };
// export const getItemsForItemTable = (json: JsonWithResponse): Item[] => {
// 	// responseJSONをパース
// 	const parsedResponse = JSON.parse(json.responseJSON);

// 	// itemフィールドをさらにパース
// 	const rawItems: Item[] = JSON.parse(parsedResponse.item);

// 	// Item型に変換
// 	return rawItems.map(
// 		(item: Item): Item => ({
// 			itemSurKey: Number(String(item.itemSurKey).trim()),
// 			jobNo: String(item.jobNo).trim(),
// 			fg: String(item.fgCode).trim(),
// 			itemNo: String(item.itemNo).trim(),
// 			coreItemNo: String(item.itemCoreNo).trim(),
// 			itemName: String(item.itemName).trim(),
// 			qty: Number(String(item.itemQty).trim()),
// 			itemRestQty: Number(String(item.itemRestQty).trim()), // PIP未割当数量
// 			itemSortKey: Number(String(item.itemSortKey).trim()),
// 			costElement: String(item.itemCostElement).trim(),
// 			ibsCode: String(item.itemIBSCode).trim(),
// 			pipCode: item.itemIsAssign,
// 			belongsToPip: '',
// 			pipItemIndex: '',
// 		}),
// 	);
// };



/* ===== FILE: \ps-ps\src\features\item-management\columns\getItemColumns.ts ===== */

import type { Item } from '@/types';
import type { ColumnDef } from '@tanstack/react-table';

/**
 * 購入品テーブルのカラムを定義する関数
 * columnHidden: 一部のカラムを非表示にするフラグ
 */
export const getItemColumns = (columnHidden: boolean): ColumnDef<Item>[] => {
	// ベースとなるカラム定義（すべての列を表示）
	const base: ColumnDef<Item>[] = [
		{
			id: 'itemNo',
			header: 'Item No.',
			accessorKey: 'itemNo',
			size: 150,
			minSize: 80,
			maxSize: 200,
		},
		// {
		// 	id: 'coreItemNo',
		// 	header: 'Core Item No.',
		// 	accessorKey: 'coreItemNo',
		// 	size: 150,
		// 	minSize: 80,
		// 	maxSize: 200,
		// },
		{
			id: 'itemName',
			header: 'Item Name',
			accessorKey: 'itemName',
			size: 200,
			minSize: 150,
			maxSize: 300,
		},
		{
			id: 'qty',
			header: 'Qty',
			accessorKey: 'qty',
			size: 80,
			minSize: 40,
			maxSize: 100,
		},
		{
			id: 'costElement',
			header: 'Cost Element',
			accessorKey: 'costElement',
			size: 120,
			minSize: 80,
			maxSize: 150,
		},
		{
			id: 'ibsCode',
			header: 'IBS Code',
			accessorKey: 'ibsCode',
			size: 100,
			minSize: 80,
			maxSize: 120,
		},
		{
			id: 'itemAssignmentStatus',
			header: 'Status',
			accessorKey: 'itemAssignmentStatus',
			size: 150,
			minSize: 80,
			maxSize: 200,
		},
	];

	// 通常モード：すべての列を表示
	if (!columnHidden) return base;

	// パッケージ生成モード時に非表示にする列のキー一覧
	const hidden = ['coreItemNo', 'itemAssignmentStatus'];

	// 表示対象列だけをフィルタリングして返す
	return base.filter(
		(col) =>
			'accessorKey' in col && // accessorKey が存在する列のみ対象
			typeof col.accessorKey === 'string' &&
			!hidden.includes(col.accessorKey),
	);
};



/* ===== FILE: \ps-ps\src\features\item-management\components\ItemTableControls.tsx ===== */

import { Button } from '@/components/ui/button';
import { usePipGenerationModeStore } from '@/stores/usePipGenerationModeStore';
import type { Item } from '@/types';
import type { Table } from '@tanstack/react-table';
import {
	ArrowRight,
	CircleChevronRight,
	Funnel,
	FunnelX,
	Package,
	Save,
	X,
} from 'lucide-react';
import { useState } from 'react';

/**
 * 購入品テーブルを操作する汎用ボタン群コンポーネント
 * 編集、削除、割当（PIP登録）、フィルタ表示などの操作を提供する
 */
export function ItemTableControls({
	data, // 購入品データの配列
	setData, // データ更新関数（保存・削除時に使用）
	isEditing, // 編集モードかどうかのフラグ
	setIsEditing, // 編集モードの切り替え関数
	dirtyCells, // 編集されたセルの差分（itemNoごとの変更内容）
	setDirtyCells, // 差分の更新関数
	rowSelection, // 行の選択状態（itemNo: true/false）
	setRowSelection, // 選択状態の更新関数
	showCheckbox, // チェックボックス列の表示有無
	setShowCheckbox, // チェックボックス列の表示切り替え関数
	selectedCount, // 選択された行数
	setCommittedItems, // PIPに割り当てるアイテムの更新関数
	tableInstance, // テーブルインスタンス（フィルタ操作に使用）
	showFilters, // フィルタ表示状態
	setShowFilters, // フィルタ表示状態の更新関数
}: {
	data: Item[];
	setData: React.Dispatch<React.SetStateAction<Item[]>>;
	isEditing: boolean;
	setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
	dirtyCells: Record<string, Partial<Item>>;
	setDirtyCells: React.Dispatch<
		React.SetStateAction<Record<string, Partial<Item>>>
	>;
	rowSelection: Record<string, boolean>;
	setRowSelection: React.Dispatch<
		React.SetStateAction<Record<string, boolean>>
	>;
	showCheckbox: boolean;
	setShowCheckbox: React.Dispatch<React.SetStateAction<boolean>>;
	selectedCount: number;
	setCommittedItems: React.Dispatch<React.SetStateAction<Item[]>>;
	tableInstance: Table<Item> | null;
	showFilters: boolean;
	setShowFilters: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	// 編集開始時に元データを保持（キャンセル時に復元するため）
	const [originalData, setOriginalData] = useState<Item[] | null>(null);

	// PIP生成モードの状態（display: 表示モード, generation: 生成モード）
	const pipGenerationMode = usePipGenerationModeStore(
		(state) => state.pipGenerationMode,
	);
	const setPipGenerationMode = usePipGenerationModeStore(
		(state) => state.setPipGenerationMode,
	);

	// 選択された購入品リスト（チェックされた行のみ抽出）
	const selectedItems = data.filter((d) => rowSelection[d.itemNo]);

	// PIPに割り当てる処理：選択されたアイテムを committedItems に追加
	const handleAssign = () => {
		setCommittedItems((prev) => [...prev, ...selectedItems]);
		setRowSelection({});
	};

	// 削除処理：選択された行を data から除外
	// const handleDelete = () => {
	// 	const idsToDelete = new Set(
	// 		Object.keys(rowSelection).filter((id) => rowSelection[id]),
	// 	);
	// 	setData((prev) =>
	// 		prev.filter((row) => !idsToDelete.has(String(row.itemNo))),
	// 	);
	// 	setRowSelection({});
	// 	setDirtyCells({});
	// };

	// 編集モード開始：元データを保存
	// const startEditing = () => {
	// 	setOriginalData(data.map((row) => ({ ...row })));
	// 	setIsEditing(true);
	// };

	// 編集キャンセル：元データに戻す
	const cancelEditing = () => {
		if (originalData !== null) {
			setData(originalData.map((row) => ({ ...row })));
			setDirtyCells({});
			setOriginalData(null);
			setIsEditing(false);
		}
	};

	return (
		<div className="flex-shrink-0">
			{/* タイトルと編集モードバッジの表示エリア */}
			<div className="flex items-center gap-2">
				<h2 className="text-lg font-semibold text-gray-800">購入品管理</h2>
				{isEditing && (
					<div className="flex items-center gap-2">
						{/* 編集モードバッジ */}
						<span className="text-xs px-2 py-1 rounded-full bg-indigo-100 text-indigo-800 font-medium">
							Edit Mode
						</span>
						{/* 未保存の変更がある場合のバッジ */}
						{Object.keys(dirtyCells).length > 0 && (
							<span className="text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-800 font-medium">
								Unsaved Changes
							</span>
						)}
					</div>
				)}
			</div>

			{/* ボタンエリア（フィルタ・操作ボタン） */}
			<div className="flex items-end justify-between mt-2">
				{/* 左側：フィルタ表示切り替えボタン */}
				{/* <FilterButton
					setShowFilters={setShowFilters}
					showFilters={showFilters}
					tableInstance={tableInstance}
				/> */}
				<div className="flex items-center gap-2">
					<Funnel size={16} />
					<span>:</span>
					{/* 未割当・一部未割当フィルタボタン */}
					<Button
						size="sm"
						variant="outline"
						onClick={() => setShowFilters((prev) => !prev)}
						className="h-8 px-3 bg-muted-indigo/80 hover:bg-muted-indigo/60 text-white hover:text-white cursor-pointer"
					>
						{showFilters ? (
							<span>Show Unassigned PIP Items</span>
						) : (
							<span>Clear PIP Assignment Filter</span>
						)}
					</Button>
					{/* フィルタークリアボタン */}
					<Button
						size="sm"
						variant="outline"
						onClick={() => tableInstance?.resetColumnFilters()}
						className="text-gray-800 cursor-pointer"
					>
						<FunnelX />
						Clear
					</Button>
				</div>

				{/* 中央：PIP割当ボタン（生成モード時のみ表示） */}
				{pipGenerationMode !== 'display' && (
					<>
					<Button
						onClick={handleAssign}
						disabled={selectedCount === 0}
						className="flex items-center gap-2 cursor-pointer h-8"
						size="sm"
					>
						<CircleChevronRight size={16} />
						PIPに割り当て
						<span>{selectedCount}件</span>
						<ArrowRight size={16} />
					</Button>
					{/* 割り当てボタンの位置調整のための要素 */}
					{/* 追ってレイアウト見直す */}
					<div className='w-[3vw]' />
					</>
				)}

				{/* 右側：操作ボタン群 */}
				<div className="flex items-center gap-2">
					{isEditing ? (
						<>
							{/* 編集キャンセルボタン */}
							<Button
								size="sm"
								variant="outline"
								onClick={cancelEditing}
								className="flex items-center gap-2 h-8 px-3 border border-gray-300 cursor-pointer"
							>
								<X className="w-4 h-4" />
								Cancel
							</Button>

							{/* 編集保存ボタン（変更がある場合のみ有効） */}
							<Button
								size="sm"
								variant="outline"
								onClick={() => {
									setData((prev) =>
										prev.map((row) =>
											dirtyCells[row.itemNo]
												? { ...row, ...dirtyCells[row.itemNo] }
												: row,
										),
									);
									setDirtyCells({});
									setOriginalData(null);
									setIsEditing(false);
								}}
								className="flex items-center gap-2 h-8 px-3 bg-muted-indigo hover:bg-muted-indigo/80 text-white hover:text-white cursor-pointer"
								disabled={Object.keys(dirtyCells).length === 0}
							>
								<Save className="w-4 h-4" />
								Save Changes
							</Button>
						</>
					) : (
						<>
							{pipGenerationMode === 'display' && (
								<>
									{/* エクスポートボタン（現在は無効） */}
									{/* <Button
										variant="outline"
										className="flex items-center gap-2 h-8 px-3 bg-muted-indigo hover:bg-muted-indigo/80 text-white hover:text-white cursor-pointer"
										disabled={true}
									>
										<Download className="w-4 h-4" />
										Export
									</Button> */}

									{/* インポートボタン（現在は無効） */}
									{/* <Button
										variant="outline"
										className="flex items-center gap-2 h-8 px-3 bg-muted-indigo hover:bg-muted-indigo/80 text-white hover:text-white cursor-pointer"
										disabled={true}
									>
										<FileUp className="w-4 h-4" />
										Import Item list
									</Button> */}

									{/* 編集開始ボタン */}
									{/* <Button
										size="sm"
										variant="outline"
										onClick={startEditing}
										className="flex items-center gap-2 h-8 px-3 bg-muted-indigo hover:bg-muted-indigo/80 text-white hover:text-white cursor-pointer"
									>
										<Edit className="w-4 h-4" />
										Edit
									</Button> */}

									{/* 削除ボタン（チェックボックスが非表示かつ編集モードでない場合） */}
									{/* {!showCheckbox && !isEditing && (
										<Button
											disabled={selectedCount === 0}
											onClick={handleDelete}
											size="sm"
											variant="outline"
											className="flex items-center gap-2 h-8 px-3 bg-muted-indigo hover:bg-muted-indigo/80 text-white hover:text-white cursor-pointer"
										>
											<Trash2 className="w-4 h-4" />
											Delete
										</Button>
									)} */}
								</>
							)}

							{/* PIP生成モード切り替えボタン */}
							{pipGenerationMode === 'display' && (
								<Button
									size="sm"
									variant="outline"
									onClick={() => {
										setShowCheckbox((prev) => !prev);
										setPipGenerationMode('generation');
									}}
									className="flex items-center gap-2 h-8 px-3 bg-orange-500 hover:bg-orange-500/80 text-white hover:text-white cursor-pointer"
								>
									<Package className="w-4 h-4" />
									Create PIP
								</Button>
							)}

							{/* PIP生成ボタン（DB登録用、現在は無効） */}
							{pipGenerationMode === 'generation' && (
								<Button
									size="sm"
									variant="outline"
									className="flex items-center gap-2 h-8 px-3 bg-blue-500 hover:bg-blue-500/80 text-white hover:text-white cursor-pointer"
									disabled={true}
								>
									<Package className="w-4 h-4" />
									Create
								</Button>
							)}

							{/* PIP生成モード終了ボタン */}
							{pipGenerationMode !== 'display' && (
								<Button
									size="sm"
									variant="outline"
									onClick={() => {
										setPipGenerationMode('display');
										setShowCheckbox((prev) => !prev);
									}}
									className="flex items-center gap-2 h-8 px-3 border border-gray-300 cursor-pointer"
								>
									<X className="w-4 h-4" />
									Close
								</Button>
							)}
						</>
					)}
				</div>
			</div>
		</div>
	);
}



/* ===== FILE: \ps-ps\src\features\item-management\components\ItemTableControls.types.ts ===== */

import type { Table } from '@tanstack/react-table';
import type { Item } from '@/types';

// ItemTableControlsのprop定義を外部ファイル化
export interface ItemTableControlsProps {
	data: Item[]; // 購入品データの配列
	setData: React.Dispatch<React.SetStateAction<Item[]>>; // データ更新関数（保存・削除時に使用）
	isEditing: boolean; // 編集モードの切り替え関数
	setIsEditing: React.Dispatch<React.SetStateAction<boolean>>; // 編集モードの切り替え関数
	dirtyCells: Record<string, Partial<Item>>; // 編集されたセルの差分（itemNoごとの変更内容）
	setDirtyCells: React.Dispatch<
		React.SetStateAction<Record<string, Partial<Item>>>
	>; // 差分の更新関数
	rowSelection: Record<string, boolean>; // 行の選択状態（itemNo: true/false）
	setRowSelection: React.Dispatch<
		React.SetStateAction<Record<string, boolean>>
	>; // 選択状態の更新関数
	committedItems: Item[]; // PIPに割り当てるアイテム
	showCheckbox: boolean; // チェックボックス列の表示有無
	setShowCheckbox: React.Dispatch<React.SetStateAction<boolean>>; // チェックボックス列の表示切り替え関数
	selectedCount: number; // 選択された行数
	setCommittedItems: React.Dispatch<React.SetStateAction<Item[]>>; // PIPに割り当てるアイテムの更新関数
	tableInstance: Table<Item> | null; // テーブルインスタンス（フィルタ操作に使用）
	showFilters: boolean; // フィルタ表示状態
	setShowFilters: React.Dispatch<React.SetStateAction<boolean>>; // フィルタ表示状態の更新関数
	pipNickName: string; // PIPニックネームの入力値
	setPipNickName: React.Dispatch<React.SetStateAction<string>>; // 入力されたPIPニックネームの更新関数
	selectedQtyMap: Record<string, string>; // PIPカードエリアでのセレクトボックス(数量)の入力状態
	setSelectedQtyMap: React.Dispatch<
		React.SetStateAction<Record<string, string>>
	>; // PIPカードエリアでのセレクトボックス(数量)の入力状態更新
}



/* ===== FILE: \ps-ps\src\features\item-management\constants\item-filter-placeholders.ts ===== */

// フィルタのプレースホルダー定義（列ごとに設定）
export const ITEM_FILTER_PLACEHOLDERS = {
	coreItemNo: 'filter Core Item No.',
	itemNo: 'filter Item No.',
	itemName: 'filter Item Name',
	ibsCode: 'filter IBS Code',
	qty: 'filter Qty',
	costElement: 'filter Cost Element',
	itemAssignmentStatus: 'filter Status',
};



/* ===== FILE: \ps-ps\src\features\item-management\hooks\useItemListDelete.ts ===== */

// 購入品はAWPから取得するため未使用

// import { useMutation } from '@tanstack/react-query';
// import type { Item } from '../../../types/common';

// type ItemTableDefinition = {
// 	ItemSurKey?: number | string;
// };

// // 抽出する
// function extractItems(
// 	deleteData: Record<string, Partial<Item>>,
// ): ItemTableDefinition[] {
// 	return Object.values(deleteData).map((item) => {
// 		return {
// 			ItemSurKey: item.itemSurKey ?? undefined,
// 		};
// 	});
// }

// export const useItemListDelete = () => {
// 	return useMutation({
// 		mutationFn: async ({
// 			userId,
// 			jobNo,
// 			fgCode,
// 			deleteData,
// 		}: {
// 			userId: string;
// 			jobNo: string;
// 			fgCode: string;
// 			deleteData: Record<string, Partial<Item>>;
// 		}) => {
// 			// 必要な要素のみを抽出する
// 			const item = extractItems(deleteData);

// 			try {
// 				const response = await fetch(
// 					'http://testservb.xx.co.jp/GX_PSYS_TEST2/transactions/DeleteItem',
// 					{
// 						method: 'POST',
// 						headers: {
// 							'Content-Type': 'application/json',
// 							'Cache-Control': 'no-cache',
// 						},
// 						cache: 'no-store',
// 						body: JSON.stringify({
// 							requestJSON: JSON.stringify({
// 								userId: userId,
// 								jobNo: jobNo,
// 								fgCode: fgCode.charAt(0),
// 								Item: item,
// 							}),
// 						}),
// 					},
// 				);

// 				// レスポンスの中身をチェックしてアラート表示
// 				const resultPreview = await response.json();
// 				if (
// 					resultPreview?.statusCode === '404' &&
// 					resultPreview?.statusMessage ===
// 						'PIPに割当済みの購入品は削除できません。'
// 				) {
// 					console.log('PIPに割当済みの購入品は削除できません。');
// 					throw new Error(resultPreview.statusMessage);
// 				}

// 				if (!response.ok) {
// 					console.log(response.status);
// 					throw new Error(`HTTP status: ${response.status}`);
// 				}
// 				return await response.json();
// 			} catch (error) {
// 				console.error('Fetch error:', error);
// 				throw error;
// 			}
// 		},
// 		staleTime: 5 * 60 * 1000,
// 		gcTime: 10 * 60 * 1000,
// 		refetchOnWindowFocus: false,
// 	});
// };



/* ===== FILE: \ps-ps\src\features\item-management\hooks\useItemListSave.ts ===== */

// 購入品はAWPから取得するため未使用

// import { useMutation } from '@tanstack/react-query';
// import type { Item } from '../../../types/common';

// type ItemTableDefinition = {
// 	ItemSurKey?: number | string;
// 	ItemNo?: string;
// 	ItemCoreItemNo?: string;
// 	ItemName?: string;
// 	ItemQty?: number | string;
// 	Element?: string;
// 	ItemIBSCode?: string;
// };

// // 抽出する
// function extractItems(
// 	updateData: Record<string, Partial<Item>>,
// ): ItemTableDefinition[] {
// 	return Object.values(updateData).map((item) => {
// 		return {
// 			ItemSurKey: item.itemSurKey ?? undefined,
// 			ItemNo: item.itemNo ?? '',
// 			CoreItemNo: item.coreItemNo ?? '',
// 			ItemName: item.itemName ?? '',
// 			ItemQty: item.qty ?? 0,
// 			Element: item.costElement ?? '',
// 			IBSCode: item.ibsCode ?? '',
// 		};
// 	});
// }

// export const useItemListSave = () => {
// 	return useMutation({
// 		mutationFn: async ({
// 			userId,
// 			jobNo,
// 			fgCode,
// 			updateData,
// 		}: {
// 			userId: string;
// 			jobNo: string;
// 			fgCode: string;
// 			updateData: Record<string, Partial<Item>>;
// 		}) => {
// 			// 必要な要素のみを抽出する
// 			const item = extractItems(updateData);

// 			try {
// 				const response = await fetch(
// 					'http://testservb.xx.co.jp/GX_PSYS_TEST2/transactions/SaveItem',
// 					{
// 						method: 'POST',
// 						headers: {
// 							'Content-Type': 'application/json',
// 							'Cache-Control': 'no-cache',
// 						},
// 						cache: 'no-store',
// 						body: JSON.stringify({
// 							requestJSON: JSON.stringify({
// 								userId: userId,
// 								jobNo: jobNo,
// 								fgCode: fgCode.charAt(0),
// 								Item: item,
// 							}),
// 						}),
// 					},
// 				);

// 				if (!response.ok) {
// 					console.log(response.status);
// 					throw new Error(`HTTP status: ${response.status}`);
// 				}
// 				return await response.json();
// 			} catch (error) {
// 				console.error('Fetch error:', error);
// 				throw error;
// 			}
// 		},
// 		staleTime: 5 * 60 * 1000,
// 		gcTime: 10 * 60 * 1000,
// 		refetchOnWindowFocus: false,
// 	});
// };



/* ===== FILE: \ps-ps\src\features\item-management\hooks\useItems.ts ===== */

import { useQuery } from '@tanstack/react-query';
import type { ItemResponse } from '../types/item-response';

/**
 * APIで購入品リストを取得
 */
export const useItems = (jobNo: string, fgCode: string | null) => {
	return useQuery<ItemResponse[]>({
		queryKey: ['items', jobNo, fgCode],
		queryFn: async (): Promise<ItemResponse[]> => {
			try {
				const response = await fetch(
					'http://testservb.xx.co.jp/GX_PSYS_TEST2/transactions/GetItemList',
					{
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							'Cache-Control': 'no-cache',
						},
						cache: 'no-store',
						body: JSON.stringify({
							requestJSON: JSON.stringify({
								jobNo: jobNo,
								fgCode: fgCode?.charAt(0),
							}),
						}),
					},
				);

				if (!response.ok) {
					throw new Error(`HTTP status: ${response.status}`);
					}

				const data = await response.json();

					if (!data?.responseJSON) {
					throw new Error('responseJSON is undefined');
					}

					const parsedResponse = JSON.parse(data.responseJSON);

					if (!parsedResponse?.item) {
					throw new Error('parsedResponse.item is undefined');
					}

					const itemList: ItemResponse[] = JSON.parse(parsedResponse.item);

					if (!Array.isArray(itemList)) {
					throw new Error('parsed itemList is not an array');
					}

					return itemList;

			} catch (error) {
				console.error('Fetch error:', error);
				throw error;
			}
		},
		enabled: jobNo !== '' && !!fgCode, // jobNoとfgCodeが両方あるときだけ実行
		staleTime: 5 * 60 * 1000,
		gcTime: 10 * 60 * 1000,
		refetchOnWindowFocus: false,
	});
};



/* ===== FILE: \ps-ps\src\features\item-management\types\item-response.ts ===== */

// APIから取得した購入品
export interface ItemResponse {
  jobNo: string;
  fgCode: string;
  itemSurKey: string;
  itemNo: string;
  itemCoreNo: string;
  itemName: string;
  itemQty: string;
  itemRestQty: string;
  ItemSortKey: string;
  itemCostElement: string;
  itemIBSCode: string;
  itemIsAssign: string;
};



/* ===== FILE: \ps-ps\src\features\item-management\utils\index.ts ===== */

export * from './getItemColumns'
export * from './styleItemCell'



/* ===== FILE: \ps-ps\src\features\item-management\utils\styleItemCell.ts ===== */

import type { Item } from '@/types';

/**
 * 購入品テーブルのセル単位で条件に応じたスタイルクラスを返す関数
 * columnId: 現在の列id
 * value: セルの表示値
 */
export const styleItemCell = ({
	columnId,
	value,
}: {
	row: Item;
	columnId: string;
	value: unknown;
}): string | undefined => {
	// 数量（Qty）は右寄せ
	return columnId === 'qty' && typeof value === 'number'
		? 'text-right'
		: undefined;
};



/* ===== FILE: \ps-ps\src\features\item-management\utils\transformItemResponseToItem.ts ===== */

import type { Item } from "@/types";
import type { ItemResponse } from "../types/item-response";

/**
 * APIから取得したItemResponseリストをItem型に整形
 * @param itemDataList : APIから取得したItemリスト
 * @returns Item型に整形したリスト
 */
export function transformItemResponseToItem(itemDataList: ItemResponse[]): Item[] {
  return itemDataList.map((item) => ({
    itemSurKey: Number(item.itemSurKey.trim()), // 数値変換
    jobNo: item.jobNo.trim(),
    fg: item.fgCode.trim(),
    itemNo: item.itemNo.trim(),
    coreItemNo: item.itemCoreNo.trim(),
    itemName: item.itemName.trim(),
    qty: Number(item.itemQty.trim()),
    itemRestQty: Number(item.itemRestQty.trim()),
    itemSortKey: Number(item.ItemSortKey.trim()),
    costElement: item.itemCostElement.trim(),
    ibsCode: item.itemIBSCode.trim(),
    pipCode: undefined,
    belongsToPip: undefined,
    pipItemIndex: undefined,
	itemAssignmentStatus: item.itemIsAssign.trim()
  }));
}


/* ===== FILE: \ps-ps\src\features\milestone\components\CloseRowGroups.tsx ===== */

// import React, { useRef } from "react";
// import * as wjcCore from "@mescius/wijmo";
// import * as wjGrid from "@mescius/wijmo.react.grid";

// const CloseRowGroups = () => {
//     const gridRef = useRef<wjGrid.FlexGrid | null>(null);

//     const handleCollapseGroups = () => {
//         const grid = gridRef.current;
//         if (grid?.collectionView?.canGroup) {
//             grid.collectionView.collapseGroups();
//         }
//     };

//     return (
//         <div>
//             <button onClick={handleCollapseGroups}>すべてのグループを閉じる</button>
//             <wjGrid.FlexGrid
//                 ref={gridRef}
//                 itemsSource={new wjcCore.CollectionView([
//                     { name: "A", group: "G1" },
//                     { name: "B", group: "G1" },
//                     { name: "C", group: "G2" },
//                 ], {
//                     groupDescriptions: [new wjcCore.PropertyGroupDescription("group")]
//                 })}
//             />
//         </div>
//     );
// };

// export default CloseRowGroups;



/* ===== FILE: \ps-ps\src\features\milestone\components\MilestoneGrid.tsx ===== */

import React, { useEffect, useRef, useState } from "react";
import "../styles/index.css";

import * as wjcCore from "@mescius/wijmo";
import "@mescius/wijmo.cultures/wijmo.culture.ja";
import { FlexGrid, GridPanel } from "@mescius/wijmo.grid";
import * as wjGrid from "@mescius/wijmo.react.grid";
import "@mescius/wijmo.styles/wijmo.css";
import useEvent from 'react-use-event-hook';

import { EmptyState } from "@/components/EmptyState";
import { useParams } from "@tanstack/react-router";
import { AlertCircle } from 'lucide-react';
import { useMSRData, useMSRHeader } from "../hooks";
import type { MSRAIPDataType, MSRHeaderType, PJStatusType } from "../types/milestone";
import { createCellTemplate } from "../utils/createCellTemplate";
import { createColumnGroups } from "../utils/createColumnGroups";
import { getStatus } from "../utils/getStatus";
import { transformToMilestoneData } from "../utils/transformToMilestoneData";

// Wijmoライセンスキーの設定
wjcCore.setLicenseKey("ここにライセンスキーの文字列を設定します");

const LOAD_MORE_THRESHOLD = 10; // スクロール時の追加データ読込閾値

// コンポーネントのProps定義
interface MilestoneGridProps {
  collectionView: wjcCore.CollectionView | null;
  setCollectionView: (cv: wjcCore.CollectionView | null) => void;
  setShowSave: React.Dispatch<React.SetStateAction<boolean>>;
}

// カラム定義の型
interface ColumnDefinition {
  header: string;
  binding?: string;
  width?: number;
  columns?: ColumnDefinition[];
  cellTemplate?: (
    panel: GridPanel,
    row: number,
    col: number,
    cell: HTMLElement
  ) => void;
}

export const MilestoneGrid: React.FC<MilestoneGridProps> = ({
  collectionView,
  setCollectionView,
  setShowSave
}) => {
  // ヘッダー情報の状態管理
  const [MSRHeader, setMSRHeader] = useState<MSRHeaderType[]>([]);
  // データ本体の状態管理
  const [MSRData, setMSRData] = useState<MSRAIPDataType[]>([]);
  // カラムグループの状態管理
  const [columnGroups, setColumnGroups] = useState<ColumnDefinition[]>([]);
  // データ取得の開始位置（ページング用）
  const [skipNum, setSkipNum] = useState(0);
  // データ追加中かどうかのフラグ
  const [isLoading, setIsLoading] = useState(false);
  // グリッドの行数・セル数の表示用
  const [_rowCount, setRowCount] = useState(0);
  const [_cellCount, setCellCount] = useState(0);
  const gridRef = useRef<FlexGrid | null>(null);

  // パスからMSR管理単位取得
  const { MSRMngCode } = useParams({ from: '/msr/milestone/$MSRMngCode' })

  // ヘッダー取得フック
  const { data: MSRHeaderData, isLoading: headerLoadig, error: headerError } = useMSRHeader({ MSRMngCode });

  // データ取得フック（ページング対応）
  const { data: AIPData, isLoading: dataLoading, error: dataError } = useMSRData({ MSRMngCode, skipNum });
  console.log(`AIPData:${JSON.stringify(AIPData)}`);

  // ヘッダー取得後に状態更新
  useEffect(() => {
    if (MSRHeaderData) {
      setMSRHeader(MSRHeaderData);
    }
  }, [MSRHeaderData]);

  // ヘッダーからカラムグループを生成
  useEffect(() => {
    if (MSRHeader.length > 0) {
      setColumnGroups(createColumnGroups(MSRHeader));
    }
  }, [MSRHeader]);

  // 新しいデータが取得されたら蓄積
  useEffect(() => {
    if (AIPData && AIPData.length > 0) {
      setMSRData(prev => [...prev, ...AIPData]);
    }
  }, [AIPData]);

  // MSRDataが更新されたらCollectionViewを再構築
  useEffect(() => {
    if (MSRData.length > 0) {
      const milestoneData = transformToMilestoneData(MSRData);
      const currentPosition = collectionView?.currentPosition || 0;

      const cv = new wjcCore.CollectionView(milestoneData, { trackChanges: true });
      cv.groupDescriptions.push(new wjcCore.PropertyGroupDescription("PIPNo", (item) => {
        if(item.PIPName){
          return `${item.PIPNo}　PIPName: ${item.PIPName}`
        }
        return item.PIPNo
      }));
      cv.currentPosition = currentPosition;

      setCollectionView(cv);
      setIsLoading(false);
    }
  }, [MSRData]);

  // ステータス情報の参照
  const statusOptionsRef = useRef<PJStatusType[]>([]);
  const statusLoadedRef = useRef(false);

  // グリッド初期化時の処理
  const initializeGrid = useEvent((flex: FlexGrid) => {
    gridRef.current = flex;

    // ステータス取得処理（非同期）
    const fetchStatus = async () => {
      if (!statusLoadedRef.current) {
        try {
          const { returnStatus, error } = await getStatus(MSRMngCode);
          if (returnStatus) {
            statusOptionsRef.current = returnStatus;
            statusLoadedRef.current = true;
          } else {
            console.error("ステータス取得エラー:", error);
          }
        } catch (err) {
          console.error("ステータス取得中に例外:", err);
        }
      }
    };

    fetchStatus(); // 非同期処理を呼び出す
    
    // 初期の行数・セル数を取得
    updateGridMetrics(flex);

    // グリッド更新時に行数・セル数を再取得
    flex.updatedView.addHandler(() => updateGridMetrics(flex));

    // スクロール末尾に近づいたらデータ追加をトリガー
    flex.scrollPositionChanged.addHandler(() => {
      if (
        flex.viewRange.bottomRow >= flex.rows.length - LOAD_MORE_THRESHOLD &&
        !isLoading &&
        !dataLoading
      ) {
        setIsLoading(true);
        setSkipNum(prev => prev + 50);
      }
    });

    // 列固定
		flex.frozenColumns = 9;

    // セルのスタイル設定

    collectionView && createCellTemplate(flex, collectionView);
    
    // グリッドが表示されたら保存ボタンを表示
    setShowSave(true);
  });

  // グリッドの行数・セル数を更新
  const updateGridMetrics = (grid: FlexGrid) => {
    setRowCount(grid.rows.length);
    setCellCount(grid.hostElement.querySelectorAll('.wj-cell').length);
  };

  if(headerLoadig || (dataLoading && skipNum === 0)){
    return (
			<div className="flex justify-center mt-30" aria-label="読み込み中">
        <div className="animate-spin h-10 w-10 border-4 border-blue-500 rounded-full border-t-transparent" />
      </div>
		);
  }

  if (MSRMngCode === null || !MSRMngCode) {
    // saveボタン非表示
    setShowSave(false);
		return (
      <div className="mt-30">
        <EmptyState
          icon={AlertCircle}
          label='MSRを表示できません'
        />
      </div>
		);
	}

  if (!collectionView || !columnGroups.length) {
    // saveボタン非表示
    setShowSave(false);
		return (
      <div className="mt-30">
        <EmptyState
          icon={AlertCircle}
          label='表示するデータがありません'
        />
      </div>
		);
	}

  if (headerError || dataError) {
    // saveボタン非表示
    setShowSave(false);
		return (
      <div className="mt-30">
        <EmptyState
          icon={AlertCircle}
          label='エラーが発生しました'
        />
      </div>
		);
	}

  return (
      collectionView && (
        // データがある場合のみグリッドを表示
        <wjGrid.FlexGrid
          ref={gridRef}
          initialized={initializeGrid}
          itemsSource={collectionView}
          // itemFormatter={collectionView ? createCellTemplate(collectionView) : undefined}
          columnGroups={columnGroups}
          isReadOnly={false}
          allowDragging={false}
          allowSorting={false}
        />
      )
  );
};


/* ===== FILE: \ps-ps\src\features\milestone\components\SaveButton.tsx ===== */

import React, { useState, useEffect } from "react";
import * as wjcCore from "@mescius/wijmo";
import { saveMilestoneRow } from "../utils/saveMilestoneRow";

const BUTTON_CLASS =
	"bg-blue-500 text-white font-bold w-28 h-28 rounded-full text-3xl shadow-2xl cursor-pointer hover:bg-blue-400";

interface SaveButtonProps {
	collectionView: wjcCore.CollectionView | null;
	requiredFields?: string[];
}

export const SaveButton: React.FC<SaveButtonProps> = ({
	collectionView,requiredFields
}: SaveButtonProps) => {
	const [isSaved, setIsSaved] = useState(false);

	// 保存前に画面遷移しようとしたときの警告
	useEffect(() => {
		const handleBeforeUnload = (e: BeforeUnloadEvent) => {
			if (!isSaved) {
				e.preventDefault();
				e.returnValue = '';
			}
		};
		window.addEventListener('beforeunload', handleBeforeUnload);
		return () => {
			window.removeEventListener('beforeunload', handleBeforeUnload);
		};
	}, [isSaved]);

	const saveRow = async () => {
		if (collectionView) {
			const tableData = collectionView.itemsEdited;
			console.log("保存編集行:" + JSON.stringify(tableData));

			// 必須チェック（空欄があるか確認）
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const invalidRows = tableData.filter((row: any) => requiredFields?.some((field) => !row[field] || row[field].trim?.() === "")
			);

			if (invalidRows.length > 0) {
				alert("必須項目が未入力の行があります。保存できません。");
				console.warn("バリデーションエラー:", invalidRows);
				return;
			}

			try {
				const response = await saveMilestoneRow(JSON.stringify(tableData));
				const saveMessage = response.returnMessage;
				console.log("保存成功メッセージ:" + saveMessage);
				setIsSaved(true);
			} catch (error) {
				console.error("保存中にエラーが発生しました:", error);
			}
		} else {
			console.log("データがありません");
		}
	};

	return (
		<button type="submit" onClick={saveRow} className={BUTTON_CLASS}>
			save
		</button>
	);
};



/* ===== FILE: \ps-ps\src\features\milestone\hooks\index.ts ===== */

export { useMSRData } from './useMSRData';
export { useMSRHeader } from './useMSRHeader';




/* ===== FILE: \ps-ps\src\features\milestone\hooks\useMSRData.ts ===== */

import { useQuery } from "@tanstack/react-query";
import { API_URL } from "../../../config/apiConfig";
import type { MSRAIPDataType } from "../types/milestone";

interface Argument {
  MSRMngCode: string;
  skipNum: number;
}

export const useMSRData = ({MSRMngCode, skipNum}: Argument) => {
  return useQuery<MSRAIPDataType[]>({
    queryKey: ["MSRData", MSRMngCode, skipNum],
    queryFn: async (): Promise<MSRAIPDataType[]> => {
      try {
        const APIUrl = API_URL.MSRGetAIPData
          .replace("%1", MSRMngCode)
          .replace("%2", skipNum.toString());
        const response = await fetch(APIUrl);
        if (!response.ok) {
          throw new Error(`HTTP status: ${response.status}`);
        }
        const data = await response.json();
        return data.AIPData ?? [];
      } catch (error) {
        console.error("Fetch error:", error);
        throw error;
      }
    },
    enabled: Boolean(MSRMngCode),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}


/* ===== FILE: \ps-ps\src\features\milestone\hooks\useMSRHeader.ts ===== */

import { useQuery } from "@tanstack/react-query";
import { API_URL } from "../../../config/apiConfig";
import { MSRHeaderType } from "../types/milestone";

interface Argument {
  MSRMngCode: string;
}

export function useMSRHeader({ MSRMngCode }: Argument) {
  return useQuery<MSRHeaderType[]>({
      queryKey: ["MSRHeader", MSRMngCode],
      queryFn: async (): Promise<MSRHeaderType[]> => {
        try {
          const APIUrl = API_URL.MSRGetHeader.replace("%1", MSRMngCode);
          const response = await fetch(APIUrl);
          if (!response.ok) {
            throw new Error(`HTTP status: ${response.status}`);
          }
          const data = await response.json();
          return data.outJson ?? [];
        } catch (error) {
          console.error("Fetch error:", error);
          throw error;
        }
      },
      enabled: Boolean(MSRMngCode),
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
      refetchOnWindowFocus: false,
    });
}



/* ===== FILE: \ps-ps\src\features\milestone\styles\index.css ===== */

@import "tailwindcss";
@import "tw-animate-css";

/* wijmo Grid設定 */
/* gridの表示サイズ、スクロールの設定 */
.wj-flexgrid {
	height: 89.5vh;
	width: 100vw;
	overflow: auto;
}

/* gridの線非表示 */
.wj-cell {
	border: none !important;
	color: #333333;
}

.wj-colgroup {
	border: thin solid #dadada !important;
}

.wj-align-center {
	border: none !important;
}

.wj-cell>select>option {
	color: #333333;
}

.flex-grow {
	width: 96vw;
}

.wj-header {
	justify-content: center !important;
}

.DateInputBox {
	width: 140px;
	padding-left: 6px;
	opacity: 1 !important;
}
.wj-cell:has(.DateInputBox){
	text-align: center !important;
}

.wj-cells .wj-cell.wj-state-multi-selected {
	color: #333 !important;
	background: #e4f5fc !important;
}

.wj-cells .wj-cell.wj-state-selected {
	color: #333 !important;
	background: #e4f5fc !important;
}

.wj-cells .wj-group.wj-state-multi-selected {
	background: #e1e1e1 !important;
	color: #444444 !important;
}

.wj-cell.wj-group {
	background: #e1e1e1 !important;
	color: #444444 !important;
}

.wj-cell>select {
	width: 122px;
}

.ComboBox {
	position: relative;
	display: flex;
	align-items: center;
	margin: -3.5px;
	padding-left: 5px;
	border: 2px solid #e1e1e1;
	border-radius: 50px;
}

/*プルダウンの三角を設定*/
.ComboBox::before {
	position: absolute;
	right: 15px;
	content: '';
	width: 16px;
	height: 8px;
	background: #e1e1e1;
	clip-path: polygon(0 0, 100% 0, 50% 100%);
}

.ComboBox select {
	width: 100%;
	padding: 10px 45px 10px 10px;
	color: #e1e1e1;
	cursor: pointer;
	text-overflow: ellipsis;
	/*テキストがオーバーしたら'...'で省略*/
	z-index: 1;
	/* 標準のスタイルを無効にする */
	border: none;
	appearance: none;
	outline: none;
	background: transparent;
}

.ComboBox:focus{
	border-color: #82f169;
}

.wj-cell:has(.ComboBox:focus){
	background-color: #FFF;
}



/* ===== FILE: \ps-ps\src\features\milestone\types\milestone.ts ===== */

/**
 * マイルストーンのヘッダー情報を表す型
 */
export interface MSRHeaderType {
	MilestoneName: string;
	Task: Array<MSRTaskType>;
}

/**
 * マイルストーンのタスク情報を表す型
 */
export interface MSRTaskType {
	TaskID: string;
	TaskName: string;
	TaskDateCategory?: Array<TaskDateCategoryType>;
	Deliverable?: Array<DeliverableType>;
}

/**
 * タスクの日程カテゴリ情報を表す型
 */
export interface TaskDateCategoryType {
	DateTypeCategory: string;
	DateType: string;
}

/**
 * 成果物情報を表す型
 */
export interface DeliverableType {
	DeliverableName: string;
	DeliverableId: string;
	DeliverablePJTaskId: string;
	DeliverableProperty?: Array<DeliverablePropertyType>;
}

/**
 * 成果物の属性情報を表す型
 */
export interface DeliverablePropertyType {
	DeliverablePropertyName: string;
	DeliverablePropertyId: string;
	DeliverablePropertyType: string;
	DeliverableChild?: Array<DeliverableChildType>;
}

/**
 * 成果物の子属性情報を表す型
 */
export interface DeliverableChildType {
	ChildDeliverablePropertyName: string;
	ChildDeliverablePropertyType: string;
	ChildDeliverablePropertyId: string;
}

/**
 * 成果物属性の入力タイプを定義する列挙型
 */
export enum DeliverablePropertyInputType {
	DATE = "DATE",
	DATETIME = "DATETIME",
	FLOAT = "FLOAT",
	INT = "INT",
	TEXT = "TEXT",
}

/**
 * AIPのデータを表す型
 */
export interface MSRAIPDataType {
	PIPNo: string;
	PIPName: string;
	JobNo: string;
	FG: string;
	AIP: Array<MSRAIPType>;
}

/**
 * AIP情報を表す型
 */
export interface MSRAIPType {
	AIPNo: string;
	VendorName: string;
	CountryName: string;
	CountryCode: string;
	BuyerName: string;
	Status: string;
	FGName: string;
	KPinFG: string;
	Shore: string;
	ReqNo: string;
	Deliverable: Array<MSRAIPDeliverableType>;
	TaskTracking: Array<MSRTaskTrackingType>;
}

/**
 * AIP成果物情報を表す型 (PMSRT005)
 */
export interface MSRAIPDeliverableType {
	ID: string;
	Rev: string;
	TaskID: string;
	Property: Array<AIPDeliverablePropertyType>;
}

/**
 * AIP成果物属性情報を表す型
 */
export interface AIPDeliverablePropertyType {
	ID: string;
	Type: string;
	Value: string;
}

/**
 * タスク追跡情報を表す型 (PMSRT006)
 */
export interface MSRTaskTrackingType {
	ID: string;
	DateType: string;
	Date: Date;
}

/**
 * プロジェクトステータス取得用
 */
export interface PJStatusType {
	PJStatusID:string;
	PJStatusCustomName:string;
}





/* ===== FILE: \ps-ps\src\features\milestone\utils\createCellTemplate.ts ===== */

import * as wjcCore from "@mescius/wijmo";
import "@mescius/wijmo.cultures/wijmo.culture.ja";
import { FlexGrid, GridPanel } from "@mescius/wijmo.grid";
import * as wjcInput from "@mescius/wijmo.input";
import "@mescius/wijmo.styles/wijmo.css";

// ステータス選択肢の定数（API取得で置き換え可能）
const STATUS_OPTIONS = [
  { code: 'PJS-00000001', name: '引合準備中' },
  { code: 'PJS-00000002', name: '引合完了' },
  { code: 'PJS-00000003', name: '見積待' },
  { code: 'PJS-00000004', name: '見積入手済' },
  { code: 'PJS-00000005', name: 'PO待' },
  { code: 'PJS-00000006', name: 'PO済' },
  { code: 'PJS-00000007', name: '発注なし' },
  { code: 'PJS-00000008', name: '輸送待' },
  { code: 'PJS-00000009', name: '輸送完了' }
];

// 国旗表示用の関数
function renderFlag(cell: HTMLElement, country: string) {
  const countryCode = country.substring(0, 2).toLowerCase(); // ISOコード（例: JP）
  const countryName = country.substring(2); // 国名（例: Japan）

  const img = document.createElement('img');
  img.src = `https://flagcdn.com/${countryCode}.svg`;
  img.alt = countryName;
  img.title = countryName; // ホバー時に表示されるツールチップ
  img.style.width = '25px';
  img.style.height = 'auto';
  img.style.display = 'inline-block';
  img.style.verticalAlign = 'middle';

  cell.innerHTML = '';
  cell.appendChild(img);
}

// 日付入力用のカレンダーを表示する関数
function renderCalendarOnClickExpanded(
  cell: HTMLElement,
  item: any,
  binding: string,
  collectionView: wjcCore.CollectionView
) {
  cell.innerHTML = '';

  const label = document.createElement('span');
  
  const date = item[binding] instanceof Date
    ? item[binding]
    : (item[binding] ? new Date(item[binding]) : null);

  label.textContent = date && !isNaN(date.getTime())
    ? wjcCore.Globalize.format(date, 'yyyy/MM/dd')
    : '';

  label.style.display = 'flex';
  label.style.alignItems = 'center';
  label.style.justifyContent = 'center';
  label.style.width = '100%';
  label.style.height = '100%';
  label.style.padding = '4px';
  label.style.cursor = 'pointer';
  label.style.textAlign = 'center';

  cell.appendChild(label);

  label.onclick = (e) => {
    // 既存のカレンダーを削除（複数表示防止）
    const existingCalendar = document.getElementById('floating-calendar');
    if (existingCalendar) {
      document.body.removeChild(existingCalendar);
    }

    const rect = cell.getBoundingClientRect();

    const calendarDiv = document.createElement('div');
    calendarDiv.id = 'floating-calendar';
    calendarDiv.style.position = 'absolute';
    calendarDiv.style.zIndex = '10000';
    calendarDiv.style.background = '#fff';
    calendarDiv.style.border = '1px solid #ccc';
    calendarDiv.style.padding = '4px';
    calendarDiv.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
    calendarDiv.style.top = `${rect.bottom + window.scrollY}px`;
    calendarDiv.style.left = `${rect.left + window.scrollX}px`;

    const calendar = new wjcInput.Calendar(calendarDiv, {
      value: item[binding],
      selectionMode: 'Day'
    });

    // 日付選択時のイベント
    calendar.valueChanged.addHandler(() => {
      collectionView.editItem(item);
      item[binding] = calendar.value;
      collectionView.commitEdit();
      collectionView.refresh();
      label.textContent = wjcCore.Globalize.format(calendar.value, 'yyyy/MM/dd');

      // カレンダーを閉じる
      if (calendarDiv.parentElement) {
        calendarDiv.parentElement.removeChild(calendarDiv);
      }
    });

    // カレンダー以外をクリックしたら閉じる
    const closeOnOutsideClick = (event: MouseEvent) => {
      if (!calendarDiv.contains(event.target as Node)) {
        if (calendarDiv.parentElement) {
          calendarDiv.parentElement.removeChild(calendarDiv);
        }
        document.removeEventListener('click', closeOnOutsideClick);
      }
    };
    setTimeout(() => {
      document.addEventListener('click', closeOnOutsideClick);
    }, 0);

    document.body.appendChild(calendarDiv);
    calendar.focus();
  };
}

const STATUS_COLORS = [
  { backgroundColor: '#fff3cd', color: '#856404', borderColor: '#ffeeba' },
  { backgroundColor: '#d1ecf1', color: '#0c5460', borderColor: '#bee5eb' },
  { backgroundColor: '#d4edda', color: '#155724', borderColor: '#c3e6cb' },
  { backgroundColor: '#cce5ff', color: '#004085', borderColor: '#b8daff' },
  { backgroundColor: '#e2e3e5', color: '#383d41', borderColor: '#d6d8db' },
  { backgroundColor: '#f8f9fa', color: '#6c757d', borderColor: '#dee2e6' },
  { backgroundColor: '#f5c6cb', color: '#721c24', borderColor: '#f1b0b7' },
  { backgroundColor: '#c3e6cb', color: '#155724', borderColor: '#d4edda' },
  { backgroundColor: '#bee5eb', color: '#0c5460', borderColor: '#d1ecf1' }
];

// ステータス選択用のセレクトボックスを表示する関数
function renderStatusSelectBox(
  cell: HTMLElement,
  item: any,
  collectionView: wjcCore.CollectionView
) {
  cell.innerHTML = '';

  const selectedIndex = STATUS_OPTIONS.findIndex(opt => opt.code === item.Status);
  const selectedOption = STATUS_OPTIONS[selectedIndex];
  const labelText = selectedOption ? selectedOption.name : '';

  const container = document.createElement('div');
  container.style.position = 'relative';
  container.style.width = '100%';
  container.style.height = '100%';

  const label = document.createElement('span');
  label.textContent = labelText;

  label.style.display = 'flex';
  label.style.alignItems = 'center';
  label.style.justifyContent = 'center';
  label.style.width = '100%';
  label.style.height = '100%';
  label.style.padding = '4px 8px';
  label.style.cursor = 'pointer';
  label.style.textAlign = 'center';
  label.style.fontSize = '14px';
  label.style.fontWeight = 'bold';

  if (item.Status) {
    label.style.borderRadius = '12px';
    label.style.border = '1px solid transparent';

    const colorSet = STATUS_COLORS[selectedIndex % STATUS_COLORS.length];
    label.style.backgroundColor = colorSet.backgroundColor;
    label.style.color = colorSet.color;
    label.style.borderColor = colorSet.borderColor;
  } else {
    label.style.color = '#999';
    label.style.backgroundColor = '';
    label.style.border = '';
  }

  const select = document.createElement('select');
  select.style.position = 'absolute';
  select.style.top = '0';
  select.style.left = '0';
  select.style.width = '100%';
  select.style.height = '100%';
  select.style.opacity = '0';
  select.style.cursor = 'pointer';

  STATUS_OPTIONS.forEach(option => {
    const opt = document.createElement('option');
    opt.value = option.code;
    opt.text = option.name;
    select.appendChild(opt);
  });

  select.value = item.Status || '';

  select.addEventListener('change', (e) => {
    const newValue = (e.target as HTMLSelectElement).value;
    const newIndex = STATUS_OPTIONS.findIndex(opt => opt.code === newValue);
    const newLabel = STATUS_OPTIONS[newIndex]?.name || '';
    const newColorSet = STATUS_COLORS[newIndex % STATUS_COLORS.length];

    collectionView.editItem(item);
    item.Status = newValue;
    collectionView.commitEdit();
    collectionView.refresh();

    label.textContent = newLabel;

    if (newValue) {
      label.style.borderRadius = '12px';
      label.style.border = '1px solid transparent';
      label.style.backgroundColor = newColorSet.backgroundColor;
      label.style.color = newColorSet.color;
      label.style.borderColor = newColorSet.borderColor;
    } else {
      label.style.backgroundColor = '';
      label.style.color = '#999';
      label.style.border = '';
    }
  });

  container.appendChild(label);
  container.appendChild(select);
  cell.appendChild(container);
}

// セルテンプレート生成関数
export function createCellTemplate(flex: FlexGrid, collectionView: wjcCore.CollectionView) {
  console.log("createCellTemplate");
  return flex.itemFormatter = (panel: GridPanel, r: number, c: number, cell: HTMLElement) => {
    const item = panel.rows[r].dataItem;
    let binding = panel.columns[c].binding || "empty"; // bindingがnullの場合は仮の値を設定

    // ヘッダーセルは中央揃え
    if (cell.getAttribute('role') === 'columnheader') {
      cell.style.textAlign = 'center';
      return;
    }

    // データ行のみ処理
    if (r > 0) {
      // 国コードがある場合は国旗を表示
      if (binding === 'Country' && item.Country && cell.innerText) {
        renderFlag(cell, item.Country);
        cell.style.textAlign = 'center';
        return;
      }

      // PJT- や DATE を含むカラムはカレンダー入力にする
      if ((binding.startsWith('PJT-') || binding.includes('DATE')) &&
          cell.getAttribute('aria-readonly') !== 'true' &&
          !cell.classList.contains('wj-group')) {
        renderCalendarOnClickExpanded(cell, item, binding, collectionView);
        return;
      }

      // ステータスカラムはセレクトボックスを表示
      if (binding === 'Status') {
        renderStatusSelectBox(cell, item, collectionView);
        cell.style.textAlign = 'center';
        return;
      }
    }

    // 編集不可のカラム設定
    const readOnlyBindings = ['AIPNo', 'VendorName', 'Country', 'FGName', 'KPinFG'];
    if (readOnlyBindings.includes(binding)) {
      panel.columns[c].isReadOnly = true;
    }

    // 非表示にするカラム
    if (binding === 'JobNo') {
      panel.columns[c].visible = false;
    }

    // 表示を強制するカラム
    if (binding === 'FG') {
      panel.columns[c].visible = true;
    }
  };
}


/* ===== FILE: \ps-ps\src\features\milestone\utils\createColumnGroups.ts ===== */

import { MSRHeaderType } from '../types/milestone';

interface ColumnDefinition {
  header: string;
  binding?: string;
  width?: number;
  columns?: ColumnDefinition[];
}

export function createColumnGroups(header: MSRHeaderType[]): ColumnDefinition[] {
  const columnGroups: ColumnDefinition[] = [
    { header: 'AIP', binding: 'AIPNo', width: 160 },
    { header: 'F/G', binding: 'FGName', width: 100 },
    { header: 'KP in F/G', binding: 'KPinFG', width: 170 },
    { header: 'Buyer', binding: 'BuyerName', width: 170 },
    { header: 'Off/On', binding: 'Shore', width: 75 },
    { header: 'Req.No.', binding: 'ReqNo', width: 200 },
    { header: 'Supplier/Contractor', binding: 'VendorName', width: 200 },
    { header: 'Country', binding: 'Country', width: 75 },
    { header: 'Status', binding: 'Status', width: 125 },
  ];

  for (const milestone of header) {
    const milestoneGroup: ColumnDefinition = {
      header: milestone.MilestoneName,
      columns: [],
    };

    for (const task of milestone.Task) {
      const taskGroup: ColumnDefinition = {
        header: task.TaskName,
        columns: [],
      };

      // 日付カテゴリ
      for (const dateCategory of task.TaskDateCategory ?? []) {
        taskGroup.columns!.push({
          header: dateCategory.DateTypeCategory,
          binding: `${task.TaskID}_${dateCategory.DateType}`,
          width: 200,
        });
      }

      // 成果物
      for (const deliverable of task.Deliverable ?? []) {
        const deliverableGroup: ColumnDefinition = {
          header: deliverable.DeliverableName,
          columns: [],
        };

        for (const property of deliverable.DeliverableProperty ?? []) {
          const childProps = property.DeliverableChild?.map(child => ({
            header: child.ChildDeliverablePropertyName,
            binding: `${deliverable.DeliverableId}_${deliverable.DeliverablePJTaskId}_${child.ChildDeliverablePropertyType}_${child.ChildDeliverablePropertyId}`,
            width: 200,
          })) ?? [];

          if (childProps.length > 0) {
            deliverableGroup.columns!.push({
              header: property.DeliverablePropertyName,
              columns: childProps,
            });
          } else {
            deliverableGroup.columns!.push({
              header: property.DeliverablePropertyName,
              binding: `${deliverable.DeliverableId}_${deliverable.DeliverablePJTaskId}_${property.DeliverablePropertyType}_${property.DeliverablePropertyId}`,
              width: 200,
            });
          }
        }

        taskGroup.columns!.push(deliverableGroup);
      }

      milestoneGroup.columns!.push(taskGroup);
    }

    columnGroups.push(milestoneGroup);
  }

  return columnGroups;
}



/* ===== FILE: \ps-ps\src\features\milestone\utils\getStatus.ts ===== */

import { API_URL } from "../../../config/apiConfig";
import { PJStatusType } from "../types/milestone";

// 戻り値の型
interface getStatusResult {
    returnStatus: PJStatusType[] | null;
    loading: boolean;
    error: Error | null;
}

export async function getStatus(MSRMngCode: string): Promise<getStatusResult> {
    let returnStatus = null;
    let loading = true;
    let error = null;

    try {
        const APIUrl = API_URL.GetPJStatusData.replace("%1", MSRMngCode);
        // リクエスト実行
        const response = await fetch(APIUrl, {
            method: 'GET',
            headers: {
                'Cache-Control': 'no-cache'
            }
        });
        // レスポンス処理
        // まずはレスポンスが正常かチェック、異常時はエラースロー
        if (!response.ok) {
            throw new Error(`リクエストエラー: ${response.status}`);
        }
        const data = await response.json();
        returnStatus = data.PJStatusData
        // }
    } catch (err) {
        error = err instanceof Error ? err : new Error('不明なエラーが発生しました');
    } finally {
        loading = false;
    }
    return { returnStatus, loading, error };
}



/* ===== FILE: \ps-ps\src\features\milestone\utils\saveMilestoneRow.ts ===== */

import { API_URL } from '../../../config/apiConfig';
import { MSRAIPDataType } from '../types/milestone';

interface saveMilestoneResult {
    returnMessage: string | null;
    loading: boolean;
    error: Error | null;
}

function FormatJSON(data: string): string {
    // let formatError:string;

    // if (!data) {
    //     // formatError = "入力値が不正です。aaa"
    //     throw new Error('入力値が不正ですaaa。');
    // }

    let parsedData;
    // try {
    //     parsedData = JSON.parse(data);
    // } catch (err) {
    //     error = err instanceof Error ? err : new Error('不正なJSON形式です。');
    //     // throw new Error('不正なJSON形式です。');
    // }
    // ↓はエラーを通すためにいったん書き換えた ↑に戻したい
    try {
        parsedData = JSON.parse(data);
    } catch {
        throw new Error('不正なJSON形式です。');
    }

    // 整形後のデータを格納する配列
    const formattedData: MSRAIPDataType[] = [];

    // 各キーのデータを整形して配列に追加
    for (const key in parsedData) {
        if (key !== 'length' && key !== '_updating' && key !== 'collectionChanged') {
            const item = parsedData[key];
            const formattedItem: MSRAIPDataType = {
                PIPNo: item.PIPNo,
                PIPName: item.PIPName,
                JobNo: item.JobNo,
                FG: item.FG,
                AIP: [
                    {
                        AIPNo: item.AIPNo,
                        VendorName: item.VendorName,
                        CountryName: item.Country ? item.Country.substring(2, 10) : '',
                        CountryCode: item.Country ? item.Country.substring(0, 2) : '',
                        BuyerName: item.BuyerName,
                        Status: item.Status,
                        FGName: "",
                        KPinFG:"",
                        Shore:"",
                        ReqNo:"",
                        Deliverable: [],
                        TaskTracking: []
                    }
                ]
            };

            // DeliverableとTaskTrackingの処理
            for (const subKey in item) {
                if (subKey.startsWith('PJD-')) {
                    const deliverableID = subKey.split('_')[0];
                    const taskID = subKey.split('_')[1];
                    const propertyType = subKey.split('_')[2];
                    const propertyID = subKey.split('_')[3];

                    let deliverable = formattedItem.AIP[0].Deliverable.find(d => d.ID === deliverableID);
                    if (!deliverable) {
                        deliverable = { ID: deliverableID, Rev: '0', TaskID: taskID, Property: [] };
                        formattedItem.AIP[0].Deliverable.push(deliverable);
                    }

                    deliverable.Property.push({
                        ID: propertyID,
                        // Type: typeof item[subKey] === 'number' ? 'FLOAT' : 'TEXT',
                        Type: propertyType,
                        Value: item[subKey].toString()
                    });
                } else if (subKey.startsWith('PJT-')) {
                    const taskID = subKey.split('_')[0];
                    const dateType = subKey.split('_')[1];

                    formattedItem.AIP[0].TaskTracking.push({
                        ID: taskID,
                        DateType: dateType,
                        Date: item[subKey]
                    });
                }
            }
            formattedData.push(formattedItem);
        }
    }
    // 整形後のJSONを返す
    console.log("hozon"+JSON.stringify(formattedData));
    return JSON.stringify(formattedData, null);
}

export async function saveMilestoneRow(tableData: string): Promise<saveMilestoneResult> {
    let returnMessage = null;
    let loading = true; // データ取得中かどうかを示すBoolean
    let error = null; // エラー情報を持つ

    if (!tableData) {
        returnMessage = "入力値が空です。";
        error = new Error("入力値が空です。")
        loading = false;
    } else {

        try {
            // if (!tableData) {
            //     error = new Error('入力値が空です。')
            // } else {
            const formattedData = FormatJSON(tableData);

            const APIUrl = API_URL.SaveDataAll;
            const response = await fetch(APIUrl, {
                method: 'POST',
                body: JSON.stringify({ MilestoneDataJSON: formattedData }),
            });
            // レスポンス処理
            // まずはレスポンスが正常かチェック、異常時はエラースロー
            if (!response.ok) {
                throw new Error(`リクエストエラー: ${response.status}`);
            }
            const data = await response.json();
            returnMessage = data.ReturnMessage;
            // }
        } catch (err) {
            error = err instanceof Error ? err : new Error('不明なエラーが発生しました');
            // return {returnMessage, loading, Promise.reject(error)};
        } finally {
            loading = false;
        }
    }
    return { returnMessage, loading, error };
}



/* ===== FILE: \ps-ps\src\features\milestone\utils\transformToMilestoneData.ts ===== */

import { MSRAIPDataType } from '../types/milestone';

// MilestoneItem型の定義（現在のanyを改善）
export interface MilestoneItem {
  PIPNo: string;
  PIPName: string;
  JobNo: string;
  FG: string;
  AIPNo: string;
  VendorName: string;
  Country: string;
  BuyerName: string;
  Status: string;
  FGName: string;
  KPinFG: string;
  Shore: string;
  ReqNo: string;
  [key: string]: string | number | Date | undefined; // 動的に追加されるプロパティ用
}

/**
 * MSRAIPListをMilestoneDataに変換する関数
 */
export function transformToMilestoneData(aipData: MSRAIPDataType[]): MilestoneItem[] {
  // データ変換処理
  return aipData.map((aipItem) => {
    return (aipItem.AIP || []).map((aipListItem) => {
      const milestoneItem: MilestoneItem = {
        PIPNo: aipItem.PIPNo,
        PIPName: aipItem.PIPName,
        JobNo: aipItem.JobNo,
        FG: aipItem.FG,
        AIPNo: aipListItem.AIPNo,
        VendorName: aipListItem.VendorName,
        Country: aipListItem.CountryCode.toLowerCase() + aipListItem.CountryName,
        BuyerName: aipListItem.BuyerName,
        Status: aipListItem.Status,
        FGName: aipListItem.FGName,
        KPinFG: aipListItem.KPinFG,
        Shore: aipListItem.Shore,
        ReqNo: aipListItem.ReqNo
      };

      // 成果物設定
      (aipListItem.Deliverable || []).forEach((deliverableItem) => {
        (deliverableItem.Property || []).forEach((propertyItem) => {
          // キー生成
          const deliverableKey = `${deliverableItem.ID}_${deliverableItem.TaskID}_${propertyItem.Type}_${propertyItem.ID}`;
          // タイプに応じた値の設定
          switch (propertyItem.Type) {
            case 'INT':
              milestoneItem[deliverableKey] = Number(propertyItem.Value);
              break;
            case 'FLOAT':
              milestoneItem[deliverableKey] = Number(propertyItem.Value);
              break;
            case 'TEXT':
            case 'UNIT':
            case 'DATE':
              // milestoneItem[deliverableKey] = propertyItem.Value.replace(/\//g, "-");
              break;
            case 'DATETIME':
              milestoneItem[deliverableKey] = propertyItem.Value;
              break;
          }
        });
      });

      // タスク追跡設定
      (aipListItem.TaskTracking || []).forEach((taskTrackingItem) => {
        const taskDateKey = `${taskTrackingItem.ID}_${taskTrackingItem.DateType}`;
        // milestoneItem[taskDateKey] = new Date(taskTrackingItem.Date);
        milestoneItem[taskDateKey] = taskTrackingItem.Date;
      });
      return milestoneItem;
    });
  }).flat(); // 2次元配列を1次元配列に変換
}


/* ===== FILE: \ps-ps\src\features\msr-unit-selector\components\Filter.tsx ===== */

"use client";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

interface FilterProps {
	items: string[];
	selectedItem: string | null;
	onItemChange: (item: string | null) => void;
	category: "Order" | "Function";
}

export const Filter = ({
	items,
	selectedItem,
	onItemChange,
	category,
}: FilterProps) => {
	// "All XXX"を選択した場合、フィルタなし
	const handleItemChange = (value: string) => {
		onItemChange(value === "all" ? null : value);
	};

	return (
		<>
			<Select value={selectedItem || "all"} onValueChange={handleItemChange}>
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
		</>
	);
};



/* ===== FILE: \ps-ps\src\features\msr-unit-selector\components\FilterBar.tsx ===== */

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



/* ===== FILE: \ps-ps\src\features\msr-unit-selector\components\UnitCard.tsx ===== */

"use client";

import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "@/components/ui/card";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { Calendar, FileText, Tag, User } from "lucide-react";
import { formatDate } from "../lib/utils";
import type { ScheduleUnit } from "../types/schedule-unit";

interface UnitCardProps {
	unit: ScheduleUnit;
}

export const UnitCard:React.FC<UnitCardProps> = ({ unit }) => {
	// 進捗状況に応じたバッジのスタイルを設定
	const getStatusBadgeVariant = (status: string) => {
		switch (status) {
			case "完了":
				return "success";
			case "進行中":
				return "default";
			case "遅延":
				return "destructive";
			case "未開始":
				return "secondary";
			default:
				return "outline";
		}
	};

	// 担当者が複数いる場合の表示を処理
	const displayAssignees = () => {
		if (unit.assignees.length === 1) {
			return unit.assignees[0];
		}
		return `${unit.assignees[0]} 他 ${unit.assignees.length - 1}名`;
	};

	return (
		<Card
			className="cursor-pointer hover:shadow-md transition-shadow duration-200 h-full flex flex-col"
		>
			<CardHeader className="pb-2">
				<div className="flex justify-between items-start">
					<h3 className="font-semibold text-lg">{unit.name}</h3>
					<Badge variant={getStatusBadgeVariant(unit.status) as any}>
						{unit.status}
					</Badge>
				</div>
			</CardHeader>
			<CardContent className="flex-grow">
				<div className="space-y-2">
					<div className="flex items-center text-sm">
						<Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
						<span>
							{formatDate(unit.startDate)} 〜 {formatDate(unit.endDate)}
						</span>
					</div>

					<div className="flex items-center text-sm">
						<User className="h-4 w-4 mr-2 text-muted-foreground" />
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<span>{displayAssignees()}</span>
								</TooltipTrigger>
								<TooltipContent className="p-2 max-w-xs">
									<p className="font-semibold mb-1">担当者一覧</p>
									<ul className="list-disc pl-4">
										{unit.assignees.map((assignee, index) => (
											<li key={index}>{assignee}</li>
										))}
									</ul>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					</div>

					<div className="flex items-center text-sm">
						<Tag className="h-4 w-4 mr-2 text-muted-foreground" />
						<span>{unit.function}</span>
					</div>

					<div className="flex items-center text-sm">
						<FileText className="h-4 w-4 mr-2 text-muted-foreground" />
						<span>{unit.order}</span>
					</div>
				</div>
			</CardContent>
			<CardFooter className="pt-2 flex flex-wrap gap-1">
				{unit.tags.map((tag, index) => (
					<Badge key={index} variant="outline" className="text-xs">
						{tag}
					</Badge>
				))}
			</CardFooter>
		</Card>
	);
};



/* ===== FILE: \ps-ps\src\features\msr-unit-selector\components\UnitCardList.tsx ===== */

"use client";

import { Link } from "@tanstack/react-router";
import type { ScheduleUnit } from "../types/schedule-unit";
import { UnitCard } from "./UnitCard";

interface UnitCardListProps {
	units: ScheduleUnit[];
}

export const UnitCardList:React.FC<UnitCardListProps> = ({ units }) => {

	if (units.length === 0) {
		return (
			<div className="flex flex-col items-center justify-center p-12 bg-muted/20 rounded-lg border border-dashed">
				<p className="text-muted-foreground text-center">
					条件に一致する日程管理単位が見つかりませんでした。
					<br />
					フィルタ条件を変更してください。
				</p>
			</div>
		);
	}

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
			{units.map((unit) => (
				<Link 
					key={unit.id}
					to="/msr/milestone/$MSRMngCode"
					params={{MSRMngCode: unit.id}}
				>
					<UnitCard
						key={unit.id}
						unit={unit}
					/>
				</Link>
			))}
		</div>
	);
}



/* ===== FILE: \ps-ps\src\features\msr-unit-selector\lib\api.ts ===== */

/**
 * API関連の関数を提供するモジュール
 *
 * このモジュールは、バックエンドAPIとの通信を担当する関数を提供します。
 * 現在の実装では、実際のAPIリクエストをシミュレートするためのモックデータと
 * 遅延関数を使用しています。
 *
 * 実際の実装では、このモジュールをfetchやaxiosなどを使用した
 * 実際のAPIリクエスト関数に置き換えることができます。
 */
import type { ProcurementItem } from "../types/procurement-item";
import type { Milestone } from "../types/milestone";
import type { ScheduleUnit } from "../types/schedule-unit";

/**
 * APIリクエストのシミュレーション用の遅延関数
 * 指定されたミリ秒だけ処理を遅延させます
 *
 * @param {number} ms - 遅延させるミリ秒
 * @returns {Promise<void>} 指定時間後に解決するPromise
 */
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// サンプルの日程管理単位データ
// 実際の実装では、このデータはAPIから取得します
const sampleScheduleUnits: ScheduleUnit[] = [
	{
		id: "1",
		name: "電子部品調達計画A",
		description: "主要電子部品の調達とサプライヤー管理",
		startDate: new Date("2023-10-01"),
		endDate: new Date("2024-03-31"),
		status: "進行中",
		assignees: ["田中太郎", "佐藤健太"],
		tags: ["高優先度", "電子部品"],
		order: ["ORD-2023-001"],
		function: ["調達"],
	},
	{
		id: "2",
		name: "機械部品調達計画B",
		description: "機械部品の国内調達とコスト削減",
		startDate: new Date("2023-11-15"),
		endDate: new Date("2024-05-20"),
		status: "進行中",
		assignees: ["佐藤花子", "鈴木雄太"],
		tags: ["中優先度", "機械部品"],
		order: ["ORD-2023-002"],
		function: ["調達"],
	},
	{
		id: "3",
		name: "原材料調達計画C",
		description: "原材料の国際調達と品質管理",
		startDate: new Date("2023-09-01"),
		endDate: new Date("2024-02-28"),
		status: "遅延",
		assignees: ["鈴木一郎", "高橋直子", "伊藤誠"],
		tags: ["高優先度", "原材料"],
		order: ["ORD-2023-003"],
		function: ["品質管理"],
	},
	{
		id: "4",
		name: "包装資材調達計画D",
		description: "環境に配慮した包装資材の調達",
		startDate: new Date("2023-12-01"),
		endDate: new Date("2024-04-30"),
		status: "未開始",
		assignees: ["山田次郎"],
		tags: ["低優先度", "包装"],
		order: ["ORD-2023-004"],
		function: ["環境対応"],
	},
	{
		id: "5",
		name: "ITハードウェア調達計画E",
		description: "社内ITインフラ更新のための機器調達",
		startDate: new Date("2024-01-15"),
		endDate: new Date("2024-07-15"),
		status: "未開始",
		assignees: ["高橋真理", "中村健太"],
		tags: ["中優先度", "IT機器"],
		order: ["ORD-2024-001"],
		function: ["IT"],
	},
];

// サンプルの調達品データ
// 日程管理単位IDをキーとして、関連する調達品のリストを保持
const sampleProcurementItems: Record<string, ProcurementItem[]> = {
	"1": [
		{
			id: "p1",
			name: "半導体チップA",
			category: "電子部品",
			quantity: 1000,
			unit: "個",
			unitPrice: 500,
			supplier: "テクノ電子株式会社",
			deliveryDate: new Date("2024-01-15"),
			status: "納品済み",
		},
		{
			id: "p2",
			name: "コネクタB",
			category: "電子部品",
			quantity: 5000,
			unit: "個",
			unitPrice: 50,
			supplier: "コネクト工業",
			deliveryDate: new Date("2024-02-20"),
			status: "発注済み",
		},
		{
			id: "p3",
			name: "基板C",
			category: "電子部品",
			quantity: 500,
			unit: "枚",
			unitPrice: 2000,
			supplier: "プリント基板株式会社",
			deliveryDate: new Date("2024-03-10"),
			status: "未発注",
		},
	],
	"2": [
		{
			id: "p4",
			name: "モーターユニットD",
			category: "機械部品",
			quantity: 200,
			unit: "個",
			unitPrice: 15000,
			supplier: "モーター工業",
			deliveryDate: new Date("2024-02-28"),
			status: "発注済み",
		},
		{
			id: "p5",
			name: "ギアセットE",
			category: "機械部品",
			quantity: 1000,
			unit: "セット",
			unitPrice: 3000,
			supplier: "精密機械株式会社",
			deliveryDate: new Date("2024-03-15"),
			status: "未発注",
		},
	],
	"3": [
		{
			id: "p6",
			name: "アルミニウム板材",
			category: "原材料",
			quantity: 500,
			unit: "kg",
			unitPrice: 800,
			supplier: "メタル商事",
			deliveryDate: new Date("2024-01-30"),
			status: "納品済み",
		},
		{
			id: "p7",
			name: "特殊プラスチック",
			category: "原材料",
			quantity: 300,
			unit: "kg",
			unitPrice: 1200,
			supplier: "化学工業株式会社",
			deliveryDate: new Date("2024-02-15"),
			status: "発注済み",
		},
	],
	"4": [
		{
			id: "p8",
			name: "環境配慮型段ボール",
			category: "包装資材",
			quantity: 10000,
			unit: "枚",
			unitPrice: 30,
			supplier: "エコパッケージ",
			deliveryDate: new Date("2024-04-10"),
			status: "未発注",
		},
	],
	"5": [
		{
			id: "p9",
			name: "ノートPC",
			category: "IT機器",
			quantity: 50,
			unit: "台",
			unitPrice: 120000,
			supplier: "テックソリューションズ",
			deliveryDate: new Date("2024-03-20"),
			status: "発注済み",
		},
		{
			id: "p10",
			name: "サーバーラック",
			category: "IT機器",
			quantity: 5,
			unit: "台",
			unitPrice: 350000,
			supplier: "データシステム株式会社",
			deliveryDate: new Date("2024-05-10"),
			status: "未発注",
		},
	],
};

// サンプルのマイルストンデータ
// 日程管理単位IDをキーとして、関連するマイルストンのリストを保持
const sampleMilestones: Record<string, Milestone[]> = {
	"1": [
		{
			id: "m1",
			name: "要件定義完了",
			description: "電子部品の要件定義と仕様書の作成",
			dueDate: new Date("2023-10-15"),
			completedDate: new Date("2023-10-12"),
			status: "完了",
			responsible: "田中太郎",
		},
		{
			id: "m2",
			name: "サプライヤー選定",
			description: "複数のサプライヤーから最適な取引先を選定",
			dueDate: new Date("2023-11-30"),
			completedDate: new Date("2023-11-25"),
			status: "完了",
			responsible: "佐藤健太",
		},
		{
			id: "m3",
			name: "発注完了",
			description: "全ての電子部品の発注手続き完了",
			dueDate: new Date("2023-12-15"),
			completedDate: new Date("2023-12-20"),
			status: "遅延完了",
			responsible: "田中太郎",
		},
		{
			id: "m4",
			name: "納品完了",
			description: "全ての電子部品の納品完了",
			dueDate: new Date("2024-03-31"),
			completedDate: null,
			status: "進行中",
			responsible: "佐藤健太",
		},
	],
	"2": [
		{
			id: "m5",
			name: "要件定義完了",
			description: "機械部品の要件定義と仕様書の作成",
			dueDate: new Date("2023-11-30"),
			completedDate: new Date("2023-12-05"),
			status: "遅延完了",
			responsible: "佐藤花子",
		},
		{
			id: "m6",
			name: "サプライヤー選定",
			description: "複数のサプライヤーから最適な取引先を選定",
			dueDate: new Date("2024-01-15"),
			completedDate: new Date("2024-01-10"),
			status: "完了",
			responsible: "鈴木雄太",
		},
		{
			id: "m7",
			name: "発注完了",
			description: "全ての機械部品の発注手続き完了",
			dueDate: new Date("2024-02-15"),
			completedDate: null,
			status: "進行中",
			responsible: "佐藤花子",
		},
	],
	"3": [
		{
			id: "m8",
			name: "国際調達計画策定",
			description: "国際調達のための計画と戦略の策定",
			dueDate: new Date("2023-09-30"),
			completedDate: new Date("2023-10-10"),
			status: "遅延完了",
			responsible: "鈴木一郎",
		},
		{
			id: "m9",
			name: "品質基準策定",
			description: "原材料の品質基準と検査方法の策定",
			dueDate: new Date("2023-11-15"),
			completedDate: new Date("2023-11-20"),
			status: "遅延完了",
			responsible: "高橋直子",
		},
		{
			id: "m10",
			name: "サプライヤー契約",
			description: "選定したサプライヤーとの契約締結",
			dueDate: new Date("2023-12-31"),
			completedDate: new Date("2024-01-15"),
			status: "遅延完了",
			responsible: "伊藤誠",
		},
	],
	"4": [
		{
			id: "m11",
			name: "環境基準調査",
			description: "包装資材の環境基準と規制の調査",
			dueDate: new Date("2023-12-31"),
			completedDate: new Date("2023-12-28"),
			status: "完了",
			responsible: "山田次郎",
		},
		{
			id: "m12",
			name: "サプライヤー選定",
			description: "環境に配慮したサプライヤーの選定",
			dueDate: new Date("2024-02-15"),
			completedDate: null,
			status: "未開始",
			responsible: "山田次郎",
		},
	],
	"5": [
		{
			id: "m13",
			name: "IT機器要件定義",
			description: "必要なIT機器の要件定義と仕様策定",
			dueDate: new Date("2024-01-31"),
			completedDate: new Date("2024-01-25"),
			status: "完了",
			responsible: "高橋真理",
		},
		{
			id: "m14",
			name: "予算承認",
			description: "IT機器調達のための予算承認取得",
			dueDate: new Date("2024-02-15"),
			completedDate: new Date("2024-02-10"),
			status: "完了",
			responsible: "中村健太",
		},
		{
			id: "m15",
			name: "発注完了",
			description: "全てのIT機器の発注手続き完了",
			dueDate: new Date("2024-03-15"),
			completedDate: null,
			status: "進行中",
			responsible: "高橋真理",
		},
	],
};

/**
 * 日程管理単位を取得するAPI関数
 *
 * 指定されたIDの日程管理単位の詳細情報を取得します。
 *
 * @param {string} unitId - 取得する日程管理単位のID
 * @returns {Promise<ScheduleUnit | null>} 日程管理単位の情報、存在しない場合はnull
 */
export async function fetchScheduleUnitById(
	unitId: string,
): Promise<ScheduleUnit | null> {
	// 実際のAPIリクエストをシミュレート
	await delay(500);

	// 該当する日程管理単位IDのデータを返す
	return sampleScheduleUnits.find((unit) => unit.id === unitId) || null;
}

/**
 * 調達品リストを取得するAPI関数
 *
 * 指定された日程管理単位IDに関連する調達品のリストを取得します。
 *
 * @param {string} scheduleUnitId - 日程管理単位ID
 * @returns {Promise<ProcurementItem[]>} 調達品のリスト
 */
export async function fetchProcurementItems(
	scheduleUnitId: string,
): Promise<ProcurementItem[]> {
	// 実際のAPIリクエストをシミュレート
	await delay(800);

	// 該当する日程管理単位IDの調達品を返す
	return sampleProcurementItems[scheduleUnitId] || [];
}

/**
 * マイルストンリストを取得するAPI関数
 *
 * 指定された日程管理単位IDに関連するマイルストンのリストを取得します。
 *
 * @param {string} scheduleUnitId - 日程管理単位ID
 * @returns {Promise<Milestone[]>} マイルストンのリスト
 */
export async function fetchMilestones(
	scheduleUnitId: string,
): Promise<Milestone[]> {
	// 実際のAPIリクエストをシミュレート
	await delay(1000);

	// 該当する日程管理単位IDのマイルストンを返す
	return sampleMilestones[scheduleUnitId] || [];
}



/* ===== FILE: \ps-ps\src\features\msr-unit-selector\lib\utils.ts ===== */

/**
 * ユーティリティ関数を提供するモジュール
 *
 * このモジュールは、アプリケーション全体で使用される汎用的なユーティリティ関数を提供します。
 * クラス名の結合、日付のフォーマット、通貨のフォーマットなどの機能を含みます。
 */
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * クラス名を結合するユーティリティ関数
 *
 * clsxとtailwind-mergeを組み合わせて、クラス名を効率的に結合します。
 * これにより、条件付きクラスの適用やTailwindのクラスの衝突解決が容易になります。
 *
 * @param {...ClassValue[]} inputs - 結合するクラス名
 * @returns {string} 結合されたクラス名
 */
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

/**
 * 日付を日本語形式でフォーマットするユーティリティ関数
 *
 * 日付オブジェクトを「YYYY/MM/DD」形式の文字列に変換します。
 *
 * @param {Date} date - フォーマットする日付
 * @returns {string} フォーマットされた日付文字列
 */
export function formatDate(date: Date): string {
	return date.toLocaleDateString("ja-JP", {
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
	});
}

/**
 * 金額を日本円形式でフォーマットするユーティリティ関数
 *
 * 数値を「¥XXX,XXX」形式の通貨文字列に変換します。
 *
 * @param {number} amount - フォーマットする金額
 * @returns {string} フォーマットされた通貨文字列
 */
export function formatCurrency(amount: number): string {
	return new Intl.NumberFormat("ja-JP", {
		style: "currency",
		currency: "JPY",
		minimumFractionDigits: 0,
	}).format(amount);
}



/* ===== FILE: \ps-ps\src\features\msr-unit-selector\types\milestone.ts ===== */

// マイルストンのデータモデル
export interface Milestone {
	id: string;
	name: string;
	description: string;
	dueDate: Date;
	completedDate: Date | null;
	status: string;
	responsible: string;
}



/* ===== FILE: \ps-ps\src\features\msr-unit-selector\types\procurement-item.ts ===== */

// 調達品のデータモデル
export interface ProcurementItem {
	id: string;
	name: string;
	category: string;
	quantity: number;
	unit: string;
	unitPrice: number;
	supplier: string;
	deliveryDate: Date;
	status: string;
}



/* ===== FILE: \ps-ps\src\features\msr-unit-selector\types\schedule-unit.ts ===== */

export interface ScheduleUnit {
	id: string;
	name: string;
	description?: string
	startDate: Date;
	endDate: Date;
	status: string;
	assignees: string[]; // 文字列から配列に変更
	tags: string[];
	order: string[];
	function: string[];
}



/* ===== FILE: \ps-ps\src\features\pip-management\columns\getPipColumns.tsx ===== */

import type { ColumnDef } from '@tanstack/react-table';
import { Package } from 'lucide-react';
import type { Pip } from '@/types';

/**
 * PIPテーブルのカラム定義
 */
export const getPipColumns = () => {
	// ベースとなるカラム定義
	const base: ColumnDef<Pip>[] = [
		{
			id: 'code',
			header: 'PIP Code',
			accessorKey: 'code',
			size: 250,
			minSize: 80,
			maxSize: 250,
			cell: ({ getValue }) => {
				const value = getValue();
				return (
					<div className="flex items-center gap-2">
						<Package className="h-4 w-4 text-blue-600" />
						<span className="font-mono text-sm">{String(value)}</span>
					</div>
				);
			},
		},
		{
			id: 'nickname',
			header: 'PIP Nickname',
			accessorKey: 'nickname',
			size: 350,
			minSize: 150,
			maxSize: 350,
			cell: ({ getValue }) => {
				const value = getValue();
				return <span className="font-mono text-sm">{String(value)}</span>;
			},
		},
		{
			id: 'itemCount',
			header: 'Item Count',
			size: 100,
			enableColumnFilter: false,
			cell: ({ row }) => (
				<span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
					{row.original.items.length}
				</span>
			),
		},
		{
			id: 'vendorCount',
			header: 'Vendor Count',
			size: 100,
			enableColumnFilter: false,
			cell: ({ row }) => (
				<span className="bg-purple-100 text-purple-800 text-xs font-medium px-2 py-1 rounded-full">
					{row.original.vendors.length}
				</span>
			),
		},
	];

	return base;
};



/* ===== FILE: \ps-ps\src\features\pip-management\components\PipDetail.tsx ===== */

import { EmptyState, GenericEditableTable } from '@/components';
import { GenericReadonlyControl } from '@/components/generic-table/GenericReadonlyControl';
import { getItemColumns } from '@/features/item-management/columns/getItemColumns';
import { styleItemCell } from '@/features/item-management/utils/styleItemCell';
import type { Item, Pip, Vendor } from '@/types';
import type { Table } from '@tanstack/react-table';
import { AlertCircle, Ship } from 'lucide-react';
import { useState } from 'react';
import { getVendorColumns } from '../utils/getVendorColumns';
import { styleVendorCell } from '../utils/styleVendorCell';

/**
 * PIP管理画面右側のPIP詳細エリアの表示切替とレイアウトを定義
 * pipDetail: PIPと紐づく購入品とベンダーのリスト
 */
export const PipDetail = ({ pipDetail }: { pipDetail: Pip }) => {
	// PIPテーブルで選択したPIPに紐づく購入品リスト
	const items = pipDetail.items;
	// PIPテーブルで選択したPIPに紐づくベンダーリスト
	const vendors = pipDetail.vendors;

	// フィルター後の件数を管理（現在フィルタ未使用）
	const [filteredItemCount, setFilteredItemCount] = useState(items.length); // 購入品
	const [filteredVendorCount, setFilteredVendorCount] = useState(
		vendors.length,
	); // ベンダー
	// フィルター入力欄の表示ON/OFF（現在フィルタボタン非表示）
	const [showItemFilters, setShowItemFilters] = useState(false); // 購入品
	const [showVendorFilters, setShowVendorFilters] = useState(false); // ベンダー
	// フィルタークリア用にTableインスタンスを保持（現在フィルタ未使用）
	const [itemTableInstance, setItemTableInstance] =
		useState<Table<Item> | null>(null); // 購入品
	const [vendorTableInstance, setVendorTableInstance] =
		useState<Table<Vendor> | null>(null); // ベンダー

	// PIP管理画面でPIPレコードが押下されたかで表示画面を切り替え
	return !pipDetail.code ? (
		<div className="pt-30">
			{/* PIP管理画面でPIPレコードが押下されていないときはアラート画面を表示 */}
			<EmptyState icon={Ship} label="クリックしたPIPの詳細情報を表示します" />
		</div>
	) : (
		// PIP管理画面でPIPレコードが押下されたときは紐づく購入品、ベンダーテーブルを表示
		<div className="bg-white rounded-lg shadow-sm border border-gray-300 flex flex-col py-4 px-8 h-[80%]">
			<div className="min-h-12">
				{/* PIP nickname */}
				<h2 className="text-2xl text-gray-800">{pipDetail.nickname}</h2>
				{/* PIP Code */}
				<h4 className="text-md text-gray-500">{pipDetail.code}</h4>
			</div>
			<div className="flex flex-col h-full mt-5 gap-10">
				<div className="h-[43%]">
					{/* タイトル・フィルタボタン */}
					<GenericReadonlyControl<Item>
						title="購入品"
						data={items}
						isFilterActive={false}
						tableInstance={itemTableInstance}
						filteredCount={filteredItemCount}
						showFilters={showItemFilters}
						setShowFilters={setShowItemFilters}
					/>
					<div className="mt-2 h-[95%]">
						{/* 購入品テーブル */}
						<GenericEditableTable<Item>
							keyField="itemNo"
							data={items}
							columns={getItemColumns(true)}
							disableEditing
							disableSelection
							showFilters={showItemFilters} // ✅ フィルター表示ON/OFF切り替え
							renderCell={styleItemCell}
							onFilteredCountChange={setFilteredItemCount} // ✅ フィルター後件数を受け取る
							onTableReady={setItemTableInstance} // ✅ table instance を取得してボタンから操作可能に
						/>
					</div>
				</div>

				<div className="h-[38%]">
					<GenericReadonlyControl<Vendor>
						title="ベンダー"
						data={vendors}
						isFilterActive={false}
						tableInstance={vendorTableInstance}
						filteredCount={filteredVendorCount}
						showFilters={showVendorFilters}
						setShowFilters={setShowVendorFilters}
					/>
					{vendors.length === 0 ? (
						<div className="pt-20">
							<EmptyState
								icon={AlertCircle}
								label="まだベンダーが割り当てられていません"
							/>
						</div>
					) : (
						<div className="mt-2 h-[95%]">
							{/* 購入品テーブル */}
							<GenericEditableTable<Vendor>
								keyField="id"
								data={vendors}
								columns={getVendorColumns()}
								disableEditing
								disableSelection
								showFilters={showVendorFilters} // ✅ フィルター表示ON/OFF切り替え
								renderCell={styleVendorCell}
								onFilteredCountChange={setFilteredVendorCount} // ✅ フィルター後件数を受け取る
								onTableReady={setVendorTableInstance} // ✅ table instance を取得してボタンから操作可能に
							/>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};



/* ===== FILE: \ps-ps\src\features\pip-management\components\PipTable.tsx ===== */

import {
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getSortedRowModel,
	type SortingState,
	useReactTable,
} from '@tanstack/react-table';
import { AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';
import type React from 'react';
import { useEffect, useState } from 'react';
import { EmptyState } from '@/components';
import { GenericTableFilter } from '@/components/generic-table/GenericTableFilter';
import { IndeterminateCheckbox } from '@/components/ui/IndeterminateCheckbox';
import { cn } from '@/lib/utils';
import type { Pip, PipData } from '@/types';
import { getPipColumns } from '../columns/getPipColumns';
import { PIP_FILTER_PLACEHOLDERS } from '../constants/pip-filter-placeholders';

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
	isLoading?: boolean; // ローディング中フラグ
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
	isLoading = false,
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
						{isLoading ? (
							<tr>
								<td
									colSpan={table.getAllColumns().length + 1}
									className="h-32 text-center"
								>
									<div className="flex justify-center mt-10">
										<div className="animate-spin h-10 w-10 border-4 border-blue-500 rounded-full border-t-transparent" />
									</div>
								</td>
							</tr>
						) : table.getRowModel().rows.length === 0 ? (
							<tr>
								<td
									colSpan={table.getAllColumns().length + 1}
									className="h-32 text-center text-gray-500"
								>
									<div className="mt-20">
										<EmptyState icon={AlertCircle} label="データがありません" />
									</div>
								</td>
							</tr>
						) : (
							table.getRowModel().rows.map((row) => (
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
									{row.getVisibleCells().map((cell) => (
										<td
											key={cell.id}
											className="px-4 py-3"
											style={{ width: cell.column.getSize() }}
										>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
										</td>
									))}
								</tr>
							))
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
};



/* ===== FILE: \ps-ps\src\features\pip-management\components\PipTableControls.tsx ===== */

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



/* ===== FILE: \ps-ps\src\features\pip-management\constants\pip-filter-placeholders.ts ===== */

// フィルタのプレースホルダー定義（列ごとに設定）
export const PIP_FILTER_PLACEHOLDERS = {
	code: 'filter PIP Code',
	nickname: 'filter PIP Nickname',
};



/* ===== FILE: \ps-ps\src\features\pip-management\hooks\usePipListDelete.ts ===== */

import { useMutation } from '@tanstack/react-query';
import type { PipData } from '@/types';

type PipTableDefinition = {
	code?: number | string;
};

// 抽出する
function extractItems(
	deleteData: Record<string, Partial<PipData>>,
): PipTableDefinition[] {
	return Object.values(deleteData).map((pip) => {
		return {
			// sourcePIPCodeとして、codeを指定する(画面上のPIPコード)
			sourcePIPCode: pip.code ?? undefined,
		};
	});
}

export const usePipListDelete = () => {
	return useMutation({
		mutationFn: async ({
			userId,
			jobNo,
			fgCode,
			deleteData,
		}: {
			userId: string;
			jobNo: string;
			fgCode: string;
			deleteData: Record<string, Partial<PipData>>;
		}) => {
			// 必要な要素のみを抽出する
			const pip = extractItems(deleteData);

			try {
				const response = await fetch(
					'http://testservb.xx.co.jp/GX_PSYS_TEST2/transactions/DeletePIP',
					{
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							'Cache-Control': 'no-cache',
						},
						cache: 'no-store',
						body: JSON.stringify({
							requestJSON: JSON.stringify({
								userId: userId,
								jobNo: jobNo,
								fgCode: fgCode.charAt(0),
								pip: pip,
							}),
						}),
					},
				);

				if (!response.ok) {
					console.log(response.status);
					throw new Error(`HTTP status: ${response.status}`);
				}
				const json = await response.json();
				return JSON.parse(json.responseJSON);
			} catch (error) {
				console.error('Fetch error:', error);
				throw error;
			}
		},
		staleTime: 5 * 60 * 1000,
		gcTime: 10 * 60 * 1000,
		refetchOnWindowFocus: false,
	});
};



/* ===== FILE: \ps-ps\src\features\pip-management\hooks\usePips.ts ===== */

import { useQuery } from '@tanstack/react-query';
import type { PipResponse } from '../types/pip-response';

/**
 * PIPリスト取得APIを呼び出す
 */
export const usePips = (jobNo: string, fgCode: string | null) => {
	return useQuery<PipResponse[]>({
		queryKey: ['pip', jobNo, fgCode],
		queryFn: async (): Promise<PipResponse[]> => {
			try {
				const response = await fetch(
					'http://testservb.xx.co.jp/GX_PSYS_TEST2/transactions/GetPIPList',
					{
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							'Cache-Control': 'no-cache',
						},
						cache: 'no-store',
						body: JSON.stringify({
							requestJSON: JSON.stringify({
								jobNo: jobNo,
								fgCode: fgCode?.charAt(0),
							}),
						}),
					},
				);

				if (!response.ok) {
					throw new Error(`HTTP status: ${response.status}`);
				}

				const data = await response.json();

				if (!data?.responseJSON) {
					throw new Error('responseJSON is undefined');
				}

				const parsedResponse = JSON.parse(data.responseJSON);

				console.warn(
					`Status Code: ${parsedResponse?.statusCode} Message: ${parsedResponse?.statusMessage}`,
				);

				if (!parsedResponse?.pip) {
					throw new Error('parsedResponse.pip is undefined');
				}

				const pipList = JSON.parse(parsedResponse.pip);

				if (!Array.isArray(pipList)) {
					throw new Error('parsed pipList is not an array');
				}

				return pipList;
			} catch (error) {
				console.error('Fetch error:', error);
				throw error;
			}
		},
		enabled: jobNo !== '' && !!fgCode, // jobNoとfgCodeが両方あるときだけ実行
		staleTime: 5 * 60 * 1000,
		gcTime: 10 * 60 * 1000,
		refetchOnWindowFocus: false,
	});
};



/* ===== FILE: \ps-ps\src\features\pip-management\hooks\usePipSaveOverwrite.ts ===== */

import { useMutation } from '@tanstack/react-query';
import type { Item } from '../../../types/common';

type ItemTableDefinition = {
	ItemSurKey?: number | string;
	ItemQty?: number | string;
	Element?: string;
	IBSCode?: string;
};

// 抽出する
function extractItems(
	targetData: Record<string, Partial<Item>>,
): ItemTableDefinition[] {
	return Object.values(targetData).map((item) => {
		return {
			ItemSurKey: item.itemSurKey ?? undefined,
			ItemQty: item.qty ?? '',
			Element: item.costElement ?? '',
			IBSCode: item.ibsCode ?? '',
		};
	});
}

// 購入品管理画面(PIP編集モード)で使用: PIPコードは実際の値を用いる
export const usePipSaveOverwrite = () => {
	return useMutation({
		mutationFn: async ({
			userId,
			jobNo,
			fgCode,
			targetData,
			pipNickName,
			selectedQtyMap, // PIPカードエリア 数量テキストボックス操作差分
			targetPipCode, // 選択されたpipDataのpipCode
		}: {
			userId: string;
			jobNo: string;
			fgCode: string;
			targetData: Record<string, Partial<Item>>;
			pipNickName: string;
			selectedQtyMap: Record<string, string>;
			targetPipCode: string;
		}) => {
			// 必要な要素のみを抽出する
			const item = extractItems(targetData);

			// 1要素目の情報を取得
			let firstElement: string | undefined;
			let firstItemIBSCode: string | undefined;

			if (item.length > 0) {
				firstElement = item[0].Element;
				firstItemIBSCode = item[0].IBSCode;
			}
			// itemとして送る要素を抽出するitemQty
			const requestParamItem = item
				.filter(({ ItemSurKey }) => ItemSurKey !== undefined)
				.map(({ ItemSurKey, ItemQty }) => {
					const key = String(ItemSurKey);
					const qty = Object.hasOwn(selectedQtyMap, key)
						? Number(selectedQtyMap[key])
						: Number(ItemQty);
					return {
						itemSurKey: Number(ItemSurKey),
						itemQty: qty,
					};
				});
			try {
				const response = await fetch(
					'http://testservb.xx.co.jp/GX_PSYS_TEST2/transactions/GeneratePIP',
					{
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							'Cache-Control': 'no-cache',
						},
						cache: 'no-store',
						body: JSON.stringify({
							requestJSON: JSON.stringify({
								userId: userId,
								jobNo: jobNo,
								fgCode: fgCode.charAt(0),
								pip: [
									{
										// 編集対象のpipを指定
										sourcePIPCode: targetPipCode,
										pipCode: targetPipCode,
										pipNickName: pipNickName,
										element: firstElement,
										ibsCode: firstItemIBSCode,
										item: requestParamItem,
									},
								],
							}),
						}),
					},
				);

				if (!response.ok) {
					console.log(response.status);
					throw new Error(`HTTP status: ${response.status}`);
				}
				return await response.json();
			} catch (error) {
				console.error('Fetch error:', error);
				throw error;
			}
		},
		staleTime: 5 * 60 * 1000,
		gcTime: 10 * 60 * 1000,
		refetchOnWindowFocus: false,
	});
};



/* ===== FILE: \ps-ps\src\features\pip-management\types\pip-response.ts ===== */

type PipItem = {
    pipItemNo: string;
    pipCoreItemNo: string;
    pipItemName: string;
    pipItemQty: string;
    pipElement: string;
    pipIBSCode: string;
};

type Aip = {
    aipCode: string;
    aipPsysVendorId: string;
    vendorName: string;
    vendorCode: string;
};

export type PipResponse = {
    jobNo: string;
    fgCode: string;
    pipCode: string;
    pipNickName: string;
    itemCount: string;
    item: PipItem[];
    aipCount: string;
    aip: Aip[];
};



/* ===== FILE: \ps-ps\src\features\pip-management\utils\getPipData.ts ===== */

import type { Item, PipData, Vendor } from '../../../types/common';

/**
 * APIレスポンスを、PIPItem型に変換
 */
export const getPipData = (apiResponse: any): PipData => {
	let pipArray: any[] = [];

	try {
		// pip が JSON文字列の場合はパースする
		pipArray =
			typeof apiResponse.pip === 'string'
				? JSON.parse(apiResponse.pip)
				: apiResponse.pip;
	} catch (e) {
		console.error('PIPデータのパースに失敗しました:', e);
		return { pips: [] };
	}

	const pips = pipArray.map((pipEntry: any) => {
		let items: Item[] = [];
		let vendors: Vendor[] = [];

		try {
			const itemArray =
				typeof pipEntry.item === 'string'
					? JSON.parse(pipEntry.item)
					: pipEntry.item;

			items = (itemArray || []).map((item: any, index: number) => ({
				itemNo: item.pipItemNo || '',
				coreItemNo: item.pipCoreItemNo || '',
				itemName: item.pipItemName || '',
				qty: Number(item.pipItemQty) || 0,
				costElement: item.pipElement || '',
				ibsCode: item.pipIBSCode || '',
				pipCode: pipEntry.pipCode || '',
				jobNo: pipEntry.jobNo || '',
				fg: pipEntry.fgCode || '',
				belongsToPip: pipEntry.pipCode || '',
				pipItemIndex: index,
			}));
		} catch (e) {
			console.warn('item のパースに失敗:', e);
		}

		try {
			const aipArray =
				typeof pipEntry.aip === 'string'
					? JSON.parse(pipEntry.aip)
					: pipEntry.aip;

			vendors = (aipArray || []).map((vendor: any) => ({
				aipCode: vendor.aipCode || '',
				id: vendor.aipPsysVendorId || '',
				name: vendor.vendorName || '',
				code: vendor.vendorCode || '',
			}));
		} catch (e) {
			console.warn('aip のパースに失敗:', e);
		}

		return {
			code: pipEntry.pipCode || '',
			nickname: pipEntry.pipNickName || '',
			items,
			vendors,
		};
	});

	return { pips };
};



/* ===== FILE: \ps-ps\src\features\pip-management\utils\getVendorColumns.ts ===== */

import type { ColumnDef } from '@tanstack/react-table';
import type { Vendor } from '@/types';

/**
 * ベンダーテーブルのカラム定義
 */
export const getVendorColumns = (): ColumnDef<Vendor>[] => {
	// ベースとなるカラム定義（すべての列を表示）
	const base: ColumnDef<Vendor>[] = [
		{
			id: 'name',
			header: 'Vendor Name',
			accessorKey: 'name',
			size: 150,
			minSize: 120,
			maxSize: 200,
		},
		{
			id: 'code',
			header: 'Vendor Code',
			accessorKey: 'code',
			size: 150,
			minSize: 120,
			maxSize: 200,
		},
		{
			id: 'aipCode',
			header: 'AIP',
			accessorKey: 'aipCode',
			size: 150,
			minSize: 120,
			maxSize: 200,
		},
	];

	return base;
};



/* ===== FILE: \ps-ps\src\features\pip-management\utils\stylePipCell.ts ===== */

/**
 * PIPテーブルのセル単位で条件に応じたスタイルクラスを返す関数
 * columnId: 現在の列id
 * value: セルの表示値
 */
export const stylePipCell = ({
	columnId,
	value,
}: {
	columnId: string;
	value: unknown;
}): string | undefined => {
	// Item Count, Vendor Countは右寄せ
	return (columnId === 'itemCount' || columnId === 'vendorCount') &&
		typeof value === 'number'
		? 'text-right'
		: undefined;
};



/* ===== FILE: \ps-ps\src\features\pip-management\utils\styleVendorCell.ts ===== */

/**
 * ベンダーテーブルのセル単位で条件に応じたスタイルクラスを返す関数
 * columnId: 現在の列id
 * value: セルの表示値
 */
export const styleVendorCell = ({
	columnId,
	value,
}: {
	columnId: string;
	value: unknown;
}): string | undefined => {
	return columnId === 'name' && typeof value === 'string'
		? '' // tailwind cssのコードを書くとセルにスタイルが当たる（例：bg-yellow-50）
		: undefined; // 条件に合わない場合はクラスなし
};



/* ===== FILE: \ps-ps\src\features\pip-management\utils\transformPipResponseToPipData.ts ===== */

import type { Item, Pip, PipData, Vendor } from "@/types";
import type { PipResponse } from "../types/pip-response";

/**
 * PipResponseリストを PipData 型に整形
 * @param pipResponseList - APIから取得した PipResponse 配列
 * @returns PipData 型（pips: Pip[]）に整形されたオブジェクト
 */
export function transformPipResponseToPipData(pipResponseList: PipResponse[]): PipData {
  const pips: Pip[] = pipResponseList.map((pipResponse): Pip => {
    // item と aip が JSON文字列の場合はパースする
    const parsedItems = typeof pipResponse.item === "string"
      ? JSON.parse(pipResponse.item)
      : pipResponse.item;

    const parsedAips = typeof pipResponse.aip === "string"
      ? JSON.parse(pipResponse.aip)
      : pipResponse.aip;

    const items: Item[] = parsedItems.map((item: any, index: number) => ({
      itemNo: item.pipItemNo,
      coreItemNo: item.pipCoreItemNo,
      itemName: item.pipItemName,
      qty: parseFloat(item.pipItemQty.trim()),
      costElement: item.pipElement,
      ibsCode: item.pipIBSCode,
      jobNo: pipResponse.jobNo,
      pipCode: pipResponse.pipCode,
      belongsToPip: pipResponse.pipCode,
      pipItemIndex: index,
      itemRestQty: parseFloat(item.pipItemQty.trim()),
    }));

    const vendors: Vendor[] = parsedAips.map((aip: any) => ({
      id: aip.aipCode,
      name: aip.vendorName,
      code: aip.vendorCode.trim(),
    }));

    return {
      code: pipResponse.pipCode,
      nickname: pipResponse.pipNickName,
      items,
      vendors,
    };
  });

  return { pips };
}


/* ===== FILE: \ps-ps\src\features\psys-randing\components\AppLogo.tsx ===== */

import { Database } from 'lucide-react'; // アイコンとして使用する Lucide の Database アイコンをインポート

interface AppLogoProps {
	size?: 'sm' | 'md' | 'lg' | 'xl';
	subtitle?: string;
	className?: string;
}

/**
 * ロゴ表示用のコンポーネント
 * size: サイズ指定（デフォルトは 'md'）
 * subtitle: サブタイトル（未使用だが拡張可能）
 * className: 外部から渡される追加クラス
 */
export function AppLogo({ size = 'md', className = '' }: AppLogoProps) {
	// テキストサイズのクラス定義
	const textSizeClasses = {
		sm: 'text-xl',
		md: 'text-2xl',
		lg: 'text-5xl',
		xl: 'text-7xl',
	};

	// サブタイトルのサイズクラス定義
	const subtitleSizeClasses = {
		sm: 'text-xs',
		md: 'text-xs',
		lg: 'text-base',
		xl: 'text-lg',
	};

	// 外枠アイコンサイズ（背景ボックス）
	const iconSizes = {
		sm: 'w-6 h-6',
		md: 'w-10 h-10',
		lg: 'w-16 h-16',
		xl: 'w-24 h-24',
	};

	// 内部アイコンサイズ（Database アイコン）
	const iconInnerSizes = {
		sm: 'w-3 h-3',
		md: 'w-5 h-5',
		lg: 'w-8 h-8',
		xl: 'w-12 h-12',
	};

	// アイコンとテキストの間の余白
	const gapClasses = {
		sm: 'gap-2',
		md: 'gap-3',
		lg: 'gap-4',
		xl: 'gap-5',
	};

	return (
		// ロゴ全体のラッパー（アイコン＋テキスト）
		<div className={`flex items-center ${gapClasses[size]} ${className}`}>
			{/* アイコンの外枠（白枠＋角丸） */}
			<div
				className={`${iconSizes[size]} border-2 border-white rounded-lg flex items-center justify-center flex-shrink-0`}
			>
				{/* Lucide の Database アイコン */}
				<Database className={`text-white ${iconInnerSizes[size]}`} />
			</div>

			{/* テキスト部分（P-sys + サブタイトル） */}
			<div className="flex flex-col">
				{/* メインロゴテキスト */}
				<div
					className={`font-logo tracking-tight select-none ${textSizeClasses[size]} text-white leading-none`}
				>
					{/* ロゴの構成：P - sys */}
					<span className="inline-block">P</span>
					<span className="inline-block text-white font-normal">-</span>
					<span className="inline-block">sys</span>
				</div>

				{/* サブタイトル（固定文言） */}
				<div
					className={`${subtitleSizeClasses[size]} AppLogo text-white font-light tracking-wide mt-1`}
				>
					調達WBS管理システム
				</div>
			</div>
		</div>
	);
}



/* ===== FILE: \ps-ps\src\features\psys-randing\components\FGSelector.tsx ===== */

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { type FG, useFgsStore } from '@/stores/useFgsStore';

interface OptionType {
	value: string;
	label: string;
}

interface Props {
	fgOptions: OptionType[];
	localFG: FG | null;
	setLocalFG: (fg: FG) => void;
}

export const FGSelector: React.FC<Props> = ({
	fgOptions,
	localFG,
	setLocalFG,
}) => {
	// FGリストの状態
	const { fgs } = useFgsStore();

	// FGセレクトボックスonChangeイベント
	const handleFG = (value: string) => {
		const fg = fgs.find((f) => f.fgCode === value);
		if (fg) setLocalFG(fg);
	};

	return (
		<Select onValueChange={handleFG} value={localFG?.fgCode}>
			<SelectTrigger
				className={`mt-1 w-[100%] bg-white ${!localFG ? 'bg-red-100' : ''}`}
			>
				<SelectValue placeholder="Function Group" />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					{fgOptions.map((fg) => (
						<SelectItem key={fg.value} value={fg.value}>
							{fg.label}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	);
};



/* ===== FILE: \ps-ps\src\features\psys-randing\components\index.ts ===== */

export { AppLogo } from './AppLogo';
export { Sidebar } from './Sidebar';
export { SplashWrapper } from './SplashWrapper';



/* ===== FILE: \ps-ps\src\features\psys-randing\components\Sidebar.tsx ===== */

import { Button } from '@/components/ui/button';
import { useAlertStore } from '@/stores/useAlartStore';
import { type FG, useFgsStore } from '@/stores/useFgsStore';
import { usePipsStore } from '@/stores/usePipsStore';
import { useSelectedFGStore } from '@/stores/useSelectedFgStore';
import { useSelectedJobNoStore } from '@/stores/useSelectedJobNoStore';
import { useSelectedProjectStore } from '@/stores/useSelectedProjectStore';
import { useEffect, useState } from 'react';
import { useFunctionGroups } from '../hooks/useFunctionGroups';
import { FGSelector } from './FGSelector';
import { SidebarNavigation } from './SidebarNavigation';

/**
 * サイドバーコンポーネントの定義
 */
export const Sidebar = () => {
	// FGセレクトボックスを変更したときに保持する
	const [localFG, setLocalFG] = useState<FG | null>(null);
	// プロジェクトの状態
	const { selectedProject } = useSelectedProjectStore();

	// FGリストの状態
	const { fgs, setFgs } = useFgsStore();

	// アラートの状態
	const { showAlert } = useAlertStore();

	// 選択したFG
	const { setSelectedJobNo } = useSelectedJobNoStore();
	const { selectedFG, setSelectedFG } = useSelectedFGStore();

	// FGセレクトボックスのOption
	const [fgOptions, setFgOptions] = useState<
		{ value: string; label: string }[]
	>([]);

	// FGをAPIで取得
	const { data: fgData } = useFunctionGroups();
	const { setIsAlertVisible } = useAlertStore();
	const { isPipFetchError } = usePipsStore();

	// FGリストをグローバルstateに設定、FGセレクトボックスのOption設定
	useEffect(() => {
		if (!fgData) return;
		setFgs(fgData);

		const options = fgData.map((fg) => ({
			value: fg.fgCode.trim(),
			label: fg.fgDescription.replace(/\s*:\s*/, ':'),
		}));
		setFgOptions(options);
	}, [fgData, setFgs]);

	// JobNoの初期値を設定（プロジェクトが変わったとき）
	useEffect(() => {
		if (selectedProject?.jobNos.length) {
			setSelectedJobNo(selectedProject.jobNos[0]);
		}
	}, [selectedProject, setSelectedJobNo]);

	// Display by Selectionボタンclickイベント
	const handleDisplayBySelection = () => {
		if (localFG) {
			const fg = fgs.find((f) => f.fgCode === localFG.fgCode);
			if (fg) {
				localFG && setSelectedFG(localFG);
			}
		}

		if (isPipFetchError) {
			console.log('通ってまっせ');
			setIsAlertVisible(true);
		}
	};

	return (
		<>
			<aside className="w-60 h-full shrink-0 bg-gradient-to-b from-orange-400 via-orange-400 to-orange-300">
				<div className="mt-4">
					{/* プロジェクトの情報 */}
					<div className="px-2 mt-4 text-white text-sm space-y-1">
						{/* プロジェクト名 */}
						<p className="text-3xl">
							{selectedProject?.projectNm ?? 'Not selected'}
						</p>
						{/* order */}
						<div className="mt-3">
							<p className="text-xs font-semibold">ORDER</p>
							<div className="pl-3">
								{selectedProject ? (
									selectedProject.jobOrderNos.join(', ')
								) : (
									<span>Not selected</span>
								)}
							</div>
						</div>
						{/* job no. */}
						<div className="mt-2">
							<p className="text-xs font-semibold">JOB NO.</p>
							<div className="pl-3">
								{selectedProject ? (
									selectedProject.jobNos.join(', ')
								) : (
									<span>Not selected</span>
								)}
							</div>
						</div>
					</div>

					{/* FUNCTION GROUP選択ボックス */}
					<div className="px-2 mt-6">
						<h2 className="text-xs font-semibold tracking-wide text-white">
							FUNCTION GROUP
						</h2>
						<FGSelector
							fgOptions={fgOptions}
							localFG={localFG}
							setLocalFG={setLocalFG}
						/>
						{/* 選択に基づいて表示するボタン */}
						<div className="mt-4">
							<Button
								className="w-[100%] cursor-pointer"
								disabled={!localFG}
								onClick={handleDisplayBySelection}
							>
								Display by Selection
							</Button>
						</div>
					</div>
				</div>

				{/* ナビゲーションメニューの表示 */}
				<SidebarNavigation />
			</aside>

			{/* アラートメッセージ */}
			{/* {isAlertVisible && alertMessages && (
				<div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
					<AlertMessages messages={alertMessages} />
				</div>
			)} */}
		</>
	);
};



/* ===== FILE: \ps-ps\src\features\psys-randing\components\SidebarNavigation.tsx ===== */

import { Link } from '@tanstack/react-router';
import { CalendarDays, House } from 'lucide-react';
import { NAV } from '../constants/navigation';

/**
 * サイドバーの画面遷移ナビゲーションタブ
 */
export const SidebarNavigation = () => {
	return (
		<nav className="mt-10">
			{NAV.map((group) => (
				<div key={group.id} className="space-y-2">
					{group.heading && (
						<h2 className="text-xs font-semibold tracking-wide text-white px-2">
							{group.heading}
						</h2>
					)}
					{group.items.map(({ id, label, to, icon }) => (
						<Link
							key={id}
							to={to}
							className="flex w-full items-center gap-4 px-4 py-4 text-white hover:bg-gray-600/20 text-lg"
							activeProps={{
								className:
									'bg-white !text-gray-800 font-medium pointer-events-none',
							}}
						>
							{icon}
							<span>{label}</span>
						</Link>
					))}
				</div>
			))}

			<div className="mt-10">
				<h2 className="text-xs font-semibold tracking-wide text-white p-2">
					LINKED SYSTEMS
				</h2>
				<Link
					key="home"
					to="/home"
					className="flex w-full items-center gap-4 px-4 py-4 text-white hover:bg-gray-600/20 text-lg"
					activeProps={{
						className:
							'bg-white !text-gray-800 font-medium pointer-events-none',
					}}
				>
					<House />
					<span>HOME</span>
				</Link>
				<Link
					key="msr"
					to="/msr"
					className="flex w-full items-center gap-4 px-4 py-4 text-white hover:bg-gray-600/20 text-lg"
					activeProps={{
						className:
							'bg-white !text-gray-800 font-medium pointer-events-none',
					}}
				>
					<CalendarDays />
					<span>MSR</span>
				</Link>
			</div>
		</nav>
	);
};



/* ===== FILE: \ps-ps\src\features\psys-randing\components\SplashScreen.tsx ===== */

import { motion, type Variants } from 'framer-motion';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';

/**
 * P-Sys遷移時のアニメーションを定義するコンポーネント
 * setForceSplashClose: アニメーションを強制終了するset関数
 * setShowedSplash: アニメーションが表示済みにするset関数
 */
export const SplashScreen = ({
	setForceSplashClose,
	setShowedSplash,
}: {
	setForceSplashClose: React.Dispatch<React.SetStateAction<boolean>>;
	setShowedSplash: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	// タイトルに表示する文字列（タイプライター風に表示される）
	const [titleDisplayed, setTitleDisplayed] = useState('');
	// サブタイトルに表示する文字列（タイプライター風に表示される）
	const [subtitleDisplayed, setSubtitleDisplayed] = useState('');
	// タイトルのカーソルを表示するかどうか（点滅アニメーション用）
	const [showTitleCursor, setShowTitleCursor] = useState(true);
	// サブタイトルのカーソルを表示するかどうか（点滅アニメーション用）
	const [showSubtitleCursor, setShowSubtitleCursor] = useState(false);
	// タイトルの表示が完了したかどうか（サブタイトル表示のトリガーに使用）
	const [titleComplete, setTitleComplete] = useState(false);

	const titleText = 'P-Sys';
	const subtitleText = '調達WBS管理システム';

	// タイトルのタイプライターエフェクト
	useEffect(() => {
		let titleIndex = 0;
		const titleTimer = setInterval(() => {
			if (titleIndex < titleText.length) {
				setTitleDisplayed(titleText.slice(0, titleIndex + 1));
				titleIndex++;
			} else {
				clearInterval(titleTimer);
				setTitleComplete(true);
				setShowTitleCursor(false);
				// 少し待ってからサブタイトル開始
				setTimeout(() => {
					setShowSubtitleCursor(true);
				}, 500);
			}
		}, 100); // 200ms間隔で1文字ずつ

		return () => clearInterval(titleTimer);
	}, []);

	// サブタイトルのタイプライターエフェクト
	useEffect(() => {
		if (!titleComplete) return;

		let subtitleIndex = 0;
		const subtitleTimer = setTimeout(() => {
			const interval = setInterval(() => {
				if (subtitleIndex < subtitleText.length) {
					setSubtitleDisplayed(subtitleText.slice(0, subtitleIndex + 1));
					subtitleIndex++;
				} else {
					clearInterval(interval);
					// タイピング完了後もカーソルを点滅させ続ける
				}
			}, 150); // 150ms間隔で1文字ずつ

			return () => clearInterval(interval);
		}, 500); // タイトル完了から500ms後に開始

		return () => clearTimeout(subtitleTimer);
	}, [titleComplete]);

	// カーソルの点滅アニメーション
	const cursorVariants: Variants = {
		visible: {
			opacity: [0, 1, 0],
			transition: {
				duration: 1,
				repeat: Number.POSITIVE_INFINITY,
				ease: 'linear',
			},
		},
	};

	// コンテナのアニメーション
	const containerVariants: Variants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				duration: 0.5,
			},
		},
	};

	return (
		<>
			<div className="flex justify-end p-10">
				{/* 強制終了ボタン */}
				<button
					type="button"
					className="hover:bg-gray-200 rounded cursor-pointer"
					onClick={() => {
						sessionStorage.setItem('hasSeenSplash', 'true');
						setForceSplashClose(true);
						setShowedSplash(true);
					}}
				>
					<X />
				</button>
			</div>
			<div className="min-h-[60vh] flex items-center justify-center overflow-hidden">
				<motion.div
					className="text-center"
					variants={containerVariants}
					initial="hidden"
					animate="visible"
				>
					{/* タイトル */}
					<div className="font-logo text-6xl md:text-8xl font-bold text-gray-800 tracking-wide mb-8">
						<span className="font-logo">{titleDisplayed}</span>
						{showTitleCursor && (
							<motion.span
								className="inline-block ml-1 w-1 bg-gray-800"
								style={{ height: '1em' }}
								variants={cursorVariants}
								animate="visible"
							/>
						)}
					</div>

					{/* サブタイトル */}
					<div className="mt-8">
						<div className="font-logo text-2xl md:text-3xl font-medium text-gray-600 tracking-wider">
							<span>{subtitleDisplayed}</span>
							{showSubtitleCursor && (
								<motion.span
									className="inline-block ml-1 w-0.5 bg-gray-600"
									style={{ height: '1em' }}
									variants={cursorVariants}
									animate="visible"
								/>
							)}
						</div>
					</div>

					{/* 装飾線（サブタイトル完了後に表示） */}
					{subtitleDisplayed.length === subtitleText.length && (
						<motion.div
							className="mt-6"
							initial={{ opacity: 0, scaleX: 0 }}
							animate={{ opacity: 1, scaleX: 1 }}
							transition={{ delay: 0.5, duration: 0.8 }}
						>
							<div className="w-24 h-1 bg-gradient-to-r from-orange-500 via-orange-400 to-indigo-700 mx-auto rounded-full" />
						</motion.div>
					)}
				</motion.div>
			</div>
		</>
	);
};



/* ===== FILE: \ps-ps\src\features\psys-randing\components\SplashWrapper.tsx ===== */

import { useEffect, useState } from 'react';
import { SplashScreen } from './SplashScreen';

type SplashWrapperProps = {
	children: React.ReactNode;
};

/**
 * スプラッシュ画面の表示制御を行うラッパーコンポーネント
 * children: 子コンテンツ 現状item-assignment.tsxになる
 */
export const SplashWrapper: React.FC<SplashWrapperProps> = ({ children }) => {
	// アニメーション強制終了の制御
	const [forceSplashClose, setForceSplashClose] = useState(false);
	// スプラッシュ画面が表示済みかどうかの状態管理
	const [showedSplash, setShowedSplash] = useState(false);

	// 初回レンダリング時にスプラッシュ表示の有無を判定
	useEffect(() => {
		// sessionStorage に保存された表示履歴を取得
		const hasSeenSplash = sessionStorage.getItem('hasSeenSplash');

		if (hasSeenSplash || forceSplashClose) {
			// すでに表示済みなら即座にメインコンテンツを表示
			setShowedSplash(true);
		} else {
			// 初回表示の場合は 5.5 秒間アニメーション画面を表示
			const timer = setTimeout(() => {
				setShowedSplash(true);
				// 表示済みフラグを sessionStorage に保存
				sessionStorage.setItem('hasSeenSplash', 'true');
			}, 5500);
			// クリーンアップ
			return () => clearTimeout(timer);
		}
	}, [forceSplashClose]);

	// スプラッシュ画面が未表示なら SplashScreen を表示
	if (!showedSplash) {
		return (
			<SplashScreen
				setForceSplashClose={setForceSplashClose}
				setShowedSplash={setShowedSplash}
			/>
		);
	}

	// スプラッシュ表示後に子コンテンツを表示
	return <>{children}</>;
};



/* ===== FILE: \ps-ps\src\features\psys-randing\constants\navigation.tsx ===== */

import { Package, ShoppingCart } from 'lucide-react';

// ナビゲーションアイテムの型定義
type NavItem = {
	id: string;
	label: string;
	to: string;
	icon: React.ReactElement;
};

// ナビゲーショングループの型定義
type NavGroup = {
	id: string;
	heading?: string;
	items: NavItem[];
};

// P-Sysの共通パス定義
const pSysPath = '/p-sys';

// ナビゲーションメニューの定義
export const NAV: NavGroup[] = [
	{
		id: 'psys',
		heading: 'MENU',
		items: [
			{
				id: 'items',
				label: '購入品管理',
				to: `${pSysPath}/item-assignment`,
				icon: <ShoppingCart className="h-5 w-5" />,
			},
			{
				id: 'pips',
				label: 'PIP管理',
				to: `${pSysPath}/pips`,
				icon: <Package className="h-5 w-5" />,
			},
		],
	},
];



/* ===== FILE: \ps-ps\src\features\psys-randing\hooks\useFunctionGroups.ts ===== */

import type { FG } from '@/stores/useFgsStore';
import { useQuery } from '@tanstack/react-query';

/**
 * APIでFGリストを取得
 */
export const useFunctionGroups = () => {
	return useQuery({
		queryKey: ['fgs'],
		queryFn: async () => {
			try {
				const response = await fetch(
					'http://testservb.xx.co.jp/GX_PSYS_TEST2/transactions/GetFg',
				);

				if (!response.ok) {
					throw new Error(`HTTP status: ${response.status}`);
				}
				if (response.status === 400) {
					throw new Error(`HTTP status: ${response.status}`);
				}
				if (response.status === 404) {
					throw new Error(`HTTP status: ${response.status}`);
				}
				if (response.status === 500) {
					throw new Error(`HTTP status: ${response.status}`);
				}

				const data = await response.json();
				const parsedResponse = JSON.parse(data.responseJSON);
				const fgList: FG[] = JSON.parse(parsedResponse.fg);
				
				return fgList;

			} catch (error) {
				console.error('Fetch error:', error);
				throw error;
			}
		},
		staleTime: 5 * 60 * 1000,
		gcTime: 10 * 60 * 1000,
		refetchOnWindowFocus: false,
	});
};



/* ===== FILE: \ps-ps\src\features\randing\components\Message.tsx ===== */

/**
 * ホーム画面のメッセージエリアを定義
 * @returns
 */
export const Message = () => {
	return (
		<div className="isolate rounded-xl bg-gray-200/30 shadow-lg ring-1 ring-black/5 h-60 w-120 p-5">
			<h4>message:</h4>
			<p className="mt-2 text-red-600">
				Cautions when using : Don't upload information on list-regulated
				products under export-related laws and US technical information
				<br />
				利用における注意事項 :
				輸法該当技術・米国技術に該当する情報は登録してはならない
			</p>
		</div>
	);
};



/* ===== FILE: \ps-ps\src\features\randing\components\MotionButton.tsx ===== */

import { Link } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

type MotionButtonProps = {
	link: string;
	icon: LucideIcon;
	title: string;
	text: string;
	disabled: boolean;
	onClick?: () => void;
};

/**
 * ホーム画面の各システムへの遷移ボタンのUIを定義
 * link: 遷移先のpath
 * icon: ボタン上部のアイコン
 * title: 遷移先のシステム名
 * text: 遷移先のシステムの概要
 */
export const MotionButton: React.FC<MotionButtonProps> = ({
	link,
	icon: Icon,
	title,
	text,
	disabled, //ボタン制御
	onClick, // onclickイベント
}) => {
	return (
		<Link to={disabled ? '#' : link}>
			<motion.button
				className={cn(
					'isolate rounded-4xl w-60 h-90 p-8 shadow-lg ring-1 ring-black/10',
					disabled
						? 'bg-gray-200 cursor-not-allowed'
						: 'bg-white hover:ring-orange-400 hover:ring-3',
				)}
				whileHover={disabled ? undefined : { y: -5 }}
				onClick={onClick}
				disabled={disabled}
			>
				<div className="flex flex-col items-center justify-start h-full">
					<div className="p-5">
						<Icon size={80} className="text-gray-800" />
					</div>
					<div className="border-2 w-full border-gray-800" />
					<h3 className="text-2xl mt-3 text-gray-800">{title}</h3>
					<p className="text-left mt-3 text-gray-800">{text}</p>
				</div>
			</motion.button>
		</Link>
	);
};



/* ===== FILE: \ps-ps\src\features\randing\components\ProjectSelector.tsx ===== */

import { useMemo } from 'react';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { projects } from '@/features/randing/mocks/projects';
import { transformProjects } from '@/features/randing/utils/transformProjects';
import { useSelectedProjectStore } from '@/stores/useSelectedProjectStore';

export const ProjectSelector = () => {
	// プロジェクトの選択状態
	const { selectedProject, setSelectedProject } = useSelectedProjectStore();

	// プロジェクト整形
	const groupedProjects = useMemo(() => transformProjects(projects), []);

	// セレクト用オプション
	const selectOptions = useMemo(
		() =>
			groupedProjects.map((p) => ({
				value: p.projectId,
				label: p.projectNm,
			})),
		[groupedProjects],
	);

	// プロジェクト選択時に各情報をグローバルステートに設定
	const handleProjectSelect = (projectId: string) => {
		const project = groupedProjects.find((p) => p.projectId === projectId);
		if (project) {
			setSelectedProject({
				projectId: project.projectId,
				projectNm: project.projectNm,
				jobNos: project.jobNos,
				jobOrderNos: project.jobOrderNos,
			});
		}
	};
	return (
		<Select onValueChange={handleProjectSelect}>
			<SelectTrigger
				className={`mt-10 text-lg h-10! w-[300px] isolate shadow-lg ring-1 ring-black/10 border-0 ${
					!selectedProject ? 'bg-red-100' : ''
				}`}
			>
				<SelectValue placeholder="select a project" />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					{selectOptions.map((opt) => (
						<SelectItem key={opt.value} value={opt.value}>
							{opt.label}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	);
};



/* ===== FILE: \ps-ps\src\features\randing\utils\transformProjects.ts ===== */

type Project = {
	projectId: string;
	projectNm: string;
	jobNo: string;
	jobOrderNo: string;
};

type GroupedProject = {
	projectId: string;
	projectNm: string;
	jobNos: string[];
	jobOrderNos: string[];
};

// APIから取得したプロジェクトリストを整形
export const transformProjects = (projects: Project[]): GroupedProject[] => {
	const map = new Map<string, GroupedProject>();

	projects.forEach((p) => {
		if (!map.has(p.projectId)) {
			map.set(p.projectId, {
				projectId: p.projectId,
				projectNm: p.projectNm,
				jobNos: [p.jobNo],
				jobOrderNos: [p.jobOrderNo],
			});
		} else {
			const existing = map.get(p.projectId)!;
			if (!existing.jobNos.includes(p.jobNo)) {
				existing.jobNos.push(p.jobNo);
			}
			if (!existing.jobOrderNos.includes(p.jobOrderNo)) {
				existing.jobOrderNos.push(p.jobOrderNo);
			}
		}
	});

	return Array.from(map.values());
};



/* ===== FILE: \ps-ps\src\features\vendor-assignment\components\PageHeader.tsx ===== */

import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface PageHeaderProps {
	title: string;
	onBack: () => void;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title, onBack }) => (
	<div className="flex items-center gap-6">
		<Button
			size="sm"
			variant="outline"
			onClick={onBack}
			className="text-gray-800"
		>
			<ArrowLeft className="w-4 h-4" />
			Back
		</Button>
		<h2 className="text-lg font-semibold text-gray-800">{title}</h2>
	</div>
);



/* ===== FILE: \ps-ps\src\features\vendor-assignment\components\PipCardGrid.tsx ===== */

import { PipDataCard } from '@/components/Pip-data-card';
import type { Pip } from '@/types';
import { AlertCircle, Package, Trash2 } from 'lucide-react';

interface PipDetailPanelProps {
	pips: Pip[];
	isAipMode: boolean;
	onRemoveVendor: (pipCode: string, vendorId: string) => void;
	onRemovePip: (pipCode: string) => void;
}

/**
 * PIPカードグリッドコンポーネント
 * 選択されたPIPとその配下のベンダー情報をカード形式で表示する
 *
 * @param pips - 表示するPIPの配列
 * @param isAipMode - AIPモード（ベンダー割り当て）かどうか
 * @param onRemoveVendor - ベンダー削除時のコールバック
 * @param onRemovePip - PIP削除時のコールバック
 */

export const PipCardGrid: React.FC<PipDetailPanelProps> = ({
	pips,
	isAipMode,
	onRemoveVendor,
	onRemovePip,
}) => (
	<div className="bg-white rounded-lg shadow-sm border border-gray-300 flex flex-col py-4 px-8 h-[83%]">
		{/* How: h-[83%]は親コンポーネントの高さに対する相対値
		    Why not: 固定px値ではなく%を使用することで、異なる画面サイズでも適切に表示される */}
		<div className="h-full flex flex-col">
			<h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
				<Package size={20} />
				{/* How: pips.lengthが1より大きい場合のみ件数を表示し、
				    単数の場合はシンプルな表記にすることでUIをすっきりさせる */}
				{pips.length > 1 ? `選択されたPIP (${pips.length}件)` : '選択されたPIP'}
			</h2>

			{/* How: overflow-y-autoにより、PIPが多い場合でも
			    ヘッダーは固定したままコンテンツ部分のみスクロール可能 */}
			<div className="flex-1 space-y-4 overflow-y-auto">
				{pips.map((pip) => (
					<PipDataCard key={pip.code} variant="generatedItem" size="default">
						<PipDataCard.Header
							pipData={{
								code: pip.code,
								nickname: pip.nickname,
								type: 'pip',
							}}
							actions={[
								{
									id: 'remove',
									icon: <Trash2 size={16} />,
									/* How: onRemovePipに直接pip.codeを渡すことで、
									   どのPIPを削除するかを親コンポーネントで特定可能 */
									onClick: () => onRemovePip(pip.code),
									tooltip: 'PIPを削除',
									variant: 'danger',
								},
							]}
							metadata={{
								vendorCount: pip.vendors.length,
							}}
						/>
						{/* Why not: isAipModeでない場合（PIP表示モードなど）は
						    ベンダー情報を表示しない設計により、モードごとの表示を制御 */}
						{isAipMode && (
							<PipDataCard.Content
								items={pip.vendors.map((vendor) => ({
									...vendor,
									/* How: vendor.idをtoString()で文字列に変換
									   Why not: PipDataCardが文字列IDを期待するため、
									   数値や他の型のIDも安全に処理できるようにしている */
									id: vendor.id.toString(),
									displayName: vendor.name,
									/* How: vendorIdを別途保持することで、
									   削除時に元のID型（string/number）を維持 */
									vendorId: vendor.id,
								}))}
								renderItem={(vendor) => (
									<PipDataCard.Item
										actions={[
											{
												id: 'remove',
												icon: <Trash2 size={12} />,
												/* How: pip.codeとvendor.vendorIdの両方を渡すことで、
												   どのPIPのどのベンダーかを一意に特定可能 */
												onClick: () =>
													onRemoveVendor(pip.code, vendor.vendorId),
												tooltip: 'ベンダーを削除',
												variant: 'danger',
											},
										]}
									>
										<span className="text-sm">{vendor.displayName}</span>
									</PipDataCard.Item>
								)}
								/* How: ベンダーが未割り当ての場合の空状態表示
								   Why not: 単に空白にするのではなく、明確な指示を表示することで
								   ユーザーが次に何をすべきかを理解しやすくする */
								emptyState={{
									icon: <AlertCircle size={48} className="text-gray-300" />,
									title: 'まだベンダーが割り当てられていません',
									description:
										'左のテーブルからベンダーを選択して割り当ててください',
								}}
							/>
						)}
					</PipDataCard>
				))}
			</div>
		</div>
	</div>
);



/* ===== FILE: \ps-ps\src\features\vendor-assignment\components\VendorAssignment.tsx ===== */

import { Button } from '@/components/ui/button';
import { CircleCheck } from 'lucide-react';
import { useState } from 'react';
import { useVendorAssignment } from '../hooks/useVendorAssignment';
import type { VendorAssignmentProps } from '../types/types';
import { PageHeader } from './PageHeader';
import { PipCardGrid } from './PipCardGrid';
import { VendorSelectionPanel } from './VendorSelectionPanel';

export const VendorAssignment: React.FC<VendorAssignmentProps> = ({
	selectedPips,
	availableVendors,
	isAipMode,
	onPipsUpdate,
	onBack,
}) => {
	const [selectedVendorIds, setSelectedVendorIds] = useState<string[]>([]);

	const { assignVendors, removeVendor, removePip } = useVendorAssignment({
		selectedPips,
		onPipsUpdate,
	});

	return (
		<div className="h-screen bg-gray-100 p-6 overflow-hidden">
			<div className="flex justify-between items-center">
				{/* Backボタン */}
				<PageHeader
					title={isAipMode ? 'AIP生成' : 'PIPベンダー割り当て'}
					onBack={onBack}
				/>
				{/* Updateボタン */}
				<Button
					size="sm"
					variant="outline"
					// onClick={handleAipGeneration}
					// disabled={selectedCount === 0}
					className="flex items-center gap-2 h-8 px-3 bg-orange-500 hover:bg-orange-500/80 text-white hover:text-white cursor-pointer"
				>
					<CircleCheck className="w-4 h-4" />
					Update
				</Button>
			</div>

			<div className="max-w-10xl mx-auto h-full flex gap-4 mt-6">
				<div className="h-[83%] w-1/2">
					<VendorSelectionPanel
						vendors={availableVendors}
						selectedVendorIds={selectedVendorIds}
						onSelectionChange={setSelectedVendorIds}
						onAssign={assignVendors}
					/>
				</div>

				<div className="w-1/2">
					<PipCardGrid
						pips={selectedPips}
						isAipMode={isAipMode}
						onRemoveVendor={removeVendor}
						onRemovePip={removePip}
					/>
				</div>
			</div>
		</div>
	);
};



/* ===== FILE: \ps-ps\src\features\vendor-assignment\components\VendorSelectionPanel.tsx ===== */

import {
	type ColumnDef,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	useReactTable,
} from '@tanstack/react-table';
import { ArrowRight, CircleChevronRight, Search, Users } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { IndeterminateCheckbox } from '@/components/ui/IndeterminateCheckbox';
import { Input } from '@/components/ui/input';
import type { Vendor } from '@/types';

interface VendorSelectionPanelProps {
	vendors: Vendor[];
	selectedVendorIds: string[];
	onSelectionChange: (ids: string[]) => void;
	onAssign: (vendors: Vendor[]) => void;
}

export const VendorSelectionPanel: React.FC<VendorSelectionPanelProps> = ({
	vendors,
	selectedVendorIds,
	onSelectionChange,
	onAssign,
}) => {
	const [globalFilter, setGlobalFilter] = useState('');

	// How: ID配列をTanStack Tableのインデックスベース選択状態に変換
	// Why not: IDベースの管理ではなくインデックスベースを使う理由は、
	// TanStack Tableの内部実装に合わせることでパフォーマンスが向上するため
	const rowSelection = useMemo(() => {
		const selection: Record<string, boolean> = {};
		vendors.forEach((vendor, index) => {
			if (selectedVendorIds.includes(vendor.id)) {
				selection[index.toString()] = true;
			}
		});
		return selection;
	}, [vendors, selectedVendorIds]);

	const columns = useMemo<ColumnDef<Vendor>[]>(
		() => [
			{
				id: 'select',
				size: 40,
				header: ({ table }) => (
					<IndeterminateCheckbox
						checked={table.getIsAllPageRowsSelected()}
						indeterminate={table.getIsSomePageRowsSelected()}
						onChange={table.getToggleAllPageRowsSelectedHandler()}
					/>
				),
				cell: ({ row }) => (
					<IndeterminateCheckbox
						checked={row.getIsSelected()}
						onChange={row.getToggleSelectedHandler()}
					/>
				),
			},
			{
				accessorKey: 'name',
				header: 'ベンダー名',
				cell: ({ row }) => (
					<span className="text-gray-900 text-sm">{row.original.name}</span>
				),
			},
		],
		[],
	);

	const table = useReactTable({
		data: vendors,
		columns,
		state: { rowSelection, globalFilter },
		enableRowSelection: true,

		// How: TanStack Tableの選択状態更新をインターセプトし、
		// インデックスベースからIDベースに変換して親コンポーネントに通知
		onRowSelectionChange: (updater) => {
			const newSelection =
				typeof updater === 'function' ? updater(rowSelection) : updater;
			const selectedIds = Object.keys(newSelection)
				.filter((key) => newSelection[key])
				.map((index) => vendors[Number.parseInt(index)]?.id)
				.filter(Boolean);
			onSelectionChange(selectedIds);
		},
		onGlobalFilterChange: setGlobalFilter,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		globalFilterFn: 'includesString',
	});

	const handleAssign = () => {
		const selectedVendors = vendors.filter((vendor) =>
			selectedVendorIds.includes(vendor.id),
		);
		onAssign(selectedVendors);

		// Why not: 割り当て後も選択状態を維持しない理由は、
		// 同じベンダーの重複割り当てを防ぐため
		onSelectionChange([]);
	};

	return (
		<div className="bg-white rounded-lg border border-gray-300 flex flex-col shadow-sm py-4 px-8 h-full">
			<div>
				<h2 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
					<Users size={20} />
					未割り当てベンダー
				</h2>
				<div className="flex gap-4 mb-4">
					<div className="relative flex-1">
						<Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
						<Input
							placeholder="ベンダー名で検索..."
							value={globalFilter}
							onChange={(e) => setGlobalFilter(e.target.value)}
							className="pl-10 text-sm"
						/>
					</div>
					<Button
						onClick={handleAssign}
						disabled={selectedVendorIds.length === 0}
						className="flex items-center gap-2"
					>
						<CircleChevronRight size={16} />
						PIPに割り当て ({selectedVendorIds.length}件)
						<ArrowRight size={16} />
					</Button>
				</div>
			</div>

			<div className="text-sm text-gray-600 mb-2">
				{selectedVendorIds.length > 0
					? `${selectedVendorIds.length}件選択中`
					: `${vendors.length}件のベンダー`}
			</div>

			<div className="bg-white rounded-lg border border-gray-300 flex-1 overflow-auto">
				<table className="w-full">
					<thead className="bg-gray-50 sticky top-0">
						{table.getHeaderGroups().map((headerGroup) => (
							<tr key={headerGroup.id}>
								{headerGroup.headers.map((header) => (
									<th
										key={header.id}
										className="px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
										style={{ width: header.getSize() }}
									>
										{flexRender(
											header.column.columnDef.header,
											header.getContext(),
										)}
									</th>
								))}
							</tr>
						))}
					</thead>
					<tbody className="bg-white divide-y divide-gray-100">
						{table.getRowModel().rows.map((row) => (
							<tr
								key={row.id}
								className={`hover:bg-gray-50 transition-colors cursor-pointer ${
									row.getIsSelected() ? 'bg-blue-50' : ''
								}`}
								// Why not: チェックボックスだけでなく行全体をクリック可能にする理由は、
								// ユーザビリティ向上のため（特にタッチデバイスでの操作性）
								onClick={() => row.toggleSelected()}
							>
								{row.getVisibleCells().map((cell) => (
									<td key={cell.id} className="px-3 py-2 text-sm">
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



/* ===== FILE: \ps-ps\src\features\vendor-assignment\hooks\useVendorAssignment.ts ===== */

import { useCallback } from 'react';
import type { Vendor } from '@/types';
import type {
	UseVendorAssignmentProps,
	UseVendorAssignmentReturn,
} from '../types';

/**
 * ベンダー割り当て処理を管理するカスタムフック
 *
 * How: 選択された複数のPIPに対して、ベンダーの一括割り当て・削除・PIP自体の削除を行う
 * 状態管理は親コンポーネントに委譲し、このフックは更新ロジックのみを提供する
 */
export const useVendorAssignment = ({
	selectedPips,
	onPipsUpdate,
}: UseVendorAssignmentProps): UseVendorAssignmentReturn => {
	/**
	 * 選択されたベンダーをPIPに割り当てる
	 *
	 * How: 選択された全てのPIPに対して、同じベンダーセットを一括で追加する
	 * Why not: 重複チェックを行っていないのは、呼び出し元で既に割り当て済みベンダーを
	 *          除外したリストから選択しているため
	 */
	const assignVendors = useCallback(
		(vendors: Vendor[]) => {
			// How: Vendor型をVendor型に変換しているように見えるが、実際は
			// マスターデータのVendor型に、割り当て固有の情報（status, assignedDate）を追加している
			// Why not: 型名が同じなのは、importされているVendor型と
			//          このフック内で使用するVendor型が異なる定義のため（型の重複に注意）
			const newVendors: Vendor[] = vendors.map((vendor) => ({
				id: vendor.id,
				vendorNumber: vendor.vendorNumber,
				name: vendor.name,
				code: vendor.code,
				function: vendor.function,
				// How: 新規割り当て時は常に'active'ステータスで登録
				status: 'active' as const,
				// How: 割り当て日は現在日付のYYYY-MM-DD形式で記録
				assignedDate: new Date().toISOString().split('T')[0],
			}));

			// How: 全てのPIPに対して同じベンダーセットを追加する（一括割り当て）
			// Why not: map内でスプレッド演算子を使用しているため、
			//          各PIPの既存ベンダーリストは保持される
			const updatedPips = selectedPips.map((pip) => ({
				...pip,
				vendors: [...pip.vendors, ...newVendors],
			}));

			// How: 更新されたPIPリストを親コンポーネントに通知
			// Why not: 非同期処理やエラーハンドリングがないのは、
			//          このフックは純粋な状態更新ロジックのみを提供し、
			//          実際のAPI通信等は親コンポーネントの責務としているため
			onPipsUpdate(updatedPips);
		},
		[selectedPips, onPipsUpdate],
	);

	/**
	 * 特定のPIPから特定のベンダーを削除する
	 *
	 * How: pipCodeで対象PIPを特定し、そのPIPのvendorsリストから
	 *      vendorIdに一致するベンダーを除外する
	 */
	const removeVendor = useCallback(
		(pipCode: string, vendorId: string) => {
			const updatedPips = selectedPips.map((pip) =>
				// How: 対象PIPのみvendorsを更新し、他のPIPはそのまま返す
				pip.code === pipCode
					? {
							...pip,
							// How: filterでvendorIdが一致しないものだけを残す
							vendors: pip.vendors.filter((vendor) => vendor.id !== vendorId),
						}
					: pip,
			);

			onPipsUpdate(updatedPips);
		},
		[selectedPips, onPipsUpdate],
	);

	/**
	 * PIPリストから特定のPIPを削除する
	 *
	 * How: pipCodeに一致するPIPを配列から完全に除外する
	 * Why not: 削除確認は呼び出し元で行うため、このメソッドは
	 *          確認なしで即座に削除を実行する
	 */

	const removePip = useCallback(
		(pipCode: string) => {
			const updatedPips = selectedPips.filter((pip) => pip.code !== pipCode);
			onPipsUpdate(updatedPips);
		},
		[selectedPips, onPipsUpdate],
	);

	return {
		assignVendors,
		removeVendor,
		removePip,
	};
};



/* ===== FILE: \ps-ps\src\features\vendor-assignment\hooks\useVendors.ts ===== */

import { useQuery } from '@tanstack/react-query';
import type { VendorResponse } from '../types/types';

export const useVendors = (fgCode: string | null) => {
	return useQuery<VendorResponse[]>({
		queryKey: ['vendors', fgCode],
		queryFn: async (): Promise<VendorResponse[]> => {
			try {
				const response = await fetch(
					'http://testservb.xx.co.jp/GX_PSYS_TEST2/transactions/GetVendorList',
					{
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							'Cache-Control': 'no-cache',
						},
						cache: 'no-store',
						body: JSON.stringify({
							requestJSON: JSON.stringify({
								fgCode: fgCode?.charAt(0),
							}),
						}),
					},
				);

				if (!response.ok) {
					throw new Error(`HTTP status: ${response.status}`);
				}

				const data = await response.json();

				if (!data?.responseJSON) {
					throw new Error('responseJSON is undefined');
				}

				const parsedResponse = JSON.parse(data.responseJSON);

				console.warn(
					`Status Code: ${parsedResponse?.statusCode} Message: ${parsedResponse?.statusMessage}`,
				);

				if (!parsedResponse?.vendor) {
					throw new Error('parsedResponse.vendor is undefined');
				}

				const vendorList = JSON.parse(parsedResponse.vendor);

				if (!Array.isArray(vendorList)) {
					throw new Error('parsed vendorList is not an array');
				}

				return vendorList;
			} catch (error) {
				console.error('Fetch error:', error);
				throw error;
			}
		},
		enabled: !!fgCode, // fgCodeがあるときだけ実行
		staleTime: 5 * 60 * 1000,
		gcTime: 10 * 60 * 1000,
		refetchOnWindowFocus: false,
	});
};

// if (!response.ok) {
// 					throw new Error(`HTTP status: ${response.status}`);
// 				}

// 				const data = await response.json();

// 				if (!data?.responseJSON) {
// 					throw new Error('responseJSON is undefined');
// 				}

// 				const parsedResponse = JSON.parse(data.responseJSON);

// 				console.warn(
// 					`Status Code: ${parsedResponse?.statusCode} Message: ${parsedResponse?.statusMessage}`,
// 				);

// 				if (!parsedResponse?.pip) {
// 					throw new Error('parsedResponse.pip is undefined');
// 				}

// 				const pipList = JSON.parse(parsedResponse.pip);

// 				if (!Array.isArray(pipList)) {
// 					throw new Error('parsed pipList is not an array');
// 				}

// 				return pipList;



/* ===== FILE: \ps-ps\src\features\vendor-assignment\index.tsx ===== */

/**
 * Vendor Assignment Feature
 *
 * PIPに対するベンダー割り当て機能を提供
 * - 特定のPIPへのベンダー割り当て
 * - AIPモードでの複数PIP管理
 * - ItemTableからの連携
 */

export { VendorAssignment } from './components/VendorAssignment';
export type { VendorAssignmentProps } from './types/types';




/* ===== FILE: \ps-ps\src\features\vendor-assignment\types\types.ts ===== */

import type { Pip, Vendor } from '@/types';

/**
 * VendorAssignmentコンポーネントのProps
 */
export interface VendorAssignmentProps {
	/** 選択されたPIPリスト */
	selectedPips: Pip[];
	/** 割り当て可能なベンダーリスト */
	availableVendors: Vendor[];
	/** AIPモードかどうか */
	isAipMode: boolean;
	/** PIPデータ更新時のコールバック */
	onPipsUpdate: (pips: Pip[]) => void;
	/** 戻るボタンクリック時のコールバック */
	onBack: () => void;
}

/**
 * useVendorAssignmentフックのProps
 */
export interface UseVendorAssignmentProps {
	selectedPips: Pip[];
	onPipsUpdate: (pips: Pip[]) => void;
}

/**
 * useVendorAssignmentフックの戻り値
 */
export interface UseVendorAssignmentReturn {
	/** ベンダーを割り当てる */
	assignVendors: (vendors: Vendor[]) => void;
	/** ベンダーを削除する */
	removeVendor: (pipCode: string, vendorId: string) => void;
	/** PIPを削除する */
	removePip: (pipCode: string) => void;
}

export interface VendorResponse {
  aipPsysVendorId: string;
  vendorName: string;
  vendorCode: string;
}


/* ===== FILE: \ps-ps\src\features\vendor-assignment\utils\fetchVendors.ts ===== */

// // api/fetchVendors.ts
// export const fetchVendors = async (fgCode: string) => {
//     const response = await fetch(
//         'http://testservb.xx.co.jp/GX_PSYS_TEST2/transactions/GetVendorList',
//         {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Cache-Control': 'no-cache',
//             },
//             cache: 'no-store',
//             body: JSON.stringify({
//                 requestJSON: JSON.stringify({
//                     fgCode: fgCode.charAt(0),
//                 }),
//             }),
//         }
//     );

//     if (!response.ok) {
//         throw new Error(`HTTP status: ${response.status}`);
//     }

//     const data = await response.json();

//     if (!data?.responseJSON) {
//         throw new Error('responseJSON is undefined');
//     }

//     const parsedResponse = JSON.parse(data.responseJSON);

//     if (!parsedResponse?.pip) {
//         throw new Error('parsedResponse.pip is undefined');
//     }

//     const vendorList = JSON.parse(parsedResponse.pip);

//     if (!Array.isArray(vendorList)) {
//         throw new Error('parsed vendorList is not an array');
//     }

//     return vendorList;
// }


/* ===== FILE: \ps-ps\src\features\vendor-assignment\utils\transformVendorResponseToVendorData.ts ===== */

import type { Vendor } from '@/types';
import type { VendorResponse } from '../types/types';

export const transformVendorResponseToVendorData = (
  response: VendorResponse[]
): Vendor[] => {
  return response.map((item) => ({
    id: item.aipPsysVendorId,
    name: item.vendorName,
    code: item.vendorCode.trim(), // 末尾の空白を除去
  }));
};


/* ===== FILE: \ps-ps\src\lib\utils.ts ===== */

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}



/* ===== FILE: \ps-ps\src\main.tsx ===== */

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/index.css';
import { routeTree } from './routeTree.gen';

// Routerの作成
const router = createRouter({
	routeTree,
	defaultPreload: 'intent',
});

// 型安全のための登録
declare module '@tanstack/react-router' {
	interface Register {
		router: typeof router;
	}
}

// React Queryのクライアント
const queryClient = new QueryClient();

// アプリのルート
const App = () => {
	return (
		<StrictMode>
			<QueryClientProvider client={queryClient}>
				<RouterProvider router={router} />
			</QueryClientProvider>
		</StrictMode>
	);
};

const rootElement = document.getElementById('root');
if (rootElement) {
	createRoot(rootElement).render(<App />);
} else {
	console.error('Root element not found');
}



/* ===== FILE: \ps-ps\src\mocks\costElementData.ts ===== */

/**
 * Cost Element マスターデータ
 * @deprecated masterData.tsを使用してください
 */

// masterData.tsからの再エクスポート（後方互換性のため）
import {
	costElementMap,
	getCostElementName as getCostElementNameFromMaster,
} from './masterData';

export const costElementNames: Record<string, string> = Object.fromEntries(
	Array.from(costElementMap.entries()).map(([code, option]) => [
		code,
		option.description || option.label,
	]),
);

/** @deprecated masterData.tsのgetCostElementNameを使用してください */
export const getCostElementName = getCostElementNameFromMaster;



/* ===== FILE: \ps-ps\src\mocks\ibsCodeData.ts ===== */

/**
 * IBS Code マスターデータ
 * @deprecated masterData.tsを使用してください
 */

// masterData.tsからの再エクスポート（後方互換性のため）
import {
	getIbsCodeName as getIbsCodeNameFromMaster,
	ibsCodeMap,
} from './masterData';

export const ibsCodeNames: Record<string, string> = Object.fromEntries(
	Array.from(ibsCodeMap.entries()).map(([code, option]) => [
		code,
		option.description || option.label,
	]),
);

/** @deprecated masterData.tsのgetIbsCodeNameを使用してください */
export const getIbsCodeName = getIbsCodeNameFromMaster;



/* ===== FILE: \ps-ps\src\mocks\masterData.ts ===== */

/**
 * 統一マスターデータ
 * 選択肢データとマッピングを一元管理
 */

import type { SelectOption } from '../types/common';

/**
 * 拡張SelectOption - 説明付き
 */
export interface MasterOption extends SelectOption {
	/** 詳細説明（日本語） */
	description?: string;
}

/**
 * Cost Element マスターデータ
 */
export const costElementMaster: MasterOption[] = [
	{ code: '6C11', label: '土質調査', description: '土質調査' },
	{
		code: '6H13',
		label: 'S&T 熱交換機 U字管式熱交',
		description: 'S&T 熱交換機 U字管式熱交',
	},
	{
		code: '6H31',
		label: 'プレート式熱交換器 プレート式熱交換器',
		description: 'プレート式熱交換器 プレート式熱交換器',
	},
	{
		code: '6H41',
		label: '廃熱ボイラー 水管式 廃熱ボイラー',
		description: '廃熱ボイラー 水管式 廃熱ボイラー',
	},
	{
		code: '6H42',
		label: '廃熱ボイラー 煙管式 廃熱ボイラー',
		description: '廃熱ボイラー 煙管式 廃熱ボイラー',
	},
	{ code: '6H43', label: '-', description: '-' },
	{ code: '6H44', label: '-', description: '-' },
	{ code: '6H53', label: '-', description: '-' },
	{
		code: '6H98',
		label: 'その他熱交換機_その他',
		description: 'その他熱交換機_その他',
	},
	{
		code: '6J11',
		label: 'プロジェクトマネジメント',
		description: 'プロジェクトマネジメント',
	},
	{
		code: '6J31',
		label: 'アドミニストレーション',
		description: 'アドミニストレーション',
	},
	{ code: '6K45', label: '-', description: '-' },
	{
		code: '6L31',
		label: 'ドームルーフタンク 完成品タンク',
		description: 'ドームルーフタンク 完成品タンク',
	},
	{
		code: '6L32',
		label: 'ドームルーフタンク ノックダウンタンク',
		description: 'ドームルーフタンク ノックダウンタンク',
	},
	{ code: '6L36', label: '-', description: '-' },
	{
		code: '6L42',
		label: 'フラットルーフ・タンク ノックダウンタンク',
		description: 'フラットルーフ・タンク ノックダウンタンク',
	},
	{
		code: '6L61',
		label: '二重殻タンク 完成品タンク',
		description: '二重殻タンク 完成品タンク',
	},
	{ code: '6V11', label: '塔', description: '塔' },
	{
		code: '6V13',
		label: '塔 トレイ･サポート',
		description: '塔 トレイ･サポート',
	},
	{ code: '6V31', label: '反応器 反応器', description: '反応器 反応器' },
	{ code: '6V45', label: '-', description: '-' },
	{ code: '6V46', label: '-', description: '-' },
	{ code: '6V62', label: '-', description: '-' },
	{
		code: '6V81',
		label: 'スクラバー スクラバー',
		description: 'スクラバー スクラバー',
	},
	{ code: '6V95', label: '-', description: '-' },

	{ code: '6F22', label: 'Equipment - Mechanical', description: '機械設備' },
	{ code: '6F23', label: 'Equipment - Electrical', description: '制御装置' },
	{ code: '6G11', label: 'Piping - Main Lines', description: 'ポンプ設備' },
	{ code: '6G12', label: 'Piping - Branch Lines', description: '制御システム' },
	{
		code: '7A01',
		label: 'Instrumentation - Control',
		description: 'センサー機器',
	},
	{
		code: '7A02',
		label: 'Instrumentation - Safety',
		description: 'フィルター設備',
	},
	{ code: '8B15', label: 'Structural - Steel', description: '電源装置' },
	{ code: '8B16', label: 'Structural - Concrete', description: '計測機器' },
	{ code: '9C33', label: 'Civil - Foundation', description: '冷却設備' },
	{ code: '9D44', label: 'Civil - Underground', description: '事務用品' },
	{ code: '5E11', label: 'Basic Components', description: '基本部品' },
	{ code: '5E12', label: 'Assembly Components', description: '組立部品' },
	{ code: '4D21', label: 'Auxiliary Equipment', description: '補助機器' },
	{ code: '4D22', label: 'Control Components', description: '制御部品' },
	{ code: '3C31', label: 'Electronic Parts', description: '電子部品' },
	{ code: '3C32', label: 'Mechanical Parts', description: '機械部品' },
	{ code: '12A1', label: 'Lubrication System', description: '潤滑装置' },
	{ code: '12B2', label: 'Wiring Equipment', description: '配線機器' },
];

/**
 * IBS Code マスターデータ
 */
export const ibsCodeMaster: MasterOption[] = [
	{ code: 'V11', label: 'Ammonia Converter', description: 'Ammonia Converter' },
	{
		code: 'V13',
		label: 'Secondary Reformer',
		description: 'Secondary Reformer',
	},
	{ code: 'V15', label: 'Reactor', description: 'Reactor' },
	{
		code: 'V21',
		label: 'CO2 Stripper / Absorber',
		description: 'CO2 Stripper / Absorber',
	},
	{ code: 'V22', label: 'General Tower', description: 'General Tower' },
	{ code: 'V32', label: 'HP Vessel', description: 'HP Vessel' },
	{ code: 'V33', label: 'General Vessel', description: 'General Vessel' },
	{
		code: 'V40',
		label: 'S&T Heat Exchanger',
		description: 'S&T Heat Exchanger',
	},
	{ code: 'V41', label: 'Waste Heat Boiler', description: 'Waste Heat Boiler' },
	{
		code: 'V42',
		label: 'HP & Cr-Mo Heat Exchanger',
		description: 'HP & Cr-Mo Heat Exchanger',
	},
	{
		code: 'V43',
		label: 'Syn Loop Heat Exchanger',
		description: 'Syn Loop Heat Exchanger',
	},
	{ code: 'V44', label: 'Urea Stripper', description: 'Urea Stripper' },
	{
		code: 'V46',
		label: 'Urea Grade S&T Heat Exchanger',
		description: 'Urea Grade S&T Heat Exchanger',
	},
	{
		code: 'V47',
		label: 'General S&T Heat Exchanger',
		description: 'General S&T Heat Exchanger',
	},
	{
		code: 'V51',
		label: 'Ammonia Storage Tank',
		description: 'Ammonia Storage Tank',
	},
	{ code: 'V61', label: 'Shop Tank', description: 'Shop Tank' },
	{ code: 'V80', label: 'Filter', description: 'Filter' },
	{ code: 'V81', label: 'Cartridge Filter', description: 'Cartridge Filter' },
	{
		code: 'V92',
		label: 'Plate Heat Exchanger',
		description: 'Plate Heat Exchanger',
	},
	{ code: 'V93', label: 'Heater & Chiller', description: 'Heater & Chiller' },
	{ code: 'VB1', label: 'Silencer', description: 'Silencer' },
	{ code: 'VC2', label: 'Steam Ejector', description: 'Steam Ejector' },
	{ code: 'VX1', label: 'Vacuum System', description: 'Vacuum System' },
	{
		code: 'VX2',
		label: 'Granulation Equipment',
		description: 'Granulation Equipment',
	},

	{ code: 'F11', label: 'Process Equipment - Primary', description: '制御弁' },
	{
		code: 'F12',
		label: 'Process Equipment - Secondary',
		description: '安全弁',
	},
	{ code: 'G21', label: 'Utility Systems - Power', description: '主ポンプ' },
	{ code: 'G22', label: 'Utility Systems - Water', description: '制御盤' },
	{ code: 'H31', label: 'Control Systems - DCS', description: '温度センサー' },
	{ code: 'H32', label: 'Control Systems - SIS', description: '圧力センサー' },
	{
		code: 'J41',
		label: 'Infrastructure - Buildings',
		description: '電源ユニット',
	},
	{ code: 'J42', label: 'Infrastructure - Roads', description: '計測ユニット' },
	{
		code: 'K51',
		label: 'Support Systems - Maintenance',
		description: '冷却ユニット',
	},
	{
		code: 'K52',
		label: 'Support Systems - Operations',
		description: '一般機器',
	},
	{ code: 'A12', label: 'Lubrication Systems', description: '潤滑システム' },
	{ code: 'B22', label: 'Foundation Components', description: '基礎部品' },
	{ code: 'C33', label: 'Assembly Parts', description: '組立品' },
	{ code: 'D44', label: 'Auxiliary Parts', description: '補助品' },
	{ code: 'E55', label: 'Control Parts', description: '制御品' },
	{ code: 'L66', label: 'Electronic Parts', description: '電子品' },
];

/**
 * Cost Element検索マップ（高速検索用）
 */
export const costElementMap = new Map(
	costElementMaster.map((option) => [option.code, option]),
);

/**
 * IBS Code検索マップ（高速検索用）
 */
export const ibsCodeMap = new Map(
	ibsCodeMaster.map((option) => [option.code, option]),
);

/**
 * Cost Element名称を取得
 */
export const getCostElementName = (code: string): string => {
	const option = costElementMap.get(code);
	return option?.description || option?.label || `コスト${code}`;
};

/**
 * IBS Code名称を取得
 */
export const getIbsCodeName = (code: string): string => {
	const option = ibsCodeMap.get(code);
	return option?.description || option?.label || `部品${code}`;
};

/**
 * Cost Element英語ラベルを取得
 */
export const getCostElementLabel = (code: string): string => {
	const option = costElementMap.get(code);
	return option?.label || `Cost Element ${code}`;
};

/**
 * IBS Code英語ラベルを取得
 */
export const getIbsCodeLabel = (code: string): string => {
	const option = ibsCodeMap.get(code);
	return option?.label || `IBS Code ${code}`;
};

// SelectOption形式でのエクスポート（後方互換性用）
export const costElementOptions: SelectOption[] = costElementMaster.map(
	({ code, label }) => ({ code, label }),
);
export const ibsCodeOptions: SelectOption[] = ibsCodeMaster.map(
	({ code, label }) => ({ code, label }),
);



/* ===== FILE: \ps-ps\src\mocks\selectOptions.ts ===== */

/**
 * @deprecated masterData.tsを使用してください
 */

// masterData.tsからの再エクスポート（後方互換性のため）
export {
	costElementOptions,
	ibsCodeOptions,
} from './masterData';

// Map型の再エクスポート
import { costElementMap, ibsCodeMap } from './masterData';
export const costElementCodeMap = new Map(
	Array.from(costElementMap.entries()).map(([code, option]) => [
		code,
		option.label,
	]),
);
export { ibsCodeMap };



/* ===== FILE: \ps-ps\src\routes\__root.tsx ===== */

import { createRootRoute, Outlet } from '@tanstack/react-router';

/**
 * すべての画面のエントリーポイントとなる
 */
export const Route = createRootRoute({
	component: () => <Outlet />,
})



/* ===== FILE: \ps-ps\src\routes\home.tsx ===== */

import { createFileRoute } from '@tanstack/react-router';
import { CalendarDays, ShoppingCart } from 'lucide-react';
import { useEffect } from 'react';
import { Topbar } from '@/components/Topbar';
import { Message } from '@/features/randing/components/Message';
import { MotionButton } from '@/features/randing/components/MotionButton';
import { ProjectSelector } from '@/features/randing/components/ProjectSelector';
import { useAlertStore } from '@/stores/useAlartStore';
import { useSelectedProjectStore } from '@/stores/useSelectedProjectStore';
import { resetGrobalState } from '@/utils/resetGrobalState';

/**
 * ホーム画面のルーティング
 * 背景のスタイルと各オブジェクトのレイアウトを定義する
 */
const RandingPage = () => {
	// アラートの状態
	const { setIsAlertVisible } = useAlertStore();

	// ホーム画面に遷移時、localStorageを初期化
	useEffect(() => {
		// 選択状態の初期化
		resetGrobalState();
		// アラート非表示
		setIsAlertVisible(false);
	}, [setIsAlertVisible]);

	// プロジェクトの選択状態
	const { selectedProject } = useSelectedProjectStore();

	return (
		<div className="relative min-h-screen overflow-hidden">
			{/* ヘッダー */}
			<div className="absolute top-0 z-50 w-full">
				<Topbar path="p-sys" />
			</div>
			{/* 背景レイヤー */}
			<div className="absolute inset-0 z-0">
				<div className="h-3/5 bg-white" />
				<div className="h-2/5 bg-gradient-to-b from-orange-300 to-orange-500" />
			</div>
			{/* メッセージ */}
			<div className="absolute top-30 right-30 z-20">
				<Message />
			</div>

			<div className="absolute z-10 inset-30">
				{/* PJセレクトボックス */}
				<div>
					<h3 className="text-5xl text-gray-800">Select a project</h3>
					<div className="mt-5">
						<ProjectSelector />
					</div>

					<div className="mt-6 space-y-2">
						<div>
							<span className="font-semibold">Order :</span>{' '}
							{selectedProject ? (
								selectedProject.jobOrderNos.join(', ')
							) : (
								<span>Not selected</span>
							)}
						</div>
						<div>
							<span className="font-semibold">Job No. :</span>{' '}
							{selectedProject ? (
								selectedProject.jobNos.join(', ')
							) : (
								<span>Not selected</span>
							)}
						</div>
					</div>
				</div>
				{/* ボタン */}
				<div className="z-10 flex justify-center gap-30 mt-10">
					{/* P-Sys */}
					<MotionButton
						link="/p-sys/item-assignment"
						icon={ShoppingCart}
						title="購入品の登録"
						text="P-Sysで購入品の登録/編集/削除、PIP(仮引合Pkg)、PIPへのベンダーの割り当てを行います。"
						disabled={!selectedProject}
					/>
					{/* MSR */}
					<MotionButton
						link="/msr/msr-unit-selector"
						icon={CalendarDays}
						title="調達管理"
						text="MSRで購入品の調達管理を行います。"
						disabled={!selectedProject}
					/>
				</div>
			</div>
		</div>
	);
};

export const Route = createFileRoute('/home')({
	component: RandingPage,
});



/* ===== FILE: \ps-ps\src\routes\msr\milestone\$MSRMngCode.tsx ===== */

import { MilestoneGrid } from '@/features/milestone/components/MilestoneGrid';
import { SaveButton } from '@/features/milestone/components/SaveButton';
import * as wjcCore from "@mescius/wijmo";
import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';

export const Route = createFileRoute('/msr/milestone/$MSRMngCode')({
  component: () => {
    const [collectionView, setCollectionView] =
        useState<wjcCore.CollectionView | null>(null);
    // saveボタンの表示状態
    const [showSave, setShowSave] = useState<boolean>(false);
      
    return (
      <div className="relative h-screen flex flex-col">
        {showSave && (
          // saveボタン
          <div className="fixed bottom-20 right-30 z-50">
            <SaveButton
            collectionView={collectionView}
            requiredFields={["Status"]}
            />
          </div>
        )}
        {/* マイルストンgrid */}
        <div className="w-[100vw]">
          <MilestoneGrid
            collectionView={collectionView}
            setCollectionView={setCollectionView}
            setShowSave={setShowSave}
          />
        </div>
      </div>
    );
  }
})


/* ===== FILE: \ps-ps\src\routes\msr\milestone\route.tsx ===== */

import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/msr/milestone')({
  component: () => <Outlet />,
})


/* ===== FILE: \ps-ps\src\routes\msr\msr-unit-selector.tsx ===== */

import { FilterBar } from '@/features/msr-unit-selector/components/FilterBar';
import { UnitCardList } from '@/features/msr-unit-selector/components/UnitCardList';
import type { ScheduleUnit } from '@/features/msr-unit-selector/types/schedule-unit';
import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';

// サンプルMSR管理単位
const sampleScheduleUnits: ScheduleUnit[] = [
  {
    id: "CTRL-000001",
    name: "Changi T5-EPC",
    startDate: new Date("2023-10-01"),
    endDate: new Date("2024-03-31"),
    status: "進行中",
    assignees: ["田中太郎", "佐藤健太"],
    tags: ["高優先度", "電子部品"],
    order: ["433500", "573160"],
    function: ["B:Process"],
  },
  {
    id: "CTRL-000002",
    name: "T221(機械)",
    startDate: new Date("2023-11-15"),
    endDate: new Date("2024-05-20"),
    status: "進行中",
    assignees: ["佐藤花子", "鈴木雄太"],
    tags: ["中優先度", "機械部品"],
    order: ["43340A"],
    function: ["M:Machinery"],
  },
  {
    id: "CTRL-000003",
    name: "T221(電気)",
    startDate: new Date("2023-09-01"),
    endDate: new Date("2024-02-28"),
    status: "遅延",
    assignees: ["鈴木一郎", "高橋直子", "伊藤誠"],
    tags: ["高優先度", "原材料"],
    order: ["533860"],
    function: ["E:Electrical"],
  },
  {
    id: "CTRL-000004",
    name: "sample1",
    startDate: new Date("2023-12-01"),
    endDate: new Date("2024-04-30"),
    status: "未開始",
    assignees: ["山田次郎"],
    tags: ["低優先度", "包装"],
    order: ["563461"],
    function: ["S:Constrction"],
  },
  {
    id: "CTRL-000005",
    name: "sample2",
    startDate: new Date("2024-01-15"),
    endDate: new Date("2024-07-15"),
    status: "完了",
    assignees: ["高橋真理", "中村健太"],
    tags: ["中優先度", "IT機器"],
    order: ["335315"],
    function: ["B:Process"],
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
    const [selectedOrderFilter, setSelectedOrderFilter] = useState<string | null>(
      null,
    );
    const [selectedFunctionFilter, setSelectedFunctionFilter] = useState<
      string | null
    >(null);

    // 選択されたオーダーとファンクションに基づいてMSR管理単位をフィルタリング
    const filteredUnits = sampleScheduleUnits.filter((unit) => {
      const orderMatch =
        !selectedOrderFilter || unit.order.includes(selectedOrderFilter);
      const functionMatch =
        !selectedFunctionFilter || unit.function.includes(selectedFunctionFilter);
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
  }
})


/* ===== FILE: \ps-ps\src\routes\msr\route.tsx ===== */

import { Message, Topbar } from '@/components';
import { createFileRoute, Outlet } from '@tanstack/react-router';

/**
 * MSRシステムのルート定義
 * "/msr" パスに対応し、MSR関連の画面のエントリーポイントとなる
 */
export const Route = createFileRoute('/msr')({
	component: () => {
		return (
			<div className="flex flex-col h-screen">
				{/* ヘッダー */}
				<div className="sticky top-0 z-50 shadow-sm">
					<Topbar path='msr' />
					<Message />
				</div>
				<div className="flex flex-1">
					{/* メインコンテンツ */}
					<main className="flex-1">
						<Outlet />
					</main>
				</div>
			</div>
		);
	}
});



/* ===== FILE: \ps-ps\src\routes\p-sys\item-assignment.tsx ===== */

import { GenericEditableTable } from '@/components';
import { PipCardArea } from '@/features/item-assignment/components/PipCardArea';
import { getItemColumns } from '@/features/item-management/columns/getItemColumns';
import { ItemTableControls } from '@/features/item-management/components/ItemTableControls';
import { ITEM_FILTER_PLACEHOLDERS } from '@/features/item-management/constants/item-filter-placeholders';
import { useItems } from '@/features/item-management/hooks/useItems';
import { styleItemCell } from '@/features/item-management/utils/styleItemCell';
import { transformItemResponseToItem } from '@/features/item-management/utils/transformItemResponseToItem';
import { SplashWrapper } from '@/features/psys-randing/components';
import { cn } from '@/lib/utils';
import { usePipGenerationModeStore } from '@/stores/usePipGenerationModeStore';
import { useSelectedFGStore } from '@/stores/useSelectedFgStore';
import { useSelectedJobNoStore } from '@/stores/useSelectedJobNoStore';
import type { Item } from '@/types';
import { createFileRoute } from '@tanstack/react-router';
import type { Table } from '@tanstack/react-table';
import { useEffect, useState } from 'react';

/**
 * 購入品管理画面のルーティング
 * 編集機能付きの購入品テーブル、PIPカードエリアのレイアウトを定義する
 */
const ItemAssignment: React.FC = () => {
	// 購入品リスト取得
	const [items, setItems] = useState<Item[]>([]);
	// チェック列の表示制御（編集モードでは非表示）
	const [showItemCheckbox, setShowItemCheckbox] = useState(false);
	// 編集モードの ON/OFF
	const [isEditingItem, setIsEditingItem] = useState(false);
	// 編集中の差分管理（id ごとの部分更新）
	const [itemDirty, setItemDirty] = useState<Record<string, Partial<Item>>>({});
	// 行の選択状態（割当対象）
	const [itemSelection, setItemSelection] = useState<Record<string, boolean>>(
		{},
	);
	// 現在チェックされている行数
	const [selectedCount, setSelectedCount] = useState(0);
	// 割当確定後のレコード一覧（チェック→割当ボタン押下で確定）
	const [committedItems, setCommittedItems] = useState<Item[]>([]);
	// 現在フィルターで表示されている件数
	const [filteredCount, setFilteredCount] = useState(0);
	// React Tableのインスタンス フィルタークリア用に保持
	const [tableInstance, setTableInstance] = useState<Table<Item> | null>(null);
	// フィルタ表示状態
	const [showFilters, setShowFilters] = useState(true);

	// PIP生成モードの状態
	const pipGenerationMode = usePipGenerationModeStore(
		(state) => state.pipGenerationMode,
	);

	// プロジェクトの選択状態
	const { selectedJobNo } = useSelectedJobNoStore();
	const { selectedFG } = useSelectedFGStore();

	// 購入品リスト取得
	const fgCode = selectedFG?.fgCode ?? null;
	const {data: itemsResponse, isLoading, isError} = useItems(selectedJobNo, fgCode);
	// console.log(`itemsResponse:${JSON.stringify(itemsResponse)}`);

	useEffect(() => {
		if (itemsResponse) {
			const transformedItems = transformItemResponseToItem(itemsResponse);
			setItems(transformedItems);
		}
	}, [itemsResponse, selectedFG, selectedJobNo])

	return (
		<SplashWrapper>
			{/* 購入品管理画面 */}
			<div className="h-screen bg-gray-100 p-6 overflow-hidden">
				{/* タイトル・ボタン群 */}
				<ItemTableControls
					data={items}
					setData={setItems}
					isEditing={isEditingItem}
					setIsEditing={setIsEditingItem}
					dirtyCells={itemDirty}
					setDirtyCells={setItemDirty}
					rowSelection={itemSelection}
					setRowSelection={setItemSelection}
					showCheckbox={showItemCheckbox}
					setShowCheckbox={setShowItemCheckbox}
					selectedCount={selectedCount}
					setCommittedItems={setCommittedItems}
					tableInstance={tableInstance}
					showFilters={showFilters}
					setShowFilters={setShowFilters}
				/>
				{/* 件数表示（フィルター後/全体） */}
				<span className="ml-auto text-sm text-gray-600">
					count: {filteredCount} / {items.length}
				</span>
				<div className="max-w-10xl mx-auto h-full flex gap-4">
					<div
						className={cn(
							'h-[80%]',
							pipGenerationMode !== 'display' ? 'w-1/2' : 'w-full',
						)}
					>
						{/* 購入品テーブル(汎用テーブルを使用、編集機能付き) */}
						<GenericEditableTable
							keyField="itemNo"
							data={items}
							columns={getItemColumns(pipGenerationMode !== 'display')} // PIP生成モード時は一部列を非表示
							isEditing={isEditingItem}
							showCheckbox={!isEditingItem}
							showFilters={showFilters}
							dirtyCells={itemDirty}
							setDirtyCells={setItemDirty}
							rowSelection={itemSelection}
							setRowSelection={setItemSelection}
							onSelectedRowCountChange={setSelectedCount}
							onFilteredCountChange={setFilteredCount} // ✅ フィルター件数を受け取る
							renderCell={styleItemCell}
							customFilterPlaceholders={ITEM_FILTER_PLACEHOLDERS}
							numericFilterColumns={['qty']}
							onTableReady={setTableInstance} // table インスタンスを受け取りフィルター操作用に保存
							isLoading={isLoading}
						/>
					</div>
					{/* 一覧表示のみの場合以外は、右側にPIPカードエリアを表示 */}
					{pipGenerationMode !== 'display' && (
						<div className="w-1/2">
							<PipCardArea committedItems={committedItems} />
						</div>
					)}
				</div>
			</div>
		</SplashWrapper>
	);
};

export const Route = createFileRoute('/p-sys/item-assignment')({
	component: ItemAssignment,
});



/* ===== FILE: \ps-ps\src\routes\p-sys\pips.tsx ===== */

import { PipDetail } from '@/features/pip-management/components/PipDetail';
import { PipTable } from '@/features/pip-management/components/PipTable';
import { usePips } from '@/features/pip-management/hooks/usePips';
import { transformPipResponseToPipData } from '@/features/pip-management/utils/transformPipResponseToPipData';
import { useSelectedFGStore } from '@/stores/useSelectedFgStore';
import { useSelectedJobNoStore } from '@/stores/useSelectedJobNoStore';
import type { Pip, PipData } from '@/types';
import { createFileRoute } from '@tanstack/react-router';
import type { Table } from '@tanstack/react-table';
import { useEffect, useState } from 'react';
import { PipTableControls } from '../../features/pip-management/components/PipTableControls';

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
	const { selectedFG } = useSelectedFGStore();

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

export const Route = createFileRoute('/p-sys/pips')({
	component: Pips,
});



/* ===== FILE: \ps-ps\src\routes\p-sys\route.tsx ===== */

import { Message, Topbar } from '@/components';
import { Toast } from '@/components/Toast';
import { Sidebar } from '@/features/psys-randing/components';
import { usePipGenerationModeStore } from '@/stores/usePipGenerationModeStore';
import { createFileRoute, Outlet, useLocation } from '@tanstack/react-router';
import { Toaster } from 'sonner';

export const Route = createFileRoute('/p-sys')({
    component: () => {
        const pathname = useLocation({
            select: (location) => location.pathname,
        });
        const exceptPathName = pathname.replace('/p-sys/', '');

        // Sidebar を表示するパス一覧
        const sidebarVisiblePaths = ['item-assignment', 'pips'];

        // pipGenerationMode を取得
        const pipGenerationMode = usePipGenerationModeStore(
            (state) => state.pipGenerationMode
        );

        // Sidebar 表示判定: パスが対象かつモードが 'display' のときのみ表示
        const showSidebar =
            sidebarVisiblePaths.includes(exceptPathName) &&
            pipGenerationMode === 'display';

        return (
            <div className="flex flex-col h-screen">
                <div className="sticky top-0 z-50 shadow-sm">
                    <Topbar path="/p-sys/item-assignment" />
                    <Message />
                </div>
                <div className="flex flex-1">
                    {showSidebar && <Sidebar />}
                    <main className="flex-1 overflow-auto">
                        <Outlet />
                        <Toast />
                    </main>
                    <Toaster />
                </div>
            </div>
        );
    },
});



/* ===== FILE: \ps-ps\src\routes\p-sys\vendor-assignment.tsx ===== */

import { VendorAssignment } from '@/features/vendor-assignment';
import { useVendors } from '@/features/vendor-assignment/hooks/useVendors';
import { transformVendorResponseToVendorData } from '@/features/vendor-assignment/utils/transformVendorResponseToVendorData';
import { useSelectedFGStore } from '@/stores/useSelectedFgStore';
import type { Pip, Vendor } from '@/types';
import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';

// Search Paramsの型定義
interface VendorAssignmentSearch {
	selectedPips: string;
	mode?: 'pip' | 'aip';
}

export const Route = createFileRoute('/p-sys/vendor-assignment')({
	// Search Paramsのバリデーション
	validateSearch: (search: Record<string, unknown>): VendorAssignmentSearch => {
		return {
			selectedPips: search.selectedPips as string,
			mode: (search.mode as 'pip' | 'aip') || 'pip',
		};
	},

	// Loaderの依存関係を明示
	loaderDeps: ({ search }) => ({ search }),

	// データの事前取得
	loader: async ({ deps }) => {
		const { search } = deps;
		const selectedPips: Pip[] = JSON.parse(search.selectedPips);

		// 利用可能なベンダーを計算
		// const assignedVendorIds = new Set(
		// 	selectedPips.flatMap((pip) => pip.vendors.map((v) => v.id)),
		// );

		// const availableVendors = vendors.filter(
		// 	(vendor) => !assignedVendorIds.has(vendor.id),
		// );

		return {
			selectedPips,
			// availableVendors,
			isAipMode: search.mode === 'aip',
			// searchも返す（後で使用するため）
			search,
		};
	},

	component: VendorAssignmentRoute,
});

function VendorAssignmentRoute() {
	const [vendors, setVendorsData] = useState<Vendor[]>([]);
	// const { selectedPips, availableVendors, isAipMode, search } =
	// 	Route.useLoaderData();
	const { selectedPips, isAipMode, search } = Route.useLoaderData();
	const navigate = Route.useNavigate();

	const { selectedFG } = useSelectedFGStore();
	const fgCode = selectedFG?.fgCode ?? null;
	const { data: vendorsResponse = [], isError } = useVendors(fgCode);
	console.log(`vendorsResponse:${JSON.stringify(vendorsResponse)}`);
	useEffect(() => {
		if (vendorsResponse) {
			const transformedVendors: Vendor[] =
				transformVendorResponseToVendorData(vendorsResponse);
			setVendorsData(transformedVendors);
		} else {
			setVendorsData([]);
		}
	}, [vendorsResponse]);

	const assignedVendorIds = new Set(
		selectedPips.flatMap((pip) => pip.vendors.map((v) => v.id)),
	);

	const availableVendors = vendors.filter(
		(vendor) => !assignedVendorIds.has(vendor.id),
	);

	const handlePipsUpdate = (updatedPips: Pip[]) => {
		navigate({
			to: '.',
			search: {
				...search,
				selectedPips: JSON.stringify(updatedPips),
			},
			replace: true,
		});
	};

	const handleBack = () => {
		navigate({ to: '/p-sys/pips' });
	};

	return (
		<VendorAssignment
			selectedPips={selectedPips}
			availableVendors={availableVendors}
			isAipMode={isAipMode}
			onPipsUpdate={handlePipsUpdate}
			onBack={handleBack}
		/>
	);
}


/* ===== FILE: \ps-ps\src\routeTree.gen.ts ===== */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { Route as rootRouteImport } from './routes/__root'
import { Route as HomeRouteImport } from './routes/home'
import { Route as PSysRouteRouteImport } from './routes/p-sys/route'
import { Route as MsrRouteRouteImport } from './routes/msr/route'
import { Route as PSysVendorAssignmentRouteImport } from './routes/p-sys/vendor-assignment'
import { Route as PSysPipsRouteImport } from './routes/p-sys/pips'
import { Route as PSysItemAssignmentRouteImport } from './routes/p-sys/item-assignment'
import { Route as MsrMsrUnitSelectorRouteImport } from './routes/msr/msr-unit-selector'
import { Route as MsrMilestoneRouteRouteImport } from './routes/msr/milestone/route'
import { Route as MsrMilestoneMSRMngCodeRouteImport } from './routes/msr/milestone/$MSRMngCode'

const HomeRoute = HomeRouteImport.update({
  id: '/home',
  path: '/home',
  getParentRoute: () => rootRouteImport,
} as any)
const PSysRouteRoute = PSysRouteRouteImport.update({
  id: '/p-sys',
  path: '/p-sys',
  getParentRoute: () => rootRouteImport,
} as any)
const MsrRouteRoute = MsrRouteRouteImport.update({
  id: '/msr',
  path: '/msr',
  getParentRoute: () => rootRouteImport,
} as any)
const PSysVendorAssignmentRoute = PSysVendorAssignmentRouteImport.update({
  id: '/vendor-assignment',
  path: '/vendor-assignment',
  getParentRoute: () => PSysRouteRoute,
} as any)
const PSysPipsRoute = PSysPipsRouteImport.update({
  id: '/pips',
  path: '/pips',
  getParentRoute: () => PSysRouteRoute,
} as any)
const PSysItemAssignmentRoute = PSysItemAssignmentRouteImport.update({
  id: '/item-assignment',
  path: '/item-assignment',
  getParentRoute: () => PSysRouteRoute,
} as any)
const MsrMsrUnitSelectorRoute = MsrMsrUnitSelectorRouteImport.update({
  id: '/msr-unit-selector',
  path: '/msr-unit-selector',
  getParentRoute: () => MsrRouteRoute,
} as any)
const MsrMilestoneRouteRoute = MsrMilestoneRouteRouteImport.update({
  id: '/milestone',
  path: '/milestone',
  getParentRoute: () => MsrRouteRoute,
} as any)
const MsrMilestoneMSRMngCodeRoute = MsrMilestoneMSRMngCodeRouteImport.update({
  id: '/$MSRMngCode',
  path: '/$MSRMngCode',
  getParentRoute: () => MsrMilestoneRouteRoute,
} as any)

export interface FileRoutesByFullPath {
  '/msr': typeof MsrRouteRouteWithChildren
  '/p-sys': typeof PSysRouteRouteWithChildren
  '/home': typeof HomeRoute
  '/msr/milestone': typeof MsrMilestoneRouteRouteWithChildren
  '/msr/msr-unit-selector': typeof MsrMsrUnitSelectorRoute
  '/p-sys/item-assignment': typeof PSysItemAssignmentRoute
  '/p-sys/pips': typeof PSysPipsRoute
  '/p-sys/vendor-assignment': typeof PSysVendorAssignmentRoute
  '/msr/milestone/$MSRMngCode': typeof MsrMilestoneMSRMngCodeRoute
}
export interface FileRoutesByTo {
  '/msr': typeof MsrRouteRouteWithChildren
  '/p-sys': typeof PSysRouteRouteWithChildren
  '/home': typeof HomeRoute
  '/msr/milestone': typeof MsrMilestoneRouteRouteWithChildren
  '/msr/msr-unit-selector': typeof MsrMsrUnitSelectorRoute
  '/p-sys/item-assignment': typeof PSysItemAssignmentRoute
  '/p-sys/pips': typeof PSysPipsRoute
  '/p-sys/vendor-assignment': typeof PSysVendorAssignmentRoute
  '/msr/milestone/$MSRMngCode': typeof MsrMilestoneMSRMngCodeRoute
}
export interface FileRoutesById {
  __root__: typeof rootRouteImport
  '/msr': typeof MsrRouteRouteWithChildren
  '/p-sys': typeof PSysRouteRouteWithChildren
  '/home': typeof HomeRoute
  '/msr/milestone': typeof MsrMilestoneRouteRouteWithChildren
  '/msr/msr-unit-selector': typeof MsrMsrUnitSelectorRoute
  '/p-sys/item-assignment': typeof PSysItemAssignmentRoute
  '/p-sys/pips': typeof PSysPipsRoute
  '/p-sys/vendor-assignment': typeof PSysVendorAssignmentRoute
  '/msr/milestone/$MSRMngCode': typeof MsrMilestoneMSRMngCodeRoute
}
export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/msr'
    | '/p-sys'
    | '/home'
    | '/msr/milestone'
    | '/msr/msr-unit-selector'
    | '/p-sys/item-assignment'
    | '/p-sys/pips'
    | '/p-sys/vendor-assignment'
    | '/msr/milestone/$MSRMngCode'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/msr'
    | '/p-sys'
    | '/home'
    | '/msr/milestone'
    | '/msr/msr-unit-selector'
    | '/p-sys/item-assignment'
    | '/p-sys/pips'
    | '/p-sys/vendor-assignment'
    | '/msr/milestone/$MSRMngCode'
  id:
    | '__root__'
    | '/msr'
    | '/p-sys'
    | '/home'
    | '/msr/milestone'
    | '/msr/msr-unit-selector'
    | '/p-sys/item-assignment'
    | '/p-sys/pips'
    | '/p-sys/vendor-assignment'
    | '/msr/milestone/$MSRMngCode'
  fileRoutesById: FileRoutesById
}
export interface RootRouteChildren {
  MsrRouteRoute: typeof MsrRouteRouteWithChildren
  PSysRouteRoute: typeof PSysRouteRouteWithChildren
  HomeRoute: typeof HomeRoute
}

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/home': {
      id: '/home'
      path: '/home'
      fullPath: '/home'
      preLoaderRoute: typeof HomeRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/p-sys': {
      id: '/p-sys'
      path: '/p-sys'
      fullPath: '/p-sys'
      preLoaderRoute: typeof PSysRouteRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/msr': {
      id: '/msr'
      path: '/msr'
      fullPath: '/msr'
      preLoaderRoute: typeof MsrRouteRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/p-sys/vendor-assignment': {
      id: '/p-sys/vendor-assignment'
      path: '/vendor-assignment'
      fullPath: '/p-sys/vendor-assignment'
      preLoaderRoute: typeof PSysVendorAssignmentRouteImport
      parentRoute: typeof PSysRouteRoute
    }
    '/p-sys/pips': {
      id: '/p-sys/pips'
      path: '/pips'
      fullPath: '/p-sys/pips'
      preLoaderRoute: typeof PSysPipsRouteImport
      parentRoute: typeof PSysRouteRoute
    }
    '/p-sys/item-assignment': {
      id: '/p-sys/item-assignment'
      path: '/item-assignment'
      fullPath: '/p-sys/item-assignment'
      preLoaderRoute: typeof PSysItemAssignmentRouteImport
      parentRoute: typeof PSysRouteRoute
    }
    '/msr/msr-unit-selector': {
      id: '/msr/msr-unit-selector'
      path: '/msr-unit-selector'
      fullPath: '/msr/msr-unit-selector'
      preLoaderRoute: typeof MsrMsrUnitSelectorRouteImport
      parentRoute: typeof MsrRouteRoute
    }
    '/msr/milestone': {
      id: '/msr/milestone'
      path: '/milestone'
      fullPath: '/msr/milestone'
      preLoaderRoute: typeof MsrMilestoneRouteRouteImport
      parentRoute: typeof MsrRouteRoute
    }
    '/msr/milestone/$MSRMngCode': {
      id: '/msr/milestone/$MSRMngCode'
      path: '/$MSRMngCode'
      fullPath: '/msr/milestone/$MSRMngCode'
      preLoaderRoute: typeof MsrMilestoneMSRMngCodeRouteImport
      parentRoute: typeof MsrMilestoneRouteRoute
    }
  }
}

interface MsrMilestoneRouteRouteChildren {
  MsrMilestoneMSRMngCodeRoute: typeof MsrMilestoneMSRMngCodeRoute
}

const MsrMilestoneRouteRouteChildren: MsrMilestoneRouteRouteChildren = {
  MsrMilestoneMSRMngCodeRoute: MsrMilestoneMSRMngCodeRoute,
}

const MsrMilestoneRouteRouteWithChildren =
  MsrMilestoneRouteRoute._addFileChildren(MsrMilestoneRouteRouteChildren)

interface MsrRouteRouteChildren {
  MsrMilestoneRouteRoute: typeof MsrMilestoneRouteRouteWithChildren
  MsrMsrUnitSelectorRoute: typeof MsrMsrUnitSelectorRoute
}

const MsrRouteRouteChildren: MsrRouteRouteChildren = {
  MsrMilestoneRouteRoute: MsrMilestoneRouteRouteWithChildren,
  MsrMsrUnitSelectorRoute: MsrMsrUnitSelectorRoute,
}

const MsrRouteRouteWithChildren = MsrRouteRoute._addFileChildren(
  MsrRouteRouteChildren,
)

interface PSysRouteRouteChildren {
  PSysItemAssignmentRoute: typeof PSysItemAssignmentRoute
  PSysPipsRoute: typeof PSysPipsRoute
  PSysVendorAssignmentRoute: typeof PSysVendorAssignmentRoute
}

const PSysRouteRouteChildren: PSysRouteRouteChildren = {
  PSysItemAssignmentRoute: PSysItemAssignmentRoute,
  PSysPipsRoute: PSysPipsRoute,
  PSysVendorAssignmentRoute: PSysVendorAssignmentRoute,
}

const PSysRouteRouteWithChildren = PSysRouteRoute._addFileChildren(
  PSysRouteRouteChildren,
)

const rootRouteChildren: RootRouteChildren = {
  MsrRouteRoute: MsrRouteRouteWithChildren,
  PSysRouteRoute: PSysRouteRouteWithChildren,
  HomeRoute: HomeRoute,
}
export const routeTree = rootRouteImport
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()



/* ===== FILE: \ps-ps\src\stores\useAlartStore.ts ===== */

import { create } from 'zustand';

type AlertType = 'success' | 'error' | 'info' | 'warning';

interface AlertMessage {
  id: string; // UUIDやユニークな文字列
  text: string;
}

interface AlertState {
  isAlertVisible: boolean;
  alertType: AlertType;
  messages: AlertMessage[];
  showAlert: (type: AlertType, messages: AlertMessage[]) => void;
  setIsAlertVisible: (visible: boolean) => void;
}

export const useAlertStore = create<AlertState>((set) => ({
  isAlertVisible: false,
  alertType: 'info',
  messages: [],
  showAlert: (type, messages) =>
    set({ isAlertVisible: true, alertType: type, messages }),
  setIsAlertVisible: (visible) => set({ isAlertVisible: visible }),
}));



/* ===== FILE: \ps-ps\src\stores\useFgsStore.ts ===== */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// P-Sysで選択するFGの型
export type FG = {
	fgCode: string;
	fgDescription: string;
};

type StoreState = {
	fgs: FG[];
	setFgs: (fgs: FG[]) => void;
};

/**
 * P-SysでAPIから取得したFGマスタ一覧をglobal stateで管理
 */
export const useFgsStore = create<StoreState>()(
	persist(
		(set) => ({
			fgs: [],
			setFgs: (fgs) => set({ fgs }),
		}),
		{
			name: 'fgs-storage', // 永続化(localStorage保存)
		},
	),
);



/* ===== FILE: \ps-ps\src\stores\useIsSearchTriggeredStore.ts ===== */

import { create } from 'zustand';

/**
 * Display by Selection ボタンの押下状態を管理するストア
 * - triggerState: 'none' | 'search' | 'research' のいずれか
 * - triggerSearch: 検索をトリガー（'search' に設定）
 * - triggerResearch: 再検索をトリガー（'research' に設定）
 * - resetSearchTrigger: 状態を 'none' に戻す（検索完了後など）
 */

type TriggerState = 'none' | 'search' | 'research';

type SearchTriggerStore = {
	triggerState: TriggerState;
	triggerSearch: () => void;
	triggerResearch: () => void;
	resetSearchTrigger: () => void;
};

export const useIsSearchTriggeredStore = create<SearchTriggerStore>((set) => ({
	triggerState: 'none',
	triggerSearch: () => set({ triggerState: 'search' }),
	triggerResearch: () => set({ triggerState: 'research' }),
	resetSearchTrigger: () => set({ triggerState: 'none' }),
}));



/* ===== FILE: \ps-ps\src\stores\usePipGenerationModeStore.ts ===== */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * 購入品管理/PIP生成画面のモード
 * display: 購入品管理画面でテーブルのみ表示
 * generation: PIP生成モード
 * edit: PIP編集モード
 * copy: PIP複製モード
 */
type pipGenerationModeType = 'display' | 'generation' | 'edit' | 'copy';

type PipGenerationModeStore = {
	pipGenerationMode: pipGenerationModeType;
	setPipGenerationMode: (
		next:
			| pipGenerationModeType
			| ((current: pipGenerationModeType) => pipGenerationModeType),
	) => void;
};

/**
 * 購入品管理/PIP生成画面のモードのglobal state(デフォルトはdisplay)
 */
export const usePipGenerationModeStore = create<PipGenerationModeStore>()(
	persist(
		(set) => ({
			pipGenerationMode: 'display',
			setPipGenerationMode: (next) =>
				set((state) => ({
					pipGenerationMode:
						typeof next === 'function' ? next(state.pipGenerationMode) : next,
				})),
		}),
		{
			name: 'pipGenerationMode-storage', // 永続化(localStorage保存)
		},
	),
);



/* ===== FILE: \ps-ps\src\stores\usePipsStore.ts ===== */

import { create } from 'zustand';

type StoreState = {
    isPipFetchError: boolean;
    setIsPipFetchError: (p:boolean) => void;
    shouldFetchPips: boolean;
    setShouldFetchPips: (f:boolean) => void;
};

/**
 * P-SysでAPIから取得したFGマスタ一覧をglobal stateで管理
 */
export const usePipsStore = create<StoreState>()(
        (set) => ({
            isPipFetchError: false,
            setIsPipFetchError: (p) => set({ isPipFetchError: p }),
            shouldFetchPips: false,
            setShouldFetchPips: (f) => set({ shouldFetchPips: f }),
        })
);



/* ===== FILE: \ps-ps\src\stores\useSelectedFgStore.ts ===== */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { FG } from './useFgsStore';

type StoreState = {
	selectedFG: FG | null;
	setSelectedFG: (fg: FG | null) => void;
};

/**
 * P-Sysサイドバーで選択したFGをglobal stateで管理
 */
export const useSelectedFGStore = create<StoreState>()(
	persist(
		(set) => ({
			selectedFG: null,
			setSelectedFG: (fg) => set({ selectedFG: fg }),
		}),
		{
			name: 'selectedFG-storage', // 永続化(localStorage保存)
		},
	),
);



/* ===== FILE: \ps-ps\src\stores\useSelectedJobNoStore.ts ===== */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type StoreState = {
	selectedJobNo: string;
	setSelectedJobNo: (selectedJobNo: string) => void;
};

/**
 * P-Sysサイドバーで選択したJob No.をglobal stateで管理
 */
export const useSelectedJobNoStore = create<StoreState>()(
	persist(
		(set) => ({
			selectedJobNo: '',
			setSelectedJobNo: (selectedJobNo) => set({ selectedJobNo }),
		}),
		{
			name: 'selectedJobNo-storage', // 永続化(localStorage保存)
		},
	),
);



/* ===== FILE: \ps-ps\src\stores\useSelectedProjectStore.ts ===== */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// 選択プロジェクト
type SelectedProject = {
	projectId: string;
	projectNm: string;
	jobNos: string[];
	jobOrderNos: string[];
};

type StoreState = {
	selectedProject: SelectedProject | null;
	setSelectedProject: (project: SelectedProject | null) => void;
};

/**
 * home画面で選択するプロジェクトの選択状態をglobal stateで管理
 */

export const useSelectedProjectStore = create<StoreState>()(
	persist(
		(set) => ({
			selectedProject: null,
			setSelectedProject: (selectedProject) => set({ selectedProject }),
		}),
		{
			name: 'selectedProject-storage', // 永続化(localStorage保存)
		},
	),
);



/* ===== FILE: \ps-ps\src\styles\index.css ===== */

@import url("https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Noto+Sans:ital,wght@0,100..900;1,100..900&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Hachi+Maru+Pop&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Zen+Maru+Gothic&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Oswald:wght@200..700&family=Savate:ital,wght@1,700&display=swap");

@import "tailwindcss";
@import "tw-animate-css";

body {
	font-family: "Noto Sans JP", sans-serif;
	font-weight: 500;
	height: 100%;
	overflow: hidden;
}

@custom-variant dark (&:is(.dark *));

@theme inline {
	--font-logo: "Zen Maru Gothic", sans-serif;
	--radius-sm: calc(var(--radius) - 4px);
	--radius-md: calc(var(--radius) - 2px);
	--radius-lg: var(--radius);
	--radius-xl: calc(var(--radius) + 4px);
	--color-background: var(--background);
	--color-foreground: var(--foreground);
	--color-card: var(--card);
	--color-card-foreground: var(--card-foreground);
	--color-popover: var(--popover);
	--color-popover-foreground: var(--popover-foreground);
	--color-primary: var(--primary);
	--color-primary-foreground: var(--primary-foreground);
	--color-secondary: var(--secondary);
	--color-secondary-foreground: var(--secondary-foreground);
	--color-muted: var(--muted);
	--color-muted-foreground: var(--muted-foreground);
	--color-accent: var(--accent);
	--color-accent-foreground: var(--accent-foreground);
	--color-destructive: var(--destructive);
	--color-border: var(--border);
	--color-input: var(--input);
	--color-ring: var(--ring);
	--color-chart-1: var(--chart-1);
	--color-chart-2: var(--chart-2);
	--color-chart-3: var(--chart-3);
	--color-chart-4: var(--chart-4);
	--color-chart-5: var(--chart-5);
	--color-sidebar: var(--sidebar);
	--color-sidebar-foreground: var(--sidebar-foreground);
	--color-sidebar-primary: var(--sidebar-primary);
	--color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
	--color-sidebar-accent: var(--sidebar-accent);
	--color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
	--color-sidebar-border: var(--sidebar-border);
	--color-sidebar-ring: var(--sidebar-ring);
	--color-muted-indigo: #5452dc;
}

:root {
	--radius: 0.625rem;
	--background: oklch(1 0 0);
	--foreground: oklch(0.145 0 0);
	--card: oklch(1 0 0);
	--card-foreground: oklch(0.145 0 0);
	--popover: oklch(1 0 0);
	--popover-foreground: oklch(0.145 0 0);
	--primary: oklch(0.205 0 0);
	--primary-foreground: oklch(0.985 0 0);
	--secondary: oklch(0.97 0 0);
	--secondary-foreground: oklch(0.205 0 0);
	--muted: oklch(0.97 0 0);
	--muted-foreground: oklch(0.556 0 0);
	--accent: oklch(0.97 0 0);
	--accent-foreground: oklch(0.205 0 0);
	--destructive: oklch(0.577 0.245 27.325);
	--border: oklch(0.922 0 0);
	--input: oklch(0.922 0 0);
	--ring: oklch(0.708 0 0);
	--chart-1: oklch(0.646 0.222 41.116);
	--chart-2: oklch(0.6 0.118 184.704);
	--chart-3: oklch(0.398 0.07 227.392);
	--chart-4: oklch(0.828 0.189 84.429);
	--chart-5: oklch(0.769 0.188 70.08);
	--sidebar: oklch(0.985 0 0);
	--sidebar-foreground: oklch(0.145 0 0);
	--sidebar-primary: oklch(0.205 0 0);
	--sidebar-primary-foreground: oklch(0.985 0 0);
	--sidebar-accent: oklch(0.97 0 0);
	--sidebar-accent-foreground: oklch(0.205 0 0);
	--sidebar-border: oklch(0.922 0 0);
	--sidebar-ring: oklch(0.708 0 0);
}

.dark {
	--background: oklch(0.145 0 0);
	--foreground: oklch(0.985 0 0);
	--card: oklch(0.205 0 0);
	--card-foreground: oklch(0.985 0 0);
	--popover: oklch(0.205 0 0);
	--popover-foreground: oklch(0.985 0 0);
	--primary: oklch(0.922 0 0);
	--primary-foreground: oklch(0.205 0 0);
	--secondary: oklch(0.269 0 0);
	--secondary-foreground: oklch(0.985 0 0);
	--muted: oklch(0.269 0 0);
	--muted-foreground: oklch(0.708 0 0);
	--accent: oklch(0.269 0 0);
	--accent-foreground: oklch(0.985 0 0);
	--destructive: oklch(0.704 0.191 22.216);
	--border: oklch(1 0 0 / 10%);
	--input: oklch(1 0 0 / 15%);
	--ring: oklch(0.556 0 0);
	--chart-1: oklch(0.488 0.243 264.376);
	--chart-2: oklch(0.696 0.17 162.48);
	--chart-3: oklch(0.769 0.188 70.08);
	--chart-4: oklch(0.627 0.265 303.9);
	--chart-5: oklch(0.645 0.246 16.439);
	--sidebar: oklch(0.205 0 0);
	--sidebar-foreground: oklch(0.985 0 0);
	--sidebar-primary: oklch(0.488 0.243 264.376);
	--sidebar-primary-foreground: oklch(0.985 0 0);
	--sidebar-accent: oklch(0.269 0 0);
	--sidebar-accent-foreground: oklch(0.985 0 0);
	--sidebar-border: oklch(1 0 0 / 10%);
	--sidebar-ring: oklch(0.556 0 0);
}

@layer base {
	* {
		@apply border-border outline-ring/50;
	}
	body {
		@apply bg-background text-foreground;
	}
}

/* Toastで使用 */
@keyframes progress {
  from {
    width: 100%;
  }
  to {
    width: 0%;
  }
}



/* ===== FILE: \ps-ps\src\types\common.ts ===== */

/**
 * 共通型定義
 * ItemTable、VendorAssignment、PipTableで共有される型定義
 */

/**
 * テーブルカラム定義のジェネリック型
 * @template T - データの型
 */
export interface TableColumn<T = Record<string, unknown>> {
	/** カラムID */
	id: string;
	/** カラムヘッダー名 */
	header: string;
	/** データアクセサーキー */
	accessorKey: keyof T;
	/** カラム幅 */
	size?: number;
	/** 最小幅 */
	minSize?: number;
	/** 最大幅 */
	maxSize?: number;
}

/**
 * 選択変更ハンドラーの型
 * @template T - 選択アイテムのID型（通常はnumberまたはstring）
 */
export type SelectionChangeHandler<T = number> = (selectedIds: T[]) => void;

/**
 * 削除ハンドラーの型
 */
export type RemovalHandler = (itemId: string, subItemId: number) => void;

/**
 * チェックボックスのProps
 */
export interface CheckboxProps {
	/** チェック状態 */
	checked?: boolean;
	/** 不確定状態 */
	indeterminate?: boolean;
	/** 変更時のコールバック */
	onChange?: (checked: boolean) => void;
	/** 無効状態 */
	disabled?: boolean;
	/** アクセシビリティラベル */
	'aria-label'?: string;
}

/**
 * 統一アイテムデータ
 * Item, PIPItem, Itemを統合した型
 */
export interface Item {
	// /** アイテム内部キー */
	itemSurKey?: number;
	/** Job番号 */
	jobNo?: string;
	// /** Function Groupコード */
	fg?: string;
	/** アイテム番号 */
	itemNo: string;
	/** コアアイテム番号 */
	coreItemNo: string;
	/** アイテム名 */
	itemName: string;
	/** 数量 */
	qty: number;
	/** PIP未割当数量 */
	itemRestQty: number;
	// /** ソートキー */
	itemSortKey?: number;
	/** Cost Element */
	costElement: string;
	/** IBS Code */
	ibsCode: string;
	/** PIPコード（実際に割り当てられた場合） */
	pipCode?: string;
	/** 所属PIP */
	belongsToPip?: string;
	/** PIP内アイテムインデックス */
	pipItemIndex?: number;
	/** PIP割り当てステータス */
	itemAssignmentStatus?: string;
}

/**
 * 統一ベンダーデータ
 */
export interface Vendor {
	/** ベンダーID */
	id: string;
	/** ベンダー番号 */
	vendorNumber?: number;
	/** ベンダー名 */
	name: string;
	/** ベンダーコード */
	code: string;
	/** 機能分類 */
	function?: string;
	/** 備考 */
	notes?: string;
}

/**
 * 統一PIPデータ
 * Pip, PIPを統合した型
 */
export interface Pip {
	/** PIPコード */
	code: string;
	/** ニックネーム */
	nickname: string;
	/** 配下アイテムリスト */
	items: Item[];
	/** 配下ベンダーリスト */
	vendors: Vendor[];
}

/**
 * 統一PIPデータコンテナ
 */
export interface PipData {
	/** PIPリスト */
	pips: Pip[];
}

/**
 * テーブル行データ（階層構造用）
 */
export interface TableRow {
	/** 行ID */
	id: string;
	/** 行タイプ */
	type: 'pip' | 'item' | 'vendor';
	/** PIPデータ（PIP行の場合） */
	pip?: Pip;
	/** アイテムデータ（アイテム行の場合） */
	item?: Item;
	/** ベンダーデータ（ベンダー行の場合） */
	vendor?: Vendor;
	/** 親PIPコード */
	pipCode?: string;
	/** 親行ID */
	parentId?: string;
}

/**
 * 選択オプションの基本インターフェース
 */
export interface SelectOption {
	code: string;
	label: string;
}



/* ===== FILE: \ps-ps\src\types\index.ts ===== */

export * from './common';
export * from './Topbar';




/* ===== FILE: \ps-ps\src\types\pipDataCard.ts ===== */

/**
 * PipDataCard 型定義
 */

import type { ReactNode } from 'react';

/**
 * PIP基本情報
 */
export interface PipData {
	/** PIPコード */
	code: string;
	/** 表示名 */
	nickname: string;
	/** PIPタイプ */
	type?: 'pip' | 'generated';
}

/**
 * 表示アイテムのベース型
 */
export interface BaseDisplayItem {
	/** 一意識別子 */
	id: string;
	/** 表示名 */
	displayName: string;
}

/**
 * PipItemCard用データ
 */
export interface ItemData extends BaseDisplayItem {
	/** アイテム番号 */
	itemNo: string;
	/** アイテム名 */
	itemName: string;
	/** コスト要素 */
	costElement: string;
	/** IBSコード */
	ibsCode: string;
	/** 数量 */
	qty?: number;
}

/**
 * PipVendorCard用データ
 */
export interface VendorData extends BaseDisplayItem {
	/** ベンダー番号 */
	vendorNumber: number;
	/** ベンダー名 */
	name: string;
}

/**
 * カラーバリエーション
 */
export type PipCardVariant = 'item' | 'vendor' | 'generatedItem';

/**
 * サイズバリエーション
 */
export type PipCardSize = 'compact' | 'default' | 'comfortable';

/**
 * アクションバリアント
 */
export type ActionVariant = 'default' | 'danger' | 'ghost';

/**
 * カードアクション設定
 */
export interface CardAction {
	/** アクションID */
	id: string;
	/** アイコン */
	icon: ReactNode;
	/** ツールチップ */
	tooltip?: string;
	/** 無効状態 */
	disabled?: boolean;
	/** ローディング状態 */
	loading?: boolean;
	/** クリックハンドラ */
	onClick: () => void;
	/** バリアント */
	variant?: ActionVariant;
}

/**
 * 空状態設定
 */
export interface EmptyStateConfig {
	/** アイコン */
	icon?: ReactNode;
	/** タイトル */
	title: string;
	/** 説明文 */
	description?: string;
	/** アクション */
	action?: ReactNode;
}

/**
 * インライン編集設定
 */
export interface InlineEditConfig {
	/** 編集可能フラグ */
	enabled: boolean;
	/** 変更時コールバック */
	onTitleChange: (newTitle: string) => void;
	/** プレースホルダー */
	placeholder?: string;
	/** バリデーション関数 */
	validation?: (value: string) => boolean;
}

/**
 * PipDataCard Props
 */
export interface PipDataCardProps extends React.HTMLAttributes<HTMLDivElement> {
	/** カラーバリエーション */
	variant?: PipCardVariant;
	/** サイズ */
	size?: PipCardSize;
	/** 子要素 */
	children: ReactNode;
}

/**
 * PipDataCardHeader Props
 */
export interface PipDataCardHeaderProps {
	/** PIPデータ */
	pipData: PipData;
	/** ヘッダーアクション */
	actions?: CardAction[];
	/** インライン編集設定 */
	editable?: InlineEditConfig;
	/** メタデータ表示 */
	metadata?: {
		itemCount?: number;
		vendorCount?: number;
	};
}

/**
 * PipDataCardContent Props
 */
export interface PipDataCardContentProps<
	T extends BaseDisplayItem = BaseDisplayItem,
> {
	/** アイテムリスト */
	items: T[];
	/** アイテムレンダラー */
	renderItem: (item: T, index: number) => ReactNode;
	/** 空状態設定 */
	emptyState: EmptyStateConfig;
	/** 最大高さ */
	maxHeight?: string | number;
	/** スクロール可能フラグ */
	scrollable?: boolean;
	/** キー抽出関数 */
	keyExtractor?: (item: T, index: number) => string;
}

/**
 * PipDataCardItem Props
 */
export interface PipDataCardItemProps {
	/** 子要素 */
	children: ReactNode;
	/** プレフィックス要素（チェックボックスなど） */
	prefix?: ReactNode;
	/** アクション */
	actions?: CardAction[];
	/** クリック可能フラグ */
	clickable?: boolean;
	/** 選択状態 */
	selected?: boolean;
	/** クリックハンドラ */
	onClick?: () => void;
	/** 追加クラス名 */
	className?: string;
}
/**
 * 選択管理状態
 */
export interface SelectionState {
	/** 選択されたアイテムID */
	selectedIds: Set<string>;
	/** 全選択状態 */
	isAllSelected: boolean;
	/** 部分選択状態 */
	isPartiallySelected: boolean;
	/** 選択数 */
	selectedCount: number;
}

/**
 * 選択管理アクション
 */
export interface SelectionActions {
	/** アイテムを選択/選択解除 */
	toggleItem: (id: string) => void;
	/** 全選択 */
	selectAll: () => void;
	/** 全解除 */
	clearSelection: () => void;
	/** 選択状態をリセット */
	reset: () => void;
}



/* ===== FILE: \ps-ps\src\types\Topbar.ts ===== */

export interface SearchBarProps {
	onSearch?: (query: string) => void;
	placeholder?: string;
	className?: string;
}

export interface NotificationBellProps {
	count?: number;
	onClick?: () => void;
	className?: string;
}

export interface UserProfileProps {
	user?: {
		name: string;
		avatar?: string;
	};
	onClick?: () => void;
	className?: string;
}

export interface TopbarProps {
	onSearch?: (query: string) => void;
	notificationCount?: number;
	user?: {
		name: string;
		avatar?: string;
	};
	onNotificationClick?: () => void;
	onUserClick?: () => void;
	path: string;
}



/* ===== FILE: \ps-ps\src\utils\resetGrobalState.ts ===== */

import { useFgsStore } from '@/stores/useFgsStore';
import { usePipGenerationModeStore } from '@/stores/usePipGenerationModeStore';
import { useSelectedFGStore } from '@/stores/useSelectedFgStore';
import { useSelectedJobNoStore } from '@/stores/useSelectedJobNoStore';
import { useSelectedProjectStore } from '@/stores/useSelectedProjectStore';

/**
 * global stateを初期化
 */
export const resetGrobalState = () => {
	localStorage.removeItem('selectedProject-storage');
	localStorage.removeItem('selectedJobNo-storage');
	localStorage.removeItem('selectedFG-storage');
	localStorage.removeItem('fgs-storage');
	localStorage.removeItem('pipGenerationMode-storage');

	useSelectedProjectStore.getState().setSelectedProject(null);
	useSelectedJobNoStore.getState().setSelectedJobNo('');
	useSelectedFGStore.getState().setSelectedFG(null);
	useFgsStore.getState().setFgs([]);
	usePipGenerationModeStore.getState().setPipGenerationMode('display');
};



/* ===== FILE: \ps-ps\src\utils\tableUtils.ts ===== */

/**
 * テーブル関連の共通ユーティリティ関数
 */

/**
 * 汎用フィルタ型
 */
export interface GenericFilter<TValue = string> {
	columnId: string;
	value: TValue;
	operator?:
		| 'equals'
		| 'contains'
		| 'startsWith'
		| 'endsWith'
		| 'greaterThan'
		| 'lessThan';
}

/**
 * 汎用ソート型
 */
export interface GenericSort {
	columnId: string;
	direction: 'asc' | 'desc';
}

/**
 * 汎用検索関数
 * 指定されたフィールドで検索を行う
 */
export const genericSearch = <T>(
	items: T[],
	searchTerm: string,
	searchFields: (keyof T)[],
): T[] => {
	if (!searchTerm) return items;

	const lowerSearchTerm = searchTerm.toLowerCase();
	return items.filter((item) =>
		searchFields.some((field) => {
			const value = item[field];
			return String(value).toLowerCase().includes(lowerSearchTerm);
		}),
	);
};

/**
 * 汎用フィルタ関数
 * 複数のフィルタ条件を適用
 */
export const applyFilters = <T>(items: T[], filters: GenericFilter[]): T[] => {
	return items.filter((item) =>
		filters.every((filter) => {
			const value = item[filter.columnId as keyof T];
			return applyFilterCondition(value, filter);
		}),
	);
};

/**
 * 単一フィルタ条件の適用
 */
const applyFilterCondition = <TValue>(
	value: TValue,
	filter: GenericFilter,
): boolean => {
	const stringValue = String(value || '');
	const filterValue = String(filter.value || '');

	switch (filter.operator || 'contains') {
		case 'equals':
			return stringValue === filterValue;
		case 'contains':
			return stringValue.toLowerCase().includes(filterValue.toLowerCase());
		case 'startsWith':
			return stringValue.toLowerCase().startsWith(filterValue.toLowerCase());
		case 'endsWith':
			return stringValue.toLowerCase().endsWith(filterValue.toLowerCase());
		case 'greaterThan':
			return Number(value) > Number(filter.value);
		case 'lessThan':
			return Number(value) < Number(filter.value);
		default:
			return true;
	}
};

/**
 * 汎用ソート関数
 */
export const applySorting = <T>(items: T[], sorts: GenericSort[]): T[] => {
	if (sorts.length === 0) return items;

	return [...items].sort((a, b) => {
		for (const sort of sorts) {
			const aValue = a[sort.columnId as keyof T];
			const bValue = b[sort.columnId as keyof T];

			const comparison = compareValues(aValue, bValue);
			if (comparison !== 0) {
				return sort.direction === 'asc' ? comparison : -comparison;
			}
		}
		return 0;
	});
};

/**
 * 値の比較関数
 */
const compareValues = (a: unknown, b: unknown): number => {
	// null/undefined の処理
	if (a == null && b == null) return 0;
	if (a == null) return -1;
	if (b == null) return 1;

	// 数値の比較
	if (typeof a === 'number' && typeof b === 'number') {
		return a - b;
	}

	// 文字列の比較
	return String(a).localeCompare(String(b));
};

/**
 * ページネーション関数
 */
export const applyPagination = <T>(
	items: T[],
	page: number,
	pageSize: number,
): {
	items: T[];
	totalItems: number;
	totalPages: number;
	currentPage: number;
} => {
	const totalItems = items.length;
	const totalPages = Math.ceil(totalItems / pageSize);
	const currentPage = Math.max(1, Math.min(page, totalPages));
	const startIndex = (currentPage - 1) * pageSize;
	const endIndex = startIndex + pageSize;

	return {
		items: items.slice(startIndex, endIndex),
		totalItems,
		totalPages,
		currentPage,
	};
};

/**
 * 階層データの展開状態管理
 */
export interface ExpandedState {
	[key: string]: boolean;
}

/**
 * 階層データのフィルタリング（展開状態を考慮）
 */
export const filterHierarchicalData = <
	T extends { id: string; parentId?: string },
>(
	items: T[],
	expandedState: ExpandedState,
	filters: GenericFilter[] = [],
): T[] => {
	// フィルタを適用
	const filteredItems = applyFilters(items, filters);

	// 展開状態を考慮して表示項目を決定
	return filteredItems.filter((item) => {
		// 親アイテムの場合は常に表示
		if (!item.parentId) return true;

		// 子アイテムの場合は親が展開されている場合のみ表示
		return expandedState[item.parentId];
	});
};

/**
 * 選択状態の管理ヘルパー
 */
export class SelectionManager<TId = string | number> {
	private selection = new Set<TId>();

	constructor(initialSelection: TId[] = []) {
		this.selection = new Set(initialSelection);
	}

	select(id: TId): void {
		this.selection.add(id);
	}

	deselect(id: TId): void {
		this.selection.delete(id);
	}

	toggle(id: TId): void {
		if (this.selection.has(id)) {
			this.deselect(id);
		} else {
			this.select(id);
		}
	}

	selectAll(ids: TId[]): void {
		for (const id of ids) {
			this.selection.add(id);
		}
	}

	clearAll(): void {
		this.selection.clear();
	}

	isSelected(id: TId): boolean {
		return this.selection.has(id);
	}

	getSelected(): TId[] {
		return Array.from(this.selection);
	}

	getCount(): number {
		return this.selection.size;
	}

	isEmpty(): boolean {
		return this.selection.size === 0;
	}
}

/**
 * カラム幅の自動調整
 */
export const calculateColumnWidths = <T>(
	data: T[],
	columns: Array<{ id: string; header: string; accessor: keyof T }>,
	minWidth = 100,
	maxWidth = 300,
): Record<string, number> => {
	const widths: Record<string, number> = {};

	for (const column of columns) {
		// ヘッダーテキストの幅を基準値として使用
		const headerWidth = column.header.length * 8 + 20; // 文字数 × 8px + パディング

		// データ内容の最大幅を計算
		const maxDataWidth = data.reduce((max, item) => {
			const value = String(item[column.accessor] || '');
			const width = value.length * 7; // データの文字数 × 7px
			return Math.max(max, width);
		}, 0);

		// 最終的な幅を決定（最小幅・最大幅を考慮）
		const calculatedWidth = Math.max(headerWidth, maxDataWidth + 40); // パディング追加
		widths[column.id] = Math.max(minWidth, Math.min(maxWidth, calculatedWidth));
	}

	return widths;
};



/* ===== FILE: \ps-ps\tsconfig.app.json ===== */

{
	"compilerOptions": {
		"baseUrl": ".",
		"paths": {
			"@/*": ["./src/*"]
		},

		"tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
		"target": "ES2020",
		"useDefineForClassFields": true,
		"lib": ["ES2020", "DOM", "DOM.Iterable"],
		"module": "ESNext",
		"skipLibCheck": true,

		/* Bundler mode */
		"moduleResolution": "bundler",
		"allowImportingTsExtensions": true,
		"verbatimModuleSyntax": true,
		"moduleDetection": "force",
		"noEmit": true,
		"jsx": "react-jsx",

		/* Linting */
		"strict": true,
		"noUnusedLocals": true,
		"noUnusedParameters": true,
		"erasableSyntaxOnly": true,
		"noFallthroughCasesInSwitch": true,
		"noUncheckedSideEffectImports": true
	},
	"include": ["src"]
}



/* ===== FILE: \ps-ps\tsconfig.json ===== */

{
	"files": [],
	"references": [
		{ "path": "./tsconfig.app.json" },
		{ "path": "./tsconfig.node.json" }
	],
	"compilerOptions": {
		"baseUrl": ".",
		"paths": {
			"@/*": ["./src/*"]
		}
		// "types": ["@storybook/react"]
	}
}



/* ===== FILE: \ps-ps\tsconfig.node.json ===== */

{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.node.tsbuildinfo",
    "target": "ES2022",
    "lib": ["ES2023"],
    "module": "ESNext",
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "erasableSyntaxOnly": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedSideEffectImports": true
  },
  "include": ["vite.config.ts"]
}



/* ===== FILE: \ps-ps\vite.config.ts ===== */

import path from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';
import { tanstackRouter } from '@tanstack/router-plugin/vite';

// https://vite.dev/config/
export default defineConfig({
	server: {
		// bun run dev時にサーバ外からアクセス可能にする
		host: true,
		// bun run devしたらhomeが開くように
		open: '/home',
	},
	plugins: [
		tanstackRouter({ target: 'react', autoCodeSplitting: true }),
		react(),
		tailwindcss(),
	],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
});



/* ===== FILE: \ps-ps\vitest.workspace.ts ===== */

import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { defineWorkspace } from 'vitest/config';

import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';

const dirname =
  typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineWorkspace([
  'vite.config.ts',
  {
    extends: 'vite.config.ts',
    plugins: [
      // The plugin will run tests for the stories defined in your Storybook config
      // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
      storybookTest({ configDir: path.join(dirname, '.storybook') }),
    ],
    test: {
      name: 'storybook',
      browser: {
        enabled: true,
        headless: true,
        provider: 'playwright',
        instances: [{ browser: 'chromium' }]
      },
      setupFiles: ['.storybook/vitest.setup.ts'],
    },
  },
]);

