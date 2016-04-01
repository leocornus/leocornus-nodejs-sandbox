Search API Design Case
======================

Try to show the case to redesign the search APIs.
We will have the following structure / component for this case.

- Client side query data structure (request)
- Server side response data structure
- Client side presentation components (bootstrap components)
- Pagination strategy.

**Assumption**

This search API will assume we are using Solr or Elasticsearch
(or equivalent search framework) as the server side search engine.

Query Structure
---------------

We try to keep the query structure as simple as possible.
Here is quick one to start with::

  searchQuery = {
      term: SEARCH_TERM,
      sort: SORT,
      start: start_page_number, // starts from 1
      perpage: items_per_page,
      // advanced query params
      filterQuery: FILTER_QUERY,
      fieldList: LIST_OF_FIELDS, // default is empty, all fields.
      // set the facet we need.
      facet: {
          facetQuery : ['Search Term One', 'TERM TWO'],
          facetField : ['site', 'keywords', 'authors']
      }
  }

Response Structure
------------------

Here is the response structure::

  responseData = {
      currentQuery: searchQuery, // the whole object of search query
      total: TOTAL,
      docs: LIST_OF_MATCHED_DOCS,
      // structure of facets
      facet: {
          facetQuery: {
              'SEARCH TERM ONE': TOTAL_NUMBER,
              'TERM TWO': TOTAL_NUMBER
          },
          facetField: {
              site: {
                  'wiki': 120,
                  'site1': 230,
              },
              keywords: {
                  'acronyms': 30,
                  'news': 219,
                  'events': 23
              },
              authors{
                  'Sean Chen': 30,
                  'John Li': 219
              },
          }
      }
  }

Pagination Stragegy
-------------------

the strategy to 

- generate pagination buttons.
- flipping pages.

Here are the algorithm:

**Define the params**

- currentPage - current page number, starts from 1
- totalPages - total number of pages
- surroundingPages - how many pages before and after current page
- tailingPages - how many pages to show at 
  the beginning and ending of the pagination bar?

// calculate the start page number:
// - set startPage = currentPage - surroundingPages
// - if startPage < 1 then set startPage = 1
//startPage = startPage < 1 ? 1 : startPage;

// calculate the end page number:.
// - assumet we get the start page.
// - set endPage = startPage + (surroundingPages * 2)
// - if endPage > totalPages set endPage = totalPages
endPage = endPage > totalPages ? totalPages : endPage

// decide the start page again based on the end page.
startPage = endPage - (surroundingPages * 2);

// decide the first page and first ... page
// - if startPage <= (tailingPage + 2) then no ... page
//   - we will have all pages before start page.
//   - simplely set the startPage = 1
startPage = startPage <= (tailingPage + 1) ? 1 : startPage;
// - else the case (startPage > 4)
//   - we will have first page and first ... page.
//   - build the first page and the first ... page.
if(startPage > 1) {
    // build the first page and the first ... page
    thePage = this.buildAPage('1');
    pagination = pagination + thePage;
    thePage = this.buildAPage('2');
    pagination = pagination + thePage;
    // build the first ... page.
    thePage = this.buildAPage('...', 'disabled');
    pagination = pagination + thePage;
}

// decide the last page and last ... page
// - if endPage >= totalPages - 2 then no need ... page.
//   - we will build all pages to total pages.
//   - simplely set endPage = totalPages.
endPage = endPage >= (totalPages - tailingPages) ? 
          totalPages : endPage;

// generate the page list from start to end pages..
for(var page = startPage; page <= endPage; page ++) {

    // normal page.
    var thePage = this.buildAPage(page);
    if(page == currentPage) {
        // active page.
        thePage = this.buildAPage(page, 'active');
    }
    pagination = pagination + thePage;
}

// - else (endPage < totalPages - 2)
//   - we have build the last ... page and last page.
if(endPage < (totalPages - tailingPages)) {

    // build the first page and the last ... page
    thePage = this.buildAPage('...', 'disabled');
    pagination = pagination + thePage;
    // build the last page.
    thePage = this.buildAPage(totalPages -1);
    pagination = pagination + thePage;
    thePage = this.buildAPage(totalPages);
    pagination = pagination + thePage;
}

// decide the next page button.
if(currentPage !== totalPages) { 
    thePage = this.buildAPage('Next &raquo;');
} else {
    thePage = this.buildAPage('Next &raquo;', 'disabled');
}
pagination = pagination + thePage;

// add the ending tags.
pagination = pagination + '</ul></nav>';
return pagination;
