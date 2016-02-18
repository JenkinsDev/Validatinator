module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/* \n' +
                        ' * Copyright (c) 2013-2015 David Jenkins (<%= pkg.name %>) \n' +
                        ' * See the file license.txt for copying permission. \n' +
                        ' * \n' +
                        ' * Simple, yet effective, vanilla JavaScript form validation "plugin." Validatinator is based off \n' +
                        ' * of one of PHP\'s most famous framework, Laravel.  Using Validatinator is as easy as instantiating \n' +
                        ' * a Validatinator object, calling the passes or fails methods and if there are failed validations then grabbing \n' +
                        ' * those validations from the errors property on the main object. \n' +
                        ' * \n' +
                        ' * Latest Update: <%= pkg.version %> (<%= grunt.template.today("mm/dd/yyyy") %>) \n' +
                        ' */ \n' +
                        '(function(window, undefined) {',
                footer: '})(window);'
            },
            all: {
                files: {
                    'js/<%= pkg.name %>.min.js': ['dev/js/*.js']
                }
            }
        },
        connect: {
            server: {
                options: {
                    port: 8080,
                    livereload: true,
                    keepalive: true
                }
            }
        },
        jasmine: {
            validatinatorTests: {
                src: 'js/validatinator.min.js',
                options: {
                    specs: 'dev/tests/*.js'
                }
            }
        },
        watch: {
            scriptsUglify: {
                files: ['dev/js/*.js'],
                tasks: ['uglify'],
                options: {
                    spawn: false
                }
            },
            jasmineTests: {
                files: ['dev/tests/*.js', 'js/validatinator.min.js'],
                tasks: ['jasmine:validatinatorTests']
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-browserify');

    // Default task(s).
    grunt.registerTask('default', ['watch:scriptsUglify']);
};
