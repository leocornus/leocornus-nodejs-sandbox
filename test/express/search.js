/**
 * simple search function.
 */

var search = function(req, res) {

    console.log(req.query);

    // get the query params.
    var searchTerm = req.query.term;
    var start = req.query.start;
    var perPage = req.query.perPage;
    var filterQuery = req.query.fq;

    // simple result, an array of string.
    var simpleResult = [
        "Item One",
        "Item Two",
        "Item Three",
        "Item Four"
    ];

    var longestDesc = filterQuery + ' -- ' +
        'one one one one one one one one, ' +
        'one one one one one one one one, ' + 
        'one one one one one one one one, ' + 
        'one one one one one one one one';

    // hard code some result.
    var objectResult = [
        {title:'The Title One', url:'http://one.com',
         site: 'A-SITE',
         description: longestDesc
        },
        {title:'The Two', url:'http://two.com',
         site: 'A-SITE',
         description: 'one one one one two two two two two'
        },
        {title:'The Title', url:'http://one.com',
         site: 'A-SITE',
         description: longestDesc
        },
        {title:'The Two', url:'http://two.com',
         site: 'A-SITE',
         description: 'one one one one two two two two two'
        },
        {title:'The Title', url:'http://one.com',
         site: 'A-SITE',
         description: longestDesc
        },
        {title:'The Two', url:'http://two.com',
         site: 'A-SITE',
         description: 'one one one one two two two two two'
        },
        {title:'The Title', url:'http://one.com',
         site: 'A-SITE',
         description: longestDesc
        },
        {title:'The Two', url:'http://two.com',
         site: 'A-SITE',
         description: 'one one one one two two two two two'
        },
        {title:'The Title', url:'http://one.com',
         site: 'A-SITE',
         description: longestDesc
        },
        {title:'The Two', url:'http://two.com',
         site: 'A-SITE',
         description: 'one one one one two two two two two'
        },
        {title:'The Title', url:'http://one.com',
         site: 'A-SITE',
         description: longestDesc
        },
        {title:'The Two', url:'http://two.com',
         site: 'A-SITE',
         description: 'one one one one two two two two two'
        },
        {title:'The Three', url:'http://three.com',
         site: 'A-SITE',
         description: 'three three three'
        }
    ];

    res.send(objectResult);
};

module.exports = search;
