# FGCode URLパラメータ管理仕様書

## 概要

本ドキュメントは、PS-PSプロジェクトにおけるFunction Group Code（FGCode）のURLパラメータ管理実装仕様を定義します。FGCodeの選択状態をURLパラメータとして管理し、URL共有・ブラウザナビゲーション・リロード時の状態復元を実現します。

## 目的

- **選択状態の共有**: FGCodeの選択状態をURLで共有可能にする
- **ブラウザナビゲーション対応**: 戻る/進むボタンで選択履歴を辿れる
- **リロード耐性**: ページリロード後も選択状態を維持
- **双方向同期**: UIとURLの状態を常に同期させる

## 仕様

### URLパラメータ

| パラメータ名 | 型 | 説明 | 例 |
|------------|---|------|-----|
| `fgcode` | string (optional) | 選択されたFunction GroupのコードID | `A` |

**URL例**: 
- 選択時: `/ps-ps/pips?fgcode=A`
- 未選択時: `/ps-ps/pips`

### 動作仕様

#### 1. FGSelector選択時の動作
1. ユーザーがFGSelectorで項目を選択
2. 選択されたFGCodeをURLパラメータに追加/更新
3. ローカルstate（`useSelectedFGStore`）も同時に更新
4. 履歴スタックには追加しない（`replace: true`）

#### 2. URL直接変更時の動作
1. ブラウザでURLパラメータ（`fgcode`）を直接変更
2. URLパラメータの値を検証
3. 有効なFGCodeの場合：
   - FGSelectorの選択値を更新
   - ローカルstateを更新
4. 無効なFGCodeの場合：
   - URLパラメータから削除
   - FGSelectorを未選択状態に

#### 3. ページ初回ロード時の動作
1. URLパラメータから`fgcode`を読み取り
2. 有効なFGCodeの場合：
   - FGSelectorの初期値として設定
   - ローカルstateに反映
3. URLパラメータが存在しない場合：
   - ローカルstateの値を使用（localStorage）
   - URLにその値を反映

#### 4. ブラウザナビゲーション時の動作
- 戻る/進むボタン押下時、URLパラメータに応じてFGSelector状態を更新
- popstateイベントで検知し、UIを同期

## 実装設計

### ファイル構成

```
src/
├── hooks/
│   └── useFgCodeUrlSync.ts     # FGCode URL同期フック（新規作成）
├── features/
│   └── psys-randing/
│       └── components/
│           └── FGSelector.tsx   # 既存コンポーネント（修正）
├── routes/
│   └── ps-ps/
│       ├── route.tsx           # ルート定義（修正）
│       └── pips.tsx            # PIP画面（修正）
└── stores/
    └── useSelectedFgStore.ts   # 既存ストア（変更なし）
```

### 1. URL同期フック (`useFgCodeUrlSync.ts`)

```typescript
import { useNavigate, useSearch } from '@tanstack/react-router';
import { useCallback, useEffect } from 'react';
import { type FG } from '@/stores/useFgsStore';

interface UseFgCodeUrlSyncProps {
  fgs: FG[];  // 利用可能なFGリスト
  onFgChange: (fg: FG | null) => void;  // FG変更時のコールバック
}

export function useFgCodeUrlSync({ fgs, onFgChange }: UseFgCodeUrlSyncProps) {
  const navigate = useNavigate();
  const search = useSearch({ strict: false });
  
  // URLからfgcodeを取得
  const fgCodeFromUrl = search.fgcode as string | undefined;
  
  // URLにfgcodeを設定
  const setFgCodeToUrl = useCallback((fgCode: string | undefined) => {
    navigate({
      search: (prev) => {
        if (fgCode) {
          return { ...prev, fgcode: fgCode };
        } else {
          const { fgcode, ...rest } = prev;
          return rest;
        }
      },
      replace: true,  // 履歴を汚さない
    });
  }, [navigate]);
  
  // URL変更を監視してFGを更新
  useEffect(() => {
    if (fgCodeFromUrl) {
      const fg = fgs.find(f => f.fgCode === fgCodeFromUrl);
      if (fg) {
        onFgChange(fg);
      } else {
        // 無効なfgcodeの場合はURLから削除
        setFgCodeToUrl(undefined);
        onFgChange(null);
      }
    } else {
      onFgChange(null);
    }
  }, [fgCodeFromUrl, fgs]);
  
  return {
    fgCodeFromUrl,
    setFgCodeToUrl,
  };
}
```

### 2. FGSelector改修

