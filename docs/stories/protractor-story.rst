The Protractor Story
====================

using protractor to simplefy end to end testing.

Installation
------------

Protractor depends a list of things, 
::

  $ npm install protractor --save-dev

Configuration
-------------

create a simple protractor config file::

  exports.config = {
    allScriptsTimeout: 11000,

    specs: [
      'test/protractor/*.js'
    ],

    capabilities: {
      'browserName': 'chrome'
    },

    chromeOnly: true,

    baseUrl: 'http://localhost:8900/',

    framework: 'jasmine',

    jasmineNodeOpts: {
      defaultTimeoutInterval: 30000
    }
  };

npm execute script
------------------

to execute the e2e testing, add the following scripts in file
**package.json**::

  "script": {
      "preupdate-webdriver": "npm install",
      "update-webdriver": "webdriver-manager update",

      "preprotractor": "npm run update-webdriver",
      "protractor": "protractor test/protractor.conf.js --browser=firefox',
  }

run protractor::

  $ npm run protractor

gulp task
---------

need the instruction to create gulp task to execute e2e test cases.
Install the gulp-protractor module::

  $ npm install gulp-protractor --save-dev

Create gulp task is pretty easy::

  // load the protractor.
  var protractor = require('gulp-protractor').protractor;
  var webdriver_update = require('gulp-protractor').webdriver_update;
  var webdriver = require('gulp-protractor').webdriver;
  
  // launch the webdriver.
  gulp.task('webdriver_update', webdriver_update);
  gulp.task('webdriver', webdriver);
  
  gulp.task('protractor', ['webdriver_update', 'webdriver'], function() {
  
      gulp.src(['test/protractor/**/*.js']).pipe(protractor({
          configFile: 'test/protractor.conf.js'
      }));
  });

A simple Protractor Spec
------------------------

Here is simple e2e testing spec::

  describe('Simple HTML Page', function() {
  
      beforeEach(function() {
          // load the home page.
          // relative to the baseUrl in protractor.conf.js.
          browser.get('demo/protractor/simple-one.html');
      });
  
      it('has correct page title', function() {
  
          expect(browser.getTitle()).toEqual('Testing Page');
      });
  });

the **browser** a wrapper to **WebDriverJS**.
It provides a lot simple interface for testing...
This makes our e2e testing depends on **Angular.js**.
::

  $ bower install angular --save-dev

A simple demo page (fixture)
----------------------------

The fixture, where we demostrate the scenario for testing, 
will have to load Angular as while as jQuery.
Here is a quick sample::

  <html ng-app="simpleTest">
    <head>
      <title>Testing Page</title>
  
      <link rel='stylesheet' href='/bower_components/bootstrap/dist/css/bootstrap.min.css'/>
      <script src='/bower_components/jquery/dist/jquery.min.js'></script>
      <script src='/bower_components/bootstrap/dist/js/bootstrap.min.js'></script>
      <script src='/bower_components/angular/angular.min.js'></script>
      <script>
  // this will replace the code in controller.js
  var simpleTest = angular.module('simpleTest', []);
      </script>
    </head>
    <body>
      <div class="container">
        <div class="page-header"><h1>Hello Web Server</h1></div>
      </div>
    </body>
  </html>
