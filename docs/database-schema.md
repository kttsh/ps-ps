# データベーステーブル設計書

## 概要
本書は、PS-PS（調達管理システム）のMSSQLデータベース設計を定義します。
ログテーブルは不要とし、シンプルで効率的な設計を目指します。

## データベース基本設計

### データベース名
`ps_ps_db`

### 文字コード
`UTF-8`

### 命名規則
- テーブル名: 小文字、スネークケース（例: `pip_items`）
- カラム名: 小文字、スネークケース（例: `created_at`）
- 主キー: `id` または `[テーブル名]_id`
- 外部キー: `[参照テーブル名]_id`

## テーブル定義

### 1. fgs（Function Groupマスタ）
FGマスタテーブル

| カラム名 | データ型 | NULL | デフォルト | 説明 |
|---------|---------|------|-----------|------|
| fg_code | VARCHAR(10) | NO | - | FGコード（主キー） |
| fg_name | NVARCHAR(100) | NO | - | FG名称 |
| display_order | INT | NO | 0 | 表示順 |
| is_active | BIT | NO | 1 | 有効フラグ |
| created_at | DATETIME2 | NO | GETDATE() | 作成日時 |
| updated_at | DATETIME2 | NO | GETDATE() | 更新日時 |

**インデックス:**
- PRIMARY KEY: `fg_code`
- INDEX: `display_order`

### 2. vendors（ベンダーマスタ）
ベンダー情報を管理

| カラム名 | データ型 | NULL | デフォルト | 説明 |
|---------|---------|------|-----------|------|
| vendor_id | VARCHAR(20) | NO | - | ベンダーID（主キー） |
| vendor_code | VARCHAR(20) | NO | - | ベンダーコード |
| vendor_name | NVARCHAR(200) | NO | - | ベンダー名 |
| contact_person | NVARCHAR(100) | YES | NULL | 担当者名 |
| phone | VARCHAR(20) | YES | NULL | 電話番号 |
| email | VARCHAR(100) | YES | NULL | メールアドレス |
| address | NVARCHAR(500) | YES | NULL | 住所 |
| status | VARCHAR(20) | NO | 'active' | ステータス |
| created_at | DATETIME2 | NO | GETDATE() | 作成日時 |
| updated_at | DATETIME2 | NO | GETDATE() | 更新日時 |

**インデックス:**
- PRIMARY KEY: `vendor_id`
- UNIQUE: `vendor_code`
- INDEX: `vendor_name`

### 3. pips（PIPマスタ）
購入品パッケージを管理

| カラム名 | データ型 | NULL | デフォルト | 説明 |
|---------|---------|------|-----------|------|
| pip_id | INT | NO | IDENTITY(1,1) | PIP内部ID（主キー） |
| pip_code | VARCHAR(20) | NO | - | PIPコード |
| pip_name | NVARCHAR(200) | NO | - | PIP名称 |
| job_no | VARCHAR(20) | NO | - | プロジェクト番号 |
| fg_code | VARCHAR(10) | NO | - | FGコード |
| total_amount | DECIMAL(18,2) | NO | 0 | 合計金額 |
| status | VARCHAR(20) | NO | 'draft' | ステータス(draft/active/closed) |
| created_at | DATETIME2 | NO | GETDATE() | 作成日時 |
| updated_at | DATETIME2 | NO | GETDATE() | 更新日時 |

**インデックス:**
- PRIMARY KEY: `pip_id`
- UNIQUE: `pip_code, job_no, fg_code`
- FOREIGN KEY: `fg_code` REFERENCES `fgs(fg_code)`
- INDEX: `job_no, fg_code`
- INDEX: `status`

### 4. items（購入品マスタ）
購入品情報を管理

