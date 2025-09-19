# 共通APIクライアント リファクタリング計画

## 作成日: 2025-01-20
## ブランチ: feature/api-client-refactoring

## 📌 Valibot採用による主要変更点

### なぜZodではなくValibotを選択するのか

| 比較項目 | Zod | Valibot v1.1.0 |
|---------|-----|---------------|
| バンドルサイズ | ~13KB (gzipped) | ~0.7KB開始 (最大95%削減) |
| モジュラー設計 | ❌ 単一バンドル | ✅ 完全モジュラー |
| Tree Shaking | 部分的 | 完全対応 |
| TypeScript統合 | 優秀 | 同等以上 |
| パフォーマンス | 良好 | より高速 |
| Pipe API | なし | あり（v0.31+） |
| Transform統合 | 別途処理 | パイプライン統合 |
| 非同期検証 | 対応 | ネイティブ対応 |

### Valibot最新機能（v1.1.0）の活用
- **Pipe API**: バリデーションチェーンの直感的な記述
- **モジュラーインポート**: 必要な機能のみをインポート
- **Transform統合**: データ変換をバリデーションパイプラインに統合
- **Brand Types**: 型レベルのブランディングサポート
- **メタデータ**: スキーマにメタ情報を付与可能
- **rawCheck/rawTransform**: エッジケースでの完全制御

## 1. 現状分析サマリー

### 確認された問題パターン

1. **重複コード**: 11個のフックで同じfetchパターンが繰り返されている
2. **enabled: false**: 3つの重要なフック（useItems, usePips, usePipDetail）で手動実行が必要
3. **console.log汚染**: デバッグ用のログが本番コードに残存
4. **エラーハンドリングの不統一**: 各フックで異なるエラー処理
5. **TypeScript/React/TanStack Query最新機能の未使用**

### 影響を受けるフック一覧

| フック名 | ファイルパス | 現在の問題 |
|---------|------------|-----------|
| useItems | src/features/item-management/hooks/useItems.ts | enabled: false, console.log |
| usePips | src/features/pip-management/hooks/usePips.ts | enabled: false, console.log |
| usePipDetail | src/features/pip-management/hooks/usePipDetail.ts | enabled: false, console.log |
| useCreatePip | src/features/item-assignment/hooks/useCreatePip.ts | 重複fetchパターン |
| useUpdatePipItems | src/features/item-assignment/hooks/useUpdatePipItems.ts | 重複fetchパターン |
| useVendors | src/features/vendor-assignment/hooks/useVendors.ts | enabled: true (正常) |
| useUpdateAip | src/features/vendor-assignment/hooks/useUpdateAip.ts | 重複fetchパターン |
| useCopyPipItems | src/features/pip-management/hooks/useCopyPipItems.ts | 重複fetchパターン |
| useMergePips | src/features/pip-management/hooks/useMergePips.ts | 重複fetchパターン |
| useDeletePips | src/features/pip-management/hooks/useDeletePips.ts | 重複fetchパターン |
| useFunctionGroups | src/features/psys-randing/hooks/useFunctionGroups.ts | console.log |

## 2. 共通APIクライアント設計

### 2.1 コアAPIクライアント（最新TypeScript 5.9機能活用）

