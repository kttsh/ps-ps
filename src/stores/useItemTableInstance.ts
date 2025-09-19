import type { Table } from '@tanstack/react-table';
import { create } from 'zustand';
import type { Item } from '@/types';

type StoreState = {
	itemTableInstance: Table<Item> | null;
	setItemTableInstance: (tableInstance: Table<Item>) => void;
};

export const useItemTableInstance = create<StoreState>()((set) => ({
	itemTableInstance: null,
	setItemTableInstance: (itemTableInstance) => set({ itemTableInstance }),
}));