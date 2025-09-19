import * as v from 'valibot';
import { DateStringSchema, AmountSchema } from './common-api';

/**
 * PIPペイロード用のアイテムスキーマ
 */
export const PipItemPayloadSchema = v.object({
  itemCode: v.pipe(
    v.string(),
    v.minLength(1, 'アイテムコードは必須です'),
    v.maxLength(50, 'アイテムコードは50文字以内で入力してください'),
  ),
  itemName: v.pipe(
    v.string(),
    v.minLength(1, 'アイテム名は必須です'),
    v.maxLength(200, 'アイテム名は200文字以内で入力してください'),
  ),
  itemSpec: v.optional(
    v.pipe(
      v.string(),
      v.maxLength(500, '仕様は500文字以内で入力してください'),
    ),
  ),
  unit: v.optional(
    v.pipe(
      v.string(),
      v.maxLength(20, '単位は20文字以内で入力してください'),
    ),
  ),
  quantity: v.pipe(
    v.number(),
    v.minValue(0.01, '数量は0.01以上を入力してください'),
    v.maxValue(999999, '数量は999,999以下で入力してください'),
    v.transform((value) => Math.round(value * 100) / 100),
  ),
  unitPrice: v.pipe(
    AmountSchema,
    v.minValue(0, '単価は0以上を入力してください'),
    v.maxValue(99999999, '単価は99,999,999以下で入力してください'),
  ),
  vendorCode: v.optional(
    v.pipe(
      v.string(),
      v.maxLength(50, 'ベンダーコードは50文字以内で入力してください'),
    ),
  ),
  deliveryDate: v.optional(DateStringSchema),
  remarks: v.optional(
    v.pipe(
      v.string(),
      v.maxLength(1000, '備考は1000文字以内で入力してください'),
    ),
  ),
});

export type PipItemPayload = v.InferOutput<typeof PipItemPayloadSchema>;

/**
 * PIP作成・更新ペイロードスキーマ
 */
export const PipPayloadSchema = v.object({
  jobNo: v.pipe(
    v.string(),
    v.minLength(1, 'ジョブ番号は必須です'),
    v.regex(/^[A-Z0-9-]+$/, 'ジョブ番号は英数字とハイフンのみ使用できます'),
  ),
  fgCode: v.pipe(
    v.string(),
    v.minLength(1, 'Function Groupコードは必須です'),
    v.regex(/^FG[0-9]{4}$/, 'Function GroupコードはFG + 4桁の数字で入力してください'),
  ),
  pipCode: v.optional(
    v.pipe(
      v.string(),
      v.regex(/^PIP[0-9]{6}$/, 'PIPコードはPIP + 6桁の数字で入力してください'),
    ),
  ),
  pipName: v.pipe(
    v.string(),
    v.minLength(1, 'PIP名は必須です'),
    v.maxLength(100, 'PIP名は100文字以内で入力してください'),
  ),
  description: v.optional(
    v.pipe(
      v.string(),
      v.maxLength(2000, '説明は2000文字以内で入力してください'),
    ),
  ),
  items: v.pipe(
    v.array(PipItemPayloadSchema),
    v.minLength(1, '最低1つのアイテムを追加してください'),
    v.maxLength(500, 'アイテムは最大500個まで追加できます'),
  ),
  attachments: v.optional(
    v.array(
      v.object({
        fileName: v.pipe(
          v.string(),
          v.minLength(1, 'ファイル名は必須です'),
        ),
        fileData: v.string(), // Base64エンコードされたファイルデータ
        mimeType: v.pipe(
          v.string(),
          v.regex(
            /^(application|audio|font|image|message|model|multipart|text|video)\/[a-zA-Z0-9.+-]+$/,
            '有効なMIMEタイプを指定してください',
          ),
        ),
      }),
    ),
  ),
  remarks: v.optional(
    v.pipe(
      v.string(),
      v.maxLength(2000, '備考は2000文字以内で入力してください'),
    ),
  ),
});

export type PipPayload = v.InferOutput<typeof PipPayloadSchema>;

/**
 * PIPコピーペイロードスキーマ
 */
export const PipCopyPayloadSchema = v.object({
  sourceJobNo: v.pipe(
    v.string(),
    v.minLength(1, 'コピー元ジョブ番号は必須です'),
  ),
  sourceFgCode: v.pipe(
    v.string(),
    v.minLength(1, 'コピー元Function Groupコードは必須です'),
  ),
  sourcePipCode: v.pipe(
    v.string(),
    v.minLength(1, 'コピー元PIPコードは必須です'),
  ),
  targetJobNo: v.pipe(
    v.string(),
    v.minLength(1, 'コピー先ジョブ番号は必須です'),
  ),
  targetFgCode: v.pipe(
    v.string(),
    v.minLength(1, 'コピー先Function Groupコードは必須です'),
  ),
  newPipName: v.optional(
    v.pipe(
      v.string(),
      v.minLength(1, '新しいPIP名を入力してください'),
      v.maxLength(100, 'PIP名は100文字以内で入力してください'),
    ),
  ),
  copyItems: v.pipe(
    v.boolean(),
    v.transform((value) => value ?? true),
  ),
  copyAttachments: v.pipe(
    v.boolean(),
    v.transform((value) => value ?? false),
  ),
});

