import { Link, useSearch } from '@tanstack/react-router';
import { CalendarDays, House } from 'lucide-react';
import { usePipGenerationModeStore } from '@/stores/usePipGenerationModeStore';
import { NAV } from '../constants/navigation';

/**
 * サイドバーの画面遷移ナビゲーションタブ
 */
export const SidebarNavigation = () => {
	// 現在のsearchパラメータを取得
	const search = useSearch({ strict: false });
	const { setPipGenerationMode } = usePipGenerationModeStore();

	return (
		<nav className="mt-10">
			{NAV.map((group) => (
				<div key={group.id} className="space-y-2">
					{group.heading && (
						<h2 className="text-xs font-semibold tracking-wide text-white px-2">
							{group.heading}
						</h2>
					)}
					{group.items.map(({ id, label, to, icon }) => (
						<Link
							key={id}
							to={to}
							search={search}
							className="flex w-full items-center gap-4 px-4 py-4 text-white hover:bg-gray-600/20 text-lg"
							activeProps={{
								className:
									'bg-white !text-gray-800 font-medium pointer-events-none',
							}}
							onClick={() => {
								if (id === 'items') {
									setPipGenerationMode('display');
								}
							}}
						>
							{icon}
							<span>{label}</span>
						</Link>
					))}
				</div>
			))}

			<div className="mt-10">
				<h2 className="text-xs font-semibold tracking-wide text-white p-2">
					LINKED SYSTEMS
				</h2>
				<Link
					key="home"
					to="/home"
					search={search}
					className="flex w-full items-center gap-4 px-4 py-4 text-white hover:bg-gray-600/20 text-lg"
					activeProps={{
						className:
							'bg-white !text-gray-800 font-medium pointer-events-none',
					}}
				>
					<House />
					<span>HOME</span>
				</Link>
				<Link
					key="msr"
					to="/msr"
					search={search}
					className="flex w-full items-center gap-4 px-4 py-4 text-white hover:bg-gray-600/20 text-lg"
					activeProps={{
						className:
							'bg-white !text-gray-800 font-medium pointer-events-none',
					}}
				>
					<CalendarDays />
					<span>MSR</span>
				</Link>
			</div>
		</nav>
	);
};