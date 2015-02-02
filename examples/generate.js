var path = require('path'),
    granitials;
try {
  granitials = require('granitials');
} catch (e) {
  granitials = require('../granitials');
}

function written(err) {
  console.log(err? err : 'yeah!');
}
// grey 50x50 image
granitials().write(path.join(__dirname, 'output/grey.png'), written);

// grey image with white text
granitials({text: 'yep', translateY: -40, translateX: -25}).write(path.join(__dirname, 'output/yep.png'), written);

// grey 100x100 image with white text
granitials({width: 100, height: 100, text: 'bigga'}).write(path.join(__dirname, 'output/bigga.png'), written);

// custom font
granitials({text: 'CustomFont', font: path.join(__dirname, 'fonts/Lato-Light.ttf'), fontSize: 20}).write(path.join(__dirname, 'output/customFont.png'), written);
