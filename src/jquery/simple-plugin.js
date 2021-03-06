/**
 * try to create a simplest jQuery plugin.
 * it will be used like this:
 *
 *   jQuery('#idone').simple();
 */

;(function($) {

    // plugin name and default values.
    var pluginSimple = "simple";
    // se the default alue.
    var defaults = {
            desc : "simple jQuery plugin"
        };

    // the plugin constructor.
    function Plugin(element, options) {
        // the DOM element.
        this.element = element;
        // extend mthod will merge object contents.
        this.settings = $.extend({}, defaults, options);
        this._defatuls = defaults;
        this._name = pluginSimple;
        this.init();
    }

    // use extend method to avoid Plugin prototype confilcts.
    $.extend(Plugin.prototype, {
        // the initialize function.
        init: function() {
            var self = this;
            var $element = $(this.element);

            // when mouseover, we will show the red back ground.
            $element.on('mouseover.' + pluginSimple, function() {

                var $me = $(this);
                $me.css('background-color', 'red');
            });
        }
    });

    $.fn[pluginSimple] = function(options) {

        // return to maintain the chain.
        return this.each(function() {
            // check the local storage index for the current
            // element.
            if(!$.data(this, "plugin_" + pluginSimple)) {
                // no plugin created yet, let create a new one.
                $.data(this, "plugin_" + pluginSimple, 
                       new Plugin(this, options));
            }
        });
    };

})(jQuery);
