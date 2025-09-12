import { Plus } from 'lucide-react';
import { EmptyState } from '@/components';
import { usePipGenerationModeStore } from '@/stores/usePipGenerationModeStore';
import type { Item } from '@/types';
import { ItemPipCardGrid } from './ItemPipCardGrid';

interface Props {
	committedItems: Item[];
	setCommittedItems: React.Dispatch<React.SetStateAction<Item[]>>;
	setItems: React.Dispatch<React.SetStateAction<Item[]>>;
	nickname: string;
	setNickname: React.Dispatch<React.SetStateAction<string>>;
}

/**
 * 購入品管理画面 PIPカードなしのアラート/PIPカード表示エリア
 * committedItems: 割当確定後のレコード一覧
 */
export const PipCardArea: React.FC<Props> = ({
	committedItems,
	setCommittedItems,
	setItems,
	nickname,
	setNickname,
}) => {
	const { pipGenerationMode } = usePipGenerationModeStore();
	return committedItems.length === 0 && pipGenerationMode === 'generation' ? (
		// PIPカードなしのアラート
		<div className="pt-30">
			<EmptyState icon={Plus} label="Please select items and create a PIP." />
		</div>
	) : (
		<ItemPipCardGrid
			committedItems={committedItems}
			setCommittedItems={setCommittedItems}
			setItems={setItems}
			nickname={nickname}
			setNickname={setNickname}
		/>
	);
};
