module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/* \n' +
                        ' * Copyright (c) 2013-2014 David Jenkins (<%= pkg.name %>) \n' +
                        ' * See the file license.txt for copying permission. \n' +
                        ' * \n' +
                        ' * Simple, yet effective, vanilla JavaScript form validation "plugin." Validatinator is based off \n' +
                        ' * of one of PHP\'s most famous framework, Laravel.  Using Validatinator is as easy as instantiating \n' +
                        ' * a Validatinator object, calling the passes or fails methods and if there are failed validations then grabbing \n' +
                        ' * those validations from the errors property on the main object. \n' +
                        ' * \n' +
                        ' * Latest Update: 0.1.0-beta (<%= grunt.template.today("mm/dd/yyyy") %>) \n' +
                        ' */ \n' +
                        '(function(window, undefined) {',
                footer: '})(window);'
            },
            all: {
                files: {
                    'js/<%= pkg.name %>.min.js': [
                        'js/<%= pkg.name %>.core.js',
                        'js/<%= pkg.name %>.polyfill.js',
                        'js/<%= pkg.name %>.messages.js',
                        'js/<%= pkg.name %>.validations.js',
                        'js/<%= pkg.name %>.utils.js'
                    ]
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
                src: 'js/<%= pkg.name %>.min.js',
                options: {
                    specs: 'js/tests/*.js'
                }
            }
        },
        watch: {
            scriptsUglify: {
                files: [
                    'js/<%= pkg.name %>.core.js',
                    'js/<%= pkg.name %>.polyfill.js',
                    'js/<%= pkg.name %>.validations.js',
                    'js/<%= pkg.name %>.utils.js',
                    'js/<%= pkg.name %>.messages.js'
                ],
                tasks: ['uglify'],
                options: {
                    spawn: false
                }
            },
            jasmineTests: {
                files: ['js/tests/*.js', 'js/<%= pkg.name %>.min.js'],
                tasks: ['jasmine:validatinatorTests']
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-jasmine');

    // Default task(s).
    grunt.registerTask('default', ['watch:scriptsUglify']);
};