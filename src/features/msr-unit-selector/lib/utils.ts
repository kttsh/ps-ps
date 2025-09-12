/**
 * ユーティリティ関数を提供するモジュール
 *
 * このモジュールは、アプリケーション全体で使用される汎用的なユーティリティ関数を提供します。
 * クラス名の結合、日付のフォーマット、通貨のフォーマットなどの機能を含みます。
 */
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * クラス名を結合するユーティリティ関数
 *
 * clsxとtailwind-mergeを組み合わせて、クラス名を効率的に結合します。
 * これにより、条件付きクラスの適用やTailwindのクラスの衝突解決が容易になります。
 *
 * @param {...ClassValue[]} inputs - 結合するクラス名
 * @returns {string} 結合されたクラス名
 */
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

/**
 * 日付を日本語形式でフォーマットするユーティリティ関数
 *
 * 日付オブジェクトを「YYYY/MM/DD」形式の文字列に変換します。
 *
 * @param {Date} date - フォーマットする日付
 * @returns {string} フォーマットされた日付文字列
 */
export function formatDate(date: Date): string {
	return date.toLocaleDateString('ja-JP', {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
	});
}

/**
 * 金額を日本円形式でフォーマットするユーティリティ関数
 *
 * 数値を「¥XXX,XXX」形式の通貨文字列に変換します。
 *
 * @param {number} amount - フォーマットする金額
 * @returns {string} フォーマットされた通貨文字列
 */
export function formatCurrency(amount: number): string {
	return new Intl.NumberFormat('ja-JP', {
		style: 'currency',
		currency: 'JPY',
		minimumFractionDigits: 0,
	}).format(amount);
}