# URL駆動型状態管理 実装ガイド

## 📋 概要

本ドキュメントは、PS-PSプロジェクトにおけるURL駆動型状態管理への移行について、具体的な実装方法を詳細に記載したガイドです。TanStack Router v1.131とZustand v5の最新機能を活用し、URLとZustandストアの緩い同期を実現します。

## 🎯 実装方針

### 基本原則

1. **URL as Source of Truth**: 共有可能な状態はURLを真の情報源とする
2. **Lazy Synchronization**: URLにパラメータがある場合はURLから読み込み、ない場合はZustandから補完
3. **Type Safety**: Valibotによるスキーマ検証で型安全性を保証（Zodより98%小さいバンドルサイズ）
4. **Performance**: 不要な再レンダリングを避ける最適化

### 状態管理の分類

| 状態の種類 | 保存先 | 例 |
|-----------|--------|-----|
| 共有可能状態 | URL + Zustand | フィルター、ページ番号、選択項目 |
| UIローカル状態 | Zustand (localStorage) | サイドバー開閉、テーマ設定 |
| 一時的状態 | コンポーネント内 | フォーム入力中の値 |

## 📁 対象ファイルと変更内容

### 1. 新規作成: URL同期ストア (`src/stores/useUrlSyncStore.ts`)

**新規作成ファイル:**

```typescript
import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { shallow } from 'zustand/shallow';
import type { NavigateOptions } from '@tanstack/react-router';

/**
 * URL同期用の基底インターフェース
 */
export interface UrlSyncState {
  // URL同期する状態
  syncFromURL: (searchParams: Record<string, any>) => void;
  syncToURL: (navigate: (opts: NavigateOptions) => void) => void;
  _lastSyncedParams?: Record<string, any>;
}

/**
 * URLとZustandの同期を管理するユーティリティ
 */
export function createUrlSyncStore<T extends Record<string, any>>(
  name: string,
  initialState: T,
  urlKeys: (keyof T)[]
) {
  return create<T & UrlSyncState>()(
    subscribeWithSelector((set, get) => ({
      ...initialState,

      syncFromURL: (searchParams) => {
        const updates: Partial<T> = {};
        let hasUpdates = false;

        // URLから該当するキーの値を取得
        urlKeys.forEach((key) => {
          if (searchParams[key as string] !== undefined) {
            updates[key] = searchParams[key as string];
            hasUpdates = true;
          }
        });

        // 更新がある場合のみsetを実行
        if (hasUpdates) {
          set({
            ...updates,
            _lastSyncedParams: searchParams,
          } as Partial<T & UrlSyncState>);
        }
      },

      syncToURL: (navigate) => {
        const state = get();
        const urlParams: Record<string, any> = {};

        // Zustandの状態からURL用のパラメータを構築
        urlKeys.forEach((key) => {
          const value = state[key];
          // undefined, null, 空文字列は除外
          if (value !== undefined && value !== null && value !== '') {
            urlParams[key as string] = value;
          }
        });

        // URLを更新（replaceで履歴を汚さない）
        navigate({
          search: (prev) => ({
            ...prev,
            ...urlParams,
          }),
          replace: true,
        });
      },
    }))
  );
}

/**
 * デバウンス付きURL同期フック
 */
export function useDebouncedUrlSync(
  syncFn: () => void,
  delay: number = 300
): () => void {
  const timeoutRef = useRef<NodeJS.Timeout>();

  return useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(syncFn, delay);
  }, [syncFn, delay]);
}
```

### 2. 新規作成: 統合UIストア (`src/stores/useUIStore.ts`)

**新規作成ファイル:**

```typescript
import { createUrlSyncStore } from './useUrlSyncStore';
import type { PipData } from '@/types';

/**
 * PS-PS画面のUI状態を管理する統合ストア
 * URL同期対象とローカル状態を明確に分離
 */

// URL同期する状態の型定義
interface UrlSyncedState {
  // 検索・フィルター関連
  searchTriggered: boolean;
  searchQuery: string;
  selectedCategory: string;
  
  // ページネーション
  currentPage: number;
  pageSize: number;
  
  // 選択状態
  selectedPipCode: string | null;
  selectedJobNo: string | null;
  selectedFgCode: string | null;
  
  // ビューモード
  viewMode: 'list' | 'grid' | 'detail';
  editMode: boolean;
}

// ローカルUI状態の型定義
interface LocalUIState {
  // サイドバー
  isSidebarOpen: boolean;
  sidebarWidth: number;
  
  // 一時的な選択状態
  selectedPipData: PipData | null;
  itemAssignmentMode: string;
  
  // UI設定
  showFilters: boolean;
  theme: 'light' | 'dark';
}

// アクションの型定義
interface UIActions {
  // URL同期状態の更新
  updateSearch: (query: string) => void;
  updatePage: (page: number, pageSize?: number) => void;
  selectPip: (pipCode: string | null) => void;
  setViewMode: (mode: 'list' | 'grid' | 'detail') => void;
  
  // ローカル状態の更新
  toggleSidebar: () => void;
  setSidebarWidth: (width: number) => void;
  setSelectedPipData: (data: PipData | null) => void;
  toggleFilters: () => void;
}

// URL同期する状態のストア
export const useUrlSyncedUIStore = createUrlSyncStore<UrlSyncedState>(
  'ps-ps-url-state',
  {
    searchTriggered: false,
    searchQuery: '',
    selectedCategory: '',
    currentPage: 1,
    pageSize: 20,
    selectedPipCode: null,
    selectedJobNo: null,
    selectedFgCode: null,
    viewMode: 'list',
    editMode: false,
  },
  [
    'searchQuery',
    'selectedCategory',
    'currentPage',
    'pageSize',
    'selectedPipCode',
    'viewMode',
    'editMode',
  ]
);

// ローカルUI状態のストア
export const useLocalUIStore = create<LocalUIState & UIActions>()(
  persist(
    (set, get) => ({
      // 初期状態
      isSidebarOpen: true,
      sidebarWidth: 240,
      selectedPipData: null,
      itemAssignmentMode: 'itemManagement',
      showFilters: true,
      theme: 'light',

      // アクション
      toggleSidebar: () => set((state) => ({ 
        isSidebarOpen: !state.isSidebarOpen 
      })),
      
      setSidebarWidth: (width) => set({ sidebarWidth: width }),
      
      setSelectedPipData: (data) => set({ selectedPipData: data }),
      
      toggleFilters: () => set((state) => ({ 
        showFilters: !state.showFilters 
      })),
      
      updateSearch: (query) => {
        useUrlSyncedUIStore.setState({ 
          searchQuery: query,
          currentPage: 1, // 検索時はページをリセット
        });
      },
      
      updatePage: (page, pageSize) => {
        const updates: Partial<UrlSyncedState> = { currentPage: page };
        if (pageSize) updates.pageSize = pageSize;
        useUrlSyncedUIStore.setState(updates);
      },
      
      selectPip: (pipCode) => {
        useUrlSyncedUIStore.setState({ selectedPipCode: pipCode });
      },
      
      setViewMode: (mode) => {
        useUrlSyncedUIStore.setState({ viewMode: mode });
      },
    }),
    {
      name: 'ps-ps-local-ui',
      // URLに同期しない項目のみlocalStorageに保存
      partialize: (state) => ({
        isSidebarOpen: state.isSidebarOpen,
        sidebarWidth: state.sidebarWidth,
        showFilters: state.showFilters,
        theme: state.theme,
      }),
    }
  )
);

/**
 * URL同期とローカル状態を統合して使うカスタムフック
 */
export function useUIState() {
  const urlState = useUrlSyncedUIStore();
  const localState = useLocalUIStore();
  
  return {
    // URL同期状態
    searchQuery: urlState.searchQuery,
    selectedCategory: urlState.selectedCategory,
    currentPage: urlState.currentPage,
    pageSize: urlState.pageSize,
    selectedPipCode: urlState.selectedPipCode,
    viewMode: urlState.viewMode,
    editMode: urlState.editMode,
    
    // ローカル状態
    isSidebarOpen: localState.isSidebarOpen,
    showFilters: localState.showFilters,
    selectedPipData: localState.selectedPipData,
    
    // アクション
    actions: {
      updateSearch: localState.updateSearch,
      updatePage: localState.updatePage,
      selectPip: localState.selectPip,
      setViewMode: localState.setViewMode,
      toggleSidebar: localState.toggleSidebar,
      toggleFilters: localState.toggleFilters,
      setSelectedPipData: localState.setSelectedPipData,
    },
  };
}
```

