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
    staticMessage: 'Hello Vue.js!'
  },
  // computed will binding dynamic data, it just like 
  // data, but could use function.
  computed: {
    dynamicMessage: function() {
      return "I am from a function";
    }
  }
});

/**
 * v-bind directive will be used in element attributes
 * binding data to HTML element attributes.
 * the v-bind: prefix made the magic!
 * it has shortcode: :
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
 * it has shortcode @
 */
var appOn = new Vue({

  el: "#app-on",
  // all data will be attribute of the Vue application object.
  data: {
    theWord: "Reverse Me!"
  },
  methods: {
    reverseMessage: function() {

      // this will be the Vue application object.
      this.theWord = this.theWord.split('').reverse().join('');
    }
  }
});

/**
 * v-if directive is for conditional
 * the value for v-if is the property name of the Vue instance.
 * v-else is like if not
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

/**
 * the v-model directive will make 2-way binding between form
 * input and app state.
 */
var appModel = new Vue({

  el: "#app-model",
  data: {
    theInput: "change the input to see what changed!"
  }
});

/**
 * simple component, 
 */
// define a new componet.
Vue.component('todo-item', {

  // props will the properties used in this component.
  // it is called custom attributes.
  props: ['todo'],
  // html template to present thi component.
  // NOTE: it could be html DOM element selector.
  template: '<li>{{todo.id}} - {{todo.text}}</li>'
});

// the component app.
var appComponent = new Vue({

  el: "#app-component",
  data: {
    someList: [
      {id: 'a', text: 'item a'},
      {id: '2', text: 'item ab'},
      {id: 'c', text: 'item 123'}
    ]
  }
});