| カラム名 | データ型 | NULL | デフォルト | 説明 |
|---------|---------|------|-----------|------|
| item_id | INT | NO | IDENTITY(1,1) | アイテムID（主キー） |
| job_no | VARCHAR(20) | NO | - | プロジェクト番号 |
| fg_code | VARCHAR(10) | NO | - | FGコード |
| item_code | VARCHAR(30) | NO | - | アイテムコード |
| item_name | NVARCHAR(200) | NO | - | アイテム名 |
| description | NVARCHAR(1000) | YES | NULL | 説明 |
| unit | NVARCHAR(20) | NO | - | 単位 |
| quantity | DECIMAL(18,3) | NO | 0 | 数量 |
| unit_price | DECIMAL(18,2) | NO | 0 | 単価 |
| total_price | DECIMAL(18,2) | NO | 0 | 合計金額 |
| pip_id | INT | YES | NULL | PIP ID |
| status | VARCHAR(20) | NO | 'active' | ステータス |
| created_at | DATETIME2 | NO | GETDATE() | 作成日時 |
| updated_at | DATETIME2 | NO | GETDATE() | 更新日時 |

**インデックス:**
- PRIMARY KEY: `item_id`
- UNIQUE: `item_code, job_no, fg_code`
- FOREIGN KEY: `fg_code` REFERENCES `fgs(fg_code)`
- FOREIGN KEY: `pip_id` REFERENCES `pips(pip_id)`
- INDEX: `job_no, fg_code`
- INDEX: `pip_id`

### 5. pip_vendors（PIP-ベンダー割当）
PIPとベンダーの割当を管理（AIP）

| カラム名 | データ型 | NULL | デフォルト | 説明 |
|---------|---------|------|-----------|------|
| aip_id | INT | NO | IDENTITY(1,1) | AIP ID（主キー） |
| aip_code | VARCHAR(20) | NO | - | AIPコード |
| pip_id | INT | NO | - | PIP ID |
| vendor_id | VARCHAR(20) | NO | - | ベンダーID |
| assigned_amount | DECIMAL(18,2) | YES | NULL | 割当金額 |
| status | VARCHAR(20) | NO | 'assigned' | ステータス |
| assigned_at | DATETIME2 | NO | GETDATE() | 割当日時 |
| created_at | DATETIME2 | NO | GETDATE() | 作成日時 |
| updated_at | DATETIME2 | NO | GETDATE() | 更新日時 |

**インデックス:**
- PRIMARY KEY: `aip_id`
- UNIQUE: `aip_code`
- FOREIGN KEY: `pip_id` REFERENCES `pips(pip_id)`
- FOREIGN KEY: `vendor_id` REFERENCES `vendors(vendor_id)`
- INDEX: `pip_id, vendor_id`

## テーブル作成SQL

