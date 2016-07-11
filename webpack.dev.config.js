import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import webpackProdConfig from './webpack.prod.config';

const BABEL_HMR_QUERY = {
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
  ],
  presets: ['es2015', 'react']
};

export default function(server) {
  const config = Object.assign(
    {},
    webpackProdConfig,
    {
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
            query: BABEL_HMR_QUERY,
            test: /\.js?$/
          }
        ]
      },
      plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
      ],
    }
  );

  const compiler = webpack(config);
  server.use(webpackDevMiddleware(compiler, { noInfo: true }));
  server.use(webpackHotMiddleware(compiler));
};
