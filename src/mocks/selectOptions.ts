/**
 * @deprecated masterData.tsを使用してください
 */

// masterData.tsからの再エクスポート（後方互換性のため）
export {
	costElementOptions,
	ibsCodeOptions,
} from './masterData';

// Map型の再エクスポート
import { costElementMap, ibsCodeMap } from './masterData';
export const costElementCodeMap = new Map(
	Array.from(costElementMap.entries()).map(([code, option]) => [
		code,
		option.label,
	]),
);
export { ibsCodeMap };
