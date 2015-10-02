describe("simple jquery plugin test", function() {

    beforeEach(function() {
        // load HTML fixtures.
        jasmine.getFixtures().fixturesPath = 
            'base/test/jquery/fixtures';
        loadFixtures('simple.html');

        // load the plugin.
        var $el = $('#divid');
        $el.sandbox().data('sandbox');
    });

    it('testing plugin click event', function() {

        var $el = $('.divclass');
        expect($el.html()).toBe('div inner html');
        // jquery to trigger click event.
        $el.click();
        expect($el.html()).toBe('clicked');
    });
});
