/**
 * Reusable config for rollup & `svelte-vscode` extension.
 * By default, everything is already hooked up w/ default options:
 * @see https://github.com/kaisermann/svelte-preprocess#options
 * @see https://marketplace.visualstudio.com/items?itemName=JamesBirtles.svelte-vscode
 */
module.exports = {
	// @ts-ignore – wrong `.d.ts` export
	preprocess: require('svelte-preprocess')({
		postcss: {
			plugins: [
				require('postcss-import')(),

				require('postcss-url')(),

				require('cssnano')({
					autoprefixer: true,
					preset: 'default',
				}),

				require('autoprefixer')()
			]
		}
		// enable for stylus support
		// stylus: {
		// 	paths: ['src'],
		// 	imports: ['styles/vars.styl', 'styles/vars.images.styl']
		// }
	})
};
