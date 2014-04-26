'use strict';
var gm = require('gm'),
    _ = require('lodash');

var defaults = {  width:   50,
                  height:  50,
                  bgColor: '#aaaaaa',
                  fontSize: 14,
                  color: '#ffffff'
               };

/**
  config: {
    width: 50,
    height: 50,
    bgColor: '#ffffffff', // transparent
    fontPath: 'path/to/font/file', // see supported graphicMagick format
    fontSize: '12px',
    color: '#cccccc'
    text: 'text you want to add to the image, automatically center (vertically and horizontally)',
  }
 */
var generate = function(config) {
  var cfg = _.merge(defaults, config || {});
  var img = gm(cfg.width, cfg.height, cfg.bgColor);

  if (cfg.fontPath) {
    img.font(cfg.fontPath);
  }
  if (cfg.text) {
    img
      .fill(cfg.color)
      .fontSize(cfg.fontSize)
      .gravity('Center')
      .draw('translate -50,-50 text 50,50 "' + cfg.text.replace('"', '\\"') + '"');
  }
  return img;
};

module.exports = generate;
