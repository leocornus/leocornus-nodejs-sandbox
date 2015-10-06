describe('Testing Bootstrap Form', function() {

    beforeEach(function() {

        // load the HTML fixture.
        jasmine.getFixtures().fixturesPath = 
            'base/test/jquery/fixtures';
        loadFixtures('bootstrap-form.html');
    });

    it('testing query and search', function() {
        var $input = $('input#inputName');
        expect($input.attr('id')).toBe('inputName');
        // find the form-group
        var $group = $input.parents('.form-group');
        expect($group.attr('id')).toBe('nameGroup');
        // find the help-block
        var $block = $group.find('.help-block');
        expect($block.attr('id')).toBe('nameBlock');
        // find the form-control-feedback this will control the 
        // feedback: changle color nad adding icon.
        var $feedback = $group.find('.form-control-feedback');
        expect($feedback.attr('id')).toBe('nameFeedback');
    });
});
