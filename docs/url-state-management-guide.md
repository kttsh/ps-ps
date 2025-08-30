# URL駆動型状態管理 段階的移行ガイド

## 📋 概要

本ドキュメントは、PS-PSプロジェクトにおけるURL駆動型状態管理への**段階的な移行**について記載したガイドです。最小限の変更から始めて、段階的に完全なURL駆動型状態管理へ移行する実践的なアプローチを採用します。

## 🎯 移行戦略

### 段階的アプローチの方針

**Phase 1（現在）**: 最重要パラメータのみURL管理
- `jobno`: ジョブ番号
- `fgcode`: FGコード  
- `pipcode`: PIPコード
- **その他の状態**: 現状のContext/ローカルstateのまま維持

**Phase 2（将来）**: 検索・フィルター関連をURL管理
- 検索クエリ、カテゴリ、ページング等を追加

**Phase 3（将来）**: 完全なURL駆動型へ移行
- すべての共有可能状態をURL管理

### なぜ段階的移行なのか

1. **リスク最小化**: 一度にすべてを変更せず、安定性を保ちながら移行
2. **学習曲線の緩和**: チームが新しいパターンに慣れる時間を確保
3. **即座の価値提供**: 最も重要な機能（ジョブ/FG/PIP選択の共有）から恩恵を受ける
4. **柔軟な調整**: 各フェーズでフィードバックを収集し、次の実装を改善

## 📁 Phase 1: 最小限のURL管理実装

### 1. 対象パラメータ

Phase 1では以下の3つのパラメータのみをURLで管理します：

| パラメータ | 説明 | 例 | 用途 |
|-----------|------|-----|------|
| `jobno` | ジョブ番号 | `JOB001` | プロジェクト/作業の識別 |
| `fgcode` | FGコード | `FG123` | 機能グループの識別 |
| `pipcode` | PIPコード | `PIP456` | 購入品の識別 |

**URL例**: `/ps-ps/pips?jobno=JOB001&fgcode=FG123&pipcode=PIP456`

### 2. 実装ファイル構成

```
src/
├── hooks/
│   └── useUrlParams.ts          # URL パラメータ管理用フック（新規）
├── routes/
│   └── ps-ps/
│       ├── route.tsx            # 親ルート（軽微な変更）
│       ├── pips.tsx             # PIP管理画面（軽微な変更）
│       └── vendor-assignment.tsx # ベンダー割当画面（軽微な変更）
└── [その他のファイルは変更なし]
```

## 🔧 実装詳細

### 1. 新規作成: URLパラメータ管理フック (`src/hooks/useUrlParams.ts`)

```typescript
import { useNavigate, useSearch } from '@tanstack/react-router';
import { useCallback, useEffect } from 'react';
import * as v from 'valibot';

// Phase 1: 最小限のパラメータのみ
const urlParamsSchema = v.object({
  jobno: v.optional(v.string()),
  fgcode: v.optional(v.string()),
  pipcode: v.optional(v.string()),
});

type UrlParams = v.InferOutput<typeof urlParamsSchema>;

/**
 * Phase 1: 最小限のURL管理
 * jobno, fgcode, pipcodeのみをURLで管理する軽量なフック
 */
export function useUrlParams() {
  const navigate = useNavigate();
  const search = useSearch({ strict: false });

  // URLパラメータの取得（型安全）
  const params: UrlParams = {
    jobno: search.jobno as string | undefined,
    fgcode: search.fgcode as string | undefined,
    pipcode: search.pipcode as string | undefined,
  };

  // URLパラメータの更新
  const updateParams = useCallback((updates: Partial<UrlParams>) => {
    navigate({
      search: (prev) => {
        const newParams = { ...prev };
        
        // 値がundefinedの場合はパラメータを削除
        Object.entries(updates).forEach(([key, value]) => {
          if (value === undefined || value === null || value === '') {
            delete newParams[key];
          } else {
            newParams[key] = value;
          }
        });
        
        return newParams;
      },
      replace: true, // 履歴を汚さない
    });
  }, [navigate]);

  // 特定のパラメータをクリア
  const clearParams = useCallback((keys?: Array<keyof UrlParams>) => {
    if (!keys) {
      // すべてクリア
      navigate({ search: {} });
    } else {
      navigate({
        search: (prev) => {
          const newParams = { ...prev };
          keys.forEach(key => delete newParams[key]);
          return newParams;
        },
        replace: true,
      });
    }
  }, [navigate]);

  return {
    params,
    updateParams,
    clearParams,
    // 便利なヘルパー
    hasJobNo: !!params.jobno,
    hasFgCode: !!params.fgcode,
    hasPipCode: !!params.pipcode,
  };
}
```

