/**
 * IBS Code マスターデータ
 * @deprecated masterData.tsを使用してください
 */

// masterData.tsからの再エクスポート（後方互換性のため）
import {
	getIbsCodeName as getIbsCodeNameFromMaster,
	ibsCodeMap,
} from './masterData';

export const ibsCodeNames: Record<string, string> = Object.fromEntries(
	Array.from(ibsCodeMap.entries()).map(([code, option]) => [
		code,
		option.description || option.label,
	]),
);

/** @deprecated masterData.tsのgetIbsCodeNameを使用してください */
export const getIbsCodeName = getIbsCodeNameFromMaster;

