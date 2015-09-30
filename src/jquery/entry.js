global.jQuery = require('jquery');
require('tipso');
require('jquery.cookie');

;(function($) {

    "use strict";

    // plugin name and default values.
    var pluginName = "sandbox",
        defaults = {
            id : "1234",
            desc : "sandbox plugin"
        };

    // the plugin constructor.
    function Plugin(element, options) {
        this.element = element;
        // extend mthod will merge object contents.
        this.settings = $.extend({}, defaults, options);
        this._defatuls = defaults;
        this._name = pluginName;
        this.init();
    }

    // use extend method to avoid Plugin prototype confilcts.
    $.extend(Plugin.prototype, {
        // the initialize function.
        init: function() {
            console.log("desc: " + this.settings.desc);
            console.log("id: " + this.element.id);
        },

        // show the value of desc property.
        showMsg: function(msg) {
            alert(msg);
        }
    });

    $.fn[pluginName] = function(options) {

        // return to maintain the chain.
        return this.each(function() {
            // try to hook the click event in the plugin.
            var $element = $(this);
            $element.click(function() {
                var $testClick = $(this);
                alert(this.id);
            });

            if(!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, 
                       new Plugin(this, options));
            }
        });
    };

})(jQuery);

jQuery(function(){
  jQuery('.title-tipso').tipso();
  jQuery('.sandbox').sandbox();
});
