/**
 * advanced search function.
 */
var advancedsearch = function(req, res) {

    console.log(req.query);

    // get the query params.
    var searchTerm = req.query.term;
    var start = parseInt(req.query.start);
    var perPage = parseInt(req.query.perPage);

    // get ready the search result.
    var total = searchTerm.length;
    //console.log('start = ' + start);
    var docs = generateMatchDocs(total, start, perPage);

    // build the response.
    response = {
        currentQuery : req.query,
        total : total,
        docs : docs 
    }

    res.send(response);
};

/**
 * untility function to generate a doc in the search result.
 */
function generateDoc(index) {

    var title = 'Title ' + index + ' title!';
    var desc = 'one one one one one one one one, ' +
        'one one one one one one one one, ' + 
        'one one one one one one one one, ' + 
        'one one one one one one one one';
    var url = 'http://url' + index + '.' + index + '.com';

    var doc = {
        title: title,
        url: url,
        site: 'SITE-' + index,
        description: desc
    };

    return doc;
}

/**
 * utility function to generate some search result.
 * it will return an arry of the result.
 */
function generateMatchDocs(total, start, perPage) {

    var objectResult = [];
    for (var i = 0; i < perPage; i ++) {

        // add document.
        objectResult.push(generateDoc(start + i));
        if((start + i) == total) {
            break;
        }
    }

    return objectResult;
}

module.exports = advancedsearch;
