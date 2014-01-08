# Card — make things easy

Card will take *any* shitty credit card form and make it the best part of the checkout process (without you changing anything). Created using only CSS and Javascript with **0 images** or canvas elements.

![card](http://gifti.me/i/CHpVn6QcI.gif)


## Usage

```javascript
$('form').card({
    // a selector or jQuery object for the container 
    // where you want the card to appear
    container: '.card-wrapper', // *required*
    numberInput: 'input#number', // optional — default input[name="number"]
    expiryInput: 'input#expiry', // optional — default input[name="expiry"]
    cvcInput: 'input#cvc', // optional — default input[name="cvc"]
    nameInput: 'input#name', // options - defaults input[name="name"]

    width: 200, // optional — default 350px
    formatting: true // optional - default true
});
```

## Development

```bash
$ git clone git@github.com:jessepollak/card.git
$ cd card
$ npm install
$ bower install
$ grunt
```