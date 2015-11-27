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

    it('get response from echo page', function() {

        // the click button
        var echoBtn= element(by.id('echo-btn'));
        // the place we will show the result.
        var echoDiv =  element(by.id('echo-div'));

        expect(echoDiv.getInnerHtml()).toEqual('none');
        echoBtn.click();
        expect(echoDiv.getInnerHtml()).toEqual('{"a":"abc","b":"bcdef"}');
    });

    it('explore the wikipedia api through nodemw', function() {

        var apiDiv = element(by.id('api-div'));
        expect(apiDiv.getInnerHtml()).toEqual('none');

        var apiBtn = element(by.id('api-btn'));
        // set title on the page
        var apiInput = element(by.id('api-title'));
        // using sendkey.
        apiInput.sendKeys('Blank pad rule');
        apiBtn.click().then(function() {
            // need pause wait respone from remote server.
            // sleep in ms unit.
            browser.sleep(2000);
            var title = element(by.id('toctitle'));
            expect(title.getText()).toEqual('Contents');
            var caption = element(by.css('.thumbcaption'));
            expect(caption.getText()).toContain('blank pad rule');
        });
    });
});
