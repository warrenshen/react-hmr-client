import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server'
import { RouterContext, match } from 'react-router';
import routes from 'routes';

const server = express();

server.use((req, res) => {
  const location = req.url;
  match({ routes, location }, (err, redirectLocation, renderProps) => {
    if (err) {
      console.error(err);
      return res.status(500).end('Internal server error.');
    }
    if (!renderProps) {
      return res.status(404).end('Not found error.');
    }

    const RouterComponent = <RouterContext {...renderProps} />;
    const childHTML = renderToString(RouterComponent);
    const HTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset='utf-8'>
          <title>React Redux Client</title>
        </head>
        <body>
          <div id='react-root'>${childHTML}</div>
          <script type='application/javascript' src='./bundle.js'></script>
        </body>
      </html>
    `;
    res.end(HTML);
  });
});

export default server;