```sql
-- データベース作成
CREATE DATABASE ps_ps_db;
GO

USE ps_ps_db;
GO

-- 1. FGマスタテーブル
CREATE TABLE fgs (
    fg_code VARCHAR(10) NOT NULL PRIMARY KEY,
    fg_name NVARCHAR(100) NOT NULL,
    display_order INT NOT NULL DEFAULT 0,
    is_active BIT NOT NULL DEFAULT 1,
    created_at DATETIME2 NOT NULL DEFAULT GETDATE(),
    updated_at DATETIME2 NOT NULL DEFAULT GETDATE()
);

CREATE INDEX idx_fgs_display_order ON fgs(display_order);

-- 2. ベンダーマスタテーブル
CREATE TABLE vendors (
    vendor_id VARCHAR(20) NOT NULL PRIMARY KEY,
    vendor_code VARCHAR(20) NOT NULL,
    vendor_name NVARCHAR(200) NOT NULL,
    contact_person NVARCHAR(100) NULL,
    phone VARCHAR(20) NULL,
    email VARCHAR(100) NULL,
    address NVARCHAR(500) NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'active',
    created_at DATETIME2 NOT NULL DEFAULT GETDATE(),
    updated_at DATETIME2 NOT NULL DEFAULT GETDATE(),
    CONSTRAINT uk_vendor_code UNIQUE (vendor_code)
);

CREATE INDEX idx_vendors_name ON vendors(vendor_name);

-- 3. PIPマスタテーブル
CREATE TABLE pips (
    pip_id INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    pip_code VARCHAR(20) NOT NULL,
    pip_name NVARCHAR(200) NOT NULL,
    job_no VARCHAR(20) NOT NULL,
    fg_code VARCHAR(10) NOT NULL,
    total_amount DECIMAL(18,2) NOT NULL DEFAULT 0,
    status VARCHAR(20) NOT NULL DEFAULT 'draft',
    created_at DATETIME2 NOT NULL DEFAULT GETDATE(),
    updated_at DATETIME2 NOT NULL DEFAULT GETDATE(),
    CONSTRAINT uk_pip_code UNIQUE (pip_code, job_no, fg_code),
    CONSTRAINT fk_pips_fg FOREIGN KEY (fg_code) REFERENCES fgs(fg_code)
);

CREATE INDEX idx_pips_job_fg ON pips(job_no, fg_code);
CREATE INDEX idx_pips_status ON pips(status);

-- 4. 購入品マスタテーブル
CREATE TABLE items (
    item_id INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    job_no VARCHAR(20) NOT NULL,
    fg_code VARCHAR(10) NOT NULL,
    item_code VARCHAR(30) NOT NULL,
    item_name NVARCHAR(200) NOT NULL,
    description NVARCHAR(1000) NULL,
    unit NVARCHAR(20) NOT NULL,
    quantity DECIMAL(18,3) NOT NULL DEFAULT 0,
    unit_price DECIMAL(18,2) NOT NULL DEFAULT 0,
    total_price DECIMAL(18,2) NOT NULL DEFAULT 0,
    pip_id INT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'active',
    created_at DATETIME2 NOT NULL DEFAULT GETDATE(),
    updated_at DATETIME2 NOT NULL DEFAULT GETDATE(),
    CONSTRAINT uk_item_code UNIQUE (item_code, job_no, fg_code),
    CONSTRAINT fk_items_fg FOREIGN KEY (fg_code) REFERENCES fgs(fg_code),
    CONSTRAINT fk_items_pip FOREIGN KEY (pip_id) REFERENCES pips(pip_id)
);

CREATE INDEX idx_items_job_fg ON items(job_no, fg_code);
CREATE INDEX idx_items_pip ON items(pip_id);

-- 5. PIP-ベンダー割当テーブル
CREATE TABLE pip_vendors (
    aip_id INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    aip_code VARCHAR(20) NOT NULL,
    pip_id INT NOT NULL,
    vendor_id VARCHAR(20) NOT NULL,
    assigned_amount DECIMAL(18,2) NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'assigned',
    assigned_at DATETIME2 NOT NULL DEFAULT GETDATE(),
    created_at DATETIME2 NOT NULL DEFAULT GETDATE(),
    updated_at DATETIME2 NOT NULL DEFAULT GETDATE(),
    CONSTRAINT uk_aip_code UNIQUE (aip_code),
    CONSTRAINT fk_pip_vendors_pip FOREIGN KEY (pip_id) REFERENCES pips(pip_id),
    CONSTRAINT fk_pip_vendors_vendor FOREIGN KEY (vendor_id) REFERENCES vendors(vendor_id)
);

CREATE INDEX idx_pip_vendors_pip_vendor ON pip_vendors(pip_id, vendor_id);
```

## 初期データ投入SQL

