# Zustand Store再編成計画

## 現状分析

### 現在のStore構成（9個）

1. **usePipsStore** - PIPデータ管理
   - `pipsData: Pip[]` - PIPデータの配列
   - `pipSelection: Record<string, boolean>` - 選択状態
   - `isPipFetchError: boolean` - エラー状態
   - `shouldFetchPips: boolean` - フェッチフラグ

2. **usePipGenerationModeStore** - PIP生成モード管理
   - `pipGenerationMode: 'display' | 'generation' | 'edit' | 'copy'`
   - persist有効

3. **useSelectedJobNoStore** - JobNo選択状態
   - `selectedJobNo: string`
   - persist有効

4. **usePipDetailStore** - PIP詳細データ
   - `pipDetailData: PipDetail`
   - `selectedPipCode: string | undefined`
   - persist有効

5. **useSelectedProjectStore** - プロジェクト選択状態
   - `selectedProject: SelectedProject | null`
   - persist有効

6. **useSelectedFGStore** - Function Group選択状態
   - `selectedFG: FG | null`
   - persist有効

7. **useFgsStore** - Function Groupリスト
   - `fgs: FG[]`
   - persist有効

8. **useAlertStore** - アラート管理
   - `isAlertVisible: boolean`
   - `alertType: AlertType`
   - `messages: AlertMessage[]`
   - `inputErrorCell?: InputErrorCell`

9. **useItemTableInstance** - TanStack Tableインスタンス
   - `itemTableInstance: Table<Item> | null`

### 問題点の分析

#### 1. データの分散
- **PIP関連データが3つのstoreに分散**
  - usePipsStore: リストデータと選択状態
  - usePipDetailStore: 詳細データと選択コード
  - usePipGenerationModeStore: 操作モード

#### 2. 選択状態の分散
- **3つの異なる選択状態store**
  - useSelectedJobNoStore
  - useSelectedFGStore
  - useSelectedProjectStore

#### 3. 高い結合度
- 多くのコンポーネントが複数のstoreを同時に使用
- 特に以下の組み合わせが頻出:
  ```
  useSelectedJobNoStore + useSelectedFGStore + usePipDetailStore
  ```

#### 4. 命名の不統一
- 複数のstoreで`StoreState`という汎用的な型名を使用
- 各storeの責務が型名から判断しづらい

## 再編成方針

### 基本原則
1. **ドメイン駆動設計**: ビジネスドメインに基づいた統合
2. **単一責任原則**: 各storeは明確な1つの責務を持つ
3. **関心の分離**: UIの状態とビジネスロジックを分離
4. **依存関係の最小化**: storeは直接他のstoreを参照しない

### 新Store構成案

#### 1. **useProjectContextStore** - プロジェクトコンテキスト統合
```typescript
type ProjectContextStore = {
  // 選択状態の統合
  selectedProject: SelectedProject | null;
  selectedJobNo: string;
  selectedFG: FG | null;
  
  // Function Groupデータ
  fgs: FG[];
  
  // Actions
  setSelectedProject: (project: SelectedProject | null) => void;
  setSelectedJobNo: (jobNo: string) => void;
  setSelectedFG: (fg: FG | null) => void;
  setFgs: (fgs: FG[]) => void;
  
  // 統合されたセレクター
  getFullContext: () => ProjectContext;
}
```

#### 2. **usePipManagementStore** - PIP管理統合
```typescript
type PipManagementStore = {
  // データ
  pips: Pip[];
  pipDetail: PipDetail | null;
  
  // 選択・操作状態
  selectedPipCode: string | undefined;
  pipSelection: Record<string, boolean>;
  generationMode: PipGenerationMode;
  
  // フェッチ状態
  isLoading: boolean;
  isError: boolean;
  shouldRefetch: boolean;
  
  // Actions
  setPips: (pips: Pip[]) => void;
  setPipDetail: (detail: PipDetail) => void;
  setSelectedPipCode: (code: string | undefined) => void;
  setPipSelection: (selection: Record<string, boolean>) => void;
  setGenerationMode: (mode: PipGenerationMode) => void;
  
  // 統合操作
  clearPipData: () => void;
  refreshPips: () => void;
}
```

#### 3. **useUIStateStore** - UI状態管理
```typescript
type UIStateStore = {
  // アラート
  alert: {
    isVisible: boolean;
    type: AlertType;
    messages: AlertMessage[];
    inputErrorCell?: InputErrorCell;
  };
  
  // テーブルインスタンス
  tableInstances: {
    itemTable: Table<Item> | null;
  };
  
  // Actions
  showAlert: (config: AlertConfig) => void;
  hideAlert: () => void;
  setTableInstance: (name: string, instance: Table<any>) => void;
}
```

