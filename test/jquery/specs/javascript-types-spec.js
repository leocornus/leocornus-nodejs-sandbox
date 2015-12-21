describe('Testing JavaScript types', function() {

    // we will use jQuery to manipulate HTML for testing...

    beforeEach(function() {
        // empty for now...
    });

    describe('Testing JavaScript numbers', function() {

        /**
         * parseInt is used to parse a string to an integer.
         */
        it('string, integer and parseInt', function() {

            var aString = '123';
            expect(aString).toBe('123');
            expect(aString).not.toBe(123);

            var theNumber = parseInt(aString);
            expect(theNumber).toBe(123);
            expect(theNumber).not.toBe('123');
        });
    });

});
