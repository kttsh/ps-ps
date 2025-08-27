import { createFileRoute } from '@tanstack/react-router';

/**
 * MARUSEシステムのルート定義
 * "/msr" パスに対応し、MARUSE関連の画面のエントリーポイントとなる
 */
export const Route = createFileRoute('/msr')({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/msr"!</div>;
}
