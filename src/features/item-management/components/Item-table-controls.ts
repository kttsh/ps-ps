import type { Item } from '@/types';
import type { Table } from '@tanstack/react-table';

export interface ItemTableControlsProps {
	data: Item[];
	setData: React.Dispatch<React.SetStateAction<Item[]>>;
	isEditing: boolean;
	setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
	dirtyCells: Record<string, Partial<Item>>;
	setDirtyCells: React.Dispatch<
		React.SetStateAction<Record<string, Partial<Item>>>
	>;
	rowSelection: Record<string, boolean>;
	setRowSelection: React.Dispatch<
		React.SetStateAction<Record<string, boolean>>
	>;
	setShowCheckbox: React.Dispatch<React.SetStateAction<boolean>>;
	selectedCount: number;
	setCommittedItems: React.Dispatch<React.SetStateAction<Item[]>>;
	tableInstance: Table<Item> | null;
	showFilters: boolean;
	setShowFilters: React.Dispatch<React.SetStateAction<boolean>>;
	committedItems: Item[];
	setItemSelection: React.Dispatch<
		React.SetStateAction<Record<string, boolean>>
	>;
	setSelectedCount: React.Dispatch<React.SetStateAction<number>>;
	nickname: string;
	setNickname: React.Dispatch<React.SetStateAction<string>>;
	setGlobalFilter: React.Dispatch<React.SetStateAction<string>>;
}