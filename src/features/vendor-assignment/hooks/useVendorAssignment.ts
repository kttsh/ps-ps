import { useCallback } from 'react';
import type { Vendor } from '@/types';
import type {
	UseVendorAssignmentProps,
	UseVendorAssignmentReturn,
} from '../types';

/**
 * ベンダー割り当て処理を管理するカスタムフック
 *
 * How: 選択された複数のPIPに対して、ベンダーの一括割り当て・削除・PIP自体の削除を行う
 * 状態管理は親コンポーネントに委譲し、このフックは更新ロジックのみを提供する
 */
export const useVendorAssignment = ({
	selectedPips,
	onPipsUpdate,
}: UseVendorAssignmentProps): UseVendorAssignmentReturn => {
	/**
	 * 選択されたベンダーをPIPに割り当てる
	 *
	 * How: 選択された全てのPIPに対して、同じベンダーセットを一括で追加する
	 * Why not: 重複チェックを行っていないのは、呼び出し元で既に割り当て済みベンダーを
	 *          除外したリストから選択しているため
	 */
	const assignVendors = useCallback(
		(vendors: Vendor[]) => {
			// How: Vendor型をVendor型に変換しているように見えるが、実際は
			// マスターデータのVendor型に、割り当て固有の情報（status, assignedDate）を追加している
			// Why not: 型名が同じなのは、importされているVendor型と
			//          このフック内で使用するVendor型が異なる定義のため（型の重複に注意）
			const newVendors: Vendor[] = vendors.map((vendor) => ({
				...vendor,
				// How: 新規割り当て時は常に'active'ステータスで登録
				status: 'active' as const,
				// How: 割り当て日は現在日付のYYYY-MM-DD形式で記録
				assignedDate: new Date().toISOString().split('T')[0],
			}));

			// How: 全てのPIPに対して同じベンダーセットを追加する（一括割り当て）
			// Why not: map内でスプレッド演算子を使用しているため、
			//          各PIPの既存ベンダーリストは保持される
			const updatedPips = selectedPips.map((pip) => ({
				...pip,
				vendors: [...pip.vendors, ...newVendors],
			}));

			// How: 更新されたPIPリストを親コンポーネントに通知
			// Why not: 非同期処理やエラーハンドリングがないのは、
			//          このフックは純粋な状態更新ロジックのみを提供し、
			//          実際のAPI通信等は親コンポーネントの責務としているため
			onPipsUpdate(updatedPips);
		},
		[selectedPips, onPipsUpdate],
	);

	/**
	 * 特定のPIPから特定のベンダーを削除する
	 *
	 * How: pipCodeで対象PIPを特定し、そのPIPのvendorsリストから
	 *      vendorIdに一致するベンダーを除外する
	 */
	const removeVendor = useCallback(
		(pipCode: string, vendorId: string) => {
			const updatedPips = selectedPips.map((pip) =>
				// How: 対象PIPのみvendorsを更新し、他のPIPはそのまま返す
				pip.pipCode === pipCode
					? {
							...pip,
							// How: filterでvendorIdが一致しないものだけを残す
							vendors: pip.vendors.filter(
								(vendor) => vendor.vendorId !== vendorId,
							),
						}
					: pip,
			);

			onPipsUpdate(updatedPips);
		},
		[selectedPips, onPipsUpdate],
	);

	/**
	 * PIPリストから特定のPIPを削除する
	 *
	 * How: pipCodeに一致するPIPを配列から完全に除外する
	 * Why not: 削除確認は呼び出し元で行うため、このメソッドは
	 *          確認なしで即座に削除を実行する
	 */

	const removePip = useCallback(
		(pipCode: string) => {
			const updatedPips = selectedPips.filter((pip) => pip.pipCode !== pipCode);
			onPipsUpdate(updatedPips);
		},
		[selectedPips, onPipsUpdate],
	);

	return {
		assignVendors,
		removeVendor,
		removePip,
	};
};
