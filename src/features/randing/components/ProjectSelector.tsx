import { useMemo } from 'react';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { projects } from '@/features/randing/mocks/projects';
import { transformProjects } from '@/features/randing/utils/transformProjects';
import { useSelectedProjectStore } from '@/stores/useSelectedProjectStore';

export const ProjectSelector = () => {
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
	return (
		<Select onValueChange={handleProjectSelect}>
			<SelectTrigger
				className={`mt-10 text-lg h-10! w-[300px] isolate shadow-lg ring-1 ring-black/10 border-0 ${
					!selectedProject ? 'bg-red-100' : ''
				}`}
			>
				<SelectValue placeholder="select a project" />
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
	);
};
