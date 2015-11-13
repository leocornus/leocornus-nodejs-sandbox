describe('Simple HTML Page', function() {

    beforeEach(function() {
        // load the home page.
        // relative to the baseUrl in protractor.conf.js.
        browser.get('demo/protractor/simple-one.html');
    });

    it('has correct page title', function() {

        expect(browser.getTitle()).toEqual('Testing Page');
    });
});
                  
