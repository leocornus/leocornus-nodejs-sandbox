// test case uisng mocha framework.
// this is for testing a node module.

var assert = require('assert');
var sandbox = require('../../index');

describe('sandbox functions', function() {

  describe('printMsg()', function() {
    it('should return hello node.js! message', function() {
      assert.equal('hello node.js!', sandbox.printMsg());
    })
  })
})
