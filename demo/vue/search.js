/**
 * the the Vue application object for the Wizard app.
 */
var app = new Vue({
    // HTML element selector.
    el: "#search-app",

    data: {
      query: '*',
      totalHits: 0,
      results: []
    },

    computed: {
      resultSummary: function() {
          return "Found " + this.totalHits + " in total";
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
                //realm: "test",
                //username: "sean.chen@leocorn.com",
                rows:50,
                offset: 0,
                //facetFilters: [
                //  { "name" : "facetName", 
                //    "label" : "Bucket Display Value", 
                //    "filter" : "fieldName:FACET(bucketValue)" 
                //  }
                //],
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
