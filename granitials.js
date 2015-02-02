'use strict';

var generate = require('./lib/main').generate,
  middleware = require('./lib/middleware');



generate.middleware = middleware.png;
generate.svg = middleware.svg;
module.exports = generate;
