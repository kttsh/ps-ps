import * as v from 'valibot';
import {
	ApiEnvelopeSchema,
	FgCodeSchema,
	JobNoSchema,
	PipCodeSchema,
} from './common.schema';
import { ItemSchema } from './item.schema';
import { AipSchema } from './vendor.schema';

// PIPスキーマ
export const PipSchema = v.object({
	jobNo: JobNoSchema,
	fgCode: FgCodeSchema,
	pipCode: PipCodeSchema,
	pipNickName: v.string(),
	pipSortKey: v.string(),
	itemCount: v.optional(
		v.pipe(
			v.string(),
			v.transform((val) => Number.parseInt(val, 10)),
			v.number(),
			v.minValue(0),
		),
	),
	vendorCount: v.optional(
		v.pipe(
			v.string(),
			v.transform((val) => Number.parseInt(val, 10)),
			v.number(),
			v.minValue(0),
		),
	),
});

export type Pip = v.InferOutput<typeof PipSchema>;

// PIP詳細スキーマ (matches PipDetailResponse from types)
export const PipDetailSchema = v.object({
	...PipSchema.entries,
	items: v.optional(v.array(ItemSchema)),
	aips: v.optional(v.array(AipSchema)),
});

export type PipDetail = v.InferOutput<typeof PipDetailSchema>;

// APIレスポンススキーマ
export const GetPipsResponseSchema = ApiEnvelopeSchema(
	v.object({
		pipsList: v.array(PipSchema),
	}),
);

export const GetPipDetailResponseSchema = ApiEnvelopeSchema(
	v.object({
		pipDetail: PipDetailSchema,
	}),
);

// ペイロードスキーマ（作成・更新用）
export const PipPayloadSchema = v.object({
	jobNo: JobNoSchema,
	fgCode: FgCodeSchema,
	pipNickName: v.pipe(v.string(), v.minLength(1), v.maxLength(100)),
	itemList: v.array(
		v.object({
			itemSurKey: v.string(),
			quantity: v.pipe(v.number(), v.minValue(1)),
		}),
	),
});

export type PipPayload = v.InferOutput<typeof PipPayloadSchema>;
