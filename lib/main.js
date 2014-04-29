'use strict';
var gm = require('gm'),
    _ = require('lodash');

var defaults = {  width:   50,
                  height:  50,
                  bgColor: '#aaaaaa',
                  fontSize: 14,
                  color: '#ffffff'
               };

var generate = function(cfg) {
  var img = gm(cfg.width, cfg.height, cfg.bgColor);

  if (cfg.fontPath) {
    img.font(cfg.fontPath);
  }
  if (cfg.text) {
    if (cfg.font) {
      img.font(cfg.font);
    }
    img
      .fill(cfg.color)
      .fontSize(cfg.fontSize)
      .gravity('Center')
      .draw('translate -50,-50 text 50,50 "' + cfg.text.replace('"', '\\"') + '"');
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
    if (err) { return console.dir(err); }
    cb(err, stream);
  });
};

Granitial.prototype.write = function(imgPath) {
  this.img.write(this.parsePath(imgPath), function(err) {
    if (err) { return console.dir(arguments); }
  });
};

// uses lodash template (http://lodash.com/docs#template)
Granitial.prototype.parsePath = function(imgPath) {
  return _.template(imgPath, this.config);
};

Granitial.defaults = defaults;

module.exports = Granitial;
