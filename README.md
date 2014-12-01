# Card - check out the **[demo](https://jessepollak.github.io/card)**
### A better credit card form in one line of code

Card will take *any* credit card form and make it the best part of the checkout process (without you changing anything). Everything is created with pure CSS, HTML, and Javascript — no images required.

![card](http://i.imgur.com/qG3TenO.gif)

## Usage

To use, you'll need to include the correct CSS and Javascript files into your HTML. You can find the necessary files at `/lib/js/card.js` and `/lib/css/card.css` and include them in your HTML like so.

```html
<!-- in HEAD -->
<link rel="stylesheet" href="/path/to/card.css">
<!-- at the end of BODY -->
<script src="/path/to/jquery.js"></script>
<script src="/path/to/card.js"></script>
```

Once you've included those files, you can initialize Card.

```javascript
$('form').card({
    // a selector or jQuery object for the container
    // where you want the card to appear
    container: '.card-wrapper', // *required*

    formSelectors: {
        numberInput: 'input#number', // optional — default input[name="number"]
        expiryInput: 'input#expiry', // optional — default input[name="expiry"]
        cvcInput: 'input#cvc', // optional — default input[name="cvc"]
        nameInput: 'input#name' // optional - defaults input[name="name"]
    }

    width: 200, // optional — default 350px
    formatting: true, // optional - default true

    // Strings for translation - optional
    messages: {
        validDate: 'valid\ndate', // optional - default 'valid\nthru'
        monthYear: 'mm/yyyy', // optional - default 'month/year'
    },

    // Default values for rendered fields - options
    values: {
        number: '•••• •••• •••• ••••',
        name: 'Full Name',
        expiry: '••/••',
        cvc: '•••'
    },

    debug: false // if true, will log helpful messages for setting up Card
});
```

### Using multiple inputs for one field

Card can be used in forms where you have multiple inputs that render to a single field (i.e. you have a first and last name input). To use Card with this functionality, just pass in a jQuery selector that selects the fields in the correct order. For example,

```html
<form>
    <input type="text" name="number">
    <input type="text" name="first-name"/>
    <input type="text" name="last-name"/>
    <input type="text" name="expiry"/>
    <input type="text" name="cvc"/>
</form>
<script>
$('form').card({
    container: '.card-wrapper',
    
    formSelectors: {
        nameInput: 'input[name="first-name"], input[name="last-name"]'
    }
});
</script>
```

### Rendering with different initial card values

Card renders with default values for card `name`, `number`, `expiry`, and `cvc`. To override these values, you can either pass in a `values` object or set `$.card.values` before initializing `card`. Do one or the other, not both.

```html
<script src="/path/to/card.js"></script>
<form>
    <input type="text" name="number">
    <input type="text" name="name"/>
    <input type="text" name="expiry"/>
    <input type="text" name="cvc"/>
</form>
<script>
// setting $.card.values is one way to override
// the default card values
$.card.values = {
    number: '**** **** **** ****',
    name: 'Arya Stark',
    expiry: '**/****',
    cvc: '***'
}

$('form').card({
    container: '.card-wrapper',

    // passing in a messages object is another way to 
    // override the default card values
    values: {
        number: '**** **** **** ****',
        name: 'Arya Stark',
        expiry: '**/****',
        cvc: '***'
    }
});
</script>
```

### Translation

To render the card with the strings in a different language, you can either pass in a `messages` object or set `$.card.messages` before initializing `card`. Do one or the other, not both.

```html
<script src="/path/to/card.js"></script>
<form>
    <input type="text" name="number">
    <input type="text" name="name"/>
    <input type="text" name="expiry"/>
    <input type="text" name="cvc"/>
</form>
<script>
// setting $.card.messages is one way to override
// the default field names
$.card.messages = {
    validDate: 'expire\ndate',
    monthYear: 'mm/yy'
}

$('form').card({
    container: '.card-wrapper',

    // passing in a messages object is another way to 
    // override the default field names
    messages: {
        validDate: 'expire\ndate',
        monthYear: 'mm/yy'
    }
});
</script>
```

## Development

To contribute, follow this steps:

```bash
$ git clone --recursive https://github.com/jessepollak/card.git
$ cd card
$ git submodule init && git submodule update
$ npm install
$ npm start
```

Now, if you go to localhost:8080/example in your browser, you should see the demo page.

## Places using Card

Card is used in the wild in these places:

* [InspectAll](http://www.inspectall.com/)
* [PennyWhale](https://www.pennywhale.com/)
* [MakeSpace &ndash; Your Closet in the Cloud](https://www.makespace.com/)
* [Blumpa](http://www.blumpa.com/)
* [CourseLoads &ndash; Clean Clothes, Delivered to your Door.](http://www.courseloads.com/)

Are you using Card in production? If so, we'd love to link to you from this page. Open a PR or drop [@jessepollak](http://twitter.com/jessepollak) a line on [Twitter](http://twitter.com/jessepollak) and we'll add you right away!

## Acknowledgements

This library depends on, and bundles, [Stripe's jquery.payment library](https://github.com/stripe/jquery.payment) — thanks [Stripe](https://stripe.com)!

## Donations

If you'd like to donate to help support development of Card, send Bitcoin directly to `17NUKd3v7GWben18kGhmFafa4ZpWrXpQSC` or through Coinbase [here](https://coinbase.com/jessepollak).
