import path from 'path';
import compile, {
	fs,
	pathToArtifacts
} from './compile';

describe('HotModuleReplacementFilterPlugin', () => {

	it('should emit worker without hmr', async () => {

		await compile('workerLoader.js', {});

		const bundle = fs.readFileSync(
			path.join(pathToArtifacts, 'bundle.js'),
			'utf8'
		);
		const worker = fs.readFileSync(
			path.join(pathToArtifacts, 'worker.js'),
			'utf8'
		);

		expect(bundle).toMatch(/webpackHotUpdate/);
		expect(worker).not.toMatch(/webpackHotUpdate/);
	});
});
