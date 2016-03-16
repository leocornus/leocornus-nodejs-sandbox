/**
 * a jQuery plugin to display functioning votebox
 */
(function ($) {

    // Plugin name
    var pluginLikeBut = 'likeDislike';
    // default options for the like and dislike buttons.
    var defaults = {

        // server side endpoint.
        serverApi: '/vote',

        // selector for article vote area: div, span, etc.
        // default is 
        articleSelector: '.article-vote',

        // selector for the comments vote area,
        commentsSelector: '[id^="comment"]',

        // cursor for what?
        cursor: 'default',
        
        // default options for like button.
        likeButton: {
            // the tooltip titles for like and dislike buttons
            likeTitle: 'I like this!',
            likedTitle: 'You have already voted',
            // liked url, logged in and voted.
            likedUrl: '/images/approve-done.png',
            // like url logged in but not vote yet.
            likeUrl: '/images/approve.png',
            // like disabled, for none-logged in user.
            likeNa: '/images/approve-na.png',
            likedSmallUrl: '/images/approve-small-done.png',
        },

        // default otpions for dislike buttons.
        dislikeButton: {
            dislikeTitle: 'Alert an editor to inappropriate content!',
            dislikedTitle: 'This post has been flagged for moderation under the terms of the existing policy. A moderator will examine the post shortly.',
            dislikeUrl: '/images/disapprove.png',
            dislikedUrl: '/images/disapprove-marked.png',
            dislikedSmallUrl: '/images/disapprove-small-marked.png',
        },

        ballot_url: '/images/ballot.png',
        comment_vote_count: 12,
        commentId: null,
        vote_count: null,
        userId: null
    };

    // Plugin constructor
    function Plugin(element, options) {

        // the DOM element.
        this.element = element;
        // set the jQuery object.
        this.$element = $(element);
        this.id = element.id;
        // extend mthod will merge object contents.
        this.settings = $.extend({}, defaults, options);
        //this._defatuls = defaults;
        this._name = pluginLikeBut;
        this.init();
    }

    // maintain the the jQuery chain...
    $.fn[pluginLikeBut] = function (options) {
        // return to maintain the chain.
        return this.each(function () {
            // check the local storage index for the current element.
            if (!$.data(this, "plugin_" + pluginLikeBut)) {
                // no plugin created yet, let create a new one.
                $.data(this, "plugin_" + pluginLikeBut, 
                       new Plugin(this, options));
            }
        });
    };

    $.extend(Plugin.prototype, {

        // initialize.
        init: function() {

            var $element = $(this.element);
            var self = this;

            // build like 
            if(this.settings.vote_count !== null){

                this.buildVoteBox();
            }

            // build like dislike for comments.
            this.buildVoteBox4Comments(this.settings.commentSelector);

            // display vote box
            // Condition to check wether the user is logged in or not
            if (self.settings.userId === null) {
                // if user is not logged in
                self.settings.cursor = 'not-allowed';
                $element.css('cursor', self.settings.cursor);
                $("#voteup").attr('src', self.settings.approve_na);
                $("#voteup").attr('title', 'You need to login first');
                $("#votedown").attr('title', 'You need to login first');
            } else {
                // if user is logged in 
                $("#voteup").click(function () {
                    self.handleVote('up', self);
                });
                $("#votedown").click(function () {
                    self.handleVote('down',self);
                    //console.log($('li'+this.settings.comment_selector).find('div[id^="approve"]'));
                });
                $('li'+this.settings.commentSelector).find('img[id^="approve"]').click(function () {
                    self.handleCommentVote('up',this);
                });
                $('li'+this.settings.commentSelector).find('img[id^="disapprove"]').click(function () {
                    self.handleCommentVote('down', this);
                });
            }
        },

        /**
         * utility method to build the vote box.
         */
        buildVoteBox: function () {

            var self = this;

            var voteHtml = 
                '<div class="article-right">' +
                '  <div class="article-votes">' +
                '    <img id="ballot" src="' + 
                self.settings.ballot_url + '" ' + 
                '         class="ballot" alt="ballot box"/>' +
                '    <div class="article-votes-text"' +
                '         id="artical-votes">' +
                '      <label id="count-text" for="male">' + 
                self.settings.vote_count + 
                '      </label>' +
                '    </div>' +
                '  </div>' +
                '  <div class="article-buttons">' +
                // the like button.
                '    <img id="voteup" src="' + 
                self.settings.likeButton.likeUrl + '" ' +
                '         class="approve"' +
                '         title="' + 
                self.settings.likeButton.likeTitle + '" ' +
                '         alt="' + 
                self.settings.likeButton.likeTitle + '" ' +
                '         style="" />' +
                '    <br/>' +
                // the dislike button.
                '    <img id="votedown" src="' + 
                self.settings.dislikeButton.dislikeUrl + '" ' +
                '         class="disapprove" ' +
                '         title="' + 
                self.settings.dislikeButton.dislikeTitle + '" ' +
                '         alt="' + 
                self.settings.dislikeButton.dislikeTitle + '" ' +
                '         style=""/>' +
                '  </div>' +
                '</div>';

            // replace everything in the vote area.
            this.$element.html(voteHtml);
        },

        /**
         * handle vote up and down.
         *
         * @param voteAction could be up or down.
         */
        handleVote: function(voteAction, ele) {

            var self = this;

            if (voteAction === 'up') {
                // update vote attributes.
                $(ele.element).find("img#voteup").attr({
                    'src': self.settings.likeButton.likedUrl,
                    'title': self.settings.likeButton.likedTitle,
                    'style': "pointer"
                });

                // update vode count.
                $(ele.element).find("label#count-text").
                               text(self.settings.vote_count + 1);

            } else if (voteAction === 'down') {
                //console.log(ele.element);
                $(ele.element).find("img#votedown").attr({
                    'src': self.settings.dislikeButton.dislikedUrl,
                    'title': self.settings.dislikeButton.dislikedTitle
                });
            }
        },

        /**
         * build the vote box for comments.
         *
         * @param selector jQuery selector for comments
         */
        buildVoteBox4Comments: function (selector) {

            var self = this;

            var str = ''+$("li"+selector+"").attr("id");
            var trimmed_str = str.split("-");

            //console.log($('li'+selector).find('div[id^="vb-"]'));
            var voteHtml = 
                '<div class="article-right-small" >' +
                '  <div class ="article-votes-small" >' +
                '    <div class ="article-votes-text-small" ' +
                '         id = "article-votes-text-small23735">' +
                '      <a id="comment_votes">' +
                self.settings.comment_vote_count + '</a> vote(s)' +
                '    </div>' +
                '  </div>' +
                '  <div class = "article-buttons-small" >' +
                '    <div id = "" >' +
                '      <img id="approve'+trimmed_str[1]+'" ' + 
                '           src = "/images/approve-small.png" ' +
                '           class = "comment_approve approve" ' +
                '           title = "You must log-in to vote" ' +
                '           alt = "You must log-in to vote" ' +
                '           onclick = "" >' +
                '    </div>' +
                '    <br/>' +
                '    <div>' +
                '      <img id = "disapprove'+trimmed_str[1]+'" ' +
                '           src = "/images/disapprove-small.png" ' +
                '           class = "comment_disapprove " ' +
                '           title = "You must log-in to vote" ' +
                '           alt = "You must log-in to vote" >' +
                '    </div>' +
                '  </div>' +
                '</div>';

            $('li' + selector).find('div[id^="vb-"]').html(voteHtml);
        },

        /**
         * handle comment vote
         */
        handleCommentVote: function (voteAction, ele) {

            var self = this;
            if (voteAction === 'up') {

                $(ele).attr({
                    'src': self.settings.likeButton.likedSmallUrl,
                    'title': self.settings.likeButton.likedTitle,
                    'style': "pointer"
                });

                $($($($(ele).parent()).parent()).parent()).
                    find('#comment_votes').
                    text(self.settings.comment_vote_count + 1);

            } else if (voteAction === 'down') {

                $(ele).attr({
                    'src': self.settings.dislikeButton.dislikedSmallUrl,
                    'title': self.settings.dislikeButton.dislikedTitle
                });
            }
        }
    });
})(jQuery);
