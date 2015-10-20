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
});
