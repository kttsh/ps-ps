import { AlertCircle, Package, Trash2 } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
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
	
	// 編集モード用: 元のアイテムデータを保持
	const [originalItemsMap, setOriginalItemsMap] = useState<Map<string, Item>>(new Map());

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

	// 最大選択可能数量を計算
	const calculateMaxQty = useMemo(() => {
		return (item: Item): number => {
			// 新規作成モードの場合
			if (pipGenerationMode === 'generation') {
				return Number(item.itemUnassignedQty || 0);
			}
			
			// 編集モードの場合
			if (pipGenerationMode === 'edit') {
				const currentPipQty = Number(item.itemQty || 0);
				const originalItem = originalItemsMap.get(item.itemNo);
				
				if (originalItem) {
					// 元データから未割当数量を計算
					const totalQty = Number(originalItem.itemQty || 0);
					const totalAssignedQty = Number(originalItem.itemAssignedQty || 0);
					const unassignedQty = totalQty - totalAssignedQty;
					
					// 割当超過チェック
					if (unassignedQty < 0) {
						// 割当超過の場合は現在の割当量が上限
						return currentPipQty;
					}
					
					// 通常: 現在のPIP割当量 + 未割当数量
					return currentPipQty + unassignedQty;
				}
				
				return currentPipQty;
			}
			
			return 0;
		};
	}, [pipGenerationMode, originalItemsMap]);

	// 数量選択肢を生成
	const generateQtyOptions = useMemo(() => {
		return (item: Item): number[] => {
			const maxQty = calculateMaxQty(item);
			const currentQty = Number(item.itemQty || 0);
			
			// 編集モードで割当超過の場合（減少のみ）
			if (pipGenerationMode === 'edit') {
				const originalItem = originalItemsMap.get(item.itemNo);
				if (originalItem) {
					const totalQty = Number(originalItem.itemQty || 0);
					const totalAssignedQty = Number(originalItem.itemAssignedQty || 0);
					const unassignedQty = totalQty - totalAssignedQty;
					
					if (unassignedQty < 0) {
						// 0から現在値までの選択肢
						return Array.from({ length: currentQty + 1 }, (_, i) => i);
					}
				}
			}
			
			// 通常: 1から最大値まで（新規作成）または0から最大値まで（編集）
			if (pipGenerationMode === 'edit') {
				return Array.from({ length: maxQty + 1 }, (_, i) => i);
			}
			return Array.from({ length: maxQty }, (_, i) => i + 1);
		};
	}, [pipGenerationMode, calculateMaxQty, originalItemsMap]);

	console.log(`committedItems:${JSON.stringify(committedItems)}`);

	useEffect(() => {
		if (pipGenerationMode === 'edit' && pipDetailData) {
			setNickname(pipDetailData.pipNickName ?? '');
			
			// 元のアイテムデータを保持
			const originals = new Map<string, Item>();
			pipDetailData.items?.forEach((item) => {
				originals.set(item.itemNo, {
					...item,
					// APIレスポンスの構造に応じて調整が必要
					itemQty: item.itemQty,
					itemAssignedQty: item.itemAssignedQty,
				});
			});
			setOriginalItemsMap(originals);
			
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
								const maxQty = calculateMaxQty(item);
								const currentQty = Number(item.itemQty || 0);
								const options = generateQtyOptions(item);
								
								// 割当超過チェック
								const originalItem = originalItemsMap.get(item.itemNo);
								const isOverAllocated = pipGenerationMode === 'edit' && 
									originalItem && 
									(Number(originalItem.itemQty || 0) - Number(originalItem.itemAssignedQty || 0)) < 0;
								
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
													className={`border rounded px-2 py-1 w-[90px] bg-white ${
														isOverAllocated ? 'border-orange-400' : ''
													}`}
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
																	{isMaxValue && !isOverAllocated && (
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
											{isOverAllocated && (
												<div className="text-xs text-orange-600 mt-1">
													割当超過
												</div>
											)}
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
