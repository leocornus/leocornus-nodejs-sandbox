describe('Get WikiPedia Article through APIs', function() {

    beforeEach(function() {

        browser.get('demo/protractor/mw-sdk-get-article.html');
    });

    it('get the main page of wikipedia', function() {

        // find the input field for page title.
        var pageTitle = element(by.id('page-title'));
        pageTitle.sendKeys('Main Page');

        // find the load page button.
        var loadPage = element(by.id('load-page'));
        loadPage.click();

        // need sleep a couple seconds to make sure the 
        // response are back.
        browser.sleep(1000);

        // find some content on the wikipedia main page to verify the 
        // page is loaded properly.
        // find the today's featureed article.
        var tfa = element(by.id('mp-tfa-h2'));
        expect(tfa.getText()).toEqual("From today's featured article");
    });
});
