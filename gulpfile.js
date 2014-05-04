'use strict';

var gulp   = require('gulp'),
    mocha  = require('gulp-mocha'),
    jshint = require('gulp-jshint'),
    istanbul = require('gulp-istanbul');


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
    .pipe(mocha())
});

gulp.task('coverage', function(cb) {
   gulp.src(['lib/**/*.js', 'main.js'])
    .pipe(istanbul()) // Covering files
    .on('end', function () {
      gulp.src(['test/globals.js', 'test/**/*.spec.js'])
        .pipe(mocha())
        .pipe(istanbul.writeReports()) // Creating the reports after tests runned
        .on('end', cb);
    });
});


gulp.task('default', ['jshint', 'test']);
