var gulp = require('gulp');

var concat = require('gulp-concat');

var Server = require('karma').Server;


/**
 * Run test once and exit
 */

gulp.task('tests:run', function (done) {
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});


/**
 * Watch for file changes and re-run tests on each change
 */

gulp.task('tests:watch', function (done) {
  new Server({
    configFile: __dirname + '/karma.conf.js'
  }, done).start();
});


/**
 * Create dist
 */
gulp.task('dist:build', function() {

  return gulp.src(['./src/flatten2.js'])
    .pipe(concat('flatten2.js'))
    .pipe(gulp.dest('./dist'));

});


// TODO: Test dist https://karma-runner.github.io/1.0/dev/public-api.html