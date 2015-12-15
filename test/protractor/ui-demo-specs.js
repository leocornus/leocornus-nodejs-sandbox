describe('test auto complete demo page', function() {

    // the query input fields.
    var query;

    beforeEach(function() {

        // load the demo page.
        browser.get('demo/jquery/ui-demo.html');
        // fin the query input field.
        query = element(by.id('query'));
    });

    it('should pop up suggestions', function() {

        query.sendKeys('a');
        // nothing should happen, as we set the min length to 2.
        browser.sleep(1000);

        // verify the ui-autocomplete class is empty.
        var autocomplete = element(by.className('ui-autocomplete'));
        expect(autocomplete.getText()).toBe('');

        // send more keys now.
        query.sendKeys('abc');
        browser.sleep(1000);
        autocomplete = element(by.className('ui-autocomplete'));
        expect(autocomplete.getText()).not.toBe('');
    });
});
