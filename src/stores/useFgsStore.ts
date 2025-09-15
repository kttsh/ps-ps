import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// P-Sysで選択するFGの型
export type FG = {
	fgCode: string;
	fgName: string; // "A:ABCD" 形式
};

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
