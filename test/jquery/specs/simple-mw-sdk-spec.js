describe('Testing wm-sdk basic', function() {

    var client;

    beforeEach(function() {

        client = new MediaWikiClient();
    });

    it('simple method call', function() {

        expect(client.getApiUrl()).toBe('//en.wikipedia.org/w/api.php');
    });
});
