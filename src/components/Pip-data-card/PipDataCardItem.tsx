/**
 * PipDataCardItem 個別アイテム表示コンポーネント
 * カード内の個別アイテムの表示とアクション管理を行うコンポーネントである
 */

import { clsx } from 'clsx';
import { memo, useCallback } from 'react';
import { twMerge } from 'tailwind-merge';
import type { PipDataCardItemProps } from '@/types/pipDataCard';
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
