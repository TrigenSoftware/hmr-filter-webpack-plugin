export class HotModuleReplacementFilterPlugin {

	/**
	 * HotModuleReplacementFilterPlugin constructor.
	 * @param {(compilation) => boolean} filter - If returns `true`, then HMR will be disabled.
	 * @param {string} hmrPluginId - Custom HMR plugin ID.
	 */
	constructor(filter, hmrPluginId = 'HotModuleReplacementPlugin') {
		this.filter = filter;
		this.hmrPluginId = hmrPluginId;
	}

	apply(compiler) {
		compiler.hooks.compilation.tap(
			this.hmrPluginId,
			(compilation) => {
				if (this.filter(compilation)) {
					compilation.hotUpdateChunkTemplate = false;
				}
			}
		);
	}
}
