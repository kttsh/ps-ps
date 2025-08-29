import { useEffect, useState } from 'react';
import { SplashScreen } from './SplashScreen';

type SplashWrapperProps = {
	children: React.ReactNode;
};

/**
 * スプラッシュ画面の表示制御を行うラッパーコンポーネント
 * children: 子コンテンツ 現状item-assignment.tsxになる
 */
export const SplashWrapper: React.FC<SplashWrapperProps> = ({ children }) => {
	// アニメーション強制終了の制御
	const [forceSplashClose, setForceSplashClose] = useState(false);
	// スプラッシュ画面が表示済みかどうかの状態管理
	const [showedSplash, setShowedSplash] = useState(false);

	// 初回レンダリング時にスプラッシュ表示の有無を判定
	useEffect(() => {
		// sessionStorage に保存された表示履歴を取得
		const hasSeenSplash = sessionStorage.getItem('hasSeenSplash');

		if (hasSeenSplash || forceSplashClose) {
			// すでに表示済みなら即座にメインコンテンツを表示
			setShowedSplash(true);
		} else {
			// 初回表示の場合は 5.5 秒間アニメーション画面を表示
			const timer = setTimeout(() => {
				setShowedSplash(true);
				// 表示済みフラグを sessionStorage に保存
				sessionStorage.setItem('hasSeenSplash', 'true');
			}, 5500);
			// クリーンアップ
			return () => clearTimeout(timer);
		}
	}, [forceSplashClose]);

	// スプラッシュ画面が未表示なら SplashScreen を表示
	if (!showedSplash) {
		return (
			<SplashScreen
				setForceSplashClose={setForceSplashClose}
				setShowedSplash={setShowedSplash}
			/>
		);
	}

	// スプラッシュ表示後に子コンテンツを表示
	return <>{children}</>;
};

