import type { BaseIssue } from 'valibot';

/**
 * API エラー基底クラス
 */
export class ApiError extends Error {
	status: number;
	statusText: string;
	details?: unknown;

	constructor(
		status: number,
		statusText: string,
		details?: unknown,
	) {
		super(`API Error ${status}: ${statusText}`);
		this.name = 'ApiError';
		this.status = status;
		this.statusText = statusText;
		this.details = details;
	}

	/**
	 * エラーがリトライ可能かどうか
	 */
	isRetryable(): boolean {
		return this.status >= 500 || this.status === 429;
	}

	/**
	 * クライアントエラーかどうか
	 */
	isClientError(): boolean {
		return this.status >= 400 && this.status < 500;
	}

	/**
	 * サーバーエラーかどうか
	 */
	isServerError(): boolean {
		return this.status >= 500;
	}
}

/**
 * ネットワークエラー
 */
export class NetworkError extends Error {
	cause?: Error;

	constructor(
		message: string,
		cause?: Error,
	) {
		super(message);
		this.name = 'NetworkError';
		this.cause = cause;
	}
}

/**
 * バリデーションエラー
 */
export class ValidationError extends Error {
	issues: BaseIssue<unknown>[];

	constructor(
		message: string,
		issues: BaseIssue<unknown>[],
	) {
		super(message);
		this.name = 'ValidationError';
		this.issues = issues;
	}

	/**
	 * フィールドごとのエラーメッセージ取得
	 */
	getFieldErrors(): Record<string, string[]> {
		const errors: Record<string, string[]> = {};

		for (const issue of this.issues) {
			const path = issue.path?.map((p) => p.key).join('.') || 'root';
			if (!errors[path]) {
				errors[path] = [];
			}
			errors[path].push(issue.message);
		}

		return errors;
	}
}

/**
 * 認証エラー
 */
export class AuthenticationError extends ApiError {
	constructor(details?: unknown) {
		super(401, 'Unauthorized', details);
		this.name = 'AuthenticationError';
	}
}

/**
 * 認可エラー
 */
export class AuthorizationError extends ApiError {
	constructor(details?: unknown) {
		super(403, 'Forbidden', details);
		this.name = 'AuthorizationError';
	}
}

/**
 * Not Found エラー
 */
export class NotFoundError extends ApiError {
	constructor(resource: string, details?: unknown) {
		super(404, `${resource} not found`, details);
		this.name = 'NotFoundError';
	}
}

/**
 * Rate Limit エラー
 */
export class RateLimitError extends ApiError {
	retryAfter?: number;

	constructor(
		retryAfter?: number,
		details?: unknown,
	) {
		super(429, 'Too Many Requests', details);
		this.name = 'RateLimitError';
		this.retryAfter = retryAfter;
	}
}
