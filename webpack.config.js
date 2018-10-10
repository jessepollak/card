var webpack = require('webpack')
var _ = require('underscore')

var baseConfig = {
  resolve: {
    extensions: [
      '',
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
    loaders: [
      { test: /\.scss/, loaders: ["style-loader", "css-loader", "sass-loader"] },
      { test: /\.json/, loader: "json-loader" },
      { test: /\.coffee$/, loader: "coffee-loader" }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      global: 'window'
    })
  ]
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
