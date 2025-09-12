import type { Table } from '@tanstack/react-table';
import { FilterButton } from '..';

/**
 * 読み取り専用テーブルの操作ボタン群を表示する汎用コンポーネント
 * title: テーブルの上部に表示するタイトル（任意）
 * data: テーブルに表示される元データの配列
 * isFilterActive: フィルター機能が有効かどうか（true の場合、フィルターボタンと件数表示を表示）
 * tableInstance: TanStack Table のインスタンス
 * filteredCount: フィルター適用後の表示件数（例：検索結果の件数）
 * showFilters: フィルター入力欄の表示状態（true で表示）
 * setShowFilters: フィルター表示状態を切り替えるための setter 関数
 */
export function GenericReadonlyControl<T>({
	title,
	data,
	isFilterActive,
	tableInstance,
	filteredCount,
	showFilters,
	setShowFilters,
	icon,
}: {
	title?: string;
	data: T[];
	isFilterActive: boolean;
	tableInstance: Table<T> | null;
	filteredCount: number;
	showFilters: boolean;
	setShowFilters: React.Dispatch<React.SetStateAction<boolean>>;
	icon?: React.ReactElement;
}) {
	return (
		<div className="flex-shrink-0">
			{/* タイトル */}
			{title && (
				<div className="flex items-center gap-3">
					{icon}
					<h2 className="text-md text-gray-800">{title}</h2>
				</div>
			)}

			{/* ボタンエリア */}
			{isFilterActive && (
				<div className="flex items-end justify-between mt-2">
					{/* フィルタ */}
					<FilterButton
						setShowFilters={setShowFilters}
						showFilters={showFilters}
						tableInstance={tableInstance}
					/>

					{/* 件数表示（フィルター後 / 全体） */}
					<span className="text-sm text-gray-600">
						count: {filteredCount} / {data.length}
					</span>
				</div>
			)}
		</div>
	);
}