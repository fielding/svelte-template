const { join } = require('path');
const { execFileSync } = require('child_process');
const runner = join(__dirname, 'runner.js');

// jest doesn't support async transforms, lol
exports.process = (code, file) => {
	const output = execFileSync('node', [runner, file]);
	return JSON.parse(output); //=> { code, map }
}
