/**
 * API関連の関数を提供するモジュール
 *
 * このモジュールは、バックエンドAPIとの通信を担当する関数を提供します。
 * 現在の実装では、実際のAPIリクエストをシミュレートするためのモックデータと
 * 遅延関数を使用しています。
 *
 * 実際の実装では、このモジュールをfetchやaxiosなどを使用した
 * 実際のAPIリクエスト関数に置き換えることができます。
 */
import type { ProcurementItem } from "../types/procurement-item";
import type { Milestone } from "../types/milestone";
import type { ScheduleUnit } from "../types/schedule-unit";

/**
 * APIリクエストのシミュレーション用の遅延関数
 * 指定されたミリ秒だけ処理を遅延させます
 *
 * @param {number} ms - 遅延させるミリ秒
 * @returns {Promise<void>} 指定時間後に解決するPromise
 */
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// サンプルの日程管理単位データ
// 実際の実装では、このデータはAPIから取得します
const sampleScheduleUnits: ScheduleUnit[] = [
	{
		id: "1",
		name: "電子部品調達計画A",
		description: "主要電子部品の調達とサプライヤー管理",
		startDate: new Date("2023-10-01"),
		endDate: new Date("2024-03-31"),
		status: "進行中",
		assignees: ["田中太郎", "佐藤健太"],
		tags: ["高優先度", "電子部品"],
		order: ["ORD-2023-001"],
		function: ["調達"],
	},
	{
		id: "2",
		name: "機械部品調達計画B",
		description: "機械部品の国内調達とコスト削減",
		startDate: new Date("2023-11-15"),
		endDate: new Date("2024-05-20"),
		status: "進行中",
		assignees: ["佐藤花子", "鈴木雄太"],
		tags: ["中優先度", "機械部品"],
		order: ["ORD-2023-002"],
		function: ["調達"],
	},
	{
		id: "3",
		name: "原材料調達計画C",
		description: "原材料の国際調達と品質管理",
		startDate: new Date("2023-09-01"),
		endDate: new Date("2024-02-28"),
		status: "遅延",
		assignees: ["鈴木一郎", "高橋直子", "伊藤誠"],
		tags: ["高優先度", "原材料"],
		order: ["ORD-2023-003"],
		function: ["品質管理"],
	},
	{
		id: "4",
		name: "包装資材調達計画D",
		description: "環境に配慮した包装資材の調達",
		startDate: new Date("2023-12-01"),
		endDate: new Date("2024-04-30"),
		status: "未開始",
		assignees: ["山田次郎"],
		tags: ["低優先度", "包装"],
		order: ["ORD-2023-004"],
		function: ["環境対応"],
	},
	{
		id: "5",
		name: "ITハードウェア調達計画E",
		description: "社内ITインフラ更新のための機器調達",
		startDate: new Date("2024-01-15"),
		endDate: new Date("2024-07-15"),
		status: "未開始",
		assignees: ["高橋真理", "中村健太"],
		tags: ["中優先度", "IT機器"],
		order: ["ORD-2024-001"],
		function: ["IT"],
	},
];

