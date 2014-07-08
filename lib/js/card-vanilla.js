(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var hasOwn = Object.prototype.hasOwnProperty;
var toString = Object.prototype.toString;
var undefined;

var isPlainObject = function isPlainObject(obj) {
	"use strict";
	if (!obj || toString.call(obj) !== '[object Object]' || obj.nodeType || obj.setInterval) {
		return false;
	}

	var has_own_constructor = hasOwn.call(obj, 'constructor');
	var has_is_property_of_method = obj.constructor && obj.constructor.prototype && hasOwn.call(obj.constructor.prototype, 'isPrototypeOf');
	// Not own constructor property must be Object
	if (obj.constructor && !has_own_constructor && !has_is_property_of_method) {
		return false;
	}

	// Own properties are enumerated firstly, so to speed up,
	// if last one is own, then all properties are own.
	var key;
	for (key in obj) {}

	return key === undefined || hasOwn.call(obj, key);
};

module.exports = function extend() {
	"use strict";
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[0],
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if (typeof target === "boolean") {
		deep = target;
		target = arguments[1] || {};
		// skip the boolean and the target
		i = 2;
	} else if (typeof target !== "object" && typeof target !== "function" || target == undefined) {
			target = {};
	}

	for (; i < length; ++i) {
		// Only deal with non-null/undefined values
		if ((options = arguments[i]) != null) {
			// Extend the base object
			for (name in options) {
				src = target[name];
				copy = options[name];

				// Prevent never-ending loop
				if (target === copy) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if (deep && copy && (isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {
					if (copyIsArray) {
						copyIsArray = false;
						clone = src && Array.isArray(src) ? src : [];
					} else {
						clone = src && isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[name] = extend(deep, clone, copy);

				// Don't bring in undefined values
				} else if (copy !== undefined) {
					target[name] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};


},{}],2:[function(require,module,exports){
var card, payment;

payment = (function() {
  "use strict";
  payment = {
    formatCardNumber: function() {
      console.log("Need to do formatCardNumber");
    },
    formatCardCVC: function() {
      console.log("Need to do formatCardCVC");
    },
    formatCardExpiry: function() {
      console.log("Need to do formatCardExpiry");
    }
  };
  return Object.create(payment);
})();

card = (function() {
  "use strict";
  var cardContainer, cardObj, cardSelectors, cardTemplate, cardTypes, extend, inputFields, pluginContainer, settings;
  extend = require('extend');
  inputFields = {};
  cardSelectors = {};
  pluginContainer = void 0;
  cardContainer = void 0;
  cardTypes = ["maestro", "dinersclub", "laser", "jcb", "unionpay", "discover", "mastercard", "amex", "visa"];
  cardTemplate = "<div class=\"card-container\">\n  <div class=\"card\">\n    <div class=\"front\">\n      <div class=\"card-logo visa\">visa</div>\n      <div class=\"card-logo mastercard\">MasterCard</div>\n      <div class=\"card-logo amex\"></div>\n      <div class=\"card-logo discover\">discover</div>\n      <div class=\"lower\">\n        <div class=\"shiny\"></div>\n        <div class=\"cvc display\">{{cvc}}</div>\n        <div class=\"number display\">{{number}}</div>\n        <div class=\"name display\">{{name}}</div>\n        <div class=\"expiry display\" data-before=\"{{monthYear}}\" data-after=\"{{validDate}}\">{{expiry}}</div>\n      </div>\n    </div>\n    <div class=\"back\">\n      <div class=\"bar\"></div>\n      <div class=\"cvc display\">{{cvc}}</div>\n      <div class=\"shiny\"></div>\n    </div>\n  </div>\n</div>";
  settings = {
    formatting: true,
    container: false,
    formSelectors: {
      numberInput: "input[name=\"number\"]",
      expiryInput: "input[name=\"expiry\"]",
      cvcInput: "input[name=\"cvc\"]",
      nameInput: "input[name=\"name\"]"
    },
    cardSelectors: {
      cardContainer: ".card-container",
      card: ".card",
      numberDisplay: ".number",
      expiryDisplay: ".expiry",
      cvcDisplay: ".cvc",
      nameDisplay: ".name"
    },
    messages: {
      validDate: "valid\nthru",
      monthYear: "month/year"
    },
    values: {
      number: "&bull;&bull;&bull;&bull; &bull;&bull;&bull;&bull; &bull;&bull;&bull;&bull; &bull;&bull;&bull;&bull;",
      cvc: "&bull;&bull;&bull;",
      expiry: "&bull;&bull;/&bull;&bull;",
      name: "Full Name"
    },
    classes: {
      valid: "card-valid",
      invalid: "card-invalid"
    }
  };
  cardObj = {
    init: function(container, userSettings) {
      var hasInitError;
      extend(settings, userSettings);
      pluginContainer = document.querySelector(container);
      cardContainer = document.querySelector(settings.container);
      hasInitError = this.handlerInitErrors();
      if (!hasInitError) {
        this.render();
      }
    },
    handlerInitErrors: function() {
      var hasErrors;
      hasErrors = false;
      if (!pluginContainer || !cardContainer) {
        console.error("Please provide a container");
        hasErrors = true;
      }
      Object.getOwnPropertyNames(settings.formSelectors).forEach(function(el) {
        var thisElement;
        thisElement = document.querySelectorAll(settings.formSelectors[el]);
        if (!thisElement) {
          console.error("Card can't find a " + el + " in your form.");
          hasErrors = true;
        } else {
          inputFields[el] = thisElement;
        }
      });
      if (settings.formatting) {
        payment.formatCardNumber(inputFields.numberInput);
        payment.formatCardCVC(inputFields.cvcInput);
        if (inputFields.expiryInput.length === 1) {
          payment.formatCardExpiry(inputFields.expiryInput);
        }
      }
      return hasErrors;
    },
    templateHelper: function() {
      var finalTemplate, translatableStrings;
      translatableStrings = extend(settings.messages, settings.values);
      finalTemplate = cardTemplate.replace(/\{\{(.*?)\}\}/g, function(match, key) {
        return translatableStrings[key];
      });
      return finalTemplate;
    },
    render: function() {
      var baseWidth, renderedTemplate, scaleValue, userAgent;
      renderedTemplate = this.templateHelper();
      cardContainer.innerHTML = renderedTemplate;
      this.registerCardElements();
      if (settings.width) {
        baseWidth = parseInt(cardSelectors.cardContainer[0].clientWidth, 10);
        scaleValue = settings.width / baseWidth;
        cardSelectors.cardContainer[0].style.transform = "scale(" + scaleValue + ")";
        cardSelectors.cardContainer[0].style.webkitTransform = "scale(" + scaleValue + ")";
        cardSelectors.cardContainer[0].style.MozTransform = "scale(" + scaleValue + ")";
        cardSelectors.cardContainer[0].style.msTransform = "scale(" + scaleValue + ")";
        cardSelectors.cardContainer[0].style.OTransform = "scale(" + scaleValue + ")";
      }
      if ((typeof navigator !== "undefined" && navigator !== null ? navigator.userAgent : void 0)) {
        userAgent = navigator.userAgent.toLowerCase();
        if (userAgent.indexOf("safari") !== -1 && userAgent.indexOf("chrome") === -1) {
          cardSelectors.card.classList.add("no-radial-gradient");
        }
      }
    },
    registerCardElements: function() {
      Object.getOwnPropertyNames(settings.cardSelectors).forEach(function(el) {
        cardSelectors[el] = document.querySelectorAll(settings.cardSelectors[el]);
      });
    },
    attachHandlers: function() {},
    bindVal: function(thisElement, outElement, options) {
      var el, joiner, outDefaults;
      el = document.querySelectorAll(thisElement)[0];
      if (!options) {
        options = {};
      }
      options.fill = options.fill || false;
      options.filters = options.filters || [];
      options.join = options.join || "";
      if (!Array.isArray(options.filters)) {
        options.filters = [options.filters];
      }
      if (typeof options.join !== "function") {
        joiner = options.join;
        options.join = function() {
          return joiner;
        };
      }
      outDefaults = (function() {
        var arrayOfDefault;
        arrayOfDefault = [];
        Object.getOwnPropertyNames(settings.values).forEach(function(el) {
          arrayOfDefault.push(settings.values[el]);
        });
        return arrayOfDefault;
      })();
      el.addEventListener("focus", function() {
        this.classList.add("focused");
      });
      el.addEventListener("blur", function() {
        this.classList.remove("focused");
      });
      el.addEventListener("input", function(ev) {});
    }
  };
  return cardObj;
})();

window.card = Object.create(card);


},{"extend":1}]},{},[2])