export interface PipCode {
	sourcePIPCode: string;
}

export interface DeletePipPayload {
	userId: string;
	jobNo: string;
	fgCode: string;
	pip: PipCode[];
}
