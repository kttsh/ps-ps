import type {
	QueryObserverResult,
	RefetchOptions,
} from '@tanstack/react-query';
import { transformPipDetailResponseToPipDetail } from '@/features/item-assignment/utils/transformPipDetailResponseToPipDetail';
import type { GetItemsResponse } from '@/features/item-management/hooks/useItems';
import type { GetPipDetailResponse } from '@/features/pip-management/hooks/usePipDetail';
import { usePipDetailStore } from '@/stores/usePipDetailStore';
import { usePipGenerationModeStore } from '@/stores/usePipGenerationModeStore';

/**
 * アイテム割り当て画面への遷移処理を生成する関数。
 * PIP詳細の取得 → 状態更新 → 画面遷移 → アイテム再取得 という一連の処理をまとめて返す。
 *
 * @param navigate - 画面遷移関数（TanStack Routerなど）
 * @param currentSearch - 現在の検索パラメータ（画面遷移時に保持）
 */
export const useNavigateToAssignment = ({
	navigate,
	currentSearch,
}: {
	navigate: (params: {
		to: string;
		search: {
			fgcode?: string;
			selectedPips?: string;
			mode?: 'pip' | 'aip';
		};
	}) => void;
	currentSearch: {
		fgcode?: string;
		selectedPips?: string;
		mode?: 'pip' | 'aip';
	};
}) => {
	// Zustand ストアから必要な更新関数を取得
	const { setPipDetailData } = usePipDetailStore();
	const { setPipGenerationMode } = usePipGenerationModeStore();

	return async (
		pipDetailRefetch: (
			options?: RefetchOptions | undefined,
		) => Promise<QueryObserverResult<GetPipDetailResponse, Error>>,
		itemsRefetch: (
			options?: RefetchOptions | undefined,
		) => Promise<QueryObserverResult<GetItemsResponse, Error>>,
	) => {
		//  fgCode,jobNo,pipCodeが確実にsetされてからrefetchするために0.1秒待機
		await new Promise((r) => setTimeout(r, 100));
		// PIP詳細を取得
		const pipDetailResponse = await pipDetailRefetch();

		// データが存在する場合のみ処理を続行
		if (pipDetailResponse.data?.pipDetail) {
			// レスポンスを内部データ構造に変換
			const transformed = transformPipDetailResponseToPipDetail(
				pipDetailResponse.data?.pipDetail,
			);

			// 状態にPIP詳細をセット
			setPipDetailData(transformed);

			// アイテム割り当て画面へ遷移（検索パラメータを保持）
			navigate({ to: '/p-sys/item-assignment', search: currentSearch });

			// PIP生成モードを「編集」に設定
			setPipGenerationMode('edit');

			// アイテム情報を再取得
			itemsRefetch();
		}
	};
};