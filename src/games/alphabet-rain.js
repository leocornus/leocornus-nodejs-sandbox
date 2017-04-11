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
'    <button id="play">' +
'      <span class="glyphicon glyphicon-play" aria-hidden="true"></span> Play</button>' +
'    <button id="pause">' +
'      <span class="glyphicon glyphicon-pause" aria-hidden="true"></span> Pause</button>' +
'  </div>' +
'</div>';

            $('#' + self.attrId).html(panel); 

            // hook the play event.
            $('#play').click(function() {
                // start the game.
                self.startGame();
            });

            $('#pause').click(function() {
                // start the game.
                self.pauseGame();
            });

            // hook the keydown event.
            $('body').keydown(function(event) {

                // 
                self.handleKeydown(event);
            });
        },

        /**
         * here is how we start the game.
         */
        startGame: function() {

            var self = this;

            // we will use the JavaScript timer to track the game.
            // To make sure there is only one game running as one
            // time.
            self.gameId = self.gameId > 0 ? self.gameId :
                 window.setInterval(
                  // define function here, so we could use the 
                  // plugin object (self) and it methods.
                  function() {
                      self.droppingRain();
                  },
                  self.options.gameControl.initialDroppingInterval);
        },

        /**
         * pause game, mainly stop rain dropping...
         */
        pauseGame: function() {

            var self = this;
            window.clearInterval(self.gameId);
            // reset game id.
            self.gameId = 0;
        },

        /**
         * keydown will kill those rain drops.
         */
        handleKeydown: function(event) {

            var self = this;

            var theKey = event.key.toUpperCase();
            var selector = "svg[id^='" + self.attrId +
                           "-letter-" + theKey + "-']";
            // here is how we check 
            // if the selector has matched elements
            if($(selector).length > 0) {
                // kill the first one only.
                $(selector)[0].remove();
                // kill all matches.
                //$(selector).each(function(index) {
                //    // remove it to kill
                //    $(this).remove();
                //});
            }
        },

        /**
         * function to start dropping alphabet rain.
         */
        droppingRain: function() {

            var self = this;
            //console.log(self);

            // get the game board height.
            var boardHeight = 
                $('#' + self.options.gameBoard.id).innerHeight();

            // get all svg with match id patterns:
            $("svg[id^='" + self.attrId + "-letter-']")
                .each(function(index) {
                // the object this will be the DOM element.
                var $svg = $(this);
                // get the position in the game board.
                var currentTop = parseInt($svg.css('top'));
                // the dropping space for each dropping.
                var pace = $svg.height();

                // caculate the new top position.
                var newTop = currentTop + pace / 2;
                if (newTop + pace >= boardHeight) {
                    // it will drop out of game board, remove it.
                    $svg.remove();
                } else {
                    // move to the new position.
                    $svg.css({"top": newTop + "px"});
                }
            });

            // draw a letter after moving rain drops.
            specs = self.setRandomLeft();
            self.drawCharacterInCircle(self.getRandomChar());
        },

        /**
         * randomly return a char code.
         * About ASCII characters:
         *  - 32 - 127 will cover the whole keyboard.
         *  - 48 - 57 are number keys, 0 - 9
         *  - 65 - 90 are upercase letters A - Z
         *  - 97 - 122 are lowercase letters a - z
         */
        getRandomChar: function() {
        
            // 65 to 90 for now.
            var min = Math.ceil(35);
            var max = Math.floor(91);
            var code = Math.floor(Math.random() * (max - min)) + 65;
            return String.fromCharCode(code);
        },

        /**
         * calculate the position for new character.
         *
         * the left offset will control the position of 
         * the rain drop, whih is a svg.
         * We will always have to top offset starts from 0.
         * As result of using relative position for all rain drops.
         */
        setRandomLeft: function() {

            var self = this;

            // find the inner width of the game board.
            var $gameBoard = $('#' + self.options.gameBoard.id);
            var innerWidth = $gameBoard.innerWidth();
            var charWidth = parseInt(self.options.svg.styles.width);
            var max = innerWidth - charWidth;
            var left = Math.floor(Math.random() * max);

            // set the new left.
            self.options.svg.styles.left = left;
        },

        /**
         * try to builde the svg with 
         * a circle and text inside the circle.
         * here are the HTML code.
         *   <svg>
         *     <circle></circle>
         *     <text></text>
         *   </svg>
         */
        drawCharacterInCircle: function(character) {

            var self = this;

            var gameBoard =
                d3.select('#' + self.options.gameBoard.id);

            //console.log(options.svg.styles.width);
            // append the svg.
            var svg = self.drawSvgElement(gameBoard, 'svg',
                                          self.options.svg);
            // to make id unique, we will have this format.
            // this will keep the same with droppingRain
            // and keydown event handler.
            //   slef.attrId-letter-[x]-[style.left]
            var theId = self.attrId + '-letter-' + character + '-' +
                        self.options.svg.styles.left;
            svg.attr('id', theId);

            // append the circle.
            self.drawSvgElement(svg, 'circle', self.options.circle);
            // append the text.
            var text = 
                self.drawSvgElement(svg, 'text', self.options.text);
            text.text(character);
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
