import type { Table } from '@tanstack/react-table';
import type { Item } from '@/types';

// ItemTableControlsのprop定義を外部ファイル化
export interface ItemTableControlsProps {
	data: Item[]; // 購入品データの配列
	setData: React.Dispatch<React.SetStateAction<Item[]>>; // データ更新関数（保存・削除時に使用）
	isEditing: boolean; // 編集モードの切り替え関数
	setIsEditing: React.Dispatch<React.SetStateAction<boolean>>; // 編集モードの切り替え関数
	dirtyCells: Record<string, Partial<Item>>; // 編集されたセルの差分（itemNoごとの変更内容）
	setDirtyCells: React.Dispatch<
		React.SetStateAction<Record<string, Partial<Item>>>
	>; // 差分の更新関数
	rowSelection: Record<string, boolean>; // 行の選択状態（itemNo: true/false）
	setRowSelection: React.Dispatch<
		React.SetStateAction<Record<string, boolean>>
	>; // 選択状態の更新関数
	committedItems: Item[]; // PIPに割り当てるアイテム
	showCheckbox: boolean; // チェックボックス列の表示有無
	setShowCheckbox: React.Dispatch<React.SetStateAction<boolean>>; // チェックボックス列の表示切り替え関数
	selectedCount: number; // 選択された行数
	setCommittedItems: React.Dispatch<React.SetStateAction<Item[]>>; // PIPに割り当てるアイテムの更新関数
	tableInstance: Table<Item> | null; // テーブルインスタンス（フィルタ操作に使用）
	showFilters: boolean; // フィルタ表示状態
	setShowFilters: React.Dispatch<React.SetStateAction<boolean>>; // フィルタ表示状態の更新関数
	pipNickName: string; // PIPニックネームの入力値
	setPipNickName: React.Dispatch<React.SetStateAction<string>>; // 入力されたPIPニックネームの更新関数
	selectedQtyMap: Record<string, string>; // PIPカードエリアでのセレクトボックス(数量)の入力状態
	setSelectedQtyMap: React.Dispatch<
		React.SetStateAction<Record<string, string>>
	>; // PIPカードエリアでのセレクトボックス(数量)の入力状態更新
}

