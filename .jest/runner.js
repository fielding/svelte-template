const { resolve } = require('path');
const { promisify } = require('util');
const svelte = require('svelte/compiler');
const { readFile, existsSync } = require('fs');
const config = require('../svelte.config');

const read = promisify(readFile);

const [input] = process.argv.slice(2);

if (!input) {
	console.error('Did not receive a filename!')
	process.exit(1);
}

const filename = resolve('.', input);
if (!existsSync(filename)) {
	console.error(`File does not exist!\n>${filename}`);
	process.exit(1);
}

// Begin
async function compile() {
	const text = await read(input, 'utf8');
	const plain = await svelte.preprocess(text, config.preprocess, { filename });
	const output = svelte.compile(plain.code, {
		filename,
		format: 'cjs',
		accessors: true,
		css: false,
		dev: true,
	});

	const { code, map } = output.js;

	// send back string
	return JSON.stringify({ code, map });
}

compile().then(console.log).catch(err => {
	console.error('Compile Error:', err);
	process.exit(1);
});
