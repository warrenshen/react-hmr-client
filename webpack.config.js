var path = require('path');
var webpack = require('webpack');

const BABEL_QUERY = {
  presets: ['react', 'es2015'],
  plugins: [
    [
      'react-transform',
      {
        transforms: [
          {
            imports: ['react'],
            locals: ['module'],
            transform: 'react-transform-hmr'
          }
        ]
      }
    ]
  ]
};

module.exports = {
  entry: [
    './client'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['', '.js'],
    modulesDirectories: ['node_modules', 'shared']
  },
  module: {
    loaders: [
      {
        exclude: /node_modules/,
        loader: 'babel',
        query: BABEL_QUERY,
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
