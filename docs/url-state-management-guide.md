# URLパラメータ管理仕様書

## 概要

本ドキュメントは、PS-PSプロジェクトにおけるシンプルなURLパラメータ管理システムの実装仕様を定義します。プロジェクトID（ProjectId）とFunction Group Code（FGCode）の2つの選択状態のみをURLパラメータとして管理し、URL共有・ブラウザナビゲーション・リロード時の状態復元を実現します。

## 目的

- **選択状態の共有**: ProjectIdとFGCodeをURLで共有可能にする
- **ブラウザナビゲーション対応**: 戻る/進むボタンで選択履歴を辿れる
- **リロード耐性**: ページリロード後も選択状態を維持
- **双方向同期**: UIとURLの状態を常に同期させる
- **シンプルな実装**: 最小限のパラメータで実現

## 仕様

### URLパラメータ

| パラメータ名 | 型 | 説明 | 例 |
|------------|---|------|-----|
| `projectId` | string (optional) | 選択されたプロジェクトID | `PJ00000001` |
| `fgcode` | string (optional) | 選択されたFunction GroupのコードID | `A` |

**URL例**: 
- フル選択時: `/p-sys/pips?projectId=PJ00000001&fgcode=A`
- プロジェクトのみ: `/p-sys/item-assignment?projectId=PJ00000001`
- FGCodeのみ: `/p-sys/pips?fgcode=A`
- 未選択時: `/p-sys/pips`

### 動作仕様

#### 1. 選択時の動作
1. ユーザーがProjectIdまたはFGCodeを選択
2. 選択された値をURLパラメータに追加/更新
3. 各ローカルstateも同時に更新
4. 履歴スタックには追加しない（`replace: true`）

#### 2. URL直接変更時の動作
1. ブラウザでURLパラメータを直接変更
2. パラメータの値を検証
3. 有効な値の場合：
   - 各セレクターの選択値を更新
   - ローカルstateを更新
4. 無効な値の場合：
   - 該当パラメータをURLから削除
   - 関連セレクターを未選択状態に

#### 3. ページ初回ロード時の動作
1. URLパラメータからProjectIdとFGCodeを読み取り
2. 有効な値の場合：
   - 各セレクターの初期値として設定
   - ローカルstateに反映
3. URLパラメータが存在しない場合：
   - ローカルstateの値を使用（localStorage）
   - URLにその値を反映

#### 4. ブラウザナビゲーション時の動作
- 戻る/進むボタン押下時、URLパラメータに応じて選択状態を更新
- popstateイベントで検知し、UIを同期

## 実装設計

### シンプルなファイル構成

```
src/
├── hooks/
│   ├── useProjectIdUrlSync.ts         # ProjectId同期フック（新規）
│   └── useFgCodeUrlSync.ts            # FGCode同期フック（既存を修正）
├── features/
│   ├── randing/
│   │   └── components/
│   │       └── ProjectSelector.tsx    # プロジェクトセレクター（修正）
│   └── psys-randing/
│       └── components/
│           └── FGSelector.tsx          # FGセレクター（修正）
├── routes/
│   └── p-sys/
│       └── route.tsx                   # ルート定義（修正）
└── stores/
    ├── useSelectedProjectStore.ts     # プロジェクトストア（既存）
    └── useSelectedFgStore.ts          # FGストア（既存）
```

### 1. ProjectId同期フック (`hooks/useProjectIdUrlSync.ts`)


```typescript
import { useNavigate, useSearch } from '@tanstack/react-router';
import { useCallback, useEffect, useRef } from 'react';
import { useSelectedProjectStore } from '@/stores/useSelectedProjectStore';
import type { SelectedProject } from '@/stores/useSelectedProjectStore';

export function useProjectIdUrlSync(projects: SelectedProject[]) {
  const navigate = useNavigate();
  const search = useSearch({ strict: false });
  const { setSelectedProject } = useSelectedProjectStore();
  const lastValidValueRef = useRef<SelectedProject | null>(null);
  
  const projectIdFromUrl = search.projectId as string | undefined;
  
  // URLへの値の設定
  const setProjectToUrl = useCallback((project: SelectedProject | null) => {
    navigate({
      to: '.',
      search: (prev: Record<string, unknown>) => ({
        ...prev,
        projectId: project?.projectId || undefined,
      }),
      replace: true,
    });
  }, [navigate]);
  
  // URL変更の監視とストアとの同期
  useEffect(() => {
    const project = projectIdFromUrl 
      ? projects.find(p => p.projectId === projectIdFromUrl) 
      : null;
    
    if (project !== lastValidValueRef.current) {
      lastValidValueRef.current = project;
      setSelectedProject(project);
      
      // 無効な値の場合はURLから削除
      if (!project && projectIdFromUrl) {
        setProjectToUrl(null);
      }
    }
  }, [projectIdFromUrl, projects, setSelectedProject, setProjectToUrl]);
  
  return {
    projectFromUrl: lastValidValueRef.current,
    setProjectToUrl,
    clearProjectFromUrl: () => setProjectToUrl(null),
  };
}
```

