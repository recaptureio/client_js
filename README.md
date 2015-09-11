# Recapture.io
#### SCRIPT INFO
- tiny size 5.6kb (minified & gzipped)
- low memory footprint
- no global overrides
- no native prototype overrides
- no load time performance impact for your site (library is loaded asynchronously)

#### GETTING STARTED
This tutorial will help you get up and running with Recapture in no time!

##### Step 1 - Load the script
First you will need to include our loader script that will asynchronously load the Recapture.io library into the footer or header of your site.

```html
<script type="text/javascript" src="//cdn.recapture.io/loader.min.js"></script>
```

##### Step 2 - Initialize Recapture
The `init` method is how Recapture knows who you are and what cart we are currently tracking. This method is required for recapture to accurately and effectively track customers and carts. We recommend calling this method as soon as possible.
```html
<script type="text/javascript">
  recapture.init(
    'your-recapture-api-key-here',
    'customer-cart-id-here',
    {} // settings (optional)
  );
</script>
```
Available settings are:

| key | type | default | description |
| --- | --- | --- | --- |
| autoDetectEmail | Boolean | false | Will tell Recapture to automatically detect any emails. |

##### Step 3 - Track conversions, emails, and carts

```html
<script type="text/javascript">
  // Capture a conversion
  recapture.conversion();
  
  // Capture an abandoned cart with cart details
  recapture.cart({
    grand_total: 113.42
  });
  
  // Capture a customer email with guest details
  // NOTE: this method is not needed if `autoDetectEmail` is set to true
  recapture.email({
    email: 'test@gmail.com',
    isGuest: true
  });
</script>
```
#### AVAILABLE METHODS

##### `.conversion()`
*Method signature*
```javascript
recapture.conversion([properties]);
```
- `properties` | {Object} | optional | Any additional data you want to pass along to Recapture regarding the conversion.

*Method example*
```javascript
recapture.conversion();
```

***

##### `.cart()`
*Method signature*
```javascript
recapture.cart([properties]);
```
- `properties` | {Object} | optional | Any additional data you want to pass along to Recapture regarding the cart such as grand_total or cart items.

*Method example*
```javascript
recapture.cart({
  grand_total: 173.63
});
```

***

##### `.email()`
*Method signature*
```javascript
recapture.email(email, [properties]);
```
- `email` | {String} | required | The customers email address.
- `properties` | {Object} | optional | Any additional data you want to pass along to Recapture regarding the email such as isGuest.

*Method example*
```javascript
recapture.email('test@gmail.com', {
  isGuest: true
});
```

###### *Note*
This method is not required to be explicitly called if you have autoDetectEmail set to true. Recapture will watch for emails automatically and send them off internally with this method.
