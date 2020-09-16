import svelte from 'rollup-plugin-svelte';
import replace from '@rollup/plugin-replace';
import alias from '@rollup/plugin-alias';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';

const { resolve: rslv } = require('path');
const config = require('./svelte.config');

const production = !process.env.ROLLUP_WATCH;

console.log('Environment:\n', {
	NODE_ENV: JSON.stringify(production ? 'production' : 'development'),
}, '\n');


export default {
	input: 'src/index.ts',
	output: {
		name: 'app',
		format: 'esm',
		sourcemap: true,
		dir: 'public',
	},
	plugins: [
		svelte({
			...config,
			// enable run-time checks when not in production
			dev: !production,
			// we'll extract any component CSS out into
			// a separate file — better for performance
			css: css => {
				css.write('public/bundle.css');
			}
		}),

		replace({
			NODE_ENV: JSON.stringify(production ? 'production' : 'development')
		}),

		alias({
			resolve: ['.ts', '.svelte', '.js'],
			entries: [
				{
					find:'~',
					replacement: rslv('src')
				},
			],
		}),

		resolve({
			extensions: ['.ts', '.svelte', '.mjs', '.js'],
			dedupe: importee => importee === 'svelte' || /^svelte/i.test(importee),
		}),

		commonjs(),

		typescript({
			tsconfig: './tsconfig.json',
			cacheRoot : '.tscache',
			tsconfigOverride: {
				compilerOptions: {
					watch: !production,
					sourceMap: !production
				}
			},
		}),

		!production && livereload({
			watch: 'public',
			port: 35730, // use non-default port to avoid conflict with sdk
		}),

		production && terser({
			output: { comments: false },
		}),
	],

	watch: {
		clearScreen: false
	}
};
