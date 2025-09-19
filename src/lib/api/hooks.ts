import {
  useSuspenseQuery,
  useMutation,
  useQueryClient,
  useMutationState,
  useIsFetching,
  useIsMutating,
  type UseSuspenseQueryOptions,
  type UseMutationOptions,
  type QueryKey,
} from '@tanstack/react-query';
import * as v from 'valibot';
import { psysApiClient, ApiError } from './index';
import { createLogger } from '../logger';

const logger = createLogger('ReactQuery');

/**
 * Suspense対応のクエリフック
 * TanStack Query v5の最新機能を活用
 * 
 * @template T - レスポンスの型
 * @param key - クエリキー（読み取り専用タプル）
 * @param endpoint - APIエンドポイント
 * @param options - クエリオプション
 * @param schema - Valibotスキーマ（オプション）
 */
export function useApiSuspenseQuery<T>(
  key: QueryKey,
  endpoint: string,
  options?: Omit<UseSuspenseQueryOptions<T, ApiError>, 'queryKey' | 'queryFn'>,
  schema?: v.BaseSchema<unknown, T, v.BaseIssue<unknown>>,
) {
  return useSuspenseQuery<T, ApiError>({
    queryKey: key,
    queryFn: async ({ signal }) => {
      logger.debug({ key, endpoint }, 'Executing suspense query');
      
      return psysApiClient.get<T>(
        endpoint,
        { signal },
        schema ? { schema } : undefined,
      );
    },
    staleTime: 5 * 60 * 1000, // 5分間は再フェッチしない
    gcTime: 10 * 60 * 1000, // 10分間キャッシュを保持（旧cacheTime）
    refetchOnWindowFocus: false, // ウィンドウフォーカス時の再フェッチを無効化
    retry: 3, // デフォルトリトライ回数
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // 指数バックオフ
    ...options,
  });
}

/**
 * ミューテーションフック
 * 楽観的更新とロールバック機能を含む
 * 
 * @template TData - レスポンスの型
 * @template TVariables - リクエスト変数の型
 * @template TContext - コンテキストの型（ロールバック用）
 */
export function useApiMutation<
  TData = unknown,
  TVariables = unknown,
  TContext = unknown,
>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options?: UseMutationOptions<TData, ApiError, TVariables, TContext>,
) {
  const queryClient = useQueryClient();

  return useMutation<TData, ApiError, TVariables, TContext>({
    mutationFn,
    onMutate: async (variables) => {
      logger.debug({ variables }, 'Mutation started');
      return options?.onMutate?.(variables);
    },
    onError: (error, variables, context) => {
      logger.error(
        { error: error.message, status: error.status, variables },
        'Mutation failed',
      );
      options?.onError?.(error, variables, context);
    },
    onSuccess: (data, variables, context) => {
      logger.info({ variables }, 'Mutation succeeded');
      options?.onSuccess?.(data, variables, context);
    },
    onSettled: (data, error, variables, context) => {
      options?.onSettled?.(data, error, variables, context);
    },
    ...options,
  });
}

/**
 * 複数のミューテーション状態を追跡するフック
 * TanStack Query v5の新機能
 * 
 * @param mutationKey - ミューテーションキー
 * @param options - フィルタオプション
 */
export function useMutationStates<TData = unknown, TVariables = unknown>(
  mutationKey?: QueryKey,
  options?: {
    filters?: {
      status?: 'idle' | 'pending' | 'success' | 'error';
      exact?: boolean;
    };
  },
) {
  return useMutationState({
    filters: {
      mutationKey,
      ...options?.filters,
    },
    select: (mutation) => ({
      status: mutation.state.status,
      isPending: mutation.state.status === 'pending',
      isSuccess: mutation.state.status === 'success',
      isError: mutation.state.status === 'error',
      isIdle: mutation.state.status === 'idle',
      error: mutation.state.error as ApiError | null,
      data: mutation.state.data as TData | undefined,
      variables: mutation.state.variables as TVariables | undefined,
      submittedAt: mutation.state.submittedAt,
      failureCount: mutation.state.failureCount,
      failureReason: mutation.state.failureReason as ApiError | null,
    }),
  });
}

/**
 * 楽観的更新のヘルパー関数
 * 
 * @param queryClient - QueryClient インスタンス
 * @param queryKey - 更新対象のクエリキー
 * @param updater - データ更新関数
 */
export function optimisticUpdate<T>(
  queryClient: ReturnType<typeof useQueryClient>,
  queryKey: QueryKey,
  updater: (oldData: T | undefined) => T,
): T | undefined {
  const previousData = queryClient.getQueryData<T>(queryKey);
  queryClient.setQueryData<T>(queryKey, updater);
  return previousData;
}

