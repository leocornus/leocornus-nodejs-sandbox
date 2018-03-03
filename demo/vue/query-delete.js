/**
 * the the Vue application object for the Wizard app.
 */
var app = new Vue({
    // HTML element selector.
    el: "#query-app",

    data: {
      baseUrl: 'https://dev-acis-attivio.sites.leocorn.com/rest/ingestApi',
      query: 'id:abc',
      sessionId: 'abc',
      totalHits: 0,
      messages: null,
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
        /**
         * handle delet by query
         */
        simpleQuery() {
            self = this;
            self.messages=[];
            console.log('I am in...');
            self.messages.push('Geting started');

            axios.get(self.baseUrl + '/connect')
            .then(function(response) {
                console.log(response);
                self.sessionId = response.data;
                self.messages.push("get Session ID: " + self.sessionId);
                // try to do delet by query.
                self.messages.push("Try to do delete by query");
                axios.post(self.baseUrl + '/deleteByQuery/' + self.sessionId,
                  {
                      query: self.query,
                      //queryLanguage: "advanced",
                      //queryInitWorkflow: "queryInit"
                  }
                )
                .then(function(response) {
                  console.log(response);
                  self.messages.push(response);
                  // check queued docs.
                  axios.get(self.baseUrl + '/getDocumentsQueued/' + self.sessionId)
                  .then (function(response) {
                    self.messages.push(response.data + ' docs queued!');
                  });

                  // try to commit.
                  self.messages.push("Try to commit queued docs!");
                  axios.get(self.baseUrl + '/commit/' + self.sessionId)
                  .then(function(response) {
                    console.log('commit --->');
                    console.log(response);
                  });
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
