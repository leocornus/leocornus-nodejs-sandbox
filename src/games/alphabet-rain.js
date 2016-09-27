/**
 * simple functions to get started
 */
jQuery(document).ready(function($) {

    var defaultOps = {
      gameBoard: {
        id: 'alphabet-rain',
        width: '400px',
        height: '600px'
      },
      svg: {
        styles: {
          width: "32px",
          height: "32px",
          top: "0",
          left: "0",
          position: "relative",
          border: "1px solid purple"
        }, 
        attrs: {
          viewBox: '0 0 200 200'
        }
      },
      circle: {
        cx: "100",
        cy: "100",
        r: "97",
        fill: "yellow",
        stroke: "navy",
        stroke_width: "6"
      },
      text: {
        x: "40",
        y: "160",
        fill: "red",
        font_family: '"Lucida Console", Courier, monospace',
        font_size: "190"
      }
    };
    // load the JSON editor
    var container = document.getElementById('jsoneditor');
    var editor = new JSONEditor(container, {});
    editor.set(defaultOps);

    // calculate the game board:
    var gameBoard = d3.select('#svgpreview');
    var $gameBoard = $('#svgpreview');
    console.log($gameBoard.offset());

    // draw the game board.
    $('#drawGameBoard').click(function() {

        var previewdiv = d3.select('#svgpreview');
        var specs = editor.get();
        // do we need remove the existing one?
        $('#' + specs.gameBoard.id).remove();
        drawSvgElement(previewdiv, 'svg', 
                       {'attrs': specs.gameBoard,
                        'styles': {}});
    });

    $('#drawing').click(function() {

        // remove the existing svg.
        //$('#thesvg').remove(); 
        // loop the char code.
        for(var i = 65; i <= 90; i ++) {
            drawCharacterInCircle(String.fromCharCode(i),
                                  editor.get());
        }
    });
});

/**
 * build the game board.
 */
function drawGameBoard() {

    // draw the game board...
    var preview = d3.select('#svgpreview');
    var gameBoard = preview.append("svg");
    // set id.
    gameBoard.attr('id', 'alphabet-rain');
}

/**
 * try to builde the svg with a circle and text inside the circle.
 * here are the HTML code.
 *   <svg>
 *     <circle></circle>
 *     <text></text>
 *   </svg>
 */
function drawCharacterInCircle(character, options) {

    var previewdiv = d3.select('#svgpreview');
    // append the svg.
    var svg = drawSvgElement(previewdiv, 'svg', options.svg);
    //var svg = previewdiv.append("svg");
    svg.attr('id', 'thesvg');

    // append the circle.
    drawSvgElement(svg, 'circle', 
                   {'attrs':options.circle,
                    'styles':{}});
    // append the text.
    var text = drawSvgElement(svg, 'text', 
                              {'attrs':options.text,
                               'styles':{}});
    text.text(character);
}

/**
 * draw a svg element.
 */
function drawSvgElement(dist, elementName, options) {

    var element = dist.append(elementName);
    for(var attr in options.attrs) {
        element.attr(attr.replace(/_/g, '-'), options.attrs[attr]);
    }
    for(var style in options.styles) {
        element.style(style, options.styles[style]);
    }

    return element;
}