### 3. 変更: ルートコンポーネント (`src/routes/ps-ps/route.tsx`)

**変更前:**

```typescript
import { createFileRoute, Outlet, useLocation } from '@tanstack/react-router';
import type React from 'react';
import { createContext, useState } from 'react';
import { Message } from '@/components/Message';
import { Topbar } from '@/components/Topbar';
import type { PipData } from '@/types';
import { Sidebar } from '../../features/pip-randing/components';

/*コンテキスト管理
 *  //Display by Selection等の選択状態を各コンポーネントをまたがって管理する
 */
export type PSysContextType = {
  // Display by Selectionボタンの押下状態を管理
  isSearchTriggered: boolean;
  setIsSearchTriggered: React.Dispatch<React.SetStateAction<boolean>>;
  // サイドバーの表示状態を管理(PIP管理画面)
  isSidebar: boolean;
  setIsSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  // PIP管理画面で選択されたpipDataの対象を管理
  selectedPipData: PipData;
  setSelectedPipData: React.Dispatch<React.SetStateAction<PipData>>;
  // ItemAssignmentViewを呼び出す際のモードを管理
  isItemAssignmentView: string;
  setIsItemAssignmentView: React.Dispatch<React.SetStateAction<string>>;
};

export const PSysContext = createContext<PSysContextType>({
  isSearchTriggered: false,
  setIsSearchTriggered: () => {},
  isSidebar: true,
  setIsSidebar: () => {},
  selectedPipData: {} as PipData,
  setSelectedPipData: () => {},
  isItemAssignmentView: '',
  setIsItemAssignmentView: () => {},
});

export const Route = createFileRoute('/ps-ps')({
  component: () => {
    const pathname = useLocation({
      select: (location) => location.pathname,
    });
    const exceptPathName = pathname.replace('/ps-ps/', '');
    const sidebarVisiblePaths = ['item-assignment', 'pips'];
    const showSidebar = sidebarVisiblePaths.includes(exceptPathName);

    // Display by Selectionボタンの押下状態を管理
    const [isSearchTriggered, setIsSearchTriggered] = useState(false);
    // サイドバーの表示状態を管理(PIP管理画面)
    const [isSidebar, setIsSidebar] = useState(true);
    // PIP管理画面で選択されたpipDataの対象を管理
    const [selectedPipData, setSelectedPipData] = useState({} as PipData);
    // ItemAssignmentViewを呼び出す際のモードを管理
    const [isItemAssignmentView, setIsItemAssignmentView] = 
      useState('itemManagement');

    return (
      <div className="flex flex-col h-screen">
        <div className="sticky top-0 z-50 shadow-sm">
          <Topbar />
          <Message />
        </div>
        <div className="flex flex-1">
          <PSysContext.Provider
            value={{
              isSearchTriggered,
              setIsSearchTriggered,
              isSidebar,
              setIsSidebar,
              selectedPipData,
              setSelectedPipData,
              isItemAssignmentView,
              setIsItemAssignmentView,
            }}
          >
            {showSidebar && isSidebar && <Sidebar />}
            <main className="flex-1 overflow-auto">
              <Outlet />
            </main>
          </PSysContext.Provider>
        </div>
      </div>
    );
  },
});
```

**変更後:**

