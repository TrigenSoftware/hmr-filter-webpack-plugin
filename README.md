# hmr-filter-webpack-plugin

[![NPM version][npm]][npm-url]
[![Node version][node]][node-url]
[![Dependencies status][deps]][deps-url]
[![Build status][build]][build-url]
[![Dependabot badge][dependabot]][dependabot-url]

[npm]: https://img.shields.io/npm/v/hmr-filter-webpack-plugin.svg
[npm-url]: https://npmjs.com/package/hmr-filter-webpack-plugin

[node]: https://img.shields.io/node/v/hmr-filter-webpack-plugin.svg
[node-url]: https://nodejs.org

[deps]: https://david-dm.org/TrigenSoftware/hmr-filter-webpack-plugin.svg
[deps-url]: https://david-dm.org/TrigenSoftware/hmr-filter-webpack-plugin

[build]: http://img.shields.io/travis/com/TrigenSoftware/hmr-filter-webpack-plugin/master.svg
[build-url]: https://travis-ci.com/TrigenSoftware/hmr-filter-webpack-plugin

[dependabot]: https://api.dependabot.com/badges/status?host=github&repo=TrigenSoftware/hmr-filter-webpack-plugin
[dependabot-url]: https://dependabot.com/

Disable hot module replacement for certain chunks.

## Install

```bash
npm i -D hmr-filter-webpack-plugin
# or
yarn add -D hmr-filter-webpack-plugin
```

## Usage

```js
// webpack.config.js
const {
    HotModuleReplacementFilterPlugin
} = require('hmr-filter-webpack-plugin');
// ...
{
    plugins: [
        new HotModuleReplacementFilterPlugin((compilation) => {

            const {
                name
            } = compilation.compiler;

            return name && name.includes('worker');
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
}
```
