module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-concat');

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            less: {
                files: ['src/styles/**/*.less'],
                tasks: ['less:dev']
            },
            js: {
                files: ['pubic/js/vendor/**/*.js', 'src/scripts/**/*.js'],
                tasks: ['concat:plugins', 'concat:main']
            }
        },
        less: {
            dev: {
                files: {
                    'public/css/style.css': 'src/styles/style.less'
                }
            },
            prod: {
                options: {
                    yuicompress: true
                },
                files: {
                    'public/css/style.css': 'src/styles/style.less'
                }
            }
        },
        concat: {
            plugins: {
                src: [
                    'public/js/vendor/bootstrap/bootstrap-transitions.js',
                    'public/js/vendor/bootstrap/bootstrap-modal.js',
                    'public/js/vendor/bootstrap/bootstrap-dropdown.js',
                    'public/js/vendor/bootstrap/bootstrap-collapse.js'
                ],
                dest: 'public/js/plugins.js'
            },
            main: {
                src: [
                    'src/scripts/namespace.js',
                    'src/scripts/utils.js',
                    'src/scripts/app.js'
                ],
                dest: 'public/js/main.js'
            }
        }
    });


    // Default task.
    grunt.registerTask('default', ['less', 'concat', 'watch']);
};