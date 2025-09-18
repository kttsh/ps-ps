/**
 * API Schemas Export
 *
 * このファイルは全てのAPIスキーマを一元的にエクスポートします。
 * タイプ定義(src/types)と整合性を保つようにメンテナンスしています。
 */

// Common schemas and types
export {
	// API utilities
	ApiEnvelopeSchema,
	ApiErrorSchema,
	type FgCode,
	FgCodeSchema,
	type JobNo,
	// Brand types
	JobNoSchema,
	type PipCode,
	PipCodeSchema,
	type ResponseInfo,
	// Response Info
	ResponseInfoSchema,
} from './common.schema';

// Item schemas and types
export {
	type GetItemsResponse,
	GetItemsResponseSchema,
	type Item,
	ItemSchema,
} from './item.schema';
// PIP schemas and types
export {
	GetPipDetailResponseSchema,
	GetPipsResponseSchema,
	type Pip,
	type PipDetail,
	PipDetailSchema,
	type PipPayload,
	PipPayloadSchema,
	PipSchema,
} from './pip.schema';
// Vendor and AIP schemas and types
export {
	type Aip,
	AipSchema,
	GetAipsResponseSchema,
	GetVendorsResponseSchema,
	type Vendor,
	VendorSchema,
} from './vendor.schema';
