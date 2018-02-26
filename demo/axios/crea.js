/**
 *
 */
var app = new Vue({
  el: "#axios-app",

  data: {
    systemMetadata: null
  },

  methods: {

    getSystemMetadata() {
      self = this;

      axios.get('http://sample.data.crea.ca/Metadata.svc/GetMetadata',
        {
          params: {
            Type: 'METADATA-SYSTEM',
            Format: 'STANDARD-XML',
            ID: '*'
          }
        }
      ).then(function(response) {
        console.log(response.data);
        self.systemMetadata = response.data;
      }).catch(function(error) {
        //self.resultSummary = "Query Error!"
        console.log(error);
      });
    }
  }
});
