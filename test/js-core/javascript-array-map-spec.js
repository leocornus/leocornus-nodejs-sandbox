describe('JavaScript array map testing specs', function() {

    beforeEach(function() {
        // empty for now...
    });

    describe('How to access the new array', function() {

        /**
         * do we allow to access the new array from the 
         * callback function?
         */
        it('access the new array', function() {

            var numbers = [1, 4, 9];
            // map will not change the source array.
            var roots = numbers.map(Math.sqrt);
            expect(roots).toEqual([1, 2, 3]);

            numbers = [[1, 2], [2, 3], [1, 4], [3, 5], [2, 6]];
            var merged = numbers.map(function(current, index, a) {
                // the parameter a is the array numbers.
                expect(a[index]).toEqual(current);
                // return the first value of each item in the source.
                return current[0];
            });
            expect(merged).toEqual([1, 2, 1, 3, 2]);
        });
    });
});
