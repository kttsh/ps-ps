import { AlertCircle, Package, Trash2 } from 'lucide-react';
import { PipDataCard } from '@/components/Pip-data-card';
import type { PipDetail } from '@/types';

interface PipDetailPanelProps {
	pips: PipDetail[];
	isAipMode: boolean;
	onRemoveVendor: (pipCode: string, vendorId: string) => void;
	onRemovePip: (pipCode: string) => void;
}

/**
 * PIPカードグリッドコンポーネント
 * 選択されたPIPとその配下のベンダー情報をカード形式で表示する
 *
 * @param pips - 表示するPIPの配列
 * @param isAipMode - AIPモード（ベンダー割り当て）かどうか
 * @param onRemoveVendor - ベンダー削除時のコールバック
 * @param onRemovePip - PIP削除時のコールバック
 */

export const PipCardGrid: React.FC<PipDetailPanelProps> = ({
	pips,
	isAipMode,
	onRemoveVendor,
	onRemovePip,
}) => (
	<div className="bg-white rounded-lg shadow-sm border border-gray-300 flex flex-col py-4 px-8 h-[83%]">
		{/* How: h-[83%]は親コンポーネントの高さに対する相対値
		    Why not: 固定px値ではなく%を使用することで、異なる画面サイズでも適切に表示される */}
		<div className="h-full flex flex-col">
			<h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
				<Package size={20} />
				{/* How: pips.lengthが1より大きい場合のみ件数を表示し、
				    単数の場合はシンプルな表記にすることでUIをすっきりさせる */}
				{pips.length > 1 ? `Selected PIP (${pips.length})` : 'Selected PIP'}
			</h2>

			{/* How: overflow-y-autoにより、PIPが多い場合でも
			    ヘッダーは固定したままコンテンツ部分のみスクロール可能 */}
			<div className="flex-1 space-y-4 overflow-y-auto">
				{pips.map((pip) => (
					<PipDataCard key={pip.pipCode} variant="generatedItem" size="default">
						<PipDataCard.Header
							pipData={{
								code: pip.pipCode,
								nickname: pip.pipNickName,
								type: 'pip',
							}}
							actions={[
								{
									id: 'remove',
									icon: <Trash2 size={20} />,
									/* How: onRemovePipに直接pip.codeを渡すことで、
									   どのPIPを削除するかを親コンポーネントで特定可能 */
									onClick: () => onRemovePip(pip.pipCode),
									tooltip: 'PIPを削除',
									variant: 'danger',
								},
							]}
							metadata={{
								vendorCount: pip.vendors.length,
							}}
						/>
						{/* Why not: isAipModeでない場合（PIP表示モードなど）は
						    ベンダー情報を表示しない設計により、モードごとの表示を制御 */}
						{isAipMode && (
							<PipDataCard.Content
								items={pip.vendors.map((vendor) => ({
									...vendor,
									/* How: vendor.idをtoString()で文字列に変換
									   Why not: PipDataCardが文字列IDを期待するため、
									   数値や他の型のIDも安全に処理できるようにしている */
									id: vendor.vendorId.toString(),
									displayName: vendor.vendorName,
									/* How: vendorIdを別途保持することで、
									   削除時に元のID型（string/number）を維持 */
									vendorId: vendor.vendorId,
								}))}
								renderItem={(vendor) => (
									<PipDataCard.Item
										actions={[
											{
												id: 'remove',
												icon: <Trash2 size={16} />,
												/* How: pip.codeとvendor.vendorIdの両方を渡すことで、
												   どのPIPのどのベンダーかを一意に特定可能 */
												onClick: () =>
													onRemoveVendor(pip.pipCode, vendor.vendorId),
												tooltip: 'ベンダーを削除',
												variant: 'danger',
											},
										]}
									>
										<span className="text-xs px-2">{vendor.displayName}</span>
									</PipDataCard.Item>
								)}
								/* How: ベンダーが未割り当ての場合の空状態表示
								   Why not: 単に空白にするのではなく、明確な指示を表示することで
								   ユーザーが次に何をすべきかを理解しやすくする */
								emptyState={{
									icon: <AlertCircle size={48} className="text-gray-300" />,
									title: 'No vendor has been assigned yet.',
									description:
										'Please select a vendor from the table on the left and assign it.',
								}}
							/>
						)}
					</PipDataCard>
				))}
			</div>
		</div>
	</div>
);