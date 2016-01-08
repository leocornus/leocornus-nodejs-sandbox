describe('Using webdriver io to desting ui demo page', function () {

    it('checks if title is correct!', function(done) {

        browser
            .url('http://localhost:8900/demo/jquery/ui-demo.html')
            // pause to make sure the page is loaded.
            .pause(3000)
            .getTitle(function(err,title) {
                expect(title).toBe('Demo jQuery UI');
            })
            .call(done);
    });

    it('load the autocomplete live search', function(done) {

        browser.url('http://localhost:8900/demo/jquery/ui-demo.html')
            .pause(3000).then(function() {
                console.log('loading page');
            })
            // verify title.
            .getTitle(function(err, title) {
                expect(title).toBe('Demo jQuery UI');
            })
            .setValue('input#query', 'livesearch')
            // pause to wait...
            .pause(3000)
            // get text from the autocomplete
            .getText('ul.ui-autocomplete').then(function(err, text) {

                console.log(text);
                expect(text).not.toBe('');
            })
            .getHTML('ul.ui-autocomplete').then(function(err, html) {

                console.log(html);
            })
            .call(done);
    });
});
