// JavaScript testing using mocha.

// load the chai assertion lib.
chai.should();

describe('JavaScript run on browser', function() {
  describe('testing array', function() {
    var numberArray = [1,2,3];

    it('length: we have an array with 3 numbers.', function() {
      numberArray.length.should.equal(3);
    });

    it('indexOf(): array index starts from 0', function() {
      numberArray.indexOf(1).should.equal(0);
      numberArray.indexOf(2).should.equal(1);
    });

    it('[0]: will return the first number', function() {
      numberArray[0].should.equal(1);
      numberArray[2].should.equal(3);
    });

    it('indexOf(): return -1 if the value is not present', 
       function() {
      numberArray.indexOf(0).should.equal(-1);
      numberArray.indexOf(4).should.equal(-1);
    });
  });
})
