import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { type FG, useFgsStore } from '@/stores/useFgsStore';
import { useFgCodeUrlSync } from '@/hooks/useFgCodeUrlSync';

interface OptionType {
	value: string;
	label: string;
}

interface Props {
	fgOptions: OptionType[];
	localFG: FG | null;
	setLocalFG: (fg: FG) => void;
}

export const FGSelector: React.FC<Props> = ({
	fgOptions,
	localFG,
	setLocalFG,
}) => {
	// FGリストの状態
	const { fgs } = useFgsStore();

	// URL同期フックを使用
	const { setFgCodeToUrl } = useFgCodeUrlSync({
		fgs,
		onFgChange: (fg) => {
			// 現在の値と異なる場合のみ更新
			const newFgCode = fg?.fgCode;
			const currentFgCode = localFG?.fgCode;
			
			if (newFgCode !== currentFgCode) {
				setLocalFG(fg || ({} as FG));
			}
		},
	});

	// FGセレクトボックスonChangeイベント
	const handleFG = (value: string) => {
		const fg = fgs.find((f) => f.fgCode === value);
		if (fg) {
			setLocalFG(fg);
			setFgCodeToUrl(fg.fgCode);  // URLに反映
		}
	};

	return (
		<Select onValueChange={handleFG} value={localFG?.fgCode}>
			<SelectTrigger
				className={`mt-1 w-[100%] bg-white ${!localFG ? 'bg-red-100' : ''}`}
			>
				<SelectValue placeholder="Function Group" />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					{fgOptions.map((fg) => (
						<SelectItem key={fg.value} value={fg.value}>
							{fg.label}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	);
};

