$ = jQuery
$.card = {}
$.card.fn = {}
$.fn.card = (opts) ->
  $.card.fn.construct.apply(this, opts)

class Card
  @defaults:
    selectors:
      card: '.card'
      numberInput: 'input[name="number"]'
      expiryInput: 'input[name="expiry"]'
      cvcInput: 'input[name="cvc"]'
      numberDisplay: '.card .number'
      expiryDisplay: '.card .expiry'
      cvcDisplay: '.card .cvc'

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
    @$numberInput
      .bindVal(
        @$numberDisplay,
        validToggler('validateCardNumber'),
        { fill: false }
      )
      .on 'payment.cardType', @handle('setCardType')

    @$expiryInput
      .bindVal(
        @$expiryDisplay,
        [
          (val) -> val.replace /(\s+)/g, '',
          validToggler 'validateCardExpiry'
        ]
      )
      .on 'keydown', @handle('captureTab')

    @$cvcInput.bindVal @$cvcDisplay, validToggler 'validateCardCVC'

    @$cvcInput
      .on('focus', @handle('flipCard'))
      .on('blur', @handle('flipCard'))

  handle: (fn) ->
    (e) =>
      $el = $(e.currentTarget)
      args = Array.prototype.slice.call arguments
      args.unshift $el
      @handlers[fn].apply this, args

  handlers:
    setCardType: ($el, e, cardType) ->
      unless @$card.hasClass(cardType)
        allTypes = (card.type for card in $.payment.cards)

        @$card.removeClass('unknown')
        @$card.removeClass(allTypes.join(' '))

        @$card.addClass(cardType)
        @$card.toggleClass('identified', cardType isnt 'unknown')

    flipCard: ($el, e) ->
      @$card.toggleClass('flipped')

    captureTab: ($el, e) ->
      keyCode = e.keyCode or e.which
      return if keyCode != 9 or e.shiftKey
      val = $el.payment('cardExpiryVal')
      e.preventDefault() if !$.payment.validateCardExpiry(val.month, val.year)

    checkAmex: (val, $el) ->
      val = "   " + val if $el.hasClass('amex')

  $.fn.bindVal = (out, filters, opts) ->
    opts = opts or { fill: true }

    if filters
      filters = [filters] unless filters instanceof Array
    else
      filters = []

    $el = $(this)
    outDefaults = (out.eq(i).text() for o, i in out)

    $el.on 'focus', () ->
      out.addClass 'focused'

    $el.on 'blur', () ->
      out.removeClass 'focused'

    $el.on 'keyup', (e) ->
      val = $el.val()

      for filter in filters
        val = filter(val, $el, out)

      for o, i in out
        if opts.fill
          outVal = val + outDefaults[i].substring(val.length)
        else
          outVal = val or outDefaults[i]

        out.eq(i).text(outVal)

    $el

  validToggler = (validatorName) ->
    return (val, $in, $out) ->
      $out.toggleClass('valid', $.payment[validatorName](val))
      val


$.card.fn.construct = (opts) ->
  return new Card(opts)

$('form').card({})