```typescript
// src/lib/api/client.ts
import type { z } from 'zod';

// Branded Types for Type Safety
type JobNo = string & { __brand: 'JobNo' };
type FgCode = string & { __brand: 'FgCode' };
type PipCode = string & { __brand: 'PipCode' };

// Helper functions for brand types
export const JobNo = (value: string): JobNo => value as JobNo;
export const FgCode = (value: string): FgCode => value as FgCode;
export const PipCode = (value: string): PipCode => value as PipCode;

// Custom error class with cause tracking (ES2022)
export class ApiError extends Error {
  constructor(
    public readonly status: number,
    public readonly statusText: string,
    public readonly response?: unknown,
    options?: ErrorOptions // ES2022 Error cause
  ) {
    super(`API Error: ${status} ${statusText}`, options);
    this.name = 'ApiError';
  }
}

// Request configuration with const type parameters
type RequestConfig<TVariables = unknown> = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: HeadersInit;
  body?: TVariables;
  params?: Record<string, string | number | boolean>;
  signal?: AbortSignal;
  cache?: RequestCache;
  credentials?: RequestCredentials;
  mode?: RequestMode;
  redirect?: RequestRedirect;
  referrer?: string;
  referrerPolicy?: ReferrerPolicy;
  integrity?: string;
  keepalive?: boolean;
  window?: null;
} as const;

// Response transformer with schema validation
type ResponseTransformer<T = unknown> = {
  schema?: z.ZodSchema<T>;
  transform?: (data: unknown) => T;
};

// API Client Options
interface ApiClientOptions {
  baseURL: string;
  defaultHeaders?: HeadersInit;
  interceptors?: {
    request?: (config: RequestConfig) => RequestConfig | Promise<RequestConfig>;
    response?: <T>(response: Response) => Response | Promise<Response>;
    error?: (error: ApiError) => void | Promise<void>;
  };
  retry?: {
    count?: number;
    delay?: number;
    shouldRetry?: (error: ApiError, attempt: number) => boolean;
  };
  timeout?: number;
  logger?: {
    request?: (url: string, config: RequestConfig) => void;
    response?: (url: string, response: Response) => void;
    error?: (url: string, error: ApiError) => void;
  };
}

export class ApiClient {
  constructor(private readonly options: ApiClientOptions) {}

  // Generic request method with const type parameter
  async request<const T, const TVariables = unknown>(
    endpoint: string,
    config?: RequestConfig<TVariables>,
    transformer?: ResponseTransformer<T>
  ): Promise<T> {
    const url = new URL(endpoint, this.options.baseURL);
    
    // Add query parameters if provided
    if (config?.params) {
      Object.entries(config.params).forEach(([key, value]) => {
        url.searchParams.append(key, String(value));
      });
    }

    // Apply request interceptor
    const finalConfig = this.options.interceptors?.request 
      ? await this.options.interceptors.request(config ?? {})
      : config ?? {};

    // Setup timeout
    const controller = new AbortController();
    const timeoutId = this.options.timeout
      ? setTimeout(() => controller.abort(), this.options.timeout)
      : undefined;

    try {
      // Log request
      this.options.logger?.request?.(url.toString(), finalConfig);

      const response = await fetch(url.toString(), {
        ...finalConfig,
        headers: {
          ...this.options.defaultHeaders,
          ...finalConfig.headers,
        },
        body: finalConfig.body ? JSON.stringify(finalConfig.body) : undefined,
        signal: finalConfig.signal ?? controller.signal,
      });

      // Clear timeout
      if (timeoutId) clearTimeout(timeoutId);

      // Apply response interceptor
      const finalResponse = this.options.interceptors?.response
        ? await this.options.interceptors.response(response)
        : response;

      // Log response
      this.options.logger?.response?.(url.toString(), finalResponse);

      if (!finalResponse.ok) {
        const errorResponse = await finalResponse.text();
        const error = new ApiError(
          finalResponse.status,
          finalResponse.statusText,
          errorResponse,
          { cause: new Error('HTTP request failed') }
        );
        
        // Apply error interceptor
        await this.options.interceptors?.error?.(error);
        this.options.logger?.error?.(url.toString(), error);
        
        throw error;
      }

      const data = await finalResponse.json();

      // Validate and transform response
      if (transformer?.schema) {
        return transformer.schema.parse(data);
      } else if (transformer?.transform) {
        return transformer.transform(data);
      }

      return data as T;
    } catch (error) {
      if (timeoutId) clearTimeout(timeoutId);
      
      if (error instanceof ApiError) {
        throw error;
      }
      
      // Handle other errors (network, timeout, etc.)
      const apiError = new ApiError(
        0,
        error instanceof Error ? error.message : 'Unknown error',
        undefined,
        { cause: error }
      );
      
      this.options.logger?.error?.(url.toString(), apiError);
      throw apiError;
    }
  }

  // Convenience methods using template literal types
  get<T>(endpoint: string, config?: Omit<RequestConfig, 'method' | 'body'>, transformer?: ResponseTransformer<T>) {
    return this.request<T>(endpoint, { ...config, method: 'GET' }, transformer);
  }

  post<T, TVariables = unknown>(
    endpoint: string, 
    data?: TVariables, 
    config?: Omit<RequestConfig<TVariables>, 'method' | 'body'>,
    transformer?: ResponseTransformer<T>
  ) {
    return this.request<T, TVariables>(
      endpoint, 
      { ...config, method: 'POST', body: data }, 
      transformer
    );
  }

  put<T, TVariables = unknown>(
    endpoint: string,
    data?: TVariables,
    config?: Omit<RequestConfig<TVariables>, 'method' | 'body'>,
    transformer?: ResponseTransformer<T>
  ) {
    return this.request<T, TVariables>(
      endpoint,
      { ...config, method: 'PUT', body: data },
      transformer
    );
  }

  delete<T>(endpoint: string, config?: Omit<RequestConfig, 'method'>, transformer?: ResponseTransformer<T>) {
    return this.request<T>(endpoint, { ...config, method: 'DELETE' }, transformer);
  }

  patch<T, TVariables = unknown>(
    endpoint: string,
    data?: TVariables,
    config?: Omit<RequestConfig<TVariables>, 'method' | 'body'>,
    transformer?: ResponseTransformer<T>
  ) {
    return this.request<T, TVariables>(
      endpoint,
      { ...config, method: 'PATCH', body: data },
      transformer
    );
  }
}
```

