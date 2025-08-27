import { createFileRoute } from '@tanstack/react-router';
import { CalendarDays, ShoppingCart } from 'lucide-react';
import { useEffect, useMemo } from 'react';
import { Topbar } from '@/components/Topbar';
import { AlertMessages } from '@/components/ui/alertMessages';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Message } from '@/features/randing/components/Message';
import { MotionButton } from '@/features/randing/components/MotionButton';
import { projects } from '@/features/randing/mocks/projects';
import { transformProjects } from '@/features/randing/utils/transformProjects';
import { useAlertStore } from '@/stores/useAlartStore';
import { useSelectedProjectStore } from '@/stores/useSelectedProjectStore';
import { resetGrobalState } from '@/utils/resetGrobalState';

/**
 * ホーム画面のルーティング
 * 背景のスタイルと各オブジェクトのレイアウトを定義する
 */
const RandingPage = () => {
	// アラートの状態
	const { setIsAlertVisible, isAlertVisible, alertMessages, showAlert } =
		useAlertStore();

	// ホーム画面に遷移時、localStorageを初期化
	useEffect(() => {
		resetGrobalState();

		// アラート非表示
		setIsAlertVisible(false);
	}, []);

	// プロジェクトの選択状態
	const { selectedProject, setSelectedProject } = useSelectedProjectStore();

	// プロジェクト整形
	const groupedProjects = useMemo(() => transformProjects(projects), []);

	// セレクト用オプション
	const selectOptions = useMemo(
		() =>
			groupedProjects.map((p) => ({
				value: p.projectId,
				label: p.projectNm,
			})),
		[groupedProjects],
	);

	// プロジェクト選択時に各情報をグローバルステートに設定
	const handleProjectSelect = (projectId: string) => {
		const project = groupedProjects.find((p) => p.projectId === projectId);
		if (project) {
			setSelectedProject({
				projectId: project.projectId,
				projectNm: project.projectNm,
				jobNos: project.jobNos,
				jobOrderNos: project.jobOrderNos,
			});
		}
	};

	const handleSearch = () => showAlert(['SELECT_PROJECT']);

	return (
		<div className="relative min-h-screen overflow-hidden">
			{/* ヘッダー */}
			<div className="absolute top-0 z-50 w-full">
				<Topbar />
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
					<h3 className="text-4xl text-gray-800">Select a project</h3>
					<div className="mt-5">
						<Select onValueChange={handleProjectSelect}>
							<SelectTrigger className="w-[500px] isolate shadow-lg ring-1 ring-black/10 border-0">
								<SelectValue placeholder="プロジェクトを選択してください" />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									{selectOptions.map((opt) => (
										<SelectItem key={opt.value} value={opt.value}>
											{opt.label}
										</SelectItem>
									))}
								</SelectGroup>
							</SelectContent>
						</Select>
					</div>

					<div className="mt-6 space-y-2">
						<div>
							<span className="font-semibold">Order :</span>{' '}
							{selectedProject && selectedProject.jobOrderNos.join(', ')}
						</div>
						<div>
							<span className="font-semibold">Job No. :</span>{' '}
							{selectedProject && selectedProject.jobNos.join(', ')}
						</div>
					</div>
				</div>
				{/* ボタン */}
				<div className="z-10 flex justify-center gap-30 mt-20">
					{/* P-Sys */}
					<MotionButton
						link="/ps-ps/item-assignment"
						icon={ShoppingCart}
						title="購入品の登録"
						text="P-Sysで購入品の登録/編集/削除、PIP(仮引合Pkg)、PIPへのベンダーの割り当てを行います。"
						onClick={handleSearch}
						disabled={!selectedProject}
					/>
					{/* MARUSE */}
					<MotionButton
						link="/msr"
						icon={CalendarDays}
						title="調達管理"
						text="MARUSEで購入品の調達管理を行います。"
						disabled={true}
					/>
				</div>
				{/* アラート表示エリア */}
				{isAlertVisible && alertMessages && (
					<div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-10">
						<AlertMessages messages={alertMessages} />
					</div>
				)}
			</div>
		</div>
	);
};

export const Route = createFileRoute('/home')({
	component: RandingPage,
});
