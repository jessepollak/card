!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.card=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
var css = ".card.card-safari.card-identified .card-front:before, .card.card-safari.card-identified .card-back:before {\n  background-image: -webkit-repeating-linear-gradient(45deg, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), -webkit-repeating-linear-gradient(315deg, rgba(255, 255, 255, 0.05) 1px, rgba(255, 255, 255, 0) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.03) 4px), -webkit-repeating-linear-gradient(0deg, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), -webkit-repeating-linear-gradient(240deg, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), -webkit-linear-gradient(-245deg, rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 0.2) 70%, rgba(255, 255, 255, 0) 90%);\n  background-image: repeating-linear-gradient(45deg, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), repeating-linear-gradient(135deg, rgba(255, 255, 255, 0.05) 1px, rgba(255, 255, 255, 0) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.03) 4px), repeating-linear-gradient(90deg, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), repeating-linear-gradient(210deg, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), -webkit-linear-gradient(-245deg, rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 0.2) 70%, rgba(255, 255, 255, 0) 90%);\n  background-image: -webkit-repeating-linear-gradient(45deg, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), -webkit-repeating-linear-gradient(315deg, rgba(255, 255, 255, 0.05) 1px, rgba(255, 255, 255, 0) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.03) 4px), -webkit-repeating-linear-gradient(0deg, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), -webkit-repeating-linear-gradient(240deg, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), -webkit-linear-gradient(115deg, rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 0.2) 70%, rgba(255, 255, 255, 0) 90%);\n  background-image: repeating-linear-gradient(45deg, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), repeating-linear-gradient(135deg, rgba(255, 255, 255, 0.05) 1px, rgba(255, 255, 255, 0) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.03) 4px), repeating-linear-gradient(90deg, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), repeating-linear-gradient(210deg, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), linear-gradient(-25deg, rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 0.2) 70%, rgba(255, 255, 255, 0) 90%); }\n\n.card.card-ie-10.card-flipped, .card.card-ie-11.card-flipped {\n  -webkit-transform: 0deg;\n  -ms-transform: 0deg;\n  transform: 0deg; }\n  .card.card-ie-10.card-flipped .card-front, .card.card-ie-11.card-flipped .card-front {\n    -webkit-transform: rotateY(0deg);\n    -ms-transform: rotateY(0deg);\n    transform: rotateY(0deg); }\n  .card.card-ie-10.card-flipped .card-back, .card.card-ie-11.card-flipped .card-back {\n    -webkit-transform: rotateY(0deg);\n    -ms-transform: rotateY(0deg);\n    transform: rotateY(0deg); }\n    .card.card-ie-10.card-flipped .card-back:after, .card.card-ie-11.card-flipped .card-back:after {\n      left: 18%; }\n    .card.card-ie-10.card-flipped .card-back .card-cvc, .card.card-ie-11.card-flipped .card-back .card-cvc {\n      -webkit-transform: rotateY(180deg);\n      -ms-transform: rotateY(180deg);\n      transform: rotateY(180deg);\n      left: 5%; }\n    .card.card-ie-10.card-flipped .card-back .card-shiny, .card.card-ie-11.card-flipped .card-back .card-shiny {\n      left: 84%; }\n      .card.card-ie-10.card-flipped .card-back .card-shiny:after, .card.card-ie-11.card-flipped .card-back .card-shiny:after {\n        left: -480%;\n        -webkit-transform: rotateY(180deg);\n        -ms-transform: rotateY(180deg);\n        transform: rotateY(180deg); }\n\n.card.card-ie-10.card-amex .card-back, .card.card-ie-11.card-amex .card-back {\n  display: none; }\n\n.card-logo {\n  height: 36px;\n  width: 60px;\n  font-style: italic; }\n  .card-logo, .card-logo:before, .card-logo:after {\n    -webkit-box-sizing: border-box;\n    -moz-box-sizing: border-box;\n    box-sizing: border-box; }\n\n.card-logo.card-amex {\n  text-transform: uppercase;\n  font-size: 4px;\n  font-weight: bold;\n  color: white;\n  background-image: -webkit-repeating-radial-gradient(center, circle, #FFF 1px, #999 2px);\n  background-image: repeating-radial-gradient(circle at center, #FFF 1px, #999 2px);\n  background-image: repeating-radial-gradient(circle at center, #FFF 1px, #999 2px);\n  border: 1px solid #EEE; }\n  .card-logo.card-amex:before, .card-logo.card-amex:after {\n    width: 28px;\n    display: block;\n    position: absolute;\n    left: 16px; }\n  .card-logo.card-amex:before {\n    height: 28px;\n    content: \"american\";\n    top: 3px;\n    text-align: left;\n    padding-left: 2px;\n    padding-top: 11px;\n    background: #267AC3; }\n  .card-logo.card-amex:after {\n    content: \"express\";\n    bottom: 11px;\n    text-align: right;\n    padding-right: 2px; }\n\n.card.card-amex.card-flipped {\n  -webkit-transform: none;\n  -ms-transform: none;\n  transform: none; }\n.card.card-amex.card-identified .card-front:before, .card.card-amex.card-identified .card-back:before {\n  background-color: #108168; }\n.card.card-amex.card-identified .card-front .card-logo.card-amex {\n  opacity: 1; }\n.card.card-amex.card-identified .card-front .card-cvc {\n  visibility: visible; }\n.card.card-amex.card-identified .card-front:after {\n  opacity: 1; }\n\n.card-logo.card-discover {\n  background: #FF6600;\n  color: #111;\n  text-transform: uppercase;\n  font-style: normal;\n  font-weight: bold;\n  font-size: 10px;\n  text-align: center;\n  overflow: hidden;\n  z-index: 1;\n  padding-top: 9px;\n  letter-spacing: 0.03em;\n  border: 1px solid #EEE; }\n  .card-logo.card-discover:before, .card-logo.card-discover:after {\n    content: \" \";\n    display: block;\n    position: absolute; }\n  .card-logo.card-discover:before {\n    background: white;\n    width: 200px;\n    height: 200px;\n    border-radius: 200px;\n    bottom: -5%;\n    right: -80%;\n    z-index: -1; }\n  .card-logo.card-discover:after {\n    width: 8px;\n    height: 8px;\n    border-radius: 4px;\n    top: 10px;\n    left: 27px;\n    background-color: #FFF;\n    background-image: -webkit-radial-gradient(#FFF, #FF6600);\n    background-image: radial-gradient(  #FFF, #FF6600);\n    content: \"network\";\n    font-size: 4px;\n    line-height: 24px;\n    text-indent: -7px; }\n\n.card .card-front .card-logo.card-discover {\n  right: 12%;\n  top: 18%; }\n\n.card.card-discover.card-identified .card-front:before, .card.card-discover.card-identified .card-back:before {\n  background-color: #86B8CF; }\n.card.card-discover.card-identified .card-logo.card-discover {\n  opacity: 1; }\n.card.card-discover.card-identified .card-front:after {\n  -webkit-transition: 400ms;\n  transition: 400ms;\n  content: \" \";\n  display: block;\n  background-color: #FF6600;\n  background-image: -webkit-linear-gradient(#FF6600, #ffa166, #FF6600);\n  background-image: -webkit-gradient(linear, left top, left bottom, from(#FF6600), color-stop(#ffa166), to(#FF6600));\n  background-image: linear-gradient(#FF6600, #ffa166, #FF6600);\n  height: 50px;\n  width: 50px;\n  border-radius: 25px;\n  position: absolute;\n  left: 100%;\n  top: 15%;\n  margin-left: -25px;\n  -webkit-box-shadow: inset 1px 1px 3px 1px rgba(0, 0, 0, 0.5);\n  box-shadow: inset 1px 1px 3px 1px rgba(0, 0, 0, 0.5); }\n\n.card-logo.card-visa.card-visa {\n  background: white;\n  text-transform: uppercase;\n  color: #1A1876;\n  text-align: center;\n  font-weight: bold;\n  font-size: 15px;\n  line-height: 18px; }\n  .card-logo.card-visa.card-visa:before, .card-logo.card-visa.card-visa:after {\n    content: \" \";\n    display: block;\n    width: 100%;\n    height: 25%; }\n  .card-logo.card-visa.card-visa:before {\n    background: #1A1876; }\n  .card-logo.card-visa.card-visa:after {\n    background: #E79800; }\n\n.card.card-visa.card-identified .card-front:before, .card.card-visa.card-identified .card-back:before {\n  background-color: #191278; }\n.card.card-visa.card-identified .card-logo.card-visa {\n  opacity: 1; }\n\n.card-logo.card-mastercard {\n  color: white;\n  font-weight: bold;\n  text-align: center;\n  font-size: 9px;\n  line-height: 36px;\n  z-index: 1;\n  text-shadow: 1px 1px rgba(0, 0, 0, 0.6); }\n  .card-logo.card-mastercard:before, .card-logo.card-mastercard:after {\n    content: \" \";\n    display: block;\n    width: 36px;\n    top: 0;\n    position: absolute;\n    height: 36px;\n    border-radius: 18px; }\n  .card-logo.card-mastercard:before {\n    left: 0;\n    background: #FF0000;\n    z-index: -1; }\n  .card-logo.card-mastercard:after {\n    right: 0;\n    background: #FFAB00;\n    z-index: -2; }\n\n.card.card-mastercard.card-identified .card-front .card-logo.card-mastercard, .card.card-mastercard.card-identified .card-back .card-logo.card-mastercard {\n  -webkit-box-shadow: none;\n  box-shadow: none; }\n.card.card-mastercard.card-identified .card-front:before, .card.card-mastercard.card-identified .card-back:before {\n  background-color: #0061A8; }\n.card.card-mastercard.card-identified .card-logo.card-mastercard {\n  opacity: 1; }\n\n.card-container {\n  -webkit-perspective: 1000px;\n  perspective: 1000px;\n  width: 350px;\n  max-width: 100%;\n  height: 200px;\n  margin: auto;\n  z-index: 1;\n  position: relative; }\n\n.card {\n  font-family: \"Helvetica Neue\";\n  line-height: 1;\n  position: relative;\n  width: 100%;\n  height: 100%;\n  min-width: 315px;\n  border-radius: 10px;\n  -webkit-transform-style: preserve-3d;\n  -ms-transform-style: preserve-3d;\n  -o-transform-style: preserve-3d;\n  transform-style: preserve-3d;\n  -webkit-transition: all 400ms linear;\n  transition: all 400ms linear; }\n  .card > *, .card > *:before, .card > *:after {\n    -moz-box-sizing: border-box;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    font-family: inherit; }\n  .card.card-flipped {\n    -webkit-transform: rotateY(180deg);\n    -ms-transform: rotateY(180deg);\n    transform: rotateY(180deg); }\n  .card .card-front, .card .card-back {\n    -webkit-backface-visibility: hidden;\n    backface-visibility: hidden;\n    -webkit-transform-style: preserve-3d;\n    -ms-transform-style: preserve-3d;\n    -o-transform-style: preserve-3d;\n    transform-style: preserve-3d;\n    -webkit-transition: all 400ms linear;\n    transition: all 400ms linear;\n    width: 100%;\n    height: 100%;\n    position: absolute;\n    top: 0;\n    left: 0;\n    overflow: hidden;\n    border-radius: 10px;\n    background: #DDD; }\n    .card .card-front:before, .card .card-back:before {\n      content: \" \";\n      display: block;\n      position: absolute;\n      width: 100%;\n      height: 100%;\n      top: 0;\n      left: 0;\n      opacity: 0;\n      border-radius: 10px;\n      -webkit-transition: all 400ms ease;\n      transition: all 400ms ease; }\n    .card .card-front:after, .card .card-back:after {\n      content: \" \";\n      display: block; }\n    .card .card-front .card-display, .card .card-back .card-display {\n      color: white;\n      font-weight: normal;\n      opacity: 0.5;\n      -webkit-transition: opacity 400ms linear;\n      transition: opacity 400ms linear; }\n      .card .card-front .card-display.card-focused, .card .card-back .card-display.card-focused {\n        opacity: 1;\n        font-weight: 700; }\n    .card .card-front .card-cvc, .card .card-back .card-cvc {\n      font-family: \"Bitstream Vera Sans Mono\", Consolas, Courier, monospace;\n      font-size: 14px; }\n    .card .card-front .card-shiny, .card .card-back .card-shiny {\n      width: 50px;\n      height: 35px;\n      border-radius: 5px;\n      background: #CCC;\n      position: relative; }\n      .card .card-front .card-shiny:before, .card .card-back .card-shiny:before {\n        content: \" \";\n        display: block;\n        width: 70%;\n        height: 60%;\n        border-top-right-radius: 5px;\n        border-bottom-right-radius: 5px;\n        background: #d9d9d9;\n        position: absolute;\n        top: 20%; }\n  .card .card-front .card-logo {\n    position: absolute;\n    opacity: 0;\n    right: 5%;\n    top: 8%;\n    -webkit-transition: 400ms;\n    transition: 400ms; }\n  .card .card-front .card-lower {\n    width: 80%;\n    position: absolute;\n    left: 10%;\n    bottom: 30px; }\n    @media only screen and (max-width: 480px) {\n      .card .card-front .card-lower {\n        width: 90%;\n        left: 5%; } }\n    .card .card-front .card-lower .card-cvc {\n      visibility: hidden;\n      float: right;\n      position: relative;\n      bottom: 5px; }\n    .card .card-front .card-lower .card-number {\n      font-family: \"Bitstream Vera Sans Mono\", Consolas, Courier, monospace;\n      font-size: 24px;\n      clear: both;\n      margin-bottom: 30px; }\n    .card .card-front .card-lower .card-expiry {\n      font-family: \"Bitstream Vera Sans Mono\", Consolas, Courier, monospace;\n      letter-spacing: 0em;\n      position: relative;\n      float: right;\n      width: 25%; }\n      .card .card-front .card-lower .card-expiry:before, .card .card-front .card-lower .card-expiry:after {\n        font-family: \"Helvetica Neue\";\n        font-weight: bold;\n        font-size: 7px;\n        white-space: pre;\n        display: block;\n        opacity: 0.5; }\n      .card .card-front .card-lower .card-expiry:before {\n        content: attr(data-before);\n        margin-bottom: 2px;\n        font-size: 7px;\n        text-transform: uppercase; }\n      .card .card-front .card-lower .card-expiry:after {\n        position: absolute;\n        content: attr(data-after);\n        text-align: right;\n        right: 100%;\n        margin-right: 5px;\n        margin-top: 2px;\n        bottom: 0; }\n    .card .card-front .card-lower .card-name {\n      text-transform: uppercase;\n      font-family: \"Bitstream Vera Sans Mono\", Consolas, Courier, monospace;\n      font-size: 20px;\n      max-height: 45px;\n      position: absolute;\n      bottom: 0;\n      width: 190px;\n      -webkit-line-clamp: 2;\n      -webkit-box-orient: horizontal;\n      overflow: hidden;\n      text-overflow: ellipsis; }\n  .card .card-back {\n    -webkit-transform: rotateY(180deg);\n    -ms-transform: rotateY(180deg);\n    transform: rotateY(180deg); }\n    .card .card-back .card-bar {\n      background-color: #444;\n      background-image: -webkit-linear-gradient(#444, #333);\n      background-image: -webkit-gradient(linear, left top, left bottom, from(#444), to(#333));\n      background-image: linear-gradient(#444, #333);\n      width: 100%;\n      height: 20%;\n      position: absolute;\n      top: 10%; }\n    .card .card-back:after {\n      content: \" \";\n      display: block;\n      background-color: #FFF;\n      background-image: -webkit-linear-gradient(#FFF, #FFF);\n      background-image: -webkit-gradient(linear, left top, left bottom, from(#FFF), to(#FFF));\n      background-image: linear-gradient(#FFF, #FFF);\n      width: 80%;\n      height: 16%;\n      position: absolute;\n      top: 40%;\n      left: 2%; }\n    .card .card-back .card-cvc {\n      position: absolute;\n      top: 40%;\n      left: 85%;\n      -webkit-transition-delay: 600ms;\n      transition-delay: 600ms; }\n    .card .card-back .card-shiny {\n      position: absolute;\n      top: 66%;\n      left: 2%; }\n      .card .card-back .card-shiny:after {\n        content: \"This card has been issued by Jesse Pollak and is licensed for anyone to use anywhere for free.\\AIt comes with no warranty.\\A For support issues, please visit: github.com/jessepollak/card.\";\n        position: absolute;\n        left: 120%;\n        top: 5%;\n        color: white;\n        font-size: 7px;\n        width: 230px;\n        opacity: 0.5; }\n  .card.card-identified {\n    -webkit-box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);\n    box-shadow: 0 0 20px rgba(0, 0, 0, 0.3); }\n    .card.card-identified .card-front, .card.card-identified .card-back {\n      background-color: #000;\n      background-color: rgba(0, 0, 0, 0.5); }\n      .card.card-identified .card-front:before, .card.card-identified .card-back:before {\n        -webkit-transition: all 400ms ease;\n        transition: all 400ms ease;\n        background-image: -webkit-repeating-linear-gradient(45deg, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), -webkit-repeating-linear-gradient(315deg, rgba(255, 255, 255, 0.05) 1px, rgba(255, 255, 255, 0) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.03) 4px), -webkit-repeating-linear-gradient(0deg, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), -webkit-repeating-linear-gradient(240deg, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), -webkit-repeating-radial-gradient(30% 30%, circle, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), -webkit-repeating-radial-gradient(70% 70%, circle, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), -webkit-repeating-radial-gradient(90% 20%, circle, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), -webkit-repeating-radial-gradient(15% 80%, circle, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), -webkit-linear-gradient(-245deg, rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 0.2) 70%, rgba(255, 255, 255, 0) 90%);\n        background-image: repeating-linear-gradient(45deg, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), repeating-linear-gradient(135deg, rgba(255, 255, 255, 0.05) 1px, rgba(255, 255, 255, 0) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.03) 4px), repeating-linear-gradient(90deg, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), repeating-linear-gradient(210deg, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), repeating-radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), repeating-radial-gradient(circle at 70% 70%, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), repeating-radial-gradient(circle at 90% 20%, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), repeating-radial-gradient(circle at 15% 80%, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), -webkit-linear-gradient(-245deg, rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 0.2) 70%, rgba(255, 255, 255, 0) 90%);\n        background-image: -webkit-repeating-linear-gradient(45deg, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), -webkit-repeating-linear-gradient(315deg, rgba(255, 255, 255, 0.05) 1px, rgba(255, 255, 255, 0) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.03) 4px), -webkit-repeating-linear-gradient(0deg, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), -webkit-repeating-linear-gradient(240deg, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), -webkit-repeating-radial-gradient(30% 30%, circle, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), -webkit-repeating-radial-gradient(70% 70%, circle, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), -webkit-repeating-radial-gradient(90% 20%, circle, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), -webkit-repeating-radial-gradient(15% 80%, circle, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), -webkit-linear-gradient(115deg, rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 0.2) 70%, rgba(255, 255, 255, 0) 90%);\n        background-image: repeating-linear-gradient(45deg, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), repeating-linear-gradient(135deg, rgba(255, 255, 255, 0.05) 1px, rgba(255, 255, 255, 0) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.03) 4px), repeating-linear-gradient(90deg, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), repeating-linear-gradient(210deg, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), repeating-radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), repeating-radial-gradient(circle at 70% 70%, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), repeating-radial-gradient(circle at 90% 20%, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), repeating-radial-gradient(circle at 15% 80%, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), linear-gradient(-25deg, rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 0.2) 70%, rgba(255, 255, 255, 0) 90%);\n        opacity: 1; }\n      .card.card-identified .card-front .card-logo, .card.card-identified .card-back .card-logo {\n        -webkit-box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.3);\n        box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.3); }\n    .card.card-identified.no-radial-gradient .card-front:before, .card.card-identified.no-radial-gradient .card-back:before {\n      background-image: -webkit-repeating-linear-gradient(45deg, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), -webkit-repeating-linear-gradient(315deg, rgba(255, 255, 255, 0.05) 1px, rgba(255, 255, 255, 0) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.03) 4px), -webkit-repeating-linear-gradient(0deg, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), -webkit-repeating-linear-gradient(240deg, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), -webkit-linear-gradient(-245deg, rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 0.2) 70%, rgba(255, 255, 255, 0) 90%);\n      background-image: repeating-linear-gradient(45deg, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), repeating-linear-gradient(135deg, rgba(255, 255, 255, 0.05) 1px, rgba(255, 255, 255, 0) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.03) 4px), repeating-linear-gradient(90deg, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), repeating-linear-gradient(210deg, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), -webkit-linear-gradient(-245deg, rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 0.2) 70%, rgba(255, 255, 255, 0) 90%);\n      background-image: -webkit-repeating-linear-gradient(45deg, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), -webkit-repeating-linear-gradient(315deg, rgba(255, 255, 255, 0.05) 1px, rgba(255, 255, 255, 0) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.03) 4px), -webkit-repeating-linear-gradient(0deg, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), -webkit-repeating-linear-gradient(240deg, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), -webkit-linear-gradient(115deg, rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 0.2) 70%, rgba(255, 255, 255, 0) 90%);\n      background-image: repeating-linear-gradient(45deg, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), repeating-linear-gradient(135deg, rgba(255, 255, 255, 0.05) 1px, rgba(255, 255, 255, 0) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.03) 4px), repeating-linear-gradient(90deg, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), repeating-linear-gradient(210deg, rgba(255, 255, 255, 0) 1px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.04) 3px, rgba(255, 255, 255, 0.05) 4px), linear-gradient(-25deg, rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 0.2) 70%, rgba(255, 255, 255, 0) 90%); }\n"; (_dereq_("/Users/jessepollak/repos/card/node_modules/cssify"))(css); module.exports = css;
},{"/Users/jessepollak/repos/card/node_modules/cssify":2}],2:[function(_dereq_,module,exports){
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

},{}],3:[function(_dereq_,module,exports){
module.exports = _dereq_('./lib/extend');


},{"./lib/extend":4}],4:[function(_dereq_,module,exports){
/*!
 * node.extend
 * Copyright 2011, John Resig
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * @fileoverview
 * Port of jQuery.extend that actually works on node.js
 */
var is = _dereq_('is');

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
extend.version = '1.0.8';

/**
 * Exports module.
 */
module.exports = extend;


},{"is":5}],5:[function(_dereq_,module,exports){

/**!
 * is
 * the definitive JavaScript type testing library
 *
 * @copyright 2013-2014 Enrico Marino / Jordan Harband
 * @license MIT
 */

var objProto = Object.prototype;
var owns = objProto.hasOwnProperty;
var toString = objProto.toString;
var isActualNaN = function (value) {
  return value !== value;
};
var NON_HOST_TYPES = {
  boolean: 1,
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
  var type = toString.call(value);
  var key;

  if ('[object Array]' === type || '[object Arguments]' === type || '[object String]' === type) {
    return value.length === 0;
  }

  if ('[object Object]' === type) {
    for (key in value) {
      if (owns.call(value, key)) { return false; }
    }
    return true;
  }

  return false;
};

/**
 * is.equal
 * Test if `value` is equal to `other`.
 *
 * @param {Mixed} value value to test
 * @param {Mixed} other value to compare with
 * @return {Boolean} true if `value` is equal to `other`, false otherwise
 */

is.equal = function (value, other) {
  var strictlyEqual = value === other;
  if (strictlyEqual) {
    return true;
  }

  var type = toString.call(value);
  var key;

  if (type !== toString.call(other)) {
    return false;
  }

  if ('[object Object]' === type) {
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

  if ('[object Array]' === type) {
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

  if ('[object Function]' === type) {
    return value.prototype === other.prototype;
  }

  if ('[object Date]' === type) {
    return value.getTime() === other.getTime();
  }

  return strictlyEqual;
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

is.undef = is['undefined'] = function (value) {
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

is.args = is['arguments'] = function (value) {
  var isStandardArguments = '[object Arguments]' === toString.call(value);
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

is.array = function (value) {
  return '[object Array]' === toString.call(value);
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
  return !!value && !is.boolean(value)
    && owns.call(value, 'length')
    && isFinite(value.length)
    && is.number(value.length)
    && value.length >= 0;
};

/**
 * Test boolean.
 */

/**
 * is.boolean
 * Test if `value` is a boolean.
 *
 * @param {Mixed} value value to test
 * @return {Boolean} true if `value` is a boolean, false otherwise
 * @api public
 */

is.boolean = function (value) {
  return '[object Boolean]' === toString.call(value);
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
  return is.boolean(value) && Boolean(Number(value)) === false;
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
  return is.boolean(value) && Boolean(Number(value)) === true;
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
  return '[object Date]' === toString.call(value);
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
  return '[object Error]' === toString.call(value);
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
  return isAlert || '[object Function]' === toString.call(value);
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
  return '[object Number]' === toString.call(value);
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
 * is.int
 * Test if `value` is an integer.
 *
 * @param value to test
 * @return {Boolean} true if `value` is an integer, false otherwise
 * @api public
 */

is.int = function (value) {
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
  return '[object Object]' === toString.call(value);
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
  return '[object RegExp]' === toString.call(value);
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
  return '[object String]' === toString.call(value);
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

},{}],6:[function(_dereq_,module,exports){
(function (global){
!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),(f.qj||(f.qj={})).js=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof _dereq_=="function"&&_dereq_;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof _dereq_=="function"&&_dereq_;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
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
      return;
    }
  }
  if (eventName.match(" ")) {
    _ref = eventName.split(" ");
    for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
      multEventName = _ref[_j];
      QJ.on(element, multEventName, callback);
      return;
    }
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

QJ.trigger = function(el, name, data) {
  var ev;
  if (window.CustomEvent) {
    ev = new CustomEvent(name, {
      detail: data
    });
  } else {
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
}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],7:[function(_dereq_,module,exports){
var Card, QJ, extend, payment,
  __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

_dereq_('../../lib/css/card.css');

QJ = _dereq_('qj');

payment = _dereq_('./payment/src/payment.coffee');

extend = _dereq_('node.extend');

Card = (function() {
  var bindVal;

  Card.prototype.cardTemplate = "<div class=\"card-container\">\n    <div class=\"card\">\n        <div class=\"card-front\">\n                <div class=\"card-logo card-visa\">visa</div>\n                <div class=\"card-logo card-mastercard\">MasterCard</div>\n                <div class=\"card-logo card-amex\"></div>\n                <div class=\"card-logo card-discover\">discover</div>\n            <div class=\"card-lower\">\n                <div class=\"card-shiny\"></div>\n                <div class=\"card-cvc card-display\">{{cvc}}</div>\n                <div class=\"card-number card-display\">{{number}}</div>\n                <div class=\"card-name card-display\">{{name}}</div>\n                <div class=\"card-expiry card-display\" data-before=\"{{monthYear}}\" data-after=\"{{validDate}}\">{{expiry}}</div>\n            </div>\n        </div>\n        <div class=\"card-back\">\n            <div class=\"card-bar\"></div>\n            <div class=\"card-cvc card-display\">{{cvc}}</div>\n            <div class=\"card-shiny\"></div>\n        </div>\n    </div>\n</div>";

  Card.prototype.template = function(tpl, data) {
    return tpl.replace(/\{\{(.*?)\}\}/g, function(match, key, str) {
      return data[key];
    });
  };

  Card.prototype.cardTypes = ['card-maestro', 'card-dinersclub', 'card-laser', 'card-jcb', 'card-unionpay', 'card-discover', 'card-mastercard', 'card-amex', 'card-visa'];

  Card.prototype.defaults = {
    formatting: true,
    formSelectors: {
      numberInput: 'input[name="number"]',
      expiryInput: 'input[name="expiry"]',
      cvcInput: 'input[name="cvc"]',
      nameInput: 'input[name="name"]'
    },
    cardSelectors: {
      cardContainer: '.card-container',
      card: '.card',
      numberDisplay: '.card-number',
      expiryDisplay: '.card-expiry',
      cvcDisplay: '.card-cvc',
      nameDisplay: '.card-name'
    },
    messages: {
      validDate: 'valid\nthru',
      monthYear: 'month/year'
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
    },
    debug: false
  };

  function Card(el, opts) {
    this.options = extend(true, {}, this.defaults, opts);
    extend(this.options.messages, this.defaults.messages);
    extend(this.options.values, this.defaults.values);
    this.$el = el;
    if (!this.options.container) {
      console.log("Please provide a container");
      return;
    }
    this.$container = QJ(this.options.container);
    this.render();
    this.attachHandlers();
    this.handleInitialValues();
  }

  Card.prototype.render = function() {
    var baseWidth, name, obj, selector, ua, _ref, _ref1;
    this.$container.insertAdjacentHTML('beforeend', this.template(this.cardTemplate, extend({}, this.options.messages, this.options.values)));
    _ref = this.options.cardSelectors;
    for (name in _ref) {
      selector = _ref[name];
      this["$" + name] = this.$container.querySelectorAll(selector);
    }
    _ref1 = this.options.formSelectors;
    for (name in _ref1) {
      selector = _ref1[name];
      if (this.options[name]) {
        obj = QJ(this.options[name]);
      } else {
        obj = this.$el.querySelectorAll(selector);
      }
      if (!obj.length && this.options.debug) {
        console.error("Card can't find a " + name + " in your form.");
      }
      this["$" + name] = obj;
    }
    if (this.options.formatting) {
      Payment.formatCardNumber(this.$numberInput[0]);
      Payment.formatCardCVC(this.$cvcInput[0]);
      if (this.$expiryInput.length === 1) {
        Payment.formatCardExpiry(this.$expiryInput[0]);
      }
    }
    if (this.options.width) {
      baseWidth = parseInt(this.$cardContainer.css('width'));
      this.$cardContainer.style.transform = "scale(" + (this.options.width / baseWidth) + ")";
    }
    if (typeof navigator !== "undefined" && navigator !== null ? navigator.userAgent : void 0) {
      ua = navigator.userAgent.toLowerCase();
      if (ua.indexOf('safari') !== -1 && ua.indexOf('chrome') === -1) {
        QJ.addClass(this.$card, 'card-safari');
      }
    }
    if (new Function("/*@cc_on return @_jscript_version; @*/")()) {
      QJ.addClass(this.$card, 'card-ie-10');
    }
    if (/rv:11.0/i.test(navigator.userAgent)) {
      return QJ.addClass(this.$card, 'card-ie-11');
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
    if (this.$expiryInput.length === 1) {
      expiryFilters.push(this.validToggler('cardExpiry'));
    }
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
    bindVal(this.$nameInput, this.$nameDisplay, {
      fill: false,
      filters: this.validToggler('cardHolderName'),
      join: ' '
    });
    return QJ.on(this.$nameInput, 'keydown', this.handle('captureName'));
  };

  Card.prototype.handleInitialValues = function() {
    var el, name, selector, _ref, _results;
    _ref = this.options.formSelectors;
    _results = [];
    for (name in _ref) {
      selector = _ref[name];
      el = this["$" + name];
      if (QJ.val(el)) {
        QJ.trigger(el, 'paste');
        _results.push(setTimeout(function() {
          return QJ.trigger(el, 'keyup');
        }));
      } else {
        _results.push(void 0);
      }
    }
    return _results;
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
        QJ.removeClass(this.$card, 'card-unknown');
        QJ.removeClass(this.$card, this.cardTypes.join(' '));
        QJ.addClass(this.$card, "card-" + cardType);
        QJ.toggleClass(this.$card, 'card-identified', cardType !== 'unknown');
        return this.cardType = cardType;
      }
    },
    flipCard: function() {
      return QJ.addClass(this.$card, 'card-flipped');
    },
    unflipCard: function() {
      return QJ.removeClass(this.$card, 'card-flipped');
    },
    captureName: function($el, e) {
      var allowedSymbols, banKeyCodes, keyCode;
      keyCode = e.which || e.keyCode;
      banKeyCodes = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 106, 107, 109, 110, 111, 186, 187, 188, 189, 190, 191, 192, 219, 220, 221, 222];
      allowedSymbols = [189, 109, 190, 110, 222];
      if (banKeyCodes.indexOf(keyCode) !== -1 && !(!e.shiftKey && __indexOf.call(allowedSymbols, keyCode) >= 0)) {
        return e.preventDefault();
      }
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
      var _i, _len, _results;
      _results = [];
      for (_i = 0, _len = out.length; _i < _len; _i++) {
        o = out[_i];
        _results.push(o.textContent);
      }
      return _results;
    })();
    QJ.on(el, 'focus', function() {
      return QJ.addClass(out, 'card-focused');
    });
    QJ.on(el, 'blur', function() {
      return QJ.removeClass(el, 'card-focused');
    });
    QJ.on(el, 'keyup change paste', function(e) {
      var elem, filter, i, join, outEl, outVal, val, _i, _j, _len, _len1, _ref, _results;
      val = (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = el.length; _i < _len; _i++) {
          elem = el[_i];
          _results.push(QJ.val(elem));
        }
        return _results;
      })();
      join = opts.join(val);
      val = val.join(join);
      if (val === join) {
        val = "";
      }
      _ref = opts.filters;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        filter = _ref[_i];
        val = filter(val, el, out);
      }
      _results = [];
      for (i = _j = 0, _len1 = out.length; _j < _len1; i = ++_j) {
        outEl = out[i];
        if (opts.fill) {
          outVal = val + outDefaults[i].substring(val.length);
        } else {
          outVal = val || outDefaults[i];
        }
        _results.push(outEl.textContent = outVal);
      }
      return _results;
    });
    return el;
  };

  return Card;

})();

module.exports = Card;


},{"../../lib/css/card.css":1,"./payment/src/payment.coffee":9,"node.extend":3,"qj":6}],8:[function(_dereq_,module,exports){
var $, Card,
  __slice = [].slice;

Card = _dereq_('./card');

$ = jQuery;

$.card = {};

$.card.fn = {};

$.fn.card = function(opts) {
  return $.card.fn.construct.apply(this, opts);
};

$.fn.extend({
  card: function() {
    var args, option;
    option = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
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
        $this.data('card', (data = new Card(this, option)));
      }
      if (typeof option === 'string') {
        return data[option].apply(data, args);
      }
    });
  }
});


},{"./card":7}],9:[function(_dereq_,module,exports){
(function (global){
var Payment, QJ, cardFromNumber, cardFromType, cards, defaultFormat, formatBackCardNumber, formatBackExpiry, formatCardNumber, formatExpiry, formatForwardExpiry, formatForwardSlash, hasTextSelected, luhnCheck, reFormatCardNumber, restrictCVC, restrictCardNumber, restrictExpiry, restrictNumeric, setCardType,
  __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

QJ = _dereq_('qj');

defaultFormat = /(\d{1,4})/g;

cards = [
  {
    type: 'maestro',
    pattern: /^(5018|5020|5038|6304|6759|676[1-3])/,
    format: defaultFormat,
    length: [12, 13, 14, 15, 16, 17, 18, 19],
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
    type: 'laser',
    pattern: /^(6706|6771|6709)/,
    format: defaultFormat,
    length: [16, 17, 18, 19],
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
    type: 'unionpay',
    pattern: /^62/,
    format: defaultFormat,
    length: [16, 17, 18, 19],
    cvcLength: [3],
    luhn: false
  }, {
    type: 'discover',
    pattern: /^(6011|65|64[4-9]|622)/,
    format: defaultFormat,
    length: [16],
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
    type: 'amex',
    pattern: /^3[47]/,
    format: /(\d{1,4})(\d{1,6})?(\d{1,5})?/,
    length: [15],
    cvcLength: [3, 4],
    luhn: true
  }, {
    type: 'visa',
    pattern: /^4/,
    format: defaultFormat,
    length: [13, 14, 15, 16],
    cvcLength: [3],
    luhn: true
  }
];

cardFromNumber = function(num) {
  var card, _i, _len;
  num = (num + '').replace(/\D/g, '');
  for (_i = 0, _len = cards.length; _i < _len; _i++) {
    card = cards[_i];
    if (card.pattern.test(num)) {
      return card;
    }
  }
};

cardFromType = function(type) {
  var card, _i, _len;
  for (_i = 0, _len = cards.length; _i < _len; _i++) {
    card = cards[_i];
    if (card.type === type) {
      return card;
    }
  }
};

luhnCheck = function(num) {
  var digit, digits, odd, sum, _i, _len;
  odd = true;
  sum = 0;
  digits = (num + '').split('').reverse();
  for (_i = 0, _len = digits.length; _i < _len; _i++) {
    digit = digits[_i];
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
  var _ref;
  if ((target.selectionStart != null) && target.selectionStart !== target.selectionEnd) {
    return true;
  }
  if (typeof document !== "undefined" && document !== null ? (_ref = document.selection) != null ? typeof _ref.createRange === "function" ? _ref.createRange().text : void 0 : void 0 : void 0) {
    return true;
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
    return QJ.val(target, "" + val + " / ");
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
    return QJ.val(target, "" + val + " / ");
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

restrictExpiry = function(e) {
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
  if (value.length > 6) {
    return e.preventDefault();
  }
};

restrictCVC = function(e) {
  var digit, target, val;
  target = e.target;
  digit = String.fromCharCode(e.which);
  if (!/^\d+$/.test(digit)) {
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
      var _i, _len, _results;
      _results = [];
      for (_i = 0, _len = cards.length; _i < _len; _i++) {
        card = cards[_i];
        _results.push(card.type);
      }
      return _results;
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
      var month, prefix, year, _ref;
      value = value.replace(/\s/g, '');
      _ref = value.split('/', 2), month = _ref[0], year = _ref[1];
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
      var card, _ref;
      num = (num + '').replace(/\s+|-/g, '');
      if (!/^\d+$/.test(num)) {
        return false;
      }
      card = cardFromNumber(num);
      if (!card) {
        return false;
      }
      return (_ref = num.length, __indexOf.call(card.length, _ref) >= 0) && (card.luhn === false || luhnCheck(num));
    },
    validateCardExpiry: function(month, year) {
      var currentTime, expiry, prefix, _ref;
      if (typeof month === 'object' && 'month' in month) {
        _ref = month, month = _ref.month, year = _ref.year;
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
      var _ref, _ref1;
      cvc = QJ.trim(cvc);
      if (!/^\d+$/.test(cvc)) {
        return false;
      }
      if (type && cardFromType(type)) {
        return _ref = cvc.length, __indexOf.call((_ref1 = cardFromType(type)) != null ? _ref1.cvcLength : void 0, _ref) >= 0;
      } else {
        return cvc.length >= 3 && cvc.length <= 4;
      }
    },
    cardType: function(num) {
      var _ref;
      if (!num) {
        return null;
      }
      return ((_ref = cardFromNumber(num)) != null ? _ref.type : void 0) || null;
    },
    formatCardNumber: function(num) {
      var card, groups, upperLength, _ref;
      card = cardFromNumber(num);
      if (!card) {
        return num;
      }
      upperLength = card.length[card.length.length - 1];
      num = num.replace(/\D/g, '');
      num = num.slice(0, +upperLength + 1 || 9e9);
      if (card.format.global) {
        return (_ref = num.match(card.format)) != null ? _ref.join(' ') : void 0;
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
    Payment.restrictNumeric(el);
    QJ.on(el, 'keypress', restrictExpiry);
    QJ.on(el, 'keypress', formatExpiry);
    QJ.on(el, 'keypress', formatForwardSlash);
    QJ.on(el, 'keypress', formatForwardExpiry);
    QJ.on(el, 'keydown', formatBackExpiry);
    return el;
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

  return Payment;

})();

module.exports = Payment;

global.Payment = Payment;


}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"qj":6}]},{},[8])
(8)
});