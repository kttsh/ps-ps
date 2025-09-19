import pino from 'pino';

const isDevelopment = import.meta.env.DEV;
const isProduction = import.meta.env.PROD;

/**
 * メインロガーインスタンス
 * 開発環境では見やすいフォーマット、本番環境ではJSON形式で出力
 */
export const logger = pino({
  level: isDevelopment ? 'debug' : 'info',
  transport: isDevelopment
    ? {
        target: 'pino-pretty',
        options: {
          colorize: true,
          ignore: 'pid,hostname',
          translateTime: 'SYS:standard',
          singleLine: false,
        },
      }
    : undefined,
  redact: {
    paths: ['password', 'token', 'apiKey', '*.password', '*.token', '*.apiKey'],
    censor: '[REDACTED]',
  },
  formatters: {
    level: (label) => ({ level: label }),
    bindings: () => ({}), // pid, hostnameを除外
  },
  base: undefined, // デフォルトのフィールドを無効化
});

/**
 * モジュール別のロガーを作成
 * @param module - モジュール名
 * @returns 子ロガーインスタンス
 */
export const createLogger = (module: string) => logger.child({ module });

// 型定義のエクスポート
export type Logger = typeof logger;
export type ChildLogger = ReturnType<typeof createLogger>;