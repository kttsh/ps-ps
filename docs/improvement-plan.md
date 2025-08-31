# PS-PS プロジェクト包括的改善計画書

## 📋 概要

本ドキュメントは、PS-PSプロジェクトの全面的な改善計画です。現在のビルドエラーの解消、コード品質の向上、最新技術の活用、アーキテクチャの改善を段階的に実施する計画を記載しています。

**最終更新日**: 2025-08-31  
**実装状況**: ビルド不可（TypeScriptエラー46件、Lintエラー72件）

## 🚨 現状の課題サマリー

### 緊急度別課題一覧

| 緊急度 | 課題カテゴリ | 影響度 | 件数/状況 |
|--------|------------|--------|----------|
| **🔥 Blocker** | 依存関係不足 | ビルド不可 | 5パッケージ未インストール |
| **🔥 Blocker** | TypeScriptエラー | ビルド不可 | 46エラー |
| **🔥 Blocker** | App.tsx未接続 | アプリ起動不可 | Viteテンプレートのまま |
| **Critical** | 環境変数管理 | セキュリティ・デプロイ | ✅ 完了済み |
| **High** | Lintエラー | コード品質 | 19エラー、53警告 |
| **High** | テストカバレッジ | 品質保証 | 0%（テスト未実装） |
| **Medium** | Toast通知 | UX・エラー処理 | 依存関係エラーで動作不可 |
| **Medium** | 状態管理 | 保守性・UX | ✅ URL同期実装済み |
| **Low** | 最新機能未活用 | 効率性 | React 19機能未使用 |

### 📊 エラー詳細分析（2025-08-31更新）

#### **ビルドエラー内訳（46件）**

| カテゴリ | 件数 | 主な影響モジュール | ブロッキング度 |
|---------|------|-----------------|--------------|
| 依存関係不足 | 8 | sonner, milestone | 🔥 Critical |
| 型定義競合 | 12 | item-assignment, pip-management | 🔥 Critical |
| API設定エラー | 9 | 全データ操作フック | ⚠️ High |
| 未使用変数 | 17 | 全モジュール | 📝 Low |

#### **モジュール依存関係グラフ**

```
Layer 0: Core Infrastructure
├── src/types/ ❌ (PipData型競合)
├── src/config/ ✅
├── src/lib/ ✅
└── src/components/ui/ ❌ (next-themes欠落)

Layer 1: Foundation Services  
├── src/stores/ ✅
├── src/hooks/ ✅
└── src/components/generic-table/ ✅

Layer 2: Feature Modules
├── milestone/ ❌ (Wijmo依存)
├── item-assignment/ ❌ (export欠落)
├── pip-management/ ❌ (型競合)
├── vendor-assignment/ ❌ (API設定)
├── pip-randing/ ⚠️ (軽微)
└── psys-randing/ ⚠️ (軽微)

Layer 3: Application
├── src/routes/ ❌ (Layer 2依存)
└── src/App.tsx ⚠️ (警告のみ)
```

## 🔧 モジュール修正順序の詳細計画

### **修正の優先順位戦略**

依存関係の分析により、以下の順序で修正することで最も効率的にビルドエラーを解消できます：

### **Step 1: 型定義の統一（30分）** 🔥 最優先
**対象**: `src/types/`
- **問題**: `PipData`型が`common.ts`と`pipDataCard.ts`で重複定義
- **影響**: 8モジュール以上がこの型に依存
- **修正方法**: 
  1. `pipDataCard.ts`の`PipData`を`PipDataCard`にリネーム
  2. または`common.ts`の定義に統一
- **ブロック解除**: pip-management, item-assignment機能

### **Step 2: 依存関係インストール（30分）** 🔥 最優先
```bash
# 必須パッケージ
npm install next-themes sonner react-use-event-hook

# Wijmoライセンスありの場合
npm install @mescius/wijmo @mescius/wijmo.grid @mescius/wijmo.react.grid @mescius/wijmo.input @mescius/wijmo.cultures

# Wijmoライセンスなしの場合（代替）
npm install ag-grid-react ag-grid-community
```
- **ブロック解除**: UI components, milestone機能

### **Step 3: ItemAssignmentViewエクスポート修正（15分）** ⚠️ 高優先
**対象**: `src/features/item-assignment/components/ItemAssignmentView.tsx`
- **問題**: コンポーネントがエクスポートされていない
- **修正**: 
  ```typescript
  export const ItemAssignmentView = () => { ... }
  ```
