import type { Table } from '@tanstack/react-table';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Item } from '@/types';

type StoreState = {
	itemTableInstance: Table<Item> | null;
	setItemTableInstance: (tableInstance: Table<Item>) => void;
};

export const useItemTableInstance = create<StoreState>()(
	persist(
		(set) => ({
			itemTableInstance: null,
			setItemTableInstance: (itemTableInstance) => set({ itemTableInstance }),
		}),
		{
			name: 'itemTableInstance-storage', // localStorage に保存されるキー名
		},
	),
);
