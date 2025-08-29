import type { LucideIcon } from 'lucide-react';

/**
 * 空状態表示コンポーネント
 */
export const EmptyState = ({
	icon: Icon,
	label,
}: {
	icon: LucideIcon;
	label: string;
}) => {
	return (
		<div className="text-center text-gray-500">
			<Icon className="w-12 h-12 mx-auto mb-4 text-gray-400" />
			<p>{label}</p>
		</div>
	);
};

