# PS-PS プロジェクト ドキュメント

このディレクトリには、PS-PSプロジェクトの技術ドキュメント、設計書、分析レポートが含まれています。

## 📚 ドキュメント構成

### 🔍 現状分析・改善提案
- **[refactoring-analysis-2025.md](./refactoring-analysis-2025.md)** ⭐ **主要ドキュメント**
  - 包括的リファクタリング分析レポート（v2.1）
  - 現状の問題点、改善提案、実装ロードマップ
  - 優先度別タスクリスト（未実施項目多数）
  
- **[critical-bugs-remediation-plan-2025.md](./critical-bugs-remediation-plan-2025.md)**
  - 重要バグ修正計画書
  - No.9〜No.27の不具合と改善提案

### 📐 設計ドキュメント
- **[data-fetching-layer-refactoring-design.md](./data-fetching-layer-refactoring-design.md)**
  - データフェッチング層の統一設計書
  - TanStack Query v5活用、API Client実装設計

- **[zustand-store-refactoring-plan.md](./zustand-store-refactoring-plan.md)**
  - Zustand Store統合計画
  - 9個のStore → 3個への統合設計

- **[react19-optimization-analysis.md](./react19-optimization-analysis.md)**
  - React 19最適化分析
  - 新機能活用提案（Suspense, useDeferredValue等）

### 🛠️ 実装済み課題（アーカイブ）
- **[archive/no20-pip-edit-filter-fix-plan.md](./archive/no20-pip-edit-filter-fix-plan.md)** ✅ **完了**
  - PIP編集→Items画面遷移時フィルタ問題
  - 実装日: 2025年9月14日

- **[archive/no21-pip-edit-qty-increase-modification-summary.md](./archive/no21-pip-edit-qty-increase-modification-summary.md)** ✅ **完了**
  - PIP編集時の数量増加対応
  - 実装日: 2025年1月15日

- **[archive/no21-pip-edit-qty-increase-revised-plan.md](./archive/no21-pip-edit-qty-increase-revised-plan.md)** ✅ **完了**
  - No.21の詳細実装計画書

### 📋 未実装の設計書
- **[item-status-filter-dropdown-spec.md](./item-status-filter-dropdown-spec.md)**
  - Statusフィルタードロップダウン実装仕様
  
- **[api-fg-jobno-filter-extension.md](./api-fg-jobno-filter-extension.md)**
  - API拡張設計（FG・JobNoフィルタリング）

- **[frontend-vendor-api-migration-plan.md](./frontend-vendor-api-migration-plan.md)**
  - Vendor API統合計画


### 🔍 調査・分析
- **[pip-code-display-issue-investigation.md](./pip-code-display-issue-investigation.md)**
  - PIPコード表示問題の調査レポート

### 💾 データベース
- **[database-schema.md](./database-schema.md)**
  - データベース設計書

### 📡 API仕様書
- **[api/](./api/)**
  - [README.md](./api/README.md) - API概要
  - [items-api.md](./api/items-api.md) - 購入品管理API
  - [pips-api.md](./api/pips-api.md) - PIP管理API
  - [vendors-api.md](./api/vendors-api.md) - ベンダー管理API
  - [function-groups-api.md](./api/function-groups-api.md) - FG管理API
  - [milestone-api.md](./api/milestone-api.md) - マイルストーンAPI

## 🚨 優先対応事項（refactoring-analysis-2025.mdより）

### Phase 0: 緊急対応（1-2日）
- [ ] console.log/error の完全削除（30分）❌ **未実施**
- [ ] 共通APIクライアントの実装（2時間）❌ **未実施**
- [ ] enabled: false の削除（1時間）❌ **未実施**
- [ ] 基本的なエラーバウンダリー（1時間）❌ **未実施**
- [ ] Zustand DevTools有効化（30分）❌ **未実施**

### 主要な技術的負債
1. **データフェッチング**: 手動実行パターン（`enabled: false`）
2. **console.log残存**: 14ファイル、30箇所以上
3. **Store分散**: 9個のZustand Store
4. **テスト未実装**: テストカバレッジ 0%
5. **巨大コンポーネント**: 400行超のファイル多数

## 📊 実装状況サマリー

| カテゴリ | 完了 | 未実施 | 進捗率 |
|---------|------|--------|--------|
| バグ修正 | 2 | 15+ | 12% |
| リファクタリング | 0 | 10+ | 0% |
| テスト実装 | 0 | - | 0% |
| パフォーマンス最適化 | 0 | 5+ | 0% |

## 🔗 関連リンク

- 主要分析: [refactoring-analysis-2025.md](./refactoring-analysis-2025.md)
- API設計: [api/README.md](./api/README.md)

---

*最終更新: 2025年1月16日*