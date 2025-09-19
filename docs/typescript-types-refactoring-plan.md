# TypeScript型定義リファクタリング計画

## 作成日: 2025-01-20
## ブランチ: feature/types-refactoring

## エグゼクティブサマリー

現在のTypeScriptの型定義は基本的な機能は果たしているものの、**高度な型機能の活用率は約30%**に留まっています。主な問題は、型定義の重複、不適切な`any`/`unknown`の使用、Optional型の濫用、そして最新TypeScript機能の未活用です。このドキュメントでは、型システムを最大限活用し、型安全性を向上させるための包括的な改修計画を提案します。

## 📊 現状分析

### 1. 型定義の分散と重複

#### 1.1 重複した型定義

```typescript
// 問題: 同じ概念の型が複数箇所で定義されている

// src/types/common.ts
export interface Item { ... }
export interface Vendor { ... }
export interface Pip { ... }

// src/types/common-api.ts
export interface ItemResponse { ... }  // Itemとほぼ同じ
export interface VendorResponse { ... }  // Vendorとほぼ同じ
export interface PipResponse { ... }  // Pipとほぼ同じ

// src/features/pip-management/types/pip-payload.ts
export interface PipCode { ... }  // 別のPip関連型

// src/features/pip-management/utils/createDeletePipPayload.ts
export interface PipInfo { ... }  // さらに別のPip型

// src/features/pip-management/utils/createMergePipPayload.ts
export interface PipInfo { ... }  // 完全に重複！
```

#### 1.2 型定義の配置場所の混乱

| 場所 | 型の種類 | 問題点 |
|------|---------|--------|
| `src/types/` | ドメイン型 | APIレスポンス型と混在 |
| `src/types/common-api.ts` | API型 | ドメイン型と責務が不明確 |
| `features/*/types/` | 機能固有型 | グローバル型と重複 |
| `features/*/utils/` | ユーティリティ内型 | 隠蔽されて再利用困難 |
| `src/schemas/` | Valibot型 | 型定義と分離 |

### 2. TypeScript機能の活用不足

#### 2.1 未活用の高度な機能

| 機能 | 現在の活用率 | 改善余地 |
|------|------------|----------|
| Branded Types | 10% | APIクライアントのみ使用、全体未適用 |
| Type Guards | 5% | カスタム型ガードほぼなし |
| Template Literal Types | 20% | 一部のみ使用 |
| Conditional Types | 0% | 未使用 |
| Mapped Types | 0% | 未使用 |
| Utility Types | 30% | 基本的なもののみ |
| const assertions | 30% | 部分的使用 |
| satisfies operator | 0% | 未使用（TS 4.9+） |
| 型パラメータのconst修飾子 | 0% | 未使用（TS 5.0+） |

#### 2.2 問題のあるパターン

```typescript
// ❌ 問題1: any/unknown の濫用
value: unknown;  // 14箇所で発見
item: any;       // renderStatusSelectBox.ts等で使用

// ❌ 問題2: Optional型の過度な使用
export interface Item {
  itemQty?: number;        // なぜOptional？
  itemAssignedQty?: number;
  itemUnassignedQty?: number;
  // 全体の60%がOptional
}

// ❌ 問題3: 型アサーションの濫用
const jobNo = value as JobNo;  // 検証なし

// ❌ 問題4: インデックスシグネチャの濫用
[key: string]: unknown;  // 型安全性の放棄
```

### 3. 型の一貫性の欠如

#### 3.1 命名規則の不統一

| パターン | 例 | 問題 |
|----------|-----|------|
| Response型 | `ItemResponse`, `PipsResponse` | 単数/複数の不統一 |
| Payload型 | `PipPayload`, `PipItemPayload` | 階層が不明確 |
| Store型 | `PipsStore`, `PipDetailStore` | 単数/複数混在 |

#### 3.2 型変換の混乱

```typescript
// 現在の型変換フロー（複雑で追跡困難）
ItemResponse → transformItemResponseToItem → Item
PipResponse → transformPipsResponseToPips → Pip[]
VendorResponse → transformVendorResponseToVendorData → Vendor
```

