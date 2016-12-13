'use strict';


const gulp = require('gulp');
const $ = require('gulp-load-plugins')();


const pkg = {
  src: 'src',
  dist: 'dist',
  test: 'test'
};

const paths = {
  js: [pkg.src + '/**/*.js'],
  test: [pkg.test + '/spec/**/*.js'],
  testRequire: [
    pkg.test + '/mock/**/*.js',
    pkg.test + '/spec/**/*.js'
  ],
  karma: 'karma.conf.js'
};

gulp.task('run:lint', function() {
  return gulp.src(paths.js)
    .pipe($.excludeGitignore())
    .pipe($.eslint())
    .pipe($.eslint.format())
    .pipe($.eslint.failAfterError());
});