```typescript
import { createFileRoute, Outlet, useLocation } from '@tanstack/react-router';
import * as v from 'valibot';
import { useEffect } from 'react';
import { Message } from '@/components/Message';
import { Topbar } from '@/components/Topbar';
import { Sidebar } from '../../features/pip-randing/components';
import { useUrlSyncedUIStore, useLocalUIStore } from '@/stores/useUIStore';
import { useUrlSync } from '@/hooks/useUrlSync';

// Search paramsのスキーマ定義（Valibotを使用）
const psysSearchSchema = v.object({
  search: v.optional(v.string()),
  category: v.optional(v.string()),
  page: v.optional(v.number()),
  pageSize: v.optional(v.number()),
  pipCode: v.optional(v.string()),
  viewMode: v.optional(v.picklist(['list', 'grid', 'detail'])),
  editMode: v.optional(v.boolean()),
});

export const Route = createFileRoute('/ps-ps')({
  // Search paramsの検証（Valibotのparse関数を使用）
  validateSearch: (search: Record<string, unknown>) => {
    return v.parse(psysSearchSchema, search);
  },

  // データの事前読み込み
  beforeLoad: ({ search }) => {
    // URLパラメータが存在する場合はZustandに同期
    if (Object.keys(search).length > 0) {
      useUrlSyncedUIStore.getState().syncFromURL(search);
    }
  },

  component: PSysLayout,
});

function PSysLayout() {
  const pathname = useLocation({
    select: (location) => location.pathname,
  });
  const navigate = Route.useNavigate();
  const search = Route.useSearch();

  // Zustand状態の取得
  const { isSidebarOpen } = useLocalUIStore();

  // URL同期フックの使用
  useUrlSync({
    store: useUrlSyncedUIStore,
    navigate,
    search,
    debounceMs: 300,
  });

  // パスに基づくサイドバー表示判定
  const exceptPathName = pathname.replace('/ps-ps/', '');
  const sidebarVisiblePaths = ['item-assignment', 'pips'];
  const shouldShowSidebar = sidebarVisiblePaths.includes(exceptPathName);

  // URLパラメータが空の場合、Zustandから初期値を設定
  useEffect(() => {
    if (Object.keys(search).length === 0) {
      const state = useUrlSyncedUIStore.getState();
      const defaultParams = {
        viewMode: state.viewMode,
        page: state.currentPage > 1 ? state.currentPage : undefined,
        pageSize: state.pageSize !== 20 ? state.pageSize : undefined,
      };

      // デフォルト値を持つパラメータのみURLに設定
      const hasParams = Object.values(defaultParams).some(v => v !== undefined);
      if (hasParams) {
        navigate({
          search: defaultParams,
          replace: true,
        });
      }
    }
  }, []);

  return (
    <div className="flex flex-col h-screen">
      {/* ヘッダー */}
      <div className="sticky top-0 z-50 shadow-sm">
        <Topbar />
        <Message />
      </div>
      
      {/* メインコンテンツエリア */}
      <div className="flex flex-1">
        {/* サイドバー */}
        {shouldShowSidebar && isSidebarOpen && <Sidebar />}
        
        {/* 子ルートの表示 */}
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
```

**変更内容の詳細:**
- **インポートの変更**: `zod`から`valibot`に変更。`import * as v from 'valibot'`の形式でインポート
- **スキーマ定義の変更**: 
  - `z.object()`から`v.object()`に変更
  - `z.string().optional()`から`v.optional(v.string())`に変更（Valibotは関数合成ではなく入れ子構造）
  - `z.enum()`から`v.picklist()`に変更（Valibotでのenum相当）
  - `.default({})`を削除（Valibotでは各フィールドで個別に設定）
- **バリデーション関数の変更**: `validateSearch`で直接スキーマを渡すのではなく、`v.parse()`関数を使用してバリデーションを実行
- **パフォーマンスの向上**: Valibotは必要な機能のみをインポートするため、バンドルサイズが最大98%削減される

### 4. 新規作成: URL同期カスタムフック (`src/hooks/useUrlSync.ts`)

**新規作成ファイル:**

```typescript
import { useEffect, useCallback, useRef } from 'react';
import { shallow } from 'zustand/shallow';
import type { NavigateOptions } from '@tanstack/react-router';

interface UseUrlSyncOptions {
  store: {
    subscribe: (listener: (state: any) => any, callback: () => void, options?: any) => () => void;
    getState: () => any;
    syncFromURL: (params: any) => void;
    syncToURL: (navigate: any) => void;
  };
  navigate: (opts: NavigateOptions) => void;
  search: Record<string, any>;
  debounceMs?: number;
  urlKeys?: string[];
}

/**
 * URLとZustandストアの双方向同期を管理するフック
 * 
 * 特徴:
 * - URLにパラメータがある場合: URL → Zustand（URLが優先）
 * - URLにパラメータがない場合: Zustand → URL（デフォルト値を設定）
 * - レース条件の防止
 * - デバウンス処理でパフォーマンス最適化
 */
export function useUrlSync({
  store,
  navigate,
  search,
  debounceMs = 300,
  urlKeys,
}: UseUrlSyncOptions) {
  const syncInProgressRef = useRef(false);
  const lastSyncedParamsRef = useRef<Record<string, any>>({});

  // URL → Zustand の同期（URLにパラメータがある場合）
  useEffect(() => {
    // 同期中フラグが立っている場合はスキップ
    if (syncInProgressRef.current) return;

    // URLパラメータが前回と同じ場合はスキップ（無限ループ防止）
    const searchStr = JSON.stringify(search);
    const lastStr = JSON.stringify(lastSyncedParamsRef.current);
    if (searchStr === lastStr) return;

    // URLパラメータがある場合のみZustandに同期
    if (Object.keys(search).length > 0) {
      syncInProgressRef.current = true;
      store.syncFromURL(search);
      lastSyncedParamsRef.current = search;

      // 同期完了後にフラグをリセット
      setTimeout(() => {
        syncInProgressRef.current = false;
      }, 50);
    }
  }, [search, store]);

  // Zustand → URL の同期（デバウンス付き）
  const syncToUrlDebounced = useCallback(() => {
    const timeoutId = setTimeout(() => {
      if (syncInProgressRef.current) return;

      syncInProgressRef.current = true;
      store.syncToURL(navigate);

      setTimeout(() => {
        syncInProgressRef.current = false;
      }, 50);
    }, debounceMs);

    return () => clearTimeout(timeoutId);
  }, [store, navigate, debounceMs]);

  // Zustand状態の変更を監視してURLに反映
  useEffect(() => {
    // 特定のキーのみを監視（パフォーマンス最適化）
    const selector = urlKeys
      ? (state: any) => urlKeys.reduce((acc, key) => {
          acc[key] = state[key];
          return acc;
        }, {} as any)
      : (state: any) => state;

    const unsubscribe = store.subscribe(
      selector,
      syncToUrlDebounced,
      { equalityFn: shallow }
    );

    return unsubscribe;
  }, [store, syncToUrlDebounced, urlKeys]);

  // URLパラメータが空の場合、Zustandのデフォルト値をURLに設定
  useEffect(() => {
    if (Object.keys(search).length === 0 && !syncInProgressRef.current) {
      const state = store.getState();
      const hasNonDefaultValues = urlKeys
        ? urlKeys.some(key => {
            const value = state[key];
            return value !== undefined && value !== null && value !== '' && value !== 0;
          })
        : false;

      if (hasNonDefaultValues) {
        syncInProgressRef.current = true;
        store.syncToURL(navigate);
        
        setTimeout(() => {
          syncInProgressRef.current = false;
        }, 50);
      }
    }
  }, []);

  return {
    isSyncing: syncInProgressRef.current,
  };
}
```

