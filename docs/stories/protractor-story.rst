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

TODO: gulp task
---------------

need the instruction to create gulp task to execute e2e test cases.

A simple Protractor Spec
------------------------

Here is simple e2e testing spec::

  describe('Simple HTML Page', function() {
  
      beforeEach(function() {
          // load the home page.
          // relative to the baseUrl in protractor.conf.js.
          browser.get('demo/protractor/simplet-one.html');
      });
  
      it('has correct page title', function() {
  
          expect(browser.getTitle()).toEqual('Testing Page');
      });
  });

the **browser** a wrapper to **WebDriverJS**.
It provides a lot simple interface for testing...
This make out e2e testing depends on **Angular.js**.
