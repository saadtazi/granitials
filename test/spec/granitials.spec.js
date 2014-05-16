'use strict';

var fs = require('fs'),
    gm = require('gm'),
    ReadableStream = require('stream').Readable;

var granitial = require('../../granitials.js');
var Granitial = require('../../lib/main');

function checkImageSize(filePath, width, height, cb) {
  var image = gm(filePath);
  image.size(function(err, size) {
    size.should.eql({width: width, height: height});
    cb();
  });
}

describe('#granitial module', function() {
  it('should contain a "generate" function', function() {
    granitial.should.be.a('function');
  });

  it('should contain a middleware function', function() {
    granitial.middleware.should.be.a('function');
  });

  describe('#generate', function() {
    it('should return a Granitial object with default config', function() {
      var img1 = granitial();
      img1.should.be.an.instanceof(Granitial);
      img1.config.should.eql(Granitial.defaults);
    });

    it('should allow custom config', function() {
      granitial().should.be.an.instanceof(Granitial);
    });

    describe('#write', function() {

      it('should generate an error if path not writable', function(done) {
        granitial({text: 'img'})
          .write('path/to/nowhere/img.png', function(err) {
            err.should.not.be.null;
            err.toString().should.contain('Unable to open file');
            done();
        });
      });
      it('should write image to disk', function(done) {
        granitial({text: 'img', fontPath: './test/fonts/Lato-Bold.ttf'})
          .write('img.png', function(err, imgPath) {
            imgPath.should.eql('img.png');
            imgPath.should.be.file();
            fs.unlinkSync('./img.png');
            done();
        });
      });
      it('should allow to specify a templated path', function(done) {
        var text = 'write Me';
        granitial({text: text, font: 8}).write('<%-width%>x<%-height%>_<%-text%>.png', function(err, imgPath) {
          var expectedPath = Granitial.defaults.width + 'x' + Granitial.defaults.width + '_' + text + '.png';
          imgPath.should.eq(expectedPath);
          imgPath.should.be.file();
          fs.unlinkSync(imgPath);
          done();
        });
      });
    });

    describe('#getStream', function() {
      it('should return a readable stream', function(done){
        granitial({text: 'yo'}).getStream(function(err, stream){
          stream.should.be.an.instanceof(ReadableStream);
          done();
        });
      });
    });
  });

  describe('#middleware', function() {
    var app;
    before(function () {
      app = require('express')();
      app.get('/r1/:size/:text.png', granitial.middleware({savePath: 'testimg.png'}));
      app.get('/r2/:text.png', granitial.middleware({savePath: 'testimg2.png', color: '#ff0000', bgColor: '#00cccc'}));
      app.get('/r3', granitial.middleware({allowQueryString: true, savePath: 'testimg3.png'}));
    });



    it('should return an image', function(done) {
      global.supertest(app)
        .get('/r1/100x100/coucou.png')
        .expect(200)
        .expect('Content-Type', 'image/png')
        .end(function(err, res) {
          checkImageSize('testimg.png', 100, 100, function() {
            fs.unlinkSync('testimg.png');
            done();
          });
        });
    });

    it('should use default options', function(done) {
      global.supertest(app)
        .get('/r2/coucou.png')
        .expect(200)
        .expect('Content-Type', 'image/png')
        .end(function(err, res) {
          checkImageSize('testimg2.png', 50, 50, function() {
            fs.unlinkSync('testimg2.png');
            done();
          });
        });
    });

    it('should allow to use queryString', function(done) {
      global.supertest(app)
        .get('/r3?width=200&height=200&text=test')
        .expect(200)
        .expect('Content-Type', 'image/png')
        .end(function(err, res) {
          checkImageSize('testimg3.png', 200, 200, function() {
            fs.unlinkSync('testimg3.png');
            done();
          });
        });
    });
  });
});
