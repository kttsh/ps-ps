import * as v from 'valibot';

// ブランド型の定義
export const JobNoSchema = v.pipe(
	v.string(),
	v.regex(/^[A-Z0-9]{8}$/),
	v.brand('JobNo'),
);
export type JobNo = v.InferOutput<typeof JobNoSchema>;

export const FgCodeSchema = v.pipe(
	v.string(),
	v.minLength(1),
	v.brand('FgCode'),
);
export type FgCode = v.InferOutput<typeof FgCodeSchema>;

export const PipCodeSchema = v.pipe(
	v.string(),
	v.minLength(1),
	v.brand('PipCode'),
);
export type PipCode = v.InferOutput<typeof PipCodeSchema>;

// APIレスポンスのエンベロープ
export const ApiEnvelopeSchema = <
	T extends v.BaseSchema<unknown, unknown, v.BaseIssue<unknown>>,
>(
	dataSchema: T,
) =>
	v.object({
		success: v.boolean(),
		data: dataSchema,
		messages: v.optional(
			v.array(
				v.object({
					code: v.string(),
					message: v.string(),
					severity: v.picklist(['info', 'warning', 'error']),
				}),
			),
		),
		metadata: v.optional(
			v.object({
				timestamp: v.pipe(v.string(), v.isoTimestamp()),
				version: v.string(),
				pagination: v.optional(
					v.object({
						page: v.number(),
						limit: v.number(),
						total: v.number(),
						hasMore: v.boolean(),
					}),
				),
			}),
		),
	});

// エラーレスポンス
export const ApiErrorSchema = v.object({
	error: v.object({
		code: v.string(),
		message: v.string(),
		details: v.optional(v.unknown()),
		timestamp: v.pipe(v.string(), v.isoTimestamp()),
		traceId: v.optional(v.string()),
	}),
});

// APIレスポンス共通info (matches ResponseInfo from types)
export const ResponseInfoSchema = v.object({
	Id: v.string(),
	Type: v.number(),
	Description: v.string(),
});

export type ResponseInfo = v.InferOutput<typeof ResponseInfoSchema>;
