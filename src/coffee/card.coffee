$ = jQuery
$.card = {}
$.card.fn = {}
$.fn.card = (opts) ->
  $.card.fn.construct.apply(this, opts)

class Card
  @defaults:
    selectors:
      numberInput: 'input[name="number"]'
      expiryInput: 'input[name="expiry"]'
      cvcInput: 'input[name="cvc"]'
      numberDisplay: '.number-display'
      expiryDisplay: '.expiry-display'
      cvcDisplay: '.cvc-display'

  constructor: (opts) ->
    @options = $.extend({}, opts, Card.defaults)

    $.each @options.selectors, (name, selector) =>
      this["$#{name}"] = @options[name] || $(selector)

    @attachFormatters()
    @attachHandlers()

  attachFormatters: () ->
    @$numberInput.payment('formatCardNumber')
    @$expiryInput.payment('formatCardExpiry')
    @$cvcInput.payment('formatCardCVC')

  attachHandlers: () ->
    bind @$numberInput, @$numberDisplay
    bind @$expiryInput, @$expiryDisplay
    bind @$cvcInput, @$cvcDisplay

    @$cvcInput
      .on('focus', @handle('cvcFocus'))

  handle: (eventName) ->
    (e) =>
      $el = $(e.currentTarget)
      @handlers[eventName].call this, e, $el

  handlers:
    cvcFocus: (e, $el) ->
      console.log "cvc focused"

  bind = (inEl, outEl) ->
    outDefault = outEl.text()

    inEl.on 'keyup', (e) ->
      $el = $(this)
      val = $el.val()
      outEl.text(val + outDefault.substring(val.length))

$.card.fn.construct = (opts) ->
  return new Card(opts)

$('form').card({})
