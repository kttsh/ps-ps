import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type StoreState = {
	selectedJobNo: string;
	setSelectedJobNo: (selectedJobNo: string) => void;
};

/**
 * P-Sysサイドバーで選択したJob No.をglobal stateで管理
 */
export const useSelectedJobNoStore = create<StoreState>()(
	persist(
		(set) => ({
			selectedJobNo: '',
			setSelectedJobNo: (selectedJobNo) => set({ selectedJobNo }),
		}),
		{
			name: 'selectedJobNo-storage', // 永続化(localStorage保存)
		},
	),
);
