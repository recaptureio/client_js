'use strict';

var isEmail = require('check-email-valid');
var eventListener = require('eventlistener');

/**
 * Recapture constructor
 *
 * @method Recapture
 *
 * @param {String}  apiKey Clients api key
 */
function Recapture() {
  if (!(this instanceof Recapture)) {
    return new Recapture();
  }
}

/**
 * Self constructing factory method
 *
 * @method init
 *
 * @param {String}  apiKey Clients api key
 */
Recapture.prototype.init = function(apiKey) {
  this.timers = [];
  this.nodes = null;
  
  this.key = apiKey;
  this.findNodes();
  this.attachListeners();
  
  // we can do additional things here like determine if their api key is
  // valid or anything
};

/**
 * Gets all input elements on the page and assigns them to Recapture state
 *
 * @method findNodes
 */
Recapture.prototype.findNodes = function() {
  this.nodes = document.getElementsByTagName('input');
};

/**
 * Attaches event listeners to our found nodes and adds a placeholder timer for
 * our setTimeout on keyup
 *
 * @method attachListeners
 */
Recapture.prototype.attachListeners = function() {
  if (this.nodes && this.nodes.length) {
    for (var i = 0, len = this.nodes.length; i < len; i++) {
      
      // check to see if input already has a value prefilled
      if (this.nodes[i].value) {
        this.done.call(this, this.nodes[i].value);
      }
      
      eventListener.add(this.nodes[i], 'keyup', this.waitForTyping.bind(this));
      this.timers.push(0);
    }
  }
};

/**
 * Setup a timeout to wait until a user is done typing before we parse their
 * input value and determine if its an email
 *
 * @method waitForTyping
 *
 * @param {Object} e Event object
 */
Recapture.prototype.waitForTyping = function(e) {
  var value = e.target.value;
  
  for (var i = 0, len = this.nodes.length; i < len; i++) {
    if (this.nodes[i] === e.target) {
      clearTimeout(this.timers[i]);
      this.timers[i] = setTimeout(this.done.bind(this, value), 2000);
    }
  }
};

/**
 * Fires off when a timeout has ended and were ready to parse the inputs value
 * to determine if we have a valid email
 *
 * @method done
 *
 * @param {String} value Inputs value
 */
Recapture.prototype.done = function(value) {
  var check = isEmail(value);
  
  console.log(value);
  console.log(check);
  
  if (check) {
    alert('that was a valid email!');
    // send ajax request or do whatever here...
  }
};

module.exports = Recapture;
