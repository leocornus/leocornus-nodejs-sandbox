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

        /**
         * test modulus operator for numbers.
         */
        it('modulus opterator for numbers', function() {

            var x = 5;
            var a = 4;
            var b = 0;
            var y = 2;
            expect(x % y).toBe(1);
            expect(a % y).toBe(0);
            expect(b % y).toBe(0);
        });
    });

});
