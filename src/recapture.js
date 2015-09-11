'use strict';

/**
 * 3rd party libs
 */
var isEmail = require('check-email-valid');
var isObject = require('lodash.isplainobject');
var extend = require('extend');
var request = require('superagent');

/**
 * Recapture default options
 */
var DEFAULTS = {
  autoDetectEmail: false
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
  
  if (!apiKey || isObject(apiKey)) {
    throw new Error('API Key is required');
  }
  
  if (!cartId || isObject(cartId)) {
    throw new Error('Cart ID is required');
  }
  
  if (!isObject(options)) {
    throw new TypeError('Options argument must be an object');
  }
  
  this.key = apiKey;
  this.cart = cartId;
  this.debugging = false;
  this.options = extend({}, DEFAULTS, options);
    
  // email auto detect plugin
  if (this.options.autoDetectEmail) {
    this.use(require('email'));
  }
    
  return this;
};

/**
 * Put SDK in debug mode
 *
 * @method debug
 *
 * @return {Object} Recapture instance for method chaining
 */
Recapture.prototype.debug = function() {
  this.debugging = true;
  
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
  // type check props arg
  if (!isObject(additional)) {
    throw new TypeError('First argument passed into .cart() must be an object');
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
  // type check props arg
  if (!isObject(additional)) {
    throw new TypeError('First argument passed into .conversion() must be an object');
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
  
  // type check props arg
  if (!isObject(additional)) {
    throw new TypeError('Second argument passed into .email() must be an object');
  }
  
  // verify at least email is being passed in
  if (!email) {
    throw new Error('First argument passed into .email() is required');
  }
  
  // if were not auto detecting make sure that were getting a valid email
  if (!this.options.autoDetectEmail) {
    if (!isEmail(email)) {
      throw new TypeError('Invalid email passed in the .email() method');
    }
  }
  
  additional.email = email;
  
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
 */
Recapture.prototype.track = function(endpoint, data) {
  var protocol = document.location.protocol === 'https:' ? 'https://' : 'http://';
  var url = protocol + 'recapture.io/beacon/' + endpoint;
  
  // make sure we attach cart_id to beacon call
  data.external_id = this.cart;
  
  if (this.debugging) {
    console.info('Endpoint URL:', url);
    console.info('Endpoint payload:', data);
  } else {
    request
      .post(url)
      .set('Api-Key', this.key)
      .type('json')
      .send(data)
      .end(function(err) {
        if (err) {
          throw new Error('Error with beacon request: ' + err.message);
        }
      });
  }
};

module.exports = Recapture;
