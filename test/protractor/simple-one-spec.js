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

    describe('simple JavaScript test', function() {

        it('click button to change sum', function() {

            var plusButton = element(by.id('plus'));
            var sumDiv = element(by.id('sum'));

            expect(sumDiv.getInnerHtml()).toEqual('nothing');
            plusButton.click();
            expect(sumDiv.getInnerHtml()).toEqual('Hello Click!');
        });
    });
});
