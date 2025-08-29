/**
 * 統一マスターデータ
 * 選択肢データとマッピングを一元管理
 */

import type { SelectOption } from '../types/common';

/**
 * 拡張SelectOption - 説明付き
 */
export interface MasterOption extends SelectOption {
	/** 詳細説明（日本語） */
	description?: string;
}

/**
 * Cost Element マスターデータ
 */
export const costElementMaster: MasterOption[] = [
	{ code: '6C11', label: '土質調査', description: '土質調査' },
	{
		code: '6H13',
		label: 'S&T 熱交換機 U字管式熱交',
		description: 'S&T 熱交換機 U字管式熱交',
	},
	{
		code: '6H31',
		label: 'プレート式熱交換器 プレート式熱交換器',
		description: 'プレート式熱交換器 プレート式熱交換器',
	},
	{
		code: '6H41',
		label: '廃熱ボイラー 水管式 廃熱ボイラー',
		description: '廃熱ボイラー 水管式 廃熱ボイラー',
	},
	{
		code: '6H42',
		label: '廃熱ボイラー 煙管式 廃熱ボイラー',
		description: '廃熱ボイラー 煙管式 廃熱ボイラー',
	},
	{ code: '6H43', label: '-', description: '-' },
	{ code: '6H44', label: '-', description: '-' },
	{ code: '6H53', label: '-', description: '-' },
	{
		code: '6H98',
		label: 'その他熱交換機_その他',
		description: 'その他熱交換機_その他',
	},
	{
		code: '6J11',
		label: 'プロジェクトマネジメント',
		description: 'プロジェクトマネジメント',
	},
	{
		code: '6J31',
		label: 'アドミニストレーション',
		description: 'アドミニストレーション',
	},
	{ code: '6K45', label: '-', description: '-' },
	{
		code: '6L31',
		label: 'ドームルーフタンク 完成品タンク',
		description: 'ドームルーフタンク 完成品タンク',
	},
	{
		code: '6L32',
		label: 'ドームルーフタンク ノックダウンタンク',
		description: 'ドームルーフタンク ノックダウンタンク',
	},
	{ code: '6L36', label: '-', description: '-' },
	{
		code: '6L42',
		label: 'フラットルーフ・タンク ノックダウンタンク',
		description: 'フラットルーフ・タンク ノックダウンタンク',
	},
	{
		code: '6L61',
		label: '二重殻タンク 完成品タンク',
		description: '二重殻タンク 完成品タンク',
	},
	{ code: '6V11', label: '塔', description: '塔' },
	{
		code: '6V13',
		label: '塔 トレイ･サポート',
		description: '塔 トレイ･サポート',
	},
	{ code: '6V31', label: '反応器 反応器', description: '反応器 反応器' },
	{ code: '6V45', label: '-', description: '-' },
	{ code: '6V46', label: '-', description: '-' },
	{ code: '6V62', label: '-', description: '-' },
	{
		code: '6V81',
		label: 'スクラバー スクラバー',
		description: 'スクラバー スクラバー',
	},
	{ code: '6V95', label: '-', description: '-' },

	{ code: '6F22', label: 'Equipment - Mechanical', description: '機械設備' },
	{ code: '6F23', label: 'Equipment - Electrical', description: '制御装置' },
	{ code: '6G11', label: 'Piping - Main Lines', description: 'ポンプ設備' },
	{ code: '6G12', label: 'Piping - Branch Lines', description: '制御システム' },
	{
		code: '7A01',
		label: 'Instrumentation - Control',
		description: 'センサー機器',
	},
	{
		code: '7A02',
		label: 'Instrumentation - Safety',
		description: 'フィルター設備',
	},
	{ code: '8B15', label: 'Structural - Steel', description: '電源装置' },
	{ code: '8B16', label: 'Structural - Concrete', description: '計測機器' },
	{ code: '9C33', label: 'Civil - Foundation', description: '冷却設備' },
	{ code: '9D44', label: 'Civil - Underground', description: '事務用品' },
	{ code: '5E11', label: 'Basic Components', description: '基本部品' },
	{ code: '5E12', label: 'Assembly Components', description: '組立部品' },
	{ code: '4D21', label: 'Auxiliary Equipment', description: '補助機器' },
	{ code: '4D22', label: 'Control Components', description: '制御部品' },
	{ code: '3C31', label: 'Electronic Parts', description: '電子部品' },
	{ code: '3C32', label: 'Mechanical Parts', description: '機械部品' },
	{ code: '12A1', label: 'Lubrication System', description: '潤滑装置' },
	{ code: '12B2', label: 'Wiring Equipment', description: '配線機器' },
];

/**
 * IBS Code マスターデータ
 */
