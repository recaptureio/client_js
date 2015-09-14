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
  
  describe('Api', function() {
    var xhr, requests;
    
    before(function() {
      recapture.init('testkey', '12345', {
        debug: false,
        autoDetectEmail: false
      });
      
      xhr = sinon.useFakeXMLHttpRequest();
      requests = [];
      xhr.onCreate = function(req) { requests.push(req); };
    });
    
    
    after(function() {
      xhr.restore();
    });
    
    it('should send XHR request with Api-Key header and external_id in request body', function() {
      var data = {
        first_name: 'Quote First Name',
        last_name: 'Quote Last Name',
        email: 'email@somewhere.com',
        grand_total: 39.99,
        products: [{
          name: 'Product Name',
          sku: 'Product SKU',
          price: 39.99,
          qty: 1,
          image: 'www.path.to/product/image.jpg'
        }]
      };
      
      recapture.track('cart', data, sinon.spy());
      
      var cartRequest = requests[0];
      var cartRequestBody = JSON.parse(cartRequest.requestBody);
      
      expect(requests.length).to.equal(1);
      expect(cartRequest.method).to.equal('POST');
      expect(cartRequest.url).to.equal('http://recapture.io/beacon/cart');
      expect(cartRequest.requestHeaders).to.include.keys('Api-Key');
      expect(cartRequest.requestHeaders['Api-Key']).to.equal('testkey');
      expect(cartRequestBody).to.include.keys('external_id');
      expect(cartRequestBody.external_id).to.equal('12345');
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
