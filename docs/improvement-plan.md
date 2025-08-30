# PS-PS プロジェクト包括的改善計画書

## 📋 概要

本ドキュメントは、PS-PSプロジェクトの全面的な改善計画です。環境変数管理、ビルド・Lint対応、最新技術の活用、URL駆動型状態管理の段階的移行、アーキテクチャの改善を包括的に実施する計画を記載しています。

## 🚨 現状の課題サマリー

### 緊急度別課題一覧

| 緊急度 | 課題カテゴリ | 影響度 | 件数/状況 |
|--------|------------|--------|----------|
| **Critical** | 環境変数管理 | セキュリティ・デプロイ | .envファイル未作成 |
| **Critical** | Toast通知不足 | UX・エラー処理 | 実装率5%未満 |
| **High** | Lintエラー | コード品質 | 20エラー、53警告 |
| **High** | ファイル名タイポ | 保守性 | useAlartStore.ts |
| **High** | テストカバレッジ | 品質保証 | 0% |
| **Medium** | 状態管理 | 保守性・UX | URL非対応 |
| **Medium** | アーキテクチャ | 保守性 | API層の分散 |
| **Low** | 最新機能未活用 | 効率性 | 多数 |

## 🔥 Phase 0: 即座対応事項（1-2日）

### 0.1 環境変数の設定 [最優先]

#### .envファイルの作成
```bash
# .env.example を作成
cat << 'EOF' > .env.example
# MSR API Configuration
VITE_MSR_API_URL=http://ztesta/GX_PMSR_TEST1

# PSYS API Configuration  
VITE_PSYS_API_URL=http://testservb.xx.co.jp/GX_PSYS_TEST2

# Feature Flags
VITE_ENABLE_DEBUG=false
VITE_ENABLE_MOCK_API=false

# Application Settings
VITE_APP_TITLE=PS-PS System
VITE_DEFAULT_LOCALE=ja
EOF

# 実際の.envファイルを作成（gitignore対象）
cp .env.example .env
```

#### .gitignoreの更新
```gitignore
# Environment variables
.env
.env.local
.env.*.local

# Keep example file
!.env.example
```

#### 環境変数の型定義
```typescript
// src/types/env.d.ts
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_MSR_API_URL: string
  readonly VITE_PSYS_API_URL: string
  readonly VITE_ENABLE_DEBUG?: string
  readonly VITE_ENABLE_MOCK_API?: string
  readonly VITE_APP_TITLE?: string
  readonly VITE_DEFAULT_LOCALE?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
```

#### API設定の更新
```typescript
// src/config/apiConfig.ts
const MSR_BASE_URL = import.meta.env.VITE_MSR_API_URL;
const PSYS_BASE_URL = import.meta.env.VITE_PSYS_API_URL;

if (!MSR_BASE_URL || !PSYS_BASE_URL) {
  throw new Error('環境変数が設定されていません。.envファイルを確認してください。');
}

export const API_URL = {
  MSRGetHeader: `${MSR_BASE_URL}/GetMilestoneHeader/MSRHeader?MSRMngCode=%1`,
  MSRGetAIPData: `${MSR_BASE_URL}/GetMilestoneData/AIPData?MSRMngCode=%1&SkipNum=%2`,
  SaveDataAll: `${MSR_BASE_URL}/SaveMilestoneData/SaveAll?MilestoneDataJSON`,
  GetPJStatusData: `${MSR_BASE_URL}/GetPJStatusData/PJStatusData?MSRMngCode=%1`,
};

export const PSYS_API_URL = {
  GenerateAIP: `${PSYS_BASE_URL}/transactions/GenerateAIP`,
  GetPipList: `${PSYS_BASE_URL}/GetPipList`,
  GetVendorList: `${PSYS_BASE_URL}/GetVendorList`,
};
```

### 0.2 ファイル名の修正

```bash
# タイポ修正
mv src/stores/useAlartStore.ts src/stores/useAlertStore.ts

# 全ファイルでインポートを修正
# VSCodeやIntelliJの一括置換機能を使用
# 変更前: import { useAlartStore } from '@/stores/useAlartStore'
# 変更後: import { useAlertStore } from '@/stores/useAlertStore'
```

