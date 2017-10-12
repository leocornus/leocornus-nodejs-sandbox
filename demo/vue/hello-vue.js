/**
 * the Vue apps from Vue.js introduction.
 */

/**
 * the very first app, just render data to DOM by using
 * the straightforward template syntax.
 *  {{message}}
 * 
 * the syntax to load template.
 */
var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue.js!'
  }
});

/**
 * v-bind directive will be used in element attributes
 * binding data to HTML element attributes.
 * the v-bind: prefix made the magic!
 */
var app2 = new Vue({
  // el is like the selector.
  el: "#app-2",
  data: {
    title: 'the current date is ' + new Date().toLocaleString()
  }
});

/**
 * v-for directive.
 * get data in loop... v-for, like forEach
 */
var appFor = new Vue({

  el: "#app-for",
  data: {
    todos: [
      {text: 'one item'},
      {text: 'item two'},
      {text: 'three items'}
    ]
  }
});

/**
 * v-on directive will hook events.
 */
var appOn = new Vue({

  el: "#app-on",
  data: {
    theWord: "Reverse Me!"
  },
  methods: {
    reverseMessage: function() {
      this.theWord = this.theWord.split('').reverse().join('');
    }
  }
});

/**
 * v-if directive is for conditional
 * the value for v-if is the property name of the Vue instance.
 */
var appIf = new Vue({

  el: "#app-if",
  data: {
    seen: true
  },
  methods: {
    onAndOff: function() {

      this.seen = !this.seen;
    }
  }
});
