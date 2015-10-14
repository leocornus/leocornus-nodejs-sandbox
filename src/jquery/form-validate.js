// a simple jQuery plugin to do some form valication work...

;(function($) {
    "use strict";

    // plugin name.
    var pluginValidator = "simpleValidator";
    // default options.
    var defaultOptions = {
    };

    // create the constructor.
    function Plugin(element, options) {
        // the DOM element object.
        this.element = element;
        // the jQuery object.
        this.$element = $(element);
        // merget the default settings.
        this.settings = $.extend({}, defaultOptions, options);
        // same the default options and name.
        this._defaults = defaultOptions;
        this._name = pluginValidator;
        // calling the init method.
        this.init();
    }

    // create the prototype for the plugin.
    $.extend(Plugin.prototype, {

        // init method.
        init: function() {
            // set self to keep the original this.
            var self = this;

            // hook on some events here:
            self.$element.on('click.' + pluginValidator, 
                             'input[id="inputName"]',
                             function() {
                this.innerHTML = 'clicked';
            });
        },

        verifyName: function() {
        }
    });

    // add the plugin to jQuery function chains.
    $.fn[pluginValidator] = function(options) {
        // return 
        return this.each(function() {
            // check the local storage index for the current
            // element.
            if(!$.data(this, "plugin_" + pluginValidator)) {
                // no plugin created yet, let create a new one.
                $.data(this, "plugin_" + pluginValidator, 
                       new Plugin(this, options));
            }
        });
    };

})(jQuery);
