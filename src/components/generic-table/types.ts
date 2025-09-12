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

	/**
	 * キーワード検索の状態
	 */
	globalFilter?: string;
	setGlobalFilter?: (row: string) => void;
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
