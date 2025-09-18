import {
	type UseMutationOptions,
	useMutation,
	useQueryClient,
} from '@tanstack/react-query';
import { toast } from 'sonner';
import type * as v from 'valibot';
import { apiClient } from '@/lib/api/client';
import type { ApiError } from '@/lib/api/errors';

interface ApiMutationOptions<TData, TVariables> {
	method: 'POST' | 'PUT' | 'DELETE';
	path: string | ((variables: TVariables) => string);
	schema: v.BaseSchema<TData, unknown, v.BaseIssue<unknown>>;
	invalidateQueries?: readonly unknown[][];
	optimisticUpdate?: (variables: TVariables) => void;
	successMessage?: string;
	errorMessage?: string;
}

/**
 * 型安全なAPIミューテーションフック
 */
export function useApiMutation<TData = unknown, TVariables = void>(
	options: ApiMutationOptions<TData, TVariables>,
	mutationOptions?: Omit<
		UseMutationOptions<TData, ApiError, TVariables>,
		'mutationFn'
	>,
) {
	const queryClient = useQueryClient();

	return useMutation<TData, ApiError, TVariables>({
		mutationFn: async (variables) => {
			const path =
				typeof options.path === 'function'
					? options.path(variables)
					: options.path;

			switch (options.method) {
				case 'POST':
					return apiClient.post(path, variables, options.schema);
				case 'PUT':
					return apiClient.put(path, variables, options.schema);
				case 'DELETE':
					return apiClient.delete(path, options.schema);
				default:
					throw new Error(`Unsupported method: ${options.method}`);
			}
		},
		onMutate: async (variables) => {
			// 楽観的更新
			if (options.optimisticUpdate) {
				options.optimisticUpdate(variables);
			}

			// カスタムonMutate呼び出し
			if (mutationOptions?.onMutate) {
				return mutationOptions.onMutate(variables);
			}
		},
		onSuccess: (data, variables, context) => {
			// キャッシュ無効化
			if (options.invalidateQueries) {
				options.invalidateQueries.forEach((queryKey) => {
					queryClient.invalidateQueries({ queryKey });
				});
			}

			// 成功メッセージ
			if (options.successMessage) {
				toast.success(options.successMessage);
			}

			// カスタムonSuccess呼び出し
			if (mutationOptions?.onSuccess) {
				mutationOptions.onSuccess(data, variables, context);
			}
		},
		onError: (error, variables, context) => {
			// エラーメッセージ
			const message =
				options.errorMessage || `操作に失敗しました: ${error.message}`;
			toast.error(message);

			// カスタムonError呼び出し
			if (mutationOptions?.onError) {
				mutationOptions.onError(error, variables, context);
			}
		},
		...mutationOptions,
	});
}
