import { createFileRoute } from '@tanstack/react-router';
import { ItemAssignmentView } from '../../features/item-assignment/components/ItemAssignmentView';

/**
 * 購入品管理画面のルーティング
 * 編集機能付きの購入品テーブル、PIPカードエリアのレイアウトを定義する
 */
export const Route = createFileRoute('/ps-ps/item-assignment')({
	component: () => <ItemAssignmentView />,
});
