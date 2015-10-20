describe('Testing wm-sdk basic', function() {

    var client;

    beforeEach(function() {

        // the karma runner will load all necessary javascript
        // library.
        client = new MediaWikiClient();
    });

    it('simple method call', function() {

        expect(client.getApiUrl()).
            toBe('//en.wikipedia.org/w/api.php');
    });
});
