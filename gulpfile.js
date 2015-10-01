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

// run jasmine jquery test.
// NOTE: This is not working.
//gulp.task('jasmine.jquery', function() {
//
//  return gulp.src('test/jquery/**/*.js').pipe(jasmine());
//});

// try load karm for testing.
var Server = require('karma').server;

gulp.task('karma', function(done) {

    return new Server.start({
        configFile: __dirname + '/test/karma.conf.jasmine.js',
    }, done);
});

gulp.task('karma.jquery', function(done) {

    return new Server.start({
        configFile: __dirname + '/test/karma.conf.jquery.js'
    }, done);
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