/**
 * 複数のクエリを無効化するヘルパー関数
 * 
 * @param queryClient - QueryClient インスタンス
 * @param queryKeys - 無効化するクエリキーの配列
 */
export async function invalidateQueries(
  queryClient: ReturnType<typeof useQueryClient>,
  queryKeys: QueryKey[],
): Promise<void> {
  await Promise.all(
    queryKeys.map((key) =>
      queryClient.invalidateQueries({ queryKey: key }),
    ),
  );
}

/**
 * クエリのプリフェッチヘルパー
 * SSRやルート遷移前のデータ取得に使用
 * 
 * @param queryClient - QueryClient インスタンス
 * @param key - クエリキー
 * @param endpoint - APIエンドポイント
 * @param schema - Valibotスキーマ
 */
export async function prefetchQuery<T>(
  queryClient: ReturnType<typeof useQueryClient>,
  key: QueryKey,
  endpoint: string,
  schema?: v.BaseSchema<unknown, T, v.BaseIssue<unknown>>,
): Promise<void> {
  await queryClient.prefetchQuery({
    queryKey: key,
    queryFn: () => psysApiClient.get<T>(endpoint, undefined, schema ? { schema } : undefined),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}

/**
 * 現在フェッチ中のクエリ数を取得するフック
 * ローディングインジケータの表示に使用
 * 
 * @param queryKey - 特定のクエリキー（オプション）
 */
export function useGlobalLoadingState(queryKey?: QueryKey) {
  const isFetching = useIsFetching({ queryKey });
  const isMutating = useIsMutating({ mutationKey: queryKey });

  return {
    isLoading: isFetching > 0 || isMutating > 0,
    fetchingCount: isFetching,
    mutatingCount: isMutating,
  };
}

/**
 * データ同期フック
 * リアルタイムデータ同期やポーリングに使用
 * 
 * @param key - クエリキー
 * @param endpoint - APIエンドポイント
 * @param interval - ポーリング間隔（ミリ秒）
 * @param schema - Valibotスキーマ
 */
export function useDataSync<T>(
  key: QueryKey,
  endpoint: string,
  interval: number = 5000,
  schema?: v.BaseSchema<unknown, T, v.BaseIssue<unknown>>,
) {
  return useSuspenseQuery<T, ApiError>({
    queryKey: key,
    queryFn: ({ signal }) =>
      psysApiClient.get<T>(endpoint, { signal }, schema ? { schema } : undefined),
    refetchInterval: interval,
    refetchIntervalInBackground: true, // バックグラウンドでも同期を継続
    staleTime: 0, // 常に最新データを取得
  });
}

/**
 * 条件付きクエリフック
 * 依存関係のあるクエリの実行制御
 * 
 * @param condition - 実行条件
 * @param key - クエリキー
 * @param endpoint - APIエンドポイント
 * @param options - クエリオプション
 * @param schema - Valibotスキーマ
 */
export function useConditionalQuery<T>(
  condition: boolean,
  key: QueryKey,
  endpoint: string,
  options?: Omit<UseSuspenseQueryOptions<T, ApiError>, 'queryKey' | 'queryFn' | 'enabled'>,
  schema?: v.BaseSchema<unknown, T, v.BaseIssue<unknown>>,
) {
  return useSuspenseQuery<T, ApiError>({
    queryKey: key,
    queryFn: ({ signal }) =>
      psysApiClient.get<T>(endpoint, { signal }, schema ? { schema } : undefined),
    enabled: condition,
    ...options,
  });
}

/**
 * インフィニットスクロール用のページネーションフック設定型
 * 将来の拡張用に型定義のみ提供
 */
export interface InfiniteQueryConfig<T> {
  key: QueryKey;
  endpoint: (pageParam: number) => string;
  schema?: v.BaseSchema<unknown, T, v.BaseIssue<unknown>>;
  getNextPageParam?: (lastPage: T, allPages: T[]) => number | undefined;
  initialPageParam?: number;
}

/**
 * バッチ処理用のミューテーション設定型
 * 複数の操作を一括で実行する際に使用
 */
export interface BatchMutationConfig<TData, TVariables> {
  mutationFn: (items: TVariables[]) => Promise<TData[]>;
  onBatchSuccess?: (results: TData[]) => void;
  onBatchError?: (errors: ApiError[]) => void;
  onItemSuccess?: (result: TData, index: number) => void;
  onItemError?: (error: ApiError, index: number) => void;
}