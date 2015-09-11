/*! Recapture.io v1.0.3 | MIT & BSD */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define(factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/***/ function(module, exports) {

	(function() {
	   var recapture = window.recapture = window.recapture || [];
	           
	   recapture.methods = [
	     'init',
	     'conversion',
	     'email',
	     'cart'
	   ];
	   
	   // Define a factory to create stubs. These are placeholders
	   // for methods in Recapture.js so that you never have to wait
	   // for it to load to actually record data. The `method` is
	   // stored as the first argument, so we can replay the data
	   recapture.factory = function(method) {
	     return function(){
	       var args = Array.prototype.slice.call(arguments);
	       args.unshift(method);
	       recapture.push(args);
	       return recapture;
	     };
	   };
	   
	   // For each of our methods, generate a queueing stub
	   for (var i = 0; i < recapture.methods.length; i++) {
	     var key = recapture.methods[i];
	     recapture[key] = recapture.factory(key);
	   }
	   
	   // Define a method to load Recapture.js from our CDN,
	   // and that will be sure to only ever load it once
	   recapture.load = function() {
	     var script = document.createElement('script');
	     script.type = 'text/javascript';
	     script.async = true;
	     script.src = '//cdn.recapture.io/v1/recapture.min.js';

	     document.body.appendChild(script);
	   };
	   
	   recapture.load();
	})();


/***/ }
/******/ ])
});
;