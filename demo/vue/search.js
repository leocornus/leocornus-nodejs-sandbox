/**
 * the the Vue application object for the Wizard app.
 */
new Vue({
    // HTML element selector.
    el: "#search-app",

    data: {
      results: [
        { title: 'title one',
          url: 'http://example.com/one',
          desc: 'description one'
        },
        { title: 'title two',
          url: 'http://example.com/two',
          desc: 'description two'
        }
      ]
    },

    methods: {
        simpleSearch() {
            console.log('I am in...');

        }
    }
});

