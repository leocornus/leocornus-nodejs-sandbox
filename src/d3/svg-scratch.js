/**
 * simple functions to get started
 */
jQuery(document).ready(function($) {
    $('#drawing').click(function() {

        var previewdiv = d3.select('#svgpreview');
        // append the svg.
        var svg = previewdiv.append("svg");
        svg.attr('viewBox', '0 0 200 200');
        // set the style.
        svg.style("width", "16px");
        svg.style("height", "16px");
        svg.style("top", "0");
        svg.style("left", "50px");
        svg.style("position", "absolute");
        svg.style("border", "1px solid black");
        var circle = svg.append('circle');
        circle.attr("cx", "100");
        circle.attr("cy", "100");
        circle.attr("r", "97");
        circle.attr("fill", "red");
        circle.attr("stroke", "navy");
        circle.attr("stroke-width", "6");
    });
});
