import { useCallback, useState } from 'react';
import type { ColumnDefinition, MSRAIPDataType, MSRHeaderType } from '../types';

/**
 * MilestoneGridの状態管理を集約したカスタムフック
 *
 * このフックは、MilestoneGridコンポーネントから以下の状態管理ロジックを抽出:
 * - MSRヘッダー情報の管理
 * - MSRデータ本体の管理
 * - カラムグループの管理
 * - ページング関連の状態
 * - ローディング状態
 * - グリッドメトリクス（行数・セル数）
 * - ベンダー選択関連の状態
 * - ダイアログ表示状態
 */
export const useMilestoneGridState = () => {
	// ヘッダー情報の状態管理
	const [MSRHeader, setMSRHeader] = useState<MSRHeaderType[]>([]);

	// データ本体の状態管理
	const [MSRData, setMSRData] = useState<MSRAIPDataType[]>([]);

	// カラムグループの状態管理
	const [columnGroups, setColumnGroups] = useState<ColumnDefinition[]>([]);

	// データ取得の開始位置（ページング用）
	const [skipNum, setSkipNum] = useState(0);

	// データ追加中かどうかのフラグ
	const [isLoading, setIsLoading] = useState(false);

	// グリッドの行数・セル数の表示用
	const [rowCount, setRowCount] = useState(0);
	const [cellCount, setCellCount] = useState(0);

	// wijmoセル選択時同じAIPグループ内のVendorCode
	const [assignedVendorCode, setAssignedVendorCode] = useState<string[]>([]);

	// wijmo再更新フラグ
	const [wijmoUpdateMode, setWijmoUpdateMode] = useState(false);

	// ダイアログ表示状態: ベンダー選択コンポーネント(AIP生成画面内)をダイヤログ表示
	const [showVendorDialog, setShowVendorDialog] = useState(false);

	/**
	 * MSRDataを更新する際の複雑なロジックを処理
	 * PIPNoごとにデータをマージする
	 */
	const updateMSRDataWithNewAIPs = useCallback((newRows: any[]) => {
		setMSRData((prevData) => {
			// PIPNoごとにデータをまとめるためのMapを作成
			const pipMap = new Map<string, MSRAIPDataType>();

			// 既存データをMapに変換（AIP配列もコピー）
			for (const item of prevData) {
				if (!pipMap.has(item.PIPNo)) {
					pipMap.set(item.PIPNo, { ...item, AIP: [...item.AIP] });
				} else {
					const existing = pipMap.get(item.PIPNo);
					if (existing) {
						existing.AIP = [...existing.AIP, ...item.AIP];
					}
				}
			}

			// 新しいAIP行をMapに追加
			newRows.forEach((row: any) => {
				const target = pipMap.get(row.PIPNo);
				if (target) {
					const alreadyExists = target.AIP.some(
						(aip) => aip.AIPNo === row.AIPNo,
					);
					if (!alreadyExists) {
						target.AIP.push({
							AIPNo: row.AIPNo,
							VendorName: row.VendorName,
							CountryCode: row.CountryCode,
							CountryName: row.CountryName,
							BuyerName: row.BuyerName,
							Status: row.Status,
							FGName: row.FGName,
							KPinFG: row.KPinFG,
							Shore: row.Shore,
							Order: row.Order,
							ReqNo: row.ReqNo,
							VendorCode: '',
							Deliverable: [],
							TaskTracking: [],
						});
					}
				}
			});

			return Array.from(pipMap.values());
		});
	}, []);

	/**
	 * 該当PIPNoのデータだけを更新
	 */
	const updatePIPGroupData = useCallback(
		(PIPCode: string, filteredGroup: MSRAIPDataType[]) => {
			setMSRData((prev) => {
				const withoutGroup = prev.filter((item) => item.PIPNo !== PIPCode);
				return [...withoutGroup, ...filteredGroup];
			});
		},
		[],
	);

	/**
	 * 新しいデータを既存データに追加
	 */
	const appendMSRData = useCallback((newData: MSRAIPDataType[]) => {
		setMSRData((prev) => [...prev, ...newData]);
	}, []);

	return {
		// 状態
		MSRHeader,
		MSRData,
		columnGroups,
		skipNum,
		isLoading,
		rowCount,
		cellCount,
		assignedVendorCode,
		wijmoUpdateMode,
		showVendorDialog,

		// セッター関数
		setMSRHeader,
		setMSRData,
		setColumnGroups,
		setSkipNum,
		setIsLoading,
		setRowCount,
		setCellCount,
		setAssignedVendorCode,
		setWijmoUpdateMode,
		setShowVendorDialog,

		// ユーティリティ関数
		updateMSRDataWithNewAIPs,
		updatePIPGroupData,
		appendMSRData,
	};
};
