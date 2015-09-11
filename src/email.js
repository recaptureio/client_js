'use strict';

var eventListener = require('eventlistener');

/**
 * Recapture constructor
 *
 * @method Recapture
 *
 * @param {Object} recapture Recapture instance
 */
function Email(recapture) {
  this.recapture = recapture;
  this.init();
}

/**
 * Initialize
 *
 * @method init
 */
Email.prototype.init = function() {
  this.timers = [];
  this.nodes = null;

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
Email.prototype.findNodes = function() {
  this.nodes = document.getElementsByTagName('input');
};

/**
 * Attaches event listeners to our found nodes and adds a placeholder timer for
 * our setTimeout on keyup
 *
 * @method attachListeners
 */
Email.prototype.attachListeners = function() {
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
Email.prototype.waitForTyping = function(e) {
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
Email.prototype.done = function(value) {
  this.recapture.email(value);
};

module.exports = function(recapture) {
  return new Email(recapture);
};
