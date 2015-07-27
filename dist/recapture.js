var Recapture =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isEmail = __webpack_require__(1);
	var eventListener = __webpack_require__(2);

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


/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = function(emailString) {
	  var check, regExp;
	  regExp = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))){2,6}$/i;
	  return check = regExp.test(emailString);
	};


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;(function(root,factory){
	    if (true) {
	        !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof exports === 'object') {
	        module.exports = factory();
	    } else {
	        root.eventListener = factory();
	  }
	}(this, function () {
		function wrap(standard, fallback) {
			return function (el, evtName, listener, useCapture) {
				if (el[standard]) {
					el[standard](evtName, listener, useCapture);
				} else if (el[fallback]) {
					el[fallback]('on' + evtName, listener);
				}
			}
		}

	    return {
			add: wrap('addEventListener', 'attachEvent'),
			remove: wrap('removeEventListener', 'detachEvent')
		};
	}));

/***/ }
/******/ ]);