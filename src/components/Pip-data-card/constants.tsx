/**
 * PipDataCard 定数定義
 * カラーバリエーションとスタイル設定を管理する
 */

import { Building2, Package } from 'lucide-react';
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
			return <Package className="w-5 h-5 text-white" />;
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
		card: 'px-3 pb-4 pt-2',
		header: 'text-base',
		content: 'text-lg',
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