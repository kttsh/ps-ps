import * as v from 'valibot';
import { createLogger } from '../logger';

const apiLogger = createLogger('ApiClient');

/**
 * ブランド型を使用した型安全なID
 * TypeScript 5.0+のブランド型機能を活用
 */
export type JobNo = string & { readonly __brand: 'JobNo' };
export type FgCode = string & { readonly __brand: 'FgCode' };
export type PipCode = string & { readonly __brand: 'PipCode' };
export type VendorCode = string & { readonly __brand: 'VendorCode' };

/**
 * ブランド型のヘルパー関数
 */
export const JobNo = (value: string): JobNo => value as JobNo;
export const FgCode = (value: string): FgCode => value as FgCode;
export const PipCode = (value: string): PipCode => value as PipCode;
export const VendorCode = (value: string): VendorCode => value as VendorCode;

/**
 * カスタムAPIエラークラス
 * ES2022のError causeトラッキング機能を活用
 */
export class ApiError extends Error {
  constructor(
    public readonly status: number,
    public readonly statusText: string,
    public readonly response?: unknown,
    options?: ErrorOptions, // ES2022 Error cause
  ) {
    super(`API Error: ${status} ${statusText}`, options);
    this.name = 'ApiError';
  }

  /**
   * エラーが特定のステータスコードかチェック
   */
  isStatus(code: number): boolean {
    return this.status === code;
  }

  /**
   * 認証エラーかチェック
   */
  isAuthError(): boolean {
    return this.status === 401 || this.status === 403;
  }

  /**
   * サーバーエラーかチェック
   */
  isServerError(): boolean {
    return this.status >= 500 && this.status < 600;
  }

  /**
   * ネットワークエラーかチェック
   */
  isNetworkError(): boolean {
    return this.status === 0;
  }
}

/**
 * リクエスト設定
 * TypeScript 5.0のconst type parameterを活用
 */
export type RequestConfig<TVariables = unknown> = {
  readonly method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  readonly headers?: HeadersInit;
  readonly body?: TVariables;
  readonly params?: Record<string, string | number | boolean | undefined>;
  readonly signal?: AbortSignal;
  readonly cache?: RequestCache;
  readonly credentials?: RequestCredentials;
  readonly mode?: RequestMode;
  readonly redirect?: RequestRedirect;
  readonly referrer?: string;
  readonly referrerPolicy?: ReferrerPolicy;
  readonly integrity?: string;
  readonly keepalive?: boolean;
  readonly window?: null;
  readonly priority?: 'high' | 'low' | 'auto'; // Fetch Priority API
};

/**
 * レスポンス変換設定
 * Valibotスキーマでの検証をサポート
 */
export type ResponseTransformer<T = unknown> = {
  readonly schema?: v.BaseSchema<unknown, T, v.BaseIssue<unknown>>;
  readonly transform?: (data: unknown) => T;
};

/**
 * リトライ設定
 */
export type RetryConfig = {
  readonly count?: number;
  readonly delay?: number;
  readonly maxDelay?: number;
  readonly shouldRetry?: (error: ApiError, attempt: number) => boolean;
  readonly onRetry?: (error: ApiError, attempt: number) => void;
};

/**
 * インターセプター設定
 */
export type Interceptors = {
  readonly request?: (
    config: RequestConfig,
  ) => RequestConfig | Promise<RequestConfig>;
  readonly response?: <T>(response: Response) => Response | Promise<Response>;
  readonly error?: (error: ApiError) => void | Promise<void>;
};

/**
 * ロガー設定
 */
export type LoggerConfig = {
  readonly request?: (url: string, config: RequestConfig) => void;
  readonly response?: (url: string, response: Response, duration: number) => void;
  readonly error?: (url: string, error: ApiError, duration: number) => void;
};

/**
 * APIクライアントオプション
 */
export interface ApiClientOptions {
  readonly baseURL: string;
  readonly defaultHeaders?: HeadersInit;
  readonly interceptors?: Interceptors;
  readonly retry?: RetryConfig;
  readonly timeout?: number;
  readonly logger?: LoggerConfig;
}

/**
 * 汎用的なAPIクライアントクラス
 * モダンなTypeScript機能と最新のWeb APIを活用
 */
export class ApiClient {
  constructor(private readonly options: ApiClientOptions) {}

  /**
   * 指数バックオフ付きリトライ実装
   */
  private async executeWithRetry<T>(
    fn: () => Promise<T>,
    retry?: RetryConfig,
  ): Promise<T> {
    const config = {
      count: retry?.count ?? 3,
      delay: retry?.delay ?? 1000,
      maxDelay: retry?.maxDelay ?? 30000,
      shouldRetry:
        retry?.shouldRetry ??
        ((error: ApiError, attempt: number) => {
          return (
            attempt < (retry?.count ?? 3) &&
            (error.isNetworkError() || error.isServerError())
          );
        }),
      onRetry: retry?.onRetry,
    };

    let lastError: ApiError | undefined;
    let delay = config.delay;

    for (let attempt = 0; attempt <= config.count; attempt++) {
      try {
        return await fn();
      } catch (error) {
        if (!(error instanceof ApiError)) {
          throw error;
        }

        lastError = error;

        if (attempt < config.count && config.shouldRetry(error, attempt + 1)) {
          config.onRetry?.(error, attempt + 1);
          apiLogger.info(
            { attempt: attempt + 1, delay, error: error.message },
            'Retrying request',
          );

          // 指数バックオフ
          await new Promise((resolve) => setTimeout(resolve, delay));
          delay = Math.min(delay * 2, config.maxDelay);
        } else {
          break;
        }
      }
    }

    throw lastError;
  }

