Using npm to do jQuery development
==================================

Questions
---------

- how to use npm for jQuery development?
- What benefit we could get from npm for jQuery development?

Conclusion
----------


How to test and play around?
----------------------------

Read `Using jQuery plugins with npm`_ to get started.
The browserify_ is cool!

local storage or cookie?
------------------------

localStorage_ is built-in storage for JavaScript language.
It could not share with server side application.

Get started with browserify
---------------------------

install browserify using npm::

  $ npm install browserify --save-dev

update **package.json** file to add the following line to 
**scripts**::

  "browserify": "browserify"

Here are the basic commands for browserify::

  $ npm run browserify src/jquery/entry.js --debug > src/jquery/bundle.js

.. _Createing an NPM-driven Website: http://tutorialzine.com/2015/03/npm-driven-website/
.. _localStorage: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
.. _Using jQuery plugins with npm: http://blog.npmjs.org/post/112064849860/using-jquery-plugins-with-npm
.. _browserify: https://www.npmjs.com/package/browserify
