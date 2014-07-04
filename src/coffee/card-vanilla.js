var payment = (function() {
	'use strict';

	var payment = {

		formatCardNumber: function(){
			console.log('Need to do formatCardNumber');
		},

		formatCardCVC: function(){
			console.log('Need to do formatCardCVC');
		},

		formatCardExpiry: function(){
			console.log('Need to do formatCardExpiry');
		}

	};

	return Object.create(payment);
})();

var card = (function(){

	'use strict';

	var inputFields = {},
		cardSelectors = {},
		cardObj, cardTypes, cardTemplate, settings, pluginContainer, cardContainer;

	cardTypes = ['maestro', 'dinersclub', 'laser', 'jcb', 'unionpay', 'discover', 'mastercard', 'amex', 'visa'];
	cardTemplate = '<div class="card-container">\
		<div class="card">\
			<div class="front">\
				<div class="card-logo visa">visa</div>\
				<div class="card-logo mastercard">MasterCard</div>\
				<div class="card-logo amex"></div>\
				<div class="card-logo discover">discover</div>\
				<div class="lower">\
					<div class="shiny"></div>\
					<div class="cvc display">{{cvc}}</div>\
					<div class="number display">{{number}}</div>\
					<div class="name display">{{name}}</div>\
					<div class="expiry display" data-before="{{monthYear}}" data-after="{{validDate}}">{{expiry}}</div>\
				</div>\
			</div>\
			<div class="back">\
				<div class="bar"></div>\
				<div class="cvc display">{{cvc}}</div>\
				<div class="shiny"></div>\
			</div>\
		</div>\
	</div>';

	settings = {
		formatting: true,
		container: false,
		formSelectors: {
			numberInput: 'input[name="number"]',
			expiryInput: 'input[name="expiry"]',
			cvcInput: 'input[name="cvc"]',
			nameInput: 'input[name="name"]'
		},
		cardSelectors: {
			cardContainer: '.card-container',
			card: '.card',
			numberDisplay: '.number',
			expiryDisplay: '.expiry',
			cvcDisplay: '.cvc',
			nameDisplay: '.name'
		},
		messages: {
			validDate: 'valid\nthru',
			monthYear: 'month/year',
		},
		values: {
			number: '&bull;&bull;&bull;&bull; &bull;&bull;&bull;&bull; &bull;&bull;&bull;&bull; &bull;&bull;&bull;&bull;',
			cvc: '&bull;&bull;&bull;',
			expiry: '&bull;&bull;/&bull;&bull;',
			name: 'Full Name'
		},
		classes: {
			valid: 'card-valid',
			invalid: 'card-invalid'
		}
	};

	// We can use https://www.npmjs.org/package/extend as a dependence too
	function extend() {
		var src,
			copyIsArray,
			copy,
			name,
			options,
			clone,
			target = arguments[0] || {},
			i = 1,
			length = arguments.length,
			deep = false;

		if ( typeof target === 'boolean' ) {
			deep = target;
			target = arguments[ i ] || {};
			i++;
		}

		if ( typeof target !== 'object' && typeof target !== 'function' ) {
			target = {};
		}

		if ( i === length ) {
			target = this;
			i--;
		}

		for ( ; i < length; i++ ) {
			if ( (options = arguments[ i ]) != null ) {
				for ( name in options ) {
					src = target[ name ];
					copy = options[ name ];

					if ( target === copy ) {
						continue;
					}

					if (
						deep &&
						copy &&
						(
							(
								typeof copy !== 'object' ||
								copy.nodeType ||
								(copy != null && copy === copy.window)
							) ||
							( copyIsArray = Array.isArray(copy) )
						)
					) {
						if ( copyIsArray ) {
							copyIsArray = false;
							clone = src && Array.isArray(src) ? src : [];
						} else {
							clone = (
								src &&
								(
									typeof src !== 'object' ||
									src.nodeType ||
									(src != null && src === src.window)
								)
							) ? src : {};
						}

						target[ name ] = this.extend( deep, clone, copy );

					} else if ( copy !== undefined ) {
						target[ name ] = copy;
					}
				}
			}
		}
		return target;
	}

	cardObj = {

		init: function(container, userSettings){

			extend(settings, userSettings);
			pluginContainer = document.querySelector(container);
			cardContainer = document.querySelector(settings.container);

			var hasInitError = this.handlerInitErrors();
			if(!hasInitError){
				this.render();
				//this.attachHandlers();
				//this.handleInitialValues();
			}

		},

		handlerInitErrors: function() {
			var hasErrors = false;

			if(!pluginContainer || !cardContainer){
				console.error('Please provide a container');
				hasErrors = true;
			}

			Object.getOwnPropertyNames(settings.formSelectors).forEach(function(el){
				var thisElement = document.querySelectorAll(settings.formSelectors[el]);
				if(!thisElement){
					console.error('Card can\'t find a ' + el + ' in your form.');
					hasErrors = true;
				} else {
					inputFields[el] = thisElement;
				}
			});

			if(settings.formatting){
				payment.formatCardNumber(inputFields.numberInput);
				payment.formatCardCVC(inputFields.cvcInput);
				if (inputFields.expiryInput.length === 1) {
					payment.formatCardExpiry(inputFields.expiryInput);
				}
			}

			return hasErrors;
		},

		templateHelper: function() {
			var translatableStrings = extend(settings.messages, settings.values),
				finalTemplate;

			finalTemplate = cardTemplate.replace(/\{\{(.*?)\}\}/g, function(match, key) {
				return translatableStrings[key];
			});

			return finalTemplate;
		},

		render: function(){
			var renderedTemplate = this.templateHelper(),
				baseWidth, scaleValue, userAgent;

			cardContainer.innerHTML = renderedTemplate;
			this.registerCardElements();

			if (settings.width) {
				baseWidth = parseInt(cardSelectors.cardContainer[0].clientWidth, 10);
				scaleValue = settings.width / baseWidth;

				cardSelectors.cardContainer[0].style.transform = 'scale(' + scaleValue + ')';
				cardSelectors.cardContainer[0].style.webkitTransform = 'scale(' + scaleValue + ')';
				cardSelectors.cardContainer[0].style.MozTransform = 'scale(' + scaleValue + ')';
				cardSelectors.cardContainer[0].style.msTransform = 'scale(' + scaleValue + ')';
				cardSelectors.cardContainer[0].style.OTransform = 'scale(' + scaleValue + ')';
			}

			if (typeof navigator !== 'undefined' && navigator !== null ? navigator.userAgent : void 0) {
				userAgent = navigator.userAgent.toLowerCase();
				if (userAgent.indexOf('safari') !== -1 && userAgent.indexOf('chrome') === -1) {
					if (cardSelectors.card.classList){
						cardSelectors.card.classList.add('no-radial-gradient');
					} else{
						cardSelectors.card.className += ' no-radial-gradient' ;
					}
				}
			}
		},

		registerCardElements: function(){
			Object.getOwnPropertyNames(settings.cardSelectors).forEach(function(el){
				cardSelectors[el] = document.querySelectorAll(settings.cardSelectors[el]);
			});
		}

	};

	return cardObj;

})();

window.card = Object.create(card);