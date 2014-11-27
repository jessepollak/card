QJ = require 'qj'
payment = require './payment/src/payment.coffee'
extend = require 'node.extend'

class Card
  cardTemplate: """
  <div class="card-container">
      <div class="card">
          <div class="card-front">
                  <div class="card-logo card-visa">visa</div>
                  <div class="card-logo card-mastercard">MasterCard</div>
                  <div class="card-logo card-amex"></div>
                  <div class="card-logo card-discover">discover</div>
              <div class="card-lower">
                  <div class="card-shiny"></div>
                  <div class="card-cvc card-display">{{cvc}}</div>
                  <div class="card-number card-display">{{number}}</div>
                  <div class="card-name card-display">{{name}}</div>
                  <div class="card-expiry card-display" data-before="{{monthYear}}" data-after="{{validDate}}">{{expiry}}</div>
              </div>
          </div>
          <div class="card-back">
              <div class="card-bar"></div>
              <div class="card-cvc card-display">{{cvc}}</div>
              <div class="card-shiny"></div>
          </div>
      </div>
  </div>
  """
  template: (tpl, data) ->
    tpl.replace /\{\{(.*?)\}\}/g, (match, key, str) ->
      data[key]
  cardTypes: [
    'card-maestro',
    'card-dinersclub',
    'card-laser',
    'card-jcb',
    'card-unionpay',
    'card-discover',
    'card-mastercard',
    'card-amex',
    'card-visa'
  ]
  defaults:
    formatting: true
    formSelectors:
      numberInput: 'input[name="number"]'
      expiryInput: 'input[name="expiry"]'
      cvcInput: 'input[name="cvc"]'
      nameInput: 'input[name="name"]'
    cardSelectors:
      cardContainer: '.card-container'
      card: '.card'
      numberDisplay: '.card-number'
      expiryDisplay: '.card-expiry'
      cvcDisplay: '.card-cvc'
      nameDisplay: '.card-name'
    messages:
      validDate: 'valid\nthru'
      monthYear: 'month/year'
    values:
      number: '&bull;&bull;&bull;&bull; &bull;&bull;&bull;&bull; &bull;&bull;&bull;&bull; &bull;&bull;&bull;&bull;'
      cvc: '&bull;&bull;&bull;'
      expiry: '&bull;&bull;/&bull;&bull;'
      name: 'Full Name'
    classes:
      valid: 'card-valid'
      invalid: 'card-invalid'
    debug: false

  constructor: (el, opts) ->
    @options = extend(true, {}, @defaults, opts)
    extend @options.messages, @defaults.messages
    extend @options.values, @defaults.values

    @$el = el

    unless @options.container
      console.log "Please provide a container"
      return

    @$container = QJ(@options.container)

    @render()
    @attachHandlers()
    @handleInitialValues()

  render: ->
    @$container.insertAdjacentHTML('beforeend', @template(
      @cardTemplate,
      extend({}, @options.messages, @options.values)
    ))

    for name, selector of @options.cardSelectors
      this["$#{name}"] = @$container.querySelectorAll(selector)

    for name, selector of @options.formSelectors
      if @options[name]
        obj = QJ(@options[name])
      else
        obj = @$el.querySelectorAll(selector)

      console.error "Card can't find a #{name} in your form." if !obj.length and @options.debug
      this["$#{name}"] = obj

    if @options.formatting
      Payment.formatCardNumber(@$numberInput[0])
      Payment.formatCardCVC(@$cvcInput[0])

      # we can only format if there's only one expiry input
      if @$expiryInput.length == 1
        Payment.formatCardExpiry(@$expiryInput[0])

    if @options.width
      baseWidth = parseInt @$cardContainer.css('width')
      @$cardContainer.style.transform = "scale(#{@options.width / baseWidth})"

    # safari can't handle transparent radial gradient right now
    if navigator?.userAgent
      ua = navigator.userAgent.toLowerCase()
      if ua.indexOf('safari') != -1 and ua.indexOf('chrome') == -1
        QJ.addClass @$card, 'card-safari'
    if (new Function("/*@cc_on return @_jscript_version; @*/")())
      QJ.addClass @$card,'card-ie-10'
    # ie 11 does not support conditional compilation, use user agent instead
    if (/rv:11.0/i.test(navigator.userAgent))
      QJ.addClass @$card, 'card-ie-11'

  attachHandlers: ->
    bindVal @$numberInput, @$numberDisplay,
      fill: false,
      filters: @validToggler('cardNumber')
    QJ.on @$numberInput, 'payment.cardType', @handle('setCardType')

    expiryFilters = [(val) -> val.replace /(\s+)/g, '']
    if @$expiryInput.length == 1
      expiryFilters.push @validToggler('cardExpiry')

    bindVal @$expiryInput, @$expiryDisplay,
        join: (text) ->
          if text[0].length == 2 or text[1] then "/" else ""
        filters: expiryFilters

    bindVal @$cvcInput, @$cvcDisplay, filters: @validToggler('cardCVC')
    QJ.on @$cvcInput, 'focus', @handle('flipCard')
    QJ.on @$cvcInput, 'blur', @handle('unflipCard')

    bindVal @$nameInput, @$nameDisplay,
        fill: false
        filters: @validToggler('cardHolderName')
        join: ' '
    QJ.on @$nameInput, 'keydown', @handle('captureName')

  handleInitialValues: ->
    for name, selector of @options.formSelectors
      el = this["$#{name}"]
      if QJ.val(el)
        # if the input has a value, we want to trigger a refresh
        QJ.trigger el, 'paste'
        # set a timeout because `jquery.payment` does the reset of the val
        # in a timeout
        setTimeout -> QJ.trigger el, 'keyup'

  handle: (fn) ->
    (e) =>
      args = Array.prototype.slice.call arguments
      args.unshift e.target
      @handlers[fn].apply this, args

  validToggler: (validatorName) ->
    if validatorName == "cardExpiry"
      isValid = (val) ->
        objVal = Payment.fns.cardExpiryVal val
        Payment.fns.validateCardExpiry objVal.month, objVal.year
    else if validatorName == "cardCVC"
      isValid = (val) => Payment.fns.validateCardCVC val, @cardType
    else if validatorName == "cardNumber"
      isValid = (val) -> Payment.fns.validateCardNumber val
    else if validatorName == "cardHolderName"
      isValid = (val) -> val != ""

    (val, $in, $out) =>
      result = isValid val
      @toggleValidClass $in, result
      @toggleValidClass $out, result
      val
  toggleValidClass: (el, test) ->
    QJ.toggleClass el, @options.classes.valid, test
    QJ.toggleClass el ,@options.classes.invalid, !test

  handlers:
    setCardType: ($el, e) ->
      cardType = e.data
      unless QJ.hasClass @$card, cardType
        QJ.removeClass @$card, 'card-unknown'
        QJ.removeClass @$card, @cardTypes.join(' ')
        QJ.addClass @$card, "card-#{cardType}"
        QJ.toggleClass @$card, 'card-identified', (cardType isnt 'unknown')
        @cardType = cardType
    flipCard: ->
      QJ.addClass @$card, 'card-flipped'
    unflipCard: ->
      QJ.removeClass @$card, 'card-flipped'
    captureName: ($el, e) ->
      keyCode = e.which or e.keyCode
      banKeyCodes = [48,49,50,51,52,53,54,55,56,57,106,107,109,110,111,186,187,188,189,190,191,192,219,220,221,222]

      # Allow special symbols:
      #   - hyphen
      #   - dot
      #   - apostrophe
      allowedSymbols = [
        189, 109 # hyphen (when not using shiftKey)
        190, 110 # dot (when not using shiftKey)
        222 # apostrophe (when not using shiftKey)
      ]

      if banKeyCodes.indexOf(keyCode) != -1 and not (!e.shiftKey and keyCode in allowedSymbols)
        e.preventDefault()

  bindVal = (el, out, opts={}) ->
    opts.fill = opts.fill || false
    opts.filters = opts.filters || []
    opts.filters = [opts.filters] unless opts.filters instanceof Array

    opts.join = opts.join || ""
    if !(typeof(opts.join) == "function")
      joiner = opts.join
      opts.join = () -> joiner

    outDefaults = (o.textContent for o in out)

    QJ.on el, 'focus', ->
      QJ.addClass out, 'card-focused'

    QJ.on el, 'blur', ->
      QJ.removeClass el, 'card-focused'

    QJ.on el, 'keyup change paste', (e) ->
      val = (QJ.val(elem) for elem in el)

      join = opts.join(val)

      val = val.join(join)
      val = "" if val == join

      for filter in opts.filters
        val = filter(val, el, out)

      for outEl, i in out
        if opts.fill
          outVal = val + outDefaults[i].substring(val.length)
        else
          outVal = val or outDefaults[i]

        outEl.textContent = outVal

    el

module.exports = Card
