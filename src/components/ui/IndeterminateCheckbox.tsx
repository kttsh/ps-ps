import type React from 'react';
import { Checkbox } from '@/components/ui/checkbox';

/**
 * 不確定状態をサポートするチェックボックスコンポーネント
 * checked: 通常のチェック状態（boolean）
 * indeterminate: 中間状態フラグ（true のとき indeterminate 表示にする）
 * onChange:チェック変更時に呼ばれるハンドラ
 * className: スタイルクラス（オプション）
 */
export function IndeterminateCheckbox({
	checked,
	indeterminate,
	onChange,
	className = '',
}: {
	checked: boolean;
	indeterminate?: boolean;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	className?: string;
}) {
	return (
		<Checkbox
			// `checked` プロパティには true / false / 'indeterminate(中間状態)' のいずれかを渡せる
			checked={indeterminate ? 'indeterminate' : checked}
			onCheckedChange={(val) => {
				const syntheticEvent = {
					target: { checked: Boolean(val) },
				} as React.ChangeEvent<HTMLInputElement>;
				onChange(syntheticEvent);
			}}
			className={className}
		/>
	);
}
