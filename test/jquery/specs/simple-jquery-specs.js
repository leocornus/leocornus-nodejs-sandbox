describe('Testing jQuery Basic', function() {

    var simpleDiv = '<div id="simple" class="sandbox">Some thing</div>';
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
        expect($element.attr('class')).toBe('sandbox');
    });

    it("simple DOM element", function() {

        expect(element.innerHTML).toBe("Some thing");
        expect(element.id).toBe('simple');
    });

    it("some jQuery method", function() {
        expect($element.hasClass('sandbox')).toBe(true);
    });
});
