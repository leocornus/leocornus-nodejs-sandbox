/**
 * simple functions to get started
 */
jQuery(document).ready(function($) {

    $('#drawing').click(function() {

        // remove the existing svg.
        $('#thesvg').remove(); 

        var previewdiv = d3.select('#svgpreview');
        // append the svg.
        var svg = previewdiv.append("svg");
        svg.attr('id', 'thesvg');

        // set the style for this svg.
        svg.style("width", "32px");
        svg.style("height", "32px");
        svg.style("top", "0");
        svg.style("left", "0");
        svg.style("position", "relative");
        svg.style("border", "1px solid purple"); 

        // once we set up view box, childen element
        // will be 
        svg.attr('viewBox', '0 0 200 200');

        // append the circle.
        var circle = svg.append('circle');
        circle.attr("cx", "100");
        circle.attr("cy", "100");
        circle.attr("r", "97");
        circle.attr("fill", "yellow");
        circle.attr("stroke", "navy");
        circle.attr("stroke-width", "6");

        // append the text.
        var text = svg.append('text');
        text.attr('x', '40');
        text.attr('y', '160');
        text.attr('font-size', '190');
        text.attr('y', '160');
        text.attr('fill', 'red');
        text.text('A');
    });
});
