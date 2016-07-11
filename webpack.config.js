var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry:  [
    'webpack-dev-server/client?http://localhost:8080/',
    'webpack/hot/only-dev-server',
    './client'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['', '.js'],
    modulesDirectories: ['client']
  },
  module: {
    loaders: [
      {
        exclude: /node_modules/,
        loaders: ['react-hot', 'babel'],
        test: /\.js?$/
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  devtool: 'inline-source-map',
  devServer: {
    hot: true,
    proxy: {
      '*': 'http://localhost:' + (process.env.PORT || 3000)
    },
    host: 'localhost'
  }
};
