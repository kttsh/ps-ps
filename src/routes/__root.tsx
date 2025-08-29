import { createRootRoute, Outlet } from '@tanstack/react-router';

/**
 * すべての画面のエントリーポイントとなる
 */
export const Route = createRootRoute({
	component: () => <Outlet />,
})

