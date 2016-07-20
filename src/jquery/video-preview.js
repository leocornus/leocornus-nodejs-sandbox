/**
 * a simple jQuery plugin to preview any video in HTML 5 video tag
 *
 *   jQuery('#divid').videoPreview();
 */

;(function($) {

    // plugin name and default values.
    var pluginVideoPreview = "videoPreview";
    // se the default alue.
    var defaults = {
            desc : "Video Preview jQuery plugin"
    };

    // the plugin constructor.
    function Plugin(element, options) {
        // the DOM element.
        this.element = element;
        // extend mthod will merge object contents.
        this.settings = $.extend({}, defaults, options);
        this._defatuls = defaults;
        this._name = pluginVideoPreview;
        this.init();
    }

    // use extend method to avoid Plugin prototype confilcts.
    $.extend(Plugin.prototype, {
        // the initialize function.
        init: function() {
            var self = this;
            var $element = $(this.element);

            // when mouseover, we will show the red back ground.
            $element.on('mouseover.' + pluginVideoPreview, function() {

                var $me = $(this);
                $me.css('background-color', 'red');
            });
        }
    });

    $.fn[pluginVideoPreview] = function(options) {

        // return to maintain the chain.
        return this.each(function() {
            // check the local storage index for the current
            // element.
            if(!$.data(this, "plugin_" + pluginVideoPreview)) {
                // no plugin created yet, let create a new one.
                $.data(this, "plugin_" + pluginVideoPreview, 
                       new Plugin(this, options));
            }
        });
    };

})(jQuery);
