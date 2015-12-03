// the very simple express server.

var express = require('express');
var serveIndex = require('serve-index');
var app = express();

//load static files.
app.use('/demo', express.static('demo'));
app.use('/demo', serveIndex('demo'));
app.use('/src', express.static('src', {index:false}));
app.use('/src', serveIndex('src'));
app.use('/bower_components', express.static('bower_components'));
app.use('/bower_components', serveIndex('bower_components'));

// hello world simple get.
app.get('/hello', function(req, res) {
    res.send('<h1>Hello Express World</h1>');
});

// explore the request and response...
// simply echo the request to response.
app.get('/echo', function(req, res) {

    var query = req.query;
    // the request query is an object.
    //console.log(query);
    res.send(query);
});

// simple search endpoint.
app.get('/search', function(req, res) {

    // simple result, an array of string.
    var simpleResult = [
        "Item One",
        "Item Two",
        "Item Three",
        "Item Four"
    ];

    // hard code some result.
    var objectResult = [
        {title:'The Title', uri:'http://one.com'},
        {title:'The Two', uri:'http://two.com'},
        {title:'The Three', uri:'http://three.com'}
    ];

    res.send(objectResult);
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