### 2. FGCode同期フック (`hooks/useFgCodeUrlSync.ts`)

```typescript
import { useNavigate, useSearch } from '@tanstack/react-router';
import { useCallback, useEffect, useRef } from 'react';
import { useSelectedFgStore } from '@/stores/useSelectedFgStore';
import type { FG } from '@/types';

export function useFgCodeUrlSync(fgs: FG[]) {
  const navigate = useNavigate();
  const search = useSearch({ strict: false });
  const { setSelectedFG } = useSelectedFgStore();
  const lastValidValueRef = useRef<FG | null>(null);
  
  const fgCodeFromUrl = search.fgcode as string | undefined;
  
  // URLへの値の設定
  const setFgCodeToUrl = useCallback((fg: FG | null) => {
    navigate({
      to: '.',
      search: (prev: Record<string, unknown>) => ({
        ...prev,
        fgcode: fg?.fgCode || undefined,
      }),
      replace: true,
    });
  }, [navigate]);
  
  // URL変更の監視とストアとの同期
  useEffect(() => {
    const fg = fgCodeFromUrl 
      ? fgs.find(f => f.fgCode === fgCodeFromUrl) 
      : null;
    
    if (fg !== lastValidValueRef.current) {
      lastValidValueRef.current = fg;
      setSelectedFG(fg);
      
      // 無効な値の場合はURLから削除
      if (!fg && fgCodeFromUrl) {
        setFgCodeToUrl(null);
      }
    }
  }, [fgCodeFromUrl, fgs, setSelectedFG, setFgCodeToUrl]);
  
  return {
    fgFromUrl: lastValidValueRef.current,
    setFgCodeToUrl,
    clearFgCodeFromUrl: () => setFgCodeToUrl(null),
  };
}
```

### 3. ルート定義の修正

```typescript
// src/routes/p-sys/route.tsx
import * as v from 'valibot';

const psysSearchSchema = v.object({
  projectId: v.optional(v.string()),
  fgcode: v.optional(v.string()),
});

export const Route = createFileRoute('/p-sys')({
  validateSearch: (search: Record<string, unknown>) => {
    return v.parse(psysSearchSchema, search);
  },
  // ... 既存のcomponent定義
});
```

### 4. 統合使用例（Component）

```typescript
// src/features/psys-randing/components/FGSelector.tsx
import { useProjectIdUrlSync } from '@/hooks/useProjectIdUrlSync';
import { useFgCodeUrlSync } from '@/hooks/useFgCodeUrlSync';

const FGSelector = () => {
  const { projects } = useProjects();
  const { fgs } = useFgsStore();
  
  // URL同期フックの初期化
  const { 
    projectFromUrl, 
    setProjectToUrl 
  } = useProjectIdUrlSync(projects);
  
  const { 
    fgFromUrl, 
    setFgCodeToUrl 
  } = useFgCodeUrlSync(fgs);
  
  // セレクター変更ハンドラー
  const handleProjectChange = (projectId: string) => {
    const project = projects.find(p => p.projectId === projectId);
    if (project) {
      setProjectToUrl(project);
    }
  };
  
  const handleFgChange = (fgCode: string) => {
    const fg = fgs.find(f => f.fgCode === fgCode);
    if (fg) {
      setFgCodeToUrl(fg);
    }
  };
  
  return (
    <div>
      <ProjectSelector 
        value={projectFromUrl?.projectId}
        onChange={handleProjectChange}
      />
      
      <FGSelector
        value={fgFromUrl?.fgCode}
        onChange={handleFgChange}
      />
    </div>
  );
};
```

## 実装チェックリスト

### 現在の実装状況サマリ

**実装済み**：
- ✅ FGCodeのURLパラメータ管理機能が完全に実装されています
  - `useFgCodeUrlSync`フックが実装済み
  - FGSelectorコンポーネントが統合済み  
  - ルート定義に`fgcode`パラメータが追加済み
  - 無限ループ防止機能も実装済み

**未実装**：
- ❌ ProjectIdのURLパラメータ管理機能が未実装
  - `useProjectIdUrlSync`フックが存在しない
  - ProjectSelectorコンポーネントはURL同期に対応していない
  - ルート定義に`projectId`パラメータがない

### フェーズ1: ProjectId対応
- [ ] `hooks/useProjectIdUrlSync.ts` を作成
- [ ] `features/randing/components/ProjectSelector.tsx` を改修
- [ ] `routes/p-sys/route.tsx` にprojectIdパラメータを追加
- [ ] ProjectSelector使用箇所の更新

### フェーズ2: FGCode対応
- [x] 既存の `useFgCodeUrlSync.ts` をシンプルにリファクタリング（実装済み）
- [x] `features/psys-randing/components/FGSelector.tsx` を改修（実装済み）
- [x] `routes/p-sys/route.tsx` にfgcodeパラメータを追加（実装済み）
- [x] FGSelector使用箇所の更新（実装済み）

