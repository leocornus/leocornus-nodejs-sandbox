describe('Testing jquery from HTML fixture', function() {

    beforeEach(function() {
    
        // set the path to HTML fixtures.
        // this should be the relative path to project root folder.
        // we adding base because we are using karma test runner,
        // and karma server serve all files under /base directory.
        jasmine.getFixtures().fixturesPath = 
            'base/test/jquery/fixtures';
        // try to load the fixtures
        loadFixtures('simple.html');
    });

    it('testing jquery selector', function() {
        // select by id.
        var $element = $("#divid");
        expect($element.attr('id')).toBe('divid');
        expect($element.hasClass('divclass')).toBe(true);
    });

    it('testing jquery functions', function() {

        var $element = $('#divid');
        expect($element.hasClass('newclass')).toBe(false);
        $element.addClass('newclass');
        expect($element.hasClass('newclass')).toBe(true);
    });
});
