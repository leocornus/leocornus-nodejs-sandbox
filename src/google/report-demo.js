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
  var nextPageToken = response.result.reports[0].nextPageToken;
  console.log(rows.length);
  console.log(nextPageToken);
  if(nextPageToken) {
    document.getElementById('page-token').value = nextPageToken;
  }
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
  document.getElementById('query-output').value = formattedJson;
}
