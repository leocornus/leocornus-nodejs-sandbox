describe('Testing Express', function() {

    beforeEach(function() {

        browser.get('demo/protractor/express-demo.html');
    });

    it('get response from hello page', function() {

        // the click button
        var helloButton = element(by.id('hello-btn'));
        // the place we will show the result.
        var helloDiv =  element(by.id('hello-div'));

        expect(helloDiv.getInnerHtml()).toEqual('none');
        helloButton.click();
        expect(helloDiv.getInnerHtml()).toEqual('<h1>Hello Express World</h1>');
    });
});