### フェーズ3: 統合とテスト
- [x] FGCodeのURL直接変更時の動作確認（実装済み）
- [ ] ProjectIdのURL直接変更時の動作確認（未実装）
- [x] FGCodeのブラウザナビゲーションのテスト（実装済み）
- [ ] ProjectIdのブラウザナビゲーションのテスト（未実装）
- [x] FGCodeのページリロード時の状態復元確認（実装済み）
- [ ] ProjectIdのページリロード時の状態復元確認（未実装）

### テスト項目

#### 基本動作
- [ ] ProjectId選択時にURLパラメータが更新される（未実装）
- [x] FGCode選択時にURLパラメータが更新される（実装済み）
- [x] URLパラメータ直接変更時にFGセレクターが更新される（実装済み）
- [ ] URLパラメータ直接変更時にProjectセレクターが更新される（未実装）
- [x] FGCodeの無効な値が自動的に削除される（実装済み）
- [ ] ProjectIdの無効な値が自動的に削除される（未実装）

#### ブラウザ操作
- [ ] ページリロード後もProjectIdが維持される（未実装）
- [x] ページリロード後もFGCodeが維持される（実装済み）
- [x] 戻る/進むボタンでFGCodeの選択履歴を辿れる（実装済み）
- [ ] 戻る/進むボタンでProjectIdの選択履歴を辿れる（未実装）
- [x] URLをコピー&ペーストでFGCodeの状態が再現できる（実装済み）
- [ ] URLをコピー&ペーストでProjectIdの状態が再現できる（未実装）

#### エッジケース
- [ ] プロジェクトリストが空の場合でもエラーが発生しない（未実装）
- [x] FGリストが空の場合でもエラーが発生しない（実装済み）
- [x] FGCodeの存在しない値でアクセスした場合の処理（実装済み）
- [ ] ProjectIdの存在しない値でアクセスした場合の処理（未実装）
- [ ] 複数タブ/ウィンドウ間での動作（未確認）
- [x] FGCodeの循環参照が発生しない（実装済み - lastValidFgCodeRef使用）
- [ ] ProjectIdの循環参照が発生しない（未実装）

## トラブルシューティング

### よくある問題

#### URLパラメータが更新されない
- `navigate`の`replace: true`オプションを確認
- `validateSearch`の設定を確認
- パラメータ名が正しいか確認（`projectId`, `fgcode`）
- コンポーネントの再レンダリングタイミングを確認

#### 無限ループが発生する
- `useEffect`の依存配列を確認
- URLとローカルstateの更新が循環していないか確認
- 条件分岐で同じ値の場合は更新をスキップ
- `lastValidValueRef`の使用を確認

#### 初期値が正しく設定されない
- URLパラメータとlocalStorageの優先順位を確認
- データ（projects/fgs）の読み込みタイミングを確認
- 非同期処理の完了を待っているか確認

## セキュリティ考慮事項

- URLパラメータは必ず検証する（Valibot使用）
- 存在しない値へのアクセスを適切に処理
- XSS攻撃を防ぐため、全パラメータ値は必ずサニタイズ
- URLパラメータの長さ制限を設定

## パフォーマンス最適化

- URL更新時は`replace: true`で履歴を汚さない
- 不要な再レンダリングを避けるためメモ化を活用
- URLパラメータの変更をデバウンス（高頻度更新の場合）

## 実装時の注意点

1. **既存機能への影響を最小化**
   - 各ストア（useSelectedProjectStore/FGStore）はそのまま維持
   - 既存のセレクター使用箇所への影響を確認
   - 段階的な移行を可能にする設計

2. **エラーハンドリング**
   - 無効な値は静かに処理（エラー表示しない）
   - コンソールログで開発時のデバッグを支援

3. **テスト駆動開発**
   - 各機能を実装する前にテストケースを作成
   - E2Eテストで実際のブラウザ動作を確認

## 今後の拡張性

### 新しいパラメータの追加手順

1. 新しい同期フックを作成
2. ルート定義のスキーマを更新
3. UIコンポーネントと接続

### 対応可能な拡張例

- **JobNo**: プロジェクト選択後のジョブ番号管理
- **フィルター条件**: 検索条件やソート順をURLで管理
- **ページネーション**: ページ番号や表示件数をURLで管理
- **タブ状態**: アクティブなタブをURLで管理
- **モーダル状態**: 開いているモーダルをURLで管理

## まとめ

このシンプルなURLパラメータ管理システムにより、以下を実現します：

- **最小限の実装**: ProjectIdとFGCodeのみを管理
- **URL共有**: 選択状態を含むURLを他のユーザーと共有可能
- **ナビゲーション対応**: ブラウザの戻る/進むボタンで履歴を辿れる
- **状態復元**: リロード後も選択状態を維持
- **双方向同期**: UIとURLが常に一致した状態を保つ
- **シンプルな設計**: 理解しやすく保守しやすい実装

実装は段階的に進めることができ、既存システムへの影響を最小化しながら、必要に応じて機能拡張も可能な設計となっています。