import React, { useState } from 'react';

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
		columType,
		// エラーメッセージ紐づけ
		//itemNo,
		//rowIndex,
	}: {
		isEditing: boolean;
		value: unknown;
		isDirty?: boolean;
		onChange?: (val: unknown) => void;
		columType?: string;
		itemNo?: string;
		rowIndex?: number;
	}) => {
		// 値が Date の場合は日付文字列に、それ以外はそのまま文字列化（null/undefined は空）
		const display =
			value instanceof Date ? value.toLocaleString() : String(value ?? '');

		const [isError] = useState(false);

		//useEffect(() => {
		// // 背景色: 赤のリセット
		// setIsError(false);
		// // 位置を特定するキー
		// const key = `${rowIndex}_${columType}`;
		// if (columType === 'coreItemNo' && value === '') {
		// 	setErrorMessage((prev: Record<string, string>) => ({
		// 		...prev,
		// 		[key as string]: `Item·No: ${itemNo}「CoreItemNo」の値が不正です: 値を入力してください。`,
		// 	}));
		// 	setIsError(true);
		// } else if (columType === 'costElement' && value === '') {
		// 	setErrorMessage((prev: Record<string, string>) => ({
		// 		...prev,
		// 		[key as string]: `Item·No: ${itemNo}「CostElement」の値が不正です: 値を入力してください。`,
		// 	}));
		// 	setIsError(true);
		// } else if (columType === 'ibsCode' && value === '') {
		// 	setErrorMessage((prev: Record<string, string>) => ({
		// 		...prev,
		// 		[key as string]: `Item·No: ${itemNo}「IbsCode」の値が不正です: 値を入力してください。`,
		// 	}));
		// 	setIsError(true);
		// } else if (columType === 'itemName' && value === '') {
		// 	setErrorMessage((prev: Record<string, string>) => ({
		// 		...prev,
		// 		[key as string]: `Item·No: ${itemNo}「ItemName」の値が不正です: 値を入力してください。`,
		// 	}));
		// 	setIsError(true);
		// } else if (columType === 'itemNo' && value === '') {
		// 	setErrorMessage((prev: Record<string, string>) => ({
		// 		...prev,
		// 		[key as string]: `Item·No: ${itemNo}「ItemNo」の値が不正です: 値を入力してください。`,
		// 	}));
		// 	setIsError(true);
		// } else if (columType === 'qty') {
		// 	if (value === '') {
		// 		setErrorMessage((prev: Record<string, string>) => ({
		// 			...prev,
		// 			[key as string]: `Item·No: ${itemNo}「Qty」の値が不正です: 値を入力してください。`,
		// 		}));
		// 		setIsError(true);
		// 	} else if (!/^[1-9]\d*$/.test(value as string)) {
		// 		setErrorMessage((prev: Record<string, string>) => ({
		// 			...prev,
		// 			[key as string]: `Item·No: ${itemNo}「Qty」の値が不正です: 整数を入力してください。`,
		// 		}));
		// 		setIsError(true);
		// 	} else {
		// 		// 該当キーのエラーメッセージリセット
		// 		if (typeof itemNo !== 'undefined') {
		// 			setErrorMessage((prev: Record<string, string>) => {
		// 				const newErrors = { ...prev };
		// 				delete newErrors[key];
		// 				return newErrors;
		// 			});
		// 		}
		// 	}
		// } else {
		// 	// 該当キーのエラーメッセージリセット
		// 	if (typeof itemNo !== 'undefined') {
		// 		setErrorMessage((prev: Record<string, string>) => {
		// 			const newErrors = { ...prev };
		// 			delete newErrors[key];
		// 			return newErrors;
		// 		});
		// 	}
		// }
		//}, [value]);

		// isDirty が true のとき背景色でハイライト
		const dirtyClass = isError ? 'bg-red-100' : isDirty ? 'bg-yellow-100' : '';

		// PIP割当ステータス列の背景色
		const getBackgroundClass = (display: string) => {
			switch (display) {
				case '割当済':
					return 'bg-gray-200 text-gray-800';
				case '一部割当済':
					return 'bg-yellow-200 text-yellow-800';
				case '未割当':
					return 'bg-green-200 text-green-800';
				default:
					return 'bg-white text-black';
			}
		};

		// 編集モード中は input を表示
		return isEditing && columType !== 'pipCode' ? (
			<input
				className={`h-6 px-1 py-0 text-xs border-gray-300 border rounded w-full ${dirtyClass}`}
				value={display}
				onChange={(e) => onChange?.(e.target.value)}
			/>
		) : columType === 'pipCode' ? (
			//pip割当ステータスはスパンで表示
			<span
				className={`text-xs px-2 ${dirtyClass} ${getBackgroundClass(display)}`}
			>
				{display}
			</span>
		) : (
			// それ以外は文字列スパンで表示
			<span className={`text-xs px-2 ${dirtyClass}`}>{display}</span>
		);
	},
);

