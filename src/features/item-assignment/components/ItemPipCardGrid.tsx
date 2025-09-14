import { AlertCircle, Package, Trash2 } from 'lucide-react';
import { useEffect, useMemo } from 'react';
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

	// This function is no longer needed as we'll calculate directly in generateQtyOptions

	// 数量選択肢を生成
	const generateQtyOptions = useMemo(() => {
		return (item: Item): number[] => {
			// 編集モードの場合
			if (pipGenerationMode === 'edit') {
				// Note: In edit mode, item.itemQty is the current PIP allocation
				// and this is stored in committedItems after being set from itemAssignedQty
				const currentPipQty = Number(item.itemQty || 0);
				
				// pipDetailDataから元のアイテムデータを取得して正確な未割当数量を計算
				const originalItem = pipDetailData?.items?.find(
					(origItem) => origItem.itemNo === item.itemNo
				);
				
				if (originalItem) {
					// 元のアイテムの総数量と割当済み数量から利用可能数量を計算
					const originalUnassignedQty = Number(originalItem.itemUnassignedQty || 0);
					const originalAssignedQty = Number(originalItem.itemAssignedQty || 0);
					
					// 現在のPIP割当量（編集中の値）
					const currentPipAllocation = Number(item.itemQty || 0);
					
					// 他のPIPに割当済みの数量 = 元の割当済み数量 - 元のこのPIPの割当量
					const otherPipAllocations = originalAssignedQty - currentPipAllocation;
					
					// 実際に利用可能な数量 = 元の未割当数量 + 現在のPIP割当量
					const actualAvailableQty = originalUnassignedQty + currentPipAllocation;
					
					// 割当超過の場合（利用可能数量が0以下）は減少のみ可能
					if (originalUnassignedQty <= 0 && currentPipAllocation > 0) {
						// 0から現在値までの選択肢（減らすことのみ可能）
						return Array.from({ length: currentPipAllocation + 1 }, (_, i) => i);
					}
					
					// 通常: 0から実際に利用可能な数量まで
					const maxSelectableQty = actualAvailableQty;
					return Array.from({ length: maxSelectableQty + 1 }, (_, i) => i);
				}
				
				// originalItemが見つからない場合は現在値から減らすことのみ可能
				return Array.from({ length: currentPipQty + 1 }, (_, i) => i);
			}
			
			// 新規作成モード: 1から未割当数量まで
			const unassignedQty = Number(item.itemUnassignedQty || 0);
			return Array.from({ length: unassignedQty }, (_, i) => i + 1);
		};
	}, [pipGenerationMode, pipDetailData]);;;;

	console.log(`committedItems:${JSON.stringify(committedItems)}`);

	useEffect(() => {
		if (pipGenerationMode === 'edit' && pipDetailData) {
			setNickname(pipDetailData.pipNickName ?? '');
			
			setCommittedItems(
				(pipDetailData.items ?? []).map((item) => ({
					...item,
					itemQty: Number(item.itemAssignedQty), // 現在のPIP割当量
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
							{committedItems.map((item) => {
								const currentQty = Number(item.itemQty || 0);
								const options = generateQtyOptions(item);
								const maxQty = Math.max(...options, 0);
								
								return (
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
												<SelectTrigger 
													className="border rounded px-2 py-1 w-[90px] bg-white"
												>
													<SelectValue />
												</SelectTrigger>
												<SelectContent>
													{options.map((qty) => {
														const isCurrentValue = qty === currentQty;
														const isMaxValue = qty === maxQty && qty > 0;
														
														return (
															<SelectItem key={qty} value={String(qty)}>
																<span className="flex items-center gap-2">
																	{qty}
																	{isCurrentValue && (
																		<span className="text-xs text-gray-500">(現在)</span>
																	)}
																	{isMaxValue && (
																		<span className="text-xs text-blue-500">(最大)</span>
																	)}
																	{qty === 0 && (
																		<span className="text-xs text-red-500">(解除)</span>
																	)}
																</span>
															</SelectItem>
														);
													})}
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
								);
							})}
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
