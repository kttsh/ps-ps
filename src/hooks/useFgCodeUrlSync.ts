import { useNavigate, useSearch } from '@tanstack/react-router';
import { useCallback, useEffect, useRef } from 'react';
import type { FG } from '@/stores/useFgsStore';

interface UseFgCodeUrlSyncProps {
  fgs: FG[];  // 利用可能なFGリスト
  onFgChange: (fg: FG | null) => void;  // FG変更時のコールバック
}

export function useFgCodeUrlSync({ fgs, onFgChange }: UseFgCodeUrlSyncProps) {
  const navigate = useNavigate();
  const search = useSearch({ strict: false }) as { fgcode?: string; selectedPips?: string; mode?: 'pip' | 'aip' };
  const lastValidFgCodeRef = useRef<string | undefined>(undefined);

  // URLからfgcodeを取得
  const fgCodeFromUrl = search.fgcode as string | undefined;

  // URLにfgcodeを設定
  const setFgCodeToUrl = useCallback((fgCode: string | undefined) => {
    navigate({
      to: '.',
      search: (prev: Record<string, unknown>) => {
        if (fgCode) {
          return { ...prev, fgcode: fgCode };
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { fgcode: _, ...rest } = prev;
        return rest;
      },
      replace: true,  // 履歴を汚さない
    });
  }, [navigate]);

  // URL変更を監視してFGを更新
  useEffect(() => {
    // 同じfgCodeの場合は処理をスキップして無限ループを防ぐ
    if (fgCodeFromUrl === lastValidFgCodeRef.current && fgCodeFromUrl === undefined) {
      return;
    }

    if (fgCodeFromUrl) {
      const fg = fgs.find(f => f.fgCode === fgCodeFromUrl);
      if (fg) {
        lastValidFgCodeRef.current = fgCodeFromUrl;
        onFgChange(fg);
      } else {
        // 無効なfgcodeの場合はURLから削除
        lastValidFgCodeRef.current = undefined;
        setFgCodeToUrl(undefined);
        onFgChange(null);
      }
    } else {
      lastValidFgCodeRef.current = undefined;
      onFgChange(null);
    }
  }, [fgCodeFromUrl, fgs, onFgChange, setFgCodeToUrl]);

  return {
    fgCodeFromUrl,
    setFgCodeToUrl,
  };
}