'use strict';

var path = require('path'),
  fs = require('fs'),
  _ = require('lodash'),
  Granitial = require('./main');

var svgTemplate = fs.readFileSync(path.join(__dirname, 'svg.xml'));

var defaultConfig = {
  // todo
  savePath: false, // if not specified, will not save
  allowQueryString: false
};

function parseSize(sizeStr) {
  if (!sizeStr) {
    return {};
  }
  var size = sizeStr.split('x').map(function(val) {
    return parseInt(val, 10);
  });
  return {
    width: size[0],
    height: size[1]
  };


}

function parseParams(params) {
  return _.extend({}, params, parseSize(params.size), {
    text: params.text
  });
}

function getImgConfig(config, req) {
  var imgConfig = parseParams(_.extend({}, config, req.params));
  if (config.allowQueryString) {
    imgConfig = _.merge(imgConfig, req.query);
  }
  return imgConfig;
}

module.exports = {
  png: function(config) {
    config = _.merge({}, defaultConfig, config);
    var middleware = function(req, res) {
      var granitial,
        imgConfig = getImgConfig(config, req);


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

  },
  svg: function(config) {
    config = _.merge({
      fontUrls: null,
      fontName: null,
      color: null,
      fontSize: 14
    }, defaultConfig, config);
    var middleware = function(req, res) {
      var imgConfig = getImgConfig(config, req);
      res.setHeader('content-type', 'image/svg+xml');
      return res.send(_.template(svgTemplate, imgConfig));
    };
    return middleware;
  }
};
