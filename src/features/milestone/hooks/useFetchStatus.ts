import { useRef } from 'react';
import type { PJStatusType } from '../types/milestone'; // プロジェクトステータスの型定義をインポート
import { getStatus } from '../utils/getStatus'; // ステータス取得用のユーティリティ関数をインポート

/**
 * MSRMngCode（マイルストーン管理コード）に基づいてプロジェクトステータスを取得するカスタムフック
 * ステータスは一度だけ取得し、再取得を防ぐために useRef を使用して状態を保持
 */
export const useFetchStatus = (MSRMngCode: string) => {
  // ステータス一覧を保持する参照（初期値は空配列）
  const statusOptionsRef = useRef<PJStatusType[]>([]);
  // ステータスがすでに取得済みかどうかを示すフラグ
  const statusLoadedRef = useRef(false);

  /**
   * ステータスを非同期で取得する関数
   * 一度取得したら再度取得しないように制御
   */
  const fetchStatus = async () => {
    // ステータスが未取得の場合のみ処理を実行
    if (!statusLoadedRef.current) {
      try {
        // ステータス取得APIを呼び出し
        const { returnStatus, error } = await getStatus(MSRMngCode);

        // ステータスが正常に返ってきた場合は参照に保存し、取得済みフラグを立てる
        if (returnStatus) {
          statusOptionsRef.current = returnStatus;
          statusLoadedRef.current = true;
        } else {
          // エラーが返ってきた場合はログ出力
          console.error('ステータス取得エラー:', error);
        }
      } catch (err) {
        // API呼び出し中に例外が発生した場合のエラーハンドリング
        console.error('ステータス取得中に例外:', err);
      }
    }
  };

  // ステータス取得関数と取得済みステータスの参照を返す
  return { fetchStatus, statusOptionsRef };
};
