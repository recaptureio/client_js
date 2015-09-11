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
