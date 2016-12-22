/**
 * create the jQuery plugin alphabetRain, it will be very simple
 * to use:
 *
 *  jQuery('#div-id').alphabetRain(options);
 */

;(function($) {

    // set the plugin name zoomableCircles.
    var pluginName = 'alphabetRain';
    // set the default options.
    var defaultOptions = {
        gameBoard: {
          id: 'alphabet-rain',
          width: '400px',
          height: '600px'
        },
        gameControl: {
          initialDroppingInterval: '500'
        },
        svg: {
          styles: {
            width: "32px",
            height: "32px",
            top: "0",
            left: "0",
            position: "absolute",
            border: "0px solid purple"
          }, 
          attrs: {
            viewBox: '0 0 200 200'
          }
        },
        circle: {
          attrs: {
            cx: "100",
            cy: "100",
            r: "97",
            fill: "yellow",
            stroke: "navy",
            stroke_width: "6"
          },
          styles: {}
        },
        text: {
          attrs: {
            x: "40",
            y: "160",
            fill: "red",
            font_family: '"Lucida Console", Courier, monospace',
            font_size: "190"
          },
          styles: {}
        }
    };

    /**
     * the constructor for zoomableCircles plugin.
     */
    function Plugin(element, options) {
        // same the DOM element.
        this.element = element;
        // merge the options.
        // the jQuery extend function, the later object will
        // overwrite the former object.
        this.options = $.extend({}, defaultOptions, options);
        // set the plugin name.
        this._name = pluginName;
        // call the initialize function.
        this.init();
    }

    // add the plugin to the jQuery chain.
    $.fn[pluginName] = function(options) {

        // return to maintain the chain.
        return this.each(function() {
            // check the local storage index for the current
            // element.
            var dataKey = "plugin_" + pluginName;
            if(!$.data(this, dataKey)) {
                // no plugin created yet, let create a new one.
                $.data(this, dataKey, 
                       new Plugin(this, options, jsonData));
            } else{
                // replace with new one.
                //$.data(this, "plugin_" + pluginName, 
                //       new Plugin(this, options, jsonData));
                // try reload for the existing plugin.
                var plugin = $.data(this, dataKey);
                plugin.reload(options, jsonData);
            }
        });
    };

    /**
     * extend the prototype for the class method.
     */
    $.extend(Plugin.prototype, {

        /**
         * initialize function
         */
        init: function() {

            var self = this;
            var $element = $(this.element);

            // save this id attribute.
            self.attrId = $element.attr('id');
        },
        
        /**
         * test reload.
         */
        reload: function(options) {

            //console.log(jsonData);
            var self = this;
            // remove the existing one.
            $('#' + self.attrId).empty();

            // need merge the options with default options.
            self.options = $.extend({}, defaultOptions, options);
            self.init();
        }
    });

})(jQuery);