### 2. 変更: 親ルート (`src/routes/ps-ps/route.tsx`)

**最小限の変更のみ**：

```typescript
import { createFileRoute, Outlet, useLocation } from '@tanstack/react-router';
import * as v from 'valibot';
import type React from 'react';
import { createContext, useState } from 'react';
import { Message } from '@/components/Message';
import { Topbar } from '@/components/Topbar';
import type { PipData } from '@/types';
import { Sidebar } from '../../features/pip-randing/components';

// Phase 1: 最小限のURLパラメータのみ検証
const psysSearchSchema = v.object({
  jobno: v.optional(v.string()),
  fgcode: v.optional(v.string()),
  pipcode: v.optional(v.string()),
});

// 既存のContext定義はそのまま維持
export type PSysContextType = {
  isSearchTriggered: boolean;
  setIsSearchTriggered: React.Dispatch<React.SetStateAction<boolean>>;
  isSidebar: boolean;
  setIsSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  selectedPipData: PipData;
  setSelectedPipData: React.Dispatch<React.SetStateAction<PipData>>;
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
  // URLパラメータの検証を追加
  validateSearch: (search: Record<string, unknown>) => {
    return v.parse(psysSearchSchema, search);
  },

  component: () => {
    const pathname = useLocation({
      select: (location) => location.pathname,
    });
    const exceptPathName = pathname.replace('/ps-ps/', '');
    const sidebarVisiblePaths = ['item-assignment', 'pips'];
    const showSidebar = sidebarVisiblePaths.includes(exceptPathName);

    // 既存のstate管理はそのまま維持
    const [isSearchTriggered, setIsSearchTriggered] = useState(false);
    const [isSidebar, setIsSidebar] = useState(true);
    const [selectedPipData, setSelectedPipData] = useState({} as PipData);
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

### 3. 変更: PIP管理画面 (`src/routes/ps-ps/pips.tsx`)

**最小限の変更で3つのパラメータのみURL管理**：

```typescript
import { createFileRoute } from '@tanstack/react-router';
import * as v from 'valibot';
import { useContext, useEffect, useState } from 'react';
import { useUrlParams } from '@/hooks/useUrlParams';
import { PSysContext } from './route';
// ... 既存のインポートはそのまま

// Phase 1: 最小限のパラメータのみ
const pipsSearchSchema = v.object({
  jobno: v.optional(v.string()),
  fgcode: v.optional(v.string()),
  pipcode: v.optional(v.string()),
});

export const Route = createFileRoute('/ps-ps/pips')({
  validateSearch: (search: Record<string, unknown>) => {
    return v.parse(pipsSearchSchema, search);
  },
  component: Pips,
});

