/**
 * PipDataCardHeader - カードヘッダーコンポーネント
 *
 * PIP基本情報の表示とヘッダーレベルでのアクション管理を担当する。
 * Context から variant/size を自動取得する。
 *
 * 主な機能:
 * - PIP コードと表示名の表示
 * - バリエーション別アイコン表示（item/vendor/generatedItem）
 * - インライン編集機能（タイトルの直接編集）
 * - アクションボタン群の表示（CardActionGroup 使用）
 */

import { clsx } from 'clsx';
import { Edit3 } from 'lucide-react';
import { type KeyboardEvent, memo, useCallback, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import type { PipDataCardHeaderProps } from '@/types/pipDataCard';
import { CardActionGroup } from './CardActionGroup';
import {
	COMMON_CLASSES,
	getVariantIcon,
	SIZE_STYLES,
	VARIANT_STYLES,
} from './constants';
import { usePipDataCardContext } from './PipDataCardContext';

/**
 * PipDataCardHeader コンポーネント
 *
 * @param pipData - PIP基本データ（code, nickname, type）
 * @param actions - ヘッダーレベルのアクション配列
 * @param editable - インライン編集設定（編集可能性、バリデーション、コールバック）
 * @param metadata - 表示メタデータ（アイテム数、ベンダー数）
 */
export const PipDataCardHeader = memo<PipDataCardHeaderProps>(
	({ pipData, actions = [], editable, metadata }) => {
		// Context から variant と size を取得（親の PipDataCard から自動継承）
		const { variant, size } = usePipDataCardContext();
		const [isEditing, setIsEditing] = useState(false);
		const [editValue, setEditValue] = useState(pipData.nickname);

		const variantStyles = VARIANT_STYLES[variant];
		const sizeStyles = SIZE_STYLES[size];

		const handleEditStart = useCallback(() => {
			if (!editable?.enabled) return;
			setIsEditing(true);
			setEditValue(pipData.nickname);
		}, [editable?.enabled, pipData.nickname]);

		const handleEditSave = useCallback(() => {
			if (!editable?.enabled || !editValue.trim()) return;

			if (editable.validation && !editable.validation(editValue)) {
				setEditValue(pipData.nickname);
				setIsEditing(false);
				return;
			}

			editable.onTitleChange(editValue);
			setIsEditing(false);
		}, [editable, editValue, pipData.nickname]);

		const handleEditCancel = useCallback(() => {
			setEditValue(pipData.nickname);
			setIsEditing(false);
		}, [pipData.nickname]);

		const handleKeyDown = useCallback(
			(e: KeyboardEvent<HTMLInputElement>) => {
				if (e.key === 'Enter') {
					e.preventDefault();
					handleEditSave();
				} else if (e.key === 'Escape') {
					e.preventDefault();
					handleEditCancel();
				}
			},
			[handleEditSave, handleEditCancel],
		);

		const renderTitle = () => {
			if (isEditing) {
				return (
					<input
						type="text"
						value={editValue}
						onChange={(e) => setEditValue(e.target.value)}
						onBlur={handleEditSave}
						onKeyDown={handleKeyDown}
						placeholder={editable?.placeholder}
						className={twMerge(
							clsx(
								sizeStyles.header,
								'font-medium bg-transparent border-none outline-none focus:ring-2 focus:ring-blue-500 rounded px-1 -ml-1',
							),
						)}
					/>
				);
			}

			return (
				<div className="flex items-center gap-2">
					<h3 className={twMerge(clsx(sizeStyles.header, 'font-medium'))}>
						{pipData.nickname}
					</h3>
					{editable?.enabled && (
						<button
							type="button"
							onClick={handleEditStart}
							className="p-1 rounded hover:bg-gray-100 transition-colors cursor-pointer"
							title="編集"
						>
							<Edit3 size={12} className="text-gray-400" />
						</button>
					)}
				</div>
			);
		};

		const renderMetadata = () => {
			if (!metadata) return null;

			const items = [];
			if (metadata.itemCount !== undefined) {
				items.push(`${metadata.itemCount}件`);
			}
			if (metadata.vendorCount !== undefined) {
				items.push(`${metadata.vendorCount}社`);
			}

			if (items.length === 0) return null;

			return (
				<span className={twMerge(clsx(sizeStyles.content, 'text-gray-500'))}>
					{items.join(' / ')}
				</span>
			);
		};

		return (
			<div className={twMerge(clsx(COMMON_CLASSES.header, sizeStyles.card))}>
				{/* アイコン */}
				<div
					className={twMerge(
						clsx(
							sizeStyles.icon,
							variantStyles.iconGradient,
							'rounded-lg flex items-center justify-center',
						),
					)}
				>
					{getVariantIcon(variant)}
				</div>

				{/* タイトル部分 */}
				<div className="flex-1 min-w-0">
					{renderTitle()}
					<div className="flex items-center gap-2">
						<span
							className={twMerge(
								clsx(sizeStyles.content, 'text-gray-500 font-mono'),
							)}
						>
							{pipData.code}
						</span>
						{renderMetadata()}
					</div>
				</div>

				{/* アクション */}
				<CardActionGroup actions={actions} className="ml-auto" />
			</div>
		);
	},
);

PipDataCardHeader.displayName = 'PipDataCardHeader';

