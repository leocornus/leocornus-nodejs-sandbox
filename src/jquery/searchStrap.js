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
        itemsPerPage: 10
    };

    // the plugin constructor.
    function Plugin(element, options) {
        // the DOM element.
        this.element = element;
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
            var $element = $(this.element);

            self.search('test');
        },

        // search to get result.
        search: function(searchTerm) {

            var self = this;

            // get ready action data for search endpoint.
            var searchAction = {
                term: searchTerm,
                start: 0,
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

        // handle search result.
        handleSearchResult: function(data) {

            // log the data for debuging...
            console.log(data);

            // TODO: analyze the search result.
            info =  '<p class="text-info">' +
                'About 23,456 results (0.51 seconds)' +
                '</p>';

            // using list group for search result.
            $ul = $('<ul class="list-group"></ul>');
            $.each(data, function(index, item) {
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

            // TODO: build the header info bar
            pagination = '<nav><ul class="pagination">' +
                '  <li><a><span>&laquo;</span></a></li>' +
                '  <li class="active"><a><span>1</span></a></li>' +
                '  <li><a><span>2</span></a></li>' +
                '  <li><a><span>3</span></a></li>' +
                '  <li><a><span>Next &raquo;</span></a></li>' +
                '</ul></nav>';

            $('#search-result').html('').append(info).
                append($ul).append(pagination);
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
