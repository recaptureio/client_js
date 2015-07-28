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
  autoDetectEmail: true
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
 * @param {String} invoiceId Current invoice id you want to track
 *
 * @return {Object} Recapture instance for method chaining
 */
Recapture.prototype.init = function(apiKey, options) {
  this.key = apiKey;
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
 * @param {Object} data Cart information
 *
 * @return {Object} Recapture instance for method chaining
 */
Recapture.prototype.cart = function(data) {
  // type check props arg
  if (!isObject(data)) {
    throw new TypeError('First argument passed into .cart() must be an object');
  }
  
  // verify at least a cart_id is being passed in
  if (!data.hasOwnProperty('cart_id')) {
    throw new Error('.cart() method requires a cart_id');
  }
    
  this.track('cart', data);
  
  return this;
};

/**
 * Track a users conversion
 *
 * @method conversion
 *
 * @param {Object} data Conversion information
 *
 * @return {Object} Recapture instance for method chaining
 */
Recapture.prototype.conversion = function(data) {
  // type check props arg
  if (!isObject(data)) {
    throw new TypeError('First argument passed into .conversion() must be an object');
  }
  
  // verify at least a cart_id is being passed in
  if (!data.hasOwnProperty('cart_id')) {
    throw new Error('.conversion() method requires a cart_id');
  }
  
  this.track('conversion', data);
  
  return this;
};

/**
 * Track a users email
 *
 * @method email
 *
 * @param {Object} data Email information
 *
 * @return {Object} Recapture instance for method chaining
 */
Recapture.prototype.email = function(data) {
  
  // type check props arg
  if (!isObject(data)) {
    throw new TypeError('First argument passed into .conversion() must be an object');
  }
  
  // verify at least email is being passed in
  if (!data.hasOwnProperty('email')) {
    throw new Error('.email() method requires a email');
  }
  
  // if were not auto detecting make sure that were getting a valid email
  if (!this.options.autoDetectEmail) {
    if (!isEmail(data.email)) {
      throw new TypeError('Invalid email passed in the .email() method');
    }
  }
  
  this.track('email', data);
  
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
  var url = protocol + 'localhost:4000/beacon/' + endpoint;
      
  // request
  //   .post(url)
  //   .set('Api-Key', this.key)
  //   .type('json')
  //   .send(data)
  //   .end(function(err) {
  //     if (err) {
  //       throw new Error('Error with beacon request: ' + err.message);
  //     }
  //   });
};

module.exports = Recapture;
