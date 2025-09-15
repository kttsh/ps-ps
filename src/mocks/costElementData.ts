/**
 * Cost Element マスターデータ
 * @deprecated masterData.tsを使用してください
 */

// masterData.tsからの再エクスポート（後方互換性のため）
import {
	costElementMap,
	getCostElementName as getCostElementNameFromMaster,
} from './masterData';

export const costElementNames: Record<string, string> = Object.fromEntries(
	Array.from(costElementMap.entries()).map(([code, option]) => [
		code,
		option.description || option.label,
	]),
);

/** @deprecated masterData.tsのgetCostElementNameを使用してください */
export const getCostElementName = getCostElementNameFromMaster;
