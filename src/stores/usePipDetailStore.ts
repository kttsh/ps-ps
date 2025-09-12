import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { PipDetail } from '@/types';

type StoreState = {
	pipDetailData: PipDetail;
	setPipDetailData: (pipDetail: PipDetail) => void;
	selectedPipCode: string | undefined;
	setSelectedPipCode: (selectedPipCode: string | undefined) => void;
};

export const usePipDetailStore = create<StoreState>()(
	persist(
		(set) => ({
			pipDetailData: {
				jobNo: '',
				fgCode: '',
				pipCode: '',
				pipNickName: '',
				pipSortKey: '',
				itemCount: 0,
				vendorCount: 0,
				items: [],
				vendors: [],
			},
			setPipDetailData: (pip) => set({ pipDetailData: pip }),
			selectedPipCode: undefined,
			setSelectedPipCode: (pipCode) => set({ selectedPipCode: pipCode }),
		}),
		{
			name: 'selectedPipCode-storage', // localStorage に保存されるキー名
		},
	),
);
