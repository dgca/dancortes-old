module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    postcss: {
      options: {
        map: true,
        processors: [
          require('autoprefixer-core')({
            browsers: ['last 2 versions']
          })
        ]
      },
      dist: {
        src: '_site/css/main.css'
      }
    },
    watch: {
      css: {
        files: '_site/css/main.css',
        tasks: 'postcss:dist'
      }
    }
  });

  // Load plugins.
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-postcss');

  // Grunt tasks.
  grunt.registerTask('default', ['watch']);
  grunt.registerTask('autoprefixer', ['postcss:dist']);
};