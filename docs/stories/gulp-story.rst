Gulp Get Started
================

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

.. _Getting Started: https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md