### 2.2 Pino Logger統合

```typescript
// src/lib/logger.ts
import pino from 'pino';

const isDevelopment = process.env.NODE_ENV === 'development';
const isProduction = process.env.NODE_ENV === 'production';

export const logger = pino({
  level: isDevelopment ? 'debug' : 'info',
  transport: isDevelopment ? {
    target: 'pino-pretty',
    options: {
      colorize: true,
      ignore: 'pid,hostname',
      translateTime: 'SYS:standard',
    }
  } : undefined,
  redact: {
    paths: ['password', 'token', 'apiKey', '*.password', '*.token'],
    censor: '[REDACTED]'
  },
  formatters: {
    level: (label) => ({ level: label }),
  }
});

export const createLogger = (module: string) => logger.child({ module });
```

### 2.3 APIクライアントインスタンス作成

```typescript
// src/lib/api/index.ts
import { ApiClient } from './client';
import { createLogger } from '../logger';

const logger = createLogger('API');
const PSYS_BASE_URL = import.meta.env.VITE_PSYS_API_URL || 'http://localhost:8080';

// PSYSAPIクライアント
export const psysApiClient = new ApiClient({
  baseURL: PSYS_BASE_URL,
  defaultHeaders: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
  },
  interceptors: {
    request: async (config) => {
      // Add auth token if available
      const token = localStorage.getItem('auth-token');
      if (token) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${token}`,
        };
      }
      return config;
    },
    error: async (error) => {
      // Handle 401 errors globally
      if (error.status === 401) {
        // Redirect to login or refresh token
        window.location.href = '/login';
      }
    },
  },
  retry: {
    count: 3,
    delay: 1000,
    shouldRetry: (error, attempt) => {
      // Retry on network errors and 5xx errors
      return error.status === 0 || (error.status >= 500 && attempt < 3);
    },
  },
  timeout: 30000, // 30 seconds
  logger: {
    request: (url, config) => {
      logger.debug({ url, method: config.method }, 'API Request');
    },
    response: (url, response) => {
      logger.debug({ url, status: response.status }, 'API Response');
    },
    error: (url, error) => {
      logger.error({ url, error: error.message, status: error.status }, 'API Error');
    },
  },
});

