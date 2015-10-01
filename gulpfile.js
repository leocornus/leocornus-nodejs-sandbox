var gulp = require('gulp');
var mocha = require('gulp-mocha');
// jamine runner.
var jasmine = require('gulp-jasmine');

gulp.task('default', function() {
  // place code for your default task here
  console.log('Hello Gulp World!');
});

// mocha test runner.
gulp.task('mocha', function() {

  // the src method will locate the source file.
  return gulp.src(['test/mocha/*.js'], {read: false})
    .pipe(mocha({
      reporter: 'spec'
    }));

});

// run jasmine test cases.
gulp.task('jasmine', function() {

  return gulp.src('test/jasmine/*.js').pipe(jasmine());
});

// testing yahoo stream.
gulp.task('yahoo', function() {

  var stocks = require('yahoo-finance-stream')(
    {frequency: 5000}
  );

  stocks.watch('RHT');
  stocks.watch('FIT');
  stocks.watch('TSLA');

  stocks.on('data', function(stock) {
    console.log('%s: %d', stock.symbol, stock.bid);
  });
});