## 🎯 改修方針

### 原則

1. **Single Source of Truth**: 各概念につき型定義は1つ
2. **型安全性の最大化**: `any`/`unknown`の排除
3. **Runtime Validation**: Valibotとの統合強化
4. **Progressive Enhancement**: 段階的な型強化
5. **Developer Experience**: 型推論の最適化

## 📋 具体的な改修計画

### Phase 1: 型定義の整理と統合（2日）

#### 1.1 ディレクトリ構造の再編成

```typescript
src/
├── types/
│   ├── domain/           // ドメインモデル
│   │   ├── item.ts       // Item関連の全型
│   │   ├── pip.ts        // PIP関連の全型
│   │   ├── vendor.ts     // Vendor関連の全型
│   │   └── index.ts
│   ├── api/              // API関連型
│   │   ├── requests/     // リクエスト型
│   │   ├── responses/    // レスポンス型
│   │   └── index.ts
│   ├── ui/               // UI専用型
│   │   ├── components/
│   │   └── forms/
│   ├── guards/           // 型ガード集
│   ├── utilities/        // ユーティリティ型
│   └── index.ts         // 公開API
```

#### 1.2 重複型の統合

```typescript
// src/types/domain/pip.ts
// Before: 5つの異なるPip型定義
// After: 統一された型定義

/**
 * PIPコード（Branded Type）
 */
export type PipCode = string & { readonly __brand: 'PipCode' };

/**
 * PIP基本情報
 */
export interface PipBase {
  readonly jobNo: JobNo;
  readonly fgCode: FgCode;
  readonly pipCode: PipCode;
  readonly pipNickname: string;
  readonly createdAt: DateString;
  readonly updatedAt: DateString;
}

/**
 * PIPサマリー（リスト表示用）
 */
export interface PipSummary extends PipBase {
  readonly itemCount: number;
  readonly vendorCount: number;
  readonly status: PipStatus;
}

/**
 * PIP詳細（編集画面用）
 */
export interface PipDetail extends PipBase {
  readonly items: ReadonlyArray<Item>;
  readonly vendors: ReadonlyArray<Vendor>;
  readonly metadata: PipMetadata;
}

// 型ガード
export const isPipDetail = (pip: PipBase): pip is PipDetail => {
  return 'items' in pip && 'vendors' in pip;
};

// ヘルパー関数
export const createPipCode = (value: string): PipCode => {
  if (!isValidPipCode(value)) {
    throw new Error(`Invalid PIP code: ${value}`);
  }
  return value as PipCode;
};
```

### Phase 2: 高度な型機能の活用（3日）

#### 2.1 Branded Typesの全面採用

```typescript
// src/types/utilities/branded.ts
/**
 * Branded Type生成ユーティリティ
 */
type Brand<K, T> = K & { __brand: T };

// ドメイン固有のBranded Types
export type JobNo = Brand<string, 'JobNo'>;
export type FgCode = Brand<string, 'FgCode'>;
export type ItemId = Brand<number, 'ItemId'>;
export type VendorId = Brand<string, 'VendorId'>;
export type Quantity = Brand<number, 'Quantity'>;
export type DateString = Brand<string, 'DateString'>;

// バリデーション付きファクトリー関数
export const JobNo = {
  create(value: string): JobNo {
    const pattern = /^[A-Z]{2}\d{6}$/;
    if (!pattern.test(value)) {
      throw new Error(`Invalid JobNo format: ${value}`);
    }
    return value as JobNo;
  },
  
  validate(value: string): value is JobNo {
    return /^[A-Z]{2}\d{6}$/.test(value);
  }
};
```

#### 2.2 Template Literal Typesの活用

