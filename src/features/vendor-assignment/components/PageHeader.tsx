import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PageHeaderProps {
	title: string;
	onBack: () => void;
	onCreateAip: () => void;
	selectedVendors: any[];
}

export const PageHeader: React.FC<PageHeaderProps> = ({
	title,
	onBack,
	onCreateAip,
	selectedVendors,
}) => (
	<div className="flex items-center gap-6 justify-between">
		{/* 左側：戻るボタンとタイトル */}
		<div className="flex items-center gap-4">
			<Button
				size="sm"
				variant="outline"
				onClick={onBack}
				className="text-gray-800"
			>
				<ArrowLeft className="w-4 h-4" />
				戻る
			</Button>
			<h2 className="text-lg font-semibold text-gray-800">{title}</h2>
		</div>

		{/* 右側：操作ボタンエリア */}
		<div className="flex items-end justify-between mt-2">
			<div className="flex items-center gap-2">
				{/* AIP生成 */}
				<Button
					size="sm"
					variant="outline"
					disabled={selectedVendors.length === 0}
					onClick={onCreateAip}
					className="flex items-center gap-2 h-8 px-3 bg-orange-500 hover:bg-orange-500/80 text-white hover:text-white cursor-pointer"
				>
					Create AIP
				</Button>
			</div>
		</div>
	</div>
);
