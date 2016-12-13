'use strict';

const path = require('path');

const gulp = require('gulp');
const $ = require('gulp-load-plugins')();

const del = require('del');
const KarmaServer = require('karma').Server;

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

gulp.task('clean:dist', () => {
  return del([
    'dist'
  ]);
});

gulp.task('run:lint', () => {
  return gulp.src(paths.js)
    .pipe($.excludeGitignore())
    .pipe($.eslint())
    .pipe($.eslint.format())
    .pipe($.eslint.failAfterError());
});

gulp.task('run:test', (done) => {
  new KarmaServer({
    configFile: path.join(__dirname, paths.karma),
    singleRun: true
  }, done).start();
});

gulp.task('run:build', ['clean:dist'], () => {
  return gulp.src(paths.js)
    .pipe($.minify({
      ext: {
        src: '.debug.js',
        min: '.min.js'
      }
    }))
    .pipe(gulp.dest(pkg.dist));
});