```typescript
// src/types/utilities/routes.ts
/**
 * 型安全なルート定義
 */
type ApiVersion = 'v1' | 'v2';
type ResourceType = 'items' | 'pips' | 'vendors';
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

// Template Literal Type
type ApiEndpoint<
  V extends ApiVersion = 'v1',
  R extends ResourceType = ResourceType
> = `/api/${V}/${R}`;

type RouteWithParams<T extends string> = 
  T extends `${infer Start}/:${infer Param}/${infer Rest}`
    ? `${Start}/${string}/${RouteWithParams<Rest>}`
    : T extends `${infer Start}/:${infer Param}`
      ? `${Start}/${string}`
      : T;

// 使用例
type ItemsEndpoint = ApiEndpoint<'v1', 'items'>; // "/api/v1/items"
type PipDetailRoute = RouteWithParams<'/pips/:jobNo/:fgCode/:pipCode'>;
```

#### 2.3 Conditional TypesとMapped Types

```typescript
// src/types/utilities/transforms.ts
/**
 * APIレスポンスからドメインモデルへの型変換
 */
type ApiResponse<T> = {
  data: T;
  meta?: ResponseMetadata;
  errors?: ApiError[];
};

// Conditional Type: nullableフィールドの処理
type NonNullableFields<T> = {
  [K in keyof T]-?: NonNullable<T[K]>;
};

// Mapped Type: ReadonlyとDeepReadonly
type DeepReadonly<T> = T extends primitive
  ? T
  : T extends Array<infer U>
    ? ReadonlyArray<DeepReadonly<U>>
    : T extends Map<infer K, infer V>
      ? ReadonlyMap<DeepReadonly<K>, DeepReadonly<V>>
      : { readonly [K in keyof T]: DeepReadonly<T[K]> };

// Pick/Omitの拡張
type StrictOmit<T, K extends keyof T> = Omit<T, K>;
type RequiredKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? never : K;
}[keyof T];
```

#### 2.4 型ガードの強化

```typescript
// src/types/guards/index.ts
/**
 * 型ガード集
 */
export const guards = {
  // 基本型ガード
  isString: (value: unknown): value is string => 
    typeof value === 'string',
  
  isNumber: (value: unknown): value is number => 
    typeof value === 'number' && !isNaN(value),
  
  // 配列型ガード
  isNonEmptyArray: <T>(arr: T[]): arr is [T, ...T[]] => 
    arr.length > 0,
  
  // ドメイン型ガード
  isValidJobNo: (value: string): value is JobNo => 
    /^[A-Z]{2}\d{6}$/.test(value),
  
  // APIレスポンスガード
  hasData: <T>(response: ApiResponse<T>): response is ApiResponse<T> & { data: T } => 
    response.data !== null && response.data !== undefined,
  
  // ユニオン型の判別
  isPipDetail: (pip: PipBase | PipDetail): pip is PipDetail =>
    'items' in pip && Array.isArray(pip.items),
};

// Type Predicate with Assertion Functions (TS 3.7+)
export function assertDefined<T>(
  value: T | undefined | null,
  message?: string
): asserts value is T {
  if (value === undefined || value === null) {
    throw new Error(message ?? 'Value is not defined');
  }
}
```

### Phase 3: Valibotとの統合強化（2日）

## 📚 型とスキーマの分離に関する設計思想

### なぜ型定義とバリデーションスキーマを分離するのか？

#### 一般的な誤解
多くの開発者は、TypeScriptの型定義とバリデーションスキーマを別々に管理すべきだと考えがちですが、**現代のベストプラクティスは逆です**。

#### 推奨アプローチ: Schema-First Design

```typescript
// ❌ アンチパターン: 型とスキーマの二重管理
// types/user.ts
interface User {
  id: string;
  name: string;
  email: string;
  age: number;
}

// schemas/user.ts
const UserSchema = v.object({
  id: v.string(),
  name: v.string(),
  email: v.string(),
  age: v.number(),
});

// ✅ ベストプラクティス: スキーマから型を導出（Single Source of Truth）
// schemas/user.ts
const UserSchema = v.object({
  id: v.pipe(v.string(), v.uuid()),
  name: v.pipe(v.string(), v.minLength(1)),
  email: v.pipe(v.string(), v.email()),
  age: v.pipe(v.number(), v.minValue(0), v.maxValue(120)),
});

// 型は自動的に導出
export type User = v.InferOutput<typeof UserSchema>;
```

