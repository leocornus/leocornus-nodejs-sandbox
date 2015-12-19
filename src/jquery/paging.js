/**
 * a simple plugin to do pagination work for a list groun in a panel.
 *
 *   jQuery('#id-of-parent-panel').simple();
 */

;(function($) {

    // plugin name and default values.
    var pluginListGroupPaging = "listGroupPaging";
    // se the default alue.
    var defaults = {
            desc : "pagination for list group",
            perPage : 15
        };

    // the plugin constructor.
    function Plugin(element, options) {
        // the DOM element.
        this.element = element;
        this.$element = $(element);
        this.$listGroup = this.$element.find('.list-group');
        // extend mthod will merge object contents.
        this.settings = $.extend({}, defaults, options);
        this._defatuls = defaults;
        this._name = pluginListGroupPaging;
        this.init();
    }

    // use extend method to avoid Plugin prototype confilcts.
    $.extend(Plugin.prototype, {

        // the initialize function.
        init: function() {

            var self = this;
            var $element = $(this.element);
            //console.log(this.$listGroup);
            this.$items = this.$listGroup.find('.list-group-item');
            //console.log(this.$items);
            this.total = this.$items.length;

            // tracking pages.
            this.start = 0;
            this.updatePageSummary();
            this.showItems(this.start + 1, this.start + this.settings.perPage);

            // previous and next page. 
   
        },

        showItems: function(start, end) {

            // only show the first page.
            this.$items.attr('style', 'display: none');
            for(i = start - 1; i < end - 1; i++) {
                $(this.$items[i]).attr('style', '');
            }
        },

        updatePageSummary: function() {
        
            this.$element.find('.pull-right #start').html(this.start + 1);
            var end = this.settings.perPage + this.start;
            this.$element.find('.pull-right #end').html(end);
            this.$element.find('.pull-right #total').html(this.total);
        }
    });

    $.fn[pluginListGroupPaging] = function(options) {

        // return to maintain the chain.
        return this.each(function() {
            // check the local storage index for the current
            // element.
            if(!$.data(this, "plugin_" + pluginListGroupPaging)) {
                // no plugin created yet, let create a new one.
                $.data(this, "plugin_" + pluginListGroupPaging, 
                       new Plugin(this, options));
            }
        });
    };

})(jQuery);
