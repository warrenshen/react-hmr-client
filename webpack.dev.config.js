import path from 'path';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

const BABEL_QUERY = {
  presets: ['es2015', 'react'],
  plugins: [
    [
      'react-transform',
      {
        transforms: [
          {
            transform: 'react-transform-hmr',
            imports:    ['react'],
            locals:     ['module']
          }
        ]
      }
    ]
  ]
};

export default function(server) {
  const config = {
    context: __dirname,
    devtool: 'inline-source-map',
    entry: [
      'webpack-hot-middleware/client',
      './client'
    ],
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
    output: {
      filename: 'bundle.js',
      path: path.join(__dirname, 'dist'),
      publicPath: '/'
    },
    plugins: [
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin()
    ],
    resolve: {
      extensions: ['', '.js'],
      modulesDirectories: ['node_modules', 'shared']
    }
  };

  const compiler = webpack(config);
  server.use(webpackDevMiddleware(compiler, { noInfo: true }));
  server.use(webpackHotMiddleware(compiler));
};
