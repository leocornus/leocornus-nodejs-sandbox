/**
 * build a light MediaWiki API client for testing...
 *
 * some api query examples:
 *
 * - using visualeditor to parse wikitext to html
 * https://en.wikipedia.org/w/api.php?action=visualeditor&page=Main%20Page&paction=parse
 * 
 * - query category.
 * https://en.wikipedia.org/w/api.php?action=query&titles=EMC_Corporation&prop=categories&format=jsonfm
 *
 * - parse action to get html, categories, 
 *   and sections (table of content) for a page.
 * https://en.wikipedia.org/w/api.php?action=parse&page=EMC_Corporation&prop=categories|text|sections&format=jsonfm
 *
 * - query all pages under a category.
 * https://en.wikipedia.org/w/api.php?action=query&generator=categorymembers&gcmtitle=EMC_Corporation&gcmlimit=100
 */
;(function() {

    var defaultSite = {
        'baseUrl' : 'en.wikipedia.org',
        'origin' : null,
        'apiPath' : '/w/api.php',
        // the maximum number of items to return,
        // default api number is 10, 500 is the max.
        'limit' : 50
    };

    /**
     * the base class to access mediawiki APIs
     * @param {object} siteOptions object has the details to
     * the remote MediaWiki site.
     *
     * var siteOptions = {
     *       'baseUrl' : 'en.wikipedia.org',
     *       'apiPath' : 'w/api.php',
     *       'origin' : 'http://the.current.domain'
     *     };
     */
    function MediaWikiClient(siteOptions) {

        this.siteOptions = jQuery.extend({}, defaultSite, 
                                         siteOptions);
        // the raw data from wiki site, in json format.
        this.rawData = null;
    }
    
    /**
     * create the prototype
     */
    jQuery.extend(MediaWikiClient.prototype, {

        // general method for get method.
        apiGet: function(action, callback) {
            // tracking the original this.
            var self = this;

            if (self.siteOptions.origin != null) {
                action = jQuery.extend(
                    {'origin': self.siteOptions.origin},
                    action);
            }

            jQuery.get(self.getApiUrl(), action)
              .done(function(data) {
                  self.log(data);
                  //self.setRawData(data);
                  //self.rawData = data;
                  callback(null, data);
              })
              // handle erro.
              .fail(function(data) {
                  callback('Error', data);
              });
        },

        // return the full url to api.php.
        getApiUrl: function() {

            var url = "//" +
                      this.siteOptions.baseUrl + 
                      this.siteOptions.apiPath;
            return url;
        },

        // return the max return limit.
        getLimit: function() {

            return this.siteOptions.limit;
        },

        // get an article
        getArticle: function(title, callback) {

            // save the original this.
            var self = this;

            // get ready the data send to wiki api.php.
            var action = {
                'format' : 'json',
                'action' : 'parse',
                'page' : title,
                'prop' : 'text'
            };

            // call wiki api
            this.apiGet(action, function(err, data) {

                if(err) {
                    // got error.
                    callback(err);
                    return;
                }

                // TODO the page content.
                var content = data.parse.text['*'];
                // process the content and to match bootstrap.
                content = self.convert2BootstrapRow(content);
                callback(null, content);
            });
        },

        // return a list of page ids. or titles.
        getPagesInCategory: function(category, callback) {

            var self = this;
            if(!category.match("^Category")) {
                // not start from Category
                category = 'Category: ' + category;
            }
            var action = {
                'format' : 'json',
                'action' : 'query',
                'list' : 'categorymembers',
                //'generator' : 'categorymembers',
                // return all types of member.
                'cmprop' : 'ids|title|type',
                'cmtitle' : category,
                'cmlimit' : this.getLimit()
            };

            this.apiGet(action, function(err, data) {
                // need get a list of page ids.
                if(err) {
                    callback(err);
                    return;
                }

                // pages array
                var pages = data.query.categorymembers;
                var $row = self.createCategoryRow(category, pages);
                callback(null, $row);
            });
        },

        // process the article content to toc and content
        processArticleContent: function(content) {

            // parse the content html to a jQuery object.
            var $content = jQuery('<div>').html(content);
            // find the TOC div.
            var $toc = $content.find('div#toc');
            //$toc.find('div#toctitle').replaceWith('');
            //alert(tocHtml);
            // convert the toc to bootstrap scroll spy.
            var $nav = jQuery('<nav class="affix" id="sidenav">').
                       html($toc.html());
            $nav.find('ul').addClass('nav');
            // add class for the first ul.
            $nav.children('ul').addClass('nav-pills nav-stacked')
                .attr('data-spy', 'affix').attr('id', 'thenav');
            //$nav.find('a').attr('data-toggle', 'pill');
            // remove all class for li
            $nav.find('li').attr('class', '');
            var $toc = jQuery('<div>').html($nav);

            // adding the scroll styp for body:
            //var $body = jQuery('body');
            //$body.attr('data-spy', 'scroll').attr('data-target', '#sidenav');

            // remove TOC from content.
            $content.find('div#toc').replaceWith('');
            // remove the edit seciton for each heading.
            $content.find('span.mw-editsection').replaceWith('');
            var contentHtml = $content.html();
            // replace globaly! all occurrence!
            contentHtml = contentHtml.replace(/"\/wiki\//g, 
               '"//' + this.siteOptions.baseUrl + '/wiki/');

            var ret = {'toc' : $toc.html(), 
                       'content' : contentHtml};
            return ret; 
        },

        // process the article content to bootstrap 2-column
        // (9, 3) row.
        convert2BootstrapRow: function(content) {

            var $row = jQuery('<div class="row">');
            // append the contnet and navbar column
            $row.append('<div class="col-md-9" id="content"></div>');
            $row.append('<div class="col-md-3" id="navbar"></div>');

            var $content = $row.find('#content');
            // adding scrollspy
            // NOTE: This seems not working!
            //$content.attr('data-spy', 'scroll').
            //    attr('data-target', '#thenav').
            //    attr('data-offset', '25');

            var $navbar = $row.find('#navbar');

            var ret = this.processArticleContent(content);

            $content.html(ret['content']);
            $navbar.html(ret['toc']);

            return $row;
        },

        /**
         * get ready a nav nav-pills for the given pages array.
         * each page is an object with the following data structure:
         *
         * {
         *    'ns' : 0,
         *    'pageid' : 23458,
         *    'title' : 'Backups Sys Admin',
         *    'type' : 'page',
         * }
         */
        createNavPills: function(pages) {

            var self = this;
            var $navPills = jQuery('<ul class="nav nav-pills nav-stacked"></ul>');
            //$navPills.attr('data-spy', 'affix');
            jQuery.each(pages, function(index, page) {

                var activeClass = 'class=""';
                if (index == 0) {
                    activeClass = 'class="active"';
                }

                var li = '<li ' + activeClass + '><a data-toggle="pill" href="#">' +
                         page['title'] + '</a></li>';
                $navPills.append(li);
            });

            // add the click event.
            $navPills.find('li a').on('click', function() {

                var pageTitle = jQuery(this).html();
                self.getArticle(pageTitle, function(err, $content) {
                    jQuery('#content').html($content.find('#content').html());
                });
            });

            return $navPills;
        },

        /**
         */
        createCategoryRow: function(category, pages) {

            var self = this;
            // build the row html
            var rowHtml = '<div class="row">' +
                   '  <div class="col-md-3" id="navcol">' +
                   '    <div class="sidebar-nav-fixed affix" ' +
                   '         style="margin-left: -16px">' + 
                   '      <div class="well" id="sidenav"></div>' + 
                   '    </div>' + 
                   '  </div>' + 
                   '  <div class="col-md-9" id="content"></div>' +
            //       '  <div class="col-md-9" id="content"></div>' + 
                   '</div>';
            var $row = jQuery(rowHtml);

            // build the nav pills
            // adding the category content page to pages list
            pages.unshift({
                'ns' : 0,
                'pageid' : 0,
                'title' : category,
                'type' : 'category'
            });
            var $navPills = this.createNavPills(pages);
            $row.find('#sidenav').append($navPills);

            // hook the resize event.
            jQuery(window).on('resize', function() {
                jQuery('.sidebar-nav-fixed').
                    outerWidth(jQuery('#navcol').outerWidth());
            });

            // load the category page as the default content.
            this.getArticle(category, function(err, $content) {
                // append to row.
                $row.find('#content').append($content.find('#content').html());
            });

            return $row;
        },

        // get the raw data.
        getRawData: function() {

            return this.rawData;
        },

        // set the raw data.
        setRawData: function(data) {

           this.rawData = data;
        },

        getPageTitle: function() {
            
        },

        // utility method to log message.
        log: function(msg) {

            // using console for now.
            console.log(msg);
        }
    });

    // export to window
    window.MediaWikiClient = MediaWikiClient;
}());