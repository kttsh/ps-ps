import { create } from 'zustand';

/**
 * Display by Selection ボタンの押下状態を管理するストア
 * - triggerState: 'none' | 'search' | 'research' のいずれか
 * - triggerSearch: 検索をトリガー（'search' に設定）
 * - triggerResearch: 再検索をトリガー（'research' に設定）
 * - resetSearchTrigger: 状態を 'none' に戻す（検索完了後など）
 */

type TriggerState = 'none' | 'search' | 'research';

type SearchTriggerStore = {
	triggerState: TriggerState;
	triggerSearch: () => void;
	triggerResearch: () => void;
	resetSearchTrigger: () => void;
};

export const useIsSearchTriggeredStore = create<SearchTriggerStore>((set) => ({
	triggerState: 'none',
	triggerSearch: () => set({ triggerState: 'search' }),
	triggerResearch: () => set({ triggerState: 'research' }),
	resetSearchTrigger: () => set({ triggerState: 'none' }),
}));
