import { useEffect } from 'react';
import { toast } from 'sonner';
import { useAlertStore } from '@/stores/useAlartStore';
import { Button } from './ui/button';

export function Toast() {
	const { isAlertVisible, setIsAlertVisible, alertType, messages } =
		useAlertStore();
	const duration = 4000;

	useEffect(() => {
		if (isAlertVisible && messages.length > 0) {
			toast.custom(() => (
				<div
					className={`border rounded-md shadow-lg p-4 relative w-[300px] flex flex-col gap-2 ${
						{
							success: 'bg-green-100 border-green-300',
							error: 'bg-red-100 border-red-300',
							info: 'bg-blue-100 border-blue-300',
							warning: 'bg-yellow-100 border-yellow-300',
						}[alertType]
					}`}
					style={{ paddingBottom: '1.5rem' }}
				>
					{messages.map((msg) => (
						<p key={msg.id} className="text-sm text-muted-foreground">
							{msg.text}
						</p>
					))}

					<Button
						className="mt-2 text-xs h-8 w-12 hover:underline self-end"
						onClick={() => setIsAlertVisible(false)}
					>
						Close
					</Button>
					<div
						className={`absolute bottom-0 left-0 h-1 ${
							{
								success: 'bg-green-500',
								error: 'bg-red-500',
								info: 'bg-blue-500',
								warning: 'bg-yellow-500',
							}[alertType]
						}`}
						style={{
							animation: `progress ${duration}ms linear forwards`,
							width: '100%',
						}}
					/>
					<style>{`
            @keyframes progress {
              from { width: 100%; }
              to { width: 0%; }
            }
          `}</style>
				</div>
			));

			const timer = setTimeout(() => {
				setIsAlertVisible(false);
			}, duration);

			return () => clearTimeout(timer);
		}
	}, [isAlertVisible, alertType, messages, setIsAlertVisible]);

	return null;
}

