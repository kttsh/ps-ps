import { Database } from 'lucide-react'; // アイコンとして使用する Lucide の Database アイコンをインポート

interface AppLogoProps {
	size?: 'sm' | 'md' | 'lg' | 'xl';
	subtitle?: string;
	className?: string;
}

/**
 * ロゴ表示用のコンポーネント
 * size: サイズ指定（デフォルトは 'md'）
 * subtitle: サブタイトル（未使用だが拡張可能）
 * className: 外部から渡される追加クラス
 */
export function AppLogo({ size = 'md', className = '' }: AppLogoProps) {
	// テキストサイズのクラス定義
	const textSizeClasses = {
		sm: 'text-xl',
		md: 'text-2xl',
		lg: 'text-5xl',
		xl: 'text-7xl',
	};

	// サブタイトルのサイズクラス定義
	const subtitleSizeClasses = {
		sm: 'text-xs',
		md: 'text-xs',
		lg: 'text-base',
		xl: 'text-lg',
	};

	// 外枠アイコンサイズ（背景ボックス）
	const iconSizes = {
		sm: 'w-6 h-6',
		md: 'w-10 h-10',
		lg: 'w-16 h-16',
		xl: 'w-24 h-24',
	};

	// 内部アイコンサイズ（Database アイコン）
	const iconInnerSizes = {
		sm: 'w-3 h-3',
		md: 'w-5 h-5',
		lg: 'w-8 h-8',
		xl: 'w-12 h-12',
	};

	// アイコンとテキストの間の余白
	const gapClasses = {
		sm: 'gap-2',
		md: 'gap-3',
		lg: 'gap-4',
		xl: 'gap-5',
	};

	return (
		// ロゴ全体のラッパー（アイコン＋テキスト）
		<div className={`flex items-center ${gapClasses[size]} ${className}`}>
			{/* アイコンの外枠（白枠＋角丸） */}
			<div
				className={`${iconSizes[size]} border-2 border-white rounded-lg flex items-center justify-center flex-shrink-0`}
			>
				{/* Lucide の Database アイコン */}
				<Database className={`text-white ${iconInnerSizes[size]}`} />
			</div>

			{/* テキスト部分（P-sys + サブタイトル） */}
			<div className="flex flex-col">
				{/* メインロゴテキスト */}
				<div
					className={`font-logo tracking-tight select-none ${textSizeClasses[size]} text-white leading-none`}
				>
					{/* ロゴの構成：P - sys */}
					<span className="inline-block">P</span>
					<span className="inline-block text-white font-normal">-</span>
					<span className="inline-block">sys</span>
				</div>

				{/* サブタイトル（固定文言） */}
				<div
					className={`${subtitleSizeClasses[size]} AppLogo text-white font-light tracking-wide mt-1`}
				>
					調達WBS管理システム
				</div>
			</div>
		</div>
	);
}

