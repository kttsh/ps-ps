import type { FlexGrid } from '@mescius/wijmo.grid';
import { useEvent } from 'react-use-event-hook';
import { FlexGridContextMenu } from '../components/FlexGridContextMenu';
import { createCellTemplate } from '../utils/createCellTemplate';
import { initInfiniteScrollHandler } from '../utils/initInfiniteScrollHandler';
import type { InitializeMilestoneGridProps } from './InitializeMilestoneGridProps';
import { useFetchStatus } from './useFetchStatus';
import { useGroupRowFormatter } from './useGroupRowFormatter';

/**
 * Wijmo の FlexGrid を初期化・制御するためのカスタムフック
 * @param param0
 * @returns
 */
export const useInitializeMilestoneGrid = ({
	gridRef,
	collectionView,
	setShowVendorDialog,
	setShowSave,
	setSkipNum,
	isLoading,
	setIsLoading,
	MSRMngCode,
	updateGridMetrics,
	LOAD_MORE_THRESHOLD,
}: InitializeMilestoneGridProps) => {
	// MSRステータス取得用のカスタムフック
	const { fetchStatus } = useFetchStatus(MSRMngCode);

	const formatGroupRow = useGroupRowFormatter();

	// グリッド初期化処理（useEventでメモ化）
	return useEvent(async (flex: FlexGrid) => {
		// グリッド参照を保存
		gridRef.current = flex;

		// 初期データ取得（MSRステータス）
		await fetchStatus();

		// 初期の行数・セル数を取得
		updateGridMetrics(flex);

		// グリッド更新時に再取得
		flex.updatedView.addHandler(() => updateGridMetrics(flex));

		// 無限スクロールの初期化
		initInfiniteScrollHandler(
			flex,
			isLoading,
			setIsLoading,
			setSkipNum,
			LOAD_MORE_THRESHOLD,
		);

		// 左側の列を固定（10列）
		flex.frozenColumns = 10;

		// コンテキストメニューを設定
		new FlexGridContextMenu(flex, setShowVendorDialog);

		// グループ行のカスタム描画（開閉ボタン・Item追加ボタン）
		flex.formatItem.addHandler(formatGroupRow);

		// セルのテンプレートを適用（スタイルや内容のカスタマイズ）
		collectionView && createCellTemplate(flex, collectionView);

		// 保存ボタンを表示
		setShowSave(true);
	});
};