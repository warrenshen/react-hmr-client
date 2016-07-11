var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [
    './client'
  ],
  module: {
    loaders: [
      {
        exclude: /node_modules/,
        loader: 'babel-loader?presets[]=es2015,presets[]=react',
        test: /\.js?$/
      }
    ]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['', '.js'],
    modulesDirectories: ['node_modules', 'shared']
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
};
