import Worker from './worker.js';

const worker = new Worker();

worker.postMessage({
	type: 'ping'
});

worker.addEventListener('message', (event) => {
	console.log(event);
});
