window.jQuery = window.$ = $ = require 'jquery'

TYPE_INTERVAL = 400
USER_HAS_TYPED = false

$(document).ready ->
  check = ->
    return start() if isScrolledIntoView '.card-wrapper'

  if not check()
    $(window).on 'scroll', ->
      $(window).off 'scroll' if check()

start = ->
  $input = $('.active input[name="number"]')
  setTimeout startTyping.bind(null, $input), 1000
  $('.active input').on 'click keyup', (e, data) ->
    if not data or not data.fake
      USER_HAS_TYPED = true
  true

startTyping = ($input) ->
  type($input, '6545')
    .then(wait)
    .then(clear.bind(null, $input))
    .then(wait)
    .then(type.bind(null, $input, '5423'))
    .then(wait)
    .then(clear.bind(null, $input))
    .then(wait)
    .then(type.bind(null, $input, '3452'))
    .then(wait)
    .then(clear.bind(null, $input))
    .then(wait)
    .then(type.bind(null, $input, '4312'))
    .then(wait)
    .then(clear.bind(null, $input))
    .then(wait.bind(null, 4000))
    .then(startTyping.bind(null, $input))


type = ($inp, word) ->
  promise = $.Deferred()
  _type = ($inp, word) ->
    cursorFocus($inp)
    return promise.resolve() if word == ''
    letters = word.split('')
    typeKey $inp, letters.shift()
    setTimeout _type.bind(null, $inp, letters.join('')), TYPE_INTERVAL
  _type($inp, word)  if not USER_HAS_TYPED
  promise

clear = ($inp) ->
  promise = $.Deferred()
  _clear = ($inp) ->
    return promise.resolve() if $inp.val() == ''
    deleteKey $inp
    setTimeout _clear.bind(null, $inp), TYPE_INTERVAL / 2
  _clear($inp) if not USER_HAS_TYPED
  promise

wait = (time) ->
  time = time or TYPE_INTERVAL * 5
  promise = $.Deferred()
  setTimeout(promise.resolve.bind(promise), time) if not USER_HAS_TYPED
  promise

typeKey = ($inp, letter) ->
  $inp.val($inp.val() + letter)
  $inp.trigger($.Event('keyup'), fake: true)

deleteKey = ($inp) ->
  $inp.val($inp.val().slice(0, -1))
  $inp.trigger($.Event('keyup'), fake: true)

cursorFocus = (elem) ->
  x = window.scrollX
  y = window.scrollY
  elem.focus()
  window.scrollTo(x, y)

isScrolledIntoView = (elem) ->
  docViewTop = $(window).scrollTop()
  docViewBottom = docViewTop + $(window).height()

  elemTop = $(elem).offset().top
  elemBottom = elemTop + $(elem).height()

  ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
