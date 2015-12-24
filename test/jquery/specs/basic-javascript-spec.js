describe('Basic JavaScript Testing Spec', function() {

    // we will use jQuery to manipulate HTML for testing...

    beforeEach(function() {
        // empty for now...
    });

    describe('testing the string prototype functions', function() {

        /**
         * we will test functions for string object in java script,
         * including:
         *
         * - match
         * - replace
         * - split
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

        it('Testing the match function', function() {

            // match is prototype function for string.
            // get ready some testing string
            var source = 'some testing string for test purpose' +
                ' something again';
            var result = source.match(/om/g);
            // we should find 2 match.
            expect(result.length).toBe(2);
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

    describe('Testing array prototype functions', function() {

        /**
         * The popular array prototype functions including:
         *  - push
         *  - pop
         *  - shift
         *  - unshift
         */

        // define the testing array here, so it will be available
        // for all functions specs.
        var testArray;

        // get ready some array for testing.
        beforeEach(function() {

            testArray = ['a', 'b', 'c', 'd'];
        });

        it('Testing the functions shift and unshift', function() {

            /**
             * the shift and unshift are prototype functions for
             * array.
             * undefined will be return for an empty array.
             */

            // we have 4 items in the testArray which is set up in
            // the beforeEach funtion.
            expect(testArray.length).toBe(4);
            // shift will remove the first value of an array
            // remove the value from array consecutively.
            var shifted = testArray.shift();
            expect(shifted).toBe('a');
            expect(testArray.length).toBe(3);

            // now we unshift the same array.
            var newSize = testArray.unshift('a');
            // unshift wil return the length of unshifted array.
            expect(newSize).toBe(4);
            expect(testArray.length).toBe(4);
        });

        it('Testing the function slice for array', function() {

            // slice sill include begin number and 
            // exclude end number.
            var extractArray = testArray.slice(0, 2);
            expect(extractArray.length).toBe(2);
            expect(extractArray[0]).toBe('a');
            // extract from 1,
            extractArray = testArray.slice(1, 2);
            expect(extractArray.length).toBe(1);
            expect(extractArray[0]).toBe('b');
        });
    });
});
