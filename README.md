# Card - check out the **[demo](https://jessepollak.github.io/card)**

*NOTE: The `master` branch of this repository is currently on `v1.0.0-beta`. Version 1.0.0 removes the jQuery dependence for the core library, but may have issues. If you don't want to use the beta, you can find code for the last stable release [here](https://github.com/jessepollak/card/releases/tag/v0.1.4) and documentation [here](https://github.com/jessepollak/card/blob/v0.1.4/README.md).*

### A better credit card form in one line of code

Card will take *any* credit card form and make it the best part of the checkout process (without you changing anything). Everything is created with pure CSS, HTML, and Javascript — no images required.

![card](http://i.imgur.com/qG3TenO.gif)

## Usage (without jQuery)

To use, you'll need to include the Card JavaScript files into your HTML. You can find the necessary file at `/lib/js/card.js` and include it in your HTML like so.

```html
<!-- at the end of BODY -->
<script src="/path/to/card.js"></script>
```

Once you've included those files, you can initialize Card.

```javascript
var card = new Card({
    // a selector or DOM element for the form where users will
    // be entering their information
    form: 'form', // *required*
    // a selector or DOM element for the container
    // where you want the card to appear
    container: '.card-wrapper', // *required*

    formSelectors: {
        numberInput: 'input#number', // optional — default input[name="number"]
        expiryInput: 'input#expiry', // optional — default input[name="expiry"]
        cvcInput: 'input#cvc', // optional — default input[name="cvc"]
        nameInput: 'input#name' // optional - defaults input[name="name"]
    },

    width: 200, // optional — default 350px
    formatting: true, // optional - default true

    // Strings for translation - optional
    messages: {
        validDate: 'valid\ndate', // optional - default 'valid\nthru'
        monthYear: 'mm/yyyy', // optional - default 'month/year'
    },

    // Default values for rendered fields - optional
    values: {
        number: '•••• •••• •••• ••••',
        name: 'Full Name',
        expiry: '••/••',
        cvc: '•••'
    },

    // if true, will log helpful messages for setting up Card
    debug: false // optional - default false
});
```
### Installing card from npm

If you're using npm, you can install card.js with:

    npm install --save card

	var $ = require("jquery");
    // The current card.js code does not explictly require jQuery, but instead uses the global, so this line is needed.
    window.jQuery = $;
    var card = require("card");
    
### Using multiple inputs for one field

Card can be used in forms where you have multiple inputs that render to a single field (i.e. you have a first and last name input). To use Card with this functionality, just pass in a selector that selects the fields in the correct order. For example,

```html
<script src="/path/to/card.js"></script>
<form>
    <input type="text" name="number">
    <input type="text" name="first-name"/>
    <input type="text" name="last-name"/>
    <input type="text" name="expiry"/>
    <input type="text" name="cvc"/>
</form>
<script>
var card = new Card({
    form: 'form',
    container: '.card-wrapper',
    
    formSelectors: {
        nameInput: 'input[name="first-name"], input[name="last-name"]'
    }
});
</script>
```

### Rendering with different initial card values

Card renders with default values for card `name`, `number`, `expiry`, and `cvc`. To override these values, you can pass in a `values` object.

```html
<script src="/path/to/card.js"></script>
<form>
    <input type="text" name="number">
    <input type="text" name="name"/>
    <input type="text" name="expiry"/>
    <input type="text" name="cvc"/>
</form>
<script>

var card = new Card({
    form: 'form',
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

To render the card with the strings in a different language, you can pass in a `messages` object.

```html
<script src="/path/to/card.js"></script>
<form>
    <input type="text" name="number">
    <input type="text" name="name"/>
    <input type="text" name="expiry"/>
    <input type="text" name="cvc"/>
</form>
<script>

var card = new Card({
    form: 'form',
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

## Using with jQuery

To use with jQuery, you'll need to include the `jquery.card.js` file into your HTML. You can find the necessary file at `/lib/js/jquery.card.js` and include it in your HTML like so.

```html
<!-- at the end of BODY -->
<script src="/path/to/jquery.card.js"></script>
```

Once you've included those files, you can initialize Card with jQuery.

```javascript
$('form').card({
    // a selector or DOM element for the container
    // where you want the card to appear
    container: '.card-wrapper', // *required*

    // all of the other options from above
});
   
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
* [MakeSpace](https://www.makespace.com/)
* [Blumpa](http://www.blumpa.com/)
* [CourseLoads](http://www.courseloads.com/)
* [PubNub](http://pubnub.com/)
* [GigSalad](https://www.gigsalad.com)

Are you using Card in production? If so, we'd love to link to you from this page. Open a PR or drop [@jessepollak](http://twitter.com/jessepollak) a line on [Twitter](http://twitter.com/jessepollak) and we'll add you right away!

## Donations

If you'd like to donate to help support development of Card, send Bitcoin directly to `17NUKd3v7GWben18kGhmFafa4ZpWrXpQSC` or through Coinbase [here](https://coinbase.com/jessepollak).
