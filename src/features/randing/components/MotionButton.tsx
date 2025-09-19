import { Link } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

type MotionButtonProps = {
	link: string;
	icon: LucideIcon;
	title: string;
	text: string;
	disabled: boolean;
	onClick?: () => void;
};

/**
 * ホーム画面の各システムへの遷移ボタンのUIを定義
 * link: 遷移先のpath
 * icon: ボタン上部のアイコン
 * title: 遷移先のシステム名
 * text: 遷移先のシステムの概要
 */
export const MotionButton: React.FC<MotionButtonProps> = ({
	link,
	icon: Icon,
	title,
	text,
	disabled, //ボタン制御
	onClick, // onclickイベント
}) => {
	return (
		<Link to={disabled ? '#' : link}>
			<motion.button
				className={cn(
					'isolate rounded-4xl w-60 h-90 p-8 shadow-lg ring-1 ring-black/10',
					disabled
						? 'bg-gray-200 cursor-not-allowed'
						: 'bg-white hover:ring-orange-400 hover:ring-3',
				)}
				whileHover={disabled ? undefined : { y: -5 }}
				onClick={onClick}
				disabled={disabled}
			>
				<div className="flex flex-col items-center justify-start h-full">
					<div className="p-5">
						<Icon size={80} className="text-gray-800" />
					</div>
					<div className="border-2 w-full border-gray-800" />
					<h3 className="text-2xl mt-3 text-gray-800">{title}</h3>
					<p className="text-left mt-3 text-gray-800">{text}</p>
				</div>
			</motion.button>
		</Link>
	);
};