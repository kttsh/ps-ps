import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from '@/components/ui/tooltip';
import { Merge, X } from 'lucide-react';
import type { PipInfo } from '../utils/createMergePipPayload';

interface Props {
	showMergeDialog: boolean;
	setShowMergeDialog: React.Dispatch<React.SetStateAction<boolean>>;
	nickname: string;
	setNickname: React.Dispatch<React.SetStateAction<string>>;
	handleMergePips: () => void;
	selectedPips: PipInfo[];
}

export const MergeDialog: React.FC<Props> = ({
	showMergeDialog,
	setShowMergeDialog,
	nickname,
	setNickname,
	handleMergePips,
	selectedPips
}) => {
	return (
		<Dialog open={showMergeDialog} onOpenChange={setShowMergeDialog}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>選択した PIP を統合しますか？</DialogTitle>
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
				<div>
					<Label className="text-sm text-gray-700">Nickname</Label>
					<Input
						className="bg-white border-gray-300 mt-1 w-full"
						value={nickname}
						onChange={(e) => setNickname(e.target.value)}
					/>
				</div>
				<DialogFooter className="mt-2">
					<Button variant="outline" onClick={() => setShowMergeDialog(false)}>
						<X className="w-4 h-4" />
						Cancel
					</Button>
					<Button
						variant="outline"
						onClick={() => {
							handleMergePips();
							setShowMergeDialog(false);
						}}
						className="flex items-center gap-2 px-3 bg-muted-indigo hover:bg-muted-indigo/80 text-white hover:text-white cursor-pointer"
					>
						<Merge className="w-4 h-4" />
						Merge
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};