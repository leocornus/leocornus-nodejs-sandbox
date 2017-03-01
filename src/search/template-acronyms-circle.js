/**
 * build the Acronyms in zoomable circles. 
 */
var buildAcronymsCircles = function(docs, currentQuery, total, 
                            currentPage, totalPages, pagination) {

    var resultSummary = '';
    if(total > 0) {
        var end = currentQuery.start +
                  currentQuery.perPage - 1;
        end = end > total ? total : end;
        resultSummary =
            'Page <strong>' + currentPage + '</strong>' +
            ' Showing [<strong>' + currentQuery.start +
            '</strong> - <strong>' + end +
            '</strong>] of <strong>' +
            total + '</strong> total results';
    } else {
        // no result found
        resultSummary =
            '<strong>No results containing ' +
            'all your search terms were found.</strong>';
    }
    $('#search-info').html(resultSummary);

    var result = $("#result-list");
    result.html("");
    result.append('<div id="circles"></div>');

    // get ready the data.
    var circles =[];
    var color = d3.scale.linear().domain([0, docs.length])
        .range(["blue", "yellow"])
        .interpolate(d3.interpolateHcl);
    for(i = 0; i < docs.length; i++) {
        var acronym = docs[i];
        var circle = {
          "name": i + "",
          "children":[{
              "name": i + "",
              "size": 1000 + i,
              "leafFill": color(i),
              "imgUrl": ""
          }]
        };
        circles.push(circle);
    }
    // get ready the json data for the zoomable circle.
    var jsonData = {
          "attributes": {
            "title": "3 Equal size circles",
            "description": "Data example to show the data structure",
            "colorRange": [
              "white"
            ],
            "leafFill": "green"
          },
          "data": {
            "name":"This will NOT show anywhere!",
            "children": circles
          }
        };
    $('#jsonstring').html(JSON.stringify(jsonData, null, 2));
    $('#circles').zoomableCircles({}, jsonData);

    // add the pagination at the bottom too.
    result.append('<div>' + pagination + '</div>');

    return result;
};
