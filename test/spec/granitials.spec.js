'use strict';

var main = require('../../granitials.js');

describe('#main module', function() {
  it('should contain a "generate" function', function() {
    main.should.be.a('function');
  });

  it('should contain a middleware function', function() {
    main.middleware.should.be.a('function');
  });

  describe('#generate', function() {

  });
});
