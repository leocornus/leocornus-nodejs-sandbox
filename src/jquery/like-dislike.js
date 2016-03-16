/**
 * a jQuery plugin to display functioning votebox
 */
(function ($) {

    // Plugin name
    var pluginVoteMod = 'voteModeration';
    //var $element = $(this.element);
    // default icons and titles for vote box
    var icn = {
        cursor: 'default',
        approve_title: 'I like this!',
        disapprove_title: 'Alert an editor to inappropriate content!',
        ballot_url: '/images/ballot.png',
        disapproved_title: 'This post has been flagged for moderation under the terms of the existing policy. A moderator will examine the post shortly.',
        approved_url: '/images/approve-done.png',
        approve_url: '/images/approve.png',
        disapprove_url: '/images/disapprove.png',
        disapproved_url: '/images/disapprove-marked.png',
        approved_title: 'You have already voted',
        approve_na: '/images/approve-na.png',
        approved_small_url: '/images/approve-small-done.png',
        disapproved_small_url: '/images/disapprove-small-marked.png',
        comment_vote_count: 12,
        commentId: null,
        vote_count: null,
        userId: null

    };

    // Plugin constructor
    function Plugin(element, options) {
        // the DOM element.
        this.element = element;
        this.id = element.id;
        // extend mthod will merge object contents.
        this.settings = $.extend({}, icn, options);
        //this._defatuls = defaults;
        this._name = pluginVoteMod;
        this.init();
    }

    $.fn[pluginVoteMod] = function (options) {
        // return to maintain the chain.
        return this.each(function () {
            // check the local storage index for the current element.
            if (!$.data(this, "plugin_" + pluginVoteMod)) {
                // no plugin created yet, let create a new one.
                $.data(this, "plugin_" + pluginVoteMod, new Plugin(this, options));
            }
        });
    };

    $.extend(Plugin.prototype, {
        // initialize.
        init: function () {

            var $element = $(this.element);


            if(this.settings.vote_count !== null){
            this.buildVoteBox();
        }
            //console.log(this.settings.comment_selector);
            this.buildVoteBox4Comments(this.settings.comment_selector);

            // display vote box

            var self = this;
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
                $('li'+this.settings.comment_selector).find('img[id^="approve"]').click(function () {
                    self.handleCommentVote('up',this);
                });
                $('li'+this.settings.comment_selector).find('img[id^="disapprove"]').click(function () {
                    self.handleCommentVote('down', this);
                });
            }
        },
        /**
         * utility method to build the vote box.
         */
        buildVoteBox: function () {
            var $element = $(this.element);
            var self = this;
            $element.html('<link rel="stylesheet" href="/src/voteMod.css"/><div class="article-right">' +
                    '<div class="article-votes">' +
                    '<img id="ballot" src="' + self.settings.ballot_url + '" class="ballot" alt="ballot box"/>' +
                    '<div class="article-votes-text" id="artical-votes">' +
                    '<label id="count-text" for="male">' + self.settings.vote_count + '</label>' +
                    '</div>' +
                    '</div>' +
                    '<div class="article-buttons">' +
                    '<img id="voteup" src="' + self.settings.approve_url + '" class="approve"' +
                    'title="' + self.settings.approve_title + '" ' +
                    'alt="' + self.settings.approve_title + '" style="" />' +
                    '<br/>' +
                    '<img id="votedown" src="' + self.settings.disapprove_url + '" class="disapprove" ' +
                    'title="' + self.settings.disapprove_title + '" ' +
                    ' alt' + self.settings.disapprove_title + '" style=""/>' +
                    '</div>' +
                    ' </div>');
            ;
        },
        /**
         * handle vote up and down.
         *
         * @param voteAction could be up or down.
         */
        handleVote: function (voteAction, ele) {
            var element = $(this.element);
            var self = this;
            if (voteAction === 'up') {
                    
                $(ele.element).find("img#voteup").attr({
                    'src': self.settings.approved_url,
                    'title': self.settings.approved_title,
                    'style': "pointer"
                });

                $(ele.element).find("label#count-text").text(self.settings.vote_count + 1);
            } else if (voteAction === 'down') {
                //console.log(ele.element);
                $(ele.element).find("img#votedown").attr({
                    'src': self.settings.disapproved_url,
                    'title': self.settings.disapproved_title
                });
            }
        },
        /**
         * build the vote box for comments.
         *
         * @param selector jQuery selector for comments
         */
        buildVoteBox4Comments: function (selector) {
            var $element = $(this.element);
            var self = this;
            var str = ''+$("li"+selector+"").attr("id");
            var trimmed_str = str.split("-");
            //console.log($('li'+selector).find('div[id^="vb-"]'));
            $('li'+selector).find('div[id^="vb-"]').html('<link rel="stylesheet" href="/src/voteMod.css"/><div class="article-right-small" >' +
                    '<div class ="article-votes-small" >' +
                    '<div class ="article-votes-text-small" id = "article-votes-text-small23735" ><a id="comment_votes">' +
                    self.settings.comment_vote_count + '</a> vote(s)' +
                    '</div>' +
                    '</div>' +
                    '<div class = "article-buttons-small" >' +
                    '<div id = "" >' +
                    '<img id="approve'+trimmed_str[1]+'" src = "/images/approve-small.png" class = "comment_approve approve" title = "You must log-in to vote" alt = "You must log-in to vote" onclick = "" >' +
                    '</div>' +
                    '<br >' +
                    '<div  >' +
                    '<img id = "disapprove'+trimmed_str[1]+'" src = "/images/disapprove-small.png" class = "comment_disapprove disapprove" title = "You must log-in to vote" alt = "You must log-in to vote" >' +
                    '</div>' +
                    '</div>' +
                    '</div>');
        },
        /*
         * 
         * handle comment vote
         */
        handleCommentVote: function (voteAction, ele) {
            var self = this;
            if (voteAction === 'up') {
                $(ele).attr({
                    'src': self.settings.approved_small_url,
                    'title': self.settings.approved_title,
                    'style': "pointer"
                });
                $($($($(ele).parent()).parent()).parent()).find('#comment_votes').text(self.settings.comment_vote_count + 1);
            } else if (voteAction === 'down') {
                $(ele).attr({
                    'src': self.settings.disapproved_small_url,
                    'title': self.settings.disapproved_title
                });
            }
        }
    });

})(jQuery);
