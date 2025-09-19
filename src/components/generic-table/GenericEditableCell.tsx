import React from 'react';

/**
 * セル描画ロジック（表示 or 編集 input を切り替え）
 * isEditing: 編集モードかどうか
 * value: セルに表示する値（任意の型）
 * isDirty: 変更済みのセルかどうか（ハイライト用）
 * onChange: 編集後の変更通知関数（オプション）
 */
export const GenericEditableCell = React.memo(
	({
		isEditing,
		value,
		isDirty,
		onChange,
	}: {
		isEditing: boolean;
		value: unknown;
		isDirty?: boolean;
		onChange?: (val: unknown) => void;
	}) => {
		// 値が Date の場合は日付文字列に、それ以外はそのまま文字列化（null/undefined は空）
		const display =
			value instanceof Date ? value.toLocaleString() : String(value ?? '');

		// isDirty が true のとき背景色でハイライト
		const dirtyClass = isDirty ? 'bg-yellow-100' : '';

		// 編集モード中は input を表示、それ以外は文字列スパンで表示
		return isEditing ? (
			<input
				className={`h-6 px-1 py-0 text-xs border-gray-300 border rounded w-full ${dirtyClass}`}
				value={display}
				onChange={(e) => onChange?.(e.target.value)}
			/>
		) : (
			<span className={`text-xs px-2 ${dirtyClass}`}>{display}</span>
		);
	},
);