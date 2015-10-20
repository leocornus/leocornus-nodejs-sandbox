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
});
