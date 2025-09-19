import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/msr/milestone')({
	component: () => <Outlet />,
});