**作成内容の詳細:**
- **双方向同期の実装**: URLとZustandストアの間で双方向のデータ同期を管理するカスタムフック
- **レース条件の防止**: `syncInProgressRef`フラグを使用して、同期処理中の重複実行を防止
- **デバウンス処理**: Zustandの変更をURLに反映する際に、デバウンス処理を行いパフォーマンスを最適化（デフォルト300ms）
- **初期値の自動設定**: URLパラメータが空の場合、Zustandのデフォルト値を自動的にURLに設定
- **型安全性**: TypeScriptの型定義により、store、navigate、searchパラメータの型安全性を保証
- **選択的な監視**: `urlKeys`パラメータで監視対象のキーを指定可能、不要な再レンダリングを防止

### 5. 変更: PIP管理画面 (`src/routes/ps-ps/pips.tsx`)

**変更前の主要部分:**

```typescript
const Pips = () => {
  // 行の選択状態
  const [pipSelection, setPipSelection] = useState<Record<string, boolean>>({});
  // 現在チェックされている行数
  const [selectedCount, setSelectedCount] = useState(0);
  // 現在フィルターで表示されている件数
  const [filteredCount, setFilteredCount] = useState(0);
  // フィルター表示状態
  const [showFilters, setShowFilters] = useState(true);
  // 詳細表示するPIP
  const [clickedPipCode, setClickedPipCode] = useState<string | null>(null);

  // コンテキストから値を取得
  const { setIsSidebar, setSelectedPipData, setIsItemAssignmentView } =
    useContext(PSysContext);

  // ... 多数のuseEffectとローカルstate
```

**変更後:**

