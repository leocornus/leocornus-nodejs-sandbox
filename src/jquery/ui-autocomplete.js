/**
 * a jQuery plugin to make every input field and 
 * text area can use ui-autocomplet widget.
 */

;(function($) {
    var pluginLiveSearch = 'liveSearch';
    var defaults = {
        // the url endpoint for search.
        searchUrl : '/search',
        minLength : 2
    };

    // the plugin constructor.
    function Plugin(element, options) {
        // the DOM element.
        this.element = element;
        // extend mthod will merge object contents.
        this.settings = $.extend({}, defaults, options);
        this._defatuls = defaults;
        this._name = pluginLiveSearch;
        this.init();
    }

    $.fn[pluginLiveSearch] = function(options) {

        // return to maintain the chain.
        return this.each(function() {
            // check the local storage index for the current
            // element.
            if(!$.data(this, "plugin_" + pluginLiveSearch)) {
                // no plugin created yet, let create a new one.
                $.data(this, "plugin_" + pluginLiveSearch, 
                       new Plugin(this, options));
            }
        });
    };

    // prototye for the plugin.
    $.extend(Plugin.prototype, {

        // initialize.
        init: function() {
            var self = this;
            var $element = $(this.element);

            // get ready the data object for autocomplete.
            var searchData = {
                source: function(request, response) {
                    $.ajax({
                      url: self.settings.searchUrl,
                      dataType: 'json',
                      data: {
                          term: request.term
                      },
                      success: function(data) {
                          response(data);
                      }
                    });
                }, 

                minLength: self.settings.minLength,

                select: function(event, ui) {
                    alert(ui.item.uri);
                },

            };

            $element.autocomplete(searchData)
                    .data("ui-autocomplete")
                    ._renderItem = function($ul, item) {

                        console.log(item);

                        var $li = $("<li>");
                        // set the data-value
                        $li.attr("data-value", item.title);
                        var itemHtml = item.title +
                            '<br/>' +
                            item.uri;
                        $li.append(itemHtml);
                        // append to ul
                        $ul.append($li);

                        return $li;
                    };
        },
    });

})(jQuery);
