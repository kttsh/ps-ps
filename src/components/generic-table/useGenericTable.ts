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
