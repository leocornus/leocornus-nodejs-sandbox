describe('JavaScript String Prototype Testing Specs', function() {

    // we will use jQuery to manipulate HTML for testing...

    beforeEach(function() {
        // empty for now...
    });

    describe('testing search and replace functions', function() {

        /**
         * we will test functions for string object in java script,
         * including:
         *
         * - match
         * - replace
         */

        it('Testing the replace function', function() {

            var colors = 'Colors list, red, Blue, organge, red';
            var result = colors.replace('red', 'purple');
            // verify things...
            expect(colors).toMatch('red');
            expect(colors).not.toMatch('purple');
            // only one red is replaced.
            expect(result).toMatch('red');
            expect(result).toMatch('purple');
        });

        it('Testing the replace all funtion', function() {

            var colors = 'Colors list, red, Blue, organge, red';
            // using regular express to replace all.
            var result = colors.replace(/red/g, 'purple');
            // verify things...
            expect(colors).toMatch('red');
            expect(colors).not.toMatch('purple');
            // no more red.
            expect(result).not.toMatch('red');
            expect(result).toMatch('purple');

            // we could use the RegExp class to build the match
            // pattern.
            var fromString = 'red';
            var fromPattern = new RegExp(fromString, 'g');
            // we should have the save result.
            result = colors.replace(fromPattern, 'purple');
            expect(result).not.toMatch('red');
            expect(result).toMatch('purple');
        });

        it('Testing the match function', function() {

            // match is prototype function for string.
            // get ready some testing string
            var source = 'some testing string for test purpose' +
                ' something again';
            var result = source.match(/om/g);
            // we should find 2 match.
            expect(result.length).toBe(2);
        });

    });

    it('Testing the split function', function() {

        // split works for both string and regex separator
        var source = 'tesing, again, split';
        var result = source.split(/,\s*/);
        // result is a type of array, array is a type of object.
        expect(typeof result).toBe('object');
        expect(result.length).toBe(3);
    });
});
