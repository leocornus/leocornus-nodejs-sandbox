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

    it("jQuery method addClass, removeClass, hasClass", function() {

        expect($element.hasClass('sandbox')).toBe(true);
        expect($element.hasClass('test')).toBe(false);
        // now we will add and remove class.
        expect($element.addClass('test').hasClass('test')).toBe(true);
        // add class can handle more than one class name, 
        // using whitespace between class names.
        $element.addClass('test-one test-two');
        expect($element.hasClass('test-two')).toBe(true);
        // remove class has the same syntax.
        $element.removeClass('test sandbox');
        expect($element.hasClass('test')).toBe(false);
        expect($element.hasClass('sandbox')).toBe(false);
        expect($element.hasClass('test-one')).toBe(true);
    });

    it('jQuery method replaceAll, replaceWith', function() {

        // append some html for testing.
        var someP = '<p class="blue-one under">Hello</p>' +
                '<p class="blue-two under highlight">and</p>' + 
                '<p class="blue-3 under"><strong>then</strong></p>' +
                '<p class="blue-4 under">Goodbye</p>';
        // parse the html.
        var $p = $element.append(someP);
        // find one of them to verify.
        expect($p.find('.blue-3').html()).
            toBe('<strong>then</strong>');
        // check the difference between html and text.
        expect($p.find('.blue-3').text()).toBe('then');
        
        // what happen for multiple matches?
        expect($p.find('.under').text()).toBe('HelloandthenGoodbye');
        expect($p.find('.under').html()).
            toBe('Hello');
        // length and method size() are the same.
        expect($p.find('.under').length).toBe(4);
        expect($p.find('.under').size()).toBe(4);

        // try the each callback to do something.
        $p.find('.under').each(function(index) {
            // "this" is a DOM element.
            // add the class for each element.
            $(this).addClass('under-' + index);
        });
        expect($p.find('.under-1').length).toBe(1);
        expect($p.find('.div-1').length).toBe(0);

        // replace
        $p.find('.under-1').
            replaceWith('<div class="div-1">Hello</div>');
        // nw we could not find the under-1 class.
        expect($p.find('.under-1').length).toBe(0);
        // but we can find the div-1 class.
        expect($p.find('.div-1').length).toBe(1);
    });

    it('jQuery has 2 each function', function() {

        // each array function.
        // get ready an array.
        var data = ['some', 23, 'again'];
        jQuery.each(data, function(index, value) {
            if(index == 0) {
                expect(value).toBe('some');
            } 
            if(index == 1) {
                expect(value).toBe(23);
            }
            if(index == 2) {
                expect(value).toBe('again');
            }
        });
    });
});
