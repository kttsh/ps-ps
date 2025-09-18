/**
 * API リクエスト設定
 */
export interface RequestConfig extends RequestInit {
	timeout?: number;
	retries?: number;
	retryDelay?: number;
}

/**
 * API レスポンス型
 */
export interface ApiResponse<T = unknown> {
	data: T;
	status: number;
	statusText: string;
	headers: Headers;
}
