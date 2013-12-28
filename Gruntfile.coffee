module.exports = (grunt) ->

    grunt.initConfig

        bower:
            install:
                options: 
                    targetDir: "build/vendor/"
                    verbose: true

        coffeelint:
            lint:
                src: "src/coffee/*.coffee"

        coffee:
            compile:
                files: [
                    {
                        expand: true
                        cwd: "src/"
                        src: "**/*.coffee"
                        dest: "build/js/"
                        ext: ".min.js"
                        flatten: true
                    }
                ]
        sass:
            compile:
                options:
                    style: "expanded"

                files: [
                    {
                        expand: true
                        cwd: "src/"
                        src: "sass/**/*.scss"
                        dest: "build/css/"
                        ext: ".min.css"
                        flatten: true
                    }
                ]

        connect:
            server:
                options:
                    port: '4747'
                    livereload: true

        open: 
            dev:
                path: 'http://localhost:4747'
                app: "Google Chrome Canary"

        watch:
            src:
                files: ['src/**/*.coffee']
                tasks: ["coffeelint", "coffee"]
                options:
                    livereload: true
                    debounceDelay: 250

            styles:
                files: ['src/sass/**/*.scss']
                tasks: ["sass"]
                options:
                    livereload: true
                    debounceDelay: 250

    grunt.loadNpmTasks "grunt-coffeelint"
    grunt.loadNpmTasks "grunt-contrib-sass"
    grunt.loadNpmTasks "grunt-contrib-coffee"
    grunt.loadNpmTasks "grunt-contrib-connect"
    grunt.loadNpmTasks "grunt-contrib-watch"
    grunt.loadNpmTasks "grunt-open"
    grunt.loadNpmTasks "grunt-bower-task"

    grunt.registerTask "default", ["connect", "open", "watch"]

