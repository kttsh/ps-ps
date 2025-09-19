import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PageHeaderProps {
	title: string;
	onBack: () => void;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title, onBack }) => (
	<div className="flex items-center gap-6">
		<Button
			size="sm"
			variant="outline"
			onClick={onBack}
			className="text-gray-800"
		>
			<ArrowLeft className="w-4 h-4" />
			Back
		</Button>
		<h2 className="text-lg font-semibold text-gray-800">{title}</h2>
	</div>
);