export const ibsCodeMaster: MasterOption[] = [
	{ code: 'V11', label: 'Ammonia Converter', description: 'Ammonia Converter' },
	{
		code: 'V13',
		label: 'Secondary Reformer',
		description: 'Secondary Reformer',
	},
	{ code: 'V15', label: 'Reactor', description: 'Reactor' },
	{
		code: 'V21',
		label: 'CO2 Stripper / Absorber',
		description: 'CO2 Stripper / Absorber',
	},
	{ code: 'V22', label: 'General Tower', description: 'General Tower' },
	{ code: 'V32', label: 'HP Vessel', description: 'HP Vessel' },
	{ code: 'V33', label: 'General Vessel', description: 'General Vessel' },
	{
		code: 'V40',
		label: 'S&T Heat Exchanger',
		description: 'S&T Heat Exchanger',
	},
	{ code: 'V41', label: 'Waste Heat Boiler', description: 'Waste Heat Boiler' },
	{
		code: 'V42',
		label: 'HP & Cr-Mo Heat Exchanger',
		description: 'HP & Cr-Mo Heat Exchanger',
	},
	{
		code: 'V43',
		label: 'Syn Loop Heat Exchanger',
		description: 'Syn Loop Heat Exchanger',
	},
	{ code: 'V44', label: 'Urea Stripper', description: 'Urea Stripper' },
	{
		code: 'V46',
		label: 'Urea Grade S&T Heat Exchanger',
		description: 'Urea Grade S&T Heat Exchanger',
	},
	{
		code: 'V47',
		label: 'General S&T Heat Exchanger',
		description: 'General S&T Heat Exchanger',
	},
	{
		code: 'V51',
		label: 'Ammonia Storage Tank',
		description: 'Ammonia Storage Tank',
	},
	{ code: 'V61', label: 'Shop Tank', description: 'Shop Tank' },
	{ code: 'V80', label: 'Filter', description: 'Filter' },
	{ code: 'V81', label: 'Cartridge Filter', description: 'Cartridge Filter' },
	{
		code: 'V92',
		label: 'Plate Heat Exchanger',
		description: 'Plate Heat Exchanger',
	},
	{ code: 'V93', label: 'Heater & Chiller', description: 'Heater & Chiller' },
	{ code: 'VB1', label: 'Silencer', description: 'Silencer' },
	{ code: 'VC2', label: 'Steam Ejector', description: 'Steam Ejector' },
	{ code: 'VX1', label: 'Vacuum System', description: 'Vacuum System' },
	{
		code: 'VX2',
		label: 'Granulation Equipment',
		description: 'Granulation Equipment',
	},

	{ code: 'F11', label: 'Process Equipment - Primary', description: '制御弁' },
	{
		code: 'F12',
		label: 'Process Equipment - Secondary',
		description: '安全弁',
	},
	{ code: 'G21', label: 'Utility Systems - Power', description: '主ポンプ' },
	{ code: 'G22', label: 'Utility Systems - Water', description: '制御盤' },
	{ code: 'H31', label: 'Control Systems - DCS', description: '温度センサー' },
	{ code: 'H32', label: 'Control Systems - SIS', description: '圧力センサー' },
	{
		code: 'J41',
		label: 'Infrastructure - Buildings',
		description: '電源ユニット',
	},
	{ code: 'J42', label: 'Infrastructure - Roads', description: '計測ユニット' },
	{
		code: 'K51',
		label: 'Support Systems - Maintenance',
		description: '冷却ユニット',
	},
	{
		code: 'K52',
		label: 'Support Systems - Operations',
		description: '一般機器',
	},
	{ code: 'A12', label: 'Lubrication Systems', description: '潤滑システム' },
	{ code: 'B22', label: 'Foundation Components', description: '基礎部品' },
	{ code: 'C33', label: 'Assembly Parts', description: '組立品' },
	{ code: 'D44', label: 'Auxiliary Parts', description: '補助品' },
	{ code: 'E55', label: 'Control Parts', description: '制御品' },
	{ code: 'L66', label: 'Electronic Parts', description: '電子品' },
];

/**
 * Cost Element検索マップ（高速検索用）
 */
export const costElementMap = new Map(
	costElementMaster.map((option) => [option.code, option]),
);

/**
 * IBS Code検索マップ（高速検索用）
 */
export const ibsCodeMap = new Map(
	ibsCodeMaster.map((option) => [option.code, option]),
);

/**
 * Cost Element名称を取得
 */
export const getCostElementName = (code: string): string => {
	const option = costElementMap.get(code);
	return option?.description || option?.label || `コスト${code}`;
};

/**
 * IBS Code名称を取得
 */
export const getIbsCodeName = (code: string): string => {
	const option = ibsCodeMap.get(code);
	return option?.description || option?.label || `部品${code}`;
};

/**
 * Cost Element英語ラベルを取得
 */
export const getCostElementLabel = (code: string): string => {
	const option = costElementMap.get(code);
	return option?.label || `Cost Element ${code}`;
};

/**
 * IBS Code英語ラベルを取得
 */
export const getIbsCodeLabel = (code: string): string => {
	const option = ibsCodeMap.get(code);
	return option?.label || `IBS Code ${code}`;
};

// SelectOption形式でのエクスポート（後方互換性用）
export const costElementOptions: SelectOption[] = costElementMaster.map(
	({ code, label }) => ({ code, label }),
);
export const ibsCodeOptions: SelectOption[] = ibsCodeMaster.map(
	({ code, label }) => ({ code, label }),
);

