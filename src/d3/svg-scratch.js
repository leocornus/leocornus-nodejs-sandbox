/**
 * simple functions to get started
 */
jQuery(document).ready(function($) {

    $('#drawing').click(function() {

        // remove the existing svg.
        //$('#thesvg').remove(); 
        drawCharacterInCircle('J');
        drawCharacterInCircle('E');
        drawCharacterInCircle('S');
        drawCharacterInCircle('S');
        drawCharacterInCircle('I');
        drawCharacterInCircle('C');
        drawCharacterInCircle('A');

        //var previewdiv = d3.select('#svgpreview');
        //// append the svg.
        //var svg = previewdiv.append("svg");
        //svg.attr('id', 'thesvg');

        //// set the style for this svg.
        //svg.style("width", "32px");
        //svg.style("height", "32px");
        //svg.style("top", "0");
        //svg.style("left", "0");
        //svg.style("position", "relative");
        //svg.style("border", "1px solid purple"); 

        //// once we set up view box, childen element
        //// will be 
        //svg.attr('viewBox', '0 0 200 200');

        //// append the circle.
        //var circle = svg.append('circle');
        //circle.attr("cx", "100");
        //circle.attr("cy", "100");
        //circle.attr("r", "97");
        //circle.attr("fill", "yellow");
        //circle.attr("stroke", "navy");
        //circle.attr("stroke-width", "6");

        //// append the text.
        //var text = svg.append('text');
        //text.attr('x', '40');
        //text.attr('y', '160');
        //text.attr('font-size', '190');
        //text.attr('fill', 'red');
        //text.text('A');
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
    // show the default otpions here
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
        strokeWidth: "6"
      },
      text: {
        x: "40",
        y: "160",
        fill: "red",
        fontSize: "190"
      }
    };
    var options = defaultOps;

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
    var circle = svg.append('circle');
    circle.attr("cx", options.circle.cx);
    circle.attr("cy", options.circle.cy);
    circle.attr("r", options.circle.r);
    circle.attr("fill", options.circle.fill);
    circle.attr("stroke", options.circle.stroke);
    circle.attr("stroke-width", options.circle.strokeWidth);

    // append the text.
    var text = svg.append('text');
    text.attr('x', options.text.x);
    text.attr('y', options.text.y);
    text.attr('font-size', options.text.fontSize);
    text.attr('fill', options.text.fill);
    text.text(character);
}
