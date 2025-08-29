import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/index.css';
import { routeTree } from './routeTree.gen';

// Routerの作成
const router = createRouter({
	routeTree,
	defaultPreload: 'intent',
});

// 型安全のための登録
declare module '@tanstack/react-router' {
	interface Register {
		router: typeof router;
	}
}

// React Queryのクライアント
const queryClient = new QueryClient();

// アプリのルート
const App = () => {
	return (
		<StrictMode>
			<QueryClientProvider client={queryClient}>
				<RouterProvider router={router} />
			</QueryClientProvider>
		</StrictMode>
	);
};

const rootElement = document.getElementById('root');
if (rootElement) {
	createRoot(rootElement).render(<App />);
} else {
	console.error('Root element not found');
}

