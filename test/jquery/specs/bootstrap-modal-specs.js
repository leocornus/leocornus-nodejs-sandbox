describe('Testing Bootstrap Modal', function() {

    var $button, $modal;

    beforeEach(function() {

        // load the HTML fixture.
        jasmine.getFixtures().fixturesPath = 
            'base/test/jquery/fixtures';
        loadFixtures('bootstrap-modal.html');
        // load the container.
        $button = $('#demoButton');
        $modal = $('#myModal');
    });

    it('testing show and hide modal', function() {
        // verify the modal is not visible.
        // the class "in" table the modal dialog show or not.
        expect($modal.hasClass('in')).toBe(false);
        // trigger the click event for the button.
        $button.click();
        // the the dialog should appear.
        expect($modal.hasClass('in')).toBe(true);
        // find the close button.
        var $closeButton = $("button#closeButton");
        // click the close button.
        $closeButton.click();
        // 'in' class will be removed from modal.
        // modal dialog will be invisible.
        expect($modal.hasClass('in')).toBe(false);
    });
});
