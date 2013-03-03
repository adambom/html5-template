module.exports = function (grunt) {
    var process = require('child_process'),
        _ = require('underscore');

    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks("grunt-update-submodules");

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        exec: {

            'copy-bootstrap-less': {
                cmd: 'mkdir -p app/src/styles/bootstrap && find submodules/bootstrap/less/*.less -exec cp {} app/src/styles/bootstrap \\;'
            },

            'copy-bootstrap-js': {
                cmd: 'mkdir -p app/public/js/vendor/bootstrap && find submodules/bootstrap/js/*.js -exec cp {} app/public/js/vendor/bootstrap \\;'
            },

            'copy-bootstrap-img': {
                cmd: 'mkdir -p app/public/img && find submodules/bootstrap/img/* -exec cp {} app/public/img \\;'
            },

            'copy-jquery': {
                cmd: 'cd submodules/jquery; git checkout $(git tag | grep "1\\.9.[0-9]" | tail -1); npm install && grunt; git checkout master; cd ../../; mkdir -p app/public/js/vendor/jquery && find submodules/jquery/dist/*.js -exec cp {} app/public/js/vendor/jquery \\;;'
            },

            'copy-lodash': {
                cmd: 'mkdir -p app/public/js/vendor/lodash && find submodules/lodash/dist/*.js -exec cp {} app/public/js/vendor/lodash \\;'
            },

            'copy-backbone': {
                cmd: 'mkdir -p app/public/js/vendor/backbone && find submodules/backbone/backbone*.js -exec cp {} app/public/js/vendor/backbone \\;'
            }
        }
    });


    // Default task.
    grunt.registerTask('default', ['update_submodules', 'exec']);
    grunt.registerTask('clone', function () {
        var targets = Object.keys(this.flags),
            cmd = 'cp -R app <%= dest %>';

        targets.forEach(function (target) {
            process.exec(_.template(cmd, { dest: target }));
        });
    });
};