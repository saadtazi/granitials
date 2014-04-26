'use strict';

var generate   = require('./lib/main'),
    middleware = require('./lib/middleware');



generate.middleware = middleware;
module.exports = generate;
