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
            console.log(data);

            var currentQuery = data.currentQuery;
            var total = data.total;
            // TODO: analyze the search result.
            // var info = this->buildInfoBar(data);
            info =  '<p class="text-info">' +
                'Found ' + data.total + ' results (0.51 seconds) ' +
                'for <span class="label-info">' + 
                currentQuery.term + '</span>' +
                '</p>';

            // using list group for search result.
            $ul = $('<ul class="list-group"></ul>');
            $.each(data.searchResult, function(index, item) {
                // present each item as a list group item.
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
                $ul.append(liHtml);
            });

            // TODO: using current query to build the pagination bar
            var pagination = 
                this.buildPagination(currentQuery, total);

            $('#search-result').html('').append(info).
                append($ul).append(pagination);

            // create jQuery object.
            // hook click event for all available pages.
            $('#search-result').find('nav ul li[class!="active"] a').
                on('click', function(event) {

                // identify the page.
                var pageText = $(this).text();
                var searchTerm = currentQuery.term;
                var perPage = currentQuery.perPage;
                self.handlePagination($(this), pageText, 
                                      searchTerm, perPage);
            });
        },

        /**
         * using the current query and total to build the 
         * pagination bar.
         */
        buildPagination : function(currentQuery, total) {

            // collect current query states:
            // start item index is from 1
            var start = currentQuery.start;
            var perPage = currentQuery.perPage;

            // based on start, total, and perPage
            // find the current page, (start - 1) / perPage + 1
            var currentPage = (start - 1) / perPage + 1;

            // total pages: page number starts from 1
            var totalPages = Math.ceil(total / perPage);

            // border check up (first, last)
            // previous button will be handled by first page.
            // next button will be hanelded by last page.
            var pagination = '<nav><ul class="pagination">';

            // decide the previous page.
            if(currentPage !== 1) {
                pagination = pagination + 
                    '<li><a><span>&laquo; Previous</span></a></li>';
            }

            // generate the page list.
            for(var page = 1; page <= totalPages; page ++) {

                // normal page.
                var thePage =
                    '<li><a><span>' + page + '</span></a></li>';
                if(page == currentPage) {
                    thePage = 
                      '<li class="active"><a><span>' + 
                      page +
                      '</span></a></li>';
                }
                pagination = pagination + thePage;
            }

            // decide the next page.
            if(currentPage !== totalPages) { 
                pagination = pagination +
                    '<li><a><span>Next &raquo;</span></a></li>';
            }

            // add the ending tags.
            pagination = pagination + '</ul></nav>';
            return pagination;
        },

        /**
         * handle the pagination.
         */
        handlePagination: function($href, pageText, term, perPage) {

            //console.log('page = ' + pageText);
            start = (parseInt(pageText) - 1) * parseInt(perPage) + 1;
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
