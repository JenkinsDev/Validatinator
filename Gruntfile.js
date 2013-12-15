module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*\n * <%= pkg.name %> \n * Simple yet effective vanilla JavaScript front-end validation add-on.\n * <%= grunt.template.today("mm/dd/yyyy") %>\n */\n'
            },
            all: {
                files: {
                    './js/<%= pkg.name %>.min.js': ['./js/<%= pkg.name %>.utils.js', './js/<%= pkg.name %>.js']
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
                src: './js/<%= pkg.name %>.min.js',
                options: {
                    specs: './js/tests/*.js'
                }
            }
        },
        watch: {
            scriptsUglify: {
                files: ['./js/<%= pkg.name %>.utils.js', './js/<%= pkg.name %>.js'],
                tasks: ['uglify'],
                options: {
                    spawn: false
                }
            },
            jasmineTests: {
            	files: ['./js/tests/*.js', './js/<%= pkg.name %>.min.js'],
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
    grunt.registerTask('default', ['uglify', 'watch', 'connect']);
};