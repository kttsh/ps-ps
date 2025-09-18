import { v4 as uuidv4 } from 'uuid';
import * as v from 'valibot';
import type { PinoLogger } from '../logger';
import { logger } from '../logger';
import { ApiError, NetworkError, ValidationError } from './errors';
import type { RequestConfig } from './types';

/**
 * 型安全なAPIクライアントクラス
 * - Valibotによるランタイム検証
 * - 自動リトライ機能
 * - 構造化ログ
 * - エラーハンドリング
 */
export class ApiClient {
	private baseURL: string;
	private defaultHeaders: HeadersInit;
	private requestInterceptors: Array<
		(config: RequestConfig) => RequestConfig | Promise<RequestConfig>
	> = [];
	private responseInterceptors: Array<
		(response: Response) => Response | Promise<Response>
	> = [];
	private logger: PinoLogger;

	constructor(baseURL: string, defaultHeaders: HeadersInit = {}) {
		this.baseURL = baseURL;
		this.defaultHeaders = {
			'Content-Type': 'application/json',
			...defaultHeaders,
		};
		// APIクライアント専用のChild logger生成
		this.logger = logger.forComponent('ApiClient');
	}

	/**
	 * リクエストインターセプター追加
	 */
	addRequestInterceptor(
		interceptor: (
			config: RequestConfig,
		) => RequestConfig | Promise<RequestConfig>,
	) {
		this.requestInterceptors.push(interceptor);
		return () => {
			const index = this.requestInterceptors.indexOf(interceptor);
			if (index !== -1) this.requestInterceptors.splice(index, 1);
		};
	}

	/**
	 * レスポンスインターセプター追加
	 */
	addResponseInterceptor(
		interceptor: (response: Response) => Response | Promise<Response>,
	) {
		this.responseInterceptors.push(interceptor);
		return () => {
			const index = this.responseInterceptors.indexOf(interceptor);
			if (index !== -1) this.responseInterceptors.splice(index, 1);
		};
	}

	/**
	 * 型安全なGETリクエスト
	 */
	async get<T>(
		path: string,
		schema: v.BaseSchema<T, unknown, v.BaseIssue<unknown>>,
		config: RequestConfig = {},
	): Promise<T> {
		return this.request('GET', path, schema, { ...config, body: undefined });
	}

	/**
	 * 型安全なPOSTリクエスト
	 */
	async post<T>(
		path: string,
		body: unknown,
		schema: v.BaseSchema<T, unknown, v.BaseIssue<unknown>>,
		config: RequestConfig = {},
	): Promise<T> {
		return this.request('POST', path, schema, { ...config, body: body as BodyInit });
	}

	/**
	 * 型安全なPUTリクエスト
	 */
	async put<T>(
		path: string,
		body: unknown,
		schema: v.BaseSchema<T, unknown, v.BaseIssue<unknown>>,
		config: RequestConfig = {},
	): Promise<T> {
		return this.request('PUT', path, schema, { ...config, body: body as BodyInit });
	}

	/**
	 * 型安全なDELETEリクエスト
	 */
	async delete<T>(
		path: string,
		schema: v.BaseSchema<T, unknown, v.BaseIssue<unknown>>,
		config: RequestConfig = {},
	): Promise<T> {
		return this.request('DELETE', path, schema, { ...config, body: undefined });
	}

