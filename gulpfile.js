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

// testing yahoo stream.
gulp.task('yahoo', function() {

  var stocks = require('yahoo-finance-stream')(
    {frequency: 5000}
  );

  stocks.watch('rht');
  stocks.watch('mcp');

  stocks.on('data', function(stock) {
    console.log('%s: %d', stock.symbol, stock.bid);
  });
});
