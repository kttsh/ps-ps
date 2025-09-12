import { Trash2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from '@/components/ui/tooltip';
import { useAlertStore } from '@/stores/useAlartStore';
import { usePipsStore } from '@/stores/usePipsStore';
import { useSelectedFGStore } from '@/stores/useSelectedFgStore';
import { useSelectedJobNoStore } from '@/stores/useSelectedJobNoStore';
import { useDeletePips } from '../hooks/useDeletePips';
import { convertPipSelectionToPayload } from '../utils/convertPipSelectionToPayload';

interface Props {
	showDeleteDialog: boolean;
	setShowDeleteDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DeleteDialog: React.FC<Props> = ({
	showDeleteDialog,
	setShowDeleteDialog,
}) => {
	const { pipsData, pipSelection } = usePipsStore();
	const { selectedFG } = useSelectedFGStore();
	const { selectedJobNo } = useSelectedJobNoStore();

	const { mutate: deletePips } = useDeletePips();

	// メッセージ表示
	const { showAlert } = useAlertStore();

	const selectedPips = Object.keys(pipSelection)
		.filter((code) => pipSelection[code])
		.map((code) => {
			const pip = pipsData.find((p: any) => p.pipCode === code);
			return pip ? { code: pip.pipCode, nickname: pip.pipNickName } : null;
		})
		.filter(Boolean) as { code: string; nickname: string }[];

	return (
		<Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>選択した PIP を削除しますか？</DialogTitle>
				</DialogHeader>
				<div className="space-y-4">
					<Label className="mb-2 text-gray-700">選択したPIP :</Label>
					<div className="flex flex-wrap gap-2">
						{selectedPips.slice(0, 5).map(({ code, nickname }) => (
							<Tooltip key={code}>
								<TooltipTrigger asChild>
									<span className="px-2 py-1 bg-gray-100 rounded text-sm truncate max-w-[150px] cursor-default">
										{code}
									</span>
								</TooltipTrigger>
								{nickname && (
									<TooltipContent>
										<p>{nickname}</p>
									</TooltipContent>
								)}
							</Tooltip>
						))}
					</div>
				</div>
				<DialogFooter className="mt-2">
					<Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
						<X className="w-4 h-4" />
						Cancel
					</Button>
					<Button
						variant="outline"
						onClick={() => {
							if (selectedFG) {
								const value = convertPipSelectionToPayload(
									pipSelection,
									'SAMPLE_USER',
									selectedJobNo,
									selectedFG.fgCode,
								);
								deletePips(value, {
									onSuccess: () => {
										setShowDeleteDialog(false);
										showAlert(['DELETE_SUCCESS'], 'success');
									},
									onError: () => {
										setShowDeleteDialog(false);
										showAlert(['DELETE_ERROR'], 'error');
									},
								});
							}
						}}
						className="flex items-center gap-2 px-3 bg-red-500 hover:bg-red-400 text-white hover:text-white cursor-pointer"
					>
						<Trash2 className="w-4 h-4" />
						Delete
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};