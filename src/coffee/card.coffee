require 'jquery.payment'

$ = jQuery
$.card = {}
$.card.fn = {}
$.fn.card = (opts) ->
  $.card.fn.construct.apply(this, opts)

class Card

  cardTemplate: """
  <div class="card-container">
      <div class="card">
          <div class="front">
                  <div class="card-logo visa">visa</div>
                  <div class="card-logo mastercard">MasterCard</div>
                  <div class="card-logo amex"></div>
                  <div class="card-logo discover">discover</div>
              <div class="lower">
                  <div class="shiny"></div>
                  <div class="cvc display">{{cvc}}</div>
                  <div class="number display">{{number}}</div>
                  <div class="name display">{{name}}</div>
                  <div class="expiry display" data-before="{{monthYear}}" data-after="{{validDate}}">{{expiry}}</div>
              </div>
          </div>
          <div class="back">
              <div class="bar"></div>
              <div class="cvc display">{{cvc}}</div>
              <div class="shiny"></div>
          </div>
      </div>
  </div>
  """
  template: (tpl, data) ->
    tpl.replace /\{\{(.*?)\}\}/g, (match, key, str) ->
      data[key]
  cardTypes: [
    'maestro',
    'dinersclub',
    'laser',
    'jcb',
    'unionpay',
    'discover',
    'mastercard',
    'amex',
    'visa'
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
      numberDisplay: '.number'
      expiryDisplay: '.expiry'
      cvcDisplay: '.cvc'
      nameDisplay: '.name'
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

  constructor: (el, opts) ->
    @options = $.extend(true, {}, @defaults, opts)
    $.extend @options.messages, $.card.messages
    $.extend @options.values, $.card.values

    @$el = $(el)

    unless @options.container
      console.log "Please provide a container"
      return

    @$container = $(@options.container)

    @render()
    @attachHandlers()
    @handleInitialValues()

  render: ->
    @$container.append(@template(
      @cardTemplate,
      $.extend({}, @options.messages, @options.values)
    ))

    $.each @options.cardSelectors, (name, selector) =>
      this["$#{name}"] = @$container.find(selector)

    $.each @options.formSelectors, (name, selector) =>
      if @options[name]
        obj = $(@options[name])
      else
        obj = @$el.find(selector)

      console.error "Card can't find a #{name} in your form." if !obj.length
      this["$#{name}"] = obj

    if @options.formatting
      @$numberInput.payment('formatCardNumber')
      @$cvcInput.payment('formatCardCVC')

      # we can only format if there's only one expiry input
      if @$expiryInput.length == 1
        @$expiryInput.payment('formatCardExpiry')

    if @options.width
      baseWidth = parseInt @$cardContainer.css('width')
      @$cardContainer.css "transform", "scale(#{@options.width / baseWidth})"

    # safari can't handle transparent radial gradient right now
    if navigator?.userAgent
      ua = navigator.userAgent.toLowerCase()
      if ua.indexOf('safari') != -1 and ua.indexOf('chrome') == -1
        @$card.addClass 'safari'
    if (new Function("/*@cc_on return @_jscript_version; @*/")())
      @$card.addClass 'ie-10'

  attachHandlers: ->
    @$numberInput
      .bindVal @$numberDisplay,
        fill: false,
        filters: @validToggler('cardNumber')
      .on 'payment.cardType', @handle('setCardType')

    expiryFilters = [(val) -> val.replace /(\s+)/g, '']
    if @$expiryInput.length == 1
      expiryFilters.push @validToggler('cardExpiry')
      @$expiryInput.on 'keydown', @handle('captureTab')

    @$expiryInput
      .bindVal @$expiryDisplay,
        join: (text) ->
          if text[0].length == 2 or text[1] then "/" else ""
        filters: expiryFilters

    @$cvcInput
      .bindVal @$cvcDisplay,
        filters: @validToggler('cardCVC')
      .on('focus', @handle('flipCard'))
      .on('blur', @handle('flipCard'))

    @$nameInput
      .bindVal @$nameDisplay,
        fill: false
        filters: @validToggler('cardHolderName')
        join: ' '
      .on 'keydown', @handle('captureName')

  handleInitialValues: ->
    $.each @options.formSelectors, (name, selector) =>
      el = this["$#{name}"]
      if el.val()
        # if the input has a value, we want to trigger a refresh
        el.trigger 'paste'
        # set a timeout because `jquery.payment` does the reset of the val
        # in a timeout
        setTimeout -> el.trigger 'keyup'

  handle: (fn) ->
    (e) =>
      $el = $(e.currentTarget)
      args = Array.prototype.slice.call arguments
      args.unshift $el
      @handlers[fn].apply this, args

  validToggler: (validatorName) ->
    if validatorName == "cardExpiry"
      isValid = (val) ->
        objVal = $.payment.cardExpiryVal val
        $.payment.validateCardExpiry objVal.month, objVal.year
    else if validatorName == "cardCVC"
      isValid = (val) => $.payment.validateCardCVC val, @cardType
    else if validatorName == "cardNumber"
      isValid = (val) -> $.payment.validateCardNumber val
    else if validatorName == "cardHolderName"
      isValid = (val) -> val != ""

    (val, $in, $out) =>
      result = isValid val
      @toggleValidClass $in, result
      @toggleValidClass $out, result
      val
  toggleValidClass: (el, test) ->
    el.toggleClass @options.classes.valid, test
    el.toggleClass @options.classes.invalid, !test

  handlers:
    setCardType: ($el, e, cardType) ->
      unless @$card.hasClass(cardType)
        @$card.removeClass('unknown')
        @$card.removeClass(@cardTypes.join(' '))
        @$card.addClass(cardType)
        @$card.toggleClass('identified', cardType isnt 'unknown')
        @cardType = cardType
    flipCard: ($el, e) ->
      @$card.toggleClass('flipped')
    captureTab: ($el, e) ->
      keyCode = e.keyCode or e.which
      return if keyCode != 9 or e.shiftKey
      val = $el.payment('cardExpiryVal')
      return unless val.month or val.year
      e.preventDefault() if !$.payment.validateCardExpiry(val.month, val.year)
    captureName: ($el, e) ->
      banKeyCodes = [48,49,50,51,52,53,54,55,56,57,106,107,109,110,111,186,187,188,189,190,191,192,219,220,221,222]
      e.preventDefault() if banKeyCodes.indexOf(e.which or e.keyCode) != -1

  $.fn.bindVal = (out, opts={}) ->
    opts.fill = opts.fill || false
    opts.filters = opts.filters || []
    opts.filters = [opts.filters] unless opts.filters instanceof Array

    opts.join = opts.join || ""
    if !(typeof(opts.join) == "function")
      joiner = opts.join
      opts.join = () -> joiner

    $el = $(this)
    outDefaults = (out.eq(i).text() for o, i in out)

    $el.on 'focus', ->
      out.addClass 'focused'

    $el.on 'blur', ->
      out.removeClass 'focused'

    $el.on 'keyup change paste', (e) ->
      val = $el.map(-> $(this).val()).get()
      join = opts.join(val)

      val = val.join(join)
      val = "" if val == join

      for filter in opts.filters
        val = filter(val, $el, out)

      for o, i in out
        if opts.fill
          outVal = val + outDefaults[i].substring(val.length)
        else
          outVal = val or outDefaults[i]

        out.eq(i).text(outVal)

    $el

$.fn.extend card: (option, args...) ->
  @each ->
    $this = $(this)
    data = $this.data('card')

    if !data
      $this.data 'card', (data = new Card(this, option))
    if typeof option == 'string'
      data[option].apply(data, args)
