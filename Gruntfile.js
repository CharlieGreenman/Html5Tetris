// var for livereload
var
    LIVERELOAD_PORT = 35729,
    lrSnippet = require('connect-livereload')({ port: LIVERELOAD_PORT }),
    mountFolder = function( connect, dir ) {
        return connect.static(require('path').resolve(dir));
    };


module.exports = function(grunt) {
    grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
        jade:{
          compile: {
              files:{
                  'index.html': 'jade/**/*.jade'
              }
          },
            options: {
                pretty: true
            }
        },

        compass: {
          compile: {
              options: {
                  sassDir: 'sass',
                  cssDir: 'css'
              }
          }
        },

        jshint: {
                options: {
                    bitwise: true,
                    camelcase: true,
                    curly: true,
                    eqeqeq: true,
                    forin: true,
                    immed: true,
                    indent: 4,
                    latedef: false,
                    newcap: true,
                    noarg: true,
                    noempty: false,
                    nonew: true,
                    quotmark: 'single',
                    regexp: true,
                    undef: false,
                    unused: true,
                    trailing: true,
                    maxlen: 120
                },
                target1: ['Gruntfile.js', 'js/**/*.js']
        },

        watch: {

            jshint: {
                files: 'js/**/*.js',
                tasks: ['jshint'],
                options: {
                    livereload: LIVERELOAD_PORT
                }
            },

            jade: {
                files: 'jade/**/*.jade',
                tasks: [ 'jade' ],
                options: {
                    livereload: LIVERELOAD_PORT
                }

            },
            css: {
                files: 'sass/**/*.scss',
                tasks: ['compass'],
                options: {
                    livereload: LIVERELOAD_PORT
                }
            }
        },

        connect: {
            options: {
                port: 9000,
                hostname: '0.0.0.0'
            },
            livereload: {
                options: {
                    middleware: function( connect ) {
                        return [
                            lrSnippet,
                            mountFolder(connect, './')
                        ];
                    }
                }
            }
        },
        open: {
            server: {
                url: 'http://localhost:<%= connect.options.port %>'
            }
        }
    });


    grunt.registerTask('server', function() {
        grunt.task.run([
            'connect:livereload',
            'open',
            'watch'
        ]);
    });

    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-open');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('connect-livereload');
    grunt.registerTask('default', ['jade', 'compass', 'jshint', 'server', 'watch',]);

};