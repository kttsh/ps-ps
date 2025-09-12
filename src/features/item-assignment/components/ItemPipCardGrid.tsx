import { AlertCircle, Package, Trash2 } from 'lucide-react';
import { useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { usePipDetailStore } from '@/stores/usePipDetailStore';
import { usePipGenerationModeStore } from '@/stores/usePipGenerationModeStore';
import type { Item } from '@/types';

interface Props {
	committedItems: Item[];
	setCommittedItems: React.Dispatch<React.SetStateAction<Item[]>>;
	setItems: React.Dispatch<React.SetStateAction<Item[]>>;
	nickname: string;
	setNickname: React.Dispatch<React.SetStateAction<string>>;
}

export const ItemPipCardGrid: React.FC<Props> = ({
	committedItems,
	setCommittedItems,
	nickname,
	setNickname,
}) => {
	const { pipGenerationMode } = usePipGenerationModeStore();
	const { pipDetailData } = usePipDetailStore();

	const hasItems = committedItems.length > 0;

	const handleRemoveItem = (itemNo: string) => {
		const removedItem = committedItems.find((item) => item.itemNo === itemNo);
		if (removedItem) {
			setCommittedItems((prev) =>
				prev.filter((item) => item.itemNo !== itemNo),
			);
		}
	};

	const handleQtyChange = (itemNo: string, newQty: number) => {
		setCommittedItems((prev) =>
			prev.map((item) =>
				item.itemNo === itemNo ? { ...item, itemQty: newQty } : item,
			),
		);
	};

	console.log(`committedItems:${JSON.stringify(committedItems)}`);

	useEffect(() => {
		if (pipGenerationMode === 'edit' && pipDetailData) {
			setNickname(pipDetailData.pipNickName ?? '');
			setCommittedItems(
				(pipDetailData.items ?? []).map((item) => ({
					...item,
					itemQty: Number(item.itemAssignedQty),
				})),
			);
		}
	}, [pipGenerationMode, setNickname, setCommittedItems, pipDetailData]);

	return (
		<div className="flex flex-col max-h-full bg-rose-50 rounded-lg border border-rose-200 shadow-sm p-6 pb-8 space-y-6">
			{/* ヘッダー */}
			<div className="flex items-center gap-3 border-b border-gray-300 pb-4">
				<div className="bg-gradient-to-br from-rose-300 to-rose-600 text-white rounded-lg p-2">
					<Package size={24} />
				</div>
				<div>
					<Label className="text-sm text-gray-700">PIP Code</Label>
					<p className="text-sm text-gray-500 font-mono">
						{hasItems
							? `${committedItems[0].itemCostElement.slice(1, 4)}_${committedItems[0].itemIBSCode}`
							: '---'}
					</p>
				</div>
			</div>

			{/* ニックネーム */}
			<div>
				<Label className="text-sm text-gray-700">Nickname</Label>
				<Input
					className="bg-white border-gray-300 mt-1 w-full"
					value={nickname}
					onChange={(e) => setNickname(e.target.value)}
				/>
			</div>

			{/* テーブル表示 */}
			{hasItems ? (
				<div className="overflow-auto">
					<table className="w-full text-xs text-left text-gray-700">
						<thead className="border-b">
							<tr>
								<th className="px-3 py-2">Item No.</th>
								<th className="px-3 py-2">Item Name</th>
								<th className="px-3 py-2">Qty</th>
								<th className="px-3 py-2">Cost Element</th>
								<th className="px-3 py-2">IBS Code</th>
								<th className="px-3 py-2" />
							</tr>
						</thead>
						<tbody>
							{committedItems.map((item) => (
								<tr
									key={`${item.itemNo}-${item.itemSurKey}`}
									className="border-b"
								>
									<td className="px-3 py-2">{item.itemNo}</td>
									<td className="px-3 py-2">{item.itemName}</td>
									<td className="px-3 py-2">
										<Select
											value={String(item.itemQty ?? '')}
											onValueChange={(val) =>
												handleQtyChange(item.itemNo, Number(val))
											}
										>
											<SelectTrigger className="border rounded px-2 py-1 w-[70px] bg-white">
												<SelectValue />
											</SelectTrigger>
											<SelectContent>
												{Array.from(
													{ length: Number(item.itemUnassignedQty) },
													(_, i) => {
														const qty = String(i + 1);
														return (
															<SelectItem key={qty} value={qty}>
																{qty}
															</SelectItem>
														);
													},
												)}
											</SelectContent>
										</Select>
									</td>
									<td className="px-3 py-2">{item.itemCostElement}</td>
									<td className="px-3 py-2">{item.itemIBSCode}</td>
									<td
										className="px-3 py-2 text-rose-500 cursor-pointer"
										onClick={() => handleRemoveItem(item.itemNo)}
									>
										<Trash2 size={18} />
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			) : (
				<div className="flex flex-col items-center justify-center py-12 text-gray-500">
					<AlertCircle size={48} className="text-gray-300 mb-4" />
					<p className="text-sm font-medium">購入品がまだ登録されていません</p>
					<p className="text-xs mt-1">
						左のテーブルから購入品を選択してください
					</p>
				</div>
			)}
		</div>
	);
};
