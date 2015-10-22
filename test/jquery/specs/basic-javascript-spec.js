describe('Basic JavaScript Testing Spec', function() {

    // we will use jQuery to manipulate HTML for testing...

    beforeEach(function() {
        // empty for now...
    });

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

    it('Testing the functions shift and unshift', function() {

        /**
         * the shift and unshift are prototype functions for
         * array.
         * undefined will be return for an empty array.
         */
        var testArray = ['a', 'b', 'c', 'd']
        expect(testArray.length).toBe(4);
        // shift will remove the first value of an array
        // remove the value from array consecutively.
        var shifted = testArray.shift();
        expect(shifted).toBe('a')
        expect(testArray.length).toBe(3);
    });
});
