/**
 * ベンダーテーブルのセル単位で条件に応じたスタイルクラスを返す関数
 * columnId: 現在の列id
 * value: セルの表示値
 */
export const styleVendorCell = ({
	columnId,
	value,
}: {
	columnId: string;
	value: unknown;
}): string | undefined => {
	return columnId === 'name' && typeof value === 'string'
		? '' // tailwind cssのコードを書くとセルにスタイルが当たる（例：bg-yellow-50）
		: undefined; // 条件に合わない場合はクラスなし
};

