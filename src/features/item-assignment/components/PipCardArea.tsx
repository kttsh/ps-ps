import { Plus, Trash2 } from 'lucide-react';
import { useContext, useEffect } from 'react';
import { EmptyState } from '@/components';
import type { Item } from '@/types';
import { PSysContext } from '../../../routes/ps-ps/route';

/**
 * 購入品管理画面 PIPカードなしのアラート/PIPカード表示エリア
 * committedItems: 割当確定後のレコード一覧
 */
type PipCardAreaProps = {
	committedItems: Item[];
	setCommittedItems: React.Dispatch<React.SetStateAction<Item[]>>;
	setData: React.Dispatch<React.SetStateAction<Item[]>>;
	pipNickName: string;
	setPipNickName: React.Dispatch<React.SetStateAction<string>>;
	selectedQtyMap: Record<string, string>;
	setSelectedQtyMap: React.Dispatch<
		React.SetStateAction<Record<string, string>>
	>;
};

export const PipCardArea = ({
	committedItems, // PIPカードエリアに表示する購入品
	setCommittedItems, // PIPカードエリアに表示する購入品の更新関数
	setData, // 購入品の更新関数
	pipNickName, // 入力されたPIPニックネーム
	setPipNickName, // 入力されたPIPニックネームの更新関数
	selectedQtyMap, // セレクトボックス(数量)の入力状態
	setSelectedQtyMap, // セレクトボックス(数量)の入力状態の更新関数
}: PipCardAreaProps) => {
	// コンテキストから値を取得: サイドバーの表示状態, PIP管理画面で選択されたpipDataの対象
	const { isSidebar, selectedPipData } = useContext(PSysContext);

	// 画面表示用PIPコード
	const tempPipCode = isSidebar
		? `${committedItems[0]?.costElement.slice(-3)}_${committedItems[0]?.ibsCode}` // PIP生成時は仮採番(連番部分を除く)
		: `${selectedPipData.code}`; // PIP管理画面から遷移時は実際の値

	// 各行の削除処理
	const handleDelete = (targetItemIndex: number) => {
		// PIPカードエリア表示内容更新
		setCommittedItems((prevCommitted) => {
			const removedItem = prevCommitted[targetItemIndex];
			const updatedCommitted = prevCommitted.filter(
				(_, index) => index !== targetItemIndex,
			);

			// PIP編集時
			if (!removedItem.__restQtyUpdated && !isSidebar) {
				const matchedPipItem = selectedPipData.items.find(
					(i) => i.itemNo === removedItem.itemNo,
				);

				if (matchedPipItem) {
					removedItem.originalRestQty = removedItem.itemRestQty; // 元の値を保存
					removedItem.itemRestQty += matchedPipItem.qty;
					removedItem.__restQtyUpdated = true; // フラグを立てる
				}
			}

			// 購入品一覧エリア表示内容更新
			setData((prevData) => {
				if (!prevData.includes(removedItem)) {
					const newData = [...prevData, removedItem];
					// ソート処理
					newData.sort((a, b) => a.itemName.localeCompare(b.itemName));
					return newData;
				}
				return prevData;
			});

			// 保持値のリセット（対象の itemSurKey のみ）
			if (removedItem.itemSurKey) {
				setSelectedQtyMap((prev) => {
					const updated = { ...prev };
					delete updated[removedItem.itemSurKey];
					return updated;
				});
			}

			// 最後の1件を削除する際はニックネームをリセット
			if (prevCommitted.length === 1) {
				setPipNickName('');
			}

			return updatedCommitted;
		});
	};

	// 数量変更処理(数量セレクトボックスの値が変更されたとき)
	const handleQtyChange = (itemSurKey: string, newQty: string) => {
		setSelectedQtyMap((prev) => ({
			...prev,
			[itemSurKey]: newQty,
		}));
	};

	// セレクトボックスの初期値をuseStateで管理する
	useEffect(() => {
		if (!isSidebar && selectedPipData?.items) {
			committedItems.forEach((item) => {
				const initialQty =
					selectedPipData.items
						.find((i) => i.itemNo === item.itemNo)
						?.qty.toString() ?? '1';

				setSelectedQtyMap((prev) => {
					if (prev[item.itemSurKey]) return prev;
					return {
						...prev,
						[item.itemSurKey]: initialQty,
					};
				});
			});
		} else {
			committedItems.forEach((item) => {
				const initialQty = item.itemRestQty.toString();

				setSelectedQtyMap((prev) => {
					if (prev[item.itemSurKey]) return prev;
					return {
						...prev,
						[item.itemSurKey]: initialQty,
					};
				});
			});
		}
	}, [committedItems, isSidebar, selectedPipData]);

	return committedItems.length === 0 ? (
		// PIPカードなしのアラート
		<div className="pt-30">
			<EmptyState icon={Plus} label="アイテムを選択してPIPを生成してください" />
		</div>
	) : (
		// PIPカード表示エリア
		<div className="bg-white rounded-lg shadow-sm border border-gray-300 flex flex-col h-[80%]">
			<div className="flex items-start gap-4">
				<div>
					<p className="text-sm font-medium">PIP</p>
					<p className="text-lg font-semibold px-2 py-1">{tempPipCode}</p>
				</div>
				<div className="flex flex-col gap-1">
					<p className="text-sm font-medium">Nickname</p>
					<input
						type="text"
						placeholder="input Nickname"
						value={pipNickName}
						onChange={(e) => setPipNickName(e.target.value)}
						className="h-8 w-64 text-xs px-2 rounded-sm bg-white border border-gray-300 placeholder:font-light"
					/>
				</div>
			</div>
			<table className="table-auto border-collapse w-full text-sm">
				<thead className="sticky top-0 bg-gray-50 border-b">
					<tr>
						<th className="px-4 py-2 text-left text-xs text-gray-800">
							Item No.
						</th>
						<th className="px-4 py-2 text-left text-xs text-gray-800">
							Item Name
						</th>
						<th className="px-4 py-2 text-left text-xs text-gray-800">Qty</th>
						<th className="px-4 py-2 text-left text-xs text-gray-800">
							Cost Element
						</th>
						<th className="px-4 py-2 text-left text-xs text-gray-800">
							Ibs Code
						</th>
						<th className="px-4 py-2 text-left text-xs text-gray-800" />
					</tr>
				</thead>
				<tbody>
					{committedItems.map((item, index) => (
						<tr key={index} className="border-b hover:bg-gray-50">
							<td className="px-4 py-2">{item.itemNo}</td>
							<td className="px-4 py-2">{item.itemName}</td>
							<td className="px-4 py-2">
								<select
									value={
										selectedQtyMap[item.itemSurKey] ??
										(isSidebar
											? item.itemRestQty.toString() // PIP作成画面:初期値は未割当数量
											: (selectedPipData.items
													.find((i) => i.itemNo === item.itemNo)
													?.qty.toString() ?? '1')) // PIP編集画面:初期値は画面で選択したPIP
									}
									className="border border-gray-300 rounded px-2 py-1"
									onChange={(e) =>
										handleQtyChange(item.itemSurKey, e.target.value)
									}
								>
									{Array.from(
										{
											length: isSidebar
												? item.itemRestQty // PIP作成画面:最大値は未割当数量
												: (selectedPipData.items.find(
														(i) => i.itemNo === item.itemNo,
													)?.qty ?? 0) +
													(item.originalRestQty ?? item.itemRestQty), // PIP編集画面:最大値は画面で選択したPIP + 未割当数量
										},
										(_, i) => i + 1,
									).map((num) => (
										<option key={num} value={num}>
											{num}
										</option>
									))}
								</select>
							</td>
							<td className="px-4 py-2">{item.costElement}</td>
							<td className="px-4 py-2">{item.ibsCode}</td>
							<td className="px-4 py-2 text-center">
								<button
									onClick={() => handleDelete(index)}
									className="text-red-500 hover:text-red-700"
									title="削除"
								>
									<Trash2 className="w-5 h-5 inline" />
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};
