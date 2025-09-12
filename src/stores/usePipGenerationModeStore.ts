import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * 購入品管理/PIP生成画面のモード
 * display: 購入品管理画面でテーブルのみ表示
 * generation: PIP生成モード
 * edit: PIP編集モード
 * copy: PIP複製モード
 */
export type pipGenerationModeType = 'display' | 'generation' | 'edit' | 'copy';

type PipGenerationModeStore = {
	pipGenerationMode: pipGenerationModeType;
	setPipGenerationMode: (
		next:
			| pipGenerationModeType
			| ((current: pipGenerationModeType) => pipGenerationModeType),
	) => void;
};

/**
 * 購入品管理/PIP生成画面のモードのglobal state(デフォルトはdisplay)
 */
export const usePipGenerationModeStore = create<PipGenerationModeStore>()(
	persist(
		(set) => ({
			pipGenerationMode: 'display',
			setPipGenerationMode: (next) =>
				set((state) => ({
					pipGenerationMode:
						typeof next === 'function' ? next(state.pipGenerationMode) : next,
				})),
		}),
		{
			name: 'pipGenerationMode-storage', // 永続化(localStorage保存)
		},
	),
);
