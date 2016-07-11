'use strict';

require('babel-register')({ presets: ['es2015', 'react'] });
require('babel-polyfill');

var server = require('./server').default;

const PORT = process.env.PORT || 3000;

server.listen(PORT, function() {
  console.log('Server listening on:', PORT);
});
