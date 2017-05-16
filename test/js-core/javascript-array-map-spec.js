describe('JavaScript array map testing specs', function() {

    // we will use jQuery to manipulate HTML for testing...

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
            var roots = numbers.map(Math.sqrt);
            expect(roots).toEqual([1, 2, 3]);

            numbers = [[1, 2], [2, 3], [1, 4], [3, 5], [2, 6]];
            var merged = numbers.map(function(current, index, a) {
                return current[0];
            });
            expect(merged).toEqual([1, 2, 1, 3, 2]);
        });
    });
});
