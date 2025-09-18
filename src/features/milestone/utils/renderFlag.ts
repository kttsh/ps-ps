/**
 * 国旗表示用の関数
 * @param cell 
 * @param country 
 */
export function renderFlag(cell: HTMLElement, country: string) {
	const countryCode = country.substring(0, 2).toLowerCase(); // ISOコード（例: JP）
	const countryName = country.substring(2); // 国名（例: Japan）

	const img = document.createElement('img');
	img.src = `https://flagcdn.com/${countryCode}.svg`;
	img.alt = countryName;
	img.title = countryName; // ホバー時に表示されるツールチップ
	img.style.width = '25px';
	img.style.height = 'auto';
	img.style.display = 'inline-block';
	img.style.verticalAlign = 'middle';

	cell.innerHTML = '';
	cell.appendChild(img);
}