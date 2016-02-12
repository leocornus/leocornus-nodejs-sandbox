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
                end: self.settings.itemsPerPage
            };

            $.ajax({
                url: self.settings.searchUrl,
                dataType: 'json',
                data: searchAction,
                success: function(data) {
                    self.handleSearchResult(data);
                }
            });
        },

        // handle search result.
        handleSearchResult(data) {

            // log the data for debuging...
            console.log(data);
            $ul = $('<ul class="list-group"></ul>');
            $.each(data, function(index, item) {

                var liHtml = 
                    '<li class="list-group-item">' +
                    '  <h4>' +
                    '    <a href="' + item.url + 
                                '" style="padding: 0;">' +
                           item.title +
                    '    </a>' +
                    '  </h4>' +
                    '  <small class="text-muted">SITE</small>' +
                    '  <p>' +
                         item.description +
                    '  </p>' +
                    '</li>';
                $ul.append(liHtml);
            });

            $('#search-result').html('').append($ul);
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
