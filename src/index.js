'use strict';

var Recapture = require('recapture');
var instance = new Recapture();

// Loop through the interim recapture queue and reapply the calls to the
// proper recapture.js method
if (window.recapture) {
  while (window.recapture.length > 0) {
    var data = window.recapture.shift();
    var method = data.shift();
    
    if (instance[method]) {
      instance[method].apply(instance, data);
    }
  }
}

module.exports = instance;
