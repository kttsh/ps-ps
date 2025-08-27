/**
 * ホーム画面のメッセージエリアを定義
 * @returns
 */
export const Message = () => {
	return (
		<div className="isolate rounded-xl bg-gray-200/30 shadow-lg ring-1 ring-black/5 h-60 w-120 p-5">
			<h4>message:</h4>
			<p className="mt-2 text-red-600">
				Cautions when using : Don't upload information on list-regulated
				products under export-related laws and US technical information
				<br />
				利用における注意事項 :
				輸法該当技術・米国技術に該当する情報は登録してはならない
			</p>
		</div>
	);
};
