describe('gulp-webdriver test simple specs', function () {

    it('should have right options', function() {

        console.log(browser.options);

        expect(browser.options.waitforTimeout).toBe(12345);
        expect(browser.options.coloredLogs).toBe(true);
        expect(browser.options.updateJob).toBe(false);
        expect(browser.options.logLevel).toBe('silent');
        expect(browser.options.cucumberOpts.require[0]).
            toBe('nothing');

        // have to return here.
        return browser;
    });

    it('checks if title contains the search query', function(done) {

        browser
            .url('/')
            // pause to make sure the page is loaded.
            .pause(3000)
            .getTitle(function(err,title) {
                expect(title).toBe('WebdriverJS Testpage');
            })
            .call(done);
    });
});