```typescript
import { createFileRoute } from '@tanstack/react-router';
import * as v from 'valibot';
import { useEffect, useState } from 'react';
import { AlertMessages } from '@/components/ui/alertMessages';
import { PipDetail } from '@/features/pip-management/components/PipDetail';
import { PipTable } from '@/features/pip-management/components/PipTable';
import { PipTableControls } from '@/features/pip-management/components/PipTableControls';
import { ItemAssignmentView } from '../../features/item-assignment/components/ItemAssignmentView';
import { useUIState, useLocalUIStore, useUrlSyncedUIStore } from '@/stores/useUIStore';
import { useUrlSync } from '@/hooks/useUrlSync';
import { useAlertStore } from '@/stores/useAlartStore';
import { usePipListGet } from '../../features/pip-management/hooks/usePipListGet';
import { usePipListDelete } from '../../features/pip-management/hooks/usePipListDelete';
import { getPipData } from '../../features/pip-management/utils/getPipData';
import type { Pip, PipData } from '@/types';

// Search paramsのスキーマ定義（Valibotを使用）
const pipsSearchSchema = v.object({
  search: v.optional(v.string()),
  category: v.optional(v.string()),
  page: v.optional(v.pipe(
    v.number(),
    v.minValue(1, 'ページ番号は1以上である必要があります')
  ), 1),
  pageSize: v.optional(v.pipe(
    v.number(),
    v.minValue(1, 'ページサイズは1以上である必要があります'),
    v.maxValue(100, 'ページサイズは100以下である必要があります')
  ), 20),
  selectedPip: v.optional(v.string()),
  editMode: v.optional(v.boolean(), false),
  viewMode: v.optional(v.picklist(['list', 'detail']), 'list'),
});

export const Route = createFileRoute('/ps-ps/pips')({
  validateSearch: (search: Record<string, unknown>) => {
    return v.parse(pipsSearchSchema, search);
  },

  // データの事前読み込み
  loader: async ({ search, context }) => {
    // URLからZustandへの同期
    if (Object.keys(search).length > 0) {
      useUrlSyncedUIStore.getState().syncFromURL({
        searchQuery: search.search,
        selectedCategory: search.category,
        currentPage: search.page,
        pageSize: search.pageSize,
        selectedPipCode: search.selectedPip,
        editMode: search.editMode,
        viewMode: search.viewMode === 'detail' ? 'detail' : 'list',
      });
    }

    // 必要に応じてデータのプリフェッチ
    return { search };
  },

  component: Pips,
});

function Pips() {
  const navigate = Route.useNavigate();
  const search = Route.useSearch();
  
  // UI状態の取得（URL同期とローカル状態を統合）
  const uiState = useUIState();
  const { showFilters, toggleFilters } = useLocalUIStore();
  
  // URL同期の設定
  useUrlSync({
    store: useUrlSyncedUIStore,
    navigate,
    search: {
      search: search.search,
      category: search.category,
      page: search.page,
      pageSize: search.pageSize,
      selectedPip: search.selectedPip,
      editMode: search.editMode,
      viewMode: search.viewMode,
    },
    debounceMs: 300,
    urlKeys: ['searchQuery', 'selectedCategory', 'currentPage', 'pageSize', 'selectedPipCode', 'editMode', 'viewMode'],
  });

  // テーブル用のローカル状態（URLに同期しない）
  const [pipSelection, setPipSelection] = useState<Record<string, boolean>>({});
  const [selectedCount, setSelectedCount] = useState(0);
  const [filteredCount, setFilteredCount] = useState(0);
  const [tableInstance, setTableInstance] = useState<Table<Pip> | null>(null);
  
  // PIPデータの状態管理
  const [pipData, setPipData] = useState<PipData>({ pips: [] });
  const [pipDetail, setPipDetail] = useState<Pip | null>(null);

  // アラートの状態
  const { isAlertVisible, alertMessages, showAlert } = useAlertStore();

  // 選択したJobNo、FG（これらは別のストアから取得）
  const { selectedJobNo } = useSelectedJobNoStore();
  const { selectedFG } = useSelectedFGStore();

  // PIPデータの取得
  const { refetch, isLoading } = usePipListGet(selectedJobNo, selectedFG?.fgCode);

  // 検索実行（URL変更時に自動実行）
  useEffect(() => {
    // searchQueryが変更された場合
    if (uiState.searchQuery && selectedJobNo && selectedFG) {
      const fetchData = async () => {
        try {
          const result = await refetch();
          if (result.data?.responseJSON) {
            const parsed = JSON.parse(result.data.responseJSON);
            const processed = getPipData(parsed);
            setPipData(processed);
          } else {
            setPipData({ pips: [] });
          }
        } catch (error) {
          showAlert(['SEARCH_FAILURE']);
          setPipData({ pips: [] });
        }
      };
      fetchData();
    }
  }, [uiState.searchQuery, selectedJobNo, selectedFG]);

  // 選択されたPIPの詳細を表示
  useEffect(() => {
    if (uiState.selectedPipCode && pipData.pips.length > 0) {
      const selected = pipData.pips.find(pip => pip.code === uiState.selectedPipCode);
      setPipDetail(selected || null);
    } else {
      setPipDetail(null);
    }
  }, [uiState.selectedPipCode, pipData]);

  // ページ変更ハンドラ
  const handlePageChange = (page: number) => {
    uiState.actions.updatePage(page);
  };

  // 検索ハンドラ
  const handleSearch = (query: string) => {
    uiState.actions.updateSearch(query);
  };

  // PIP選択ハンドラ
  const handlePipSelect = (pipCode: string | null) => {
    uiState.actions.selectPip(pipCode);
  };

  // 編集モードの切り替え
  const toggleEditMode = () => {
    navigate({
      search: (prev) => ({
        ...prev,
        editMode: !search.editMode,
      }),
    });
  };

  // 削除処理
  const { mutate: deleteMutate } = usePipListDelete();
  const handleDelete = () => {
    const selectedIndexes = Object.keys(pipSelection)
      .filter((index) => pipSelection[index])
      .map((index) => Number(index));

    const deleteTarget = pipData.pips.filter((_, index) =>
      selectedIndexes.includes(index)
    );

    deleteMutate(
      {
        userId: 'PSYSP014',
        jobNo: selectedJobNo,
        fgCode: selectedFG?.fgCode,
        deleteData: deleteTarget,
      },
      {
        onSuccess: (data: any) => {
          if (data.statusCode === '404') {
            showAlert(['AIP_ASSIGNED']);
          } else {
            showAlert(['PIP_DELETE']);
            setPipData({ pips: [] });
            setPipSelection({});
          }
        },
      }
    );
  };

  // 編集モードの場合は購入品管理画面を表示
  if (search.editMode) {
    return <ItemAssignmentView />;
  }

  return (
    <div className="h-screen bg-gray-100 p-6 overflow-hidden">
      {/* タイトル・ボタン群 */}
      <PipTableControls
        showFilters={showFilters}
        setShowFilters={toggleFilters}
        tableInstance={tableInstance}
        selectedCount={selectedCount}
        onDelete={handleDelete}
        onEdit={toggleEditMode}
        editMode={search.editMode}
      />

      {/* 件数表示 */}
      <div className="flex justify-end mb-2">
        <span className="text-sm text-gray-600">
          count: {filteredCount} / {pipData.pips.length}
        </span>
      </div>

      {/* メインコンテンツ */}
      <div className="max-w-10xl mx-auto h-full flex gap-4">
        {/* PIPテーブル */}
        <div className={search.viewMode === 'detail' ? 'w-1/2' : 'w-full'} className="h-[80%]">
          <PipTable
            data={pipData}
            showFilters={showFilters}
            clickedPipCode={uiState.selectedPipCode}
            setClickedPipCode={handlePipSelect}
            setPipDetail={setPipDetail}
            onFilteredCountChange={setFilteredCount}
            onTableReady={setTableInstance}
            rowSelection={pipSelection}
            setRowSelection={setPipSelection}
            onSelectedRowCountChange={setSelectedCount}
          />
        </div>

        {/* PIP詳細表示エリア（詳細ビューモードの場合） */}
        {search.viewMode === 'detail' && (
          <div className="w-1/2">
            <PipDetail pipDetail={pipDetail} />
          </div>
        )}
      </div>

      {/* アラート表示 */}
      {isAlertVisible && alertMessages && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
          <AlertMessages messages={alertMessages} />
        </div>
      )}
    </div>
  );
}
```

**変更内容の詳細:**
- **Valibotへの移行**: 
  - `z.object()`から`v.object()`に変更
  - `z.string().optional()`から`v.optional(v.string())`に変更（Valibotの基本的なoptional構文）
  - `z.number().min(1).default(1)`から`v.optional(v.pipe(v.number(), v.minValue(1)), 1)`に変更
    - `v.pipe()`を使用して複数のバリデーションを連結（Valibotの特徴的なパターン）
    - エラーメッセージを日本語でカスタマイズ可能
  - `z.enum(['list', 'detail'])`から`v.picklist(['list', 'detail'])`に変更
- **デフォルト値の設定**: `v.optional()`の第2引数でデフォルト値を指定（例: `v.optional(v.boolean(), false)`）
- **バリデーションメッセージ**: 各バリデーションルールに日本語のエラーメッセージを追加
- **パイプライン処理**: `v.pipe()`を使用して、複数のバリデーションを順番に適用（数値の範囲チェックなど）
- **型推論の向上**: Valibotは型推論が優れており、スキーマから自動的に型を生成

### 6. 変更: ベンダー割当画面 (`src/routes/ps-ps/vendor-assignment.tsx`)

**変更前の主要部分:**

```typescript
interface VendorAssignmentSearch {
  selectedPips: string;
  mode?: 'pip' | 'aip';
}

export const Route = createFileRoute('/ps-ps/vendor-assignment')({
  validateSearch: (search: Record<string, unknown>): VendorAssignmentSearch => {
    return {
      selectedPips: search.selectedPips as string,
      mode: (search.mode as 'pip' | 'aip') || 'pip',
    };
  },
  // ...
});
```

