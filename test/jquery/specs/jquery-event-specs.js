describe('Testing jQuery event handler and trigger', function() {

    var testHtml = '<div id="simple" class="sandbox">' +
      'Some thing' +
      '  <a href="#" id="test-btn">Click me</a>' +
      '  <div id="result-div">nothing</div>' +
      '</div>';

    var testElement, $testElement;

    beforeEach(function() {
        $testElement = jQuery(testHtml);
        // The DOM element.
        testElement = $testElement[0];

        // set the on click event handler.
        $testElement.find('#test-btn').on('click', function() {
            $testElement.find('#result-div').html('click success');
        });
    });

    it("should trigger the click event.", function() {

        var $testBtn = $testElement.find('#test-btn');
        var $resultDiv = $testElement.find('#result-div');

        // verify the html before the click event.
        expect($resultDiv.html()).toBe("nothing");
        // trigger the click event.
        $testBtn.trigger("click");
        // verify the html after the clck event.
        expect($resultDiv.html()).toBe("click success");
    });
});
