import { createRootRoute, Outlet } from '@tanstack/react-router';
import { Toaster } from 'sonner';
import { Toast } from '@/components/Toast';

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