	/**
	 * 共通リクエスト処理
	 */
	private async request<T>(
		method: string,
		path: string,
		schema: v.BaseSchema<T, unknown, v.BaseIssue<unknown>>,
		config: RequestConfig = {},
	): Promise<T> {
		const url = `${this.baseURL}${path}`;
		const startTime = performance.now();

		// リクエスト設定のマージ
		let requestConfig: RequestConfig = {
			method,
			headers: {
				...this.defaultHeaders,
				...config.headers,
			},
			...config,
		};

		// リクエストインターセプター適用
		for (const interceptor of this.requestInterceptors) {
			requestConfig = await interceptor(requestConfig);
		}

		// ボディのJSON変換
		if (requestConfig.body && typeof requestConfig.body !== 'string') {
			requestConfig.body = JSON.stringify(requestConfig.body);
		}

		// リクエストIDの生成
		const requestId = uuidv4();
		const requestLogger = this.logger.child({ requestId });

		// ログ出力（Pino形式）
		requestLogger.debug({
			msg: 'API Request',
			api: {
				method,
				url,
				headers: import.meta.env.DEV ? requestConfig.headers : undefined,
				body: import.meta.env.DEV ? requestConfig.body : undefined,
			},
		});

		try {
			// fetch実行（リトライロジック付き）
			const response = await this.fetchWithRetry(url, requestConfig);

			// レスポンスインターセプター適用
			let processedResponse = response;
			for (const interceptor of this.responseInterceptors) {
				processedResponse = await interceptor(processedResponse);
			}

			// ステータスチェック
			if (!processedResponse.ok) {
				throw new ApiError(
					processedResponse.status,
					processedResponse.statusText,
					await this.extractErrorDetails(processedResponse),
				);
			}

			// レスポンスボディのパース
			const responseData = await processedResponse.json();

			// Valibotによる検証
			const parseResult = v.safeParse(schema, responseData);

			if (!parseResult.success) {
				requestLogger.error({
					msg: 'Validation Error',
					api: { url },
					err: {
						type: 'ValidationError',
						message: 'Response validation failed',
						issues: parseResult.issues,
					},
					data: import.meta.env.DEV ? responseData : undefined,
				});
				throw new ValidationError(
					'Response validation failed',
					parseResult.issues,
				);
			}

			// 成功ログとメトリクス記録
			const duration = performance.now() - startTime;
			requestLogger.info({
				msg: 'API Success',
				api: {
					method,
					url,
					statusCode: processedResponse.status,
					duration,
				},
			});

			// パフォーマンスメトリクス
			logger.metric('api.request.duration', duration, {
				method,
				path,
				status: processedResponse.status,
			});

			return parseResult.output as T;
		} catch (error) {
			// エラーログ
			const duration = performance.now() - startTime;
			requestLogger.error({
				msg: 'API Error',
				api: {
					method,
					url,
					duration,
					error:
						error instanceof Error
							? {
									type: error.constructor.name,
									message: error.message,
									stack: import.meta.env.DEV ? error.stack : undefined,
								}
							: 'Unknown error',
				},
				err: error instanceof Error ? error : new Error('Unknown error'),
			});

			// エラーの再スロー
			if (error instanceof ApiError || error instanceof ValidationError) {
				throw error;
			}

			// ネットワークエラー
			if (error instanceof TypeError && error.message.includes('fetch')) {
				throw new NetworkError('Network request failed', error);
			}

			throw error;
		}
	}

	/**
	 * リトライ機能付きfetch
	 */
	private async fetchWithRetry(
		url: string,
		config: RequestConfig,
		maxRetries = 3,
	): Promise<Response> {
		let lastError: Error | undefined;

		for (let attempt = 0; attempt <= maxRetries; attempt++) {
			try {
				// 指数バックオフ
				if (attempt > 0) {
					const delay = Math.min(1000 * 2 ** (attempt - 1), 10000);
					await new Promise((resolve) => setTimeout(resolve, delay));
					this.logger.debug({
						msg: `Retry attempt ${attempt}/${maxRetries}`,
						api: { url },
						retry: { attempt, maxRetries, delay },
					});
				}

				// AbortController for timeout
				const controller = new AbortController();
				const timeout = config.timeout ?? 30000;
				const timeoutId = setTimeout(() => controller.abort(), timeout);

				try {
					const response = await fetch(url, {
						...config,
						signal: controller.signal,
					});
					clearTimeout(timeoutId);

					// 5xx エラーの場合はリトライ
					if (response.status >= 500 && attempt < maxRetries) {
						lastError = new Error(`Server error: ${response.status}`);
						continue;
					}

					return response;
				} finally {
					clearTimeout(timeoutId);
				}
			} catch (error) {
				lastError = error as Error;

				// ネットワークエラーまたはタイムアウトの場合はリトライ
				if (
					error instanceof TypeError ||
					(error instanceof Error && error.name === 'AbortError')
				) {
					if (attempt === maxRetries) {
						throw new NetworkError(
							`Network request failed after ${maxRetries + 1} attempts`,
							error,
						);
					}
					continue;
				}

				// その他のエラーは即座に投げる
				throw error;
			}
		}

		throw lastError || new Error('Unexpected error in fetchWithRetry');
	}

	/**
	 * エラー詳細の抽出
	 */
	private async extractErrorDetails(response: Response): Promise<unknown> {
		try {
			const contentType = response.headers.get('content-type');
			if (contentType?.includes('application/json')) {
				return await response.json();
			}
			return await response.text();
		} catch {
			return null;
		}
	}
}

// シングルトンインスタンスのエクスポート
export const apiClient = new ApiClient(
	import.meta.env.VITE_PSYS_API_URL || 'http://localhost:8080',
);

// インターセプター設定例
if (import.meta.env.DEV) {
	// 開発環境用のデバッグインターセプター（Pino使用）
	const interceptorLogger = logger.forComponent('ApiInterceptor');

	apiClient.addRequestInterceptor((config) => {
		interceptorLogger.trace({
			msg: 'Request Interceptor',
			config,
		});
		return config;
	});

	apiClient.addResponseInterceptor(async (response) => {
		const clone = response.clone();
		try {
			const body = await clone.json();
			interceptorLogger.trace({
				msg: 'Response Interceptor',
				response: {
					url: response.url,
					status: response.status,
					headers: Object.fromEntries(response.headers.entries()),
					body,
				},
			});
		} catch {
			interceptorLogger.trace({
				msg: 'Response Interceptor',
				response: {
					url: response.url,
					status: response.status,
					headers: Object.fromEntries(response.headers.entries()),
					body: '(not JSON)',
				},
			});
		}
		return response;
	});
}
