# FGCode URLパラメータ永続化 改修仕様書

## 問題の概要

Function Groupを選択してURLに`?fgcode=C`などのパラメータが付与されても、画面遷移（例：`/pips`から`/item-assignment`への移動）時にURLパラメータが失われ、Function Groupの選択状態も失われてしまう。

## 現状分析

### 問題の原因

1. **ルート定義の不統一**
   - `/p-sys/pips`ルート: `validateSearch`でfgcodeパラメータを定義済み
   - `/p-sys/item-assignment`ルート: `validateSearch`が未定義
   - `/p-sys`ルート: fgcodeパラメータを定義済み（親ルート）

2. **ナビゲーションリンクの問題**
   - `SidebarNavigation.tsx`のLinkコンポーネントが固定パス（`/p-sys/item-assignment`、`/p-sys/pips`）を使用
   - 現在のURLパラメータを引き継がない実装

3. **状態管理の仕組み**
   - `useSelectedFGStore`はlocalStorageに永続化対応済み
   - URL同期フック（`useFgCodeUrlSync`）は各画面で独立して動作
   - しかし、URLパラメータが失われると同期できない

### 現在のフロー

```
1. FGSelector選択 → URL更新 (?fgcode=C)
2. サイドバーのリンククリック → 固定パス(/p-sys/item-assignment)へ遷移
3. URLパラメータ消失 → useFgCodeUrlSyncがnullを検知
4. FGの選択状態がクリア
```

## 解決方針

### 方針：URLパラメータを全画面で維持する

1. **全ルートでfgcodeパラメータを受け入れ可能にする**
2. **ナビゲーション時に現在のパラメータを引き継ぐ**
3. **localStorageとの連携を強化**

## 実装方法

### 方法1: 親ルートでの一元管理（推奨）

親ルート（`/p-sys`）で既にfgcodeパラメータを定義しているため、これを活用する。

**メリット**:
- 既存の実装を活かせる
- 子ルートすべてに自動的に適用される
- 実装がシンプル

**実装内容**:

1. **item-assignment.tsxのルート定義修正**
```typescript
// 親ルートのsearchパラメータを継承するため、独自のvalidateSearchは不要
export const Route = createFileRoute('/p-sys/item-assignment')({
  component: ItemAssignment,
});
```

2. **SidebarNavigation.tsxの修正**
```typescript
import { Link, useSearch } from '@tanstack/react-router';

export const SidebarNavigation = () => {
  // 現在のsearchパラメータを取得
  const search = useSearch({ strict: false });
  
  return (
    <nav className="mt-10">
      {NAV.map((group) => (
        <div key={group.id} className="space-y-2">
          {/* ... */}
          {group.items.map(({ id, label, to, icon }) => (
            <Link
              key={id}
              to={to}
              search={search} // 現在のsearchパラメータを引き継ぐ
              className="..."
            >
              {icon}
              <span>{label}</span>
            </Link>
          ))}
        </div>
      ))}
    </nav>
  );
};
```

3. **Topbar.tsxの修正**
```typescript
import { Link, useSearch } from '@tanstack/react-router';

export const Topbar: React.FC<TopbarProps> = ({path}) => {
  const search = useSearch({ strict: false });
  
  return (
    // ...
    <Link to="/p-sys/item-assignment" search={search}>
      <h1 className="text-3xl text-white">P-Sys</h1>
    </Link>
    // ...
  );
};
```

### 方法2: グローバルパラメータヘルパーの実装（代替案）

共通フックを作成してパラメータ管理を一元化する。

**実装内容**:

1. **hooks/useGlobalUrlParams.ts（新規）**
```typescript
import { useNavigate, useSearch } from '@tanstack/react-router';
import { useCallback } from 'react';

export function useGlobalUrlParams() {
  const navigate = useNavigate();
  const search = useSearch({ strict: false });
  
  // パラメータを保持したままナビゲート
  const navigateWithParams = useCallback((to: string) => {
    navigate({
      to,
      search,
    });
  }, [navigate, search]);
  
  return {
    currentParams: search,
    navigateWithParams,
  };
}
```

## 実装チェックリスト

### フェーズ1: 基本実装
- [ ] SidebarNavigation.tsxでsearchパラメータを引き継ぐ実装
- [ ] Topbar.tsxでsearchパラメータを引き継ぐ実装
- [ ] item-assignment画面でuseFgCodeUrlSyncフックを追加

### フェーズ2: 拡張実装（オプション）
- [ ] 全画面でfgcode以外のパラメータも引き継げるようにする
- [ ] パラメータの優先順位を定義（URL > localStorage > デフォルト）
- [ ] パラメータリセット機能の追加

## テスト項目

1. **基本動作**
   - [ ] FGを選択してURLにfgcodeが付与される
   - [ ] `/pips`から`/item-assignment`へ遷移してもfgcodeが維持される
   - [ ] `/item-assignment`から`/pips`へ遷移してもfgcodeが維持される
   - [ ] ブラウザリロード後もfgcodeが維持される

2. **エッジケース**
   - [ ] 無効なfgcodeでアクセスした場合の処理
   - [ ] 複数タブでの動作
   - [ ] ブラウザの戻る/進むボタンでの動作
   - [ ] 直接URLを入力した場合の動作

## リスク評価

- **低リスク**: 既存の実装を拡張するだけ
- **影響範囲**: ナビゲーション関連コンポーネントのみ
- **後方互換性**: 維持される（パラメータなしでも動作）

## 実装の優先順位

1. **必須**: SidebarNavigationとTopbarの修正（URLパラメータ引き継ぎ）
2. **推奨**: item-assignment画面でのURL同期実装
3. **オプション**: その他の画面への展開

## まとめ

この改修により、Function Groupの選択状態が画面遷移後も維持され、URLパラメータによる状態共有が完全に機能するようになります。実装は段階的に進めることができ、既存システムへの影響を最小限に抑えながら問題を解決できます。