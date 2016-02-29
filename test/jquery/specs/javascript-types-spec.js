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

        /**
         * test the divide
         */
        it('Pagination calculation', function() {

            var total = 13;
            var perPage = 10;
            // ceil will return the smallest integer 
            // greater then or equal to the givan number.
            var totalPages = Math.ceil(total / perPage);
            expect(totalPages).toBe(2);

            // case for the exact page!
            total = 60;
            perPage = 5;
            totalPages = Math.ceil(total/perPage);
            expect(totalPages).toBe(12);

            // case for less than one page.
            total = 8;
            perPage = 10;
            totalPages = Math.ceil(total/perPage);
            expect(totalPages).toBe(1);
        });
    });

});
