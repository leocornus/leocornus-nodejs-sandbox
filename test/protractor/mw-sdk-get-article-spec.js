describe('Get WikiPedia Article through APIs', function() {

    // we will use this element for each spec.
    var pageTitle;
    var loadPage;

    beforeEach(function() {

        browser.get('demo/protractor/mw-sdk-get-article.html');
    
        // find the input field for page title.
        pageTitle = element(by.id('page-title'));
        // find the load page button.
        loadPage = element(by.id('load-page'));
    });

    it('get the main page of wikipedia', function() {

        pageTitle.sendKeys('Main Page');
        loadPage.click();

        // need sleep a couple seconds to make sure the 
        // response are back.
        browser.sleep(1000);

        // find some content on the wikipedia main page to verify the 
        // page is loaded properly.
        // find the today's featureed article.
        var tfa = element(by.id('mp-tfa-h2'));
        expect(tfa.getText()).
            toEqual("From today's featured article");
    });

    it('get a wiki page with affix nav panel', function() {

        // load the page Blank pad rule.
        pageTitle.sendKeys('Blank pad rule');
    });
});
