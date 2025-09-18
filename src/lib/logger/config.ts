import type { LoggerOptions, TransportTargetOptions } from 'pino';
import type { IncomingMessage, ServerResponse } from 'node:http';

// Sentry type definition
interface SentryGlobal {
	captureMessage: (message: string, options: {
		level: 'fatal' | 'error' | 'warning' | 'info' | 'debug';
		extra?: Record<string, unknown>;
	}) => void;
}

declare global {
	interface Window {
		Sentry?: SentryGlobal;
	}
}

/**
 * Pino ロガー設定
 * 環境別の最適化設定を提供
 */
export const getLoggerConfig = (): LoggerOptions => {
	const isDevelopment = import.meta.env.DEV;
	const isTest = import.meta.env.MODE === 'test';
	const isBrowser = typeof window !== 'undefined';

	// 基本設定
	const baseConfig: LoggerOptions = {
		level: import.meta.env.VITE_LOG_LEVEL || (isDevelopment ? 'debug' : 'info'),

		// タイムスタンプ設定
		timestamp: () => `,"time":"${new Date().toISOString()}"`,

		// メッセージキー設定
		messageKey: 'msg',

		// エラーシリアライゼーション
		serializers: {
			err: (err: Error) => {
				const { message, stack, ...rest } = err as Error & Record<string, unknown>;
				return {
					type: err.constructor.name,
					message,
					stack: isDevelopment ? stack : undefined,
					...rest,
				};
			},
			req: (req: IncomingMessage & { connection?: { remoteAddress?: string } }) => ({
				method: req.method,
				url: req.url,
				headers: isDevelopment ? req.headers : undefined,
				remoteAddress: req.connection?.remoteAddress,
			}),
			res: (res: ServerResponse & { getHeaders?: () => Record<string, string | string[] | undefined> }) => ({
				statusCode: res.statusCode,
				headers: isDevelopment ? res.getHeaders() : undefined,
			}),
		},

		// カスタムレベル
		customLevels: {
			metric: 35, // infoとwarnの間にメトリクス用レベル追加
		},

		// フォーマッターフック
		formatters: {
			level(label: string, number: number) {
				return { level: number, levelLabel: label };
			},

			bindings(bindings) {
				return {
					...bindings,
					env: import.meta.env.MODE,
					version: import.meta.env.VITE_APP_VERSION || 'unknown',
				};
			},
		},

		// Redaction（機密情報のマスキング）
		redact: {
			paths: [
				'password',
				'token',
				'authorization',
				'apiKey',
				'secret',
				'*.password',
				'*.token',
				'*.apiKey',
				'headers.authorization',
				'headers.cookie',
				'headers["x-api-key"]',
			],
			censor: '[REDACTED]',
		},

		// ミックスイン（全ログに追加される情報）
		mixin: () => ({
			app: 'ps-ps',
			environment: import.meta.env.MODE,
		}),
	};

	// ブラウザ環境用の設定
	if (isBrowser) {
		return {
			...baseConfig,
			browser: {
				serialize: true,
				asObject: isDevelopment,
				transmit: {
					level: 'error',
					send: async (level, logEvent) => {
						// エラーログを外部サービスに送信
						if (window.Sentry) {
							// Map numeric level to string
							const levelMap: Record<number, 'fatal' | 'error' | 'warning' | 'info' | 'debug'> = {
								10: 'debug',
								20: 'debug', 
								30: 'info',
								40: 'warning',
								50: 'error',
								60: 'fatal',
							};
							const levelValue = typeof level === 'number' ? level : 30;
							const levelName = levelMap[levelValue] || 'info';
							
							window.Sentry.captureMessage(logEvent.messages[0], {
								level: levelName,
								extra: Array.isArray(logEvent.bindings) 
									? logEvent.bindings.reduce((acc, binding) => ({ ...acc, ...binding }), {})
									: logEvent.bindings as Record<string, unknown>,
							});
						}

						// カスタムエンドポイントへの送信
						if (!isDevelopment && import.meta.env.VITE_LOG_ENDPOINT) {
							await fetch(import.meta.env.VITE_LOG_ENDPOINT, {
								method: 'POST',
								headers: { 'Content-Type': 'application/json' },
								body: JSON.stringify(logEvent),
							}).catch(() => {
								// ログ送信のエラーは無視
							});
						}
					},
				},
			},
		};
	}

	// Node.js環境用の設定
	if (!isDevelopment && !isTest) {
		// 本番環境：高速化のための設定
		return {
			...baseConfig,
			base: undefined, // bindingsを最小化
			timestamp: false, // タイムスタンプ生成を無効化（Transport側で生成）
		};
	}

	// 開発環境：pino-prettyトランスポート設定
	if (isDevelopment && !isTest) {
		return {
			...baseConfig,
			transport: {
				target: 'pino-pretty',
				options: {
					colorize: true,
					levelFirst: true,
					translateTime: 'SYS:HH:MM:ss.l',
					ignore: 'pid,hostname',
					messageFormat: '{msg} {api.method} {api.url} {api.duration}',
					errorLikeObjectKeys: ['err', 'error'],
					customPrettifiers: {
						time: (timestamp: string) => `🕐 ${timestamp}`,
						level: (level: number | string) => {
							const labels: Record<string, string> = {
								10: '🔍 TRACE',
								20: '🐛 DEBUG',
								30: '📘 INFO',
								35: '📊 METRIC',
								40: '⚠️  WARN',
								50: '❌ ERROR',
								60: '💀 FATAL',
							};
							return labels[level] || level;
						},
					},
				},
			},
		};
	}

	return baseConfig;
};

/**
 * Transport設定（本番環境用）
 */
export const getTransportConfig = (): TransportTargetOptions[] => {
	const transports: TransportTargetOptions[] = [];

	// ファイル出力
	if (import.meta.env.VITE_LOG_FILE_PATH) {
		transports.push({
			target: 'pino/file',
			level: 'info',
			options: {
				destination: import.meta.env.VITE_LOG_FILE_PATH,
				mkdir: true,
			},
		});
	}

	// エラーログ専用ファイル
	if (import.meta.env.VITE_ERROR_LOG_PATH) {
		transports.push({
			target: 'pino/file',
			level: 'error',
			options: {
				destination: import.meta.env.VITE_ERROR_LOG_PATH,
				mkdir: true,
			},
		});
	}

	// 外部サービス連携（Datadog, CloudWatch等）
	if (import.meta.env.VITE_LOG_STREAM_ENDPOINT) {
		transports.push({
			target: './log-stream-transport.js',
			level: 'info',
			options: {
				endpoint: import.meta.env.VITE_LOG_STREAM_ENDPOINT,
				apiKey: import.meta.env.VITE_LOG_STREAM_API_KEY,
			},
		});
	}

	return transports;
};