// サンプルの調達品データ
// 日程管理単位IDをキーとして、関連する調達品のリストを保持
const sampleProcurementItems: Record<string, ProcurementItem[]> = {
	"1": [
		{
			id: "p1",
			name: "半導体チップA",
			category: "電子部品",
			quantity: 1000,
			unit: "個",
			unitPrice: 500,
			supplier: "テクノ電子株式会社",
			deliveryDate: new Date("2024-01-15"),
			status: "納品済み",
		},
		{
			id: "p2",
			name: "コネクタB",
			category: "電子部品",
			quantity: 5000,
			unit: "個",
			unitPrice: 50,
			supplier: "コネクト工業",
			deliveryDate: new Date("2024-02-20"),
			status: "発注済み",
		},
		{
			id: "p3",
			name: "基板C",
			category: "電子部品",
			quantity: 500,
			unit: "枚",
			unitPrice: 2000,
			supplier: "プリント基板株式会社",
			deliveryDate: new Date("2024-03-10"),
			status: "未発注",
		},
	],
	"2": [
		{
			id: "p4",
			name: "モーターユニットD",
			category: "機械部品",
			quantity: 200,
			unit: "個",
			unitPrice: 15000,
			supplier: "モーター工業",
			deliveryDate: new Date("2024-02-28"),
			status: "発注済み",
		},
		{
			id: "p5",
			name: "ギアセットE",
			category: "機械部品",
			quantity: 1000,
			unit: "セット",
			unitPrice: 3000,
			supplier: "精密機械株式会社",
			deliveryDate: new Date("2024-03-15"),
			status: "未発注",
		},
	],
	"3": [
		{
			id: "p6",
			name: "アルミニウム板材",
			category: "原材料",
			quantity: 500,
			unit: "kg",
			unitPrice: 800,
			supplier: "メタル商事",
			deliveryDate: new Date("2024-01-30"),
			status: "納品済み",
		},
		{
			id: "p7",
			name: "特殊プラスチック",
			category: "原材料",
			quantity: 300,
			unit: "kg",
			unitPrice: 1200,
			supplier: "化学工業株式会社",
			deliveryDate: new Date("2024-02-15"),
			status: "発注済み",
		},
	],
	"4": [
		{
			id: "p8",
			name: "環境配慮型段ボール",
			category: "包装資材",
			quantity: 10000,
			unit: "枚",
			unitPrice: 30,
			supplier: "エコパッケージ",
			deliveryDate: new Date("2024-04-10"),
			status: "未発注",
		},
	],
	"5": [
		{
			id: "p9",
			name: "ノートPC",
			category: "IT機器",
			quantity: 50,
			unit: "台",
			unitPrice: 120000,
			supplier: "テックソリューションズ",
			deliveryDate: new Date("2024-03-20"),
			status: "発注済み",
		},
		{
			id: "p10",
			name: "サーバーラック",
			category: "IT機器",
			quantity: 5,
			unit: "台",
			unitPrice: 350000,
			supplier: "データシステム株式会社",
			deliveryDate: new Date("2024-05-10"),
			status: "未発注",
		},
	],
};

