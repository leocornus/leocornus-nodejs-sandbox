// quick test case to get start to use vows for testing.

var vows = require('vows');
var assert = require('assert');

// require sandbox.
var sandbox = require('../../index');

vows.describe('sandbox functions').addBatch({
  'hello node.js!' : {
    topic: function() {
      return sandbox.printMsg();
    },
    'hello message': function(topic) {
      assert.equal(topic, 'hello node.js!');
    }
  }
}).export(module);
