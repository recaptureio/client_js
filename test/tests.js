var expect = chai.expect;

describe('Recapture', function() {
  
  describe('Construction', function() {
    it('should throw error if apiKey is not passed or not a string', function() {
      expect(function() {
        recapture.init({});
      }).to.throw(Error);
    });
    
    it('should throw error if cartId is not passed or not a string', function() {
      expect(function() {
        recapture.init('testing', {});
      }).to.throw(Error);
    });
    
    it('should throw error if options are passed but are not in object format', function() {
      expect(function() {
        recapture.init('testing', 'testing', 'options');
      }).to.throw(Error);
    });
  });
  
  describe('Methods', function() {
    before(function() {
      recapture.init('testkey', '12345', {
        debug: true,
        autoDetectEmail: true
      });
    });
    
    describe('.init()', function() {
      it('should set api key', function() {
        expect(recapture.apiKey).to.equal('testkey');
      });
      
      it('should set cart id', function() {
        expect(recapture.cartKey).to.equal('12345');
      });
      
      it('should override default options', function() {
        expect(recapture.options.autoDetectEmail).to.equal(true);
      });
    });
    
    describe('.conversion([properties])', function() {
      it('should throw TypeError if properties is passed and not an object', function() {
        expect(function() {
          recapture.conversion('test');
        }).to.throw(TypeError);
      });
    });
    
    describe('.cart([properties])', function() {
      it('should throw TypeError if properties is passed and not an object', function() {
        expect(function() {
          recapture.cart('test');
        }).to.throw(TypeError);
      });
    });
    
    describe('.email([email], [properties])', function() {
      it('should throw Error if email is not passed', function() {
        expect(function() {
          recapture.email();
        }).to.throw(Error);
      });
      
      it('should throw Error if email is passed but not a valid email', function() {
        expect(function() {
          recapture.email('test');
        }).to.throw(Error);
      });
      
      it('should throw TypeError if properties is passed and not an object', function() {
        expect(function() {
          recapture.cart('test', 'test');
        }).to.throw(TypeError);
      });
    });
  });
});
