describe('test like dislike demo page', function () {

    /**
     * End to end test cases for like and dislike demo page.
     */

    beforeEach(function () {

        // load the demo page.
        browser.get('demo/jquery/like-dislike-demo.html');

        // set elements for post vote box and comment vote box
        post_vote_box = element(by.className('article-votes'));
        comment_vote_box = element(by.className('vb'));
    });

    it('should load the Vote Box for the post', function () {

        expect(comment_vote_box.getInnerHtml()).not.toBe('');
        // pause 1 second
        browser.sleep(1000);
    });

    it('should load the Vote Box for the comments', function () {

        expect(comment_vote_box.getInnerHtml()).not.toBe('');
        browser.sleep(1000);
    });

    it('should load images for the post vote box', function () {

        var arr = ['ballot', 'voteup', 'votedown'];
        for (i = 0; i < 3; i++) {
            post_vote_box = element(by.id(arr[i]));
            expect(post_vote_box.getAttribute('src')).not.toBe('');
        }

        browser.sleep(1000);
    });

    it('should load images for the comment vote box', function () {

        expect(element(by.css('.comment_approve')).
               getAttribute('src')).not.toBe('');
        expect(element(by.css('.comment_disapprove')).
               getAttribute('src')).not.toBe('');

        browser.sleep(1000);
    });

    /**
     * Test the like button.
     */
    it('should change voteup divs image and increase vote by 1 ' +
       'on click for the post vote box', function () {

        post_vote_box = element(by.id('voteup'));
        post_votes = element(by.id('count-text'));
        post_votes.getText().then(function (old_vote) {

            post_vote_box.click();
            post_votes.getText().then(function(new_vote) {
                expect(parseInt(new_vote)).
                    toEqual(parseInt(old_vote) + 1);
                expect(post_vote_box.getAttribute("src")).
                    toContain('approve-done.png');
            });
        }); 

        browser.sleep(2000);
    });

    /**
     * test the like button on comment.
     */
    it('should change voteup divs image and increase vote by 1 ' +
       'on click for the comment vote box', function () {

        comment_vote_box = element(by.css('.comment_approve'));
        comment_votes = element(by.id('comment_votes'));
        comment_votes.getText().then(function (old_vote) {

            comment_vote_box.click();
            comment_votes.getText().then(function(new_vote) {
                expect(parseInt(new_vote)).
                    toEqual(parseInt(old_vote) + 1);
                expect(comment_vote_box.getAttribute("src")).
                    toContain('approve-small-done.png');
            });
        });

        browser.sleep(2000);
    });

    /**
     * test the dislike button on article
     */
    it('should change votedown divs image on click for ' +
       'the post vote box', function () {

        post_vote_box = element(by.id('votedown'));
        post_vote_box.click();
        expect(post_vote_box.getAttribute("src")).
            toContain('disapprove-marked.png');

        browser.sleep(2000);
    });

    /**
     * test the dislike button on comment.
     */
    it('should change votedown divs image on click for ' +
       'the comment vote box', function () {

        comment_vote_box = element(by.css('.comment_disapprove'));
        comment_vote_box.click();
        expect(comment_vote_box.getAttribute("src")).
            toContain('disapprove-small-marked.png');

        browser.sleep(2000);
    });
});
