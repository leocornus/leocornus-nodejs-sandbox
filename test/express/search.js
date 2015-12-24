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

    var longestDesc = 'one one one one one one one one, ' +
        'one one one one one one one one, ' + 
        'one one one one one one one one, ' + 
        'one one one one one one one one';

    // hard code some result.
    var objectResult = [
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

    res.send(objectResult);
};

module.exports = search;
