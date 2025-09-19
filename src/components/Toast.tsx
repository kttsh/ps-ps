import { AlertTriangle, CheckCircle, Info, XCircle } from 'lucide-react';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { useAlertStore } from '@/stores/useAlartStore';
import { selectWijmoCell } from '@/utils/wijmoUtils';
import { Button } from './ui/button';

export function Toast() {
	const {
		isAlertVisible,
		setIsAlertVisible,
		alertType,
		messages,
		clearAlerts,
		inputErrorCell, // グリッド上のエラー座標
	} = useAlertStore();

	const icons = {
		success: <CheckCircle className="text-green-600 w-5 h-5" />,
		error: <XCircle className="text-red-600 w-5 h-5" />,
		info: <Info className="text-blue-600 w-5 h-5" />,
		warning: <AlertTriangle className="text-yellow-600 w-5 h-5" />,
	};

	const bgColors = {
		success: 'bg-green-100 border-green-500',
		error: 'bg-red-100 border-red-500',
		info: 'bg-blue-100 border-blue-500',
		warning: 'bg-yellow-100 border-yellow-500',
	};

	useEffect(() => {
		if (isAlertVisible && messages.length > 0) {
			// 非表示のアニメーションがうまくいかず、、sonnerで定義されてる？
			const toastId = toast.custom(
				() => (
					<div
						// Toastクリックイベント
						onClick={() => {
							if (inputErrorCell) {
								selectWijmoCell(inputErrorCell.row, inputErrorCell.column);
							}
						}}
						className={`toast-slide-in ${bgColors[alertType]} border-l-6 shadow-xl p-4 relative w-[320px] flex flex-col gap-2`}
					>
						<div className="flex items-start gap-3">
							{icons[alertType]}
							<div className="flex-1 space-y-1">
								{messages.map((msg) => (
									<p
										key={msg.id}
										className="text-sm text-gray-800 leading-relaxed"
									>
										{msg.text}
									</p>
								))}
							</div>
						</div>

						<Button
							className="text-xs h-8 w-16 self-end hover:bg-gray-700 cursor-pointer"
							onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
								e.stopPropagation(); // Undo ボタンのクリックが toast のクリックと競合しないように
								setIsAlertVisible(false);
								clearAlerts();
								toast.dismiss(toastId); // ← toastId を使って閉じる
							}}
						>
							Undo
						</Button>
					</div>
				),
				{
					// duration: Number.POSITIVE_INFINITY,
					duration: 5000,
				},
			);
		}
	}, [
		isAlertVisible,
		alertType,
		messages,
		setIsAlertVisible,
		clearAlerts,
		inputErrorCell,
	]);

	return null;
}