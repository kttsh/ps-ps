/**
 * テーブル関連の共通ユーティリティ関数
 */

/**
 * 汎用フィルタ型
 */
export interface GenericFilter<TValue = string> {
	columnId: string;
	value: TValue;
	operator?:
		| 'equals'
		| 'contains'
		| 'startsWith'
		| 'endsWith'
		| 'greaterThan'
		| 'lessThan';
}

/**
 * 汎用ソート型
 */
export interface GenericSort {
	columnId: string;
	direction: 'asc' | 'desc';
}

/**
 * 汎用検索関数
 * 指定されたフィールドで検索を行う
 */
export const genericSearch = <T>(
	items: T[],
	searchTerm: string,
	searchFields: (keyof T)[],
): T[] => {
	if (!searchTerm) return items;

	const lowerSearchTerm = searchTerm.toLowerCase();
	return items.filter((item) =>
		searchFields.some((field) => {
			const value = item[field];
			return String(value).toLowerCase().includes(lowerSearchTerm);
		}),
	);
};

/**
 * 汎用フィルタ関数
 * 複数のフィルタ条件を適用
 */
export const applyFilters = <T>(items: T[], filters: GenericFilter[]): T[] => {
	return items.filter((item) =>
		filters.every((filter) => {
			const value = item[filter.columnId as keyof T];
			return applyFilterCondition(value, filter);
		}),
	);
};

/**
 * 単一フィルタ条件の適用
 */
const applyFilterCondition = <TValue>(
	value: TValue,
	filter: GenericFilter,
): boolean => {
	const stringValue = String(value || '');
	const filterValue = String(filter.value || '');

	switch (filter.operator || 'contains') {
		case 'equals':
			return stringValue === filterValue;
		case 'contains':
			return stringValue.toLowerCase().includes(filterValue.toLowerCase());
		case 'startsWith':
			return stringValue.toLowerCase().startsWith(filterValue.toLowerCase());
		case 'endsWith':
			return stringValue.toLowerCase().endsWith(filterValue.toLowerCase());
		case 'greaterThan':
			return Number(value) > Number(filter.value);
		case 'lessThan':
			return Number(value) < Number(filter.value);
		default:
			return true;
	}
};

/**
 * 汎用ソート関数
 */
export const applySorting = <T>(items: T[], sorts: GenericSort[]): T[] => {
	if (sorts.length === 0) return items;

	return [...items].sort((a, b) => {
		for (const sort of sorts) {
			const aValue = a[sort.columnId as keyof T];
			const bValue = b[sort.columnId as keyof T];

			const comparison = compareValues(aValue, bValue);
			if (comparison !== 0) {
				return sort.direction === 'asc' ? comparison : -comparison;
			}
		}
		return 0;
	});
};

/**
 * 値の比較関数
 */
const compareValues = (a: unknown, b: unknown): number => {
	// null/undefined の処理
	if (a == null && b == null) return 0;
	if (a == null) return -1;
	if (b == null) return 1;

	// 数値の比較
	if (typeof a === 'number' && typeof b === 'number') {
		return a - b;
	}

	// 文字列の比較
	return String(a).localeCompare(String(b));
};

/**
 * ページネーション関数
 */
export const applyPagination = <T>(
	items: T[],
	page: number,
	pageSize: number,
): {
	items: T[];
	totalItems: number;
	totalPages: number;
	currentPage: number;
} => {
	const totalItems = items.length;
	const totalPages = Math.ceil(totalItems / pageSize);
	const currentPage = Math.max(1, Math.min(page, totalPages));
	const startIndex = (currentPage - 1) * pageSize;
	const endIndex = startIndex + pageSize;

	return {
		items: items.slice(startIndex, endIndex),
		totalItems,
		totalPages,
		currentPage,
	};
};

/**
 * 階層データの展開状態管理
 */
export interface ExpandedState {
	[key: string]: boolean;
}

/**
 * 階層データのフィルタリング（展開状態を考慮）
 */
export const filterHierarchicalData = <
	T extends { id: string; parentId?: string },
>(
	items: T[],
	expandedState: ExpandedState,
	filters: GenericFilter[] = [],
): T[] => {
	// フィルタを適用
	const filteredItems = applyFilters(items, filters);

	// 展開状態を考慮して表示項目を決定
	return filteredItems.filter((item) => {
		// 親アイテムの場合は常に表示
		if (!item.parentId) return true;

		// 子アイテムの場合は親が展開されている場合のみ表示
		return expandedState[item.parentId];
	});
};

/**
 * 選択状態の管理ヘルパー
 */
export class SelectionManager<TId = string | number> {
	private selection = new Set<TId>();

	constructor(initialSelection: TId[] = []) {
		this.selection = new Set(initialSelection);
	}

	select(id: TId): void {
		this.selection.add(id);
	}

	deselect(id: TId): void {
		this.selection.delete(id);
	}

	toggle(id: TId): void {
		if (this.selection.has(id)) {
			this.deselect(id);
		} else {
			this.select(id);
		}
	}

	selectAll(ids: TId[]): void {
		for (const id of ids) {
			this.selection.add(id);
		}
	}

	clearAll(): void {
		this.selection.clear();
	}

	isSelected(id: TId): boolean {
		return this.selection.has(id);
	}

	getSelected(): TId[] {
		return Array.from(this.selection);
	}

	getCount(): number {
		return this.selection.size;
	}

	isEmpty(): boolean {
		return this.selection.size === 0;
	}
}

/**
 * カラム幅の自動調整
 */
export const calculateColumnWidths = <T>(
	data: T[],
	columns: Array<{ id: string; header: string; accessor: keyof T }>,
	minWidth = 100,
	maxWidth = 300,
): Record<string, number> => {
	const widths: Record<string, number> = {};

	for (const column of columns) {
		// ヘッダーテキストの幅を基準値として使用
		const headerWidth = column.header.length * 8 + 20; // 文字数 × 8px + パディング

		// データ内容の最大幅を計算
		const maxDataWidth = data.reduce((max, item) => {
			const value = String(item[column.accessor] || '');
			const width = value.length * 7; // データの文字数 × 7px
			return Math.max(max, width);
		}, 0);

		// 最終的な幅を決定（最小幅・最大幅を考慮）
		const calculatedWidth = Math.max(headerWidth, maxDataWidth + 40); // パディング追加
		widths[column.id] = Math.max(minWidth, Math.min(maxWidth, calculatedWidth));
	}

	return widths;
};

