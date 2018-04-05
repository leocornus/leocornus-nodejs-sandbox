
/**
 * facet buckets..
 */
Vue.component("statistics", {
    // The x-template id.
    template: "#statistics",
    props: ["stats"],

    computed: {
        theStats() {

            var self = this;
            if(self.stats) {

            var format = d3.format(",.2f");
            var items = [];
            Object.keys(self.stats).forEach(function(theKey) {
                var item = {
                  "key": theKey,
                  "value": format(self.stats[theKey])
                }
                items.push(item);
            });

            return items;
            } else {
                return [];
            }
        }
    }
});

/**
 * facet buckets..
 */
Vue.component("facet-buckets", {
    // The x-template id.
    template: "#facet-buckets",
    props: ["facet"],

    // using computed for dynamic data.
    computed: {
        // the facet label.
        facetLabel() {
            return this.facet.label;
        },

        // ids for collapse.
        facetID() {
            return this.facet.label.replace(/ /g, '-');
        },
        facetCollapseID() {
            return "collapse" + this.facet.label.replace(/ /g, '-');
        },
        facetTargetCollapseID() {
            return "#collapse" + this.facet.label.replace(/ /g, '-');
        },

        // facet buckets.
        facetBuckets() {
            return this.facet.buckets;
        }
    }
});

/**
 * listing details template. 
 */
Vue.component("listing-details", {
    // we will use the html blok with the id selector.
    // the HTML template. 
    // It should be a script element with type "x-template"
    template: "#accordion-listing-details",

    // the doc will have all details and a index field.
    props: ["doc", "index"],

    computed: {

        // for all th IDs, we need replace the special char @ with
        // empty string.

        listingID() {
            return this.doc.fields['.id'][0].replace(/[@\.]/g, '');
        },

        collapseID() {
            return "collapse" + this.doc.fields['.id'][0].replace(/[@\.]/g, '');
        },

        targetCollapseID() {
            return "#collapse" + this.doc.fields['.id'][0].replace(/[@\.]/g, '');
        },

        /**
         * title for each doc.
         */
        caption() {
            // we will tweak the caption based on table.
            var table = this.doc.fields['table'][0];
            // by default, we will using id as the caption.
            var caption = this.doc.fields['.id'][0];

            switch(table) {
              case 'xmldata':
                return caption + ' - ' +
                    this.doc.fields.title[0] + ', ' +
                    this.doc.fields.city[0] + ' -- ' +
                    this.doc.fields.avgScore[0];
              case 'offlisting':
                return caption + ' - ' +
                    this.doc.fields.title[0] + ', ' +
                    this.doc.fields.city[0];
              case 'userprefs':
                return caption + ' - ' +
                    this.doc.fields.useremail[0];
              default:
                return caption;
            }
        }
    }
});

/**
 * result list in csv format.
 */
Vue.component("results-list", {

    // the HTML template element id.
    template: "#accordion-results-list",

    props: ["docs"],

    computed: {

      // show the list of docs in JSON format.
      docsListJSON() {
          return JSON.stringify(this.docs, null, '  ');
      },

      // show the list of docs in CSV format.
      docsListCSV() {

          if(!this.docs) {
            return '--';
          }

          var theList = [];
          this.docs.forEach(function(doc, index) {
            //console.log(doc);
            var fields = [];
            if(index === 0) {
              // the first doc, we will get all keys.
              Object.keys(doc.fields).forEach(function(field) {
                if(field === ".score") {
                  // do nothing.
                } else if(field === ".zone") {
                  // do nothing.
                } else if(field === "table") {
                  // do nothing.
                } else {
                  fields.push(field);
                }
              });
              theList.push(fields.join(","));
              fields = [];
            }
            for(var fieldName in doc.fields) {
              //console.log(fieldName);
              // skip some fields.
              if(fieldName === ".zone") {
                continue;
              } else if(fieldName === ".score") {
                continue;
              } else if(fieldName === "table") {
                continue;
              }
              fields.push(doc.fields[fieldName][0]);
            }
            theList.push(fields.join(","));
          });

          return theList.join("\n");
      }
    }
});

/**
 * the the Vue application object for the Wizard app.
 */
var app = new Vue({
    // HTML element selector.
    el: "#search-app",

    data: {
      query: '*:*',
      facetFields: "table,city,importdate",
      // the base URL will include the ending /
      restBaseUrl: "https://localhost/rest/",
      totalHits: 0,
      facets: null,
      stats: null,
      results: null,
      resultSummary: "Click search to start.."
    },

    computed: {
      // produce the csv format.
      resultsInCSV: function() {
          return "TODO: result list in CSV format!";
      }
    },

    methods: {
        simpleSearch() {

            self = this;
            console.log('I am in...');
            self.resultSummary = "Searching ...";
            // set the results to null for hiding the whole section.
            self.results = null;
            self.facets = null;
            self.stats = null;

            // check the query, 
            if(!this.query) {
              // reset the query to search everything!
              this.query="*:*";
            }

            // the simple cgi url.
            //axios.get(this.restBaseUrl + 'searchApi/simpleCgi',
            //{
            //  params: {
            //    q: this.query,
            //    hits:20,
            //    offset: 0
            //  }
            //})
            if(self.facetFields.includes('statistics')) {
            } else {
                // add the statistics on listvalue_i
                self.facetFields = self.facetFields + 
                  ",listvalue_i(statistics=true)";
            }

            // the query url should be some thing like this: 
            // - 'https://one.sites.leocorn.com/rest/searchApi/search',
            axios.post(this.restBaseUrl + 'searchApi/search',
            {
                workflow: "customsearch",
                query: this.query,
                //queryLanguage: "advanced",
                //realm: "sean.chen",
                //username: "sean.chen@leocorn.com",
                rows:250,
                offset: 0,
                //fields: [".id","title","table","avgScore"],
                //sort: ["title:ASC"],
                // facets: ["table", "city", "agentname"],
                facets: self.facetFields.split(',')
            })
            .then(function(response) {
                self.totalHits = response.data.totalHits;
                self.results = response.data.documents;
                self.facets = response.data.facets;
                self.stats = self.facets[self.facets.length - 1].statistics;
                console.log("statistics: " + self.stats);
                self.resultSummary = "Found " + self.totalHits + " docs in total!"
                if(self.totalHits > 0) {
                    console.log('total hits: ' + self.totalHits);
                    console.log(JSON.stringify(self.facets));
                    //console.log(JSON.stringify(response.data.documents[0]));
                    //console.log(response.data.documents[0].fields['title']);
                }
            })
            .catch(function(error) {
              self.resultSummary = "Query Error!";
              console.log(error);
            });
        }
    }
});
