var webpack = require('webpack')
var _ = require('underscore')

var baseConfig = {
  mode: 'development',
  resolve: {
    extensions: [
      '.js',
      '.coffee',
      '.scss'
    ]
  },
  entry: './src/coffee/card.coffee',
  output: {
    path: __dirname + '/dist/',
    filename: 'card.js',
    library: 'card',
    libraryTarget: 'var',
  },
  module: {
    rules: [
      {
        test: /\.scss/,
        use: [
          "style-loader", "css-loader", "sass-loader"
        ],
      },
      { test: /\.coffee$/, loader: "coffee-loader" }
    ]
  }
}

var jQueryConfig = _.defaults(
  {
    entry: './src/coffee/jquery.card.coffee',
    output: {
      path: __dirname + '/dist/',
      filename: 'jquery.card.js',
      library: 'card',
      libraryTarget: 'var',
    },
    externals: {
      "jquery": "jQuery"
    }
  },
  baseConfig
)

module.exports = [
  baseConfig,
  jQueryConfig
]