export type PipCopyPayload = v.InferOutput<typeof PipCopyPayloadSchema>;

/**
 * PIPマージペイロードスキーマ
 */
export const PipMergePayloadSchema = v.object({
  jobNo: v.pipe(
    v.string(),
    v.minLength(1, 'ジョブ番号は必須です'),
  ),
  fgCode: v.pipe(
    v.string(),
    v.minLength(1, 'Function Groupコードは必須です'),
  ),
  sourcePipCodes: v.pipe(
    v.array(v.string()),
    v.minLength(2, '最低2つのPIPを選択してください'),
    v.maxLength(10, '一度にマージできるのは最大10個までです'),
  ),
  targetPipCode: v.optional(
    v.pipe(
      v.string(),
      v.minLength(1, 'マージ先PIPコードを指定してください'),
    ),
  ),
  newPipName: v.pipe(
    v.string(),
    v.minLength(1, 'マージ後のPIP名は必須です'),
    v.maxLength(100, 'PIP名は100文字以内で入力してください'),
  ),
  mergeStrategy: v.picklist(
    ['combine', 'replace', 'append'],
    'マージ戦略を選択してください',
  ),
  conflictResolution: v.optional(
    v.picklist(['keep_first', 'keep_last', 'combine']),
  ),
});

export type PipMergePayload = v.InferOutput<typeof PipMergePayloadSchema>;

/**
 * PIP削除ペイロードスキーマ
 */
export const PipDeletePayloadSchema = v.object({
  jobNo: v.pipe(
    v.string(),
    v.minLength(1, 'ジョブ番号は必須です'),
  ),
  fgCode: v.pipe(
    v.string(),
    v.minLength(1, 'Function Groupコードは必須です'),
  ),
  pipCodes: v.pipe(
    v.array(
      v.pipe(
        v.string(),
        v.minLength(1, 'PIPコードは必須です'),
      ),
    ),
    v.minLength(1, '最低1つのPIPを選択してください'),
    v.maxLength(50, '一度に削除できるのは最大50個までです'),
  ),
  reason: v.optional(
    v.pipe(
      v.string(),
      v.maxLength(500, '削除理由は500文字以内で入力してください'),
    ),
  ),
  forceDelete: v.pipe(
    v.boolean(),
    v.transform((value) => value ?? false),
  ),
});

export type PipDeletePayload = v.InferOutput<typeof PipDeletePayloadSchema>;

/**
 * AIP（Approval In Process）更新ペイロードスキーマ
 */
export const AipUpdatePayloadSchema = v.object({
  jobNo: v.pipe(
    v.string(),
    v.minLength(1, 'ジョブ番号は必須です'),
  ),
  fgCode: v.pipe(
    v.string(),
    v.minLength(1, 'Function Groupコードは必須です'),
  ),
  pipCode: v.optional(v.string()),
  aipStatus: v.picklist(
    ['pending', 'approved', 'rejected', 'revise'],
    'AIPステータスを選択してください',
  ),
  approverComments: v.optional(
    v.pipe(
      v.string(),
      v.maxLength(1000, 'コメントは1000文字以内で入力してください'),
    ),
  ),
  approvedAmount: v.optional(
    v.pipe(
      AmountSchema,
      v.minValue(0, '承認金額は0以上を入力してください'),
    ),
  ),
  conditions: v.optional(
    v.array(
      v.pipe(
        v.string(),
        v.maxLength(500, '条件は500文字以内で入力してください'),
      ),
    ),
  ),
});

export type AipUpdatePayload = v.InferOutput<typeof AipUpdatePayloadSchema>;

/**
 * バリデーションヘルパー関数
 * エラーメッセージを日本語で取得
 */
export function validatePipPayload(data: unknown): {
  success: boolean;
  data?: PipPayload;
  errors?: Record<string, string[]>;
} {
  const result = v.safeParse(PipPayloadSchema, data);
  
  if (result.success) {
    return { success: true, data: result.output };
  }
  
  const errors = v.flatten(result.issues).nested ?? {};
  return { 
    success: false, 
    errors: Object.fromEntries(
      Object.entries(errors).map(([key, issues]) => [
        key,
        Array.isArray(issues) ? issues : [issues],
      ]),
    ),
  };
}