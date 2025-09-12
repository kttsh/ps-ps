import type { SetStateAction } from 'react';
import { create } from 'zustand';
import type { Pip } from '@/types';

type StoreState = {
	pipsData: Pip[];
	setPipsData: (pips: Pip[]) => void;
	pipSelection: Record<string, boolean>;
	setPipSelection: (selection: SetStateAction<Record<string, boolean>>) => void;
	isPipFetchError: boolean;
	setIsPipFetchError: (p: boolean) => void;
	shouldFetchPips: boolean;
	setShouldFetchPips: (f: boolean) => void;
};

export const usePipsStore = create<StoreState>()((set) => ({
	pipsData: [],
	setPipsData: (pips) => set({ pipsData: pips }),
	pipSelection: {},
	setPipSelection: (selection) =>
		set((state) => ({
			pipSelection:
				typeof selection === 'function'
					? selection(state.pipSelection)
					: selection,
		})),
	isPipFetchError: false,
	setIsPipFetchError: (p) => set({ isPipFetchError: p }),
	shouldFetchPips: false,
	setShouldFetchPips: (f) => set({ shouldFetchPips: f }),
}));
