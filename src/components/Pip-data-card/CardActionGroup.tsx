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
import { LoadingSpinner } from '../LoadingSpnner';
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
							<LoadingSpinner />
						) : (
							<div className="text-rose-500 cursor-pointer">{action.icon}</div>
						)}
					</button>
				))}
			</div>
		);
	},
);

CardActionGroup.displayName = 'CardActionGroup';