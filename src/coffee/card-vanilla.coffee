payment = (->
  "use strict"
  payment =
    formatCardNumber: ->
      console.log "Need to do formatCardNumber"
      return

    formatCardCVC: ->
      console.log "Need to do formatCardCVC"
      return

    formatCardExpiry: ->
      console.log "Need to do formatCardExpiry"
      return

  Object.create payment
)()
card = (->

  "use strict"
  extend = require 'extend'

  inputFields = {}
  cardSelectors = {}
  pluginContainer = undefined
  cardContainer = undefined

  cardTypes = [
    "maestro"
    "dinersclub"
    "laser"
    "jcb"
    "unionpay"
    "discover"
    "mastercard"
    "amex"
    "visa"
  ]

  cardTemplate = """
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

  settings =
    formatting: true
    container: false
    formSelectors:
      numberInput: "input[name=\"number\"]"
      expiryInput: "input[name=\"expiry\"]"
      cvcInput: "input[name=\"cvc\"]"
      nameInput: "input[name=\"name\"]"

    cardSelectors:
      cardContainer: ".card-container"
      card: ".card"
      numberDisplay: ".number"
      expiryDisplay: ".expiry"
      cvcDisplay: ".cvc"
      nameDisplay: ".name"

    messages:
      validDate: "valid\nthru"
      monthYear: "month/year"

    values:
      number: "&bull;&bull;&bull;&bull; &bull;&bull;&bull;&bull; &bull;&bull;&bull;&bull; &bull;&bull;&bull;&bull;"
      cvc: "&bull;&bull;&bull;"
      expiry: "&bull;&bull;/&bull;&bull;"
      name: "Full Name"

    classes:
      valid: "card-valid"
      invalid: "card-invalid"

  cardObj =
    init: (container, userSettings) ->
      extend settings, userSettings
      pluginContainer = document.querySelector(container)
      cardContainer = document.querySelector(settings.container)
      hasInitError = @handlerInitErrors()
      @render() unless hasInitError
      return

    handlerInitErrors: ->
      hasErrors = false
      if not pluginContainer or not cardContainer
        console.error "Please provide a container"
        hasErrors = true
      Object.getOwnPropertyNames(settings.formSelectors).forEach (el) ->
        thisElement = document.querySelectorAll(settings.formSelectors[el])
        unless thisElement
          console.error "Card can't find a " + el + " in your form."
          hasErrors = true
        else
          inputFields[el] = thisElement
        return

      if settings.formatting
        payment.formatCardNumber inputFields.numberInput
        payment.formatCardCVC inputFields.cvcInput
        payment.formatCardExpiry inputFields.expiryInput  if inputFields.expiryInput.length is 1

      return hasErrors

    templateHelper: ->
      translatableStrings = extend(settings.messages, settings.values)
      finalTemplate = cardTemplate.replace(/\{\{(.*?)\}\}/g, (match, key) ->
        translatableStrings[key]
      )
      return finalTemplate

    render: ->
      renderedTemplate = @templateHelper()
      cardContainer.innerHTML = renderedTemplate

      @registerCardElements()
      if settings.width
        baseWidth = parseInt(cardSelectors.cardContainer[0].clientWidth, 10)
        scaleValue = settings.width / baseWidth
        cardSelectors.cardContainer[0].style.transform = "scale(" + scaleValue + ")"
        cardSelectors.cardContainer[0].style.webkitTransform = "scale(" + scaleValue + ")"
        cardSelectors.cardContainer[0].style.MozTransform = "scale(" + scaleValue + ")"
        cardSelectors.cardContainer[0].style.msTransform = "scale(" + scaleValue + ")"
        cardSelectors.cardContainer[0].style.OTransform = "scale(" + scaleValue + ")"

      # safari can't handle transparent radial gradient right now
      if (if typeof navigator isnt "undefined" and navigator isnt null then navigator.userAgent else undefined)
        userAgent = navigator.userAgent.toLowerCase()
        if userAgent.indexOf("safari") isnt -1 and userAgent.indexOf("chrome") is -1
          cardSelectors.card.classList.add "no-radial-gradient"

      return

    registerCardElements: ->
      Object.getOwnPropertyNames(settings.cardSelectors).forEach (el) ->
        cardSelectors[el] = document.querySelectorAll(settings.cardSelectors[el])
        return
      return

    attachHandlers: ->

    bindVal: (thisElement, outElement, options) ->

      el = document.querySelectorAll(thisElement)[0]
      options = {}  unless options
      options.fill = options.fill or false
      options.filters = options.filters or []
      options.join = options.join or ""
      options.filters = [options.filters]  unless Array.isArray(options.filters)
      if typeof options.join isnt "function"
        joiner = options.join
        options.join = ->
          joiner

      # Take the default values of settings.values
      outDefaults = (->
        arrayOfDefault = []
        Object.getOwnPropertyNames(settings.values).forEach (el) ->
          arrayOfDefault.push settings.values[el]
          return

        arrayOfDefault
      )()
      el.addEventListener "focus", ->
        @classList.add "focused"
        return

      el.addEventListener "blur", ->
        @classList.remove "focused"
        return

      # Input replace keyup, change AND paste
      el.addEventListener "input", (ev) ->
        return

      return

  cardObj
)()
window.card = Object.create(card)