- **ブロック解除**: item-assignmentルート

### **Step 4: API Hook設定修正（1時間）** ⚠️ 高優先
**対象**: 全`useMutation`フック
- **問題**: `staleTime`プロパティが`useMutation`で使用不可
- **影響箇所**:
  - `src/features/item-assignment/hooks/usePipGenerate.ts`
  - `src/features/pip-management/hooks/useUpdatePip.ts`
  - `src/features/vendor-assignment/hooks/useAipGenerate.ts`
- **修正**: `staleTime`を削除（`useQuery`でのみ有効）

### **Step 5: TypeScript設定更新（15分）** 📝 中優先
**対象**: `tsconfig.app.json`
```json
{
  "compilerOptions": {
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "verbatimModuleSyntax": true
  }
}
```
- **解決**: `Object.hasOwn`エラー、import type強制

### **Step 6: Import Type修正（2時間）** 📝 中優先
**対象**: 全ファイル
- **問題**: `verbatimModuleSyntax`違反
- **修正**: 型インポートを`import type`に変更
```typescript
// Before
import { ToasterProps } from "sonner"
// After  
import type { ToasterProps } from "sonner"
```

### **Step 7: 未使用変数クリーンアップ（1時間）** 📝 低優先
- **対象**: 17箇所の未使用変数/パラメータ
- **修正**: 削除または`_`プレフィックス追加

## 🔥 Phase 0: 即座対応事項（ビルドエラー解消）【1日以内】

### 0.1 🚨 依存関係の緊急インストール【最優先】

```bash
# 必須パッケージのインストール（ビルドエラー解消）
npm install next-themes sonner react-use-event-hook

# Wijmoライセンスありの場合
npm install @mescius/wijmo @mescius/wijmo.grid @mescius/wijmo.react.grid @mescius/wijmo.input @mescius/wijmo.cultures

# Wijmoライセンスなしの場合の代替案
# AG Grid Community Edition（無料）への移行を検討
npm install ag-grid-react ag-grid-community
```

### 0.2 🚨 TypeScript設定の修正【必須】

```json
// tsconfig.app.json
{
  "compilerOptions": {
    "lib": ["ES2022", "DOM", "DOM.Iterable"], // ES2022追加でObject.hasOwn解決
    "verbatimModuleSyntax": true,
    "target": "ES2020",
    "module": "ESNext"
  }
}
```

### 0.3 🚨 App.tsxの修正【必須】

```typescript
// src/App.tsx - Viteテンプレートを実際のアプリに置き換え
import { RouterProvider } from '@tanstack/react-router';
import { router } from './router';

function App() {
  return <RouterProvider router={router} />;
}

export default App;
```

### 0.4 環境変数の確認【✅ 完了済み】

```bash
# .env.exampleは既に存在し、適切に設定されている
# src/types/env.d.tsで型定義済み
# src/config/apiConfig.tsで使用中
```

### 0.5 ファイル名タイポの修正【✅ 完了済み】

```bash
# useAlartStore.ts → useAlertStore.ts は既に修正済み
```

## 📈 Phase 1: 基盤修正（1週間）

### 1.1 Import Typeエラーの一括修正【優先】

```bash
# Biomeで自動修正可能
npm run lint:fix

# 手動修正が必要な箇所の例
```

```typescript
// ❌ 現在
import { ToasterProps } from "sonner"
import { MSRHeaderType } from '../types/milestone'

// ✅ 修正後  
import type { ToasterProps } from "sonner"
import type { MSRHeaderType } from '../types/milestone'
```

### 1.2 欠落ファイル・エクスポートの修正

**修正対象:**
```typescript
// src/features/item-assignment/components/ItemAssignmentView.tsx
// エクスポートを追加
export { ItemAssignmentView } from './ItemAssignmentView';

// src/features/item-assignment/types/item-response.ts  
// ファイルを作成またはインポートパスを修正

// src/features/item-management/utils/getItemColumns.ts
// ファイルを作成またはindex.tsから削除

```

### 1.3 APIフックのstaleTimeエラー修正

```typescript
// ❌ 現在（UseMutationでstaleTimeは使用不可）
useMutation({
  mutationFn: async (params) => { ... },
  staleTime: 5 * 60 * 1000, // エラー
});

// ✅ 修正後（staleTimeを削除）
useMutation({
  mutationFn: async (params) => { ... },
  // staleTimeはuseQueryでのみ使用可能
});
```