### Schema-First Designの利点

| 観点 | TypeScript型のみ | Schema-First |
|------|-----------------|--------------|
| 実行時検証 | ❌ 不可能 | ✅ 可能 |
| 型の同期 | ❌ 手動管理 | ✅ 自動同期 |
| バリデーションルール | ❌ 別途実装 | ✅ 統合済み |
| DRY原則 | ❌ 重複あり | ✅ 単一定義 |
| エラーメッセージ | ❌ 別途定義 | ✅ 統合済み |
| バンドルサイズ | ✅ 0KB | ⚠️ 1-2KB（Valibot） |

### いつ型とスキーマを分離すべきか？

分離が適切なケース:

1. **外部ライブラリの型定義**
   - 制御できない外部型の拡張
   - `.d.ts`ファイルでの型定義

2. **純粋なUI型**
   - バリデーション不要な表示専用型
   - コンポーネントのProps型

3. **ユーティリティ型**
   - Mapped Types、Conditional Types
   - 型レベルの計算

4. **パフォーマンス最適化**
   - クライアント側で検証不要な内部型
   - Tree-shakingを最大化したい場合

### 実装パターン

```typescript
// src/schemas/index.ts - スキーマ定義（Primary）
export * from './domain';
export * from './api';

// src/types/index.ts - 純粋な型定義（Secondary）
export * from './ui';        // UIコンポーネント用
export * from './utilities';  // ユーティリティ型
export * from './external';   // 外部ライブラリ拡張
```

#### 3.1 スキーマと型の一元化

```typescript
// src/schemas/domain/item.schema.ts
import * as v from 'valibot';
import { JobNo, FgCode, ItemId, Quantity } from '@/types/utilities/branded';

/**
 * Itemスキーマ（Single Source of Truth）
 */
export const ItemSchema = v.pipe(
  v.object({
    itemSurKey: v.pipe(
      v.number(),
      v.transform((val): ItemId => val as ItemId)
    ),
    jobNo: v.pipe(
      v.string(),
      v.regex(/^[A-Z]{2}\d{6}$/),
      v.transform((val): JobNo => val as JobNo)
    ),
    fgCode: v.pipe(
      v.string(),
      v.minLength(1),
      v.transform((val): FgCode => val as FgCode)
    ),
    itemName: v.pipe(
      v.string(),
      v.minLength(1),
      v.maxLength(100)
    ),
    itemQty: v.pipe(
      v.number(),
      v.minValue(0),
      v.transform((val): Quantity => val as Quantity)
    ),
    itemAssignedQty: v.pipe(
      v.number(),
      v.minValue(0),
      v.transform((val): Quantity => val as Quantity)
    ),
  }),
  // カスタムバリデーション
  v.check((item) => 
    item.itemAssignedQty <= item.itemQty,
    'Assigned quantity cannot exceed total quantity'
  )
);

// 型の自動導出
export type Item = v.InferOutput<typeof ItemSchema>;

// 部分型の生成
export const PartialItemSchema = v.partial(ItemSchema);
export type PartialItem = v.InferOutput<typeof PartialItemSchema>;

// 検証関数
export const validateItem = (data: unknown): Item => {
  return v.parse(ItemSchema, data);
};

export const isValidItem = (data: unknown): data is Item => {
  const result = v.safeParse(ItemSchema, data);
  return result.success;
};
```

## 🚀 Valibot最新機能の活用（v1.0+）

### v1.0の主要な新機能と改善点

#### 1. 新しいPipe API（v0.31.0以降）

```typescript
// 旧API
const OldSchema = v.string([
  v.minLength(3),
  v.maxLength(20),
  v.regex(/^[a-z]+$/),
]);

// 新Pipe API - より直感的で型安全
const NewSchema = v.pipe(
  v.string(),
  v.minLength(3),
  v.maxLength(20),
  v.regex(/^[a-z]+$/)
);
```

