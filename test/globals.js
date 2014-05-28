'use strict';

// Chai
var chai = require('chai');
// var supertestChai = require('supertest-chai');
// chai.use(require('sinon-chai'));
chai.use(require('chai-fs'));
// chai.use(supertestChai.httpAsserts);


chai.should();

global.sinon   = require('sinon');
global.supertest = require('supertest');
