describe('JavaScript RegExp Prototype Testing Specs', function() {

    // we will use jQuery to manipulate HTML for testing...

    beforeEach(function() {
        // empty for now...
    });

    describe('testing regexp exec functions', function() {

        it('using exec to extract string from the source', function() {

            var source = "http://www.media.gov.on.ca/player/5.1.818/player.swf?config=http://www.media.gov.on.ca/5ff96c18fba293a0/fr/config.xml";
            var pattern = /config=(http.*config.xml)/;
            var result = pattern.exec(source);
            expect(result.length).toBe(2);
            expect(result[1]).toMatch('http://www.media.gov.on.ca/5ff96c18fba293a0/fr/config.xml');
        });
    });
});