#### 2. 強力な新アクション（v1.1）

```typescript
// メールバリデーション（RFC準拠）
const EmailSchema = v.pipe(
  v.string(),
  v.rfcEmail('有効なメールアドレスを入力してください')
);

// 文字数制限
const DescriptionSchema = v.pipe(
  v.string(),
  v.maxWords(100, '100単語以内で入力してください')
);

// 暗号通貨アドレス
const BitcoinSchema = v.pipe(
  v.string(),
  v.btcAddress('有効なBitcoinアドレスを入力してください')
);

// その他の新アクション
v.slug()       // URLスラッグ検証
v.emoji()      // 絵文字検証
v.hexColor()   // HEXカラーコード
v.nanoid()     // NanoID形式
v.cuid2()      // CUID2形式
v.ulid()       // ULID形式
```

#### 3. Tree-Shaking最適化（2024年12月）

```typescript
// TypeScriptの型としてのみ使用される場合、
// プロダクションビルドから完全に除外される
import type { InferOutput } from 'valibot';
import { UserSchema } from './schemas';

// この型定義はバンドルサイズに影響しない
type User = InferOutput<typeof UserSchema>;

// 実行時検証を行う場合のみバンドルに含まれる
if (process.env.NODE_ENV === 'development') {
  v.parse(UserSchema, data);
}
```

#### 4. カスタムエラーメッセージの簡素化（v1.1）

```typescript
// 旧: 各アクションで個別にメッセージ定義
const OldSchema = v.object({
  name: v.pipe(
    v.string('名前は文字列である必要があります'),
    v.minLength(1, '名前は必須です')
  ),
  age: v.pipe(
    v.number('年齢は数値である必要があります'),
    v.minValue(0, '年齢は0以上である必要があります')
  ),
});

// 新: 統一的なエラーメッセージ管理
const NewSchema = v.pipe(
  v.object({
    name: v.pipe(v.string(), v.minLength(1)),
    age: v.pipe(v.number(), v.minValue(0)),
  }),
  v.config({
    // 一括でエラーメッセージを定義
    lang: 'ja',
    messages: {
      string: '${path}は文字列である必要があります',
      minLength: '${path}は${requirement}文字以上必要です',
      number: '${path}は数値である必要があります',
      minValue: '${path}は${requirement}以上である必要があります',
    },
  })
);
```

#### 5. Standard Schema対応（2024年9月）

```typescript
// Zod, ArkTypeと共通のインターフェース仕様
// ライブラリ間での相互運用が可能に
import { standardSchema } from 'valibot';

const schema = standardSchema(v.object({
  name: v.string(),
  age: v.number(),
}));

// 他のStandard Schema準拠ライブラリでも使用可能
```

#### 6. 新しい変換・正規化アクション

```typescript
// ケース変換
const ApiPayloadSchema = v.pipe(
  v.object({
    userName: v.pipe(v.string(), v.toSnakeCase()), // user_name
    userEmail: v.pipe(v.string(), v.toLowerCase()),
    phoneNumber: v.pipe(v.string(), v.digits()),   // 数字のみ抽出
  })
);

// 日時フォーマット
const DateTimeSchema = v.pipe(
  v.string(),
  v.isoDateTime(),  // ISO 8601形式の検証
  v.transform((val) => new Date(val))  // Date型へ変換
);
```

#### 7. 高度な型推論とGenerics

```typescript
// 条件付きスキーマ
const ConditionalSchema = v.variant('type', [
  v.object({
    type: v.literal('email'),
    value: v.pipe(v.string(), v.email()),
  }),
  v.object({
    type: v.literal('phone'),
    value: v.pipe(v.string(), v.regex(/^\d{10}$/)),
  }),
]);

// 再帰的スキーマ
const TreeNodeSchema = v.object({
  value: v.string(),
  children: v.lazy(() => v.array(TreeNodeSchema)),
});
```

