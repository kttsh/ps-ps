'use client';

import { Calendar, FileText, Tag, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from '@/components/ui/card';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';
import { formatDate } from '../lib/utils';
import type { ScheduleUnit } from '../types/schedule-unit';

interface UnitCardProps {
	unit: ScheduleUnit;
}

export const UnitCard: React.FC<UnitCardProps> = ({ unit }) => {
	// 進捗状況に応じたバッジのスタイルを設定
	const getStatusBadgeVariant = (status: string) => {
		switch (status) {
			case '完了':
				return 'success';
			case '進行中':
				return 'default';
			case '遅延':
				return 'destructive';
			case '未開始':
				return 'secondary';
			default:
				return 'outline';
		}
	};

	// 担当者が複数いる場合の表示を処理
	const displayAssignees = () => {
		if (unit.assignees.length === 1) {
			return unit.assignees[0];
		}
		return `${unit.assignees[0]} 他 ${unit.assignees.length - 1}名`;
	};

	return (
		<Card className="cursor-pointer hover:shadow-md transition-shadow duration-200 h-full flex flex-col">
			<CardHeader className="pb-2">
				<div className="flex justify-between items-start">
					<h3 className="font-semibold text-lg">{unit.name}</h3>
					<Badge variant={getStatusBadgeVariant(unit.status) as any}>
						{unit.status}
					</Badge>
				</div>
			</CardHeader>
			<CardContent className="flex-grow">
				<div className="space-y-2">
					<div className="flex items-center text-sm">
						<Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
						<span>
							{formatDate(unit.startDate)} 〜 {formatDate(unit.endDate)}
						</span>
					</div>

					<div className="flex items-center text-sm">
						<User className="h-4 w-4 mr-2 text-muted-foreground" />
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<span>{displayAssignees()}</span>
								</TooltipTrigger>
								<TooltipContent className="p-2 max-w-xs">
									<p className="font-semibold mb-1">担当者一覧</p>
									<ul className="list-disc pl-4">
										{unit.assignees.map((assignee, index) => (
											<li key={index}>{assignee}</li>
										))}
									</ul>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					</div>

					<div className="flex items-center text-sm">
						<Tag className="h-4 w-4 mr-2 text-muted-foreground" />
						<span>{unit.function}</span>
					</div>

					<div className="flex items-center text-sm">
						<FileText className="h-4 w-4 mr-2 text-muted-foreground" />
						<span>{unit.order}</span>
					</div>
				</div>
			</CardContent>
			<CardFooter className="pt-2 flex flex-wrap gap-1">
				{unit.tags.map((tag, index) => (
					<Badge key={index} variant="outline" className="text-xs">
						{tag}
					</Badge>
				))}
			</CardFooter>
		</Card>
	);
};