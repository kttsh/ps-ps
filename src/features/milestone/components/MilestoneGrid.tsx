import React, { useEffect, useRef, useState } from "react";
import "../styles/index.css";

import * as wjcCore from "@mescius/wijmo";
import "@mescius/wijmo.cultures/wijmo.culture.ja";
import { FlexGrid, GridPanel } from "@mescius/wijmo.grid";
import * as wjGrid from "@mescius/wijmo.react.grid";
import "@mescius/wijmo.styles/wijmo.css";
import useEvent from 'react-use-event-hook';

import { EmptyState } from "@/components/EmptyState";
import { useParams } from "@tanstack/react-router";
import { AlertCircle } from 'lucide-react';
import { useMSRData, useMSRHeader } from "../hooks";
import type { MSRAIPDataType, MSRHeaderType, PJStatusType } from "../types/milestone";
import { createCellTemplate } from "../utils/createCellTemplate";
import { createColumnGroups } from "../utils/createColumnGroups";
import { getStatus } from "../utils/getStatus";
import { transformToMilestoneData } from "../utils/transformToMilestoneData";

// Wijmoライセンスキーの設定
wjcCore.setLicenseKey("ここにライセンスキーの文字列を設定します");

const LOAD_MORE_THRESHOLD = 10; // スクロール時の追加データ読込閾値

// コンポーネントのProps定義
interface MilestoneGridProps {
  collectionView: wjcCore.CollectionView | null;
  setCollectionView: (cv: wjcCore.CollectionView | null) => void;
  setShowSave: React.Dispatch<React.SetStateAction<boolean>>;
}

// カラム定義の型
interface ColumnDefinition {
  header: string;
  binding?: string;
  width?: number;
  columns?: ColumnDefinition[];
  cellTemplate?: (
    panel: GridPanel,
    row: number,
    col: number,
    cell: HTMLElement
  ) => void;
}

export const MilestoneGrid: React.FC<MilestoneGridProps> = ({
  collectionView,
  setCollectionView,
  setShowSave
}) => {
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
  const [_rowCount, setRowCount] = useState(0);
  const [_cellCount, setCellCount] = useState(0);
  const gridRef = useRef<FlexGrid | null>(null);

  // パスからMSR管理単位取得
  const { MSRMngCode } = useParams({ from: '/msr/milestone/$MSRMngCode' })

  // ヘッダー取得フック
  const { data: MSRHeaderData, isLoading: headerLoadig, error: headerError } = useMSRHeader({ MSRMngCode });

  // データ取得フック（ページング対応）
  const { data: AIPData, isLoading: dataLoading, error: dataError } = useMSRData({ MSRMngCode, skipNum });
  console.log(`AIPData:${JSON.stringify(AIPData)}`);

  // ヘッダー取得後に状態更新
  useEffect(() => {
    if (MSRHeaderData) {
      setMSRHeader(MSRHeaderData);
    }
  }, [MSRHeaderData]);

  // ヘッダーからカラムグループを生成
  useEffect(() => {
    if (MSRHeader.length > 0) {
      setColumnGroups(createColumnGroups(MSRHeader));
    }
  }, [MSRHeader]);

  // 新しいデータが取得されたら蓄積
  useEffect(() => {
    if (AIPData && AIPData.length > 0) {
      setMSRData(prev => [...prev, ...AIPData]);
    }
  }, [AIPData]);

  // MSRDataが更新されたらCollectionViewを再構築
  useEffect(() => {
    if (MSRData.length > 0) {
      const milestoneData = transformToMilestoneData(MSRData);
      const currentPosition = collectionView?.currentPosition || 0;

      const cv = new wjcCore.CollectionView(milestoneData, { trackChanges: true });
      cv.groupDescriptions.push(new wjcCore.PropertyGroupDescription("PIPNo", (item) => {
        if(item.PIPName){
          return `${item.PIPNo}　PIPName: ${item.PIPName}`
        }
        return item.PIPNo
      }));
      cv.currentPosition = currentPosition;

      setCollectionView(cv);
      setIsLoading(false);
    }
  }, [MSRData]);

  // ステータス情報の参照
  const statusOptionsRef = useRef<PJStatusType[]>([]);
  const statusLoadedRef = useRef(false);

  // グリッド初期化時の処理
  const initializeGrid = useEvent((flex: FlexGrid) => {
    gridRef.current = flex;

    // ステータス取得処理（非同期）
    const fetchStatus = async () => {
      if (!statusLoadedRef.current) {
        try {
          const { returnStatus, error } = await getStatus(MSRMngCode);
          if (returnStatus) {
            statusOptionsRef.current = returnStatus;
            statusLoadedRef.current = true;
          } else {
            console.error("ステータス取得エラー:", error);
          }
        } catch (err) {
          console.error("ステータス取得中に例外:", err);
        }
      }
    };

    fetchStatus(); // 非同期処理を呼び出す
    
    // 初期の行数・セル数を取得
    updateGridMetrics(flex);

    // グリッド更新時に行数・セル数を再取得
    flex.updatedView.addHandler(() => updateGridMetrics(flex));

    // スクロール末尾に近づいたらデータ追加をトリガー
    flex.scrollPositionChanged.addHandler(() => {
      if (
        flex.viewRange.bottomRow >= flex.rows.length - LOAD_MORE_THRESHOLD &&
        !isLoading &&
        !dataLoading
      ) {
        setIsLoading(true);
        setSkipNum(prev => prev + 50);
      }
    });

    // 列固定
		flex.frozenColumns = 9;

    // セルのスタイル設定

    collectionView && createCellTemplate(flex, collectionView);
    
    // グリッドが表示されたら保存ボタンを表示
    setShowSave(true);
  });

  // グリッドの行数・セル数を更新
  const updateGridMetrics = (grid: FlexGrid) => {
    setRowCount(grid.rows.length);
    setCellCount(grid.hostElement.querySelectorAll('.wj-cell').length);
  };

  if(headerLoadig || (dataLoading && skipNum === 0)){
    return (
			<div className="flex justify-center mt-30" aria-label="読み込み中">
        <div className="animate-spin h-10 w-10 border-4 border-blue-500 rounded-full border-t-transparent" />
      </div>
		);
  }

  if (MSRMngCode === null || !MSRMngCode) {
    // saveボタン非表示
    setShowSave(false);
		return (
      <div className="mt-30">
        <EmptyState
          icon={AlertCircle}
          label='MSRを表示できません'
        />
      </div>
		);
	}

  if (!collectionView || !columnGroups.length) {
    // saveボタン非表示
    setShowSave(false);
		return (
      <div className="mt-30">
        <EmptyState
          icon={AlertCircle}
          label='表示するデータがありません'
        />
      </div>
		);
	}

  if (headerError || dataError) {
    // saveボタン非表示
    setShowSave(false);
		return (
      <div className="mt-30">
        <EmptyState
          icon={AlertCircle}
          label='エラーが発生しました'
        />
      </div>
		);
	}

  return (
      collectionView && (
        // データがある場合のみグリッドを表示
        <wjGrid.FlexGrid
          ref={gridRef}
          initialized={initializeGrid}
          itemsSource={collectionView}
          // itemFormatter={collectionView ? createCellTemplate(collectionView) : undefined}
          columnGroups={columnGroups}
          isReadOnly={false}
          allowDragging={false}
          allowSorting={false}
        />
      )
  );
};
