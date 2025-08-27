/**
 * PIPテーブルのセル単位で条件に応じたスタイルクラスを返す関数
 * columnId: 現在の列id
 * value: セルの表示値
 */
export const stylePipCell = ({
	columnId,
	value,
}: {
	columnId: string;
	value: unknown;
}): string | undefined => {
	// Item Count, Vendor Countは右寄せ
	return (columnId === 'itemCount' || columnId === 'vendorCount') &&
		typeof value === 'number'
		? 'text-right'
		: undefined;
};
