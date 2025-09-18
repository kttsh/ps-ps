import { usePips } from '@/features/pip-management/hooks/usePips'; // PIPデータ取得用のカスタムフック
import { transformPipsResponseToPips } from '@/features/pip-management/utils/transformPipsResponseToPips'; // レスポンス整形関数
import { usePipsStore } from '@/stores/usePipsStore'; // グローバルステート管理用のストア
import { useEffect } from 'react';

/**
 * PIPデータを取得・整形し、状態管理ストアに保存するカスタムフック
 * @param selectedJobNo - 選択されたジョブ番号
 * @param selectedFG - 選択されたFG情報（fgCodeを含むオブジェクト）
 * @returns pipsResponse - APIから取得した生データ
 */
export const useFetchAndTransformPips = (
    selectedJobNo: string,
    selectedFG: { fgCode?: string | null } | null,
) => {
    const { setPipsData } = usePipsStore(); // ストアの更新関数を取得

    // データ取得を行うかどうかの判定
    const shouldFetch = selectedJobNo !== '' && selectedFG?.fgCode !== null;

    // PIPデータ取得（条件に応じて空文字やnullを渡すことで取得を制御）
    const { data: pipsResponse } = usePips(
        shouldFetch ? selectedJobNo : '',
        shouldFetch ? (selectedFG?.fgCode ?? null) : null,
    );

    // データ取得後に整形してストアに保存
    useEffect(() => {
        if (pipsResponse) {
            const transformedPips = transformPipsResponseToPips(
                pipsResponse.pipsList,
            );
            setPipsData(transformedPips); // 整形済みデータをストアに保存
        }
    }, [pipsResponse, setPipsData]); // pipsResponseが変化したときに実行

    // 生のレスポンスデータを返す（必要に応じてUI側で利用可能）
    return { pipsResponse };
};
