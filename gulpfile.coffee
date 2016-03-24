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
derequire = require 'gulp-derequire'
runs = require 'run-sequence'

glob = require 'glob'
source = require 'vinyl-source-stream'
rename = require 'gulp-rename'
es = require 'event-stream'
path = require 'path'

development = process.env.NODE_ENV == 'development'

gulp.task 'browserify', (done) ->
  glob './src/coffee/*.coffee', (err, files) ->
    done(err) if err

    tasks = files.map (entry) ->
      b = browserify
        entries: [entry]
        debug: development
        standalone: if development then null else 'card'
        extensions: ['.coffee', '.js']

      b.bundle().on 'error', console.log
        .pipe source path.basename(entry)
        .pipe derequire()
        .pipe rename(extname: '.js')
        .pipe gulp.dest('./lib/js')

    es.merge(tasks).on 'end', done

gulp.task 'watch', ['browserify', 'connect'],  ->
  server.listen 35729, ->
    gulp.watch ['./src/coffee/**/*.coffee', './src/scss/**/*.scss'],
      ['browserify']

  gulp.src('example/index.html')
    .pipe open("", url: "http://localhost:8080/example")

gulp.task 'connect', ->
  connect.server()

gulp.task 'clean', ->
  gulp.src 'build'
    .pipe rimraf()

# Default task call every tasks created so far.
gulp.task 'build', (cb) ->
  runs(
    'clean'
    'browserify',
    cb
  )

gulp.task 'default', ['build']