**変更後:**

```typescript
import { createFileRoute } from '@tanstack/react-router';
import * as v from 'valibot';
import { useEffect, useRef, useState } from 'react';
import { AlertMessages } from '@/components/ui/alertMessages';
import { VendorAssignment } from '@/features/vendor-assignment';
import { useUIState } from '@/stores/useUIStore';
import { useUrlSync } from '@/hooks/useUrlSync';
import { useAlertStore } from '@/stores/useAlartStore';
import { useSelectedFGStore } from '@/stores/useSelectedFgStore';
import { useSelectedJobNoStore } from '@/stores/useSelectedJobNoStore';
import type { Pip, Vendor } from '@/types';
import { useAipGenerate } from '../../features/vendor-assignment/hooks/useAipGenerate';
import { useVendorList } from '../../features/vendor-assignment/hooks/useVendorList';

// Valibotによる型安全なスキーマ定義
const vendorAssignmentSearchSchema = v.object({
  selectedPips: v.pipe(
    v.string(),
    v.transform((str) => {
      try {
        return JSON.parse(str) as Pip[];
      } catch {
        return [];
      }
    })
  ),
  mode: v.optional(v.picklist(['pip', 'aip']), 'pip'),
  // 追加のフィルターオプション
  vendorFilter: v.optional(v.object({
    type: v.optional(v.string()),
    region: v.optional(v.string()),
    capacity: v.optional(v.picklist(['small', 'medium', 'large'])),
  })),
  page: v.optional(v.pipe(
    v.number(),
    v.minValue(1, 'ページ番号は1以上である必要があります')
  ), 1),
  pageSize: v.optional(v.pipe(
    v.number(),
    v.minValue(1, 'ページサイズは1以上である必要があります'),
    v.maxValue(100, 'ページサイズは100以下である必要があります')
  ), 20),
});

// Valibotからの型推論
type VendorAssignmentSearch = v.InferOutput<typeof vendorAssignmentSearchSchema>;

export const Route = createFileRoute('/ps-ps/vendor-assignment')({
  validateSearch: (search: Record<string, unknown>) => {
    return v.parse(vendorAssignmentSearchSchema, search);
  },

  // データの事前読み込みと状態同期
  loaderDeps: ({ search }) => ({ 
    selectedPips: search.selectedPips,
    mode: search.mode,
    filters: search.vendorFilter,
  }),

  loader: async ({ deps, context }) => {
    const { selectedPips, mode, filters } = deps;

    // 権限チェック
    if (mode === 'aip') {
      // AIPモードの権限確認（必要に応じて実装）
    }

    // ベンダーデータの事前取得（必要に応じて）
    // const vendors = await context.queryClient.ensureQueryData(...)

    return {
      selectedPips,
      isAipMode: mode === 'aip',
      filters,
    };
  },

  component: VendorAssignmentRoute,
});

function VendorAssignmentRoute() {
  const { selectedPips, isAipMode, filters } = Route.useLoaderData();
  const navigate = Route.useNavigate();
  const search = Route.useSearch();

  // UI状態の管理
  const uiState = useUIState();

  // URL同期の設定
  useUrlSync({
    store: useUrlSyncedUIStore,
    navigate,
    search: {
      mode: search.mode,
      page: search.page,
      pageSize: search.pageSize,
      vendorFilter: search.vendorFilter,
    },
    debounceMs: 300,
  });

  // 選択したJobNo、FG
  const { selectedJobNo } = useSelectedJobNoStore();
  const { selectedFG } = useSelectedFGStore();
  
  // ベンダーリストの取得
  const { data: fetchedItems } = useVendorList(selectedFG?.fgCode);
  
  // アラートの状態
  const { isAlertVisible, alertMessages, showAlert } = useAlertStore();

  // ローカル状態（URLに同期しない）
  const [selectedVendors, setSelectedVendors] = useState<string[]>([]);
  const [availableVendors, setAvailableVendors] = useState<Vendor[]>([]);
  const hasInitialized = useRef(false);

  // 初期化処理
  useEffect(() => {
    if (!hasInitialized.current && fetchedItems) {
      hasInitialized.current = true;

      const parsed = JSON.parse(fetchedItems.responseJSON);
      const vendorList: Vendor[] = JSON.parse(parsed.vendor);

      // フィルター適用
      let filtered = vendorList;
      if (filters) {
        filtered = vendorList.filter((vendor) => {
          if (filters.type && vendor.type !== filters.type) return false;
          if (filters.region && vendor.region !== filters.region) return false;
          if (filters.capacity && vendor.capacity !== filters.capacity) return false;
          return true;
        });
      }

      // 割り当て済みベンダーを除外
      const assignedVendorIds = new Set(
        selectedPips.flatMap((pip) => pip.vendors.map((v) => v.code))
      );
      const available = filtered.filter(
        (vendor) => !assignedVendorIds.has(vendor.vendorCode)
      );
      setAvailableVendors(available);

      // 割り当て済みベンダーを設定（AIP編集モード）
      const assigned = vendorList.filter((vendor) =>
        assignedVendorIds.has(vendor.vendorCode)
      );
      if (assigned.length > 0) {
        setSelectedVendors(assigned);
      }
    }
  }, [fetchedItems, selectedPips, filters]);

  // フィルター変更ハンドラ
  const handleFilterChange = (newFilter: Partial<typeof filters>) => {
    navigate({
      search: (prev) => ({
        ...prev,
        vendorFilter: {
          ...prev.vendorFilter,
          ...newFilter,
        },
        page: 1, // フィルター変更時はページをリセット
      }),
      replace: true,
    });
  };

  // ページング処理
  const handlePageChange = (page: number) => {
    navigate({
      search: (prev) => ({
        ...prev,
        page,
      }),
      replace: true,
    });
  };

  // AIP生成ハンドル
  const { mutate: aipGenerateMutate } = useAipGenerate();
  const handleAipCreate = () => {
    aipGenerateMutate(
      {
        userId: 'PSYSP014',
        jobNo: selectedJobNo,
        fgCode: selectedFG?.fgCode,
        targetVendors: selectedVendors,
        pipCode: selectedPips[0].code,
      },
      {
        onSuccess: () => {
          showAlert(['AIP_SUCCESS']);
          handleBack();
        },
        onError: () => {
          showAlert(['AIP_FAILURE']);
        },
      }
    );
  };

  // PIPの更新（URLに反映）
  const handlePipsUpdate = (updatedPips: Pip[]) => {
    navigate({
      to: '.',
      search: {
        ...search,
        selectedPips: JSON.stringify(updatedPips),
      },
      replace: true,
    });
  };

  const handleBack = () => {
    navigate({ to: '/ps-ps/pips' });
  };

  return (
    <>
      <VendorAssignment
        selectedPips={selectedPips}
        availableVendors={availableVendors}
        setAvailableVendors={setAvailableVendors}
        isAipMode={isAipMode}
        onPipsUpdate={handlePipsUpdate}
        onBack={handleBack}
        onCreateAip={handleAipCreate}
        selectedVendors={selectedVendors}
        setSelectedVendors={setSelectedVendors}
        // フィルター関連の新しいprops
        filters={filters}
        onFilterChange={handleFilterChange}
        currentPage={search.page}
        pageSize={search.pageSize}
        onPageChange={handlePageChange}
      />
      
      {/* アラートメッセージ */}
      {isAlertVisible && alertMessages && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
          <AlertMessages messages={alertMessages} />
        </div>
      )}
    </>
  );
}
```

