import { EmptyState } from '@/components';
import { usePipDetailStore } from '@/stores/usePipDetailStore';
import {
	Ship
} from 'lucide-react';
import { PipDetail } from './PipDetail';

/**
 * PIP管理画面右側のPIP詳細エリアの表示切替
 */
export const PipDetailMng = () => {
	const { pipDetailData } = usePipDetailStore();

	// PIP管理画面でPIPレコードが押下されたかで表示画面を切り替え
	return pipDetailData.pipCode ? (
		// PIP管理画面でPIPレコードが押下されたときは紐づく購入品、ベンダーテーブルを表示
		<PipDetail />
	) : (
		<div className="pt-30">
			{/* PIP管理画面でPIPレコードが押下されていないときはアラート画面を表示 */}
			<EmptyState
				icon={Ship}
				label="Displays detailed information about the selected PIP."
			/>
		</div>
	);
};