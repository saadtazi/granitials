'use strict';

var fs       = require('fs'),
    _        = require('lodash'),
    Granitial = require('./main');

var defaultConfig = {
  // todo
  savePath: false, // if not specified, will not save
  allowQueryString: false
};

function parseSize(sizeStr) {
  if (!sizeStr) { return {}; }
  var size = sizeStr.split('x').map(function(val) { return parseInt(val, 10); });
  return {width: size[0], height: size[1] };


}

function parseParams(params) {
  return _.extend({}, params, parseSize(params.size), {text: params.text});
}

module.exports = function(config) {
  config = _.merge({}, defaultConfig, config);
  var middleware = function(req, res) {
    var granitial,
        imgConfig = _.extend({}, config, parseParams(req.params));
    if (config.allowQueryString) {
       imgConfig = _.merge(imgConfig, req.query);
    }
    console.log(imgConfig);
    granitial = new Granitial(imgConfig);
    res.setHeader('content-type', 'image/png');
    granitial
      .getStream(function(err, stream) {
        stream.pipe(res);
        if (config.savePath) {
          stream.pipe(fs.createWriteStream(granitial.parsePath(config.savePath)));
        }
      });
    return;
  };
  return middleware;

};
