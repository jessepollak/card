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
    numberInput: 'input#number', // optional — default input[name="number"]
    expiryInput: 'input#expiry', // optional — default input[name="expiry"]
    cvcInput: 'input#cvc', // optional — default input[name="cvc"]
    nameInput: 'input#name', // optional - defaults input[name="name"]

    width: 200, // optional — default 350px
    formatting: true // optional - default true
});
```

## Development

To contribute, follow this steps:

```bash
$ git clone git@github.com:jessepollak/card.git
$ cd card
$ git submodule init
$ git submodule update
$ npm install
$ npm start
```

Now, if you go to localhost:8080/example in your browser, you should see the demo page.

## Places using Card

Card is used in the wild in these following places:

* [InspectAll](http://www.inspectall.com/)

Are you using Card in production? If so, we'd love to link to you from this page. Open a PR or drop [@jessepollak](http://twitter.com/jessepollak) a line on [Twitter](http://twitter.com/jessepollak) and we'll add you right away!
