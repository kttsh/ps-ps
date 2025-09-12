import { Toast } from '@/components/Toast';
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { Toaster } from 'sonner';

/**
 * すべての画面のエントリーポイントとなる
 */
export const Route = createRootRoute({
	component: () => {
		return (
			<>
				<Outlet />
				{/* メッセージコンポーネント */}
				<Toast />
				<Toaster />
			</>
		);
	},
});
