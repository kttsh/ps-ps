import {
	type UseQueryOptions,
	type UseSuspenseQueryOptions,
	useQuery,
	useSuspenseQuery,
} from '@tanstack/react-query';
import type * as v from 'valibot';
import { apiClient } from '@/lib/api/client';
import type { ApiError } from '@/lib/api/errors';

/**
 * 型安全なAPIクエリフック
 */
export function useApiQuery<T>(
	queryKey: readonly unknown[],
	path: string,
	schema: v.BaseSchema<T, unknown, v.BaseIssue<unknown>>,
	options?: Omit<UseQueryOptions<T, ApiError>, 'queryKey' | 'queryFn'>,
) {
	return useQuery<T, ApiError>({
		queryKey,
		queryFn: () => apiClient.get(path, schema),
		staleTime: 5 * 60 * 1000, // 5分
		gcTime: 10 * 60 * 1000, // 10分
		retry: (failureCount, error) => {
			// 404エラーはリトライしない
			if (error.status === 404) return false;
			// サーバーエラーは3回までリトライ
			if (error.isServerError()) return failureCount < 3;
			// それ以外はリトライしない
			return false;
		},
		...options,
	});
}

/**
 * Suspense対応APIクエリフック
 */
export function useSuspenseApiQuery<T>(
	queryKey: readonly unknown[],
	path: string,
	schema: v.BaseSchema<T, unknown, v.BaseIssue<unknown>>,
	options?: Omit<UseSuspenseQueryOptions<T, ApiError>, 'queryKey' | 'queryFn'>,
) {
	return useSuspenseQuery<T, ApiError>({
		queryKey,
		queryFn: () => apiClient.get(path, schema),
		staleTime: 5 * 60 * 1000,
		gcTime: 10 * 60 * 1000,
		retry: (failureCount, error) => {
			if (error.status === 404) return false;
			if (error.isServerError()) return failureCount < 3;
			return false;
		},
		...options,
	});
}