### 0.3 Toast通知システムの全面的な実装 [最優先]

#### 現状の問題点
1. **利用不足**: Toastコンポーネントは`/p-sys/route.tsx`でのみ使用
2. **エラー通知なし**: 全APIエラーが`console.error`のみ
3. **成功通知なし**: 操作成功時のフィードバックが不足
4. **UX品質低下**: ユーザーへの適切なフィードバックがない

#### 実装計画

**Step 1: グローバルToastプロバイダーの設置**
```typescript
// src/routes/__root.tsx
import { Toaster } from 'sonner';
import { Toast } from '@/components/Toast';

export const Route = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <Toast />
      <Toaster />
    </>
  ),
})
```

**Step 2: Toast表示用ユーティリティ関数の作成**
```typescript
// src/lib/toast.ts
import { useAlertStore } from '@/stores/useAlertStore';

export const toast = {
  success: (message: string) => {
    const { showAlert } = useAlertStore.getState();
    showAlert('success', [{ id: crypto.randomUUID(), text: message }]);
  },
  error: (message: string) => {
    const { showAlert } = useAlertStore.getState();
    showAlert('error', [{ id: crypto.randomUUID(), text: message }]);
  },
  warning: (message: string) => {
    const { showAlert } = useAlertStore.getState();
    showAlert('warning', [{ id: crypto.randomUUID(), text: message }]);
  },
  info: (message: string) => {
    const { showAlert } = useAlertStore.getState();
    showAlert('info', [{ id: crypto.randomUUID(), text: message }]);
  },
};
```

**Step 3: API Mutationへの統合**
```typescript
// 例: src/features/vendor-assignment/hooks/useAipGenerate.ts
import { toast } from '@/lib/toast';

export const useAipGenerate = () => {
  return useMutation({
    mutationFn: async (params) => {
      // 既存の処理
    },
    onSuccess: (data) => {
      toast.success('AIPの生成が完了しました');
    },
    onError: (error) => {
      toast.error(`エラーが発生しました: ${error.message}`);
    },
  });
};
```

**Step 4: 実装対象箇所（優先度順）**

| 機能 | ファイル | 実装内容 |
|------|---------|---------|
| **API Mutations** | | |
| AIP生成 | `useAipGenerate.ts` | success/errorメッセージ |
| PIP保存 | `usePipSaveOverwrite.ts` | 保存成功/失敗通知 |
| PIP削除 | `usePipListDelete.ts` | 削除確認/結果通知 |
| アイテム生成 | `usePipGenerate.ts` | 生成進捗/完了通知 |
| **API Queries** | | |
| データ取得エラー | 全Query hooks | エラー時の通知 |
| **ユーザーアクション** | | |
| 保存ボタン | `SaveButton.tsx` | 保存中/完了/エラー |
| 選択操作 | 各選択コンポーネント | 選択確認メッセージ |
| 検証エラー | フォーム系 | バリデーションエラー |

**Step 5: エラーパターン別メッセージ**
```typescript
// src/lib/error-messages.ts
export const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    // HTTPステータスコード別
    if (error.message.includes('400')) {
      return '入力内容に誤りがあります';
    }
    if (error.message.includes('401')) {
      return 'ログインが必要です';
    }
    if (error.message.includes('403')) {
      return 'アクセス権限がありません';
    }
    if (error.message.includes('404')) {
      return 'データが見つかりません';
    }
    if (error.message.includes('500')) {
      return 'サーバーエラーが発生しました';
    }
  }
  return '予期しないエラーが発生しました';
};
```

## 📈 Phase 1: 基盤修正（1週間）

### 1.1 Lintエラーの解消

#### 優先度Highエラー（20件）の修正

**import type修正**
```typescript
// ❌ 現在（src/components/ui/sonner.tsx）
import { Toaster as Sonner, ToasterProps } from "sonner"

// ✅ 修正後
import { Toaster as Sonner, type ToasterProps } from "sonner"
```

**不要なFragmentの削除**
```tsx
// ❌ 現在（src/components/Topbar.tsx）
<>
  <h1 className="text-3xl text-white">MSR</h1>
</>

// ✅ 修正後
<h1 className="text-3xl text-white">MSR</h1>
```