// Type-safe endpoint builder
export const endpoints = {
  items: (jobNo: JobNo, fgCode: FgCode) => `/items/${jobNo}/${fgCode}`,
  pips: (jobNo: JobNo, fgCode: FgCode) => `/pips/${jobNo}/${fgCode}`,
  pipDetail: (jobNo: JobNo, fgCode: FgCode, pipCode: PipCode) => 
    `/pips-detail/${jobNo}/${fgCode}/${pipCode}`,
  createPip: () => '/pips',
  editPip: (jobNo: JobNo, fgCode: FgCode, pipCode: PipCode) => 
    `/pips-edit/${jobNo}/${fgCode}/${pipCode}`,
  copyPip: (jobNo: JobNo, fgCode: FgCode, pipCode: PipCode) => 
    `/pips-copy/${jobNo}/${fgCode}/${pipCode}`,
  mergePips: (jobNo: JobNo, fgCode: FgCode) => `/pips-merge/${jobNo}/${fgCode}`,
  deletePips: (jobNo: JobNo, fgCode: FgCode) => `/pips-delete/${jobNo}/${fgCode}`,
  vendors: (fgCode: FgCode) => `/vendors/${fgCode}`,
  attachAip: (jobNo: JobNo, fgCode: FgCode, pipCode?: PipCode) => 
    `/aips/${jobNo}/${fgCode}${pipCode ? `/${pipCode}` : ''}`,
  functionGroups: () => '/fgs',
} as const;
```

### 2.4 TanStack Query v5.85最新機能を活用したカスタムフック

```typescript
// src/lib/api/hooks.ts
import { 
  useSuspenseQuery, 
  useMutation, 
  useQueryClient,
  useMutationState,
  type UseSuspenseQueryOptions,
  type UseMutationOptions,
} from '@tanstack/react-query';
import type { z } from 'zod';
import { psysApiClient, endpoints, type JobNo, type FgCode, type PipCode } from './index';

// Generic query hook with Suspense support
export function useApiSuspenseQuery<T>(
  key: readonly unknown[],
  endpoint: string,
  options?: Omit<UseSuspenseQueryOptions<T>, 'queryKey' | 'queryFn'>,
  schema?: z.ZodSchema<T>
) {
  return useSuspenseQuery<T>({
    queryKey: key,
    queryFn: () => psysApiClient.get<T>(endpoint, undefined, { schema }),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
    ...options,
  });
}

// Generic mutation hook with optimistic updates
export function useApiMutation<TData = unknown, TVariables = unknown>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options?: UseMutationOptions<TData, ApiError, TVariables>
) {
  const queryClient = useQueryClient();
  
  return useMutation<TData, ApiError, TVariables>({
    mutationFn,
    onError: (error, variables, context) => {
      // Log error with context
      logger.error({ error, variables }, 'Mutation failed');
      options?.onError?.(error, variables, context);
    },
    onSuccess: (data, variables, context) => {
      // Invalidate related queries
      options?.onSuccess?.(data, variables, context);
    },
    ...options,
  });
}

// Hook to track all mutation states
export function useMutationStates(mutationKey: readonly unknown[]) {
  return useMutationState({
    filters: { mutationKey },
    select: (mutation) => ({
      status: mutation.state.status,
      isPending: mutation.state.status === 'pending',
      isSuccess: mutation.state.status === 'success',
      isError: mutation.state.status === 'error',
      error: mutation.state.error,
      data: mutation.state.data,
      variables: mutation.state.variables,
    }),
  });
}
```

## 3. 各フックの改修内容

### 3.1 useItems フック

#### Before (現在の実装)
```typescript
// src/features/item-management/hooks/useItems.ts
export const useItems = (jobNo: string, fgCode: string | null) => {
  return useQuery<GetItemsResponse>({
    queryKey: ['items', jobNo, fgCode],
    queryFn: async (): Promise<GetItemsResponse> => {
      try {
        const response = await fetch(
          `${PSYS_API_URL.GetItems}/${jobNo}/${fgCode}`,
          {
            method: 'GET',
            cache: 'no-store',
          },
        );

        if (!response.ok) {
          throw new Error(`HTTP status: ${response.status}`);
        }
        console.log('購入品取得したよ');
        return await response.json();
      } catch (error) {
        console.error('Fetch error:', error);
        throw error;
      }
    },
    // イベント駆動で実行
    enabled: false,
  });
};
```

#### After (新実装)
```typescript
// src/features/item-management/hooks/useItems.ts
import { z } from 'zod';
import { useApiSuspenseQuery } from '@/lib/api/hooks';
import { endpoints, JobNo, FgCode } from '@/lib/api';
import { ItemResponseSchema, ResponseInfoSchema } from '@/schemas/common-api';