### 1.4 Biome設定の最適化

```javascript
// biome.json
```typescript
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
        "useTemplate": "error"
      },
      "complexity": {
        "noUselessFragments": "error"
      }
    }
  },
  "formatter": {
    "enabled": true,
    "indentStyle": "tab",
    "indentWidth": 2
  }
}
```

### 1.5 基本的なテスト環境構築

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

## 🎯 Phase 2: Toast通知システムの実装（3日）

### 2.1 Toast基盤の構築

```typescript
// src/lib/toast.ts
import { toast as sonnerToast } from 'sonner';

export const toast = {
  success: (message: string) => sonnerToast.success(message),
  error: (message: string) => sonnerToast.error(message),
  warning: (message: string) => sonnerToast.warning(message),
  info: (message: string) => sonnerToast.info(message),
  loading: (message: string) => sonnerToast.loading(message),
};
```

### 2.2 API統合

```typescript
// src/features/vendor-assignment/hooks/useAipGenerate.ts
import { toast } from '@/lib/toast';

export const useAipGenerate = () => {
  return useMutation({
    mutationFn: async (params) => { ... },
    onSuccess: () => toast.success('AIPの生成が完了しました'),
    onError: () => toast.error('エラーが発生しました'),
  });
};
```

## 🚀 Phase 3: URL駆動型状態管理の強化（✅ 基本実装済み）

### 3.1 現在の実装状況

**実装済み機能:**
- `useFgCodeUrlSync.ts` - FGコードのURL同期
- TanStack Routerの検索パラメータ検証
- 無限ループ防止機能
- 型安全なパラメータ管理

### 3.2 今後の拡張計画

```typescript
// 現在のパラメータ
{
  jobno?: string,
  fgcode?: string,
  pipcode?: string,
  search?: string  // 部分的に実装済み
}

// 将来的に追加
{
  category?: string,
  page?: number,
  sort?: 'name' | 'date' | 'status'
}

## 📊 Phase 4: API層の統一とエラーハンドリング（2週間）
```

### 4.1 統一APIクライアントの実装

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

### 4.2 エラーハンドリングの統一

```typescript
// src/lib/error-handler.ts
export class ApiError extends Error {
  constructor(
    public status: number,
    public statusText: string,
    public data?: unknown
  ) {
    super(`API Error: ${status} ${statusText}`);
  }
}

export function handleApiError(error: unknown): string {
  if (error instanceof ApiError) {
    switch (error.status) {
      case 400: return '入力内容に誤りがあります';
      case 401: return 'ログインが必要です';
      case 403: return 'アクセス権限がありません';
      case 404: return 'データが見つかりません';
      case 500: return 'サーバーエラーが発生しました';
      default: return 'エラーが発生しました';
    }
  }
  return '予期しないエラーが発生しました';
}
```

## 📊 Phase 5: 最新技術の活用（1ヶ月）

### 5.1 React 19の新機能活用

#### Suspense/Error Boundaryの活用
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

### 5.2 TypeScript 5.9の最新機能

#### Satisfies Operatorの活用
```typescript
// src/types/routes.ts
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
```

### 5.3 TanStack Routerの高度な機能

#### パラメータ検証とプリフェッチ
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
  loader: async ({ context }) => {
    // データのプリフェッチ
    await context.queryClient.prefetchQuery({
      queryKey: ['pips'],
      queryFn: fetchPips,
    });
  },
  component: PipsPage,
});
```

### 5.4 Vite 7の最適化

#### バンドル最適化設定
```typescript
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'router': ['@tanstack/react-router'],
          'query': ['@tanstack/react-query'],
          'ui': ['@radix-ui/react-dialog', '@radix-ui/react-select'],
        },
      },
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom', '@tanstack/react-router'],
  },
});
```

## 🧪 Phase 6: テスト戦略（継続的）

### 6.1 単体テストの実装

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

### 6.2 統合テストの実装

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

### マイルストーン（優先度順）

| Phase | 期間 | 優先度 | 主なタスク | 現状 |
|-------|------|--------|----------|------|
| **Phase 0** | 1日 | 🔥 Blocker | 依存関係インストール、TS設定修正、App.tsx修正 | ❌ 未着手 |
| **Phase 1** | 1週間 | Critical | Lintエラー解消、import type修正 | ❌ 未着手 |
| **Phase 2** | 3日 | High | Toast通知システム実装 | ❌ 依存関係待ち |
| **Phase 3** | - | ✅ Completed | URL状態管理 | ✅ 実装済み |
| **Phase 4** | 2週間 | Medium | API層統一、エラーハンドリング | ❌ 未着手 |
| **Phase 5** | 1ヶ月 | Low | 最新技術の活用 | ❌ 未着手 |
| **Phase 6** | 継続的 | High | テスト実装・改善 | ❌ 未着手 |

