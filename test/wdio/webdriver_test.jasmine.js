describe('gulp-webdriver test simple specs', function () {

    it('should have right options', function() {

        console.log(browser.options);

        expect(browser.options.waitforTimeout).toBe(12345);
        expect(browser.options.coloredLogs).toBe(true);
        expect(browser.options.updateJob).toBe(false);
        expect(browser.options.logLevel).toBe('command');
        expect(browser.options.cucumberOpts.require[0]).
            toBe('nothing');

        return browser;
    });

    it('checks if title contains the search query', function() {
        return browser
            .url('/')
            .getTitle(function(err,title) {
                expect(title).toBe('WebdriverJS Testpage');
            });
    });
});