// サンプルのマイルストンデータ
// 日程管理単位IDをキーとして、関連するマイルストンのリストを保持
const sampleMilestones: Record<string, Milestone[]> = {
	"1": [
		{
			id: "m1",
			name: "要件定義完了",
			description: "電子部品の要件定義と仕様書の作成",
			dueDate: new Date("2023-10-15"),
			completedDate: new Date("2023-10-12"),
			status: "完了",
			responsible: "田中太郎",
		},
		{
			id: "m2",
			name: "サプライヤー選定",
			description: "複数のサプライヤーから最適な取引先を選定",
			dueDate: new Date("2023-11-30"),
			completedDate: new Date("2023-11-25"),
			status: "完了",
			responsible: "佐藤健太",
		},
		{
			id: "m3",
			name: "発注完了",
			description: "全ての電子部品の発注手続き完了",
			dueDate: new Date("2023-12-15"),
			completedDate: new Date("2023-12-20"),
			status: "遅延完了",
			responsible: "田中太郎",
		},
		{
			id: "m4",
			name: "納品完了",
			description: "全ての電子部品の納品完了",
			dueDate: new Date("2024-03-31"),
			completedDate: null,
			status: "進行中",
			responsible: "佐藤健太",
		},
	],
	"2": [
		{
			id: "m5",
			name: "要件定義完了",
			description: "機械部品の要件定義と仕様書の作成",
			dueDate: new Date("2023-11-30"),
			completedDate: new Date("2023-12-05"),
			status: "遅延完了",
			responsible: "佐藤花子",
		},
		{
			id: "m6",
			name: "サプライヤー選定",
			description: "複数のサプライヤーから最適な取引先を選定",
			dueDate: new Date("2024-01-15"),
			completedDate: new Date("2024-01-10"),
			status: "完了",
			responsible: "鈴木雄太",
		},
		{
			id: "m7",
			name: "発注完了",
			description: "全ての機械部品の発注手続き完了",
			dueDate: new Date("2024-02-15"),
			completedDate: null,
			status: "進行中",
			responsible: "佐藤花子",
		},
	],
	"3": [
		{
			id: "m8",
			name: "国際調達計画策定",
			description: "国際調達のための計画と戦略の策定",
			dueDate: new Date("2023-09-30"),
			completedDate: new Date("2023-10-10"),
			status: "遅延完了",
			responsible: "鈴木一郎",
		},
		{
			id: "m9",
			name: "品質基準策定",
			description: "原材料の品質基準と検査方法の策定",
			dueDate: new Date("2023-11-15"),
			completedDate: new Date("2023-11-20"),
			status: "遅延完了",
			responsible: "高橋直子",
		},
		{
			id: "m10",
			name: "サプライヤー契約",
			description: "選定したサプライヤーとの契約締結",
			dueDate: new Date("2023-12-31"),
			completedDate: new Date("2024-01-15"),
			status: "遅延完了",
			responsible: "伊藤誠",
		},
	],
	"4": [
		{
			id: "m11",
			name: "環境基準調査",
			description: "包装資材の環境基準と規制の調査",
			dueDate: new Date("2023-12-31"),
			completedDate: new Date("2023-12-28"),
			status: "完了",
			responsible: "山田次郎",
		},
		{
			id: "m12",
			name: "サプライヤー選定",
			description: "環境に配慮したサプライヤーの選定",
			dueDate: new Date("2024-02-15"),
			completedDate: null,
			status: "未開始",
			responsible: "山田次郎",
		},
	],
	"5": [
		{
			id: "m13",
			name: "IT機器要件定義",
			description: "必要なIT機器の要件定義と仕様策定",
			dueDate: new Date("2024-01-31"),
			completedDate: new Date("2024-01-25"),
			status: "完了",
			responsible: "高橋真理",
		},
		{
			id: "m14",
			name: "予算承認",
			description: "IT機器調達のための予算承認取得",
			dueDate: new Date("2024-02-15"),
			completedDate: new Date("2024-02-10"),
			status: "完了",
			responsible: "中村健太",
		},
		{
			id: "m15",
			name: "発注完了",
			description: "全てのIT機器の発注手続き完了",
			dueDate: new Date("2024-03-15"),
			completedDate: null,
			status: "進行中",
			responsible: "高橋真理",
		},
	],
};

/**
 * 日程管理単位を取得するAPI関数
 *
 * 指定されたIDの日程管理単位の詳細情報を取得します。
 *
 * @param {string} unitId - 取得する日程管理単位のID
 * @returns {Promise<ScheduleUnit | null>} 日程管理単位の情報、存在しない場合はnull
 */
export async function fetchScheduleUnitById(
	unitId: string,
): Promise<ScheduleUnit | null> {
	// 実際のAPIリクエストをシミュレート
	await delay(500);

	// 該当する日程管理単位IDのデータを返す
	return sampleScheduleUnits.find((unit) => unit.id === unitId) || null;
}

/**
 * 調達品リストを取得するAPI関数
 *
 * 指定された日程管理単位IDに関連する調達品のリストを取得します。
 *
 * @param {string} scheduleUnitId - 日程管理単位ID
 * @returns {Promise<ProcurementItem[]>} 調達品のリスト
 */
export async function fetchProcurementItems(
	scheduleUnitId: string,
): Promise<ProcurementItem[]> {
	// 実際のAPIリクエストをシミュレート
	await delay(800);

	// 該当する日程管理単位IDの調達品を返す
	return sampleProcurementItems[scheduleUnitId] || [];
}

/**
 * マイルストンリストを取得するAPI関数
 *
 * 指定された日程管理単位IDに関連するマイルストンのリストを取得します。
 *
 * @param {string} scheduleUnitId - 日程管理単位ID
 * @returns {Promise<Milestone[]>} マイルストンのリスト
 */
export async function fetchMilestones(
	scheduleUnitId: string,
): Promise<Milestone[]> {
	// 実際のAPIリクエストをシミュレート
	await delay(1000);

	// 該当する日程管理単位IDのマイルストンを返す
	return sampleMilestones[scheduleUnitId] || [];
}

