/**
 * listing details template.
 */
Vue.component("listing-details", {
    // we will use the html blok with the id selector.
    template: "#accordion-listing-details",

    // the doc will have all details and a index field.
    props: ["doc", "index"],

    computed: {
        listingID() {
            return this.doc.fields['.id'][0].replace(/[@\.]/g, '');
        },

        collapseID() {
            return "collapse" + this.doc.fields['.id'][0].replace(/[@\.]/g, '');
        },

        targetCollapseID() {
            return "#collapse" + this.doc.fields['.id'][0].replace(/[@\.]/g, '');
        },

        caption() {
            var table = this.doc.fields['table'][0];
            var caption = this.doc.fields['.id'][0];
            switch(table) {
              case 'xmldata':
                return caption + ' - ' +
                    this.doc.fields.title[0] + ' -- ' +
                    this.doc.fields.avgScore[0];
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

    template: "#accordion-results-list",

    props: ["docs"],

    computed: {

      // show the list of docs in JSON format.
      docsListJSON() {
          return JSON.stringify(this.docs, null, '  ');
      },

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
      // the base URL will include the ending /
      restBaseUrl: "https://localhost/rest/",
      totalHits: 0,
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

            // check the query, 
            if(!this.query) {
              // reset the query to search everything!
              this.query="*:*";
            }

            //axios.get('https://dev-attivio.sites.leocorn.com/rest/searchApi/simpleCgi',
            //{
            //  params: {
            //    q: this.query,
            //    hits:20,
            //    offset: 0
            //  }
            //})
            // the query url should be some thing like this: 
            // - 'https://one.sites.leocorn.com/rest/searchApi/search',
            axios.post(this.restBaseUrl + 'searchApi/search',
            {
                workflow: "customsearch",
                query: this.query,
                queryLanguage: "advanced",
                realm: "sean.chen",
                username: "sean.chen@leocorn.com",
                rows:250,
                offset: 0,
                //sort: ["title:ASC"],
                facetFilters: [
                  { "name" : "bedrooms"
                  }
                ]
            })
            .then(function(response) {
                self.totalHits = response.data.totalHits;
                self.results = response.data.documents;
                self.resultSummary = "Found " + self.totalHits + " docs in total!"
                if(self.totalHits > 0) {
                    console.log('total hits: ' + self.totalHits);
                    console.log(JSON.stringify(response.data.documents[0]));
                    console.log(response.data.documents[0].fields['title']);
                }
            })
            .catch(function(error) {
              self.resultSummary = "Query Error!"
              console.log(error);
            });
        }
    }
});
