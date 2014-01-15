module.exports = function(grunt) {

    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: {
            dist: {
                options: {
                    trace: true,
                    style: 'compressed'
                },
                files: {
                    'jqm-icon-pack-fa.css': 'jqm-icon-pack-fa.scss'
                }
            }
        },
        watch: {
            sass: {
                options: {
                    // Monitor Sass files for changes and compile them, but don't reload the browser.
                    livereload: false
                },
                files: '**/*.scss',
                tasks: ['sass'],
            },
            css: {
                // LiveReload on the CSS files instead of their Sass source files and you get
                // the style to refresh without reloading the page in the browser.
                files: '**/*.css'
            },
            options: {
                livereload: true
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.registerTask('default', ['sass']);

};