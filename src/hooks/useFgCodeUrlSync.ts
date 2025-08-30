import { useNavigate, useSearch } from '@tanstack/react-router';
import { useCallback, useEffect } from 'react';
import type { FG } from '@/stores/useFgsStore';

interface UseFgCodeUrlSyncProps {
  fgs: FG[];  // 利用可能なFGリスト
  onFgChange: (fg: FG | null) => void;  // FG変更時のコールバック
}

export function useFgCodeUrlSync({ fgs, onFgChange }: UseFgCodeUrlSyncProps) {
  const navigate = useNavigate();
  const search = useSearch({ strict: false });
  
  // URLからfgcodeを取得
  const fgCodeFromUrl = search.fgcode as string | undefined;
  
  // URLにfgcodeを設定
  const setFgCodeToUrl = useCallback((fgCode: string | undefined) => {
    navigate({
      search: (prev) => {
        if (fgCode) {
          return { ...prev, fgcode: fgCode };
        } else {
          const { fgcode, ...rest } = prev;
          return rest;
        }
      },
      replace: true,  // 履歴を汚さない
    });
  }, [navigate]);
  
  // URL変更を監視してFGを更新
  useEffect(() => {
    if (fgCodeFromUrl) {
      const fg = fgs.find(f => f.fgCode === fgCodeFromUrl);
      if (fg) {
        onFgChange(fg);
      } else {
        // 無効なfgcodeの場合はURLから削除
        setFgCodeToUrl(undefined);
        onFgChange(null);
      }
    } else {
      onFgChange(null);
    }
  }, [fgCodeFromUrl, fgs]);
  
  return {
    fgCodeFromUrl,
    setFgCodeToUrl,
  };
}