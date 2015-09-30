global.jQuery = require('jquery');
require('tipso');
require('jquery.cookie');

;(function($) {

    "use strict";

    // plugin name and default values.
    var pluginSandbox = "sandbox",
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
        this._name = pluginSandbox;
        this.init();
    }

    // use extend method to avoid Plugin prototype confilcts.
    $.extend(Plugin.prototype, {
        // the initialize function.
        init: function() {
            // using self to keep the original this.
            var self = this,
                $element = $(this.element);

            console.log("desc: " + this.settings.desc);
            console.log("id: " + this.element.id);

            // hook the ready event.
            $element.on('mouseover', function() {
                // this will become the specific element been clicked.
                self.showMsg('mouseover: ' + this.innerHTML);
            });

            $element.on('click', function() {
                // this will become the specific element been clicked.
                self.showMsg(this.innerHTML);
            });
        },

        // show the value of desc property.
        showMsg: function(msg) {
            alert(msg);
        }
    });

    $.fn[pluginSandbox] = function(options) {

        // return to maintain the chain.
        return this.each(function() {
            // try to hook the click event in the plugin.
            var $element = $(this);
            $element.click(function() {
                var $testClick = $(this);
                alert(this.id);
            });

            if(!$.data(this, "plugin_" + pluginSandbox)) {
                $.data(this, "plugin_" + pluginSandbox, 
                       new Plugin(this, options));
            }
        });
    };

})(jQuery);

jQuery(function(){
  jQuery('.title-tipso').tipso();
  jQuery('.sandbox').sandbox();
});
