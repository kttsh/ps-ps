import * as v from 'valibot';
import { ApiEnvelopeSchema, FgCodeSchema, JobNoSchema } from './common.schema';

// アイテムスキーマ（完全な型定義）
export const ItemSchema = v.object({
	// 必須フィールド
	itemSurKey: v.string(),
	jobNo: JobNoSchema,
	fgCode: FgCodeSchema,
	itemNo: v.string(),
	itemCoreNo: v.string(),
	itemName: v.pipe(v.string(), v.minLength(1)),
	itemCostElement: v.string(),

	// オプショナルフィールド（nullableとoptionalを適切に使い分け）
	itemQty: v.optional(
		v.pipe(
			v.string(),
			v.transform((val) => Number.parseInt(val, 10)),
			v.number(),
			v.minValue(0),
		),
	),
	itemAssignedQty: v.optional(
		v.pipe(
			v.string(),
			v.transform((val) => Number.parseInt(val, 10)),
			v.number(),
			v.minValue(0),
		),
	),
	itemAssignQty: v.optional(
		v.pipe(
			v.string(),
			v.transform((val) => Number.parseInt(val, 10)),
			v.number(),
			v.minValue(0),
		),
	),
	itemUnassignedQty: v.optional(
		v.pipe(
			v.string(),
			v.transform((val) => Number.parseInt(val, 10)),
			v.number(),
			v.minValue(0),
		),
	),
	itemSortKey: v.optional(v.string()),
	itemIBSCode: v.optional(v.string()),
	itemIbsCode: v.optional(v.string()), // 統一すべきだが現状維持
	itemIsAssign: v.optional(v.picklist(['0', '1'])),
});

export type Item = v.InferOutput<typeof ItemSchema>;

// APIレスポンススキーマ
export const GetItemsResponseSchema = ApiEnvelopeSchema(
	v.object({
		items: v.array(ItemSchema),
	}),
);

export type GetItemsResponse = v.InferOutput<typeof GetItemsResponseSchema>;
