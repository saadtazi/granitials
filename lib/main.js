'use strict';
var gm = require('gm'),
    _ = require('lodash');

var defaults = {  width:   50,
                  height:  50,
                  bgColor: '#aaaaaa',
                  fontSize: 14,
                  color: '#ffffff',
                  gravity: 'Center',
                  translateX: null,
                  translateY: null,
                  textPositionX: null,
                  textPositionY: null
               };
function getTextCommand(cfg) {
  if (cfg.translateX === null) {
    cfg.translateX = -cfg.width;
  }
  if (cfg.translateY === null) {
    cfg.translateY = -cfg.height;
  }
  if (cfg.textPositionX === null) {
    cfg.textPositionX = cfg.width;
  }
  if (cfg.textPositionY === null) {
    cfg.textPositionY = cfg.height;
  }
  return 'translate ' + cfg.translateX + ',' + cfg.translateY + ' text ' + cfg.textPositionX + ',' + cfg.textPositionY + ' "' + cfg.text.replace('"', '\\"') + '"';
}
var generate = function(cfg) {
  var img = gm(cfg.width, cfg.height, cfg.bgColor);

  if (cfg.fontPath) {
    img.font(cfg.fontPath);
  }
  if (cfg.text) {
    if (cfg.font) {
      img.font(cfg.font);
    }
    var textCmd = getTextCommand(cfg);
    // console.log(textCmd);
    img
      .fill(cfg.color)
      .fontSize(cfg.fontSize)
      .gravity('Center')
      .draw(textCmd);
  }
  return img;
};

var Granitial = function(config) {
  this.initialConfig = config;
  this.config = _.merge({}, defaults, this.initialConfig || {});
  this.img = generate(this.config);
};

Granitial.generate = function(config) {
  return new Granitial(config);
};

Granitial.prototype.getStream = function(cb) {
  return this.img.stream('png', function(err, stream/*, stdErr*/) {
    cb(err, stream);
  });
};

Granitial.prototype.write = function(imgPath, cb) {
  var finalPath = this.parsePath(imgPath);
  this.img.write(finalPath, function(err) {
    cb && cb(err, finalPath);
  });
};

// uses lodash template (http://lodash.com/docs#template)
Granitial.prototype.parsePath = function(imgPath) {
  return _.template(imgPath, this.config);
};

Granitial.defaults = defaults;

module.exports = Granitial;
