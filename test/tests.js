var expect = chai.expect;

describe('Recapture', function() {
  
  before(function() {
    recapture.init('testkey', {
      autoDetectEmail: false
    }).debug();
  });
  
  describe('.init()', function() {
    it('should set api key', function() {
      expect(recapture.key).to.equal('testkey');
    });
    
    it('should override default options', function() {
      expect(recapture.options.autoDetectEmail).to.equal(false);
    });
  });
  
  describe('.conversion()', function() {
    it('should throw TypeError if object is not passed', function() {
      expect(function() {
        recapture.conversion('test');
      }).to.throw(TypeError);
    });
    
    it('should throw Error if cart_id is not passed', function() {
      expect(function() {
        recapture.conversion({});
      }).to.throw(Error);
    });
  });
  
  describe('.cart()', function() {
    it('should throw TypeError if object is not passed', function() {
      expect(function() {
        recapture.cart('test');
      }).to.throw(TypeError);
    });
    
    it('should throw Error if cart_id is not passed', function() {
      expect(function() {
        recapture.cart({});
      }).to.throw(Error);
    });
  });
  
  describe('.email()', function() {
    it('should throw TypeError if object is not passed', function() {
      expect(function() {
        recapture.cart('test');
      }).to.throw(TypeError);
    });
    
    it('should throw Error if email is not passed', function() {
      expect(function() {
        recapture.email({});
      }).to.throw(Error);
    });
    
    it('should throw Error if email is passed but not a valid email', function() {
      expect(function() {
        recapture.email({
          email: '123'
        });
      }).to.throw(Error);
    });
  });
});
