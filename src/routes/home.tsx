import { createFileRoute } from '@tanstack/react-router';
import { CalendarDays, ShoppingCart } from 'lucide-react';
import { useEffect } from 'react';
import { Topbar } from '@/components/Topbar';
import { Message } from '@/features/randing/components/Message';
import { MotionButton } from '@/features/randing/components/MotionButton';
import { ProjectSelector } from '@/features/randing/components/ProjectSelector';
import { useAlertStore } from '@/stores/useAlartStore';
import { useSelectedProjectStore } from '@/stores/useSelectedProjectStore';
import { resetGrobalState } from '@/utils/resetGrobalState';

/**
 * ホーム画面のルーティング
 * 背景のスタイルと各オブジェクトのレイアウトを定義する
 */
const RandingPage = () => {
	// アラートの状態
	const { setIsAlertVisible } = useAlertStore();

	// ホーム画面に遷移時、localStorageを初期化
	useEffect(() => {
		// 選択状態の初期化
		resetGrobalState();
		// アラート非表示
		setIsAlertVisible(false);
	}, [setIsAlertVisible]);

	// プロジェクトの選択状態
	const { selectedProject } = useSelectedProjectStore();

	return (
		<div className="relative min-h-screen overflow-hidden">
			{/* ヘッダー */}
			<div className="absolute top-0 z-50 w-full">
				<Topbar path="p-sys" />
			</div>
			{/* 背景レイヤー */}
			<div className="absolute inset-0 z-0">
				<div className="h-3/5 bg-white" />
				<div className="h-2/5 bg-gradient-to-b from-orange-300 to-orange-500" />
			</div>
			{/* メッセージ */}
			<div className="absolute top-30 right-30 z-20">
				<Message />
			</div>

			<div className="absolute z-10 inset-30">
				{/* PJセレクトボックス */}
				<div>
					<h3 className="text-5xl text-gray-800">Select a project</h3>
					<div className="mt-5">
						<ProjectSelector />
					</div>

					<div className="mt-6 space-y-2">
						<div>
							<span className="font-semibold">Order :</span>{' '}
							{selectedProject ? (
								selectedProject.jobOrderNos.join(', ')
							) : (
								<span>Not selected</span>
							)}
						</div>
						<div>
							<span className="font-semibold">Job No. :</span>{' '}
							{selectedProject ? (
								selectedProject.jobNos.join(', ')
							) : (
								<span>Not selected</span>
							)}
						</div>
					</div>
				</div>
				{/* ボタン */}
				<div className="z-10 flex justify-center gap-30 mt-10">
					{/* P-Sys */}
					<MotionButton
						link="/p-sys/item-assignment"
						icon={ShoppingCart}
						title="購入品の登録"
						text="P-Sysで購入品の登録/編集/削除、PIP(仮引合Pkg)、PIPへのベンダーの割り当てを行います。"
						disabled={!selectedProject}
					/>
					{/* MSR */}
					<MotionButton
						link="/msr/msr-unit-selector"
						icon={CalendarDays}
						title="調達管理"
						text="MSRで購入品の調達管理を行います。"
						disabled={!selectedProject}
					/>
				</div>
			</div>
		</div>
	);
};

export const Route = createFileRoute('/home')({
	component: RandingPage,
});

