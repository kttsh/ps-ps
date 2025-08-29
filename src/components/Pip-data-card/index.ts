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

