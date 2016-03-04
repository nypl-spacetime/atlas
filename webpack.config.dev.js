var path = require('path');
var webpack = require('webpack');
var config = require('config');

module.exports = {
  // devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-hot-middleware/client',
    'normalize-css',
    './app/index',
  ],
  output: {
    path: path.join(__dirname, 'app'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.SourceMapDevToolPlugin(
      'bundle.js.map', null,
      '[absolute-resource-path]', '[absolute-resource-path]'
    ),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      __CONFIG__: JSON.stringify(config),
      '__DEV__': true
    }),
    new webpack.ProvidePlugin({
      'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch',
    }),
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      include: path.join(__dirname, 'app'),
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader',
    }, {
      test: /\.ttf$/,
      loader: 'file-loader',
    }, {
      test: /\.(svg|png|jpg)$/,
      loader: 'file-loader',
    }, {
      test: /\.scss$/,
      loaders: ['style', 'css', 'sass']
    }],
  },
};
