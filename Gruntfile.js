module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    browserify: {
        options: {},
        build: {
            files: {
                "bundle.js": [ "main.js" ],
                "bundle-test.js": [ "test/main-test.js" ]
            },
            options: {
                debug: true
            }
        }
    }
  });

  grunt.loadNpmTasks('grunt-browserify');


  // Default task(s).
  grunt.registerTask('default', ['browserify']);

};