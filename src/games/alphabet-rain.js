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
          id: 'gameboard',
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
            "stroke-width": "6"
          },
          styles: {}
        },
        text: {
          attrs: {
            x: "40",
            y: "160",
            fill: "red",
            "font-family": '"Lucida Console", Courier, monospace',
            "font-size": "190"
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
                       new Plugin(this, options));
            } else{
                // replace with new one.
                //$.data(this, "plugin_" + pluginName, 
                //       new Plugin(this, options, jsonData));
                // try reload for the existing plugin.
                var plugin = $.data(this, dataKey);
                plugin.reload(options);
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
            $element.text("I am comming....");
            // get started from drawing the game board.
            self.drawGameBoard();
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
        },

        /**
         * Draw the game board.
         * 
         * we will use the bootstrap panel as the default 
         * game board.
         *
         * TODO: allow user to build the game board through
         * the option gameBoardBuilder.
         */
        drawGameBoard: function() {

            var self = this;

            // set width on panel and set height on panedl body.
            // we need the size of the game board to be fixed.
            var panel = 
'<div class="panel panel-success"' +
'     style="width:500px;">' +
'  <div class="panel-heading">' +
'    The Game' +
'  </div>' +
// this panel-body div will be the game board.
// We have to set position here, so the child svg
// element could use absolute postion.
'  <div class="panel-body" id="' + self.options.gameBoard.id + '"' +
'       style="height: 500px; nowidth:500px;' +
'              border: 0px black solid;' +
'              position: relative;' +
'              padding: 0px"' +
'  >' +
'  </div>' +
'  <div class="panel-footer">' +
'    <button id="play">Play</button>' +
'  </div>' +
'</div>';

            $('#' + self.attrId).html(panel); 

            // hook the play event.
            $('#play').click(function() {

                // start the game.
                //Self.startGame();
            });
        },

        /**
         * draw a svg element for the given d3 element.
         * dist, the d3 element.
         * elementName, the tag name of the element.
         */
        drawSvgElement: function(dist, elementName, options) {

            var element = dist.append(elementName);
            for(var attr in options.attrs) {
                element.attr(attr, options.attrs[attr]);
            }
            for(var style in options.styles) {
                element.style(style, options.styles[style]);
            }
        
            return element;
        }
    });

})(jQuery);
