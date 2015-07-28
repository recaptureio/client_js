### NON MINIFIED SCRIPT LOADER

```html
<script>
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
      // script.src = (
      //  document.location.protocol === 'https:' ? https://' : 'http://'
      // ) + 'cdn.recapture.io/sdk/v1/recapture.min.js';
      script.src = '../dist/recapture.js';

      document.body.appendChild(script);
    };
    
    recapture.load();
  })();
</script>
```

### MINIFIED SCRIPT LOADER

```html
<script>
  !function(){var t=window.recapture=window.recapture||[];t.methods=["init","conversion","email","cart"],t.factory=function(r){return function(){var e=Array.prototype.slice.call(arguments);return e.unshift(r),t.push(e),t}};for(var r=0;r<t.methods.length;r++){var e=t.methods[r];t[e]=t.factory(e)}t.load=function(){var t=document.createElement("script");t.type="text/javascript",t.async=!0,t.src="../dist/recapture.js",document.body.appendChild(t)},t.load()}();
</script>
```

### EXAMPLE USE
```html
<script>
  // init must be called
  recapture.init('your-api-key-here', options);
  
  recapture.conversion({
    cart_id: 'cart-id-here'
  });
  
  recapture.cart({
    cart_id: 'cart-id-here',
    grand_total: '12345.23'
  });
  
  recapture.email({
    email: 'email-here'
  });
</script>
```