**変更内容の詳細:**
- **スキーマ定義の移行**:
  - `z.string().transform()`から`v.pipe(v.string(), v.transform())`に変更
    - Valibotは`pipe`関数を使って複数の処理を連結する設計
    - transformの中でJSON.parseを実行し、失敗時は空配列を返す
  - `z.enum(['pip', 'aip']).default('pip')`から`v.optional(v.picklist(['pip', 'aip']), 'pip')`に変更
    - Valibotでは`picklist`が列挙型に相当
    - デフォルト値は`optional`の第2引数で指定
  - ネストされたオブジェクトも同様にValibotの構文に変換
- **型推論の変更**: 
  - `z.infer<typeof schema>`から`v.InferOutput<typeof schema>`に変更
  - Valibotは`InferInput`（入力型）と`InferOutput`（出力型）を区別
- **バリデーション関数**: `validateSearch`で`v.parse()`を使用して検証とパース処理を実行
- **エラーメッセージ**: 各バリデーションルールに日本語のエラーメッセージを追加し、ユーザーフレンドリーに

## 🚀 実装手順

### Step 1: 基盤の準備（1日目）

1. **依存関係のインストール**
   ```bash
   bun add valibot
   ```

2. **新規ファイルの作成**
   - `src/stores/useUrlSyncStore.ts`
   - `src/stores/useUIStore.ts`
   - `src/hooks/useUrlSync.ts`

### Step 2: ストアの移行（2日目）

1. **既存のContext削除**
   - `PSysContext`を段階的に削除

2. **新しいストアへの移行**
   - 各コンポーネントでContext使用箇所を新ストアに置換

### Step 3: ルートの更新（3日目）

1. **スキーマ定義の追加**
   - 各ルートファイルにValibotスキーマを定義

2. **loader/beforeLoadの実装**
   - データの事前読み込みとURL同期

### Step 4: コンポーネントの更新（4-5日目）

1. **URL同期フックの適用**
   - 各コンポーネントで`useUrlSync`を使用

2. **状態管理の切り替え**
   - ローカルstateからストア使用に変更

### Step 5: テストと最適化（6日目）

1. **動作確認**
   - URL共有機能のテスト
   - リロード耐性の確認

2. **パフォーマンス最適化**
   - 不要な再レンダリングの削減

## 🎯 移行のメリット

### Valibotを採用するメリット

1. **バンドルサイズの大幅削減**
   - Zodと比較して最大98%のサイズ削減（13.5KB → 1.37KB）
   - Tree-shakingによって使用する機能のみがバンドルに含まれる
   - クライアントサイドアプリケーションで特に効果的

2. **パフォーマンスの向上**
   - 実行速度がZodの約2倍
   - 起動時のオーバーヘッドが最小
   - 大規模なスキーマでも高速動作

3. **より明確なバリデーションパイプライン**
   ```typescript
   // Valibotのpipe構文により、処理の流れが明確
   v.pipe(
     v.string(),           // 文字列であることを確認
     v.trim(),            // 前後の空白を削除
     v.minLength(1),      // 最小文字数チェック
     v.transform(Number), // 数値に変換
     v.minValue(1)        // 最小値チェック
   )
   ```

### 即座に得られるメリット

1. **URL共有可能**
   - 検索条件やフィルター状態を含むURLを共有できる
   - 例: `/ps-ps/pips?search=ABC&page=2&viewMode=detail`

2. **ブラウザナビゲーション対応**
   - 戻る/進むボタンで状態が正しく復元

3. **リロード耐性**
   - ページリロードしても状態が保持される

### 中長期的メリット

1. **開発効率向上**
   - 状態管理が明確に分離され、デバッグが容易に

2. **テスト容易性**
   - URL経由で特定の状態を再現できる

3. **SEO対応**
   - 将来的にSSR/SSGを導入する際の準備

## 📊 パフォーマンス最適化

### レンダリング最適化

```typescript
// ファイングレインドセレクター使用例
const searchQuery = useUrlSyncedUIStore(state => state.searchQuery);
const currentPage = useUrlSyncedUIStore(state => state.currentPage);

// 複数の値を取得する場合はshallow比較
const { searchQuery, currentPage } = useUrlSyncedUIStore(
  state => ({ 
    searchQuery: state.searchQuery,
    currentPage: state.currentPage 
  }),
  shallow
);
```

### デバウンス戦略

| アクション | デバウンス時間 | 理由 |
|-----------|---------------|------|
| 検索入力 | 300ms | ユーザー入力の完了を待つ |
| フィルター変更 | 100ms | 即座に反映しつつ連続変更に対応 |
| ページング | 0ms | 即座に反映（デバウンス不要） |

## 🔧 トラブルシューティング

### よくある問題と解決策

