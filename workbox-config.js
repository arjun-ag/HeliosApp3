module.exports = {
	globDirectory: 'dist/',
	globPatterns: [
		'**/*.{js,html,ttf,png,ico,json}'
	],
	swDest: 'dist/sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};