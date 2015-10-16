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
    }
    
    /**
     * create the prototype
     */
    jQuery.extend(MediaWikiClient.prototype, {

        // query method. using jQuery.get
        query: function(title) {
            // tracking the original this.
            var self = this;

            // get ready the data send to wiki api.php.
            var action = {
                'format' : 'json',
                'action' : 'query',
                'titles' : title,
                'prop' : 'categories'
            };
            jQuery.get(self.getApiUrl(), action, function(data) {
                self.log(data);
            });
        },

        // return the full url to api.php.
        getApiUrl: function() {

            var url = "//" +
                      this.siteOptions.baseUrl + "/" + 
                      this.siteOptions.apiPath;
            return url;
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
