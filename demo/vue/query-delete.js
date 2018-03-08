/**
 * the the Vue application object for the Wizard app.
 */
var app = new Vue({
    // HTML element selector.
    el: "#query-app",

    data: {
      baseUrl: 'https://dev-acis-attivio.sites.leocorn.com/rest',
      query: 'id:abc',
      actionName: 'getSessionCount',
      payload: '',
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
         * execute ingest
         */
        executeIngest: function() {

            // TODO: check action and payload.

            this.processIngest(this.actionName, JSON.parse(this.payload));
        },

        /**
         * handle delet by query
         */
        deleteByQuery: function() {

            self = this;
            this.processIngest('deleteByQuery', 
                {
                    query: self.query,
                    //queryLanguage: "advanced",
                    //queryInitWorkflow: "queryInit"
                }
            );
        },

        /**
         * bulk update by query
         */
        bulkUpdateByQuery: function() {

            self = this;
            self.processIngest('bulkUpdateByQuery',
              {
                "fields": {
                  "table" : ["testbulk"],
                  "schoolpreference" : [1204]
                },
                "query": self.query,
                "queryLanguage" : "advanced",
                "queryInitWorkflow" : "queryInit"
              }
            );
        },

        /**
         * the general function to call ingest end point.
         * it will serve different action end point.
         */
        processIngest: function(actionEndPoint, inputPayload) {
            self = this;
            self.messages=[];
            console.log('I am in...');
            self.messages.push('Geting started');

            axios.get(self.baseUrl + '/ingestApi/connect')
            .then(function(response) {
                console.log(response);
                self.sessionId = response.data;
                self.messages.push("get Session ID: " + self.sessionId);
                // try to do delet by query.
                self.messages.push("Try to do delete by query");
                self.messages.push(inputPayload);
                axios.post(self.baseUrl + '/ingestApi/' + actionEndPoint + '/' + self.sessionId,
                           inputPayload)
                .then(function(response) {
                  console.log(response);
                  self.messages.push(response);
                  // check queued docs.
                  axios.get(self.baseUrl + '/ingestApi/getDocumentsQueued/' + self.sessionId)
                  .then (function(response) {
                    self.messages.push(response.data + ' docs queued!');
                    // try to commit.
                    self.messages.push("Try to commit queued docs!");
                    axios.get(self.baseUrl + '/ingestApi/commit/' + self.sessionId)
                    .then(function(response) {
                      console.log('commit --->');
                      //console.log(response);
                      self.messages.push(response);
                      // disconnect.
                      axios.get(self.baseUrl + '/ingestApidisconnect/' + self.sessionId)
                      .then(function(response) {
                        self.messages.push(response);
                      });
                    });
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
