import path from 'path';
import webpack from 'webpack';
import MemoryFs from 'memory-fs';
import {
	HotModuleReplacementFilterPlugin
} from '../src';

export const fs = new MemoryFs();
export const pathToArtifacts = path.resolve(__dirname, 'artifacts');

export default function compile(fixtureEntry, options = {}, writeToFs = false) {

	const webpackCompiler = webpack({
		mode:         'development',
		devtool:      false,
		optimization: {
			minimize: false
		},
		context: __dirname,
		entry:   `./${fixtureEntry}`,
		output:  {
			path:     pathToArtifacts,
			filename: 'bundle.js'
		},
		module:  {
			rules: [{
				test: /worker\.js$/,
				use:  {
					loader:  'worker-loader',
					options: {
						...options,
						name: 'worker.js'
					}
				}
			}]
		},
		plugins: [
			new HotModuleReplacementFilterPlugin((compilation) => {

				const {
					name
				} = compilation.compiler;

				return name && name.includes('worker');
			}),
			new webpack.HotModuleReplacementPlugin()
		]
	});

	if (!writeToFs) {
		webpackCompiler.outputFileSystem = fs;
	}

	return new Promise((resolve, reject) => {

		webpackCompiler.run((err, stats) => {

			const hasErrors = stats && stats.hasErrors();

			if (err || hasErrors) {
				reject(hasErrors
					? new Error(stats.toJson().errors[0])
					: err
				);
				return;
			}

			resolve(stats.toJson());
		});
	});
}
