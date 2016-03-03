/**
 * jQuery plugin to present a simple search function.
 *
 *   jQuery('#searn-input-id').searchStrap();
 */

;(function($) {

    // plugin name and default values.
    var pluginSearchStrap = "searchStrap";
    // se the default alue.
    var defaults = {
        // the url endpoint for search.
        searchUrl : '/search',
        // the kkkkkk
        itemsPerPage: 10,
        // id for the search button.
        searchButton : 'search-button',
        // query param for search term.
        queryName : 'searchterm'
    };

    // the plugin constructor.
    function Plugin(element, options) {
        // the DOM element.
        this.element = element;
        this.$element = $(element);
        // extend mthod will merge object contents.
        this.settings = $.extend({}, defaults, options);
        this._defatuls = defaults;
        this._name = pluginSearchStrap;
        this.init();
    }

    // use extend method to avoid Plugin prototype confilcts.
    $.extend(Plugin.prototype, {

        // the initialize function.
        init: function() {

            var self = this;
            // we will get search term from query
            var paramName = self.settings.queryName;
            var searchTerm =
                decodeURIComponent(this.getUrlVars()[paramName]);
            this.$element.val(searchTerm);

            // prepare the query to perform the initial search
            var searchQuery = this.prepareSearchQuery(searchTerm, 1);
            self.search(searchQuery);

            // hook the click event to search button.
            //console.log(self.settings.searchButton);
            $('#' + self.settings.searchButton).
                on('click', function() {

                self.handleButtonClick();
            });

            // hook the key press event.
            this.$element.on('keypress', function(event) {

                //console.log(event);
                // only handle the enter key.
                if(event.keyCode == 13) {
                    self.handleButtonClick();
                }
            });
        },

        /**
         * parse the URL got the query parameters.
         */
        getUrlVars : function() {

            var vars = [], hash;
            var href = window.location.href;
            var hashes = href.slice(href.indexOf('?') + 1).split('&');
            for(var i = 0; i < hashes.length; i++)
            {
                hash = hashes[i].split('=');
                vars.push(hash[0]);
                vars[hash[0]] = hash[1];
            }

            return vars;
        },

        /**
         * utility method to build the search query.
         * only handle search term and pagination now.
         * TODO: Will add field query soon.
         *
         * default start item is 1.
         */
        prepareSearchQuery: function(term, start) {

            // set the default value to 1 for start.
            var start = typeof start !== 'undefined' ? start : 1;

            var searchQuery = {
                term: term,
                start: start
            };

            return searchQuery;
        },

        /**
         * Perform search according to the search query.
         * Search query will track the search states, including:
         *
         * - search term
         * - start number
         * - TODO facets, filter query, 
         */
        search: function(searchQuery) {

            var self = this;

            // get ready action data for search endpoint.
            var searchAction = {
                term: searchQuery.term,
                start: searchQuery.start,
                perPage: self.settings.itemsPerPage
            };

            $.ajax({
                url: self.settings.searchUrl,
                method: 'GET',
                dataType: 'json',
                data: searchAction,
                success: function(data) {
                    self.handleSearchResult(data);
                }
            });
        },

        /**
         * handle button click event or enter key press.
         * we will reset search for both cases.
         */
        handleButtonClick : function() {

            var term = this.$element.val();
            // prepare the query to perform the initial search
            var query = this.prepareSearchQuery(term, 1);
            this.search(query);
            // build the new url.
            url = '?' + this.settings.queryName + 
                  '=' + encodeURIComponent(term);
            window.history.pushState('', 'testing', url);
        },

        // handle search result.
        handleSearchResult: function(data) {

            var self = this;
            // log the data for debuging...
            //console.log(data);

            var currentQuery = data.currentQuery;
            // TODO: analyze the search result.
            // total results.
            var total = data.total;
            // current page.
            var currentPage =
                (currentQuery.start - 1) / currentQuery.perPage + 1;
            // caculate the total pages.
            var totalPages = Math.ceil(total / currentQuery.perPage);

            // build the info bar.
            var info = this.buildInfoBar(currentQuery.term, total,
                                         currentPage, totalPages);

            // using list group for search result.
            $ul = $('<ul class="list-group"></ul>');
            $.each(data.searchResult, function(index, item) {
                // present each item as a list group item.
                var liHtml = self.buildItemHtml(item);
                $ul.append(liHtml);
            });

            // TODO: using current query to build the pagination bar
            var pagination = 
                this.buildPaginationDots(currentPage, totalPages);

            $('#search-result').html('').append(info).
                append($ul).append(pagination);

            // create jQuery object.
            // hook click event for all available pages.
            $('#search-result').find('nav ul li[class!="active"] a').
                on('click', function(event) {

                // identify the page.
                var searchTerm = currentQuery.term;
                var perPage = currentQuery.perPage;
                self.handlePagination($(this), searchTerm, 
                                      currentPage, totalPages, 
                                      perPage);
            });
        },

        /**
         * build the information bar for search result.
         */
        buildInfoBar: function(term, total, currentPage, totalPages) {

            var info =  '<p class="text-info">' +
                'Found ' + total + ' results (0.51 seconds) ' +
                'for <span class="label-info">' + 
                term + '</span>' +
                '</p>';

            return info;
        },

        /**
         * build the HTML for each item
         *
         * @param item object of each item
         */
        buildItemHtml: function(item) {

            var liHtml =
                '<li class="list-group-item">' +
                '  <h4 class="list-group-item-heading">' +
                '    <a href="' + item.url +
                            '" style="padding: 0;">' +
                       item.title +
                '    </a>' +
                '  </h4>' +
                '  <small class="text-muted">SITE</small>' +
                '  <p class="list-group-item-text">' +
                     item.description +
                '  </p>' +
                '</li>';

            return liHtml;
        },

        /**
         * using the current query and total to build the 
         * pagination bar.
         */
        buildPagination: function(currentPage, totalPages) {

            // border check up (first, last)
            // previous button will be handled by first page.
            // next button will be hanelded by last page.
            var pagination = '<nav><ul class="pagination">';

            // decide the previous page.
            if(currentPage !== 1) {
                pagination = pagination + 
                    this.buildAPage('First') +
                    this.buildAPage('&laquo; Previous');
            }

            // generate the page list.
            for(var page = 1; page <= totalPages; page ++) {

                // normal page.
                var thePage = this.buildAPage(page);
                if(page == currentPage) {
                    thePage = this.buildAPage(page, 'active');
                }
                pagination = pagination + thePage;
            }

            // decide the next page.
            if(currentPage !== totalPages) { 
                pagination = pagination +
                    this.buildAPage('Next &raquo;') +
                    this.buildAPage('Last');
            }

            // add the ending tags.
            pagination = pagination + '</ul></nav>';
            return pagination;
        },
        
        /**
         * build the pagination with ... and 
         * without First and Last button.
         */
        buildPaginationDots: function(currentPage, totalPages) {

            var pagination = '<nav><ul class="pagination">';

            var thePage = '';
            // decide the previous page button
            if(currentPage !== 1) {
                thePage = this.buildAPage('&laquo; Previous');
                pagination = pagination + thePage;
            }

            // calculate the start page:
            // - set startPage = currentPage - 2 
            // - if startPage < 1 then set startPage = 1
            var startPage = currentPage - 2;
            startPage = startPage < 1 ? 1 : startPage;

            // calculate the end page.
            // - assumet we get the start page.
            // - set endPage = startPage + 5 - 1
            // - if endPage > totalPages set endPage = totalPages
            var endPage = startPage + 4;
            endPage = endPage > totalPages ? totalPages : endPage

            // decide the first page and first ... page
            // - if startPage <= 3 then no ... page
            //   - we will have all pages before start page.
            //   - simplely set the startPage = 1
            startPage = startPage <= 3 ? 1 : startPage;
            // - else the case (startPage > 4)
            //   - we will have first page and first ... page.
            //   - build the first page and the first ... page.
            if(startPage > 1) {
                // build the first page and the first ... page
                thePage = this.buildAPage('1');
                pagination = pagination + thePage;
                // build the first ... page.
                thePage = this.buildAPage('...', 'disabled');
                pagination = pagination + thePage;
            }

            // decide the last page and last ... page
            // - if endPage >= totalPages - 2 then no need ... page.
            //   - we will build all pages to total pages.
            //   - simplely set endPage = totalPages.
            endPage = endPage >= (totalPages - 2) ? 
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
            if(endPage <= (totalPages - 2)) {

                // build the first page and the last ... page
                thePage = this.buildAPage('...', 'disabled');
                pagination = pagination + thePage;
                // build the last page.
                thePage = this.buildAPage(totalPages);
                pagination = pagination + thePage;
            }

            // decide the next page button.
            if(currentPage !== totalPages) { 
                thePage = this.buildAPage('Next &raquo;');
                pagination = pagination + thePage;
            }

            // add the ending tags.
            pagination = pagination + '</ul></nav>';
            return pagination;
        },

        /**
         * utility method to build a page button on the pagination.
         *
         * the number class could be active, disabled, or nothing
         */
        buildAPage: function(number, numberClass) {

            // set default number class to nothing.
            var numberClass = typeof numberClass !== 'undefined' ?
                              numberClass : '';
            var page = 
                '<li class="' + numberClass + '"><a><span>' +
                number + 
                '</span></a></li>';

            // take off a tag for disabled page.
            if(numberClass == 'disabled') {
                page = 
                    '<li class="' + numberClass + '"><span>' +
                    number + 
                    '</span></li>';
            }

            return page;
        },

        /**
         * handle the pagination.
         */
        handlePagination: function($href, term, currentPage,
                                   totalPages, perPage) {

            var pageText = $href.text();
            var nextPage = 1;
            //console.log('page = ' + pageText);
            if(pageText.includes('First')) {
                // the first page button. do nothing using 
                // the default, start from 1
                nextPage = 1;
            } else if(pageText.includes('Last')) {
                // last page.
                nextPage = totalPages;
            } else if(pageText.includes('Previous')) {
                // previous page.
                nextPage = currentPage - 1;
            } else if(pageText.includes('Next')) {
                // the next page.
                nextPage = currentPage + 1;
            } else {
                // get what user selected.
                nextPage = parseInt(pageText);
            }
            var start = (nextPage - 1) * parseInt(perPage) + 1;

            // calculate start number to build search query.
            var query = 
                this.prepareSearchQuery(term, start);
            this.search(query);
        }
    });

    $.fn[pluginSearchStrap] = function(options) {

        // return to maintain the chain.
        return this.each(function() {
            // check the local storage index for the current
            // element.
            if(!$.data(this, "plugin_" + pluginSearchStrap)) {
                // no plugin created yet, let create a new one.
                $.data(this, "plugin_" + pluginSearchStrap, 
                       new Plugin(this, options));
            }
        });
    };

})(jQuery);
