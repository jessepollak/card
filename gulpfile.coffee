gulp = require 'gulp'
browserify = require 'browserify'
prefix = require 'gulp-autoprefixer'
spawn = require('child_process').spawn
server = require('tiny-lr')()
livereload = require('gulp-livereload')
rename = require 'gulp-rename'
rimraf = require 'gulp-rimraf'
connect = require 'gulp-connect'
open = require 'gulp-open'
runs = require 'run-sequence'

glob = require 'glob'
source = require 'vinyl-source-stream'
buffer = require 'vinyl-buffer'
rename = require 'gulp-rename'
es = require 'event-stream'
path = require 'path'
uglify = require 'gulp-uglify'
sourcemaps = require 'gulp-sourcemaps'

development = process.env.NODE_ENV == 'development'

gulp.task 'browserify', (done) ->
  glob './src/coffee/*.coffee', (err, files) ->
    done(err) if err

    tasks = files.map (entry) ->
      b = browserify
         entries: [entry]
         debug: true
         extensions: ['.coffee', '.js']

      b.bundle().on 'error', console.log
        .pipe source path.basename(entry)
        .pipe buffer()
        .pipe rename(extname: '.js')
        .pipe sourcemaps.init(loadMaps: true)
        .pipe sourcemaps.write (".")
        .pipe gulp.dest('./lib/js')

    es.merge(tasks).on 'end', done

gulp.task 'watch', ['browserify', 'connect'],  ->
  server.listen 35729, ->
    gulp.watch ['./src/coffee/**/*.coffee', './src/scss/**/*.scss'], ['browserify']

  gulp.src('example/index.html')
    .pipe open("", url: "http://localhost:8080/example")

gulp.task 'connect', ->
  connect.server()

gulp.task 'clean', ->
  gulp.src 'lib/js'
    .pipe rimraf()

gulp.task 'uglify', ->
  gulp.src './lib/js/*.js'
    .pipe sourcemaps.init(loadMaps: true)
    .pipe uglify()
    .pipe rename (path)->
      path.extname = ".min#{path.extname}"
    .pipe sourcemaps.write (".")
    .pipe gulp.dest("./lib/js")

# Default task call every tasks created so far.
gulp.task 'build', (cb) ->
  runs(
    'clean'
    'browserify',
    'uglify',
    cb
  )

gulp.task 'default', ['build']
