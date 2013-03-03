module.exports = function (grunt) {
    var fs = require('fs');

    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks("grunt-update-submodules");

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        exec: {
            'copy-bootstrap-less': {
                cmd: 'mkdir -p src/styles/bootstrap && cp -R submodules/bootstrap/less src/styles/bootstrap'
            },

            'copy-bootstrap-js': {
                cmd: 'mkdir -p public/js/vendor/bootstrap && cp -R submodules/bootstrap/js public/js/vendor/bootstrap'
            },

            'copy-jquery': {
                cmd: 'cd submodules/jquery; git checkout $(git tag | grep "1\\.9.[0-9]" | tail -1); npm install && grunt;'
            },

            'copy-lodash': {
                cmd: 'mkdir -p public/js/vendor/lodash && find submodules/lodash/dist/*.js -exec cp {} public/js/vendor/lodash \\;'
            },

            'copy-backbone': {
                cmd: 'mkdir -p public/js/vendor/backbone && find submodules/backbone/backbone*.js -exec cp {} public/js/vendor/backbone \\;'
            }
        }
    });


    // Default task.
    grunt.registerTask('default', ['update_submodules', 'exec']);
};