// Response validation schema
const GetItemsResponseSchema = z.object({
  items: z.array(ItemResponseSchema),
  Messages: z.array(ResponseInfoSchema).optional(),
});

export type GetItemsResponse = z.infer<typeof GetItemsResponseSchema>;

/**
 * 購入品リストを取得するhook（Suspense対応）
 * Function Group選択時に自動実行される
 */
export const useItems = (jobNo: string, fgCode: string | null) => {
  return useApiSuspenseQuery<GetItemsResponse>(
    ['items', jobNo, fgCode] as const,
    endpoints.items(JobNo(jobNo), FgCode(fgCode ?? '')),
    {
      // Function Group選択時に自動実行
      enabled: !!jobNo && !!fgCode,
    },
    GetItemsResponseSchema
  );
};
```

#### 改修内容
1. ✅ **enabled: false → enabled: !!jobNo && !!fgCode** - 自動実行化
2. ✅ **console.log削除** - Pino Logger統合
3. ✅ **useSuspenseQuery使用** - React 19 Suspense対応
4. ✅ **Zodスキーマ検証** - 実行時型安全性
5. ✅ **Branded Types使用** - 型安全なID管理
6. ✅ **共通APIクライアント使用** - 重複コード削減

### 3.2 usePips フック

#### Before
```typescript
export const usePips = (jobNo: string, fgCode: string | null) => {
  return useQuery<PipsResponse>({
    queryKey: ['pip', jobNo, fgCode],
    queryFn: async (): Promise<PipsResponse> => {
      try {
        const response = await fetch(
          `${PSYS_API_URL.GetPIPs}/${jobNo}/${fgCode}`,
          {
            method: 'GET',
            cache: 'no-store',
          },
        );

        if (!response.ok) {
          throw new Error(`HTTP status: ${response.status}`);
        }
        console.log('PIPリスト取得したよ');
        return await response.json();
      } catch (error) {
        console.error('Fetch error:', error);
        throw error;
      }
    },
    // イベント駆動で実行
    enabled: false,
  });
};
```

#### After
```typescript
import { z } from 'zod';
import { useApiSuspenseQuery } from '@/lib/api/hooks';
import { endpoints, JobNo, FgCode } from '@/lib/api';
import { PipResponseSchema } from '@/schemas/common-api';

const PipsResponseSchema = z.object({
  pipsList: z.array(PipResponseSchema),
});

export type PipsResponse = z.infer<typeof PipsResponseSchema>;

/**
 * PIPリストを取得するhook（Suspense対応）
 * Function Group選択時に自動実行される
 */
export const usePips = (jobNo: string, fgCode: string | null) => {
  return useApiSuspenseQuery<PipsResponse>(
    ['pips', jobNo, fgCode] as const,
    endpoints.pips(JobNo(jobNo), FgCode(fgCode ?? '')),
    {
      enabled: !!jobNo && !!fgCode,
    },
    PipsResponseSchema
  );
};
```

#### 改修内容
1. ✅ **enabled: false → enabled: !!jobNo && !!fgCode**
2. ✅ **console.log削除**
3. ✅ **queryKey修正**: 'pip' → 'pips' (一貫性)
4. ✅ **useSuspenseQuery使用**
5. ✅ **Zodスキーマ検証**
6. ✅ **共通APIクライアント使用**

### 3.3 usePipDetail フック

#### Before
```typescript
export const usePipDetail = (
  jobNo: string,
  fgCode: string | null,
  pipCode: string | undefined,
) => {
  return useQuery<GetPipDetailResponse>({
    queryKey: ['pipDetail', jobNo, fgCode, pipCode],
    queryFn: async (): Promise<GetPipDetailResponse> => {
      try {
        const response = await fetch(
          `${PSYS_API_URL.GetPIPDetail}/${jobNo}/${fgCode}/${pipCode}`,
          {
            method: 'GET',
            cache: 'no-store',
          },
        );

        if (!response.ok) {
          throw new Error(`HTTP status: ${response.status}`);
        }
        console.log('PIP詳細取得したよ');
        return await response.json();
      } catch (error) {
        console.error('Fetch error:', error);
        throw error;
      }
    },
    // イベント駆動で実行
    enabled: false,
  });
};
```

#### After
```typescript
import { z } from 'zod';
import { useApiSuspenseQuery } from '@/lib/api/hooks';
import { endpoints, JobNo, FgCode, PipCode } from '@/lib/api';
import { PipDetailResponseSchema, ResponseInfoSchema } from '@/schemas/common-api';

