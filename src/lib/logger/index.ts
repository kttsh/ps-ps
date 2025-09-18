import pino, { type Logger as PinoLogger } from 'pino';
import { getLoggerConfig, getTransportConfig } from './config';

/**
 * アプリケーション用Pinoロガーラッパー
 * Child logger生成やコンテキスト管理を提供
 */
class AppLogger {
	private logger: PinoLogger;
	private static instance: AppLogger;

	private constructor() {
		const config = getLoggerConfig();
		const transports = getTransportConfig();

		// Transport設定がある場合はmultistream設定
		if (transports.length > 0 && !import.meta.env.DEV) {
			this.logger = pino(
				config,
				pino.multistream(
					transports.map((t) => ({
						level: t.level || 'info',
						stream: pino.transport(t),
					})),
				),
			);
		} else {
			this.logger = pino(config);
		}

		// グローバルエラーハンドラー設定
		this.setupGlobalHandlers();
	}

	/**
	 * シングルトンインスタンス取得
	 */
	static getInstance(): AppLogger {
		if (!AppLogger.instance) {
			AppLogger.instance = new AppLogger();
		}
		return AppLogger.instance;
	}

	/**
	 * グローバルエラーハンドラーの設定
	 */
	private setupGlobalHandlers(): void {
		if (typeof window !== 'undefined') {
			// ブラウザ環境
			window.addEventListener('unhandledrejection', (event) => {
				this.logger.error({
					msg: 'Unhandled Promise Rejection',
					err: event.reason,
					promise: event.promise,
				});
			});

			window.addEventListener('error', (event) => {
				this.logger.error({
					msg: 'Uncaught Error',
					err: {
						message: event.message,
						filename: event.filename,
						lineno: event.lineno,
						colno: event.colno,
						error: event.error,
					},
				});
			});
		} else if (typeof process !== 'undefined') {
			// Node.js環境
			process.on('uncaughtException', (err) => {
				this.logger.fatal({ err }, 'Uncaught Exception');
				process.exit(1);
			});

			process.on('unhandledRejection', (reason, promise) => {
				this.logger.error({
					msg: 'Unhandled Rejection',
					err: reason,
					promise,
				});
			});
		}
	}

	/**
	 * Child logger生成（コンテキスト付き）
	 */
	child(bindings: Record<string, unknown>): PinoLogger {
		return this.logger.child(bindings);
	}

	/**
	 * APIリクエスト用Child logger
	 */
	forRequest(requestId: string, userId?: string): PinoLogger {
		return this.child({
			requestId,
			userId,
			timestamp: Date.now(),
		});
	}

	/**
	 * コンポーネント用Child logger
	 */
	forComponent(componentName: string): PinoLogger {
		return this.child({
			component: componentName,
		});
	}

	/**
	 * メトリクスログ記録
	 */
	metric(name: string, value: number, tags?: Record<string, unknown>): void {
		this.logger.info({
			msg: 'metric',
			metric: {
				name,
				value,
				tags,
				timestamp: Date.now(),
			},
		});
	}

	/**
	 * パフォーマンス計測
	 */
	measureTime<T>(operation: string, fn: () => T | Promise<T>): T | Promise<T> {
		const startTime = performance.now();
		const result = fn();

		if (result instanceof Promise) {
			return result.finally(() => {
				const duration = performance.now() - startTime;
				this.metric(`${operation}.duration`, duration);
				this.logger.debug({
					msg: `Operation completed: ${operation}`,
					duration: `${duration.toFixed(2)}ms`,
				});
			});
		}

		const duration = performance.now() - startTime;
		this.metric(`${operation}.duration`, duration);
		this.logger.debug({
			msg: `Operation completed: ${operation}`,
			duration: `${duration.toFixed(2)}ms`,
		});

		return result;
	}

	// 基本ログメソッド
	trace(msg: string, obj?: Record<string, unknown>): void {
		this.logger.trace(obj, msg);
	}

	debug(msg: string, obj?: Record<string, unknown>): void {
		this.logger.debug(obj, msg);
	}

	info(msg: string, obj?: Record<string, unknown>): void {
		this.logger.info(obj, msg);
	}

	warn(msg: string, obj?: Record<string, unknown>): void {
		this.logger.warn(obj, msg);
	}

	error(msg: string, obj?: Record<string, unknown> | Error): void {
		this.logger.error(obj, msg);
	}

	fatal(msg: string, obj?: Record<string, unknown> | Error): void {
		this.logger.fatal(obj, msg);
	}

	/**
	 * ログレベル動的変更
	 */
	setLevel(level: string): void {
		this.logger.level = level;
	}

	/**
	 * 現在のログレベル取得
	 */
	getLevel(): string {
		return this.logger.level;
	}

	/**
	 * ロガーインスタンス取得（高度な操作用）
	 */
	getRawLogger(): PinoLogger {
		return this.logger;
	}
}

// シングルトンインスタンスをエクスポート
export const logger = AppLogger.getInstance();

// 型定義のエクスポート
export type { PinoLogger };
export type AppLoggerType = AppLogger;
