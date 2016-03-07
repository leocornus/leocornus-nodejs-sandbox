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
      filterQuery: FILTER_QUERY,
      fieldList: LIST_OF_FIELDS, // default is empty, all fields.
      facets: FACETS,
      start: START_PAGE_NUMBER, // starts from 1
      perPage: ITEMS_PER_PAGE
  }

Response Structure
------------------

Here is the response structure::

  responseData = {
      currentQuery: searchQuery, // the whole object of search query
      total: TOTAL,
      facets: FACETS,
      docs: LIST_OF_MATCHED_DOCS
  }

Pagination Stragegy
-------------------

the strategy to 

- generate pagination buttons.
- flipping pages.
