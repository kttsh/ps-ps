import { useLocation } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useItems } from '@/features/item-management/hooks/useItems';
import { usePips } from '@/features/pip-management/hooks/usePips';
import { useFgCodeUrlSync } from '@/hooks/useFgCodeUrlSync';
import { useAlertStore } from '@/stores/useAlartStore';
import { useFgsStore } from '@/stores/useFgsStore';
import { useSelectedFGStore } from '@/stores/useSelectedFgStore';
import { useSelectedJobNoStore } from '@/stores/useSelectedJobNoStore';
import { useSelectedProjectStore } from '@/stores/useSelectedProjectStore';
import type { FG } from '@/types';
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

	const { selectedJobNo } = useSelectedJobNoStore();
	const { setSelectedFG } = useSelectedFGStore();
	// 購入品リスト取得
	const fgCode = localFG?.fgCode ?? null;
	const { refetch: itemsRefetch } = useItems(selectedJobNo, fgCode);
	const { refetch: pipsRefetch } = usePips(selectedJobNo, fgCode);

	const pathname = useLocation({
		select: (location) => location.pathname,
	});

	// FGセレクトボックスのOption
	const [fgOptions, setFgOptions] = useState<
		{ value: string; label: string }[]
	>([]);

	// FGをAPIで取得
	const { data: fgData = [] } = useFunctionGroups();
	const { showAlert } = useAlertStore();

	// FGリストをグローバルstateに設定、FGセレクトボックスのOption設定
	useEffect(() => {
		if (!fgData || fgData.length === 0) return;
		setFgs(fgData);

		const options = fgData.map((fg) => ({
			value: fg.fgCode,
			label: fg.fgName, // すでに "A:ABCD" 形式
		}));
		setFgOptions(options);
	}, [fgData, setFgs]);

	// JobNoの初期値を設定（プロジェクトが変わったとき）
	useEffect(() => {
		if (selectedProject?.jobNos.length) {
			setSelectedJobNo(selectedProject.jobNos[0]);
		}
	}, [selectedProject, setSelectedJobNo]);

	// URL同期フックを使用
	const { setFgCodeToUrl } = useFgCodeUrlSync({
		fgs,
		onFgChange: (fg) => {
			if (fg !== localFG) {
				setLocalFG(fg || ({} as FG));
			}
		},
	});

	// Display by Selectionボタンclickイベント
	const handleDisplayBySelection = async () => {
		if (localFG) {
			const fg = fgs.find((f) => f.fgCode === localFG.fgCode);
			if (fg) {
				if (!localFG) return;
				setSelectedFG(localFG);
				setFgCodeToUrl(localFG.fgCode); // URLに反映

				// 購入品リスト・PIPリスト取得
				const itemsResponse = await itemsRefetch();
				const pipsResponse = await pipsRefetch();

				if (
					itemsResponse.data?.items.length === 0 &&
					pathname === '/p-sys/item-assignment'
				) {
					showAlert(['NO_ITEM'], 'warning');
				}

				if (
					pipsResponse.data?.pipsList.length === 0 &&
					pathname === '/p-sys/pips'
				) {
					showAlert(['NO_PIP'], 'warning');
				}
			}
		}
	};

	return (
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
	);
};