using Express for E2E testing
=============================

Story about using Express for e2e testing.
We will talk about the following things:

- express
- gulp-liv-server plugin to using express in gulpfile.

Using Express as static web server
----------------------------------

This is a simple case, just add the folder as express static files::

  // the very simple express server.
  
  var express = require('express');
  var app = express();
  
  //load static files.
  app.use('/demo', express.static('demo'));
  app.use('/src', express.static('src'));
  app.use('/bower_components', express.static('bower_components'));
  
  // start server.
  var server = app.listen(8900, function() {
  });


