var assert = require('chai').assert;
var bot = require('nodemw');

describe('Basic nodemw Spec', function() {

    var client;

    // async testing...
    beforeEach(function() {
        var config = {
            server: 'en.wikipedia.org',
            // debug: true,
            path: '/w'
        };
        client = new bot(config);
    });

    it('test api.call callback function', function(done) {
        //assert.isObject(this.response);
        var action = {
            action: 'query',
            meta: 'siteinfo',
            siprop: 'namespaces'
        };
        var self = this;
        client.api.call(action, function(e, info, next, data) {
            // info is the processed query result.
            assert.isObject(info);
            assert.isObject(data);
            assert.equal(data.query, info);
            // only return namespaces.
            assert.equal(Object.keys(info).length, 1, '== one key');
            //// check the length of namespaces.
            var namespaces = info.namespaces;
            assert.equal(Object.keys(namespaces).length, 35);
            done();
        });
    });
});
