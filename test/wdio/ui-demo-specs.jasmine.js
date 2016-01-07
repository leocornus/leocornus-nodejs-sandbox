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
});
