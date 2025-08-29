import { AlertCircleIcon } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

type AlertMessageProps = {
	messages: Record<string, string>;
};

export const AlertMessages: React.FC<AlertMessageProps> = ({ messages }) => {
	return (
		<Alert variant="destructive">
			<AlertCircleIcon />
			<AlertTitle />
			<AlertDescription>
				<ul className="list-disc pl-4 space-y-1">
					{Object.entries(messages).map(([_, value], index) => (
						<li key={index}>{value}</li>
					))}
				</ul>
			</AlertDescription>
		</Alert>
	);
};

