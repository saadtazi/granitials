'use strict';

var generate   = require('./lib/main').generate,
    middleware = require('./lib/middleware');



generate.middleware = middleware;
module.exports = generate;
