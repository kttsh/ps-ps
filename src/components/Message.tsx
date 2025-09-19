/**
 * ヘッダーに表示するメッセージコンポーネント
 */
export const Message = () => {
	return (
		<div className="bg-white max-w-screen w-full z-40 shadow-sm h-8 mx-auto lg:px-8 flex items-center text-sm">
			<p className="text-gray-800">
				Cautions when using : Don't upload information on list-regulated
				products under export-related laws and US technical information
				　利用における注意事項 :
				輸法該当技術・米国技術に該当する情報は登録してはならない
			</p>
		</div>
	);
};