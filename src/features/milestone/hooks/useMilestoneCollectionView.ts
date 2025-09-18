import * as wjcCore from '@mescius/wijmo';
import type { FlexGrid } from '@mescius/wijmo.grid';
import { useCallback, useEffect, useState } from 'react';
import type { MSRAIPDataType } from '../types';
import { transformToMilestoneData } from '../utils/transformToMilestoneData';

/**
 * CollectionViewの管理を担当するカスタムフック
 *
 * このフックは、MilestoneGridで使用されるWijmo CollectionViewの作成と管理を行います。
 * MSRDataが更新されたときにCollectionViewを再構築し、グルーピングも設定します。
 */
export const useMilestoneCollectionView = (
	MSRData: MSRAIPDataType[],
	_isLoading: boolean,
	setIsLoading: (loading: boolean) => void,
) => {
	// CollectionViewの状態管理
	const [collectionView, setCollectionView] =
		useState<wjcCore.CollectionView | null>(null);

	// CollectionViewの作成/更新処理
	const updateCollectionView = useCallback(() => {
		if (MSRData.length > 0) {
			const milestoneData = transformToMilestoneData(MSRData);

			const cv = new wjcCore.CollectionView(milestoneData, {
				trackChanges: true,
			});

			// PIPNoでグルーピング
			cv.groupDescriptions.push(
				new wjcCore.PropertyGroupDescription('PIPNo', (pip: MSRAIPDataType) => {
					if (pip.PIPName) {
						return `${pip.PIPNo}　PIPName: ${pip.PIPName}`;
					}
					return pip.PIPNo;
				}),
			);

			setCollectionView(cv);
			setIsLoading(false);
		}
	}, [MSRData, setIsLoading]);

	// MSRDataが更新されたらCollectionViewを再構築
	useEffect(() => {
		updateCollectionView();
	}, [updateCollectionView]);

	// グリッドからCollectionViewへのアクセスヘルパー
	const getGridCollectionView = useCallback((gridRef: React.RefObject<FlexGrid | null>) => {
		return gridRef.current?.collectionView;
	}, []);

	// CollectionView内のデータを検索
	const findInCollectionView = useCallback(
		(predicate: (row: MSRAIPDataType) => boolean) => {
			if (!collectionView) return null;
			const source = collectionView.sourceCollection;
			return source.find(predicate);
		},
		[collectionView],
	);

	// スクロール位置の保存と復元
	const preserveScrollPosition = useCallback(
		(gridRef: React.RefObject<FlexGrid | null>, action: () => void) => {
			const scrollPosition = gridRef.current?.scrollPosition;
			action();
			if (gridRef.current && scrollPosition) {
				gridRef.current.scrollPosition = scrollPosition;
			}
		},
		[],
	);

	return {
		collectionView,
		setCollectionView,
		updateCollectionView,
		getGridCollectionView,
		findInCollectionView,
		preserveScrollPosition,
	};
};
