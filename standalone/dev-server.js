'use strict';
const express = require('express');
const webpack = require('webpack');
let devConfig = require('./../webpack.config')();
devConfig.entry.app.push('./standalone/dev-client');
devConfig.plugins.push(new webpack.HotModuleReplacementPlugin());

const compiler = webpack(devConfig);
const devMiddleware = require('webpack-dev-middleware')(compiler);
const hotMiddleware = require('webpack-hot-middleware')(compiler);
compiler.plugin('compilation', (compilation) => {
  compilation.plugin('html-webpack-plugin-after-emit', (data, cb) => {
    hotMiddleware.publish({action: 'reload'});
    cb();
  });
});

const port = process.env.PORT || 8081;
const mockApiPort = 8083;

express()
    .use(devMiddleware)
    .use(hotMiddleware)
    .use('/api/*', (req, res) => {
      req.url = req.baseUrl;
    })
    .listen(port);

express()
    .get('*', (req, res) => require('fs').readFile(
        `standalone/mockdata/${req.path.substr(5)}.json`,
        (err, data) => res.send(data))
    ).listen(mockApiPort);

console.log(`dev-servern är startad på ${port} och mockapiProxyn på ${mockApiPort}`);