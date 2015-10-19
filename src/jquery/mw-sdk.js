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
        'apiPath' : 'w/api.php'
    };

    /**
     * the base class to access mediawiki APIs
     * @param {object} siteOptions object has the details to
     * the remote MediaWiki site.
     *
     * var siteOptions = {
     *       'baseUrl' : 'en.wikipedia.org',
     *       'apiPath' : 'w/api.php'
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

            jQuery.get(self.getApiUrl(), action)
              .done(function(data) {
                  //self.log(data);
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
                      this.siteOptions.baseUrl + "/" + 
                      this.siteOptions.apiPath;
            return url;
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
                    callback(err);
                    return;
                }

                // TODO the page content.
                var content = data.parse.text['*'];
                // process the content and to match bootstrap.
                content = self.processArticleContent(content);
                callback(null, content);
            });
        },

        // process the arcicle content to toc and content
        processArticleContent: function(content) {

            // parse the content html to a jQuery object.
            var $content = jQuery('<div>').html(content);
            // find the TOC div.
            var $toc = $content.find('div#toc');
            //alert(tocHtml);
            // convert the toc to bootstrap scroll spy.
            var $nav = jQuery('<nav class="bs-docs-sidebar affix">').
                       html($toc.html());
            $nav.find('ul').addClass('nav');
            var $toc = jQuery('<div>').html($nav);

            // remove TOC from content.
            $content.find('div#toc').replaceWith('');
            // remove the edit seciton for each heading.
            $content.find('span.mw-editsection').replaceWith('');
            var ret = {'toc' : $toc.html(), 
                       'content' : $content.html()};
            return ret; 
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
