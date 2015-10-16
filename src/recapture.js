'use strict';

/**
 * 3rd party libs
 */
var isEmail = require('check-email-valid');
var isObject = require('lodash.isplainobject');
var isString = require('lodash.isstring');
var extend = require('extend');
var request = require('qwest');

/**
 * Recapture default options
 */
var DEFAULTS = {
  autoDetectEmail: false,
  debug: false
};

/**
 * Recapture constructor
 *
 * @method Recapture
 */
function Recapture() {}

/**
 * Initialize the recapture plugin and setup api key and current invoice id
 *
 * @method init
 *
 * @param {String} apiKey Recapture API key
 * @param {String} cartId The current customers cart ID
 * @param {Object} options Options for recapture lib
 *
 * @return {Object} Recapture instance for method chaining
 */
Recapture.prototype.init = function(apiKey, cartId, options) {
  // Existance & type check
  if (!apiKey || !isString(apiKey)) {
    throw new Error('API Key is required and must be a string');
  }
  
  // Existance & type check
  if (!cartId || !isString(cartId)) {
    throw new Error('Cart ID is required and must be a string');
  }
  
  // Existance & type check
  if (options && !isObject(options)) {
    throw new TypeError('Options argument must be an object');
  }
  
  this.apiKey = apiKey;
  this.cartKey = cartId;
  this.options = extend({}, DEFAULTS, options);
    
  // email auto detect plugin
  if (this.options.autoDetectEmail) {
    this.use(require('email'));
  }
    
  return this;
};

/**
 * Middleware attachment method
 *
 * @method use
 *
 * @param  {Function} callback Callback passing Recapture instance
 *
 * @return {Object} Recapture instance
 */
Recapture.prototype.use = function(callback) {
  callback(this);
  
  return this;
};

/**
 * Track a users cart information
 *
 * @method cart
 *
 * @param {Object} additional Additional cart information
 *
 * @return {Object} Recapture instance for method chaining
 */
Recapture.prototype.cart = function(additional) {
  // Type check
  if (additional && !isObject(additional)) {
    throw new TypeError('[properties] passed into .cart() must be an object');
  }
    
  this.track('cart', additional);
  
  return this;
};

/**
 * Track a cart conversion
 *
 * @method conversion
 *
 * @param {Object} additional Additional conversion information
 *
 * @return {Object} Recapture instance for method chaining
 */
Recapture.prototype.conversion = function(additional) {
  // Type check
  if (additional && !isObject(additional)) {
    throw new TypeError('[properties] passed into .conversion() must be an object');
  }
  
  this.track('conversion', additional);
  
  return this;
};

/**
 * Track a customers email
 *
 * @method email
 *
 * @param {String} email The email address we want to track
 * @param {Object} additional Additional email information
 *
 * @return {Object} Recapture instance for method chaining
 */
Recapture.prototype.email = function(email, additional) {
  // Existance check
  if (!email) {
    
    if (this.options.debug){
      throw new Error('[email] passed into .email() is required');
    } else {
      return this;
    }
  }
  
  // Validation check
  if (!isEmail(email)) {
    if (this.options.debug){
      throw new Error('Invalid email passed in the .email() method');
    } else {
      return this;
    }
  }
  
  // Type check
  if (additional && !isObject(additional)) {
    throw new TypeError('[properties] passed into .email() must be an object');
  }
  
  additional = extend({}, { email: email });
  this.track('email', additional);
  
  return this;
};

/**
 * Generic method to send our information to recapture's api beacon
 *
 * @method track
 *
 * @param {String} endpoint The api endpoint url segment
 * @param {Object} data Data we want to send in the post request
 * @param {Function} callback Callback to hook into successful XHR response
 */
Recapture.prototype.track = function(endpoint, data, callback) {
  var protocol = document.location.protocol === 'https:' ? 'https://' : 'http://';
  var url = protocol + 'recapture.io/beacon/' + endpoint;
  
  // make sure we attach cart_id to beacon call
  data = extend({}, data, { external_id: this.cartKey });
  
  if (this.options.debug) {
    console.info('Endpoint URL:', url);
    console.info('Endpoint payload:', data);
  } else {
    request.post(url, data, {
      dataType: 'json',
      responseType: 'json',
      headers: { 'Api-Key': this.apiKey }
    })
    .then(callback)
    .catch(function(xhr, response, err) {
      if (err) {
        throw new Error('Error with beacon request: ' + err.stack);
      }
    });
  }
};

module.exports = Recapture;
