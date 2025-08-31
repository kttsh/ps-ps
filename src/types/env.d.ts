/// <reference types="vite/client" />

/**
 * 環境変数の型定義
 * ViteではVITE_プレフィックスがついた環境変数のみがクライアントに公開される
 */
interface ImportMetaEnv {
  // 必須の環境変数
  readonly VITE_MSR_API_URL: string
  readonly VITE_PSYS_API_URL: string

  // オプションの環境変数
  readonly VITE_ENABLE_DEBUG?: string
  readonly VITE_API_TIMEOUT?: string
  readonly VITE_API_MAX_RETRIES?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}