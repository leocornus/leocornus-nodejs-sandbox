jQuery(document).ready(function($) {

    var VIEW_ID = '41055556';
    $('#query').on('click', function() {
        // Replace with your view ID.
        var startDate = $('#start-date').val();
        var endDate = $('#end-date').val();
        var pageToken = "0";
        // save for results.
        var pages = [];
        $.when(
            queryReports(VIEW_ID, startDate, endDate, pageToken),
            queryReports(VIEW_ID, startDate, endDate, "10000")
        ).then( function() {

        // sort the pages by pageviews..
        pages = pages.sort(function(a, b) {
            // sort by size of the site.
            return b[2] - a[2];
        });

        var formattedJson = JSON.stringify(pages, null, 2);
        document.getElementById('query-output').value = formattedJson;
        });
    });
});

function showMessage() {

  document.getElementById('query-output').value = 'Logged in!';
}


// Query the API and print the results to the page.
function queryReports(viewId, startDate, endDate, pageToken) {

  gapi.client.request({
    path: '/v4/reports:batchGet',
    root: 'https://analyticsreporting.googleapis.com/',
    method: 'POST',
    body: {
      reportRequests: [
        {
          "viewId": viewId,
          // page size set how many rows to return.
          // maxium is 10,000 for page path dimension
          pageSize: 10000,
          "pageToken": pageToken,
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
  var nextPageToken = response.result.reports[0].nextPageToken;
  console.log(rows.length);
  console.log(nextPageToken);
  for(var i = 0; i < rows.length; i++) {
    var aRow = rows[i];
    // page has structure: [path, sessions, pageviews]
    pages.push([aRow.dimensions[0],
                parseInt(aRow.metrics[0].values[0]),
                parseInt(aRow.metrics[0].values[1])]);
  }
}
