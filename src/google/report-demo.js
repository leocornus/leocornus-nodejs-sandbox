jQuery(document).ready(function($) {

    $('#query').on('click', function() {
        queryReports();
    });

    // merge the result.
    $('#merge').on('click', function() {

        var inputOne = JSON.parse($('#input-one').val());
        var inputTwo = JSON.parse($('#input-two').val());
        var result = inputOne.concat(inputTwo);
        // sort the pages by pageviews..
        result = result.sort(function(a, b) {
            // sort by size of the site.
            return b[2] - a[2];
        });
        console.log(result.length);

        var formattedJson = JSON.stringify(result, null, 2);
        document.getElementById('query-output').value = formattedJson;
    });
});

function showMessage() {

  document.getElementById('query-output').value = 'Logged in!';
}


// Query the API and print the results to the page.
function queryReports() {

  // Replace with your view ID.
  var VIEW_ID = $('#view-id').val();
  var startDate = $('#start-date').val();
  var endDate = $('#end-date').val();
  var pageToken = $('#page-token').val();
  
  // set the page on query button.
  $('#query').attr('pageToken', pageToken);

  gapi.client.request({
    path: '/v4/reports:batchGet',
    root: 'https://analyticsreporting.googleapis.com/',
    method: 'POST',
    body: {
      reportRequests: [
        {
          viewId: VIEW_ID,
          // page size set how many rows to return.
          // maxium is 10,000 for page path dimension
          pageSize: 10000,
          'pageToken': pageToken,
          dateRanges: [
            {
              startDate: startDate, 
              endDate: endDate
            }
          ],
          metrics: [
            {
              expression: 'ga:sessions'
            },
            {
              expression: 'ga:pageviews'
            }
          ],
          dimensions: [
            {
              name: 'ga:pagePath'
            }
          ]
          // ,
          // dimensionFilterClauses: [{
          //   operator: "OR",
          //   filters: [
          //     {
          //       dimensionName: "ga:pagePath",
          //       not: false,
          //       operator: "REGEXP",
          //       expressions: [
          //         "^/(mnr|naturalresources)"
          //       ]
          //     }
          //   ]
          // }]
        }
      ]
    }
  }).then(displayResults, console.error.bind(console));
}

function displayResults(response) {

    var rows = response.result.reports[0].data.rows;
    console.log(rows.length);
    // process the current query result.
    var pages = [];
    for(var i = 0; i < rows.length; i++) {
        var aRow = rows[i];
        // page has structure: [path, sessions, pageviews]
        pages.push([aRow.dimensions[0],
                    parseInt(aRow.metrics[0].values[0]),
                    parseInt(aRow.metrics[0].values[1])]);
    }

    // sort the pages by pageviews..
    pages = pages.sort(function(a, b) {
        // sort by size of the site.
        return b[2] - a[2];
    });
    var formattedJson = JSON.stringify(pages, null, 2);

    var nextPageToken = response.result.reports[0].nextPageToken;
    console.log(nextPageToken);
    // check if we need query next page.
    if(nextPageToken) {
        // set the page token for next page.
        document.getElementById('page-token').value = nextPageToken;
        // update button label.
        $('#query').text('Query Next Page');
    } else {
        $('#query').text("That's All");
    }

    // get current page token.
    var currentPageToken = $('#query').attr('pageToken');
    if(currentPageToken > 0) {
        // this is not the first page. We nee merge!
        var currentPages = JSON.parse($('#query-output').val());
        //console.log(currentPage);
        var newPages = currentPages.concat(pages);
        newPages = newPages.sort(function(a, b) {

            return b[2] - a[2];
        });
        formattedJson = JSON.stringify(newPages, null, 2);
    }

    $('#query-output').val(formattedJson);
    console.log('Total length = ' + formattedJson.length);
}
