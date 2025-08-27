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
