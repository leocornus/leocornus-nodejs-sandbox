var gulp = require('gulp');
var mocha = require('gulp-mocha');
// jamine runner.
var jasmine = require('gulp-jasmine');

// set the default task.
gulp.task('default', 
          ['karma', 'karma.jquery', 'jasmine', 'protractor', 'clean']);

gulp.task('hello', function() {
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

gulp.task('mocha.nodemw', function() {

  // the src method will locate the source file.
  return gulp.src(['test/nodemw/*.js'], {read: false})
    .pipe(mocha({
      reporter: 'spec',
      timeout: 5000
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

// gulp webserver
var webserver = require('gulp-webserver');
var webserverStream = gulp.src('.').pipe(webserver({
      host: '0.0.0.0',
      port: 8900,
      livereload: true,
      directoryListing: true,
      open: true
    }));

// task
gulp.task('webserver', function(done) {

    webserverStream = gulp.src('.').pipe(webserver({
      host: '0.0.0.0',
      port: 8900,
      livereload: true,
      directoryListing: true,
      open: true
    }));
    // web server is ready.
    done();
});

// load the protractor.
var protractor = require('gulp-protractor').protractor;
var webdriver_update = require('gulp-protractor').webdriver_update;
var webdriver = require('gulp-protractor').webdriver;

// launch the webdriver.
gulp.task('webdriver_update', webdriver_update);
gulp.task('webdriver', webdriver);

gulp.task('protractor', ['webdriver_update', 'webdriver'], function() {

    return gulp.src(['test/protractor/**/*.js']).pipe(protractor({
        configFile: 'test/protractor.conf.js'
    }));

});

var exit = require('gulp-exit');
gulp.task('clean', ['protractor'], function() {

    // kill the web server.
    //return webserverStream.emit('kill');
    return gulp.src("").pipe(exit());
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
