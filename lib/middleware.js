'use strict';

var express  = require('express'),
    _        = require('lodash'),
    generate = require('./main');

var defaultConfig = {
  // todo
  fontPath: false,
  // todo
  savePath: false, // if not specified, will not save
  image: {},
  allowQueryString: false
};

function parseSize(sizeStr) {
  var size = sizeStr.split('x').map(function(val) { return parseInt(val, 10); });
  return {width: size[0], height: size[1] };
}

function parseParams(params) {
  return _.merge(parseSize(params.size), {text: params.text});
}

module.exports = function(config) {
  config = _.merge(defaultConfig, config);
  var app;

  if (express.Router) {
    // express 4
    app = express.Router();
  } else {
    app = express();
  }

  app.get('/:size?/:text?', function(req, res) {
    var imgConfig = _.merge(config.image || {}, parseParams(req.params));
    if (config.allowQueryString) {
       imgConfig = _.merge(imgConfig, req.query);
    }
    console.log(config);
    console.log(imgConfig);
    res.setHeader('content-type', 'image/png');
    generate(imgConfig)
      .stream('png').pipe(res);
      return;
  });
  return app;

};
