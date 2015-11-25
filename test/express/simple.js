// the very simple express server.

var express = require('express');
var app = express();

//load static files.
app.use('/demo', express.static('demo'));
app.use('/src', express.static('src'));
app.use('/bower_components', express.static('bower_components'));

// hello world simple get.
app.get('/hello', function(req, res) {
    res.send('<h1>Hello Express World</h1>');
});

// explore the request and response...
// simply echo the request to response.
app.get('/echo', function(req, res) {

    var query = req.query;
    console.log(query);
    res.send(query);
});

// testing the nodemw direct api.
var bot = require('nodemw');
var client = new bot({
    server: 'en.wikipedia.org',
    path: '/w',
    debug: true
});
// set the url as close as the local now.
app.get('/wiki/api.php', function(req, res) {

    //console.log(req.query);

    client.api.call(req.query, function(err, info, next, data) {
        //console.log(data);
        res.send(data);
    });
});

// start server.
var server = app.listen(8900, function() {
});
