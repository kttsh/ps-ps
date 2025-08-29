// マイルストンのデータモデル
export interface Milestone {
	id: string;
	name: string;
	description: string;
	dueDate: Date;
	completedDate: Date | null;
	status: string;
	responsible: string;
}

