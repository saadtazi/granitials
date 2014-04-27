var path = require('path'),
    granitials;
try {
  granitials = require('granitials');
} catch (e) {
  granitials = require('../');
}

var app = require('express')();

app.get('/path/to/granitials/:size?/:text?', granitials.middleware({
  image: {color: '#ff0000'},
  allowQueryString: true
}));

// custom font
app.get('/path/to/granitials2/:text', granitials.middleware({
  width: 100,
  heith: 100,
  // can also specify size: '100x100' instead of width and height
  font: path.join(__dirname, 'fonts/Lato-Bold.ttf'),
  savePath: path.join(__dirname, 'output/middleware/') + '<%- text %>.png', // if not specified, will not save
  image: {color: '#ff0000'},
  allowQueryString: false
}));

app.listen(3000, function() {
  console.log(' open http://127.0.0.1:3000/path/to/granitials/200x200/yep?bgColor=%230eddee');
  console.log('   or http://127.0.0.1:3000/path/to/granitials/yep');
});

