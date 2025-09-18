import {
  type FlexGrid
} from '@mescius/wijmo.grid';

/**
 * WijmoのFlexGridに対して無限スクロールを実装するためのハンドラー関数
 * グリッドのスクロール位置を監視し、一定の閾値に達したらデータの追加読み込みをトリガーする
 *
 * @param flex - WijmoのFlexGridインスタンス
 * @param isLoading - 現在データを読み込み中かどうかのフラグ
 * @param setIsLoading - データ読み込み状態を更新する関数
 * @param setSkipNum - スキップ件数を更新する関数（ページネーションなどに使用）
 * @param LOAD_MORE_THRESHOLD - 追加読み込みを開始する行数の閾値
 */
export const initInfiniteScrollHandler = (
  flex: FlexGrid,
  isLoading: boolean,
  setIsLoading: (v: boolean) => void,
  setSkipNum: (fn: (prev: number) => number) => void,
  LOAD_MORE_THRESHOLD: number,
) => {
  // 前回の最下行インデックスを保持する変数（初期値は -1）
  let previousBottomRow = -1;

  // グリッドのスクロール位置が変化したときのイベントハンドラーを登録
  flex.scrollPositionChanged.addHandler(() => {
    // 現在の表示範囲の最下行インデックスを取得
    const currentBottomRow = flex.viewRange.bottomRow;

    // 最下行が前回と異なる場合のみ処理を実行（無駄な処理を防ぐ）
    if (currentBottomRow !== previousBottomRow) {
      previousBottomRow = currentBottomRow;

      // 最下行が閾値に達しており、かつ読み込み中でない場合に追加読み込みを開始
      if (
        currentBottomRow >= flex.rows.length - LOAD_MORE_THRESHOLD &&
        !isLoading
      ) {
        // 読み込み中フラグを立てる
        setIsLoading(true);
        // スキップ件数を増やして次のデータ取得をトリガー
        setSkipNum((prev) => prev + 50);
      }
    }
  });
};
