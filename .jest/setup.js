function noop() {}

global.XMLHttpRequest = noop;

global.navigator = {
	languages: [{}],
	userAgent: 'test',
	language: 'en-US',
	platform: 'test',
};

global.window = {
	innerWidth: 400,
	innerHeight: 800,
	parent: { postMessage: noop },
	postMessage: noop
};
