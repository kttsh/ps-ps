import type { Item } from '@/types';

/**
 * 購入品テーブルのセル単位で条件に応じたスタイルクラスを返す関数
 * columnId: 現在の列id
 * value: セルの表示値
 */
export const styleItemCell = ({
	columnId,
	value,
}: {
	row: Item;
	columnId: string;
	value: unknown;
}): string | undefined => {
	// 数量（Qty）は右寄せ
	if (columnId === 'qty' && typeof value === 'number') {
		return 'text-right';
	}

	// 割当ステータスは中央寄せ
	if (columnId === 'itemAssignmentStatus') {
		return 'text-center';
	}

	return undefined;
};
