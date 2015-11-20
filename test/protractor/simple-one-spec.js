describe('Simple HTML Page', function() {

    beforeEach(function() {
        // load the home page.
        // relative to the baseUrl in protractor.conf.js.
        browser.get('demo/protractor/simple-one.html');
    });

    it('has correct page title', function() {

        expect(browser.getTitle()).toEqual('Testing Page');
    });

    it('has page header class', function() {
        var header = element(by.css('.page-header'));
        expect(header.getInnerHtml()).toEqual('<h1>Hello Web Server</h1>');
        expect(header.getText()).toEqual('Hello Web Server');
    });
});
