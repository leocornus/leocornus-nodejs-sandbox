describe('test livesearch demo page', function () {

    // the query input fields.
    var query;

    beforeEach(function () {

        // load the demo page.
        browser.get('demo/jquery/livesearch-demo.html');
        // find the query input field.
        query = element(by.id('query-right'));
    });

    it('should load the demo page', function () {

        /**
         * verify the placeholder value to make sure page are loaded.
         */
        expect(query.getAttribute('placeholder')).
                toEqual('Search All Blogs');
        browser.sleep(1000);
    });

    describe('testing minlength', function () {

        it('should NOT pop up suggestions for 1 char', function() {

            query.sendKeys('a');
            // nothing should happen, as we set the min length to 2.
            browser.sleep(2000);

            // verify the ui-autocomplete class is empty.
            var autocomplete = 
                element(by.className('ui-autocomplete'));
            expect(autocomplete.getText()).toBe('');
        });

        it('should pop up suggestions for 3 chars', function () {

            // send more keys now.
            query.sendKeys('abc');
            browser.sleep(2000);

            var autocomplete = 
                element(by.className('ui-autocomplete'));
            expect(autocomplete.getText()).not.toBe('');
        });
    });

    describe('testing the suggestions styles', function () {

        it('url present at .media-list > .media-body > ' + 
           '.media-heading > a', function() {

            query.sendKeys('abc');
            browser.sleep(2000);

            var href = element(by.css('.media-list')).
                element(by.css('.media-body .media-heading')).
                element(by.tagName('a'));
            var str = ".com";
            expect(href.getAttribute("href")).toContain(str);
        });

        it('Checking stacked icons', function () {

            query.sendKeys('abc');
            browser.sleep(2000);
            var sumDiv = element(by.className('media-left'));
            var str = '<span class="text-warning fa-stack fa-lg">';
            expect(sumDiv.getInnerHtml()).toContain(str);
            str = '<i class="fa fa-circle fa-stack-2x">';
            expect(sumDiv.getInnerHtml()).toContain(str);
        });

        it('Checking Title', function () {

            query.sendKeys('abc');
            browser.sleep(2000);
            var sumDiv = element(by.css('.media-heading'));
            expect(sumDiv.getInnerHtml()).not.toBe('');
        });

        it('Checking Description', function () {

            query.sendKeys('abc');
            browser.sleep(2000);
            var sumDiv = element(by.css('.media-description'));
            expect(sumDiv.getInnerHtml()).not.toBe('');
        });
    });
});