```typescript
import { useFgCodeUrlSync } from '@/hooks/useFgCodeUrlSync';

export const FGSelector: React.FC<Props> = ({
  fgOptions,
  localFG,
  setLocalFG,
}) => {
  const { fgs } = useFgsStore();
  
  // URL同期フックを使用
  const { setFgCodeToUrl } = useFgCodeUrlSync({
    fgs,
    onFgChange: (fg) => {
      if (fg !== localFG) {
        setLocalFG(fg || ({} as FG));
      }
    },
  });
  
  // FG選択時の処理
  const handleFG = (value: string) => {
    const fg = fgs.find((f) => f.fgCode === value);
    if (fg) {
      setLocalFG(fg);
      setFgCodeToUrl(fg.fgCode);  // URLに反映
    }
  };
  
  // 既存のJSXはそのまま
  return (
    <Select onValueChange={handleFG} value={localFG?.fgCode}>
      {/* ... */}
    </Select>
  );
};
```

### 3. ルート定義の修正

```typescript
// src/routes/ps-ps/route.tsx
import * as v from 'valibot';

const psysSearchSchema = v.object({
  fgcode: v.optional(v.string()),
});

export const Route = createFileRoute('/ps-ps')({
  validateSearch: (search: Record<string, unknown>) => {
    return v.parse(psysSearchSchema, search);
  },
  // ... 既存のcomponent定義
});
```

### 4. PIP画面での使用例

```typescript
// src/routes/ps-ps/pips.tsx
import { useFgCodeUrlSync } from '@/hooks/useFgCodeUrlSync';
import { useSelectedFGStore } from '@/stores/useSelectedFgStore';
import { useFgsStore } from '@/stores/useFgsStore';

const Pips = () => {
  const { fgs } = useFgsStore();
  const { selectedFG, setSelectedFG } = useSelectedFGStore();
  
  // URL同期の初期化
  useFgCodeUrlSync({
    fgs,
    onFgChange: (fg) => {
      if (fg) {
        setSelectedFG(fg);
      }
    },
  });
  
  // 既存の処理...
};
```

## 実装チェックリスト

### 事前準備
- [ ] Valibotがインストール済み
- [ ] TanStack Routerが設定済み
- [ ] 既存コードのバックアップ完了

### 実装手順
1. [ ] `useFgCodeUrlSync.ts`フックを作成
2. [ ] ルート定義にURLパラメータ検証を追加
3. [ ] FGSelectorコンポーネントを改修
4. [ ] PIP画面でURL同期を初期化
5. [ ] 動作確認

### テスト項目

#### 基本動作
- [ ] FGSelector選択時にURLパラメータが更新される
- [ ] URLパラメータ直接変更時にFGSelectorが更新される
- [ ] 無効なfgcodeが自動的に削除される

#### ブラウザ操作
- [ ] ページリロード後もFG選択状態が維持される
- [ ] 戻る/進むボタンで選択履歴を辿れる
- [ ] URLをコピー&ペーストで状態が再現できる

#### エッジケース
- [ ] FGリストが空の場合でもエラーが発生しない
- [ ] 存在しないfgcodeでアクセスした場合の処理
- [ ] 複数タブ/ウィンドウ間での動作

## トラブルシューティング

### よくある問題

#### URLパラメータが更新されない
- `navigate`の`replace: true`オプションを確認
- `validateSearch`の設定を確認
- コンポーネントの再レンダリングタイミングを確認

#### 無限ループが発生する
- `useEffect`の依存配列を確認
- URLとローカルstateの更新が循環していないか確認
- 条件分岐で同じ値の場合は更新をスキップ

#### 初期値が正しく設定されない
- URLパラメータとlocalStorageの優先順位を確認
- FGリストの読み込みタイミングを確認
- 非同期処理の完了を待っているか確認

## セキュリティ考慮事項

- URLパラメータは必ず検証する（Valibot使用）
- 存在しないFGCodeへのアクセスを適切に処理
- XSS攻撃を防ぐため、FGCodeは必ずサニタイズ
- URLパラメータの長さ制限を設定

## パフォーマンス最適化

- URL更新時は`replace: true`で履歴を汚さない
- 不要な再レンダリングを避けるためメモ化を活用
- URLパラメータの変更をデバウンス（高頻度更新の場合）

## 実装時の注意点

1. **既存機能への影響を最小化**
   - `useSelectedFGStore`はそのまま維持
   - 既存のFGSelector使用箇所への影響を確認

2. **エラーハンドリング**
   - 無効なfgcodeは静かに処理（エラー表示しない）
   - コンソールログで開発時のデバッグを支援

3. **テスト駆動開発**
   - 各機能を実装する前にテストケースを作成
   - E2Eテストで実際のブラウザ動作を確認

## まとめ

このFGCode URLパラメータ管理により、Function Groupの選択状態をURLで管理し、以下を実現します：

- **URL共有**: 選択状態を含むURLを他のユーザーと共有可能
- **ナビゲーション対応**: ブラウザの戻る/進むボタンで履歴を辿れる
- **状態復元**: リロード後も選択状態を維持
- **双方向同期**: UIとURLが常に一致した状態を保つ

実装は最小限の変更に留め、既存システムへの影響を最小化しています。