#### Biome設定の最適化
```javascript
// biome.json
{
  "linter": {
    "enabled": true,
    "rules": {
      "recommended": true,
      "correctness": {
        "noUnusedVariables": "error",
        "noUnusedImports": "error"
      },
      "style": {
        "useImportType": "error",
        "noNonNullAssertion": "warn"
      },
      "complexity": {
        "noUselessFragments": "error"
      },
      "security": {
        "noGlobalEval": "error"
      }
    }
  },
  "formatter": {
    "enabled": true,
    "indentStyle": "tab",
    "indentWidth": 2,
    "lineWidth": 100
  }
}
```

### 1.2 基本的なテスト環境構築

#### Vitestのセットアップ
```bash
bun add -D vitest @testing-library/react @testing-library/jest-dom jsdom
```

#### vitest.config.ts
```typescript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    coverage: {
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/test/',
        '*.config.ts',
        'src/main.tsx',
      ],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

## 🎯 Phase 2: URL駆動型状態管理の段階的移行（2週間）

### 2.1 Phase 1: 最小限のURL管理（jobno, fgcode, pipcode）

#### 実装概要
```typescript
// src/hooks/useUrlParams.ts
import { useNavigate, useSearch } from '@tanstack/react-router';
import { useCallback } from 'react';
import * as v from 'valibot';

const urlParamsSchema = v.object({
  jobno: v.optional(v.string()),
  fgcode: v.optional(v.string()),
  pipcode: v.optional(v.string()),
});

type UrlParams = v.InferOutput<typeof urlParamsSchema>;

export function useUrlParams() {
  const navigate = useNavigate();
  const search = useSearch({ strict: false });

  const params: UrlParams = {
    jobno: search.jobno as string | undefined,
    fgcode: search.fgcode as string | undefined,
    pipcode: search.pipcode as string | undefined,
  };

  const updateParams = useCallback((updates: Partial<UrlParams>) => {
    navigate({
      search: (prev) => {
        const newParams = { ...prev };
        
        Object.entries(updates).forEach(([key, value]) => {
          if (value === undefined || value === null || value === '') {
            delete newParams[key];
          } else {
            newParams[key] = value;
          }
        });
        
        return newParams;
      },
      replace: true, // URLをreplaceして履歴を汚さない
    });
  }, [navigate]);

  const clearParams = useCallback(() => {
    navigate({ search: {}, replace: true });
  }, [navigate]);

  return {
    params,
    updateParams,
    clearParams,
  };
}
```

#### 既存コンポーネントへの統合
```typescript
// src/routes/p-sys/pips.tsx
export const Route = createFileRoute('/p-sys/pips')({
  validateSearch: (search) => {
    return {
      jobno: search.jobno as string | undefined,
      fgcode: search.fgcode as string | undefined,
      pipcode: search.pipcode as string | undefined,
    };
  },
  component: PipsPage,
});

function PipsPage() {
  const { params, updateParams } = useUrlParams();
  const { selectedJobNo, setSelectedJobNo } = useSelectedJobNoStore();
  const { selectedFG, setSelectedFG } = useSelectedFGStore();

  // URL → Store の同期（初回マウント時）
  useEffect(() => {
    if (params.jobno && params.jobno !== selectedJobNo) {
      setSelectedJobNo(params.jobno);
    }
    if (params.fgcode && params.fgcode !== selectedFG?.fgCode) {
      // FGコードからFGオブジェクトを取得して設定
      const fg = findFgByCode(params.fgcode);
      if (fg) setSelectedFG(fg);
    }
  }, []);

  // Store → URL の同期（選択変更時）
  const handleJobNoChange = (jobNo: string) => {
    setSelectedJobNo(jobNo);
    updateParams({ jobno: jobNo });
  };

  const handleFGChange = (fg: FG) => {
    setSelectedFG(fg);
    updateParams({ fgcode: fg.fgCode });
  };

  // 既存のUIはそのまま使用
  return <ExistingPipsUI />;
}
```

### 2.2 Phase 2: 検索・フィルター機能の追加（将来）

```typescript
// 将来的に追加するパラメータ
const extendedSchema = v.object({
  // Phase 1
  jobno: v.optional(v.string()),
  fgcode: v.optional(v.string()),
  pipcode: v.optional(v.string()),
  // Phase 2で追加
  search: v.optional(v.string()),
  category: v.optional(v.string()),
  page: v.optional(v.pipe(v.string(), v.transform(Number))),
  sort: v.optional(v.picklist(['name', 'date', 'status'])),
});
```

## 🚀 Phase 3: API層の統一とエラーハンドリング（2週間）

### 3.1 統一APIクライアントの実装

```typescript
// src/lib/api/client.ts
import { z } from 'zod';

