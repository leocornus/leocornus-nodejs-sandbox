Gulp Makes Life Esier
=====================

Simple Quick Start
------------------

Gulp `Getting Started`_ has pretty clear instruction.
Here is a quick summary::

  $ npm install --save-dev gulp

The gulp binary file could be found in folder 
**./node_modules/.bin/**. We could execute it like following::

  $ ./node_modules/.bin/gulp

The very first **gulpfile.js**,
It should be stored at the root of your node.js project.::

  var gulp = require('gulp');

  gulp.task('default', function() {
    // place code for your default task here
  });

We could add a script in **package.json** like this::

  "scripts": {
    "gulp": "gulp"
  },

Then we could run it using **npm run gulp**, for example::

  $ npm run gulp default

Execute karma test runner
-------------------------

It is so easy to execute karma test runner in Gulp.
Here is a simple example::

  // try load karm for testing.
  var Server = require('karma').server;
  
  gulp.task('karma', function(done) {
  
      return new Server.start({
          configFile: __dirname + '/test/karma.conf.jasmine.js',
      }, done);
  });

Then we could load karm by using the following command::

  $ gulp karma
  $ npm run gulp karma


start stop web server
---------------------

Start stop express server
-------------------------

the express static server could be used as web server.
Here are simple way to start and stop a express static server.
We will using **gulp-live-server** plugin to load express server::

  // using the express to serve static files.
  var gls = require('gulp-live-server');
  var liveServer = gls.static('.', 8900);
  gulp.task('express-static', function() {
  
      liveServer.start();
  });

  // the e2e testing task will start after exprss static is finished
  gulp.task('protractor', ['express-static'], function() {
      // E2E testing task...
  });
  
  // stop live server after e2e testing are finished.
  gulp.task('express-stop', ['protractor'], function() {
  
      liveServer.stop();
  });

.. _Getting Started: https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md
