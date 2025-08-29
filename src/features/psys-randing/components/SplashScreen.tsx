import { motion, type Variants } from 'framer-motion';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';

/**
 * P-Sys遷移時のアニメーションを定義するコンポーネント
 * setForceSplashClose: アニメーションを強制終了するset関数
 * setShowedSplash: アニメーションが表示済みにするset関数
 */
export const SplashScreen = ({
	setForceSplashClose,
	setShowedSplash,
}: {
	setForceSplashClose: React.Dispatch<React.SetStateAction<boolean>>;
	setShowedSplash: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	// タイトルに表示する文字列（タイプライター風に表示される）
	const [titleDisplayed, setTitleDisplayed] = useState('');
	// サブタイトルに表示する文字列（タイプライター風に表示される）
	const [subtitleDisplayed, setSubtitleDisplayed] = useState('');
	// タイトルのカーソルを表示するかどうか（点滅アニメーション用）
	const [showTitleCursor, setShowTitleCursor] = useState(true);
	// サブタイトルのカーソルを表示するかどうか（点滅アニメーション用）
	const [showSubtitleCursor, setShowSubtitleCursor] = useState(false);
	// タイトルの表示が完了したかどうか（サブタイトル表示のトリガーに使用）
	const [titleComplete, setTitleComplete] = useState(false);

	const titleText = 'P-Sys';
	const subtitleText = '調達WBS管理システム';

	// タイトルのタイプライターエフェクト
	useEffect(() => {
		let titleIndex = 0;
		const titleTimer = setInterval(() => {
			if (titleIndex < titleText.length) {
				setTitleDisplayed(titleText.slice(0, titleIndex + 1));
				titleIndex++;
			} else {
				clearInterval(titleTimer);
				setTitleComplete(true);
				setShowTitleCursor(false);
				// 少し待ってからサブタイトル開始
				setTimeout(() => {
					setShowSubtitleCursor(true);
				}, 500);
			}
		}, 100); // 200ms間隔で1文字ずつ

		return () => clearInterval(titleTimer);
	}, []);

	// サブタイトルのタイプライターエフェクト
	useEffect(() => {
		if (!titleComplete) return;

		let subtitleIndex = 0;
		const subtitleTimer = setTimeout(() => {
			const interval = setInterval(() => {
				if (subtitleIndex < subtitleText.length) {
					setSubtitleDisplayed(subtitleText.slice(0, subtitleIndex + 1));
					subtitleIndex++;
				} else {
					clearInterval(interval);
					// タイピング完了後もカーソルを点滅させ続ける
				}
			}, 150); // 150ms間隔で1文字ずつ

			return () => clearInterval(interval);
		}, 500); // タイトル完了から500ms後に開始

		return () => clearTimeout(subtitleTimer);
	}, [titleComplete]);

	// カーソルの点滅アニメーション
	const cursorVariants: Variants = {
		visible: {
			opacity: [0, 1, 0],
			transition: {
				duration: 1,
				repeat: Number.POSITIVE_INFINITY,
				ease: 'linear',
			},
		},
	};

	// コンテナのアニメーション
	const containerVariants: Variants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				duration: 0.5,
			},
		},
	};

	return (
		<>
			<div className="flex justify-end p-10">
				{/* 強制終了ボタン */}
				<button
					type="button"
					className="hover:bg-gray-200 rounded cursor-pointer"
					onClick={() => {
						sessionStorage.setItem('hasSeenSplash', 'true');
						setForceSplashClose(true);
						setShowedSplash(true);
					}}
				>
					<X />
				</button>
			</div>
			<div className="min-h-[60vh] flex items-center justify-center overflow-hidden">
				<motion.div
					className="text-center"
					variants={containerVariants}
					initial="hidden"
					animate="visible"
				>
					{/* タイトル */}
					<div className="font-logo text-6xl md:text-8xl font-bold text-gray-800 tracking-wide mb-8">
						<span className="font-logo">{titleDisplayed}</span>
						{showTitleCursor && (
							<motion.span
								className="inline-block ml-1 w-1 bg-gray-800"
								style={{ height: '1em' }}
								variants={cursorVariants}
								animate="visible"
							/>
						)}
					</div>

					{/* サブタイトル */}
					<div className="mt-8">
						<div className="font-logo text-2xl md:text-3xl font-medium text-gray-600 tracking-wider">
							<span>{subtitleDisplayed}</span>
							{showSubtitleCursor && (
								<motion.span
									className="inline-block ml-1 w-0.5 bg-gray-600"
									style={{ height: '1em' }}
									variants={cursorVariants}
									animate="visible"
								/>
							)}
						</div>
					</div>

					{/* 装飾線（サブタイトル完了後に表示） */}
					{subtitleDisplayed.length === subtitleText.length && (
						<motion.div
							className="mt-6"
							initial={{ opacity: 0, scaleX: 0 }}
							animate={{ opacity: 1, scaleX: 1 }}
							transition={{ delay: 0.5, duration: 0.8 }}
						>
							<div className="w-24 h-1 bg-gradient-to-r from-orange-500 via-orange-400 to-indigo-700 mx-auto rounded-full" />
						</motion.div>
					)}
				</motion.div>
			</div>
		</>
	);
};