export class ApiError extends Error {
  constructor(
    public status: number,
    public statusText: string,
    public data?: unknown
  ) {
    super(`API Error: ${status} ${statusText}`);
    this.name = 'ApiError';
  }
}

export class ApiClient {
  private baseUrl: string;
  private defaultHeaders: HeadersInit;

  constructor(config: { baseUrl: string; headers?: HeadersInit }) {
    this.baseUrl = config.baseUrl;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      ...config.headers,
    };
  }

  async request<T>(
    endpoint: string,
    options?: RequestInit & { schema?: z.ZodSchema<T> }
  ): Promise<T> {
    const { schema, ...fetchOptions } = options || {};
    
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...fetchOptions,
        headers: {
          ...this.defaultHeaders,
          ...fetchOptions.headers,
        },
      });

      if (!response.ok) {
        throw new ApiError(
          response.status,
          response.statusText,
          await response.text()
        );
      }

      const data = await response.json();
      
      // スキーマバリデーション（オプション）
      if (schema) {
        return schema.parse(data);
      }
      
      return data as T;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      
      console.error('API Request Failed:', error);
      throw new ApiError(0, 'Network Error', error);
    }
  }

  // 便利メソッド
  get<T>(endpoint: string, options?: Omit<RequestInit, 'method'> & { schema?: z.ZodSchema<T> }) {
    return this.request<T>(endpoint, { ...options, method: 'GET' });
  }

  post<T>(endpoint: string, body?: unknown, options?: Omit<RequestInit, 'method' | 'body'> & { schema?: z.ZodSchema<T> }) {
    return this.request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
    });
  }
}

// APIインスタンスの作成
export const msrApi = new ApiClient({
  baseUrl: import.meta.env.VITE_MSR_API_URL,
});

export const psysApi = new ApiClient({
  baseUrl: import.meta.env.VITE_PSYS_API_URL,
});
```

### 3.2 React Queryとの統合

```typescript
// src/lib/api/hooks.ts
import { useQuery, useMutation, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';
import { msrApi, psysApi, ApiError } from './client';

// 汎用的なAPIフック
export function useApiQuery<T>(
  key: string[],
  fetcher: () => Promise<T>,
  options?: Omit<UseQueryOptions<T, ApiError>, 'queryKey' | 'queryFn'>
) {
  return useQuery<T, ApiError>({
    queryKey: key,
    queryFn: fetcher,
    retry: (failureCount, error) => {
      // 4xx エラーはリトライしない
      if (error.status >= 400 && error.status < 500) {
        return false;
      }
      return failureCount < 3;
    },
    ...options,
  });
}

export function useApiMutation<TData, TVariables>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options?: UseMutationOptions<TData, ApiError, TVariables>
) {
  return useMutation<TData, ApiError, TVariables>({
    mutationFn,
    ...options,
  });
}
```

## 📊 Phase 4: 最新技術の活用（1ヶ月）

### 4.1 React 19/18.3の新機能

#### Server Componentsの準備
```typescript
// src/components/AsyncBoundary.tsx
import { Suspense, type ReactNode } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  errorFallback?: ReactNode;
}

export function AsyncBoundary({ 
  children, 
  fallback = <Loading />, 
  errorFallback = <ErrorDisplay /> 
}: Props) {
  return (
    <ErrorBoundary fallback={errorFallback}>
      <Suspense fallback={fallback}>
        {children}
      </Suspense>
    </ErrorBoundary>
  );
}
```

#### useOptimisticの活用
```typescript
// src/hooks/useOptimisticUpdate.ts
import { useOptimistic } from 'react';

