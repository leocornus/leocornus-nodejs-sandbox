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

    $('#convert-treemap').on('click', function() {
        convertTreemap();
    });
    $('#create-summary').on('click', function() {
        createSummary();
    });
});

function showMessage() {

  document.getElementById('query-output').value = 'Logged in!';
}

/**
 * get ready the report request, which includes:
 * 
 * - metrics
 * - dateRange
 * - dimensions
 */
function queryReports() {

  // Replace with your view ID.
  var VIEW_ID = $('#view-id').val();
  // date format: 2017-05-01
  var startDate = $('#start-date').val();
  var endDate = $('#end-date').val();
  var pageToken = $('#page-token').val();
  var pagePathExpression = $('#page-path-exp').val();
  
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
            },
            {
              expression: 'ga:users'
            }
          ],
          dimensions: [
            {
              name: 'ga:pagePath'
            }
            //{
            //  name: 'ga:hour'
            //},
            //{
            //  name: 'ga:minute'
            //}
          ],
          dimensionFilterClauses: [{
            operator: "OR",
            filters: [
              {
                dimensionName: "ga:pagePath",
                not: false,
                operator: "REGEXP",
                expressions: [
                  pagePathExpression
                ]
              }
            ]
          }]
        }
      ]
    }
  }).then(displayResults, console.error.bind(console));
}

/**
 * process the query result, including display the result
 * it will do more than that.
 *
 * - handle pagination
 * - merge the reult
 * - update the cosmetic labels.
 */
