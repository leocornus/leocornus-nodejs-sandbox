nodemw story
============

nodemw_ is a Node.js client to wikipedia.org APIs.
This story is basically try to using unit test cases 
to learn how to use nodemw_.

install
-------

using npm install::

  $ npm install nodemw --save-dev

unit test specs
---------------

The simplest spec::

  var assert = require('chai').assert;
  var bot = require('nodemw');
  
  describe('Basic nodemw Spec', function() {
  
      var client;
  
      beforeEach(function() {
          var config = {
              server: 'en.wikipedia.org',
              // debug: true,
              path: '/w'
          };
          client = new bot(config);
      });
  
      it('nodemw bot is an object', function() {

          assert.isObject(client);
      });
  });

mocha for unit testing
----------------------

install gulp-mocha plugin::

  $ npm install gulp-mocha --save-dev

get ready the gulp task::

  var mocha = require('gulp-mocha');
  gulp.task('mocha.nodemw', function() {

      // 
      return gulp.src(['test/nodemw/*.js'], {read: false})
        .pipe(mocha({
          reporter: 'spec',
          timeout: 5000
        }));
  });

execute the test cases::

  $ npm run gulp mocha.nodemw

.. _nodemw: https://github.com/macbre/nodemw
