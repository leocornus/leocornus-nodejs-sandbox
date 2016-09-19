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

    describe('Testing the split function', function() {

        it('Split by regular express', function() {
            // split works for both string and regex separator
            var source = 'testing, again, split';
            // we could use the regular expression as the separator.
            var result = source.split(/,\s*/);
            // result is a type of array, array is a type of object.
            expect(typeof result).toBe('object');
            expect(result.length).toBe(3);
            expect(result[0]).toBe('testing');
        });

        it('split source by new line \\n', function() {

            // get ready a String with new line in it.
            var source = 'testing a string with \n in the middle' +
                '\nadd one more line';
            // we are using the regular string as the separator.
            var result = source.split('\n');
            expect(typeof result).toBe('object');
            expect(result.length).toBe(3);
            expect(result[0]).toBe('testing a string with ');
            expect(result[2]).toBe('add one more line');
        });
    });

    describe('Testing the fromCharCode function', function() {

        it('char code for alphabet letters', function() {

            var letters = [];
            // loop the char code.
            for(var i = 65; i <= 90; i ++) {
                letters.push(String.fromCharCode(i));
            }
            // verify now.
            expect(letters[0]).toBe('A');
            expect(letters[1]).toBe('B');
        });
    });
});
