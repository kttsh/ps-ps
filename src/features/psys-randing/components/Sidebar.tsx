import { Button } from '@/components/ui/button';
import { useAlertStore } from '@/stores/useAlartStore';
import { type FG, useFgsStore } from '@/stores/useFgsStore';
import { usePipsStore } from '@/stores/usePipsStore';
import { useSelectedFGStore } from '@/stores/useSelectedFgStore';
import { useSelectedJobNoStore } from '@/stores/useSelectedJobNoStore';
import { useSelectedProjectStore } from '@/stores/useSelectedProjectStore';
import { useEffect, useState } from 'react';
import { useFunctionGroups } from '../hooks/useFunctionGroups';
import { FGSelector } from './FGSelector';
import { SidebarNavigation } from './SidebarNavigation';

/**
 * サイドバーコンポーネントの定義
 */
export const Sidebar = () => {
	// FGセレクトボックスを変更したときに保持する
	const [localFG, setLocalFG] = useState<FG | null>(null);
	// プロジェクトの状態
	const { selectedProject } = useSelectedProjectStore();

	// FGリストの状態
	const { fgs, setFgs } = useFgsStore();

	// 選択したFG
	const { setSelectedJobNo } = useSelectedJobNoStore();
	const { setSelectedFG } = useSelectedFGStore();

	// FGセレクトボックスのOption
	const [fgOptions, setFgOptions] = useState<
		{ value: string; label: string }[]
	>([]);

	// FGをAPIで取得
	const { data: fgData } = useFunctionGroups();
	const { setIsAlertVisible } = useAlertStore();
	const { isPipFetchError } = usePipsStore();

	// FGリストをグローバルstateに設定、FGセレクトボックスのOption設定
	useEffect(() => {
		if (!fgData) return;
		setFgs(fgData);

		const options = fgData.map((fg) => ({
			value: fg.fgCode.trim(),
			label: fg.fgDescription.replace(/\s*:\s*/, ':'),
		}));
		setFgOptions(options);
	}, [fgData, setFgs]);

	// JobNoの初期値を設定（プロジェクトが変わったとき）
	useEffect(() => {
		if (selectedProject?.jobNos.length) {
			setSelectedJobNo(selectedProject.jobNos[0]);
		}
	}, [selectedProject, setSelectedJobNo]);

	// Display by Selectionボタンclickイベント
	const handleDisplayBySelection = () => {
		if (localFG) {
			const fg = fgs.find((f) => f.fgCode === localFG.fgCode);
			if (fg) {
				localFG && setSelectedFG(localFG);
			}
		}

		if (isPipFetchError) {
			console.log('通ってまっせ');
			setIsAlertVisible(true);
		}
	};

	return (
		<>
			<aside className="w-60 h-full shrink-0 bg-gradient-to-b from-orange-400 via-orange-400 to-orange-300">
				<div className="mt-4">
					{/* プロジェクトの情報 */}
					<div className="px-2 mt-4 text-white text-sm space-y-1">
						{/* プロジェクト名 */}
						<p className="text-3xl">
							{selectedProject?.projectNm ?? 'Not selected'}
						</p>
						{/* order */}
						<div className="mt-3">
							<p className="text-xs font-semibold">ORDER</p>
							<div className="pl-3">
								{selectedProject ? (
									selectedProject.jobOrderNos.join(', ')
								) : (
									<span>Not selected</span>
								)}
							</div>
						</div>
						{/* job no. */}
						<div className="mt-2">
							<p className="text-xs font-semibold">JOB NO.</p>
							<div className="pl-3">
								{selectedProject ? (
									selectedProject.jobNos.join(', ')
								) : (
									<span>Not selected</span>
								)}
							</div>
						</div>
					</div>

					{/* FUNCTION GROUP選択ボックス */}
					<div className="px-2 mt-6">
						<h2 className="text-xs font-semibold tracking-wide text-white">
							FUNCTION GROUP
						</h2>
						<FGSelector
							fgOptions={fgOptions}
							localFG={localFG}
							setLocalFG={setLocalFG}
						/>
						{/* 選択に基づいて表示するボタン */}
						<div className="mt-4">
							<Button
								className="w-[100%] cursor-pointer"
								disabled={!localFG}
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
			{/* {isAlertVisible && alertMessages && (
				<div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
					<AlertMessages messages={alertMessages} />
				</div>
			)} */}
		</>
	);
};

