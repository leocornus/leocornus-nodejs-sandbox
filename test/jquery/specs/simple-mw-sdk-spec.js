
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

    it('get main page of wikipedia', function(done) {

        client.getArticle('Main Page', function(error, data) {
            // it will be error
            console.log(error);
            expect(error).not.toBeNull();
            // return data is object.
            //expect(data).toEqual(jasmine.any(Object));
            //expect(data).toEqual('abc');
            // underfined is reserved.
            expect(data).toBe(undefined);
            done();
        });
    });
});
