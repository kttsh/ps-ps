import { useEffect, useMemo, useState } from 'react';
import { AlertMessages } from '@/components/ui/alertMessages';
import { Button } from '@/components/ui/button';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { useAlertStore } from '@/stores/useAlartStore';
import { type FG, useFgsStore } from '@/stores/useFgsStore';
import { useIsSearchTriggeredStore } from '@/stores/useIsSearchTriggeredStore';
import { useSelectedFGStore } from '@/stores/useSelectedFgStore';
import { useSelectedJobNoStore } from '@/stores/useSelectedJobNoStore';
import { useSelectedProjectStore } from '@/stores/useSelectedProjectStore';
import { useFunctionGroups } from '../hooks/useFunctionGroups';
import { SidebarNavigation } from './SidebarNavigation';

/**
 * サイドバーコンポーネントの定義
 */
export const Sidebar = () => {
	// プロジェクトの状態
	const { selectedProject } = useSelectedProjectStore();

	// FGリストの状態
	const { fgs, setFgs } = useFgsStore();

	// アラートの状態
	const { isAlertVisible, messages, showAlert } = useAlertStore();

	// 選択したJobNo、FG
	const { selectedJobNo, setSelectedJobNo } = useSelectedJobNoStore();
	const { selectedFG, setSelectedFG } = useSelectedFGStore();

	// FGセレクトボックスのOption
	const [fgOptions, setFgOptions] = useState<
		{ value: string; label: string }[]
	>([]);

	// FGをAPIで取得
	const { data: fgData } = useFunctionGroups();

	// FGリストをグローバルstateに設定、FGセレクトボックスのOption設定
	useEffect(() => {
		if (!fgData) return;
		const parsedResponse = JSON.parse(fgData.responseJSON);
		const fgList: FG[] = JSON.parse(parsedResponse.fg);
		setFgs(fgList);

		const options = fgList.map((fg) => ({
			value: fg.fgCode.trim(),
			label: fg.fgDescription.replace(/\s*:\s*/, ':'),
		}));
		setFgOptions(options);
	}, [fgData, setFgs]);

	// FGセレクトボックスonChangeイベント
	const handleFG = (value: string) => {
		const fg = fgs.find((f) => f.fgCode === value);
		if (fg) setSelectedFG(fg);
	};

	// JobNoの選択肢
	const selectJobNoOptions = useMemo(() => {
		return (
			selectedProject?.jobNos.map((jobNo) => ({
				value: jobNo,
				label: jobNo,
			})) ?? []
		);
	}, [selectedProject]);

	// JobNoの初期値を設定（プロジェクトが変わったとき）
	useEffect(() => {
		if (selectedProject?.jobNos.length) {
			setSelectedJobNo(selectedProject.jobNos[0]);
		}
	}, [selectedProject, setSelectedJobNo]);

	// JobNoセレクトボックスonChangeイベント
	const handleJobNo = (value: string) => {
		setSelectedJobNo(value);
	};

	// Display by Selectionの押下状態
	const { triggerSearch } = useIsSearchTriggeredStore();

	// Display by Selectionボタンclickイベント
	const handleDisplayBySelection = () => {
		if (selectedFG) {
			const fg = fgs.find((f) => f.fgCode === selectedFG.fgCode);
			if (fg) {
				setSelectedFG(fg);
				// Display by Selectionを押下状態にする
				triggerSearch();
			}
		}
	};

	// FG未選択時の通知
	useEffect(() => {
		if (!selectedFG) {
			showAlert('info', [{ id: 'SELECT_FG', text: 'FGを選択してください' }]);
		}
	}, [selectedFG, showAlert]);

	return (
		<>
			<aside className="w-60 h-full shrink-0 bg-gradient-to-b from-orange-400 via-orange-400 to-orange-300">
				<div className="mt-4">
					{/* JOB NO.選択ボックス */}
					<div className="px-2">
						<h2 className="text-xs font-semibold tracking-wide text-white">
							JOB NO.
						</h2>
						<Select value={selectedJobNo} onValueChange={handleJobNo}>
							<SelectTrigger className="mt-1 w-[100%] bg-white">
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									{selectJobNoOptions.length > 0 ? (
										selectJobNoOptions.map((jobNo) => (
											<SelectItem key={jobNo.value} value={jobNo.value}>
												{jobNo.label}
											</SelectItem>
										))
									) : (
										<SelectItem disabled value="none">
											Job No.がありません
										</SelectItem>
									)}
								</SelectGroup>
							</SelectContent>
						</Select>
					</div>

					{/* FUNCTION GROUP選択ボックス */}
					<div className="px-2 mt-2">
						<h2 className="text-xs font-semibold tracking-wide text-white">
							FUNCTION GROUP
						</h2>
						<Select onValueChange={handleFG} value={selectedFG?.fgCode}>
							<SelectTrigger className="mt-1 w-[100%] bg-white">
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									{fgOptions.map((fg) => (
										<SelectItem key={fg.value} value={fg.value}>
											{fg.label}
										</SelectItem>
									))}
								</SelectGroup>
							</SelectContent>
						</Select>

						{/* 選択に基づいて表示するボタン */}
						<div className="mt-4">
							<Button
								className="w-[100%] cursor-pointer"
								disabled={!selectedFG}
								onClick={handleDisplayBySelection}
							>
								Display by Selection
							</Button>
						</div>
					</div>
				</div>

				{/* ナビゲーションメニューの表示 */}
				<SidebarNavigation />
			</aside>

			{/* アラートメッセージ */}
			{isAlertVisible && messages && (
				<div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
					<AlertMessages messages={messages.reduce((acc, msg) => {
						acc[msg.id] = msg.text;
						return acc;
					}, {} as Record<string, string>)} />
				</div>
			)}
		</>
	);
};