const Pips = () => {
  // 新しいURL管理フックを使用（3つのパラメータのみ）
  const { params, updateParams } = useUrlParams();
  
  // 既存のContext使用はそのまま維持
  const { 
    setIsSidebar, 
    setSelectedPipData, 
    setIsItemAssignmentView 
  } = useContext(PSysContext);

  // 既存のローカルstateはそのまま維持
  const [pipSelection, setPipSelection] = useState<Record<string, boolean>>({});
  const [selectedCount, setSelectedCount] = useState(0);
  const [filteredCount, setFilteredCount] = useState(0);
  const [showFilters, setShowFilters] = useState(true);
  const [clickedPipCode, setClickedPipCode] = useState<string | null>(null);
  
  // JobNo、FGの選択状態（既存のストアを使用）
  const { selectedJobNo, setSelectedJobNo } = useSelectedJobNoStore();
  const { selectedFG, setSelectedFG } = useSelectedFGStore();

  // URLパラメータからJobNo/FGCodeを復元（初回のみ）
  useEffect(() => {
    if (params.jobno && !selectedJobNo) {
      setSelectedJobNo(params.jobno);
    }
    if (params.fgcode && !selectedFG) {
      // FGコードからFGオブジェクトを取得する処理
      // 既存の処理をそのまま使用
    }
  }, [params.jobno, params.fgcode]);

  // JobNo/FG変更時にURLを更新
  useEffect(() => {
    if (selectedJobNo || selectedFG?.fgCode) {
      updateParams({
        jobno: selectedJobNo,
        fgcode: selectedFG?.fgCode,
      });
    }
  }, [selectedJobNo, selectedFG]);

  // PIPコード選択時の処理
  const handlePipClick = (pipCode: string) => {
    setClickedPipCode(pipCode);
    // URLにPIPコードを反映
    updateParams({ pipcode: pipCode });
  };

  // URLのPIPコードから選択状態を復元
  useEffect(() => {
    if (params.pipcode) {
      setClickedPipCode(params.pipcode);
    }
  }, [params.pipcode]);

  // 既存の処理はそのまま維持
  // ... データ取得、フィルタリング、削除等の処理

  return (
    // 既存のJSXはそのまま維持
    <div className="h-screen bg-gray-100 p-6 overflow-hidden">
      {/* 既存のコンポーネント構造はそのまま */}
    </div>
  );
};
```

### 4. 変更: ベンダー割当画面 (`src/routes/ps-ps/vendor-assignment.tsx`)

**最小限の変更**：

```typescript
import { createFileRoute } from '@tanstack/react-router';
import * as v from 'valibot';
import { useUrlParams } from '@/hooks/useUrlParams';
// ... 既存のインポート

// Phase 1: URL管理パラメータと既存パラメータの混在
const vendorAssignmentSearchSchema = v.object({
  // Phase 1 URL管理パラメータ
  jobno: v.optional(v.string()),
  fgcode: v.optional(v.string()),
  pipcode: v.optional(v.string()),
  // 既存パラメータ（そのまま維持）
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
});

export const Route = createFileRoute('/ps-ps/vendor-assignment')({
  validateSearch: (search: Record<string, unknown>) => {
    return v.parse(vendorAssignmentSearchSchema, search);
  },
  component: VendorAssignmentRoute,
});

