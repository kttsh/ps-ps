'use client';

import { Link } from '@tanstack/react-router';
import type { ScheduleUnit } from '../types/schedule-unit';
import { UnitCard } from './UnitCard';

interface UnitCardListProps {
	units: ScheduleUnit[];
}

export const UnitCardList: React.FC<UnitCardListProps> = ({ units }) => {
	if (units.length === 0) {
		return (
			<div className="flex flex-col items-center justify-center p-12 bg-muted/20 rounded-lg border border-dashed">
				<p className="text-muted-foreground text-center">
					条件に一致する日程管理単位が見つかりませんでした。
					<br />
					フィルタ条件を変更してください。
				</p>
			</div>
		);
	}

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
			{units.map((unit) => (
				<Link
					key={unit.id}
					to="/msr/milestone/$MSRMngCode"
					params={{ MSRMngCode: unit.id }}
				>
					<UnitCard key={unit.id} unit={unit} />
				</Link>
			))}
		</div>
	);
};