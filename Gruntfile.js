module.exports = function(grunt) {

    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: {
            dist: {
                options: {
                    trace: true,
                    style: 'compact'
                },
                files: {
                    'dist/jqm-icon-pack-fa.css': 'dist/jqm-icon-pack-fa.scss'
                }
            }
        },
        grunticon: {
            iconPack: {
                files: [{
                    expand: true,
                    cwd: 'source/SVG',
                    src: ['*.svg', '*.png'],
                    dest: "dist"
                }],
                options: {
                    cssprefix: '.ui-icon-',
                    datasvgcss: 'jqm-icon-pack-fa.scss',
                    previewhtml: 'index.html',
                    template: "source/css_template.hbs"
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
    grunt.loadNpmTasks('grunt-grunticon');
    grunt.registerTask('default', ['grunticon', 'sass', 'prepare-css', 'prepare-icons-cfm', 'cleanup-dist']);
    grunt.registerTask('migrate', ['prepare-css', 'prepare-icons-cfm', 'migrate-to-builder']);
    grunt.registerTask('prepare-css', 'Prepare Icon Pack for Builder import', function() {
        console.log('Beginning conversion of CSS');

        // Open dist/jqm-icon-pack-fa.css
        var fs = require('fs'),
            finalArr = [],
            inFile = __dirname + '/dist/jqm-icon-pack-fa.css',
            outFileCSS = __dirname + '/dist/jqm-icon-pack-fa-builder.css',
            file_contents,
            tmpStr;

        // make sure CSS file exists
        if (!fs.existsSync(inFile)) return false;

        // read the file
        file_contents = fs.readFileSync(inFile).toString().split('\n\n');

        // Loop over file contents
        file_contents.forEach(function(el, i){
            // Match any declaration beginning with `.ui-icon-`
            if (el.match(/^\.ui-icon/)) {
                // convert declaration from `.ui-icon-<icon>:after` to `li .<icon>`
                // also change color from white to black
                tmpStr = el.replace('.ui-icon-','li .').replace(':after', '').replace('ffffff', '000000');
                finalArr.push(tmpStr);
            }
        });

        // save as file `jqm-icon-pack-fa-builder.css`
        fs.writeFileSync(outFileCSS, finalArr.join('\n'));

        console.log('CSS conversion complete');
    });
    grunt.registerTask('prepare-icons-cfm', 'Prepare icons.cfm for Builder import', function() {
        console.log('Beginning creation of icons.cfm');

        // Open dist/jqm-icon-pack-fa.css
        var fs = require('fs'),
            inFile = __dirname + '/dist/jqm-icon-pack-fa.css',
            outFileCFM = __dirname + '/dist/icons.cfm',
            file_contents,
            icon,
            xml,
            output = '',
            wrapper = '<cfset variables.icon_array = [OUTPUT]>',
            tmpl = '{name = "NAME", xml = "XML"},\n\n';

        // make sure CSS file exists
        if (!fs.existsSync(inFile)) return false;

        // read the file
        file_contents = fs.readFileSync(inFile).toString().split('\n\n');

        // Loop over file contents
        file_contents.forEach(function(el, i){
            // Match any declaration beginning with `.ui-icon-`
            if (el.match(/^\.ui-icon/)) {
                icon = el.match('^.ui-icon-([-a-z0-9]+):')[1];
                xml = el.match(/url\("(.*)"\)/)[1];
                output += tmpl.replace('NAME',icon).replace('XML',xml);
            }
        });

        // save as file `icons.cfm`, minus trailing comma
        // fs.writeFileSync(outFileCFM, wrapper.replace('OUTPUT', output.replace(/[ \n\t,]+$/gi, '')));
        fs.writeFileSync(outFileCFM, wrapper.replace('OUTPUT', output.replace(/[ \n\t,]+$/gi, '')));

        console.log('Icons.cfm file creation complete');
    });
    grunt.registerTask('migrate-to-builder', 'Prepare icons.cfm for Builder import', function() {
        console.log('Begin migration');

        // Open dist/jqm-icon-pack-fa.css
        var fs = require('fs'),
            destDir = '/Users/andymatthews/Dropbox/github/jQuery-Mobile-Icon-Pack-Builder',
            files = [{
                in:  __dirname + '/dist/jqm-icon-pack-fa-builder.css',
                out: destDir + '/css/jqm-icon-pack-fa-builder.css'
            },
            {
                in:  __dirname + '/dist/icons.cfm',
                out: destDir + '/icons.cfm'
            }];

        files.forEach(function(file, i){
            // fs.createReadStream(file.in).pipe(fs.createWriteStream(file.out));
            var fileContents = fs.readFileSync(file.in);
            fs.writeFileSync(file.out, fileContents.toString());
        });

        console.log('Migration complete');
    });
    grunt.registerTask('cleanup-dist', 'Assorted project cleanup', function() {
        // delete unwanted dist/* files
        var fs = require('fs'),
            filesToDelete = ['index.html', 'grunticon.loader.txt', 'icons.data.png.css', 'icons.fallback.css'];

        filesToDelete.forEach(function(file, i){
            fs.unlink(__dirname + '/dist/' + file, function(error){
                // pass
            });
        });
        console.log('Cleanup complete');
    });
};