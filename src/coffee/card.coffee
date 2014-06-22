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
                  <div class="logo visa">visa</div>
                  <div class="logo mastercard">MasterCard</div>
                  <div class="logo amex"></div>
                  <div class="logo discover">discover</div>
              <div class="lower">
                  <div class="shiny"></div>
                  <div class="cvc display">&bull;&bull;&bull;&bull;</div>
                  <div class="number display">&bull;&bull;&bull;&bull; &bull;&bull;&bull;&bull; &bull;&bull;&bull;&bull; &bull;&bull;&bull;&bull;</div>
                  <div class="name display">{{fullName}}</div>
                  <div class="expiry display" data-before="{{monthYear}}" data-after="{{validDate}}">••/••</div>
              </div>
          </div>
          <div class="back">
              <div class="bar"></div>
              <div class="cvc display">•••</div>
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
      fullName: 'Full Name'

  constructor: (el, opts) ->
    @options = $.extend({}, @defaults, opts)
    $.extend @options.messages, $.card.messages

    @$el = $(el)

    unless @options.container
      console.log "Please provide a container"
      return

    @$container = $(@options.container)

    @render()
    @attachHandlers()
    @handleInitialValues()

  render: ->
    @$container.append @template(@cardTemplate, @options.messages)

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
        @$card.addClass 'no-radial-gradient'

  attachHandlers: ->
    @$numberInput
      .bindVal @$numberDisplay,
        fill: false,
        filters: validToggler('validateCardNumber')
      .on 'payment.cardType', @handle('setCardType')

    expiryFilters = [(val) -> val.replace /(\s+)/g, '']
    if @$expiryInput.length == 1
      expiryFilters.push validToggler('validateCardExpiry')
      @$expiryInput.on 'keydown', @handle('captureTab')

    @$expiryInput
      .bindVal @$expiryDisplay,
        join: (text) ->
          if text[0].length == 2 or text[1] then "/" else ""
        filters: expiryFilters

    @$cvcInput
      .bindVal(@$cvcDisplay, validToggler 'validateCardCVC' )
      .on('focus', @handle('flipCard'))
      .on('blur', @handle('flipCard'))

    @$nameInput
      .bindVal @$nameDisplay,
        fill: false
        join: ' '

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

  handlers:
    setCardType: ($el, e, cardType) ->
      unless @$card.hasClass(cardType)

        @$card.removeClass('unknown')
        @$card.removeClass(@cardTypes.join(' '))

        @$card.addClass(cardType)
        @$card.toggleClass('identified', cardType isnt 'unknown')

    flipCard: ($el, e) ->
      @$card.toggleClass('flipped')

    captureTab: ($el, e) ->
      keyCode = e.keyCode or e.which
      return if keyCode != 9 or e.shiftKey
      val = $el.payment('cardExpiryVal')
      return unless val.month or val.year
      e.preventDefault() if !$.payment.validateCardExpiry(val.month, val.year)

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

  validToggler = (validatorName) ->
    if validatorName == "validateCardExpiry"
      return (val, $in, $out) ->
        val = $in.payment('cardExpiryVal')
        $in.toggleClass('valid', $.payment.validateCardExpiry(val.month , val.year))
        val
    else if validatorName == "validateCardNumber"
      return (val, $in, $out) ->
        $in.toggleClass('valid', $.payment.validateCardNumber(val))
        val
    else
      return (val, $in, $out) ->
      $out.toggleClass('valid', $.payment[validatorName](val))
      val

$.fn.extend card: (option, args...) ->
  @each ->
    $this = $(this)
    data = $this.data('card')

    if !data
      $this.data 'card', (data = new Card(this, option))
    if typeof option == 'string'
      data[option].apply(data, args)