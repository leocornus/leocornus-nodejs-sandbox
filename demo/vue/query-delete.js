/**
 * the the Vue application object for the Wizard app.
 */
var app = new Vue({
    // HTML element selector.
    el: "#query-app",

    data: {
      baseUrl: 'https://search.example.com/rest',
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

            var self = this;

            // get ready the messages area.
            this.messages=[];

            // TODO: check action and payload.
            var payload = JSON.parse(this.payload);
            switch(this.actionName) {
                case "bulkUpdate":
                    /**
                     * here is a example of the payload:
                     * {
                     *   "query":"importdate:2018--04--10",
                     *   "rows": 10,
                     *   "fields":{
                     *     "table":["offlisting"]
                     *   }
                     * }
                     */
                    self.bulkUpdate(payload.query, payload.rows, payload.fields);
                    break;
                case "dailyAverage":
                    self.statDailyAvarage();
                    break;
                default:
                    self.processIngest(this.actionName, payload);
            }
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
         * try to generate daily total.
         */
        statDailyTotal: function() {

            self = this;
            // preparing query the daily total:
            var queryTotal = {
              workflow: "customsearch",
              query: "table:xmldata",
              facets: [
                "city(maxBuckets=-1)",
                "agentname(maxBuckets=-1)",
                "brokername(maxBuckets=-1)",
                "neighbourhoodname(maxBuckets=-1)",
                "residencetype(maxBuckets=-1)",
                "listvalue_i(statistics=true)"
              ]
            };

            // execute the query.

            // collect data and prepare payload.

            // commit ingest.
        },

        /**
         * try to generate daily average price.
         */
        statDailyAverage: function() {

            self = this;
            self.messages.push("try to collect daily average!");
        },

        /**
         * bulk update by using the feedDocuments end point.
         */
        bulkUpdate: function(query, rows, fields) {

            var self = this;
            // execute the query
            axios.post(this.baseUrl + "/searchApi/search",
                {
                  "workflow": "customsearch",
                  "query": query,
                  //"fields": [".id"],
                  "rows": rows,
                  "offset": 0
                }
            ).then(function(response) {
                var docs = response.data.documents;
                var totalDocs = response.data.totalHits;
                self.messages.push("Found " + totalDocs + " docs in total!");
                if(totalDocs <= 0) {
                    return;
                }

                if(totalDocs < 10) {
                    self.messages.push(docs);
                }

                // collect all ids
                // prepare the payload for list of documents.
                var payloadList = [];
                docs.forEach(function(doc) {
                    var docId = doc.fields['.id'][0];
                    //var newFields = doc.fields;
                    var newFields = {};
                    // replace the fields.
                    Object.keys(doc.fields).forEach(function(fieldName) {

                        //console.log(fieldName);

                        if(fieldName.startsWith('.') ||
                           (fieldName === "position")) {
                            // ignore this field.
                        } else if (fields.hasOwnProperty(fieldName)) {
                            // this is the field to update.
                            newFields[fieldName] = fields[fieldName];
                        } else {
                            // copy the current value.
                            newFields[fieldName] = doc.fields[fieldName];
                        }
                    });
                    // template for each payload.
                    var docPayload = {
                        "fields": newFields,
                        "id": docId,
                        "mode": "ADD",
                        //"mode": "PARTIAL",
                        "permissions" : [ {
                            "principal" : {
                                  "name" : "Anonymous",
                                  "realm" : "Anonymous",
                                  "type" : "user"
                            }
                        } ]
                    }
                    payloadList.push(docPayload);
                });

                if(totalDocs < 10) {
                    self.messages.push(payloadList);
                }

                // execute the ingest.
                self.processIngest('feedDocuments', payloadList);
            }).catch(function(error){
                self.messages.push(error);
            });
        },

        /**
         * bulk update by query
         * this end point only works for real time field.
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
                      axios.get(self.baseUrl + '/ingestApi/disconnect/' + self.sessionId)
                      .then(function(response) {
                        self.messages.push(response);
                      });
                    });
                  });
                })
                .catch(function(error) {
                  console.log(error);
                  self.messages.push(error);
                });
            })
            .catch(function(error) {
              console.log(error);
              self.messages.push(error);
            });
        }
    }
});
