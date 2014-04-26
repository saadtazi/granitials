'use strict';

var gulp   = require('gulp'),
    mocha  = require('gulp-mocha'),
    jshint = require('gulp-jshint');


//----------------------------
// lint
gulp.task('lint', function() {
  return gulp.src(['index.js', './lib/*.js', 'test/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

//----------------------------
// test
gulp.task('test', function() {
  gulp.src(['test/globals.js', 'test/**/*.spec.js'])
    .pipe(mocha({reporter: 'nyan'}));
});

gulp.task('default', ['jshint', 'test']);