function displayResults(response) {

    console.log(response);
    var rows = response.result.reports[0].data.rows;
    console.log(rows.length);
    // process the current query result.
    var pages = [];
    for(var i = 0; i < rows.length; i++) {
        var aRow = rows[i];
        // page has structure: [path, sessions, pageviews]
        pages.push([aRow.dimensions[0],
                    parseInt(aRow.metrics[0].values[0]),
                    parseInt(aRow.metrics[0].values[1]),
                    parseInt(aRow.metrics[0].values[2])]);
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

/**
 * convert the query result to treemapping format.
 * here is the data structure:
 *  - all
 *    - group one (MOF)
 *      - site one (fin)
 *        - page one
 *        - page two
 *      - site two (revenue)
 *    - group two (MNRF)
 *      - site one (naturalresources)
 *
 * strategy to order group by total group pageviews.
 * 
 * 1. create a groupsInOrder arrry, with structure:
 *    [groupname, totalPageviews]
 * 2. order the group after 
 */
function convertTreemap() {

    var formatNumber = d3.format(',d');

    // get all pages and pathes.
    var pathes = JSON.parse($('#query-output').val());
    // array for each circle:
    var groups = {}; // decide by group rules.
    var groupsPageviews = {};
    //var groupsSessions = {};
    var totalSessions = 0;
    var totalUsers = 0;
    var pagesSummary = [];
    //alert(originLines.length);
    for(var i = 0; i < pathes.length; i++) {
        // each path has sturcture:
        // [page_path, sessions, pagevies]
        var pagePath = pathes[i][0];
        var pageSessions = pathes[i][1];
        var pagePageviews = pathes[i][2];
        var pageUsers = pathes[i][3];


        // find the site for this page.
        //var pattern = /^\/(.*)\//;
        var pattern = /^\/([a-z0-9\-]*)\//;
        var site = '/';
        var result = pattern.exec(pagePath);
        if(result != null) {
            // find some match.
            site = result[1];
        }

        // find the group and site for this page path.
        // set the default group.
        var group = 'Other Sites';
        for(var n = 0; n < groupRules.length; n++) {
            var condition = RegExp(groupRules[n][0]);
            if(condition.test(pagePath)) {
                // find match, assign the group
                group = groupRules[n][1];
                break;
            }
        }
        if(Object.keys(groups).indexOf(group) < 0) {
            // create the new group.
            groups[group] = {};
            groupsPageviews[group] = {};
            // track the total pageviews for a group.
            groupsPageviews[group]['groupPageviews'] = 0;
        }
        // using the site as the key.
        if(Object.keys(groups[group]).indexOf(site) < 0) {
            // create the new site.
            groups[group][site] = [];
        }

        var page = {
          "name": pagePath,
          "size": pagePageviews,
        };
        // push page to site.
        groups[group][site].push(page);
        // add the page pageviews to group pageviews.
        groupsPageviews[group]['groupPageviews'] += pagePageviews;

        // sumamry for top 10 pages.
        if(i < 20) {
            // get ready the href link for page.
            var pageUrl = pagePath.substring(0,8);
            pageUrl = pagePath.length > 8 ? pageUrl + "..." : pageUrl;
            pageUrl = '<a href="http://intra.net.gov.on.ca' +
               pagePath + '" title="' + pagePath + '">' + 
               pageUrl + '</a>';
            var summary = 
                '<tr>' +
                '<td>' + pageUrl + '</td>' +
                '<td class="pageviews">' + pagePageviews + '</td>' +
                '<td>' + group + '</td>' +
                '</tr>';
            pagesSummary.push(summary);
        }
        totalSessions += pageSessions;
        totalUsers += pageUsers;
    }

    // try to sort the groups by group pageviews.
    var groupsInOrder = [];
    for(var group in groupsPageviews) {
        groupsInOrder.push([group, 
                           groupsPageviews[group]["groupPageviews"]]);
    }
    console.log(groupsInOrder);
    groupsInOrder = groupsInOrder.sort(function(a, b) {
        return b[1] - a[1];
    });

    var allGroups = [];
    var groupsSummary = [];
    // [pageviews, pages, sites]
    var total = [0,0,0];
    for(var i = 0; i < groupsInOrder.length; i ++) {

        var group = groupsInOrder[i][0];
        var sites = groups[group];

        // variables for summary:
        var totalPageviews = groupsInOrder[i][1];
        var totalSites = Object.keys(sites).length;
        var totalPages = 0;

        var groupChildren = [];
        for(var site in sites) {
            var pages = sites[site];
            totalPages = totalPages + pages.length;
            var eachSite = {
              "name": site,
              "children": pages
            };
            groupChildren.push(eachSite);
        }

        // if the group only have one child.
        var children = groupChildren;
        if(groupChildren.length == 1) {
            children = groupChildren[0]["children"];
        }
        var eachGroup = {
          "name": group,
          "children": children
        };
        allGroups.push(eachGroup);

        // build the groups summary.
        //var summary = buildListGroupItem(group, totalSites, 
        var summary = buildTableRow(group, totalSites, 
                                         totalPages, totalPageviews);
        // calculate total.
        total[0] += totalPageviews;
        total[1] += totalPages;
        total[2] += totalSites;
        groupsSummary.push(summary);
    }
    total[3] = totalSessions;
    total[4] = totalUsers;

    var jsonData = {
        "name": "OPSpedia Traffic",
        "children":allGroups
    };

    $('#jsonstring').html(JSON.stringify(jsonData, null, 2));
    $('#summary').html(createSummary('table', groupsSummary, 
                                     pagesSummary, total));
    $('#summary-div').html(createSummary('table', groupsSummary, 
                                         pagesSummary, total));
}

/**
 * create summary
 */
function createSummary(type, groupsSummary, pagesSummary, total) {

    var summary = '';
    var format = d3.format(',d');
    var formatPercentage = d3.format(".2%");

    switch(type) {
        case 'table':
            var pvPattern = /<td class=\"pageviews\">([0-9]*)<\/td>/;
            // add number column and percentage column
            var groups = groupsSummary.map(function(group, index) {
                if (index > 9) {
                    return '';
                }
                var pageViews = parseInt(pvPattern.exec(group)[1]);
                var percent = pageViews / total[0];
                // by search the beginning <tr>
                // and replace with <tr><th></th>
                var newGroup = group.replace('<tr>', 
                                '<tr><th>' + (index + 1) + '</th>');
                // add the percentage column.
                return newGroup.replace(
                  '<td class="pageviews">' + pageViews + '</td>',
                  '<td class="pageviews">' + format(pageViews) + 
                  '</td><td>' + 
                  buildProgressBar(formatPercentage(percent)) + 
                  '</td>');
            });
            // add number column for top pages.
            var pages = pagesSummary.map(function(page, index) {
                var pageViews = parseInt(pvPattern.exec(page)[1]);
                var percent = pageViews / total[0];
                var newPage = page.replace('<tr>',
                                '<tr><th>' + (index + 1) + '</th>');
                return newPage.replace(
                  '<td class="pageviews">' + pageViews + '</td>',
                  '<td class="pageviews">' + format(pageViews) + 
                  '</td><td>' + 
                  buildProgressBar(formatPercentage(percent)) + 
                  '</td>');
            });

            summary =
'<div class="tab-content">' +
'<div class="tab-pane active" id="groups" role="tabpanel">' +
  '<table class="table table-hover">' +
  '<caption>' +
  'Top 10 Ministries by Pageviews' +
  '</caption>' +
  '<thead><tr>' + 
  '  <th>#</th>' + 
  '  <th>Ministry</th>' + 
  '  <th>Pageviews</th>' + 
  '  <th width="400px">Percentage</th>' +
  '  <th>Pages</th>' + 
  //'  <th>Sites</th>' + 
  '</tr></thead>' +
  '<tbody>' +
  groups.join('\n') +
  '</tbody></table>' +
'</div>' +
'<div class="tab-pane" id="pages" role="tabpanel">' +
  '<table class="table table-hover">' +
  '<caption>' +
  'Top 20 Pages by Pageviews' +
  '</caption>' +
  '<thead><tr>' + 
  '  <th>#</th>' + 
  '  <th>Page</th>' + 
  '  <th>Pageviews</th>' + 
  '  <th width="400px">Percentage</th>' +
  '  <th>Ministry</th>' + 
  //'  <th>Sites</th>' + 
  '</tr></thead>' +
  '<tbody>' +
  pages.join('\n') +
  '</tbody></table>' +
'</div>' +
'</div>';
            break;
    }

    summary =
//'<div class="col-md-6">' +
'Total Pageviews: <strong>' + format(total[0]) + '</strong><br/>' +
'Total Pages: <strong>' + format(total[1]) + '</strong><br/>' +
'Total Sessions: <strong>' + format(total[3]) + '</strong><br/>' +
'Total Users: <strong>' + format(total[4]) + '</strong><br/>' +
'<ul class="nav nav-tabs" role="tablist">' +
'  <li role="presentation" class="active">' +
'    <a href="#groups" aria-controls="groups" role="tab"' +
'       data-toggle="tab"' +
'    >Top Ministries</a>' +
'  </li>' +
'  <li role="presentation">' +
'    <a href="#pages" aria-controls="pages" role="tab"' +
'       data-toggle="tab"' +
'    >Top Pages</a>' +
'  </li>' +
'</ul>' +
summary;
//'</div>';

    return summary;
}

/**
 * build the list group item.
 *
 * <li class="list-group-item" >
 *   <span class="glyphicon glyphicon-stop"
 *         style="color: blue"></span>
 *   <a href="?group=cat:MCSCS">
 *     MCSCS - 2 Sites, 161 Pages, 308 Pageviews, 
 *   </a>
 * </li>
 */
function buildListGroupItem(groupName, totalSites, totalPages,
                            totalPageviews) {
    // build
    var summary = 
'<li class="list-group-item" >' +
'  <span class="glyphicon glyphicon-stop"' +
'        style="color: blue"></span>' +
'  <a href="?group=cat:' + groupName + '">' + 
groupName + ' - ' + totalSites + ' Sites, ' + 
totalPages + ' Pages, ' +
totalPageviews + ' Pageviews, ' +
'</a>' +
'</li>';

    return summary;
}

/**
 * build row for each table..
 *
 * <tr>
 *   <td>MOF</td>
 *   <td>2089</td>
 *   <td>345</td>
 * </tr>
 */
function buildTableRow(groupName, totalSites, totalPages,
                            totalPageviews) {
    var format = d3.format(',d');
    // build
    var summary = 
'<tr>' +
'<td>' + groupName + '</td>' +
'<td class="pageviews">' + totalPageviews + '</td>' +
'<td>' + format(totalPages) + '</td>' +
//'<td>' + totalSites + '</td>' +
'</tr>';

    return summary;
}

/**
 * build the bootstrap progress bar fro the given percentage.
 */
function buildProgressBar(percentage) {

    var theBar = 
    '<div class="progress">' +
      '<div class="progress-bar" role="grogress-bar" ' +
      '     style="width:' + percentage + ';">' +
      percentage +
      '</div>' +
    '</div>';

    return theBar;
}

/**
 * set the rules for now.
 */
var groupRules = 
    [ 
      ["(^/(customsearch|solrsearch)|.*/?(search_term|searchterm|s)=.*)", "OPSpedia Search"],
      ["^/(mnr|natural)", "MNRF"], 
      ["^/(fin|rev|stevecheng)", "MOF"], 
      ["^/(mgcs|serviceontario|diversity|mgs)", "MGCS"], 
      ["^/(omafra|OMAFRA|digitalomafra|debstark|gregmeredith)", "OMAFRA"], 
      ["^/mag", "MAG"], 
      ["^/(moh|majamilosevic)", "MOHLTC"], 
      ["^/(mcscs|MCSCS)", "MCSCS"], 
      ["^/(mcys|nancymatthews)", "MCYS"], 
      ["^/mcss", "MCSS"], 
      ["^/(labour|sophiedennis)", "MOL"],
      ["^/mci", "MCI"],
      ["^/mah", "MAH"],
      ["^/mirr", "MIRR"],
      ["^/(lrc|gis)", "LRC"],
      ["^/(tbs|openon|greenoffice)", "TBS"], 
      ["^/(cyssc)", "CYSSC"], 
      ["^/(cac|CAC)", "CAC"], 
      ["^/(tcu)", "TCU-ETD"],
      ["^/(iit|IIT)", "IIT"], 
      ["^/(its|ITS)", "ITS"], 
      ["^/(groups)", "Groups"],
      ["^/(mds)", "MDS"],
      ["^/(wiki)", "Wiki"],
      ["^/(topical|Topical)/$", "Topical Homepage"],
      ["^/(topical/category|topical/ops-weekly|topical/event-calendar)", "Topical Categories"],
      ["^/topical-agencies", "Topical Agencies"],
      ["^/(topical|Topical)", "Story Pageviews"],
      ["^/(tops|webcomm)", "Programs"]
    ];
