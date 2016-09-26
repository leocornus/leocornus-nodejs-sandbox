/**
 * simple functions to get started
 */
jQuery(document).ready(function($) {

    var defaultOps = {
      svg: {
        width: "32px",
        height: "32px",
        top: "0",
        left: "0",
        position: "relative",
        border: "1px solid purple"
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
    var svg = previewdiv.append("svg");
    svg.attr('id', 'thesvg');

    // set the style for this svg.
    svg.style("width", options.svg.width);
    svg.style("height", options.svg.height);
    svg.style("top", options.svg.top);
    svg.style("left", options.svg.left);
    svg.style("position", options.svg.position);
    svg.style("border", options.svg.border); 

    // once we set up view box, childen element
    // will be 
    svg.attr('viewBox', '0 0 200 200');

    // append the circle.
    drawSvgElement(svg, 'circle', 
                   {'attrs':options.circle,
                    'styles':{}});
    //var circle = svg.append('circle');
    //circle.attr("cx", options.circle.cx);
    //circle.attr("cy", options.circle.cy);
    //circle.attr("r", options.circle.r);
    //circle.attr("fill", options.circle.fill);
    //circle.attr("stroke", options.circle.stroke);
    //circle.attr("stroke-width", options.circle.strokeWidth);

    // append the text.
    var text = drawSvgElement(svg, 'text', 
                              {'attrs':options.text,
                               'styles':{}});
    //var text = svg.append('text');
    //text.attr('x', options.text.x);
    //text.attr('y', options.text.y);
    //text.attr('font-size', options.text.fontSize);
    //text.attr('fill', options.text.fill);
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
