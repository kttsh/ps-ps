import { Message, Topbar } from '@/components';
import { createFileRoute, Outlet } from '@tanstack/react-router';

/**
 * MSRシステムのルート定義
 * "/msr" パスに対応し、MSR関連の画面のエントリーポイントとなる
 */
export const Route = createFileRoute('/msr')({
	component: () => {
		return (
			<div className="flex flex-col h-screen">
				{/* ヘッダー */}
				<div className="sticky top-0 z-50 shadow-sm">
					<Topbar path='msr' />
					<Message />
				</div>
				<div className="flex flex-1">
					{/* メインコンテンツ */}
					<main className="flex-1">
						<Outlet />
					</main>
				</div>
			</div>
		);
	}
});

