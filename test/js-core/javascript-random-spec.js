describe('JavaScript Testing Specs for random', function() {

    // we will use jQuery to manipulate HTML for testing...

    beforeEach(function() {
        // empty for now...
    });

    describe('Basic Math.random tests', function() {

        it('Return number between 0 (included) and 1 (excluded)!', 
           function() {

            var r = Math.random();
            expect(r).toBeGreaterThan(0);
            expect(r).toBeLessThan(1);
        });
    });
});
