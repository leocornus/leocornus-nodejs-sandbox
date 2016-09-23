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

    describe('Testing JavaScript JSON format', function() {

        /**
         * try to define an array by using JSON format.
         */
        it('define a simple array', function() {

            // simple array with strings.
            var aArray = ['a', 'b'];
            // Array in JavaScript is an object type.
            expect(typeof aArray).toBe('object');
            // the function isArray will check the given object 
            // is an array or not!
            expect(Array.isArray(aArray)).toBe(true);

            // JavasScript array allow mix data type for each item
            aArray = ['a', 'b', 1, 3, {a: '123'}];
            // this array has string as its first value.
            expect(typeof aArray[0]).toBe('string');
            expect(typeof aArray[2]).toBe('number');
            expect(typeof aArray[4]).toBe('object');
        });

        /**
         * try to define an object by using JSON format.
         */
        it('define a simple object', function() {

            // simple object.
            var anObject = {
              a: 'abc',
              b: 123,
              // the ending item should NOT have separator.
              c: 'cde'
            };

            // type should be an object.
            expect(typeof anObject).toBe('object');
            // inspect the values.
            expect(anObject.a).toBe('abc');
            expect(anObject.b).toBe(123);
            // get keys of the object.
            expect(Object.keys(anObject)).toEqual(['a', 'b', 'c']);
        });
    });
});
