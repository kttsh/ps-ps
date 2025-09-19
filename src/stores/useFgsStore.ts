import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { FG } from '@/types';

type StoreState = {
	fgs: FG[];
	setFgs: (fgs: FG[]) => void;
};

/**
 * P-SysでAPIから取得したFGマスタ一覧をglobal stateで管理
 */
export const useFgsStore = create<StoreState>()(
	persist(
		(set) => ({
			fgs: [],
			setFgs: (fgs) => set({ fgs }),
		}),
		{
			name: 'fgs-storage', // 永続化(localStorage保存)
		},
	),
);

export type { FG };