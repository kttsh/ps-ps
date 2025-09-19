/**
 * PipDataCardContext - コンテキスト管理
 * variant と size を子コンポーネント間で共有するためのコンテキストである
 */

import { createContext, type ReactNode, useContext } from 'react';
import type { PipCardSize, PipCardVariant } from '@/types/pipDataCard';

interface PipDataCardContextValue {
	/** カラーバリエーション */
	variant: PipCardVariant;
	/** サイズ */
	size: PipCardSize;
}

const PipDataCardContext = createContext<PipDataCardContextValue | undefined>(
	undefined,
);

interface PipDataCardProviderProps {
	/** カラーバリエーション */
	variant: PipCardVariant;
	/** サイズ */
	size: PipCardSize;
	/** 子要素 */
	children: ReactNode;
}

/**
 * PipDataCardProvider コンポーネント
 * PipDataCard の variant と size を下位コンポーネントに提供する
 */
export const PipDataCardProvider = ({
	variant,
	size,
	children,
}: PipDataCardProviderProps) => {
	return (
		<PipDataCardContext.Provider value={{ variant, size }}>
			{children}
		</PipDataCardContext.Provider>
	);
};

/**
 * usePipDataCardContext フック
 * PipDataCard のコンテキストを取得する
 */
export const usePipDataCardContext = (): PipDataCardContextValue => {
	const context = useContext(PipDataCardContext);
	if (!context) {
		throw new Error(
			'usePipDataCardContext must be used within a PipDataCardProvider',
		);
	}
	return context;
};