import * as wjcCore from '@mescius/wijmo';
import type { FlexGrid } from '@mescius/wijmo.grid';
import { useParams } from '@tanstack/react-router';
import { AlertCircle } from 'lucide-react';
import type React from 'react';
import { useEffect, useState } from 'react';
import { EmptyState } from '@/components/EmptyState';
import { useFgsStore } from '@/stores/useFgsStore';
import { useFunctionGroups } from '../../psys-randing/hooks/useFunctionGroups';
import { useMilestoneDataService } from '../services/MilestoneDataService';
import {
	type ColumnDefinition,
	createColumnGroups,
} from '../utils/createColumnGroups';
import { MilestoneGrid } from './MilestoneGrid';

// Wijmoライセンスキーの設定
wjcCore.setLicenseKey('ここにライセンスキーの文字列を設定します');

const LOAD_MORE_THRESHOLD = 10; // スクロール時の追加データ読込閾値

// ローダーコンポーネントのProps定義
interface MilestoneGridLoaderProps {
	collectionView: wjcCore.CollectionView | null;
	setCollectionView: (cv: wjcCore.CollectionView | null) => void;
	setShowSave: React.Dispatch<React.SetStateAction<boolean>>;
	gridRef: React.RefObject<FlexGrid | null>;
}

export const MilestoneGridLoader: React.FC<MilestoneGridLoaderProps> = ({
	collectionView: externalCollectionView,
	setCollectionView: setExternalCollectionView,
	setShowSave,
	gridRef,
}) => {
	// パスからMSR管理単位取得
	const { MSRMngCode } = useParams({ from: '/msr/milestone/$MSRMngCode' });

	// APIからFG取得
	const { data: fgData } = useFunctionGroups();

	// FGリストの状態
	const { setFgs } = useFgsStore();

	// カラムグループの状態管理
	const [columnGroups, setColumnGroups] = useState<ColumnDefinition[]>([]);

	// MilestoneDataServiceを使用
	const {
		headers,
		data: MSRData,
		collectionView,
		isLoadingHeaders,
		isLoadingData,
		isLoadingMore,
		headersError,
		dataError,
		loadMoreData,
		updateCollectionView,
		addAIPRows,
		hasMore,
	} = useMilestoneDataService({
		MSRMngCode: MSRMngCode || '',
		pageSize: LOAD_MORE_THRESHOLD,
	});

	// ヘッダーからカラムグループを生成
	useEffect(() => {
		if (headers.length > 0) {
			setColumnGroups(createColumnGroups(headers));
		}
	}, [headers]);

	// CollectionViewが更新されたら外部に通知
	useEffect(() => {
		if (collectionView) {
			setExternalCollectionView(collectionView);
		}
	}, [collectionView, setExternalCollectionView]);

	// MSRDataが更新されたらCollectionViewを再構築
	useEffect(() => {
		if (MSRData.length > 0) {
			updateCollectionView(MSRData);
		}
	}, [MSRData, updateCollectionView]);

	// FGリストをグローバルstateに設定
	useEffect(() => {
		if (!fgData) return;
		setFgs(fgData);
	}, [fgData, setFgs]);

	// ローディング状態の処理
	if (isLoadingHeaders || isLoadingData) {
		return (
			<output className="flex justify-center mt-30" aria-label="読み込み中">
				<div className="animate-spin h-10 w-10 border-4 border-blue-500 rounded-full border-t-transparent" />
			</output>
		);
	}

	// MSRMngCodeが無効な場合の処理
	if (MSRMngCode === null || !MSRMngCode) {
		setShowSave(false);
		return (
			<div className="mt-30">
				<EmptyState icon={AlertCircle} label="MSRを表示できません" />
			</div>
		);
	}

	// データが無い場合の処理
	if (!collectionView || !columnGroups.length) {
		setShowSave(false);
		return (
			<div className="mt-30">
				<EmptyState icon={AlertCircle} label="表示するデータがありません" />
			</div>
		);
	}

	// エラー処理
	if (headersError || dataError) {
		setShowSave(false);
		return (
			<div className="mt-30">
				<EmptyState icon={AlertCircle} label="エラーが発生しました" />
			</div>
		);
	}

	// データが正常に読み込まれた場合、MilestoneGridコンポーネントを表示
	return (
		<MilestoneGrid
			collectionView={collectionView}
			externalCollectionView={externalCollectionView}
			columnGroups={columnGroups}
			gridRef={gridRef}
			setShowSave={setShowSave}
			MSRMngCode={MSRMngCode}
			fgData={fgData}
			addAIPRows={addAIPRows}
			loadMoreData={loadMoreData}
			hasMore={hasMore}
			isLoadingMore={isLoadingMore}
			LOAD_MORE_THRESHOLD={LOAD_MORE_THRESHOLD}
		/>
	);
};
