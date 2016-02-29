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
            var searchQuery = this.prepareSearchQuery(searchTerm, 0);
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
         */
        prepareSearchQuery: function(term, start) {

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
            var query = this.prepareSearchQuery(term, 0);
            this.search(query);
            // build the new url.
            url = '?' + this.settings.queryName + 
                  '=' + encodeURIComponent(term);
            window.history.pushState('', 'testing', url);
        },

        // handle search result.
        handleSearchResult: function(data) {

            // log the data for debuging...
            console.log(data);

            currentQuery = data.currentQuery;
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
            pagination = '<nav><ul class="pagination">' +
                '  <li><a><span>&laquo;</span></a></li>' +
                '  <li class="active"><a><span>1</span></a></li>' +
                '  <li><a><span>2</span></a></li>' +
                '  <li><a><span>3</span></a></li>' +
                '  <li><a><span>Next &raquo;</span></a></li>' +
                '</ul></nav>';

            $('#search-result').html('').append(info).
                append($ul).append(pagination);
        },

        /**
         * using the current query and total to build the 
         * pagination bar.
         */
        buildPagination : function(currentQuery, total) {

            // calculate pages.
            // find the current page
            // border check up (first, last)
            // generate HTML
            // create jQuery object.
            // hook click event for all available pages.
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
