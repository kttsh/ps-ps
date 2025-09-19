import type { Table } from '@tanstack/react-table';
import { Eye, EyeClosed, Funnel, FunnelX } from 'lucide-react';
import { Button } from './ui/button';

interface Props<T> {
	setShowFilters: React.Dispatch<React.SetStateAction<boolean>>;
	showFilters: boolean;
	tableInstance: Table<T> | null;
}

/**
 * テーブルの各カラムのフィルタのUIを定義する汎用コンポーネント
 * setShowFilters: フィルタ表示切替のset関数
 * showFilters: フィルタの表示有無
 * tableInstance: TanStack Table のインスタンス
 */
export function FilterButton<T>({
	setShowFilters,
	showFilters,
	tableInstance,
}: Props<T>) {
	return (
		<div className="flex items-center gap-2">
			<Funnel size={16} />
			<span>:</span>
			{/* 表示/非表示切り替えボタン */}
			<Button
				size="sm"
				variant="outline"
				onClick={() => setShowFilters((prev) => !prev)}
				className="text-gray-800 h-8 w-19 cursor-pointer"
			>
				{showFilters ? (
					<>
						<EyeClosed />
						<span>Hide</span>
					</>
				) : (
					<>
						<Eye />
						<span>Show</span>
					</>
				)}
			</Button>
			{/* フィルタークリアボタン */}
			<Button
				size="sm"
				variant="outline"
				onClick={() => tableInstance?.resetColumnFilters()}
				className="text-gray-800 cursor-pointer"
			>
				<FunnelX />
				Clear
			</Button>
		</div>
	);
}