import type { Table } from '@tanstack/react-table';
import { Eye, EyeClosed, Funnel, FunnelX } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from './ui/button';

interface Props<T> {
	setShowFilters: React.Dispatch<React.SetStateAction<boolean>>;
	showFilters: boolean;
	setPipAssignedFilters: React.Dispatch<React.SetStateAction<boolean>>;
	pipAssignedFilters: boolean;
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
	setPipAssignedFilters,
	pipAssignedFilters,
}: Props<T>) {
	// パスを元に、PIP管理画面に表示すべきではない項目を判断
	const { pathname } = window.location;
	const [isPipDisplay, setIsPipDisplay] = useState(true);
	useEffect(() => {
		setIsPipDisplay(!pathname.includes('pips'));
	}, [pathname]);

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

			{/* PIP未割当フィルター切替ボタン */}
			{isPipDisplay && (
				<Button
					size="sm"
					variant="outline"
					onClick={() => setPipAssignedFilters((prev) => !prev)}
					className="text-gray-800 h-8 w-32 cursor-pointer"
				>
					{pipAssignedFilters ? (
						<>
							<EyeClosed className="mr-1" />
							<span>すべて表示</span>
						</>
					) : (
						<>
							<Eye className="mr-1" />
							<span>PIP未割当のみ</span>
						</>
					)}
				</Button>
			)}

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
