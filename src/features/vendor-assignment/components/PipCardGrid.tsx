import { AlertCircle, Package, Trash2 } from 'lucide-react';
import { PipDataCard } from '@/components/pip-data-card';
import type { Pip, Vendor } from '@/types';

interface PipDetailPanelProps {
	pips: Pip[];
	isAipMode: boolean;
	//onRemoveVendor: (pipCode: string, vendorId: string) => void;
	//onRemovePip: (pipCode: string) => void;
	selectedVendors: Vendor[];
	setSelectedVendors: React.Dispatch<React.SetStateAction<Vendor[]>>;
	availableVendors: Vendor[];
	setAvailableVendors: React.Dispatch<React.SetStateAction<Vendor[]>>;
}

/**
 * PIPカードグリッドコンポーネント
 * 選択されたPIPとその配下のベンダー情報をカード形式で表示する
 *
 * @param pips - 表示するPIPの配列
 * @param isAipMode - AIPモード（ベンダー割り当て）かどうか
 * @param onRemoveVendor - ベンダー削除時のコールバック
 * @param onRemovePip - PIP削除時のコールバック
 * @param selectedVendors - 画面上で選択されたベンダー
 */

export const PipCardGrid: React.FC<PipDetailPanelProps> = ({
	pips,
	isAipMode,
	//onRemoveVendor,
	//onRemovePip,
	selectedVendors,
	setSelectedVendors,
	setAvailableVendors,
}) => {
	// 削除ボタン押下
	const handleDelete = (selectedVendor: Vendor) => {
		// 画面右側を更新
		setSelectedVendors((prev) =>
			prev.filter(
				(vendor) => vendor.aipPsysVendorId !== selectedVendor.aipPsysVendorId,
			),
		);

		// 画面左側を更新
		setAvailableVendors((prev) => [...prev, selectedVendor]);
	};

	return (
		<div className="bg-white rounded-lg shadow-sm border border-gray-300 flex flex-col py-4 px-8 h-[83%]">
			{/* How: h-[83%]は親コンポーネントの高さに対する相対値
		    Why not: 固定px値ではなく%を使用することで、異なる画面サイズでも適切に表示される */}
			<div className="h-full flex flex-col">
				<h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
					<Package size={20} />
					{/* How: pips.lengthが1より大きい場合のみ件数を表示し、
				    単数の場合はシンプルな表記にすることでUIをすっきりさせる */}
					{pips.length > 1
						? `選択されたPIP (${pips.length}件)`
						: '選択されたPIP'}
				</h2>

				{/* How: overflow-y-autoにより、PIPが多い場合でも
			    ヘッダーは固定したままコンテンツ部分のみスクロール可能 */}
				<div className="flex-1 space-y-4 overflow-y-auto">
					{pips.map((pip) => (
						<PipDataCard key={pip.code} variant="generatedItem" size="default">
							<PipDataCard.Header
								pipData={{
									code: pip.code,
									nickname: pip.nickname,
									type: 'pip',
								}}
								actions={[
									{
										id: 'remove',
										//icon: <Trash2 size={16} />,
										/* How: onRemovePipに直接pip.codeを渡すことで、
									   どのPIPを削除するかを親コンポーネントで特定可能 */
										//onClick: () => onRemovePip(pip.code),
										tooltip: 'PIPを削除',
										variant: 'danger',
									},
								]}
								metadata={{
									vendorCount: selectedVendors.length,
								}}
							/>
							{/* Why not: isAipModeでない場合（PIP表示モードなど）は
						    ベンダー情報を表示しない設計により、モードごとの表示を制御 */}
							{isAipMode && (
								<PipDataCard.Content
									items={selectedVendors.map((vendor) => ({
										...vendor,
										/* How: vendor.idをtoString()で文字列に変換
									   Why not: PipDataCardが文字列IDを期待するため、
									   数値や他の型のIDも安全に処理できるようにしている */
										id: vendor.aipPsysVendorId.toString(),
										displayName: vendor.vendorName,
										/* How: vendorIdを別途保持することで、
									   削除時に元のID型（string/number）を維持 */
										displayCode: vendor.vendorCode,
										vendorId: vendor.aipPsysVendorId,
									}))}
									renderItem={(vendor) => (
										<PipDataCard.Item
											actions={[
												{
													id: 'remove',
													icon: <Trash2 size={12} />,
													/* How: pip.codeとvendor.vendorIdの両方を渡すことで、
												   どのPIPのどのベンダーかを一意に特定可能 */
													onClick: () =>
														//onRemoveVendor(pip.code, vendor.vendorId),
														handleDelete(vendor),
													tooltip: 'ベンダーを削除',
													variant: 'danger',
												},
											]}
										>
											<div className="flex justify-between items-center">
												<span className="text-sm">{vendor.displayName}</span>
												<span className="text-sm ">{vendor.displayCode}</span>
											</div>
										</PipDataCard.Item>
									)}
									/* How: ベンダーが未割り当ての場合の空状態表示
								   Why not: 単に空白にするのではなく、明確な指示を表示することで
								   ユーザーが次に何をすべきかを理解しやすくする */
									emptyState={{
										icon: <AlertCircle size={48} className="text-gray-300" />,
										title: 'まだベンダーが割り当てられていません',
										description:
											'左のテーブルからベンダーを選択して割り当ててください',
									}}
								/>
							)}
						</PipDataCard>
					))}
				</div>
			</div>
		</div>
	);
};
