import { Package, ShoppingCart } from 'lucide-react';

// ナビゲーションアイテムの型定義
type NavItem = {
	id: string;
	label: string;
	to: string;
	icon: React.ReactElement;
};

// ナビゲーショングループの型定義
type NavGroup = {
	id: string;
	heading?: string;
	items: NavItem[];
};

// P-Sysの共通パス定義
const pSysPath = '/p-sys';

// ナビゲーションメニューの定義
export const NAV: NavGroup[] = [
	{
		id: 'psys',
		heading: 'MENU',
		items: [
			{
				id: 'items',
				label: 'Item Management',
				to: `${pSysPath}/item-assignment`,
				icon: <ShoppingCart className="h-5 w-5" />,
			},
			{
				id: 'pips',
				label: 'PIP Management',
				to: `${pSysPath}/pips`,
				icon: <Package className="h-5 w-5" />,
			},
		],
	},
];