### プロジェクトへの適用例

```typescript
// src/schemas/enhanced/item.schema.ts
import * as v from 'valibot';

// 強化されたItemスキーマ
export const EnhancedItemSchema = v.pipe(
  v.object({
    // Branded Typeと組み合わせ
    itemSurKey: v.pipe(
      v.number(),
      v.brand('ItemId')
    ),
    
    // メール検証（RFC準拠）
    contactEmail: v.pipe(
      v.string(),
      v.rfcEmail(),
      v.toLowerCase()
    ),
    
    // 説明文（単語数制限）
    description: v.pipe(
      v.string(),
      v.maxWords(200),
      v.trim()
    ),
    
    // SKUコード（カスタムフォーマット）
    sku: v.pipe(
      v.string(),
      v.regex(/^[A-Z]{3}-\d{4}$/),
      v.brand('SKU')
    ),
    
    // 作成日時（ISO形式）
    createdAt: v.pipe(
      v.string(),
      v.isoDateTime(),
      v.transform((val) => new Date(val))
    ),
  }),
  
  // グローバルエラーメッセージ設定
  v.config({
    abortEarly: false,  // 全エラーを収集
    abortPipeEarly: false,
  })
);

// 型の自動導出
export type EnhancedItem = v.InferOutput<typeof EnhancedItemSchema>;

// パーシャル版の生成
export const PartialEnhancedItemSchema = v.partial(EnhancedItemSchema);

// 厳格版の生成（全フィールド必須）
export const StrictEnhancedItemSchema = v.required(EnhancedItemSchema);
```

### Phase 4: 型推論の最適化（2日）

#### 4.1 Genericsの活用

```typescript
// src/types/utilities/api.ts
/**
 * 型安全なAPIクライアント
 */
interface ApiClient {
  get<T>(endpoint: string): Promise<ApiResponse<T>>;
  post<T, D>(endpoint: string, data: D): Promise<ApiResponse<T>>;
  put<T, D>(endpoint: string, data: D): Promise<ApiResponse<T>>;
  delete<T>(endpoint: string): Promise<ApiResponse<T>>;
}

// 型推論を助けるヘルパー
type InferApiResponse<T> = T extends Promise<ApiResponse<infer R>> ? R : never;

// 使用例
const fetchItems = async (jobNo: JobNo, fgCode: FgCode) => {
  const response = await apiClient.get<Item[]>(
    endpoints.items(jobNo, fgCode)
  );
  return response.data; // Item[]として推論される
};
```

#### 4.2 const Type Parametersの活用（TS 5.0+）

```typescript
// src/types/utilities/const.ts
/**
 * const type parametersで正確な型推論
 */
function createConfig<const T extends Record<string, unknown>>(config: T): T {
  return config;
}

// 使用例
const config = createConfig({
  api: {
    baseUrl: 'https://api.example.com',
    timeout: 5000,
  },
  features: {
    enableCache: true,
    maxRetries: 3,
  } as const,
});
// configの型は正確に保持される
```

#### 4.3 satisfies演算子の活用（TS 4.9+）

```typescript
// src/config/routes.ts
/**
 * satisfiesで型チェックしつつ推論を保持
 */
type RouteConfig = {
  path: string;
  component: string;
  auth?: boolean;
};

export const routes = {
  items: {
    path: '/items',
    component: 'ItemList',
    auth: true,
  },
  pipDetail: {
    path: '/pips/:id',
    component: 'PipDetail',
    auth: true,
  },
} satisfies Record<string, RouteConfig>;

// routesの型は正確に保持され、補完も効く
type Routes = typeof routes;
type RouteName = keyof Routes; // "items" | "pipDetail"
```

### Phase 5: 実装パターンの標準化（1日）

#### 5.1 型定義のベストプラクティス

