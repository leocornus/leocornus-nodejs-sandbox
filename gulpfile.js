var gulp = require('gulp');
var mocha = require('gulp-mocha');

gulp.task('default', function() {
  // place code for your default task here
});

// mocha test runner.
gulp.task('mocha', function() {

  return gulp.src(['test/mocha/*.js'], {read: false})
    .pipe(mocha({
      reporter: 'spec'
    }));

});
