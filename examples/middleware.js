var granitials;
try {
  granitials = require('granitials');
} catch (e) {
  granitials = require('../');
}

var app = require('express')();

app.use('/path/to/granitials', granitials.middleware({
  fontPath: '',
  savePath: 'path/to/static/', // if not specified, will not save
  image: {color: '#ff0000'},
  allowQueryString: true
}));

app.listen(3000, function() {
  console.log(' open http://127.0.0.1:3000/path/to/granitials/200x200/yep?bgColor=%230eddee');
});

