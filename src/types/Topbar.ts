export interface SearchBarProps {
	onSearch?: (query: string) => void;
	placeholder?: string;
	className?: string;
}

export interface NotificationBellProps {
	count?: number;
	onClick?: () => void;
	className?: string;
}

export interface UserProfileProps {
	user?: {
		name: string;
		avatar?: string;
	};
	onClick?: () => void;
	className?: string;
}

export interface TopbarProps {
	onSearch?: (query: string) => void;
	notificationCount?: number;
	user?: {
		name: string;
		avatar?: string;
	};
	onNotificationClick?: () => void;
	onUserClick?: () => void;
	path: string;
}

