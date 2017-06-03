require '../scss/card.scss'

QJ = require 'qj'
payment = require 'payment'
extend = require 'node.extend'

class Card
  initializedDataAttr: "data-jp-card-initialized"
  cardTemplate: '' +
  '<div class="jp-card-container">' +
      '<div class="jp-card">' +
          '<div class="jp-card-front">' +
              '<div class="jp-card-logo jp-card-elo">' +
                '<div class="e">e</div>' +
                '<div class="l">l</div>' +
                '<div class="o">o</div>' +
              '</div>' +
              '<div class="jp-card-logo jp-card-visa">visa</div>' +
              '<div class="jp-card-logo jp-card-visaelectron">visa<div class="elec">Electron</div></div>' +
              '<div class="jp-card-logo jp-card-mastercard">Mastercard</div>' +
              '<div class="jp-card-logo jp-card-maestro">Maestro</div>' +
              '<div class="jp-card-logo jp-card-amex"></div>' +
              '<div class="jp-card-logo jp-card-discover">discover</div>' +
              '<div class="jp-card-logo jp-card-dinersclub"></div>' +
              '<div class="jp-card-logo jp-card-dankort"><div class="dk"><div class="d"></div><div class="k"></div></div></div>' +
              '<div class="jp-card-lower">' +
                  '<div class="jp-card-shiny"></div>' +
                  '<div class="jp-card-cvc jp-card-display">{{cvc}}</div>' +
                  '<div class="jp-card-number jp-card-display">{{number}}</div>' +
                  '<div class="jp-card-name jp-card-display">{{name}}</div>' +
                  '<div class="jp-card-expiry jp-card-display" data-before="{{monthYear}}" data-after="{{validDate}}">{{expiry}}</div>' +
              '</div>' +
          '</div>' +
          '<div class="jp-card-back">' +
              '<div class="jp-card-bar"></div>' +
              '<div class="jp-card-cvc jp-card-display">{{cvc}}</div>' +
              '<div class="jp-card-shiny"></div>' +
          '</div>' +
      '</div>' +
  '</div>'
  template: (tpl, data) ->
    tpl.replace /\{\{(.*?)\}\}/g, (match, key, str) ->
      data[key]
  cardTypes: [
    'jp-card-amex',
    'jp-card-dankort',
    'jp-card-dinersclub',
    'jp-card-discover',
    'jp-card-jcb',
    'jp-card-laser',
    'jp-card-maestro',
    'jp-card-mastercard',
    'jp-card-unionpay',
    'jp-card-visa',
    'jp-card-visaelectron',
    'jp-card-elo'
  ]
  defaults:
    formatting: true
    formSelectors:
      numberInput: 'input[name="number"]'
      expiryInput: 'input[name="expiry"]'
      cvcInput: 'input[name="cvc"]'
      nameInput: 'input[name="name"]'
    cardSelectors:
      cardContainer: '.jp-card-container'
      card: '.jp-card'
      numberDisplay: '.jp-card-number'
      expiryDisplay: '.jp-card-expiry'
      cvcDisplay: '.jp-card-cvc'
      nameDisplay: '.jp-card-name'
    messages:
      validDate: 'valid\nthru'
      monthYear: 'month/year'
    placeholders:
      number: '&bull;&bull;&bull;&bull; &bull;&bull;&bull;&bull; &bull;&bull;&bull;&bull; &bull;&bull;&bull;&bull;'
      cvc: '&bull;&bull;&bull;'
      expiry: '&bull;&bull;/&bull;&bull;'
      name: 'Full Name'
    masks:
      cardNumber: false
    classes:
      valid: 'jp-card-valid'
      invalid: 'jp-card-invalid'
    debug: false

  constructor: (opts) ->
    @options = extend(true, @defaults, opts)

    unless @options.form
      console.log "Please provide a form"
      return

    @$el = QJ(@options.form)

    unless @options.container
      console.log "Please provide a container"
      return

    @$container = QJ(@options.container)

    # set a data attribute to ensure that card is only ever initialized
    # once on a given container
    toInitialize = if QJ.isDOMElement(@$container) then @$container else @$container[0]
    return if toInitialize.getAttribute(@initializedDataAttr)
    toInitialize.setAttribute(@initializedDataAttr, true)

    @render()
    @attachHandlers()
    @handleInitialPlaceholders()

  render: ->
    QJ.append(@$container, @template(
      @cardTemplate,
      extend({}, @options.messages, @options.placeholders)
    ))

    for name, selector of @options.cardSelectors
      this["$#{name}"] = QJ.find(@$container, selector)

    for name, selector of @options.formSelectors
      selector = if @options[name] then @options[name] else selector
      obj = QJ.find(@$el, selector)

      console.error "Card can't find a #{name} in your form." if !obj.length and @options.debug
      this["$#{name}"] = obj

    if @options.formatting
      Payment.formatCardNumber(@$numberInput)
      Payment.formatCardCVC(@$cvcInput)
      Payment.formatCardExpiry(@$expiryInput)

    if @options.width
      $cardContainer = QJ(@options.cardSelectors.cardContainer)[0]
      baseWidth = parseInt($cardContainer.clientWidth || window.getComputedStyle($cardContainer).width)

      $cardContainer.style.transform = "scale(#{@options.width / baseWidth})"

    # safari can't handle transparent radial gradient right now
    if navigator?.userAgent
      ua = navigator.userAgent.toLowerCase()
      if ua.indexOf('safari') != -1 and ua.indexOf('chrome') == -1
        QJ.addClass @$card, 'jp-card-safari'
    if (/MSIE 10\./i.test(navigator.userAgent))
      QJ.addClass @$card, 'jp-card-ie-10'
    # ie 11 does not support conditional compilation, use user agent instead
    if (/rv:11.0/i.test(navigator.userAgent))
      QJ.addClass @$card, 'jp-card-ie-11'

  attachHandlers: ->
    numberInputFilters = [@validToggler('cardNumber')]
    numberInputFilters.push(@maskCardNumber) if @options.masks.cardNumber

    bindVal @$numberInput, @$numberDisplay,
      fill: false,
      filters: numberInputFilters
    QJ.on @$numberInput, 'payment.cardType', @handle('setCardType')

    expiryFilters = [(val) -> val.replace /(\s+)/g, '']
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

  handleInitialPlaceholders: ->
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
    QJ.toggleClass el, @options.classes.invalid, !test

  maskCardNumber: (val, el, out) =>
    mask = @options.masks.cardNumber
    numbers = val.split(' ')

    if numbers.length >= 3
      numbers.forEach (item, idx) ->
        numbers[idx] = numbers[idx].replace(/\d/g, mask) unless idx == numbers.length - 1
      numbers.join(' ')

    else
      val.replace /\d/g, mask

  handlers:
    setCardType: ($el, e) ->
      cardType = e.data
      unless QJ.hasClass @$card, cardType
        QJ.removeClass @$card, 'jp-card-unknown'
        QJ.removeClass @$card, @cardTypes.join(' ')
        QJ.addClass @$card, "jp-card-#{cardType}"
        QJ.toggleClass @$card, 'jp-card-identified', (cardType isnt 'unknown')
        @cardType = cardType
    flipCard: ->
      QJ.addClass @$card, 'jp-card-flipped'
    unflipCard: ->
      QJ.removeClass @$card, 'jp-card-flipped'

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
      QJ.addClass out, 'jp-card-focused'

    QJ.on el, 'blur', ->
      QJ.removeClass out, 'jp-card-focused'

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
global.Card = Card
