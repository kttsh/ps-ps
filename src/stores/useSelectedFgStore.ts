import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { FG } from './useFgsStore';

type StoreState = {
	selectedFG: FG | null;
	setSelectedFG: (fg: FG | null) => void;
};

/**
 * P-Sysサイドバーで選択したFGをglobal stateで管理
 */
export const useSelectedFGStore = create<StoreState>()(
	persist(
		(set) => ({
			selectedFG: null,
			setSelectedFG: (fg) => set({ selectedFG: fg }),
		}),
		{
			name: 'selectedFG-storage', // 永続化(localStorage保存)
		},
	),
);