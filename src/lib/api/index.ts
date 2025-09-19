import { ApiClient, JobNo, FgCode, PipCode, VendorCode } from './client';
import { createLogger } from '../logger';

const logger = createLogger('API');

/**
 * PSYS APIのベースURL
 * 環境変数から取得、デフォルトはローカル開発環境
 */
const PSYS_BASE_URL = import.meta.env.VITE_PSYS_API_URL || 'http://localhost:8080';

/**
 * 認証トークンの取得
 */
const getAuthToken = (): string | null => {
  return localStorage.getItem('auth-token');
};

/**
 * 認証トークンの設定
 */
export const setAuthToken = (token: string): void => {
  localStorage.setItem('auth-token', token);
};

/**
 * 認証トークンの削除
 */
export const clearAuthToken = (): void => {
  localStorage.removeItem('auth-token');
};

/**
 * PSYSAPIクライアントインスタンス
 * グローバル設定とインターセプターを含む
 */
export const psysApiClient = new ApiClient({
  baseURL: PSYS_BASE_URL,
  defaultHeaders: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
    Accept: 'application/json',
  },
  interceptors: {
    request: async (config) => {
      // 認証トークンを自動付与
      const token = getAuthToken();
      if (token) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${token}`,
        };
      }

      // リクエストIDを生成（トレーシング用）
      const requestId = crypto.randomUUID();
      config.headers = {
        ...config.headers,
        'X-Request-Id': requestId,
      };

      return config;
    },
    error: async (error) => {
      // 401エラーの場合、ログイン画面へリダイレクト
      if (error.isAuthError() && error.status === 401) {
        clearAuthToken();
        // React Routerと統合する場合はnavigate使用を検討
        window.location.href = '/login';
      }

      // 403エラーの場合、権限不足を通知
      if (error.status === 403) {
        logger.error({ error: error.message }, 'Permission denied');
        // トーストまたは通知システムと統合
      }
    },
  },
  retry: {
    count: 3,
    delay: 1000,
    maxDelay: 10000,
    shouldRetry: (error, attempt) => {
      // ネットワークエラーと5xxエラーのみリトライ
      if (error.isNetworkError() || error.isServerError()) {
        return attempt <= 3;
      }
      // 429 Too Many Requestsの場合もリトライ
      if (error.status === 429) {
        return attempt <= 5;
      }
      return false;
    },
    onRetry: (error, attempt) => {
      logger.info(
        { attempt, status: error.status, message: error.message },
        'Retrying API request',
      );
    },
  },
  timeout: 30000, // 30秒
  logger: {
    request: (url, config) => {
      logger.debug(
        {
          url,
          method: config.method || 'GET',
          headers: config.headers,
          params: config.params,
        },
        'API Request',
      );
    },
    response: (url, response, duration) => {
      logger.debug(
        {
          url,
          status: response.status,
          statusText: response.statusText,
          duration: `${duration.toFixed(2)}ms`,
        },
        'API Response',
      );
    },
    error: (url, error, duration) => {
      logger.error(
        {
          url,
          status: error.status,
          message: error.message,
          response: error.response,
          duration: `${duration.toFixed(2)}ms`,
        },
        'API Error',
      );
    },
  },
});

/**
 * 型安全なエンドポイントビルダー
 * Template Literal Typesを活用
 */
export const endpoints = {
  // Items API
  items: (jobNo: JobNo, fgCode: FgCode) =>
    `/items/${jobNo}/${fgCode}` as const,

  // PIPs API
  pips: (jobNo: JobNo, fgCode: FgCode) =>
    `/pips/${jobNo}/${fgCode}` as const,
  
  pipDetail: (jobNo: JobNo, fgCode: FgCode, pipCode: PipCode) =>
    `/pips-detail/${jobNo}/${fgCode}/${pipCode}` as const,
  
  createPip: () => '/pips' as const,
  
  editPip: (jobNo: JobNo, fgCode: FgCode, pipCode: PipCode) =>
    `/pips-edit/${jobNo}/${fgCode}/${pipCode}` as const,
  
  copyPip: (jobNo: JobNo, fgCode: FgCode, pipCode: PipCode) =>
    `/pips-copy/${jobNo}/${fgCode}/${pipCode}` as const,
  
  mergePips: (jobNo: JobNo, fgCode: FgCode) =>
    `/pips-merge/${jobNo}/${fgCode}` as const,
  
  deletePips: (jobNo: JobNo, fgCode: FgCode) =>
    `/pips-delete/${jobNo}/${fgCode}` as const,

  // Vendors API  
  vendors: (fgCode: FgCode) =>
    `/vendors/${fgCode}` as const,
  
  // AIPs API
  attachAip: (jobNo: JobNo, fgCode: FgCode, pipCode?: PipCode) =>
    pipCode
      ? `/aips/${jobNo}/${fgCode}/${pipCode}` as const
      : `/aips/${jobNo}/${fgCode}` as const,

  // Function Groups API
  functionGroups: () => '/fgs' as const,
} as const;

/**
 * エンドポイントの型定義
 * Template Literal Typesによる型推論
 */
export type Endpoints = typeof endpoints;
export type EndpointKeys = keyof Endpoints;
export type EndpointPaths = ReturnType<Endpoints[EndpointKeys]>;

// Re-export types from client
export { ApiError, JobNo, FgCode, PipCode, VendorCode } from './client';
export type { RequestConfig, ResponseTransformer, ApiClientOptions } from './client';