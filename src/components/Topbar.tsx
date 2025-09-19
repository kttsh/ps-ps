import { Link, useSearch } from '@tanstack/react-router';
import { BellIcon, BookOpenText, CircleUserRound } from 'lucide-react';
import { AppLogo } from '@/features/psys-randing/components';
import type { TopbarProps } from '@/types/Topbar';

/**
 * P-Sys/MSRで共有するヘッダーのレイアウトを定義するコンポーネント
 */
export const Topbar: React.FC<TopbarProps> = ({ path }) => {
	const search = useSearch({ strict: false });

	return (
		<div className="bg-indigo-900">
			<div className="max-w-screen mx-auto lg:px-8">
				<div className="flex justify-between items-center h-16">
					{/* 左側：ロゴ（P-Sys/MSRで切り替え） */}
					<div className="flex items-center">
						{path === 'msr' ? (
							<h1 className="text-3xl text-white">MSR</h1>
						) : (
							<Link to="/p-sys/item-assignment" search={search}>
								<AppLogo />
							</Link>
						)}
					</div>

					{/* 右側：メニューアイコンエリア */}
					<div className="flex items-center gap-6">
						{/* マニュアル */}
						<BookOpenText size={30} className="text-white" />
						{/* 通知 */}
						<button
							type="button"
							className="relative rounded p-1 hover:bg-indigo-400 cursor-pointer"
						>
							<BellIcon size={30} className="text-white" />
							<span className="absolute -right-0.5 -top-0.5 inline-flex h-2 w-2 rounded-full bg-red-500" />
						</button>
						{/* ユーザ情報 */}
						<CircleUserRound size={30} className="text-white" />
					</div>
				</div>
			</div>
		</div>
	);
};