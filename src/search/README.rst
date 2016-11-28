Libs for search
===============

try out some utility classes / plugins for search, mainly for Solr search.

Solr search apis in nutshell
----------------------------

Search query in json format::

  query_data: {
      term: searchTerm,
      start: 1,
      perPage: 30,
      facet: JSON.stringify(thefacet),
      fq: 'site: wiki AND keywords: Acronyms' 
  }

Result data in json format::

  response: {
      currentQuery: Object,
      docs: Array[12],
      facet: Object,
      total: 36
  }

Server side data structure
--------------------------

Need some examples for server side data structures.


