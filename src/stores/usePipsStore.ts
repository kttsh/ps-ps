import { create } from 'zustand';

type StoreState = {
    isPipFetchError: boolean;
    setIsPipFetchError: (p:boolean) => void;
    shouldFetchPips: boolean;
    setShouldFetchPips: (f:boolean) => void;
};

/**
 * P-SysでAPIから取得したFGマスタ一覧をglobal stateで管理
 */
export const usePipsStore = create<StoreState>()(
        (set) => ({
            isPipFetchError: false,
            setIsPipFetchError: (p) => set({ isPipFetchError: p }),
            shouldFetchPips: false,
            setShouldFetchPips: (f) => set({ shouldFetchPips: f }),
        })
);