export function useOptimisticTodo(initialTodos: Todo[]) {
  const [todos, setOptimisticTodos] = useOptimistic(
    initialTodos,
    (state, { action, todo }: { action: 'add' | 'update' | 'delete', todo: Todo }) => {
      switch (action) {
        case 'add':
          return [...state, todo];
        case 'update':
          return state.map(t => t.id === todo.id ? todo : t);
        case 'delete':
          return state.filter(t => t.id !== todo.id);
        default:
          return state;
      }
    }
  );

  const addTodo = async (newTodo: Todo) => {
    setOptimisticTodos({ action: 'add', todo: newTodo });
    try {
      await api.addTodo(newTodo);
    } catch (error) {
      // エラー時は自動的にロールバック
      console.error('Failed to add todo:', error);
    }
  };

  return { todos, addTodo };
}
```

### 4.2 TypeScript 5.7+の活用

#### satisfiesとconst type parameters
```typescript
// src/types/config.ts
export const routes = {
  home: '/',
  msr: {
    base: '/msr',
    milestone: '/msr/milestone',
    unitSelector: '/msr/msr-unit-selector',
  },
  psys: {
    base: '/p-sys',
    pips: '/p-sys/pips',
    vendorAssignment: '/p-sys/vendor-assignment',
    itemAssignment: '/p-sys/item-assignment',
  },
} as const satisfies Record<string, string | Record<string, string>>;

// 型として利用可能
type Routes = typeof routes;
type MsrRoute = keyof Routes['msr'];
```

#### Template Literal Types
```typescript
// src/types/api.ts
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
type ApiEndpoint = `/api/${string}`;

type ApiRoute<M extends HttpMethod, E extends ApiEndpoint> = {
  method: M;
  endpoint: E;
  handler: (req: Request) => Promise<Response>;
};

// 使用例
const userRoute: ApiRoute<'GET', '/api/users'> = {
  method: 'GET',
  endpoint: '/api/users',
  handler: async (req) => {
    // 型安全なハンドラー
  },
};
```

### 4.3 TanStack Router v1.131+の高度な機能

#### Route Loadersでのプリフェッチ
```typescript
// src/routes/msr/milestone/$MSRMngCode.tsx
export const Route = createFileRoute('/msr/milestone/$MSRMngCode')({
  loader: async ({ params, context }) => {
    const { MSRMngCode } = params;
    
    // 並列でデータをフェッチ
    const [header, aipData, statusData] = await Promise.all([
      context.queryClient.fetchQuery({
        queryKey: ['msr', 'header', MSRMngCode],
        queryFn: () => msrApi.get(`/GetMilestoneHeader/MSRHeader?MSRMngCode=${MSRMngCode}`),
        staleTime: 5 * 60 * 1000, // 5分間キャッシュ
      }),
      context.queryClient.fetchQuery({
        queryKey: ['msr', 'aipData', MSRMngCode],
        queryFn: () => msrApi.get(`/GetMilestoneData/AIPData?MSRMngCode=${MSRMngCode}&SkipNum=0`),
      }),
      context.queryClient.fetchQuery({
        queryKey: ['msr', 'status', MSRMngCode],
        queryFn: () => msrApi.get(`/GetPJStatusData/PJStatusData?MSRMngCode=${MSRMngCode}`),
      }),
    ]);

    return { header, aipData, statusData };
  },
  pendingComponent: MilestoneSkeleton,
  errorComponent: MilestoneError,
  component: MilestoneDetail,
});
```

### 4.4 Vite 6+の最適化

#### 環境別ビルド設定
```typescript
// vite.config.ts
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    plugins: [
      react(),
      mode === 'analyze' && visualizer({
        open: true,
        gzipSize: true,
        brotliSize: true,
      }),
    ],
    
    build: {
      sourcemap: mode === 'development',
      minify: mode === 'production' ? 'esbuild' : false,
      
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom'],
            'router': ['@tanstack/react-router'],
            'query': ['@tanstack/react-query'],
            'ui': ['@radix-ui/react-dialog', '@radix-ui/react-tooltip'],
            'wijmo': ['@mescius/wijmo', '@mescius/wijmo.react.all'],
          },
        },
      },
    },
    
    optimizeDeps: {
      include: ['react', 'react-dom', '@tanstack/react-router', '@tanstack/react-query'],
    },
  };
});
```

## 🧪 Phase 5: テスト戦略（継続的）

### 5.1 単体テストの実装

```typescript
// src/hooks/useUrlParams.test.ts
import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useUrlParams } from './useUrlParams';

