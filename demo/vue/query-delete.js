/**
 * the the Vue application object for the Wizard app.
 */
var app = new Vue({
    // HTML element selector.
    el: "#query-app",

    data: {
      baseUrl: 'https://dev-attivio.sites.leocorn.com/rest/ingestApi',
      query: 'id:abc',
      sessionId: 'abc',
      totalHits: 0,
      results: [
        {fields: { 
          '.id': '123',
          title: 'title one',
          url: 'http://example.com/one',
          description: 'description one'
        }},
        {fields: {
          '.id': 'abc',
          title: 'title two',
          url: 'http://example.com/two',
          description: 'description two'
        }}
      ]
    },

    computed: {
      resultSummary: function() {
          return "Found " + this.totalHits + " in total";
      }
    },

    methods: {
        simpleQuery() {
            self = this;
            console.log('I am in...');

            axios.get(self.baseUrl + '/connect')
            .then(function(response) {
                console.log(response);
                self.sessionId = response.data;
                // try to do delet by query.
                axios.post(self.baseUrl + '/delete/' + self.sessionId,
                  {
                      query: self.query,
                      //queryLanguage: "advanced",
                      //queryInitWorkflow: "queryInit"
                  }
                )
                .then(function(response) {
                  console.log(response);
                })
                .catch(function(error) {
                  console.log(error);
                });
            })
            .catch(function(error) {
              console.log(error);
            });
        }
    }
});
