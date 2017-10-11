/**
 * the Vue apps from Vue.js introduction.
 */

/**
 * the very first app, just render data to DOM by using
 * the straightforward template syntax.
 */
var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue.js!'
  }
});

/**
 * binding data to HTML element attriburtes.
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
