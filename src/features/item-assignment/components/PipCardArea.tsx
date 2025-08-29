import { EmptyState } from '@/components';
import type { Item } from '@/types';
import { Plus } from 'lucide-react';

/**
 * 購入品管理画面 PIPカードなしのアラート/PIPカード表示エリア
 * committedItems: 割当確定後のレコード一覧
 */
export const PipCardArea = ({ committedItems }: { committedItems: Item[] }) => {
	return committedItems.length === 0 ? (
		// PIPカードなしのアラート
		<div className="pt-30">
			<EmptyState icon={Plus} label="アイテムを選択してPIPを生成してください" />
		</div>
	) : (
		// PIPカード表示エリア
		<div className="bg-white rounded-lg shadow-sm border border-gray-300 flex flex-col h-[80%]">
			<ul className="text-sm space-y-1 list-disc list-inside text-gray-800">
				{committedItems.map((item) => (
					<li key={String(item)}>{JSON.stringify(item)}</li>
				))}
			</ul>
		</div>
	);
};

