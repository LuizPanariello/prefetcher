    'use strict';

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd HH:mm") %> */ \n'
            },
            dist: {
                options:{
                    mangle: true,
                    drop_console: true
                },
                files: {
                    'prefetcher.min.js': 'prefetcher.js',
                }
            }
        },
    });

    require('load-grunt-tasks')(grunt);
    
    grunt.registerTask('default', [ 'uglify:dist' ]);

};