/**
 * simple search function.
 */

var search = function(req, res) {

    // simple result, an array of string.
    var simpleResult = [
        "Item One",
        "Item Two",
        "Item Three",
        "Item Four"
    ];

    // hard code some result.
    var objectResult = [
        {title:'The Title', url:'http://one.com'},
        {title:'The Two', url:'http://two.com'},
        {title:'The Three', url:'http://three.com'}
    ];

    res.send(objectResult);
};

module.exports = search;
