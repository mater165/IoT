'use strict';

module.exports = function karmaConfig(config) {
  let webpackConfig = require('./webpack.config')();
  webpackConfig.module.rules.push({
    enforce: 'post',
    test: /\.js$/,
    loader: 'isparta-loader',
    exclude: [/node_modules/, /\.test\.js$/],
    query: {
      babel: {
        presets: ['es2015']
      }
    }
  });
  config.set({
    frameworks: ['jasmine'],
    reporters: ['spec'],
    superDotsReporter: {
      nbDotsPerLine : 180
    },
    files: ['src/js/**/*.test.js'],
    preprocessors: {
      'src/js/**/*.js': ['webpack']
    },
    browsers: ['PhantomJS'],
    singleRun: false,
    coverageReporter: {
      type: 'html',
      dir: './target/js-coverage/',
      reporters: [
        {type: 'html', subdir: 'html'},
        {type: 'lcov', subdir: 'lcov'}
      ]
    },
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true
    }
  });
};