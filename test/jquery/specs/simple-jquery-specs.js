describe('first jquery plugin', function() {

    var simpleDiv = '<div id="simple">Some thing</div>';
    var $element, element;

    beforeEach(function() {
        //$ = window.jQuery();
        $element = $(simpleDiv);
        element = $element[0];
    });

    it("simple jquery object", function() {

        expect($element.html()).toBe("Some thing");
        // attr method to get the elemet attribute.
        expect($element.attr('id')).toBe('simple');
    });

    it("simple DOM element", function() {

        expect(element.innerHTML).toBe("Some thing");
        expect(element.id).toBe('simple');
    });
});
