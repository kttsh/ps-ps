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
	itemSurKey: number;
	/** Job番号 */
	jobNo: string;
	// /** Function Groupコード */
	fgCode: string;
	/** アイテム番号 */
	itemNo: string;
	/** コアアイテム番号 */
	itemCoreNo: string;
	/** アイテム名 */
	itemName: string;
	/** 数量 */
	itemQty?: number;
	/** 割り当て済み数量 */
	itemAssignedQty: number;
	/** 未割り当て数量 */
	itemUnassignedQty: number;
	// /** ソートキー */
	itemSortKey?: number;
	/** Cost Element */
	itemCostElement: string;
	/** IBS Code */
	itemIBSCode: string;
	/** PIP割り当てステータス */
	itemIsAssign?: string;
	/** 元の総数量（編集モード用） */
	itemTotalQty?: number;
}

/**
 * 統一ベンダーデータ
 */
export interface Vendor {
	/** ベンダーID */
	vendorId: string;
	/** ベンダー番号 */
	vendorNumber?: number;
	/** ベンダー名 */
	vendorName: string;
	/** ベンダーコード */
	aipCode: string;
	/** 機能分類 */
	function?: string;
	status?: string;
	assignedDate?: string;
}

/**
 * 統一PIPデータ
 * Pip, PIPを統合した型
 */
// export interface Pip {
// 	/** PIPコード */
// 	code: string;
// 	/** ニックネーム */
// 	nickname: string;
// 	/** 配下アイテムリスト */
// 	items: Item[];
// 	/** 配下ベンダーリスト */
// 	vendors: Vendor[];
// }

export interface Pip {
	jobNo: string;
	fgCode: string;
	pipCode: string;
	pipNickName: string;
	pipSortKey: string;
	itemCount?: number;
	vendorCount?: number;
}

export interface PipDetail extends Pip {
	items: Item[];
	vendors: Vendor[];
}

/**
 * 統一PIPデータコンテナ
 */
// export interface PipData {
// 	/** PIPリスト */
// 	pips: Pip[];
// }

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
