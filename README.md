# Recapture.io Client Side JS Library
#### SCRIPT INFO
- tiny size 6.5kb (minified & gzipped)
- little to no memory footprint
- no global overrides
- no native prototype overrides
- no load time performance impact for your site (library is loaded asynchronously)

#### GETTING STARTED
This tutorial will help you get up and running with Recapture in no time!

##### Step 1 - Load the script
First you will need to include our loader script that will asynchronously load the Recapture.io library.

```html
<script type="text/javascript" src="//cdn.recapture.io/loader.min.js"></script>
```

##### Step 2 - Initialize Recapture
The `init` method is how Recapture knows who you are and what cart we are currently tracking. This method is required for recapture to accurately and effectively track customers and carts. We recommend calling this method as soon as possible.
```html
<script type="text/javascript">
  recapture.init(
    'your-recapture-api-key',
    'customer-cart-id'
  );
  /*
  customer-cart-id in Magento is the quote ID.
  It's very important that this is passed through correctly,
  so we are able to retrieve the cart later on.
  */
</script>
```

##### Step 3 - Track conversions and carts

```html
<script type="text/javascript">
  // Track a cart
  recapture.cart({
    first_name: 'Quote First Name',
    last_name: 'Quote Last Name',
    email: 'email@somewhere.com',
    grand_total: 39.99,
    products: [
      {
        name: 'Product Name',
        sku: 'Product SKU',
        price: 39.99,
        qty: 1,
        image: 'www.path.to/product/image.jpg'
      },
      ..
    ]
  });

  // Track a conversion
  recapture.conversion();
</script>
```
#### AVAILABLE METHODS

##### `.conversion()`
*Method signature*
```javascript
recapture.conversion();
```

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
  first_name: 'Quote First Name',
  last_name: 'Quote Last Name',
  email: 'email@somewhere.com',
  grand_total: 39.99,
  products: [
    {
      name: 'Product Name',
      sku: 'Product SKU',
      price: 39.99,
      qty: 1,
      image: 'www.path.to/product/image.jpg'
    }
  ]
});
```
