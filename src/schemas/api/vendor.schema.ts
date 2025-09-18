import * as v from 'valibot';
import {
	ApiEnvelopeSchema
} from './common.schema';

// ベンダースキーマ
export const VendorSchema = v.object({
	vendorCode: v.string(),
	vendorName: v.string(),
	vendorId: v.string(),
	status: v.picklist(['active', 'inactive', 'pending']),
});

export type Vendor = v.InferOutput<typeof VendorSchema>;

// AIP（Assignment Item to Pip）スキーマ
export const AipSchema = v.object({
	aipCode: v.string(),
	vendorId: v.string(),
	vendorName: v.string(),
});

export type Aip = v.InferOutput<typeof AipSchema>;

// APIレスポンススキーマ
export const GetVendorsResponseSchema = ApiEnvelopeSchema(
	v.object({
		vendors: v.array(VendorSchema),
	}),
);

export const GetAipsResponseSchema = ApiEnvelopeSchema(
	v.object({
		aips: v.array(AipSchema),
	}),
);