### 成功指標

| 指標 | 現状 | 1週間後目標 | 1ヶ月後目標 | 3ヶ月後目標 |
|------|-----|-----------|------------|------------|
| ビルド可能 | ❌ | ✅ | ✅ | ✅ |
| TypeScriptエラー | 44件 | 0件 | 0件 | 0件 |
| Lintエラー | 19件 | 0件 | 0件 | 0件 |
| Lint警告 | 53件 | 20件 | 10件 | 5件 |
| テストカバレッジ | 0% | 10% | 30% | 60% |
| Toast通知実装率 | 0% | 50% | 80% | 100% |

## 🎯 即座実行タスク（Phase 0）

### 推奨実行順序とコマンド

```bash
# === Step 1: 型定義の修正（手動） ===
# src/types/pipDataCard.ts のPipDataをPipDataCardにリネーム

# === Step 2: 依存関係のインストール ===
npm install next-themes sonner react-use-event-hook

# Wijmoライセンスありの場合
npm install @mescius/wijmo @mescius/wijmo.grid @mescius/wijmo.react.grid @mescius/wijmo.input @mescius/wijmo.cultures

# または代替グリッド（無料）
npm install ag-grid-react ag-grid-community

# === Step 3: TypeScript設定修正 ===
# tsconfig.app.jsonのlibに"ES2022"を追加

# === Step 4: ビルド確認（エラー数確認） ===
npm run build 2>&1 | grep "error TS" | wc -l

# === Step 5: 自動修正可能なLintエラー修正 ===
npm run lint:fix

# === Step 6: 残エラー確認 ===
npm run build
npm run lint
```

### 修正効果予測

| 修正ステップ | 解消エラー数 | 残エラー数 | 所要時間 |
|------------|-----------|----------|---------|
| Step 1: 型定義統一 | 12 | 34 | 30分 |
| Step 2: 依存関係 | 8 | 26 | 30分 |
| Step 3: ItemAssignment | 2 | 24 | 15分 |
| Step 4: API Hooks | 9 | 15 | 60分 |
| Step 5: TS設定 | 5 | 10 | 15分 |
| Step 6: Import Type | 10 | 0 | 120分 |
| **合計** | **46** | **0** | **4.5時間** |

## 🔄 継続的改善プロセス

### 週次チェック
- [ ] ビルドエラーの確認
- [ ] Lintエラー・警告の確認
- [ ] 新規追加コードのテスト作成

### 月次レビュー
- [ ] 依存関係のアップデート
- [ ] セキュリティ脆弱性スキャン
- [ ] コードカバレッジレポート

## 📝 実装時の注意事項

### Do's ✅
- **Phase 0を最優先で実行** - ビルド可能にする
- 各変更後にテストを実行
- import typeを一貫して使用
- Toast通知をAPIフックに統合
- チームでレビューを行う

### Don'ts ❌
- **Phase 0をスキップしない** - ビルド不可のまま進めない
- Wijmoライセンスなしでそのまま使用しない
- staleTimeをuseMutationで使用しない
- 環境変数をハードコードしない
- TypeScriptエラーを無視しない

## まとめ

この改善計画により、PS-PSプロジェクトは以下を実現します：

### 🚨 緊急対応事項（Phase 0 - 1日以内）
1. **ビルドエラーの解消**: 依存関係インストール、TypeScript設定修正
2. **アプリケーション起動**: App.tsx修正によるルーティング接続

### 📈 短期目標（1週間～1ヶ月）
3. **コード品質の向上**: Lintエラーゼロ、import type統一
4. **UX改善**: Toast通知システムの実装
5. **開発基盤**: テスト環境構築

### 🎯 中長期目標（1～3ヶ月）
6. **API層の改善**: 統一クライアント、エラーハンドリング
7. **最新技術活用**: React 19、TypeScript 5.9機能
8. **品質保証**: テストカバレッジ60%達成

**現在最も重要なのはPhase 0の実行です。ビルドが成功しない限り、他の改善は実施できません。**