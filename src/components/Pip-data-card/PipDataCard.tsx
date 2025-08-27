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
