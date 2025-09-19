import * as v from 'valibot';

/**
 * 共通のレスポンス情報スキーマ
 */
export const ResponseInfoSchema = v.object({
  code: v.string(),
  message: v.string(),
  level: v.optional(v.picklist(['info', 'warning', 'error'])),
});

export type ResponseInfo = v.InferOutput<typeof ResponseInfoSchema>;

/**
 * ページネーション情報スキーマ
 */
export const PaginationSchema = v.object({
  page: v.pipe(v.number(), v.integer(), v.minValue(1)),
  pageSize: v.pipe(v.number(), v.integer(), v.minValue(1), v.maxValue(100)),
  total: v.pipe(v.number(), v.integer(), v.minValue(0)),
  totalPages: v.pipe(v.number(), v.integer(), v.minValue(0)),
});

export type Pagination = v.InferOutput<typeof PaginationSchema>;

/**
 * 日付文字列スキーマ（ISO 8601形式）
 */
export const DateStringSchema = v.pipe(
  v.string(),
  v.isoDateTime(),
  v.transform((value) => new Date(value)),
);

/**
 * 金額スキーマ
 */
export const AmountSchema = v.pipe(
  v.number(),
  v.minValue(0),
  v.transform((value) => Math.round(value * 100) / 100), // 小数点以下2桁に丸める
);

/**
 * パーセンテージスキーマ
 */
export const PercentageSchema = v.pipe(
  v.number(),
  v.minValue(0),
  v.maxValue(100),
);

/**
 * アイテムレスポンススキーマ
 */
export const ItemResponseSchema = v.object({
  itemCode: v.string(),
  itemName: v.string(),
  itemSpec: v.optional(v.string()),
  unit: v.optional(v.string()),
  quantity: v.pipe(v.number(), v.minValue(0)),
  unitPrice: AmountSchema,
  amount: AmountSchema,
  category: v.optional(v.string()),
  vendorCode: v.optional(v.string()),
  vendorName: v.optional(v.string()),
  deliveryDate: v.optional(DateStringSchema),
  status: v.optional(v.picklist(['pending', 'ordered', 'delivered', 'cancelled'])),
  remarks: v.optional(v.string()),
  createdAt: v.optional(DateStringSchema),
  updatedAt: v.optional(DateStringSchema),
});

export type ItemResponse = v.InferOutput<typeof ItemResponseSchema>;

/**
 * PIPレスポンススキーマ
 */
export const PipResponseSchema = v.object({
  pipCode: v.string(),
  pipName: v.string(),
  description: v.optional(v.string()),
  itemCount: v.pipe(v.number(), v.integer(), v.minValue(0)),
  totalAmount: AmountSchema,
  status: v.picklist(['draft', 'submitted', 'approved', 'rejected', 'completed']),
  createdBy: v.optional(v.string()),
  createdAt: DateStringSchema,
  updatedBy: v.optional(v.string()),
  updatedAt: DateStringSchema,
  approvedBy: v.optional(v.string()),
  approvedAt: v.optional(DateStringSchema),
  remarks: v.optional(v.string()),
});

export type PipResponse = v.InferOutput<typeof PipResponseSchema>;

/**
 * PIP詳細レスポンススキーマ
 */
export const PipDetailResponseSchema = v.object({
  ...PipResponseSchema.entries,
  items: v.array(ItemResponseSchema),
  attachments: v.optional(
    v.array(
      v.object({
        id: v.string(),
        fileName: v.string(),
        fileSize: v.pipe(v.number(), v.integer(), v.minValue(0)),
        mimeType: v.string(),
        uploadedAt: DateStringSchema,
        uploadedBy: v.string(),
      }),
    ),
  ),
  history: v.optional(
    v.array(
      v.object({
        action: v.string(),
        performedBy: v.string(),
        performedAt: DateStringSchema,
        details: v.optional(v.record(v.string(), v.unknown())),
      }),
    ),
  ),
});

