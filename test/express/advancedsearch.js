/**
 * advanced search function.
 */
var advancedsearch = function(req, res) {

    console.log(req.query);

    // get the query params.
    var searchTerm = req.query.term;
    var start = req.query.start;
    var perPage = req.query.perPage;

    // get ready the search result.
    var total = 20
    var searchResult = generateResult(total);

    // build the response.
    response = {
        currentQuery : req.query,
        total : total,
        searchResult : searchResult
    }

    res.send(response);
};

/**
 * utility function to generate some search result.
 */
function generateResult(total) {

    var longestDesc = 'one one one one one one one one, ' +
        'one one one one one one one one, ' + 
        'one one one one one one one one, ' + 
        'one one one one one one one one';

    // hard code some result.
    var objectResult = [
        {title:'The Title One', url:'http://one.com',
         description: longestDesc
        },
        {title:'The Two', url:'http://two.com',
         description: 'one one one one two two two two two'
        },
        {title:'The Title', url:'http://one.com',
         description: longestDesc
        },
        {title:'The Two', url:'http://two.com',
         description: 'one one one one two two two two two'
        },
        {title:'The Title', url:'http://one.com',
         description: longestDesc
        },
        {title:'The Two', url:'http://two.com',
         description: 'one one one one two two two two two'
        },
        {title:'The Title', url:'http://one.com',
         description: longestDesc
        },
        {title:'The Two', url:'http://two.com',
         description: 'one one one one two two two two two'
        },
        {title:'The Title', url:'http://one.com',
         description: longestDesc
        },
        {title:'The Two', url:'http://two.com',
         description: 'one one one one two two two two two'
        },
        {title:'The Title', url:'http://one.com',
         description: longestDesc
        },
        {title:'The Two', url:'http://two.com',
         description: 'one one one one two two two two two'
        },
        {title:'The Three', url:'http://three.com',
         description: 'three three three'
        }
    ];

    return objectResult;
}

module.exports = advancedsearch;
