/**
 * gruntfile
 */

(function () {
    'use strict';

    module.exports = function (grunt) {
        grunt.initConfig({
            pkg: grunt.file.readJSON('package.json'),
            concurrent: {
                default: ['watch', 'connect'],
                options: {
                    logConcurrentOutput: true
                }
            },
            watch: {
                clientTS: {
                    files: 'app/**/*.ts',
                    tasks: ['ts:dev'],
                    options: {
                        livereload: true
                    }
                }
                /*clientScss: {
                 files: 'scss/!**!/!*.scss',
                 tasks: ['sass'],
                 options: {
                 livereload: true
                 }
                 }*/
            },
            connect: {
                server: {
                    options: {
                        port: 3000,
                        base: './',
                        hostname: 'localhost',
                        directory: null,
                        protocol: "http",
                        livereload: true,
                        keepalive: true
                    }
                }
            },
            ts: {
                dev: {
                    src: ["app/**/*.ts", "!typings/main/*.ts", '!typings/main.d.ts'],
                    tsconfig: true
                }
            },
            sass: {
                dist: {
                    files: [{
                        expand: true,
                        src: 'scss/main.scss',
                        ext: '.css',
                        rename: function (base, src) {
                            return src.replace('scss/', 'public/assets/style/');
                        }
                    }]
                }
            }
        });

        // Load NPM tasks
        require('load-grunt-tasks')(grunt);

        grunt.registerTask('lint', ['sass']);
        grunt.registerTask('default', ['lint', 'concurrent:default']);
    }
})();