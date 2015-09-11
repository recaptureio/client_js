### SCRIPT INFO

- 5.9kb in filesize (minified & gzipped)
- low memory footprint
- no global overrides
- no native prototype overrides

### EXAMPLE USE
```html
<script type="text/javascript" src="//cdn.recapture.io/loader.min.js"></script>
<script>
  // init must be called first
  recapture.init(
    'your-api-key-here',
    'customer-cart-id-here',
    {} // options (not required)
  );
  
  recapture.conversion({
    cart_id: 'cart-id-here'
  });
  
  recapture.cart({
    cart_id: 'cart-id-here',
    grand_total: '12345.23'
  });
  
  // only used if autoDetectEmail is set to false in options
  // otherwise this is called automatically internally
  recapture.email({
    email: 'email-here'
  });
</script>
```
