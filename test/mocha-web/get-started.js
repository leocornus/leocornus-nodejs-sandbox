// JavaScript testing using mocha.

chai.should();

describe('JavaScript run on browser', function() {
  describe('testing array method indexOf()', function() {
    var numberArray = [1,2,3];

    it('array index starts from 0', function() {
      numberArray.indexOf(1).should.equal(0);
      numberArray.indexOf(2).should.equal(1);
    });

    it('return -1 if the value is not present', function() {
      numberArray.indexOf(0).should.equal(-1);
      numberArray.indexOf(4).should.equal(-1);
    });
  })
})
