module.exports = function(grunt) {

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
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.registerTask('default', ['sass']);

};