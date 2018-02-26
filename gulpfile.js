'use strict';


const concat = require('gulp-concat');
const del = require('del');
const gulp = require('gulp');
const rollup = require('rollup');


gulp.task('clean:dist', () => {
  return del([
    'dist'
  ]);
});


gulp.task('build', ['clean:dist'], () => {
  return gulp.src('./lib/index.js')
    .pipe(concat('flatten2.js'))
    .pipe(gulp.dest('./dist'));
});


gulp.task('bundle', ['clean:dist'], () => {
  return rollup
    .rollup({
      input: './lib/index.js'
    })
    .then((bundle) => {
      return bundle.write({
        file: './dist/flatten2.js',
        format: 'umd',
        name: 'flatten2',
        sourcemap: false
      });
    });
});
