describe('Testing jQuery Selectors', function() {

    var testHTML = 
      '<div>' +
      '  <div id="name"><i>John Resig</i></div>' + 
      '  <div id="name"><i>George Martin</i></div>' +
      '  <div id="name"><i>Malcom John Sinclair</i></div>' +
      '  <div id="name"><i>J. Ohn</i></div>' +
      '</div>';

    var $element;

    beforeEach(function() {

        $element = $(testHTML);
    });

    it("simple contains() selector", function() {

        var johns = $element.find('div[id=name]:contains("John")');
        expect(johns.length).toBe(2);
        // case sensitive or not?
        johns = $element.find('div[id=name]:contains("john")');
        // Yes, it is case sensitive!
        expect(johns.length).toBe(0);
    });

});
