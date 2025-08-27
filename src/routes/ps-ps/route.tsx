import { createFileRoute, Outlet, useLocation } from '@tanstack/react-router';
import type React from 'react';
import { createContext, useState } from 'react';
import { Message } from '@/components/Message';
import { Topbar } from '@/components/Topbar';
import type { PipData } from '@/types';
import { Sidebar } from '../../features/pip-randing/components';

/*コンテキスト管理
 *  //Display by Selection等の選択状態を各コンポーネントをまたがって管理する
 */
export type PSysContextType = {
	// Display by Selectionボタンの押下状態を管理
	isSearchTriggered: boolean;
	setIsSearchTriggered: React.Dispatch<React.SetStateAction<boolean>>;
	// サイドバーの表示状態を管理(PIP管理画面)
	isSidebar: boolean;
	setIsSidebar: React.Dispatch<React.SetStateAction<boolean>>;
	// PIP管理画面で選択されたpipDataの対象を管理
	selectedPipData: PipData;
	setSelectedPipData: React.Dispatch<React.SetStateAction<PipData>>;
	// ItemAssignmentViewを呼び出す際のモードを管理
	isItemAssignmentView: string;
	setIsItemAssignmentView: React.Dispatch<React.SetStateAction<string>>;
};
export const PSysContext = createContext<PSysContextType>({
	// Display by Selectionボタンの押下状態を管理
	isSearchTriggered: false,
	setIsSearchTriggered: () => {},
	// サイドバーの表示状態を管理(PIP管理画面)
	isSidebar: true,
	setIsSidebar: () => {},
	// PIP管理画面で選択されたpipDataの対象を管理
	selectedPipData: {} as PipData, // 初期値として空オブジェクトを型アサーションで指定
	setSelectedPipData: () => {},
	// ItemAssignmentViewを呼び出す際のモードを管理
	isItemAssignmentView: '',
	setIsItemAssignmentView: () => {},
});

/**
 * P-Sysシステムのルート定義
 * "/ps-ps" パスに対応し、P-Sys関連の画面のエントリーポイントとなる
 * pathによってSidebarの表示を制御
 */
export const Route = createFileRoute('/ps-ps')({
	component: () => {
		// path取得
		const pathname = useLocation({
			select: (location) => location.pathname,
		});
		// "/ps-ps/"を除いたpathを取得
		const exceptPathName = pathname.replace('/ps-ps/', '');

		// Sidebar を表示するパス一覧
		const sidebarVisiblePaths = ['item-assignment', 'pips'];

		// 表示判定
		const showSidebar = sidebarVisiblePaths.includes(exceptPathName);

		// Display by Selectionボタンの押下状態を管理
		const [isSearchTriggered, setIsSearchTriggered] = useState(false);
		// サイドバーの表示状態を管理(PIP管理画面)
		const [isSidebar, setIsSidebar] = useState(true);
		// PIP管理画面で選択されたpipDataの対象を管理
		const [selectedPipData, setSelectedPipData] = useState({} as PipData);
		// ItemAssignmentViewを呼び出す際のモードを管理
		const [isItemAssignmentView, setIsItemAssignmentView] =
			useState('itemManagement');

		return (
			<div className="flex flex-col h-screen">
				{/* ヘッダー */}
				<div className="sticky top-0 z-50 shadow-sm">
					<Topbar />
					<Message />
				</div>
				<div className="flex flex-1">
					<PSysContext.Provider
						value={{
							isSearchTriggered,
							setIsSearchTriggered,
							isSidebar,
							setIsSidebar,
							selectedPipData,
							setSelectedPipData,
							isItemAssignmentView,
							setIsItemAssignmentView,
						}}
					>
						{/* サイドバー */}
						{showSidebar && isSidebar && <Sidebar />}
						{/* メインコンテンツ */}
						<main className="flex-1 overflow-auto">
							<Outlet />
						</main>
					</PSysContext.Provider>
				</div>
			</div>
		);
	},
});
