(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = require('./lib/extend');


},{"./lib/extend":2}],2:[function(require,module,exports){
/*!
 * node.extend
 * Copyright 2011, John Resig
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * @fileoverview
 * Port of jQuery.extend that actually works on node.js
 */
var is = require('is');

function extend() {
  var target = arguments[0] || {};
  var i = 1;
  var length = arguments.length;
  var deep = false;
  var options, name, src, copy, copy_is_array, clone;

  // Handle a deep copy situation
  if (typeof target === 'boolean') {
    deep = target;
    target = arguments[1] || {};
    // skip the boolean and the target
    i = 2;
  }

  // Handle case when target is a string or something (possible in deep copy)
  if (typeof target !== 'object' && !is.fn(target)) {
    target = {};
  }

  for (; i < length; i++) {
    // Only deal with non-null/undefined values
    options = arguments[i]
    if (options != null) {
      if (typeof options === 'string') {
          options = options.split('');
      }
      // Extend the base object
      for (name in options) {
        src = target[name];
        copy = options[name];

        // Prevent never-ending loop
        if (target === copy) {
          continue;
        }

        // Recurse if we're merging plain objects or arrays
        if (deep && copy && (is.hash(copy) || (copy_is_array = is.array(copy)))) {
          if (copy_is_array) {
            copy_is_array = false;
            clone = src && is.array(src) ? src : [];
          } else {
            clone = src && is.hash(src) ? src : {};
          }

          // Never move original objects, clone them
          target[name] = extend(deep, clone, copy);

        // Don't bring in undefined values
        } else if (typeof copy !== 'undefined') {
          target[name] = copy;
        }
      }
    }
  }

  // Return the modified object
  return target;
};

/**
 * @public
 */
extend.version = '1.1.3';

/**
 * Exports module.
 */
module.exports = extend;


},{"is":3}],3:[function(require,module,exports){
/* globals window, HTMLElement */
/**!
 * is
 * the definitive JavaScript type testing library
 *
 * @copyright 2013-2014 Enrico Marino / Jordan Harband
 * @license MIT
 */

var objProto = Object.prototype;
var owns = objProto.hasOwnProperty;
var toStr = objProto.toString;
var symbolValueOf;
if (typeof Symbol === 'function') {
  symbolValueOf = Symbol.prototype.valueOf;
}
var isActualNaN = function (value) {
  return value !== value;
};
var NON_HOST_TYPES = {
  'boolean': 1,
  number: 1,
  string: 1,
  undefined: 1
};

var base64Regex = /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{4}|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)$/;
var hexRegex = /^[A-Fa-f0-9]+$/;

/**
 * Expose `is`
 */

var is = module.exports = {};

/**
 * Test general.
 */

/**
 * is.type
 * Test if `value` is a type of `type`.
 *
 * @param {Mixed} value value to test
 * @param {String} type type
 * @return {Boolean} true if `value` is a type of `type`, false otherwise
 * @api public
 */

is.a = is.type = function (value, type) {
  return typeof value === type;
};

/**
 * is.defined
 * Test if `value` is defined.
 *
 * @param {Mixed} value value to test
 * @return {Boolean} true if 'value' is defined, false otherwise
 * @api public
 */

is.defined = function (value) {
  return typeof value !== 'undefined';
};

/**
 * is.empty
 * Test if `value` is empty.
 *
 * @param {Mixed} value value to test
 * @return {Boolean} true if `value` is empty, false otherwise
 * @api public
 */

is.empty = function (value) {
  var type = toStr.call(value);
  var key;

  if (type === '[object Array]' || type === '[object Arguments]' || type === '[object String]') {
    return value.length === 0;
  }

  if (type === '[object Object]') {
    for (key in value) {
      if (owns.call(value, key)) { return false; }
    }
    return true;
  }

  return !value;
};

/**
 * is.equal
 * Test if `value` is equal to `other`.
 *
 * @param {Mixed} value value to test
 * @param {Mixed} other value to compare with
 * @return {Boolean} true if `value` is equal to `other`, false otherwise
 */

is.equal = function equal(value, other) {
  if (value === other) {
    return true;
  }

  var type = toStr.call(value);
  var key;

  if (type !== toStr.call(other)) {
    return false;
  }

  if (type === '[object Object]') {
    for (key in value) {
      if (!is.equal(value[key], other[key]) || !(key in other)) {
        return false;
      }
    }
    for (key in other) {
      if (!is.equal(value[key], other[key]) || !(key in value)) {
        return false;
      }
    }
    return true;
  }

  if (type === '[object Array]') {
    key = value.length;
    if (key !== other.length) {
      return false;
    }
    while (--key) {
      if (!is.equal(value[key], other[key])) {
        return false;
      }
    }
    return true;
  }

  if (type === '[object Function]') {
    return value.prototype === other.prototype;
  }

  if (type === '[object Date]') {
    return value.getTime() === other.getTime();
  }

  return false;
};

/**
 * is.hosted
 * Test if `value` is hosted by `host`.
 *
 * @param {Mixed} value to test
 * @param {Mixed} host host to test with
 * @return {Boolean} true if `value` is hosted by `host`, false otherwise
 * @api public
 */

is.hosted = function (value, host) {
  var type = typeof host[value];
  return type === 'object' ? !!host[value] : !NON_HOST_TYPES[type];
};

/**
 * is.instance
 * Test if `value` is an instance of `constructor`.
 *
 * @param {Mixed} value value to test
 * @return {Boolean} true if `value` is an instance of `constructor`
 * @api public
 */

is.instance = is['instanceof'] = function (value, constructor) {
  return value instanceof constructor;
};

/**
 * is.nil / is.null
 * Test if `value` is null.
 *
 * @param {Mixed} value value to test
 * @return {Boolean} true if `value` is null, false otherwise
 * @api public
 */

is.nil = is['null'] = function (value) {
  return value === null;
};

/**
 * is.undef / is.undefined
 * Test if `value` is undefined.
 *
 * @param {Mixed} value value to test
 * @return {Boolean} true if `value` is undefined, false otherwise
 * @api public
 */

is.undef = is.undefined = function (value) {
  return typeof value === 'undefined';
};

/**
 * Test arguments.
 */

/**
 * is.args
 * Test if `value` is an arguments object.
 *
 * @param {Mixed} value value to test
 * @return {Boolean} true if `value` is an arguments object, false otherwise
 * @api public
 */

is.args = is.arguments = function (value) {
  var isStandardArguments = toStr.call(value) === '[object Arguments]';
  var isOldArguments = !is.array(value) && is.arraylike(value) && is.object(value) && is.fn(value.callee);
  return isStandardArguments || isOldArguments;
};

/**
 * Test array.
 */

/**
 * is.array
 * Test if 'value' is an array.
 *
 * @param {Mixed} value value to test
 * @return {Boolean} true if `value` is an array, false otherwise
 * @api public
 */

is.array = Array.isArray || function (value) {
  return toStr.call(value) === '[object Array]';
};

/**
 * is.arguments.empty
 * Test if `value` is an empty arguments object.
 *
 * @param {Mixed} value value to test
 * @return {Boolean} true if `value` is an empty arguments object, false otherwise
 * @api public
 */
is.args.empty = function (value) {
  return is.args(value) && value.length === 0;
};

/**
 * is.array.empty
 * Test if `value` is an empty array.
 *
 * @param {Mixed} value value to test
 * @return {Boolean} true if `value` is an empty array, false otherwise
 * @api public
 */
is.array.empty = function (value) {
  return is.array(value) && value.length === 0;
};

/**
 * is.arraylike
 * Test if `value` is an arraylike object.
 *
 * @param {Mixed} value value to test
 * @return {Boolean} true if `value` is an arguments object, false otherwise
 * @api public
 */

is.arraylike = function (value) {
  return !!value && !is.bool(value)
    && owns.call(value, 'length')
    && isFinite(value.length)
    && is.number(value.length)
    && value.length >= 0;
};

/**
 * Test boolean.
 */

/**
 * is.bool
 * Test if `value` is a boolean.
 *
 * @param {Mixed} value value to test
 * @return {Boolean} true if `value` is a boolean, false otherwise
 * @api public
 */

is.bool = is['boolean'] = function (value) {
  return toStr.call(value) === '[object Boolean]';
};

/**
 * is.false
 * Test if `value` is false.
 *
 * @param {Mixed} value value to test
 * @return {Boolean} true if `value` is false, false otherwise
 * @api public
 */

is['false'] = function (value) {
  return is.bool(value) && Boolean(Number(value)) === false;
};

/**
 * is.true
 * Test if `value` is true.
 *
 * @param {Mixed} value value to test
 * @return {Boolean} true if `value` is true, false otherwise
 * @api public
 */

is['true'] = function (value) {
  return is.bool(value) && Boolean(Number(value)) === true;
};

/**
 * Test date.
 */

/**
 * is.date
 * Test if `value` is a date.
 *
 * @param {Mixed} value value to test
 * @return {Boolean} true if `value` is a date, false otherwise
 * @api public
 */

is.date = function (value) {
  return toStr.call(value) === '[object Date]';
};

/**
 * Test element.
 */

/**
 * is.element
 * Test if `value` is an html element.
 *
 * @param {Mixed} value value to test
 * @return {Boolean} true if `value` is an HTML Element, false otherwise
 * @api public
 */

is.element = function (value) {
  return value !== undefined
    && typeof HTMLElement !== 'undefined'
    && value instanceof HTMLElement
    && value.nodeType === 1;
};

/**
 * Test error.
 */

/**
 * is.error
 * Test if `value` is an error object.
 *
 * @param {Mixed} value value to test
 * @return {Boolean} true if `value` is an error object, false otherwise
 * @api public
 */

is.error = function (value) {
  return toStr.call(value) === '[object Error]';
};

/**
 * Test function.
 */

/**
 * is.fn / is.function (deprecated)
 * Test if `value` is a function.
 *
 * @param {Mixed} value value to test
 * @return {Boolean} true if `value` is a function, false otherwise
 * @api public
 */

is.fn = is['function'] = function (value) {
  var isAlert = typeof window !== 'undefined' && value === window.alert;
  return isAlert || toStr.call(value) === '[object Function]';
};

/**
 * Test number.
 */

/**
 * is.number
 * Test if `value` is a number.
 *
 * @param {Mixed} value value to test
 * @return {Boolean} true if `value` is a number, false otherwise
 * @api public
 */

is.number = function (value) {
  return toStr.call(value) === '[object Number]';
};

/**
 * is.infinite
 * Test if `value` is positive or negative infinity.
 *
 * @param {Mixed} value value to test
 * @return {Boolean} true if `value` is positive or negative Infinity, false otherwise
 * @api public
 */
is.infinite = function (value) {
  return value === Infinity || value === -Infinity;
};

/**
 * is.decimal
 * Test if `value` is a decimal number.
 *
 * @param {Mixed} value value to test
 * @return {Boolean} true if `value` is a decimal number, false otherwise
 * @api public
 */

is.decimal = function (value) {
  return is.number(value) && !isActualNaN(value) && !is.infinite(value) && value % 1 !== 0;
};

/**
 * is.divisibleBy
 * Test if `value` is divisible by `n`.
 *
 * @param {Number} value value to test
 * @param {Number} n dividend
 * @return {Boolean} true if `value` is divisible by `n`, false otherwise
 * @api public
 */

is.divisibleBy = function (value, n) {
  var isDividendInfinite = is.infinite(value);
  var isDivisorInfinite = is.infinite(n);
  var isNonZeroNumber = is.number(value) && !isActualNaN(value) && is.number(n) && !isActualNaN(n) && n !== 0;
  return isDividendInfinite || isDivisorInfinite || (isNonZeroNumber && value % n === 0);
};

/**
 * is.integer
 * Test if `value` is an integer.
 *
 * @param value to test
 * @return {Boolean} true if `value` is an integer, false otherwise
 * @api public
 */

is.integer = is['int'] = function (value) {
  return is.number(value) && !isActualNaN(value) && value % 1 === 0;
};

/**
 * is.maximum
 * Test if `value` is greater than 'others' values.
 *
 * @param {Number} value value to test
 * @param {Array} others values to compare with
 * @return {Boolean} true if `value` is greater than `others` values
 * @api public
 */

is.maximum = function (value, others) {
  if (isActualNaN(value)) {
    throw new TypeError('NaN is not a valid value');
  } else if (!is.arraylike(others)) {
    throw new TypeError('second argument must be array-like');
  }
  var len = others.length;

  while (--len >= 0) {
    if (value < others[len]) {
      return false;
    }
  }

  return true;
};

/**
 * is.minimum
 * Test if `value` is less than `others` values.
 *
 * @param {Number} value value to test
 * @param {Array} others values to compare with
 * @return {Boolean} true if `value` is less than `others` values
 * @api public
 */

is.minimum = function (value, others) {
  if (isActualNaN(value)) {
    throw new TypeError('NaN is not a valid value');
  } else if (!is.arraylike(others)) {
    throw new TypeError('second argument must be array-like');
  }
  var len = others.length;

  while (--len >= 0) {
    if (value > others[len]) {
      return false;
    }
  }

  return true;
};

/**
 * is.nan
 * Test if `value` is not a number.
 *
 * @param {Mixed} value value to test
 * @return {Boolean} true if `value` is not a number, false otherwise
 * @api public
 */

is.nan = function (value) {
  return !is.number(value) || value !== value;
};

/**
 * is.even
 * Test if `value` is an even number.
 *
 * @param {Number} value value to test
 * @return {Boolean} true if `value` is an even number, false otherwise
 * @api public
 */

is.even = function (value) {
  return is.infinite(value) || (is.number(value) && value === value && value % 2 === 0);
};

/**
 * is.odd
 * Test if `value` is an odd number.
 *
 * @param {Number} value value to test
 * @return {Boolean} true if `value` is an odd number, false otherwise
 * @api public
 */

is.odd = function (value) {
  return is.infinite(value) || (is.number(value) && value === value && value % 2 !== 0);
};

/**
 * is.ge
 * Test if `value` is greater than or equal to `other`.
 *
 * @param {Number} value value to test
 * @param {Number} other value to compare with
 * @return {Boolean}
 * @api public
 */

is.ge = function (value, other) {
  if (isActualNaN(value) || isActualNaN(other)) {
    throw new TypeError('NaN is not a valid value');
  }
  return !is.infinite(value) && !is.infinite(other) && value >= other;
};

/**
 * is.gt
 * Test if `value` is greater than `other`.
 *
 * @param {Number} value value to test
 * @param {Number} other value to compare with
 * @return {Boolean}
 * @api public
 */

is.gt = function (value, other) {
  if (isActualNaN(value) || isActualNaN(other)) {
    throw new TypeError('NaN is not a valid value');
  }
  return !is.infinite(value) && !is.infinite(other) && value > other;
};

/**
 * is.le
 * Test if `value` is less than or equal to `other`.
 *
 * @param {Number} value value to test
 * @param {Number} other value to compare with
 * @return {Boolean} if 'value' is less than or equal to 'other'
 * @api public
 */

is.le = function (value, other) {
  if (isActualNaN(value) || isActualNaN(other)) {
    throw new TypeError('NaN is not a valid value');
  }
  return !is.infinite(value) && !is.infinite(other) && value <= other;
};

/**
 * is.lt
 * Test if `value` is less than `other`.
 *
 * @param {Number} value value to test
 * @param {Number} other value to compare with
 * @return {Boolean} if `value` is less than `other`
 * @api public
 */

is.lt = function (value, other) {
  if (isActualNaN(value) || isActualNaN(other)) {
    throw new TypeError('NaN is not a valid value');
  }
  return !is.infinite(value) && !is.infinite(other) && value < other;
};

/**
 * is.within
 * Test if `value` is within `start` and `finish`.
 *
 * @param {Number} value value to test
 * @param {Number} start lower bound
 * @param {Number} finish upper bound
 * @return {Boolean} true if 'value' is is within 'start' and 'finish'
 * @api public
 */
is.within = function (value, start, finish) {
  if (isActualNaN(value) || isActualNaN(start) || isActualNaN(finish)) {
    throw new TypeError('NaN is not a valid value');
  } else if (!is.number(value) || !is.number(start) || !is.number(finish)) {
    throw new TypeError('all arguments must be numbers');
  }
  var isAnyInfinite = is.infinite(value) || is.infinite(start) || is.infinite(finish);
  return isAnyInfinite || (value >= start && value <= finish);
};

/**
 * Test object.
 */

/**
 * is.object
 * Test if `value` is an object.
 *
 * @param {Mixed} value value to test
 * @return {Boolean} true if `value` is an object, false otherwise
 * @api public
 */

is.object = function (value) {
  return toStr.call(value) === '[object Object]';
};

/**
 * is.hash
 * Test if `value` is a hash - a plain object literal.
 *
 * @param {Mixed} value value to test
 * @return {Boolean} true if `value` is a hash, false otherwise
 * @api public
 */

is.hash = function (value) {
  return is.object(value) && value.constructor === Object && !value.nodeType && !value.setInterval;
};

/**
 * Test regexp.
 */

/**
 * is.regexp
 * Test if `value` is a regular expression.
 *
 * @param {Mixed} value value to test
 * @return {Boolean} true if `value` is a regexp, false otherwise
 * @api public
 */

is.regexp = function (value) {
  return toStr.call(value) === '[object RegExp]';
};

/**
 * Test string.
 */

/**
 * is.string
 * Test if `value` is a string.
 *
 * @param {Mixed} value value to test
 * @return {Boolean} true if 'value' is a string, false otherwise
 * @api public
 */

is.string = function (value) {
  return toStr.call(value) === '[object String]';
};

/**
 * Test base64 string.
 */

/**
 * is.base64
 * Test if `value` is a valid base64 encoded string.
 *
 * @param {Mixed} value value to test
 * @return {Boolean} true if 'value' is a base64 encoded string, false otherwise
 * @api public
 */

is.base64 = function (value) {
  return is.string(value) && (!value.length || base64Regex.test(value));
};

/**
 * Test base64 string.
 */

/**
 * is.hex
 * Test if `value` is a valid hex encoded string.
 *
 * @param {Mixed} value value to test
 * @return {Boolean} true if 'value' is a hex encoded string, false otherwise
 * @api public
 */

is.hex = function (value) {
  return is.string(value) && (!value.length || hexRegex.test(value));
};

/**
 * is.symbol
 * Test if `value` is an ES6 Symbol
 *
 * @param {Mixed} value value to test
 * @return {Boolean} true if `value` is a Symbol, false otherise
 * @api public
 */

is.symbol = function (value) {
  return typeof Symbol === 'function' && toStr.call(value) === '[object Symbol]' && typeof symbolValueOf.call(value) === 'symbol';
};

},{}],4:[function(require,module,exports){
(function (global){
!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),(f.qj||(f.qj={})).js=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
var QJ, rreturn, rtrim;

QJ = function(selector) {
  if (QJ.isDOMElement(selector)) {
    return selector;
  }
  return document.querySelectorAll(selector);
};

QJ.isDOMElement = function(el) {
  return el && (el.nodeName != null);
};

rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;

QJ.trim = function(text) {
  if (text === null) {
    return "";
  } else {
    return (text + "").replace(rtrim, "");
  }
};

rreturn = /\r/g;

QJ.val = function(el, val) {
  var ret;
  if (arguments.length > 1) {
    return el.value = val;
  } else {
    ret = el.value;
    if (typeof ret === "string") {
      return ret.replace(rreturn, "");
    } else {
      if (ret === null) {
        return "";
      } else {
        return ret;
      }
    }
  }
};

QJ.preventDefault = function(eventObject) {
  if (typeof eventObject.preventDefault === "function") {
    eventObject.preventDefault();
    return;
  }
  eventObject.returnValue = false;
  return false;
};

QJ.normalizeEvent = function(e) {
  var original;
  original = e;
  e = {
    which: original.which != null ? original.which : void 0,
    target: original.target || original.srcElement,
    preventDefault: function() {
      return QJ.preventDefault(original);
    },
    originalEvent: original,
    data: original.data || original.detail
  };
  if (e.which == null) {
    e.which = original.charCode != null ? original.charCode : original.keyCode;
  }
  return e;
};

QJ.on = function(element, eventName, callback) {
  var el, multEventName, originalCallback, _i, _j, _len, _len1, _ref;
  if (element.length) {
    for (_i = 0, _len = element.length; _i < _len; _i++) {
      el = element[_i];
      QJ.on(el, eventName, callback);
    }
    return;
  }
  if (eventName.match(" ")) {
    _ref = eventName.split(" ");
    for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
      multEventName = _ref[_j];
      QJ.on(element, multEventName, callback);
    }
    return;
  }
  originalCallback = callback;
  callback = function(e) {
    e = QJ.normalizeEvent(e);
    return originalCallback(e);
  };
  if (element.addEventListener) {
    return element.addEventListener(eventName, callback, false);
  }
  if (element.attachEvent) {
    eventName = "on" + eventName;
    return element.attachEvent(eventName, callback);
  }
  element['on' + eventName] = callback;
};

QJ.addClass = function(el, className) {
  var e;
  if (el.length) {
    return (function() {
      var _i, _len, _results;
      _results = [];
      for (_i = 0, _len = el.length; _i < _len; _i++) {
        e = el[_i];
        _results.push(QJ.addClass(e, className));
      }
      return _results;
    })();
  }
  if (el.classList) {
    return el.classList.add(className);
  } else {
    return el.className += ' ' + className;
  }
};

QJ.hasClass = function(el, className) {
  var e, hasClass, _i, _len;
  if (el.length) {
    hasClass = true;
    for (_i = 0, _len = el.length; _i < _len; _i++) {
      e = el[_i];
      hasClass = hasClass && QJ.hasClass(e, className);
    }
    return hasClass;
  }
  if (el.classList) {
    return el.classList.contains(className);
  } else {
    return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
  }
};

QJ.removeClass = function(el, className) {
  var cls, e, _i, _len, _ref, _results;
  if (el.length) {
    return (function() {
      var _i, _len, _results;
      _results = [];
      for (_i = 0, _len = el.length; _i < _len; _i++) {
        e = el[_i];
        _results.push(QJ.removeClass(e, className));
      }
      return _results;
    })();
  }
  if (el.classList) {
    _ref = className.split(' ');
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      cls = _ref[_i];
      _results.push(el.classList.remove(cls));
    }
    return _results;
  } else {
    return el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
  }
};

QJ.toggleClass = function(el, className, bool) {
  var e;
  if (el.length) {
    return (function() {
      var _i, _len, _results;
      _results = [];
      for (_i = 0, _len = el.length; _i < _len; _i++) {
        e = el[_i];
        _results.push(QJ.toggleClass(e, className, bool));
      }
      return _results;
    })();
  }
  if (bool) {
    if (!QJ.hasClass(el, className)) {
      return QJ.addClass(el, className);
    }
  } else {
    return QJ.removeClass(el, className);
  }
};

QJ.append = function(el, toAppend) {
  var e;
  if (el.length) {
    return (function() {
      var _i, _len, _results;
      _results = [];
      for (_i = 0, _len = el.length; _i < _len; _i++) {
        e = el[_i];
        _results.push(QJ.append(e, toAppend));
      }
      return _results;
    })();
  }
  return el.insertAdjacentHTML('beforeend', toAppend);
};

QJ.find = function(el, selector) {
  if (el instanceof NodeList || el instanceof Array) {
    el = el[0];
  }
  return el.querySelectorAll(selector);
};

QJ.trigger = function(el, name, data) {
  var e, ev;
  try {
    ev = new CustomEvent(name, {
      detail: data
    });
  } catch (_error) {
    e = _error;
    ev = document.createEvent('CustomEvent');
    if (ev.initCustomEvent) {
      ev.initCustomEvent(name, true, true, data);
    } else {
      ev.initEvent(name, true, true, data);
    }
  }
  return el.dispatchEvent(ev);
};

module.exports = QJ;


},{}]},{},[1])
(1)
});
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],5:[function(require,module,exports){
module.exports = require('cssify');
},{"cssify":6}],6:[function(require,module,exports){
module.exports = function (css, customDocument) {
  var doc = customDocument || document;
  if (doc.createStyleSheet) {
    var sheet = doc.createStyleSheet()
    sheet.cssText = css;
    return sheet.ownerNode;
  } else {
    var head = doc.getElementsByTagName('head')[0],
        style = doc.createElement('style');

    style.type = 'text/css';

    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(doc.createTextNode(css));
    }

    head.appendChild(style);
    return style;
  }
};

module.exports.byUrl = function(url) {
  if (document.createStyleSheet) {
    return document.createStyleSheet(url).ownerNode;
  } else {
    var head = document.getElementsByTagName('head')[0],
        link = document.createElement('link');

    link.rel = 'stylesheet';
    link.href = url;

    head.appendChild(link);
    return link;
  }
};

},{}],7:[function(require,module,exports){
(function (global){
var Card, QJ, extend, payment;

require('../scss/card.scss');

QJ = require('qj');

payment = require('payment');

extend = require('node.extend');

Card = (function() {
  var bindVal;

  Card.prototype.cardTemplate = '' + '<div class="jp-card-container">' + '<div class="jp-card">' + '<div class="jp-card-front">' + '<div class="jp-card-logo jp-card-elo">' + '<div class="e">e</div>' + '<div class="l">l</div>' + '<div class="o">o</div>' + '</div>' + '<div class="jp-card-logo jp-card-visa">visa</div>' + '<div class="jp-card-logo jp-card-mastercard">MasterCard</div>' + '<div class="jp-card-logo jp-card-maestro">Maestro</div>' + '<div class="jp-card-logo jp-card-amex"></div>' + '<div class="jp-card-logo jp-card-discover">discover</div>' + '<div class="jp-card-logo jp-card-dankort"><div class="dk"><div class="d"></div><div class="k"></div></div></div>' + '<div class="jp-card-lower">' + '<div class="jp-card-shiny"></div>' + '<div class="jp-card-cvc jp-card-display">{{cvc}}</div>' + '<div class="jp-card-number jp-card-display">{{number}}</div>' + '<div class="jp-card-name jp-card-display">{{name}}</div>' + '<div class="jp-card-expiry jp-card-display" data-before="{{monthYear}}" data-after="{{validDate}}">{{expiry}}</div>' + '</div>' + '</div>' + '<div class="jp-card-back">' + '<div class="jp-card-bar"></div>' + '<div class="jp-card-cvc jp-card-display">{{cvc}}</div>' + '<div class="jp-card-shiny"></div>' + '</div>' + '</div>' + '</div>';

  Card.prototype.template = function(tpl, data) {
    return tpl.replace(/\{\{(.*?)\}\}/g, function(match, key, str) {
      return data[key];
    });
  };

  Card.prototype.cardTypes = ['jp-card-amex', 'jp-card-dankort', 'jp-card-dinersclub', 'jp-card-discover', 'jp-card-jcb', 'jp-card-laser', 'jp-card-maestro', 'jp-card-mastercard', 'jp-card-unionpay', 'jp-card-visa', 'jp-card-visaelectron', 'jp-card-elo'];

  Card.prototype.defaults = {
    formatting: true,
    formSelectors: {
      numberInput: 'input[name="number"]',
      expiryInput: 'input[name="expiry"]',
      cvcInput: 'input[name="cvc"]',
      nameInput: 'input[name="name"]'
    },
    cardSelectors: {
      cardContainer: '.jp-card-container',
      card: '.jp-card',
      numberDisplay: '.jp-card-number',
      expiryDisplay: '.jp-card-expiry',
      cvcDisplay: '.jp-card-cvc',
      nameDisplay: '.jp-card-name'
    },
    messages: {
      validDate: 'valid\nthru',
      monthYear: 'month/year'
    },
    placeholders: {
      number: '&bull;&bull;&bull;&bull; &bull;&bull;&bull;&bull; &bull;&bull;&bull;&bull; &bull;&bull;&bull;&bull;',
      cvc: '&bull;&bull;&bull;',
      expiry: '&bull;&bull;/&bull;&bull;',
      name: 'Full Name'
    },
    classes: {
      valid: 'jp-card-valid',
      invalid: 'jp-card-invalid'
    },
    debug: false
  };

  function Card(opts) {
    this.options = extend(true, this.defaults, opts);
    if (!this.options.form) {
      console.log("Please provide a form");
      return;
    }
    this.$el = QJ(this.options.form);
    if (!this.options.container) {
      console.log("Please provide a container");
      return;
    }
    this.$container = QJ(this.options.container);
    this.render();
    this.attachHandlers();
    this.handleInitialPlaceholders();
  }

  Card.prototype.render = function() {
    var $cardContainer, baseWidth, name, obj, ref, ref1, selector, ua;
    QJ.append(this.$container, this.template(this.cardTemplate, extend({}, this.options.messages, this.options.placeholders)));
    ref = this.options.cardSelectors;
    for (name in ref) {
      selector = ref[name];
      this["$" + name] = QJ.find(this.$container, selector);
    }
    ref1 = this.options.formSelectors;
    for (name in ref1) {
      selector = ref1[name];
      selector = this.options[name] ? this.options[name] : selector;
      obj = QJ.find(this.$el, selector);
      if (!obj.length && this.options.debug) {
        console.error("Card can't find a " + name + " in your form.");
      }
      this["$" + name] = obj;
    }
    if (this.options.formatting) {
      Payment.formatCardNumber(this.$numberInput);
      Payment.formatCardCVC(this.$cvcInput);
      Payment.formatCardExpiry(this.$expiryInput);
    }
    if (this.options.width) {
      $cardContainer = QJ(this.options.cardSelectors.cardContainer)[0];
      baseWidth = parseInt($cardContainer.clientWidth);
      $cardContainer.style.transform = "scale(" + (this.options.width / baseWidth) + ")";
    }
    if (typeof navigator !== "undefined" && navigator !== null ? navigator.userAgent : void 0) {
      ua = navigator.userAgent.toLowerCase();
      if (ua.indexOf('safari') !== -1 && ua.indexOf('chrome') === -1) {
        QJ.addClass(this.$card, 'jp-card-safari');
      }
    }
    if (/MSIE 10\./i.test(navigator.userAgent)) {
      QJ.addClass(this.$card, 'jp-card-ie-10');
    }
    if (/rv:11.0/i.test(navigator.userAgent)) {
      return QJ.addClass(this.$card, 'jp-card-ie-11');
    }
  };

  Card.prototype.attachHandlers = function() {
    var expiryFilters;
    bindVal(this.$numberInput, this.$numberDisplay, {
      fill: false,
      filters: this.validToggler('cardNumber')
    });
    QJ.on(this.$numberInput, 'payment.cardType', this.handle('setCardType'));
    expiryFilters = [
      function(val) {
        return val.replace(/(\s+)/g, '');
      }
    ];
    expiryFilters.push(this.validToggler('cardExpiry'));
    bindVal(this.$expiryInput, this.$expiryDisplay, {
      join: function(text) {
        if (text[0].length === 2 || text[1]) {
          return "/";
        } else {
          return "";
        }
      },
      filters: expiryFilters
    });
    bindVal(this.$cvcInput, this.$cvcDisplay, {
      filters: this.validToggler('cardCVC')
    });
    QJ.on(this.$cvcInput, 'focus', this.handle('flipCard'));
    QJ.on(this.$cvcInput, 'blur', this.handle('unflipCard'));
    return bindVal(this.$nameInput, this.$nameDisplay, {
      fill: false,
      filters: this.validToggler('cardHolderName'),
      join: ' '
    });
  };

  Card.prototype.handleInitialPlaceholders = function() {
    var el, name, ref, results, selector;
    ref = this.options.formSelectors;
    results = [];
    for (name in ref) {
      selector = ref[name];
      el = this["$" + name];
      if (QJ.val(el)) {
        QJ.trigger(el, 'paste');
        results.push(setTimeout(function() {
          return QJ.trigger(el, 'keyup');
        }));
      } else {
        results.push(void 0);
      }
    }
    return results;
  };

  Card.prototype.handle = function(fn) {
    return (function(_this) {
      return function(e) {
        var args;
        args = Array.prototype.slice.call(arguments);
        args.unshift(e.target);
        return _this.handlers[fn].apply(_this, args);
      };
    })(this);
  };

  Card.prototype.validToggler = function(validatorName) {
    var isValid;
    if (validatorName === "cardExpiry") {
      isValid = function(val) {
        var objVal;
        objVal = Payment.fns.cardExpiryVal(val);
        return Payment.fns.validateCardExpiry(objVal.month, objVal.year);
      };
    } else if (validatorName === "cardCVC") {
      isValid = (function(_this) {
        return function(val) {
          return Payment.fns.validateCardCVC(val, _this.cardType);
        };
      })(this);
    } else if (validatorName === "cardNumber") {
      isValid = function(val) {
        return Payment.fns.validateCardNumber(val);
      };
    } else if (validatorName === "cardHolderName") {
      isValid = function(val) {
        return val !== "";
      };
    }
    return (function(_this) {
      return function(val, $in, $out) {
        var result;
        result = isValid(val);
        _this.toggleValidClass($in, result);
        _this.toggleValidClass($out, result);
        return val;
      };
    })(this);
  };

  Card.prototype.toggleValidClass = function(el, test) {
    QJ.toggleClass(el, this.options.classes.valid, test);
    return QJ.toggleClass(el, this.options.classes.invalid, !test);
  };

  Card.prototype.handlers = {
    setCardType: function($el, e) {
      var cardType;
      cardType = e.data;
      if (!QJ.hasClass(this.$card, cardType)) {
        QJ.removeClass(this.$card, 'jp-card-unknown');
        QJ.removeClass(this.$card, this.cardTypes.join(' '));
        QJ.addClass(this.$card, "jp-card-" + cardType);
        QJ.toggleClass(this.$card, 'jp-card-identified', cardType !== 'unknown');
        return this.cardType = cardType;
      }
    },
    flipCard: function() {
      return QJ.addClass(this.$card, 'jp-card-flipped');
    },
    unflipCard: function() {
      return QJ.removeClass(this.$card, 'jp-card-flipped');
    }
  };

  bindVal = function(el, out, opts) {
    var joiner, o, outDefaults;
    if (opts == null) {
      opts = {};
    }
    opts.fill = opts.fill || false;
    opts.filters = opts.filters || [];
    if (!(opts.filters instanceof Array)) {
      opts.filters = [opts.filters];
    }
    opts.join = opts.join || "";
    if (!(typeof opts.join === "function")) {
      joiner = opts.join;
      opts.join = function() {
        return joiner;
      };
    }
    outDefaults = (function() {
      var j, len, results;
      results = [];
      for (j = 0, len = out.length; j < len; j++) {
        o = out[j];
        results.push(o.textContent);
      }
      return results;
    })();
    QJ.on(el, 'focus', function() {
      return QJ.addClass(out, 'jp-card-focused');
    });
    QJ.on(el, 'blur', function() {
      return QJ.removeClass(out, 'jp-card-focused');
    });
    QJ.on(el, 'keyup change paste', function(e) {
      var elem, filter, i, j, join, k, len, len1, outEl, outVal, ref, results, val;
      val = (function() {
        var j, len, results;
        results = [];
        for (j = 0, len = el.length; j < len; j++) {
          elem = el[j];
          results.push(QJ.val(elem));
        }
        return results;
      })();
      join = opts.join(val);
      val = val.join(join);
      if (val === join) {
        val = "";
      }
      ref = opts.filters;
      for (j = 0, len = ref.length; j < len; j++) {
        filter = ref[j];
        val = filter(val, el, out);
      }
      results = [];
      for (i = k = 0, len1 = out.length; k < len1; i = ++k) {
        outEl = out[i];
        if (opts.fill) {
          outVal = val + outDefaults[i].substring(val.length);
        } else {
          outVal = val || outDefaults[i];
        }
        results.push(outEl.textContent = outVal);
      }
      return results;
    });
    return el;
  };

  return Card;

})();

module.exports = Card;

global.Card = Card;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../scss/card.scss":9,"node.extend":1,"payment":10,"qj":4}],8:[function(require,module,exports){
var $, Card,
  slice = [].slice;

Card = require('./card');

$ = jQuery;

$.card = {};

$.card.fn = {};

$.fn.card = function(opts) {
  return $.card.fn.construct.apply(this, opts);
};

$.fn.extend({
  card: function() {
    var args, option;
    option = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
    return this.each(function() {
      var $this, data;
      $this = $(this);
      data = $this.data('card');
      if (!data) {
        $.each(option, (function(_this) {
          return function(key, value) {
            if (value instanceof jQuery) {
              return option[key] = value[0];
            }
          };
        })(this));
        option['form'] = this;
        $this.data('card', (data = new Card(option)));
      }
      if (typeof option === 'string') {
        return data[option].apply(data, args);
      }
    });
  }
});


},{"./card":7}],9:[function(require,module,exports){
module.exports = require('sassify')('.jp-card.jp-card-safari.jp-card-identified .jp-card-front:before, .jp-card.jp-card-safari.jp-card-identified .jp-card-back:before {   background-image: repeating-linear-gradient(45deg, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), repeating-linear-gradient(135deg, rgba(255, 255, 255, 0.05) 1px, rgba(255, 255, 255, 0) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.03) 4px), repeating-linear-gradient(90deg, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), repeating-linear-gradient(210deg, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), -webkit-linear-gradient(-245deg, rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 0.2) 70%, rgba(255, 255, 255, 0) 90%);   background-image: repeating-linear-gradient(45deg, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), repeating-linear-gradient(135deg, rgba(255, 255, 255, 0.05) 1px, rgba(255, 255, 255, 0) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.03) 4px), repeating-linear-gradient(90deg, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), repeating-linear-gradient(210deg, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), linear-gradient(-25deg, rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 0.2) 70%, rgba(255, 255, 255, 0) 90%); }  .jp-card.jp-card-ie-10.jp-card-flipped, .jp-card.jp-card-ie-11.jp-card-flipped {   -webkit-transform: 0deg;   -moz-transform: 0deg;   -ms-transform: 0deg;   -o-transform: 0deg;   transform: 0deg; }   .jp-card.jp-card-ie-10.jp-card-flipped .jp-card-front, .jp-card.jp-card-ie-11.jp-card-flipped .jp-card-front {     -webkit-transform: rotateY(0deg);     -moz-transform: rotateY(0deg);     -ms-transform: rotateY(0deg);     -o-transform: rotateY(0deg);     transform: rotateY(0deg); }   .jp-card.jp-card-ie-10.jp-card-flipped .jp-card-back, .jp-card.jp-card-ie-11.jp-card-flipped .jp-card-back {     -webkit-transform: rotateY(0deg);     -moz-transform: rotateY(0deg);     -ms-transform: rotateY(0deg);     -o-transform: rotateY(0deg);     transform: rotateY(0deg); }     .jp-card.jp-card-ie-10.jp-card-flipped .jp-card-back:after, .jp-card.jp-card-ie-11.jp-card-flipped .jp-card-back:after {       left: 18%; }     .jp-card.jp-card-ie-10.jp-card-flipped .jp-card-back .jp-card-cvc, .jp-card.jp-card-ie-11.jp-card-flipped .jp-card-back .jp-card-cvc {       -webkit-transform: rotateY(180deg);       -moz-transform: rotateY(180deg);       -ms-transform: rotateY(180deg);       -o-transform: rotateY(180deg);       transform: rotateY(180deg);       left: 5%; }     .jp-card.jp-card-ie-10.jp-card-flipped .jp-card-back .jp-card-shiny, .jp-card.jp-card-ie-11.jp-card-flipped .jp-card-back .jp-card-shiny {       left: 84%; }       .jp-card.jp-card-ie-10.jp-card-flipped .jp-card-back .jp-card-shiny:after, .jp-card.jp-card-ie-11.jp-card-flipped .jp-card-back .jp-card-shiny:after {         left: -480%;         -webkit-transform: rotateY(180deg);         -moz-transform: rotateY(180deg);         -ms-transform: rotateY(180deg);         -o-transform: rotateY(180deg);         transform: rotateY(180deg); }  .jp-card.jp-card-ie-10.jp-card-amex .jp-card-back, .jp-card.jp-card-ie-11.jp-card-amex .jp-card-back {   display: none; }  .jp-card-logo {   height: 36px;   width: 60px;   font-style: italic; }   .jp-card-logo, .jp-card-logo:before, .jp-card-logo:after {     box-sizing: border-box; }  .jp-card-logo.jp-card-amex {   text-transform: uppercase;   font-size: 4px;   font-weight: bold;   color: white;   background-image: repeating-radial-gradient(circle at center, #FFF 1px, #999 2px);   background-image: repeating-radial-gradient(circle at center, #FFF 1px, #999 2px);   border: 1px solid #EEE; }   .jp-card-logo.jp-card-amex:before, .jp-card-logo.jp-card-amex:after {     width: 28px;     display: block;     position: absolute;     left: 16px; }   .jp-card-logo.jp-card-amex:before {     height: 28px;     content: "american";     top: 3px;     text-align: left;     padding-left: 2px;     padding-top: 11px;     background: #267AC3; }   .jp-card-logo.jp-card-amex:after {     content: "express";     bottom: 11px;     text-align: right;     padding-right: 2px; }  .jp-card.jp-card-amex.jp-card-flipped {   -webkit-transform: none;   -moz-transform: none;   -ms-transform: none;   -o-transform: none;   transform: none; }  .jp-card.jp-card-amex.jp-card-identified .jp-card-front:before, .jp-card.jp-card-amex.jp-card-identified .jp-card-back:before {   background-color: #108168; }  .jp-card.jp-card-amex.jp-card-identified .jp-card-front .jp-card-logo.jp-card-amex {   opacity: 1; }  .jp-card.jp-card-amex.jp-card-identified .jp-card-front .jp-card-cvc {   visibility: visible; }  .jp-card.jp-card-amex.jp-card-identified .jp-card-front:after {   opacity: 1; }  .jp-card-logo.jp-card-discover {   background: #FF6600;   color: #111;   text-transform: uppercase;   font-style: normal;   font-weight: bold;   font-size: 10px;   text-align: center;   overflow: hidden;   z-index: 1;   padding-top: 9px;   letter-spacing: .03em;   border: 1px solid #EEE; }   .jp-card-logo.jp-card-discover:before, .jp-card-logo.jp-card-discover:after {     content: " ";     display: block;     position: absolute; }   .jp-card-logo.jp-card-discover:before {     background: white;     width: 200px;     height: 200px;     border-radius: 200px;     bottom: -5%;     right: -80%;     z-index: -1; }   .jp-card-logo.jp-card-discover:after {     width: 8px;     height: 8px;     border-radius: 4px;     top: 10px;     left: 27px;     background-color: #FF6600;     background-image: -webkit-radial-gradient(#FF6600, #fff);     background-image: radial-gradient(  #FF6600, #fff);     content: "network";     font-size: 4px;     line-height: 24px;     text-indent: -7px; }  .jp-card .jp-card-front .jp-card-logo.jp-card-discover {   right: 12%;   top: 18%; }  .jp-card.jp-card-discover.jp-card-identified .jp-card-front:before, .jp-card.jp-card-discover.jp-card-identified .jp-card-back:before {   background-color: #86B8CF; }  .jp-card.jp-card-discover.jp-card-identified .jp-card-logo.jp-card-discover {   opacity: 1; }  .jp-card.jp-card-discover.jp-card-identified .jp-card-front:after {   -webkit-transition: 400ms;   -moz-transition: 400ms;   transition: 400ms;   content: " ";   display: block;   background-color: #FF6600;   background-image: -webkit-linear-gradient(#FF6600, #ffa366, #FF6600);   background-image: linear-gradient(#FF6600, #ffa366, #FF6600);   height: 50px;   width: 50px;   border-radius: 25px;   position: absolute;   left: 100%;   top: 15%;   margin-left: -25px;   box-shadow: inset 1px 1px 3px 1px rgba(0, 0, 0, 0.5); }  .jp-card-logo.jp-card-visa {   background: white;   text-transform: uppercase;   color: #1A1876;   text-align: center;   font-weight: bold;   font-size: 15px;   line-height: 18px; }   .jp-card-logo.jp-card-visa:before, .jp-card-logo.jp-card-visa:after {     content: " ";     display: block;     width: 100%;     height: 25%; }   .jp-card-logo.jp-card-visa:before {     background: #1A1876; }   .jp-card-logo.jp-card-visa:after {     background: #E79800; }  .jp-card.jp-card-visa.jp-card-identified .jp-card-front:before, .jp-card.jp-card-visa.jp-card-identified .jp-card-back:before {   background-color: #191278; }  .jp-card.jp-card-visa.jp-card-identified .jp-card-logo.jp-card-visa {   opacity: 1; }  .jp-card-logo.jp-card-mastercard {   color: white;   font-weight: bold;   text-align: center;   font-size: 9px;   line-height: 36px;   z-index: 1;   text-shadow: 1px 1px rgba(0, 0, 0, 0.6); }   .jp-card-logo.jp-card-mastercard:before, .jp-card-logo.jp-card-mastercard:after {     content: " ";     display: block;     width: 36px;     top: 0;     position: absolute;     height: 36px;     border-radius: 18px; }   .jp-card-logo.jp-card-mastercard:before {     left: 0;     background: #FF0000;     z-index: -1; }   .jp-card-logo.jp-card-mastercard:after {     right: 0;     background: #FFAB00;     z-index: -2; }  .jp-card.jp-card-mastercard.jp-card-identified .jp-card-front .jp-card-logo.jp-card-mastercard, .jp-card.jp-card-mastercard.jp-card-identified .jp-card-back .jp-card-logo.jp-card-mastercard {   box-shadow: none; }  .jp-card.jp-card-mastercard.jp-card-identified .jp-card-front:before, .jp-card.jp-card-mastercard.jp-card-identified .jp-card-back:before {   background-color: #0061A8; }  .jp-card.jp-card-mastercard.jp-card-identified .jp-card-logo.jp-card-mastercard {   opacity: 1; }  .jp-card-logo.jp-card-maestro {   color: white;   font-weight: bold;   text-align: center;   font-size: 14px;   line-height: 36px;   z-index: 1;   text-shadow: 1px 1px rgba(0, 0, 0, 0.6); }   .jp-card-logo.jp-card-maestro:before, .jp-card-logo.jp-card-maestro:after {     content: " ";     display: block;     width: 36px;     top: 0;     position: absolute;     height: 36px;     border-radius: 18px; }   .jp-card-logo.jp-card-maestro:before {     left: 0;     background: #0064CB;     z-index: -1; }   .jp-card-logo.jp-card-maestro:after {     right: 0;     background: #CC0000;     z-index: -2; }  .jp-card.jp-card-maestro.jp-card-identified .jp-card-front .jp-card-logo.jp-card-maestro, .jp-card.jp-card-maestro.jp-card-identified .jp-card-back .jp-card-logo.jp-card-maestro {   box-shadow: none; }  .jp-card.jp-card-maestro.jp-card-identified .jp-card-front:before, .jp-card.jp-card-maestro.jp-card-identified .jp-card-back:before {   background-color: #0B2C5F; }  .jp-card.jp-card-maestro.jp-card-identified .jp-card-logo.jp-card-maestro {   opacity: 1; }  .jp-card-logo.jp-card-dankort {   width: 60px;   height: 36px;   padding: 3px;   border-radius: 8px;   border: #000000 1px solid;   background-color: #FFFFFF; }   .jp-card-logo.jp-card-dankort .dk {     position: relative;     width: 100%;     height: 100%;     overflow: hidden; }     .jp-card-logo.jp-card-dankort .dk:before {       background-color: #ED1C24;       content: \'\';       position: absolute;       width: 100%;       height: 100%;       display: block;       border-radius: 6px; }     .jp-card-logo.jp-card-dankort .dk:after {       content: \'\';       position: absolute;       top: 50%;       margin-top: -7.7px;       right: 0;       width: 0;       height: 0;       border-style: solid;       border-width: 7px 7px 10px 0;       border-color: transparent #ED1C24 transparent transparent;       z-index: 1; }   .jp-card-logo.jp-card-dankort .d, .jp-card-logo.jp-card-dankort .k {     position: absolute;     top: 50%;     width: 50%;     display: block;     height: 15.4px;     margin-top: -7.7px;     background: white; }   .jp-card-logo.jp-card-dankort .d {     left: 0;     border-radius: 0 8px 10px 0; }     .jp-card-logo.jp-card-dankort .d:before {       content: \'\';       position: absolute;       top: 50%;       left: 50%;       display: block;       background: #ED1C24;       border-radius: 2px 4px 6px 0px;       height: 5px;       width: 7px;       margin: -3px 0 0 -4px; }   .jp-card-logo.jp-card-dankort .k {     right: 0; }     .jp-card-logo.jp-card-dankort .k:before, .jp-card-logo.jp-card-dankort .k:after {       content: \'\';       position: absolute;       right: 50%;       width: 0;       height: 0;       border-style: solid;       margin-right: -1px; }     .jp-card-logo.jp-card-dankort .k:before {       top: 0;       border-width: 8px 5px 0 0;       border-color: #ED1C24 transparent transparent transparent; }     .jp-card-logo.jp-card-dankort .k:after {       bottom: 0;       border-width: 0 5px 8px 0;       border-color: transparent transparent #ED1C24 transparent; }  .jp-card.jp-card-dankort.jp-card-identified .jp-card-front:before, .jp-card.jp-card-dankort.jp-card-identified .jp-card-back:before {   background-color: #0055C7; }  .jp-card.jp-card-dankort.jp-card-identified .jp-card-logo.jp-card-dankort {   opacity: 1; }  .jp-card-logo.jp-card-elo {   height: 50px;   width: 50px;   border-radius: 100%;   background: black;   color: white;   text-align: center;   text-transform: lowercase;   font-size: 21px;   font-style: normal;   letter-spacing: 1px;   font-weight: bold;   padding-top: 13px; }   .jp-card-logo.jp-card-elo .e, .jp-card-logo.jp-card-elo .l, .jp-card-logo.jp-card-elo .o {     display: inline-block;     position: relative; }   .jp-card-logo.jp-card-elo .e {     -webkit-transform: rotate(-15deg);     -moz-transform: rotate(-15deg);     -ms-transform: rotate(-15deg);     -o-transform: rotate(-15deg);     transform: rotate(-15deg); }   .jp-card-logo.jp-card-elo .o {     position: relative;     display: inline-block;     width: 12px;     height: 12px;     right: 0;     top: 7px;     border-radius: 100%;     background-image: -webkit-linear-gradient( yellow 50%, red 50%);     background-image: linear-gradient( yellow 50%, red 50%);     -webkit-transform: rotate(40deg);     -moz-transform: rotate(40deg);     -ms-transform: rotate(40deg);     -o-transform: rotate(40deg);     transform: rotate(40deg);     text-indent: -9999px; }     .jp-card-logo.jp-card-elo .o:before {       content: "";       position: absolute;       width: 49%;       height: 49%;       background: black;       border-radius: 100%;       text-indent: -99999px;       top: 25%;       left: 25%; }  .jp-card.jp-card-elo.jp-card-identified .jp-card-front:before, .jp-card.jp-card-elo.jp-card-identified .jp-card-back:before {   background-color: #6F6969; }  .jp-card.jp-card-elo.jp-card-identified .jp-card-logo.jp-card-elo {   opacity: 1; }  .jp-card-container {   -webkit-perspective: 1000px;   -moz-perspective: 1000px;   perspective: 1000px;   width: 350px;   max-width: 100%;   height: 200px;   margin: auto;   z-index: 1;   position: relative; }  .jp-card {   font-family: "Helvetica Neue";   line-height: 1;   position: relative;   width: 100%;   height: 100%;   min-width: 315px;   border-radius: 10px;   -webkit-transform-style: preserve-3d;   -moz-transform-style: preserve-3d;   -ms-transform-style: preserve-3d;   -o-transform-style: preserve-3d;   transform-style: preserve-3d;   -webkit-transition: all 400ms linear;   -moz-transition: all 400ms linear;   transition: all 400ms linear; }   .jp-card > *, .jp-card > *:before, .jp-card > *:after {     -moz-box-sizing: border-box;     -webkit-box-sizing: border-box;     box-sizing: border-box;     font-family: inherit; }   .jp-card.jp-card-flipped {     -webkit-transform: rotateY(180deg);     -moz-transform: rotateY(180deg);     -ms-transform: rotateY(180deg);     -o-transform: rotateY(180deg);     transform: rotateY(180deg); }   .jp-card .jp-card-front, .jp-card .jp-card-back {     -webkit-backface-visibility: hidden;     backface-visibility: hidden;     -webkit-transform-style: preserve-3d;     -moz-transform-style: preserve-3d;     -ms-transform-style: preserve-3d;     -o-transform-style: preserve-3d;     transform-style: preserve-3d;     -webkit-transition: all 400ms linear;     -moz-transition: all 400ms linear;     transition: all 400ms linear;     width: 100%;     height: 100%;     position: absolute;     top: 0;     left: 0;     overflow: hidden;     border-radius: 10px;     background: #DDD; }     .jp-card .jp-card-front:before, .jp-card .jp-card-back:before {       content: " ";       display: block;       position: absolute;       width: 100%;       height: 100%;       top: 0;       left: 0;       opacity: 0;       border-radius: 10px;       -webkit-transition: all 400ms ease;       -moz-transition: all 400ms ease;       transition: all 400ms ease; }     .jp-card .jp-card-front:after, .jp-card .jp-card-back:after {       content: " ";       display: block; }     .jp-card .jp-card-front .jp-card-display, .jp-card .jp-card-back .jp-card-display {       color: white;       font-weight: normal;       opacity: 0.5;       -webkit-transition: opacity 400ms linear;       -moz-transition: opacity 400ms linear;       transition: opacity 400ms linear; }       .jp-card .jp-card-front .jp-card-display.jp-card-focused, .jp-card .jp-card-back .jp-card-display.jp-card-focused {         opacity: 1;         font-weight: 700; }     .jp-card .jp-card-front .jp-card-cvc, .jp-card .jp-card-back .jp-card-cvc {       font-family: "Bitstream Vera Sans Mono", Consolas, Courier, monospace;       font-size: 14px; }     .jp-card .jp-card-front .jp-card-shiny, .jp-card .jp-card-back .jp-card-shiny {       width: 50px;       height: 35px;       border-radius: 5px;       background: #CCC;       position: relative; }       .jp-card .jp-card-front .jp-card-shiny:before, .jp-card .jp-card-back .jp-card-shiny:before {         content: " ";         display: block;         width: 70%;         height: 60%;         border-top-right-radius: 5px;         border-bottom-right-radius: 5px;         background: #d9d9d9;         position: absolute;         top: 20%; }   .jp-card .jp-card-front .jp-card-logo {     position: absolute;     opacity: 0;     right: 5%;     top: 8%;     -webkit-transition: 400ms;     -moz-transition: 400ms;     transition: 400ms; }   .jp-card .jp-card-front .jp-card-lower {     width: 80%;     position: absolute;     left: 10%;     bottom: 30px; }     @media only screen and (max-width: 480px) {       .jp-card .jp-card-front .jp-card-lower {         width: 90%;         left: 5%; } }     .jp-card .jp-card-front .jp-card-lower .jp-card-cvc {       visibility: hidden;       float: right;       position: relative;       bottom: 5px; }     .jp-card .jp-card-front .jp-card-lower .jp-card-number {       font-family: "Bitstream Vera Sans Mono", Consolas, Courier, monospace;       font-size: 24px;       clear: both;       margin-bottom: 30px; }     .jp-card .jp-card-front .jp-card-lower .jp-card-expiry {       font-family: "Bitstream Vera Sans Mono", Consolas, Courier, monospace;       letter-spacing: 0em;       position: relative;       float: right;       width: 25%; }       .jp-card .jp-card-front .jp-card-lower .jp-card-expiry:before, .jp-card .jp-card-front .jp-card-lower .jp-card-expiry:after {         font-family: "Helvetica Neue";         font-weight: bold;         font-size: 7px;         white-space: pre;         display: block;         opacity: .5; }       .jp-card .jp-card-front .jp-card-lower .jp-card-expiry:before {         content: attr(data-before);         margin-bottom: 2px;         font-size: 7px;         text-transform: uppercase; }       .jp-card .jp-card-front .jp-card-lower .jp-card-expiry:after {         position: absolute;         content: attr(data-after);         text-align: right;         right: 100%;         margin-right: 5px;         margin-top: 2px;         bottom: 0; }     .jp-card .jp-card-front .jp-card-lower .jp-card-name {       text-transform: uppercase;       font-family: "Bitstream Vera Sans Mono", Consolas, Courier, monospace;       font-size: 20px;       max-height: 45px;       position: absolute;       bottom: 0;       width: 190px;       display: -webkit-box;       -webkit-line-clamp: 2;       -webkit-box-orient: horizontal;       overflow: hidden;       text-overflow: ellipsis; }   .jp-card .jp-card-back {     -webkit-transform: rotateY(180deg);     -moz-transform: rotateY(180deg);     -ms-transform: rotateY(180deg);     -o-transform: rotateY(180deg);     transform: rotateY(180deg); }     .jp-card .jp-card-back .jp-card-bar {       background-color: #444;       background-image: -webkit-linear-gradient(#444, #333);       background-image: linear-gradient(#444, #333);       width: 100%;       height: 20%;       position: absolute;       top: 10%; }     .jp-card .jp-card-back:after {       content: " ";       display: block;       background-color: #FFF;       background-image: -webkit-linear-gradient(#FFF, #FFF);       background-image: linear-gradient(#FFF, #FFF);       width: 80%;       height: 16%;       position: absolute;       top: 40%;       left: 2%; }     .jp-card .jp-card-back .jp-card-cvc {       position: absolute;       top: 40%;       left: 85%;       -webkit-transition-delay: 600ms;       -moz-transition-delay: 600ms;       transition-delay: 600ms; }     .jp-card .jp-card-back .jp-card-shiny {       position: absolute;       top: 66%;       left: 2%; }       .jp-card .jp-card-back .jp-card-shiny:after {         content: "This card has been issued by Jesse Pollak and is licensed for anyone to use anywhere for free.\AIt comes with no warranty.\A For support issues, please visit: github.com/jessepollak/card.";         position: absolute;         left: 120%;         top: 5%;         color: white;         font-size: 7px;         width: 230px;         opacity: .5; }   .jp-card.jp-card-identified {     box-shadow: 0 0 20px rgba(0, 0, 0, 0.3); }     .jp-card.jp-card-identified .jp-card-front, .jp-card.jp-card-identified .jp-card-back {       background-color: #000;       background-color: rgba(0, 0, 0, 0.5); }       .jp-card.jp-card-identified .jp-card-front:before, .jp-card.jp-card-identified .jp-card-back:before {         -webkit-transition: all 400ms ease;         -moz-transition: all 400ms ease;         transition: all 400ms ease;         background-image: repeating-linear-gradient(45deg, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), repeating-linear-gradient(135deg, rgba(255, 255, 255, 0.05) 1px, rgba(255, 255, 255, 0) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.03) 4px), repeating-linear-gradient(90deg, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), repeating-linear-gradient(210deg, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), repeating-radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), repeating-radial-gradient(circle at 70% 70%, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), repeating-radial-gradient(circle at 90% 20%, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), repeating-radial-gradient(circle at 15% 80%, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), -webkit-linear-gradient(-245deg, rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 0.2) 70%, rgba(255, 255, 255, 0) 90%);         background-image: repeating-linear-gradient(45deg, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), repeating-linear-gradient(135deg, rgba(255, 255, 255, 0.05) 1px, rgba(255, 255, 255, 0) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.03) 4px), repeating-linear-gradient(90deg, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), repeating-linear-gradient(210deg, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), repeating-radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), repeating-radial-gradient(circle at 70% 70%, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), repeating-radial-gradient(circle at 90% 20%, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), repeating-radial-gradient(circle at 15% 80%, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), linear-gradient(-25deg, rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 0.2) 70%, rgba(255, 255, 255, 0) 90%);         opacity: 1; }       .jp-card.jp-card-identified .jp-card-front .jp-card-logo, .jp-card.jp-card-identified .jp-card-back .jp-card-logo {         box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.3); }     .jp-card.jp-card-identified.no-radial-gradient .jp-card-front:before, .jp-card.jp-card-identified.no-radial-gradient .jp-card-back:before {       background-image: repeating-linear-gradient(45deg, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), repeating-linear-gradient(135deg, rgba(255, 255, 255, 0.05) 1px, rgba(255, 255, 255, 0) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.03) 4px), repeating-linear-gradient(90deg, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), repeating-linear-gradient(210deg, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), -webkit-linear-gradient(-245deg, rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 0.2) 70%, rgba(255, 255, 255, 0) 90%);       background-image: repeating-linear-gradient(45deg, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), repeating-linear-gradient(135deg, rgba(255, 255, 255, 0.05) 1px, rgba(255, 255, 255, 0) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.03) 4px), repeating-linear-gradient(90deg, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), repeating-linear-gradient(210deg, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), linear-gradient(-25deg, rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 0.2) 70%, rgba(255, 255, 255, 0) 90%); }  /*# sourceMappingURL=data:application/json;base64,ewoJInZlcnNpb24iOiAzLAoJImZpbGUiOiAic3JjL3Njc3MvY2FyZC5zY3NzIiwKCSJzb3VyY2VzIjogWwoJCSJzcmMvc2Nzcy9jYXJkLnNjc3MiLAoJCSJzcmMvc2Nzcy9ib3VyYm9uL2FwcC9hc3NldHMvc3R5bGVzaGVldHMvX2JvdXJib24uc2NzcyIsCgkJInNyYy9zY3NzL2JvdXJib24vYXBwL2Fzc2V0cy9zdHlsZXNoZWV0cy9zZXR0aW5ncy9fcHJlZml4ZXIuc2NzcyIsCgkJInNyYy9zY3NzL2JvdXJib24vYXBwL2Fzc2V0cy9zdHlsZXNoZWV0cy9zZXR0aW5ncy9fcHgtdG8tZW0uc2NzcyIsCgkJInNyYy9zY3NzL2JvdXJib24vYXBwL2Fzc2V0cy9zdHlsZXNoZWV0cy9zZXR0aW5ncy9fYXNzZXQtcGlwZWxpbmUuc2NzcyIsCgkJInNyYy9zY3NzL2JvdXJib24vYXBwL2Fzc2V0cy9zdHlsZXNoZWV0cy9oZWxwZXJzL19ncmFkaWVudC1wb3NpdGlvbnMtcGFyc2VyLnNjc3MiLAoJCSJzcmMvc2Nzcy9ib3VyYm9uL2FwcC9hc3NldHMvc3R5bGVzaGVldHMvaGVscGVycy9fbGluZWFyLXBvc2l0aW9ucy1wYXJzZXIuc2NzcyIsCgkJInNyYy9zY3NzL2JvdXJib24vYXBwL2Fzc2V0cy9zdHlsZXNoZWV0cy9oZWxwZXJzL19yYWRpYWwtYXJnLXBhcnNlci5zY3NzIiwKCQkic3JjL3Njc3MvYm91cmJvbi9hcHAvYXNzZXRzL3N0eWxlc2hlZXRzL2hlbHBlcnMvX3JhZGlhbC1wb3NpdGlvbnMtcGFyc2VyLnNjc3MiLAoJCSJzcmMvc2Nzcy9ib3VyYm9uL2FwcC9hc3NldHMvc3R5bGVzaGVldHMvaGVscGVycy9fcmVuZGVyLWdyYWRpZW50cy5zY3NzIiwKCQkic3JjL3Njc3MvYm91cmJvbi9hcHAvYXNzZXRzL3N0eWxlc2hlZXRzL2hlbHBlcnMvX3NoYXBlLXNpemUtc3RyaXBwZXIuc2NzcyIsCgkJInNyYy9zY3NzL2JvdXJib24vYXBwL2Fzc2V0cy9zdHlsZXNoZWV0cy9mdW5jdGlvbnMvX2NvbG9yLWxpZ2h0bmVzcy5zY3NzIiwKCQkic3JjL3Njc3MvYm91cmJvbi9hcHAvYXNzZXRzL3N0eWxlc2hlZXRzL2Z1bmN0aW9ucy9fZmxleC1ncmlkLnNjc3MiLAoJCSJzcmMvc2Nzcy9ib3VyYm9uL2FwcC9hc3NldHMvc3R5bGVzaGVldHMvZnVuY3Rpb25zL19nb2xkZW4tcmF0aW8uc2NzcyIsCgkJInNyYy9zY3NzL2JvdXJib24vYXBwL2Fzc2V0cy9zdHlsZXNoZWV0cy9mdW5jdGlvbnMvX2dyaWQtd2lkdGguc2NzcyIsCgkJInNyYy9zY3NzL2JvdXJib24vYXBwL2Fzc2V0cy9zdHlsZXNoZWV0cy9mdW5jdGlvbnMvX2xpbmVhci1ncmFkaWVudC5zY3NzIiwKCQkic3JjL3Njc3MvYm91cmJvbi9hcHAvYXNzZXRzL3N0eWxlc2hlZXRzL2Z1bmN0aW9ucy9fbW9kdWxhci1zY2FsZS5zY3NzIiwKCQkic3JjL3Njc3MvYm91cmJvbi9hcHAvYXNzZXRzL3N0eWxlc2hlZXRzL2Z1bmN0aW9ucy9fcHgtdG8tZW0uc2NzcyIsCgkJInNyYy9zY3NzL2JvdXJib24vYXBwL2Fzc2V0cy9zdHlsZXNoZWV0cy9mdW5jdGlvbnMvX3B4LXRvLXJlbS5zY3NzIiwKCQkic3JjL3Njc3MvYm91cmJvbi9hcHAvYXNzZXRzL3N0eWxlc2hlZXRzL2Z1bmN0aW9ucy9fcmFkaWFsLWdyYWRpZW50LnNjc3MiLAoJCSJzcmMvc2Nzcy9ib3VyYm9uL2FwcC9hc3NldHMvc3R5bGVzaGVldHMvZnVuY3Rpb25zL19zdHJpcC11bml0cy5zY3NzIiwKCQkic3JjL3Njc3MvYm91cmJvbi9hcHAvYXNzZXRzL3N0eWxlc2hlZXRzL2Z1bmN0aW9ucy9fdGludC1zaGFkZS5zY3NzIiwKCQkic3JjL3Njc3MvYm91cmJvbi9hcHAvYXNzZXRzL3N0eWxlc2hlZXRzL2Z1bmN0aW9ucy9fdHJhbnNpdGlvbi1wcm9wZXJ0eS1uYW1lLnNjc3MiLAoJCSJzcmMvc2Nzcy9ib3VyYm9uL2FwcC9hc3NldHMvc3R5bGVzaGVldHMvZnVuY3Rpb25zL191bnBhY2suc2NzcyIsCgkJInNyYy9zY3NzL2JvdXJib24vYXBwL2Fzc2V0cy9zdHlsZXNoZWV0cy9jc3MzL19hbmltYXRpb24uc2NzcyIsCgkJInNyYy9zY3NzL2JvdXJib24vYXBwL2Fzc2V0cy9zdHlsZXNoZWV0cy9jc3MzL19hcHBlYXJhbmNlLnNjc3MiLAoJCSJzcmMvc2Nzcy9ib3VyYm9uL2FwcC9hc3NldHMvc3R5bGVzaGVldHMvY3NzMy9fYmFja2ZhY2UtdmlzaWJpbGl0eS5zY3NzIiwKCQkic3JjL3Njc3MvYm91cmJvbi9hcHAvYXNzZXRzL3N0eWxlc2hlZXRzL2NzczMvX2JhY2tncm91bmQuc2NzcyIsCgkJInNyYy9zY3NzL2JvdXJib24vYXBwL2Fzc2V0cy9zdHlsZXNoZWV0cy9jc3MzL19iYWNrZ3JvdW5kLWltYWdlLnNjc3MiLAoJCSJzcmMvc2Nzcy9ib3VyYm9uL2FwcC9hc3NldHMvc3R5bGVzaGVldHMvY3NzMy9fYm9yZGVyLWltYWdlLnNjc3MiLAoJCSJzcmMvc2Nzcy9ib3VyYm9uL2FwcC9hc3NldHMvc3R5bGVzaGVldHMvY3NzMy9fYm9yZGVyLXJhZGl1cy5zY3NzIiwKCQkic3JjL3Njc3MvYm91cmJvbi9hcHAvYXNzZXRzL3N0eWxlc2hlZXRzL2NzczMvX2JveC1zaXppbmcuc2NzcyIsCgkJInNyYy9zY3NzL2JvdXJib24vYXBwL2Fzc2V0cy9zdHlsZXNoZWV0cy9jc3MzL19jYWxjLnNjc3MiLAoJCSJzcmMvc2Nzcy9ib3VyYm9uL2FwcC9hc3NldHMvc3R5bGVzaGVldHMvY3NzMy9fY29sdW1ucy5zY3NzIiwKCQkic3JjL3Njc3MvYm91cmJvbi9hcHAvYXNzZXRzL3N0eWxlc2hlZXRzL2NzczMvX2ZpbHRlci5zY3NzIiwKCQkic3JjL3Njc3MvYm91cmJvbi9hcHAvYXNzZXRzL3N0eWxlc2hlZXRzL2NzczMvX2ZsZXgtYm94LnNjc3MiLAoJCSJzcmMvc2Nzcy9ib3VyYm9uL2FwcC9hc3NldHMvc3R5bGVzaGVldHMvY3NzMy9fZm9udC1mYWNlLnNjc3MiLAoJCSJzcmMvc2Nzcy9ib3VyYm9uL2FwcC9hc3NldHMvc3R5bGVzaGVldHMvY3NzMy9fZm9udC1mZWF0dXJlLXNldHRpbmdzLnNjc3MiLAoJCSJzcmMvc2Nzcy9ib3VyYm9uL2FwcC9hc3NldHMvc3R5bGVzaGVldHMvY3NzMy9faHlwaGVucy5zY3NzIiwKCQkic3JjL3Njc3MvYm91cmJvbi9hcHAvYXNzZXRzL3N0eWxlc2hlZXRzL2NzczMvX2hpZHBpLW1lZGlhLXF1ZXJ5LnNjc3MiLAoJCSJzcmMvc2Nzcy9ib3VyYm9uL2FwcC9hc3NldHMvc3R5bGVzaGVldHMvY3NzMy9faW1hZ2UtcmVuZGVyaW5nLnNjc3MiLAoJCSJzcmMvc2Nzcy9ib3VyYm9uL2FwcC9hc3NldHMvc3R5bGVzaGVldHMvY3NzMy9faW5saW5lLWJsb2NrLnNjc3MiLAoJCSJzcmMvc2Nzcy9ib3VyYm9uL2FwcC9hc3NldHMvc3R5bGVzaGVldHMvY3NzMy9fa2V5ZnJhbWVzLnNjc3MiLAoJCSJzcmMvc2Nzcy9ib3VyYm9uL2FwcC9hc3NldHMvc3R5bGVzaGVldHMvY3NzMy9fbGluZWFyLWdyYWRpZW50LnNjc3MiLAoJCSJzcmMvc2Nzcy9ib3VyYm9uL2FwcC9hc3NldHMvc3R5bGVzaGVldHMvY3NzMy9fcGVyc3BlY3RpdmUuc2NzcyIsCgkJInNyYy9zY3NzL2JvdXJib24vYXBwL2Fzc2V0cy9zdHlsZXNoZWV0cy9jc3MzL19yYWRpYWwtZ3JhZGllbnQuc2NzcyIsCgkJInNyYy9zY3NzL2JvdXJib24vYXBwL2Fzc2V0cy9zdHlsZXNoZWV0cy9jc3MzL190cmFuc2Zvcm0uc2NzcyIsCgkJInNyYy9zY3NzL2JvdXJib24vYXBwL2Fzc2V0cy9zdHlsZXNoZWV0cy9jc3MzL190cmFuc2l0aW9uLnNjc3MiLAoJCSJzcmMvc2Nzcy9ib3VyYm9uL2FwcC9hc3NldHMvc3R5bGVzaGVldHMvY3NzMy9fdXNlci1zZWxlY3Quc2NzcyIsCgkJInNyYy9zY3NzL2JvdXJib24vYXBwL2Fzc2V0cy9zdHlsZXNoZWV0cy9jc3MzL19wbGFjZWhvbGRlci5zY3NzIiwKCQkic3JjL3Njc3MvYm91cmJvbi9hcHAvYXNzZXRzL3N0eWxlc2hlZXRzL2FkZG9ucy9fYnV0dG9uLnNjc3MiLAoJCSJzcmMvc2Nzcy9ib3VyYm9uL2FwcC9hc3NldHMvc3R5bGVzaGVldHMvYWRkb25zL19jbGVhcmZpeC5zY3NzIiwKCQkic3JjL3Njc3MvYm91cmJvbi9hcHAvYXNzZXRzL3N0eWxlc2hlZXRzL2FkZG9ucy9fZGlyZWN0aW9uYWwtdmFsdWVzLnNjc3MiLAoJCSJzcmMvc2Nzcy9ib3VyYm9uL2FwcC9hc3NldHMvc3R5bGVzaGVldHMvYWRkb25zL19lbGxpcHNpcy5zY3NzIiwKCQkic3JjL3Njc3MvYm91cmJvbi9hcHAvYXNzZXRzL3N0eWxlc2hlZXRzL2FkZG9ucy9fZm9udC1mYW1pbHkuc2NzcyIsCgkJInNyYy9zY3NzL2JvdXJib24vYXBwL2Fzc2V0cy9zdHlsZXNoZWV0cy9hZGRvbnMvX2hpZGUtdGV4dC5zY3NzIiwKCQkic3JjL3Njc3MvYm91cmJvbi9hcHAvYXNzZXRzL3N0eWxlc2hlZXRzL2FkZG9ucy9faHRtbDUtaW5wdXQtdHlwZXMuc2NzcyIsCgkJInNyYy9zY3NzL2JvdXJib24vYXBwL2Fzc2V0cy9zdHlsZXNoZWV0cy9hZGRvbnMvX3Bvc2l0aW9uLnNjc3MiLAoJCSJzcmMvc2Nzcy9ib3VyYm9uL2FwcC9hc3NldHMvc3R5bGVzaGVldHMvYWRkb25zL19wcmVmaXhlci5zY3NzIiwKCQkic3JjL3Njc3MvYm91cmJvbi9hcHAvYXNzZXRzL3N0eWxlc2hlZXRzL2FkZG9ucy9fcmV0aW5hLWltYWdlLnNjc3MiLAoJCSJzcmMvc2Nzcy9ib3VyYm9uL2FwcC9hc3NldHMvc3R5bGVzaGVldHMvYWRkb25zL19zaXplLnNjc3MiLAoJCSJzcmMvc2Nzcy9ib3VyYm9uL2FwcC9hc3NldHMvc3R5bGVzaGVldHMvYWRkb25zL190aW1pbmctZnVuY3Rpb25zLnNjc3MiLAoJCSJzcmMvc2Nzcy9ib3VyYm9uL2FwcC9hc3NldHMvc3R5bGVzaGVldHMvYWRkb25zL190cmlhbmdsZS5zY3NzIiwKCQkic3JjL3Njc3MvYm91cmJvbi9hcHAvYXNzZXRzL3N0eWxlc2hlZXRzL2FkZG9ucy9fd29yZC13cmFwLnNjc3MiLAoJCSJzcmMvc2Nzcy9ib3VyYm9uL2FwcC9hc3NldHMvc3R5bGVzaGVldHMvX2JvdXJib24tZGVwcmVjYXRlZC11cGNvbWluZy5zY3NzIiwKCQkic3JjL3Njc3MvX21peGlucy5zY3NzIiwKCQkic3JjL3Njc3MvYnJvd3NlcnMvX3NhZmFyaS5zY3NzIiwKCQkic3JjL3Njc3MvYnJvd3NlcnMvX2llLnNjc3MiLAoJCSJzcmMvc2Nzcy9jYXJkcy9fYW1leC5zY3NzIiwKCQkic3JjL3Njc3MvY2FyZHMvX2NhcmQuc2NzcyIsCgkJInNyYy9zY3NzL2xvZ29zL19hbWV4LnNjc3MiLAoJCSJzcmMvc2Nzcy9sb2dvcy9fbG9nby5zY3NzIiwKCQkic3JjL3Njc3MvY2FyZHMvX2Rpc2NvdmVyLnNjc3MiLAoJCSJzcmMvc2Nzcy9sb2dvcy9fZGlzY292ZXIuc2NzcyIsCgkJInNyYy9zY3NzL2NhcmRzL192aXNhLnNjc3MiLAoJCSJzcmMvc2Nzcy9sb2dvcy9fdmlzYS5zY3NzIiwKCQkic3JjL3Njc3MvY2FyZHMvX21hc3RlcmNhcmQuc2NzcyIsCgkJInNyYy9zY3NzL2xvZ29zL19tYXN0ZXJjYXJkLnNjc3MiLAoJCSJzcmMvc2Nzcy9jYXJkcy9fbWFlc3Ryby5zY3NzIiwKCQkic3JjL3Njc3MvbG9nb3MvX21hZXN0cm8uc2NzcyIsCgkJInNyYy9zY3NzL2NhcmRzL19kYW5rb3J0LnNjc3MiLAoJCSJzcmMvc2Nzcy9sb2dvcy9fZGFua29ydC5zY3NzIiwKCQkic3JjL3Njc3MvY2FyZHMvX2Vsby5zY3NzIiwKCQkic3JjL3Njc3MvbG9nb3MvX2Vsby5zY3NzIgoJXSwKCSJzb3VyY2VzQ29udGVudCI6IFsKCQkiQGltcG9ydCBcImJvdXJib24vYXBwL2Fzc2V0cy9zdHlsZXNoZWV0cy9ib3VyYm9uXCI7XG5AaW1wb3J0IFwibWl4aW5zXCI7XG5cbi8vIGJyb3dzZXIgc3BlY2lmaWMgaGFja3NcbkBpbXBvcnQgXCJicm93c2Vycy9zYWZhcmlcIjtcbkBpbXBvcnQgXCJicm93c2Vycy9pZVwiO1xuXG5AaW1wb3J0IFwiY2FyZHMvYW1leFwiO1xuQGltcG9ydCBcImNhcmRzL2Rpc2NvdmVyXCI7XG5AaW1wb3J0IFwiY2FyZHMvdmlzYVwiO1xuQGltcG9ydCBcImNhcmRzL21hc3RlcmNhcmRcIjtcbkBpbXBvcnQgXCJjYXJkcy9tYWVzdHJvXCI7XG5AaW1wb3J0IFwiY2FyZHMvZGFua29ydFwiO1xuQGltcG9ydCBcImNhcmRzL2Vsb1wiO1xuXG4uanAtY2FyZC1jb250YWluZXIge1xuICAgIEBpbmNsdWRlIHBlcnNwZWN0aXZlKDEwMDBweCk7XG4gICAgd2lkdGg6ICRjYXJkLXdpZHRoO1xuICAgIG1heC13aWR0aDogMTAwJTtcbiAgICBoZWlnaHQ6ICRjYXJkLWhlaWdodDtcbiAgICBtYXJnaW46IGF1dG87XG4gICAgei1pbmRleDogMTtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG59XG5cbi5qcC1jYXJkIHtcbiAgICBmb250LWZhbWlseTogJGNhcmQtZm9udC1mYW1pbHk7XG4gICAgbGluZS1oZWlnaHQ6IDE7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGhlaWdodDogMTAwJTtcbiAgICBtaW4td2lkdGg6IDMxNXB4O1xuICAgIGJvcmRlci1yYWRpdXM6ICRjYXJkLWJvcmRlci1yYWRpdXM7XG5cbiAgICAmID4gKiwgJiA+ICo6YmVmb3JlLCAmID4gKjphZnRlciB7XG4gICAgICAgIC1tb3otYm94LXNpemluZzogYm9yZGVyLWJveDsgLXdlYmtpdC1ib3gtc2l6aW5nOiBib3JkZXItYm94OyBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgICAgICBmb250LWZhbWlseTogaW5oZXJpdDtcbiAgICB9XG5cbiAgICBAaW5jbHVkZSB0cmFuc2Zvcm0tc3R5bGUocHJlc2VydmUtM2QpO1xuICAgIEBpbmNsdWRlIHRyYW5zaXRpb24oYWxsICRjYXJkLXRyYW5zaXRpb24tdGltZSBsaW5lYXIpO1xuXG4gICAgJi5qcC1jYXJkLWZsaXBwZWQge1xuICAgICAgICBAaW5jbHVkZSB0cmFuc2Zvcm0ocm90YXRlWSgxODBkZWcpKTtcbiAgICB9XG5cbiAgICAuanAtY2FyZC1mcm9udCwgLmpwLWNhcmQtYmFjayB7XG4gICAgICAgIEBpbmNsdWRlIGJhY2tmYWNlLXZpc2liaWxpdHkoaGlkZGVuKTtcbiAgICAgICAgQGluY2x1ZGUgdHJhbnNmb3JtLXN0eWxlKHByZXNlcnZlLTNkKTtcbiAgICAgICAgQGluY2x1ZGUgdHJhbnNpdGlvbihhbGwgJGNhcmQtdHJhbnNpdGlvbi10aW1lIGxpbmVhcik7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgdG9wOiAwO1xuICAgICAgICBsZWZ0OiAwO1xuICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgICAgICBib3JkZXItcmFkaXVzOiAkY2FyZC1ib3JkZXItcmFkaXVzO1xuICAgICAgICBiYWNrZ3JvdW5kOiAjREREO1xuXG4gICAgICAgICY6YmVmb3JlIHtcbiAgICAgICAgICAgIEBpbmNsdWRlIHNoYXBlKCk7XG4gICAgICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgICAgIGhlaWdodDogMTAwJTtcbiAgICAgICAgICAgIHRvcDogMDtcbiAgICAgICAgICAgIGxlZnQ6IDA7XG4gICAgICAgICAgICBvcGFjaXR5OiAwO1xuICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogMTBweDtcbiAgICAgICAgICAgIEBpbmNsdWRlIHRyYW5zaXRpb24oYWxsICRjYXJkLXRyYW5zaXRpb24tdGltZSBlYXNlKTtcbiAgICAgICAgfVxuXG4gICAgICAgICY6YWZ0ZXIge1xuICAgICAgICAgICAgQGluY2x1ZGUgc2hhcGUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC5qcC1jYXJkLWRpc3BsYXkge1xuICAgICAgICAgICAgY29sb3I6ICRjYXJkLWZvbnQtY29sb3I7XG4gICAgICAgICAgICBmb250LXdlaWdodDogbm9ybWFsO1xuICAgICAgICAgICAgb3BhY2l0eTogMC41O1xuICAgICAgICAgICAgQGluY2x1ZGUgdHJhbnNpdGlvbihvcGFjaXR5ICRjYXJkLXRyYW5zaXRpb24tdGltZSBsaW5lYXIpO1xuICAgICAgICAgICAgJi5qcC1jYXJkLWZvY3VzZWQge1xuICAgICAgICAgICAgICAgIG9wYWNpdHk6IDE7XG4gICAgICAgICAgICAgICAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgICAgICAgICAgICAgICAmLnZhbGlkIHt9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAuanAtY2FyZC1jdmMge1xuICAgICAgICAgICAgZm9udC1mYW1pbHk6ICRjYXJkLW1vbm9zcGFjZS1mb250LWZhbWlseTtcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMTRweDtcbiAgICAgICAgfVxuXG4gICAgICAgIC5qcC1jYXJkLXNoaW55IHtcbiAgICAgICAgICAgICRjb2xvcjogI0NDQztcbiAgICAgICAgICAgICRyYWRpdXM6IDVweDtcbiAgICAgICAgICAgIHdpZHRoOiA1MHB4O1xuICAgICAgICAgICAgaGVpZ2h0OiAzNXB4O1xuICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogJHJhZGl1cztcbiAgICAgICAgICAgIGJhY2tncm91bmQ6ICRjb2xvcjtcbiAgICAgICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgICAgICY6YmVmb3JlIHtcbiAgICAgICAgICAgICAgICBAaW5jbHVkZSBzaGFwZSgpO1xuICAgICAgICAgICAgICAgICRoZWlnaHQ6IDYwJTtcbiAgICAgICAgICAgICAgICB3aWR0aDogNzAlO1xuICAgICAgICAgICAgICAgIGhlaWdodDogJGhlaWdodDtcbiAgICAgICAgICAgICAgICBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogJHJhZGl1cztcbiAgICAgICAgICAgICAgICBib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1czogJHJhZGl1cztcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiBsaWdodGVuKCRjb2xvciwgNSUpO1xuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgICAgICAgICB0b3A6ICgxMDAlIC0gJGhlaWdodCkgLyAyXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAuanAtY2FyZC1mcm9udCB7XG5cbiAgICAgICAgLmpwLWNhcmQtbG9nb3tcbiAgICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgICAgIG9wYWNpdHk6IDA7XG4gICAgICAgICAgICByaWdodDogNSU7XG4gICAgICAgICAgICB0b3A6IDglO1xuICAgICAgICAgICAgQGluY2x1ZGUgdHJhbnNpdGlvbigkY2FyZC10cmFuc2l0aW9uLXRpbWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgLmpwLWNhcmQtbG93ZXIge1xuICAgICAgICAgICAgJHdpZHRoOiA4MCU7XG4gICAgICAgICAgICB3aWR0aDogJHdpZHRoO1xuICAgICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICAgICAgbGVmdDogKDEwMCUgLSAkd2lkdGgpIC8gMjtcbiAgICAgICAgICAgIGJvdHRvbTogMzBweDtcblxuICAgICAgICAgICAgQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWF4LXdpZHRoIDogNDgwcHgpIHtcbiAgICAgICAgICAgICAgICB3aWR0aDogOTAlO1xuICAgICAgICAgICAgICAgIGxlZnQ6IDUlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAuanAtY2FyZC1jdmMge1xuICAgICAgICAgICAgICAgIHZpc2liaWxpdHk6IGhpZGRlbjtcbiAgICAgICAgICAgICAgICBmbG9hdDogcmlnaHQ7XG4gICAgICAgICAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICAgICAgICAgIGJvdHRvbTogNXB4O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAuanAtY2FyZC1udW1iZXIge1xuICAgICAgICAgICAgICAgIGZvbnQtZmFtaWx5OiAkY2FyZC1tb25vc3BhY2UtZm9udC1mYW1pbHk7XG4gICAgICAgICAgICAgICAgZm9udC1zaXplOiAyNHB4O1xuICAgICAgICAgICAgICAgIGNsZWFyOiBib3RoO1xuICAgICAgICAgICAgICAgIG1hcmdpbi1ib3R0b206IDMwcHg7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC5qcC1jYXJkLWV4cGlyeSB7XG4gICAgICAgICAgICAgICAgZm9udC1mYW1pbHk6ICRjYXJkLW1vbm9zcGFjZS1mb250LWZhbWlseTtcbiAgICAgICAgICAgICAgICAkbGFiZWwtcGFkZGluZzogNXB4O1xuICAgICAgICAgICAgICAgIGxldHRlci1zcGFjaW5nOiAwZW07XG4gICAgICAgICAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICAgICAgICAgIGZsb2F0OiByaWdodDtcbiAgICAgICAgICAgICAgICB3aWR0aDogMjUlO1xuXG4gICAgICAgICAgICAgICAgJjpiZWZvcmUsICY6YWZ0ZXIge1xuICAgICAgICAgICAgICAgICAgICBmb250LWZhbWlseTogJGNhcmQtZm9udC1mYW1pbHk7XG4gICAgICAgICAgICAgICAgICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xuICAgICAgICAgICAgICAgICAgICBmb250LXNpemU6IDdweDtcbiAgICAgICAgICAgICAgICAgICAgd2hpdGUtc3BhY2U6IHByZTtcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgICAgICAgICAgICAgIG9wYWNpdHk6IC41O1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICY6YmVmb3JlIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGVudDogYXR0cihkYXRhLWJlZm9yZSk7XG4gICAgICAgICAgICAgICAgICAgIG1hcmdpbi1ib3R0b206ICRsYWJlbC1wYWRkaW5nIC0gM3B4O1xuICAgICAgICAgICAgICAgICAgICBmb250LXNpemU6IDdweDtcbiAgICAgICAgICAgICAgICAgICAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAmOmFmdGVyIHtcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBhdHRyKGRhdGEtYWZ0ZXIpO1xuICAgICAgICAgICAgICAgICAgICB0ZXh0LWFsaWduOiByaWdodDtcbiAgICAgICAgICAgICAgICAgICAgcmlnaHQ6IDEwMCU7XG4gICAgICAgICAgICAgICAgICAgIG1hcmdpbi1yaWdodDogJGxhYmVsLXBhZGRpbmc7XG4gICAgICAgICAgICAgICAgICAgIG1hcmdpbi10b3A6IDJweDtcbiAgICAgICAgICAgICAgICAgICAgYm90dG9tOiAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLmpwLWNhcmQtbmFtZSB7XG4gICAgICAgICAgICAgICAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbiAgICAgICAgICAgICAgICBmb250LWZhbWlseTogJGNhcmQtbW9ub3NwYWNlLWZvbnQtZmFtaWx5O1xuICAgICAgICAgICAgICAgIGZvbnQtc2l6ZTogMjBweDtcbiAgICAgICAgICAgICAgICBtYXgtaGVpZ2h0OiA0NXB4O1xuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgICAgICAgICBib3R0b206IDA7XG4gICAgICAgICAgICAgICAgd2lkdGg6IDE5MHB4O1xuICAgICAgICAgICAgICAgIGRpc3BsYXk6IC13ZWJraXQtYm94O1xuICAgICAgICAgICAgICAgIC13ZWJraXQtbGluZS1jbGFtcDogMjtcbiAgICAgICAgICAgICAgICAtd2Via2l0LWJveC1vcmllbnQ6IGhvcml6b250YWw7XG4gICAgICAgICAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICAgICAgICAgICAgICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC5qcC1jYXJkLWJhY2sge1xuICAgICAgICBAaW5jbHVkZSB0cmFuc2Zvcm0ocm90YXRlWSgxODBkZWcpKTtcbiAgICAgICAgJGJhci10b3Atb2Zmc2V0OiA0MCU7XG4gICAgICAgICRzaWduYXR1cmUtaGVpZ2h0OiAxNiU7XG4gICAgICAgICRzaWduYXR1cmUtbGVmdDogMiU7XG5cbiAgICAgICAgLmpwLWNhcmQtYmFyIHtcbiAgICAgICAgICAgIEBpbmNsdWRlIGxpbmVhci1ncmFkaWVudCgjNDQ0LCAjMzMzKTtcbiAgICAgICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICAgICAgaGVpZ2h0OiAyMCU7XG4gICAgICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgICAgICB0b3A6IDEwJTtcbiAgICAgICAgfVxuXG4gICAgICAgICY6YWZ0ZXIge1xuICAgICAgICAgICAgQGluY2x1ZGUgc2hhcGUoKTtcbiAgICAgICAgICAgIEBpbmNsdWRlIGxpbmVhci1ncmFkaWVudCgjRkZGLCAjRkZGKTtcbiAgICAgICAgICAgIHdpZHRoOiA4MCU7XG4gICAgICAgICAgICBoZWlnaHQ6ICRzaWduYXR1cmUtaGVpZ2h0O1xuICAgICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICAgICAgdG9wOiAkYmFyLXRvcC1vZmZzZXQ7XG4gICAgICAgICAgICBsZWZ0OiAkc2lnbmF0dXJlLWxlZnQ7XG4gICAgICAgIH1cblxuICAgICAgICAuanAtY2FyZC1jdmMge1xuICAgICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICAgICAgdG9wOiAkYmFyLXRvcC1vZmZzZXQ7XG4gICAgICAgICAgICBsZWZ0OiA4NSU7XG4gICAgICAgICAgICBAaW5jbHVkZSB0cmFuc2l0aW9uLWRlbGF5KCRjYXJkLXRyYW5zaXRpb24tdGltZSArIDIwMG1zKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC5qcC1jYXJkLXNoaW55IHtcbiAgICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgICAgIHRvcDogJGJhci10b3Atb2Zmc2V0ICsgJHNpZ25hdHVyZS1oZWlnaHQgKyAxMCU7XG4gICAgICAgICAgICBsZWZ0OiAkc2lnbmF0dXJlLWxlZnQ7XG5cbiAgICAgICAgICAgICY6YWZ0ZXIge1xuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFwiVGhpcyBjYXJkIGhhcyBiZWVuIGlzc3VlZCBieSBKZXNzZSBQb2xsYWsgYW5kIGlzIGxpY2Vuc2VkIGZvciBhbnlvbmUgdG8gdXNlIGFueXdoZXJlIGZvciBmcmVlLlxcQUl0IGNvbWVzIHdpdGggbm8gd2FycmFudHkuXFxBIEZvciBzdXBwb3J0IGlzc3VlcywgcGxlYXNlIHZpc2l0OiBnaXRodWIuY29tL2plc3NlcG9sbGFrL2NhcmQuXCI7XG4gICAgICAgICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICAgICAgICAgIGxlZnQ6IDEyMCU7XG4gICAgICAgICAgICAgICAgdG9wOiA1JTtcbiAgICAgICAgICAgICAgICBjb2xvcjogd2hpdGU7XG4gICAgICAgICAgICAgICAgZm9udC1zaXplOiA3cHg7XG4gICAgICAgICAgICAgICAgd2lkdGg6IDIzMHB4O1xuICAgICAgICAgICAgICAgIG9wYWNpdHk6IC41O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgJi5qcC1jYXJkLWlkZW50aWZpZWQge1xuICAgICAgICBib3gtc2hhZG93OiAwIDAgMjBweCByZ2JhKDAsMCwwLDAuMyk7XG5cbiAgICAgICAgLmpwLWNhcmQtZnJvbnQsIC5qcC1jYXJkLWJhY2sge1xuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzAwMDtcbiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC41KTtcblxuICAgICAgICAgICAgJjpiZWZvcmUge1xuICAgICAgICAgICAgICAgIEBpbmNsdWRlIHRyYW5zaXRpb24oYWxsICRjYXJkLXRyYW5zaXRpb24tdGltZSBlYXNlKTtcbiAgICAgICAgICAgICAgICBAaW5jbHVkZSBjYXJkLXRleHR1cmUoKTtcbiAgICAgICAgICAgICAgICBvcGFjaXR5OiAxO1xuICAgICAgICAgICAgICAgIC8vIGJveC1zaGFkb3c6IGluc2V0IDAgMCA1cHggcmdiYSgyNTUsMjU1LDI1NSwxKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLmpwLWNhcmQtbG9nbyB7XG4gICAgICAgICAgICAgICAgYm94LXNoYWRvdzogMCAwIDAgMnB4IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgICYubm8tcmFkaWFsLWdyYWRpZW50IHtcbiAgICAgICAgICAgIC5qcC1jYXJkLWZyb250LCAuanAtY2FyZC1iYWNrIHtcbiAgICAgICAgICAgICAgICAmOmJlZm9yZSB7XG4gICAgICAgICAgICAgICAgICAgIEBpbmNsdWRlIGNhcmQtdGV4dHVyZSgkcmFkaWFsLWdyYWRpZW50OiBmYWxzZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuIiwKCQkiLy8gU2V0dGluZ3NcbkBpbXBvcnQgXCJzZXR0aW5ncy9wcmVmaXhlclwiO1xuQGltcG9ydCBcInNldHRpbmdzL3B4LXRvLWVtXCI7XG5AaW1wb3J0IFwic2V0dGluZ3MvYXNzZXQtcGlwZWxpbmVcIjtcblxuLy8gQ3VzdG9tIEhlbHBlcnNcbkBpbXBvcnQgXCJoZWxwZXJzL2dyYWRpZW50LXBvc2l0aW9ucy1wYXJzZXJcIjtcbkBpbXBvcnQgXCJoZWxwZXJzL2xpbmVhci1wb3NpdGlvbnMtcGFyc2VyXCI7XG5AaW1wb3J0IFwiaGVscGVycy9yYWRpYWwtYXJnLXBhcnNlclwiO1xuQGltcG9ydCBcImhlbHBlcnMvcmFkaWFsLXBvc2l0aW9ucy1wYXJzZXJcIjtcbkBpbXBvcnQgXCJoZWxwZXJzL3JlbmRlci1ncmFkaWVudHNcIjtcbkBpbXBvcnQgXCJoZWxwZXJzL3NoYXBlLXNpemUtc3RyaXBwZXJcIjtcblxuLy8gQ3VzdG9tIEZ1bmN0aW9uc1xuQGltcG9ydCBcImZ1bmN0aW9ucy9jb2xvci1saWdodG5lc3NcIjtcbkBpbXBvcnQgXCJmdW5jdGlvbnMvZmxleC1ncmlkXCI7XG5AaW1wb3J0IFwiZnVuY3Rpb25zL2dvbGRlbi1yYXRpb1wiO1xuQGltcG9ydCBcImZ1bmN0aW9ucy9ncmlkLXdpZHRoXCI7XG5AaW1wb3J0IFwiZnVuY3Rpb25zL2xpbmVhci1ncmFkaWVudFwiO1xuQGltcG9ydCBcImZ1bmN0aW9ucy9tb2R1bGFyLXNjYWxlXCI7XG5AaW1wb3J0IFwiZnVuY3Rpb25zL3B4LXRvLWVtXCI7XG5AaW1wb3J0IFwiZnVuY3Rpb25zL3B4LXRvLXJlbVwiO1xuQGltcG9ydCBcImZ1bmN0aW9ucy9yYWRpYWwtZ3JhZGllbnRcIjtcbkBpbXBvcnQgXCJmdW5jdGlvbnMvc3RyaXAtdW5pdHNcIjtcbkBpbXBvcnQgXCJmdW5jdGlvbnMvdGludC1zaGFkZVwiO1xuQGltcG9ydCBcImZ1bmN0aW9ucy90cmFuc2l0aW9uLXByb3BlcnR5LW5hbWVcIjtcbkBpbXBvcnQgXCJmdW5jdGlvbnMvdW5wYWNrXCI7XG5cbi8vIENTUzMgTWl4aW5zXG5AaW1wb3J0IFwiY3NzMy9hbmltYXRpb25cIjtcbkBpbXBvcnQgXCJjc3MzL2FwcGVhcmFuY2VcIjtcbkBpbXBvcnQgXCJjc3MzL2JhY2tmYWNlLXZpc2liaWxpdHlcIjtcbkBpbXBvcnQgXCJjc3MzL2JhY2tncm91bmRcIjtcbkBpbXBvcnQgXCJjc3MzL2JhY2tncm91bmQtaW1hZ2VcIjtcbkBpbXBvcnQgXCJjc3MzL2JvcmRlci1pbWFnZVwiO1xuQGltcG9ydCBcImNzczMvYm9yZGVyLXJhZGl1c1wiO1xuQGltcG9ydCBcImNzczMvYm94LXNpemluZ1wiO1xuQGltcG9ydCBcImNzczMvY2FsY1wiO1xuQGltcG9ydCBcImNzczMvY29sdW1uc1wiO1xuQGltcG9ydCBcImNzczMvZmlsdGVyXCI7XG5AaW1wb3J0IFwiY3NzMy9mbGV4LWJveFwiO1xuQGltcG9ydCBcImNzczMvZm9udC1mYWNlXCI7XG5AaW1wb3J0IFwiY3NzMy9mb250LWZlYXR1cmUtc2V0dGluZ3NcIjtcbkBpbXBvcnQgXCJjc3MzL2h5cGhlbnNcIjtcbkBpbXBvcnQgXCJjc3MzL2hpZHBpLW1lZGlhLXF1ZXJ5XCI7XG5AaW1wb3J0IFwiY3NzMy9pbWFnZS1yZW5kZXJpbmdcIjtcbkBpbXBvcnQgXCJjc3MzL2lubGluZS1ibG9ja1wiO1xuQGltcG9ydCBcImNzczMva2V5ZnJhbWVzXCI7XG5AaW1wb3J0IFwiY3NzMy9saW5lYXItZ3JhZGllbnRcIjtcbkBpbXBvcnQgXCJjc3MzL3BlcnNwZWN0aXZlXCI7XG5AaW1wb3J0IFwiY3NzMy9yYWRpYWwtZ3JhZGllbnRcIjtcbkBpbXBvcnQgXCJjc3MzL3RyYW5zZm9ybVwiO1xuQGltcG9ydCBcImNzczMvdHJhbnNpdGlvblwiO1xuQGltcG9ydCBcImNzczMvdXNlci1zZWxlY3RcIjtcbkBpbXBvcnQgXCJjc3MzL3BsYWNlaG9sZGVyXCI7XG5cbi8vIEFkZG9ucyAmIG90aGVyIG1peGluc1xuQGltcG9ydCBcImFkZG9ucy9idXR0b25cIjtcbkBpbXBvcnQgXCJhZGRvbnMvY2xlYXJmaXhcIjtcbkBpbXBvcnQgXCJhZGRvbnMvZGlyZWN0aW9uYWwtdmFsdWVzXCI7XG5AaW1wb3J0IFwiYWRkb25zL2VsbGlwc2lzXCI7XG5AaW1wb3J0IFwiYWRkb25zL2ZvbnQtZmFtaWx5XCI7XG5AaW1wb3J0IFwiYWRkb25zL2hpZGUtdGV4dFwiO1xuQGltcG9ydCBcImFkZG9ucy9odG1sNS1pbnB1dC10eXBlc1wiO1xuQGltcG9ydCBcImFkZG9ucy9wb3NpdGlvblwiO1xuQGltcG9ydCBcImFkZG9ucy9wcmVmaXhlclwiO1xuQGltcG9ydCBcImFkZG9ucy9yZXRpbmEtaW1hZ2VcIjtcbkBpbXBvcnQgXCJhZGRvbnMvc2l6ZVwiO1xuQGltcG9ydCBcImFkZG9ucy90aW1pbmctZnVuY3Rpb25zXCI7XG5AaW1wb3J0IFwiYWRkb25zL3RyaWFuZ2xlXCI7XG5AaW1wb3J0IFwiYWRkb25zL3dvcmQtd3JhcFwiO1xuXG4vLyBTb29uIHRvIGJlIGRlcHJlY2F0ZWQgTWl4aW5zXG5AaW1wb3J0IFwiYm91cmJvbi1kZXByZWNhdGVkLXVwY29taW5nXCI7XG4iLAoJCSIvLyBWYXJpYWJsZSBzZXR0aW5ncyBmb3IgL2FkZG9ucy9wcmVmaXhlci5zY3NzXG4kcHJlZml4LWZvci13ZWJraXQ6ICAgIHRydWUgIWRlZmF1bHQ7XG4kcHJlZml4LWZvci1tb3ppbGxhOiAgIHRydWUgIWRlZmF1bHQ7XG4kcHJlZml4LWZvci1taWNyb3NvZnQ6IHRydWUgIWRlZmF1bHQ7XG4kcHJlZml4LWZvci1vcGVyYTogICAgIHRydWUgIWRlZmF1bHQ7XG4kcHJlZml4LWZvci1zcGVjOiAgICAgIHRydWUgIWRlZmF1bHQ7IC8vIHJlcXVpcmVkIGZvciBrZXlmcmFtZSBtaXhpblxuIiwKCQkiJGVtLWJhc2U6IDE2cHggIWRlZmF1bHQ7XG4iLAoJCSIkYXNzZXQtcGlwZWxpbmU6IGZhbHNlICFkZWZhdWx0O1xuIiwKCQkiQGZ1bmN0aW9uIF9ncmFkaWVudC1wb3NpdGlvbnMtcGFyc2VyKCRncmFkaWVudC10eXBlLCAkZ3JhZGllbnQtcG9zaXRpb25zKSB7XG4gIEBpZiAkZ3JhZGllbnQtcG9zaXRpb25zXG4gIGFuZCAoJGdyYWRpZW50LXR5cGUgPT0gbGluZWFyKVxuICBhbmQgKHR5cGUtb2YoJGdyYWRpZW50LXBvc2l0aW9ucykgIT0gY29sb3IpIHtcbiAgICAkZ3JhZGllbnQtcG9zaXRpb25zOiBfbGluZWFyLXBvc2l0aW9ucy1wYXJzZXIoJGdyYWRpZW50LXBvc2l0aW9ucyk7XG4gIH1cbiAgQGVsc2UgaWYgJGdyYWRpZW50LXBvc2l0aW9uc1xuICBhbmQgKCRncmFkaWVudC10eXBlID09IHJhZGlhbClcbiAgYW5kICh0eXBlLW9mKCRncmFkaWVudC1wb3NpdGlvbnMpICE9IGNvbG9yKSB7XG4gICAgJGdyYWRpZW50LXBvc2l0aW9uczogX3JhZGlhbC1wb3NpdGlvbnMtcGFyc2VyKCRncmFkaWVudC1wb3NpdGlvbnMpO1xuICB9XG4gIEByZXR1cm4gJGdyYWRpZW50LXBvc2l0aW9ucztcbn1cbiIsCgkJIkBmdW5jdGlvbiBfbGluZWFyLXBvc2l0aW9ucy1wYXJzZXIoJHBvcykge1xuICAkdHlwZTogdHlwZS1vZihudGgoJHBvcywgMSkpO1xuICAkc3BlYzogbnVsbDtcbiAgJGRlZ3JlZTogbnVsbDtcbiAgJHNpZGU6IG51bGw7XG4gICRjb3JuZXI6IG51bGw7XG4gICRsZW5ndGg6IGxlbmd0aCgkcG9zKTtcbiAgLy8gUGFyc2UgU2lkZSBhbmQgY29ybmVyIHBvc2l0aW9uc1xuICBAaWYgKCRsZW5ndGggPiAxKSB7XG4gICAgQGlmIG50aCgkcG9zLCAxKSA9PSBcInRvXCIgeyAvLyBOZXdlciBzeW50YXhcbiAgICAgICRzaWRlOiBudGgoJHBvcywgMik7XG5cbiAgICAgIEBpZiAkbGVuZ3RoID09IDIgeyAvLyBlZy4gdG8gdG9wXG4gICAgICAgIC8vIFN3YXAgZm9yIGJhY2t3YXJkcyBjb21wYXRhYmlsaXR5XG4gICAgICAgICRkZWdyZWU6IF9wb3NpdGlvbi1mbGlwcGVyKG50aCgkcG9zLCAyKSk7XG4gICAgICB9XG4gICAgICBAZWxzZSBpZiAkbGVuZ3RoID09IDMgeyAvLyBlZy4gdG8gdG9wIGxlZnRcbiAgICAgICAgJGNvcm5lcjogbnRoKCRwb3MsIDMpO1xuICAgICAgfVxuICAgIH1cbiAgICBAZWxzZSBpZiAkbGVuZ3RoID09IDIgeyAvLyBPbGRlciBzeW50YXggKFwidG9wIGxlZnRcIilcbiAgICAgICRzaWRlOiBfcG9zaXRpb24tZmxpcHBlcihudGgoJHBvcywgMSkpO1xuICAgICAgJGNvcm5lcjogX3Bvc2l0aW9uLWZsaXBwZXIobnRoKCRwb3MsIDIpKTtcbiAgICB9XG5cbiAgICBAaWYgKFwiI3skc2lkZX0gI3skY29ybmVyfVwiID09IFwibGVmdCB0b3BcIikgb3IgKFwiI3skc2lkZX0gI3skY29ybmVyfVwiID09IFwidG9wIGxlZnRcIikge1xuICAgICAgJGRlZ3JlZTogX3Bvc2l0aW9uLWZsaXBwZXIoI3skc2lkZX0pIF9wb3NpdGlvbi1mbGlwcGVyKCN7JGNvcm5lcn0pO1xuICAgIH1cbiAgICBAZWxzZSBpZiAoXCIjeyRzaWRlfSAjeyRjb3JuZXJ9XCIgPT0gXCJyaWdodCB0b3BcIikgb3IgKFwiI3skc2lkZX0gI3skY29ybmVyfVwiID09IFwidG9wIHJpZ2h0XCIpIHtcbiAgICAgICRkZWdyZWU6IF9wb3NpdGlvbi1mbGlwcGVyKCN7JHNpZGV9KSBfcG9zaXRpb24tZmxpcHBlcigjeyRjb3JuZXJ9KTtcbiAgICB9XG4gICAgQGVsc2UgaWYgKFwiI3skc2lkZX0gI3skY29ybmVyfVwiID09IFwicmlnaHQgYm90dG9tXCIpIG9yIChcIiN7JHNpZGV9ICN7JGNvcm5lcn1cIiA9PSBcImJvdHRvbSByaWdodFwiKSB7XG4gICAgICAkZGVncmVlOiBfcG9zaXRpb24tZmxpcHBlcigjeyRzaWRlfSkgX3Bvc2l0aW9uLWZsaXBwZXIoI3skY29ybmVyfSk7XG4gICAgfVxuICAgIEBlbHNlIGlmIChcIiN7JHNpZGV9ICN7JGNvcm5lcn1cIiA9PSBcImxlZnQgYm90dG9tXCIpIG9yIChcIiN7JHNpZGV9ICN7JGNvcm5lcn1cIiA9PSBcImJvdHRvbSBsZWZ0XCIpIHtcbiAgICAgICRkZWdyZWU6IF9wb3NpdGlvbi1mbGlwcGVyKCN7JHNpZGV9KSBfcG9zaXRpb24tZmxpcHBlcigjeyRjb3JuZXJ9KTtcbiAgICB9XG4gICAgJHNwZWM6IHRvICRzaWRlICRjb3JuZXI7XG4gIH1cbiAgQGVsc2UgaWYgJGxlbmd0aCA9PSAxIHtcbiAgICAvLyBTd2FwIGZvciBiYWNrd2FyZHMgY29tcGF0YWJpbGl0eVxuICAgIEBpZiAkdHlwZSA9PSBzdHJpbmcge1xuICAgICAgJGRlZ3JlZTogJHBvcztcbiAgICAgICRzcGVjOiB0byBfcG9zaXRpb24tZmxpcHBlcigkcG9zKTtcbiAgICB9XG4gICAgQGVsc2Uge1xuICAgICAgJGRlZ3JlZTogLTI3MCAtICRwb3M7IC8vcm90YXRlIHRoZSBncmFkaWVudCBvcHBvc2l0ZSBmcm9tIHNwZWNcbiAgICAgICRzcGVjOiAkcG9zO1xuICAgIH1cbiAgfVxuICAkZGVncmVlOiB1bnF1b3RlKCRkZWdyZWUgKyBcIixcIik7XG4gICRzcGVjOiAgIHVucXVvdGUoJHNwZWMgKyBcIixcIik7XG4gIEByZXR1cm4gJGRlZ3JlZSAkc3BlYztcbn1cblxuQGZ1bmN0aW9uIF9wb3NpdGlvbi1mbGlwcGVyKCRwb3MpIHtcbiBAcmV0dXJuIGlmKCRwb3MgPT0gbGVmdCwgcmlnaHQsIG51bGwpXG4gICAgICAgICBpZigkcG9zID09IHJpZ2h0LCBsZWZ0LCBudWxsKVxuICAgICAgICAgaWYoJHBvcyA9PSB0b3AsIGJvdHRvbSwgbnVsbClcbiAgICAgICAgIGlmKCRwb3MgPT0gYm90dG9tLCB0b3AsIG51bGwpO1xufVxuIiwKCQkiQGZ1bmN0aW9uIF9yYWRpYWwtYXJnLXBhcnNlcigkRzEsICRHMiwgJHBvcywgJHNoYXBlLXNpemUpIHtcbiAgQGVhY2ggJHZhbHVlIGluICRHMSwgJEcyIHtcbiAgICAkZmlyc3QtdmFsOiBudGgoJHZhbHVlLCAxKTtcbiAgICAkcG9zLXR5cGU6ICB0eXBlLW9mKCRmaXJzdC12YWwpO1xuICAgICRzcGVjLWF0LWluZGV4OiBudWxsO1xuXG4gICAgLy8gRGV0ZXJtaW5lIGlmIHNwZWMgd2FzIHBhc3NlZCB0byBtaXhpblxuICAgIEBpZiB0eXBlLW9mKCR2YWx1ZSkgPT0gbGlzdCB7XG4gICAgICAkc3BlYy1hdC1pbmRleDogaWYoaW5kZXgoJHZhbHVlLCBhdCksIGluZGV4KCR2YWx1ZSwgYXQpLCBmYWxzZSk7XG4gICAgfVxuICAgIEBpZiAkc3BlYy1hdC1pbmRleCB7XG4gICAgICBAaWYgJHNwZWMtYXQtaW5kZXggPiAxIHtcbiAgICAgICAgQGZvciAkaSBmcm9tIDEgdGhyb3VnaCAoJHNwZWMtYXQtaW5kZXggLSAxKSB7XG4gICAgICAgICAgJHNoYXBlLXNpemU6ICRzaGFwZS1zaXplIG50aCgkdmFsdWUsICRpKTtcbiAgICAgICAgfVxuICAgICAgICBAZm9yICRpIGZyb20gKCRzcGVjLWF0LWluZGV4ICsgMSkgdGhyb3VnaCBsZW5ndGgoJHZhbHVlKSB7XG4gICAgICAgICAgJHBvczogJHBvcyBudGgoJHZhbHVlLCAkaSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIEBlbHNlIGlmICRzcGVjLWF0LWluZGV4ID09IDEge1xuICAgICAgICBAZm9yICRpIGZyb20gKCRzcGVjLWF0LWluZGV4ICsgMSkgdGhyb3VnaCBsZW5ndGgoJHZhbHVlKSB7XG4gICAgICAgICAgJHBvczogJHBvcyBudGgoJHZhbHVlLCAkaSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgICRHMTogbnVsbDtcbiAgICB9XG5cbiAgICAvLyBJZiBub3Qgc3BlYyBjYWxjdWxhdGUgY29ycmVjdCB2YWx1ZXNcbiAgICBAZWxzZSB7XG4gICAgICBAaWYgKCRwb3MtdHlwZSAhPSBjb2xvcikgb3IgKCRmaXJzdC12YWwgIT0gXCJ0cmFuc3BhcmVudFwiKSB7XG4gICAgICAgIEBpZiAoJHBvcy10eXBlID09IG51bWJlcilcbiAgICAgICAgb3IgKCRmaXJzdC12YWwgPT0gXCJjZW50ZXJcIilcbiAgICAgICAgb3IgKCRmaXJzdC12YWwgPT0gXCJ0b3BcIilcbiAgICAgICAgb3IgKCRmaXJzdC12YWwgPT0gXCJyaWdodFwiKVxuICAgICAgICBvciAoJGZpcnN0LXZhbCA9PSBcImJvdHRvbVwiKVxuICAgICAgICBvciAoJGZpcnN0LXZhbCA9PSBcImxlZnRcIikge1xuXG4gICAgICAgICAgJHBvczogJHZhbHVlO1xuXG4gICAgICAgICAgQGlmICRwb3MgPT0gJEcxIHtcbiAgICAgICAgICAgICRHMTogbnVsbDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBAZWxzZSBpZlxuICAgICAgICAgICAoJGZpcnN0LXZhbCA9PSBcImVsbGlwc2VcIilcbiAgICAgICAgb3IgKCRmaXJzdC12YWwgPT0gXCJjaXJjbGVcIilcbiAgICAgICAgb3IgKCRmaXJzdC12YWwgPT0gXCJjbG9zZXN0LXNpZGVcIilcbiAgICAgICAgb3IgKCRmaXJzdC12YWwgPT0gXCJjbG9zZXN0LWNvcm5lclwiKVxuICAgICAgICBvciAoJGZpcnN0LXZhbCA9PSBcImZhcnRoZXN0LXNpZGVcIilcbiAgICAgICAgb3IgKCRmaXJzdC12YWwgPT0gXCJmYXJ0aGVzdC1jb3JuZXJcIilcbiAgICAgICAgb3IgKCRmaXJzdC12YWwgPT0gXCJjb250YWluXCIpXG4gICAgICAgIG9yICgkZmlyc3QtdmFsID09IFwiY292ZXJcIikge1xuXG4gICAgICAgICAgJHNoYXBlLXNpemU6ICR2YWx1ZTtcblxuICAgICAgICAgIEBpZiAkdmFsdWUgPT0gJEcxIHtcbiAgICAgICAgICAgICRHMTogbnVsbDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBAZWxzZSBpZiAkdmFsdWUgPT0gJEcyIHtcbiAgICAgICAgICAgICRHMjogbnVsbDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgQHJldHVybiAkRzEsICRHMiwgJHBvcywgJHNoYXBlLXNpemU7XG59XG4iLAoJCSJAZnVuY3Rpb24gX3JhZGlhbC1wb3NpdGlvbnMtcGFyc2VyKCRncmFkaWVudC1wb3MpIHtcbiAgJHNoYXBlLXNpemU6IG50aCgkZ3JhZGllbnQtcG9zLCAxKTtcbiAgJHBvczogICAgICAgIG50aCgkZ3JhZGllbnQtcG9zLCAyKTtcbiAgJHNoYXBlLXNpemUtc3BlYzogX3NoYXBlLXNpemUtc3RyaXBwZXIoJHNoYXBlLXNpemUpO1xuXG4gICRwcmUtc3BlYzogdW5xdW90ZShpZigkcG9zLCBcIiN7JHBvc30sIFwiLCBudWxsKSlcbiAgICAgICAgICAgICB1bnF1b3RlKGlmKCRzaGFwZS1zaXplLCBcIiN7JHNoYXBlLXNpemV9LFwiLCBudWxsKSk7XG4gICRwb3Mtc3BlYzogaWYoJHBvcywgXCJhdCAjeyRwb3N9XCIsIG51bGwpO1xuXG4gICRzcGVjOiBcIiN7JHNoYXBlLXNpemUtc3BlY30gI3skcG9zLXNwZWN9XCI7XG5cbiAgLy8gQWRkIGNvbW1hXG4gIEBpZiAoJHNwZWMgIT0gJyAgJykge1xuICAgICRzcGVjOiBcIiN7JHNwZWN9LFwiXG4gIH1cblxuICBAcmV0dXJuICRwcmUtc3BlYyAkc3BlYztcbn1cbiIsCgkJIi8vIFVzZXIgZm9yIGxpbmVhciBhbmQgcmFkaWFsIGdyYWRpZW50cyB3aXRoaW4gYmFja2dyb3VuZC1pbWFnZSBvciBib3JkZXItaW1hZ2UgcHJvcGVydGllc1xuXG5AZnVuY3Rpb24gX3JlbmRlci1ncmFkaWVudHMoJGdyYWRpZW50LXBvc2l0aW9ucywgJGdyYWRpZW50cywgJGdyYWRpZW50LXR5cGUsICR2ZW5kb3I6IGZhbHNlKSB7XG4gICRwcmUtc3BlYzogbnVsbDtcbiAgJHNwZWM6IG51bGw7XG4gICR2ZW5kb3ItZ3JhZGllbnRzOiBudWxsO1xuICBAaWYgJGdyYWRpZW50LXR5cGUgPT0gbGluZWFyIHtcbiAgICBAaWYgJGdyYWRpZW50LXBvc2l0aW9ucyB7XG4gICAgICAkcHJlLXNwZWM6IG50aCgkZ3JhZGllbnQtcG9zaXRpb25zLCAxKTtcbiAgICAgICRzcGVjOiAgICAgbnRoKCRncmFkaWVudC1wb3NpdGlvbnMsIDIpO1xuICAgIH1cbiAgfVxuICBAZWxzZSBpZiAkZ3JhZGllbnQtdHlwZSA9PSByYWRpYWwge1xuICAgICRwcmUtc3BlYzogbnRoKCRncmFkaWVudC1wb3NpdGlvbnMsIDEpO1xuICAgICRzcGVjOiAgICAgbnRoKCRncmFkaWVudC1wb3NpdGlvbnMsIDIpO1xuICB9XG5cbiAgQGlmICR2ZW5kb3Ige1xuICAgICR2ZW5kb3ItZ3JhZGllbnRzOiAtI3skdmVuZG9yfS0jeyRncmFkaWVudC10eXBlfS1ncmFkaWVudCgjeyRwcmUtc3BlY30gJGdyYWRpZW50cyk7XG4gIH1cbiAgQGVsc2UgaWYgJHZlbmRvciA9PSBmYWxzZSB7XG4gICAgJHZlbmRvci1ncmFkaWVudHM6IFwiI3skZ3JhZGllbnQtdHlwZX0tZ3JhZGllbnQoI3skc3BlY30gI3skZ3JhZGllbnRzfSlcIjtcbiAgICAkdmVuZG9yLWdyYWRpZW50czogdW5xdW90ZSgkdmVuZG9yLWdyYWRpZW50cyk7XG4gIH1cbiAgQHJldHVybiAkdmVuZG9yLWdyYWRpZW50cztcbn1cbiIsCgkJIkBmdW5jdGlvbiBfc2hhcGUtc2l6ZS1zdHJpcHBlcigkc2hhcGUtc2l6ZSkge1xuICAkc2hhcGUtc2l6ZS1zcGVjOiBudWxsO1xuICBAZWFjaCAkdmFsdWUgaW4gJHNoYXBlLXNpemUge1xuICAgIEBpZiAoJHZhbHVlID09IFwiY292ZXJcIikgb3IgKCR2YWx1ZSA9PSBcImNvbnRhaW5cIikge1xuICAgICAgJHZhbHVlOiBudWxsO1xuICAgIH1cbiAgICAkc2hhcGUtc2l6ZS1zcGVjOiBcIiN7JHNoYXBlLXNpemUtc3BlY30gI3skdmFsdWV9XCI7XG4gIH1cbiAgQHJldHVybiAkc2hhcGUtc2l6ZS1zcGVjO1xufVxuIiwKCQkiLy8gUHJvZ3JhbWF0aWNhbGx5IGRldGVybWluZXMgd2hldGhlciBhIGNvbG9yIGlzIGxpZ2h0IG9yIGRhcmtcbi8vIFJldHVybnMgYSBib29sZWFuXG4vLyBNb3JlIGRldGFpbHMgaGVyZSBodHRwOi8vcm9ib3RzLnRob3VnaHRib3QuY29tL2Nsb3Nlci1sb29rLWNvbG9yLWxpZ2h0bmVzc1xuXG5AZnVuY3Rpb24gaXMtbGlnaHQoJGhleC1jb2xvcikge1xuICAkLWxvY2FsLXJlZDogcmVkKHJnYmEoJGhleC1jb2xvciwgMS4wKSk7XG4gICQtbG9jYWwtZ3JlZW46IGdyZWVuKHJnYmEoJGhleC1jb2xvciwgMS4wKSk7XG4gICQtbG9jYWwtYmx1ZTogYmx1ZShyZ2JhKCRoZXgtY29sb3IsIDEuMCkpO1xuXG4gICQtbG9jYWwtbGlnaHRuZXNzOiAoJC1sb2NhbC1yZWQgKiAwLjIxMjYgKyAkLWxvY2FsLWdyZWVuICogMC43MTUyICsgJC1sb2NhbC1ibHVlICogMC4wNzIyKSAvIDI1NTtcblxuICBAcmV0dXJuICQtbG9jYWwtbGlnaHRuZXNzID4gLjY7XG59XG4iLAoJCSIvLyBGbGV4aWJsZSBncmlkXG5AZnVuY3Rpb24gZmxleC1ncmlkKCRjb2x1bW5zLCAkY29udGFpbmVyLWNvbHVtbnM6ICRmZy1tYXgtY29sdW1ucykge1xuICAkd2lkdGg6ICRjb2x1bW5zICogJGZnLWNvbHVtbiArICgkY29sdW1ucyAtIDEpICogJGZnLWd1dHRlcjtcbiAgJGNvbnRhaW5lci13aWR0aDogJGNvbnRhaW5lci1jb2x1bW5zICogJGZnLWNvbHVtbiArICgkY29udGFpbmVyLWNvbHVtbnMgLSAxKSAqICRmZy1ndXR0ZXI7XG4gIEByZXR1cm4gcGVyY2VudGFnZSgkd2lkdGggLyAkY29udGFpbmVyLXdpZHRoKTtcbn1cblxuLy8gRmxleGlibGUgZ3V0dGVyXG5AZnVuY3Rpb24gZmxleC1ndXR0ZXIoJGNvbnRhaW5lci1jb2x1bW5zOiAkZmctbWF4LWNvbHVtbnMsICRndXR0ZXI6ICRmZy1ndXR0ZXIpIHtcbiAgJGNvbnRhaW5lci13aWR0aDogJGNvbnRhaW5lci1jb2x1bW5zICogJGZnLWNvbHVtbiArICgkY29udGFpbmVyLWNvbHVtbnMgLSAxKSAqICRmZy1ndXR0ZXI7XG4gIEByZXR1cm4gcGVyY2VudGFnZSgkZ3V0dGVyIC8gJGNvbnRhaW5lci13aWR0aCk7XG59XG5cbi8vIFRoZSAkZmctY29sdW1uLCAkZmctZ3V0dGVyIGFuZCAkZmctbWF4LWNvbHVtbnMgdmFyaWFibGVzIG11c3QgYmUgZGVmaW5lZCBpbiB5b3VyIGJhc2Ugc3R5bGVzaGVldCB0byBwcm9wZXJseSB1c2UgdGhlIGZsZXgtZ3JpZCBmdW5jdGlvbi5cbi8vIFRoaXMgZnVuY3Rpb24gdGFrZXMgdGhlIGZsdWlkIGdyaWQgZXF1YXRpb24gKHRhcmdldCAvIGNvbnRleHQgPSByZXN1bHQpIGFuZCB1c2VzIGNvbHVtbnMgdG8gaGVscCBkZWZpbmUgZWFjaC5cbi8vXG4vLyBUaGUgY2FsY3VsYXRpb24gcHJlc3VtZXMgdGhhdCB5b3VyIGNvbHVtbiBzdHJ1Y3R1cmUgd2lsbCBiZSBtaXNzaW5nIHRoZSBsYXN0IGd1dHRlcjpcbi8vXG4vLyAgIC0tIGNvbHVtbiAtLSBndXR0ZXIgLS0gY29sdW1uIC0tIGd1dHRlciAtLSBjb2x1bW5cbi8vXG4vLyAgJGZnLWNvbHVtbjogNjBweDsgICAgICAgICAgICAgLy8gQ29sdW1uIFdpZHRoXG4vLyAgJGZnLWd1dHRlcjogMjVweDsgICAgICAgICAgICAgLy8gR3V0dGVyIFdpZHRoXG4vLyAgJGZnLW1heC1jb2x1bW5zOiAxMjsgICAgICAgICAgLy8gVG90YWwgQ29sdW1ucyBGb3IgTWFpbiBDb250YWluZXJcbi8vXG4vLyAgZGl2IHtcbi8vICAgIHdpZHRoOiBmbGV4LWdyaWQoNCk7ICAgICAgICAvLyByZXR1cm5zICgzMTVweCAvIDk5NXB4KSA9IDMxLjY1ODI5JTtcbi8vICAgIG1hcmdpbi1sZWZ0OiBmbGV4LWd1dHRlcigpOyAvLyByZXR1cm5zICgyNXB4IC8gOTk1cHgpID0gMi41MTI1NiU7XG4vL1xuLy8gICAgcCB7XG4vLyAgICAgIHdpZHRoOiBmbGV4LWdyaWQoMiwgNCk7ICAvLyByZXR1cm5zICgxNDVweCAvIDMxNXB4KSA9IDQ2LjAzMTc0NiU7XG4vLyAgICAgIGZsb2F0OiBsZWZ0O1xuLy8gICAgICBtYXJnaW46IGZsZXgtZ3V0dGVyKDQpOyAgLy8gcmV0dXJucyAoMjVweCAvIDMxNXB4KSA9IDcuOTM2NTA4JTtcbi8vICAgIH1cbi8vXG4vLyAgICBibG9ja3F1b3RlIHtcbi8vICAgICAgZmxvYXQ6IGxlZnQ7XG4vLyAgICAgIHdpZHRoOiBmbGV4LWdyaWQoMiwgNCk7IC8vIHJldHVybnMgKDE0NXB4IC8gMzE1cHgpID0gNDYuMDMxNzQ2JTtcbi8vICAgIH1cbi8vICB9IiwKCQkiQGZ1bmN0aW9uIGdvbGRlbi1yYXRpbygkdmFsdWUsICRpbmNyZW1lbnQpIHtcbiAgQHJldHVybiBtb2R1bGFyLXNjYWxlKCR2YWx1ZSwgJGluY3JlbWVudCwgJGdvbGRlbilcbn1cbiIsCgkJIkBmdW5jdGlvbiBncmlkLXdpZHRoKCRuKSB7XG4gIEByZXR1cm4gJG4gKiAkZ3ctY29sdW1uICsgKCRuIC0gMSkgKiAkZ3ctZ3V0dGVyO1xufVxuXG4vLyBUaGUgJGd3LWNvbHVtbiBhbmQgJGd3LWd1dHRlciB2YXJpYWJsZXMgbXVzdCBiZSBkZWZpbmVkIGluIHlvdXIgYmFzZSBzdHlsZXNoZWV0IHRvIHByb3Blcmx5IHVzZSB0aGUgZ3JpZC13aWR0aCBmdW5jdGlvbi5cbi8vXG4vLyAgJGd3LWNvbHVtbjogMTAwcHg7ICAgICAgICAgLy8gQ29sdW1uIFdpZHRoXG4vLyAgJGd3LWd1dHRlcjogNDBweDsgICAgICAgICAgLy8gR3V0dGVyIFdpZHRoXG4vL1xuLy8gIGRpdiB7XG4vLyAgICB3aWR0aDogZ3JpZC13aWR0aCg0KTsgICAgLy8gcmV0dXJucyA1MjBweDtcbi8vICAgIG1hcmdpbi1sZWZ0OiAkZ3ctZ3V0dGVyOyAvLyByZXR1cm5zIDQwcHg7XG4vLyAgfVxuIiwKCQkiQGZ1bmN0aW9uIGxpbmVhci1ncmFkaWVudCgkcG9zLCAkZ3JhZGllbnRzLi4uKSB7XG4gICR0eXBlOiBsaW5lYXI7XG4gICRwb3MtdHlwZTogdHlwZS1vZihudGgoJHBvcywgMSkpO1xuXG4gIC8vIGlmICRwb3MgZG9lc24ndCBleGlzdCwgZml4ICRncmFkaWVudFxuICBAaWYgKCRwb3MtdHlwZSA9PSBjb2xvcikgb3IgKG50aCgkcG9zLCAxKSA9PSBcInRyYW5zcGFyZW50XCIpICB7XG4gICAgJGdyYWRpZW50czogemlwKCRwb3MgJGdyYWRpZW50cyk7XG4gICAgJHBvczogZmFsc2U7XG4gIH1cblxuICAkdHlwZS1ncmFkaWVudDogJHR5cGUsICRwb3MsICRncmFkaWVudHM7XG4gIEByZXR1cm4gJHR5cGUtZ3JhZGllbnQ7XG59XG4iLAoJCSIvLyBTY2FsaW5nIFZhcmlhYmxlc1xuJGdvbGRlbjogICAgICAgICAgIDEuNjE4O1xuJG1pbm9yLXNlY29uZDogICAgIDEuMDY3O1xuJG1ham9yLXNlY29uZDogICAgIDEuMTI1O1xuJG1pbm9yLXRoaXJkOiAgICAgIDEuMjtcbiRtYWpvci10aGlyZDogICAgICAxLjI1O1xuJHBlcmZlY3QtZm91cnRoOiAgIDEuMzMzO1xuJGF1Z21lbnRlZC1mb3VydGg6IDEuNDE0O1xuJHBlcmZlY3QtZmlmdGg6ICAgIDEuNTtcbiRtaW5vci1zaXh0aDogICAgICAxLjY7XG4kbWFqb3Itc2l4dGg6ICAgICAgMS42Njc7XG4kbWlub3Itc2V2ZW50aDogICAgMS43Nzg7XG4kbWFqb3Itc2V2ZW50aDogICAgMS44NzU7XG4kb2N0YXZlOiAgICAgICAgICAgMjtcbiRtYWpvci10ZW50aDogICAgICAyLjU7XG4kbWFqb3ItZWxldmVudGg6ICAgMi42Njc7XG4kbWFqb3ItdHdlbGZ0aDogICAgMztcbiRkb3VibGUtb2N0YXZlOiAgICA0O1xuXG5AZnVuY3Rpb24gbW9kdWxhci1zY2FsZSgkdmFsdWUsICRpbmNyZW1lbnQsICRyYXRpbykge1xuICAkdjE6IG50aCgkdmFsdWUsIDEpO1xuICAkdjI6IG50aCgkdmFsdWUsIGxlbmd0aCgkdmFsdWUpKTtcbiAgJHZhbHVlOiAkdjE7XG5cbiAgLy8gc2NhbGUgJHYyIHRvIGp1c3QgYWJvdmUgJHYxXG4gIEB3aGlsZSAkdjIgPiAkdjEge1xuICAgICR2MjogKCR2MiAvICRyYXRpbyk7IC8vIHdpbGwgYmUgb2ZmLWJ5LTFcbiAgfVxuICBAd2hpbGUgJHYyIDwgJHYxIHtcbiAgICAkdjI6ICgkdjIgKiAkcmF0aW8pOyAvLyB3aWxsIGZpeCBvZmYtYnktMVxuICB9XG5cbiAgLy8gY2hlY2sgQUZURVIgc2NhbGluZyAkdjIgdG8gcHJldmVudCBkb3VibGUtY291bnRpbmcgY29ybmVyLWNhc2VcbiAgJGRvdWJsZS1zdHJhbmRlZDogJHYyID4gJHYxO1xuXG4gIEBpZiAkaW5jcmVtZW50ID4gMCB7XG4gICAgQGZvciAkaSBmcm9tIDEgdGhyb3VnaCAkaW5jcmVtZW50IHtcbiAgICAgIEBpZiAkZG91YmxlLXN0cmFuZGVkIGFuZCAoJHYxICogJHJhdGlvKSA+ICR2MiB7XG4gICAgICAgICR2YWx1ZTogJHYyO1xuICAgICAgICAkdjI6ICgkdjIgKiAkcmF0aW8pO1xuICAgICAgfSBAZWxzZSB7XG4gICAgICAgICR2MTogKCR2MSAqICRyYXRpbyk7XG4gICAgICAgICR2YWx1ZTogJHYxO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIEBpZiAkaW5jcmVtZW50IDwgMCB7XG4gICAgLy8gYWRqdXN0ICR2MiB0byBqdXN0IGJlbG93ICR2MVxuICAgIEBpZiAkZG91YmxlLXN0cmFuZGVkIHtcbiAgICAgICR2MjogKCR2MiAvICRyYXRpbyk7XG4gICAgfVxuXG4gICAgQGZvciAkaSBmcm9tICRpbmNyZW1lbnQgdGhyb3VnaCAtMSB7XG4gICAgICBAaWYgJGRvdWJsZS1zdHJhbmRlZCBhbmQgKCR2MSAvICRyYXRpbykgPCAkdjIge1xuICAgICAgICAkdmFsdWU6ICR2MjtcbiAgICAgICAgJHYyOiAoJHYyIC8gJHJhdGlvKTtcbiAgICAgIH0gQGVsc2Uge1xuICAgICAgICAkdjE6ICgkdjEgLyAkcmF0aW8pO1xuICAgICAgICAkdmFsdWU6ICR2MTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBAcmV0dXJuICR2YWx1ZTtcbn1cbiIsCgkJIi8vIENvbnZlcnQgcGl4ZWxzIHRvIGVtc1xuLy8gZWcuIGZvciBhIHJlbGF0aW9uYWwgdmFsdWUgb2YgMTJweCB3cml0ZSBlbSgxMikgd2hlbiB0aGUgcGFyZW50IGlzIDE2cHhcbi8vIGlmIHRoZSBwYXJlbnQgaXMgYW5vdGhlciB2YWx1ZSBzYXkgMjRweCB3cml0ZSBlbSgxMiwgMjQpXG5cbkBmdW5jdGlvbiBlbSgkcHh2YWwsICRiYXNlOiAkZW0tYmFzZSkge1xuICBAaWYgbm90IHVuaXRsZXNzKCRweHZhbCkge1xuICAgICAgJHB4dmFsOiBzdHJpcC11bml0cygkcHh2YWwpO1xuICB9XG4gIEBpZiBub3QgdW5pdGxlc3MoJGJhc2UpIHtcbiAgICAgICRiYXNlOiBzdHJpcC11bml0cygkYmFzZSk7XG4gIH1cbiAgQHJldHVybiAoJHB4dmFsIC8gJGJhc2UpICogMWVtO1xufVxuIiwKCQkiLy8gQ29udmVydCBwaXhlbHMgdG8gcmVtc1xuLy8gZWcuIGZvciBhIHJlbGF0aW9uYWwgdmFsdWUgb2YgMTJweCB3cml0ZSByZW0oMTIpXG4vLyBBc3N1bWVzICRlbS1iYXNlIGlzIHRoZSBmb250LXNpemUgb2YgPGh0bWw+XG5cbkBmdW5jdGlvbiByZW0oJHB4dmFsKSB7XG4gIEBpZiBub3QgdW5pdGxlc3MoJHB4dmFsKSB7XG4gICAgICAkcHh2YWw6IHN0cmlwLXVuaXRzKCRweHZhbCk7XG4gIH1cblxuICAkYmFzZTogJGVtLWJhc2U7XG4gIEBpZiBub3QgdW5pdGxlc3MoJGJhc2UpIHtcbiAgICAgICRiYXNlOiBzdHJpcC11bml0cygkYmFzZSk7XG4gIH1cbiAgQHJldHVybiAoJHB4dmFsIC8gJGJhc2UpICogMXJlbTtcbn1cbiIsCgkJIi8vIFRoaXMgZnVuY3Rpb24gaXMgcmVxdWlyZWQgYW5kIHVzZWQgYnkgdGhlIGJhY2tncm91bmQtaW1hZ2UgbWl4aW4uXG5AZnVuY3Rpb24gcmFkaWFsLWdyYWRpZW50KCRHMSwgICAgICAgICRHMixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgJEczOiBudWxsLCAgJEc0OiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAkRzU6IG51bGwsICAkRzY6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICRHNzogbnVsbCwgICRHODogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgJEc5OiBudWxsLCAgJEcxMDogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgJHBvczogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgJHNoYXBlLXNpemU6IG51bGwpIHtcblxuICAkZGF0YTogX3JhZGlhbC1hcmctcGFyc2VyKCRHMSwgJEcyLCAkcG9zLCAkc2hhcGUtc2l6ZSk7XG4gICRHMTogIG50aCgkZGF0YSwgMSk7XG4gICRHMjogIG50aCgkZGF0YSwgMik7XG4gICRwb3M6IG50aCgkZGF0YSwgMyk7XG4gICRzaGFwZS1zaXplOiBudGgoJGRhdGEsIDQpO1xuXG4gICR0eXBlOiByYWRpYWw7XG4gICRncmFkaWVudDogJEcxLCAkRzIsICRHMywgJEc0LCAkRzUsICRHNiwgJEc3LCAkRzgsICRHOSwgJEcxMDtcblxuICAkdHlwZS1ncmFkaWVudDogJHR5cGUsICRzaGFwZS1zaXplICRwb3MsICRncmFkaWVudDtcbiAgQHJldHVybiAkdHlwZS1ncmFkaWVudDtcbn1cblxuXG4iLAoJCSIvLyBTcnRpcHMgdGhlIHVuaXRzIGZyb20gYSB2YWx1ZS4gZS5nLiAxMnB4IC0+IDEyXG5cbkBmdW5jdGlvbiBzdHJpcC11bml0cygkdmFsKSB7XG4gIEByZXR1cm4gKCR2YWwgLyAoJHZhbCAqIDAgKyAxKSk7XG59XG4iLAoJCSIvLyBBZGQgcGVyY2VudGFnZSBvZiB3aGl0ZSB0byBhIGNvbG9yXG5AZnVuY3Rpb24gdGludCgkY29sb3IsICRwZXJjZW50KXtcbiAgQHJldHVybiBtaXgod2hpdGUsICRjb2xvciwgJHBlcmNlbnQpO1xufVxuXG4vLyBBZGQgcGVyY2VudGFnZSBvZiBibGFjayB0byBhIGNvbG9yXG5AZnVuY3Rpb24gc2hhZGUoJGNvbG9yLCAkcGVyY2VudCl7XG4gIEByZXR1cm4gbWl4KGJsYWNrLCAkY29sb3IsICRwZXJjZW50KTtcbn1cbiIsCgkJIi8vIFJldHVybiB2ZW5kb3ItcHJlZml4ZWQgcHJvcGVydHkgbmFtZXMgaWYgYXBwcm9wcmlhdGVcbi8vIEV4YW1wbGU6IHRyYW5zaXRpb24tcHJvcGVydHktbmFtZXMoKHRyYW5zZm9ybSwgY29sb3IsIGJhY2tncm91bmQpLCBtb3opIC0+IC1tb3otdHJhbnNmb3JtLCBjb2xvciwgYmFja2dyb3VuZFxuLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovL1xuQGZ1bmN0aW9uIHRyYW5zaXRpb24tcHJvcGVydHktbmFtZXMoJHByb3BzLCAkdmVuZG9yOiBmYWxzZSkge1xuXHQkbmV3LXByb3BzOiAoKTtcblx0XG5cdEBlYWNoICRwcm9wIGluICRwcm9wcyB7XG5cdFx0JG5ldy1wcm9wczogYXBwZW5kKCRuZXctcHJvcHMsIHRyYW5zaXRpb24tcHJvcGVydHktbmFtZSgkcHJvcCwgJHZlbmRvciksIGNvbW1hKTtcblx0fVxuXG5cdEByZXR1cm4gJG5ldy1wcm9wcztcbn1cblxuQGZ1bmN0aW9uIHRyYW5zaXRpb24tcHJvcGVydHktbmFtZSgkcHJvcCwgJHZlbmRvcjogZmFsc2UpIHtcblx0Ly8gcHV0IG90aGVyIHByb3BlcnRpZXMgdGhhdCBuZWVkIHRvIGJlIHByZWZpeGVkIGhlcmUgYXN3ZWxsXG5cdEBpZiAkdmVuZG9yIGFuZCAkcHJvcCA9PSB0cmFuc2Zvcm0ge1xuXHRcdEByZXR1cm4gdW5xdW90ZSgnLScrJHZlbmRvcisnLScrJHByb3ApO1xuXHR9XG5cdEBlbHNlIHtcblx0XHRAcmV0dXJuICRwcm9wO1xuXHR9XG59IiwKCQkiLy8gQ29udmVydCBzaG9ydGhhbmQgdG8gdGhlIDQtdmFsdWUgc3ludGF4XG5cbkBmdW5jdGlvbiB1bnBhY2soJHNob3J0aGFuZCkge1xuICBAaWYgbGVuZ3RoKCRzaG9ydGhhbmQpID09IDEge1xuICAgIEByZXR1cm4gbnRoKCRzaG9ydGhhbmQsIDEpIG50aCgkc2hvcnRoYW5kLCAxKSBudGgoJHNob3J0aGFuZCwgMSkgbnRoKCRzaG9ydGhhbmQsIDEpO1xuICB9XG4gIEBlbHNlIGlmIGxlbmd0aCgkc2hvcnRoYW5kKSA9PSAyIHtcbiAgICBAcmV0dXJuIG50aCgkc2hvcnRoYW5kLCAxKSBudGgoJHNob3J0aGFuZCwgMikgbnRoKCRzaG9ydGhhbmQsIDEpIG50aCgkc2hvcnRoYW5kLCAyKTtcbiAgfVxuICBAZWxzZSBpZiBsZW5ndGgoJHNob3J0aGFuZCkgPT0gMyB7XG4gICAgQHJldHVybiBudGgoJHNob3J0aGFuZCwgMSkgbnRoKCRzaG9ydGhhbmQsIDIpIG50aCgkc2hvcnRoYW5kLCAzKSBudGgoJHNob3J0aGFuZCwgMik7XG4gIH1cbiAgQGVsc2Uge1xuICAgIEByZXR1cm4gJHNob3J0aGFuZDtcbiAgfVxufVxuXG4iLAoJCSIvLyBodHRwOi8vd3d3LnczLm9yZy9UUi9jc3MzLWFuaW1hdGlvbnMvI3RoZS1hbmltYXRpb24tbmFtZS1wcm9wZXJ0eS1cbi8vIEVhY2ggb2YgdGhlc2UgbWl4aW5zIHN1cHBvcnQgY29tbWEgc2VwYXJhdGVkIGxpc3RzIG9mIHZhbHVlcywgd2hpY2ggYWxsb3dzIGRpZmZlcmVudCB0cmFuc2l0aW9ucyBmb3IgaW5kaXZpZHVhbCBwcm9wZXJ0aWVzIHRvIGJlIGRlc2NyaWJlZCBpbiBhIHNpbmdsZSBzdHlsZSBydWxlLiBFYWNoIHZhbHVlIGluIHRoZSBsaXN0IGNvcnJlc3BvbmRzIHRvIHRoZSB2YWx1ZSBhdCB0aGF0IHNhbWUgcG9zaXRpb24gaW4gdGhlIG90aGVyIHByb3BlcnRpZXMuXG5cbi8vIE9mZmljaWFsIGFuaW1hdGlvbiBzaG9ydGhhbmQgcHJvcGVydHkuXG5AbWl4aW4gYW5pbWF0aW9uICgkYW5pbWF0aW9ucy4uLikge1xuICBAaW5jbHVkZSBwcmVmaXhlcihhbmltYXRpb24sICRhbmltYXRpb25zLCB3ZWJraXQgbW96IHNwZWMpO1xufVxuXG4vLyBJbmRpdmlkdWFsIEFuaW1hdGlvbiBQcm9wZXJ0aWVzXG5AbWl4aW4gYW5pbWF0aW9uLW5hbWUgKCRuYW1lcy4uLikge1xuICBAaW5jbHVkZSBwcmVmaXhlcihhbmltYXRpb24tbmFtZSwgJG5hbWVzLCB3ZWJraXQgbW96IHNwZWMpO1xufVxuXG5cbkBtaXhpbiBhbmltYXRpb24tZHVyYXRpb24gKCR0aW1lcy4uLikge1xuICBAaW5jbHVkZSBwcmVmaXhlcihhbmltYXRpb24tZHVyYXRpb24sICR0aW1lcywgd2Via2l0IG1veiBzcGVjKTtcbn1cblxuXG5AbWl4aW4gYW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbiAoJG1vdGlvbnMuLi4pIHtcbi8vIGVhc2UgfCBsaW5lYXIgfCBlYXNlLWluIHwgZWFzZS1vdXQgfCBlYXNlLWluLW91dFxuICBAaW5jbHVkZSBwcmVmaXhlcihhbmltYXRpb24tdGltaW5nLWZ1bmN0aW9uLCAkbW90aW9ucywgd2Via2l0IG1veiBzcGVjKTtcbn1cblxuXG5AbWl4aW4gYW5pbWF0aW9uLWl0ZXJhdGlvbi1jb3VudCAoJHZhbHVlcy4uLikge1xuLy8gaW5maW5pdGUgfCA8bnVtYmVyPlxuICBAaW5jbHVkZSBwcmVmaXhlcihhbmltYXRpb24taXRlcmF0aW9uLWNvdW50LCAkdmFsdWVzLCB3ZWJraXQgbW96IHNwZWMpO1xufVxuXG5cbkBtaXhpbiBhbmltYXRpb24tZGlyZWN0aW9uICgkZGlyZWN0aW9ucy4uLikge1xuLy8gbm9ybWFsIHwgYWx0ZXJuYXRlXG4gIEBpbmNsdWRlIHByZWZpeGVyKGFuaW1hdGlvbi1kaXJlY3Rpb24sICRkaXJlY3Rpb25zLCB3ZWJraXQgbW96IHNwZWMpO1xufVxuXG5cbkBtaXhpbiBhbmltYXRpb24tcGxheS1zdGF0ZSAoJHN0YXRlcy4uLikge1xuLy8gcnVubmluZyB8IHBhdXNlZFxuICBAaW5jbHVkZSBwcmVmaXhlcihhbmltYXRpb24tcGxheS1zdGF0ZSwgJHN0YXRlcywgd2Via2l0IG1veiBzcGVjKTtcbn1cblxuXG5AbWl4aW4gYW5pbWF0aW9uLWRlbGF5ICgkdGltZXMuLi4pIHtcbiAgQGluY2x1ZGUgcHJlZml4ZXIoYW5pbWF0aW9uLWRlbGF5LCAkdGltZXMsIHdlYmtpdCBtb3ogc3BlYyk7XG59XG5cblxuQG1peGluIGFuaW1hdGlvbi1maWxsLW1vZGUgKCRtb2Rlcy4uLikge1xuLy8gbm9uZSB8IGZvcndhcmRzIHwgYmFja3dhcmRzIHwgYm90aFxuICBAaW5jbHVkZSBwcmVmaXhlcihhbmltYXRpb24tZmlsbC1tb2RlLCAkbW9kZXMsIHdlYmtpdCBtb3ogc3BlYyk7XG59XG4iLAoJCSJAbWl4aW4gYXBwZWFyYW5jZSAoJHZhbHVlKSB7XG4gIEBpbmNsdWRlIHByZWZpeGVyKGFwcGVhcmFuY2UsICR2YWx1ZSwgd2Via2l0IG1veiBtcyBvIHNwZWMpO1xufVxuIiwKCQkiLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovL1xuLy8gQmFja2ZhY2UtdmlzaWJpbGl0eSBtaXhpblxuLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovL1xuQG1peGluIGJhY2tmYWNlLXZpc2liaWxpdHkoJHZpc2liaWxpdHkpIHtcbiAgQGluY2x1ZGUgcHJlZml4ZXIoYmFja2ZhY2UtdmlzaWJpbGl0eSwgJHZpc2liaWxpdHksIHdlYmtpdCBzcGVjKTtcbn1cbiIsCgkJIi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqLy9cbi8vIEJhY2tncm91bmQgcHJvcGVydHkgZm9yIGFkZGluZyBtdWx0aXBsZSBiYWNrZ3JvdW5kcyB1c2luZyBzaG9ydGhhbmRcbi8vIG5vdGF0aW9uLlxuLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovL1xuXG5AbWl4aW4gYmFja2dyb3VuZChcbiAgJGJhY2tncm91bmQtMSAgICAgICAsICRiYWNrZ3JvdW5kLTI6IG51bGwsXG4gICRiYWNrZ3JvdW5kLTM6IG51bGwsICRiYWNrZ3JvdW5kLTQ6IG51bGwsXG4gICRiYWNrZ3JvdW5kLTU6IG51bGwsICRiYWNrZ3JvdW5kLTY6IG51bGwsXG4gICRiYWNrZ3JvdW5kLTc6IG51bGwsICRiYWNrZ3JvdW5kLTg6IG51bGwsXG4gICRiYWNrZ3JvdW5kLTk6IG51bGwsICRiYWNrZ3JvdW5kLTEwOiBudWxsLFxuICAkZmFsbGJhY2s6IG51bGxcbikge1xuICAkYmFja2dyb3VuZHM6ICRiYWNrZ3JvdW5kLTEsICRiYWNrZ3JvdW5kLTIsXG4gICAgICAgICAgICAgICAgJGJhY2tncm91bmQtMywgJGJhY2tncm91bmQtNCxcbiAgICAgICAgICAgICAgICAkYmFja2dyb3VuZC01LCAkYmFja2dyb3VuZC02LFxuICAgICAgICAgICAgICAgICRiYWNrZ3JvdW5kLTcsICRiYWNrZ3JvdW5kLTgsXG4gICAgICAgICAgICAgICAgJGJhY2tncm91bmQtOSwgJGJhY2tncm91bmQtMTA7XG5cbiAgJGZhbGxiYWNrLWNvbG9yOiBmYWxzZTtcbiAgQGlmICh0eXBlLW9mKCRmYWxsYmFjaykgPT0gY29sb3IpIG9yICgkZmFsbGJhY2sgPT0gXCJ0cmFuc3BhcmVudFwiKSB7XG4gICAgJGZhbGxiYWNrLWNvbG9yOiAkZmFsbGJhY2s7XG4gIH1cbiAgQGVsc2Uge1xuICAgICRmYWxsYmFjay1jb2xvcjogX2V4dHJhY3QtYmFja2dyb3VuZC1jb2xvcigkYmFja2dyb3VuZHMpO1xuICB9XG5cbiAgQGlmICRmYWxsYmFjay1jb2xvciB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogJGZhbGxiYWNrLWNvbG9yO1xuICB9XG4gIGJhY2tncm91bmQ6IF9iYWNrZ3JvdW5kLWFkZC1wcmVmaXgoJGJhY2tncm91bmRzLCB3ZWJraXQpO1xuICBiYWNrZ3JvdW5kOiBfYmFja2dyb3VuZC1hZGQtcHJlZml4KCRiYWNrZ3JvdW5kcyk7XG59XG5cbkBmdW5jdGlvbiBfZXh0cmFjdC1iYWNrZ3JvdW5kLWNvbG9yKCRiYWNrZ3JvdW5kcykge1xuICAkZmluYWwtYmctbGF5ZXI6IG50aCgkYmFja2dyb3VuZHMsIGxlbmd0aCgkYmFja2dyb3VuZHMpKTtcbiAgQGlmIHR5cGUtb2YoJGZpbmFsLWJnLWxheWVyKSA9PSBsaXN0IHtcbiAgICBAZm9yICRpIGZyb20gMSB0aHJvdWdoIGxlbmd0aCgkZmluYWwtYmctbGF5ZXIpIHtcbiAgICAgICR2YWx1ZTogbnRoKCRmaW5hbC1iZy1sYXllciwgJGkpO1xuICAgICAgQGlmIHR5cGUtb2YoJHZhbHVlKSA9PSBjb2xvciB7XG4gICAgICAgIEByZXR1cm4gJHZhbHVlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBAcmV0dXJuIGZhbHNlO1xufVxuXG5AZnVuY3Rpb24gX2JhY2tncm91bmQtYWRkLXByZWZpeCgkYmFja2dyb3VuZHMsICR2ZW5kb3I6IGZhbHNlKSB7XG4gICRiYWNrZ3JvdW5kcy1wcmVmaXhlZDogKCk7XG5cbiAgQGZvciAkaSBmcm9tIDEgdGhyb3VnaCBsZW5ndGgoJGJhY2tncm91bmRzKSB7XG4gICAgJHNob3J0aGFuZDogbnRoKCRiYWNrZ3JvdW5kcywgJGkpOyAvLyBHZXQgbWVtYmVyIGZvciBjdXJyZW50IGluZGV4XG4gICAgJHR5cGU6IHR5cGUtb2YoJHNob3J0aGFuZCk7IC8vIEdldCB0eXBlIG9mIHZhcmlhYmxlIC0gTGlzdCAoZ3JhZGllbnQpIG9yIFN0cmluZyAoaW1hZ2UpXG5cbiAgICAvLyBJZiBzaG9ydGhhbmQgaXMgYSBsaXN0IChncmFkaWVudClcbiAgICBAaWYgJHR5cGUgPT0gbGlzdCB7XG4gICAgICAkZmlyc3QtbWVtYmVyOiBudGgoJHNob3J0aGFuZCwgMSk7IC8vIEdldCBmaXJzdCBtZW1iZXIgb2Ygc2hvcnRoYW5kXG5cbiAgICAgIC8vIExpbmVhciBHcmFkaWVudFxuICAgICAgQGlmIGluZGV4KGxpbmVhciByYWRpYWwsIG50aCgkZmlyc3QtbWVtYmVyLCAxKSkge1xuICAgICAgICAkZ3JhZGllbnQtdHlwZTogbnRoKCRmaXJzdC1tZW1iZXIsIDEpOyAvLyBsaW5lYXIgfHwgcmFkaWFsXG4gICAgICAgICRncmFkaWVudC1hcmdzOiAgICAgIGZhbHNlO1xuICAgICAgICAkZ3JhZGllbnQtcG9zaXRpb25zOiBmYWxzZTtcbiAgICAgICAgJHNob3J0aGFuZC1zdGFydDogICAgZmFsc2U7XG4gICAgICAgIEBpZiB0eXBlLW9mKCRmaXJzdC1tZW1iZXIpID09IGxpc3QgeyAvLyBMaW5lYXIgZ3JhZGllbnQgcGx1cyBhZGRpdGlvbmFsIHNob3J0aGFuZCB2YWx1ZXMgLSBsZyhyZWQsb3JhbmdlKXJlcGVhdCwuLi5cbiAgICAgICAgICAkZ3JhZGllbnQtcG9zaXRpb25zOiBudGgoJGZpcnN0LW1lbWJlciwgMik7XG4gICAgICAgICAgJGdyYWRpZW50LWFyZ3M6ICAgICAgbnRoKCRmaXJzdC1tZW1iZXIsIDMpO1xuICAgICAgICAgICRzaG9ydGhhbmQtc3RhcnQ6IDI7XG4gICAgICAgIH1cbiAgICAgICAgQGVsc2UgeyAvLyBMaW5lYXIgZ3JhZGllbnQgb25seSAtIGxnKHJlZCxvcmFuZ2UpLC4uLlxuICAgICAgICAgICRncmFkaWVudC1wb3NpdGlvbnM6IG50aCgkc2hvcnRoYW5kLCAyKTtcbiAgICAgICAgICAkZ3JhZGllbnQtYXJnczogICAgICBudGgoJHNob3J0aGFuZCwgMyk7IC8vIEdldCBncmFkaWVudCAocmVkLCBibHVlKVxuICAgICAgICB9XG5cbiAgICAgICAgJGdyYWRpZW50LXBvc2l0aW9uczogX2dyYWRpZW50LXBvc2l0aW9ucy1wYXJzZXIoJGdyYWRpZW50LXR5cGUsICRncmFkaWVudC1wb3NpdGlvbnMpO1xuICAgICAgICAkZ3JhZGllbnQ6IF9yZW5kZXItZ3JhZGllbnRzKCRncmFkaWVudC1wb3NpdGlvbnMsICRncmFkaWVudC1hcmdzLCAkZ3JhZGllbnQtdHlwZSwgJHZlbmRvcik7XG5cbiAgICAgICAgLy8gQXBwZW5kIGFueSBhZGRpdGlvbmFsIHNob3J0aGFuZCBhcmdzIHRvIGdyYWRpZW50XG4gICAgICAgIEBpZiAkc2hvcnRoYW5kLXN0YXJ0IHtcbiAgICAgICAgICBAZm9yICRqIGZyb20gJHNob3J0aGFuZC1zdGFydCB0aHJvdWdoIGxlbmd0aCgkc2hvcnRoYW5kKSB7XG4gICAgICAgICAgICAkZ3JhZGllbnQ6IGpvaW4oJGdyYWRpZW50LCBudGgoJHNob3J0aGFuZCwgJGopLCBzcGFjZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgICRiYWNrZ3JvdW5kcy1wcmVmaXhlZDogYXBwZW5kKCRiYWNrZ3JvdW5kcy1wcmVmaXhlZCwgJGdyYWRpZW50LCBjb21tYSk7XG4gICAgICB9XG4gICAgICAvLyBJbWFnZSB3aXRoIGFkZGl0aW9uYWwgcHJvcGVydGllc1xuICAgICAgQGVsc2Uge1xuICAgICAgICAkYmFja2dyb3VuZHMtcHJlZml4ZWQ6IGFwcGVuZCgkYmFja2dyb3VuZHMtcHJlZml4ZWQsICRzaG9ydGhhbmQsIGNvbW1hKTtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gSWYgc2hvcnRoYW5kIGlzIGEgc2ltcGxlIHN0cmluZyAoY29sb3Igb3IgaW1hZ2UpXG4gICAgQGVsc2UgaWYgJHR5cGUgPT0gc3RyaW5nIHtcbiAgICAgICRiYWNrZ3JvdW5kcy1wcmVmaXhlZDogam9pbigkYmFja2dyb3VuZHMtcHJlZml4ZWQsICRzaG9ydGhhbmQsIGNvbW1hKTtcbiAgICB9XG4gIH1cbiAgQHJldHVybiAkYmFja2dyb3VuZHMtcHJlZml4ZWQ7XG59XG5cbi8vRXhhbXBsZXM6XG4gIC8vQGluY2x1ZGUgYmFja2dyb3VuZChsaW5lYXItZ3JhZGllbnQodG9wLCBvcmFuZ2UsIHJlZCkpO1xuICAvL0BpbmNsdWRlIGJhY2tncm91bmQocmFkaWFsLWdyYWRpZW50KGNpcmNsZSBhdCA0MCUgNDAlLCBvcmFuZ2UsIHJlZCkpO1xuICAvL0BpbmNsdWRlIGJhY2tncm91bmQodXJsKFwiL2ltYWdlcy9hLnBuZ1wiKSBuby1yZXBlYXQsIGxpbmVhci1ncmFkaWVudChvcmFuZ2UsIHJlZCkpO1xuICAvL0BpbmNsdWRlIGJhY2tncm91bmQodXJsKFwiaW1hZ2UucG5nXCIpIGNlbnRlciBjZW50ZXIsIGxpbmVhci1ncmFkaWVudChvcmFuZ2UsIHJlZCksIHVybChcImltYWdlLnBuZ1wiKSk7XG4iLAoJCSIvLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi8vXG4vLyBCYWNrZ3JvdW5kLWltYWdlIHByb3BlcnR5IGZvciBhZGRpbmcgbXVsdGlwbGUgYmFja2dyb3VuZCBpbWFnZXMgd2l0aFxuLy8gZ3JhZGllbnRzLCBvciBmb3Igc3RyaW5naW5nIG11bHRpcGxlIGdyYWRpZW50cyB0b2dldGhlci5cbi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqLy9cblxuQG1peGluIGJhY2tncm91bmQtaW1hZ2UoJGltYWdlcy4uLikge1xuICBiYWNrZ3JvdW5kLWltYWdlOiBfYWRkLXByZWZpeCgkaW1hZ2VzLCB3ZWJraXQpO1xuICBiYWNrZ3JvdW5kLWltYWdlOiBfYWRkLXByZWZpeCgkaW1hZ2VzKTtcbn1cblxuQGZ1bmN0aW9uIF9hZGQtcHJlZml4KCRpbWFnZXMsICR2ZW5kb3I6IGZhbHNlKSB7XG4gICRpbWFnZXMtcHJlZml4ZWQ6ICgpO1xuICAkZ3JhZGllbnQtcG9zaXRpb25zOiBmYWxzZTtcbiAgQGZvciAkaSBmcm9tIDEgdGhyb3VnaCBsZW5ndGgoJGltYWdlcykge1xuICAgICR0eXBlOiB0eXBlLW9mKG50aCgkaW1hZ2VzLCAkaSkpOyAvLyBHZXQgdHlwZSBvZiB2YXJpYWJsZSAtIExpc3Qgb3IgU3RyaW5nXG5cbiAgICAvLyBJZiB2YXJpYWJsZSBpcyBhIGxpc3QgLSBHcmFkaWVudFxuICAgIEBpZiAkdHlwZSA9PSBsaXN0IHtcbiAgICAgICRncmFkaWVudC10eXBlOiBudGgobnRoKCRpbWFnZXMsICRpKSwgMSk7IC8vIGxpbmVhciBvciByYWRpYWxcbiAgICAgICRncmFkaWVudC1wb3M6IG51bGw7XG4gICAgICAkZ3JhZGllbnQtYXJnczogbnVsbDtcblxuICAgICAgQGlmICgkZ3JhZGllbnQtdHlwZSA9PSBsaW5lYXIpIG9yICgkZ3JhZGllbnQtdHlwZSA9PSByYWRpYWwpIHtcbiAgICAgICAgJGdyYWRpZW50LXBvczogIG50aChudGgoJGltYWdlcywgJGkpLCAyKTsgLy8gR2V0IGdyYWRpZW50IHBvc2l0aW9uXG4gICAgICAgICRncmFkaWVudC1hcmdzOiBudGgobnRoKCRpbWFnZXMsICRpKSwgMyk7IC8vIEdldCBhY3R1YWwgZ3JhZGllbnQgKHJlZCwgYmx1ZSlcbiAgICAgIH1cbiAgICAgIEBlbHNlIHtcbiAgICAgICAgJGdyYWRpZW50LWFyZ3M6IG50aChudGgoJGltYWdlcywgJGkpLCAyKTsgLy8gR2V0IGFjdHVhbCBncmFkaWVudCAocmVkLCBibHVlKVxuICAgICAgfVxuXG4gICAgICAkZ3JhZGllbnQtcG9zaXRpb25zOiBfZ3JhZGllbnQtcG9zaXRpb25zLXBhcnNlcigkZ3JhZGllbnQtdHlwZSwgJGdyYWRpZW50LXBvcyk7XG4gICAgICAkZ3JhZGllbnQ6IF9yZW5kZXItZ3JhZGllbnRzKCRncmFkaWVudC1wb3NpdGlvbnMsICRncmFkaWVudC1hcmdzLCAkZ3JhZGllbnQtdHlwZSwgJHZlbmRvcik7XG4gICAgICAkaW1hZ2VzLXByZWZpeGVkOiBhcHBlbmQoJGltYWdlcy1wcmVmaXhlZCwgJGdyYWRpZW50LCBjb21tYSk7XG4gICAgfVxuICAgIC8vIElmIHZhcmlhYmxlIGlzIGEgc3RyaW5nIC0gSW1hZ2VcbiAgICBAZWxzZSBpZiAkdHlwZSA9PSBzdHJpbmcge1xuICAgICAgJGltYWdlcy1wcmVmaXhlZDogam9pbigkaW1hZ2VzLXByZWZpeGVkLCBudGgoJGltYWdlcywgJGkpLCBjb21tYSk7XG4gICAgfVxuICB9XG4gIEByZXR1cm4gJGltYWdlcy1wcmVmaXhlZDtcbn1cblxuLy9FeGFtcGxlczpcbiAgLy9AaW5jbHVkZSBiYWNrZ3JvdW5kLWltYWdlKGxpbmVhci1ncmFkaWVudCh0b3AsIG9yYW5nZSwgcmVkKSk7XG4gIC8vQGluY2x1ZGUgYmFja2dyb3VuZC1pbWFnZShyYWRpYWwtZ3JhZGllbnQoNTAlIDUwJSwgY292ZXIgY2lyY2xlLCBvcmFuZ2UsIHJlZCkpO1xuICAvL0BpbmNsdWRlIGJhY2tncm91bmQtaW1hZ2UodXJsKFwiL2ltYWdlcy9hLnBuZ1wiKSwgbGluZWFyLWdyYWRpZW50KG9yYW5nZSwgcmVkKSk7XG4gIC8vQGluY2x1ZGUgYmFja2dyb3VuZC1pbWFnZSh1cmwoXCJpbWFnZS5wbmdcIiksIGxpbmVhci1ncmFkaWVudChvcmFuZ2UsIHJlZCksIHVybChcImltYWdlLnBuZ1wiKSk7XG4gIC8vQGluY2x1ZGUgYmFja2dyb3VuZC1pbWFnZShsaW5lYXItZ3JhZGllbnQoaHNsYSgwLCAxMDAlLCAxMDAlLCAwLjI1KSAwJSwgaHNsYSgwLCAxMDAlLCAxMDAlLCAwLjA4KSA1MCUsIHRyYW5zcGFyZW50IDUwJSksIGxpbmVhci1ncmFkaWVudChvcmFuZ2UsIHJlZCkpO1xuIiwKCQkiQG1peGluIGJvcmRlci1pbWFnZSgkaW1hZ2VzKSB7XG4gIC13ZWJraXQtYm9yZGVyLWltYWdlOiBfYm9yZGVyLWFkZC1wcmVmaXgoJGltYWdlcywgd2Via2l0KTtcbiAgICAgLW1vei1ib3JkZXItaW1hZ2U6IF9ib3JkZXItYWRkLXByZWZpeCgkaW1hZ2VzLCBtb3opO1xuICAgICAgIC1vLWJvcmRlci1pbWFnZTogX2JvcmRlci1hZGQtcHJlZml4KCRpbWFnZXMsIG8pO1xuICAgICAgICAgIGJvcmRlci1pbWFnZTogX2JvcmRlci1hZGQtcHJlZml4KCRpbWFnZXMpO1xuICAgICAgICAgIGJvcmRlci1zdHlsZTogc29saWQ7XG59XG5cbkBmdW5jdGlvbiBfYm9yZGVyLWFkZC1wcmVmaXgoJGltYWdlcywgJHZlbmRvcjogZmFsc2UpIHtcbiAgJGJvcmRlci1pbWFnZTogbnVsbDtcbiAgJGltYWdlcy10eXBlOiAgdHlwZS1vZihudGgoJGltYWdlcywgMSkpO1xuICAkZmlyc3QtdmFyOiAgICBudGgobnRoKCRpbWFnZXMsIDEpLCAxKTsgICAgICAgICAgLy8gR2V0IHR5cGUgb2YgR3JhZGllbnQgKExpbmVhciB8fCByYWRpYWwpXG5cbiAgLy8gSWYgaW5wdXQgaXMgYSBncmFkaWVudFxuICBAaWYgJGltYWdlcy10eXBlID09IHN0cmluZyB7XG4gICAgQGlmICgkZmlyc3QtdmFyID09IFwibGluZWFyXCIpIG9yICgkZmlyc3QtdmFyID09IFwicmFkaWFsXCIpIHtcbiAgICAgICRncmFkaWVudC10eXBlOiBudGgoJGltYWdlcywgMSk7ICAgICAgICAgICAvLyBHZXQgdHlwZSBvZiBncmFkaWVudCAobGluZWFyIHx8IHJhZGlhbClcbiAgICAgICRncmFkaWVudC1wb3M6ICBudGgoJGltYWdlcywgMik7ICAgICAgICAgICAvLyBHZXQgZ3JhZGllbnQgcG9zaXRpb25cbiAgICAgICRncmFkaWVudC1hcmdzOiBudGgoJGltYWdlcywgMyk7ICAgICAgICAgICAvLyBHZXQgYWN0dWFsIGdyYWRpZW50IChyZWQsIGJsdWUpXG4gICAgICAkZ3JhZGllbnQtcG9zaXRpb25zOiBfZ3JhZGllbnQtcG9zaXRpb25zLXBhcnNlcigkZ3JhZGllbnQtdHlwZSwgJGdyYWRpZW50LXBvcyk7XG4gICAgICAkYm9yZGVyLWltYWdlOiAgX3JlbmRlci1ncmFkaWVudHMoJGdyYWRpZW50LXBvc2l0aW9ucywgJGdyYWRpZW50LWFyZ3MsICRncmFkaWVudC10eXBlLCAkdmVuZG9yKTtcbiAgICB9XG4gICAgLy8gSWYgaW5wdXQgaXMgYSBVUkxcbiAgICBAZWxzZSB7XG4gICAgICAkYm9yZGVyLWltYWdlOiAkaW1hZ2VzO1xuICAgIH1cbiAgfVxuICAvLyBJZiBpbnB1dCBpcyBncmFkaWVudCBvciB1cmwgKyBhZGRpdGlvbmFsIGFyZ3NcbiAgQGVsc2UgaWYgJGltYWdlcy10eXBlID09IGxpc3Qge1xuICAgICR0eXBlOiB0eXBlLW9mKG50aCgkaW1hZ2VzLCAxKSk7ICAgICAgICAgICAvLyBHZXQgdHlwZSBvZiB2YXJpYWJsZSAtIExpc3Qgb3IgU3RyaW5nXG5cbiAgICAvLyBJZiB2YXJpYWJsZSBpcyBhIGxpc3QgLSBHcmFkaWVudFxuICAgIEBpZiAkdHlwZSA9PSBsaXN0IHtcbiAgICAgICRncmFkaWVudDogbnRoKCRpbWFnZXMsIDEpO1xuICAgICAgJGdyYWRpZW50LXR5cGU6IG50aCgkZ3JhZGllbnQsIDEpOyAgICAgICAgICAgLy8gR2V0IHR5cGUgb2YgZ3JhZGllbnQgKGxpbmVhciB8fCByYWRpYWwpXG4gICAgICAkZ3JhZGllbnQtcG9zOiAgbnRoKCRncmFkaWVudCwgMik7ICAgICAgICAgICAvLyBHZXQgZ3JhZGllbnQgcG9zaXRpb25cbiAgICAgICRncmFkaWVudC1hcmdzOiBudGgoJGdyYWRpZW50LCAzKTsgICAgICAgICAgIC8vIEdldCBhY3R1YWwgZ3JhZGllbnQgKHJlZCwgYmx1ZSlcbiAgICAgICRncmFkaWVudC1wb3NpdGlvbnM6IF9ncmFkaWVudC1wb3NpdGlvbnMtcGFyc2VyKCRncmFkaWVudC10eXBlLCAkZ3JhZGllbnQtcG9zKTtcbiAgICAgICRib3JkZXItaW1hZ2U6ICBfcmVuZGVyLWdyYWRpZW50cygkZ3JhZGllbnQtcG9zaXRpb25zLCAkZ3JhZGllbnQtYXJncywgJGdyYWRpZW50LXR5cGUsICR2ZW5kb3IpO1xuXG4gICAgICBAZm9yICRpIGZyb20gMiB0aHJvdWdoIGxlbmd0aCgkaW1hZ2VzKSB7XG4gICAgICAgICRib3JkZXItaW1hZ2U6IGFwcGVuZCgkYm9yZGVyLWltYWdlLCBudGgoJGltYWdlcywgJGkpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgQHJldHVybiAkYm9yZGVyLWltYWdlO1xufVxuXG4vL0V4YW1wbGVzOlxuLy8gQGluY2x1ZGUgYm9yZGVyLWltYWdlKHVybChcImltYWdlLnBuZ1wiKSk7XG4vLyBAaW5jbHVkZSBib3JkZXItaW1hZ2UodXJsKFwiaW1hZ2UucG5nXCIpIDIwIHN0cmV0Y2gpO1xuLy8gQGluY2x1ZGUgYm9yZGVyLWltYWdlKGxpbmVhci1ncmFkaWVudCg0NWRlZywgb3JhbmdlLCB5ZWxsb3cpKTtcbi8vIEBpbmNsdWRlIGJvcmRlci1pbWFnZShsaW5lYXItZ3JhZGllbnQoNDVkZWcsIG9yYW5nZSwgeWVsbG93KSBzdHJldGNoKTtcbi8vIEBpbmNsdWRlIGJvcmRlci1pbWFnZShsaW5lYXItZ3JhZGllbnQoNDVkZWcsIG9yYW5nZSwgeWVsbG93KSAyMCAzMCA0MCA1MCBzdHJldGNoIHJvdW5kKTtcbi8vIEBpbmNsdWRlIGJvcmRlci1pbWFnZShyYWRpYWwtZ3JhZGllbnQodG9wLCBjb3Zlciwgb3JhbmdlLCB5ZWxsb3csIG9yYW5nZSkpO1xuXG4iLAoJCSIvLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi8vXG4vLyBTaG9ydGhhbmQgQm9yZGVyLXJhZGl1cyBtaXhpbnNcbi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqLy9cbkBtaXhpbiBib3JkZXItdG9wLXJhZGl1cygkcmFkaWkpIHtcbiAgQGluY2x1ZGUgcHJlZml4ZXIoYm9yZGVyLXRvcC1sZWZ0LXJhZGl1cywgJHJhZGlpLCBzcGVjKTtcbiAgQGluY2x1ZGUgcHJlZml4ZXIoYm9yZGVyLXRvcC1yaWdodC1yYWRpdXMsICRyYWRpaSwgc3BlYyk7XG59XG5cbkBtaXhpbiBib3JkZXItYm90dG9tLXJhZGl1cygkcmFkaWkpIHtcbiAgQGluY2x1ZGUgcHJlZml4ZXIoYm9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1cywgJHJhZGlpLCBzcGVjKTtcbiAgQGluY2x1ZGUgcHJlZml4ZXIoYm9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXMsICRyYWRpaSwgc3BlYyk7XG59XG5cbkBtaXhpbiBib3JkZXItbGVmdC1yYWRpdXMoJHJhZGlpKSB7XG4gIEBpbmNsdWRlIHByZWZpeGVyKGJvcmRlci10b3AtbGVmdC1yYWRpdXMsICRyYWRpaSwgc3BlYyk7XG4gIEBpbmNsdWRlIHByZWZpeGVyKGJvcmRlci1ib3R0b20tbGVmdC1yYWRpdXMsICRyYWRpaSwgc3BlYyk7XG59XG5cbkBtaXhpbiBib3JkZXItcmlnaHQtcmFkaXVzKCRyYWRpaSkge1xuICBAaW5jbHVkZSBwcmVmaXhlcihib3JkZXItdG9wLXJpZ2h0LXJhZGl1cywgJHJhZGlpLCBzcGVjKTtcbiAgQGluY2x1ZGUgcHJlZml4ZXIoYm9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXMsICRyYWRpaSwgc3BlYyk7XG59XG4iLAoJCSJAbWl4aW4gYm94LXNpemluZyAoJGJveCkge1xuLy8gIGNvbnRlbnQtYm94IHwgYm9yZGVyLWJveCB8IGluaGVyaXRcbiAgQGluY2x1ZGUgcHJlZml4ZXIoYm94LXNpemluZywgJGJveCwgd2Via2l0IG1veiBzcGVjKTtcbn1cbiIsCgkJIkBtaXhpbiBjYWxjKCRwcm9wZXJ0eSwgJHZhbHVlKSB7XG4gICN7JHByb3BlcnR5fTogLXdlYmtpdC1jYWxjKCN7JHZhbHVlfSk7XG4gICN7JHByb3BlcnR5fTogICAgICAgICBjYWxjKCN7JHZhbHVlfSk7XG59XG4iLAoJCSJAbWl4aW4gY29sdW1ucygkYXJnOiBhdXRvKSB7XG4vLyA8Y29sdW1uLWNvdW50PiB8fCA8Y29sdW1uLXdpZHRoPlxuICBAaW5jbHVkZSBwcmVmaXhlcihjb2x1bW5zLCAkYXJnLCB3ZWJraXQgbW96IHNwZWMpO1xufVxuXG5AbWl4aW4gY29sdW1uLWNvdW50KCRpbnQ6IGF1dG8pIHtcbi8vIGF1dG8gfHwgaW50ZWdlclxuICBAaW5jbHVkZSBwcmVmaXhlcihjb2x1bW4tY291bnQsICRpbnQsIHdlYmtpdCBtb3ogc3BlYyk7XG59XG5cbkBtaXhpbiBjb2x1bW4tZ2FwKCRsZW5ndGg6IG5vcm1hbCkge1xuLy8gbm9ybWFsIHx8IGxlbmd0aFxuICBAaW5jbHVkZSBwcmVmaXhlcihjb2x1bW4tZ2FwLCAkbGVuZ3RoLCB3ZWJraXQgbW96IHNwZWMpO1xufVxuXG5AbWl4aW4gY29sdW1uLWZpbGwoJGFyZzogYXV0bykge1xuLy8gYXV0byB8fCBsZW5ndGhcbiAgQGluY2x1ZGUgcHJlZml4ZXIoY29sdW1uLWZpbGwsICRhcmcsIHdlYmtpdCBtb3ogc3BlYyk7XG59XG5cbkBtaXhpbiBjb2x1bW4tcnVsZSgkYXJnKSB7XG4vLyA8Ym9yZGVyLXdpZHRoPiB8fCA8Ym9yZGVyLXN0eWxlPiB8fCA8Y29sb3I+XG4gIEBpbmNsdWRlIHByZWZpeGVyKGNvbHVtbi1ydWxlLCAkYXJnLCB3ZWJraXQgbW96IHNwZWMpO1xufVxuXG5AbWl4aW4gY29sdW1uLXJ1bGUtY29sb3IoJGNvbG9yKSB7XG4gIEBpbmNsdWRlIHByZWZpeGVyKGNvbHVtbi1ydWxlLWNvbG9yLCAkY29sb3IsIHdlYmtpdCBtb3ogc3BlYyk7XG59XG5cbkBtaXhpbiBjb2x1bW4tcnVsZS1zdHlsZSgkc3R5bGU6IG5vbmUpIHtcbi8vIG5vbmUgfCBoaWRkZW4gfCBkYXNoZWQgfCBkb3R0ZWQgfCBkb3VibGUgfCBncm9vdmUgfCBpbnNldCB8IGluc2V0IHwgb3V0c2V0IHwgcmlkZ2UgfCBzb2xpZFxuICBAaW5jbHVkZSBwcmVmaXhlcihjb2x1bW4tcnVsZS1zdHlsZSwgJHN0eWxlLCB3ZWJraXQgbW96IHNwZWMpO1xufVxuXG5AbWl4aW4gY29sdW1uLXJ1bGUtd2lkdGggKCR3aWR0aDogbm9uZSkge1xuICBAaW5jbHVkZSBwcmVmaXhlcihjb2x1bW4tcnVsZS13aWR0aCwgJHdpZHRoLCB3ZWJraXQgbW96IHNwZWMpO1xufVxuXG5AbWl4aW4gY29sdW1uLXNwYW4oJGFyZzogbm9uZSkge1xuLy8gbm9uZSB8fCBhbGxcbiAgQGluY2x1ZGUgcHJlZml4ZXIoY29sdW1uLXNwYW4sICRhcmcsIHdlYmtpdCBtb3ogc3BlYyk7XG59XG5cbkBtaXhpbiBjb2x1bW4td2lkdGgoJGxlbmd0aDogYXV0bykge1xuLy8gYXV0byB8fCBsZW5ndGhcbiAgQGluY2x1ZGUgcHJlZml4ZXIoY29sdW1uLXdpZHRoLCAkbGVuZ3RoLCB3ZWJraXQgbW96IHNwZWMpO1xufVxuIiwKCQkiQG1peGluIGZpbHRlcigkZnVuY3Rpb246IG5vbmUpIHtcbiAgLy8gPGZpbHRlci1mdW5jdGlvbj4gWzxmaWx0ZXItZnVuY3Rpb25dKiB8IG5vbmVcbiAgQGluY2x1ZGUgcHJlZml4ZXIoZmlsdGVyLCAkZnVuY3Rpb24sIHdlYmtpdCBzcGVjKTtcbn1cblxuIiwKCQkiLy8gQ1NTMyBGbGV4aWJsZSBCb3ggTW9kZWwgYW5kIHByb3BlcnR5IGRlZmF1bHRzXG5cbi8vIEN1c3RvbSBzaG9ydGhhbmQgbm90YXRpb24gZm9yIGZsZXhib3hcbkBtaXhpbiBib3goJG9yaWVudDogaW5saW5lLWF4aXMsICRwYWNrOiBzdGFydCwgJGFsaWduOiBzdHJldGNoKSB7XG4gIEBpbmNsdWRlIGRpc3BsYXktYm94O1xuICBAaW5jbHVkZSBib3gtb3JpZW50KCRvcmllbnQpO1xuICBAaW5jbHVkZSBib3gtcGFjaygkcGFjayk7XG4gIEBpbmNsdWRlIGJveC1hbGlnbigkYWxpZ24pO1xufVxuXG5AbWl4aW4gZGlzcGxheS1ib3gge1xuICBkaXNwbGF5OiAtd2Via2l0LWJveDtcbiAgZGlzcGxheTogLW1vei1ib3g7XG4gIGRpc3BsYXk6IC1tcy1mbGV4Ym94OyAvLyBJRSAxMFxuICBkaXNwbGF5OiBib3g7XG59XG5cbkBtaXhpbiBib3gtb3JpZW50KCRvcmllbnQ6IGlubGluZS1heGlzKSB7XG4vLyBob3Jpem9udGFsfHZlcnRpY2FsfGlubGluZS1heGlzfGJsb2NrLWF4aXN8aW5oZXJpdFxuICBAaW5jbHVkZSBwcmVmaXhlcihib3gtb3JpZW50LCAkb3JpZW50LCB3ZWJraXQgbW96IHNwZWMpO1xufVxuXG5AbWl4aW4gYm94LXBhY2soJHBhY2s6IHN0YXJ0KSB7XG4vLyBzdGFydHxlbmR8Y2VudGVyfGp1c3RpZnlcbiAgQGluY2x1ZGUgcHJlZml4ZXIoYm94LXBhY2ssICRwYWNrLCB3ZWJraXQgbW96IHNwZWMpO1xuICAtbXMtZmxleC1wYWNrOiAkcGFjazsgLy8gSUUgMTBcbn1cblxuQG1peGluIGJveC1hbGlnbigkYWxpZ246IHN0cmV0Y2gpIHtcbi8vIHN0YXJ0fGVuZHxjZW50ZXJ8YmFzZWxpbmV8c3RyZXRjaFxuICBAaW5jbHVkZSBwcmVmaXhlcihib3gtYWxpZ24sICRhbGlnbiwgd2Via2l0IG1veiBzcGVjKTtcbiAgLW1zLWZsZXgtYWxpZ246ICRhbGlnbjsgLy8gSUUgMTBcbn1cblxuQG1peGluIGJveC1kaXJlY3Rpb24oJGRpcmVjdGlvbjogbm9ybWFsKSB7XG4vLyBub3JtYWx8cmV2ZXJzZXxpbmhlcml0XG4gIEBpbmNsdWRlIHByZWZpeGVyKGJveC1kaXJlY3Rpb24sICRkaXJlY3Rpb24sIHdlYmtpdCBtb3ogc3BlYyk7XG4gIC1tcy1mbGV4LWRpcmVjdGlvbjogJGRpcmVjdGlvbjsgLy8gSUUgMTBcbn1cblxuQG1peGluIGJveC1saW5lcygkbGluZXM6IHNpbmdsZSkge1xuLy8gc2luZ2xlfG11bHRpcGxlXG4gIEBpbmNsdWRlIHByZWZpeGVyKGJveC1saW5lcywgJGxpbmVzLCB3ZWJraXQgbW96IHNwZWMpO1xufVxuXG5AbWl4aW4gYm94LW9yZGluYWwtZ3JvdXAoJGludDogMSkge1xuICBAaW5jbHVkZSBwcmVmaXhlcihib3gtb3JkaW5hbC1ncm91cCwgJGludCwgd2Via2l0IG1veiBzcGVjKTtcbiAgLW1zLWZsZXgtb3JkZXI6ICRpbnQ7IC8vIElFIDEwXG59XG5cbkBtaXhpbiBib3gtZmxleCgkdmFsdWU6IDAuMCkge1xuICBAaW5jbHVkZSBwcmVmaXhlcihib3gtZmxleCwgJHZhbHVlLCB3ZWJraXQgbW96IHNwZWMpO1xuICAtbXMtZmxleDogJHZhbHVlOyAvLyBJRSAxMFxufVxuXG5AbWl4aW4gYm94LWZsZXgtZ3JvdXAoJGludDogMSkge1xuICBAaW5jbHVkZSBwcmVmaXhlcihib3gtZmxleC1ncm91cCwgJGludCwgd2Via2l0IG1veiBzcGVjKTtcbn1cblxuLy8gQ1NTMyBGbGV4aWJsZSBCb3ggTW9kZWwgYW5kIHByb3BlcnR5IGRlZmF1bHRzXG4vLyBVbmlmaWVkIGF0dHJpYnV0ZXMgZm9yIDIwMDksIDIwMTEsIGFuZCAyMDEyIGZsYXZvdXJzLlxuXG4vLyAyMDA5IC0gZGlzcGxheSAoYm94IHwgaW5saW5lLWJveClcbi8vIDIwMTEgLSBkaXNwbGF5IChmbGV4Ym94IHwgaW5saW5lLWZsZXhib3gpXG4vLyAyMDEyIC0gZGlzcGxheSAoZmxleCB8IGlubGluZS1mbGV4KVxuQG1peGluIGRpc3BsYXkoJHZhbHVlKSB7XG4vLyAgZmxleCB8IGlubGluZS1mbGV4XG4gICAgQGlmICR2YWx1ZSA9PSBcImZsZXhcIiB7XG4gICAgICAgIC8vIDIwMDlcbiAgICAgICAgZGlzcGxheTogLXdlYmtpdC1ib3g7XG4gICAgICAgIGRpc3BsYXk6IC1tb3otYm94O1xuICAgICAgICBkaXNwbGF5OiBib3g7XG5cbiAgICAgICAgLy8gMjAxMlxuICAgICAgICBkaXNwbGF5OiAtd2Via2l0LWZsZXg7XG4gICAgICAgIGRpc3BsYXk6IC1tb3otZmxleDtcbiAgICAgICAgZGlzcGxheTogLW1zLWZsZXhib3g7IC8vIDIwMTEgKElFIDEwKVxuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgIH1cblxuICAgIEBlbHNlaWYgJHZhbHVlID09IFwiaW5saW5lLWZsZXhcIiB7XG4gICAgICAgIGRpc3BsYXk6IC13ZWJraXQtaW5saW5lLWJveDtcbiAgICAgICAgZGlzcGxheTogLW1vei1pbmxpbmUtYm94O1xuICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYm94O1xuXG4gICAgICAgIGRpc3BsYXk6IC13ZWJraXQtaW5saW5lLWZsZXg7XG4gICAgICAgIGRpc3BsYXk6IC1tb3otaW5saW5lLWZsZXg7XG4gICAgICAgIGRpc3BsYXk6IC1tcy1pbmxpbmUtZmxleGJveDtcbiAgICAgICAgZGlzcGxheTogaW5saW5lLWZsZXg7XG4gICAgfVxuXG4gICAgQGVsc2Uge1xuICAgICAgICBkaXNwbGF5OiAkdmFsdWU7XG4gICAgfVxufVxuXG4vLyAyMDA5IC0gYm94LWZsZXggKGludGVnZXIpXG4vLyAyMDExIC0gZmxleCAoZGVjaW1hbCB8IHdpZHRoIGRlY2ltYWwpXG4vLyAyMDEyIC0gZmxleCAoaW50ZWdlciBpbnRlZ2VyIHdpZHRoKVxuQG1peGluIGZsZXgoJHZhbHVlKSB7XG5cbiAgICAvLyBHcmFiIGZsZXgtZ3JvdyBmb3Igb2xkZXIgYnJvd3NlcnMuXG4gICAgJGZsZXgtZ3JvdzogbnRoKCR2YWx1ZSwgMSk7XG5cbiAgICAvLyAyMDA5XG4gICAgQGluY2x1ZGUgcHJlZml4ZXIoYm94LWZsZXgsICRmbGV4LWdyb3csIHdlYmtpdCBtb3ogc3BlYyk7XG5cbiAgICAvLyAyMDExIChJRSAxMCksIDIwMTJcbiAgICBAaW5jbHVkZSBwcmVmaXhlcihmbGV4LCAkdmFsdWUsIHdlYmtpdCBtb3ogbXMgc3BlYyk7XG59XG5cbi8vIDIwMDkgLSBib3gtb3JpZW50ICggaG9yaXpvbnRhbCB8IHZlcnRpY2FsIHwgaW5saW5lLWF4aXMgfCBibG9jay1heGlzKVxuLy8gICAgICAtIGJveC1kaXJlY3Rpb24gKG5vcm1hbCB8IHJldmVyc2UpICAgICAgXG4vLyAyMDExIC0gZmxleC1kaXJlY3Rpb24gKHJvdyB8IHJvdy1yZXZlcnNlIHwgY29sdW1uIHwgY29sdW1uLXJldmVyc2UpXG4vLyAyMDEyIC0gZmxleC1kaXJlY3Rpb24gKHJvdyB8IHJvdy1yZXZlcnNlIHwgY29sdW1uIHwgY29sdW1uLXJldmVyc2UpXG5AbWl4aW4gZmxleC1kaXJlY3Rpb24oJHZhbHVlOiByb3cpIHtcblxuICAgIC8vIEFsdCB2YWx1ZXMuXG4gICAgJHZhbHVlLTIwMDk6ICR2YWx1ZTtcbiAgICAkdmFsdWUtMjAxMTogJHZhbHVlO1xuICAgICRkaXJlY3Rpb246IFwibm9ybWFsXCI7XG5cbiAgICBAaWYgJHZhbHVlID09IHJvdyB7XG4gICAgICAgICR2YWx1ZS0yMDA5OiBob3Jpem9udGFsO1xuICAgIH1cblxuICAgIEBlbHNlaWYgJHZhbHVlID09IFwicm93LXJldmVyc2VcIiB7XG4gICAgICAgICR2YWx1ZS0yMDA5OiBob3Jpem9udGFsO1xuICAgICAgICAkZGlyZWN0aW9uOiByZXZlcnNlO1xuICAgIH1cblxuICAgIEBlbHNlaWYgJHZhbHVlID09IGNvbHVtbiB7XG4gICAgICAgICR2YWx1ZS0yMDA5OiB2ZXJ0aWNhbDtcbiAgICB9XG5cbiAgICBAZWxzZWlmICR2YWx1ZSA9PSBcImNvbHVtbi1yZXZlcnNlXCIge1xuICAgICAgICAkdmFsdWUtMjAwOTogdmVydGljYWw7XG4gICAgICAgICRkaXJlY3Rpb246IHJldmVyc2U7XG4gICAgfVxuXG4gICAgLy8gMjAwOVxuICAgIEBpbmNsdWRlIHByZWZpeGVyKGJveC1vcmllbnQsICR2YWx1ZS0yMDA5LCB3ZWJraXQgbW96IHNwZWMpO1xuICAgIEBpZiAkZGlyZWN0aW9uID09IFwicmV2ZXJzZVwiIHtcbiAgICAgICAgQGluY2x1ZGUgcHJlZml4ZXIoYm94LWRpcmVjdGlvbiwgJGRpcmVjdGlvbiwgd2Via2l0IG1veiBzcGVjKTtcbiAgICB9XG5cbiAgICAvLyAyMDEyXG4gICAgQGluY2x1ZGUgcHJlZml4ZXIoZmxleC1kaXJlY3Rpb24sICR2YWx1ZSwgd2Via2l0IG1veiBzcGVjKTtcblxuICAgIC8vIDIwMTEgKElFIDEwKVxuICAgIC1tcy1mbGV4LWRpcmVjdGlvbjogJHZhbHVlO1xufVxuXG4vLyAyMDA5IC0gYm94LWxpbmVzIChzaW5nbGUgfCBtdWx0aXBsZSlcbi8vIDIwMTEgLSBmbGV4LXdyYXAgKG5vd3JhcCB8IHdyYXAgfCB3cmFwLXJldmVyc2UpXG4vLyAyMDEyIC0gZmxleC13cmFwIChub3dyYXAgfCB3cmFwIHwgd3JhcC1yZXZlcnNlKVxuQG1peGluIGZsZXgtd3JhcCgkdmFsdWU6IG5vd3JhcCkge1xuXG4gICAgLy8gQWx0IHZhbHVlcy5cbiAgICAkYWx0LXZhbHVlOiAkdmFsdWU7XG4gICAgQGlmICR2YWx1ZSA9PSBub3dyYXAge1xuICAgICAgICAkYWx0LXZhbHVlOiBzaW5nbGU7XG4gICAgfVxuXG4gICAgQGVsc2VpZiAkdmFsdWUgPT0gd3JhcCB7XG4gICAgICAgICRhbHQtdmFsdWU6IG11bHRpcGxlO1xuICAgIH1cblxuICAgIEBlbHNlaWYgJHZhbHVlID09IFwid3JhcC1yZXZlcnNlXCIge1xuICAgICAgICAkYWx0LXZhbHVlOiBtdWx0aXBsZTtcbiAgICB9XG5cbiAgICBAaW5jbHVkZSBwcmVmaXhlcihib3gtbGluZXMsICRhbHQtdmFsdWUsIHdlYmtpdCBtb3ogc3BlYyk7XG4gICAgQGluY2x1ZGUgcHJlZml4ZXIoZmxleC13cmFwLCAkdmFsdWUsIHdlYmtpdCBtb3ogbXMgc3BlYyk7XG59XG5cbi8vIDIwMDkgLSBUT0RPOiBwYXJzZSB2YWx1ZXMgaW50byBmbGV4LWRpcmVjdGlvbi9mbGV4LXdyYXBcbi8vIDIwMTEgLSBUT0RPOiBwYXJzZSB2YWx1ZXMgaW50byBmbGV4LWRpcmVjdGlvbi9mbGV4LXdyYXBcbi8vIDIwMTIgLSBmbGV4LWZsb3cgKGZsZXgtZGlyZWN0aW9uIHx8IGZsZXgtd3JhcClcbkBtaXhpbiBmbGV4LWZsb3coJHZhbHVlKSB7XG4gICAgQGluY2x1ZGUgcHJlZml4ZXIoZmxleC1mbG93LCAkdmFsdWUsIHdlYmtpdCBtb3ogc3BlYyk7XG59XG5cbi8vIDIwMDkgLSBib3gtb3JkaW5hbC1ncm91cCAoaW50ZWdlcilcbi8vIDIwMTEgLSBmbGV4LW9yZGVyIChpbnRlZ2VyKVxuLy8gMjAxMiAtIG9yZGVyIChpbnRlZ2VyKVxuQG1peGluIG9yZGVyKCRpbnQ6IDApIHtcbiAgICAvLyAyMDA5XG4gICAgQGluY2x1ZGUgcHJlZml4ZXIoYm94LW9yZGluYWwtZ3JvdXAsICRpbnQsIHdlYmtpdCBtb3ogc3BlYyk7XG5cbiAgICAvLyAyMDEyXG4gICAgQGluY2x1ZGUgcHJlZml4ZXIob3JkZXIsICRpbnQsIHdlYmtpdCBtb3ogc3BlYyk7XG5cbiAgICAvLyAyMDExIChJRSAxMClcbiAgICAtbXMtZmxleC1vcmRlcjogJGludDtcbn1cblxuLy8gMjAxMiAtIGZsZXgtZ3JvdyAobnVtYmVyKVxuQG1peGluIGZsZXgtZ3JvdygkbnVtYmVyOiAwKSB7XG4gICAgQGluY2x1ZGUgcHJlZml4ZXIoZmxleC1ncm93LCAkbnVtYmVyLCB3ZWJraXQgbW96IHNwZWMpO1xuICAgIC1tcy1mbGV4LXBvc2l0aXZlOiAkbnVtYmVyO1xufVxuXG4vLyAyMDEyIC0gZmxleC1zaHJpbmsgKG51bWJlcilcbkBtaXhpbiBmbGV4LXNocmluaygkbnVtYmVyOiAxKSB7XG4gICAgQGluY2x1ZGUgcHJlZml4ZXIoZmxleC1zaHJpbmssICRudW1iZXIsIHdlYmtpdCBtb3ogc3BlYyk7XG4gICAgLW1zLWZsZXgtbmVnYXRpdmU6ICRudW1iZXI7XG59XG5cbi8vIDIwMTIgLSBmbGV4LWJhc2lzIChudW1iZXIpXG5AbWl4aW4gZmxleC1iYXNpcygkd2lkdGg6IGF1dG8pIHtcbiAgICBAaW5jbHVkZSBwcmVmaXhlcihmbGV4LWJhc2lzLCAkd2lkdGgsIHdlYmtpdCBtb3ogc3BlYyk7XG4gICAgLW1zLWZsZXgtcHJlZmVycmVkLXNpemU6ICR3aWR0aDtcbn1cblxuLy8gMjAwOSAtIGJveC1wYWNrIChzdGFydCB8IGVuZCB8IGNlbnRlciB8IGp1c3RpZnkpXG4vLyAyMDExIC0gZmxleC1wYWNrIChzdGFydCB8IGVuZCB8IGNlbnRlciB8IGp1c3RpZnkpXG4vLyAyMDEyIC0ganVzdGlmeS1jb250ZW50IChmbGV4LXN0YXJ0IHwgZmxleC1lbmQgfCBjZW50ZXIgfCBzcGFjZS1iZXR3ZWVuIHwgc3BhY2UtYXJvdW5kKVxuQG1peGluIGp1c3RpZnktY29udGVudCAoJHZhbHVlOiBmbGV4LXN0YXJ0KSB7XG5cbiAgICAvLyBBbHQgdmFsdWVzLlxuICAgICRhbHQtdmFsdWU6ICR2YWx1ZTtcbiAgICBAaWYgJHZhbHVlID09IFwiZmxleC1zdGFydFwiIHtcbiAgICAgICAgJGFsdC12YWx1ZTogc3RhcnQ7XG4gICAgfVxuXG4gICAgQGVsc2VpZiAkdmFsdWUgPT0gXCJmbGV4LWVuZFwiIHtcbiAgICAgICAgJGFsdC12YWx1ZTogZW5kO1xuICAgIH1cblxuICAgIEBlbHNlaWYgJHZhbHVlID09IFwic3BhY2UtYmV0d2VlblwiIHtcbiAgICAgICAgJGFsdC12YWx1ZToganVzdGlmeTtcbiAgICB9XG5cbiAgICBAZWxzZWlmICR2YWx1ZSA9PSBcInNwYWNlLWFyb3VuZFwiIHtcbiAgICAgICAgJGFsdC12YWx1ZTogY2VudGVyO1xuICAgIH1cblxuICAgIC8vIDIwMDlcbiAgICBAaW5jbHVkZSBwcmVmaXhlcihib3gtcGFjaywgJGFsdC12YWx1ZSwgd2Via2l0IG1veiBzcGVjKTtcblxuICAgIC8vIDIwMTJcbiAgICBAaW5jbHVkZSBwcmVmaXhlcihqdXN0aWZ5LWNvbnRlbnQsICR2YWx1ZSwgd2Via2l0IG1veiBtcyBvIHNwZWMpO1xuXG4gICAgLy8gMjAxMSAoSUUgMTApXG4gICAgLW1zLWZsZXgtcGFjazogJGFsdC12YWx1ZTtcbn1cblxuLy8gMjAwOSAtIGJveC1hbGlnbiAoc3RhcnQgfCBlbmQgfCBjZW50ZXIgfCBiYXNlbGluZSB8IHN0cmV0Y2gpXG4vLyAyMDExIC0gZmxleC1hbGlnbiAoc3RhcnQgfCBlbmQgfCBjZW50ZXIgfCBiYXNlbGluZSB8IHN0cmV0Y2gpXG4vLyAyMDEyIC0gYWxpZ24taXRlbXMgKGZsZXgtc3RhcnQgfCBmbGV4LWVuZCB8IGNlbnRlciB8IGJhc2VsaW5lIHwgc3RyZXRjaClcbkBtaXhpbiBhbGlnbi1pdGVtcygkdmFsdWU6IHN0cmV0Y2gpIHtcblxuICAgICRhbHQtdmFsdWU6ICR2YWx1ZTtcblxuICAgIEBpZiAkdmFsdWUgPT0gXCJmbGV4LXN0YXJ0XCIge1xuICAgICAgICAkYWx0LXZhbHVlOiBzdGFydDtcbiAgICB9ICAgIFxuXG4gICAgQGVsc2VpZiAkdmFsdWUgPT0gXCJmbGV4LWVuZFwiIHtcbiAgICAgICAgJGFsdC12YWx1ZTogZW5kO1xuICAgIH1cblxuICAgIC8vIDIwMDlcbiAgICBAaW5jbHVkZSBwcmVmaXhlcihib3gtYWxpZ24sICRhbHQtdmFsdWUsIHdlYmtpdCBtb3ogc3BlYyk7XG5cbiAgICAvLyAyMDEyXG4gICAgQGluY2x1ZGUgcHJlZml4ZXIoYWxpZ24taXRlbXMsICR2YWx1ZSwgd2Via2l0IG1veiBtcyBvIHNwZWMpO1xuICAgIFxuICAgIC8vIDIwMTEgKElFIDEwKVxuICAgIC1tcy1mbGV4LWFsaWduOiAkYWx0LXZhbHVlOyAgICBcbn1cblxuLy8gMjAxMSAtIGZsZXgtaXRlbS1hbGlnbiAoYXV0byB8IHN0YXJ0IHwgZW5kIHwgY2VudGVyIHwgYmFzZWxpbmUgfCBzdHJldGNoKVxuLy8gMjAxMiAtIGFsaWduLXNlbGYgKGF1dG8gfCBmbGV4LXN0YXJ0IHwgZmxleC1lbmQgfCBjZW50ZXIgfCBiYXNlbGluZSB8IHN0cmV0Y2gpXG5AbWl4aW4gYWxpZ24tc2VsZigkdmFsdWU6IGF1dG8pIHtcblxuICAgICR2YWx1ZS0yMDExOiAkdmFsdWU7XG4gICAgQGlmICR2YWx1ZSA9PSBcImZsZXgtc3RhcnRcIiB7XG4gICAgICAgICR2YWx1ZS0yMDExOiBzdGFydDtcbiAgICB9ICAgIFxuXG4gICAgQGVsc2VpZiAkdmFsdWUgPT0gXCJmbGV4LWVuZFwiIHtcbiAgICAgICAgJHZhbHVlLTIwMTE6IGVuZDtcbiAgICB9XG5cbiAgICAvLyAyMDEyXG4gICAgQGluY2x1ZGUgcHJlZml4ZXIoYWxpZ24tc2VsZiwgJHZhbHVlLCB3ZWJraXQgbW96IHNwZWMpO1xuXG4gICAgLy8gMjAxMSAoSUUgMTApXG4gICAgLW1zLWZsZXgtaXRlbS1hbGlnbjogJHZhbHVlLTIwMTE7XG59XG5cbi8vIDIwMTEgLSBmbGV4LWxpbmUtcGFjayAoc3RhcnQgfCBlbmQgfCBjZW50ZXIgfCBqdXN0aWZ5IHwgZGlzdHJpYnV0ZSB8IHN0cmV0Y2gpXG4vLyAyMDEyIC0gYWxpZ24tY29udGVudCAoZmxleC1zdGFydCB8IGZsZXgtZW5kIHwgY2VudGVyIHwgc3BhY2UtYmV0d2VlbiB8IHNwYWNlLWFyb3VuZCB8IHN0cmV0Y2gpXG5AbWl4aW4gYWxpZ24tY29udGVudCgkdmFsdWU6IHN0cmV0Y2gpIHtcblxuICAgICR2YWx1ZS0yMDExOiAkdmFsdWU7XG4gICAgQGlmICR2YWx1ZSA9PSBcImZsZXgtc3RhcnRcIiB7XG4gICAgICAgICR2YWx1ZS0yMDExOiBzdGFydDtcbiAgICB9ICAgIFxuXG4gICAgQGVsc2VpZiAkdmFsdWUgPT0gXCJmbGV4LWVuZFwiIHtcbiAgICAgICAgJHZhbHVlLTIwMTE6IGVuZDtcbiAgICB9XG5cbiAgICBAZWxzZWlmICR2YWx1ZSA9PSBcInNwYWNlLWJldHdlZW5cIiB7XG4gICAgICAgICR2YWx1ZS0yMDExOiBqdXN0aWZ5O1xuICAgIH1cblxuICAgIEBlbHNlaWYgJHZhbHVlID09IFwic3BhY2UtYXJvdW5kXCIge1xuICAgICAgICAkdmFsdWUtMjAxMTogZGlzdHJpYnV0ZTtcbiAgICB9XG5cbiAgICAvLyAyMDEyXG4gICAgQGluY2x1ZGUgcHJlZml4ZXIoYWxpZ24tY29udGVudCwgJHZhbHVlLCB3ZWJraXQgbW96IHNwZWMpO1xuXG4gICAgLy8gMjAxMSAoSUUgMTApXG4gICAgLW1zLWZsZXgtbGluZS1wYWNrOiAkdmFsdWUtMjAxMTtcbn1cblxuIiwKCQkiLy8gT3JkZXIgb2YgdGhlIGluY2x1ZGVzIG1hdHRlcnMsIGFuZCBpdCBpczogbm9ybWFsLCBib2xkLCBpdGFsaWMsIGJvbGQraXRhbGljLlxuXG5AbWl4aW4gZm9udC1mYWNlKCRmb250LWZhbWlseSwgJGZpbGUtcGF0aCwgJHdlaWdodDogbm9ybWFsLCAkc3R5bGU6IG5vcm1hbCwgJGFzc2V0LXBpcGVsaW5lOiAkYXNzZXQtcGlwZWxpbmUpIHtcbiAgQGZvbnQtZmFjZSB7XG4gICAgZm9udC1mYW1pbHk6ICRmb250LWZhbWlseTtcbiAgICBmb250LXdlaWdodDogJHdlaWdodDtcbiAgICBmb250LXN0eWxlOiAkc3R5bGU7XG5cbiAgICBAaWYgJGFzc2V0LXBpcGVsaW5lID09IHRydWUge1xuICAgICAgc3JjOiBmb250LXVybCgnI3skZmlsZS1wYXRofS5lb3QnKTtcbiAgICAgIHNyYzogZm9udC11cmwoJyN7JGZpbGUtcGF0aH0uZW90PyNpZWZpeCcpICAgICAgICAgIGZvcm1hdCgnZW1iZWRkZWQtb3BlbnR5cGUnKSxcbiAgICAgICAgICAgZm9udC11cmwoJyN7JGZpbGUtcGF0aH0ud29mZicpICAgICAgICAgICAgICAgIGZvcm1hdCgnd29mZicpLFxuICAgICAgICAgICBmb250LXVybCgnI3skZmlsZS1wYXRofS50dGYnKSAgICAgICAgICAgICAgICAgZm9ybWF0KCd0cnVldHlwZScpLFxuICAgICAgICAgICBmb250LXVybCgnI3skZmlsZS1wYXRofS5zdmcjI3skZm9udC1mYW1pbHl9JykgZm9ybWF0KCdzdmcnKTtcbiAgICB9IEBlbHNlIHtcbiAgICAgIHNyYzogdXJsKCcjeyRmaWxlLXBhdGh9LmVvdCcpO1xuICAgICAgc3JjOiB1cmwoJyN7JGZpbGUtcGF0aH0uZW90PyNpZWZpeCcpICAgICAgICAgICAgICAgZm9ybWF0KCdlbWJlZGRlZC1vcGVudHlwZScpLFxuICAgICAgICAgICB1cmwoJyN7JGZpbGUtcGF0aH0ud29mZicpICAgICAgICAgICAgICAgICAgICAgZm9ybWF0KCd3b2ZmJyksXG4gICAgICAgICAgIHVybCgnI3skZmlsZS1wYXRofS50dGYnKSAgICAgICAgICAgICAgICAgICAgICBmb3JtYXQoJ3RydWV0eXBlJyksXG4gICAgICAgICAgIHVybCgnI3skZmlsZS1wYXRofS5zdmcjI3skZm9udC1mYW1pbHl9JykgICAgICBmb3JtYXQoJ3N2ZycpO1xuICAgIH1cbiAgfVxufVxuIiwKCQkiLy8gRm9udCBmZWF0dXJlIHNldHRpbmdzIG1peGluIGFuZCBwcm9wZXJ0eSBkZWZhdWx0LlxuLy8gRXhhbXBsZXM6IEBpbmNsdWRlIGZvbnQtZmVhdHVyZS1zZXR0aW5ncyhcImxpZ2FcIik7XG4vLyAgICAgICAgICAgQGluY2x1ZGUgZm9udC1mZWF0dXJlLXNldHRpbmdzKFwibG51bVwiIGZhbHNlKTtcbi8vICAgICAgICAgICBAaW5jbHVkZSBmb250LWZlYXR1cmUtc2V0dGluZ3MoXCJwbnVtXCIgMSwgXCJrZXJuXCIgMCk7XG4vLyAgICAgICAgICAgQGluY2x1ZGUgZm9udC1mZWF0dXJlLXNldHRpbmdzKFwic3MwMVwiLCBcInNzMDJcIik7XG5cbkBtaXhpbiBmb250LWZlYXR1cmUtc2V0dGluZ3MoJHNldHRpbmdzLi4uKSB7XG4gIEBpZiBsZW5ndGgoJHNldHRpbmdzKSA9PSAwIHsgJHNldHRpbmdzOiBub25lOyB9XG4gIEBpbmNsdWRlIHByZWZpeGVyKGZvbnQtZmVhdHVyZS1zZXR0aW5ncywgJHNldHRpbmdzLCB3ZWJraXQgbW96IG1zIHNwZWMpO1xufSIsCgkJIkBtaXhpbiBoeXBoZW5zKCRoeXBoZW5hdGlvbjogbm9uZSkge1xuLy8gbm9uZSB8IG1hbnVhbCB8IGF1dG9cbiAgQGluY2x1ZGUgcHJlZml4ZXIoaHlwaGVucywgJGh5cGhlbmF0aW9uLCB3ZWJraXQgbW96IG1zIHNwZWMpO1xufSIsCgkJIi8vIEhpRFBJIG1peGluLiBEZWZhdWx0IHZhbHVlIHNldCB0byAxLjMgdG8gdGFyZ2V0IEdvb2dsZSBOZXh1cyA3IChodHRwOi8vYmphbmdvLmNvbS9hcnRpY2xlcy9taW4tZGV2aWNlLXBpeGVsLXJhdGlvLylcbkBtaXhpbiBoaWRwaSgkcmF0aW86IDEuMykge1xuICBAbWVkaWEgb25seSBzY3JlZW4gYW5kICgtd2Via2l0LW1pbi1kZXZpY2UtcGl4ZWwtcmF0aW86ICRyYXRpbyksXG4gIG9ubHkgc2NyZWVuIGFuZCAobWluLS1tb3otZGV2aWNlLXBpeGVsLXJhdGlvOiAkcmF0aW8pLFxuICBvbmx5IHNjcmVlbiBhbmQgKC1vLW1pbi1kZXZpY2UtcGl4ZWwtcmF0aW86ICN7JHJhdGlvfS8xKSxcbiAgb25seSBzY3JlZW4gYW5kIChtaW4tcmVzb2x1dGlvbjogI3tyb3VuZCgkcmF0aW8qOTYpfWRwaSksXG4gIG9ubHkgc2NyZWVuIGFuZCAobWluLXJlc29sdXRpb246ICN7JHJhdGlvfWRwcHgpIHtcbiAgICBAY29udGVudDtcbiAgfVxufVxuIiwKCQkiQG1peGluIGltYWdlLXJlbmRlcmluZyAoJG1vZGU6YXV0bykge1xuXG4gIEBpZiAoJG1vZGUgPT0gY3Jpc3AtZWRnZXMpIHtcbiAgICAgIC1tcy1pbnRlcnBvbGF0aW9uLW1vZGU6IG5lYXJlc3QtbmVpZ2hib3I7IC8vIElFOCtcbiAgICAgIGltYWdlLXJlbmRlcmluZzogLW1vei1jcmlzcC1lZGdlcztcbiAgICAgIGltYWdlLXJlbmRlcmluZzogLW8tY3Jpc3AtZWRnZXM7XG4gICAgICBpbWFnZS1yZW5kZXJpbmc6IC13ZWJraXQtb3B0aW1pemUtY29udHJhc3Q7XG4gICAgICBpbWFnZS1yZW5kZXJpbmc6IGNyaXNwLWVkZ2VzO1xuICB9XG5cbiAgQGVsc2Uge1xuICAgICAgaW1hZ2UtcmVuZGVyaW5nOiAkbW9kZTtcbiAgfVxufVxuIiwKCQkiLy8gTGVnYWN5IHN1cHBvcnQgZm9yIGlubGluZS1ibG9jayBpbiBJRTcgKG1heWJlIElFNilcbkBtaXhpbiBpbmxpbmUtYmxvY2sge1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIHZlcnRpY2FsLWFsaWduOiBiYXNlbGluZTtcbiAgem9vbTogMTtcbiAgKmRpc3BsYXk6IGlubGluZTtcbiAgKnZlcnRpY2FsLWFsaWduOiBhdXRvO1xufVxuIiwKCQkiLy8gQWRkcyBrZXlmcmFtZXMgYmxvY2tzIGZvciBzdXBwb3J0ZWQgcHJlZml4ZXMsIHJlbW92aW5nIHJlZHVuZGFudCBwcmVmaXhlcyBpbiB0aGUgYmxvY2sncyBjb250ZW50XG5AbWl4aW4ga2V5ZnJhbWVzKCRuYW1lKSB7XG4gICRvcmlnaW5hbC1wcmVmaXgtZm9yLXdlYmtpdDogICAgJHByZWZpeC1mb3Itd2Via2l0O1xuICAkb3JpZ2luYWwtcHJlZml4LWZvci1tb3ppbGxhOiAgICRwcmVmaXgtZm9yLW1vemlsbGE7XG4gICRvcmlnaW5hbC1wcmVmaXgtZm9yLW1pY3Jvc29mdDogJHByZWZpeC1mb3ItbWljcm9zb2Z0O1xuICAkb3JpZ2luYWwtcHJlZml4LWZvci1vcGVyYTogICAgICRwcmVmaXgtZm9yLW9wZXJhO1xuICAkb3JpZ2luYWwtcHJlZml4LWZvci1zcGVjOiAgICAgICRwcmVmaXgtZm9yLXNwZWM7XG5cbiAgQGlmICRvcmlnaW5hbC1wcmVmaXgtZm9yLXdlYmtpdCB7XG4gICAgQGluY2x1ZGUgZGlzYWJsZS1wcmVmaXgtZm9yLWFsbCgpO1xuICAgICRwcmVmaXgtZm9yLXdlYmtpdDogdHJ1ZTtcbiAgICBALXdlYmtpdC1rZXlmcmFtZXMgI3skbmFtZX0ge1xuICAgICAgQGNvbnRlbnQ7XG4gICAgfVxuICB9XG4gIEBpZiAkb3JpZ2luYWwtcHJlZml4LWZvci1tb3ppbGxhIHtcbiAgICBAaW5jbHVkZSBkaXNhYmxlLXByZWZpeC1mb3ItYWxsKCk7XG4gICAgJHByZWZpeC1mb3ItbW96aWxsYTogdHJ1ZTtcbiAgICBALW1vei1rZXlmcmFtZXMgI3skbmFtZX0ge1xuICAgICAgQGNvbnRlbnQ7XG4gICAgfVxuICB9XG5cbiAgJHByZWZpeC1mb3Itd2Via2l0OiAgICAkb3JpZ2luYWwtcHJlZml4LWZvci13ZWJraXQ7XG4gICRwcmVmaXgtZm9yLW1vemlsbGE6ICAgJG9yaWdpbmFsLXByZWZpeC1mb3ItbW96aWxsYTtcbiAgJHByZWZpeC1mb3ItbWljcm9zb2Z0OiAkb3JpZ2luYWwtcHJlZml4LWZvci1taWNyb3NvZnQ7XG4gICRwcmVmaXgtZm9yLW9wZXJhOiAgICAgJG9yaWdpbmFsLXByZWZpeC1mb3Itb3BlcmE7XG4gICRwcmVmaXgtZm9yLXNwZWM6ICAgICAgJG9yaWdpbmFsLXByZWZpeC1mb3Itc3BlYztcblxuICBAaWYgJG9yaWdpbmFsLXByZWZpeC1mb3Itc3BlYyB7XG4gICAgQGtleWZyYW1lcyAjeyRuYW1lfSB7XG4gICAgICBAY29udGVudDtcbiAgICB9XG4gIH1cbn1cbiIsCgkJIkBtaXhpbiBsaW5lYXItZ3JhZGllbnQoJHBvcywgJEcxLCAkRzI6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICRHMzogbnVsbCwgJEc0OiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAkRzU6IG51bGwsICRHNjogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgJEc3OiBudWxsLCAkRzg6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICRHOTogbnVsbCwgJEcxMDogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgJGZhbGxiYWNrOiBudWxsKSB7XG4gIC8vIERldGVjdCB3aGF0IHR5cGUgb2YgdmFsdWUgZXhpc3RzIGluICRwb3NcbiAgJHBvcy10eXBlOiB0eXBlLW9mKG50aCgkcG9zLCAxKSk7XG4gICRwb3Mtc3BlYzogbnVsbDtcbiAgJHBvcy1kZWdyZWU6IG51bGw7XG5cbiAgLy8gSWYgJHBvcyBpcyBtaXNzaW5nIGZyb20gbWl4aW4sIHJlYXNzaWduIHZhcnMgYW5kIGFkZCBkZWZhdWx0IHBvc2l0aW9uXG4gIEBpZiAoJHBvcy10eXBlID09IGNvbG9yKSBvciAobnRoKCRwb3MsIDEpID09IFwidHJhbnNwYXJlbnRcIikgIHtcbiAgICAkRzEwOiAkRzk7ICRHOTogJEc4OyAkRzg6ICRHNzsgJEc3OiAkRzY7ICRHNjogJEc1O1xuICAgICAkRzU6ICRHNDsgJEc0OiAkRzM7ICRHMzogJEcyOyAkRzI6ICRHMTsgJEcxOiAkcG9zO1xuICAgICAkcG9zOiBudWxsO1xuICB9XG5cbiAgQGlmICRwb3Mge1xuICAgICRwb3NpdGlvbnM6IF9saW5lYXItcG9zaXRpb25zLXBhcnNlcigkcG9zKTtcbiAgICAkcG9zLWRlZ3JlZTogbnRoKCRwb3NpdGlvbnMsIDEpO1xuICAgICRwb3Mtc3BlYzogICBudGgoJHBvc2l0aW9ucywgMik7XG4gIH1cblxuICAkZnVsbDogJEcxLCAkRzIsICRHMywgJEc0LCAkRzUsICRHNiwgJEc3LCAkRzgsICRHOSwgJEcxMDtcblxuICAvLyBTZXQgJEcxIGFzIHRoZSBkZWZhdWx0IGZhbGxiYWNrIGNvbG9yXG4gICRmYWxsYmFjay1jb2xvcjogbnRoKCRHMSwgMSk7XG5cbiAgLy8gSWYgJGZhbGxiYWNrIGlzIGEgY29sb3IgdXNlIHRoYXQgY29sb3IgYXMgdGhlIGZhbGxiYWNrIGNvbG9yXG4gIEBpZiAodHlwZS1vZigkZmFsbGJhY2spID09IGNvbG9yKSBvciAoJGZhbGxiYWNrID09IFwidHJhbnNwYXJlbnRcIikge1xuICAgICRmYWxsYmFjay1jb2xvcjogJGZhbGxiYWNrO1xuICB9XG5cbiAgYmFja2dyb3VuZC1jb2xvcjogJGZhbGxiYWNrLWNvbG9yO1xuICBiYWNrZ3JvdW5kLWltYWdlOiAtd2Via2l0LWxpbmVhci1ncmFkaWVudCgkcG9zLWRlZ3JlZSAkZnVsbCk7IC8vIFNhZmFyaSA1LjErLCBDaHJvbWVcbiAgYmFja2dyb3VuZC1pbWFnZTogdW5xdW90ZShcImxpbmVhci1ncmFkaWVudCgjeyRwb3Mtc3BlY30jeyRmdWxsfSlcIik7XG59XG4iLAoJCSJAbWl4aW4gcGVyc3BlY3RpdmUoJGRlcHRoOiBub25lKSB7XG4gIC8vIG5vbmUgfCA8bGVuZ3RoPlxuICBAaW5jbHVkZSBwcmVmaXhlcihwZXJzcGVjdGl2ZSwgJGRlcHRoLCB3ZWJraXQgbW96IHNwZWMpO1xufVxuXG5AbWl4aW4gcGVyc3BlY3RpdmUtb3JpZ2luKCR2YWx1ZTogNTAlIDUwJSkge1xuICBAaW5jbHVkZSBwcmVmaXhlcihwZXJzcGVjdGl2ZS1vcmlnaW4sICR2YWx1ZSwgd2Via2l0IG1veiBzcGVjKTtcbn1cbiIsCgkJIi8vIFJlcXVpcmVzIFNhc3MgMy4xK1xuQG1peGluIHJhZGlhbC1ncmFkaWVudCgkRzEsICAgICAgICAkRzIsXG4gICAgICAgICAgICAgICAgICAgICAgICRHMzogbnVsbCwgJEc0OiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAkRzU6IG51bGwsICRHNjogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgJEc3OiBudWxsLCAkRzg6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICRHOTogbnVsbCwgJEcxMDogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgJHBvczogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgJHNoYXBlLXNpemU6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICRmYWxsYmFjazogbnVsbCkge1xuXG4gICRkYXRhOiBfcmFkaWFsLWFyZy1wYXJzZXIoJEcxLCAkRzIsICRwb3MsICRzaGFwZS1zaXplKTtcbiAgJEcxOiAgbnRoKCRkYXRhLCAxKTtcbiAgJEcyOiAgbnRoKCRkYXRhLCAyKTtcbiAgJHBvczogbnRoKCRkYXRhLCAzKTtcbiAgJHNoYXBlLXNpemU6IG50aCgkZGF0YSwgNCk7XG5cbiAgJGZ1bGw6ICRHMSwgJEcyLCAkRzMsICRHNCwgJEc1LCAkRzYsICRHNywgJEc4LCAkRzksICRHMTA7XG5cbiAgLy8gU3RyaXAgZGVwcmVjYXRlZCBjb3Zlci9jb250YWluIGZvciBzcGVjXG4gICRzaGFwZS1zaXplLXNwZWM6IF9zaGFwZS1zaXplLXN0cmlwcGVyKCRzaGFwZS1zaXplKTtcblxuICAvLyBTZXQgJEcxIGFzIHRoZSBkZWZhdWx0IGZhbGxiYWNrIGNvbG9yXG4gICRmaXJzdC1jb2xvcjogbnRoKCRmdWxsLCAxKTtcbiAgJGZhbGxiYWNrLWNvbG9yOiBudGgoJGZpcnN0LWNvbG9yLCAxKTtcblxuICBAaWYgKHR5cGUtb2YoJGZhbGxiYWNrKSA9PSBjb2xvcikgb3IgKCRmYWxsYmFjayA9PSBcInRyYW5zcGFyZW50XCIpIHtcbiAgICAkZmFsbGJhY2stY29sb3I6ICRmYWxsYmFjaztcbiAgfVxuXG4gIC8vIEFkZCBDb21tYXMgYW5kIHNwYWNlc1xuICAkc2hhcGUtc2l6ZTogaWYoJHNoYXBlLXNpemUsICcjeyRzaGFwZS1zaXplfSwgJywgbnVsbCk7XG4gICRwb3M6ICAgICAgICBpZigkcG9zLCAnI3skcG9zfSwgJywgbnVsbCk7XG4gICRwb3Mtc3BlYzogICBpZigkcG9zLCAnYXQgI3skcG9zfScsIG51bGwpO1xuICAkc2hhcGUtc2l6ZS1zcGVjOiBpZigoJHNoYXBlLXNpemUtc3BlYyAhPSAnICcpIGFuZCAoJHBvcyA9PSBudWxsKSwgJyN7JHNoYXBlLXNpemUtc3BlY30sICcsICcjeyRzaGFwZS1zaXplLXNwZWN9ICcpO1xuXG4gIGJhY2tncm91bmQtY29sb3I6ICAkZmFsbGJhY2stY29sb3I7XG4gIGJhY2tncm91bmQtaW1hZ2U6IC13ZWJraXQtcmFkaWFsLWdyYWRpZW50KHVucXVvdGUoI3skcG9zfSN7JHNoYXBlLXNpemV9I3skZnVsbH0pKTtcbiAgYmFja2dyb3VuZC1pbWFnZTogdW5xdW90ZShcInJhZGlhbC1ncmFkaWVudCgjeyRzaGFwZS1zaXplLXNwZWN9I3skcG9zLXNwZWN9I3skZnVsbH0pXCIpO1xufVxuIiwKCQkiQG1peGluIHRyYW5zZm9ybSgkcHJvcGVydHk6IG5vbmUpIHtcbi8vICBub25lIHwgPHRyYW5zZm9ybS1mdW5jdGlvbj5cbiAgQGluY2x1ZGUgcHJlZml4ZXIodHJhbnNmb3JtLCAkcHJvcGVydHksIHdlYmtpdCBtb3ogbXMgbyBzcGVjKTtcbn1cblxuQG1peGluIHRyYW5zZm9ybS1vcmlnaW4oJGF4ZXM6IDUwJSkge1xuLy8geC1heGlzIC0gbGVmdCB8IGNlbnRlciB8IHJpZ2h0ICB8IGxlbmd0aCB8ICVcbi8vIHktYXhpcyAtIHRvcCAgfCBjZW50ZXIgfCBib3R0b20gfCBsZW5ndGggfCAlXG4vLyB6LWF4aXMgLSAgICAgICAgICAgICAgICAgICAgICAgICAgbGVuZ3RoXG4gIEBpbmNsdWRlIHByZWZpeGVyKHRyYW5zZm9ybS1vcmlnaW4sICRheGVzLCB3ZWJraXQgbW96IG1zIG8gc3BlYyk7XG59XG5cbkBtaXhpbiB0cmFuc2Zvcm0tc3R5bGUgKCRzdHlsZTogZmxhdCkge1xuICBAaW5jbHVkZSBwcmVmaXhlcih0cmFuc2Zvcm0tc3R5bGUsICRzdHlsZSwgd2Via2l0IG1veiBtcyBvIHNwZWMpO1xufVxuIiwKCQkiLy8gU2hvcnRoYW5kIG1peGluLiBTdXBwb3J0cyBtdWx0aXBsZSBwYXJlbnRoZXNlcy1kZWxpbWluYXRlZCB2YWx1ZXMgZm9yIGVhY2ggdmFyaWFibGUuXG4vLyBFeGFtcGxlOiBAaW5jbHVkZSB0cmFuc2l0aW9uIChhbGwgMnMgZWFzZS1pbi1vdXQpO1xuLy8gICAgICAgICAgQGluY2x1ZGUgdHJhbnNpdGlvbiAob3BhY2l0eSAxcyBlYXNlLWluIDJzLCB3aWR0aCAycyBlYXNlLW91dCk7XG4vLyAgICAgICAgICBAaW5jbHVkZSB0cmFuc2l0aW9uLXByb3BlcnR5ICh0cmFuc2Zvcm0sIG9wYWNpdHkpO1xuXG5AbWl4aW4gdHJhbnNpdGlvbiAoJHByb3BlcnRpZXMuLi4pIHtcbiAgLy8gRml4IGZvciB2ZW5kb3ItcHJlZml4IHRyYW5zZm9ybSBwcm9wZXJ0eVxuICAkbmVlZHMtcHJlZml4ZXM6IGZhbHNlO1xuICAkd2Via2l0OiAoKTtcbiAgJG1vejogKCk7XG4gICRzcGVjOiAoKTtcblxuICAvLyBDcmVhdGUgbGlzdHMgZm9yIHZlbmRvci1wcmVmaXhlZCB0cmFuc2Zvcm1cbiAgQGVhY2ggJGxpc3QgaW4gJHByb3BlcnRpZXMge1xuICAgIEBpZiBudGgoJGxpc3QsIDEpID09IFwidHJhbnNmb3JtXCIge1xuICAgICAgJG5lZWRzLXByZWZpeGVzOiB0cnVlO1xuICAgICAgJGxpc3QxOiAtd2Via2l0LXRyYW5zZm9ybTtcbiAgICAgICRsaXN0MjogLW1vei10cmFuc2Zvcm07XG4gICAgICAkbGlzdDM6ICgpO1xuXG4gICAgICBAZWFjaCAkdmFyIGluICRsaXN0IHtcbiAgICAgICAgJGxpc3QzOiBqb2luKCRsaXN0MywgJHZhcik7XG5cbiAgICAgICAgQGlmICR2YXIgIT0gXCJ0cmFuc2Zvcm1cIiB7XG4gICAgICAgICAgJGxpc3QxOiBqb2luKCRsaXN0MSwgJHZhcik7XG4gICAgICAgICAgJGxpc3QyOiBqb2luKCRsaXN0MiwgJHZhcik7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgJHdlYmtpdDogYXBwZW5kKCR3ZWJraXQsICRsaXN0MSk7XG4gICAgICAgICAkbW96OiBhcHBlbmQoJG1veiwgICAgJGxpc3QyKTtcbiAgICAgICAgJHNwZWM6IGFwcGVuZCgkc3BlYywgICAkbGlzdDMpO1xuICAgIH1cblxuICAgIC8vIENyZWF0ZSBsaXN0cyBmb3Igbm9uLXByZWZpeGVkIHRyYW5zaXRpb24gcHJvcGVydGllc1xuICAgIEBlbHNlIHtcbiAgICAgICR3ZWJraXQ6ICBhcHBlbmQoJHdlYmtpdCwgJGxpc3QsIGNvbW1hKTtcbiAgICAgICRtb3o6ICAgICBhcHBlbmQoJG1veiwgICAgJGxpc3QsIGNvbW1hKTtcbiAgICAgICRzcGVjOiAgICBhcHBlbmQoJHNwZWMsICAgJGxpc3QsIGNvbW1hKTtcbiAgICB9XG4gIH1cblxuICBAaWYgJG5lZWRzLXByZWZpeGVzIHtcbiAgICAtd2Via2l0LXRyYW5zaXRpb246ICR3ZWJraXQ7XG4gICAgICAgLW1vei10cmFuc2l0aW9uOiAkbW96O1xuICAgICAgICAgICAgdHJhbnNpdGlvbjogJHNwZWM7XG4gIH1cbiAgQGVsc2Uge1xuICAgIEBpZiBsZW5ndGgoJHByb3BlcnRpZXMpID49IDEge1xuICAgICAgQGluY2x1ZGUgcHJlZml4ZXIodHJhbnNpdGlvbiwgJHByb3BlcnRpZXMsIHdlYmtpdCBtb3ogc3BlYyk7XG4gICAgfVxuXG4gICAgQGVsc2Uge1xuICAgICAgJHByb3BlcnRpZXM6IGFsbCAwLjE1cyBlYXNlLW91dCAwcztcbiAgICAgIEBpbmNsdWRlIHByZWZpeGVyKHRyYW5zaXRpb24sICRwcm9wZXJ0aWVzLCB3ZWJraXQgbW96IHNwZWMpO1xuICAgIH1cbiAgfVxufVxuXG5AbWl4aW4gdHJhbnNpdGlvbi1wcm9wZXJ0eSAoJHByb3BlcnRpZXMuLi4pIHtcbiAgIC13ZWJraXQtdHJhbnNpdGlvbi1wcm9wZXJ0eTogdHJhbnNpdGlvbi1wcm9wZXJ0eS1uYW1lcygkcHJvcGVydGllcywgJ3dlYmtpdCcpO1xuICAgICAgLW1vei10cmFuc2l0aW9uLXByb3BlcnR5OiB0cmFuc2l0aW9uLXByb3BlcnR5LW5hbWVzKCRwcm9wZXJ0aWVzLCAnbW96Jyk7XG4gICAgICAgICAgIHRyYW5zaXRpb24tcHJvcGVydHk6IHRyYW5zaXRpb24tcHJvcGVydHktbmFtZXMoJHByb3BlcnRpZXMsIGZhbHNlKTtcbn1cblxuQG1peGluIHRyYW5zaXRpb24tZHVyYXRpb24gKCR0aW1lcy4uLikge1xuICBAaW5jbHVkZSBwcmVmaXhlcih0cmFuc2l0aW9uLWR1cmF0aW9uLCAkdGltZXMsIHdlYmtpdCBtb3ogc3BlYyk7XG59XG5cbkBtaXhpbiB0cmFuc2l0aW9uLXRpbWluZy1mdW5jdGlvbiAoJG1vdGlvbnMuLi4pIHtcbi8vIGVhc2UgfCBsaW5lYXIgfCBlYXNlLWluIHwgZWFzZS1vdXQgfCBlYXNlLWluLW91dCB8IGN1YmljLWJlemllcigpXG4gIEBpbmNsdWRlIHByZWZpeGVyKHRyYW5zaXRpb24tdGltaW5nLWZ1bmN0aW9uLCAkbW90aW9ucywgd2Via2l0IG1veiBzcGVjKTtcbn1cblxuQG1peGluIHRyYW5zaXRpb24tZGVsYXkgKCR0aW1lcy4uLikge1xuICBAaW5jbHVkZSBwcmVmaXhlcih0cmFuc2l0aW9uLWRlbGF5LCAkdGltZXMsIHdlYmtpdCBtb3ogc3BlYyk7XG59XG4iLAoJCSJAbWl4aW4gdXNlci1zZWxlY3QoJGFyZzogbm9uZSkge1xuICBAaW5jbHVkZSBwcmVmaXhlcih1c2VyLXNlbGVjdCwgJGFyZywgd2Via2l0IG1veiBtcyBzcGVjKTtcbn1cbiIsCgkJIkBtaXhpbiBwbGFjZWhvbGRlciB7XG4gICRwbGFjZWhvbGRlcnM6IFwiOi13ZWJraXQtaW5wdXRcIiBcIjotbW96XCIgXCItbW96XCIgXCItbXMtaW5wdXRcIjtcbiAgQGVhY2ggJHBsYWNlaG9sZGVyIGluICRwbGFjZWhvbGRlcnMge1xuICAgICY6I3skcGxhY2Vob2xkZXJ9LXBsYWNlaG9sZGVyIHtcbiAgICAgIEBjb250ZW50O1xuICAgIH1cbiAgfVxufVxuIiwKCQkiQG1peGluIGJ1dHRvbiAoJHN0eWxlOiBzaW1wbGUsICRiYXNlLWNvbG9yOiAjNDI5NGYwLCAkdGV4dC1zaXplOiBpbmhlcml0LCAkcGFkZGluZzogN3B4IDE4cHgpIHtcblxuICBAaWYgdHlwZS1vZigkc3R5bGUpID09IHN0cmluZyBhbmQgdHlwZS1vZigkYmFzZS1jb2xvcikgPT0gY29sb3Ige1xuICAgIEBpbmNsdWRlIGJ1dHRvbnN0eWxlKCRzdHlsZSwgJGJhc2UtY29sb3IsICR0ZXh0LXNpemUsICRwYWRkaW5nKTtcbiAgfVxuXG4gIEBpZiB0eXBlLW9mKCRzdHlsZSkgPT0gc3RyaW5nIGFuZCB0eXBlLW9mKCRiYXNlLWNvbG9yKSA9PSBudW1iZXIge1xuICAgICRwYWRkaW5nOiAkdGV4dC1zaXplO1xuICAgICR0ZXh0LXNpemU6ICRiYXNlLWNvbG9yO1xuICAgICRiYXNlLWNvbG9yOiAjNDI5NGYwO1xuXG4gICAgQGlmICRwYWRkaW5nID09IGluaGVyaXQge1xuICAgICAgJHBhZGRpbmc6IDdweCAxOHB4O1xuICAgIH1cblxuICAgIEBpbmNsdWRlIGJ1dHRvbnN0eWxlKCRzdHlsZSwgJGJhc2UtY29sb3IsICR0ZXh0LXNpemUsICRwYWRkaW5nKTtcbiAgfVxuXG4gIEBpZiB0eXBlLW9mKCRzdHlsZSkgPT0gY29sb3IgYW5kIHR5cGUtb2YoJGJhc2UtY29sb3IpID09IGNvbG9yIHtcbiAgICAkYmFzZS1jb2xvcjogJHN0eWxlO1xuICAgICRzdHlsZTogc2ltcGxlO1xuICAgIEBpbmNsdWRlIGJ1dHRvbnN0eWxlKCRzdHlsZSwgJGJhc2UtY29sb3IsICR0ZXh0LXNpemUsICRwYWRkaW5nKTtcbiAgfVxuXG4gIEBpZiB0eXBlLW9mKCRzdHlsZSkgPT0gY29sb3IgYW5kIHR5cGUtb2YoJGJhc2UtY29sb3IpID09IG51bWJlciB7XG4gICAgJHBhZGRpbmc6ICR0ZXh0LXNpemU7XG4gICAgJHRleHQtc2l6ZTogJGJhc2UtY29sb3I7XG4gICAgJGJhc2UtY29sb3I6ICRzdHlsZTtcbiAgICAkc3R5bGU6IHNpbXBsZTtcblxuICAgIEBpZiAkcGFkZGluZyA9PSBpbmhlcml0IHtcbiAgICAgICRwYWRkaW5nOiA3cHggMThweDtcbiAgICB9XG5cbiAgICBAaW5jbHVkZSBidXR0b25zdHlsZSgkc3R5bGUsICRiYXNlLWNvbG9yLCAkdGV4dC1zaXplLCAkcGFkZGluZyk7XG4gIH1cblxuICBAaWYgdHlwZS1vZigkc3R5bGUpID09IG51bWJlciB7XG4gICAgJHBhZGRpbmc6ICRiYXNlLWNvbG9yO1xuICAgICR0ZXh0LXNpemU6ICRzdHlsZTtcbiAgICAkYmFzZS1jb2xvcjogIzQyOTRmMDtcbiAgICAkc3R5bGU6IHNpbXBsZTtcblxuICAgIEBpZiAkcGFkZGluZyA9PSAjNDI5NGYwIHtcbiAgICAgICRwYWRkaW5nOiA3cHggMThweDtcbiAgICB9XG5cbiAgICBAaW5jbHVkZSBidXR0b25zdHlsZSgkc3R5bGUsICRiYXNlLWNvbG9yLCAkdGV4dC1zaXplLCAkcGFkZGluZyk7XG4gIH1cblxuICAmOmRpc2FibGVkIHtcbiAgICBvcGFjaXR5OiAwLjU7XG4gICAgY3Vyc29yOiBub3QtYWxsb3dlZDtcbiAgfVxufVxuXG5cbi8vIFNlbGVjdG9yIFN0eWxlIEJ1dHRvblxuLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovL1xuQG1peGluIGJ1dHRvbnN0eWxlKCR0eXBlLCAkYi1jb2xvciwgJHQtc2l6ZSwgJHBhZCkge1xuICAvLyBHcmF5c2NhbGUgYnV0dG9uXG4gIEBpZiAkdHlwZSA9PSBzaW1wbGUgYW5kICRiLWNvbG9yID09IGdyYXlzY2FsZSgkYi1jb2xvcikge1xuICAgIEBpbmNsdWRlIHNpbXBsZSgkYi1jb2xvciwgdHJ1ZSwgJHQtc2l6ZSwgJHBhZCk7XG4gIH1cblxuICBAaWYgJHR5cGUgPT0gc2hpbnkgYW5kICRiLWNvbG9yID09IGdyYXlzY2FsZSgkYi1jb2xvcikge1xuICAgIEBpbmNsdWRlIHNoaW55KCRiLWNvbG9yLCB0cnVlLCAkdC1zaXplLCAkcGFkKTtcbiAgfVxuXG4gIEBpZiAkdHlwZSA9PSBwaWxsIGFuZCAkYi1jb2xvciA9PSBncmF5c2NhbGUoJGItY29sb3IpIHtcbiAgICBAaW5jbHVkZSBwaWxsKCRiLWNvbG9yLCB0cnVlLCAkdC1zaXplLCAkcGFkKTtcbiAgfVxuXG4gIEBpZiAkdHlwZSA9PSBmbGF0IGFuZCAkYi1jb2xvciA9PSBncmF5c2NhbGUoJGItY29sb3IpIHtcbiAgICBAaW5jbHVkZSBmbGF0KCRiLWNvbG9yLCB0cnVlLCAkdC1zaXplLCAkcGFkKTtcbiAgfVxuXG4gIC8vIENvbG9yZWQgYnV0dG9uXG4gIEBpZiAkdHlwZSA9PSBzaW1wbGUge1xuICAgIEBpbmNsdWRlIHNpbXBsZSgkYi1jb2xvciwgZmFsc2UsICR0LXNpemUsICRwYWQpO1xuICB9XG5cbiAgQGVsc2UgaWYgJHR5cGUgPT0gc2hpbnkge1xuICAgIEBpbmNsdWRlIHNoaW55KCRiLWNvbG9yLCBmYWxzZSwgJHQtc2l6ZSwgJHBhZCk7XG4gIH1cblxuICBAZWxzZSBpZiAkdHlwZSA9PSBwaWxsIHtcbiAgICBAaW5jbHVkZSBwaWxsKCRiLWNvbG9yLCBmYWxzZSwgJHQtc2l6ZSwgJHBhZCk7XG4gIH1cblxuICBAZWxzZSBpZiAkdHlwZSA9PSBmbGF0IHtcbiAgICBAaW5jbHVkZSBmbGF0KCRiLWNvbG9yLCBmYWxzZSwgJHQtc2l6ZSwgJHBhZCk7XG4gIH1cbn1cblxuXG4vLyBTaW1wbGUgQnV0dG9uXG4vLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi8vXG5AbWl4aW4gc2ltcGxlKCRiYXNlLWNvbG9yLCAkZ3JheXNjYWxlOiBmYWxzZSwgJHRleHRzaXplOiBpbmhlcml0LCAkcGFkZGluZzogN3B4IDE4cHgpIHtcbiAgJGNvbG9yOiAgICAgICAgIGhzbCgwLCAwLCAxMDAlKTtcbiAgJGJvcmRlcjogICAgICAgIGFkanVzdC1jb2xvcigkYmFzZS1jb2xvciwgJHNhdHVyYXRpb246ICA5JSwgICRsaWdodG5lc3M6IC0xNCUpO1xuICAkaW5zZXQtc2hhZG93OiAgYWRqdXN0LWNvbG9yKCRiYXNlLWNvbG9yLCAkc2F0dXJhdGlvbjogLTglLCAgJGxpZ2h0bmVzczogIDE1JSk7XG4gICRzdG9wLWdyYWRpZW50OiBhZGp1c3QtY29sb3IoJGJhc2UtY29sb3IsICRzYXR1cmF0aW9uOiAgOSUsICAkbGlnaHRuZXNzOiAtMTElKTtcbiAgJHRleHQtc2hhZG93OiAgIGFkanVzdC1jb2xvcigkYmFzZS1jb2xvciwgJHNhdHVyYXRpb246ICAxNSUsICRsaWdodG5lc3M6IC0xOCUpO1xuXG4gIEBpZiBpcy1saWdodCgkYmFzZS1jb2xvcikge1xuICAgICRjb2xvcjogICAgICAgaHNsKDAsIDAsIDIwJSk7XG4gICAgJHRleHQtc2hhZG93OiBhZGp1c3QtY29sb3IoJGJhc2UtY29sb3IsICRzYXR1cmF0aW9uOiAxMCUsICRsaWdodG5lc3M6IDQlKTtcbiAgfVxuXG4gIEBpZiAkZ3JheXNjYWxlID09IHRydWUge1xuICAgICRib3JkZXI6ICAgICAgICBncmF5c2NhbGUoJGJvcmRlcik7XG4gICAgJGluc2V0LXNoYWRvdzogIGdyYXlzY2FsZSgkaW5zZXQtc2hhZG93KTtcbiAgICAkc3RvcC1ncmFkaWVudDogZ3JheXNjYWxlKCRzdG9wLWdyYWRpZW50KTtcbiAgICAkdGV4dC1zaGFkb3c6ICAgZ3JheXNjYWxlKCR0ZXh0LXNoYWRvdyk7XG4gIH1cblxuICBib3JkZXI6IDFweCBzb2xpZCAkYm9yZGVyO1xuICBib3JkZXItcmFkaXVzOiAzcHg7XG4gIGJveC1zaGFkb3c6IGluc2V0IDAgMXB4IDAgMCAkaW5zZXQtc2hhZG93O1xuICBjb2xvcjogJGNvbG9yO1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIGZvbnQtc2l6ZTogJHRleHRzaXplO1xuICBmb250LXdlaWdodDogYm9sZDtcbiAgQGluY2x1ZGUgbGluZWFyLWdyYWRpZW50ICgkYmFzZS1jb2xvciwgJHN0b3AtZ3JhZGllbnQpO1xuICBwYWRkaW5nOiAkcGFkZGluZztcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICB0ZXh0LXNoYWRvdzogMCAxcHggMCAkdGV4dC1zaGFkb3c7XG4gIGJhY2tncm91bmQtY2xpcDogcGFkZGluZy1ib3g7XG5cbiAgJjpob3Zlcjpub3QoOmRpc2FibGVkKSB7XG4gICAgJGJhc2UtY29sb3ItaG92ZXI6ICAgIGFkanVzdC1jb2xvcigkYmFzZS1jb2xvciwgJHNhdHVyYXRpb246IC00JSwgJGxpZ2h0bmVzczogLTUlKTtcbiAgICAkaW5zZXQtc2hhZG93LWhvdmVyOiAgYWRqdXN0LWNvbG9yKCRiYXNlLWNvbG9yLCAkc2F0dXJhdGlvbjogLTclLCAkbGlnaHRuZXNzOiAgNSUpO1xuICAgICRzdG9wLWdyYWRpZW50LWhvdmVyOiBhZGp1c3QtY29sb3IoJGJhc2UtY29sb3IsICRzYXR1cmF0aW9uOiAgOCUsICRsaWdodG5lc3M6IC0xNCUpO1xuXG4gICAgQGlmICRncmF5c2NhbGUgPT0gdHJ1ZSB7XG4gICAgICAkYmFzZS1jb2xvci1ob3ZlcjogICAgZ3JheXNjYWxlKCRiYXNlLWNvbG9yLWhvdmVyKTtcbiAgICAgICRpbnNldC1zaGFkb3ctaG92ZXI6ICBncmF5c2NhbGUoJGluc2V0LXNoYWRvdy1ob3Zlcik7XG4gICAgICAkc3RvcC1ncmFkaWVudC1ob3ZlcjogZ3JheXNjYWxlKCRzdG9wLWdyYWRpZW50LWhvdmVyKTtcbiAgICB9XG5cbiAgICBib3gtc2hhZG93OiBpbnNldCAwIDFweCAwIDAgJGluc2V0LXNoYWRvdy1ob3ZlcjtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgQGluY2x1ZGUgbGluZWFyLWdyYWRpZW50ICgkYmFzZS1jb2xvci1ob3ZlciwgJHN0b3AtZ3JhZGllbnQtaG92ZXIpO1xuICB9XG5cbiAgJjphY3RpdmU6bm90KDpkaXNhYmxlZCksXG4gICY6Zm9jdXM6bm90KDpkaXNhYmxlZCkge1xuICAgICRib3JkZXItYWN0aXZlOiAgICAgICBhZGp1c3QtY29sb3IoJGJhc2UtY29sb3IsICRzYXR1cmF0aW9uOiA5JSwgJGxpZ2h0bmVzczogLTE0JSk7XG4gICAgJGluc2V0LXNoYWRvdy1hY3RpdmU6IGFkanVzdC1jb2xvcigkYmFzZS1jb2xvciwgJHNhdHVyYXRpb246IDclLCAkbGlnaHRuZXNzOiAtMTclKTtcblxuICAgIEBpZiAkZ3JheXNjYWxlID09IHRydWUge1xuICAgICAgJGJvcmRlci1hY3RpdmU6ICAgICAgIGdyYXlzY2FsZSgkYm9yZGVyLWFjdGl2ZSk7XG4gICAgICAkaW5zZXQtc2hhZG93LWFjdGl2ZTogZ3JheXNjYWxlKCRpbnNldC1zaGFkb3ctYWN0aXZlKTtcbiAgICB9XG5cbiAgICBib3JkZXI6IDFweCBzb2xpZCAkYm9yZGVyLWFjdGl2ZTtcbiAgICBib3gtc2hhZG93OiBpbnNldCAwIDAgOHB4IDRweCAkaW5zZXQtc2hhZG93LWFjdGl2ZSwgaW5zZXQgMCAwIDhweCA0cHggJGluc2V0LXNoYWRvdy1hY3RpdmU7XG4gIH1cbn1cblxuXG4vLyBTaGlueSBCdXR0b25cbi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqLy9cbkBtaXhpbiBzaGlueSgkYmFzZS1jb2xvciwgJGdyYXlzY2FsZTogZmFsc2UsICR0ZXh0c2l6ZTogaW5oZXJpdCwgJHBhZGRpbmc6IDdweCAxOHB4KSB7XG4gICRjb2xvcjogICAgICAgICBoc2woMCwgMCwgMTAwJSk7XG4gICRib3JkZXI6ICAgICAgICBhZGp1c3QtY29sb3IoJGJhc2UtY29sb3IsICRyZWQ6IC0xMTcsICRncmVlbjogLTExMSwgJGJsdWU6IC04MSk7XG4gICRib3JkZXItYm90dG9tOiBhZGp1c3QtY29sb3IoJGJhc2UtY29sb3IsICRyZWQ6IC0xMjYsICRncmVlbjogLTEyNywgJGJsdWU6IC0xMjIpO1xuICAkZm91cnRoLXN0b3A6ICAgYWRqdXN0LWNvbG9yKCRiYXNlLWNvbG9yLCAkcmVkOiAtNzksICAkZ3JlZW46IC03MCwgICRibHVlOiAtNDYpO1xuICAkaW5zZXQtc2hhZG93OiAgYWRqdXN0LWNvbG9yKCRiYXNlLWNvbG9yLCAkcmVkOiAgMzcsICAkZ3JlZW46ICAyOSwgICRibHVlOiAgMTIpO1xuICAkc2Vjb25kLXN0b3A6ICAgYWRqdXN0LWNvbG9yKCRiYXNlLWNvbG9yLCAkcmVkOiAtNTYsICAkZ3JlZW46IC01MCwgICRibHVlOiAtMzMpO1xuICAkdGV4dC1zaGFkb3c6ICAgYWRqdXN0LWNvbG9yKCRiYXNlLWNvbG9yLCAkcmVkOiAtMTQwLCAkZ3JlZW46IC0xNDEsICRibHVlOiAtMTE0KTtcbiAgJHRoaXJkLXN0b3A6ICAgIGFkanVzdC1jb2xvcigkYmFzZS1jb2xvciwgJHJlZDogLTg2LCAgJGdyZWVuOiAtNzUsICAkYmx1ZTogLTQ4KTtcblxuICBAaWYgaXMtbGlnaHQoJGJhc2UtY29sb3IpIHtcbiAgICAkY29sb3I6ICAgICAgIGhzbCgwLCAwLCAyMCUpO1xuICAgICR0ZXh0LXNoYWRvdzogYWRqdXN0LWNvbG9yKCRiYXNlLWNvbG9yLCAkc2F0dXJhdGlvbjogMTAlLCAkbGlnaHRuZXNzOiA0JSk7XG4gIH1cblxuICBAaWYgJGdyYXlzY2FsZSA9PSB0cnVlIHtcbiAgICAkYm9yZGVyOiAgICAgICAgZ3JheXNjYWxlKCRib3JkZXIpO1xuICAgICRib3JkZXItYm90dG9tOiBncmF5c2NhbGUoJGJvcmRlci1ib3R0b20pO1xuICAgICRmb3VydGgtc3RvcDogICBncmF5c2NhbGUoJGZvdXJ0aC1zdG9wKTtcbiAgICAkaW5zZXQtc2hhZG93OiAgZ3JheXNjYWxlKCRpbnNldC1zaGFkb3cpO1xuICAgICRzZWNvbmQtc3RvcDogICBncmF5c2NhbGUoJHNlY29uZC1zdG9wKTtcbiAgICAkdGV4dC1zaGFkb3c6ICAgZ3JheXNjYWxlKCR0ZXh0LXNoYWRvdyk7XG4gICAgJHRoaXJkLXN0b3A6ICAgIGdyYXlzY2FsZSgkdGhpcmQtc3RvcCk7XG4gIH1cblxuICBib3JkZXI6IDFweCBzb2xpZCAkYm9yZGVyO1xuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgJGJvcmRlci1ib3R0b207XG4gIGJvcmRlci1yYWRpdXM6IDVweDtcbiAgYm94LXNoYWRvdzogaW5zZXQgMCAxcHggMCAwICRpbnNldC1zaGFkb3c7XG4gIGNvbG9yOiAkY29sb3I7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgZm9udC1zaXplOiAkdGV4dHNpemU7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xuICBAaW5jbHVkZSBsaW5lYXItZ3JhZGllbnQodG9wLCAkYmFzZS1jb2xvciAwJSwgJHNlY29uZC1zdG9wIDUwJSwgJHRoaXJkLXN0b3AgNTAlLCAkZm91cnRoLXN0b3AgMTAwJSk7XG4gIHBhZGRpbmc6ICRwYWRkaW5nO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbiAgdGV4dC1zaGFkb3c6IDAgLTFweCAxcHggJHRleHQtc2hhZG93O1xuXG4gICY6aG92ZXI6bm90KDpkaXNhYmxlZCkge1xuICAgICRmaXJzdC1zdG9wLWhvdmVyOiAgYWRqdXN0LWNvbG9yKCRiYXNlLWNvbG9yLCAkcmVkOiAtMTMsICRncmVlbjogLTE1LCAkYmx1ZTogLTE4KTtcbiAgICAkc2Vjb25kLXN0b3AtaG92ZXI6IGFkanVzdC1jb2xvcigkYmFzZS1jb2xvciwgJHJlZDogLTY2LCAkZ3JlZW46IC02MiwgJGJsdWU6IC01MSk7XG4gICAgJHRoaXJkLXN0b3AtaG92ZXI6ICBhZGp1c3QtY29sb3IoJGJhc2UtY29sb3IsICRyZWQ6IC05MywgJGdyZWVuOiAtODUsICRibHVlOiAtNjYpO1xuICAgICRmb3VydGgtc3RvcC1ob3ZlcjogYWRqdXN0LWNvbG9yKCRiYXNlLWNvbG9yLCAkcmVkOiAtODYsICRncmVlbjogLTgwLCAkYmx1ZTogLTYzKTtcblxuICAgIEBpZiAkZ3JheXNjYWxlID09IHRydWUge1xuICAgICAgJGZpcnN0LXN0b3AtaG92ZXI6ICBncmF5c2NhbGUoJGZpcnN0LXN0b3AtaG92ZXIpO1xuICAgICAgJHNlY29uZC1zdG9wLWhvdmVyOiBncmF5c2NhbGUoJHNlY29uZC1zdG9wLWhvdmVyKTtcbiAgICAgICR0aGlyZC1zdG9wLWhvdmVyOiAgZ3JheXNjYWxlKCR0aGlyZC1zdG9wLWhvdmVyKTtcbiAgICAgICRmb3VydGgtc3RvcC1ob3ZlcjogZ3JheXNjYWxlKCRmb3VydGgtc3RvcC1ob3Zlcik7XG4gICAgfVxuXG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICAgIEBpbmNsdWRlIGxpbmVhci1ncmFkaWVudCh0b3AsICRmaXJzdC1zdG9wLWhvdmVyICAwJSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc2Vjb25kLXN0b3AtaG92ZXIgNTAlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICR0aGlyZC1zdG9wLWhvdmVyICA1MCUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJGZvdXJ0aC1zdG9wLWhvdmVyIDEwMCUpO1xuICB9XG5cbiAgJjphY3RpdmU6bm90KDpkaXNhYmxlZCksXG4gICY6Zm9jdXM6bm90KDpkaXNhYmxlZCkge1xuICAgICRpbnNldC1zaGFkb3ctYWN0aXZlOiBhZGp1c3QtY29sb3IoJGJhc2UtY29sb3IsICRyZWQ6IC0xMTEsICRncmVlbjogLTExNiwgJGJsdWU6IC0xMjIpO1xuXG4gICAgQGlmICRncmF5c2NhbGUgPT0gdHJ1ZSB7XG4gICAgICAkaW5zZXQtc2hhZG93LWFjdGl2ZTogZ3JheXNjYWxlKCRpbnNldC1zaGFkb3ctYWN0aXZlKTtcbiAgICB9XG5cbiAgICBib3gtc2hhZG93OiBpbnNldCAwIDAgMjBweCAwICRpbnNldC1zaGFkb3ctYWN0aXZlO1xuICB9XG59XG5cblxuLy8gUGlsbCBCdXR0b25cbi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqLy9cbkBtaXhpbiBwaWxsKCRiYXNlLWNvbG9yLCAkZ3JheXNjYWxlOiBmYWxzZSwgJHRleHRzaXplOiBpbmhlcml0LCAkcGFkZGluZzogN3B4IDE4cHgpIHtcbiAgJGNvbG9yOiAgICAgICAgIGhzbCgwLCAwLCAxMDAlKTtcbiAgJGJvcmRlci1ib3R0b206IGFkanVzdC1jb2xvcigkYmFzZS1jb2xvciwgJGh1ZTogIDgsICRzYXR1cmF0aW9uOiAtMTElLCAkbGlnaHRuZXNzOiAtMjYlKTtcbiAgJGJvcmRlci1zaWRlczogIGFkanVzdC1jb2xvcigkYmFzZS1jb2xvciwgJGh1ZTogIDQsICRzYXR1cmF0aW9uOiAtMjElLCAkbGlnaHRuZXNzOiAtMjElKTtcbiAgJGJvcmRlci10b3A6ICAgIGFkanVzdC1jb2xvcigkYmFzZS1jb2xvciwgJGh1ZTogLTEsICRzYXR1cmF0aW9uOiAtMzAlLCAkbGlnaHRuZXNzOiAtMTUlKTtcbiAgJGluc2V0LXNoYWRvdzogIGFkanVzdC1jb2xvcigkYmFzZS1jb2xvciwgJGh1ZTogLTEsICRzYXR1cmF0aW9uOiAtMSUsICAkbGlnaHRuZXNzOiAgNyUpO1xuICAkc3RvcC1ncmFkaWVudDogYWRqdXN0LWNvbG9yKCRiYXNlLWNvbG9yLCAkaHVlOiAgOCwgJHNhdHVyYXRpb246ICAxNCUsICRsaWdodG5lc3M6IC0xMCUpO1xuICAkdGV4dC1zaGFkb3c6ICAgYWRqdXN0LWNvbG9yKCRiYXNlLWNvbG9yLCAkaHVlOiAgNSwgJHNhdHVyYXRpb246IC0xOSUsICRsaWdodG5lc3M6IC0xNSUpO1xuXG4gIEBpZiBpcy1saWdodCgkYmFzZS1jb2xvcikge1xuICAgICRjb2xvcjogICAgICAgaHNsKDAsIDAsIDIwJSk7XG4gICAgJHRleHQtc2hhZG93OiBhZGp1c3QtY29sb3IoJGJhc2UtY29sb3IsICRzYXR1cmF0aW9uOiAxMCUsICRsaWdodG5lc3M6IDQlKTtcbiAgfVxuXG4gIEBpZiAkZ3JheXNjYWxlID09IHRydWUge1xuICAgICRib3JkZXItYm90dG9tOiBncmF5c2NhbGUoJGJvcmRlci1ib3R0b20pO1xuICAgICRib3JkZXItc2lkZXM6ICBncmF5c2NhbGUoJGJvcmRlci1zaWRlcyk7XG4gICAgJGJvcmRlci10b3A6ICAgIGdyYXlzY2FsZSgkYm9yZGVyLXRvcCk7XG4gICAgJGluc2V0LXNoYWRvdzogIGdyYXlzY2FsZSgkaW5zZXQtc2hhZG93KTtcbiAgICAkc3RvcC1ncmFkaWVudDogZ3JheXNjYWxlKCRzdG9wLWdyYWRpZW50KTtcbiAgICAkdGV4dC1zaGFkb3c6ICAgZ3JheXNjYWxlKCR0ZXh0LXNoYWRvdyk7XG4gIH1cblxuICBib3JkZXI6IDFweCBzb2xpZCAkYm9yZGVyLXRvcDtcbiAgYm9yZGVyLWNvbG9yOiAkYm9yZGVyLXRvcCAkYm9yZGVyLXNpZGVzICRib3JkZXItYm90dG9tO1xuICBib3JkZXItcmFkaXVzOiAxNnB4O1xuICBib3gtc2hhZG93OiBpbnNldCAwIDFweCAwIDAgJGluc2V0LXNoYWRvdztcbiAgY29sb3I6ICRjb2xvcjtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICBmb250LXNpemU6ICR0ZXh0c2l6ZTtcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcbiAgbGluZS1oZWlnaHQ6IDE7XG4gIEBpbmNsdWRlIGxpbmVhci1ncmFkaWVudCAoJGJhc2UtY29sb3IsICRzdG9wLWdyYWRpZW50KTtcbiAgcGFkZGluZzogJHBhZGRpbmc7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICB0ZXh0LXNoYWRvdzogMCAtMXB4IDFweCAkdGV4dC1zaGFkb3c7XG4gIGJhY2tncm91bmQtY2xpcDogcGFkZGluZy1ib3g7XG5cbiAgJjpob3Zlcjpub3QoOmRpc2FibGVkKSB7XG4gICAgJGJhc2UtY29sb3ItaG92ZXI6ICAgIGFkanVzdC1jb2xvcigkYmFzZS1jb2xvciwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRsaWdodG5lc3M6IC00LjUlKTtcbiAgICAkYm9yZGVyLWJvdHRvbTogICAgICAgYWRqdXN0LWNvbG9yKCRiYXNlLWNvbG9yLCAkaHVlOiAgOCwgJHNhdHVyYXRpb246ICAxMy41JSwgJGxpZ2h0bmVzczogLTMyJSk7XG4gICAgJGJvcmRlci1zaWRlczogICAgICAgIGFkanVzdC1jb2xvcigkYmFzZS1jb2xvciwgJGh1ZTogIDQsICRzYXR1cmF0aW9uOiAtMiUsICAgICRsaWdodG5lc3M6IC0yNyUpO1xuICAgICRib3JkZXItdG9wOiAgICAgICAgICBhZGp1c3QtY29sb3IoJGJhc2UtY29sb3IsICRodWU6IC0xLCAkc2F0dXJhdGlvbjogLTE3JSwgICAkbGlnaHRuZXNzOiAtMjElKTtcbiAgICAkaW5zZXQtc2hhZG93LWhvdmVyOiAgYWRqdXN0LWNvbG9yKCRiYXNlLWNvbG9yLCAgICAgICAgICAgJHNhdHVyYXRpb246IC0xJSwgICAgJGxpZ2h0bmVzczogIDMlKTtcbiAgICAkc3RvcC1ncmFkaWVudC1ob3ZlcjogYWRqdXN0LWNvbG9yKCRiYXNlLWNvbG9yLCAkaHVlOiAgOCwgJHNhdHVyYXRpb246IC00JSwgICAgJGxpZ2h0bmVzczogLTE1LjUlKTtcbiAgICAkdGV4dC1zaGFkb3ctaG92ZXI6ICAgYWRqdXN0LWNvbG9yKCRiYXNlLWNvbG9yLCAkaHVlOiAgNSwgJHNhdHVyYXRpb246IC01JSwgICAgJGxpZ2h0bmVzczogLTIyJSk7XG5cbiAgICBAaWYgJGdyYXlzY2FsZSA9PSB0cnVlIHtcbiAgICAgICRiYXNlLWNvbG9yLWhvdmVyOiAgICBncmF5c2NhbGUoJGJhc2UtY29sb3ItaG92ZXIpO1xuICAgICAgJGJvcmRlci1ib3R0b206ICAgICAgIGdyYXlzY2FsZSgkYm9yZGVyLWJvdHRvbSk7XG4gICAgICAkYm9yZGVyLXNpZGVzOiAgICAgICAgZ3JheXNjYWxlKCRib3JkZXItc2lkZXMpO1xuICAgICAgJGJvcmRlci10b3A6ICAgICAgICAgIGdyYXlzY2FsZSgkYm9yZGVyLXRvcCk7XG4gICAgICAkaW5zZXQtc2hhZG93LWhvdmVyOiAgZ3JheXNjYWxlKCRpbnNldC1zaGFkb3ctaG92ZXIpO1xuICAgICAgJHN0b3AtZ3JhZGllbnQtaG92ZXI6IGdyYXlzY2FsZSgkc3RvcC1ncmFkaWVudC1ob3Zlcik7XG4gICAgICAkdGV4dC1zaGFkb3ctaG92ZXI6ICAgZ3JheXNjYWxlKCR0ZXh0LXNoYWRvdy1ob3Zlcik7XG4gICAgfVxuXG4gICAgYm9yZGVyOiAxcHggc29saWQgJGJvcmRlci10b3A7XG4gICAgYm9yZGVyLWNvbG9yOiAkYm9yZGVyLXRvcCAkYm9yZGVyLXNpZGVzICRib3JkZXItYm90dG9tO1xuICAgIGJveC1zaGFkb3c6IGluc2V0IDAgMXB4IDAgMCAkaW5zZXQtc2hhZG93LWhvdmVyO1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICBAaW5jbHVkZSBsaW5lYXItZ3JhZGllbnQgKCRiYXNlLWNvbG9yLWhvdmVyLCAkc3RvcC1ncmFkaWVudC1ob3Zlcik7XG4gICAgdGV4dC1zaGFkb3c6IDAgLTFweCAxcHggJHRleHQtc2hhZG93LWhvdmVyO1xuICAgIGJhY2tncm91bmQtY2xpcDogcGFkZGluZy1ib3g7XG4gIH1cblxuICAmOmFjdGl2ZTpub3QoOmRpc2FibGVkKSxcbiAgJjpmb2N1czpub3QoOmRpc2FibGVkKSB7XG4gICAgJGFjdGl2ZS1jb2xvcjogICAgICAgICBhZGp1c3QtY29sb3IoJGJhc2UtY29sb3IsICRodWU6IDQsICAkc2F0dXJhdGlvbjogLTEyJSwgICRsaWdodG5lc3M6IC0xMCUpO1xuICAgICRib3JkZXItYWN0aXZlOiAgICAgICAgYWRqdXN0LWNvbG9yKCRiYXNlLWNvbG9yLCAkaHVlOiA2LCAgJHNhdHVyYXRpb246IC0yLjUlLCAkbGlnaHRuZXNzOiAtMzAlKTtcbiAgICAkYm9yZGVyLWJvdHRvbS1hY3RpdmU6IGFkanVzdC1jb2xvcigkYmFzZS1jb2xvciwgJGh1ZTogMTEsICRzYXR1cmF0aW9uOiAgNiUsICAgJGxpZ2h0bmVzczogLTMxJSk7XG4gICAgJGluc2V0LXNoYWRvdy1hY3RpdmU6ICBhZGp1c3QtY29sb3IoJGJhc2UtY29sb3IsICRodWU6IDksICAkc2F0dXJhdGlvbjogIDIlLCAgICRsaWdodG5lc3M6IC0yMS41JSk7XG4gICAgJHRleHQtc2hhZG93LWFjdGl2ZTogICBhZGp1c3QtY29sb3IoJGJhc2UtY29sb3IsICRodWU6IDUsICAkc2F0dXJhdGlvbjogLTEyJSwgICRsaWdodG5lc3M6IC0yMS41JSk7XG5cbiAgICBAaWYgJGdyYXlzY2FsZSA9PSB0cnVlIHtcbiAgICAgICRhY3RpdmUtY29sb3I6ICAgICAgICAgZ3JheXNjYWxlKCRhY3RpdmUtY29sb3IpO1xuICAgICAgJGJvcmRlci1hY3RpdmU6ICAgICAgICBncmF5c2NhbGUoJGJvcmRlci1hY3RpdmUpO1xuICAgICAgJGJvcmRlci1ib3R0b20tYWN0aXZlOiBncmF5c2NhbGUoJGJvcmRlci1ib3R0b20tYWN0aXZlKTtcbiAgICAgICRpbnNldC1zaGFkb3ctYWN0aXZlOiAgZ3JheXNjYWxlKCRpbnNldC1zaGFkb3ctYWN0aXZlKTtcbiAgICAgICR0ZXh0LXNoYWRvdy1hY3RpdmU6ICAgZ3JheXNjYWxlKCR0ZXh0LXNoYWRvdy1hY3RpdmUpO1xuICAgIH1cblxuICAgIGJhY2tncm91bmQ6ICRhY3RpdmUtY29sb3I7XG4gICAgYm9yZGVyOiAxcHggc29saWQgJGJvcmRlci1hY3RpdmU7XG4gICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICRib3JkZXItYm90dG9tLWFjdGl2ZTtcbiAgICBib3gtc2hhZG93OiBpbnNldCAwIDAgNnB4IDNweCAkaW5zZXQtc2hhZG93LWFjdGl2ZTtcbiAgICB0ZXh0LXNoYWRvdzogMCAtMXB4IDFweCAkdGV4dC1zaGFkb3ctYWN0aXZlO1xuICB9XG59XG5cblxuXG4vLyBGbGF0IEJ1dHRvblxuLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovL1xuQG1peGluIGZsYXQoJGJhc2UtY29sb3IsICRncmF5c2NhbGU6IGZhbHNlLCAkdGV4dHNpemU6IGluaGVyaXQsICRwYWRkaW5nOiA3cHggMThweCkge1xuICAkY29sb3I6ICAgICAgICAgaHNsKDAsIDAsIDEwMCUpO1xuXG4gIEBpZiBpcy1saWdodCgkYmFzZS1jb2xvcikge1xuICAgICRjb2xvcjogICAgICAgaHNsKDAsIDAsIDIwJSk7XG4gIH1cblxuICBiYWNrZ3JvdW5kLWNvbG9yOiAkYmFzZS1jb2xvcjtcbiAgYm9yZGVyLXJhZGl1czogM3B4O1xuICBib3JkZXI6IG5vbmU7XG4gIGNvbG9yOiAkY29sb3I7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgZm9udC1zaXplOiBpbmhlcml0O1xuICBmb250LXdlaWdodDogYm9sZDtcbiAgcGFkZGluZzogN3B4IDE4cHg7XG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbiAgYmFja2dyb3VuZC1jbGlwOiBwYWRkaW5nLWJveDtcblxuICAmOmhvdmVyOm5vdCg6ZGlzYWJsZWQpe1xuICAgICRiYXNlLWNvbG9yLWhvdmVyOiAgICBhZGp1c3QtY29sb3IoJGJhc2UtY29sb3IsICRzYXR1cmF0aW9uOiA0JSwgJGxpZ2h0bmVzczogNSUpO1xuXG4gICAgQGlmICRncmF5c2NhbGUgPT0gdHJ1ZSB7XG4gICAgICAkYmFzZS1jb2xvci1ob3ZlcjogZ3JheXNjYWxlKCRiYXNlLWNvbG9yLWhvdmVyKTtcbiAgICB9XG5cbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkYmFzZS1jb2xvci1ob3ZlcjtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG4gIH1cblxuICAmOmFjdGl2ZTpub3QoOmRpc2FibGVkKSxcbiAgJjpmb2N1czpub3QoOmRpc2FibGVkKSB7XG4gICAgJGJhc2UtY29sb3ItYWN0aXZlOiBhZGp1c3QtY29sb3IoJGJhc2UtY29sb3IsICRzYXR1cmF0aW9uOiAtNCUsICRsaWdodG5lc3M6IC01JSk7XG5cbiAgICBAaWYgJGdyYXlzY2FsZSA9PSB0cnVlIHtcbiAgICAgICRiYXNlLWNvbG9yLWFjdGl2ZTogZ3JheXNjYWxlKCRiYXNlLWNvbG9yLWFjdGl2ZSk7XG4gICAgfVxuXG4gICAgYmFja2dyb3VuZC1jb2xvcjogJGJhc2UtY29sb3ItYWN0aXZlO1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgfVxufVxuIiwKCQkiLy8gTW9kZXJuIG1pY3JvIGNsZWFyZml4IHByb3ZpZGVzIGFuIGVhc3kgd2F5IHRvIGNvbnRhaW4gZmxvYXRzIHdpdGhvdXQgYWRkaW5nIGFkZGl0aW9uYWwgbWFya3VwLlxuLy9cbi8vIEV4YW1wbGUgdXNhZ2U6XG4vL1xuLy8gICAgLy8gQ29udGFpbiBhbGwgZmxvYXRzIHdpdGhpbiAud3JhcHBlclxuLy8gICAgLndyYXBwZXIge1xuLy8gICAgICBAaW5jbHVkZSBjbGVhcmZpeDtcbi8vICAgICAgLmNvbnRlbnQsXG4vLyAgICAgIC5zaWRlYmFyIHtcbi8vICAgICAgICBmbG9hdCA6IGxlZnQ7XG4vLyAgICAgIH1cbi8vICAgIH1cblxuQG1peGluIGNsZWFyZml4IHtcbiAgJjphZnRlciB7XG4gICAgY29udGVudDpcIlwiO1xuICAgIGRpc3BsYXk6dGFibGU7XG4gICAgY2xlYXI6Ym90aDtcbiAgfVxufVxuXG4vLyBBY2tub3dsZWRnZW1lbnRzXG4vLyBCZWF0ICp0aGF0KiBjbGVhcmZpeDogW1RoaWVycnkgS29ibGVudHpdKGh0dHA6Ly93d3cuY3NzLTEwMS5vcmcvYXJ0aWNsZXMvY2xlYXJmaXgvbGF0ZXN0LW5ldy1jbGVhcmZpeC1zby1mYXIucGhwKVxuIiwKCQkiLy8gZGlyZWN0aW9uYWwtcHJvcGVydHkgbWl4aW5zIGFyZSBzaG9ydGhhbmRzXG4vLyBmb3Igd3JpdGluZyBwcm9wZXJ0aWVzIGxpa2UgdGhlIGZvbGxvd2luZ1xuLy9cbi8vIEBpbmNsdWRlIG1hcmdpbihudWxsIDAgMTBweCk7XG4vLyAtLS0tLS1cbi8vIG1hcmdpbi1yaWdodDogMDtcbi8vIG1hcmdpbi1ib3R0b206IDEwcHg7XG4vLyBtYXJnaW4tbGVmdDogMDtcbi8vXG4vLyAtIG9yIC1cbi8vXG4vLyBAaW5jbHVkZSBib3JkZXItc3R5bGUoZG90dGVkIG51bGwpO1xuLy8gLS0tLS0tXG4vLyBib3JkZXItdG9wLXN0eWxlOiBkb3R0ZWQ7XG4vLyBib3JkZXItYm90dG9tLXN0eWxlOiBkb3R0ZWQ7XG4vL1xuLy8gLS0tLS0tXG4vL1xuLy8gTm90ZTogWW91IGNhbiBhbHNvIHVzZSBmYWxzZSBpbnN0ZWFkIG9mIG51bGxcblxuQGZ1bmN0aW9uIGNvbGxhcHNlLWRpcmVjdGlvbmFscygkdmFscykge1xuICAkb3V0cHV0OiBudWxsO1xuXG4gICRBOiBudGgoICR2YWxzLCAxICk7XG4gICRCOiBpZiggbGVuZ3RoKCR2YWxzKSA8IDIsICRBLCBudGgoJHZhbHMsIDIpKTtcbiAgJEM6IGlmKCBsZW5ndGgoJHZhbHMpIDwgMywgJEEsIG50aCgkdmFscywgMykpO1xuICAkRDogaWYoIGxlbmd0aCgkdmFscykgPCAyLCAkQSwgbnRoKCR2YWxzLCBpZiggbGVuZ3RoKCR2YWxzKSA8IDQsIDIsIDQpICkpO1xuXG4gIEBpZiAkQSA9PSAwIHsgJEE6IDAgfVxuICBAaWYgJEIgPT0gMCB7ICRCOiAwIH1cbiAgQGlmICRDID09IDAgeyAkQzogMCB9XG4gIEBpZiAkRCA9PSAwIHsgJEQ6IDAgfVxuXG4gIEBpZiAkQSA9PSAkQiBhbmQgJEEgPT0gJEMgYW5kICRBID09ICREIHsgJG91dHB1dDogJEEgICAgICAgICAgfVxuICBAZWxzZSBpZiAkQSA9PSAkQyBhbmQgJEIgPT0gJEQgICAgICAgICB7ICRvdXRwdXQ6ICRBICRCICAgICAgIH1cbiAgQGVsc2UgaWYgJEIgPT0gJEQgICAgICAgICAgICAgICAgICAgICAgeyAkb3V0cHV0OiAkQSAkQiAkQyAgICB9XG4gIEBlbHNlICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgJG91dHB1dDogJEEgJEIgJEMgJEQgfVxuXG4gIEByZXR1cm4gJG91dHB1dDtcbn1cblxuQGZ1bmN0aW9uIGNvbnRhaW5zLWZhbHN5KCRsaXN0KSB7XG4gIEBlYWNoICRpdGVtIGluICRsaXN0IHtcbiAgICBAaWYgbm90ICRpdGVtIHtcbiAgICAgIEByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBAcmV0dXJuIGZhbHNlO1xufVxuXG5AbWl4aW4gZGlyZWN0aW9uYWwtcHJvcGVydHkoJHByZSwgJHN1ZiwgJHZhbHMpIHtcbiAgLy8gUHJvcGVydHkgTmFtZXNcbiAgJHRvcDogICAgJHByZSArIFwiLXRvcFwiICAgICsgaWYoJHN1ZiwgXCItI3skc3VmfVwiLCBcIlwiKTtcbiAgJGJvdHRvbTogJHByZSArIFwiLWJvdHRvbVwiICsgaWYoJHN1ZiwgXCItI3skc3VmfVwiLCBcIlwiKTtcbiAgJGxlZnQ6ICAgJHByZSArIFwiLWxlZnRcIiAgICsgaWYoJHN1ZiwgXCItI3skc3VmfVwiLCBcIlwiKTtcbiAgJHJpZ2h0OiAgJHByZSArIFwiLXJpZ2h0XCIgICsgaWYoJHN1ZiwgXCItI3skc3VmfVwiLCBcIlwiKTtcbiAgJGFsbDogICAgJHByZSArICAgICAgICAgICAgIGlmKCRzdWYsIFwiLSN7JHN1Zn1cIiwgXCJcIik7XG5cbiAgJHZhbHM6IGNvbGxhcHNlLWRpcmVjdGlvbmFscygkdmFscyk7XG5cbiAgQGlmIGNvbnRhaW5zLWZhbHN5KCR2YWxzKSB7XG4gICAgQGlmIG50aCgkdmFscywgMSkgeyAjeyR0b3B9OiBudGgoJHZhbHMsIDEpOyB9XG5cbiAgICBAaWYgbGVuZ3RoKCR2YWxzKSA9PSAxIHtcbiAgICAgIEBpZiBudGgoJHZhbHMsIDEpIHsgI3skcmlnaHR9OiBudGgoJHZhbHMsIDEpOyB9XG4gICAgfSBAZWxzZSB7XG4gICAgICBAaWYgbnRoKCR2YWxzLCAyKSB7ICN7JHJpZ2h0fTogbnRoKCR2YWxzLCAyKTsgfVxuICAgIH1cblxuICAgIC8vIHByb3A6IHRvcC9ib3R0b20gcmlnaHQvbGVmdFxuICAgIEBpZiBsZW5ndGgoJHZhbHMpID09IDIge1xuICAgICAgQGlmIG50aCgkdmFscywgMSkgeyAjeyRib3R0b219OiBudGgoJHZhbHMsIDEpOyB9XG4gICAgICBAaWYgbnRoKCR2YWxzLCAyKSB7ICN7JGxlZnR9OiAgIG50aCgkdmFscywgMik7IH1cblxuICAgIC8vIHByb3A6IHRvcCByaWdodC9sZWZ0IGJvdHRvbVxuICAgIH0gQGVsc2UgaWYgbGVuZ3RoKCR2YWxzKSA9PSAzIHtcbiAgICAgIEBpZiBudGgoJHZhbHMsIDMpIHsgI3skYm90dG9tfTogbnRoKCR2YWxzLCAzKTsgfVxuICAgICAgQGlmIG50aCgkdmFscywgMikgeyAjeyRsZWZ0fTogICBudGgoJHZhbHMsIDIpOyB9XG5cbiAgICAvLyBwcm9wOiB0b3AgcmlnaHQgYm90dG9tIGxlZnRcbiAgICB9IEBlbHNlIGlmIGxlbmd0aCgkdmFscykgPT0gNCB7XG4gICAgICBAaWYgbnRoKCR2YWxzLCAzKSB7ICN7JGJvdHRvbX06IG50aCgkdmFscywgMyk7IH1cbiAgICAgIEBpZiBudGgoJHZhbHMsIDQpIHsgI3skbGVmdH06ICAgbnRoKCR2YWxzLCA0KTsgfVxuICAgIH1cblxuICAvLyBwcm9wOiB0b3AvcmlnaHQvYm90dG9tL2xlZnRcbiAgfSBAZWxzZSB7XG4gICAgI3skYWxsfTogJHZhbHM7XG4gIH1cbn1cblxuQG1peGluIG1hcmdpbigkdmFscy4uLikge1xuICBAaW5jbHVkZSBkaXJlY3Rpb25hbC1wcm9wZXJ0eShtYXJnaW4sIGZhbHNlLCAkdmFscy4uLik7XG59XG5cbkBtaXhpbiBwYWRkaW5nKCR2YWxzLi4uKSB7XG4gIEBpbmNsdWRlIGRpcmVjdGlvbmFsLXByb3BlcnR5KHBhZGRpbmcsIGZhbHNlLCAkdmFscy4uLik7XG59XG5cbkBtaXhpbiBib3JkZXItc3R5bGUoJHZhbHMuLi4pIHtcbiAgQGluY2x1ZGUgZGlyZWN0aW9uYWwtcHJvcGVydHkoYm9yZGVyLCBzdHlsZSwgJHZhbHMuLi4pO1xufVxuXG5AbWl4aW4gYm9yZGVyLWNvbG9yKCR2YWxzLi4uKSB7XG4gIEBpbmNsdWRlIGRpcmVjdGlvbmFsLXByb3BlcnR5KGJvcmRlciwgY29sb3IsICR2YWxzLi4uKTtcbn1cblxuQG1peGluIGJvcmRlci13aWR0aCgkdmFscy4uLikge1xuICBAaW5jbHVkZSBkaXJlY3Rpb25hbC1wcm9wZXJ0eShib3JkZXIsIHdpZHRoLCAkdmFscy4uLik7XG59XG4iLAoJCSJAbWl4aW4gZWxsaXBzaXMoJHdpZHRoOiAxMDAlKSB7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgbWF4LXdpZHRoOiAkd2lkdGg7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xufVxuIiwKCQkiJGdlb3JnaWE6IEdlb3JnaWEsIENhbWJyaWEsIFwiVGltZXMgTmV3IFJvbWFuXCIsIFRpbWVzLCBzZXJpZjtcbiRoZWx2ZXRpY2E6IFwiSGVsdmV0aWNhIE5ldWVcIiwgSGVsdmV0aWNhLCBSb2JvdG8sIEFyaWFsLCBzYW5zLXNlcmlmO1xuJGx1Y2lkYS1ncmFuZGU6IFwiTHVjaWRhIEdyYW5kZVwiLCBUYWhvbWEsIFZlcmRhbmEsIEFyaWFsLCBzYW5zLXNlcmlmO1xuJG1vbm9zcGFjZTogXCJCaXRzdHJlYW0gVmVyYSBTYW5zIE1vbm9cIiwgQ29uc29sYXMsIENvdXJpZXIsIG1vbm9zcGFjZTtcbiR2ZXJkYW5hOiBWZXJkYW5hLCBHZW5ldmEsIHNhbnMtc2VyaWY7XG4iLAoJCSJAbWl4aW4gaGlkZS10ZXh0IHtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcblxuICAmOmJlZm9yZSB7XG4gICAgY29udGVudDogXCJcIjtcbiAgICBkaXNwbGF5OiBibG9jaztcbiAgICB3aWR0aDogMDtcbiAgICBoZWlnaHQ6IDEwMCU7XG4gIH1cbn1cbiIsCgkJIi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqLy9cbi8vIEdlbmVyYXRlIGEgdmFyaWFibGUgKCRhbGwtdGV4dC1pbnB1dHMpIHdpdGggYSBsaXN0IG9mIGFsbCBodG1sNVxuLy8gaW5wdXQgdHlwZXMgdGhhdCBoYXZlIGEgdGV4dC1iYXNlZCBpbnB1dCwgZXhjbHVkaW5nIHRleHRhcmVhLlxuLy8gaHR0cDovL2RpdmVpbnRvaHRtbDUub3JnL2Zvcm1zLmh0bWxcbi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqLy9cbiRpbnB1dHMtbGlzdDogJ2lucHV0W3R5cGU9XCJlbWFpbFwiXScsXG4gICAgICAgICAgICAgICdpbnB1dFt0eXBlPVwibnVtYmVyXCJdJyxcbiAgICAgICAgICAgICAgJ2lucHV0W3R5cGU9XCJwYXNzd29yZFwiXScsXG4gICAgICAgICAgICAgICdpbnB1dFt0eXBlPVwic2VhcmNoXCJdJyxcbiAgICAgICAgICAgICAgJ2lucHV0W3R5cGU9XCJ0ZWxcIl0nLFxuICAgICAgICAgICAgICAnaW5wdXRbdHlwZT1cInRleHRcIl0nLFxuICAgICAgICAgICAgICAnaW5wdXRbdHlwZT1cInVybFwiXScsXG5cbiAgICAgICAgICAgICAgLy8gV2Via2l0ICYgR2Vja28gbWF5IGNoYW5nZSB0aGUgZGlzcGxheSBvZiB0aGVzZSBpbiB0aGUgZnV0dXJlXG4gICAgICAgICAgICAgICdpbnB1dFt0eXBlPVwiY29sb3JcIl0nLFxuICAgICAgICAgICAgICAnaW5wdXRbdHlwZT1cImRhdGVcIl0nLFxuICAgICAgICAgICAgICAnaW5wdXRbdHlwZT1cImRhdGV0aW1lXCJdJyxcbiAgICAgICAgICAgICAgJ2lucHV0W3R5cGU9XCJkYXRldGltZS1sb2NhbFwiXScsXG4gICAgICAgICAgICAgICdpbnB1dFt0eXBlPVwibW9udGhcIl0nLFxuICAgICAgICAgICAgICAnaW5wdXRbdHlwZT1cInRpbWVcIl0nLFxuICAgICAgICAgICAgICAnaW5wdXRbdHlwZT1cIndlZWtcIl0nO1xuXG4kdW5xdW90ZWQtaW5wdXRzLWxpc3Q6ICgpO1xuQGVhY2ggJGlucHV0LXR5cGUgaW4gJGlucHV0cy1saXN0IHtcbiAgJHVucXVvdGVkLWlucHV0cy1saXN0OiBhcHBlbmQoJHVucXVvdGVkLWlucHV0cy1saXN0LCB1bnF1b3RlKCRpbnB1dC10eXBlKSwgY29tbWEpO1xufVxuXG4kYWxsLXRleHQtaW5wdXRzOiAkdW5xdW90ZWQtaW5wdXRzLWxpc3Q7XG5cblxuLy8gSG92ZXIgUHNldWRvLWNsYXNzXG4vLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi8vXG4kYWxsLXRleHQtaW5wdXRzLWhvdmVyOiAoKTtcbkBlYWNoICRpbnB1dC10eXBlIGluICR1bnF1b3RlZC1pbnB1dHMtbGlzdCB7XG4gICAgICAkaW5wdXQtdHlwZS1ob3ZlcjogJGlucHV0LXR5cGUgKyBcIjpob3ZlclwiO1xuICAgICAgJGFsbC10ZXh0LWlucHV0cy1ob3ZlcjogYXBwZW5kKCRhbGwtdGV4dC1pbnB1dHMtaG92ZXIsICRpbnB1dC10eXBlLWhvdmVyLCBjb21tYSk7XG59XG5cbi8vIEZvY3VzIFBzZXVkby1jbGFzc1xuLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovL1xuJGFsbC10ZXh0LWlucHV0cy1mb2N1czogKCk7XG5AZWFjaCAkaW5wdXQtdHlwZSBpbiAkdW5xdW90ZWQtaW5wdXRzLWxpc3Qge1xuICAgICAgJGlucHV0LXR5cGUtZm9jdXM6ICRpbnB1dC10eXBlICsgXCI6Zm9jdXNcIjtcbiAgICAgICRhbGwtdGV4dC1pbnB1dHMtZm9jdXM6IGFwcGVuZCgkYWxsLXRleHQtaW5wdXRzLWZvY3VzLCAkaW5wdXQtdHlwZS1mb2N1cywgY29tbWEpO1xufVxuXG4vLyBZb3UgbXVzdCB1c2UgaW50ZXJwb2xhdGlvbiBvbiB0aGUgdmFyaWFibGU6XG4vLyAjeyRhbGwtdGV4dC1pbnB1dHN9XG4vLyAjeyRhbGwtdGV4dC1pbnB1dHMtaG92ZXJ9XG4vLyAjeyRhbGwtdGV4dC1pbnB1dHMtZm9jdXN9XG5cbi8vIEV4YW1wbGVcbi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqLy9cbi8vICAgI3skYWxsLXRleHQtaW5wdXRzfSwgdGV4dGFyZWEge1xuLy8gICAgIGJvcmRlcjogMXB4IHNvbGlkIHJlZDtcbi8vICAgfVxuXG5cblxuLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovL1xuLy8gR2VuZXJhdGUgYSB2YXJpYWJsZSAoJGFsbC1idXR0b24taW5wdXRzKSB3aXRoIGEgbGlzdCBvZiBhbGwgaHRtbDVcbi8vIGlucHV0IHR5cGVzIHRoYXQgaGF2ZSBhIGJ1dHRvbi1iYXNlZCBpbnB1dCwgZXhjbHVkaW5nIGJ1dHRvbi5cbi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqLy9cbiRpbnB1dHMtYnV0dG9uLWxpc3Q6ICdpbnB1dFt0eXBlPVwiYnV0dG9uXCJdJyxcbiAgICAgICAgICAgICAgICAgICAgICdpbnB1dFt0eXBlPVwicmVzZXRcIl0nLFxuICAgICAgICAgICAgICAgICAgICAgJ2lucHV0W3R5cGU9XCJzdWJtaXRcIl0nO1xuXG4kdW5xdW90ZWQtaW5wdXRzLWJ1dHRvbi1saXN0OiAoKTtcbkBlYWNoICRpbnB1dC10eXBlIGluICRpbnB1dHMtYnV0dG9uLWxpc3Qge1xuICAkdW5xdW90ZWQtaW5wdXRzLWJ1dHRvbi1saXN0OiBhcHBlbmQoJHVucXVvdGVkLWlucHV0cy1idXR0b24tbGlzdCwgdW5xdW90ZSgkaW5wdXQtdHlwZSksIGNvbW1hKTtcbn1cblxuJGFsbC1idXR0b24taW5wdXRzOiAkdW5xdW90ZWQtaW5wdXRzLWJ1dHRvbi1saXN0O1xuXG5cbi8vIEhvdmVyIFBzZXVkby1jbGFzc1xuLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovL1xuJGFsbC1idXR0b24taW5wdXRzLWhvdmVyOiAoKTtcbkBlYWNoICRpbnB1dC10eXBlIGluICR1bnF1b3RlZC1pbnB1dHMtYnV0dG9uLWxpc3Qge1xuICAgICAgJGlucHV0LXR5cGUtaG92ZXI6ICRpbnB1dC10eXBlICsgXCI6aG92ZXJcIjtcbiAgICAgICRhbGwtYnV0dG9uLWlucHV0cy1ob3ZlcjogYXBwZW5kKCRhbGwtYnV0dG9uLWlucHV0cy1ob3ZlciwgJGlucHV0LXR5cGUtaG92ZXIsIGNvbW1hKTtcbn1cblxuLy8gRm9jdXMgUHNldWRvLWNsYXNzXG4vLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi8vXG4kYWxsLWJ1dHRvbi1pbnB1dHMtZm9jdXM6ICgpO1xuQGVhY2ggJGlucHV0LXR5cGUgaW4gJHVucXVvdGVkLWlucHV0cy1idXR0b24tbGlzdCB7XG4gICAgICAkaW5wdXQtdHlwZS1mb2N1czogJGlucHV0LXR5cGUgKyBcIjpmb2N1c1wiO1xuICAgICAgJGFsbC1idXR0b24taW5wdXRzLWZvY3VzOiBhcHBlbmQoJGFsbC1idXR0b24taW5wdXRzLWZvY3VzLCAkaW5wdXQtdHlwZS1mb2N1cywgY29tbWEpO1xufVxuXG4vLyBBY3RpdmUgUHNldWRvLWNsYXNzXG4vLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi8vXG4kYWxsLWJ1dHRvbi1pbnB1dHMtYWN0aXZlOiAoKTtcbkBlYWNoICRpbnB1dC10eXBlIGluICR1bnF1b3RlZC1pbnB1dHMtYnV0dG9uLWxpc3Qge1xuICAgICAgJGlucHV0LXR5cGUtYWN0aXZlOiAkaW5wdXQtdHlwZSArIFwiOmFjdGl2ZVwiO1xuICAgICAgJGFsbC1idXR0b24taW5wdXRzLWFjdGl2ZTogYXBwZW5kKCRhbGwtYnV0dG9uLWlucHV0cy1hY3RpdmUsICRpbnB1dC10eXBlLWFjdGl2ZSwgY29tbWEpO1xufVxuXG4vLyBZb3UgbXVzdCB1c2UgaW50ZXJwb2xhdGlvbiBvbiB0aGUgdmFyaWFibGU6XG4vLyAjeyRhbGwtYnV0dG9uLWlucHV0c31cbi8vICN7JGFsbC1idXR0b24taW5wdXRzLWhvdmVyfVxuLy8gI3skYWxsLWJ1dHRvbi1pbnB1dHMtZm9jdXN9XG4vLyAjeyRhbGwtYnV0dG9uLWlucHV0cy1hY3RpdmV9XG5cbi8vIEV4YW1wbGVcbi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqLy9cbi8vICAgI3skYWxsLWJ1dHRvbi1pbnB1dHN9LCBidXR0b24ge1xuLy8gICAgIGJvcmRlcjogMXB4IHNvbGlkIHJlZDtcbi8vICAgfVxuIiwKCQkiQG1peGluIHBvc2l0aW9uICgkcG9zaXRpb246IHJlbGF0aXZlLCAkY29vcmRpbmF0ZXM6IDAgMCAwIDApIHtcblxuICBAaWYgdHlwZS1vZigkcG9zaXRpb24pID09IGxpc3Qge1xuICAgICRjb29yZGluYXRlczogJHBvc2l0aW9uO1xuICAgICRwb3NpdGlvbjogcmVsYXRpdmU7XG4gIH1cblxuICAkY29vcmRpbmF0ZXM6IHVucGFjaygkY29vcmRpbmF0ZXMpO1xuXG4gICR0b3A6IG50aCgkY29vcmRpbmF0ZXMsIDEpO1xuICAkcmlnaHQ6IG50aCgkY29vcmRpbmF0ZXMsIDIpO1xuICAkYm90dG9tOiBudGgoJGNvb3JkaW5hdGVzLCAzKTtcbiAgJGxlZnQ6IG50aCgkY29vcmRpbmF0ZXMsIDQpO1xuXG4gIHBvc2l0aW9uOiAkcG9zaXRpb247XG5cbiAgQGlmICgkdG9wIGFuZCAkdG9wID09IGF1dG8pIG9yICh0eXBlLW9mKCR0b3ApID09IG51bWJlciBhbmQgbm90IHVuaXRsZXNzKCR0b3ApKSB7XG4gICAgdG9wOiAkdG9wO1xuICB9XG5cbiAgQGlmICgkcmlnaHQgYW5kICRyaWdodCA9PSBhdXRvKSBvciAodHlwZS1vZigkcmlnaHQpID09IG51bWJlciBhbmQgbm90IHVuaXRsZXNzKCRyaWdodCkpIHtcbiAgICByaWdodDogJHJpZ2h0O1xuICB9XG5cbiAgQGlmICgkYm90dG9tIGFuZCAkYm90dG9tID09IGF1dG8pIG9yICh0eXBlLW9mKCRib3R0b20pID09IG51bWJlciBhbmQgbm90IHVuaXRsZXNzKCRib3R0b20pKSB7XG4gICAgYm90dG9tOiAkYm90dG9tO1xuICB9XG5cbiAgQGlmICgkbGVmdCBhbmQgJGxlZnQgPT0gYXV0bykgb3IgKHR5cGUtb2YoJGxlZnQpID09IG51bWJlciBhbmQgbm90IHVuaXRsZXNzKCRsZWZ0KSkge1xuICAgIGxlZnQ6ICRsZWZ0O1xuICB9XG59XG4iLAoJCSIvLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi8vXG4vLyBFeGFtcGxlOiBAaW5jbHVkZSBwcmVmaXhlcihib3JkZXItcmFkaXVzLCAkcmFkaWksIHdlYmtpdCBtcyBzcGVjKTtcbi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqLy9cbi8vIFZhcmlhYmxlcyBsb2NhdGVkIGluIC9zZXR0aW5ncy9fcHJlZml4ZXIuc2Nzc1xuXG5AbWl4aW4gcHJlZml4ZXIgKCRwcm9wZXJ0eSwgJHZhbHVlLCAkcHJlZml4ZXMpIHtcbiAgQGVhY2ggJHByZWZpeCBpbiAkcHJlZml4ZXMge1xuICAgIEBpZiAkcHJlZml4ID09IHdlYmtpdCB7XG4gICAgICBAaWYgJHByZWZpeC1mb3Itd2Via2l0IHtcbiAgICAgICAgLXdlYmtpdC0jeyRwcm9wZXJ0eX06ICR2YWx1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgQGVsc2UgaWYgJHByZWZpeCA9PSBtb3oge1xuICAgICAgQGlmICRwcmVmaXgtZm9yLW1vemlsbGEge1xuICAgICAgICAtbW96LSN7JHByb3BlcnR5fTogJHZhbHVlO1xuICAgICAgfVxuICAgIH1cbiAgICBAZWxzZSBpZiAkcHJlZml4ID09IG1zIHtcbiAgICAgIEBpZiAkcHJlZml4LWZvci1taWNyb3NvZnQge1xuICAgICAgICAtbXMtI3skcHJvcGVydHl9OiAkdmFsdWU7XG4gICAgICB9XG4gICAgfVxuICAgIEBlbHNlIGlmICRwcmVmaXggPT0gbyB7XG4gICAgICBAaWYgJHByZWZpeC1mb3Itb3BlcmEge1xuICAgICAgICAtby0jeyRwcm9wZXJ0eX06ICR2YWx1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgQGVsc2UgaWYgJHByZWZpeCA9PSBzcGVjIHtcbiAgICAgIEBpZiAkcHJlZml4LWZvci1zcGVjIHtcbiAgICAgICAgI3skcHJvcGVydHl9OiAkdmFsdWU7XG4gICAgICB9XG4gICAgfVxuICAgIEBlbHNlICB7XG4gICAgICBAd2FybiBcIlVucmVjb2duaXplZCBwcmVmaXg6ICN7JHByZWZpeH1cIjtcbiAgICB9XG4gIH1cbn1cblxuQG1peGluIGRpc2FibGUtcHJlZml4LWZvci1hbGwoKSB7XG4gICRwcmVmaXgtZm9yLXdlYmtpdDogICAgZmFsc2U7XG4gICRwcmVmaXgtZm9yLW1vemlsbGE6ICAgZmFsc2U7XG4gICRwcmVmaXgtZm9yLW1pY3Jvc29mdDogZmFsc2U7XG4gICRwcmVmaXgtZm9yLW9wZXJhOiAgICAgZmFsc2U7XG4gICRwcmVmaXgtZm9yLXNwZWM6ICAgICAgZmFsc2U7XG59XG4iLAoJCSJAbWl4aW4gcmV0aW5hLWltYWdlKCRmaWxlbmFtZSwgJGJhY2tncm91bmQtc2l6ZSwgJGV4dGVuc2lvbjogcG5nLCAkcmV0aW5hLWZpbGVuYW1lOiBudWxsLCAkcmV0aW5hLXN1ZmZpeDogXzJ4LCAkYXNzZXQtcGlwZWxpbmU6ICRhc3NldC1waXBlbGluZSkge1xuICBAaWYgJGFzc2V0LXBpcGVsaW5lIHtcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiBpbWFnZS11cmwoXCIjeyRmaWxlbmFtZX0uI3skZXh0ZW5zaW9ufVwiKTtcbiAgfVxuICBAZWxzZSB7XG4gICAgYmFja2dyb3VuZC1pbWFnZTogICAgICAgdXJsKFwiI3skZmlsZW5hbWV9LiN7JGV4dGVuc2lvbn1cIik7XG4gIH1cblxuICBAaW5jbHVkZSBoaWRwaSB7XG4gICAgQGlmICRhc3NldC1waXBlbGluZSB7XG4gICAgICBAaWYgJHJldGluYS1maWxlbmFtZSB7XG4gICAgICAgIGJhY2tncm91bmQtaW1hZ2U6IGltYWdlLXVybChcIiN7JHJldGluYS1maWxlbmFtZX0uI3skZXh0ZW5zaW9ufVwiKTtcbiAgICAgIH1cbiAgICAgIEBlbHNlIHtcbiAgICAgICAgYmFja2dyb3VuZC1pbWFnZTogaW1hZ2UtdXJsKFwiI3skZmlsZW5hbWV9I3skcmV0aW5hLXN1ZmZpeH0uI3skZXh0ZW5zaW9ufVwiKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBAZWxzZSB7XG4gICAgICBAaWYgJHJldGluYS1maWxlbmFtZSB7XG4gICAgICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybChcIiN7JHJldGluYS1maWxlbmFtZX0uI3skZXh0ZW5zaW9ufVwiKTtcbiAgICAgIH1cbiAgICAgIEBlbHNlIHtcbiAgICAgICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFwiI3skZmlsZW5hbWV9I3skcmV0aW5hLXN1ZmZpeH0uI3skZXh0ZW5zaW9ufVwiKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBiYWNrZ3JvdW5kLXNpemU6ICRiYWNrZ3JvdW5kLXNpemU7XG5cbiAgfVxufVxuIiwKCQkiQG1peGluIHNpemUoJHNpemUpIHtcbiAgQGlmIGxlbmd0aCgkc2l6ZSkgPT0gMSB7XG4gICAgQGlmICRzaXplID09IGF1dG8ge1xuICAgICAgd2lkdGg6ICAkc2l6ZTtcbiAgICAgIGhlaWdodDogJHNpemU7XG4gICAgfVxuXG4gICAgQGVsc2UgaWYgdW5pdGxlc3MoJHNpemUpIHtcbiAgICAgIHdpZHRoOiAgJHNpemUgKyBweDtcbiAgICAgIGhlaWdodDogJHNpemUgKyBweDtcbiAgICB9XG5cbiAgICBAZWxzZSBpZiBub3QodW5pdGxlc3MoJHNpemUpKSB7XG4gICAgICB3aWR0aDogICRzaXplO1xuICAgICAgaGVpZ2h0OiAkc2l6ZTtcbiAgICB9XG4gIH1cblxuICAvLyBXaWR0aCB4IEhlaWdodFxuICBAaWYgbGVuZ3RoKCRzaXplKSA9PSAyIHtcbiAgICAkd2lkdGg6ICBudGgoJHNpemUsIDEpO1xuICAgICRoZWlnaHQ6IG50aCgkc2l6ZSwgMik7XG5cbiAgICBAaWYgJHdpZHRoID09IGF1dG8ge1xuICAgICAgd2lkdGg6ICR3aWR0aDtcbiAgICB9XG4gICAgQGVsc2UgaWYgbm90KHVuaXRsZXNzKCR3aWR0aCkpIHtcbiAgICAgIHdpZHRoOiAkd2lkdGg7XG4gICAgfVxuICAgIEBlbHNlIGlmIHVuaXRsZXNzKCR3aWR0aCkge1xuICAgICAgd2lkdGg6ICR3aWR0aCArIHB4O1xuICAgIH1cblxuICAgIEBpZiAkaGVpZ2h0ID09IGF1dG8ge1xuICAgICAgaGVpZ2h0OiAkaGVpZ2h0O1xuICAgIH1cbiAgICBAZWxzZSBpZiBub3QodW5pdGxlc3MoJGhlaWdodCkpIHtcbiAgICAgIGhlaWdodDogJGhlaWdodDtcbiAgICB9XG4gICAgQGVsc2UgaWYgdW5pdGxlc3MoJGhlaWdodCkge1xuICAgICAgaGVpZ2h0OiAkaGVpZ2h0ICsgcHg7XG4gICAgfVxuICB9XG59XG4iLAoJCSIvLyBDU1MgY3ViaWMtYmV6aWVyIHRpbWluZyBmdW5jdGlvbnMuIFRpbWluZyBmdW5jdGlvbnMgY291cnRlc3kgb2YganF1ZXJ5LmVhc2llIChnaXRodWIuY29tL2phdWtpYS9lYXNpZSlcbi8vIFRpbWluZyBmdW5jdGlvbnMgYXJlIHRoZSBzYW1lIGFzIGRlbW8nZWQgaGVyZTogaHR0cDovL2pxdWVyeXVpLmNvbS9yZXNvdXJjZXMvZGVtb3MvZWZmZWN0L2Vhc2luZy5odG1sXG5cbi8vIEVBU0UgSU5cbiRlYXNlLWluLXF1YWQ6ICAgICAgY3ViaWMtYmV6aWVyKDAuNTUwLCAgMC4wODUsIDAuNjgwLCAwLjUzMCk7XG4kZWFzZS1pbi1jdWJpYzogICAgIGN1YmljLWJlemllcigwLjU1MCwgIDAuMDU1LCAwLjY3NSwgMC4xOTApO1xuJGVhc2UtaW4tcXVhcnQ6ICAgICBjdWJpYy1iZXppZXIoMC44OTUsICAwLjAzMCwgMC42ODUsIDAuMjIwKTtcbiRlYXNlLWluLXF1aW50OiAgICAgY3ViaWMtYmV6aWVyKDAuNzU1LCAgMC4wNTAsIDAuODU1LCAwLjA2MCk7XG4kZWFzZS1pbi1zaW5lOiAgICAgIGN1YmljLWJlemllcigwLjQ3MCwgIDAuMDAwLCAwLjc0NSwgMC43MTUpO1xuJGVhc2UtaW4tZXhwbzogICAgICBjdWJpYy1iZXppZXIoMC45NTAsICAwLjA1MCwgMC43OTUsIDAuMDM1KTtcbiRlYXNlLWluLWNpcmM6ICAgICAgY3ViaWMtYmV6aWVyKDAuNjAwLCAgMC4wNDAsIDAuOTgwLCAwLjMzNSk7XG4kZWFzZS1pbi1iYWNrOiAgICAgIGN1YmljLWJlemllcigwLjYwMCwgLTAuMjgwLCAwLjczNSwgMC4wNDUpO1xuXG4vLyBFQVNFIE9VVFxuJGVhc2Utb3V0LXF1YWQ6ICAgICBjdWJpYy1iZXppZXIoMC4yNTAsICAwLjQ2MCwgMC40NTAsIDAuOTQwKTtcbiRlYXNlLW91dC1jdWJpYzogICAgY3ViaWMtYmV6aWVyKDAuMjE1LCAgMC42MTAsIDAuMzU1LCAxLjAwMCk7XG4kZWFzZS1vdXQtcXVhcnQ6ICAgIGN1YmljLWJlemllcigwLjE2NSwgIDAuODQwLCAwLjQ0MCwgMS4wMDApO1xuJGVhc2Utb3V0LXF1aW50OiAgICBjdWJpYy1iZXppZXIoMC4yMzAsICAxLjAwMCwgMC4zMjAsIDEuMDAwKTtcbiRlYXNlLW91dC1zaW5lOiAgICAgY3ViaWMtYmV6aWVyKDAuMzkwLCAgMC41NzUsIDAuNTY1LCAxLjAwMCk7XG4kZWFzZS1vdXQtZXhwbzogICAgIGN1YmljLWJlemllcigwLjE5MCwgIDEuMDAwLCAwLjIyMCwgMS4wMDApO1xuJGVhc2Utb3V0LWNpcmM6ICAgICBjdWJpYy1iZXppZXIoMC4wNzUsICAwLjgyMCwgMC4xNjUsIDEuMDAwKTtcbiRlYXNlLW91dC1iYWNrOiAgICAgY3ViaWMtYmV6aWVyKDAuMTc1LCAgMC44ODUsIDAuMzIwLCAxLjI3NSk7XG5cbi8vIEVBU0UgSU4gT1VUXG4kZWFzZS1pbi1vdXQtcXVhZDogIGN1YmljLWJlemllcigwLjQ1NSwgIDAuMDMwLCAwLjUxNSwgMC45NTUpO1xuJGVhc2UtaW4tb3V0LWN1YmljOiBjdWJpYy1iZXppZXIoMC42NDUsICAwLjA0NSwgMC4zNTUsIDEuMDAwKTtcbiRlYXNlLWluLW91dC1xdWFydDogY3ViaWMtYmV6aWVyKDAuNzcwLCAgMC4wMDAsIDAuMTc1LCAxLjAwMCk7XG4kZWFzZS1pbi1vdXQtcXVpbnQ6IGN1YmljLWJlemllcigwLjg2MCwgIDAuMDAwLCAwLjA3MCwgMS4wMDApO1xuJGVhc2UtaW4tb3V0LXNpbmU6ICBjdWJpYy1iZXppZXIoMC40NDUsICAwLjA1MCwgMC41NTAsIDAuOTUwKTtcbiRlYXNlLWluLW91dC1leHBvOiAgY3ViaWMtYmV6aWVyKDEuMDAwLCAgMC4wMDAsIDAuMDAwLCAxLjAwMCk7XG4kZWFzZS1pbi1vdXQtY2lyYzogIGN1YmljLWJlemllcigwLjc4NSwgIDAuMTM1LCAwLjE1MCwgMC44NjApO1xuJGVhc2UtaW4tb3V0LWJhY2s6ICBjdWJpYy1iZXppZXIoMC42ODAsIC0wLjU1MCwgMC4yNjUsIDEuNTUwKTtcbiIsCgkJIkBtaXhpbiB0cmlhbmdsZSAoJHNpemUsICRjb2xvciwgJGRpcmVjdGlvbikge1xuICBoZWlnaHQ6IDA7XG4gIHdpZHRoOiAwO1xuXG4gICR3aWR0aDogbnRoKCRzaXplLCAxKTtcbiAgJGhlaWdodDogbnRoKCRzaXplLCBsZW5ndGgoJHNpemUpKTtcblxuICAkZm9yZWdyb3VuZC1jb2xvcjogbnRoKCRjb2xvciwgMSk7XG4gICRiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudCAhZGVmYXVsdDtcbiAgQGlmIChsZW5ndGgoJGNvbG9yKSA9PSAyKSB7XG4gICAgJGJhY2tncm91bmQtY29sb3I6IG50aCgkY29sb3IsIDIpO1xuICB9XG5cbiAgQGlmICgkZGlyZWN0aW9uID09IHVwKSBvciAoJGRpcmVjdGlvbiA9PSBkb3duKSBvciAoJGRpcmVjdGlvbiA9PSByaWdodCkgb3IgKCRkaXJlY3Rpb24gPT0gbGVmdCkge1xuXG4gICAgJHdpZHRoOiAkd2lkdGggLyAyO1xuICAgICRoZWlnaHQ6IGlmKGxlbmd0aCgkc2l6ZSkgPiAxLCAkaGVpZ2h0LCAkaGVpZ2h0LzIpO1xuXG4gICAgQGlmICRkaXJlY3Rpb24gPT0gdXAge1xuICAgICAgYm9yZGVyLWxlZnQ6ICR3aWR0aCBzb2xpZCAkYmFja2dyb3VuZC1jb2xvcjtcbiAgICAgIGJvcmRlci1yaWdodDogJHdpZHRoIHNvbGlkICRiYWNrZ3JvdW5kLWNvbG9yO1xuICAgICAgYm9yZGVyLWJvdHRvbTogJGhlaWdodCBzb2xpZCAkZm9yZWdyb3VuZC1jb2xvcjtcblxuICAgIH0gQGVsc2UgaWYgJGRpcmVjdGlvbiA9PSByaWdodCB7XG4gICAgICBib3JkZXItdG9wOiAkd2lkdGggc29saWQgJGJhY2tncm91bmQtY29sb3I7XG4gICAgICBib3JkZXItYm90dG9tOiAkd2lkdGggc29saWQgJGJhY2tncm91bmQtY29sb3I7XG4gICAgICBib3JkZXItbGVmdDogJGhlaWdodCBzb2xpZCAkZm9yZWdyb3VuZC1jb2xvcjtcblxuICAgIH0gQGVsc2UgaWYgJGRpcmVjdGlvbiA9PSBkb3duIHtcbiAgICAgIGJvcmRlci1sZWZ0OiAkd2lkdGggc29saWQgJGJhY2tncm91bmQtY29sb3I7XG4gICAgICBib3JkZXItcmlnaHQ6ICR3aWR0aCBzb2xpZCAkYmFja2dyb3VuZC1jb2xvcjtcbiAgICAgIGJvcmRlci10b3A6ICRoZWlnaHQgc29saWQgJGZvcmVncm91bmQtY29sb3I7XG5cbiAgICB9IEBlbHNlIGlmICRkaXJlY3Rpb24gPT0gbGVmdCB7XG4gICAgICBib3JkZXItdG9wOiAkd2lkdGggc29saWQgJGJhY2tncm91bmQtY29sb3I7XG4gICAgICBib3JkZXItYm90dG9tOiAkd2lkdGggc29saWQgJGJhY2tncm91bmQtY29sb3I7XG4gICAgICBib3JkZXItcmlnaHQ6ICRoZWlnaHQgc29saWQgJGZvcmVncm91bmQtY29sb3I7XG4gICAgfVxuICB9XG5cbiAgQGVsc2UgaWYgKCRkaXJlY3Rpb24gPT0gdXAtcmlnaHQpIG9yICgkZGlyZWN0aW9uID09IHVwLWxlZnQpIHtcbiAgICBib3JkZXItdG9wOiAkaGVpZ2h0IHNvbGlkICRmb3JlZ3JvdW5kLWNvbG9yO1xuXG4gICAgQGlmICRkaXJlY3Rpb24gPT0gdXAtcmlnaHQge1xuICAgICAgYm9yZGVyLWxlZnQ6ICAkd2lkdGggc29saWQgJGJhY2tncm91bmQtY29sb3I7XG5cbiAgICB9IEBlbHNlIGlmICRkaXJlY3Rpb24gPT0gdXAtbGVmdCB7XG4gICAgICBib3JkZXItcmlnaHQ6ICR3aWR0aCBzb2xpZCAkYmFja2dyb3VuZC1jb2xvcjtcbiAgICB9XG4gIH1cblxuICBAZWxzZSBpZiAoJGRpcmVjdGlvbiA9PSBkb3duLXJpZ2h0KSBvciAoJGRpcmVjdGlvbiA9PSBkb3duLWxlZnQpIHtcbiAgICBib3JkZXItYm90dG9tOiAkaGVpZ2h0IHNvbGlkICRmb3JlZ3JvdW5kLWNvbG9yO1xuXG4gICAgQGlmICRkaXJlY3Rpb24gPT0gZG93bi1yaWdodCB7XG4gICAgICBib3JkZXItbGVmdDogICR3aWR0aCBzb2xpZCAkYmFja2dyb3VuZC1jb2xvcjtcblxuICAgIH0gQGVsc2UgaWYgJGRpcmVjdGlvbiA9PSBkb3duLWxlZnQge1xuICAgICAgYm9yZGVyLXJpZ2h0OiAkd2lkdGggc29saWQgJGJhY2tncm91bmQtY29sb3I7XG4gICAgfVxuICB9XG5cbiAgQGVsc2UgaWYgKCRkaXJlY3Rpb24gPT0gaW5zZXQtdXApIHtcbiAgICBib3JkZXItd2lkdGg6ICRoZWlnaHQgJHdpZHRoO1xuICAgIGJvcmRlci1zdHlsZTogc29saWQ7XG4gICAgYm9yZGVyLWNvbG9yOiAkYmFja2dyb3VuZC1jb2xvciAkYmFja2dyb3VuZC1jb2xvciAkZm9yZWdyb3VuZC1jb2xvcjtcbiAgfVxuXG4gIEBlbHNlIGlmICgkZGlyZWN0aW9uID09IGluc2V0LWRvd24pIHtcbiAgICBib3JkZXItd2lkdGg6ICRoZWlnaHQgJHdpZHRoO1xuICAgIGJvcmRlci1zdHlsZTogc29saWQ7XG4gICAgYm9yZGVyLWNvbG9yOiAkZm9yZWdyb3VuZC1jb2xvciAkYmFja2dyb3VuZC1jb2xvciAkYmFja2dyb3VuZC1jb2xvcjtcbiAgfVxuXG4gIEBlbHNlIGlmICgkZGlyZWN0aW9uID09IGluc2V0LXJpZ2h0KSB7XG4gICAgYm9yZGVyLXdpZHRoOiAkd2lkdGggJGhlaWdodDtcbiAgICBib3JkZXItc3R5bGU6IHNvbGlkO1xuICAgIGJvcmRlci1jb2xvcjogJGJhY2tncm91bmQtY29sb3IgJGJhY2tncm91bmQtY29sb3IgJGJhY2tncm91bmQtY29sb3IgJGZvcmVncm91bmQtY29sb3I7XG4gIH1cblxuICBAZWxzZSBpZiAoJGRpcmVjdGlvbiA9PSBpbnNldC1sZWZ0KSB7XG4gICAgYm9yZGVyLXdpZHRoOiAkd2lkdGggJGhlaWdodDtcbiAgICBib3JkZXItc3R5bGU6IHNvbGlkO1xuICAgIGJvcmRlci1jb2xvcjogJGJhY2tncm91bmQtY29sb3IgJGZvcmVncm91bmQtY29sb3IgJGJhY2tncm91bmQtY29sb3IgJGJhY2tncm91bmQtY29sb3I7XG4gIH1cbn1cbiIsCgkJIkBtaXhpbiB3b3JkLXdyYXAoJHdyYXA6IGJyZWFrLXdvcmQpIHtcbiAgd29yZC13cmFwOiAkd3JhcDtcblxuICBAaWYgJHdyYXAgPT0gYnJlYWstd29yZCB7XG4gICAgb3ZlcmZsb3ctd3JhcDogYnJlYWstd29yZDtcbiAgICB3b3JkLWJyZWFrOiBicmVhay1hbGw7XG4gIH1cbn1cbiIsCgkJIi8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqLy9cbi8vIFRoZXNlIG1peGlucy9mdW5jdGlvbnMgYXJlIGRlcHJlY2F0ZWRcbi8vIFRoZXkgd2lsbCBiZSByZW1vdmVkIGluIHRoZSBuZXh0IE1BSk9SIHZlcnNpb24gcmVsZWFzZVxuLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovL1xuQG1peGluIGJveC1zaGFkb3cgKCRzaGFkb3dzLi4uKSB7XG4gIEBpbmNsdWRlIHByZWZpeGVyKGJveC1zaGFkb3csICRzaGFkb3dzLCBzcGVjKTtcbiAgQHdhcm4gXCJib3gtc2hhZG93IGlzIGRlcHJlY2F0ZWQgYW5kIHdpbGwgYmUgcmVtb3ZlZCBpbiB0aGUgbmV4dCBtYWpvciB2ZXJzaW9uIHJlbGVhc2VcIjtcbn1cblxuQG1peGluIGJhY2tncm91bmQtc2l6ZSAoJGxlbmd0aHMuLi4pIHtcbiAgQGluY2x1ZGUgcHJlZml4ZXIoYmFja2dyb3VuZC1zaXplLCAkbGVuZ3Rocywgc3BlYyk7XG4gIEB3YXJuIFwiYmFja2dyb3VuZC1zaXplIGlzIGRlcHJlY2F0ZWQgYW5kIHdpbGwgYmUgcmVtb3ZlZCBpbiB0aGUgbmV4dCBtYWpvciB2ZXJzaW9uIHJlbGVhc2VcIjtcbn1cbiIsCgkJIi8vIElNUE9SVCBPTkNFXG4vLyBXZSB1c2UgdGhpcyB0byBwcmV2ZW50IHN0eWxlcyBmcm9tIGJlaW5nIGxvYWRlZCBtdWx0aXBsZSB0aW1lcyBmb3IgY29tcGVuZW50cyB0aGF0IHJlbHkgb24gb3RoZXIgY29tcG9uZW50cy5cbiRtb2R1bGVzOiAoKSAhZGVmYXVsdDtcbkBtaXhpbiBleHBvcnRzKCRuYW1lKSB7XG4gIC8vIEltcG9ydCBmcm9tIGdsb2JhbCBzY29wZVxuICAkbW9kdWxlczogJG1vZHVsZXMgIWdsb2JhbDtcbiAgLy8gQ2hlY2sgaWYgYSBtb2R1bGUgaXMgYWxyZWFkeSBvbiB0aGUgbGlzdFxuICAkbW9kdWxlX2luZGV4OiBpbmRleCgkbW9kdWxlcywgJG5hbWUpO1xuICBAaWYgKCgkbW9kdWxlX2luZGV4ID09IG51bGwpIG9yICgkbW9kdWxlX2luZGV4ID09IGZhbHNlKSkge1xuICAgICRtb2R1bGVzOiBhcHBlbmQoJG1vZHVsZXMsICRuYW1lKSAhZ2xvYmFsO1xuICAgIEBjb250ZW50O1xuICB9XG59XG5cbkBtaXhpbiBzaGFwZSgpIHtcbiAgICBjb250ZW50OiBcIiBcIjtcbiAgICBkaXNwbGF5OiBibG9jaztcbn1cblxuQG1peGluIGNhcmQtdGV4dHVyZSgkcmFkaWFsLWdyYWRpZW50OiB0cnVlKSB7XG4gICAgJGIxOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDApO1xuICAgICRiMjogb3BhY2lmeSgkYjEsIC4wMyk7XG4gICAgJGIzOiBvcGFjaWZ5KCRiMSwgLjA0KTtcbiAgICAkYjQ6IG9wYWNpZnkoJGIxLCAuMDUpO1xuXG4gICAgQGlmICgkcmFkaWFsLWdyYWRpZW50KSB7XG4gICAgICAgIEBpbmNsdWRlIGJhY2tncm91bmQtaW1hZ2UoXG4gICAgICAgICAgICByZXBlYXRpbmctbGluZWFyLWdyYWRpZW50KDQ1ZGVnLFxuICAgICAgICAgICAgICAkYjEgMXB4LCAkYjIgMnB4LFxuICAgICAgICAgICAgICAkYjMgM3B4LCAkYjQgNHB4XG4gICAgICAgICAgICAgICksXG4gICAgICAgICAgICByZXBlYXRpbmctbGluZWFyLWdyYWRpZW50KDEzNWRlZyxcbiAgICAgICAgICAgICAgJGI0IDFweCwgJGIxIDJweCxcbiAgICAgICAgICAgICAgJGIzIDNweCwgJGIyIDRweFxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIHJlcGVhdGluZy1saW5lYXItZ3JhZGllbnQoOTBkZWcsXG4gICAgICAgICAgICAgICRiMSAxcHgsICRiMiAycHgsXG4gICAgICAgICAgICAgICRiMyAzcHgsICRiNCA0cHhcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICByZXBlYXRpbmctbGluZWFyLWdyYWRpZW50KDIxMGRlZyxcbiAgICAgICAgICAgICAgJGIxIDFweCwgJGIyIDJweCxcbiAgICAgICAgICAgICAgJGIzIDNweCwgJGI0IDRweFxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIHJlcGVhdGluZy1yYWRpYWwtZ3JhZGllbnQoY2lyY2xlIGF0IDMwJSAzMCUsXG4gICAgICAgICAgICAgICRiMSAxcHgsICRiMiAycHgsXG4gICAgICAgICAgICAgICRiMyAzcHgsICRiNCA0cHhcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICByZXBlYXRpbmctcmFkaWFsLWdyYWRpZW50KGNpcmNsZSBhdCA3MCUgNzAlLFxuICAgICAgICAgICAgICAkYjEgMXB4LCAkYjIgMnB4LFxuICAgICAgICAgICAgICAkYjMgM3B4LCAkYjQgNHB4XG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgcmVwZWF0aW5nLXJhZGlhbC1ncmFkaWVudChjaXJjbGUgYXQgOTAlIDIwJSxcbiAgICAgICAgICAgICAgJGIxIDFweCwgJGIyIDJweCxcbiAgICAgICAgICAgICAgJGIzIDNweCwgJGI0IDRweFxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIHJlcGVhdGluZy1yYWRpYWwtZ3JhZGllbnQoY2lyY2xlIGF0IDE1JSA4MCUsXG4gICAgICAgICAgICAgICRiMSAxcHgsICRiMiAycHgsXG4gICAgICAgICAgICAgICRiMyAzcHgsICRiNCA0cHhcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICBsaW5lYXItZ3JhZGllbnQoLTI1ZGVnLCAkYjEgNTAlLCBvcGFjaWZ5KCRiMSwgLjIpIDcwJSwgJGIxIDkwJSlcbiAgICAgICAgKTtcbiAgICB9IEBlbHNlIHtcbiAgICAgICAgQGluY2x1ZGUgYmFja2dyb3VuZC1pbWFnZShcbiAgICAgICAgICAgIHJlcGVhdGluZy1saW5lYXItZ3JhZGllbnQoNDVkZWcsXG4gICAgICAgICAgICAgICRiMSAxcHgsICRiMiAycHgsXG4gICAgICAgICAgICAgICRiMyAzcHgsICRiNCA0cHhcbiAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIHJlcGVhdGluZy1saW5lYXItZ3JhZGllbnQoMTM1ZGVnLFxuICAgICAgICAgICAgICAkYjQgMXB4LCAkYjEgMnB4LFxuICAgICAgICAgICAgICAkYjMgM3B4LCAkYjIgNHB4XG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgcmVwZWF0aW5nLWxpbmVhci1ncmFkaWVudCg5MGRlZyxcbiAgICAgICAgICAgICAgJGIxIDFweCwgJGIyIDJweCxcbiAgICAgICAgICAgICAgJGIzIDNweCwgJGI0IDRweFxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIHJlcGVhdGluZy1saW5lYXItZ3JhZGllbnQoMjEwZGVnLFxuICAgICAgICAgICAgICAkYjEgMXB4LCAkYjIgMnB4LFxuICAgICAgICAgICAgICAkYjMgM3B4LCAkYjQgNHB4XG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgbGluZWFyLWdyYWRpZW50KC0yNWRlZywgJGIxIDUwJSwgb3BhY2lmeSgkYjEsIC4yKSA3MCUsICRiMSA5MCUpXG4gICAgICAgICk7XG4gICAgfVxufSIsCgkJIi5qcC1jYXJkLmpwLWNhcmQtc2FmYXJpIHtcbiAgICYuanAtY2FyZC1pZGVudGlmaWVkIHtcbiAgICAgICAgLmpwLWNhcmQtZnJvbnQsIC5qcC1jYXJkLWJhY2sge1xuICAgICAgICAgICAgJjpiZWZvcmUge1xuICAgICAgICAgICAgICAgIEBpbmNsdWRlIGNhcmQtdGV4dHVyZSgkcmFkaWFsLWdyYWRpZW50OiBmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59IiwKCQkiLmpwLWNhcmQuanAtY2FyZC1pZS0xMCwgLmpwLWNhcmQuanAtY2FyZC1pZS0xMSB7XG4gICAgJi5qcC1jYXJkLWZsaXBwZWQge1xuICAgICAgICBAaW5jbHVkZSB0cmFuc2Zvcm0oMGRlZyk7XG4gICAgICAgIC5qcC1jYXJkLWZyb250IHtcbiAgICAgICAgICAgIEBpbmNsdWRlIHRyYW5zZm9ybShyb3RhdGVZKDBkZWcpKTtcbiAgICAgICAgfVxuICAgICAgICAuanAtY2FyZC1iYWNrIHtcbiAgICAgICAgICAgIEBpbmNsdWRlIHRyYW5zZm9ybShyb3RhdGVZKDBkZWcpKTtcblxuICAgICAgICAgICAgJjphZnRlciB7XG4gICAgICAgICAgICAgICBsZWZ0OiAxOCU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC5qcC1jYXJkLWN2YyB7XG4gICAgICAgICAgICAgICAgQGluY2x1ZGUgdHJhbnNmb3JtKHJvdGF0ZVkoMTgwZGVnKSk7XG4gICAgICAgICAgICAgICAgbGVmdDogNSU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC5qcC1jYXJkLXNoaW55ICB7XG4gICAgICAgICAgICAgICAgbGVmdDogODQlO1xuICAgICAgICAgICAgICAgICY6YWZ0ZXIge1xuICAgICAgICAgICAgICAgICAgICBsZWZ0OiAtNDgwJTtcbiAgICAgICAgICAgICAgICAgICAgQGluY2x1ZGUgdHJhbnNmb3JtKHJvdGF0ZVkoMTgwZGVnKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuLmpwLWNhcmQuanAtY2FyZC1pZS0xMC5qcC1jYXJkLWFtZXggLmpwLWNhcmQtYmFjaywgLmpwLWNhcmQuanAtY2FyZC1pZS0xMS5qcC1jYXJkLWFtZXggLmpwLWNhcmQtYmFjayB7XG4gICAgZGlzcGxheTogbm9uZTtcbn1cbiIsCgkJIkBpbXBvcnQgXCJjYXJkXCI7XG5AaW1wb3J0IFwiLi4vbG9nb3MvYW1leFwiO1xuXG4kZmlsbC1jb2xvcjogIzEwODE2ODtcblxuLmpwLWNhcmQuanAtY2FyZC1hbWV4IHtcblxuICAgICYuanAtY2FyZC1mbGlwcGVke1xuICAgICAgICBAaW5jbHVkZSB0cmFuc2Zvcm0obm9uZSk7XG4gICAgfVxuXG4gICAgJi5qcC1jYXJkLWlkZW50aWZpZWQge1xuICAgICAgICAuanAtY2FyZC1mcm9udCwgLmpwLWNhcmQtYmFjayB7XG4gICAgICAgICAgICAmOmJlZm9yZSB7XG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogJGZpbGwtY29sb3I7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAuanAtY2FyZC1mcm9udCB7XG5cbiAgICAgICAgICAgIC5qcC1jYXJkLWxvZ28uanAtY2FyZC1hbWV4IHtcbiAgICAgICAgICAgICAgICBvcGFjaXR5OiAxO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAuanAtY2FyZC1jdmMge1xuICAgICAgICAgICAgICAgIHZpc2liaWxpdHk6IHZpc2libGU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICY6YWZ0ZXIge1xuICAgICAgICAgICAgICAgIG9wYWNpdHk6IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG4iLAoJCSIkY2FyZC13aWR0aDogMzUwcHg7XG4kY2FyZC1oZWlnaHQ6IDIwMHB4O1xuJGNhcmQtYm9yZGVyLXJhZGl1czogMTBweDtcbiRjYXJkLWZpbGwtY29sb3I6ICMzMzk5Q0M7XG4kY2FyZC1mb250LWZhbWlseTogXCJIZWx2ZXRpY2EgTmV1ZVwiO1xuJGNhcmQtbW9ub3NwYWNlLWZvbnQtZmFtaWx5OiBcIkJpdHN0cmVhbSBWZXJhIFNhbnMgTW9ub1wiLCBDb25zb2xhcywgQ291cmllciwgbW9ub3NwYWNlO1xuJGNhcmQtZm9udC1jb2xvcjogd2hpdGU7XG4kY2FyZC10cmFuc2l0aW9uLXRpbWU6IDQwMG1zOyIsCgkJIkBpbXBvcnQgXCJsb2dvXCI7XG5cbi5qcC1jYXJkLWxvZ28uanAtY2FyZC1hbWV4IHtcbiAgICAkYm94LW9mZnNldDogOHB4O1xuICAgICRib3gtd2lkdGg6ICRsb2dvLWhlaWdodCAtICRib3gtb2Zmc2V0O1xuICAgICRib3gtaGVpZ2h0OiAkYm94LXdpZHRoO1xuICAgICRmb250LXNpemU6IDRweDtcbiAgICAkZm9udC1wYWRkaW5nOiAycHg7XG5cbiAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xuXG4gICAgZm9udC1zaXplOiAkZm9udC1zaXplO1xuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xuICAgIGNvbG9yOiB3aGl0ZTtcblxuICAgIEBpbmNsdWRlIGJhY2tncm91bmQtaW1hZ2UocmVwZWF0aW5nLXJhZGlhbC1ncmFkaWVudChjaXJjbGUgYXQgY2VudGVyLCAjRkZGIDFweCwgIzk5OSAycHgpKTtcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjRUVFO1xuXG4gICAgJjpiZWZvcmUsICY6YWZ0ZXIge1xuICAgICAgICB3aWR0aDogJGJveC13aWR0aDtcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgbGVmdDogKCRsb2dvLXdpZHRoIC0gJGJveC13aWR0aCkgLyAyO1xuICAgIH1cblxuICAgICY6YmVmb3JlIHtcbiAgICAgICAgJGJsdWU6ICMyNjdBQzM7XG4gICAgICAgIGhlaWdodDogJGJveC1oZWlnaHQ7XG4gICAgICAgIGNvbnRlbnQ6IFwiYW1lcmljYW5cIjtcbiAgICAgICAgLy8gYm94LXNoYWRvdzogMXB4IDFweCAwIDAgcmdiYSgwLCAwLCAwLCAwLjYpO1xuICAgICAgICB0b3A6ICRib3gtb2Zmc2V0IC8gMiAtIDE7XG4gICAgICAgIHRleHQtYWxpZ246IGxlZnQ7XG4gICAgICAgIHBhZGRpbmctbGVmdDogJGZvbnQtcGFkZGluZztcbiAgICAgICAgcGFkZGluZy10b3A6ICRib3gtaGVpZ2h0IC8gMiAtICRmb250LXNpemUgKyAxO1xuICAgICAgICBiYWNrZ3JvdW5kOiAkYmx1ZTtcbiAgICB9XG5cbiAgICAmOmFmdGVyIHtcbiAgICAgICAgY29udGVudDogXCJleHByZXNzXCI7XG4gICAgICAgIGJvdHRvbTogJGJveC1oZWlnaHQgLyAyIC0gJGZvbnQtc2l6ZSArIDE7XG4gICAgICAgIHRleHQtYWxpZ246IHJpZ2h0O1xuICAgICAgICBwYWRkaW5nLXJpZ2h0OiAkZm9udC1wYWRkaW5nO1xuICAgIH1cbn1cbiIsCgkJIiRsb2dvLWhlaWdodDogMzZweDtcbiRsb2dvLXdpZHRoOiA2MHB4O1xuXG5AaW5jbHVkZSBleHBvcnRzKFwiX2xvZ28uc2Nzc1wiKSB7XG4gICAgLmpwLWNhcmQtbG9nbyB7XG4gICAgICAgICYsICY6YmVmb3JlLCAmOmFmdGVyIHtcbiAgICAgICAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gICAgICAgIH1cbiAgICAgICAgaGVpZ2h0OiAkbG9nby1oZWlnaHQ7XG4gICAgICAgIHdpZHRoOiAkbG9nby13aWR0aDtcbiAgICAgICAgZm9udC1zdHlsZTogaXRhbGljO1xuICAgIH1cbn1cbiIsCgkJIkBpbXBvcnQgXCJjYXJkXCI7XG5AaW1wb3J0IFwiLi4vbG9nb3MvZGlzY292ZXJcIjtcblxuJGZpbGwtY29sb3I6ICM4NkI4Q0Y7XG4kaGlnaGxpZ2h0LWNvbG9yOiAjRkY2NjAwO1xuXG4uanAtY2FyZCB7XG4gICAgLmpwLWNhcmQtZnJvbnQgLmpwLWNhcmQtbG9nby5qcC1jYXJkLWRpc2NvdmVyIHtcbiAgICAgICAgcmlnaHQ6IDEyJTtcbiAgICAgICAgdG9wOiAxOCU7XG4gICAgfVxufVxuXG4uanAtY2FyZC5qcC1jYXJkLWRpc2NvdmVyIHtcblxuICAgICYuanAtY2FyZC1pZGVudGlmaWVkIHtcbiAgICAgICAgLmpwLWNhcmQtZnJvbnQsIC5qcC1jYXJkLWJhY2sge1xuICAgICAgICAgICAgJjpiZWZvcmUge1xuICAgICAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICRmaWxsLWNvbG9yO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC5qcC1jYXJkLWxvZ28uanAtY2FyZC1kaXNjb3ZlciB7XG4gICAgICAgICAgICBvcGFjaXR5OiAxO1xuICAgICAgICB9XG5cbiAgICAgICAgLmpwLWNhcmQtZnJvbnQge1xuICAgICAgICAgICAgJjphZnRlciB7XG4gICAgICAgICAgICAgICAgJHNpemU6IDUwcHg7XG4gICAgICAgICAgICAgICAgQGluY2x1ZGUgdHJhbnNpdGlvbigkY2FyZC10cmFuc2l0aW9uLXRpbWUpO1xuICAgICAgICAgICAgICAgIEBpbmNsdWRlIHNoYXBlKCk7XG4gICAgICAgICAgICAgICAgQGluY2x1ZGUgbGluZWFyLWdyYWRpZW50KCRoaWdobGlnaHQtY29sb3IsIGxpZ2h0ZW4oJGhpZ2hsaWdodC1jb2xvciwgMjAlKSwgJGhpZ2hsaWdodC1jb2xvcik7XG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAkc2l6ZTtcbiAgICAgICAgICAgICAgICB3aWR0aDogJHNpemU7XG4gICAgICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogJHNpemUgLyAyO1xuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgICAgICAgICBsZWZ0OiAxMDAlO1xuICAgICAgICAgICAgICAgIHRvcDogMTUlO1xuICAgICAgICAgICAgICAgIG1hcmdpbi1sZWZ0OiAtJHNpemUgLyAyO1xuICAgICAgICAgICAgICAgIGJveC1zaGFkb3c6IGluc2V0IDFweCAxcHggM3B4IDFweCByZ2JhKDAsIDAsIDAsIC41KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbiIsCgkJIkBpbXBvcnQgXCJsb2dvXCI7XG5cbi5qcC1jYXJkLWxvZ28uanAtY2FyZC1kaXNjb3ZlciB7XG4gICAgJG9yYW5nZTogI0ZGNjYwMDtcbiAgICAkb2Zmc2V0OiA5cHg7XG4gICAgYmFja2dyb3VuZDogJG9yYW5nZTtcbiAgICBjb2xvcjogIzExMTtcbiAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xuICAgIGZvbnQtc3R5bGU6IG5vcm1hbDtcbiAgICBmb250LXdlaWdodDogYm9sZDtcbiAgICBmb250LXNpemU6IDEwcHg7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgei1pbmRleDogMTtcbiAgICBwYWRkaW5nLXRvcDogJG9mZnNldDtcbiAgICBsZXR0ZXItc3BhY2luZzogLjAzZW07XG4gICAgYm9yZGVyOiAxcHggc29saWQgI0VFRTtcblxuICAgICY6YmVmb3JlLCAmOmFmdGVyIHtcbiAgICAgICAgY29udGVudDogXCIgXCI7XG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgfVxuXG4gICAgJjpiZWZvcmUge1xuICAgICAgICAkc2l6ZTogMjAwcHg7XG4gICAgICAgIGJhY2tncm91bmQ6IHdoaXRlO1xuICAgICAgICB3aWR0aDogJHNpemU7XG4gICAgICAgIGhlaWdodDogJHNpemU7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6ICRzaXplO1xuICAgICAgICBib3R0b206IC01JTtcbiAgICAgICAgcmlnaHQ6IC04MCU7XG4gICAgICAgIHotaW5kZXg6IC0xO1xuICAgIH1cblxuICAgICY6YWZ0ZXIge1xuICAgICAgICAkc2l6ZTogOHB4O1xuICAgICAgICB3aWR0aDogJHNpemU7XG4gICAgICAgIGhlaWdodDogJHNpemU7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6ICRzaXplIC8yO1xuICAgICAgICB0b3A6ICRvZmZzZXQgKyAxO1xuICAgICAgICBsZWZ0OiAyN3B4O1xuICAgICAgICBAaW5jbHVkZSByYWRpYWwtZ3JhZGllbnQoJG9yYW5nZSwgI2ZmZik7XG4gICAgICAgIGNvbnRlbnQ6IFwibmV0d29ya1wiO1xuICAgICAgICBmb250LXNpemU6IDRweDtcbiAgICAgICAgbGluZS1oZWlnaHQ6IDI0cHg7XG4gICAgICAgIHRleHQtaW5kZW50OiAtN3B4O1xuICAgIH1cbn1cbiIsCgkJIkBpbXBvcnQgXCJjYXJkXCI7XG5AaW1wb3J0IFwiLi4vbG9nb3MvdmlzYVwiO1xuXG4kZmlsbC1jb2xvcjogIzE5MTI3ODtcblxuLmpwLWNhcmQuanAtY2FyZC12aXNhIHtcbiAgICAmLmpwLWNhcmQtaWRlbnRpZmllZCB7XG4gICAgICAgIC5qcC1jYXJkLWZyb250LCAuanAtY2FyZC1iYWNrIHtcbiAgICAgICAgICAgICY6YmVmb3JlIHtcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkZmlsbC1jb2xvcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAuanAtY2FyZC1sb2dvLmpwLWNhcmQtdmlzYSB7XG4gICAgICAgICAgICBvcGFjaXR5OiAxO1xuICAgICAgICB9XG4gICAgfVxufSIsCgkJIkBpbXBvcnQgXCJsb2dvXCI7XG5cbi5qcC1jYXJkLWxvZ28uanAtY2FyZC12aXNhIHtcbiAgICAvLyBkaXNwbGF5OiBub25lO1xuICAgICRibHVlOiAjMUExODc2O1xuICAgICR5ZWxsb3c6ICNFNzk4MDA7XG4gICAgYmFja2dyb3VuZDogd2hpdGU7XG4gICAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbiAgICBjb2xvcjogJGJsdWU7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xuICAgIGZvbnQtc2l6ZTogMTVweDtcbiAgICBsaW5lLWhlaWdodDogMThweDtcblxuXG4gICAgJjpiZWZvcmUsICY6YWZ0ZXIge1xuICAgICAgICBjb250ZW50OiBcIiBcIjtcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICBoZWlnaHQ6IDI1JTtcbiAgICB9XG5cbiAgICAmOmJlZm9yZSB7XG4gICAgICAgIGJhY2tncm91bmQ6ICRibHVlO1xuICAgIH1cblxuICAgICY6YWZ0ZXIge1xuICAgICAgICBiYWNrZ3JvdW5kOiAkeWVsbG93O1xuICAgIH1cbn1cbiIsCgkJIkBpbXBvcnQgXCJjYXJkXCI7XG5AaW1wb3J0IFwiLi4vbG9nb3MvbWFzdGVyY2FyZFwiO1xuXG4kZmlsbC1jb2xvcjogIzAwNjFBODtcblxuLmpwLWNhcmQuanAtY2FyZC1tYXN0ZXJjYXJkIHtcbiAgICAmLmpwLWNhcmQtaWRlbnRpZmllZCB7XG4gICAgICAgIC5qcC1jYXJkLWZyb250LCAuanAtY2FyZC1iYWNrIHtcbiAgICAgICAgICAgIC5qcC1jYXJkLWxvZ28uanAtY2FyZC1tYXN0ZXJjYXJkIHtcbiAgICAgICAgICAgICAgICBib3gtc2hhZG93OiBub25lO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgJjpiZWZvcmUge1xuICAgICAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICRmaWxsLWNvbG9yO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC5qcC1jYXJkLWxvZ28uanAtY2FyZC1tYXN0ZXJjYXJkIHtcbiAgICAgICAgICAgIG9wYWNpdHk6IDE7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLAoJCSJAaW1wb3J0IFwibG9nb1wiO1xuXG4uanAtY2FyZC1sb2dvLmpwLWNhcmQtbWFzdGVyY2FyZCB7XG4gICAgLy8gZGlzcGxheTogbm9uZTtcbiAgICAkcmVkOiAjRkYwMDAwO1xuICAgICR5ZWxsb3c6ICNGRkFCMDA7XG4gICAgJG9mZnNldDogMDtcbiAgICBjb2xvcjogd2hpdGU7XG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIGZvbnQtc2l6ZTogOXB4O1xuICAgIGxpbmUtaGVpZ2h0OiAkbG9nby1oZWlnaHQ7XG4gICAgei1pbmRleDogMTtcbiAgICB0ZXh0LXNoYWRvdzogMXB4IDFweCByZ2JhKDAsIDAsIDAsIC42KTtcbiAgICAmOmJlZm9yZSwgJjphZnRlciB7XG4gICAgICAgIGNvbnRlbnQ6IFwiIFwiO1xuICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgICAgd2lkdGg6ICRsb2dvLWhlaWdodDtcbiAgICAgICAgdG9wOiAwO1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIGhlaWdodDogJGxvZ28taGVpZ2h0O1xuICAgICAgICBib3JkZXItcmFkaXVzOiAkbG9nby1oZWlnaHQgLyAyO1xuICAgIH1cblxuICAgICY6YmVmb3JlIHtcbiAgICAgICAgbGVmdDogJG9mZnNldDtcbiAgICAgICAgYmFja2dyb3VuZDogJHJlZDtcbiAgICAgICAgei1pbmRleDogLTE7XG4gICAgfVxuXG4gICAgJjphZnRlciB7XG4gICAgICAgIHJpZ2h0OiAkb2Zmc2V0O1xuICAgICAgICBiYWNrZ3JvdW5kOiAkeWVsbG93O1xuICAgICAgICB6LWluZGV4OiAtMjtcbiAgICB9XG59XG4iLAoJCSJAaW1wb3J0IFwiY2FyZFwiO1xuQGltcG9ydCBcIi4uL2xvZ29zL21hZXN0cm9cIjtcblxuJGZpbGwtY29sb3I6ICMwQjJDNUY7XG5cbi5qcC1jYXJkLmpwLWNhcmQtbWFlc3RybyB7XG4gICAgJi5qcC1jYXJkLWlkZW50aWZpZWQge1xuICAgICAgICAuanAtY2FyZC1mcm9udCwgLmpwLWNhcmQtYmFjayB7XG4gICAgICAgICAgICAuanAtY2FyZC1sb2dvLmpwLWNhcmQtbWFlc3RybyB7XG4gICAgICAgICAgICAgICAgYm94LXNoYWRvdzogbm9uZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICY6YmVmb3JlIHtcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkZmlsbC1jb2xvcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAuanAtY2FyZC1sb2dvLmpwLWNhcmQtbWFlc3RybyB7XG4gICAgICAgICAgICBvcGFjaXR5OiAxO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwKCQkiQGltcG9ydCBcImxvZ29cIjtcblxuLmpwLWNhcmQtbG9nby5qcC1jYXJkLW1hZXN0cm8ge1xuICAgIC8vIGRpc3BsYXk6IG5vbmU7XG4gICAgJGJsdWU6ICMwMDY0Q0I7XG4gICAgJHJlZDogI0NDMDAwMDtcbiAgICAkb2Zmc2V0OiAwO1xuICAgIGNvbG9yOiB3aGl0ZTtcbiAgICBmb250LXdlaWdodDogYm9sZDtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgZm9udC1zaXplOiAxNHB4O1xuICAgIGxpbmUtaGVpZ2h0OiAkbG9nby1oZWlnaHQ7XG4gICAgei1pbmRleDogMTtcbiAgICB0ZXh0LXNoYWRvdzogMXB4IDFweCByZ2JhKDAsIDAsIDAsIC42KTtcbiAgICAmOmJlZm9yZSwgJjphZnRlciB7XG4gICAgICAgIGNvbnRlbnQ6IFwiIFwiO1xuICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgICAgd2lkdGg6ICRsb2dvLWhlaWdodDtcbiAgICAgICAgdG9wOiAwO1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIGhlaWdodDogJGxvZ28taGVpZ2h0O1xuICAgICAgICBib3JkZXItcmFkaXVzOiAkbG9nby1oZWlnaHQgLyAyO1xuICAgIH1cblxuICAgICY6YmVmb3JlIHtcbiAgICAgICAgbGVmdDogJG9mZnNldDtcbiAgICAgICAgYmFja2dyb3VuZDogJGJsdWU7XG4gICAgICAgIHotaW5kZXg6IC0xO1xuICAgIH1cblxuICAgICY6YWZ0ZXIge1xuICAgICAgICByaWdodDogJG9mZnNldDtcbiAgICAgICAgYmFja2dyb3VuZDogJHJlZDtcbiAgICAgICAgei1pbmRleDogLTI7XG4gICAgfVxufVxuIiwKCQkiQGltcG9ydCBcImNhcmRcIjtcbkBpbXBvcnQgXCIuLi9sb2dvcy9kYW5rb3J0XCI7XG5cbiRmaWxsLWNvbG9yOiAjMDA1NUM3O1xuXG4uanAtY2FyZC5qcC1jYXJkLWRhbmtvcnQge1xuICAgICYuanAtY2FyZC1pZGVudGlmaWVkIHtcbiAgICAgICAgLmpwLWNhcmQtZnJvbnQsIC5qcC1jYXJkLWJhY2sge1xuICAgICAgICAgICAgJjpiZWZvcmUge1xuICAgICAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICRmaWxsLWNvbG9yO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC5qcC1jYXJkLWxvZ28uanAtY2FyZC1kYW5rb3J0IHtcbiAgICAgICAgICAgIG9wYWNpdHk6IDE7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLAoJCSJAaW1wb3J0IFwibG9nb1wiO1xuXG4uanAtY2FyZC1sb2dvLmpwLWNhcmQtZGFua29ydCB7XG4gICAgJHdoaXRlOiAjRkZGRkZGO1xuICAgICRibGFjazogIzAwMDAwMDtcbiAgICAkcmVkOiAjRUQxQzI0O1xuICAgICRwYWRkaW5nOiAzcHg7XG4gICAgJHJhZGl1czogOHB4O1xuXG4gICAgJGlubmVyLWhlaWdodDogJGxvZ28taGVpZ2h0IC0gKCRwYWRkaW5nICogMikgLSAyOyAvLyBoZWlnaHQgLSBwYWRkaW5nIC0gYm9yZGVyXG4gICAgJGxldHRlci1oZWlnaHQ6ICRpbm5lci1oZWlnaHQgKiAwLjU1O1xuXG4gICAgd2lkdGg6ICRsb2dvLXdpZHRoO1xuICAgIGhlaWdodDogJGxvZ28taGVpZ2h0O1xuICAgIHBhZGRpbmc6ICRwYWRkaW5nO1xuICAgIGJvcmRlci1yYWRpdXM6ICRyYWRpdXM7XG4gICAgYm9yZGVyOiAkYmxhY2sgMXB4IHNvbGlkO1xuICAgIGJhY2tncm91bmQtY29sb3I6ICR3aGl0ZTtcblxuICAgIC5kayB7XG4gICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICB3aWR0aDogMTAwJTtcbiAgICAgIGhlaWdodDogMTAwJTtcblxuICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcblxuICAgICAgJjpiZWZvcmUge1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkcmVkO1xuICAgICAgICBjb250ZW50OiAnJztcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgICAgYm9yZGVyLXJhZGl1czogJHJhZGl1cyowLjc1O1xuICAgICAgfVxuICAgICAgJjphZnRlciB7XG4gICAgICAgIGNvbnRlbnQ6ICcnO1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHRvcDogNTAlO1xuICAgICAgICBtYXJnaW4tdG9wOiAtKCRsZXR0ZXItaGVpZ2h0LzIpO1xuICAgICAgICByaWdodDogMDtcbiAgICAgICAgd2lkdGg6IDA7XG4gICAgICAgIGhlaWdodDogMDtcbiAgICAgICAgYm9yZGVyLXN0eWxlOiBzb2xpZDtcbiAgICAgICAgYm9yZGVyLXdpZHRoOiA3cHggN3B4IDEwcHggMDtcbiAgICAgICAgYm9yZGVyLWNvbG9yOiB0cmFuc3BhcmVudCAkcmVkIHRyYW5zcGFyZW50IHRyYW5zcGFyZW50O1xuICAgICAgICB6LWluZGV4OiAxO1xuICAgICAgfVxuICAgIH1cblxuICAgIC5kLCAuayB7XG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICB0b3A6IDUwJTtcbiAgICAgIHdpZHRoOiA1MCU7XG4gICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgIGhlaWdodDogJGxldHRlci1oZWlnaHQ7XG4gICAgICBtYXJnaW4tdG9wOiAtKCRsZXR0ZXItaGVpZ2h0LzIpO1xuICAgICAgYmFja2dyb3VuZDogd2hpdGU7XG4gICAgfVxuICAgIC5kIHtcbiAgICAgIGxlZnQ6IDA7XG4gICAgICBib3JkZXItcmFkaXVzOiAwIDhweCAxMHB4IDA7XG4gICAgICAmOmJlZm9yZSB7XG4gICAgICAgIGNvbnRlbnQ6ICcnO1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHRvcDogNTAlO1xuICAgICAgICBsZWZ0OiA1MCU7XG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgICBiYWNrZ3JvdW5kOiAkcmVkO1xuICAgICAgICBib3JkZXItcmFkaXVzOiAycHggNHB4IDZweCAwcHg7XG4gICAgICAgIGhlaWdodDogNXB4O1xuICAgICAgICB3aWR0aDogN3B4O1xuICAgICAgICBtYXJnaW46IC0zcHggMCAwIC00cHg7XG4gICAgICB9XG4gICAgfVxuICAgIC5rIHtcbiAgICAgIHJpZ2h0OiAwO1xuXG4gICAgICAmOmJlZm9yZSwgJjphZnRlciB7XG4gICAgICAgIGNvbnRlbnQ6ICcnO1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHJpZ2h0OiA1MCU7XG4gICAgICAgIHdpZHRoOiAwO1xuICAgICAgICBoZWlnaHQ6IDA7XG4gICAgICAgIGJvcmRlci1zdHlsZTogc29saWQ7XG4gICAgICAgIG1hcmdpbi1yaWdodDogLTFweDtcbiAgICAgIH1cblxuICAgICAgJjpiZWZvcmUge1xuICAgICAgICB0b3A6IDA7XG4gICAgICAgIGJvcmRlci13aWR0aDogOHB4IDVweCAwIDA7XG4gICAgICAgIGJvcmRlci1jb2xvcjogJHJlZCB0cmFuc3BhcmVudCB0cmFuc3BhcmVudCB0cmFuc3BhcmVudDtcbiAgICAgIH1cblxuICAgICAgJjphZnRlciB7XG4gICAgICAgIGJvdHRvbTogMDtcbiAgICAgICAgYm9yZGVyLXdpZHRoOiAwIDVweCA4cHggMDtcbiAgICAgICAgYm9yZGVyLWNvbG9yOiB0cmFuc3BhcmVudCB0cmFuc3BhcmVudCAkcmVkIHRyYW5zcGFyZW50O1xuICAgICAgfVxuICAgIH1cbn1cbiIsCgkJIkBpbXBvcnQgXCJjYXJkXCI7XG5AaW1wb3J0IFwiLi4vbG9nb3MvZWxvXCI7XG5cbiRmaWxsLWNvbG9yOiAjNkY2OTY5O1xuXG4uanAtY2FyZC5qcC1jYXJkLWVsbyB7XG4gICAgJi5qcC1jYXJkLWlkZW50aWZpZWQge1xuICAgICAgICAuanAtY2FyZC1mcm9udCwgLmpwLWNhcmQtYmFjayB7XG4gICAgICAgICAgICAmOmJlZm9yZSB7XG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogJGZpbGwtY29sb3I7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLmpwLWNhcmQtbG9nby5qcC1jYXJkLWVsbyB7XG4gICAgICAgICAgICBvcGFjaXR5OiAxO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwKCQkiQGltcG9ydCBcImxvZ29cIjtcblxuLmpwLWNhcmQtbG9nby5qcC1jYXJkLWVsbyB7XG4gICAgaGVpZ2h0OiA1MHB4O1xuICAgIHdpZHRoOiA1MHB4O1xuICAgIGJvcmRlci1yYWRpdXM6IDEwMCU7XG4gICAgYmFja2dyb3VuZDogYmxhY2s7XG4gICAgY29sb3I6IHdoaXRlO1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICB0ZXh0LXRyYW5zZm9ybTogbG93ZXJjYXNlO1xuICAgIGZvbnQtc2l6ZTogMjFweDtcbiAgICBmb250LXN0eWxlOiBub3JtYWw7XG4gICAgbGV0dGVyLXNwYWNpbmc6IDFweDtcbiAgICBmb250LXdlaWdodDogYm9sZDtcbiAgICBwYWRkaW5nLXRvcDogMTNweDtcblxuICAgIC5lLCAubCwgLm8ge1xuICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICB9XG5cbiAgICAuZSB7XG4gICAgICAgIEBpbmNsdWRlIHRyYW5zZm9ybShyb3RhdGUoLTE1ZGVnKSk7XG4gICAgfVxuXG4gICAgLm8ge1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICAgICAgd2lkdGg6IDEycHg7XG4gICAgICAgIGhlaWdodDogMTJweDtcbiAgICAgICAgcmlnaHQ6IDA7XG4gICAgICAgIHRvcDogN3B4O1xuICAgICAgICBib3JkZXItcmFkaXVzOiAxMDAlO1xuICAgICAgICBAaW5jbHVkZSBiYWNrZ3JvdW5kLWltYWdlKGxpbmVhci1ncmFkaWVudCh5ZWxsb3cgNTAlLCByZWQgNTAlKSk7XG4gICAgICAgIEBpbmNsdWRlIHRyYW5zZm9ybShyb3RhdGUoNDBkZWcpKTtcbiAgICAgICAgdGV4dC1pbmRlbnQ6IC05OTk5cHg7XG5cbiAgICAgICAgJjpiZWZvcmUge1xuICAgICAgICAgICAgY29udGVudDogXCJcIjtcbiAgICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgICAgIHdpZHRoOiA0OSU7XG4gICAgICAgICAgICBoZWlnaHQ6IDQ5JTtcbiAgICAgICAgICAgIGJhY2tncm91bmQ6IGJsYWNrO1xuICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogMTAwJTtcbiAgICAgICAgICAgIHRleHQtaW5kZW50OiAtOTk5OTlweDtcbiAgICAgICAgICAgIHRvcDogMjUlO1xuICAgICAgICAgICAgbGVmdDogMjUlO1xuICAgICAgICB9XG4gICAgfVxufVxuIgoJXSwKCSJtYXBwaW5ncyI6ICJBa0VBQSxRQUFRLEFBQUEsZUFBZSxBQUNuQixtQkFBbUIsQ0FDZixjQUFjLEFBQ1QsT0FBTyxFQUhwQixRQUFRLEFBQUEsZUFBZSxBQUNuQixtQkFBbUIsQ0FDQyxhQUFhLEFBQ3hCLE9BQU8sQ0FBQztFdENHbkIsZ0JBQWdCLEVxQ3lETix5SkFBeUIsRUFJekIsMEpBQXlCLEVBSXpCLHlKQUF5QixFQUl6QiwwSkFBeUIsRXhEekQyQixzSEFBUTtFbUJYdEUsZ0JBQWdCLEVxQ3dETix5SkFBeUIsRUFJekIsMEpBQXlCLEVBSXpCLHlKQUF5QixFQUl6QiwwSkFBeUIsRXhEckRkLDZHQUFPLEd5RGpCakI7O0FDTGIsUUFBUSxBQUFBLGNBQWMsQUFDakIsZ0JBQWdCLEVBREcsUUFBUSxBQUFBLGNBQWMsQUFDekMsZ0JBQWdCLENBQUM7RVRRZCxpQkFBb0IsRVNQRCxJQUFJO0VUWXZCLGNBQWlCLEVTWkUsSUFBSTtFVGlCdkIsYUFBZ0IsRVNqQkcsSUFBSTtFVHNCdkIsWUFBZSxFU3RCSSxJQUFJO0VUMkJ2QixTQUFZLEVTM0JPLElBQUksR0F3QjFCO0VBMUJMLFFBQVEsQUFBQSxjQUFjLEFBQ2pCLGdCQUFnQixDQUViLGNBQWMsRUFIRSxRQUFRLEFBQUEsY0FBYyxBQUN6QyxnQkFBZ0IsQ0FFYixjQUFjLENBQUM7SVRNZixpQkFBb0IsRVNMRyxhQUFPO0lUVTlCLGNBQWlCLEVTVk0sYUFBTztJVGU5QixhQUFnQixFU2ZPLGFBQU87SVRvQjlCLFlBQWUsRVNwQlEs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QUdoQixjQUFjLEVBck90QixRQUFRLEFBa09ILG1CQUFtQixDQUdBLGFBQWEsQ0FBQztNQUMxQixnQkFBZ0IsRUFBRSxJQUFLO01BQ3ZCLGdCQUFnQixFQUFFLGtCQUFJLEdBWXpCO01BblBULFFBQVEsQUFrT0gsbUJBQW1CLENBR2hCLGNBQWMsQUFJVCxPQUFPLEVBek9wQixRQUFRLEFBa09ILG1CQUFtQixDQUdBLGFBQWEsQUFJeEIsT0FBTyxDQUFDO1EwRHpQYixrQkFBb0IsRTFEMFBRLEdBQUcsQ3FFNVBoQixLQUFLLENyRTRQa0MsSUFBSTtRMERyUDFELGVBQWlCLEUxRHFQVyxHQUFHLENxRTVQaEIsS0FBSyxDckU0UGtDLElBQUk7UTBEdE8xRCxVQUFZLEUxRHNPZ0IsR0FBRyxDcUU1UGhCLEtBQUssQ3JFNFBrQyxJQUFJO1E0QjdQaEUsZ0JBQWdCLEVxQ3FCTix5SkFBeUIsRUFJekIsMEpBQXlCLEVBSXpCLHlKQUF5QixFQUl6QiwwSkFBeUIsRUFJekIscUtBQXlCLEVBSXpCLHFLQUF5QixFQUl6QixxS0FBeUIsRUFJekIscUtBQXlCLEV4RHJDMkIsc0hBQVE7UW1CWHRFLGdCQUFnQixFcUNvQk4seUpBQXlCLEVBSXpCLDBKQUF5QixFQUl6Qix5SkFBeUIsRUFJekIsMEpBQXlCLEVBSXpCLHFLQUF5QixFQUl6QixxS0FBeUIsRUFJekIscUtBQXlCLEVBSXpCLHFLQUF5QixFeERqQ2QsNkdBQU87UVQrT2QsT0FBTyxFQUFFLENBQUUsR0FFZDtNQTlPYixRQUFRLEFBa09ILG1CQUFtQixDQUdoQixjQUFjLENBV1YsYUFBYSxFQWhQekIsUUFBUSxBQWtPSCxtQkFBbUIsQ0FHQSxhQUFhLENBV3pCLGFBQWEsQ0FBQztRQUNWLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsd0JBQUksR0FDN0I7SUFsUGIsUUFBUSxBQWtPSCxtQkFBbUIsQUFtQmYsbUJBQW1CLENBQ2hCLGNBQWMsQUFDVCxPQUFPLEVBdlB4QixRQUFRLEFBa09ILG1CQUFtQixBQW1CZixtQkFBbUIsQ0FDQSxhQUFhLEFBQ3hCLE9BQU8sQ0FBQztNNEIxUXZCLGdCQUFnQixFcUN5RE4seUpBQXlCLEVBSXpCLDBKQUF5QixFQUl6Qix5SkFBeUIsRUFJekIsMEpBQXlCLEV4RHpEMkIsc0hBQVE7TW1CWHRFLGdCQUFnQixFcUN3RE4seUpBQXlCLEVBSXpCLDBKQUF5QixFQUl6Qix5SkFBeUIsRUFJekIsMEpBQXlCLEV4RHJEZCw2R0FBTyxHVDRQYiIsCgkibmFtZXMiOiBbXQp9 */');;
},{"sassify":5}],10:[function(require,module,exports){
(function (global){
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.payment || (g.payment = {})).js = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var QJ, rreturn, rtrim;

QJ = function(selector) {
  if (QJ.isDOMElement(selector)) {
    return selector;
  }
  return document.querySelectorAll(selector);
};

QJ.isDOMElement = function(el) {
  return el && (el.nodeName != null);
};

rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;

QJ.trim = function(text) {
  if (text === null) {
    return "";
  } else {
    return (text + "").replace(rtrim, "");
  }
};

rreturn = /\r/g;

QJ.val = function(el, val) {
  var ret;
  if (arguments.length > 1) {
    return el.value = val;
  } else {
    ret = el.value;
    if (typeof ret === "string") {
      return ret.replace(rreturn, "");
    } else {
      if (ret === null) {
        return "";
      } else {
        return ret;
      }
    }
  }
};

QJ.preventDefault = function(eventObject) {
  if (typeof eventObject.preventDefault === "function") {
    eventObject.preventDefault();
    return;
  }
  eventObject.returnValue = false;
  return false;
};

QJ.normalizeEvent = function(e) {
  var original;
  original = e;
  e = {
    which: original.which != null ? original.which : void 0,
    target: original.target || original.srcElement,
    preventDefault: function() {
      return QJ.preventDefault(original);
    },
    originalEvent: original,
    data: original.data || original.detail
  };
  if (e.which == null) {
    e.which = original.charCode != null ? original.charCode : original.keyCode;
  }
  return e;
};

QJ.on = function(element, eventName, callback) {
  var el, i, j, len, len1, multEventName, originalCallback, ref;
  if (element.length) {
    for (i = 0, len = element.length; i < len; i++) {
      el = element[i];
      QJ.on(el, eventName, callback);
    }
    return;
  }
  if (eventName.match(" ")) {
    ref = eventName.split(" ");
    for (j = 0, len1 = ref.length; j < len1; j++) {
      multEventName = ref[j];
      QJ.on(element, multEventName, callback);
    }
    return;
  }
  originalCallback = callback;
  callback = function(e) {
    e = QJ.normalizeEvent(e);
    return originalCallback(e);
  };
  if (element.addEventListener) {
    return element.addEventListener(eventName, callback, false);
  }
  if (element.attachEvent) {
    eventName = "on" + eventName;
    return element.attachEvent(eventName, callback);
  }
  element['on' + eventName] = callback;
};

QJ.addClass = function(el, className) {
  var e;
  if (el.length) {
    return (function() {
      var i, len, results;
      results = [];
      for (i = 0, len = el.length; i < len; i++) {
        e = el[i];
        results.push(QJ.addClass(e, className));
      }
      return results;
    })();
  }
  if (el.classList) {
    return el.classList.add(className);
  } else {
    return el.className += ' ' + className;
  }
};

QJ.hasClass = function(el, className) {
  var e, hasClass, i, len;
  if (el.length) {
    hasClass = true;
    for (i = 0, len = el.length; i < len; i++) {
      e = el[i];
      hasClass = hasClass && QJ.hasClass(e, className);
    }
    return hasClass;
  }
  if (el.classList) {
    return el.classList.contains(className);
  } else {
    return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
  }
};

QJ.removeClass = function(el, className) {
  var cls, e, i, len, ref, results;
  if (el.length) {
    return (function() {
      var i, len, results;
      results = [];
      for (i = 0, len = el.length; i < len; i++) {
        e = el[i];
        results.push(QJ.removeClass(e, className));
      }
      return results;
    })();
  }
  if (el.classList) {
    ref = className.split(' ');
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      cls = ref[i];
      results.push(el.classList.remove(cls));
    }
    return results;
  } else {
    return el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
  }
};

QJ.toggleClass = function(el, className, bool) {
  var e;
  if (el.length) {
    return (function() {
      var i, len, results;
      results = [];
      for (i = 0, len = el.length; i < len; i++) {
        e = el[i];
        results.push(QJ.toggleClass(e, className, bool));
      }
      return results;
    })();
  }
  if (bool) {
    if (!QJ.hasClass(el, className)) {
      return QJ.addClass(el, className);
    }
  } else {
    return QJ.removeClass(el, className);
  }
};

QJ.append = function(el, toAppend) {
  var e;
  if (el.length) {
    return (function() {
      var i, len, results;
      results = [];
      for (i = 0, len = el.length; i < len; i++) {
        e = el[i];
        results.push(QJ.append(e, toAppend));
      }
      return results;
    })();
  }
  return el.insertAdjacentHTML('beforeend', toAppend);
};

QJ.find = function(el, selector) {
  if (el instanceof NodeList || el instanceof Array) {
    el = el[0];
  }
  return el.querySelectorAll(selector);
};

QJ.trigger = function(el, name, data) {
  var e, error, ev;
  try {
    ev = new CustomEvent(name, {
      detail: data
    });
  } catch (error) {
    e = error;
    ev = document.createEvent('CustomEvent');
    if (ev.initCustomEvent) {
      ev.initCustomEvent(name, true, true, data);
    } else {
      ev.initEvent(name, true, true, data);
    }
  }
  return el.dispatchEvent(ev);
};

module.exports = QJ;


},{}],2:[function(require,module,exports){
(function (global){
var Payment, QJ, cardFromNumber, cardFromType, cards, defaultFormat, formatBackCardNumber, formatBackExpiry, formatCardNumber, formatExpiry, formatForwardExpiry, formatForwardSlash, formatMonthExpiry, hasTextSelected, luhnCheck, reFormatCardNumber, restrictCVC, restrictCardNumber, restrictCombinedExpiry, restrictExpiry, restrictMonthExpiry, restrictNumeric, restrictYearExpiry, setCardType,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

QJ = require('qj/src/qj.coffee');

defaultFormat = /(\d{1,4})/g;

cards = [
  {
    type: 'amex',
    pattern: /^3[47]/,
    format: /(\d{1,4})(\d{1,6})?(\d{1,5})?/,
    length: [15],
    cvcLength: [4],
    luhn: true
  }, {
    type: 'dankort',
    pattern: /^5019/,
    format: defaultFormat,
    length: [16],
    cvcLength: [3],
    luhn: true
  }, {
    type: 'dinersclub',
    pattern: /^(36|38|30[0-5])/,
    format: defaultFormat,
    length: [14],
    cvcLength: [3],
    luhn: true
  }, {
    type: 'discover',
    pattern: /^(6011|65|64[4-9]|622)/,
    format: defaultFormat,
    length: [16],
    cvcLength: [3],
    luhn: true
  }, {
    type: 'jcb',
    pattern: /^35/,
    format: defaultFormat,
    length: [16],
    cvcLength: [3],
    luhn: true
  }, {
    type: 'laser',
    pattern: /^(6706|6771|6709)/,
    format: defaultFormat,
    length: [16, 17, 18, 19],
    cvcLength: [3],
    luhn: true
  }, {
    type: 'maestro',
    pattern: /^(5018|5020|5038|6304|6703|6759|676[1-3])/,
    format: defaultFormat,
    length: [12, 13, 14, 15, 16, 17, 18, 19],
    cvcLength: [3],
    luhn: true
  }, {
    type: 'mastercard',
    pattern: /^5[1-5]/,
    format: defaultFormat,
    length: [16],
    cvcLength: [3],
    luhn: true
  }, {
    type: 'unionpay',
    pattern: /^62/,
    format: defaultFormat,
    length: [16, 17, 18, 19],
    cvcLength: [3],
    luhn: false
  }, {
    type: 'visaelectron',
    pattern: /^4(026|17500|405|508|844|91[37])/,
    format: defaultFormat,
    length: [16],
    cvcLength: [3],
    luhn: true
  }, {
    type: 'visa',
    pattern: /^4/,
    format: defaultFormat,
    length: [13, 16],
    cvcLength: [3],
    luhn: true
  }, {
    type: 'elo',
    pattern: /^4011|438935|45(1416|76)|50(4175|6699|67|90[4-7])|63(6297|6368)/,
    format: defaultFormat,
    length: [16],
    cvcLength: [3],
    luhn: true
  }
];

cardFromNumber = function(num) {
  var card, i, len;
  num = (num + '').replace(/\D/g, '');
  for (i = 0, len = cards.length; i < len; i++) {
    card = cards[i];
    if (card.pattern.test(num)) {
      return card;
    }
  }
};

cardFromType = function(type) {
  var card, i, len;
  for (i = 0, len = cards.length; i < len; i++) {
    card = cards[i];
    if (card.type === type) {
      return card;
    }
  }
};

luhnCheck = function(num) {
  var digit, digits, i, len, odd, sum;
  odd = true;
  sum = 0;
  digits = (num + '').split('').reverse();
  for (i = 0, len = digits.length; i < len; i++) {
    digit = digits[i];
    digit = parseInt(digit, 10);
    if ((odd = !odd)) {
      digit *= 2;
    }
    if (digit > 9) {
      digit -= 9;
    }
    sum += digit;
  }
  return sum % 10 === 0;
};

hasTextSelected = function(target) {
  var ref;
  if ((target.selectionStart != null) && target.selectionStart !== target.selectionEnd) {
    return true;
  }
  if ((typeof document !== "undefined" && document !== null ? (ref = document.selection) != null ? ref.createRange : void 0 : void 0) != null) {
    if (document.selection.createRange().text) {
      return true;
    }
  }
  return false;
};

reFormatCardNumber = function(e) {
  return setTimeout((function(_this) {
    return function() {
      var target, value;
      target = e.target;
      value = QJ.val(target);
      value = Payment.fns.formatCardNumber(value);
      return QJ.val(target, value);
    };
  })(this));
};

formatCardNumber = function(e) {
  var card, digit, length, re, target, upperLength, value;
  digit = String.fromCharCode(e.which);
  if (!/^\d+$/.test(digit)) {
    return;
  }
  target = e.target;
  value = QJ.val(target);
  card = cardFromNumber(value + digit);
  length = (value.replace(/\D/g, '') + digit).length;
  upperLength = 16;
  if (card) {
    upperLength = card.length[card.length.length - 1];
  }
  if (length >= upperLength) {
    return;
  }
  if ((target.selectionStart != null) && target.selectionStart !== value.length) {
    return;
  }
  if (card && card.type === 'amex') {
    re = /^(\d{4}|\d{4}\s\d{6})$/;
  } else {
    re = /(?:^|\s)(\d{4})$/;
  }
  if (re.test(value)) {
    e.preventDefault();
    return QJ.val(target, value + ' ' + digit);
  } else if (re.test(value + digit)) {
    e.preventDefault();
    return QJ.val(target, value + digit + ' ');
  }
};

formatBackCardNumber = function(e) {
  var target, value;
  target = e.target;
  value = QJ.val(target);
  if (e.meta) {
    return;
  }
  if (e.which !== 8) {
    return;
  }
  if ((target.selectionStart != null) && target.selectionStart !== value.length) {
    return;
  }
  if (/\d\s$/.test(value)) {
    e.preventDefault();
    return QJ.val(target, value.replace(/\d\s$/, ''));
  } else if (/\s\d?$/.test(value)) {
    e.preventDefault();
    return QJ.val(target, value.replace(/\s\d?$/, ''));
  }
};

formatExpiry = function(e) {
  var digit, target, val;
  digit = String.fromCharCode(e.which);
  if (!/^\d+$/.test(digit)) {
    return;
  }
  target = e.target;
  val = QJ.val(target) + digit;
  if (/^\d$/.test(val) && (val !== '0' && val !== '1')) {
    e.preventDefault();
    return QJ.val(target, "0" + val + " / ");
  } else if (/^\d\d$/.test(val)) {
    e.preventDefault();
    return QJ.val(target, val + " / ");
  }
};

formatMonthExpiry = function(e) {
  var digit, target, val;
  digit = String.fromCharCode(e.which);
  if (!/^\d+$/.test(digit)) {
    return;
  }
  target = e.target;
  val = QJ.val(target) + digit;
  if (/^\d$/.test(val) && (val !== '0' && val !== '1')) {
    e.preventDefault();
    return QJ.val(target, "0" + val);
  } else if (/^\d\d$/.test(val)) {
    e.preventDefault();
    return QJ.val(target, "" + val);
  }
};

formatForwardExpiry = function(e) {
  var digit, target, val;
  digit = String.fromCharCode(e.which);
  if (!/^\d+$/.test(digit)) {
    return;
  }
  target = e.target;
  val = QJ.val(target);
  if (/^\d\d$/.test(val)) {
    return QJ.val(target, val + " / ");
  }
};

formatForwardSlash = function(e) {
  var slash, target, val;
  slash = String.fromCharCode(e.which);
  if (slash !== '/') {
    return;
  }
  target = e.target;
  val = QJ.val(target);
  if (/^\d$/.test(val) && val !== '0') {
    return QJ.val(target, "0" + val + " / ");
  }
};

formatBackExpiry = function(e) {
  var target, value;
  if (e.metaKey) {
    return;
  }
  target = e.target;
  value = QJ.val(target);
  if (e.which !== 8) {
    return;
  }
  if ((target.selectionStart != null) && target.selectionStart !== value.length) {
    return;
  }
  if (/\d(\s|\/)+$/.test(value)) {
    e.preventDefault();
    return QJ.val(target, value.replace(/\d(\s|\/)*$/, ''));
  } else if (/\s\/\s?\d?$/.test(value)) {
    e.preventDefault();
    return QJ.val(target, value.replace(/\s\/\s?\d?$/, ''));
  }
};

restrictNumeric = function(e) {
  var input;
  if (e.metaKey || e.ctrlKey) {
    return true;
  }
  if (e.which === 32) {
    return e.preventDefault();
  }
  if (e.which === 0) {
    return true;
  }
  if (e.which < 33) {
    return true;
  }
  input = String.fromCharCode(e.which);
  if (!/[\d\s]/.test(input)) {
    return e.preventDefault();
  }
};

restrictCardNumber = function(e) {
  var card, digit, target, value;
  target = e.target;
  digit = String.fromCharCode(e.which);
  if (!/^\d+$/.test(digit)) {
    return;
  }
  if (hasTextSelected(target)) {
    return;
  }
  value = (QJ.val(target) + digit).replace(/\D/g, '');
  card = cardFromNumber(value);
  if (card) {
    if (!(value.length <= card.length[card.length.length - 1])) {
      return e.preventDefault();
    }
  } else {
    if (!(value.length <= 16)) {
      return e.preventDefault();
    }
  }
};

restrictExpiry = function(e, length) {
  var digit, target, value;
  target = e.target;
  digit = String.fromCharCode(e.which);
  if (!/^\d+$/.test(digit)) {
    return;
  }
  if (hasTextSelected(target)) {
    return;
  }
  value = QJ.val(target) + digit;
  value = value.replace(/\D/g, '');
  if (value.length > length) {
    return e.preventDefault();
  }
};

restrictCombinedExpiry = function(e) {
  return restrictExpiry(e, 6);
};

restrictMonthExpiry = function(e) {
  return restrictExpiry(e, 2);
};

restrictYearExpiry = function(e) {
  return restrictExpiry(e, 4);
};

restrictCVC = function(e) {
  var digit, target, val;
  target = e.target;
  digit = String.fromCharCode(e.which);
  if (!/^\d+$/.test(digit)) {
    return;
  }
  if (hasTextSelected(target)) {
    return;
  }
  val = QJ.val(target) + digit;
  if (!(val.length <= 4)) {
    return e.preventDefault();
  }
};

setCardType = function(e) {
  var allTypes, card, cardType, target, val;
  target = e.target;
  val = QJ.val(target);
  cardType = Payment.fns.cardType(val) || 'unknown';
  if (!QJ.hasClass(target, cardType)) {
    allTypes = (function() {
      var i, len, results;
      results = [];
      for (i = 0, len = cards.length; i < len; i++) {
        card = cards[i];
        results.push(card.type);
      }
      return results;
    })();
    QJ.removeClass(target, 'unknown');
    QJ.removeClass(target, allTypes.join(' '));
    QJ.addClass(target, cardType);
    QJ.toggleClass(target, 'identified', cardType !== 'unknown');
    return QJ.trigger(target, 'payment.cardType', cardType);
  }
};

Payment = (function() {
  function Payment() {}

  Payment.fns = {
    cardExpiryVal: function(value) {
      var month, prefix, ref, year;
      value = value.replace(/\s/g, '');
      ref = value.split('/', 2), month = ref[0], year = ref[1];
      if ((year != null ? year.length : void 0) === 2 && /^\d+$/.test(year)) {
        prefix = (new Date).getFullYear();
        prefix = prefix.toString().slice(0, 2);
        year = prefix + year;
      }
      month = parseInt(month, 10);
      year = parseInt(year, 10);
      return {
        month: month,
        year: year
      };
    },
    validateCardNumber: function(num) {
      var card, ref;
      num = (num + '').replace(/\s+|-/g, '');
      if (!/^\d+$/.test(num)) {
        return false;
      }
      card = cardFromNumber(num);
      if (!card) {
        return false;
      }
      return (ref = num.length, indexOf.call(card.length, ref) >= 0) && (card.luhn === false || luhnCheck(num));
    },
    validateCardExpiry: function(month, year) {
      var currentTime, expiry, prefix, ref;
      if (typeof month === 'object' && 'month' in month) {
        ref = month, month = ref.month, year = ref.year;
      }
      if (!(month && year)) {
        return false;
      }
      month = QJ.trim(month);
      year = QJ.trim(year);
      if (!/^\d+$/.test(month)) {
        return false;
      }
      if (!/^\d+$/.test(year)) {
        return false;
      }
      if (!(parseInt(month, 10) <= 12)) {
        return false;
      }
      if (year.length === 2) {
        prefix = (new Date).getFullYear();
        prefix = prefix.toString().slice(0, 2);
        year = prefix + year;
      }
      expiry = new Date(year, month);
      currentTime = new Date;
      expiry.setMonth(expiry.getMonth() - 1);
      expiry.setMonth(expiry.getMonth() + 1, 1);
      return expiry > currentTime;
    },
    validateCardCVC: function(cvc, type) {
      var ref, ref1;
      cvc = QJ.trim(cvc);
      if (!/^\d+$/.test(cvc)) {
        return false;
      }
      if (type && cardFromType(type)) {
        return ref = cvc.length, indexOf.call((ref1 = cardFromType(type)) != null ? ref1.cvcLength : void 0, ref) >= 0;
      } else {
        return cvc.length >= 3 && cvc.length <= 4;
      }
    },
    cardType: function(num) {
      var ref;
      if (!num) {
        return null;
      }
      return ((ref = cardFromNumber(num)) != null ? ref.type : void 0) || null;
    },
    formatCardNumber: function(num) {
      var card, groups, ref, upperLength;
      card = cardFromNumber(num);
      if (!card) {
        return num;
      }
      upperLength = card.length[card.length.length - 1];
      num = num.replace(/\D/g, '');
      num = num.slice(0, +upperLength + 1 || 9e9);
      if (card.format.global) {
        return (ref = num.match(card.format)) != null ? ref.join(' ') : void 0;
      } else {
        groups = card.format.exec(num);
        if (groups != null) {
          groups.shift();
        }
        return groups != null ? groups.join(' ') : void 0;
      }
    }
  };

  Payment.restrictNumeric = function(el) {
    return QJ.on(el, 'keypress', restrictNumeric);
  };

  Payment.cardExpiryVal = function(el) {
    return Payment.fns.cardExpiryVal(QJ.val(el));
  };

  Payment.formatCardCVC = function(el) {
    Payment.restrictNumeric(el);
    QJ.on(el, 'keypress', restrictCVC);
    return el;
  };

  Payment.formatCardExpiry = function(el) {
    var month, year;
    Payment.restrictNumeric(el);
    if (el.length && el.length === 2) {
      month = el[0], year = el[1];
      this.formatCardExpiryMultiple(month, year);
    } else {
      QJ.on(el, 'keypress', restrictCombinedExpiry);
      QJ.on(el, 'keypress', formatExpiry);
      QJ.on(el, 'keypress', formatForwardSlash);
      QJ.on(el, 'keypress', formatForwardExpiry);
      QJ.on(el, 'keydown', formatBackExpiry);
    }
    return el;
  };

  Payment.formatCardExpiryMultiple = function(month, year) {
    QJ.on(month, 'keypress', restrictMonthExpiry);
    QJ.on(month, 'keypress', formatMonthExpiry);
    return QJ.on(year, 'keypress', restrictYearExpiry);
  };

  Payment.formatCardNumber = function(el) {
    Payment.restrictNumeric(el);
    QJ.on(el, 'keypress', restrictCardNumber);
    QJ.on(el, 'keypress', formatCardNumber);
    QJ.on(el, 'keydown', formatBackCardNumber);
    QJ.on(el, 'keyup', setCardType);
    QJ.on(el, 'paste', reFormatCardNumber);
    return el;
  };

  Payment.getCardArray = function() {
    return cards;
  };

  Payment.setCardArray = function(cardArray) {
    cards = cardArray;
    return true;
  };

  Payment.addToCardArray = function(cardObject) {
    return cards.push(cardObject);
  };

  Payment.removeFromCardArray = function(type) {
    var key, value;
    for (key in cards) {
      value = cards[key];
      if (value.type === type) {
        cards.splice(key, 1);
      }
    }
    return true;
  };

  return Payment;

})();

module.exports = Payment;

global.Payment = Payment;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"qj/src/qj.coffee":1}]},{},[2])(2)
});
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"qj/src/qj.coffee":11}],11:[function(require,module,exports){
var QJ, rreturn, rtrim;

QJ = function(selector) {
  if (QJ.isDOMElement(selector)) {
    return selector;
  }
  return document.querySelectorAll(selector);
};

QJ.isDOMElement = function(el) {
  return el && (el.nodeName != null);
};

rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;

QJ.trim = function(text) {
  if (text === null) {
    return "";
  } else {
    return (text + "").replace(rtrim, "");
  }
};

rreturn = /\r/g;

QJ.val = function(el, val) {
  var ret;
  if (arguments.length > 1) {
    return el.value = val;
  } else {
    ret = el.value;
    if (typeof ret === "string") {
      return ret.replace(rreturn, "");
    } else {
      if (ret === null) {
        return "";
      } else {
        return ret;
      }
    }
  }
};

QJ.preventDefault = function(eventObject) {
  if (typeof eventObject.preventDefault === "function") {
    eventObject.preventDefault();
    return;
  }
  eventObject.returnValue = false;
  return false;
};

QJ.normalizeEvent = function(e) {
  var original;
  original = e;
  e = {
    which: original.which != null ? original.which : void 0,
    target: original.target || original.srcElement,
    preventDefault: function() {
      return QJ.preventDefault(original);
    },
    originalEvent: original,
    data: original.data || original.detail
  };
  if (e.which == null) {
    e.which = original.charCode != null ? original.charCode : original.keyCode;
  }
  return e;
};

QJ.on = function(element, eventName, callback) {
  var el, i, j, len, len1, multEventName, originalCallback, ref;
  if (element.length) {
    for (i = 0, len = element.length; i < len; i++) {
      el = element[i];
      QJ.on(el, eventName, callback);
    }
    return;
  }
  if (eventName.match(" ")) {
    ref = eventName.split(" ");
    for (j = 0, len1 = ref.length; j < len1; j++) {
      multEventName = ref[j];
      QJ.on(element, multEventName, callback);
    }
    return;
  }
  originalCallback = callback;
  callback = function(e) {
    e = QJ.normalizeEvent(e);
    return originalCallback(e);
  };
  if (element.addEventListener) {
    return element.addEventListener(eventName, callback, false);
  }
  if (element.attachEvent) {
    eventName = "on" + eventName;
    return element.attachEvent(eventName, callback);
  }
  element['on' + eventName] = callback;
};

QJ.addClass = function(el, className) {
  var e;
  if (el.length) {
    return (function() {
      var i, len, results;
      results = [];
      for (i = 0, len = el.length; i < len; i++) {
        e = el[i];
        results.push(QJ.addClass(e, className));
      }
      return results;
    })();
  }
  if (el.classList) {
    return el.classList.add(className);
  } else {
    return el.className += ' ' + className;
  }
};

QJ.hasClass = function(el, className) {
  var e, hasClass, i, len;
  if (el.length) {
    hasClass = true;
    for (i = 0, len = el.length; i < len; i++) {
      e = el[i];
      hasClass = hasClass && QJ.hasClass(e, className);
    }
    return hasClass;
  }
  if (el.classList) {
    return el.classList.contains(className);
  } else {
    return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
  }
};

QJ.removeClass = function(el, className) {
  var cls, e, i, len, ref, results;
  if (el.length) {
    return (function() {
      var i, len, results;
      results = [];
      for (i = 0, len = el.length; i < len; i++) {
        e = el[i];
        results.push(QJ.removeClass(e, className));
      }
      return results;
    })();
  }
  if (el.classList) {
    ref = className.split(' ');
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      cls = ref[i];
      results.push(el.classList.remove(cls));
    }
    return results;
  } else {
    return el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
  }
};

QJ.toggleClass = function(el, className, bool) {
  var e;
  if (el.length) {
    return (function() {
      var i, len, results;
      results = [];
      for (i = 0, len = el.length; i < len; i++) {
        e = el[i];
        results.push(QJ.toggleClass(e, className, bool));
      }
      return results;
    })();
  }
  if (bool) {
    if (!QJ.hasClass(el, className)) {
      return QJ.addClass(el, className);
    }
  } else {
    return QJ.removeClass(el, className);
  }
};

QJ.append = function(el, toAppend) {
  var e;
  if (el.length) {
    return (function() {
      var i, len, results;
      results = [];
      for (i = 0, len = el.length; i < len; i++) {
        e = el[i];
        results.push(QJ.append(e, toAppend));
      }
      return results;
    })();
  }
  return el.insertAdjacentHTML('beforeend', toAppend);
};

QJ.find = function(el, selector) {
  if (el instanceof NodeList || el instanceof Array) {
    el = el[0];
  }
  return el.querySelectorAll(selector);
};

QJ.trigger = function(el, name, data) {
  var e, error, ev;
  try {
    ev = new CustomEvent(name, {
      detail: data
    });
  } catch (error) {
    e = error;
    ev = document.createEvent('CustomEvent');
    if (ev.initCustomEvent) {
      ev.initCustomEvent(name, true, true, data);
    } else {
      ev.initEvent(name, true, true, data);
    }
  }
  return el.dispatchEvent(ev);
};

module.exports = QJ;


},{}]},{},[8]);
