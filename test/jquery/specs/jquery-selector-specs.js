describe('Testing jQuery Selectors', function() {

    var testHTML = 
      '<div>' +
      '  <div id="name"><i>John Resig</i></div>' + 
      '  <div id="name"><i>George Martin</i></div>' +
      '  <div id="name"><i>Malcom John Sinclair</i></div>' +
      '  <div id="name"><i>J. Ohn</i></div>' +
      '  <span id="name"><i>J. Ohnote</i></span>' +
      // add some attribute.
      '  <div id="new" attr="test">abc</div>' +
      '  <div id="new">def</div>' +
      '</div>';

    var $element;

    beforeEach(function() {

        $element = $(testHTML);
    });

    it('id selector', function() {

       var names = $element.find('#name');
       expect(names.length).toBe(5);
       // the another way to select id=name.
       names = $element.find('[id=name]');
       expect(names.length).toBe(5);

       // element tag with id.
       names = $element.find('div#name');
       expect(names.length).toBe(4);
       names = $element.find('div[id=name]');
       expect(names.length).toBe(4);
    });

    it("simple contains() selector", function() {

        var johns = $element.find('div[id=name]:contains("John")');
        expect(johns.length).toBe(2);
        // case sensitive or not?
        johns = $element.find('div[id=name]:contains("john")');
        // Yes, it is case sensitive!
        expect(johns.length).toBe(0);
    });

    it("simple not() selector", function() {

        var divs = $element.find('div[id=new]').
                   not('[attr=test]');
        expect(divs.length).toBe(1);
    });

});
