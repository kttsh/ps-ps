type Project = {
	projectId: string;
	projectNm: string;
	jobNo: string;
	jobOrderNo: string;
};

type GroupedProject = {
	projectId: string;
	projectNm: string;
	jobNos: string[];
	jobOrderNos: string[];
};

// APIから取得したプロジェクトリストを整形
export const transformProjects = (projects: Project[]): GroupedProject[] => {
	const map = new Map<string, GroupedProject>();

	projects.forEach((p) => {
		const existing = map.get(p.projectId);
		if (!existing) {
			map.set(p.projectId, {
				projectId: p.projectId,
				projectNm: p.projectNm,
				jobNos: [p.jobNo],
				jobOrderNos: [p.jobOrderNo],
			});
		} else {
			if (!existing.jobNos.includes(p.jobNo)) {
				existing.jobNos.push(p.jobNo);
			}
			if (!existing.jobOrderNos.includes(p.jobOrderNo)) {
				existing.jobOrderNos.push(p.jobOrderNo);
			}
		}
	});

	return Array.from(map.values());
};

