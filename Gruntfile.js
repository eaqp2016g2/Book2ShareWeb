/**
 * Created by juan on 19/06/17.
 */

module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-obfuscator');


    grunt.initConfig({
        obfuscator: {
            files: [
                'www/app.js',
                'www/views/**/*.js'
            ],
            entry: 'www/app.js',
            out: 'www/obfuscated.js',
            strings: true,
            root: __dirname
        }
    });

    grunt.registerTask('default', 'obfuscator')
};