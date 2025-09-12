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
				<h4 className="text-xs font-medium text-gray-900 mb-1">
					{emptyState.title}
				</h4>
				{emptyState.description && (
					<p className="text-sm text-gray-500 mb-4">{emptyState.description}</p>
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
