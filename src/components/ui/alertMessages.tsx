import { AlertCircleIcon } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

type AlertMessageProps = {
	messages: Record<string, string>;
};

export const AlertMessages = ({ messages }: AlertMessageProps) => {
	return (
		<Alert variant="destructive">
			<AlertCircleIcon />
			<AlertTitle />
			<AlertDescription>
				<ul className="list-disc pl-4 space-y-1">
					{Object.entries(messages).map(([key, value]) => (
						<li key={key}>{value}</li>
					))}
				</ul>
			</AlertDescription>
		</Alert>
	);
};