const GetPipDetailResponseSchema = z.object({
  pipDetail: PipDetailResponseSchema,
  Messages: z.array(ResponseInfoSchema),
});

export type GetPipDetailResponse = z.infer<typeof GetPipDetailResponseSchema>;

/**
 * PIP詳細を取得するhook（Suspense対応）
 * PIPコード選択時に自動実行される
 */
export const usePipDetail = (
  jobNo: string,
  fgCode: string | null,
  pipCode: string | undefined,
) => {
  return useApiSuspenseQuery<GetPipDetailResponse>(
    ['pipDetail', jobNo, fgCode, pipCode] as const,
    endpoints.pipDetail(JobNo(jobNo), FgCode(fgCode ?? ''), PipCode(pipCode ?? '')),
    {
      enabled: !!jobNo && !!fgCode && !!pipCode,
    },
    GetPipDetailResponseSchema
  );
};
```

#### 改修内容
1. ✅ **enabled: false → enabled: !!jobNo && !!fgCode && !!pipCode**
2. ✅ **console.log削除**
3. ✅ **useSuspenseQuery使用**
4. ✅ **Zodスキーマ検証**
5. ✅ **Branded Types使用**
6. ✅ **共通APIクライアント使用**

### 3.4 useCreatePip フック

#### Before
```typescript
export const useCreatePip = () => {
  return useMutation({
    mutationFn: async (pipItems: PipPayload) => {
      const response = await fetch(PSYS_API_URL.CreatePIP, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(pipItems),
      });

      if (!response.ok) {
        throw new Error(`登録に失敗しました: ${response.statusText}`);
      }

      return response.json();
    },
  });
};
```

#### After
```typescript
import { z } from 'zod';
import { useApiMutation } from '@/lib/api/hooks';
import { psysApiClient, endpoints } from '@/lib/api';
import { PipPayloadSchema } from '@/schemas/pip-api';
import { useQueryClient } from '@tanstack/react-query';
import { useOptimistic } from 'react';

/**
 * PIPを作成するhook（楽観的更新対応）
 */
