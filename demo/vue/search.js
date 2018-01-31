/**
 * the the Vue application object for the Wizard app.
 */
var app = new Vue({
    // HTML element selector.
    el: "#search-app",

    data: {
      query: '*:*',
      totalHits: 0,
      results: []
    },

    computed: {
      // calculate result summary.
      resultSummary: function() {
          return "Found " + this.totalHits + " in total";
      },

      // produce the csv format.
      resultsInCSV: function() {
          return "TODO: result list in CSV format!";
      }
    },

    methods: {
        simpleSearch() {
            self = this;
            console.log('I am in...');

            //axios.get('https://dev-attivio.sites.leocorn.com/rest/searchApi/simpleCgi',
            //{
            //  params: {
            //    q: this.query,
            //    hits:20,
            //    offset: 0
            //  }
            //})
            //axios.post('https://dev-attivio.sites.leocorn.com/rest/searchApi/search',
            axios.post('https://dev-acis-attivio.sites.leocorn.com/rest/searchApi/search',
            {
                workflow: "customsearch",
                query: this.query,
                queryLanguage: "advanced",
                realm: "sean.chen",
                username: "sean.chen@leocorn.com",
                rows:50,
                offset: 0,
                facetFilters: [
                  { "name" : "bedrooms"
                  }
                ],
                sort: ["title:ASC"]
            })
            .then(function(response) {
                self.totalHits = response.data.totalHits;
                self.results = response.data.documents;
                if(self.totalHits > 0) {
                    console.log('total hits: ' + self.totalHits);
                    console.log(JSON.stringify(response.data.documents[0]));
                    console.log(response.data.documents[0].fields['title']);
                }
            })
            .catch(function(error) {
              console.log(error);
            });
        }
    }
});

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
          this.docs.forEach(function(doc) {
            //console.log(doc);
            var fields = [];
            for(var fieldName in doc.fields) {
              //console.log(fieldName);
              fields.push(doc.fields[fieldName][0]);
            }
            theList.push(fields.join(","));
          });

          return theList.join("\n");
      }
    }
});