export type PipDetailResponse = v.InferOutput<typeof PipDetailResponseSchema>;

/**
 * ベンダーレスポンススキーマ
 */
export const VendorResponseSchema = v.object({
  vendorCode: v.string(),
  vendorName: v.string(),
  vendorNameKana: v.optional(v.string()),
  contactPerson: v.optional(v.string()),
  phoneNumber: v.optional(v.string()),
  email: v.optional(v.pipe(v.string(), v.email())),
  address: v.optional(v.string()),
  zipCode: v.optional(v.string()),
  status: v.picklist(['active', 'inactive', 'suspended']),
  evaluationScore: v.optional(v.pipe(v.number(), v.minValue(0), v.maxValue(5))),
  contractStartDate: v.optional(DateStringSchema),
  contractEndDate: v.optional(DateStringSchema),
  paymentTerms: v.optional(v.string()),
  notes: v.optional(v.string()),
});

export type VendorResponse = v.InferOutput<typeof VendorResponseSchema>;

/**
 * Function Groupレスポンススキーマ
 */
export const FunctionGroupResponseSchema = v.object({
  fgCode: v.string(),
  fgName: v.string(),
  description: v.optional(v.string()),
  parentFgCode: v.optional(v.string()),
  level: v.pipe(v.number(), v.integer(), v.minValue(0)),
  isActive: v.boolean(),
  sortOrder: v.pipe(v.number(), v.integer()),
  createdAt: DateStringSchema,
  updatedAt: DateStringSchema,
  permissions: v.optional(
    v.array(
      v.picklist(['read', 'write', 'delete', 'approve']),
    ),
  ),
});

export type FunctionGroupResponse = v.InferOutput<typeof FunctionGroupResponseSchema>;

/**
 * APIエラーレスポンススキーマ
 */
export const ApiErrorResponseSchema = v.object({
  error: v.object({
    code: v.string(),
    message: v.string(),
    details: v.optional(v.record(v.string(), v.unknown())),
    timestamp: DateStringSchema,
    path: v.optional(v.string()),
    requestId: v.optional(v.string()),
  }),
});

export type ApiErrorResponse = v.InferOutput<typeof ApiErrorResponseSchema>;

/**
 * 成功レスポンスラッパースキーマ
 * ジェネリック型パラメータをサポート
 */
export const createSuccessResponseSchema = <T>(dataSchema: v.BaseSchema<unknown, T>) =>
  v.object({
    success: v.literal(true),
    data: dataSchema,
    messages: v.optional(v.array(ResponseInfoSchema)),
    meta: v.optional(
      v.object({
        pagination: v.optional(PaginationSchema),
        timestamp: DateStringSchema,
        version: v.optional(v.string()),
      }),
    ),
  });

/**
 * リスト型レスポンスラッパースキーマ
 */
export const createListResponseSchema = <T>(itemSchema: v.BaseSchema<unknown, T>) =>
  v.object({
    items: v.array(itemSchema),
    pagination: v.optional(PaginationSchema),
    messages: v.optional(v.array(ResponseInfoSchema)),
  });

/**
 * バッチ処理結果スキーマ
 */
export const BatchResultSchema = v.object({
  successful: v.array(
    v.object({
      index: v.pipe(v.number(), v.integer(), v.minValue(0)),
      id: v.string(),
      result: v.unknown(),
    }),
  ),
  failed: v.array(
    v.object({
      index: v.pipe(v.number(), v.integer(), v.minValue(0)),
      id: v.optional(v.string()),
      error: v.object({
        code: v.string(),
        message: v.string(),
      }),
    }),
  ),
  summary: v.object({
    total: v.pipe(v.number(), v.integer(), v.minValue(0)),
    successful: v.pipe(v.number(), v.integer(), v.minValue(0)),
    failed: v.pipe(v.number(), v.integer(), v.minValue(0)),
  }),
});

export type BatchResult = v.InferOutput<typeof BatchResultSchema>;