// the very simple express server.

var express = require('express');
var serveIndex = require('serve-index');
var app = express();

//load static files.
app.use('/', express.static('demo/vue'));
//app.use('/', serveIndex('demo/vue'));
app.use('/bower_components', express.static('bower_components'));
// hello world simple get.
app.get('/hello', function(req, res) {
    res.send('<h1>Hello Express World</h1>');
});

// start server.
var server = app.listen(17500, function() {
});
