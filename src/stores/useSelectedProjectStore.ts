import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// 選択プロジェクト
type SelectedProject = {
	projectId: string;
	projectNm: string;
	jobNos: string[];
	jobOrderNos: string[];
};

type StoreState = {
	selectedProject: SelectedProject | null;
	setSelectedProject: (project: SelectedProject | null) => void;
};

/**
 * home画面で選択するプロジェクトの選択状態をglobal stateで管理
 */

export const useSelectedProjectStore = create<StoreState>()(
	persist(
		(set) => ({
			selectedProject: null,
			setSelectedProject: (selectedProject) => set({ selectedProject }),
		}),
		{
			name: 'selectedProject-storage', // 永続化(localStorage保存)
		},
	),
);
