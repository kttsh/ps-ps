import type { Column } from '@tanstack/react-table';
import { Input } from '../ui/input';

/**
 * 数値・文字列による列フィルター UI を提供する汎用コンポーネント
 * column: フィルターを適用する対象の列。TanStack Table の Column オブジェクト
 * customPlaceholders: 列ごとにカスタムプレースホルダーを指定するためのマッピング
 * numericColumns: 数値フィルターを適用する列IDの配列
 */
export function GenericTableFilter<T>({
	column,
	customPlaceholders = {},
	numericColumns = [],
}: {
	column: Column<T, unknown>; // 対象の列
	customPlaceholders?: Partial<Record<string, string>>;
	numericColumns?: string[];
}) {
	// 現在のフィルター値（string または number）
	const columnFilterValue = column.getFilterValue();
	// 列id
	const columnId = column.id;

	const currentFilter =
		typeof columnFilterValue === 'string' ||
		typeof columnFilterValue === 'number'
			? String(columnFilterValue)
			: '';

	// customPlaceholders に列IDが含まれていればその値を使用し、なければデフォルト文言を使用
	const placeholder = customPlaceholders[columnId] ?? `Filter ${columnId}...`;

	// この列が数値フィルター対象かどうかを判定
	const isNumeric = numericColumns.includes(columnId);

	return (
		<>
			{/* 文字列列の場合：通常の文字列検索フィルターを表示 */}
			{/* 数値の場合：カウンターを表示 */}
			<Input
				type={isNumeric ? 'number' : 'text'}
				className="h-6 text-xs px-1 rounded-sm bg-white placeholder:font-light"
				placeholder={placeholder}
				value={currentFilter}
				onClick={(e) => e.stopPropagation()}
				onChange={(e) => column.setFilterValue(e.target.value || undefined)}
				min={isNumeric ? 0 : undefined}
			/>
		</>
	);
}
