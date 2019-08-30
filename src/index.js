export class HotModuleReplacementFilterPlugin {

	/**
	 * HotModuleReplacementFilterPlugin constructor.
	 * @param {(compilation) => boolean} filter - If returns `true`, then HMR will be disabled.
	 * @param {string} hmlPluginId - Custom HMR plugin ID.
	 */
	constructor(filter, hmlPluginId = 'HotModuleReplacementPlugin') {
		this.filter = filter;
		this.hmlPluginId = hmlPluginId;
	}

	apply(compiler) {
		compiler.hooks.compilation.tap(
			this.hmlPluginId,
			(compilation) => {
				if (this.filter(compilation)) {
					compilation.hotUpdateChunkTemplate = false;
				}
			}
		);
	}
}
