gulp = require 'gulp'
browserify = require 'gulp-browserify'
scss = require 'gulp-sass'
prefix = require 'gulp-autoprefixer'
spawn = require('child_process').spawn
server = require('tiny-lr')()
livereload = require('gulp-livereload')
rename = require 'gulp-rename'
rimraf = require 'gulp-rimraf'
connect = require 'gulp-connect'
open = require 'gulp-open'
runs = require 'run-sequence'

development = process.env.NODE_ENV == 'development'

gulp.task 'scss', ->
  gulp.src ['./src/scss/**/*.scss']
  .pipe scss().on('error', console.log)
  .pipe prefix("> 1%")
  .pipe livereload(server)
  .pipe gulp.dest('./lib/css')

gulp.task 'browserify', ->
  gulp.src './src/coffee/**/*.coffee', read: false
    .pipe browserify
      insertGlobals: false
      debug: development
      transform: ['coffeeify']
      extensions: ['.coffee']
    .pipe livereload(server)
    .pipe rename({ extname: '.js' })
    .pipe gulp.dest('./lib/js')

gulp.task 'watch', ['scss', 'browserify', 'connect'],  ->
  server.listen 35729, ->
    gulp.watch './src/scss/**/*.scss', ['scss']
    gulp.watch './src/coffee/**/*.coffee', ['browserify']

  gulp.src('example/index.html')
    .pipe open("", url: "http://localhost:8080/example")

gulp.task 'connect', ->
  connect.server()

gulp.task 'clean', ->
  gulp.src 'build'
    .pipe rimraf()

# Default task call every tasks created so far.
gulp.task 'default', (cb) ->
  runs(
    'clean'
    ['scss', 'browserify']
    cb)