// モック設定
vi.mock('@tanstack/react-router', () => ({
  useNavigate: () => vi.fn(),
  useSearch: () => ({ jobno: 'JOB001' }),
}));

describe('useUrlParams', () => {
  it('should parse URL parameters correctly', () => {
    const { result } = renderHook(() => useUrlParams());
    
    expect(result.current.params.jobno).toBe('JOB001');
  });

  it('should update parameters', () => {
    const { result } = renderHook(() => useUrlParams());
    
    act(() => {
      result.current.updateParams({ fgcode: 'FG123' });
    });
    
    // navigateが呼ばれたことを確認
    expect(mockNavigate).toHaveBeenCalled();
  });
});
```

### 5.2 統合テストの実装

```typescript
// src/features/pip-management/__tests__/integration.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from '@tanstack/react-router';
import { PipManagement } from '../PipManagement';

describe('PIP Management Integration', () => {
  it('should load and display PIP data', async () => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
      },
    });

    render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router}>
          <PipManagement />
        </RouterProvider>
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('PIP一覧')).toBeInTheDocument();
    });

    // データが表示されることを確認
    await waitFor(() => {
      expect(screen.getByTestId('pip-table')).toBeInTheDocument();
    });
  });
});
```

## 📊 実装スケジュール

### マイルストーン

| Phase | 期間 | 優先度 | 主なタスク |
|-------|------|--------|-----------|
| **Phase 0** | 1-2日 | Critical | 環境変数設定、ファイル名修正 |
| **Phase 1** | 1週間 | Critical | Lintエラー解消、基本テスト環境 |
| **Phase 2** | 2週間 | High | URL駆動型状態管理（最小限） |
| **Phase 3** | 2週間 | High | API層統一、エラーハンドリング |
| **Phase 4** | 1ヶ月 | Medium | 最新技術の活用 |
| **Phase 5** | 継続的 | High | テスト実装・改善 |

### 成功指標

| 指標 | 現状 | 3ヶ月後目標 | 6ヶ月後目標 |
|------|-----|------------|------------|
| Lintエラー | 20件 | 0件 | 0件 |
| Lint警告 | 53件 | 10件以下 | 5件以下 |
| テストカバレッジ | 0% | 40% | 70% |
| ビルド時間 | 未測定 | ベースライン設定 | 20%短縮 |
| バンドルサイズ | 未測定 | ベースライン設定 | 15%削減 |
| URL共有可能画面 | 0 | 3画面 | 全主要画面 |

## 🔄 継続的改善プロセス

### 週次チェック
- [ ] Lintエラー・警告の確認
- [ ] 新規追加コードのテスト作成
- [ ] パフォーマンス指標の確認

### 月次レビュー
- [ ] 依存関係のアップデート
- [ ] セキュリティ脆弱性スキャン
- [ ] コードカバレッジレポート
- [ ] バンドルサイズ分析

### 四半期評価
- [ ] アーキテクチャレビュー
- [ ] 技術スタックの見直し
- [ ] チーム開発プロセスの改善

## 📝 実装時の注意事項

### Do's ✅
- 段階的な移行を心がける
- 各変更後にテストを実行
- コミットメッセージを明確に
- ドキュメントを更新する
- チームでレビューを行う

### Don'ts ❌
- 一度に大規模な変更をしない
- テストなしでマージしない
- 環境変数をハードコードしない
- 警告を無視しない
- 後方互換性を壊さない

## まとめ

この改善計画により、PS-PSプロジェクトは以下を実現します：

1. **即座のセキュリティ向上**: 環境変数管理の確立
2. **コード品質の向上**: Lintエラーゼロ、型安全性の確保
3. **ユーザー体験の向上**: URL駆動型状態管理による共有機能
4. **開発効率の向上**: 最新技術活用、テスト自動化
5. **保守性の向上**: 統一されたアーキテクチャ、ドキュメント整備

段階的な実装により、リスクを最小化しながら着実に改善を進めていきます。