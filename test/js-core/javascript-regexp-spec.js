describe('JavaScript RegExp Prototype Testing Specs', function() {

    // we will use jQuery to manipulate HTML for testing...

    beforeEach(function() {
        // empty for now...
    });

    describe('testing regexp exec functions', function() {

        it('using exec to extract string from the source', function() {

            var source = "http://www.media.gov.on.ca/player/5.1.818/player.swf?config=http://www.media.gov.on.ca/5ff96c18fba293a0/fr/config.xml";
            var pattern = /config=(http.*config\.xml)/;
            var result = pattern.exec(source);
            expect(result.length).toBe(2);
            expect(result[1]).toMatch('http://www.media.gov.on.ca/5ff96c18fba293a0/fr/config.xml');
        });

        it('extract the beginning of a URI path', function() {

            // set the pattern.
            //var pattern = /^\/([a-z0-9]*|wp\-admin)\//;
            var pattern = /^\/([a-z0-9\-]*)\//;

            // the case one.
            var source = "/wp-admin/themes.php";
            var result = pattern.exec(source);

            expect(result != null).toBe(true);
            expect(result.length).toBe(2);
            expect(result[1]).toMatch('wp-admin');

            source = "/wiki/Web_accessibility_guide";
            result = pattern.exec(source);
            expect(result != null).toBe(true);
            expect(result[1]).toMatch('wiki');

            source ="/?s=abc";
            result = pattern.exec(source);
            expect(result).toBe(null);
            expect(result === null).toBe(true);

            source ="";
            result = pattern.exec(source);
            expect(result).toBe(null);
            expect(result === null).toBe(true);

            source = "/revenue/job-tools/";
            result = pattern.exec(source);
            expect(result != null).toBe(true);
            expect(result.length).toBe(2);
            expect(result[1]).toMatch('revenue');

            source = "/fin/wp-admin/post-new.php?post_type=issue";
            result = pattern.exec(source);
            expect(result != null).toBe(true);
            expect(result.length).toBe(2);
            expect(result[1]).toMatch('fin');
        });

        it('extract the content of a table column', function() {

            // set the pattern
            var pattern = /<td class=\"pageviews\">([0-9]*)<\/td>/;

            var source = 
                '<td>title</td><td class="pageviews">1234</td>';
            var result = pattern.exec(source);

            // verify...
            expect(result != null).toBe(true);
            expect(result.length).toBe(2);
            expect(result[1]).toMatch('1234');
            expect(parseInt(result[1])).toBe(1234);
        });

        it('extract fields from solr logging message', function() {

            var source = "2018-06-19 13:07:21.394 INFO  (qtp1929600551-13009) [c:polaris s:shard1 r:core_node4 x:polaris_shard1_replica_n2] o.a.s.c.S.Request [polaris_shard1_replica_n2]  webapp=/solr path=/suggest params={suggest.q=C22&suggest=true&suggest.dictionary=CSASuggester&wt=json} status=0 QTime=0"

            var pattern = /\((.*)\)/;
            var matches = source.match(pattern);
            expect(matches[0]).toMatch('(qtp1929600551-13009)');
            expect(matches[1]).toMatch('qtp1929600551-13009');

            // greedy match.
            matches = source.match(/suggest\.q=(.*)&/);
            expect(matches[0]).toMatch('suggest.q=C22&suggest=true&suggest.dictionary=CSASuggester&');
            expect(matches[1]).toMatch('C22&suggest=true&suggest.dictionary=CSASuggester');

            // non-greedy match.
            // Adding a ? on a quantifier (?, * or +) makes it non-greedy
            matches = source.match(/suggest\.q=(.*?)&/);
            expect(matches[0]).toMatch('suggest.q=C22&');
            expect(matches[1]).toMatch('C22');
        });
    });
});
