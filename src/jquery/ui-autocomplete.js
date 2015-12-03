/**
 * a jQuery plugin to make every input field and 
 * text area can use ui-autocomplet widget.
 */

;(function($) {
    var pluginLiveSearch = 'liveSearch';
    var defaults = {
        // the url endpoint for search.
        searchUrl : '/search',
        miniLength : 2
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
                    $.getJSON(self.settings.searchUrl, 
                              request, response);
                }, 

                miniLength: self.settings.miniLength,

                select: function(event, ui) {
                    alert(ui.item.uri);
                },
            };

            $element.autocomplete(searchData);
                    //.data("ui-autocomplete")
                    //._
        }
    });

})(jQuery);