export const useCreatePip = () => {
  const queryClient = useQueryClient();
  
  return useApiMutation<PipResponse, PipPayload>(
    async (pipItems) => {
      // Validate payload
      const validatedPayload = PipPayloadSchema.parse(pipItems);
      
      return psysApiClient.post<PipResponse>(
        endpoints.createPip(),
        validatedPayload
      );
    },
    {
      // Optimistic update
      onMutate: async (newPip) => {
        // Cancel outgoing refetches
        await queryClient.cancelQueries({ queryKey: ['pips'] });
        
        // Snapshot previous value
        const previousPips = queryClient.getQueryData(['pips']);
        
        // Optimistically update
        queryClient.setQueryData(['pips'], (old: any) => ({
          ...old,
          pipsList: [...(old?.pipsList || []), newPip],
        }));
        
        return { previousPips };
      },
      onError: (err, newPip, context) => {
        // Rollback on error
        queryClient.setQueryData(['pips'], context?.previousPips);
      },
      onSettled: () => {
        // Always refetch after error or success
        queryClient.invalidateQueries({ queryKey: ['pips'] });
      },
      onSuccess: (data) => {
        // Show success notification
        toast.success('PIPを作成しました');
      },
    }
  );
};
```

#### 改修内容
1. ✅ **共通APIクライアント使用**
2. ✅ **Zodスキーマ検証**
3. ✅ **楽観的更新実装**
4. ✅ **エラーハンドリング強化**
5. ✅ **キャッシュ無効化戦略**
6. ✅ **成功通知追加**

### 3.5 useUpdatePipItems フック

#### Before
```typescript
export const useUpdatePipItems = (
  jobNo: string,
  fgCode: string | null,
  pipCode: string | undefined,
) => {
  return useMutation({
    mutationFn: async (pipItems: PipPayload) => {
      const response = await fetch(
        `${PSYS_API_URL.EditPIP}/${jobNo}/${fgCode}/${pipCode}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(pipItems),
        },
      );

      if (!response.ok) {
        throw new Error(`更新に失敗しました: ${response.statusText}`);
      }

      return response.json();
    },
  });
};
```

#### After
```typescript
import * as v from 'valibot';
import { useApiMutation } from '@/lib/api/hooks';
import { psysApiClient, endpoints, JobNo, FgCode, PipCode } from '@/lib/api';
import { PipPayloadSchema } from '@/schemas/pip-api';
import { useQueryClient } from '@tanstack/react-query';
import { createLogger } from '@/lib/logger';

const logger = createLogger('UpdatePipItems');

/**
 * PIPアイテムを更新するhook（楽観的更新対応）
 */
export const useUpdatePipItems = (
  jobNo: string,
  fgCode: string | null,
  pipCode: string | undefined,
) => {
  const queryClient = useQueryClient();
  
  return useApiMutation<PipResponse, PipPayload>(
    async (pipItems) => {
      // Valibot validation with detailed error messages
      const result = v.safeParse(PipPayloadSchema, pipItems);
      if (!result.success) {
        const flatErrors = v.flatten(result.issues);
        logger.error({ errors: flatErrors }, 'Validation failed');
        throw new Error('Validation failed');
      }
      const validatedPayload = result.output;
      
      return psysApiClient.post<PipResponse>(
        endpoints.editPip(JobNo(jobNo), FgCode(fgCode ?? ''), PipCode(pipCode ?? '')),
        validatedPayload
      );
    },
    {
      onMutate: async (updatedItems) => {
        const queryKey = ['pipDetail', jobNo, fgCode, pipCode] as const;
        await queryClient.cancelQueries({ queryKey });
        
        const previousDetail = queryClient.getQueryData(queryKey);
        
        // Optimistically update detail
        queryClient.setQueryData(queryKey, (old: any) => ({
          ...old,
          pipDetail: {
            ...old?.pipDetail,
            items: updatedItems.items,
          },
        }));
        
        return { previousDetail };
      },
      onError: (err, variables, context) => {
        const queryKey = ['pipDetail', jobNo, fgCode, pipCode] as const;
        queryClient.setQueryData(queryKey, context?.previousDetail);
      },
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: ['pipDetail', jobNo, fgCode, pipCode] });
        queryClient.invalidateQueries({ queryKey: ['pips', jobNo, fgCode] });
      },
    }
  );
};
```

#### 改修内容
1. ✅ **共通APIクライアント使用**
2. ✅ **Branded Types使用**
3. ✅ **楽観的更新実装**
4. ✅ **複数クエリの無効化**
5. ✅ **エラー時のロールバック**

### 3.6 useVendors フック（既に正常）

#### Before & After (変更少)
```typescript
import { useApiSuspenseQuery } from '@/lib/api/hooks';
import { endpoints, FgCode } from '@/lib/api';
import { VendorResponseSchema } from '@/schemas/common-api';
import { z } from 'zod';

const VendorsResponseSchema = z.object({
  vendors: z.array(VendorResponseSchema),
});

/**
 * ベンダーリストを取得するhook
 * このフックは既にenabledが正しく設定されている
 */
export const useVendors = (fgCode: string | null) => {
  return useApiSuspenseQuery<VendorResponse[]>(
    ['vendors', fgCode] as const,
    endpoints.vendors(FgCode(fgCode ?? '')),
    {
      enabled: !!fgCode, // 既に正しい
    },
    VendorsResponseSchema.transform((data) => data.vendors)
  );
};
```

#### 改修内容
1. ✅ **共通APIクライアント使用**
2. ✅ **useSuspenseQuery使用**
3. ✅ **Zodスキーマ検証**
4. ✅ **Branded Types使用**

### 3.7 その他のMutationフック共通改修パターン

以下のフックは同様のパターンで改修：
- useUpdateAip
- useCopyPipItems
- useMergePips
- useDeletePips

#### 共通改修内容
1. ✅ **共通APIクライアント使用**
2. ✅ **Valibotスキーマによる入力検証**
3. ✅ **楽観的更新の実装**
4. ✅ **適切なキャッシュ無効化**
5. ✅ **エラーハンドリングとロールバック**
6. ✅ **Branded Types使用**

## 4. 実装手順

### Phase 1: 基盤構築（Day 1）
1. ✅ Pinoログシステムの導入
2. ✅ 共通APIクライアントの実装
3. ✅ Zodスキーマ定義ファイルの作成

### Phase 2: Query Hooks改修（Day 2）
1. ✅ useItems改修（enabled: false削除）
2. ✅ usePips改修（enabled: false削除）
3. ✅ usePipDetail改修（enabled: false削除）
4. ✅ useVendors改修（軽微な変更）
5. ✅ useFunctionGroups改修

### Phase 3: Mutation Hooks改修（Day 3）
1. ✅ useCreatePip改修（楽観的更新追加）
2. ✅ useUpdatePipItems改修
3. ✅ useUpdateAip改修
4. ✅ useCopyPipItems改修
5. ✅ useMergePips改修
6. ✅ useDeletePips改修

### Phase 4: テストと品質保証（Day 4）
1. ✅ ユニットテスト作成
2. ✅ E2Eテスト実行
3. ✅ パフォーマンス測定
4. ✅ エラーハンドリング検証

## 5. 期待される効果

### 技術的改善
- **コード削減**: 約40%のコード削減（重複除去）
- **型安全性**: 100%の実行時型検証
- **パフォーマンス**: Suspenseによる並列フェッチで30%高速化
- **保守性**: 単一責任原則に基づく設計

### ビジネス価値
- **UX改善**: Function Group選択時の自動データ取得
- **エラー率低下**: 実行時検証による不正データの防止
- **開発速度向上**: 共通パターンによる実装時間短縮
- **デバッグ効率**: 構造化ログによる問題追跡の容易化

## 6. マイグレーション戦略

### 段階的移行
1. **Stage 1**: 共通クライアント作成（既存コードに影響なし）
2. **Stage 2**: 新規フックから新実装を適用
3. **Stage 3**: enabled: false問題のある3フックを優先改修
4. **Stage 4**: 残りのフックを順次移行
5. **Stage 5**: 古い実装を削除

### ロールバック計画
- 各フックの改修をfeature flagで制御
- 問題発生時は即座に旧実装に切り替え可能
- A/Bテストによる段階的展開

## 7. 成功指標（KPI）

### 技術指標
- [ ] enabled: false使用箇所: 3 → 0
- [ ] console.log使用箇所: 16 → 0
- [ ] 重複コード率: 35% → 5%
- [ ] TypeScriptカバレッジ: 100%
- [ ] テストカバレッジ: 80%以上

### ビジネス指標
- [ ] テーブル描画時間: 2秒 → 0.3秒
- [ ] APIエラー率: 5% → 1%以下
- [ ] ユーザー満足度: NPS向上
- [ ] 開発者体験: DXスコア向上

## 8. リスクと対策

| リスク | 発生確率 | 影響度 | 対策 |
|--------|---------|--------|------|
| Suspense導入による互換性問題 | 中 | 高 | ErrorBoundary実装、段階的移行 |
| API負荷増大 | 高 | 高 | キャッシング強化、レート制限 |
| 楽観的更新の不整合 | 中 | 中 | ロールバック機構、検証強化 |
| チーム習熟度 | 中 | 低 | ドキュメント整備、研修実施 |

## 9. 参考資料

- [React 19 新機能ドキュメント](https://react.dev/blog/2024/12/05/react-19)
- [TanStack Query v5.85 ドキュメント](https://tanstack.com/query/latest)
- [TypeScript 5.9 新機能](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-9.html)
- [Zod バリデーション](https://zod.dev/)
- [Pino Logger](https://github.com/pinojs/pino)