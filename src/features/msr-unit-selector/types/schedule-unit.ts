export interface ScheduleUnit {
	id: string;
	name: string;
	description?: string
	startDate: Date;
	endDate: Date;
	status: string;
	assignees: string[]; // 文字列から配列に変更
	tags: string[];
	order: string[];
	function: string[];
}