function VendorAssignmentRoute() {
  const search = Route.useSearch();
  const { params, updateParams } = useUrlParams();
  
  // JobNo、FGの選択状態
  const { selectedJobNo } = useSelectedJobNoStore();
  const { selectedFG } = useSelectedFGStore();

  // URLパラメータから復元
  useEffect(() => {
    if (params.jobno && !selectedJobNo) {
      // JobNo復元処理
    }
    if (params.fgcode && !selectedFG) {
      // FGCode復元処理
    }
  }, [params.jobno, params.fgcode]);

  // 既存の処理はそのまま維持
  // ...

  return (
    <VendorAssignment
      // 既存のpropsはそのまま
    />
  );
}
```

## 🚀 実装手順

### Phase 1の実装（現在）

#### Day 1: 基盤準備
1. Valibotのインストール
   ```bash
   bun add valibot
   ```
2. `useUrlParams.ts`フックの作成
3. 各ルートファイルへのスキーマ追加

#### Day 2: 統合とテスト
1. PIP管理画面での3パラメータURL管理実装
2. ベンダー割当画面での連携確認
3. URL共有機能のテスト

#### Day 3: 最終調整
1. ブラウザ戻る/進むボタンの動作確認
2. リロード時の状態復元確認
3. ドキュメント更新

### 実装時の注意点

1. **既存機能への影響を最小化**
   - Contextはそのまま維持
   - ローカルstateはそのまま維持
   - 既存のストアはそのまま維持

2. **段階的な移行**
   - まず3つのパラメータのみ
   - 動作確認後、次のフェーズへ

3. **後方互換性の維持**
   - URLパラメータがない場合も正常動作
   - 既存の状態管理と共存

## 📊 Phase 1で得られるメリット

### 即座に得られる価値

1. **最重要な選択状態の共有**
   - JobNo、FGCode、PIPCodeをURLで共有可能
   - 例: `/ps-ps/pips?jobno=JOB001&fgcode=FG123&pipcode=PIP456`

2. **部分的なリロード耐性**
   - 選択したジョブ/FG/PIPがリロード後も維持

3. **基本的なブラウザナビゲーション**
   - 戻る/進むボタンで選択履歴を辿れる

### リスクの最小化

1. **限定的な変更範囲**
   - 3つのパラメータのみ
   - 既存の状態管理に影響なし

2. **段階的な学習**
   - チームが新パターンに慣れる時間
   - 問題があれば早期発見

## 🔄 将来のフェーズ

### Phase 2: 検索・フィルター関連（3ヶ月後）

追加するパラメータ：
- `search`: 検索クエリ
- `category`: カテゴリフィルター
- `page`: ページ番号
- `pageSize`: ページサイズ

実装内容：
- `useUrlSyncStore.ts`の作成
- 検索・ページング機能のURL同期

### Phase 3: 完全移行（6ヶ月後）

追加するパラメータ：
- `viewMode`: 表示モード
- `editMode`: 編集モード
- その他の共有可能状態

実装内容：
- Contextの完全削除
- 統合UIストアの実装
- 完全なURL駆動型状態管理

## 🎯 成功指標

### Phase 1の成功基準

1. **機能面**
   - JobNo/FGCode/PIPCodeがURLで共有できる
   - リロード後も3つのパラメータが復元される
   - 既存機能に影響がない

2. **品質面**
   - エラーが発生しない
   - パフォーマンス劣化がない
   - コードの可読性が維持される

3. **チーム面**
   - 実装方法が理解される
   - 今後の拡張方針が明確

## 🔧 トラブルシューティング

### よくある問題と解決策

1. **URLパラメータが反映されない**
   - `validateSearch`が正しく設定されているか確認
   - `useUrlParams`フックが正しくインポートされているか確認

2. **既存の状態と競合する**
   - URLパラメータの優先順位を明確にする
   - 初回ロード時のみURLから復元する

3. **パフォーマンスの問題**
   - 更新頻度が高い場合はデバウンスを検討
   - 不要な再レンダリングを避ける

## 📝 実装チェックリスト

### Phase 1実装前の確認

- [ ] Valibotがインストールされている
- [ ] 既存コードのバックアップがある
- [ ] テスト環境が準備されている

### Phase 1実装後の確認

- [ ] JobNo/FGCode/PIPCodeがURLに反映される
- [ ] URLを共有して同じ状態が再現できる
- [ ] リロード後も3つのパラメータが維持される
- [ ] 既存機能が正常に動作する
- [ ] エラーが発生しない

## まとめ

このPhase 1の実装により、最小限のリスクで最大の価値を提供します。JobNo、FGCode、PIPCodeという最も重要な3つのパラメータのみをURL管理することで：

1. **即座の価値提供**: 最重要な選択状態の共有が可能に
2. **リスク最小化**: 既存システムへの影響を最小限に
3. **段階的な学習**: チームが新しいパターンに慣れる時間を確保
4. **将来への準備**: 完全なURL駆動型への道筋を確立

次のフェーズでは、この基盤の上に検索・フィルター機能を追加し、最終的には完全なURL駆動型状態管理を実現します。