#### 4. **useAppSettingsStore** - アプリケーション設定
```typescript
type AppSettingsStore = {
  // 永続化が必要な設定
  userPreferences: {
    defaultGenerationMode: PipGenerationMode;
    defaultViewMode: ViewMode;
  };
  
  // Actions
  updatePreference: (key: string, value: any) => void;
}
```

### 移行後の利点

1. **コード量の削減**
   - 9個のstoreから4個に削減
   - import文の削減（1コンポーネントあたり平均3-4個→1-2個）

2. **パフォーマンス向上**
   - store間の依存関係削減によるレンダリング最適化
   - 関連データの一括更新が可能

3. **開発効率の向上**
   - 関連データが1箇所に集約
   - 型定義の明確化
   - テストの簡素化

## 実装計画

### Phase 1: 準備とブランチ戦略（Week 1）

#### ブランチ構成
```
main
  └── feature/zustand-store-refactoring
      ├── refactor/project-context-store
      ├── refactor/pip-management-store
      ├── refactor/ui-state-store
      └── refactor/app-settings-store
```

#### タスク
1. `feature/zustand-store-refactoring`ブランチの作成
2. 既存storeの完全なテストカバレッジ確保
3. 移行ガイドラインの作成

### Phase 2: Store統合実装（Week 2-3）

#### 2.1 ProjectContextStore実装
```bash
git checkout -b refactor/project-context-store
```
- [ ] 新storeの実装
- [ ] 既存3つのstoreからのデータ移行
- [ ] ユニットテストの実装
- [ ] 互換性レイヤーの実装（既存コードとの共存用）

#### 2.2 PipManagementStore実装
```bash
git checkout -b refactor/pip-management-store
```
- [ ] 新storeの実装
- [ ] 既存3つのstoreからのデータ移行
- [ ] ユニットテストの実装
- [ ] 互換性レイヤーの実装

#### 2.3 UIStateStore実装
```bash
git checkout -b refactor/ui-state-store
```
- [ ] 新storeの実装
- [ ] アラート機能の移行
- [ ] テーブルインスタンス管理の移行
- [ ] ユニットテストの実装

### Phase 3: コンポーネント移行（Week 3-4）

#### 優先度別移行計画

**高優先度コンポーネント**（最も多くのstoreを使用）
1. MilestoneGrid.tsx（6 stores）
2. PipTableControls.tsx（6 stores）
3. ItemTableControls.tsx（6 stores）
4. Sidebar.tsx（5 stores）

**中優先度コンポーネント**（3-4 stores）
1. item-assignment.tsx（4 stores）
2. vendor-assignment.tsx（4 stores）
3. pips.tsx（4 stores）
4. VendorAssignment.tsx（4 stores）

**低優先度コンポーネント**（1-2 stores）
- その他のコンポーネント

### Phase 4: 旧Store削除とクリーンアップ（Week 5）

1. 互換性レイヤーの削除
2. 旧storeファイルの削除
3. import文の整理
4. 型定義の最終調整

### Phase 5: テストと最適化（Week 5-6）

1. 統合テストの実施
2. パフォーマンステスト
3. メモリリークチェック
4. ドキュメントの更新

## リスク管理

### 主要リスクと対策

1. **データ永続化の互換性**
   - リスク: localStorage/sessionStorageのデータ構造変更
   - 対策: マイグレーション関数の実装

2. **実行時エラー**
   - リスク: 型の不整合によるランタイムエラー
   - 対策: 段階的移行と互換性レイヤー

3. **パフォーマンス劣化**
   - リスク: 統合によるstore肥大化
   - 対策: selectorの最適化とメモ化

## 成功指標

1. **定量的指標**
   - store数: 9個 → 4個（56%削減）
   - 平均import数: 3.5個 → 1.5個（57%削減）
   - バンドルサイズ: 測定後に設定

2. **定性的指標**
   - コードの可読性向上
   - 新機能追加時の実装時間短縮
   - バグ発生率の低下

## 次のステップ

1. このドキュメントのレビューと承認
2. Phase 1の開始（ブランチ作成とテスト準備）
3. 週次進捗会議の設定
4. 移行完了後の振り返り会議

## 参考資料

- [Zustand公式ドキュメント](https://github.com/pmndrs/zustand)
- [React状態管理のベストプラクティス](https://react.dev/learn/managing-state)
- 既存storeの実装: `/src/stores/`

---

*最終更新: 2025-09-16*
*作成者: Claude Code*
*レビュー待ち*