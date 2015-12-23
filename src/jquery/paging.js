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
            perPage : 8 
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
            this.initPageSummary();
            this.showItems();

            // previous and next page. 
            this.$element.find('.pull-right .btn-group .btn').
                on('click', function() {
                // the previous or next button.
                self.turnPage(this.id);
            });
        },

        turnPage: function(direction) {

            var start = this.getStartFrom();
            var newStart = start;
            switch(direction) {
            case 'next':
                newStart = start + this.settings.perPage;
                // enable the previous button.
                this.toggleButton('previous', true);
                break;
            case 'previous':
                newStart = start - this.settings.perPage;
                // enable the next button.
                this.toggleButton('next', true);
                if(newStart == 1) {
                    // disable previous.
                    this.toggleButton('previous', false);
                }
                break;
            }

            var end = newStart + this.settings.perPage - 1;
            if (end >= this.total) {
                // total items is less than a page.
                // using the total as end at.
                end = this.total;
                // disable next button.
                this.toggleButton('next', false);
            }

            // caculate the current page.
            // turn page,
            // update summary
            this.$element.find('.pull-right #start').html(newStart);
            this.$element.find('.pull-right #end').html(end);
            // enable or disable buttons.
            // show items.
            this.showItems();
        },

        showItems: function() {

            var start = this.getStartFrom();
            var end = this.getEndAt();

            // only show the first page.
            this.$items.attr('style', 'display: none');
            for(i = start - 1; i < end; i++) {
                $(this.$items[i]).attr('style', '');
            }
        },

        /**
         *  the start from number
         */
        getStartFrom: function() {

            if(this.total < 1) {
                // not item in the list group.
                return 0;
            }
            var selector = '.pull-right #start';
            var start = this.$element.find(selector).html();
            return parseInt(start);
        },

        getEndAt: function() {

            var selector = '.pull-right #end';
            var end = this.$element.find(selector).html();
            return parseInt(end);
        },

        /**
         * initialize page summary.
         */
        initPageSummary: function() {

            // disable the previous botton.
            this.toggleButton('previous', false);

            // calculate numbers.
            var start = this.getStartFrom();
            // set end number to per page number.
            var end = this.settings.perPage;
            if (end >= this.total) {
                // total items is less than a page.
                // using the total as end at.
                end = this.total;
                // disable next button.
                this.toggleButton('next', false);
            }

            this.$element.find('.pull-right #start').html(end);
            this.$element.find('.pull-right #end').html(end);
            this.$element.find('.pull-right #total').html(this.total);
        },

        /**
         * toggle buttons enable or disable.
         */
        toggleButton(what, enable) {

            var selector = '';
            switch(what) {
            case 'next':
                // find the next button.
                selector = '.pull-right .btn-group .btn[id=next]';
                break;
            case 'previous':
                // find the previous button.
                selector = '.pull-right .btn-group .btn[id=previous]';
                break;
            case 'both':
                // find bothe previous and next button.
                selector = '.pull-right .btn-group .btn';
                break;
            }

            if(enable) {
                this.$element.find(selector).removeClass('disabled');
            } else {
                this.$element.find(selector).addClass('disabled');
            }
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
