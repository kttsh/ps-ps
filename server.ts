const port = 8891;

Bun.serve({
	port,
	async fetch(req) {
		const url = new URL(req.url);
		let pathname = url.pathname;

		// ルートパスの場合はindex.htmlを返す
		if (pathname === '/') {
			pathname = '/index.html';
		}

		// ファイルパスを構築
		const filePath = `./dist${pathname}`;
		const file = Bun.file(filePath);

		// ファイルが存在するかチェック
		if (await file.exists()) {
			return new Response(file);
		}

		// SPAのフォールバック（存在しないパスはindex.htmlを返す）
		return new Response(Bun.file('./dist/index.html'));
	},
});

console.log(`Server running at http://localhost:${port}`);
