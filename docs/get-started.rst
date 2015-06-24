Get started nodejs module
=========================

How to get started Node.js development?
It is a good choice to start from create a Node.js module.

.. contents:: Table of Content
    :depth: 5

Create module
-------------

Here are how we `create Node.js modules`_:

- npm init to create package.json
- name and version are required.
- main is the main js file of the module, 
  by default it is: index.js

What testing framework?
-----------------------

There are many testing framework for node.js.
Good post to comparing the testing framework:
`Jasmine, Mocha, and Vows`_.

- The mocha_ framework is for both client and server side testing.
- The vows_ framework only support server-side testing.
- Jasmine_ is built to test client-side JavaScript. 
  Jasmine-node is for the server-side testing on node.js

Test runner
-----------

you could use npm directly or using the build tools.

For web application developed on a specfic framwwork,
it is better to choose the test runner from the framework.
For example, karma and protractor are for Angular application.
And both could be configured to use different testing frameworks.

How to config
-------------

build tools
-----------

- grunt?
- glup?

This presentation `glup vs grunt`_ is very interesting.

.. _create Node.js modules: https://docs.npmjs.com/getting-started/creating-node-modules
.. _mocha: http://mochajs.org
.. _vows: http://vows.js.org
.. _Jasmine: http://jasmine.github.io/
.. _Jasmine, Mocha, and Vows: http://blog.carbonfive.com/2012/07/25/asynchronous-javascript-testing-in-jasmine-mocha-and-vows/
.. _glup vs grunt: http://markdalgleish.github.io/presentation-build-wars-gulp-vs-grunt