```sql
-- FGマスタ初期データ
INSERT INTO fgs (fg_code, fg_name, display_order) VALUES 
('A', N'機器・電気', 1),
('B', N'配管・計装', 2),
('C', N'土建・塗装', 3),
('D', N'その他', 4);

-- ベンダーマスタ初期データ
INSERT INTO vendors (vendor_id, vendor_code, vendor_name, contact_person, phone, email) VALUES
('V001', 'VND001', N'株式会社サプライヤーA', N'山田太郎', '03-1234-5678', 'yamada@supplier-a.com'),
('V002', 'VND002', N'株式会社サプライヤーB', N'佐藤花子', '03-2345-6789', 'sato@supplier-b.com'),
('V003', 'VND003', N'株式会社サプライヤーC', N'鈴木一郎', '03-3456-7890', 'suzuki@supplier-c.com');
```

## トリガー設定

```sql
-- 更新日時自動更新トリガー
CREATE TRIGGER trg_fgs_updated_at 
ON fgs
AFTER UPDATE
AS
BEGIN
    UPDATE fgs 
    SET updated_at = GETDATE()
    FROM fgs 
    INNER JOIN inserted ON fgs.fg_code = inserted.fg_code;
END;
GO

CREATE TRIGGER trg_vendors_updated_at 
ON vendors
AFTER UPDATE
AS
BEGIN
    UPDATE vendors 
    SET updated_at = GETDATE()
    FROM vendors 
    INNER JOIN inserted ON vendors.vendor_id = inserted.vendor_id;
END;
GO

CREATE TRIGGER trg_pips_updated_at 
ON pips
AFTER UPDATE
AS
BEGIN
    UPDATE pips 
    SET updated_at = GETDATE()
    FROM pips 
    INNER JOIN inserted ON pips.pip_id = inserted.pip_id;
END;
GO

CREATE TRIGGER trg_items_updated_at 
ON items
AFTER UPDATE
AS
BEGIN
    UPDATE items 
    SET updated_at = GETDATE()
    FROM items 
    INNER JOIN inserted ON items.item_id = inserted.item_id;
END;
GO

CREATE TRIGGER trg_pip_vendors_updated_at 
ON pip_vendors
AFTER UPDATE
AS
BEGIN
    UPDATE pip_vendors 
    SET updated_at = GETDATE()
    FROM pip_vendors 
    INNER JOIN inserted ON pip_vendors.aip_id = inserted.aip_id;
END;
GO

-- 購入品の合計金額自動計算トリガー
CREATE TRIGGER trg_items_total_price 
ON items
AFTER INSERT, UPDATE
AS
BEGIN
    UPDATE items 
    SET total_price = quantity * unit_price
    FROM items 
    INNER JOIN inserted ON items.item_id = inserted.item_id
    WHERE inserted.quantity IS NOT NULL AND inserted.unit_price IS NOT NULL;
END;
GO

-- PIPの合計金額自動更新トリガー
CREATE TRIGGER trg_pips_total_amount 
ON items
AFTER INSERT, UPDATE, DELETE
AS
BEGIN
    -- 影響を受けたPIPの合計金額を再計算
    UPDATE pips
    SET total_amount = ISNULL((
        SELECT SUM(total_price)
        FROM items
        WHERE items.pip_id = pips.pip_id
    ), 0)
    WHERE pip_id IN (
        SELECT DISTINCT pip_id FROM inserted WHERE pip_id IS NOT NULL
        UNION
        SELECT DISTINCT pip_id FROM deleted WHERE pip_id IS NOT NULL
    );
END;
GO
```

## パフォーマンス最適化

### インデックス戦略
1. 主キー・外部キーには自動的にインデックスが作成される
2. 検索条件によく使われるカラムにインデックスを追加
3. 複合インデックスは検索頻度の高い組み合わせに設定

### クエリ最適化のポイント
1. N+1問題を避けるため、JOINを活用
2. 大量データ取得時はページネーションを実装
3. 不要なカラムは取得しない（SELECT * を避ける）

## バックアップ・リカバリ戦略

### バックアップ
- 日次フルバックアップ
- トランザクションログバックアップ（1時間ごと）

### リカバリ
- ポイントインタイムリカバリ対応
- 災害復旧サイトへのレプリケーション（オプション）