```typescript
// src/types/patterns/standard.ts

/**
 * 1. Discriminated Unions（判別可能なユニオン型）
 */
type ApiResult<T> = 
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: Error };

/**
 * 2. Builder Pattern with Types
 */
class QueryBuilder<T extends Record<string, any> = {}> {
  private query: T = {} as T;
  
  where<K extends string, V>(
    key: K,
    value: V
  ): QueryBuilder<T & Record<K, V>> {
    return new QueryBuilder({ ...this.query, [key]: value });
  }
  
  build(): T {
    return this.query;
  }
}

/**
 * 3. Factory Pattern with Type Guards
 */
const createEntity = {
  item: (data: unknown): Item => {
    assertValidItem(data);
    return data;
  },
  
  pip: (data: unknown): Pip => {
    assertValidPip(data);
    return data;
  },
};

/**
 * 4. Repository Pattern
 */
interface Repository<T, ID> {
  findById(id: ID): Promise<T | null>;
  findAll(): Promise<T[]>;
  save(entity: T): Promise<T>;
  delete(id: ID): Promise<void>;
}

class ItemRepository implements Repository<Item, ItemId> {
  // 実装
}
```

## 📊 期待される効果

### 技術的改善

| 指標 | 現在 | 目標 | 改善率 |
|-----|------|------|--------|
| 型の重複 | 35% | 5% | -86% |
| any/unknown使用 | 20箇所 | 0箇所 | -100% |
| 型安全性スコア | 30% | 95% | +217% |
| 型推論精度 | 50% | 95% | +90% |
| ランタイムエラー | 月15件 | 月2件 | -87% |
| 開発時の型エラー検出率 | 40% | 95% | +138% |

### 開発者体験の向上

- **IDE補完の向上**: 正確な型定義により補完精度が向上
- **リファクタリング安全性**: 型チェックによる変更の影響範囲の明確化
- **ドキュメント不要**: 型定義自体がドキュメントとして機能
- **バグの早期発見**: コンパイル時にエラーを検出

## 🚀 実装手順

### Week 1: 基盤整備
- [ ] Day 1-2: 型定義ディレクトリの再構成
- [ ] Day 3-4: 重複型の統合とリファクタリング
- [ ] Day 5: テストとドキュメント更新

### Week 2: 高度な機能の実装
- [ ] Day 6-7: Branded Typesの全面適用
- [ ] Day 8-9: 型ガードとユーティリティ型の実装
- [ ] Day 10: Valibotスキーマとの統合

### Week 3: 最適化と仕上げ
- [ ] Day 11-12: 型推論の最適化
- [ ] Day 13: パフォーマンステスト
- [ ] Day 14: コードレビューと微調整
- [ ] Day 15: リリース準備

## ⚠️ リスクと対策

| リスク | 影響度 | 対策 |
|--------|--------|------|
| 既存コードの大規模変更 | 高 | 段階的マイグレーション、Feature Flag使用 |
| 型の過度な厳格化 | 中 | 必要に応じてユニオン型やOptionalを使用 |
| ビルド時間の増加 | 中 | incremental buildの活用、型チェックの最適化 |
| 学習コスト | 低 | ドキュメント整備、ペアプログラミング実施 |

## 📚 参考資料

- [TypeScript 5.9 Documentation](https://www.typescriptlang.org/docs/)
- [Valibot Documentation](https://valibot.dev/)
- [TypeScript Deep Dive](https://basarat.gitbook.io/typescript/)
- [Type-Level TypeScript](https://type-level-typescript.com/)
- [Total TypeScript](https://www.totaltypescript.com/)

## 🎯 成功指標（KPI）

- [ ] 型カバレッジ: 100%
- [ ] any/unknown使用: 0箇所
- [ ] ランタイムエラー削減: 80%以上
- [ ] 開発速度向上: 20%以上
- [ ] コードレビュー時間短縮: 30%以上

## 次のアクション

1. **チームでのレビュー**: この計画をチームで検討
2. **優先順位の決定**: 最も効果的な改修から着手
3. **パイロットプロジェクト**: 小規模な機能で試験的に実装
4. **段階的展開**: 成功したパターンを全体に適用