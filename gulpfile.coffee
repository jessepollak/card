gulp = require 'gulp'
browserify = require 'gulp-browserify'
sass = require 'gulp-sass'
prefix = require 'gulp-autoprefixer'
spawn = require('child_process').spawn
server = require('tiny-lr')()
livereload = require('gulp-livereload')
rename = require 'gulp-rename'
clean = require 'gulp-clean'
gulpif = require 'gulp-if'
uglify = require 'gulp-uglify'
minify = require 'gulp-minify-css'
connect = require 'gulp-connect'

production = process.env.NODE_ENV == 'production'
transforms = ['coffeeify']
if production
  js = 'card.min.js'
  css = 'card.min.css'
else
  js = 'card.js'
  css = 'card.css'

gulp.task 'scss', ->
  gulp.src ['./src/sass/**/*.scss']
  .pipe sass()
  .pipe prefix("> 1%")
  .pipe livereload(server)
  .pipe gulp.dest('./build/css')
  .pipe gulpif(production, minify())
  .pipe gulpif(production, rename({ suffix: '.min'}))
  .pipe gulpif(production, gulp.dest('./build/css'))

gulp.task 'browserify', ->
  gulp.src './src/coffee/**/*.coffee', read: false
    .pipe browserify
      insertGlobals: true
      debug: !production
      transform: transforms
      extensions: ['.coffee']
    .pipe livereload(server)
    .pipe rename({ extname: '.js' })
    .pipe gulp.dest('./build/js')
    .pipe gulpif(production, rename({ suffix: '.min'}))
    .pipe gulpif(production, uglify())
    .pipe gulpif(production, gulp.dest('./build/js'))

gulp.task 'watch', ['connect'],  ->
  server.listen 35729, ->
    gulp.watch './static/src/scss/**/*.scss', ['scss']
    gulp.watch './static/src/coffee/**/*.coffee', ['browserify']

gulp.task 'connect', ->
  connect.server()

gulp.task 'clean', ->
  gulp.src 'build'
    .pipe clean()

# Default task call every tasks created so far.
gulp.task 'build', ['clean'], ->
  gulp.start 'scss', 'browserify'
gulp.task 'default', ['build']