  /**
   * 汎用リクエストメソッド
   * TypeScript 5.0のconst type parameterを活用
   */
  async request<const T, const TVariables = unknown>(
    endpoint: string,
    config?: RequestConfig<TVariables>,
    transformer?: ResponseTransformer<T>,
  ): Promise<T> {
    return this.executeWithRetry(async () => {
      const startTime = performance.now();
      const url = new URL(endpoint, this.options.baseURL);

      // クエリパラメータを追加（undefinedは無視）
      if (config?.params) {
        Object.entries(config.params).forEach(([key, value]) => {
          if (value !== undefined) {
            url.searchParams.append(key, String(value));
          }
        });
      }

      // リクエストインターセプターを適用
      const finalConfig = this.options.interceptors?.request
        ? await this.options.interceptors.request(config ?? {})
        : (config ?? {});

      // タイムアウト設定
      const controller = new AbortController();
      const timeoutId = this.options.timeout
        ? setTimeout(() => {
            controller.abort(new Error('Request timeout'));
          }, this.options.timeout)
        : undefined;

      try {
        // リクエストログ
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

        // タイムアウトクリア
        if (timeoutId) clearTimeout(timeoutId);

        // レスポンスインターセプターを適用
        const finalResponse = this.options.interceptors?.response
          ? await this.options.interceptors.response(response)
          : response;

        const duration = performance.now() - startTime;

        // レスポンスログ
        this.options.logger?.response?.(url.toString(), finalResponse, duration);

        if (!finalResponse.ok) {
          let errorResponse: unknown;
          try {
            errorResponse = await finalResponse.json();
          } catch {
            errorResponse = await finalResponse.text();
          }

          const error = new ApiError(
            finalResponse.status,
            finalResponse.statusText,
            errorResponse,
            { cause: new Error('HTTP request failed') },
          );

          // エラーインターセプターを適用
          await this.options.interceptors?.error?.(error);
          this.options.logger?.error?.(url.toString(), error, duration);

          throw error;
        }

        // レスポンスをパース
        const data = await finalResponse.json();

        // スキーマ検証または変換を適用
        if (transformer?.schema) {
          const result = v.safeParse(transformer.schema, data);
          if (!result.success) {
            const error = new ApiError(
              0,
              'Response validation failed',
              v.flatten(result.issues),
              { cause: new Error('Schema validation failed') },
            );
            this.options.logger?.error?.(url.toString(), error, duration);
            throw error;
          }
          return result.output;
        } else if (transformer?.transform) {
          return transformer.transform(data);
        }

        return data as T;
      } catch (error) {
        if (timeoutId) clearTimeout(timeoutId);

        if (error instanceof ApiError) {
          throw error;
        }

        // その他のエラー（ネットワーク、タイムアウトなど）を処理
        const duration = performance.now() - startTime;
        const apiError = new ApiError(
          0,
          error instanceof Error ? error.message : 'Unknown error',
          undefined,
          { cause: error },
        );

        this.options.logger?.error?.(url.toString(), apiError, duration);
        throw apiError;
      }
    }, this.options.retry);
  }

  /**
   * GETリクエスト
   */
  get<T>(
    endpoint: string,
    config?: Omit<RequestConfig, 'method' | 'body'>,
    transformer?: ResponseTransformer<T>,
  ): Promise<T> {
    return this.request<T>(endpoint, { ...config, method: 'GET' }, transformer);
  }

  /**
   * POSTリクエスト
   */
  post<T, TVariables = unknown>(
    endpoint: string,
    data?: TVariables,
    config?: Omit<RequestConfig<TVariables>, 'method' | 'body'>,
    transformer?: ResponseTransformer<T>,
  ): Promise<T> {
    return this.request<T, TVariables>(
      endpoint,
      { ...config, method: 'POST', body: data },
      transformer,
    );
  }

  /**
   * PUTリクエスト
   */
  put<T, TVariables = unknown>(
    endpoint: string,
    data?: TVariables,
    config?: Omit<RequestConfig<TVariables>, 'method' | 'body'>,
    transformer?: ResponseTransformer<T>,
  ): Promise<T> {
    return this.request<T, TVariables>(
      endpoint,
      { ...config, method: 'PUT', body: data },
      transformer,
    );
  }

  /**
   * DELETEリクエスト
   */
  delete<T>(
    endpoint: string,
    config?: Omit<RequestConfig, 'method'>,
    transformer?: ResponseTransformer<T>,
  ): Promise<T> {
    return this.request<T>(endpoint, { ...config, method: 'DELETE' }, transformer);
  }

  /**
   * PATCHリクエスト
   */
  patch<T, TVariables = unknown>(
    endpoint: string,
    data?: TVariables,
    config?: Omit<RequestConfig<TVariables>, 'method' | 'body'>,
    transformer?: ResponseTransformer<T>,
  ): Promise<T> {
    return this.request<T, TVariables>(
      endpoint,
      { ...config, method: 'PATCH', body: data },
      transformer,
    );
  }
}