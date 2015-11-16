A Karma story
=============

Using and load karma test runner is very straitforward:

- install module **karma** and its plugins:
  framework, launchers, and reporters.
- set script on file **package.json**
- create the karma config file to load plugins.
- update travis ci correspondingly.

**NOTE**
  Karma will execute all test cases / specs on 
  the browsers that you configured.
  So those node modules / libs will not be loaded
  unless you explicitly set up.

There is a little trick for `using chrome on travis`_.

Karma with Jasmine
------------------

Jasmine testing framework has everything you need to perform 
testing.
It is very easy to work with Karma because there is no dependence.
Here is a simple example of karma config file::

  // karma config for using jasmine framework.
  module.exports = function(config) {
    config.set({
      basePath : '../',
  
      files : [
        'test/jasmine/*.js'
      ],
  
      autoWatch : true,
      singleRun : true,
  
      frameworks: ['jasmine'],
  
      browsers : ['Firefox'],
  
      plugins : [
              'karma-firefox-launcher',
              'karma-mocha-reporter',
              'karma-jasmine'
              ],
  
      colors : true,
  
      reporters: ['mocha', 'dots']
    });
  };

Karma with Mocha
----------------

Mocha does NOT have a assertions library built-in.
We need load one for JavaScript running on browser
when use it with karma. 
The chaijs_ is a popular choice in this case, 
as Karma has a plugin for it.
Here are the example for minium config::

  // karma config for using mocha framework.
  module.exports = function(config) {
    config.set({
  
      basePath : '../',
  
      files : [
        'test/mocha-web/*.js'
      ],
  
      autoWatch : true,
      singleRun : true,
  
      frameworks: ['mocha', 'chai'],
  
      browsers : ['Firefox'],
  
      plugins : [
              'karma-chai',
              'karma-mocha',
              'karma-firefox-launcher',
              'karma-mocha-reporter'
              ],
  
      colors : true,
  
      reporters: ['mocha']
    });
  };

.. _writing your own karma adapter: https://developers.soundcloud.com/blog/writing-your-own-karma-adapter
.. _chaijs: http://chaijs.com/
.. _using chrome on travis: http://swizec.com/blog/how-to-run-javascript-tests-in-chrome-on-travis/swizec/6647