1. **無限ループが発生する場合**
   - `syncInProgressRef`フラグが正しく設定されているか確認
   - `shallow`比較を使用しているか確認

2. **URLが更新されない場合**
   - `replace: true`オプションを使用しているか確認
   - デバウンス時間が長すぎないか確認

3. **初期値が反映されない場合**
   - `beforeLoad`でURL同期が実行されているか確認
   - Zustandの初期値設定を確認

## 🎓 ベストプラクティス

### 1. 状態の分類を明確に

```typescript
// ✅ Good: 明確な分離
const urlSyncedState = {
  searchQuery: '',    // URL同期
  currentPage: 1,     // URL同期
  selectedId: null,   // URL同期
};

const localUIState = {
  sidebarOpen: true,  // ローカル（localStorage）
  theme: 'light',     // ローカル（localStorage）
};

// ❌ Bad: 混在した状態管理
const mixedState = {
  searchQuery: '',    // URL同期？
  sidebarOpen: true,  // ローカル？
  currentPage: 1,     // 不明確
};
```

### 2. URLパラメータの命名規則

```typescript
// ✅ Good: 簡潔で意味が明確
?search=abc&page=2&view=grid

// ❌ Bad: 冗長または不明確
?searchQueryString=abc&currentPageNumber=2&viewModeType=grid
```

### 3. デフォルト値の扱い

```typescript
// ✅ Good: デフォルト値はURLに含めない
const urlParams = {
  page: page > 1 ? page : undefined,
  pageSize: pageSize !== 20 ? pageSize : undefined,
};

// ❌ Bad: すべての値をURLに含める
const urlParams = {
  page: page,        // 1でもURLに含まれる
  pageSize: pageSize, // 20でもURLに含まれる
};
```

## 🔄 段階的移行戦略

### Phase 1: 準備（影響範囲: 小）
- 新しいストアとフックを作成
- 既存機能に影響なし

### Phase 2: 並行稼働（影響範囲: 中）
- 新機能から新しいパターンを採用
- 既存機能は段階的に移行

### Phase 3: 完全移行（影響範囲: 大）
- すべてのContext使用を削除
- 全画面でURL同期を実装

## 📈 成果測定

### 定量的指標
- URL共有の利用率
- ページリロード後の離脱率減少
- 開発時間の短縮（新機能追加時）

### 定性的指標
- 開発者体験の向上
- デバッグの容易さ
- コードの保守性向上

## 🏆 さらに進んだ実装案

### 1. URL圧縮による最適化（Valibot版）

```typescript
// 長いJSONをbase64エンコードして圧縮
import { compress, decompress } from 'lz-string';
import * as v from 'valibot';

// Valibotのカスタムバリデーション付き圧縮スキーマ
const compressedSearchSchema = v.pipe(
  v.string(),
  v.transform((str) => {
    try {
      const decompressed = decompress(str);
      return JSON.parse(decompressed);
    } catch (error) {
      // エラー時は空オブジェクトを返す
      return {};
    }
  }),
  // 解凍後のデータを再度バリデーション
  v.check((value) => typeof value === 'object', '無効な圧縮データです')
);

// URL例: /ps-ps/pips?state=eyJzZWFyY2giOiJhYmMiLCJwYWdlIjoyfQ==
```

### 2. Valibotによる高度なURLパラメータ変換

```typescript
// 複雑なURL変換パターン
const advancedUrlSchema = v.object({
  // CSV文字列を配列に変換
  tags: v.optional(
    v.pipe(
      v.string(),
      v.transform((str) => str.split(',').filter(Boolean)),
      v.array(v.string()),
      v.minLength(1, '少なくとも1つのタグが必要です')
    ),
    []
  ),
  
  // 日付範囲の処理
  dateRange: v.optional(
    v.pipe(
      v.string(),
      v.regex(/^\d{4}-\d{2}-\d{2}~\d{4}-\d{2}-\d{2}$/, '無効な日付範囲形式です'),
      v.transform((str) => {
        const [start, end] = str.split('~');
        return {
          start: new Date(start),
          end: new Date(end)
        };
      }),
      v.check(
        (range) => range.start <= range.end,
        '開始日は終了日より前である必要があります'
      )
    )
  ),
  
  // ソートパラメータ（複数フィールド対応）
  sort: v.optional(
    v.pipe(
      v.string(),
      v.transform((str) => {
        return str.split(',').map(field => {
          const isDesc = field.startsWith('-');
          return {
            field: isDesc ? field.slice(1) : field,
            order: isDesc ? 'desc' : 'asc'
          };
        });
      })
    ),
    []
  )
});
```

### 3. URL履歴管理

```typescript
// 最近アクセスしたURLを保存
const useUrlHistory = create((set, get) => ({
  history: [] as string[],
  addToHistory: (url: string) => {
    set(state => ({
      history: [url, ...state.history.filter(u => u !== url)].slice(0, 10)
    }));
  },
}));
```

### 4. プリセット機能

```typescript
// よく使う検索条件をプリセットとして保存
const useSearchPresets = create(
  persist(
    (set, get) => ({
      presets: [] as Array<{
        name: string;
        params: Record<string, any>;
      }>,
      savePreset: (name: string, params: Record<string, any>) => {
        set(state => ({
          presets: [...state.presets, { name, params }]
        }));
      },
      loadPreset: (name: string) => {
        const preset = get().presets.find(p => p.name === name);
        if (preset) {
          // URLに適用
          navigate({ search: preset.params });
        }
      },
    }),
    { name: 'search-presets' }
  )
);
```

## まとめ

このURL駆動型状態管理への移行により、PS-PSプロジェクトは以下を実現します：

1. **ユーザビリティの向上**: URL共有、ブックマーク、履歴管理
2. **開発効率の改善**: 明確な状態管理、優れたデバッグ体験
3. **保守性の向上**: 型安全性、テスト容易性、拡張性
4. **パフォーマンスの最適化**: Valibotにより最大98%のバンドルサイズ削減

TanStack Router v1.131、Zustand v5、そしてValibot v1の最新機能を最大限活用し、モダンなReactアプリケーションのベストプラクティスに準拠した実装となります。特にValibotの採用により、軽量かつ高性能なバリデーション処理を実現し、クライアントサイドアプリケーションに最適な構成となっています。