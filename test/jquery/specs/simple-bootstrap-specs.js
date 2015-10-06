describe('Testing Bootstrap Basic', function() {

    var $container;

    beforeEach(function() {

        // load the HTML fixture.
        jasmine.getFixtures().fixturesPath = 
            'base/test/jquery/fixtures';
        loadFixtures('simple-boot.html');
        // load the container.
        $container = $('.container');
    });

    it('testing find method', function() {
        // find by id
        var id = $container.find('.nav .active').attr('id');
        expect(id).toBe('home');
    });

    it('testing data-toggle', function() {
        // find id to click.
        var $about = $container.find('.nav #about');
        var $home = $container.find('.nav #home');
        var $aboutHref = $container.find('.nav #about-a');
        expect($home.hasClass('active')).toBe(true);
        expect($about.hasClass('active')).toBe(false);
        // trigger the click event on href link.
        $aboutHref.click();
        expect($home.hasClass('active')).toBe(false);
        expect($about.hasClass('active')).toBe(true);
    });
});
